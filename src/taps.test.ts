import { describe, expect, it } from "vitest";
import type { JownaGripKey } from "./grips";
import type { TapGraphContract } from "./taps";

const knownGripKeys: JownaGripKey[] = [
  "projects",
  "activeProjectId",
  "activeDataset",
  "chartSettings",
  "appSettings",
  "importParameters",
  "importPreview",
  "importWarnings",
  "loading",
  "errors",
];

function makeTapGraph(): TapGraphContract {
  return {
    taps: [
      {
        id: "tap-load-projects",
        kind: "async",
        inputGrips: [],
        outputGrips: ["projects", "errors", "loading"],
        description: "Loads saved projects from storage",
      },
      {
        id: "tap-build-preview",
        kind: "function",
        inputGrips: ["importParameters", "activeProjectId"],
        outputGrips: ["importPreview", "importWarnings", "errors"],
        description: "Builds preview and warnings from import parameters",
      },
      {
        id: "tap-select-dataset",
        kind: "atom",
        inputGrips: ["activeDataset"],
        outputGrips: ["activeDataset"],
        description: "Updates active dataset selection",
      },
    ],
  };
}

describe("tap graph contracts", () => {
  it("declares taps with supported kinds and known grip dependencies", () => {
    const graph = makeTapGraph();
    const keys = new Set(knownGripKeys);
    for (const tap of graph.taps) {
      expect(["atom", "function", "async"]).toContain(tap.kind);
      tap.inputGrips.forEach((grip) => expect(keys.has(grip)).toBe(true));
      tap.outputGrips.forEach((grip) => expect(keys.has(grip)).toBe(true));
    }
  });
});
