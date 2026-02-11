import type { AtomTapHandle } from "@owebeeone/grip-react";
import type {
  AppSettings,
  ChartSettings,
  Dataset,
  ImportParameters,
  ImportSource,
  ImportWarning,
  NormalizedRow,
  Project,
  SupportedImportFormat,
  TablePreview,
  TreeNode,
} from "./domain";
import type { ChartLayoutResult } from "./features/chart";
import { defineGrip } from "./runtime_graph";

export type AppView = "selection" | "chart";

export interface ProjectImportReport {
  mode: "archive" | "krona-html";
  projectName: string;
  datasetCount: number;
  warnings: ImportWarning[];
}

export interface JownaActions {
  refreshProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  copyProject: (projectId: string, nextName?: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  deleteAllProjects: () => Promise<void>;
  renameProject: (projectId: string, nextName: string) => Promise<void>;
  exportProjectArchive: (projectId: string) => Promise<void>;
  exportProjectDatasetsZip: (projectId: string) => Promise<void>;
  importProjectArchive: (file: File) => Promise<ProjectImportReport>;
  renameDataset: (datasetId: string, nextName: string) => Promise<void>;
  openProject: (projectId: string) => Promise<void>;
  parsePreview: () => Promise<{
    canApply: boolean;
    fatalError: string | null;
    warnings: ImportWarning[];
    preview: TablePreview | null;
  }>;
  applyImport: (
    datasetName: string,
    options?: {
      openChart?: boolean;
      closePopover?: boolean;
    },
  ) => Promise<void>;
  openChart: (datasetId?: string | null) => void;
  setProjectChartSettings: (settings: ChartSettings) => Promise<void>;
  backToSelection: () => void;
  focusPath: (path: string[]) => void;
  hoverPath: (path: string[] | null) => void;
  goBack: () => void;
  goForward: () => void;
  clearFocus: () => void;
}

export const DEFAULT_CHART_SETTINGS: ChartSettings = {
  background: "#f6f8f7",
  borderWidth: 0,
  borderColor: "#b7c2bc",
  wedgeStrokeWidth: 1,
  wedgeStrokeColor: "#ffffff",
  collapseRedundant: true,
  fontFamily: "sans-serif",
  fontSizePx: 12,
  width: "fit",
  height: "fit",
  colorScheme: ["#0f6b48", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
};

export const DEFAULT_APP_SETTINGS: AppSettings = {
  defaultFormat: "tsv",
  autoSaveLastProject: true,
  savedProjectSort: "updated-desc",
};

export const DEFAULT_IMPORT_PARAMETERS: ImportParameters = {
  format: "auto",
  delimiter: ",",
  hasHeaderRow: true,
  commentPrefix: "#",
  magnitudeField: "magnitude",
  pathFields: ["level1", "level2"],
  urlField: "url",
  descriptionField: "description",
  attributeFields: [],
};

export interface JownaGripState {
  projects: Project[];
  activeProjectId: string | null;
  activeDataset: Dataset | null;
  chartSettings: ChartSettings | null;
  appSettings: AppSettings | null;
  importParameters: ImportParameters | null;
  importPreview: TablePreview | null;
  importWarnings: ImportWarning[];
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

export type JownaGripKey = keyof JownaGripState;

export interface GripContract<K extends JownaGripKey> {
  key: K;
  description: string;
  initialValue: JownaGripState[K];
}

export type JownaGripContracts = {
  [K in JownaGripKey]: GripContract<K>;
};

export function createDefaultGripState(): JownaGripState {
  return {
    projects: [],
    activeProjectId: null,
    activeDataset: null,
    chartSettings: null,
    appSettings: null,
    importParameters: null,
    importPreview: null,
    importWarnings: [],
    loading: {},
    errors: {},
  };
}

export function createGripContracts(
  initialState: JownaGripState = createDefaultGripState(),
): JownaGripContracts {
  const keys = Object.keys(initialState) as JownaGripKey[];
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        key,
        description: `Grip for ${key}`,
        initialValue: initialState[key],
      },
    ]),
  ) as JownaGripContracts;
}

// App navigation
export const APP_VIEW = defineGrip<AppView>("AppView", "selection");
export const APP_VIEW_TAP = defineGrip<AtomTapHandle<AppView>>("AppView.Tap");

// Projects + datasets
export const PROJECTS = defineGrip<Project[]>("Projects", []);
export const PROJECTS_TAP = defineGrip<AtomTapHandle<Project[]>>("Projects.Tap");
export const ACTIVE_PROJECT_ID = defineGrip<string | null>("ActiveProjectId", null);
export const ACTIVE_PROJECT_ID_TAP =
  defineGrip<AtomTapHandle<string | null>>("ActiveProjectId.Tap");
export const ACTIVE_PROJECT = defineGrip<Project | null>("ActiveProject", null);

export const DATASETS = defineGrip<Dataset[]>("Datasets", []);
export const DATASETS_TAP = defineGrip<AtomTapHandle<Dataset[]>>("Datasets.Tap");
export const ACTIVE_DATASET_ID = defineGrip<string | null>("ActiveDatasetId", null);
export const ACTIVE_DATASET_ID_TAP =
  defineGrip<AtomTapHandle<string | null>>("ActiveDatasetId.Tap");
export const ACTIVE_DATASET = defineGrip<Dataset | null>("ActiveDataset", null);

export const NEW_PROJECT_NAME = defineGrip<string>("NewProjectName", "");
export const NEW_PROJECT_NAME_TAP = defineGrip<AtomTapHandle<string>>("NewProjectName.Tap");

