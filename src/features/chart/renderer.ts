import type { TreeNode } from "../../domain";
import type {
  ChartLayoutNode,
  ChartLayoutResult,
  ChartRenderInput,
  ChartRenderer,
} from "./contracts";

export class SunburstChartRenderer implements ChartRenderer {
  computeLayout(input: ChartRenderInput): ChartLayoutResult {
    const root = resolveFocusedNode(input.root, input.focusedPath) ?? input.root;
    const totalMagnitude = computeEffectiveMagnitude(root);
    const nodes = flattenForLayout({
      node: root,
      rootMagnitude: totalMagnitude,
      pathPrefix: [],
      depth: 0,
      startAngle: 0,
      depthLimit: input.depthLimit,
    });

    return {
      nodes,
      totalMagnitude,
    };
  }
}

interface FlattenArgs {
  node: TreeNode;
  rootMagnitude: number;
  pathPrefix: string[];
  depth: number;
  startAngle: number;
  depthLimit: number | null;
}

function flattenForLayout(args: FlattenArgs): ChartLayoutNode[] {
  const currentPath = [...args.pathPrefix, args.node.name];
  const nodeMagnitude = computeEffectiveMagnitude(args.node);
  const angleSpan =
    args.rootMagnitude === 0 ? 0 : (nodeMagnitude / args.rootMagnitude) * Math.PI * 2;

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

  let childStartAngle = args.startAngle;
  for (const child of args.node.children) {
    const childMagnitude = computeEffectiveMagnitude(child);
    const childAngleSpan = nodeMagnitude === 0 ? 0 : (childMagnitude / nodeMagnitude) * angleSpan;
    nodes.push(
      ...flattenForLayout({
        node: child,
        rootMagnitude: args.rootMagnitude,
        pathPrefix: currentPath,
        depth: args.depth + 1,
        startAngle: childStartAngle,
        depthLimit: args.depthLimit,
      }),
    );
    childStartAngle += childAngleSpan;
  }

  return nodes;
}

function computeEffectiveMagnitude(node: TreeNode): number {
  if (!node.children || node.children.length === 0) {
    return node.magnitude;
  }
  return node.children.reduce((sum, child) => sum + computeEffectiveMagnitude(child), 0);
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
