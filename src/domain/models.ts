export type ProjectId = string;
export type DatasetId = string;
export type IsoDateTime = string;

export type SupportedImportFormat = "auto" | "tsv" | "csv" | "json-hierarchy" | "json-flat";
export type ImportSourceKind = "file" | "url";

export interface ImportWarning {
  code: string;
  message: string;
  severity: "warning";
  row?: number;
  column?: string;
}

export interface NormalizedRow {
  rowId: string;
  sourceRow: number;
  magnitude: number;
  path: string[];
  url: string | null;
  description: string | null;
  attributes: Record<string, string>;
}

export interface TreeNode {
  name: string;
  magnitude: number;
  children?: TreeNode[];
  url?: string | null;
  description?: string | null;
  attributes?: Record<string, string>;
  explicitMagnitude?: number | null;
}

export interface Dataset {
  id: DatasetId;
  projectId: ProjectId;
  name: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
  tree: TreeNode;
  sourceFileName?: string;
  sourceFormat?: SupportedImportFormat;
  flatTable?: NormalizedRow[];
  importWarnings?: ImportWarning[];
}

export interface Project {
  id: ProjectId;
  name: string;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
  datasetIds: DatasetId[];
  activeDatasetId: DatasetId | null;
}

export interface ChartSettings {
  background: string;
  borderWidth: number;
  borderColor: string;
  wedgeStrokeWidth: number;
  wedgeStrokeColor: string;
  collapseRedundant: boolean;
  fontFamily: string;
  fontSizePx: number;
  width: number | "fit";
  height: number | "fit";
  colorScheme: string | string[];
}

export interface AppSettings {
  defaultFormat: SupportedImportFormat;
  autoSaveLastProject: boolean;
  savedProjectSort: "updated-desc" | "created-desc" | "name-asc";
}

export interface PersistedSettings {
  chart: ChartSettings;
  app: AppSettings;
}

export interface ImportParameters {
  format: SupportedImportFormat;
  delimiter: string;
  hasHeaderRow: boolean;
  commentPrefix: string;
  magnitudeField: string;
  pathFields: string[];
  urlField: string | null;
  descriptionField: string | null;
  attributeFields: string[];
}

export interface ImportSource {
  kind: ImportSourceKind;
  name: string;
  content: string;
}

export interface TablePreview {
  columns: string[];
  rows: NormalizedRow[];
  totalRows: number;
  truncated: boolean;
}
