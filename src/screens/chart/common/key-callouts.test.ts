import { describe, expect, it } from "vitest";
import { createKeyCallouts } from "./key-callouts";

describe("createKeyCallouts", () => {
  it("returns no callouts when there are no keyed wedges", () => {
    const callouts = createKeyCallouts({
      entries: [],
      totalMagnitude: 100,
      width: 620,
      height: 620,
      centerX: 310,
      centerY: 310,
      radius: 270,
      fontSizePx: 11,
    });

    expect(callouts).toEqual([]);
  });

  it("creates deterministic key geometry and labels", () => {
    const callouts = createKeyCallouts({
      entries: [
        {
          key: "Root/A",
          name: "A",
          magnitude: 25,
          startAngle: 0,
          endAngle: Math.PI / 4,
          fill: "rgb(120,150,210)",
          interactionPath: ["Root", "A"],
        },
        {
          key: "Root/B",
          name: "B",
          magnitude: 5,
          startAngle: Math.PI,
          endAngle: Math.PI * 1.2,
          fill: "rgb(200,80,80)",
          interactionPath: ["Root", "B"],
        },
      ],
      totalMagnitude: 100,
      width: 620,
      height: 620,
      centerX: 310,
      centerY: 310,
      radius: 270,
      fontSizePx: 11,
    });

    expect(callouts).toHaveLength(2);
    expect(callouts[0]?.text).toBe("A   25%");
    expect(callouts[1]?.text).toBe("B   5%");
    expect(callouts[0]?.fill).toBe("rgb(120,150,210)");
    expect(callouts[0]?.linePath.startsWith("M ")).toBe(true);
    expect(callouts[1]?.linePath.includes("A ")).toBe(true);
    expect(callouts[0]?.colorBoxY).toBeLessThan(callouts[1]!.colorBoxY);
    expect(callouts[0]?.textAnchor).toBe("end");
  });

  it("formats sub-percent values with Krona rounding behavior", () => {
    const callouts = createKeyCallouts({
      entries: [
        {
          key: "Root/Tiny",
          name: "Tiny",
          magnitude: 0.4,
          startAngle: 0.1,
          endAngle: 0.2,
          fill: "rgb(99,99,99)",
          interactionPath: ["Root", "Tiny"],
        },
      ],
      totalMagnitude: 100,
      width: 620,
      height: 620,
      centerX: 310,
      centerY: 310,
      radius: 270,
      fontSizePx: 11,
    });

    expect(callouts[0]?.text).toBe("Tiny   0.4%");
  });
});
