import { describe, expect, it } from "vitest";
import type { ChartSettings, TreeNode } from "../../domain";
import { createStandaloneChartDocument, toStandaloneChartFileName } from "./export-html";

const sampleTree: TreeNode = {
  name: "All",
  magnitude: 100,
  children: [
    {
      name: "Alpha",
      magnitude: 60,
    },
    {
      name: "Beta",
      magnitude: 40,
    },
  ],
};

const sampleSettings: ChartSettings = {
  background: "#f0f0f0",
  borderWidth: 2,
  borderColor: "#101010",
  wedgeStrokeWidth: 1.5,
  wedgeStrokeColor: "#ededed",
  fontFamily: "IBM Plex Sans",
  fontSizePx: 12,
  width: "fit",
  height: "fit",
  colorScheme: ["#0f6b48", "#2a9d8f"],
};

describe("standalone chart html export", () => {
  it("embeds dataset payload, depth limit, and chart settings", () => {
    const html = createStandaloneChartDocument({
      datasetName: "Population",
      tree: sampleTree,
      depthLimit: 4,
      chartSettings: sampleSettings,
    });

    expect(html).toContain("<title>Population</title>");
    expect(html).toContain('"depthLimit":4');
    expect(html).toContain('"chartSettings"');
    expect(html).toContain('"wedgeStrokeColor":"#ededed"');
    expect(html).toContain("jowna-export-data");
  });

  it("escapes html in title and normalizes output file name", () => {
    const html = createStandaloneChartDocument({
      datasetName: "A <B> & C",
      tree: sampleTree,
      depthLimit: 0,
      chartSettings: sampleSettings,
    });

    expect(html).toContain("<title>A &lt;B&gt; &amp; C</title>");
    expect(toStandaloneChartFileName("Population demographics 2026")).toBe(
      "Population-demographics-2026.html",
    );
  });
});
