import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { DEFAULT_CHART_SETTINGS } from "../grips";
import { parseKronaHtmlProject } from "../features/file-manager";
import { SunburstChartRenderer } from "../features/chart";
import { buildKronaColorMap, createWedgeRenderPlan } from "./chart/common";

const KRONA_UNCLASSIFIED_COLOR = "rgb(220,220,220)";

describe("ChartScreen grouped hidden color", () => {
  it("keeps grouped hidden wedges colored when collapsed paths skip ancestors", () => {
    const fixturePath = fileURLToPath(
      new URL("../../../../../Kronagh/examples/metarep-blast.krona.html", import.meta.url),
    );
    const content = readFileSync(fixturePath, "utf8");
    const parsed = parseKronaHtmlProject({
      name: "metarep-blast.krona.html",
      content,
    });

    const dataset =
      parsed.datasets.find((entry) => entry.name === "HOT01-0010M") ?? parsed.datasets[0];
    expect(dataset).toBeTruthy();

    const renderer = new SunburstChartRenderer();
    const layout = renderer.computeLayout({
      root: dataset!.tree,
      settings: {
        ...DEFAULT_CHART_SETTINGS,
        collapseRedundant: true,
      },
      focusedPath: null,
      depthLimit: 20,
    });

    const plan = createWedgeRenderPlan(layout, 20, 8);
    const colors = buildKronaColorMap(layout);

    const grouped = plan.visibleNodes.filter((entry) => entry.isGroupedHidden);
    const greyGrouped = grouped.filter((entry) => {
      const colorPathLeaf = entry.colorPath[entry.colorPath.length - 1]?.trim().toLowerCase() ?? "";
      if (colorPathLeaf.startsWith("[other ")) {
        return false;
      }
      return (
        (colors.get(entry.colorPath.join("/")) ?? KRONA_UNCLASSIFIED_COLOR) ===
        KRONA_UNCLASSIFIED_COLOR
      );
    });
    const greyClassifiedNodes = layout.nodes.filter((node) => {
      if (node.depth <= 0 || node.name.trim().toLowerCase().startsWith("[other ")) {
        return false;
      }
      const color = colors.get(node.path.join("/")) ?? KRONA_UNCLASSIFIED_COLOR;
      return color === KRONA_UNCLASSIFIED_COLOR;
    });

    expect(grouped.length).toBeGreaterThan(0);
    expect(greyGrouped.length).toBe(0);
    expect(greyClassifiedNodes.length).toBe(0);
  });
});
