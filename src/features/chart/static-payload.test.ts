import { describe, expect, it } from "vitest";
import { DEFAULT_CHART_SETTINGS } from "../../grips";
import { makeDataset, makeProject } from "../../test-support/fixtures";
import {
  STATIC_CHART_PAYLOAD_GLOBAL,
  createStaticChartPayload,
  readStaticChartPayloadFromWindow,
  resolveStaticChartPayload,
} from "./static-payload";

describe("static chart payload", () => {
  it("creates payload with project datasets and selected dataset fallback", () => {
    const project = makeProject({
      id: "project-42",
      name: "Project 42",
      datasetIds: ["dataset-a", "dataset-b"],
      activeDatasetId: "dataset-a",
    });
    const datasets = [
      makeDataset({ id: "dataset-a", name: "Dataset A", projectId: "project-42" }),
      makeDataset({ id: "dataset-b", name: "Dataset B", projectId: "project-42" }),
    ];

    const payload = createStaticChartPayload({
      project,
      datasets,
      activeDatasetId: "dataset-missing",
      depthLimit: 7,
      chartSettings: DEFAULT_CHART_SETTINGS,
    });

    expect(payload.activeDatasetId).toBe("dataset-a");
    expect(payload.project.id).toBe("project-42");
    expect(payload.project.datasetIds).toEqual(["dataset-a", "dataset-b"]);
    expect(payload.focusPath).toEqual([datasets[0]!.tree.name]);
  });

  it("resolves malformed payload values to safe defaults", () => {
    const payload = resolveStaticChartPayload({
      project: { id: "project-x", name: "Project X" },
      datasets: [{ id: "dataset-x", name: "Dataset X", tree: { name: "Root", magnitude: 1 } }],
      activeDatasetId: "missing",
      depthLimit: -10,
      chartSettings: { fontFamily: "serif" },
    });

    expect(payload.activeDatasetId).toBe("dataset-x");
    expect(payload.depthLimit).toBe(0);
    expect(payload.chartSettings.fontFamily).toBe("serif");
    expect(payload.chartSettings.wedgeStrokeColor).toBe(DEFAULT_CHART_SETTINGS.wedgeStrokeColor);
  });

  it("reads payload from window using the global contract name", () => {
    const source = {
      [STATIC_CHART_PAYLOAD_GLOBAL]: {
        project: { id: "project-window", name: "Window Project" },
        datasets: [
          { id: "dataset-window", name: "Dataset Window", tree: { name: "Root", magnitude: 1 } },
        ],
        activeDatasetId: "dataset-window",
        depthLimit: 3,
        chartSettings: {
          ...DEFAULT_CHART_SETTINGS,
          wedgeStrokeColor: "#112233",
        },
      },
    } as unknown as Window;

    const payload = readStaticChartPayloadFromWindow(source);

    expect(payload.project.id).toBe("project-window");
    expect(payload.activeDatasetId).toBe("dataset-window");
    expect(payload.depthLimit).toBe(3);
    expect(payload.chartSettings.wedgeStrokeColor).toBe("#112233");
  });
});
