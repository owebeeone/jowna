export interface CanonicalPath {
  role: "wedge" | "highlight" | "other";
  className: string;
  fill: string;
  d: string;
}

export interface CanonicalText {
  text: string;
  x: number | null;
  y: number | null;
  rotate: number | null;
  anchor: string;
}

export interface CanonicalSvg {
  width: number | null;
  height: number | null;
  wedges: CanonicalPath[];
  labels: CanonicalText[];
}

export interface CanonicalSvgCompareResult {
  wedgeCountExpected: number;
  wedgeCountActual: number;
  labelCountExpected: number;
  labelCountActual: number;
  wedgeGeometryMatches: number;
  wedgeColorMatches: number;
  labelMatches: number;
  wedgeGeometryMatchRatio: number;
  wedgeColorMatchRatio: number;
  labelMatchRatio: number;
  samples: {
    missingExpectedWedgeD: string[];
    unexpectedActualWedgeD: string[];
  };
}

interface CanonicalizeOptions {
  decimals?: number;
}

const DEFAULT_DECIMALS = 4;

export function canonicalizeSvg(svg: string, options?: CanonicalizeOptions): CanonicalSvg {
  const decimals = options?.decimals ?? DEFAULT_DECIMALS;
  const svgTag = /<svg\b([^>]*)>/i.exec(svg)?.[1] ?? "";
  const svgAttrs = parseAttributes(svgTag);
  const width = parseNullableNumber(svgAttrs.width);
  const height = parseNullableNumber(svgAttrs.height);

  const wedges: CanonicalPath[] = [];
  const pathTagRegex = /<path\b([^>]*)>/gi;
  let pathTagMatch = pathTagRegex.exec(svg);
  while (pathTagMatch) {
    const attrs = parseAttributes(pathTagMatch[1] ?? "");
    const d = canonicalizePathData(attrs.d ?? "", decimals);
    if (d.length > 0) {
      const className = normalizeWhitespace(attrs.class ?? "");
      const role = inferPathRole(className);
      wedges.push({
        role,
        className,
        fill: normalizeWhitespace(attrs.fill ?? ""),
        d,
      });
    }
    pathTagMatch = pathTagRegex.exec(svg);
  }

  const labels: CanonicalText[] = [];
  const textRegex = /<text\b([^>]*)>([\s\S]*?)<\/text>/gi;
  let textMatch = textRegex.exec(svg);
  while (textMatch) {
    const attrs = parseAttributes(textMatch[1] ?? "");
    labels.push({
      text: decodeXmlEntities(stripTags(textMatch[2] ?? "").trim()),
      x: parseNullableNumber(attrs.x, decimals),
      y: parseNullableNumber(attrs.y, decimals),
      rotate: parseRotateDegrees(attrs.transform, decimals),
      anchor: normalizeWhitespace(attrs["text-anchor"] ?? attrs.textAnchor ?? ""),
    });
    textMatch = textRegex.exec(svg);
  }

  wedges.sort((left, right) => {
    if (left.d !== right.d) {
      return left.d.localeCompare(right.d);
    }
    if (left.fill !== right.fill) {
      return left.fill.localeCompare(right.fill);
    }
    return left.className.localeCompare(right.className);
  });

  labels.sort((left, right) => {
    if (left.text !== right.text) {
      return left.text.localeCompare(right.text);
    }
    if ((left.x ?? 0) !== (right.x ?? 0)) {
      return (left.x ?? 0) - (right.x ?? 0);
    }
    if ((left.y ?? 0) !== (right.y ?? 0)) {
      return (left.y ?? 0) - (right.y ?? 0);
    }
    return (left.rotate ?? 0) - (right.rotate ?? 0);
  });

  return {
    width,
    height,
    wedges,
    labels,
  };
}

