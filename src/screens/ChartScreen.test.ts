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

  it("uses parent interaction path and parent color path for grouped hidden wedges", () => {
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
          path: ["Root", "Alpha"],
          name: "Alpha",
          depth: 1,
          magnitude: 100,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "Alpha", "Tiny-1"],
          name: "Tiny-1",
          depth: 2,
          magnitude: 1,
          startAngle: 0,
          endAngle: 0.01,
        },
        {
          path: ["Root", "Alpha", "Tiny-2"],
          name: "Tiny-2",
          depth: 2,
          magnitude: 1,
          startAngle: 0.01,
          endAngle: 0.02,
        },
      ],
    };

    const plan = createWedgeRenderPlan(layout, 2, 24);
    const grouped = plan.visibleNodes.find((entry) => entry.isGroupedHidden);

    expect(grouped).toBeTruthy();
    expect(grouped?.interactionPath).toEqual(["Root", "Alpha"]);
    expect(grouped?.colorPath).toEqual(["Root", "Alpha"]);
  });

  it("falls back to child color path for top-level grouped hidden wedges", () => {
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
          path: ["Root", "Tiny-1"],
          name: "Tiny-1",
          depth: 1,
          magnitude: 1,
          startAngle: 0,
          endAngle: 0.01,
        },
        {
          path: ["Root", "Tiny-2"],
          name: "Tiny-2",
          depth: 1,
          magnitude: 1,
          startAngle: 0.01,
          endAngle: 0.02,
        },
        {
          path: ["Root", "Large"],
          name: "Large",
          depth: 1,
          magnitude: 98,
          startAngle: 0.02,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const plan = createWedgeRenderPlan(layout, 1, 24);
    const grouped = plan.visibleNodes.find((entry) => entry.isGroupedHidden);

    expect(grouped).toBeTruthy();
    expect(grouped?.colorPath).toEqual(["Root", "Tiny-1"]);
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

  it("assigns colors to nodes even when collapsed paths skip intermediate ancestors", () => {
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
          magnitude: 100,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "A", "Skipped", "Leaf"],
          name: "Leaf",
          depth: 2,
          magnitude: 100,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const colors = buildKronaColorMap(layout);

    expect(colors.get("Root/A")).toBeTruthy();
    expect(colors.get("Root/A/Skipped/Leaf")).toBeTruthy();
    expect(colors.get("Root/A/Skipped/Leaf")).not.toBe("rgb(220,220,220)");
  });

  it("matches Krona top-level hue wheel for > 6 siblings", () => {
    const names = ["A", "B", "C", "D", "E", "F", "G"];
    const nodes: ChartLayoutResult["nodes"] = [
      {
        path: ["Root"],
        name: "Root",
        depth: 0,
        magnitude: 700,
        startAngle: 0,
        endAngle: Math.PI * 2,
      },
      ...names.map((name, index) => {
        const start = (index / names.length) * Math.PI * 2;
        const end = ((index + 1) / names.length) * Math.PI * 2;
        return {
          path: ["Root", name],
          name,
          depth: 1,
          magnitude: 100,
          startAngle: start,
          endAngle: end,
        };
      }),
    ];

    const colors = buildKronaColorMap({
      totalMagnitude: 700,
      nodes,
    });

    expect(colors.get("Root/A")).toBe("rgb(204,101,101)");
    expect(colors.get("Root/B")).toBe("rgb(193,204,101)");
    expect(colors.get("Root/C")).toBe("rgb(101,204,116)");
    expect(colors.get("Root/D")).toBe("rgb(101,194,204)");
    expect(colors.get("Root/E")).toBe("rgb(101,106,204)");
    expect(colors.get("Root/F")).toBe("rgb(174,101,204)");
    expect(colors.get("Root/G")).toBe("rgb(204,101,170)");
  });
});
