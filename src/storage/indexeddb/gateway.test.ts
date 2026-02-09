import { describe, expect, it } from "vitest";
import { makeDataset, makeProject } from "../../test-support/fixtures";
import { createIndexedDbStorageGateway } from "./gateway";

describe("createIndexedDbStorageGateway", () => {
  it("falls back to in-memory repositories when IndexedDB is unavailable", async () => {
    const storage = createIndexedDbStorageGateway({
      indexedDbFactory: undefined,
      createId: (prefix) => `${prefix}-x`,
      now: () => "2026-02-09T00:00:00.000Z",
    });

    const project = makeProject({ id: "project-1", datasetIds: ["dataset-1"] });
    const dataset = makeDataset({ id: "dataset-1", projectId: "project-1" });
    await storage.projects.saveProject(project);
    await storage.datasets.saveDataset(dataset);

    const loaded = await storage.projects.getProject("project-1");
    const list = await storage.datasets.listByProject("project-1");

    expect(loaded?.id).toBe("project-1");
    expect(list).toHaveLength(1);
  });

  it("copies projects with cloned datasets and mapped ids", async () => {
    let counter = 1;
    const storage = createIndexedDbStorageGateway({
      indexedDbFactory: undefined,
      createId: (prefix) => {
        counter += 1;
        return `${prefix}-${counter}`;
      },
      now: () => "2026-02-09T00:00:00.000Z",
    });

    await storage.projects.saveProject(
      makeProject({
        id: "project-1",
        datasetIds: ["dataset-1"],
        activeDatasetId: "dataset-1",
      }),
    );
    await storage.datasets.saveDataset(
      makeDataset({
        id: "dataset-1",
        projectId: "project-1",
      }),
    );

    const copied = await storage.projects.copyProject("project-1", "Project Copy");
    const copiedDatasets = await storage.datasets.listByProject(copied.id);

    expect(copied.name).toBe("Project Copy");
    expect(copied.id).not.toBe("project-1");
    expect(copiedDatasets).toHaveLength(1);
    expect(copiedDatasets[0]?.projectId).toBe(copied.id);
  });
});
