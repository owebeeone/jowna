import { describe, expect, it } from "vitest";
import { makeImportParameters, makeImportSource } from "../test-support/fixtures";
import { PapaDelimitedParser } from "./delimited.parser";

describe("PapaDelimitedParser", () => {
  it("parses CSV with header/comments and emits warnings for invalid rows", async () => {
    const parser = new PapaDelimitedParser();
    const result = await parser.parse({
      source: makeImportSource({
        name: "population.csv",
        content: [
          "# comment",
          "magnitude,level1,level2,url,description,source",
          "10,Europe,Germany,https://example.com,de,census",
          "bad,Europe,France,,fr,census",
          "7,Asia,Japan,https://example.jp,ja,stats",
        ].join("\n"),
      }),
      parameters: makeImportParameters({
        format: "csv",
        delimiter: ",",
        hasHeaderRow: true,
        commentPrefix: "#",
      }),
    });

    expect(result.detectedFormat).toBe("csv");
    expect(result.normalizedRows).toHaveLength(2);
    expect(result.tree.magnitude).toBe(17);
    expect(result.warnings.some((warning) => warning.code === "INVALID_MAGNITUDE")).toBe(true);
  });

  it("parses TSV rows via tab delimiter", async () => {
    const parser = new PapaDelimitedParser();
    const result = await parser.parse({
      source: makeImportSource({
        name: "population.tsv",
        content: ["10\tEurope\tGermany", "5\tEurope\tFrance"].join("\n"),
      }),
      parameters: makeImportParameters({
        format: "tsv",
        delimiter: "\t",
        hasHeaderRow: false,
        magnitudeField: "col1",
        pathFields: ["col2", "col3"],
        urlField: null,
        descriptionField: null,
        attributeFields: [],
      }),
    });

    expect(result.detectedFormat).toBe("tsv");
    expect(result.normalizedRows).toHaveLength(2);
    expect(result.normalizedRows[0]?.path).toEqual(["Europe", "Germany"]);
    expect(result.preview.totalRows).toBe(2);
  });
});
