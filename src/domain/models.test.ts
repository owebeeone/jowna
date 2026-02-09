import { describe, expect, it } from "vitest";
import type { Dataset, ImportWarning, NormalizedRow, Project, TreeNode } from "./models";
import {
  makeDataset,
  makeNormalizedRow,
  makeProject,
  makeTree,
  makeWarning,
} from "../test-support/fixtures";

describe("domain contracts", () => {
  it("defines warning payloads with stable required fields", () => {
    const warning: ImportWarning = makeWarning();
    expect(warning.code).toBeTypeOf("string");
    expect(warning.message).toBeTypeOf("string");
    expect(warning.severity).toBe("warning");
  });

  it("models normalized table rows used by import preview and persistence", () => {
    const row: NormalizedRow = makeNormalizedRow({
      path: ["Europe", "Germany"],
      magnitude: 47.2,
    });
    expect(row.path).toEqual(["Europe", "Germany"]);
    expect(row.magnitude).toBe(47.2);
    expect(row.attributes).toEqual({});
  });

  it("models datasets and projects with explicit ownership", () => {
    const dataset: Dataset = makeDataset();
    const project: Project = makeProject();

    expect(dataset.projectId).toBe(project.id);
    expect(project.datasetIds).toContain(dataset.id);
    expect(project.activeDatasetId).toBe(dataset.id);
  });

  it("supports tree nodes with optional metadata and explicit magnitude metadata", () => {
    const tree: TreeNode = makeTree({
      explicitMagnitude: 12,
      children: [{ name: "Leaf", magnitude: 10 }],
      attributes: { source: "Census" },
    });
    expect(tree.explicitMagnitude).toBe(12);
    expect(tree.children?.[0]?.name).toBe("Leaf");
    expect(tree.attributes?.source).toBe("Census");
  });
});