export function compareCanonicalSvg(
  expected: CanonicalSvg,
  actual: CanonicalSvg,
): CanonicalSvgCompareResult {
  const expectedWedges = expected.wedges.filter((entry) => entry.role === "wedge");
  const actualWedges = actual.wedges.filter((entry) => entry.role === "wedge");

  const expectedByPath = toMultiMap(expectedWedges, (entry) => entry.d);
  const actualByPath = toMultiMap(actualWedges, (entry) => entry.d);
  const allPathKeys = new Set([...expectedByPath.keys(), ...actualByPath.keys()]);

  let wedgeGeometryMatches = 0;
  let wedgeColorMatches = 0;
  const missingExpectedWedgeD: string[] = [];
  const unexpectedActualWedgeD: string[] = [];

  for (const key of allPathKeys) {
    const expectedItems = expectedByPath.get(key) ?? [];
    const actualItems = actualByPath.get(key) ?? [];
    const overlap = Math.min(expectedItems.length, actualItems.length);
    wedgeGeometryMatches += overlap;

    for (let index = 0; index < overlap; index += 1) {
      if (expectedItems[index]?.fill === actualItems[index]?.fill) {
        wedgeColorMatches += 1;
      }
    }

    if (expectedItems.length > actualItems.length) {
      missingExpectedWedgeD.push(key);
    } else if (actualItems.length > expectedItems.length) {
      unexpectedActualWedgeD.push(key);
    }
  }

  const expectedLabels = expected.labels.filter((entry) => entry.text.length > 0);
  const actualLabels = actual.labels.filter((entry) => entry.text.length > 0);
  const labelMatches = countExactLabelMatches(expectedLabels, actualLabels);

  return {
    wedgeCountExpected: expectedWedges.length,
    wedgeCountActual: actualWedges.length,
    labelCountExpected: expectedLabels.length,
    labelCountActual: actualLabels.length,
    wedgeGeometryMatches,
    wedgeColorMatches,
    labelMatches,
    wedgeGeometryMatchRatio: ratio(wedgeGeometryMatches, Math.max(expectedWedges.length, 1)),
    wedgeColorMatchRatio: ratio(wedgeColorMatches, Math.max(expectedWedges.length, 1)),
    labelMatchRatio: ratio(labelMatches, Math.max(expectedLabels.length, 1)),
    samples: {
      missingExpectedWedgeD: missingExpectedWedgeD.slice(0, 10),
      unexpectedActualWedgeD: unexpectedActualWedgeD.slice(0, 10),
    },
  };
}

function countExactLabelMatches(expected: CanonicalText[], actual: CanonicalText[]): number {
  const expectedMap = toMultiMap(expected, labelKey);
  const actualMap = toMultiMap(actual, labelKey);
  let matches = 0;
  for (const [key, expectedItems] of expectedMap.entries()) {
    const actualItems = actualMap.get(key) ?? [];
    matches += Math.min(expectedItems.length, actualItems.length);
  }
  return matches;
}

function labelKey(entry: CanonicalText): string {
  return [
    entry.text,
    entry.x == null ? "null" : String(entry.x),
    entry.y == null ? "null" : String(entry.y),
    entry.rotate == null ? "null" : String(entry.rotate),
    entry.anchor,
  ].join("|");
}

function inferPathRole(className: string): "wedge" | "highlight" | "other" {
  if (/\bwedge\b/.test(className) || /\bchart-wedge\b/.test(className)) {
    return "wedge";
  }
  if (/\bhighlight\b/.test(className)) {
    return "highlight";
  }
  return "other";
}

function canonicalizePathData(value: string, decimals: number): string {
  const source = normalizeWhitespace(value.replaceAll(",", " "));
  if (source.length === 0) {
    return "";
  }
  const tokens =
    source.match(/[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) ?? [];
  const normalized: string[] = [];
  for (const token of tokens) {
    if (/^[AaCcHhLlMmQqSsTtVvZz]$/.test(token)) {
      normalized.push(token.toUpperCase());
      continue;
    }
    const number = Number(token);
    if (!Number.isFinite(number)) {
      continue;
    }
    normalized.push(formatNumber(number, decimals));
  }
  return normalized.join(" ");
}

function parseRotateDegrees(value: string | undefined, decimals: number): number | null {
  if (!value) {
    return null;
  }
  const match = /rotate\(\s*([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/i.exec(value);
  if (!match?.[1]) {
    return null;
  }
  const parsed = Number(match[1]);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Number(formatNumber(parsed, decimals));
}

function parseNullableNumber(
  value: string | undefined,
  decimals = DEFAULT_DECIMALS,
): number | null {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return Number(formatNumber(parsed, decimals));
}

function formatNumber(value: number, decimals: number): string {
  const rounded = Number(value.toFixed(decimals));
  if (Object.is(rounded, -0)) {
    return "0";
  }
  return String(rounded);
}

function parseAttributes(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /([^\s=/>]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match = regex.exec(raw);
  while (match) {
    const key = match[1]?.trim();
    const value = match[3] ?? match[4] ?? "";
    if (key) {
      attrs[key] = value;
    }
    match = regex.exec(raw);
  }
  return attrs;
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function decodeXmlEntities(value: string): string {
  return value
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function ratio(numerator: number, denominator: number): number {
  if (denominator <= 0) {
    return 1;
  }
  return numerator / denominator;
}

function toMultiMap<T>(items: T[], keyOf: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const list = map.get(key);
    if (list) {
      list.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}
