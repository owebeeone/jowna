import { createAtomValueTap, createFunctionTap, type Tap } from "@owebeeone/grip-react";
import type { ChartSettings, Dataset, Project, TreeNode } from "./domain";
import { SunburstChartRenderer } from "./features/chart";
import type { StaticChartPayload } from "./features/chart/static-payload";
import {
  ACTIVE_DATASET,
  ACTIVE_DATASET_ID,
  ACTIVE_DATASET_ID_TAP,
  ACTIVE_PROJECT,
  ACTIVE_PROJECT_ID,
  ACTIVE_PROJECT_ID_TAP,
  APP_VIEW,
  APP_VIEW_TAP,
  CHART_DEPTH_LIMIT,
  CHART_DEPTH_LIMIT_TAP,
  CHART_FOCUS_PATH,
  CHART_FOCUS_PATH_TAP,
  CHART_HOVER_PATH,
  CHART_HOVER_PATH_TAP,
  CHART_HISTORY,
  CHART_HISTORY_INDEX,
  CHART_HISTORY_INDEX_TAP,
  CHART_HISTORY_TAP,
  CHART_LAYOUT,
  CHART_SELECTED_PATH,
  CHART_SELECTED_PATH_TAP,
  CHART_SETTINGS_STATE,
  CHART_SETTINGS_STATE_TAP,
  DATASETS,
  DATASETS_TAP,
  JOWNA_ACTIONS,
  type JownaActions,
  type ProjectImportReport,
  PROJECTS,
  PROJECTS_TAP,
} from "./grips";
import { grok } from "./runtime_graph";

let tapsRegistered = false;

