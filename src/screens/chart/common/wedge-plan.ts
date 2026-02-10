import type { ChartLayoutNode, ChartLayoutResult } from "../../../features/chart";
import { MIN_LABEL_FONT_SIZE, OUTER_RADIUS } from "./constants";
import { isUnclassifiedNodeName } from "./classification";
import { createRadiusScale } from "./geometry";
import { pathKey } from "./path";

export interface WedgeRenderPlan {
  visibleNodes: WedgeRenderNode[];
}

export interface WedgeRenderNode {
  node: ChartLayoutNode;
  isGroupedHidden: boolean;
  hiddenCount: number;
  key: string;
  colorPath: string[];
  interactionPath: string[];
  renderOuterDepth: number;
  labelOuterDepth: number;
}

export function createWedgeRenderPlan(
  layout: ChartLayoutResult | null,
  maxDepth: number,
  labelFontSize: number,
): WedgeRenderPlan {
  if (!layout || layout.nodes.length === 0) {
    return {
      visibleNodes: [],
    };
  }

  const visibleNodes = layout.nodes.filter((node) => node.depth > 0);
  if (visibleNodes.length === 0 || maxDepth <= 0) {
    return {
      visibleNodes: visibleNodes.map((node) => ({
        node,
        isGroupedHidden: false,
        hiddenCount: 0,
        key: pathKey(node.path),
        colorPath: node.path,
        interactionPath: node.path,
        renderOuterDepth: node.depth,
        labelOuterDepth: node.depth,
      })),
    };
  }

  const minVisibleWidth = Math.max(MIN_LABEL_FONT_SIZE, labelFontSize) * 2.3;
  const radiusScale = createRadiusScale(maxDepth, OUTER_RADIUS);
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  const visiblePathKeys = new Set(visibleNodes.map((node) => pathKey(node.path)));

  for (const node of visibleNodes) {
    const parentKey = pathKey(node.path.slice(0, -1));
    const children = childrenByParent.get(parentKey);
    if (children) {
      children.push(node);
    } else {
      childrenByParent.set(parentKey, [node]);
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

  const groupedNodes: WedgeRenderNode[] = [];
  for (const [parentKey, children] of childrenByParent.entries()) {
    let index = 0;
    let hiddenGroupIndex = 0;

    while (index < children.length) {
      const child = children[index]!;
      if (!shouldGroupHiddenChild(child, radiusScale, minVisibleWidth)) {
        groupedNodes.push({
          node: child,
          isGroupedHidden: false,
          hiddenCount: 0,
          key: pathKey(child.path),
          colorPath: child.path,
          interactionPath: child.path,
          renderOuterDepth: child.depth,
          labelOuterDepth: child.depth,
        });
        index += 1;
        continue;
      }

      let runEnd = index;
      while (
        runEnd + 1 < children.length &&
        shouldGroupHiddenChild(children[runEnd + 1]!, radiusScale, minVisibleWidth)
      ) {
        runEnd += 1;
      }

      const run = children.slice(index, runEnd + 1);
      const first = run[0]!;
      const last = run[run.length - 1]!;
      const parentPath = first.path.slice(0, -1);
      const interactionPath = parentPath.length > 0 ? parentPath : first.path;
      const primaryColorNode = run.find((node) => !isUnclassifiedNodeName(node.name)) ?? first;
      const groupedColorPath = resolveGroupedColorPath(
        parentPath,
        primaryColorNode.path,
        visiblePathKeys,
      );
      const hiddenCount = run.length;
      const groupedMagnitude = run.reduce((sum, node) => sum + node.magnitude, 0);

      groupedNodes.push({
        node: {
          path: first.path.slice(0, -1).concat([`${hiddenCount} more`]),
          name: `${hiddenCount} more`,
          depth: first.depth,
          magnitude: groupedMagnitude,
          startAngle: first.startAngle,
          endAngle: last.endAngle,
        },
        isGroupedHidden: true,
        hiddenCount,
        key: `${parentKey}/[${hiddenCount}-more-${hiddenGroupIndex}]`,
        colorPath: groupedColorPath,
        interactionPath,
        renderOuterDepth: first.depth,
        labelOuterDepth: first.depth,
      });

      hiddenGroupIndex += 1;
      index = runEnd + 1;
    }
  }

  const sortedNodes = groupedNodes.sort((left, right) => {
    if (left.node.depth !== right.node.depth) {
      return left.node.depth - right.node.depth;
    }
    if (left.node.startAngle !== right.node.startAngle) {
      return left.node.startAngle - right.node.startAngle;
    }
    if (left.node.endAngle !== right.node.endAngle) {
      return left.node.endAngle - right.node.endAngle;
    }
    return left.key.localeCompare(right.key);
  });

  const parentKeys = new Set(sortedNodes.map((entry) => pathKey(entry.node.path.slice(0, -1))));
  return {
    visibleNodes: sortedNodes.map((entry) => {
      const hasVisibleChildren = parentKeys.has(pathKey(entry.node.path));
      const ringOuterDepth = Math.min(maxDepth, entry.node.depth);

      return {
        ...entry,
        // Krona keeps parent wedges to the next ring boundary when children are visible.
        renderOuterDepth: entry.isGroupedHidden
          ? maxDepth
          : hasVisibleChildren
            ? ringOuterDepth
            : maxDepth,
        labelOuterDepth: hasVisibleChildren ? ringOuterDepth : maxDepth,
      };
    }),
  };
}

function shouldGroupHiddenChild(
  child: ChartLayoutNode,
  radiusScale: (depth: number) => number,
  minVisibleWidth: number,
): boolean {
  const innerRadius = radiusScale(Math.max(0, child.depth - 1));
  const outerRadius = radiusScale(child.depth);
  const angleSpan = Math.max(0, child.endAngle - child.startAngle);
  const widthEstimate = angleSpan * (innerRadius + outerRadius);
  return widthEstimate < minVisibleWidth;
}

function resolveGroupedColorPath(
  parentPath: string[],
  fallbackPath: string[],
  visiblePathKeys: Set<string>,
): string[] {
  for (let length = parentPath.length; length >= 2; length -= 1) {
    const candidate = parentPath.slice(0, length);
    if (visiblePathKeys.has(pathKey(candidate))) {
      return candidate;
    }
  }
  return fallbackPath;
}
