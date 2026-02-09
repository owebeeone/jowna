import type { ImportWarning, NormalizedRow, SupportedImportFormat, TablePreview } from "../domain";
import type { DataParser, ParseResult, ParserInput } from "./contracts";
import type { JsonFlatRowsParser, JsonHierarchyParser } from "./json.contracts";
import { buildTreeFromRows, normalizeHierarchyTree } from "./tree";
import { createWarning } from "./warnings";

const PREVIEW_ROW_LIMIT = 100;
const SUPPORTED_FORMATS = ["json-hierarchy", "json-flat"] as const;

export class JsonDataParser implements DataParser, JsonHierarchyParser, JsonFlatRowsParser {
  readonly id = "json-data-parser";
  readonly supportedFormats = SUPPORTED_FORMATS;

  async parse(input: ParserInput): Promise<ParseResult> {
    if (input.parameters.format === "json-flat") {
      return this.parseFlatRowsJson(input);
    }
    return this.parseHierarchyJson(input);
  }

  async parseHierarchyJson(input: ParserInput): Promise<ParseResult> {
    const warnings: ImportWarning[] = [];
    const parsed = safeParseJson(input.source.content, warnings);
    if (parsed === null) {
      return emptyResult("json-hierarchy", warnings);
    }

    const treeResult = normalizeHierarchyTree(parsed);
    warnings.push(...treeResult.warnings);

    return {
      detectedFormat: "json-hierarchy",
      normalizedRows: [],
      preview: {
        columns: [],
        rows: [],
        totalRows: 0,
        truncated: false,
      },
      tree: treeResult.tree,
      warnings,
    };
  }

  async parseFlatRowsJson(input: ParserInput): Promise<ParseResult> {
    const warnings: ImportWarning[] = [];
    const parsed = safeParseJson(input.source.content, warnings);
    if (!Array.isArray(parsed)) {
      warnings.push(
        createWarning({
          code: "INVALID_JSON_FLAT_ROWS",
          message: "JSON flat-row format requires an array of row objects.",
        }),
      );
      return emptyResult("json-flat", warnings);
    }

    const normalized: NormalizedRow[] = [];
    const attributeKeys = new Set<string>();

    parsed.forEach((raw, index) => {
      const sourceRow = index + 1;
      if (!raw || typeof raw !== "object") {
        warnings.push(
          createWarning({
            code: "INVALID_ROW",
            message: "Row is not an object and was skipped.",
            row: sourceRow,
          }),
        );
        return;
      }

      const record = raw as Record<string, unknown>;
      const magnitude = Number(record.magnitude);
      const path = normalizePath(record.path);

      if (!Number.isFinite(magnitude) || magnitude < 0) {
        warnings.push(
          createWarning({
            code: "INVALID_MAGNITUDE",
            message: `Invalid magnitude '${String(record.magnitude)}'.`,
            row: sourceRow,
            column: "magnitude",
          }),
        );
        return;
      }

      if (path.length === 0) {
        warnings.push(
          createWarning({
            code: "MISSING_PATH",
            message: "Path is missing or empty after normalization.",
            row: sourceRow,
            column: "path",
          }),
        );
        return;
      }

      const attributes = collectAttributes(record);
      Object.keys(attributes).forEach((key) => attributeKeys.add(key));

      normalized.push({
        rowId: `row-${sourceRow}`,
        sourceRow,
        magnitude,
        path,
        url: nullableString(record.url),
        description: nullableString(record.description),
        attributes,
      });
    });

    const treeResult = buildTreeFromRows(normalized);
    warnings.push(...treeResult.warnings);

    return {
      detectedFormat: "json-flat",
      normalizedRows: normalized,
      preview: createPreview(normalized, attributeKeys),
      tree: treeResult.tree,
      warnings,
    };
  }
}

function safeParseJson(content: string, warnings: ImportWarning[]): unknown | null {
  try {
    return JSON.parse(content) as unknown;
  } catch (error) {
    warnings.push(
      createWarning({
        code: "INVALID_JSON",
        message: `Unable to parse JSON: ${(error as Error).message}`,
      }),
    );
    return null;
  }
}

function normalizePath(rawPath: unknown): string[] {
  if (!Array.isArray(rawPath)) {
    return [];
  }
  return rawPath.map((segment) => String(segment).trim()).filter((segment) => segment.length > 0);
}

function nullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function collectAttributes(record: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([key]) => !["magnitude", "path", "url", "description"].includes(key))
      .filter(([, value]) => typeof value === "string" || typeof value === "number")
      .map(([key, value]) => [key, String(value)]),
  );
}

function createPreview(rows: NormalizedRow[], attributeKeys: Set<string>): TablePreview {
  return {
    columns: ["sourceRow", "magnitude", "path", "url", "description", ...attributeKeys],
    rows: rows.slice(0, PREVIEW_ROW_LIMIT),
    totalRows: rows.length,
    truncated: rows.length > PREVIEW_ROW_LIMIT,
  };
}

function emptyResult(
  detectedFormat: SupportedImportFormat,
  warnings: ImportWarning[],
): ParseResult {
  return {
    detectedFormat,
    normalizedRows: [],
    preview: {
      columns: [],
      rows: [],
      totalRows: 0,
      truncated: false,
    },
    tree: { name: "Root", magnitude: 0, children: [] },
    warnings,
  };
}
