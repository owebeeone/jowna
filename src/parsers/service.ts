import type { ParseResult, ParserInput, ParserRegistry } from "./contracts";
import { normalizeParametersForFormat, resolveImportFormat } from "./format";

export interface ParseImportService {
  parse(input: ParserInput): Promise<ParseResult>;
}

export class DefaultParseImportService implements ParseImportService {
  constructor(private readonly registry: ParserRegistry) {}

  async parse(input: ParserInput): Promise<ParseResult> {
    const resolvedFormat = resolveImportFormat(input);
    const parser = this.registry.getParser(resolvedFormat);

    if (!parser) {
      throw new Error(`No parser registered for format '${resolvedFormat}'.`);
    }

    return parser.parse({
      ...input,
      parameters: normalizeParametersForFormat(input.parameters, resolvedFormat),
    });
  }
}
