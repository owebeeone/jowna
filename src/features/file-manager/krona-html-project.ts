import type { Dataset, ImportWarning, NormalizedRow, Project, TreeNode } from "../../domain";

const DEFAULT_PROJECT_NAME = "Imported Krona Project";
const DEFAULT_DATASET_PREFIX = "Dataset";
const KRONA_EXTENSION = ".krona";

type EntityPrefix = "project" | "dataset";

interface XmlElement {
  name: string;
  attributes: Record<string, string>;
  children: XmlChild[];
}

type XmlChild = XmlElement | string;

export interface ParsedKronaHtmlDataset {
  name: string;
  tree: TreeNode;
  flatTable: NormalizedRow[];
  warnings: ImportWarning[];
}

export interface ParsedKronaHtmlProject {
  projectName: string;
  sourceFileName: string;
  datasets: ParsedKronaHtmlDataset[];
  warnings: ImportWarning[];
}

export interface ParseKronaHtmlProjectInput {
  name: string;
  content: string;
}

export interface MaterializeParsedKronaHtmlProjectInput {
  parsed: ParsedKronaHtmlProject;
  nowIso: string;
  createId: (prefix: EntityPrefix) => string;
  nextProjectName?: string;
}

export interface MaterializedKronaHtmlProject {
  project: Project;
  datasets: Dataset[];
  warnings: ImportWarning[];
}

export function parseKronaHtmlProject(input: ParseKronaHtmlProjectInput): ParsedKronaHtmlProject {
  const xml = extractKronaXml(input.content);
  const root = parseXmlRoot(xml);

  if (root.name !== "krona") {
    throw new Error("Krona HTML XML root element must be <krona>.");
  }

  const globalWarnings: ImportWarning[] = [];
  const magnitudeTag = resolveMagnitudeTag(root, globalWarnings);
  const nodeRoots = childElements(root, "node");
  if (nodeRoots.length === 0) {
    throw new Error("Krona HTML contains no <node> elements.");
  }

  const datasetNames = resolveDatasetNames(root);
  const inferredDatasetCount = inferDatasetCount(nodeRoots, magnitudeTag);
  const datasetCount = Math.max(datasetNames.length, inferredDatasetCount, 1);
  const normalizedDatasetNames = normalizeDatasetNames(datasetNames, datasetCount, globalWarnings);

  const datasets = normalizedDatasetNames.map((datasetName, datasetIndex) => {
    const warnings: ImportWarning[] = [];
    const tree = buildTreeForDataset({
      nodes: nodeRoots,
      datasetIndex,
      magnitudeTag,
      warnings,
    });
    const flatTable = collectFlatRows(tree);

    if ((tree.children?.length ?? 0) === 0 && tree.magnitude <= 0) {
      warnings.push(
        createKronaWarning({
          code: "KRONA_EMPTY_DATASET",
          message: `Dataset '${datasetName}' has no usable magnitudes.`,
        }),
      );
    }

    return {
      name: datasetName,
      tree,
      flatTable,
      warnings,
    };
  });

  const warnings = [...globalWarnings, ...datasets.flatMap((dataset) => dataset.warnings)];

  return {
    projectName: toProjectName(input.name),
    sourceFileName: input.name,
    datasets,
    warnings,
  };
}

export function materializeParsedKronaHtmlProject(
  input: MaterializeParsedKronaHtmlProjectInput,
): MaterializedKronaHtmlProject {
  const projectId = input.createId("project");
  const projectName = normalizeName(
    input.nextProjectName ?? input.parsed.projectName,
    DEFAULT_PROJECT_NAME,
  );

  const datasets = input.parsed.datasets.map((datasetTemplate) => {
    const datasetId = input.createId("dataset");
    const dataset: Dataset = {
      id: datasetId,
      projectId,
      name: normalizeName(datasetTemplate.name, `${DEFAULT_DATASET_PREFIX} ${datasetId}`),
      createdAt: input.nowIso,
      updatedAt: input.nowIso,
      tree: datasetTemplate.tree,
      sourceFileName: input.parsed.sourceFileName,
      flatTable: datasetTemplate.flatTable,
      importWarnings: datasetTemplate.warnings,
    };
    return dataset;
  });

  const datasetIds = datasets.map((dataset) => dataset.id);
  const project: Project = {
    id: projectId,
    name: projectName,
    createdAt: input.nowIso,
    updatedAt: input.nowIso,
    datasetIds,
    activeDatasetId: datasetIds[0] ?? null,
  };

  return {
    project,
    datasets,
    warnings: input.parsed.warnings,
  };
}

