import type { ImportWarning, NormalizedRow, TreeNode } from "../domain";
import { createWarning } from "./warnings";

interface MutableTreeNode {
  name: string;
  magnitude: number;
  children: Map<string, MutableTreeNode>;
  url: string | null;
  description: string | null;
  attributes: Record<string, string>;
}

export interface TreeBuildResult {
  tree: TreeNode;
  warnings: ImportWarning[];
}

const ROOT_NODE_NAME = "Root";

export function buildTreeFromRows(rows: NormalizedRow[]): TreeBuildResult {
  const warnings: ImportWarning[] = [];
  const root = createMutableNode(ROOT_NODE_NAME);

  rows.forEach((row) => {
    let cursor = root;
    row.path.forEach((segment) => {
      const normalized = segment.trim();
      if (!cursor.children.has(normalized)) {
        cursor.children.set(normalized, createMutableNode(normalized));
      }
      cursor = cursor.children.get(normalized)!;
    });

    cursor.magnitude += row.magnitude;
    applyLeafMetadata(cursor, row, warnings);
  });

  const finalized = finalizeTree(root);
  return { tree: finalized, warnings };
}

export function normalizeHierarchyTree(input: unknown): TreeBuildResult {
  const warnings: ImportWarning[] = [];

  if (Array.isArray(input)) {
    const children = input
      .map((node, index) => normalizeHierarchyNode(node, warnings, `root[${index}]`))
      .filter((node): node is TreeNode => node !== null);

    return {
      tree: {
        name: ROOT_NODE_NAME,
        magnitude: children.reduce((sum, child) => sum + child.magnitude, 0),
        children,
      },
      warnings,
    };
  }

  const normalized = normalizeHierarchyNode(input, warnings, "root");
  return {
    tree:
      normalized ??
      ({
        name: ROOT_NODE_NAME,
        magnitude: 0,
        children: [],
      } satisfies TreeNode),
    warnings,
  };
}

function createMutableNode(name: string): MutableTreeNode {
  return {
    name,
    magnitude: 0,
    children: new Map<string, MutableTreeNode>(),
    url: null,
    description: null,
    attributes: {},
  };
}

function applyLeafMetadata(
  node: MutableTreeNode,
  row: NormalizedRow,
  warnings: ImportWarning[],
): void {
  if (row.url) {
    if (node.url && node.url !== row.url) {
      warnings.push(
        createWarning({
          code: "CONFLICTING_URL",
          message: `Multiple URL values found for path '${row.path.join("/")}'. Keeping first value.`,
          row: row.sourceRow,
          column: "url",
        }),
      );
    } else {
      node.url = row.url;
    }
  }

  if (row.description) {
    if (node.description && node.description !== row.description) {
      warnings.push(
        createWarning({
          code: "CONFLICTING_DESCRIPTION",
          message: `Multiple description values found for path '${row.path.join("/")}'. Keeping first value.`,
          row: row.sourceRow,
          column: "description",
        }),
      );
    } else {
      node.description = row.description;
    }
  }

  for (const [key, value] of Object.entries(row.attributes)) {
    if (key.length === 0) {
      continue;
    }
    const existing = node.attributes[key];
    if (existing && existing !== value) {
      warnings.push(
        createWarning({
          code: "CONFLICTING_ATTRIBUTE",
          message: `Multiple values for attribute '${key}' found at path '${row.path.join("/")}'. Keeping first value.`,
          row: row.sourceRow,
          column: key,
        }),
      );
      continue;
    }
    node.attributes[key] = value;
  }
}

function finalizeTree(node: MutableTreeNode): TreeNode {
  const children = [...node.children.values()].map((child) => finalizeTree(child));
  const hasChildren = children.length > 0;
  const magnitude = hasChildren
    ? children.reduce((sum, child) => sum + child.magnitude, 0)
    : node.magnitude;

  return {
    name: node.name,
    magnitude,
    children: hasChildren ? children : undefined,
    url: node.url,
    description: node.description,
    attributes: Object.keys(node.attributes).length > 0 ? node.attributes : undefined,
  };
}

function normalizeHierarchyNode(
  input: unknown,
  warnings: ImportWarning[],
  location: string,
): TreeNode | null {
  if (!input || typeof input !== "object") {
    warnings.push(
      createWarning({
        code: "INVALID_NODE",
        message: `Node at '${location}' is not an object and was skipped.`,
      }),
    );
    return null;
  }

  const raw = input as Record<string, unknown>;
  const rawName = String(raw.name ?? "").trim();
  const name = rawName.length > 0 ? rawName : "Unnamed";
  if (rawName.length === 0) {
    warnings.push(
      createWarning({
        code: "MISSING_NODE_NAME",
        message: `Node name missing at '${location}'. Using 'Unnamed'.`,
      }),
    );
  }

  const rawChildren = Array.isArray(raw.children) ? raw.children : [];
  const children = rawChildren
    .map((child, index) =>
      normalizeHierarchyNode(child, warnings, `${location}.children[${index}]`),
    )
    .filter((child): child is TreeNode => child !== null);

  const rawMagnitude = raw.magnitude;
  const explicitMagnitude =
    typeof rawMagnitude === "number" && Number.isFinite(rawMagnitude) ? rawMagnitude : null;

  if (children.length === 0) {
    if (explicitMagnitude === null || explicitMagnitude < 0) {
      warnings.push(
        createWarning({
          code: "INVALID_LEAF_MAGNITUDE",
          message: `Leaf node '${name}' at '${location}' has invalid magnitude and was skipped.`,
          column: "magnitude",
        }),
      );
      return null;
    }

    return {
      name,
      magnitude: explicitMagnitude,
      url: normalizeNullableString(raw.url),
      description: normalizeNullableString(raw.description),
      attributes: collectAttributes(raw),
    };
  }

  const childrenMagnitude = children.reduce((sum, child) => sum + child.magnitude, 0);
  if (explicitMagnitude !== null && explicitMagnitude !== childrenMagnitude) {
    warnings.push(
      createWarning({
        code: "PARENT_MAGNITUDE_MISMATCH",
        message: `Parent node '${name}' at '${location}' has explicit magnitude ${explicitMagnitude} but children sum to ${childrenMagnitude}.`,
        column: "magnitude",
      }),
    );
  }

  return {
    name,
    magnitude: childrenMagnitude,
    children,
    url: normalizeNullableString(raw.url),
    description: normalizeNullableString(raw.description),
    attributes: collectAttributes(raw),
    explicitMagnitude,
  };
}

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function collectAttributes(raw: Record<string, unknown>): Record<string, string> | undefined {
  const attributes = Object.fromEntries(
    Object.entries(raw)
      .filter(([key]) => !["name", "magnitude", "children", "url", "description"].includes(key))
      .filter(([, value]) => typeof value === "string" || typeof value === "number")
      .map(([key, value]) => [key, String(value)]),
  );
  return Object.keys(attributes).length > 0 ? attributes : undefined;
}
