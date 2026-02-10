import { describe, expect, it } from "vitest";
import { makeDataset, makeProject } from "../../test-support/fixtures";
import {
  createProjectArchive,
  materializeImportedProject,
  parseProjectArchive,
  PROJECT_ARCHIVE_EXTENSION,
  PROJECT_ARCHIVE_SCHEMA_VERSION,
  serializeProjectArchive,
  toProjectArchiveFileName,
} from "./project-archive";

describe("project archive", () => {
  it("serializes and parses archive payloads", () => {
    const project = makeProject();
    const dataset = makeDataset();

    const archive = createProjectArchive({
      project,
      datasets: [dataset],
      exportedAt: "2026-02-09T00:00:00.000Z",
    });
    const serialized = serializeProjectArchive(archive);
    const parsed = parseProjectArchive(serialized);

    expect(parsed.project.name).toBe(project.name);
    expect(parsed.datasets).toHaveLength(1);
    expect(parsed.datasets[0]?.id).toBe(dataset.id);
    expect(parsed.exportedAt).toBe("2026-02-09T00:00:00.000Z");
    expect(parsed.version).toBe(1);
    expect(parsed.schemaVersion).toBe(PROJECT_ARCHIVE_SCHEMA_VERSION);
  });

  it("validates archive shape and rejects unsupported payloads", () => {
    const invalid = JSON.stringify({
      format: "unknown",
      version: 1,
      project: {},
      datasets: [],
    });

    expect(() => parseProjectArchive(invalid)).toThrowError("Invalid project archive file.");
  });

  it("supports legacy archives without schemaVersion", () => {
    const legacyPayload = JSON.stringify({
      format: "jowna.project",
      version: 1,
      exportedAt: "2026-02-09T00:00:00.000Z",
      project: makeProject(),
      datasets: [makeDataset()],
    });

    const parsed = parseProjectArchive(legacyPayload);
    expect(parsed.version).toBe(1);
    expect(parsed.schemaVersion).toBe(PROJECT_ARCHIVE_SCHEMA_VERSION);
  });

  it("rejects unsupported archive versions", () => {
    const unsupportedPayload = JSON.stringify({
      format: "jowna.project",
      version: 2,
      exportedAt: "2026-02-09T00:00:00.000Z",
      project: makeProject(),
      datasets: [makeDataset()],
    });

    expect(() => parseProjectArchive(unsupportedPayload)).toThrowError(
      "Unsupported project archive version '2'.",
    );
  });

  it("materializes imported projects with remapped ids", () => {
    const sourceProject = makeProject({
      id: "project-source",
      datasetIds: ["dataset-a", "dataset-b"],
      activeDatasetId: "dataset-b",
    });
    const datasetA = makeDataset({
      id: "dataset-a",
      projectId: "project-source",
      name: "Dataset A",
    });
    const datasetB = makeDataset({
      id: "dataset-b",
      projectId: "project-source",
      name: "Dataset B",
    });

    const archive = createProjectArchive({
      project: sourceProject,
      datasets: [datasetA, datasetB],
      exportedAt: "2026-02-09T00:00:00.000Z",
    });

    let projectIdCounter = 0;
    let datasetIdCounter = 0;
    const materialized = materializeImportedProject({
      archive,
      nowIso: "2026-02-10T00:00:00.000Z",
      createId: (prefix) => {
        if (prefix === "project") {
          projectIdCounter += 1;
          return `project-${projectIdCounter}`;
        }
        datasetIdCounter += 1;
        return `dataset-${datasetIdCounter}`;
      },
      nextName: "Imported Project",
    });

    expect(materialized.project.id).toBe("project-1");
    expect(materialized.project.name).toBe("Imported Project");
    expect(materialized.project.datasetIds).toEqual(["dataset-1", "dataset-2"]);
    expect(materialized.project.activeDatasetId).toBe("dataset-2");
    expect(materialized.datasets.every((dataset) => dataset.projectId === "project-1")).toBe(true);
    expect(materialized.datasets.map((dataset) => dataset.id)).toEqual(["dataset-1", "dataset-2"]);
  });

  it("creates stable file names with archive extension", () => {
    expect(toProjectArchiveFileName("Population Demographics 2026")).toBe(
      `Population-Demographics-2026${PROJECT_ARCHIVE_EXTENSION}`,
    );
  });
});
