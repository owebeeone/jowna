import type { ChartLayoutNode, ChartLayoutResult } from "../../../features/chart";
import { KRONA_UNCLASSIFIED_COLOR, MIN_LABEL_FONT_SIZE, OUTER_RADIUS } from "./constants";
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
  fillOverride?: string;
}

export function createWedgeRenderPlan(
  layout: ChartLayoutResult | null,
  maxDepth: number,
  labelFontSize: number,
  collapseEnabled = false,
): WedgeRenderPlan {
  const displayDepth = maxDepth + 1;
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
        renderOuterDepth: displayDepth,
        labelOuterDepth: displayDepth,
      })),
    };
  }

  const minVisibleWidth = Math.max(MIN_LABEL_FONT_SIZE, labelFontSize) * 2.3;
  const radiusScale = createRadiusScale(displayDepth, OUTER_RADIUS, labelFontSize);
  const maxRadius = radiusScale(displayDepth);
  const childrenByParent = new Map<string, ChartLayoutNode[]>();
  const nodesByPath = new Map<string, ChartLayoutNode>(
    layout.nodes.map((node) => [pathKey(node.path), node]),
  );

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

  const rootPath = (layout.nodes.find((node) => node.depth === 0) ?? layout.nodes[0]!).path;
  const hiddenGroupIndexes = new Map<string, number>();

  const collectChildren = (parentPath: string[]): WedgeRenderNode[] => {
    const parentKey = pathKey(parentPath);
    const parentNode = nodesByPath.get(parentKey) ?? null;
    const children = childrenByParent.get(parentKey) ?? [];
    const visibleEntries: WedgeRenderNode[] = [];
    let index = 0;

    while (index < children.length) {
      const child = children[index]!;
      const childDepthForDisplay = collapseEnabled ? (child.collapsedDepth ?? child.depth) : child.depth;

      if (childDepthForDisplay > maxDepth) {
        index += 1;
        continue;
      }

      const hidden = shouldHideChild(
        childDepthForDisplay,
        child,
        radiusScale,
        maxRadius,
        minVisibleWidth,
      );
      const keyedTopLevelHidden =
        hidden && childDepthForDisplay === 1 && !(collapseEnabled && (child.collapseEligible ?? false));

      if (hidden && !keyedTopLevelHidden) {
        let runEnd = index;
        while (runEnd + 1 < children.length) {
          const next = children[runEnd + 1]!;
          const nextDepthForDisplay = collapseEnabled ? (next.collapsedDepth ?? next.depth) : next.depth;
          const nextHidden = shouldHideChild(
            nextDepthForDisplay,
            next,
            radiusScale,
            maxRadius,
            minVisibleWidth,
          );
          const nextIsKeyedCandidate =
            nextDepthForDisplay === 1 && !(collapseEnabled && (next.collapseEligible ?? false));
          if (!nextHidden || nextIsKeyedCandidate) {
            break;
          }
          runEnd += 1;
        }

        const run = children.slice(index, runEnd + 1);
        const first = run[0]!;
        const firstDepthForDisplay = collapseEnabled ? (first.collapsedDepth ?? first.depth) : first.depth;
        const last = run[run.length - 1]!;
        const runParentPath = first.path.slice(0, -1);
        const interactionPath = runParentPath.length > 0 ? runParentPath : first.path;
        const primaryColorNode = run.find((node) => !isUnclassifiedNodeName(node.name)) ?? first;
        const groupedColorPath = primaryColorNode.path;
        const hiddenCount = run.length;
        const groupedMagnitude = run.reduce((sum, node) => sum + node.magnitude, 0);
        const groupIndex = hiddenGroupIndexes.get(parentKey) ?? 0;
        hiddenGroupIndexes.set(parentKey, groupIndex + 1);

        visibleEntries.push({
          node: {
            path: runParentPath.concat([`${hiddenCount} more`]),
            name: `${hiddenCount} more`,
            depth: firstDepthForDisplay,
            collapsedDepth: firstDepthForDisplay,
            collapseEligible: false,
            magnitude: groupedMagnitude,
            startAngle: first.startAngle,
            endAngle: last.endAngle,
          },
          isGroupedHidden: true,
          hiddenCount,
          key: `${parentKey}/[${hiddenCount}-more-${groupIndex}]`,
          colorPath: groupedColorPath,
          interactionPath,
          renderOuterDepth: displayDepth,
          labelOuterDepth: displayDepth,
        });

        index = runEnd + 1;
        continue;
      }

      const displayNode: ChartLayoutNode = {
        ...child,
        depth: childDepthForDisplay,
        collapsedDepth: childDepthForDisplay,
      };
      const childEntry: WedgeRenderNode = {
        node: displayNode,
        isGroupedHidden: false,
        hiddenCount: 0,
        key: pathKey(child.path),
        colorPath: child.path,
        interactionPath: child.path,
        renderOuterDepth: displayDepth,
        labelOuterDepth: displayDepth,
      };
      const descendants = collectChildren(child.path);
      visibleEntries.push(childEntry, ...descendants);
      index += 1;
    }

    if (parentNode && children.length > 0) {
      const lastChild = children[children.length - 1]!;
      if (lastChild.endAngle < parentNode.endAngle - 1e-9) {
        const parentDepthForDisplay = collapseEnabled
          ? (parentNode.collapsedDepth ?? parentNode.depth)
          : parentNode.depth;
        const residualDepth = parentDepthForDisplay + 1;
        if (residualDepth <= displayDepth) {
          const residualStart = Math.max(parentNode.startAngle, lastChild.endAngle);
          const residualEnd = parentNode.endAngle;
          if (residualEnd - residualStart > 1e-12) {
            const childrenMagnitude = children.reduce((sum, child) => sum + child.magnitude, 0);
            const residualMagnitude = Math.max(0, parentNode.magnitude - childrenMagnitude);
            visibleEntries.push({
              node: {
                path: parentPath.concat([`other ${parentNode.name}`]),
                name: `other ${parentNode.name}`,
                depth: residualDepth,
                collapsedDepth: residualDepth,
                collapseEligible: false,
                magnitude: residualMagnitude,
                startAngle: residualStart,
                endAngle: residualEnd,
              },
              isGroupedHidden: false,
              hiddenCount: 0,
              key: `${parentKey}/[other-${Math.round(residualStart * 1e9)}]`,
              colorPath: parentPath,
              interactionPath: parentPath,
              renderOuterDepth: displayDepth,
              labelOuterDepth: displayDepth,
              fillOverride: parentNode.depth === 0 ? KRONA_UNCLASSIFIED_COLOR : undefined,
            });
          }
        }
      }
    }

    return visibleEntries;
  };

  return {
    visibleNodes: collectChildren(rootPath),
  };
}

function shouldHideChild(
  displayDepth: number,
  child: ChartLayoutNode,
  radiusScale: (depth: number) => number,
  maxRadius: number,
  minVisibleWidth: number,
): boolean {
  if (displayDepth <= 0) {
    return false;
  }
  const innerRadius = radiusScale(Math.max(0, displayDepth - 1));
  const angleSpan = Math.max(0, child.endAngle - child.startAngle);
  const widthEstimate = angleSpan * (innerRadius + maxRadius);
  return widthEstimate < minVisibleWidth;
}
