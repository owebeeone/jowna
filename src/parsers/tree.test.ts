import { describe, expect, it } from "vitest";
import { makeNormalizedRow } from "../test-support/fixtures";
import { buildTreeFromRows } from "./tree";

describe("buildTreeFromRows", () => {
  it("includes direct node magnitudes alongside child magnitudes", () => {
    const result = buildTreeFromRows([
      makeNormalizedRow({ sourceRow: 1, magnitude: 5, path: [] }),
      makeNormalizedRow({ sourceRow: 2, magnitude: 3, path: ["A"] }),
      makeNormalizedRow({ sourceRow: 3, magnitude: 7, path: ["A", "B"] }),
    ]);

    expect(result.warnings).toHaveLength(0);
    expect(result.tree.magnitude).toBe(15);

    const nodeA = result.tree.children?.find((child) => child.name === "A");
    expect(nodeA?.magnitude).toBe(10);

    const nodeB = nodeA?.children?.find((child) => child.name === "B");
    expect(nodeB?.magnitude).toBe(7);
  });
});
