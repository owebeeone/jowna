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

  it("keeps absolute paths and sorts children by descending magnitude", () => {
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
    expect(layout.nodes[1]?.path).toEqual(["Root", "A", "High"]);
    expect(layout.nodes[2]?.path).toEqual(["Root", "A", "Low"]);
  });

  it("keeps child wedges contiguous and leaves parent residual span for unclassified magnitude", () => {
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
    expect(layout.nodes).toHaveLength(3);

    expect(focusedNode.startAngle).toBe(0);
    expect(focusedNode.endAngle).toBeCloseTo(Math.PI * 2, 8);
    expect(firstChild.startAngle).toBeCloseTo(focusedNode.startAngle, 8);
    expect(firstChild.endAngle).toBeCloseTo(secondChild.startAngle, 8);
    expect(secondChild.endAngle).toBeLessThan(focusedNode.endAngle);
  });

  it("interprets depth limit as absolute tree depth (Krona-style)", () => {
    const renderer = new SunburstChartRenderer();
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      children: [
        {
          name: "A",
          magnitude: 0,
          children: [
            {
              name: "B",
              magnitude: 10,
              children: [
                { name: "C", magnitude: 7 },
                { name: "D", magnitude: 3 },
              ],
            },
          ],
        },
      ],
    };

    const focusedAtDepth3 = ["Root", "A", "B"];

    const limit3 = renderer.computeLayout({
      root,
      settings,
      focusedPath: focusedAtDepth3,
      depthLimit: 3,
    });
    // Krona clips focus upward when the selected node exceeds the depth limit.
    expect(limit3.nodes).toHaveLength(2);
    expect(limit3.nodes[0]?.path).toEqual(["Root", "A"]);
    expect(limit3.nodes[1]?.path).toEqual(focusedAtDepth3);

    const limit4 = renderer.computeLayout({
      root,
      settings,
      focusedPath: focusedAtDepth3,
      depthLimit: 4,
    });
    expect(limit4.nodes).toHaveLength(3);
    expect(limit4.nodes[1]?.path).toEqual(["Root", "A", "B", "C"]);
    expect(limit4.nodes[2]?.path).toEqual(["Root", "A", "B", "D"]);
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
