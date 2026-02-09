import { describe, expect, it } from "vitest";
import { makeImportParameters, makeImportSource } from "../test-support/fixtures";
import { createDefaultParserRegistry } from "./registry";
import { DefaultParseImportService } from "./service";

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
});
