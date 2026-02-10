import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../domain";
import { createChartNavigationController } from "./navigation";
import { SunburstChartRenderer } from "./renderer";

describe("SunburstChartRenderer", () => {
  const settings = {
    background: "transparent",
    borderWidth: 1,
    borderColor: "#111",
    wedgeStrokeWidth: 1,
    wedgeStrokeColor: "#333",
    collapseRedundant: true,
    fontFamily: "IBM Plex Sans",
    fontSizePx: 12,
    width: "fit" as const,
    height: "fit" as const,
    colorScheme: "default",
  };

  it("computes layout from tree magnitudes", () => {
    const renderer = new SunburstChartRenderer();
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      children: [
        { name: "Europe", magnitude: 7 },
        { name: "Asia", magnitude: 3 },
      ],
    };

    const layout = renderer.computeLayout({
      root,
      settings,
      focusedPath: null,
      depthLimit: null,
    });

    expect(layout.totalMagnitude).toBe(10);
    expect(layout.nodes[0]?.name).toBe("Root");
    expect(layout.nodes).toHaveLength(3);
  });

  it("keeps absolute paths and preserves input child order when focused", () => {
    const renderer = new SunburstChartRenderer();
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      children: [
        {
          name: "A",
          magnitude: 0,
          children: [
            { name: "Low", magnitude: 2 },
            { name: "High", magnitude: 8 },
          ],
        },
      ],
    };

    const layout = renderer.computeLayout({
      root,
      settings,
      focusedPath: ["Root", "A"],
      depthLimit: null,
    });

    expect(layout.nodes[0]?.path).toEqual(["Root", "A"]);
    expect(layout.nodes[1]?.path).toEqual(["Root", "A", "Low"]);
    expect(layout.nodes[2]?.path).toEqual(["Root", "A", "High"]);
  });

  it("keeps child wedges contiguous and adds unclassified wedge when parent exceeds children", () => {
    const renderer = new SunburstChartRenderer();
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      children: [
        {
          name: "A",
          magnitude: 100,
          children: [
            { name: "High", magnitude: 30 },
            { name: "Low", magnitude: 10 },
          ],
        },
      ],
    };

    const layout = renderer.computeLayout({
      root,
      settings,
      focusedPath: ["Root", "A"],
      depthLimit: null,
    });

    const focusedNode = layout.nodes[0]!;
    const firstChild = layout.nodes[1]!;
    const secondChild = layout.nodes[2]!;
    const unclassifiedChild = layout.nodes[3]!;

    expect(focusedNode.startAngle).toBe(0);
    expect(focusedNode.endAngle).toBeCloseTo(Math.PI * 2, 8);
    expect(firstChild.startAngle).toBeCloseTo(focusedNode.startAngle, 8);
    expect(firstChild.endAngle).toBeCloseTo(secondChild.startAngle, 8);
    expect(secondChild.endAngle).toBeCloseTo(unclassifiedChild.startAngle, 8);
    expect(unclassifiedChild.endAngle).toBeCloseTo(focusedNode.endAngle, 8);
    expect(unclassifiedChild.name).toBe("[other A]");
  });
});

describe("createChartNavigationController", () => {
  it("tracks focus history with back/forward support", () => {
    const navigation = createChartNavigationController();

    navigation.actions.focusPath(["Root", "Europe"]);
    navigation.actions.focusPath(["Root", "Europe", "Germany"]);
    expect(navigation.state.historyIndex).toBe(1);

    navigation.actions.goBack();
    expect(navigation.state.historyIndex).toBe(0);

    navigation.actions.goForward();
    expect(navigation.state.historyIndex).toBe(1);

    navigation.actions.reset();
    expect(navigation.state.historyIndex).toBe(-1);
    expect(navigation.state.focusHistory).toEqual([]);
  });
});
