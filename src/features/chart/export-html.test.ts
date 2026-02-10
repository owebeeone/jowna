import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_CHART_SETTINGS } from "../../grips";
import { makeDataset, makeProject } from "../../test-support/fixtures";
import {
  composeStandaloneChartDocument,
  createStandaloneChartDocument,
  toStandaloneChartFileName,
} from "./export-html";
import { createStaticChartPayload } from "./static-payload";

describe("standalone chart html export", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("inlines stylesheet and script assets and injects payload script", async () => {
    const payload = createStaticChartPayload({
      project: makeProject({ id: "project-inline", name: "Inline Project" }),
      datasets: [makeDataset({ id: "dataset-inline", name: "Inline Dataset" })],
      activeDatasetId: "dataset-inline",
      depthLimit: 5,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    const html = await composeStandaloneChartDocument({
      templateHtml: `<!doctype html><html><head><title>Template</title><link rel="stylesheet" href="/assets/main.css"></head><body><div id="root"></div><script type="module" src="/assets/main.js"></script></body></html>`,
      templateUrl: "https://example.test/static_page.html",
      payload,
      title: "Inline Dataset",
      loadAsset: async (assetUrl) => {
        if (assetUrl.endsWith("main.css")) {
          return ".app{color:red}";
        }
        if (assetUrl.endsWith("main.js")) {
          return "window.__staticLoaded = true;";
        }
        throw new Error(`Unexpected asset ${assetUrl}`);
      },
    });

    expect(html).toContain("<title>Inline Dataset</title>");
    expect(html).toContain(".app{color:red}");
    expect(html).toContain("window.__staticLoaded = true;");
    expect(html).toContain("window.__JOWNA_STATIC_PAYLOAD__ =");
    expect(html).not.toContain('src="/assets/main.js"');
    expect(html).not.toContain('href="/assets/main.css"');
  });

  it("removes stale script preloads when scripts are inlined", async () => {
    const payload = createStaticChartPayload({
      project: makeProject({ id: "project-preload", name: "Preload Project" }),
      datasets: [makeDataset({ id: "dataset-preload", name: "Preload Dataset" })],
      activeDatasetId: "dataset-preload",
      depthLimit: 4,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    const html = await composeStandaloneChartDocument({
      templateHtml:
        '<!doctype html><html><head><title>Template</title><link rel="modulepreload" href="/assets/chunk.js"><link rel="preload" as="script" href="/assets/chunk2.js"></head><body><div id="root"></div><script type="module" src="/assets/main.js"></script></body></html>',
      templateUrl: "https://example.test/static_page.html",
      payload,
      title: "Preload Dataset",
      loadAsset: async (assetUrl) => {
        if (assetUrl.endsWith("main.js")) {
          return "window.__staticLoaded = true;";
        }
        if (assetUrl.endsWith("chunk.js") || assetUrl.endsWith("chunk2.js")) {
          return "/* preload asset */";
        }
        throw new Error(`Unexpected asset ${assetUrl}`);
      },
    });

    expect(html).toContain("window.__staticLoaded = true;");
    expect(html).not.toContain('rel="modulepreload"');
    expect(html).not.toContain('rel="preload" as="script"');
  });

  it("builds static payload document from static template fetches", async () => {
    const dataset = makeDataset({ id: "dataset-1", name: "Population" });
    const project = makeProject({
      id: "project-1",
      name: "Population Project",
      datasetIds: [dataset.id],
      activeDatasetId: dataset.id,
    });

    const template = `<!doctype html><html><head><title>Template</title><link rel="stylesheet" href="/assets/static.css"></head><body><div id="root"></div><script type="module" src="/assets/static.js"></script></body></html>`;
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/static_page.html")) {
        return new Response(template, { status: 200 });
      }
      if (url.endsWith("/assets/static.css")) {
        return new Response(".chart{display:block}", { status: 200 });
      }
      if (url.endsWith("/assets/static.js")) {
        return new Response("window.__chartBoot = true;", { status: 200 });
      }
      return new Response("missing", { status: 404, statusText: "Not Found" });
    });
    vi.stubGlobal("fetch", fetchMock);

    const html = await createStandaloneChartDocument({
      project,
      datasets: [dataset],
      activeDatasetId: dataset.id,
      depthLimit: 4,
      chartSettings: {
        ...DEFAULT_CHART_SETTINGS,
        wedgeStrokeColor: "#ededed",
      },
      focusPath: [dataset.tree.name],
    });

    expect(fetchMock).toHaveBeenCalled();
    expect(html).toContain("<title>Population</title>");
    expect(html).toContain('"depthLimit":4');
    expect(html).toContain('"wedgeStrokeColor":"#ededed"');
    expect(html).toContain("window.__chartBoot = true;");
    expect(toStandaloneChartFileName("Population demographics 2026")).toBe(
      "Population-demographics-2026.html",
    );
  });

  it("fails fast when template references Vite source module entry", async () => {
    const payload = createStaticChartPayload({
      project: makeProject({ id: "project-dev", name: "Dev Project" }),
      datasets: [makeDataset({ id: "dataset-dev", name: "Dev Dataset" })],
      activeDatasetId: "dataset-dev",
      depthLimit: 2,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    await expect(
      composeStandaloneChartDocument({
        templateHtml:
          '<!doctype html><html><head><title>T</title></head><body><div id="root"></div><script type="module" src="/src/static/main.tsx"></script></body></html>',
        templateUrl: "http://localhost:5173/static_page.html",
        payload,
        title: "Dev Dataset",
        loadAsset: async () => "",
      }),
    ).rejects.toThrowError("Static HTML export cannot use Vite source modules");
  });

  it("does not rewrite script-like strings inside the inlined app bundle", async () => {
    const payload = createStaticChartPayload({
      project: makeProject({ id: "project-escape", name: "Escape Project" }),
      datasets: [makeDataset({ id: "dataset-escape", name: "Escape Dataset" })],
      activeDatasetId: "dataset-escape",
      depthLimit: 3,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    const html = await composeStandaloneChartDocument({
      templateHtml:
        '<!doctype html><html><head><title>Template</title></head><body><div id="root"></div><script type="module" src="/assets/main.js"></script></body></html>',
      templateUrl: "https://example.test/static_page.html",
      payload,
      title: "Escape Dataset",
      loadAsset: async () =>
        'const a = "<script type=\\"module\\" crossorigin src=\\"/assets/chunk.js\\"></script>"; const b = "<link rel=\\"stylesheet\\" href=\\"/assets/chunk.css\\">"; window.__inline = [a, b];',
    });

    expect(html).toContain(
      '<script type=\\"module\\" crossorigin src=\\"/assets/chunk.js\\"><\\/script>',
    );
    expect(html).toContain('<link rel=\\"stylesheet\\" href=\\"/assets/chunk.css\\">');
    expect(html).not.toContain('<script type=\\"module\\" crossorigin><\\/script>');
    expect(html).not.toContain('<link rel=\\"stylesheet\\" >');
  });

  it("does not treat $& sequences in inlined script as replacement placeholders", async () => {
    const payload = createStaticChartPayload({
      project: makeProject({ id: "project-dollar", name: "Dollar Project" }),
      datasets: [makeDataset({ id: "dataset-dollar", name: "Dollar Dataset" })],
      activeDatasetId: "dataset-dollar",
      depthLimit: 3,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    const externalScriptTag = '<script type="module" crossorigin src="/assets/main.js"></script>';
    const html = await composeStandaloneChartDocument({
      templateHtml: `<!doctype html><html><head><title>Template</title></head><body><div id="root"></div>${externalScriptTag}</body></html>`,
      templateUrl: "https://example.test/static_page.html",
      payload,
      title: "Dollar Dataset",
      loadAsset: async () => 'const marker = "$&/"; window.__marker = marker;',
    });

    expect(html).toContain('const marker = "$&/";');
    expect(html).not.toContain(externalScriptTag);
  });
});
