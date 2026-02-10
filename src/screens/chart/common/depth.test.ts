import { describe, expect, it } from "vitest";
import { resolveRenderDepth } from "./geometry";

describe("resolveRenderDepth", () => {
  it("uses tree depth by default and clamps to the selected depth limit", () => {
    expect(resolveRenderDepth(12, 0)).toBe(12);
    expect(resolveRenderDepth(12, 5)).toBe(5);
    expect(resolveRenderDepth(3, 7)).toBe(3);
    expect(resolveRenderDepth(0, 9)).toBe(0);
  });
});
