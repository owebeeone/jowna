import type { ParseResult, ParserInput } from "./contracts";

export interface JsonHierarchyParser {
  parseHierarchyJson(input: ParserInput): Promise<ParseResult>;
}

export interface JsonFlatRowsParser {
  parseFlatRowsJson(input: ParserInput): Promise<ParseResult>;
}

