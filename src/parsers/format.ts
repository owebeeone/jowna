import type { ImportParameters, ImportSource, SupportedImportFormat } from "../domain";
import type { ParserInput } from "./contracts";

const DELIMITED_FORMATS: SupportedImportFormat[] = ["csv", "tsv"];
const JSON_FORMATS: SupportedImportFormat[] = ["json-hierarchy", "json-flat"];

export function resolveImportFormat(input: ParserInput): SupportedImportFormat {
  if (input.parameters.format !== "auto") {
    return input.parameters.format;
  }

  if (input.formatHint && input.formatHint !== "auto") {
    return input.formatHint;
  }

  return detectFormatFromSource(input.source);
}

export function detectFormatFromSource(source: ImportSource): SupportedImportFormat {
  const byExtension = detectFormatFromFileName(source.name);
  if (byExtension) {
    if (byExtension === "json-hierarchy") {
      return detectJsonSubformat(source.content);
    }
    return byExtension;
  }

  return detectFormatFromContent(source.content);
}

export function isDelimitedFormat(format: SupportedImportFormat): boolean {
  return DELIMITED_FORMATS.includes(format);
}

export function isJsonFormat(format: SupportedImportFormat): boolean {
  return JSON_FORMATS.includes(format);
}

export function normalizeParametersForFormat(
  parameters: ImportParameters,
  format: SupportedImportFormat,
): ImportParameters {
  if (format === "tsv" && parameters.delimiter.length === 0) {
    return { ...parameters, delimiter: "\t", format };
  }
  if (format === "csv" && parameters.delimiter.length === 0) {
    return { ...parameters, delimiter: ",", format };
  }
  return { ...parameters, format };
}

function detectFormatFromFileName(sourceName: string): SupportedImportFormat | undefined {
  const normalized = sourceName.toLowerCase();

  if (normalized.endsWith(".tsv")) {
    return "tsv";
  }
  if (normalized.endsWith(".csv")) {
    return "csv";
  }
  if (normalized.endsWith(".json")) {
    return "json-hierarchy";
  }

  return undefined;
}

function detectFormatFromContent(content: string): SupportedImportFormat {
  const trimmed = content.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return detectJsonSubformat(content);
  }
  return "csv";
}

function detectJsonSubformat(content: string): SupportedImportFormat {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return "json-flat";
      }
      const first = parsed[0] as Record<string, unknown>;
      if (first && typeof first === "object" && "path" in first) {
        return "json-flat";
      }
      return "json-hierarchy";
    }
    return "json-hierarchy";
  } catch {
    return "json-hierarchy";
  }
}
