import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../../domain";
import { resolveComparableFocusPathForTree } from "./useChartScreenModel";

function makeTree(): TreeNode {
  return {
    name: "root",
    magnitude: 1,
    children: [
      {
        name: "Bacteria",
        magnitude: 1,
        children: [
          {
            name: "Cyanobacteria",
            magnitude: 1,
            children: [{ name: "Prochlorococcus", magnitude: 1, children: [] }],
          },
        ],
      },
    ],
  };
}

describe("resolveComparableFocusPathForTree", () => {
  it("keeps a full matching path", () => {
    const path = resolveComparableFocusPathForTree({
      tree: makeTree(),
      requestedPath: ["root", "Bacteria", "Cyanobacteria"],
    });
    expect(path).toEqual(["root", "Bacteria", "Cyanobacteria"]);
  });

  it("trims to longest existing prefix when requested path is missing", () => {
    const path = resolveComparableFocusPathForTree({
      tree: makeTree(),
      requestedPath: ["root", "Bacteria", "Missing", "Leaf"],
    });
    expect(path).toEqual(["root", "Bacteria"]);
  });

  it("falls back to root when no prefix matches", () => {
    const path = resolveComparableFocusPathForTree({
      tree: makeTree(),
      requestedPath: ["other-root", "Bacteria"],
    });
    expect(path).toEqual(["root"]);
  });
});