export function looksLikeKronaHtml(name: string, content: string): boolean {
  const lowerName = name.trim().toLowerCase();
  if (lowerName.endsWith(".krona.html")) {
    return true;
  }
  if (lowerName.endsWith(".html") || lowerName.endsWith(".htm")) {
    return /<krona\b/i.test(content);
  }
  return /<krona\b/i.test(content);
}

function extractKronaXml(content: string): string {
  const match = content.match(/<krona\b[\s\S]*?<\/krona>/i);
  if (!match) {
    throw new Error("No <krona> XML section found in file.");
  }
  return match[0];
}

function parseXmlRoot(xml: string): XmlElement {
  const root: XmlElement = { name: "#document", attributes: {}, children: [] };
  const stack: XmlElement[] = [root];
  const tokens = xml.match(/<[^>]+>|[^<]+/g) ?? [];

  tokens.forEach((token) => {
    if (!token.startsWith("<")) {
      const text = token.trim();
      if (text.length > 0) {
        stack[stack.length - 1]?.children.push(decodeXmlEntities(text));
      }
      return;
    }

    if (token.startsWith("<!--") || token.startsWith("<?") || token.startsWith("<!")) {
      return;
    }

    if (token.startsWith("</")) {
      const closingName = token.slice(2, -1).trim().toLowerCase();
      while (stack.length > 1) {
        const current = stack.pop();
        if (current?.name === closingName) {
          break;
        }
      }
      return;
    }

    const isSelfClosing = token.endsWith("/>");
    const inner = token.slice(1, isSelfClosing ? -2 : -1).trim();
    const nameMatch = inner.match(/^([^\s/>]+)/);
    if (!nameMatch) {
      return;
    }

    const name = nameMatch[1].toLowerCase();
    const attributes = parseAttributes(inner.slice(nameMatch[1].length));
    const element: XmlElement = {
      name,
      attributes,
      children: [],
    };

    const parent = stack[stack.length - 1];
    parent?.children.push(element);
    if (!isSelfClosing) {
      stack.push(element);
    }
  });

  const firstElement = root.children.find((child): child is XmlElement => isElement(child));
  if (!firstElement) {
    throw new Error("Unable to parse Krona XML.");
  }
  return firstElement;
}

function parseAttributes(raw: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const regex = /([^\s=/>]+)\s*=\s*("([^"]*)"|'([^']*)')/g;

  let match = regex.exec(raw);
  while (match) {
    const key = match[1]?.toLowerCase();
    const rawValue = match[3] ?? match[4] ?? "";
    if (key) {
      attributes[key] = decodeXmlEntities(rawValue);
    }
    match = regex.exec(raw);
  }

  return attributes;
}

function resolveMagnitudeTag(root: XmlElement, warnings: ImportWarning[]): string {
  const attributesNode = childElements(root, "attributes")[0];
  const magnitudeTag = attributesNode?.attributes.magnitude?.trim().toLowerCase();
  if (magnitudeTag && magnitudeTag.length > 0) {
    return magnitudeTag;
  }

  warnings.push(
    createKronaWarning({
      code: "KRONA_MISSING_MAGNITUDE_ATTRIBUTE",
      message: "Missing attributes magnitude declaration. Falling back to 'magnitude'.",
      column: "attributes.magnitude",
    }),
  );

  return "magnitude";
}

function resolveDatasetNames(root: XmlElement): string[] {
  const datasetsNode = childElements(root, "datasets")[0];
  if (!datasetsNode) {
    return [];
  }

  return childElements(datasetsNode, "dataset")
    .map((datasetNode) => readText(datasetNode).trim())
    .filter((name) => name.length > 0);
}

