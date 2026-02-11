import { describe, expect, it } from "vitest";
import {
  buildExampleProjectUrl,
  resolveExampleLoadRequest,
  resolveExampleLoadRoute,
} from "./taps_app";

describe("load route helpers", () => {
  it("matches /jowna/load/<name> and appends .jowna when missing", () => {
    const route = resolveExampleLoadRoute("/jowna/load/world-demo", "/jowna/");
    expect(route).toEqual({
      fileName: "world-demo.jowna",
      projectName: "world-demo",
    });
  });

  it("accepts /load/<name>.jowna with root base", () => {
    const route = resolveExampleLoadRoute("/load/metarep-blast.jowna", "/");
    expect(route).toEqual({
      fileName: "metarep-blast.jowna",
      projectName: "metarep-blast",
    });
  });

  it("returns null for non-load paths", () => {
    expect(resolveExampleLoadRoute("/jowna/chart/world-demo", "/jowna/")).toBeNull();
    expect(resolveExampleLoadRoute("/jowna/load", "/jowna/")).toBeNull();
  });

  it("builds example URL under configured base path", () => {
    expect(buildExampleProjectUrl("world-demo.jowna", "/jowna/")).toBe(
      "/jowna/examples/world-demo.jowna",
    );
    expect(buildExampleProjectUrl("rdp comp.jowna", "/")).toBe(
      "/examples/rdp%20comp.jowna",
    );
  });

  it("supports ?load=<name> query links", () => {
    const route = resolveExampleLoadRequest("/jowna/", "?load=metarep-blast", "/jowna/");
    expect(route).toEqual({
      fileName: "metarep-blast.jowna",
      projectName: "metarep-blast",
    });
  });

  it("prefers query link over pathname route when both are present", () => {
    const route = resolveExampleLoadRequest(
      "/jowna/load/world-demo",
      "?load=rdp.comp",
      "/jowna/",
    );
    expect(route).toEqual({
      fileName: "rdp.comp.jowna",
      projectName: "rdp.comp",
    });
  });
});
