import type { JownaGripKey } from "./grips";

export type TapKind = "atom" | "function" | "async";

export interface TapContract {
  id: string;
  kind: TapKind;
  inputGrips: readonly JownaGripKey[];
  outputGrips: readonly JownaGripKey[];
  description: string;
}

export interface TapGraphContract {
  taps: readonly TapContract[];
}

export function createDefaultTapGraph(): TapGraphContract {
  return {
    taps: [
      {
        id: "tap-load-storage",
        kind: "async",
        inputGrips: [],
        outputGrips: ["projects", "appSettings", "chartSettings", "errors", "loading"],
        description: "Loads initial projects and settings from storage.",
      },
      {
        id: "tap-build-import-preview",
        kind: "function",
        inputGrips: ["importParameters"],
        outputGrips: ["importPreview", "importWarnings", "errors"],
        description: "Builds normalized import preview from current parameters and source.",
      },
      {
        id: "tap-select-active-dataset",
        kind: "atom",
        inputGrips: ["activeDataset"],
        outputGrips: ["activeDataset"],
        description: "Tracks currently focused dataset for chart rendering.",
      },
    ],
  };
}
