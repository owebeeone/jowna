import { createAtomValueTap, createFunctionTap, type Tap } from "@owebeeone/grip-react";
import type { ChartSettings, Dataset, Project, TreeNode } from "./domain";
import {
  DEFAULT_CHART_SETTINGS,
  DEFAULT_IMPORT_PARAMETERS,
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
  IMPORT_CAN_APPLY,
  IMPORT_CAN_APPLY_TAP,
  IMPORT_DATASET_NAME,
  IMPORT_DATASET_NAME_TAP,
  IMPORT_DETECTED_FORMAT,
  IMPORT_DETECTED_FORMAT_TAP,
  IMPORT_FATAL_ERROR,
  IMPORT_FATAL_ERROR_TAP,
  IMPORT_LOADING,
  IMPORT_LOADING_TAP,
  IMPORT_PARAMETERS,
  IMPORT_PARAMETERS_TAP,
  IMPORT_POPOVER_OPEN,
  IMPORT_POPOVER_OPEN_TAP,
  IMPORT_PREVIEW_STATE,
  IMPORT_PREVIEW_STATE_TAP,
  IMPORT_ROWS,
  IMPORT_ROWS_TAP,
  IMPORT_SOURCE,
  IMPORT_SOURCE_TAP,
  IMPORT_TREE,
  IMPORT_TREE_TAP,
  IMPORT_URL_INPUT,
  IMPORT_URL_INPUT_TAP,
  IMPORT_WARNINGS_STATE,
  IMPORT_WARNINGS_STATE_TAP,
  JOWNA_ACTIONS,
  type JownaActions,
  type ProjectImportReport,
  NEW_PROJECT_NAME,
  NEW_PROJECT_NAME_TAP,
  PREVIEW_FILTER,
  PREVIEW_FILTER_TAP,
  PROJECTS,
  PROJECTS_TAP,
} from "./grips";
import { createDefaultParserRegistry, DefaultParseImportService } from "./parsers";
import { grok } from "./runtime_graph";
import { createIndexedDbStorageGateway } from "./storage/indexeddb";
import { SunburstChartRenderer } from "./features/chart";
import {
  createProjectArchive,
  looksLikeKronaHtml,
  materializeParsedKronaHtmlProject,
  parseKronaHtmlProject,
  materializeImportedProject,
  parseProjectArchive,
  PROJECT_ARCHIVE_MIME_TYPE,
  serializeProjectArchive,
  toProjectArchiveFileName,
} from "./features/file-manager";

let tapsRegistered = false;

