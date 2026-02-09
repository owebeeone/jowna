import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../domain";
import { createChartNavigationController } from "./navigation";
import { SunburstChartRenderer } from "./renderer";

describe("SunburstChartRenderer", () => {
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
      settings: {
        background: "transparent",
        borderWidth: 1,
        borderColor: "#111",
        wedgeStrokeWidth: 1,
        wedgeStrokeColor: "#333",
        fontFamily: "IBM Plex Sans",
        fontSizePx: 12,
        width: "fit",
        height: "fit",
        colorScheme: "default",
      },
      focusedPath: null,
      depthLimit: null,
    });

    expect(layout.totalMagnitude).toBe(10);
    expect(layout.nodes[0]?.name).toBe("Root");
    expect(layout.nodes).toHaveLength(3);
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
