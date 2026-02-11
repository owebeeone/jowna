import type { ChartLayoutResult } from "../../../features/chart";
import { isUnclassifiedNodeName } from "./classification";

export function polarPoint(radius: number, angle: number): { x: number; y: number } {
  return {
    x: Math.cos(angle + Math.PI / 2) * radius,
    y: Math.sin(angle + Math.PI / 2) * radius,
  };
}

export function arcPath(
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  if (endAngle <= startAngle) {
    return "";
  }

  let adjustedEndAngle = endAngle;
  if (Math.abs(endAngle - (startAngle + Math.PI * 2)) < 1e-9) {
    adjustedEndAngle -= 0.1 / Math.max(outerRadius, 1);
  }

  const largeArc = adjustedEndAngle - startAngle > Math.PI ? 1 : 0;
  const innerStart = polarPoint(Math.max(0, innerRadius), startAngle);
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, adjustedEndAngle);
  const innerEnd = polarPoint(Math.max(0, innerRadius), adjustedEndAngle);

  if (innerRadius <= 0) {
    return [
      `M ${innerStart.x} ${innerStart.y}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      "L 0 0",
      "Z",
    ].join(" ");
  }

  return [
    `M ${innerStart.x} ${innerStart.y}`,
    `L ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export function createRadiusScale(
  maxDepth: number,
  outerRadius: number,
  fontSizePx = 11,
): (depth: number) => number {
  if (maxDepth <= 0 || outerRadius <= 0) {
    return () => 0;
  }

  const normalizedRadii = buildCompressedRadii(maxDepth, outerRadius, fontSizePx);
  return (depth) => {
    if (depth <= 0) {
      return normalizedRadii[0] * outerRadius;
    }
    if (depth >= maxDepth) {
      return outerRadius;
    }
    return normalizedRadii[depth] * outerRadius;
  };
}

export function resolveRenderDepth(treeMaxDepth: number, depthLimit: number): number {
  if (treeMaxDepth <= 0) {
    return 0;
  }
  if (depthLimit <= 0) {
    return treeMaxDepth;
  }
  return Math.min(depthLimit, treeMaxDepth);
}

export function normalizeDegrees(angle: number): number {
  let normalized = angle;
  while (normalized <= -180) {
    normalized += 360;
  }
  while (normalized > 180) {
    normalized -= 360;
  }
  return normalized;
}

export function computeLayoutDataMaxDepth(layout: ChartLayoutResult | null): number {
  return computeLayoutDataMaxDepthWithMode(layout, false);
}

export function computeLayoutDataMaxDepthWithMode(
  layout: ChartLayoutResult | null,
  collapseEnabled: boolean,
): number {
  if (!layout || layout.nodes.length === 0) {
    return 0;
  }

  let maxDepth = 0;
  for (const node of layout.nodes) {
    const depth = collapseEnabled ? (node.collapsedDepth ?? node.depth) : node.depth;
    if (node.depth <= 0 || isUnclassifiedNodeName(node.name)) {
      continue;
    }
    if (depth > maxDepth) {
      maxDepth = depth;
    }
  }

  if (maxDepth > 0) {
    return maxDepth;
  }
  return layout.nodes.reduce((max, node) => {
    const depth = collapseEnabled ? (node.collapsedDepth ?? node.depth) : node.depth;
    return Math.max(max, depth);
  }, 0);
}

function buildCompressedRadii(maxDepth: number, outerRadius: number, fontSizePx: number): number[] {
  const minRadiusInner = Math.min(0.25, (fontSizePx * 8) / outerRadius);
  const minRadiusFirst = Math.min(0.15, (fontSizePx * 6) / outerRadius);
  const minRadiusOuter = Math.min(0.15, (fontSizePx * 5) / outerRadius);
  const radii = new Array<number>(maxDepth).fill(minRadiusInner);

  let offset = 0;
  while (offset < 10) {
    const preview = lerp(
      Math.atan(offset + 2),
      Math.atan(offset + 1),
      Math.atan(maxDepth + offset - 1),
      minRadiusInner,
      1 - minRadiusOuter,
    );
    if (preview - minRadiusInner <= minRadiusFirst) {
      break;
    }
    offset += 1;
  }

  offset -= 1;
  for (let index = 1; index < maxDepth; index += 1) {
    radii[index] = lerp(
      Math.atan(index + offset),
      Math.atan(offset),
      Math.atan(maxDepth + offset - 1),
      minRadiusInner,
      1 - minRadiusOuter,
    );
  }

  return radii;
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
