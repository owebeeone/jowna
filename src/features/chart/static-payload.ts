import type { ChartSettings, Dataset, Project } from "../../domain";
import { DEFAULT_CHART_SETTINGS } from "../../grips";

export const STATIC_CHART_PAYLOAD_VERSION = 1;
export const STATIC_CHART_PAYLOAD_GLOBAL = "__JOWNA_STATIC_PAYLOAD__";

export interface StaticChartPayload {
  version: number;
  project: Project;
  datasets: Dataset[];
  activeDatasetId: string | null;
  depthLimit: number;
  chartSettings: ChartSettings;
  focusPath: string[] | null;
}

export interface CreateStaticChartPayloadInput {
  project: Project | null;
  datasets: Dataset[];
  activeDatasetId: string | null;
  depthLimit: number;
  chartSettings: unknown;
  focusPath?: string[] | null;
}

export function createStaticChartPayload(input: CreateStaticChartPayloadInput): StaticChartPayload {
  const datasets = input.datasets.map(cloneDatasetForPayload);
  const activeDatasetId =
    input.activeDatasetId && datasets.some((dataset) => dataset.id === input.activeDatasetId)
      ? input.activeDatasetId
      : (datasets[0]?.id ?? null);
  const resolvedProject = resolveProject(input.project, datasets, activeDatasetId);

  const activeDataset = datasets.find((dataset) => dataset.id === activeDatasetId) ?? null;
  const normalizedFocusPath =
    input.focusPath && input.focusPath.length > 0
      ? normalizePath(input.focusPath)
      : activeDataset
        ? [activeDataset.tree.name]
        : null;

  return {
    version: STATIC_CHART_PAYLOAD_VERSION,
    project: resolvedProject,
    datasets,
    activeDatasetId,
    depthLimit: normalizeDepthLimit(input.depthLimit),
    chartSettings: normalizeChartSettings(input.chartSettings),
    focusPath: normalizedFocusPath,
  };
}

export function resolveStaticChartPayload(raw: unknown): StaticChartPayload {
  if (!isObject(raw)) {
    return createStaticChartPayload({
      project: null,
      datasets: [],
      activeDatasetId: null,
      depthLimit: 0,
      chartSettings: DEFAULT_CHART_SETTINGS,
      focusPath: null,
    });
  }

  const datasets = Array.isArray(raw.datasets)
    ? (raw.datasets.filter(isDatasetLike) as Dataset[])
    : [];
  const activeDatasetId = typeof raw.activeDatasetId === "string" ? raw.activeDatasetId : null;
  const project = isProjectLike(raw.project) ? (raw.project as Project) : null;
  const depthLimit = typeof raw.depthLimit === "number" ? raw.depthLimit : 0;
  const chartSettings = raw.chartSettings;
  const focusPath = Array.isArray(raw.focusPath)
    ? raw.focusPath.filter((segment): segment is string => typeof segment === "string")
    : null;

  return createStaticChartPayload({
    project,
    datasets,
    activeDatasetId,
    depthLimit,
    chartSettings,
    focusPath,
  });
}

export function readStaticChartPayloadFromWindow(source: Window = window): StaticChartPayload {
  const raw = (source as Window & Record<string, unknown>)[STATIC_CHART_PAYLOAD_GLOBAL];
  return resolveStaticChartPayload(raw);
}

