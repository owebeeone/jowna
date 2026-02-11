import type { ChartLayoutNode, ChartLayoutResult } from "../../../features/chart";
import {
  KRONA_LIGHTNESS_BASE,
  KRONA_LIGHTNESS_MAX,
  KRONA_SATURATION,
  KRONA_UNCLASSIFIED_COLOR,
} from "./constants";
import { isUnclassifiedNodeName } from "./classification";
import { computeLayoutDataMaxDepthWithMode } from "./geometry";
import { pathKey } from "./path";

export function buildKronaColorMap(
  layout: ChartLayoutResult | null,
  collapseEnabled = false,
): Map<string, string> {
  const colors = new Map<string, string>();
  if (!layout || layout.nodes.length === 0) {
    return colors;
  }

  const root = layout.nodes.find((node) => node.depth === 0) ?? layout.nodes[0]!;
  const existingPathKeys = new Set(layout.nodes.map((node) => pathKey(node.path)));
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  for (const node of layout.nodes) {
    if (isUnclassifiedNodeName(node.name)) {
      colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
      continue;
    }
    if (node.depth === 0) {
      continue;
    }
    const parent = pathKey(
      resolveNearestExistingAncestorPath(node.path.slice(0, -1), existingPathKeys),
    );
    const children = childrenByParent.get(parent);
    if (children) {
      children.push(node);
    } else {
      childrenByParent.set(parent, [node]);
    }
  }

  childrenByParent.forEach((children) => {
    children.sort((left, right) => {
      if (left.startAngle !== right.startAngle) {
        return left.startAngle - right.startAngle;
      }
      return left.endAngle - right.endAngle;
    });
  });

  const maxDepth = computeLayoutDataMaxDepthWithMode(layout, collapseEnabled) + 1;
  const depthNormalizer = maxDepth > 8 ? 8 : Math.max(maxDepth, 1);
  const lightnessFactor = (KRONA_LIGHTNESS_MAX - KRONA_LIGHTNESS_BASE) / depthNormalizer;

  const assignColor = (
    node: ChartLayoutNode,
    hueMin: number,
    hueMax: number,
    baseMagnitude: number,
  ): void => {
    let boundedHueMax = hueMax;
    if (boundedHueMax - hueMin > 1 / 12) {
      boundedHueMax = hueMin + 1 / 12;
    }

    const nodeDepth = collapseEnabled ? (node.collapsedDepth ?? node.depth) : node.depth;
    const relativeDepth = nodeDepth + 1;
    if (nodeDepth > 0) {
      if (node.magnitude <= 0 || isUnclassifiedNodeName(node.name)) {
        colors.set(pathKey(node.path), KRONA_UNCLASSIFIED_COLOR);
      } else {
        const lightness = Math.min(
          KRONA_LIGHTNESS_MAX,
          KRONA_LIGHTNESS_BASE + (relativeDepth - 1) * lightnessFactor,
        );
        const rgb = hslToRgb(hueMin, KRONA_SATURATION, lightness);
        colors.set(pathKey(node.path), rgbText(rgb.r, rgb.g, rgb.b));
      }
    }

    const children = childrenByParent.get(pathKey(node.path)) ?? [];
    if (children.length === 0) {
      return;
    }

    let childBaseMagnitude = baseMagnitude;
    for (let index = 0; index < children.length; index += 1) {
      const child = children[index]!;
      let childHueMin: number;
      let childHueMax: number;

      if (node.depth === 0) {
        if (children.length > 6) {
          childHueMin = (1 - Math.pow(1 - index / children.length, 1.4)) * 0.95;
          childHueMax = (1 - Math.pow(1 - (index + 0.55) / children.length, 1.4)) * 0.95;
        } else {
          childHueMin = index / children.length;
          childHueMax = (index + 0.55) / children.length;
        }
      } else if (node.magnitude > 0) {
        childHueMin = lerp(
          childBaseMagnitude,
          baseMagnitude,
          baseMagnitude + node.magnitude,
          hueMin,
          boundedHueMax,
        );
        childHueMax = lerp(
          childBaseMagnitude + child.magnitude * 0.99,
          baseMagnitude,
          baseMagnitude + node.magnitude,
          hueMin,
          boundedHueMax,
        );
      } else {
        childHueMin = hueMin;
        childHueMax = boundedHueMax;
      }

      assignColor(child, childHueMin, childHueMax, childBaseMagnitude);
      childBaseMagnitude += Math.max(0, child.magnitude);
    }
  };

  assignColor(root, 0, 1, 0);
  return colors;
}

export function resolveNodeFillColor(
  colors: Map<string, string>,
  candidatePaths: string[][],
  fallbackColor = KRONA_UNCLASSIFIED_COLOR,
): string {
  for (const candidate of candidatePaths) {
    if (!candidate || candidate.length === 0) {
      continue;
    }
    for (let length = candidate.length; length >= 1; length -= 1) {
      const color = colors.get(pathKey(candidate.slice(0, length)));
      if (typeof color === "string" && color.length > 0) {
        return color;
      }
    }
  }
  return fallbackColor;
}

function resolveNearestExistingAncestorPath(
  path: string[],
  existingPathKeys: Set<string>,
): string[] {
  for (let length = path.length; length >= 0; length -= 1) {
    const candidate = path.slice(0, length);
    if (existingPathKeys.has(pathKey(candidate))) {
      return candidate;
    }
  }
  return [];
}

function lerp(
  value: number,
  rangeStart: number,
  rangeEnd: number,
  outputStart: number,
  outputEnd: number,
): number {
  if (rangeEnd === rangeStart) {
    return outputStart;
  }
  return outputStart + ((value - rangeStart) / (rangeEnd - rangeStart)) * (outputEnd - outputStart);
}

function rgbText(red: number, green: number, blue: number): string {
  return `rgb(${red},${green},${blue})`;
}

function hslToRgb(
  hue: number,
  saturation: number,
  lightness: number,
): { r: number; g: number; b: number } {
  if (saturation === 0) {
    const value = Math.floor(lightness * 255);
    return { r: value, g: value, b: value };
  }

  const m2 =
    lightness <= 0.5
      ? lightness * (saturation + 1)
      : lightness + saturation - lightness * saturation;
  const m1 = lightness * 2 - m2;

  return {
    r: Math.floor(hueToRgb(m1, m2, hue + 1 / 3)),
    g: Math.floor(hueToRgb(m1, m2, hue)),
    b: Math.floor(hueToRgb(m1, m2, hue - 1 / 3)),
  };
}

function hueToRgb(m1: number, m2: number, hue: number): number {
  let normalizedHue = hue;

  while (normalizedHue < 0) {
    normalizedHue += 1;
  }

  while (normalizedHue > 1) {
    normalizedHue -= 1;
  }

  let value: number;
  if (6 * normalizedHue < 1) {
    value = m1 + (m2 - m1) * normalizedHue * 6;
  } else if (2 * normalizedHue < 1) {
    value = m2;
  } else if (3 * normalizedHue < 2) {
    value = m1 + (m2 - m1) * (2 / 3 - normalizedHue) * 6;
  } else {
    value = m1;
  }

  return value * 255;
}
