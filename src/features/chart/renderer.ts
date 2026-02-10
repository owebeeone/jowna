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
    const root = resolveFocusedNode(input.root, normalizedFocusPath) ?? input.root;
    const pathPrefix = normalizedFocusPath ? normalizedFocusPath.slice(0, -1) : [];
    const totalMagnitude = computeEffectiveMagnitude(root);
    const collapseRedundant = input.settings.collapseRedundant !== false;
    const rootHasMultipleChildren = (input.root.children?.length ?? 0) > 1;
    const nodes = flattenForLayout({
      node: root,
      pathPrefix,
      depth: 0,
      startAngle: 0,
      angleSpan: totalMagnitude > 0 ? Math.PI * 2 : 0,
      depthLimit: input.depthLimit,
      collapseRedundant,
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
  startAngle: number;
  angleSpan: number;
  depthLimit: number | null;
  collapseRedundant: boolean;
  rootHasMultipleChildren: boolean;
}

function flattenForLayout(args: FlattenArgs): ChartLayoutNode[] {
  const currentPath = [...args.pathPrefix, args.node.name];
  const nodeMagnitude = computeEffectiveMagnitude(args.node);
  const angleSpan = Math.max(0, args.angleSpan);

  const currentNode: ChartLayoutNode = {
    path: currentPath,
    name: args.node.name,
    depth: args.depth,
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

  const sortedChildren = args.node.children
    .map((child) => {
      const resolved = resolveCollapsedChild({
        node: child,
        collapseRedundant: args.collapseRedundant,
        rootHasMultipleChildren: args.rootHasMultipleChildren,
      });
      return {
        child: resolved.node,
        pathSegments: resolved.pathSegments,
        magnitude: computeEffectiveMagnitude(resolved.node),
      };
    })
    .filter((entry) => entry.magnitude > 0)
    .sort((left, right) => {
      if (right.magnitude !== left.magnitude) {
        return right.magnitude - left.magnitude;
      }
      return left.child.name.localeCompare(right.child.name);
    });
  const childrenTotalMagnitude = sortedChildren.reduce((sum, entry) => sum + entry.magnitude, 0);

  let childStartAngle = args.startAngle;
  for (const entry of sortedChildren) {
    const childAngleSpan =
      childrenTotalMagnitude === 0 ? 0 : (entry.magnitude / childrenTotalMagnitude) * angleSpan;
    nodes.push(
      ...flattenForLayout({
        node: entry.child,
        pathPrefix: currentPath.concat(entry.pathSegments.slice(0, -1)),
        depth: args.depth + 1,
        startAngle: childStartAngle,
        angleSpan: childAngleSpan,
        depthLimit: args.depthLimit,
        collapseRedundant: args.collapseRedundant,
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

interface CollapseResolution {
  node: TreeNode;
  pathSegments: string[];
}

function resolveCollapsedChild(input: {
  node: TreeNode;
  collapseRedundant: boolean;
  rootHasMultipleChildren: boolean;
}): CollapseResolution {
  const pathSegments = [input.node.name];
  let node = input.node;

  if (!input.collapseRedundant) {
    return { node, pathSegments };
  }

  while (isCollapsibleNode(node, input.rootHasMultipleChildren)) {
    const child = node.children?.[0];
    if (!child) {
      break;
    }
    node = child;
    pathSegments.push(child.name);
  }

  return {
    node,
    pathSegments,
  };
}

function isCollapsibleNode(node: TreeNode, rootHasMultipleChildren: boolean): boolean {
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
