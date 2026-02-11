import { describe, expect, it } from "vitest";
import {
  ellipsizeKronaLabel,
  formatKronaKeyLabel,
  formatKronaPercentageFromFraction,
  formatKronaUnclassifiedText,
  toKronaDisplayName,
} from "./text";

describe("text", () => {
  it("matches Krona percentage rounding behavior", () => {
    expect(formatKronaPercentageFromFraction(0.25)).toBe("25");
    expect(formatKronaPercentageFromFraction(0.004)).toBe("0.4");
    expect(formatKronaPercentageFromFraction(0.0004)).toBe("0.04");
  });

  it("formats key labels like Krona", () => {
    expect(formatKronaKeyLabel("Node", 5, 100)).toBe("Node   5%");
  });

  it("formats unclassified labels with bracket syntax", () => {
    expect(formatKronaUnclassifiedText("Bacteria")).toBe("[other Bacteria]");
    expect(toKronaDisplayName("other Bacteria")).toBe("[other Bacteria]");
    expect(toKronaDisplayName("[other Bacteria]")).toBe("[other Bacteria]");
  });

  it("truncates labels with middle ellipsis like Krona", () => {
    expect(ellipsizeKronaLabel("Prochlorococcus marinus", 10)).toBe("Proc...inus");
    expect(ellipsizeKronaLabel("ABCDEFG", 2)).toBe("...");
    expect(ellipsizeKronaLabel("Alpha", 10)).toBe("Alpha");
  });
});
