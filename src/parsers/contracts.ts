import type {
  ImportParameters,
  ImportSource,
  ImportWarning,
  NormalizedRow,
  SupportedImportFormat,
  TablePreview,
  TreeNode,
} from "../domain";

export interface ParserInput {
  source: ImportSource;
  parameters: ImportParameters;
  formatHint?: SupportedImportFormat;
}

export interface ParseResult {
  detectedFormat: SupportedImportFormat;
  normalizedRows: NormalizedRow[];
  preview: TablePreview;
  tree: TreeNode;
  warnings: ImportWarning[];
}

export interface DataParser {
  readonly id: string;
  readonly supportedFormats: readonly SupportedImportFormat[];
  parse(input: ParserInput): Promise<ParseResult>;
}

export interface ParserRegistry {
  listParsers(): readonly DataParser[];
  getParser(format: SupportedImportFormat): DataParser | undefined;
}

export interface ParserContractDefinition {
  format: SupportedImportFormat;
  requiredParameters: readonly (keyof ImportParameters)[];
}
