import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { makeImportParameters, makeImportSource } from "../test-support/fixtures";
import { createDefaultParserRegistry } from "./registry";
import { DefaultParseImportService } from "./service";

const POPULATION_DEMOGRAPHICS_TSV_PATH = resolve(
  process.cwd(),
  "../../population_demographics.tsv",
);

describe("DefaultParseImportService", () => {
  it("auto-detects format and dispatches to matching parser", async () => {
    const service = new DefaultParseImportService(createDefaultParserRegistry());
    const result = await service.parse({
      source: makeImportSource({
        name: "population.tsv",
        content: "10\tEurope\tGermany",
      }),
      parameters: makeImportParameters({
        format: "auto",
        delimiter: "\t",
        hasHeaderRow: false,
        magnitudeField: "col1",
        pathFields: ["col2", "col3"],
        urlField: null,
        descriptionField: null,
      }),
    });

    expect(result.detectedFormat).toBe("tsv");
    expect(result.normalizedRows[0]?.path).toEqual(["Europe", "Germany"]);
  });

  it("auto-detects and parses population demographics TSV without missing-path warnings", async () => {
    const service = new DefaultParseImportService(createDefaultParserRegistry());
    const result = await service.parse({
      source: makeImportSource({
        name: "population_demographics.tsv",
        content: readFileSync(POPULATION_DEMOGRAPHICS_TSV_PATH, "utf8"),
      }),
      parameters: makeImportParameters({
        format: "auto",
        delimiter: "\t",
        hasHeaderRow: false,
        commentPrefix: "#",
        magnitudeField: "col1",
        pathFields: ["level1", "level2"],
        urlField: null,
        descriptionField: null,
        attributeFields: [],
      }),
    });

    expect(result.detectedFormat).toBe("tsv");
    expect(result.normalizedRows.length).toBeGreaterThan(200);
    expect(result.warnings.some((warning) => warning.code === "MISSING_PATH")).toBe(false);
  });

  it("parses population demographics TSV correctly from default auto parameters", async () => {
    const service = new DefaultParseImportService(createDefaultParserRegistry());
    const result = await service.parse({
      source: makeImportSource({
        name: "population_demographics.tsv",
        content: readFileSync(POPULATION_DEMOGRAPHICS_TSV_PATH, "utf8"),
      }),
      parameters: makeImportParameters({
        format: "auto",
      }),
    });

    expect(result.detectedFormat).toBe("tsv");
    expect(result.normalizedRows.length).toBeGreaterThan(200);
    expect(result.warnings.some((warning) => warning.code === "INVALID_MAGNITUDE")).toBe(false);
    expect(result.normalizedRows[0]?.magnitude).toBe(120000);
    expect(result.normalizedRows[0]?.path).toEqual(["China", "Male", "0-10"]);
  });
});
