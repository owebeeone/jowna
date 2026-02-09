import type { DataParser, ParserRegistry } from "./contracts";
import { PapaDelimitedParser } from "./delimited.parser";
import { isDelimitedFormat, isJsonFormat } from "./format";
import { JsonDataParser } from "./json.parser";

export class JownaParserRegistry implements ParserRegistry {
  constructor(private readonly parsers: DataParser[]) {}

  listParsers(): readonly DataParser[] {
    return this.parsers;
  }

  getParser(format: Parameters<ParserRegistry["getParser"]>[0]): DataParser | undefined {
    if (isDelimitedFormat(format)) {
      return this.parsers.find(
        (parser) =>
          parser.supportedFormats.includes("csv") || parser.supportedFormats.includes("tsv"),
      );
    }

    if (isJsonFormat(format)) {
      return this.parsers.find(
        (parser) =>
          parser.supportedFormats.includes("json-hierarchy") ||
          parser.supportedFormats.includes("json-flat"),
      );
    }

    return this.parsers.find((parser) => parser.supportedFormats.includes(format));
  }
}

export function createDefaultParserRegistry(): ParserRegistry {
  return new JownaParserRegistry([new PapaDelimitedParser(), new JsonDataParser()]);
}
