import { describe, expect, it } from "vitest";
import type { ChartLayoutResult } from "../../../features/chart";
import { buildKronaColorMap, resolveNodeFillColor } from "./colors";

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
  });

  it("uses krona hue wheel spacing for seven top-level nodes", () => {
    const topLevelSpans = [
      ["A", 0, (2 * Math.PI) / 7],
      ["B", (2 * Math.PI) / 7, (4 * Math.PI) / 7],
      ["C", (4 * Math.PI) / 7, (6 * Math.PI) / 7],
      ["D", (6 * Math.PI) / 7, (8 * Math.PI) / 7],
      ["E", (8 * Math.PI) / 7, (10 * Math.PI) / 7],
      ["F", (10 * Math.PI) / 7, (12 * Math.PI) / 7],
      ["G", (12 * Math.PI) / 7, 2 * Math.PI],
    ] as const;

    const nodes: ChartLayoutResult["nodes"] = [
      {
        path: ["Root"],
        name: "Root",
        depth: 0,
        magnitude: 700,
        startAngle: 0,
        endAngle: Math.PI * 2,
      },
      ...topLevelSpans.map(([name, start, end]) => {
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

    expect(colors.get("Root/A")).toBe("rgb(216,140,140)");
    expect(colors.get("Root/B")).toBe("rgb(208,216,140)");
    expect(colors.get("Root/C")).toBe("rgb(140,216,151)");
    expect(colors.get("Root/D")).toBe("rgb(140,209,216)");
    expect(colors.get("Root/E")).toBe("rgb(140,143,216)");
    expect(colors.get("Root/F")).toBe("rgb(194,140,216)");
    expect(colors.get("Root/G")).toBe("rgb(216,140,191)");
  });
});

describe("resolveNodeFillColor", () => {
  it("falls back to nearest colored ancestor when exact path is missing", () => {
    const colors = new Map<string, string>([
      ["Root/A", "rgb(12,34,56)"],
      ["Root/B", "rgb(78,90,12)"],
    ]);

    expect(resolveNodeFillColor(colors, [["Root", "A", "Leaf"]])).toBe("rgb(12,34,56)");
    expect(resolveNodeFillColor(colors, [["Root", "B", "Leaf", "Sub"]])).toBe("rgb(78,90,12)");
    expect(resolveNodeFillColor(colors, [["Root", "Missing"]], "rgb(220,220,220)")).toBe(
      "rgb(220,220,220)",
    );
  });

  it("supports base-layout color anchoring when focused layout would differ", () => {
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
          path: ["Root", "X"],
          name: "X",
          depth: 1,
          magnitude: 10,
          startAngle: 0,
          endAngle: Math.PI * 0.2,
        },
        {
          path: ["Root", "A"],
          name: "A",
          depth: 1,
          magnitude: 90,
          startAngle: Math.PI * 0.2,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "A", "A1"],
          name: "A1",
          depth: 2,
          magnitude: 45,
          startAngle: Math.PI * 0.2,
          endAngle: Math.PI * 1.1,
        },
        {
          path: ["Root", "A", "A2"],
          name: "A2",
          depth: 2,
          magnitude: 45,
          startAngle: Math.PI * 1.1,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const focusedLayout: ChartLayoutResult = {
      totalMagnitude: 90,
      nodes: [
        {
          path: ["Root", "A"],
          name: "A",
          depth: 0,
          magnitude: 90,
          startAngle: 0,
          endAngle: Math.PI * 2,
        },
        {
          path: ["Root", "A", "A1"],
          name: "A1",
          depth: 1,
          magnitude: 45,
          startAngle: 0,
          endAngle: Math.PI,
        },
        {
          path: ["Root", "A", "A2"],
          name: "A2",
          depth: 1,
          magnitude: 45,
          startAngle: Math.PI,
          endAngle: Math.PI * 2,
        },
      ],
    };

    const baseColors = buildKronaColorMap(baseLayout);
    const focusedColors = buildKronaColorMap(focusedLayout);
    const targetPath = ["Root", "A", "A1"];
    const targetKey = targetPath.join("/");

    expect(baseColors.get(targetKey)).toBeTruthy();
    expect(focusedColors.get(targetKey)).toBeTruthy();
    expect(baseColors.get(targetKey)).not.toBe(focusedColors.get(targetKey));
    expect(resolveNodeFillColor(baseColors, [targetPath])).toBe(baseColors.get(targetKey));
  });
});