function normalizeDatasetNames(
  names: string[],
  datasetCount: number,
  warnings: ImportWarning[],
): string[] {
  if (datasetCount <= 0) {
    return [];
  }

  const normalized = [...names];
  while (normalized.length < datasetCount) {
    const fallbackName = `${DEFAULT_DATASET_PREFIX} ${normalized.length + 1}`;
    warnings.push(
      createKronaWarning({
        code: "KRONA_DATASET_NAME_MISSING",
        message: `Dataset name missing at index ${normalized.length}. Using '${fallbackName}'.`,
      }),
    );
    normalized.push(fallbackName);
  }

  return normalized.map((name, index) =>
    normalizeName(name, `${DEFAULT_DATASET_PREFIX} ${index + 1}`),
  );
}

interface BuildTreeArgs {
  nodes: XmlElement[];
  datasetIndex: number;
  magnitudeTag: string;
  warnings: ImportWarning[];
}

function buildTreeForDataset(args: BuildTreeArgs): TreeNode {
  if (args.nodes.length === 1) {
    return buildTreeNode(args.nodes[0]!, args.datasetIndex, args.magnitudeTag, args.warnings, []);
  }

  const children = args.nodes.map((node) =>
    buildTreeNode(node, args.datasetIndex, args.magnitudeTag, args.warnings, []),
  );
  const magnitude = children.reduce((sum, child) => sum + normalizeMagnitude(child.magnitude), 0);
  return {
    name: "Root",
    magnitude,
    children,
  };
}

function buildTreeNode(
  node: XmlElement,
  datasetIndex: number,
  magnitudeTag: string,
  warnings: ImportWarning[],
  path: string[],
): TreeNode {
  const rawName = (node.attributes.name ?? "").trim();
  const name = normalizeName(rawName, "Unnamed");
  const currentPath = [...path, name];

  if (rawName.length === 0) {
    warnings.push(
      createKronaWarning({
        code: "KRONA_MISSING_NODE_NAME",
        message: `Node name missing at path '${path.join("/") || "root"}'. Using 'Unnamed'.`,
      }),
    );
  }

  const childNodes = childElements(node, "node").map((child) =>
    buildTreeNode(child, datasetIndex, magnitudeTag, warnings, currentPath),
  );

  const explicitMagnitudeRaw = resolveIndexedFieldValue(node, magnitudeTag, datasetIndex);
  const explicitMagnitudeText = normalizeOptionalText(explicitMagnitudeRaw);
  const explicitMagnitude = parseMagnitude(explicitMagnitudeText);
  const childrenMagnitude = childNodes.reduce(
    (sum, child) => sum + normalizeMagnitude(child.magnitude),
    0,
  );

  if (explicitMagnitudeText !== null && explicitMagnitude === null) {
    warnings.push(
      createKronaWarning({
        code: "KRONA_INVALID_MAGNITUDE",
        message: `Invalid magnitude '${explicitMagnitudeText}' at path '${currentPath.join("/")}'.`,
        column: magnitudeTag,
      }),
    );
  }

  const attributes = collectAttributes(node, datasetIndex, magnitudeTag);
  const magnitude = explicitMagnitude ?? childrenMagnitude;
  return {
    name,
    magnitude: normalizeMagnitude(magnitude),
    children: childNodes.length > 0 ? childNodes : undefined,
    attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    explicitMagnitude,
  };
}

function collectAttributes(
  node: XmlElement,
  datasetIndex: number,
  magnitudeTag: string,
): Record<string, string> {
  const attributes: Record<string, string> = {};
  childElements(node).forEach((child) => {
    if (child.name === "node" || child.name === magnitudeTag) {
      return;
    }

    const value = resolveIndexedFieldValue(node, child.name, datasetIndex);
    if (value === null || value.trim().length === 0) {
      return;
    }
    attributes[child.name] = value.trim();
  });
  return attributes;
}

