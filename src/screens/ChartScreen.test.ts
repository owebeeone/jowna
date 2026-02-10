import { describe, expect, it } from "vitest";
import type { ChartLayoutResult } from "../features/chart";
import { buildKronaColorMap, createWedgeRenderPlan, resolveRenderDepth } from "./ChartScreen";

describe("ChartScreen wedge render plan", () => {
  it("extends terminal wedges to the configured outer depth", () => {
    const layout: ChartLayoutResult = {
      totalMagnitude: 100,
      nodes: [
        {
          path: ["Root"],
          name: "Root",
          depth: 0,
          magnitude: 100,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "A"],
          name: "A",
          depth: 1,
          magnitude: 40,
          startAngle: 0,
          endAngle: Math.PI * 0.8,
        },
        {
          path: ["Root", "B"],
          name: "B",
          depth: 1,
          magnitude: 60,
          startAngle: Math.PI * 0.8,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "B", "B1"],
          name: "B1",
          depth: 2,
          magnitude: 60,
          startAngle: Math.PI * 0.8,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const plan = createWedgeRenderPlan(layout, 4, 12);
    const byPath = new Map(plan.visibleNodes.map((entry) => [entry.node.path.join("/"), entry]));

    expect(byPath.get("Root/A")?.outerDepth).toBe(4);
    expect(byPath.get("Root/B")?.outerDepth).toBe(1);
    expect(byPath.get("Root/B/B1")?.outerDepth).toBe(4);
  });
});

describe("resolveRenderDepth", () => {
  it("uses tree depth by default and clamps to the selected depth limit", () => {
    expect(resolveRenderDepth(12, 0)).toBe(12);
    expect(resolveRenderDepth(12, 5)).toBe(5);
    expect(resolveRenderDepth(3, 7)).toBe(3);
    expect(resolveRenderDepth(0, 9)).toBe(0);
  });
});

describe("buildKronaColorMap", () => {
  it("keeps top-level hues stable when unclassified wedges are present", () => {
    const baseLayout: ChartLayoutResult = {
      totalMagnitude: 100,
      nodes: [
        {
          path: ["Root"],
          name: "Root",
          depth: 0,
          magnitude: 100,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "A"],
          name: "A",
          depth: 1,
          magnitude: 50,
          startAngle: 0,
          endAngle: Math.PI,
        },
        {
          path: ["Root", "B"],
          name: "B",
          depth: 1,
          magnitude: 50,
          startAngle: Math.PI,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const withOtherLayout: ChartLayoutResult = {
      totalMagnitude: 100,
      nodes: [
        baseLayout.nodes[0]!,
        {
          path: ["Root", "A"],
          name: "A",
          depth: 1,
          magnitude: 40,
          startAngle: 0,
          endAngle: Math.PI * 0.8,
        },
        {
          path: ["Root", "[other Root]"],
          name: "[other Root]",
          depth: 1,
          magnitude: 20,
          startAngle: Math.PI * 0.8,
          endAngle: Math.PI * 1.2,
        },
        {
          path: ["Root", "B"],
          name: "B",
          depth: 1,
          magnitude: 40,
          startAngle: Math.PI * 1.2,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const baseColors = buildKronaColorMap(baseLayout);
    const withOtherColors = buildKronaColorMap(withOtherLayout);

    expect(withOtherColors.get("Root/A")).toBe(baseColors.get("Root/A"));
    expect(withOtherColors.get("Root/B")).toBe(baseColors.get("Root/B"));
    expect(withOtherColors.get("Root/[other Root]")).toBe("rgb(220,220,220)");
  });
});
