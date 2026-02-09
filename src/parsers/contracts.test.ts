import { describe, expect, it } from "vitest";
import type { ImportWarning, NormalizedRow, SupportedImportFormat, TreeNode } from "../domain";
import { makeImportParameters, makeImportSource, makeWarning } from "../test-support/fixtures";
import type { DataParser, ParseResult, ParserInput, ParserRegistry } from "./contracts";
import type { DelimitedDataParser } from "./delimited.contracts";
import type { JsonFlatRowsParser, JsonHierarchyParser } from "./json.contracts";

class FakeDelimitedParser implements DataParser, DelimitedDataParser {
  readonly id = "fake-delimited";
  readonly supportedFormats = ["csv", "tsv"] as const;

  async parse(input: ParserInput): Promise<ParseResult> {
    return this.parseDelimited(input);
  }

  async parseDelimited(input: ParserInput): Promise<ParseResult> {
    const delimiter = input.parameters.delimiter;
    const commentPrefix = input.parameters.commentPrefix;
    const hasHeaderRow = input.parameters.hasHeaderRow;
    const lines = input.source.content
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .filter((line) => !line.trimStart().startsWith(commentPrefix));

    if (lines.length === 0) {
      return {
        detectedFormat: input.parameters.format,
        normalizedRows: [],
        preview: { columns: [], rows: [], totalRows: 0, truncated: false },
        tree: { name: "Root", magnitude: 0, children: [] },
        warnings: [
          makeWarning({ code: "EMPTY_INPUT", message: "No usable rows found", row: undefined }),
        ],
      };
    }

    const header = hasHeaderRow
      ? lines[0]!.split(delimiter).map((value) => value.trim())
      : lines[0]!.split(delimiter).map((_, index) => `col${index + 1}`);
    const dataLines = hasHeaderRow ? lines.slice(1) : lines;
    const warnings: ImportWarning[] = [];
    const normalizedRows: NormalizedRow[] = [];

    dataLines.forEach((line, index) => {
      const rowNumber = hasHeaderRow ? index + 2 : index + 1;
      const columns = line.split(delimiter).map((value) => value.trim());
      const rawMagnitude = readField(columns, header, input.parameters.magnitudeField);
      const magnitude = Number(rawMagnitude);
      const path = input.parameters.pathFields
        .map((field) => readField(columns, header, field))
        .map((field) => field.trim())
        .filter((field) => field.length > 0);

      if (Number.isNaN(magnitude) || magnitude < 0) {
        warnings.push(
          makeWarning({
            row: rowNumber,
            column: input.parameters.magnitudeField,
            message: `Invalid magnitude '${rawMagnitude}'`,
          }),
        );
        return;
      }

      if (path.length === 0) {
        warnings.push(
          makeWarning({
            code: "MISSING_PATH",
            row: rowNumber,
            message: "Path fields are missing after normalization",
          }),
        );
        return;
      }

      normalizedRows.push({
        rowId: `row-${rowNumber}`,
        sourceRow: rowNumber,
        magnitude,
        path,
        url: nullableField(columns, header, input.parameters.urlField),
        description: nullableField(columns, header, input.parameters.descriptionField),
        attributes: Object.fromEntries(
          input.parameters.attributeFields.map((attributeField) => [
            attributeField,
            readField(columns, header, attributeField),
          ]),
        ),
      });
    });

    const tree: TreeNode = {
      name: "Root",
      magnitude: normalizedRows.reduce((sum, row) => sum + row.magnitude, 0),
      children: [],
    };

    return {
      detectedFormat: input.parameters.format,
      normalizedRows,
      preview: {
        columns: header,
        rows: normalizedRows.slice(0, 100),
        totalRows: normalizedRows.length,
        truncated: normalizedRows.length > 100,
      },
      tree,
      warnings,
    };
  }
}

class FakeJsonParser implements DataParser, JsonHierarchyParser, JsonFlatRowsParser {
  readonly id = "fake-json";
  readonly supportedFormats = ["json-hierarchy", "json-flat"] as const;

  async parse(input: ParserInput): Promise<ParseResult> {
    if (input.parameters.format === "json-hierarchy") {
      return this.parseHierarchyJson(input);
    }
    return this.parseFlatRowsJson(input);
  }

