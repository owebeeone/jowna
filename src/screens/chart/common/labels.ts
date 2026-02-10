import type { ChartLayoutNode } from "../../../features/chart";
import { normalizeDegrees, polarPoint } from "./geometry";

export interface WedgeLabel {
  text: string;
  fullText: string;
  isTruncated: boolean;
  x: number;
  y: number;
  rotate: number;
  anchor: "start" | "middle" | "end";
}

export interface HoverLabelTooltip {
  x: number;
  y: number;
  width: number;
  height: number;
  textX: number;
  textY: number;
}

export function createWedgeLabel(
  node: ChartLayoutNode,
  innerRadius: number,
  outerRadius: number,
  maxDepth: number,
  outerDepth: number,
  fontSizePx: number,
): WedgeLabel | null {
  const isOuterRing = maxDepth <= 1 || outerDepth >= maxDepth;
  const angleSpan = node.endAngle - node.startAngle;
  const ringThickness = outerRadius - innerRadius;
  const radius = innerRadius + ringThickness * (isOuterRing ? 0.6 : 0.56);
  const tangentialSpan = radius * angleSpan;

  const minAngleSpan = isOuterRing ? 0.007 : 0.04;
  const minRingThickness = isOuterRing ? 6 : 10;
  const minTangentialSpan = isOuterRing ? 2 : 10;

  if (
    angleSpan < minAngleSpan ||
    ringThickness < minRingThickness ||
    tangentialSpan < minTangentialSpan
  ) {
    return null;
  }

  const midAngle = (node.startAngle + node.endAngle) / 2;
  const point = polarPoint(radius, midAngle);

  const approximateCharWidth = Math.max(4, fontSizePx * 0.58);
  const availableTextLength = isOuterRing
    ? Math.max(0, ringThickness - fontSizePx * 0.45)
    : Math.max(0, tangentialSpan - fontSizePx * 0.35);
  const maxChars = Math.max(
    isOuterRing ? 4 : 6,
    Math.floor(availableTextLength / approximateCharWidth),
  );
  const isTruncated = node.name.length > maxChars;
  const text = ellipsize(node.name, maxChars);
  const baseRotation = isOuterRing ? (midAngle * 180) / Math.PI - 90 : (midAngle * 180) / Math.PI;
  const normalizedRotation = normalizeDegrees(baseRotation);
  const flip = normalizedRotation > 90 || normalizedRotation < -90;
  const rotate = flip ? normalizedRotation + 180 : normalizedRotation;

  return {
    text,
    fullText: node.name,
    isTruncated,
    x: point.x,
    y: point.y,
    rotate,
    anchor: isOuterRing ? (flip ? "end" : "start") : "middle",
  };
}

export function createHoverLabelTooltip(label: WedgeLabel, fontSizePx: number): HoverLabelTooltip {
  const horizontalPadding = 9;
  const verticalPadding = 5;
  const approxTextWidth = Math.max(20, label.fullText.length * fontSizePx * 0.58);
  const width = approxTextWidth + horizontalPadding * 2;
  const height = fontSizePx + verticalPadding * 2 + 2;
  const centerX = label.x;
  const centerY = label.y - fontSizePx * 1.2;

  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
    textX: centerX,
    textY: centerY,
  };
}

function ellipsize(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}
