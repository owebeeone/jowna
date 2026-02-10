import type { TreeNode } from "../../../domain";

export function pathEquals(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((segment, index) => segment === right[index]);
}

export function pathKey(path: string[]): string {
  return path.join("/");
}

export function findNodeByPath(root: TreeNode, path: string[] | null): TreeNode | null {
  if (!path || path.length === 0) {
    return root;
  }

  const [head, ...tail] = path;
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
