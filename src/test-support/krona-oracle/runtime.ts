import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export interface KronaHarnessRenderInput {
  content: string;
  width?: number;
  height?: number;
  datasetIndex?: number;
  selectedPath?: string[];
  focusPath?: string[];
  maxAbsoluteDepth?: number;
  collapse?: boolean;
  showMagnitude?: boolean;
  showKeys?: boolean;
  fontSize?: number;
}

export interface KronaHarnessRenderOutput {
  svg: string;
  state: {
    datasets: number;
    currentDataset: number;
    selectedPath: string[];
    focusPath: string[];
    maxAbsoluteDepth: number;
    fontSize: number;
    collapse: boolean;
    showMagnitude: boolean;
    showKeys: boolean;
  };
  geometry: {
    centerX: number;
    centerY: number;
    radius: number;
  };
}

interface SimpleDomTextNode {
  nodeType: 3;
  nodeValue: string;
  nextSibling: SimpleDomNode | null;
  firstChild: null;
}

interface SimpleDomElementNode {
  nodeType: 1;
  tagName: string;
  firstChild: SimpleDomNode | null;
  nextSibling: SimpleDomNode | null;
  getAttribute: (name: string) => string | undefined;
  _children: SimpleDomNode[];
}

type SimpleDomNode = SimpleDomTextNode | SimpleDomElementNode;

interface ParsedXmlElement {
  name: string;
  attributes: Record<string, string>;
  children: Array<ParsedXmlElement | string>;
}

interface HarnessContextResult {
  context: vm.Context;
  api: {
    load: () => void;
    renderSnapshot: (options: Omit<KronaHarnessRenderInput, "content">) => string;
    getState: () => KronaHarnessRenderOutput["state"];
  };
}

const harnessSourcePath = fileURLToPath(new URL("./krona-2.0.harness.js", import.meta.url));
const harnessSource = readFileSync(harnessSourcePath, "utf8");

export function renderKronaSnapshot(input: KronaHarnessRenderInput): KronaHarnessRenderOutput {
  const xml = extractKronaXml(input.content);
  const parsedRoot = parseXmlRoot(xml);
  const domRoot = toDomElement(parsedRoot);
  const runtime = createKronaHarnessContext({
    kronaElement: domRoot,
    width: input.width ?? 1400,
    height: input.height ?? 1000,
  });

  runtime.api.load();
  const svg = runtime.api.renderSnapshot({
    width: input.width,
    height: input.height,
    datasetIndex: input.datasetIndex,
    selectedPath: input.selectedPath,
    focusPath: input.focusPath,
    maxAbsoluteDepth: input.maxAbsoluteDepth,
    collapse: input.collapse,
    showMagnitude: input.showMagnitude,
    showKeys: input.showKeys,
    fontSize: input.fontSize,
  });
  const state = runtime.api.getState();
  const globals = runtime.context as unknown as {
    centerX?: number;
    centerY?: number;
    gRadius?: number;
  };
  return {
    svg,
    state,
    geometry: {
      centerX: Number.isFinite(globals.centerX)
        ? Number(globals.centerX)
        : (input.width ?? 1400) / 2,
      centerY: Number.isFinite(globals.centerY)
        ? Number(globals.centerY)
        : (input.height ?? 1000) / 2,
      radius: Number.isFinite(globals.gRadius)
        ? Number(globals.gRadius)
        : Math.min(input.width ?? 1400, input.height ?? 1000) / 2,
    },
  };
}

function createKronaHarnessContext(input: {
  kronaElement: SimpleDomElementNode;
  width: number;
  height: number;
}): HarnessContextResult {
  const ids = new Map<string, unknown>();

  const fakeBody = {
    style: {} as Record<string, unknown>,
    appendChild: () => undefined,
    insertBefore: () => undefined,
    removeChild: () => undefined,
    innerHTML: "",
  };

  const canvas = {
    width: input.width,
    height: input.height,
    style: {} as Record<string, unknown>,
  };

  const drawingContext = createDrawingContext(canvas);
  const harness = {
    createCanvas: () => ({
      canvas: {
        ...canvas,
        getContext: () => drawingContext,
      },
      context: drawingContext,
    }),
  };

  const fakeDocument = {
    body: fakeBody,
    title: "",
    location: "http://localhost/",
    getElementsByTagName: (name: string) => {
      if (name.toLowerCase() === "krona") {
        return [input.kronaElement];
      }
      return [];
    },
    getElementById: (id: string) => {
      if (!ids.has(id)) {
        ids.set(id, createGenericElement());
      }
      return ids.get(id);
    },
    createElement: (tagName: string) => {
      if (tagName.toLowerCase() === "canvas") {
        return {
          ...canvas,
          getContext: () => drawingContext,
        };
      }
      return createGenericElement(tagName);
    },
  };

  const fakeWindow = {
    __JOWNA_KRONA_HARNESS__: harness,
    innerWidth: input.width,
    innerHeight: input.height,
    devicePixelRatio: 1,
    document: fakeDocument,
    open: () => ({
      document: {
        write: () => undefined,
        close: () => undefined,
      },
    }),
  };

  const runtimeGlobal = {
    window: fakeWindow,
    document: fakeDocument,
    navigator: { appName: "node" },
    console,
    Math,
    Date,
    encodeURIComponent,
    decodeURIComponent,
    setInterval: () => 0,
    clearInterval: () => undefined,
    setTimeout: () => 0,
    clearTimeout: () => undefined,
  } as unknown as vm.Context;

  Object.assign(runtimeGlobal, { globalThis: runtimeGlobal });
  vm.createContext(runtimeGlobal);
  vm.runInContext(harnessSource, runtimeGlobal, {
    filename: "krona-2.0.harness.js",
  });

  const api = (fakeWindow as { __JOWNA_KRONA_API__?: HarnessContextResult["api"] })
    .__JOWNA_KRONA_API__;
  if (!api) {
    throw new Error("Krona harness API was not initialized.");
  }

  return {
    context: runtimeGlobal,
    api,
  };
}