export function registerStaticChartTaps(payload: StaticChartPayload): void {
  if (tapsRegistered) {
    return;
  }
  tapsRegistered = true;

  const chartRenderer = new SunburstChartRenderer();
  const datasets = payload.datasets.map(cloneDataset);
  const project: Project = {
    ...payload.project,
    datasetIds: datasets.map((dataset) => dataset.id),
    activeDatasetId: resolveDatasetId(datasets, payload.activeDatasetId),
  };
  const activeDatasetId = resolveDatasetId(datasets, project.activeDatasetId);
  const focusPath = resolveInitialFocusPath(datasets, activeDatasetId, payload.focusPath);

  const appViewTap = createAtomValueTap(APP_VIEW, {
    initial: "chart",
    handleGrip: APP_VIEW_TAP,
  });
  const projectsTap = createAtomValueTap(PROJECTS, {
    initial: [project],
    handleGrip: PROJECTS_TAP,
  });
  const activeProjectIdTap = createAtomValueTap(ACTIVE_PROJECT_ID, {
    initial: project.id,
    handleGrip: ACTIVE_PROJECT_ID_TAP,
  });
  const datasetsTap = createAtomValueTap(DATASETS, {
    initial: datasets,
    handleGrip: DATASETS_TAP,
  });
  const activeDatasetIdTap = createAtomValueTap(ACTIVE_DATASET_ID, {
    initial: activeDatasetId,
    handleGrip: ACTIVE_DATASET_ID_TAP,
  });
  const chartSettingsTap = createAtomValueTap(CHART_SETTINGS_STATE, {
    initial: cloneChartSettings(payload.chartSettings),
    handleGrip: CHART_SETTINGS_STATE_TAP,
  });
  const chartFocusPathTap = createAtomValueTap(CHART_FOCUS_PATH, {
    initial: focusPath,
    handleGrip: CHART_FOCUS_PATH_TAP,
  });
  const chartSelectedPathTap = createAtomValueTap(CHART_SELECTED_PATH, {
    initial: focusPath,
    handleGrip: CHART_SELECTED_PATH_TAP,
  });
  const chartHoverPathTap = createAtomValueTap(CHART_HOVER_PATH, {
    initial: null,
    handleGrip: CHART_HOVER_PATH_TAP,
  });
  const chartDepthLimitTap = createAtomValueTap(CHART_DEPTH_LIMIT, {
    initial: normalizeDepthLimit(payload.depthLimit),
    handleGrip: CHART_DEPTH_LIMIT_TAP,
  });
  const chartHistoryTap = createAtomValueTap(CHART_HISTORY, {
    initial: focusPath ? [focusPath] : [],
    handleGrip: CHART_HISTORY_TAP,
  });
  const chartHistoryIndexTap = createAtomValueTap(CHART_HISTORY_INDEX, {
    initial: focusPath ? 0 : -1,
    handleGrip: CHART_HISTORY_INDEX_TAP,
  });

  registerAll([
    appViewTap,
    projectsTap,
    activeProjectIdTap,
    datasetsTap,
    activeDatasetIdTap,
    chartSettingsTap,
    chartFocusPathTap,
    chartSelectedPathTap,
    chartHoverPathTap,
    chartDepthLimitTap,
    chartHistoryTap,
    chartHistoryIndexTap,
  ]);

  const activeProjectTap = createFunctionTap({
    provides: [ACTIVE_PROJECT] as any,
    homeParamGrips: [PROJECTS, ACTIVE_PROJECT_ID] as any,
    compute: ({ getHomeParam }: any) => {
      const projects = (getHomeParam(PROJECTS) ?? []) as Project[];
      const activeProjectId = (getHomeParam(ACTIVE_PROJECT_ID) ?? null) as string | null;
      const activeProject = projects.find((candidate) => candidate.id === activeProjectId) ?? null;
      return new Map([[ACTIVE_PROJECT, activeProject]]);
    },
  }) as Tap;

  const activeDatasetTap = createFunctionTap({
    provides: [ACTIVE_DATASET] as any,
    homeParamGrips: [DATASETS, ACTIVE_DATASET_ID] as any,
    compute: ({ getHomeParam }: any) => {
      const allDatasets = (getHomeParam(DATASETS) ?? []) as Dataset[];
      const currentDatasetId = (getHomeParam(ACTIVE_DATASET_ID) ?? null) as string | null;
      const activeDataset = allDatasets.find((dataset) => dataset.id === currentDatasetId) ?? null;
      return new Map([[ACTIVE_DATASET, activeDataset]]);
    },
  }) as Tap;

  const chartLayoutTap = createFunctionTap({
    provides: [CHART_LAYOUT] as any,
    homeParamGrips: [
      ACTIVE_DATASET,
      CHART_SETTINGS_STATE,
      CHART_FOCUS_PATH,
      CHART_DEPTH_LIMIT,
    ] as any,
    compute: ({ getHomeParam }: any) => {
      const activeDataset = (getHomeParam(ACTIVE_DATASET) ?? null) as Dataset | null;
      const settings = getHomeParam(CHART_SETTINGS_STATE) as ChartSettings | null;
      const focusedPath = (getHomeParam(CHART_FOCUS_PATH) ?? null) as string[] | null;
      const depthLimit = (getHomeParam(CHART_DEPTH_LIMIT) ?? 0) as number;

      if (!activeDataset || !settings) {
        return new Map([[CHART_LAYOUT, null]]);
      }

      const layout = chartRenderer.computeLayout({
        root: activeDataset.tree,
        settings,
        focusedPath,
        depthLimit: depthLimit <= 0 ? null : depthLimit,
      });
      return new Map([[CHART_LAYOUT, layout]]);
    },
  }) as Tap;

  registerAll([activeProjectTap, activeDatasetTap, chartLayoutTap]);

  const actions: JownaActions = {
    refreshProjects: async () => {},
    createProject: async () => {},
    copyProject: async () => {},
    deleteProject: async () => {},
    renameProject: async () => {},
    exportProjectArchive: async () => {},
    importProjectArchive: async (): Promise<ProjectImportReport> => ({
      mode: "archive",
      projectName: project.name,
      datasetCount: datasets.length,
      warnings: [],
    }),
    renameDataset: async () => {},
    openProject: async () => {},
    parsePreview: async () => {},
    applyImport: async () => {},
    openChart: (datasetId) => {
      const allDatasets = datasetsTap.get() ?? [];
      const nextDatasetId = resolveDatasetId(allDatasets, datasetId ?? activeDatasetIdTap.get());
      activeDatasetIdTap.set(nextDatasetId);

      const nextDataset = allDatasets.find((dataset) => dataset.id === nextDatasetId) ?? null;
      if (!nextDataset) {
        return;
      }

      const nextRootPath = [nextDataset.tree.name];
      chartFocusPathTap.set(nextRootPath);
      chartSelectedPathTap.set(nextRootPath);
      chartHoverPathTap.set(null);
      chartDepthLimitTap.set(computeTreeMaxDepth(nextDataset.tree));
      chartHistoryTap.set([nextRootPath]);
      chartHistoryIndexTap.set(0);
      appViewTap.set("chart");
    },
    setProjectChartSettings: async (settings) => {
      chartSettingsTap.set(cloneChartSettings(settings));
      projectsTap.update((currentProjects) =>
        currentProjects.map((current) =>
          current.id === project.id
            ? {
                ...current,
                chartSettings: cloneChartSettings(settings),
              }
            : current,
        ),
      );
    },
    backToSelection: () => {},
    focusPath: (path) => {
      const normalized = normalizePath(path);
      if (normalized.length === 0) {
        return;
      }

      const currentDatasetId = activeDatasetIdTap.get();
      const currentDataset =
        (datasetsTap.get() ?? []).find((dataset) => dataset.id === currentDatasetId) ?? null;
      if (currentDataset && !containsTreePath(currentDataset.tree, normalized)) {
        return;
      }

      chartFocusPathTap.set(normalized);
      chartSelectedPathTap.set(normalized);
      chartHoverPathTap.set(null);

      const history = chartHistoryTap.get() ?? [];
      const historyIndex = chartHistoryIndexTap.get() ?? -1;
      const nextHistory = [...history.slice(0, historyIndex + 1), normalized];
      chartHistoryTap.set(nextHistory);
      chartHistoryIndexTap.set(nextHistory.length - 1);
    },
    hoverPath: (path) => {
      chartHoverPathTap.set(path ? normalizePath(path) : null);
    },
    goBack: () => {
      const history = chartHistoryTap.get() ?? [];
      const historyIndex = chartHistoryIndexTap.get() ?? -1;
      if (historyIndex <= 0) {
        return;
      }
      const nextIndex = historyIndex - 1;
      chartHistoryIndexTap.set(nextIndex);
      const path = history[nextIndex] ?? null;
      chartFocusPathTap.set(path);
      chartSelectedPathTap.set(path);
      chartHoverPathTap.set(null);
    },
    goForward: () => {
      const history = chartHistoryTap.get() ?? [];
      const historyIndex = chartHistoryIndexTap.get() ?? -1;
      if (historyIndex >= history.length - 1) {
        return;
      }
      const nextIndex = historyIndex + 1;
      chartHistoryIndexTap.set(nextIndex);
      const path = history[nextIndex] ?? null;
      chartFocusPathTap.set(path);
      chartSelectedPathTap.set(path);
      chartHoverPathTap.set(null);
    },
    clearFocus: () => {
      chartFocusPathTap.set(null);
      chartSelectedPathTap.set(null);
      chartHoverPathTap.set(null);
      chartHistoryTap.set([]);
      chartHistoryIndexTap.set(-1);
    },
  };

  const actionsTap = createFunctionTap({
    provides: [JOWNA_ACTIONS],
    compute: () => new Map([[JOWNA_ACTIONS, actions]]),
  }) as Tap;
  registerAll([actionsTap]);
}

