import type { ChartLayoutNode } from "../../../features/chart";
import { normalizeDegrees } from "./geometry";
import { ellipsizeKronaLabel, toKronaDisplayName } from "./text";

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
  const kronaAngle = normalizeRadians(midAngle + Math.PI / 2);

  const approximateCharWidth = Math.max(4, fontSizePx * 0.58);
  const availableTextLength = isOuterRing
    ? Math.max(0, ringThickness - fontSizePx * 0.45)
    : Math.max(0, tangentialSpan - fontSizePx * 0.35);
  const maxChars = Math.max(
    isOuterRing ? 4 : 6,
    Math.floor(availableTextLength / approximateCharWidth),
  );
  const displayName = toKronaDisplayName(node.name);
  const isTruncated = displayName.length > maxChars;
  const text = ellipsizeKronaLabel(displayName, maxChars);

  let angle = kronaAngle;
  let adjustedRadius = radius;
  let anchor: WedgeLabel["anchor"] = isOuterRing ? "start" : "middle";

  if (isOuterRing) {
    const flip = angle < (Math.PI * 3) / 2;
    if (flip) {
      angle -= Math.PI;
      adjustedRadius = -adjustedRadius;
      anchor = "end";
    } else {
      anchor = "start";
    }
  } else {
    const flip = angle < Math.PI || angle > Math.PI * 2;
    if (flip) {
      angle -= Math.PI;
      adjustedRadius = -adjustedRadius;
    }
    angle += Math.PI / 2;
    anchor = "middle";
  }

  const point = isOuterRing
    ? rotatePoint(adjustedRadius, 0, angle)
    : rotatePoint(0, -adjustedRadius, angle);
  const rotate = normalizeDegrees((angle * 180) / Math.PI);

  return {
    text,
    fullText: displayName,
    isTruncated,
    x: point.x,
    y: point.y,
    rotate,
    anchor,
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

function normalizeRadians(angle: number): number {
  let normalized = angle;
  while (normalized < 0) {
    normalized += Math.PI * 2;
  }
  while (normalized >= Math.PI * 2) {
    normalized -= Math.PI * 2;
  }
  return normalized;
}

function rotatePoint(x: number, y: number, angle: number): { x: number; y: number } {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  };
}
