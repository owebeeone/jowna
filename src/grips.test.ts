import { describe, expect, it } from "vitest";
import type { JownaGripContracts, JownaGripKey, JownaGripState } from "./grips";

function makeGripContracts(): JownaGripContracts {
  const initialState: JownaGripState = {
    projects: [],
    activeProjectId: null,
    activeDataset: null,
    chartSettings: null,
    appSettings: null,
    importParameters: null,
    importPreview: null,
    importWarnings: [],
    loading: {},
    errors: {},
  };

  const keys = Object.keys(initialState) as JownaGripKey[];
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        key,
        description: `Grip for ${key}`,
        initialValue: initialState[key],
      },
    ]),
  ) as JownaGripContracts;
}

describe("grip contracts", () => {
  it("enumerates app state keys as typed grip contracts", () => {
    const contracts = makeGripContracts();
    expect(Object.keys(contracts).sort()).toEqual([
      "activeDataset",
      "activeProjectId",
      "appSettings",
      "chartSettings",
      "errors",
      "importParameters",
      "importPreview",
      "importWarnings",
      "loading",
      "projects",
    ]);
    expect(contracts.importWarnings.initialValue).toEqual([]);
  });
});