function createDrawingContext(canvas: {
  width: number;
  height: number;
  style: Record<string, unknown>;
}) {
  const context = {
    canvas,
    globalAlpha: 1,
    lineWidth: 1,
    fillStyle: "#000",
    strokeStyle: "#000",
    font: "11px sans-serif",
    beginPath: () => undefined,
    closePath: () => undefined,
    arc: () => undefined,
    lineTo: () => undefined,
    moveTo: () => undefined,
    stroke: () => undefined,
    fill: () => undefined,
    rotate: () => undefined,
    clip: () => undefined,
    save: () => undefined,
    restore: () => undefined,
    translate: () => undefined,
    clearRect: () => undefined,
    scale: () => undefined,
    createPattern: () => ({}),
    fillText: () => undefined,
    strokeText: () => undefined,
    measureText: (value: string) => {
      const fontMatch = /(\d+(?:\.\d+)?)px/.exec(context.font);
      const fontSize = fontMatch ? Number(fontMatch[1]) : 11;
      const normalizedValue = value == null ? "" : String(value);
      return {
        width: normalizedValue.length * fontSize * 0.58,
      };
    },
  };

  return context;
}

function createGenericElement(tagName = "div") {
  return {
    tagName,
    style: {} as Record<string, unknown>,
    value: "",
    checked: false,
    disabled: false,
    innerHTML: "",
    clientHeight: 0,
    clientWidth: 0,
    offsetTop: 0,
    offsetLeft: 0,
    options: [] as Array<{ disabled: boolean }>,
    addEventListener: () => undefined,
    appendChild: () => undefined,
    removeChild: () => undefined,
    setAttribute: () => undefined,
    focus: () => undefined,
    select: () => undefined,
  };
}

function extractKronaXml(content: string): string {
  const match = content.match(/<krona\b[\s\S]*?<\/krona>/i);
  if (!match) {
    throw new Error("No <krona> XML section found in file.");
  }
  return match[0];
}

function parseXmlRoot(xml: string): ParsedXmlElement {
  const root: ParsedXmlElement = {
    name: "#document",
    attributes: {},
    children: [],
  };
  const stack: ParsedXmlElement[] = [root];
  const tokens = xml.match(/<[^>]+>|[^<]+/g) ?? [];

  for (const token of tokens) {
    if (!token.startsWith("<")) {
      const text = token.trim();
      if (text.length > 0) {
        stack[stack.length - 1]?.children.push(decodeXmlEntities(text));
      }
      continue;
    }

    if (token.startsWith("<!--") || token.startsWith("<?") || token.startsWith("<!")) {
      continue;
    }

    if (token.startsWith("</")) {
      const closingName = token.slice(2, -1).trim().toLowerCase();
      while (stack.length > 1) {
        const current = stack.pop();
        if (current?.name === closingName) {
          break;
        }
      }
      continue;
    }

    const isSelfClosing = token.endsWith("/>");
    const inner = token.slice(1, isSelfClosing ? -2 : -1).trim();
    const nameMatch = inner.match(/^([^\s/>]+)/);
    if (!nameMatch) {
      continue;
    }

    const name = nameMatch[1].toLowerCase();
    const attributes = parseAttributes(inner.slice(nameMatch[1].length));
    const element: ParsedXmlElement = {
      name,
      attributes,
      children: [],
    };

    stack[stack.length - 1]?.children.push(element);
    if (!isSelfClosing) {
      stack.push(element);
    }
  }

  const firstElement = root.children.find(
    (child): child is ParsedXmlElement => typeof child !== "string",
  );
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
    const value = match[3] ?? match[4] ?? "";
    if (key) {
      attributes[key] = decodeXmlEntities(value);
    }
    match = regex.exec(raw);
  }
  return attributes;
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function toDomElement(input: ParsedXmlElement): SimpleDomElementNode {
  const children: SimpleDomNode[] = input.children.map((child) =>
    typeof child === "string" ? toDomText(child) : toDomElement(child),
  );

  for (let index = 0; index < children.length; index += 1) {
    const next = index + 1 < children.length ? children[index + 1]! : null;
    children[index]!.nextSibling = next;
  }

  return {
    nodeType: 1,
    tagName: input.name,
    firstChild: children[0] ?? null,
    nextSibling: null,
    getAttribute: (name: string) => input.attributes[name.toLowerCase()],
    _children: children,
  };
}

function toDomText(value: string): SimpleDomTextNode {
  return {
    nodeType: 3,
    nodeValue: value,
    nextSibling: null,
    firstChild: null,
  };
}
