import type {
  AppSettings,
  ChartSettings,
  Dataset,
  ImportParameters,
  ImportWarning,
  Project,
  TablePreview,
} from "./domain";

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

