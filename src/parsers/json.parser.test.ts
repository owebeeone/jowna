import { describe, expect, it } from "vitest";
import { makeImportParameters, makeImportSource } from "../test-support/fixtures";
import { JsonDataParser } from "./json.parser";

describe("JsonDataParser", () => {
  it("parses JSON flat rows into normalized rows and tree", async () => {
    const parser = new JsonDataParser();
    const result = await parser.parse({
      source: makeImportSource({
        name: "population.json",
        content: JSON.stringify([
          { magnitude: 3, path: ["Europe", "Germany"], source: "census" },
          { magnitude: 4, path: ["Europe", "France"], source: "census" },
        ]),
      }),
      parameters: makeImportParameters({ format: "json-flat" }),
    });

    expect(result.detectedFormat).toBe("json-flat");
    expect(result.normalizedRows).toHaveLength(2);
    expect(result.tree.magnitude).toBe(7);
    expect(result.preview.columns).toContain("source");
  });

  it("parses hierarchical JSON and warns on parent mismatch", async () => {
    const parser = new JsonDataParser();
    const result = await parser.parse({
      source: makeImportSource({
        name: "hierarchy.json",
        content: JSON.stringify({
          name: "Root",
          magnitude: 5,
          children: [
            { name: "A", magnitude: 2 },
            { name: "B", magnitude: 3 },
            { name: "C", magnitude: 4 },
          ],
        }),
      }),
      parameters: makeImportParameters({ format: "json-hierarchy" }),
    });

    expect(result.detectedFormat).toBe("json-hierarchy");
    expect(result.tree.magnitude).toBe(9);
    expect(result.warnings.some((warning) => warning.code === "PARENT_MAGNITUDE_MISMATCH")).toBe(
      true,
    );
  });
});
