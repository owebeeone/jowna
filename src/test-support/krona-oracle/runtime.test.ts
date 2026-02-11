import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { renderKronaSnapshot } from "./runtime";

describe("krona oracle runtime", () => {
  it("loads the copied krona-2.0 harness file and renders snapshot svg", () => {
    const fixturePath = fileURLToPath(
      new URL("../../../../../../Kronagh/examples/metarep-blast.krona.html", import.meta.url),
    );
    const content = readFileSync(fixturePath, "utf8");

    const result = renderKronaSnapshot({
      content,
      width: 1280,
      height: 900,
      datasetIndex: 0,
      collapse: true,
      showMagnitude: true,
      maxAbsoluteDepth: 20,
      fontSize: 11,
    });

    expect(result.svg.startsWith('<?xml version="1.0" standalone="no"?>')).toBe(true);
    expect(result.svg.includes('<svg width="1280" height="900"')).toBe(true);
    expect(result.svg.includes('class="wedge"')).toBe(true);
    expect(result.state.datasets).toBeGreaterThan(0);
    expect(result.state.currentDataset).toBe(0);
  });

  it("accepts option overrides from harness data structures", () => {
    const fixturePath = fileURLToPath(
      new URL("../../../../../population_demographics.krona.html", import.meta.url),
    );
    const content = readFileSync(fixturePath, "utf8");

    const tuned = renderKronaSnapshot({
      content,
      width: 900,
      height: 700,
      collapse: true,
      maxAbsoluteDepth: 8,
      fontSize: 13,
      showMagnitude: false,
      showKeys: false,
    });

    expect(tuned.svg.includes("font-size: 13px")).toBe(true);
    expect(tuned.state.collapse).toBe(true);
    expect(tuned.state.showMagnitude).toBe(false);
    expect(tuned.state.showKeys).toBe(false);
    expect(tuned.state.maxAbsoluteDepth).toBe(8);
  });
});
