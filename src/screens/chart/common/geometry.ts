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

  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, endAngle);

  if (innerRadius <= 0) {
    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      "L 0 0",
      "Z",
    ].join(" ");
  }

  const innerEnd = polarPoint(innerRadius, endAngle);
  const innerStart = polarPoint(innerRadius, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export function createRadiusScale(
  maxDepth: number,
  outerRadius: number,
): (depth: number) => number {
  return (depth) => {
    if (depth <= 0 || maxDepth <= 0) {
      return 0;
    }
    const normalized = depth / maxDepth;
    return Math.pow(normalized, 0.86) * outerRadius;
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
  if (!layout || layout.nodes.length === 0) {
    return 0;
  }

  let maxDepth = 0;
  for (const node of layout.nodes) {
    if (node.depth <= 0 || isUnclassifiedNodeName(node.name)) {
      continue;
    }
    if (node.depth > maxDepth) {
      maxDepth = node.depth;
    }
  }

  if (maxDepth > 0) {
    return maxDepth;
  }
  return layout.nodes.reduce((max, node) => Math.max(max, node.depth), 0);
}