  async parseHierarchyJson(input: ParserInput): Promise<ParseResult> {
    const parsed = JSON.parse(input.source.content) as unknown;
    const root = parsed as TreeNode;
    return {
      detectedFormat: "json-hierarchy",
      normalizedRows: [],
      preview: { columns: [], rows: [], totalRows: 0, truncated: false },
      tree: root,
      warnings: [],
    };
  }

  async parseFlatRowsJson(input: ParserInput): Promise<ParseResult> {
    const parsed = JSON.parse(input.source.content) as unknown;
    const rows = parsed as Array<{ magnitude: number; path: string[] }>;
    return {
      detectedFormat: "json-flat",
      normalizedRows: rows.map((row, index) => ({
        rowId: `row-${index + 1}`,
        sourceRow: index + 1,
        magnitude: row.magnitude,
        path: row.path,
        url: null,
        description: null,
        attributes: {},
      })),
      preview: {
        columns: ["magnitude", "path"],
        rows: [],
        totalRows: rows.length,
        truncated: false,
      },
      tree: {
        name: "Root",
        magnitude: rows.reduce((sum, row) => sum + row.magnitude, 0),
        children: [],
      },
      warnings: [],
    };
  }
}

class FakeParserRegistry implements ParserRegistry {
  constructor(private readonly parsers: DataParser[]) {}

  listParsers(): readonly DataParser[] {
    return this.parsers;
  }

  getParser(format: SupportedImportFormat): DataParser | undefined {
    return this.parsers.find((parser) =>
      (parser.supportedFormats as readonly string[]).includes(format),
    );
  }
}

describe("parser contracts", () => {
  it("supports registry lookup by format", () => {
    const registry = new FakeParserRegistry([new FakeDelimitedParser(), new FakeJsonParser()]);
    expect(registry.getParser("csv")?.id).toBe("fake-delimited");
    expect(registry.getParser("json-flat")?.id).toBe("fake-json");
    expect(registry.listParsers()).toHaveLength(2);
  });

  it("covers delimiter/header/comment and warning behavior for invalid rows", async () => {
    const parser = new FakeDelimitedParser();
    const source = makeImportSource({
      content: [
        "# comment row",
        "magnitude,level1,level2,url,description,source",
        "10,Europe,Germany,https://example.com,de,a",
        "bad,Europe,France,,fr,b",
        "7,Asia,Japan,https://example.jp,ja,c",
      ].join("\n"),
    });
    const result = await parser.parse({
      source,
      parameters: makeImportParameters({
        delimiter: ",",
        hasHeaderRow: true,
        commentPrefix: "#",
        magnitudeField: "magnitude",
        pathFields: ["level1", "level2"],
        attributeFields: ["source"],
      }),
    });

    expect(result.normalizedRows).toHaveLength(2);
    expect(result.warnings).toHaveLength(1);
    expect(result.warnings[0]?.column).toBe("magnitude");
    expect(result.preview.totalRows).toBe(2);
  });

  it("supports hierarchy and flat json contract use cases", async () => {
    const parser = new FakeJsonParser();

    const hierarchyResult = await parser.parse({
      source: makeImportSource({
        content: JSON.stringify({ name: "Root", magnitude: 5, children: [] }),
      }),
      parameters: makeImportParameters({ format: "json-hierarchy" }),
    });
    expect(hierarchyResult.detectedFormat).toBe("json-hierarchy");
    expect(hierarchyResult.tree.name).toBe("Root");

    const flatResult = await parser.parse({
      source: makeImportSource({
        content: JSON.stringify([
          { magnitude: 2, path: ["A", "B"] },
          { magnitude: 3, path: ["A", "C"] },
        ]),
      }),
      parameters: makeImportParameters({ format: "json-flat" }),
    });
    expect(flatResult.detectedFormat).toBe("json-flat");
    expect(flatResult.normalizedRows.map((row) => row.magnitude)).toEqual([2, 3]);
  });
});

function readField(columns: string[], header: string[], fieldName: string): string {
  const columnIndex = header.findIndex((column) => column === fieldName);
  if (columnIndex < 0) {
    return "";
  }
  return columns[columnIndex] ?? "";
}

function nullableField(
  columns: string[],
  header: string[],
  fieldName: string | null,
): string | null {
  if (!fieldName) {
    return null;
  }
  const value = readField(columns, header, fieldName);
  return value.length > 0 ? value : null;
}