function registerAll(taps: Tap[]): void {
  for (const tap of taps) {
    grok.registerTap(tap);
  }
}

function resolveDatasetId(
  datasets: Dataset[],
  candidate: string | null | undefined,
): string | null {
  if (candidate && datasets.some((dataset) => dataset.id === candidate)) {
    return candidate;
  }
  return datasets[0]?.id ?? null;
}

function resolveInitialFocusPath(
  datasets: Dataset[],
  activeDatasetId: string | null,
  candidateFocusPath: string[] | null,
): string[] | null {
  const dataset = datasets.find((entry) => entry.id === activeDatasetId) ?? null;
  if (!dataset) {
    return null;
  }

  if (candidateFocusPath && containsTreePath(dataset.tree, candidateFocusPath)) {
    return normalizePath(candidateFocusPath);
  }

  return [dataset.tree.name];
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

function containsTreePath(root: TreeNode, path: string[]): boolean {
  const normalizedPath = normalizePath(path);
  if (normalizedPath.length === 0 || normalizedPath[0] !== root.name) {
    return false;
  }

  let cursor: TreeNode = root;
  for (const segment of normalizedPath.slice(1)) {
    const next = cursor.children?.find((child) => child.name === segment);
    if (!next) {
      return false;
    }
    cursor = next;
  }

  return true;
}

function cloneChartSettings(settings: ChartSettings): ChartSettings {
  return {
    ...settings,
    colorScheme: Array.isArray(settings.colorScheme)
      ? [...settings.colorScheme]
      : settings.colorScheme,
  };
}

function computeTreeMaxDepth(root: TreeNode): number {
  if (!root.children || root.children.length === 0) {
    return 1;
  }

  const stack: Array<{ node: TreeNode; depth: number }> = [{ node: root, depth: 1 }];
  let maxDepth = 1;
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    if (current.depth > maxDepth) {
      maxDepth = current.depth;
    }

    for (const child of current.node.children ?? []) {
      stack.push({ node: child, depth: current.depth + 1 });
    }
  }

  return maxDepth;
}

function cloneDataset(dataset: Dataset): Dataset {
  return {
    ...dataset,
    tree: cloneTreeNode(dataset.tree),
    flatTable: dataset.flatTable ? [...dataset.flatTable] : dataset.flatTable,
    importWarnings: dataset.importWarnings ? [...dataset.importWarnings] : dataset.importWarnings,
  };
}

function cloneTreeNode(node: TreeNode): TreeNode {
  return {
    ...node,
    attributes: node.attributes ? { ...node.attributes } : node.attributes,
    children: node.children?.map(cloneTreeNode),
  };
}