export function serializeStaticChartPayload(payload: StaticChartPayload): string {
  return JSON.stringify(payload)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function cloneChartSettings(settings: ChartSettings): ChartSettings {
  return {
    ...settings,
    colorScheme: Array.isArray(settings.colorScheme)
      ? [...settings.colorScheme]
      : settings.colorScheme,
  };
}

function normalizeChartSettings(value: unknown): ChartSettings {
  if (!isObject(value)) {
    return cloneChartSettings(DEFAULT_CHART_SETTINGS);
  }

  const colorSchemeRaw = value.colorScheme;
  const colorScheme = Array.isArray(colorSchemeRaw)
    ? colorSchemeRaw.filter((entry): entry is string => typeof entry === "string")
    : typeof colorSchemeRaw === "string"
      ? colorSchemeRaw
      : DEFAULT_CHART_SETTINGS.colorScheme;

  return {
    background:
      typeof value.background === "string" ? value.background : DEFAULT_CHART_SETTINGS.background,
    borderWidth:
      typeof value.borderWidth === "number"
        ? value.borderWidth
        : DEFAULT_CHART_SETTINGS.borderWidth,
    borderColor:
      typeof value.borderColor === "string"
        ? value.borderColor
        : DEFAULT_CHART_SETTINGS.borderColor,
    wedgeStrokeWidth:
      typeof value.wedgeStrokeWidth === "number"
        ? value.wedgeStrokeWidth
        : DEFAULT_CHART_SETTINGS.wedgeStrokeWidth,
    wedgeStrokeColor:
      typeof value.wedgeStrokeColor === "string"
        ? value.wedgeStrokeColor
        : DEFAULT_CHART_SETTINGS.wedgeStrokeColor,
    collapseRedundant:
      typeof value.collapseRedundant === "boolean"
        ? value.collapseRedundant
        : DEFAULT_CHART_SETTINGS.collapseRedundant,
    fontFamily:
      typeof value.fontFamily === "string" ? value.fontFamily : DEFAULT_CHART_SETTINGS.fontFamily,
    fontSizePx:
      typeof value.fontSizePx === "number" ? value.fontSizePx : DEFAULT_CHART_SETTINGS.fontSizePx,
    width:
      typeof value.width === "number" || value.width === "fit"
        ? value.width
        : DEFAULT_CHART_SETTINGS.width,
    height:
      typeof value.height === "number" || value.height === "fit"
        ? value.height
        : DEFAULT_CHART_SETTINGS.height,
    colorScheme,
  };
}

function cloneDatasetForPayload(dataset: Dataset): Dataset {
  return {
    ...dataset,
    tree: cloneTreeNode(dataset.tree),
    flatTable: dataset.flatTable ? [...dataset.flatTable] : dataset.flatTable,
    importWarnings: dataset.importWarnings ? [...dataset.importWarnings] : dataset.importWarnings,
  };
}

function cloneTreeNode(node: Dataset["tree"]): Dataset["tree"] {
  return {
    ...node,
    attributes: node.attributes ? { ...node.attributes } : node.attributes,
    children: node.children?.map(cloneTreeNode),
  };
}

function normalizeDepthLimit(depthLimit: number): number {
  if (!Number.isFinite(depthLimit) || depthLimit < 0) {
    return 0;
  }
  return Math.floor(depthLimit);
}

function normalizePath(path: string[]): string[] {
  return path.map((segment) => segment.trim()).filter((segment) => segment.length > 0);
}

function resolveProject(
  project: Project | null,
  datasets: Dataset[],
  activeDatasetId: string | null,
): Project {
  const nowIso = new Date().toISOString();
  if (!project) {
    return {
      id: "project-static",
      name: "Jowna Project",
      createdAt: nowIso,
      updatedAt: nowIso,
      datasetIds: datasets.map((dataset) => dataset.id),
      activeDatasetId,
      chartSettings: cloneChartSettings(DEFAULT_CHART_SETTINGS),
    };
  }

  return {
    ...project,
    datasetIds: datasets.map((dataset) => dataset.id),
    activeDatasetId,
    chartSettings: cloneChartSettings(project.chartSettings ?? DEFAULT_CHART_SETTINGS),
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProjectLike(value: unknown): value is Project {
  return isObject(value) && typeof value.id === "string" && typeof value.name === "string";
}

function isDatasetLike(value: unknown): value is Dataset {
  return (
    isObject(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isObject(value.tree) &&
    typeof value.tree.name === "string"
  );
}
