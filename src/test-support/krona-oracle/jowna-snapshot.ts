import type { TreeNode } from "../../domain";
import { SunburstChartRenderer } from "../../features/chart";
import {
  KRONA_UNCLASSIFIED_COLOR,
  arcPath,
  buildKronaColorMap,
  computeLayoutDataMaxDepthWithMode,
  createRadiusScale,
  createWedgeLabel,
  createWedgeRenderPlan,
  isUnclassifiedNodeName,
  resolveNodeFillColor,
  resolveRenderDepth,
} from "../../screens/chart/common";
import { DEFAULT_CHART_SETTINGS } from "../../grips";

export interface JownaSnapshotInput {
  root: TreeNode;
  focusedPath: string[] | null;
  depthLimit: number;
  collapseRedundant: boolean;
  width: number;
  height: number;
  centerX?: number;
  centerY?: number;
  radius?: number;
  fontSizePx: number;
  fontFamily: string;
}

export function renderJownaSnapshotSvg(input: JownaSnapshotInput): string {
  const renderer = new SunburstChartRenderer();
  const layout = renderer.computeLayout({
    root: input.root,
    settings: {
      ...DEFAULT_CHART_SETTINGS,
      collapseRedundant: input.collapseRedundant,
    },
    focusedPath: input.focusedPath,
    depthLimit: input.depthLimit > 0 ? input.depthLimit : null,
  });
  const maxDepth = resolveRenderDepth(
    computeLayoutDataMaxDepthWithMode(layout, input.collapseRedundant),
    input.depthLimit,
  );
  const displayDepth = maxDepth + 1;
  const labelFontSize = Math.max(1, input.fontSizePx);
  const wedgeRenderPlan = createWedgeRenderPlan(
    layout,
    maxDepth,
    labelFontSize,
    input.collapseRedundant,
  );
  const colors = buildKronaColorMap(layout, input.collapseRedundant);
  const renderRadius =
    typeof input.radius === "number" && Number.isFinite(input.radius) && input.radius > 0
      ? input.radius
      : 300;
  const radiusScale = createRadiusScale(displayDepth, renderRadius, labelFontSize);
  const centerX =
    typeof input.centerX === "number" && Number.isFinite(input.centerX)
      ? input.centerX
      : input.width / 2;
  const centerY =
    typeof input.centerY === "number" && Number.isFinite(input.centerY)
      ? input.centerY
      : input.height / 2;

  const pathElements: string[] = [];
  const labelElements: string[] = [];

  for (const entry of wedgeRenderPlan.visibleNodes) {
    const node = entry.node;
    const innerRadius = radiusScale(Math.max(0, node.depth - 1));
    const outerRadius = radiusScale(entry.renderOuterDepth);
    const pathData = arcPath(innerRadius, outerRadius, node.startAngle, node.endAngle);
    if (!pathData) {
      continue;
    }
    const fill = isUnclassifiedNodeName(node.name)
      ? KRONA_UNCLASSIFIED_COLOR
      : entry.fillOverride ??
        resolveNodeFillColor(
          colors,
          [entry.colorPath, entry.interactionPath, node.path],
          KRONA_UNCLASSIFIED_COLOR,
        );
    const translatedPath = translatePathData(pathData, centerX, centerY);
    pathElements.push(
      `<path class="chart-wedge" d="${escapeXmlAttribute(translatedPath)}" fill="${escapeXmlAttribute(fill)}" stroke="${escapeXmlAttribute(DEFAULT_CHART_SETTINGS.wedgeStrokeColor)}" stroke-width="${Math.max(0.4, DEFAULT_CHART_SETTINGS.wedgeStrokeWidth)}" />`,
    );

    const labelInnerRadius = radiusScale(Math.max(0, node.depth - 1));
    const labelOuterRadius = radiusScale(entry.labelOuterDepth);
    const label = createWedgeLabel(
      node,
      labelInnerRadius,
      labelOuterRadius,
      displayDepth,
      entry.labelOuterDepth,
      labelFontSize,
    );
    if (!label) {
      continue;
    }
    const labelX = label.x + centerX;
    const labelY = label.y + centerY;
    labelElements.push(
      `<text class="chart-wedge-label" x="${formatNumber(labelX)}" y="${formatNumber(labelY)}" text-anchor="${label.anchor}" dominant-baseline="middle" transform="rotate(${formatNumber(label.rotate)} ${formatNumber(labelX)} ${formatNumber(labelY)})">${escapeXmlText(label.text)}</text>`,
    );
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${formatNumber(input.width)}" height="${formatNumber(input.height)}">`,
    `<g style="font-family: ${escapeXmlAttribute(input.fontFamily)}; font-size: ${formatNumber(labelFontSize)}px;">`,
    ...pathElements,
    ...labelElements,
    "</g>",
    "</svg>",
  ].join("");
}

function translatePathData(pathData: string, dx: number, dy: number): string {
  const tokens =
    pathData.match(/[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) ?? [];
  const output: string[] = [];
  let currentCommand = "";
  let commandArgIndex = 0;

  for (const token of tokens) {
    if (/^[AaCcHhLlMmQqSsTtVvZz]$/.test(token)) {
      currentCommand = token;
      commandArgIndex = 0;
      output.push(token);
      continue;
    }

    const value = Number(token);
    if (!Number.isFinite(value)) {
      continue;
    }

    if (currentCommand === "M" || currentCommand === "L") {
      const translated = commandArgIndex % 2 === 0 ? value + dx : value + dy;
      output.push(formatNumber(translated));
      commandArgIndex += 1;
      continue;
    }

    if (currentCommand === "A") {
      if (commandArgIndex === 5) {
        output.push(formatNumber(value + dx));
      } else if (commandArgIndex === 6) {
        output.push(formatNumber(value + dy));
      } else {
        output.push(formatNumber(value));
      }
      commandArgIndex += 1;
      continue;
    }

    output.push(formatNumber(value));
    commandArgIndex += 1;
  }

  return output.join(" ");
}

function escapeXmlText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeXmlAttribute(value: string): string {
  return escapeXmlText(value).replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }
  const rounded = Math.round(value * 1000000) / 1000000;
  if (Object.is(rounded, -0)) {
    return "0";
  }
  return String(rounded);
}
