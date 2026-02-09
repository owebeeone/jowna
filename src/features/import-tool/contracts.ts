import type {
  Dataset,
  ImportParameters,
  ImportSource,
  ImportWarning,
  TablePreview,
} from "../../domain";

export interface ImportToolState {
  source: ImportSource | null;
  parameters: ImportParameters;
  preview: TablePreview | null;
  warnings: ImportWarning[];
  fatalError: string | null;
  isLoadingPreview: boolean;
  canApplyImport: boolean;
}

export interface ImportToolActions {
  setSource(source: ImportSource): Promise<void>;
  patchParameters(partial: Partial<ImportParameters>): Promise<void>;
  refreshPreview(): Promise<void>;
  applyImport(datasetName: string): Promise<Dataset>;
  clearState(): void;
}

export interface ImportToolController {
  readonly state: ImportToolState;
  readonly actions: ImportToolActions;
}

export interface ImportToolViewProps {
  controller: ImportToolController;
}

