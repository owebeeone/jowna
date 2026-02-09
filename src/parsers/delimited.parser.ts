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
    const parseResult = parseWithHeaderFallback(filtered.content, delimiter, input.parameters);
    const { parsed, hasHeaderRow } = parseResult;

    parsed.errors.forEach((error) => {
      warnings.push(
        createWarning({
          code: "PARSE_ERROR",
          message: error.message,
          row: resolveSourceRow(filtered.sourceRows, hasHeaderRow, error.row ?? 0),
        }),
      );
    });

    const rawRows = parsed.data.filter((row) => row !== null && row !== undefined);
    const normalized = hasHeaderRow
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

interface ParsedDelimitedContent {
  parsed: Papa.ParseResult<Record<string, string> | string[]>;
  hasHeaderRow: boolean;
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
    const rowFields = Object.keys(row);
    const magnitudeField = resolveMagnitudeField(rowFields, parameters);
    const magnitudeRaw = readObjectField(row, magnitudeField);
    const magnitude = Number(magnitudeRaw);
    const path = resolvePathValues(row, rowFields, parameters, magnitudeField);

    if (!Number.isFinite(magnitude) || magnitude < 0) {
      localWarnings.push(
        createWarning({
          code: "INVALID_MAGNITUDE",
          message: `Invalid magnitude '${magnitudeRaw}'.`,
          row: sourceRow,
          column: magnitudeField,
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
    const magnitudeField = resolveMagnitudeField(headers, parameters);
    const magnitudeRaw = readObjectField(rowAsObject, magnitudeField);
    const magnitude = Number(magnitudeRaw);
    const path = resolvePathValues(rowAsObject, headers, parameters, magnitudeField);

    if (!Number.isFinite(magnitude) || magnitude < 0) {
      localWarnings.push(
        createWarning({
          code: "INVALID_MAGNITUDE",
          message: `Invalid magnitude '${magnitudeRaw}'.`,
          row: sourceRow,
          column: magnitudeField,
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

function parseWithHeaderFallback(
  content: string,
  delimiter: string,
  parameters: ImportParameters,
): ParsedDelimitedContent {
  const parsedWithConfiguredHeader = parseDelimitedContent(
    content,
    delimiter,
    parameters.hasHeaderRow,
  );
  if (parameters.hasHeaderRow && shouldFallbackToNoHeader(parsedWithConfiguredHeader, parameters)) {
    return {
      parsed: parseDelimitedContent(content, delimiter, false),
      hasHeaderRow: false,
    };
  }
  return {
    parsed: parsedWithConfiguredHeader,
    hasHeaderRow: parameters.hasHeaderRow,
  };
}

function parseDelimitedContent(
  content: string,
  delimiter: string,
  hasHeaderRow: boolean,
): Papa.ParseResult<Record<string, string> | string[]> {
  return Papa.parse<Record<string, string> | string[]>(content, {
    delimiter,
    header: hasHeaderRow,
    skipEmptyLines: false,
    transformHeader: (header) => header.trim(),
  });
}

function shouldFallbackToNoHeader(
  parsed: Papa.ParseResult<Record<string, string> | string[]>,
  parameters: ImportParameters,
): boolean {
  const headerFields = parsed.meta.fields?.map((field) => field.trim()) ?? [];
  if (headerFields.length === 0) {
    return false;
  }
  if (headerFields.includes(parameters.magnitudeField)) {
    return false;
  }
  const firstField = headerFields[0] ?? "";
  return firstField.length > 0 && Number.isFinite(Number(firstField));
}

function resolveMagnitudeField(availableFields: string[], parameters: ImportParameters): string {
  if (availableFields.includes(parameters.magnitudeField)) {
    return parameters.magnitudeField;
  }
  if (availableFields.includes("col1")) {
    return "col1";
  }
  return availableFields[0] ?? parameters.magnitudeField;
}

function resolvePathValues(
  row: Record<string, string>,
  availableFields: string[],
  parameters: ImportParameters,
  magnitudeField: string,
): string[] {
  const configuredPath = parameters.pathFields
    .map((field) => readObjectField(row, field).trim())
    .filter((value) => value.length > 0);
  if (configuredPath.length > 0) {
    return configuredPath;
  }

  const fallbackPathFields = availableFields.filter((field) =>
    isPathFallbackField(field, parameters, magnitudeField),
  );
  return fallbackPathFields
    .map((field) => readObjectField(row, field).trim())
    .filter((value) => value.length > 0);
}

function isPathFallbackField(
  field: string,
  parameters: ImportParameters,
  magnitudeField: string,
): boolean {
  if (field.length === 0) {
    return false;
  }
  if (field === magnitudeField) {
    return false;
  }
  if (parameters.pathFields.includes(field)) {
    return false;
  }
  if (parameters.attributeFields.includes(field)) {
    return false;
  }
  if (parameters.urlField && field === parameters.urlField) {
    return false;
  }
  if (parameters.descriptionField && field === parameters.descriptionField) {
    return false;
  }
  return true;
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
