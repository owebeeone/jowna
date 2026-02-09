import { describe, expect, it } from "vitest";
import type {
  Dataset,
  ImportParameters,
  ImportSource,
  ImportWarning,
  TablePreview,
} from "../../domain";
import {
  makeDataset,
  makeImportParameters,
  makeImportSource,
  makeWarning,
} from "../../test-support/fixtures";
import type { ImportToolActions, ImportToolController, ImportToolState } from "./contracts";

type PreviewGenerator = (
  source: ImportSource,
  parameters: ImportParameters,
) => Promise<{ preview: TablePreview; warnings: ImportWarning[]; fatalError: string | null }>;

function createImportToolHarness(previewGenerator: PreviewGenerator): ImportToolController {
  const state: ImportToolState = {
    source: null,
    parameters: makeImportParameters(),
    preview: null,
    warnings: [],
    fatalError: null,
    isLoadingPreview: false,
    canApplyImport: false,
  };

  const actions: ImportToolActions = {
    async setSource(source) {
      state.source = source;
      state.canApplyImport = false;
    },
    async patchParameters(partial) {
      state.parameters = {
        ...state.parameters,
        ...partial,
      };
      state.canApplyImport = false;
    },
    async refreshPreview() {
      if (!state.source) {
        state.fatalError = "No source selected";
        state.preview = null;
        state.warnings = [];
        state.canApplyImport = false;
        return;
      }
      state.isLoadingPreview = true;
      const result = await previewGenerator(state.source, state.parameters);
      state.preview = result.preview;
      state.warnings = result.warnings;
      state.fatalError = result.fatalError;
      state.canApplyImport = result.fatalError === null;
      state.isLoadingPreview = false;
    },
    async applyImport(datasetName) {
      if (!state.preview || state.fatalError) {
        throw new Error("Cannot apply import without a successful preview");
      }
      return makeDataset({
        name: datasetName,
        flatTable: state.preview.rows,
        importWarnings: state.warnings,
      });
    },
    clearState() {
      state.source = null;
      state.preview = null;
      state.warnings = [];
      state.fatalError = null;
      state.canApplyImport = false;
    },
  };

  return { state, actions };
}

describe("import-tool contracts", () => {
  it("updates preview and warnings deterministically when parameters change", async () => {
    const controller = createImportToolHarness(async (_source, parameters) => {
      if (parameters.delimiter === ",") {
        return {
          preview: {
            columns: ["magnitude", "path"],
            rows: [
              {
                rowId: "row-1",
                sourceRow: 2,
                magnitude: 10,
                path: ["A", "B"],
                url: null,
                description: null,
                attributes: {},
              },
            ],
            totalRows: 1,
            truncated: false,
          },
          warnings: [],
          fatalError: null,
        };
      }

      return {
        preview: {
          columns: [],
          rows: [],
          totalRows: 0,
          truncated: false,
        },
        warnings: [
          makeWarning({
            code: "BAD_DELIMITER",
            message: "Delimiter does not match file layout",
            row: undefined,
            column: undefined,
          }),
        ],
        fatalError: "No usable rows found",
      };
    });

    await controller.actions.setSource(makeImportSource());
    await controller.actions.patchParameters({ delimiter: "," });
    await controller.actions.refreshPreview();
    expect(controller.state.preview?.totalRows).toBe(1);
    expect(controller.state.warnings).toEqual([]);
    expect(controller.state.canApplyImport).toBe(true);

    await controller.actions.patchParameters({ delimiter: "|" });
    await controller.actions.refreshPreview();
    expect(controller.state.preview?.totalRows).toBe(0);
    expect(controller.state.warnings[0]?.code).toBe("BAD_DELIMITER");
    expect(controller.state.canApplyImport).toBe(false);
  });

  it("creates datasets from successful preview results", async () => {
    const controller = createImportToolHarness(async () => ({
      preview: {
        columns: ["magnitude", "level1", "level2"],
        rows: [
          {
            rowId: "row-1",
            sourceRow: 2,
            magnitude: 5,
            path: ["Asia", "Japan"],
            url: null,
            description: null,
            attributes: { source: "seed" },
          },
        ],
        totalRows: 1,
        truncated: false,
      },
      warnings: [],
      fatalError: null,
    }));

    await controller.actions.setSource(makeImportSource());
    await controller.actions.refreshPreview();
    const dataset: Dataset = await controller.actions.applyImport("Imported Population");

    expect(dataset.name).toBe("Imported Population");
    expect(dataset.flatTable?.[0]?.path).toEqual(["Asia", "Japan"]);
    expect(dataset.importWarnings).toEqual([]);
  });

  it("supports clear/reset flow for repeated imports", async () => {
    const controller = createImportToolHarness(async () => ({
      preview: { columns: [], rows: [], totalRows: 0, truncated: false },
      warnings: [makeWarning()],
      fatalError: null,
    }));

    await controller.actions.setSource(
      makeImportSource({ name: "first.csv", content: "magnitude,level1\n1,A" }),
    );
    await controller.actions.refreshPreview();
    expect(controller.state.source?.name).toBe("first.csv");
    expect(controller.state.warnings).toHaveLength(1);

    controller.actions.clearState();
    expect(controller.state.source).toBeNull();
    expect(controller.state.preview).toBeNull();
    expect(controller.state.warnings).toEqual([]);
    expect(controller.state.canApplyImport).toBe(false);
  });
});
