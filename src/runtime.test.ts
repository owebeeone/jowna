import { describe, expect, it } from "vitest";
import type { JownaGripContracts } from "./grips";
import type { RuntimeFactoryContract } from "./runtime";
import type { TapGraphContract } from "./taps";

function makeRuntimeFactory(): RuntimeFactoryContract {
  const grips = {
    projects: {
      key: "projects",
      description: "Saved projects",
      initialValue: [],
    },
    activeProjectId: {
      key: "activeProjectId",
      description: "Active project id",
      initialValue: null,
    },
    activeDataset: {
      key: "activeDataset",
      description: "Current dataset",
      initialValue: null,
    },
    chartSettings: {
      key: "chartSettings",
      description: "Chart settings",
      initialValue: null,
    },
    appSettings: {
      key: "appSettings",
      description: "Application settings",
      initialValue: null,
    },
    importParameters: {
      key: "importParameters",
      description: "Import parameter state",
      initialValue: null,
    },
    importPreview: {
      key: "importPreview",
      description: "Current import preview",
      initialValue: null,
    },
    importWarnings: {
      key: "importWarnings",
      description: "Import warning list",
      initialValue: [],
    },
    loading: {
      key: "loading",
      description: "Loading flags",
      initialValue: {},
    },
    errors: {
      key: "errors",
      description: "Error registry",
      initialValue: {},
    },
  } satisfies JownaGripContracts;

  const tapGraph: TapGraphContract = {
    taps: [
      {
        id: "tap-init",
        kind: "async",
        inputGrips: [],
        outputGrips: ["projects", "appSettings", "chartSettings"],
        description: "Initial load from storage",
      },
    ],
  };

  return {
    createRuntime() {
      return {
        grips,
        tapGraph,
      };
    },
  };
}

describe("runtime contracts", () => {
  it("creates runtime shape with grip contracts and tap graph", () => {
    const runtimeFactory = makeRuntimeFactory();
    const runtime = runtimeFactory.createRuntime();

    expect(runtime.grips.projects.key).toBe("projects");
    expect(runtime.tapGraph.taps[0]?.id).toBe("tap-init");
    expect(runtime.tapGraph.taps[0]?.kind).toBe("async");
  });
});