export function registerJownaTaps(): void {
  if (tapsRegistered) {
    return;
  }
  tapsRegistered = true;

  const storage = createIndexedDbStorageGateway();
  const parserService = new DefaultParseImportService(createDefaultParserRegistry());
  const chartRenderer = new SunburstChartRenderer();

  const appViewTap = createAtomValueTap(APP_VIEW, {
    initial: APP_VIEW.defaultValue ?? "selection",
    handleGrip: APP_VIEW_TAP,
  });
  const projectsTap = createAtomValueTap(PROJECTS, {
    initial: PROJECTS.defaultValue ?? [],
    handleGrip: PROJECTS_TAP,
  });
  const activeProjectIdTap = createAtomValueTap(ACTIVE_PROJECT_ID, {
    initial: ACTIVE_PROJECT_ID.defaultValue ?? null,
    handleGrip: ACTIVE_PROJECT_ID_TAP,
  });
  const datasetsTap = createAtomValueTap(DATASETS, {
    initial: DATASETS.defaultValue ?? [],
    handleGrip: DATASETS_TAP,
  });
  const activeDatasetIdTap = createAtomValueTap(ACTIVE_DATASET_ID, {
    initial: ACTIVE_DATASET_ID.defaultValue ?? null,
    handleGrip: ACTIVE_DATASET_ID_TAP,
  });

  const importSourceTap = createAtomValueTap(IMPORT_SOURCE, {
    initial: IMPORT_SOURCE.defaultValue ?? null,
    handleGrip: IMPORT_SOURCE_TAP,
  });
  const importUrlInputTap = createAtomValueTap(IMPORT_URL_INPUT, {
    initial: IMPORT_URL_INPUT.defaultValue ?? "",
    handleGrip: IMPORT_URL_INPUT_TAP,
  });
  const importParametersTap = createAtomValueTap(IMPORT_PARAMETERS, {
    initial: IMPORT_PARAMETERS.defaultValue ?? DEFAULT_IMPORT_PARAMETERS,
    handleGrip: IMPORT_PARAMETERS_TAP,
  });
  const importDetectedFormatTap = createAtomValueTap(IMPORT_DETECTED_FORMAT, {
    initial: IMPORT_DETECTED_FORMAT.defaultValue ?? null,
    handleGrip: IMPORT_DETECTED_FORMAT_TAP,
  });
  const importRowsTap = createAtomValueTap(IMPORT_ROWS, {
    initial: IMPORT_ROWS.defaultValue ?? [],
    handleGrip: IMPORT_ROWS_TAP,
  });
  const importTreeTap = createAtomValueTap(IMPORT_TREE, {
    initial: IMPORT_TREE.defaultValue ?? null,
    handleGrip: IMPORT_TREE_TAP,
  });
  const importPreviewTap = createAtomValueTap(IMPORT_PREVIEW_STATE, {
    initial: IMPORT_PREVIEW_STATE.defaultValue ?? null,
    handleGrip: IMPORT_PREVIEW_STATE_TAP,
  });
  const importWarningsTap = createAtomValueTap(IMPORT_WARNINGS_STATE, {
    initial: IMPORT_WARNINGS_STATE.defaultValue ?? [],
    handleGrip: IMPORT_WARNINGS_STATE_TAP,
  });
  const importFatalTap = createAtomValueTap(IMPORT_FATAL_ERROR, {
    initial: IMPORT_FATAL_ERROR.defaultValue ?? null,
    handleGrip: IMPORT_FATAL_ERROR_TAP,
  });
  const importLoadingTap = createAtomValueTap(IMPORT_LOADING, {
    initial: IMPORT_LOADING.defaultValue ?? false,
    handleGrip: IMPORT_LOADING_TAP,
  });
  const importCanApplyTap = createAtomValueTap(IMPORT_CAN_APPLY, {
    initial: IMPORT_CAN_APPLY.defaultValue ?? false,
    handleGrip: IMPORT_CAN_APPLY_TAP,
  });
  const importDatasetNameTap = createAtomValueTap(IMPORT_DATASET_NAME, {
    initial: IMPORT_DATASET_NAME.defaultValue ?? "",
    handleGrip: IMPORT_DATASET_NAME_TAP,
  });
  const importPopoverOpenTap = createAtomValueTap(IMPORT_POPOVER_OPEN, {
    initial: IMPORT_POPOVER_OPEN.defaultValue ?? false,
    handleGrip: IMPORT_POPOVER_OPEN_TAP,
  });
  const previewFilterTap = createAtomValueTap(PREVIEW_FILTER, {
    initial: PREVIEW_FILTER.defaultValue ?? "",
    handleGrip: PREVIEW_FILTER_TAP,
  });

  const newProjectNameTap = createAtomValueTap(NEW_PROJECT_NAME, {
    initial: NEW_PROJECT_NAME.defaultValue ?? "",
    handleGrip: NEW_PROJECT_NAME_TAP,
  });

  const chartSettingsTap = createAtomValueTap(CHART_SETTINGS_STATE, {
    initial: CHART_SETTINGS_STATE.defaultValue ?? DEFAULT_CHART_SETTINGS,
    handleGrip: CHART_SETTINGS_STATE_TAP,
  });
  let defaultProjectChartSettings = cloneChartSettings(
    CHART_SETTINGS_STATE.defaultValue ?? DEFAULT_CHART_SETTINGS,
  );
  const chartFocusPathTap = createAtomValueTap(CHART_FOCUS_PATH, {
    initial: CHART_FOCUS_PATH.defaultValue ?? null,
    handleGrip: CHART_FOCUS_PATH_TAP,
  });
  const chartSelectedPathTap = createAtomValueTap(CHART_SELECTED_PATH, {
    initial: CHART_SELECTED_PATH.defaultValue ?? null,
    handleGrip: CHART_SELECTED_PATH_TAP,
  });
  const chartHoverPathTap = createAtomValueTap(CHART_HOVER_PATH, {
    initial: CHART_HOVER_PATH.defaultValue ?? null,
    handleGrip: CHART_HOVER_PATH_TAP,
  });
  const chartDepthLimitTap = createAtomValueTap(CHART_DEPTH_LIMIT, {
    initial: CHART_DEPTH_LIMIT.defaultValue ?? 6,
    handleGrip: CHART_DEPTH_LIMIT_TAP,
  });
  const chartHistoryTap = createAtomValueTap(CHART_HISTORY, {
    initial: CHART_HISTORY.defaultValue ?? [],
    handleGrip: CHART_HISTORY_TAP,
  });
  const chartHistoryIndexTap = createAtomValueTap(CHART_HISTORY_INDEX, {
    initial: CHART_HISTORY_INDEX.defaultValue ?? -1,
    handleGrip: CHART_HISTORY_INDEX_TAP,
  });

  registerAll([
    appViewTap,
    projectsTap,
    activeProjectIdTap,
    datasetsTap,
    activeDatasetIdTap,
    importSourceTap,
    importUrlInputTap,
    importParametersTap,
    importDetectedFormatTap,
    importRowsTap,
    importTreeTap,
    importPreviewTap,
    importWarningsTap,
    importFatalTap,
    importLoadingTap,
    importCanApplyTap,
    importDatasetNameTap,
    importPopoverOpenTap,
    previewFilterTap,
    newProjectNameTap,
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
      const activeProject = projects.find((project) => project.id === activeProjectId) ?? null;
      return new Map([[ACTIVE_PROJECT, activeProject]]);
    },
  }) as Tap;

  const activeDatasetTap = createFunctionTap({
    provides: [ACTIVE_DATASET] as any,
    homeParamGrips: [DATASETS, ACTIVE_DATASET_ID] as any,
    compute: ({ getHomeParam }: any) => {
      const datasets = (getHomeParam(DATASETS) ?? []) as Dataset[];
      const activeDatasetId = (getHomeParam(ACTIVE_DATASET_ID) ?? null) as string | null;
      const activeDataset = datasets.find((dataset) => dataset.id === activeDatasetId) ?? null;
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
      const dataset = (getHomeParam(ACTIVE_DATASET) ?? null) as Dataset | null;
      const settings = getHomeParam(CHART_SETTINGS_STATE);
      const focusedPath = (getHomeParam(CHART_FOCUS_PATH) ?? null) as string[] | null;
      const depthLimit = (getHomeParam(CHART_DEPTH_LIMIT) ?? 0) as number;
      if (!dataset || !settings) {
        return new Map([[CHART_LAYOUT, null]]);
      }

      const layout = chartRenderer.computeLayout({
        root: dataset.tree,
        settings,
        focusedPath,
        depthLimit: depthLimit <= 0 ? null : depthLimit,
      });
      return new Map([[CHART_LAYOUT, layout]]);
    },
  }) as Tap;

  registerAll([activeProjectTap, activeDatasetTap, chartLayoutTap]);

  const actions: JownaActions = {
    refreshProjects: async () => {
      const projects = sortProjects(await storage.projects.listProjects());
      projectsTap.set(projects);

      const currentActiveId = activeProjectIdTap.get();
      const nextActiveId =
        currentActiveId && projects.some((project) => project.id === currentActiveId)
          ? currentActiveId
          : (projects[0]?.id ?? null);

      activeProjectIdTap.set(nextActiveId);
      if (nextActiveId) {
        await loadDatasetsForProject(nextActiveId);
      } else {
        datasetsTap.set([]);
        activeDatasetIdTap.set(null);
        chartSettingsTap.set(cloneChartSettings(defaultProjectChartSettings));
        importPopoverOpenTap.set(true);
      }
    },

    createProject: async (name) => {
      const projectName = normalizeNonEmpty(name, "Untitled Project");
      const timestamp = nowIso();
      const project: Project = {
        id: createId("project"),
        name: projectName,
        createdAt: timestamp,
        updatedAt: timestamp,
        datasetIds: [],
        activeDatasetId: null,
        chartSettings: cloneChartSettings(chartSettingsTap.get() ?? defaultProjectChartSettings),
      };

      await storage.projects.saveProject(project);
      await actions.refreshProjects();
      await actions.openProject(project.id);
      newProjectNameTap.set("");
    },

    copyProject: async (projectId, nextName) => {
      const sourceProject = await storage.projects.getProject(projectId);
      const copyName = normalizeNonEmpty(
        nextName ?? `${sourceProject?.name ?? "Project"} Copy`,
        "Project Copy",
      );
      const copiedProject = await storage.projects.copyProject(projectId, copyName);
      await actions.refreshProjects();
      await actions.openProject(copiedProject.id);
    },

    deleteProject: async (projectId) => {
      await storage.projects.deleteProject(projectId);
      await actions.refreshProjects();
    },

    renameProject: async (projectId, nextName) => {
      const project = await storage.projects.getProject(projectId);
      if (!project) {
        throw new Error(`Project '${projectId}' no longer exists.`);
      }

      const name = normalizeNonEmpty(nextName, project.name);
      if (name === project.name) {
        return;
      }

      await storage.projects.saveProject({
        ...project,
        name,
      });

      await actions.refreshProjects();
    },

    exportProjectArchive: async (projectId) => {
      const project = await storage.projects.getProject(projectId);
      if (!project) {
        throw new Error(`Project '${projectId}' no longer exists.`);
      }

      const projectDatasets = await storage.datasets.listByProject(projectId);
      const datasetById = new Map(projectDatasets.map((dataset) => [dataset.id, dataset]));
      const orderedDatasetIds = uniqueIds([
        ...project.datasetIds,
        ...projectDatasets.map((d) => d.id),
      ]);
      const orderedDatasets = orderedDatasetIds
        .map((datasetId) => datasetById.get(datasetId))
        .filter((dataset): dataset is Dataset => Boolean(dataset));

      const archive = createProjectArchive({
        project,
        datasets: orderedDatasets,
        exportedAt: nowIso(),
      });
      const serialized = serializeProjectArchive(archive);
      downloadTextFile(
        toProjectArchiveFileName(project.name),
        serialized,
        PROJECT_ARCHIVE_MIME_TYPE,
      );
    },

    importProjectArchive: async (file) => {
      const raw = await file.text();

      const importFromArchive = async (): Promise<ProjectImportReport> => {
        const archive = parseProjectArchive(raw);
        const timestamp = nowIso();
        const imported = materializeImportedProject({
          archive,
          nowIso: timestamp,
          createId,
        });

        for (const dataset of imported.datasets) {
          await storage.datasets.saveDataset(dataset);
        }
        await storage.projects.saveProject(imported.project);
        await actions.refreshProjects();
        await actions.openProject(imported.project.id);

        return {
          mode: "archive",
          projectName: imported.project.name,
          datasetCount: imported.datasets.length,
          warnings: [],
        };
      };

      const importFromKronaHtml = async (): Promise<ProjectImportReport> => {
        const parsed = parseKronaHtmlProject({
          name: file.name,
          content: raw,
        });
        const timestamp = nowIso();
        const imported = materializeParsedKronaHtmlProject({
          parsed,
          nowIso: timestamp,
          createId,
        });

        for (const dataset of imported.datasets) {
          await storage.datasets.saveDataset(dataset);
        }
        await storage.projects.saveProject(imported.project);
        await actions.refreshProjects();
        await actions.openProject(imported.project.id);

        return {
          mode: "krona-html",
          projectName: imported.project.name,
          datasetCount: imported.datasets.length,
          warnings: imported.warnings,
        };
      };

      if (looksLikeKronaHtml(file.name, raw)) {
        try {
          return await importFromKronaHtml();
        } catch (kronaError) {
          try {
            return await importFromArchive();
          } catch {
            throw kronaError;
          }
        }
      }

      try {
        return await importFromArchive();
      } catch (archiveError) {
        try {
          return await importFromKronaHtml();
        } catch (kronaError) {
          throw new Error(
            `Unsupported import file. Archive parse failed: ${toErrorMessage(archiveError)}. ` +
              `Krona HTML parse failed: ${toErrorMessage(kronaError)}.`,
          );
        }
      }
    },

    renameDataset: async (datasetId, nextName) => {
      const dataset = await storage.datasets.getDataset(datasetId);
      if (!dataset) {
        throw new Error(`Dataset '${datasetId}' no longer exists.`);
      }

      const name = normalizeNonEmpty(nextName, dataset.name);
      if (name === dataset.name) {
        return;
      }

      await storage.datasets.saveDataset({
        ...dataset,
        name,
      });

      await actions.refreshProjects();
    },

    openProject: async (projectId) => {
      activeProjectIdTap.set(projectId);
      await loadDatasetsForProject(projectId);
      appViewTap.set("selection");
    },

    parsePreview: async () => {
      const source = importSourceTap.get();
      const parameters = importParametersTap.get() ?? DEFAULT_IMPORT_PARAMETERS;
      if (!source || source.content.trim().length === 0) {
        importFatalTap.set("Select a source file or URL before parsing.");
        importPreviewTap.set(null);
        importWarningsTap.set([]);
        importCanApplyTap.set(false);
        return;
      }

      importLoadingTap.set(true);
      importFatalTap.set(null);
      try {
        const result = await parserService.parse({
          source,
          parameters,
        });

        importDetectedFormatTap.set(result.detectedFormat);
        importRowsTap.set(result.normalizedRows);
        importTreeTap.set(result.tree);
        importPreviewTap.set(result.preview);
        importWarningsTap.set(result.warnings);

        const hasUsableData =
          result.normalizedRows.length > 0 ||
          result.tree.magnitude > 0 ||
          (result.tree.children?.length ?? 0) > 0;

        importCanApplyTap.set(hasUsableData);
        importFatalTap.set(hasUsableData ? null : "No usable rows found.");
      } catch (error) {
        importDetectedFormatTap.set(null);
        importRowsTap.set([]);
        importTreeTap.set(null);
        importPreviewTap.set(null);
        importWarningsTap.set([]);
        importCanApplyTap.set(false);
        importFatalTap.set((error as Error).message);
      } finally {
        importLoadingTap.set(false);
      }
    },

    applyImport: async (datasetName) => {
      const projectId = activeProjectIdTap.get();
      const tree = importTreeTap.get();
      const rows = importRowsTap.get() ?? [];
      const warnings = importWarningsTap.get() ?? [];
      const source = importSourceTap.get();
      const detectedFormat = importDetectedFormatTap.get() ?? undefined;

      if (!projectId) {
        throw new Error("Select or create a project before applying import.");
      }
      if (!tree) {
        throw new Error("Parse preview before applying import.");
      }

      const timestamp = nowIso();
      const name = normalizeNonEmpty(datasetName, "Imported Dataset");
      const dataset: Dataset = {
        id: createId("dataset"),
        projectId,
        name,
        createdAt: timestamp,
        updatedAt: timestamp,
        tree,
        sourceFileName: source?.name,
        sourceFormat: detectedFormat,
        flatTable: rows,
        importWarnings: warnings,
      };

      await storage.datasets.saveDataset(dataset);

      const project = await storage.projects.getProject(projectId);
      if (!project) {
        throw new Error(`Project '${projectId}' no longer exists.`);
      }

      const nextProject: Project = {
        ...project,
        datasetIds: uniqueIds([...project.datasetIds, dataset.id]),
        activeDatasetId: dataset.id,
        updatedAt: timestamp,
      };

      await storage.projects.saveProject(nextProject);
      await actions.refreshProjects();
      await actions.openChart(dataset.id);
      importDatasetNameTap.set(name);
      importPopoverOpenTap.set(false);
    },

    openChart: (datasetId) => {
      const resolvedDatasetId = datasetId ?? activeDatasetIdTap.get();
      if (resolvedDatasetId) {
        activeDatasetIdTap.set(resolvedDatasetId);
        const datasets = datasetsTap.get() ?? [];
        const dataset = datasets.find((entry) => entry.id === resolvedDatasetId) ?? null;
        if (dataset) {
          chartDepthLimitTap.set(computeTreeMaxDepth(dataset.tree));
        }
      }
      appViewTap.set("chart");
    },

    setProjectChartSettings: async (settings) => {
      const activeProjectId = activeProjectIdTap.get();
      chartSettingsTap.set(cloneChartSettings(settings));

      if (!activeProjectId) {
        return;
      }

      const project = await storage.projects.getProject(activeProjectId);
      if (!project) {
        return;
      }

      await storage.projects.saveProject({
        ...project,
        chartSettings: cloneChartSettings(settings),
      });

      projectsTap.update((projects) =>
        projects.map((current) =>
          current.id === activeProjectId
            ? {
                ...current,
                chartSettings: cloneChartSettings(settings),
              }
            : current,
        ),
      );
    },

    backToSelection: () => {
      appViewTap.set("selection");
    },

    focusPath: (path) => {
      const normalized = normalizePath(path);
      if (normalized.length === 0) {
        return;
      }

      const activeDatasetId = activeDatasetIdTap.get();
      const activeDataset =
        (datasetsTap.get() ?? []).find((dataset) => dataset.id === activeDatasetId) ?? null;
      if (activeDataset && !containsTreePath(activeDataset.tree, normalized)) {
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
  });
  registerAll([actionsTap]);

  void bootstrap();

  async function bootstrap(): Promise<void> {
    const settings = await storage.settings.loadSettings();
    if (settings?.chart) {
      defaultProjectChartSettings = cloneChartSettings(settings.chart);
      chartSettingsTap.set(defaultProjectChartSettings);
    } else {
      await storage.settings.saveSettings({
        chart: chartSettingsTap.get() ?? DEFAULT_CHART_SETTINGS,
        app: {
          defaultFormat: "tsv",
          autoSaveLastProject: true,
          savedProjectSort: "updated-desc",
        },
      });
    }

    await actions.refreshProjects();
  }

  async function loadDatasetsForProject(projectId: string): Promise<void> {
    const datasets = sortDatasets(await storage.datasets.listByProject(projectId));
    datasetsTap.set(datasets);
    if (datasets.length === 0) {
      importPopoverOpenTap.set(true);
    }

    const project = await storage.projects.getProject(projectId);
    const projectChartSettings = project?.chartSettings ?? defaultProjectChartSettings;
    chartSettingsTap.set(cloneChartSettings(projectChartSettings));
    const preferredDatasetId = project?.activeDatasetId ?? null;
    const nextDatasetId =
      preferredDatasetId && datasets.some((dataset) => dataset.id === preferredDatasetId)
        ? preferredDatasetId
        : (datasets[0]?.id ?? null);

    activeDatasetIdTap.set(nextDatasetId);
    if (!project) {
      return;
    }

    if (project.activeDatasetId !== nextDatasetId) {
      await storage.projects.saveProject({
        ...project,
        activeDatasetId: nextDatasetId,
        updatedAt: nowIso(),
      });
    }
  }
}