function inferDatasetCount(nodes: XmlElement[], magnitudeTag: string): number {
  let maxCount = 0;

  const visit = (node: XmlElement): void => {
    const values = readFieldValues(node, magnitudeTag);
    maxCount = Math.max(maxCount, values.length);
    childElements(node, "node").forEach((child) => visit(child));
  };

  nodes.forEach((node) => visit(node));
  return maxCount;
}

function resolveIndexedFieldValue(
  node: XmlElement,
  fieldName: string,
  datasetIndex: number,
): string | null {
  const values = readFieldValues(node, fieldName);
  if (values.length === 0) {
    return null;
  }
  if (datasetIndex < values.length) {
    return values[datasetIndex] ?? null;
  }
  return values[values.length - 1] ?? null;
}

function readFieldValues(node: XmlElement, fieldName: string): string[] {
  const fieldNode = childElements(node, fieldName)[0];
  if (!fieldNode) {
    return [];
  }

  const valueNodes = childElements(fieldNode, "val");
  if (valueNodes.length > 0) {
    return valueNodes.map((valueNode) => readText(valueNode));
  }

  const text = readText(fieldNode);
  return text.length > 0 ? [text] : [];
}

function collectFlatRows(tree: TreeNode): NormalizedRow[] {
  const rows: NormalizedRow[] = [];
  let index = 0;

  const visit = (node: TreeNode, path: string[]): void => {
    const nextPath = [...path, node.name];
    const children = node.children ?? [];
    if (children.length === 0) {
      const magnitude = normalizeMagnitude(node.magnitude);
      if (magnitude <= 0) {
        return;
      }
      index += 1;
      rows.push({
        rowId: `row-${index}`,
        sourceRow: index,
        magnitude,
        path: nextPath,
        url: null,
        description: null,
        attributes: node.attributes ?? {},
      });
      return;
    }

    children.forEach((child) => visit(child, nextPath));
  };

  visit(tree, []);
  return rows;
}

function readText(node: XmlElement): string {
  const values: string[] = [];
  const visit = (child: XmlChild): void => {
    if (typeof child === "string") {
      values.push(child);
      return;
    }
    child.children.forEach((nested) => visit(nested));
  };
  node.children.forEach((child) => visit(child));
  return values.join(" ").replace(/\s+/g, " ").trim();
}

function childElements(node: XmlElement, name?: string): XmlElement[] {
  if (!name) {
    return node.children.filter((child): child is XmlElement => isElement(child));
  }
  const normalized = name.toLowerCase();
  return node.children.filter(
    (child): child is XmlElement => isElement(child) && child.name === normalized,
  );
}

function createKronaWarning(input: {
  code: string;
  message: string;
  row?: number;
  column?: string;
}): ImportWarning {
  return {
    code: input.code,
    message: input.message,
    severity: "warning",
    row: input.row,
    column: input.column,
  };
}

function normalizeMagnitude(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

function parseMagnitude(value: string | null): number | null {
  if (value === null) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

function normalizeOptionalText(value: string | null): string | null {
  if (value === null) {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function normalizeName(value: string, fallback: string): string {
  const normalized = decodeXmlEntities(value).trim();
  return normalized.length > 0 ? normalized : fallback;
}

function toProjectName(fileName: string): string {
  const trimmed = fileName.trim();
  if (trimmed.length === 0) {
    return DEFAULT_PROJECT_NAME;
  }

  const withoutExtension = trimmed.replace(/\.[^.]+$/, "");
  const base = withoutExtension.toLowerCase().endsWith(KRONA_EXTENSION)
    ? withoutExtension.slice(0, -KRONA_EXTENSION.length)
    : withoutExtension;
  return normalizeName(base, DEFAULT_PROJECT_NAME);
}

function isElement(value: XmlChild): value is XmlElement {
  return typeof value !== "string";
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => fromCharCodeSafe(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec: string) => fromCharCodeSafe(parseInt(dec, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function fromCharCodeSafe(code: number): string {
  if (!Number.isInteger(code) || code < 0) {
    return "";
  }
  try {
    return String.fromCodePoint(code);
  } catch {
    return "";
  }
}
