import { describe, expect, it } from "vitest";
import type { ImportWarning, TreeNode } from "../../domain";
import type {
  ChartLayoutResult,
  ChartNavigationController,
  ChartRenderInput,
  ChartRenderer,
} from "./contracts";

class FakeChartRenderer implements ChartRenderer {
  computeLayout(input: ChartRenderInput): ChartLayoutResult {
    const totalMagnitude = computeEffectiveMagnitude(input.root).magnitude;
    const nodes = flattenWithAngles(input.root, totalMagnitude, []);
    return { nodes, totalMagnitude };
  }
}

function createNavigationHarness(): ChartNavigationController {
  const state = {
    focusHistory: [] as string[][],
    historyIndex: -1,
  };

  return {
    state,
    actions: {
      focusPath(path: string[]) {
        const nextHistory = state.focusHistory.slice(0, state.historyIndex + 1);
        nextHistory.push(path);
        state.focusHistory = nextHistory;
        state.historyIndex = nextHistory.length - 1;
      },
      goBack() {
        if (state.historyIndex > 0) {
          state.historyIndex -= 1;
        }
      },
      goForward() {
        if (state.historyIndex < state.focusHistory.length - 1) {
          state.historyIndex += 1;
        }
      },
      reset() {
        state.focusHistory = [];
        state.historyIndex = -1;
      },
    },
  };
}

describe("chart contracts", () => {
  it("supports layout input/output contracts from domain data", () => {
    const renderer = new FakeChartRenderer();
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      children: [
        { name: "A", magnitude: 3 },
        { name: "B", magnitude: 7 },
      ],
    };
    const result = renderer.computeLayout({
      root,
      focusedPath: null,
      depthLimit: null,
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
    });

    expect(result.totalMagnitude).toBe(10);
    expect(result.nodes.length).toBe(3);
    expect(result.nodes[0]?.path).toEqual(["Root"]);
  });

  it("captures aggregation semantics and warning condition for explicit parent mismatch", () => {
    const root: TreeNode = {
      name: "Root",
      magnitude: 0,
      explicitMagnitude: 5,
      children: [
        { name: "Leaf1", magnitude: 4 },
        { name: "Leaf2", magnitude: 3 },
      ],
    };

    const aggregation = computeEffectiveMagnitude(root);
    expect(aggregation.magnitude).toBe(7);
    expect(aggregation.warnings).toHaveLength(1);
    expect(aggregation.warnings[0]?.code).toBe("PARENT_MAGNITUDE_MISMATCH");
  });

  it("supports navigation history actions (focus/back/forward/reset)", () => {
    const navigation = createNavigationHarness();

    navigation.actions.focusPath(["Root", "Europe"]);
    navigation.actions.focusPath(["Root", "Europe", "Germany"]);
    expect(navigation.state.historyIndex).toBe(1);
    expect(navigation.state.focusHistory[1]).toEqual(["Root", "Europe", "Germany"]);

    navigation.actions.goBack();
    expect(navigation.state.historyIndex).toBe(0);

    navigation.actions.goForward();
    expect(navigation.state.historyIndex).toBe(1);

    navigation.actions.reset();
    expect(navigation.state.focusHistory).toEqual([]);
    expect(navigation.state.historyIndex).toBe(-1);
  });
});

function computeEffectiveMagnitude(node: TreeNode): {
  magnitude: number;
  warnings: ImportWarning[];
} {
  const warnings: ImportWarning[] = [];
  const childResults = node.children?.map((child) => computeEffectiveMagnitude(child)) ?? [];
  const childrenMagnitude = childResults.reduce((sum, result) => sum + result.magnitude, 0);
  childResults.forEach((child) => warnings.push(...child.warnings));

  if (!node.children || node.children.length === 0) {
    return {
      magnitude: node.magnitude,
      warnings,
    };
  }

  if (typeof node.explicitMagnitude === "number" && node.explicitMagnitude !== childrenMagnitude) {
    warnings.push({
      code: "PARENT_MAGNITUDE_MISMATCH",
      message: `Explicit magnitude ${node.explicitMagnitude} differs from children sum ${childrenMagnitude}`,
      severity: "warning",
    });
  }

  return {
    magnitude: childrenMagnitude,
    warnings,
  };
}

function flattenWithAngles(
  node: TreeNode,
  rootMagnitude: number,
  pathPrefix: string[],
  depth = 0,
  startAngle = 0,
): ChartLayoutResult["nodes"] {
  const currentPath = [...pathPrefix, node.name];
  const magnitude = computeEffectiveMagnitude(node).magnitude;
  const angleSpan = rootMagnitude === 0 ? 0 : (magnitude / rootMagnitude) * Math.PI * 2;

  const nodes: ChartLayoutResult["nodes"] = [
    {
      path: currentPath,
      name: node.name,
      depth,
      magnitude,
      startAngle,
      endAngle: startAngle + angleSpan,
    },
  ];

  let childStart = startAngle;
  for (const child of node.children ?? []) {
    const childMagnitude = computeEffectiveMagnitude(child).magnitude;
    const childSpan = magnitude === 0 ? 0 : (childMagnitude / magnitude) * angleSpan;
    nodes.push(...flattenWithAngles(child, rootMagnitude, currentPath, depth + 1, childStart));
    childStart += childSpan;
  }

  return nodes;
}