function registerAll(taps: readonly Tap[]): void {
  taps.forEach((tap) => {
    grok.registerTap(tap);
  });
}

function createId(prefix: "project" | "dataset"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function sortDatasets(datasets: Dataset[]): Dataset[] {
  return [...datasets].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function uniqueIds(values: string[]): string[] {
  return [...new Set(values)];
}

function normalizeNonEmpty(value: string, fallback: string): string {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : fallback;
}

function normalizePath(path: string[]): string[] {
  return path.map((segment) => segment.trim()).filter((segment) => segment.length > 0);
}

function containsTreePath(root: TreeNode, path: string[]): boolean {
  if (path.length === 0 || path[0] !== root.name) {
    return false;
  }

  let cursor: TreeNode = root;
  for (let index = 1; index < path.length; index += 1) {
    const next = cursor.children?.find((child) => child.name === path[index]);
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
  return visitTreeDepth(root, 0);
}

function visitTreeDepth(node: TreeNode, depth: number): number {
  const children = node.children ?? [];
  if (children.length === 0) {
    return depth;
  }

  let maxDepth = depth;
  for (const child of children) {
    const childDepth = visitTreeDepth(child, depth + 1);
    if (childDepth > maxDepth) {
      maxDepth = childDepth;
    }
  }
  return maxDepth;
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  return "Unknown error";
}

function downloadTextFile(fileName: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = "noopener";
  anchor.click();

  URL.revokeObjectURL(url);
}
