import { describe, expect, it } from "vitest";
import type { ChartLayoutResult } from "../../../features/chart";
import { createWedgeRenderPlan } from "./wedge-plan";

describe("createWedgeRenderPlan", () => {
  it("keeps parent wedges to the next ring while leaves extend to the outer edge", () => {
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

    expect(byPath.get("Root/A")?.renderOuterDepth).toBe(4);
    expect(byPath.get("Root/B")?.renderOuterDepth).toBe(1);
    expect(byPath.get("Root/B/B1")?.renderOuterDepth).toBe(4);

    expect(byPath.get("Root/A")?.labelOuterDepth).toBe(4);
    expect(byPath.get("Root/B")?.labelOuterDepth).toBe(1);
    expect(byPath.get("Root/B/B1")?.labelOuterDepth).toBe(4);
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
