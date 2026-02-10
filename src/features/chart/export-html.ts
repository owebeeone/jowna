import type { ChartSettings, Dataset, Project } from "../../domain";
import { STATIC_CHART_PAYLOAD_GLOBAL } from "./static-payload";
import {
  createStaticChartPayload,
  serializeStaticChartPayload,
  type StaticChartPayload,
} from "./static-payload";

export interface StandaloneChartDocumentInput {
  project: Project | null;
  datasets: Dataset[];
  activeDatasetId: string | null;
  depthLimit: number;
  chartSettings: ChartSettings | null;
  focusPath?: string[] | null;
}

export interface ComposeStandaloneChartDocumentInput {
  templateHtml: string;
  templateUrl: string;
  payload: StaticChartPayload;
  title: string;
  loadAsset?: (assetUrl: string) => Promise<string>;
}

export async function createStandaloneChartDocument(
  input: StandaloneChartDocumentInput,
): Promise<string> {
  const payload = createStaticChartPayload({
    project: input.project,
    datasets: input.datasets,
    activeDatasetId: input.activeDatasetId,
    depthLimit: input.depthLimit,
    chartSettings: input.chartSettings,
    focusPath: input.focusPath ?? null,
  });
  const title = resolveTitle(payload);
  const templateUrl = resolveTemplateUrl();
  const templateHtml = await loadTextAsset(templateUrl);

  return composeStandaloneChartDocument({
    templateHtml,
    templateUrl,
    payload,
    title,
  });
}

export async function composeStandaloneChartDocument(
  input: ComposeStandaloneChartDocumentInput,
): Promise<string> {
  const loadAsset = input.loadAsset ?? loadTextAsset;
  let html = input.templateHtml;

  html = replaceDocumentTitle(html, escapeHtml(input.title));

  const stylesheetTags = Array.from(html.matchAll(/<link\b[^>]*>/gi)).map((match) => match[0]);
  for (const tag of stylesheetTags) {
    const rel = readHtmlAttribute(tag, "rel");
    const href = readHtmlAttribute(tag, "href");
    const normalizedRel = rel?.toLowerCase() ?? "";
    if (!href) {
      continue;
    }
    if (normalizedRel === "stylesheet") {
      const stylesheetText = await loadAsset(resolveAssetUrl(input.templateUrl, href));
      const styleTag = `<style data-jowna-inline="stylesheet">${escapeStyleContent(stylesheetText)}</style>`;
      html = html.replace(tag, () => styleTag);
      continue;
    }

    // Once scripts are inlined, preload hints for JS become stale and can trigger file:// fetch errors.
    const as = readHtmlAttribute(tag, "as")?.toLowerCase();
    const isScriptPreload =
      normalizedRel === "modulepreload" || (normalizedRel === "preload" && as === "script");
    if (isScriptPreload) {
      html = html.replace(tag, "");
    }
  }

  const scriptTags = findScriptSourceTags(html);
  for (const tag of scriptTags) {
    const source = readHtmlAttribute(tag, "src");
    if (!source) {
      continue;
    }
    if (looksLikeDevSourceEntry(source)) {
      throw new Error(
        "Static HTML export cannot use Vite source modules. Build and serve the production bundle (e.g. `npm run build` then `npm run preview`) and retry Download HTML.",
      );
    }
    const scriptText = await loadAsset(resolveAssetUrl(input.templateUrl, source));
    const openingScriptTag = tag.slice(0, tag.indexOf(">") + 1);
    const inlineOpeningTag = openingScriptTag
      .replace(/\s+src=(['"])[^"']+\1/i, "")
      .replace("<script", `<script data-jowna-inline="script"`);
    const inlineScriptTag = `${inlineOpeningTag}${escapeScriptContent(scriptText)}</script>`;
    html = html.replace(tag, () => inlineScriptTag);
  }

  const payloadScript = `<script id="jowna-static-payload">window.${STATIC_CHART_PAYLOAD_GLOBAL} = ${serializeStaticChartPayload(input.payload)};</script>`;
  if (/<script\b/i.test(html)) {
    html = html.replace(/<script\b/i, `${payloadScript}<script`);
  } else if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `${payloadScript}</body>`);
  } else {
    html += payloadScript;
  }

  const residualScriptSourceTags = findScriptSourceTags(html);
  if (residualScriptSourceTags.length > 0) {
    const sample = residualScriptSourceTags.slice(0, 3).join(" | ");
    throw new Error(
      `Static HTML export failed to inline one or more JavaScript assets. Residual tags: ${sample}`,
    );
  }

  return html;
}

function findScriptSourceTags(html: string): string[] {
  return Array.from(html.matchAll(/<script\b[^>]*\bsrc=(['"])[^"']+\1[^>]*>\s*<\/script>/gi)).map(
    (match) => match[0],
  );
}

function looksLikeDevSourceEntry(source: string): boolean {
  return (
    /\/src\/.+\.(tsx?|jsx?)$/i.test(source) ||
    source.includes("@react-refresh") ||
    source.includes("/@vite/")
  );
}

export function toStandaloneChartFileName(datasetName: string): string {
  const normalized = datasetName
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const base = normalized.length > 0 ? normalized : "dataset-chart";
  return `${base}.html`;
}

function resolveTitle(payload: StaticChartPayload): string {
  const activeDataset =
    payload.datasets.find((dataset) => dataset.id === payload.activeDatasetId) ??
    payload.datasets[0] ??
    null;
  return activeDataset?.name ?? payload.project.name;
}

function resolveTemplateUrl(): string {
  const basePath = import.meta.env.BASE_URL || "/";
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "http://localhost";
  const baseUrl = new URL(basePath, origin);
  return new URL("static_page.html", baseUrl).toString();
}

function resolveAssetUrl(templateUrl: string, href: string): string {
  return new URL(href, templateUrl).toString();
}

async function loadTextAsset(assetUrl: string): Promise<string> {
  const response = await fetch(assetUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to load asset '${assetUrl}': ${response.status} ${response.statusText}`,
    );
  }
  return response.text();
}

function readHtmlAttribute(tag: string, attributeName: string): string | null {
  const attributeRegex = new RegExp(`\\b${attributeName}=([\"'])(.*?)\\1`, "i");
  const match = attributeRegex.exec(tag);
  return match?.[2] ?? null;
}

function replaceDocumentTitle(html: string, title: string): string {
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  }
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (headTag) => `${headTag}<title>${title}</title>`);
  }
  return `<title>${title}</title>${html}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeScriptContent(value: string): string {
  return value.replace(/<\/script/gi, "<\\/script");
}

function escapeStyleContent(value: string): string {
  return value.replace(/<\/style/gi, "<\\/style");
}
