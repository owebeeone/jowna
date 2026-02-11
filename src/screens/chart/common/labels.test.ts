import { describe, expect, it } from "vitest";
import { createWedgeLabel } from "./labels";

describe("createWedgeLabel orientation", () => {
  const baseNode = {
    path: ["Root", "A"],
    name: "Alpha wedge",
    depth: 1,
    magnitude: 10,
    startAngle: 0,
    endAngle: 0.4,
  };

  it("keeps outer-ring labels radial", () => {
    const label = createWedgeLabel(baseNode, 180, 260, 3, 3, 11);
    expect(label).toBeTruthy();
    expect(label?.anchor).toBe("end");
    expect(Math.abs((label?.rotate ?? 0) - -78.540844)).toBeLessThan(0.001);
  });

  it("keeps inner-ring labels tangential/perpendicular to radial direction", () => {
    const label = createWedgeLabel(baseNode, 180, 260, 4, 2, 11);
    expect(label).toBeTruthy();
    expect(label?.anchor).toBe("middle");
    expect(Math.abs((label?.rotate ?? 0) - 11.459156)).toBeLessThan(0.001);
  });
});
