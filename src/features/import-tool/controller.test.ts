import { describe, expect, it } from "vitest";
import { makeImportParameters, makeImportSource } from "../../test-support/fixtures";
import { createDefaultParserRegistry, DefaultParseImportService } from "../../parsers";
import { createIndexedDbStorageGateway } from "../../storage/indexeddb";
import { createImportToolController } from "./controller";

describe("createImportToolController", () => {
  it("refreshes preview using parser service and persists applied dataset", async () => {
    const storage = createIndexedDbStorageGateway({
      indexedDbFactory: undefined,
    });
    const parseService = new DefaultParseImportService(createDefaultParserRegistry());
    const controller = createImportToolController({
      parseService,
      datasetRepository: storage.datasets,
      activeProjectId: "project-1",
      initialParameters: makeImportParameters({
        format: "csv",
        delimiter: ",",
        hasHeaderRow: true,
      }),
      now: () => "2026-02-09T00:00:00.000Z",
      createDatasetId: () => "dataset-1",
    });

    await controller.actions.setSource(
      makeImportSource({
        name: "population.csv",
        content: "magnitude,level1,level2\n10,Europe,Germany\n5,Europe,France",
      }),
    );
    await controller.actions.refreshPreview();

    expect(controller.state.canApplyImport).toBe(true);
    expect(controller.state.preview?.totalRows).toBe(2);

    const dataset = await controller.actions.applyImport("Population");
    const saved = await storage.datasets.getDataset("dataset-1");
    expect(dataset.id).toBe("dataset-1");
    expect(saved?.flatTable).toHaveLength(2);
  });
});
