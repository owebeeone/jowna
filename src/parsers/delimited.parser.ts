import Papa from "papaparse";
import type {
  ImportParameters,
  ImportWarning,
  NormalizedRow,
  SupportedImportFormat,
  TablePreview,
} from "../domain";
import type { DataParser, ParseResult, ParserInput } from "./contracts";
import type { DelimitedDataParser, DelimitedParserInput } from "./delimited.contracts";
import { buildTreeFromRows } from "./tree";
import { createWarning } from "./warnings";

const PREVIEW_ROW_LIMIT = 100;
const SUPPORTED_FORMATS = ["csv", "tsv"] as const;

export class PapaDelimitedParser implements DataParser, DelimitedDataParser {
  readonly id = "papaparse-delimited";
  readonly supportedFormats = SUPPORTED_FORMATS;

  async parse(input: ParserInput): Promise<ParseResult> {
    const format = normalizeDelimitedFormat(input.parameters.format);
    return this.parseDelimited({
      ...input,
      parameters: {
        ...input.parameters,
        format,
      },
    });
  }

  async parseDelimited(input: DelimitedParserInput): Promise<ParseResult> {
    const warnings: ImportWarning[] = [];
    const filtered = filterCommentLines(input.source.content, input.parameters.commentPrefix);
    const delimiter = resolveDelimiter(input.parameters);
    const parsed = Papa.parse<Record<string, string> | string[]>(filtered.content, {
      delimiter,
      header: input.parameters.hasHeaderRow,
      skipEmptyLines: false,
      transformHeader: (header) => header.trim(),
    });

    parsed.errors.forEach((error) => {
      warnings.push(
        createWarning({
          code: "PARSE_ERROR",
          message: error.message,
          row: resolveSourceRow(filtered.sourceRows, input.parameters.hasHeaderRow, error.row ?? 0),
        }),
      );
    });

    const rawRows = parsed.data.filter((row) => row !== null && row !== undefined);
    const normalized = input.parameters.hasHeaderRow
      ? normalizeObjectRows(
          rawRows as Record<string, string>[],
          filtered.sourceRows,
          input.parameters,
        )
      : normalizeArrayRows(rawRows as string[][], filtered.sourceRows, input.parameters);

    const treeResult = buildTreeFromRows(normalized.rows);
    warnings.push(...normalized.warnings, ...treeResult.warnings);

    if (normalized.rows.length === 0 && warnings.length === 0) {
      warnings.push(
        createWarning({
          code: "EMPTY_INPUT",
          message: "No usable rows found.",
        }),
      );
    }

    const previewColumns = [
      "sourceRow",
      "magnitude",
      "path",
      "url",
      "description",
      ...normalized.attributeKeys,
    ];

    return {
      detectedFormat: input.parameters.format,
      normalizedRows: normalized.rows,
      preview: createPreview(previewColumns, normalized.rows),
      tree: treeResult.tree,
      warnings,
    };
  }
}

interface FilteredContent {
  content: string;
  sourceRows: number[];
}

interface NormalizedRowsResult {
  rows: NormalizedRow[];
  warnings: ImportWarning[];
  attributeKeys: string[];
}

function filterCommentLines(content: string, commentPrefix: string): FilteredContent {
  if (!commentPrefix) {
    const sourceRows = content.split(/\r?\n/).map((_, index) => index + 1);
    return { content, sourceRows };
  }

  const lines = content.split(/\r?\n/);
  const filteredLines: string[] = [];
  const sourceRows: number[] = [];
  lines.forEach((line, index) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith(commentPrefix)) {
      return;
    }
    filteredLines.push(line);
    sourceRows.push(index + 1);
  });

  return {
    content: filteredLines.join("\n"),
    sourceRows,
  };
}

