import { describe, expect, it } from "vitest";
import { makeDataset } from "../../../test-support/fixtures";
import { createDatasetSelectorState } from "./dataset-selector";

describe("createDatasetSelectorState", () => {
  it("hides the selector when there is only one dataset", () => {
    const datasets = [makeDataset({ id: "dataset-1", name: "Only Dataset" })];

    const state = createDatasetSelectorState(datasets, "dataset-1");

    expect(state.showSelector).toBe(false);
    expect(state.selectedId).toBe("dataset-1");
    expect(state.options).toEqual([{ id: "dataset-1", name: "Only Dataset" }]);
  });

  it("shows the selector and keeps the active dataset selected", () => {
    const datasets = [
      makeDataset({ id: "dataset-1", name: "Dataset 1" }),
      makeDataset({ id: "dataset-2", name: "Dataset 2" }),
    ];

    const state = createDatasetSelectorState(datasets, "dataset-2");

    expect(state.showSelector).toBe(true);
    expect(state.selectedId).toBe("dataset-2");
    expect(state.options.map((option) => option.id)).toEqual(["dataset-1", "dataset-2"]);
  });

  it("falls back to the first dataset when active id is missing", () => {
    const datasets = [
      makeDataset({ id: "dataset-10", name: "Dataset 10" }),
      makeDataset({ id: "dataset-20", name: "Dataset 20" }),
    ];

    const state = createDatasetSelectorState(datasets, "dataset-missing");

    expect(state.showSelector).toBe(true);
    expect(state.selectedId).toBe("dataset-10");
  });
});