// Import tool
export const IMPORT_SOURCE = defineGrip<ImportSource | null>("ImportSource", null);
export const IMPORT_SOURCE_TAP = defineGrip<AtomTapHandle<ImportSource | null>>("ImportSource.Tap");
export const IMPORT_URL_INPUT = defineGrip<string>("ImportUrlInput", "");
export const IMPORT_URL_INPUT_TAP = defineGrip<AtomTapHandle<string>>("ImportUrlInput.Tap");

export const IMPORT_PARAMETERS = defineGrip<ImportParameters>(
  "ImportParameters",
  DEFAULT_IMPORT_PARAMETERS,
);
export const IMPORT_PARAMETERS_TAP =
  defineGrip<AtomTapHandle<ImportParameters>>("ImportParameters.Tap");

export const IMPORT_DETECTED_FORMAT = defineGrip<SupportedImportFormat | null>(
  "ImportDetectedFormat",
  null,
);
export const IMPORT_DETECTED_FORMAT_TAP = defineGrip<AtomTapHandle<SupportedImportFormat | null>>(
  "ImportDetectedFormat.Tap",
);

export const IMPORT_ROWS = defineGrip<NormalizedRow[]>("ImportRows", []);
export const IMPORT_ROWS_TAP = defineGrip<AtomTapHandle<NormalizedRow[]>>("ImportRows.Tap");

export const IMPORT_TREE = defineGrip<TreeNode | null>("ImportTree", null);
export const IMPORT_TREE_TAP = defineGrip<AtomTapHandle<TreeNode | null>>("ImportTree.Tap");

export const IMPORT_PREVIEW_STATE = defineGrip<TablePreview | null>("ImportPreviewState", null);
export const IMPORT_PREVIEW_STATE_TAP =
  defineGrip<AtomTapHandle<TablePreview | null>>("ImportPreviewState.Tap");

export const IMPORT_WARNINGS_STATE = defineGrip<ImportWarning[]>("ImportWarningsState", []);
export const IMPORT_WARNINGS_STATE_TAP =
  defineGrip<AtomTapHandle<ImportWarning[]>>("ImportWarningsState.Tap");

export const IMPORT_FATAL_ERROR = defineGrip<string | null>("ImportFatalError", null);
export const IMPORT_FATAL_ERROR_TAP =
  defineGrip<AtomTapHandle<string | null>>("ImportFatalError.Tap");

export const IMPORT_LOADING = defineGrip<boolean>("ImportLoading", false);
export const IMPORT_LOADING_TAP = defineGrip<AtomTapHandle<boolean>>("ImportLoading.Tap");
export const IMPORT_CAN_APPLY = defineGrip<boolean>("ImportCanApply", false);
export const IMPORT_CAN_APPLY_TAP = defineGrip<AtomTapHandle<boolean>>("ImportCanApply.Tap");

export const IMPORT_DATASET_NAME = defineGrip<string>("ImportDatasetName", "");
export const IMPORT_DATASET_NAME_TAP = defineGrip<AtomTapHandle<string>>("ImportDatasetName.Tap");

export const PREVIEW_FILTER = defineGrip<string>("PreviewFilter", "");
export const PREVIEW_FILTER_TAP = defineGrip<AtomTapHandle<string>>("PreviewFilter.Tap");

export const IMPORT_POPOVER_OPEN = defineGrip<boolean>("ImportPopoverOpen", false);
export const IMPORT_POPOVER_OPEN_TAP = defineGrip<AtomTapHandle<boolean>>("ImportPopoverOpen.Tap");
export const ROUTE_LOAD_ERROR = defineGrip<string | null>("RouteLoadError", null);
export const ROUTE_LOAD_ERROR_TAP =
  defineGrip<AtomTapHandle<string | null>>("RouteLoadError.Tap");

// Chart
export const CHART_SETTINGS_STATE = defineGrip<ChartSettings>(
  "ChartSettingsState",
  DEFAULT_CHART_SETTINGS,
);
export const CHART_SETTINGS_STATE_TAP =
  defineGrip<AtomTapHandle<ChartSettings>>("ChartSettingsState.Tap");

export const CHART_FOCUS_PATH = defineGrip<string[] | null>("ChartFocusPath", null);
export const CHART_FOCUS_PATH_TAP =
  defineGrip<AtomTapHandle<string[] | null>>("ChartFocusPath.Tap");

export const CHART_SELECTED_PATH = defineGrip<string[] | null>("ChartSelectedPath", null);
export const CHART_SELECTED_PATH_TAP =
  defineGrip<AtomTapHandle<string[] | null>>("ChartSelectedPath.Tap");

export const CHART_HOVER_PATH = defineGrip<string[] | null>("ChartHoverPath", null);
export const CHART_HOVER_PATH_TAP =
  defineGrip<AtomTapHandle<string[] | null>>("ChartHoverPath.Tap");

export const CHART_DEPTH_LIMIT = defineGrip<number>("ChartDepthLimit", 6);
export const CHART_DEPTH_LIMIT_TAP = defineGrip<AtomTapHandle<number>>("ChartDepthLimit.Tap");

export const CHART_HISTORY = defineGrip<string[][]>("ChartHistory", []);
export const CHART_HISTORY_TAP = defineGrip<AtomTapHandle<string[][]>>("ChartHistory.Tap");

export const CHART_HISTORY_INDEX = defineGrip<number>("ChartHistoryIndex", -1);
export const CHART_HISTORY_INDEX_TAP = defineGrip<AtomTapHandle<number>>("ChartHistoryIndex.Tap");

export const CHART_LAYOUT = defineGrip<ChartLayoutResult | null>("ChartLayout", null);

// Actions
export const JOWNA_ACTIONS = defineGrip<JownaActions>("JownaActions");
