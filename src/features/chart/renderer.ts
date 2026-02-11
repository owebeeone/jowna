import type { TreeNode } from "../../domain";
import type {
  ChartLayoutNode,
  ChartLayoutResult,
  ChartRenderInput,
  ChartRenderer,
} from "./contracts";

export class SunburstChartRenderer implements ChartRenderer {
  computeLayout(input: ChartRenderInput): ChartLayoutResult {
    const normalizedFocusPath = normalizeFocusedPath(input.root, input.focusedPath);
    const clippedFocusPath = clipFocusedPathToDepthLimit(normalizedFocusPath, input.depthLimit);
    const root = resolveFocusedNode(input.root, clippedFocusPath) ?? input.root;
    const pathPrefix = clippedFocusPath ? clippedFocusPath.slice(0, -1) : [];
    const focusAbsoluteDepth = clippedFocusPath?.length ?? 1;
    const relativeDepthLimit =
      typeof input.depthLimit === "number"
        ? Math.max(0, input.depthLimit - focusAbsoluteDepth)
        : null;
    const totalMagnitude = computeEffectiveMagnitude(root);
    const rootHasMultipleChildren = (input.root.children?.length ?? 0) > 1;
    const nodes = flattenForLayout({
      node: root,
      pathPrefix,
      depth: 0,
      collapsedDepth: 0,
      startAngle: 0,
      angleSpan: totalMagnitude > 0 ? Math.PI * 2 : 0,
      depthLimit: relativeDepthLimit,
      rootHasMultipleChildren,
    });

    return {
      nodes,
      totalMagnitude,
    };
  }
}

interface FlattenArgs {
  node: TreeNode;
  pathPrefix: string[];
  depth: number;
  collapsedDepth: number;
  startAngle: number;
  angleSpan: number;
  depthLimit: number | null;
  rootHasMultipleChildren: boolean;
}

interface FlattenChildEntry {
  child: TreeNode;
  pathSegments: string[];
  magnitude: number;
}

function flattenForLayout(args: FlattenArgs): ChartLayoutNode[] {
  const currentPath = [...args.pathPrefix, args.node.name];
  const nodeMagnitude = computeEffectiveMagnitude(args.node);
  const angleSpan = Math.max(0, args.angleSpan);
  const collapseEligible = isCollapseEligibleNode(args.node, args.rootHasMultipleChildren);

  const currentNode: ChartLayoutNode = {
    path: currentPath,
    name: args.node.name,
    depth: args.depth,
    collapsedDepth: args.collapsedDepth,
    collapseEligible,
    magnitude: nodeMagnitude,
    startAngle: args.startAngle,
    endAngle: args.startAngle + angleSpan,
  };

  const nodes = [currentNode];
  if (
    !args.node.children ||
    args.node.children.length === 0 ||
    (typeof args.depthLimit === "number" && args.depth >= args.depthLimit)
  ) {
    return nodes;
  }

  const resolvedChildren = args.node.children
    .map((child) => ({
      child,
      pathSegments: [child.name],
      magnitude: computeEffectiveMagnitude(child),
    }))
    .filter((entry) => entry.magnitude > 0);
  const childEntries: FlattenChildEntry[] = resolvedChildren
    .map((entry) => ({
      child: entry.child,
      pathSegments: entry.pathSegments,
      magnitude: entry.magnitude,
    }))
    .sort((left, right) => {
      if (right.magnitude !== left.magnitude) {
        return right.magnitude - left.magnitude;
      }
      const leftName = left.pathSegments[left.pathSegments.length - 1] ?? "";
      const rightName = right.pathSegments[right.pathSegments.length - 1] ?? "";
      return leftName.localeCompare(rightName);
    });

  let childStartAngle = args.startAngle;
  const nextCollapsedDepth = args.collapsedDepth + (collapseEligible ? 0 : 1);
  for (const entry of childEntries) {
    const childAngleSpan = nodeMagnitude === 0 ? 0 : (entry.magnitude / nodeMagnitude) * angleSpan;
    nodes.push(
      ...flattenForLayout({
        node: entry.child,
        pathPrefix: currentPath.concat(entry.pathSegments.slice(0, -1)),
        depth: args.depth + 1,
        collapsedDepth: nextCollapsedDepth,
        startAngle: childStartAngle,
        angleSpan: childAngleSpan,
        depthLimit: args.depthLimit,
        rootHasMultipleChildren: args.rootHasMultipleChildren,
      }),
    );
    childStartAngle += childAngleSpan;
  }

  return nodes;
}

function computeEffectiveMagnitude(node: TreeNode): number {
  const nodeMagnitude = normalizeMagnitude(node.magnitude);
  if (!node.children || node.children.length === 0) {
    return nodeMagnitude;
  }
  const childrenMagnitude = node.children.reduce(
    (sum, child) => sum + computeEffectiveMagnitude(child),
    0,
  );
  return Math.max(nodeMagnitude, childrenMagnitude);
}

function normalizeMagnitude(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }
  return value;
}

function isCollapseEligibleNode(node: TreeNode, rootHasMultipleChildren: boolean): boolean {
  const children = node.children ?? [];
  if (children.length !== 1) {
    return false;
  }
  const child = children[0]!;
  const nodeMagnitude = computeEffectiveMagnitude(node);
  const childMagnitude = computeEffectiveMagnitude(child);
  if (Math.abs(nodeMagnitude - childMagnitude) > 1e-9) {
    return false;
  }
  return rootHasMultipleChildren || (child.children?.length ?? 0) > 0;
}

function resolveFocusedNode(root: TreeNode, focusedPath: string[] | null): TreeNode | null {
  if (!focusedPath || focusedPath.length === 0) {
    return root;
  }

  const [head, ...tail] = focusedPath;
  if (head !== root.name) {
    return null;
  }

  let cursor: TreeNode = root;
  for (const segment of tail) {
    const next = cursor.children?.find((child) => child.name === segment);
    if (!next) {
      return null;
    }
    cursor = next;
  }

  return cursor;
}

function normalizeFocusedPath(root: TreeNode, focusedPath: string[] | null): string[] | null {
  if (!focusedPath || focusedPath.length === 0) {
    return null;
  }
  const normalized = focusedPath
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
  if (normalized.length === 0 || normalized[0] !== root.name) {
    return null;
  }
  return normalized;
}

function clipFocusedPathToDepthLimit(
  focusedPath: string[] | null,
  depthLimit: number | null,
): string[] | null {
  if (!focusedPath || typeof depthLimit !== "number" || !Number.isFinite(depthLimit)) {
    return focusedPath;
  }
  const maxSelectedDepth = Math.max(1, Math.floor(depthLimit) - 1);
  if (focusedPath.length <= maxSelectedDepth) {
    return focusedPath;
  }
  return focusedPath.slice(0, maxSelectedDepth);
}
