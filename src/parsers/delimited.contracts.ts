import type { ImportParameters } from "../domain";
import type { ParseResult, ParserInput } from "./contracts";

export interface DelimitedImportParameters extends ImportParameters {
  delimiter: string;
  hasHeaderRow: boolean;
  commentPrefix: string;
}

export interface DelimitedParserInput extends ParserInput {
  parameters: DelimitedImportParameters;
}

export interface DelimitedDataParser {
  parseDelimited(input: DelimitedParserInput): Promise<ParseResult>;
}
