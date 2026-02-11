import { describe, expect, it } from "vitest";
import type { Dataset, Project, TreeNode } from "../../domain";
import { createProjectDatasetsZipBlob, toDatasetsZipFileName } from "./dataset-zip";

describe("dataset-zip", () => {
  it("builds a zip containing manifest and dataset tsv files", async () => {
    const project = makeProject();
    const datasets = [makeDataset("ds-1", "Alpha"), makeDataset("ds-2", "Beta")];
    const blob = createProjectDatasetsZipBlob({
      project,
      datasets,
      exportedAt: "2026-02-11T00:00:00.000Z",
    });

    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
    expect(bytes[2]).toBe(0x03);
    expect(bytes[3]).toBe(0x04);

    const tail = bytes.slice(bytes.length - 22);
    expect(tail[0]).toBe(0x50);
    expect(tail[1]).toBe(0x4b);
    expect(tail[2]).toBe(0x05);
    expect(tail[3]).toBe(0x06);

    const rawText = new TextDecoder().decode(bytes);
    expect(rawText.includes("manifest.json")).toBe(true);
    expect(rawText.includes("datasets/Alpha.tsv")).toBe(true);
    expect(rawText.includes("datasets/Beta.tsv")).toBe(true);
    expect(
      rawText.includes("source_row\tmagnitude\tpath\turl\tdescription\tattributes"),
    ).toBe(true);
    expect(rawText.includes("Alpha / child")).toBe(true);
  });

  it("normalizes dataset zip file names", () => {
    expect(toDatasetsZipFileName("My Project")).toBe("My-Project-datasets.zip");
    expect(toDatasetsZipFileName("")).toBe("project-datasets.zip");
  });
});

function makeProject(): Project {
  return {
    id: "project-1",
    name: "Test Project",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    datasetIds: ["ds-1", "ds-2"],
    activeDatasetId: "ds-1",
  };
}

function makeDataset(id: string, name: string): Dataset {
  return {
    id,
    projectId: "project-1",
    name,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    tree: makeTree(name),
    flatTable: [
      {
        rowId: `${id}-row-1`,
        sourceRow: 4,
        magnitude: 120000,
        path: [name, "child"],
        url: "https://example.com/sample",
        description: "line one\nline two",
        attributes: {
          note: "has\ttab",
        },
      },
    ],
    importWarnings: [],
  };
}

function makeTree(name: string): TreeNode {
  return {
    name,
    magnitude: 1,
    children: [],
  };
}