function normalizeObjectRows(
  rows: Record<string, string>[],
  sourceRows: number[],
  parameters: ImportParameters,
): NormalizedRowsResult {
  const normalized: NormalizedRow[] = [];
  const localWarnings: ImportWarning[] = [];
  const attributeKeys = new Set<string>(parameters.attributeFields);

  rows.forEach((row, rowIndex) => {
    const sourceRow = resolveSourceRow(sourceRows, true, rowIndex);
    const magnitude = Number(readObjectField(row, parameters.magnitudeField));
    const path = parameters.pathFields
      .map((field) => readObjectField(row, field).trim())
      .filter((value) => value.length > 0);

    if (!Number.isFinite(magnitude) || magnitude < 0) {
      localWarnings.push(
        createWarning({
          code: "INVALID_MAGNITUDE",
          message: `Invalid magnitude '${readObjectField(row, parameters.magnitudeField)}'.`,
          row: sourceRow,
          column: parameters.magnitudeField,
        }),
      );
      return;
    }

    if (path.length === 0) {
      localWarnings.push(
        createWarning({
          code: "MISSING_PATH",
          message: "Path fields are empty after normalization.",
          row: sourceRow,
        }),
      );
      return;
    }

    const attributes = Object.fromEntries(
      parameters.attributeFields.map((field) => [field, readObjectField(row, field)]),
    );

    normalized.push({
      rowId: `row-${sourceRow}`,
      sourceRow,
      magnitude,
      path,
      url: nullableObjectField(row, parameters.urlField),
      description: nullableObjectField(row, parameters.descriptionField),
      attributes,
    });
  });

  return {
    rows: normalized,
    warnings: localWarnings,
    attributeKeys: [...attributeKeys],
  };
}

function normalizeArrayRows(
  rows: string[][],
  sourceRows: number[],
  parameters: ImportParameters,
): NormalizedRowsResult {
  const localWarnings: ImportWarning[] = [];
  const normalized: NormalizedRow[] = [];
  const maxColumns = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const headers = Array.from({ length: maxColumns }, (_, index) => `col${index + 1}`);
  const attributeKeys = new Set<string>(parameters.attributeFields);

  rows.forEach((row, rowIndex) => {
    const padded = [...row];
    while (padded.length < maxColumns) {
      padded.push("");
    }

    const sourceRow = resolveSourceRow(sourceRows, false, rowIndex);
    const rowAsObject = Object.fromEntries(
      headers.map((header, headerIndex) => [header, padded[headerIndex] ?? ""]),
    );
    const magnitudeRaw = readObjectField(rowAsObject, parameters.magnitudeField);
    const magnitude = Number(magnitudeRaw);
    const path = parameters.pathFields
      .map((field) => readObjectField(rowAsObject, field).trim())
      .filter((value) => value.length > 0);

    if (!Number.isFinite(magnitude) || magnitude < 0) {
      localWarnings.push(
        createWarning({
          code: "INVALID_MAGNITUDE",
          message: `Invalid magnitude '${magnitudeRaw}'.`,
          row: sourceRow,
          column: parameters.magnitudeField,
        }),
      );
      return;
    }

    if (path.length === 0) {
      localWarnings.push(
        createWarning({
          code: "MISSING_PATH",
          message: "Path fields are empty after normalization.",
          row: sourceRow,
        }),
      );
      return;
    }

    const attributes = Object.fromEntries(
      parameters.attributeFields.map((field) => [field, readObjectField(rowAsObject, field)]),
    );

    normalized.push({
      rowId: `row-${sourceRow}`,
      sourceRow,
      magnitude,
      path,
      url: nullableObjectField(rowAsObject, parameters.urlField),
      description: nullableObjectField(rowAsObject, parameters.descriptionField),
      attributes,
    });
  });

  return {
    rows: normalized,
    warnings: localWarnings,
    attributeKeys: [...attributeKeys],
  };
}

function createPreview(columns: string[], rows: NormalizedRow[]): TablePreview {
  return {
    columns,
    rows: rows.slice(0, PREVIEW_ROW_LIMIT),
    totalRows: rows.length,
    truncated: rows.length > PREVIEW_ROW_LIMIT,
  };
}

function resolveSourceRow(
  sourceRows: number[],
  hasHeaderRow: boolean,
  dataRowIndex: number,
): number {
  const index = hasHeaderRow ? dataRowIndex + 1 : dataRowIndex;
  return sourceRows[index] ?? dataRowIndex + 1;
}

function normalizeDelimitedFormat(format: SupportedImportFormat): "csv" | "tsv" {
  return format === "tsv" ? "tsv" : "csv";
}

function resolveDelimiter(parameters: ImportParameters): string {
  if (parameters.delimiter.length > 0) {
    return parameters.delimiter;
  }
  return parameters.format === "tsv" ? "\t" : ",";
}

function readObjectField(row: Record<string, string>, field: string): string {
  const value = row[field];
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function nullableObjectField(row: Record<string, string>, field: string | null): string | null {
  if (!field) {
    return null;
  }
  const value = readObjectField(row, field);
  return value.length > 0 ? value : null;
}
