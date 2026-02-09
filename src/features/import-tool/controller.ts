import type { Dataset, ImportParameters } from "../../domain";
import type { ParseResult } from "../../parsers";
import type { ParseImportService } from "../../parsers";
import type { DatasetRepository } from "../../storage/indexeddb";
import type { ImportToolActions, ImportToolController, ImportToolState } from "./contracts";

export interface ImportToolControllerOptions {
  parseService: ParseImportService;
  datasetRepository?: DatasetRepository;
  activeProjectId?: string | null;
  initialParameters?: ImportParameters;
  now?: () => string;
  createDatasetId?: () => string;
}

export function createImportToolController(
  options: ImportToolControllerOptions,
): ImportToolController {
  const now = options.now ?? (() => new Date().toISOString());
  const createDatasetId = options.createDatasetId ?? (() => defaultEntityId("dataset"));
  const state: ImportToolState = {
    source: null,
    parameters: options.initialParameters ?? defaultImportParameters(),
    preview: null,
    warnings: [],
    fatalError: null,
    isLoadingPreview: false,
    canApplyImport: false,
  };
  let lastParseResult: ParseResult | null = null;

  const actions: ImportToolActions = {
    async setSource(source) {
      state.source = source;
      state.preview = null;
      state.warnings = [];
      state.fatalError = null;
      state.canApplyImport = false;
      lastParseResult = null;
    },

    async patchParameters(partial) {
      state.parameters = {
        ...state.parameters,
        ...partial,
      };
      state.preview = null;
      state.warnings = [];
      state.fatalError = null;
      state.canApplyImport = false;
      lastParseResult = null;
    },

    async refreshPreview() {
      if (!state.source) {
        state.fatalError = "No source selected.";
        state.preview = null;
        state.warnings = [];
        state.canApplyImport = false;
        return;
      }

      state.isLoadingPreview = true;
      try {
        const result = await options.parseService.parse({
          source: state.source,
          parameters: state.parameters,
        });

        lastParseResult = result;
        state.preview = result.preview;
        state.warnings = result.warnings;
        state.fatalError = result.normalizedRows.length === 0 ? "No usable rows found." : null;
        state.canApplyImport = state.fatalError === null;
      } catch (error) {
        lastParseResult = null;
        state.preview = null;
        state.warnings = [];
        state.fatalError = (error as Error).message;
        state.canApplyImport = false;
      } finally {
        state.isLoadingPreview = false;
      }
    },

    async applyImport(datasetName) {
      if (!lastParseResult || !state.source || state.fatalError) {
        throw new Error("Cannot apply import without a successful preview.");
      }

      const timestamp = now();
      const dataset: Dataset = {
        id: createDatasetId(),
        projectId: options.activeProjectId ?? "project-unassigned",
        name: datasetName,
        createdAt: timestamp,
        updatedAt: timestamp,
        tree: lastParseResult.tree,
        sourceFileName: state.source.name,
        sourceFormat: lastParseResult.detectedFormat,
        flatTable: lastParseResult.normalizedRows,
        importWarnings: lastParseResult.warnings,
      };

      if (options.datasetRepository) {
        await options.datasetRepository.saveDataset(dataset);
      }

      return dataset;
    },

    clearState() {
      state.source = null;
      state.preview = null;
      state.warnings = [];
      state.fatalError = null;
      state.canApplyImport = false;
      lastParseResult = null;
    },
  };

  return {
    state,
    actions,
  };
}

function defaultImportParameters(): ImportParameters {
  return {
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
}

function defaultEntityId(prefix: "dataset" | "project"): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
