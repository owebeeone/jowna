import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../domain";
import { parseKronaHtmlProject } from "../../features/file-manager";
import { renderJownaSnapshotSvg } from "./jowna-snapshot";
import { renderKronaSnapshot } from "./runtime";
import { canonicalizeSvg, compareCanonicalSvg } from "./svg-canonicalize";

const FIXTURE_PATH = fileURLToPath(
  new URL("../../../../../../Kronagh/examples/metarep-blast.krona.html", import.meta.url),
);
const FIXTURE_CONTENT = readFileSync(FIXTURE_PATH, "utf8");
const FIXTURE_PARSED = parseKronaHtmlProject({
  name: "metarep-blast.krona.html",
  content: FIXTURE_CONTENT,
});

const TARGET_DATASET_INDEX = FIXTURE_PARSED.datasets.findIndex(
  (dataset) => dataset.name === "HOT01-0010M",
);
const DATASET_INDEX = TARGET_DATASET_INDEX >= 0 ? TARGET_DATASET_INDEX : 0;
const DATASET = FIXTURE_PARSED.datasets[DATASET_INDEX];

const IMAGE_WIDTH = 1280;
const IMAGE_HEIGHT = 900;
const FONT_SIZE = 11;
const FONT_FAMILY = "sans-serif";

const STRICT_GEOMETRY_RATIO = 0.99;
const STRICT_COLOR_RATIO = 0.99;
const STRICT_LABEL_RATIO = 0.99;
const DEFAULT_MONTE_CARLO_SEED = 20260210;
const DEFAULT_MONTE_CARLO_CASES = 24;
const DEFAULT_SUBPATH_SAMPLE_SIZE = 8;

interface ParityScenario {
  datasetIndex: number;
  focusPath: string[];
  depthLimit: number;
  collapse: boolean;
  label: string;
}

interface ParityRunResult {
  scenario: ParityScenario;
  comparison: ReturnType<typeof compareCanonicalSvg>;
}

describe("krona/jowna svg parity", () => {
  it("matches krona geometry/color on metarep cyano view (non-collapsed)", () => {
    expect(DATASET).toBeTruthy();
    const focusPath = findPathEndingWith(DATASET!.tree, ["Bacteria", "Cyanobacteria"]) ?? [
      DATASET!.tree.name,
      "Bacteria",
      "Cyanobacteria",
    ];

    const result = runParityScenario({
      datasetIndex: DATASET_INDEX,
      focusPath,
      depthLimit: 20,
      collapse: false,
      label: "cyano-non-collapsed",
    });

    assertStrictParity(result);
  });

  it("matches krona geometry/color on metarep cyano view (collapsed)", () => {
    expect(DATASET).toBeTruthy();
    const focusPath = findPathEndingWith(DATASET!.tree, ["Bacteria", "Cyanobacteria"]) ?? [
      DATASET!.tree.name,
      "Bacteria",
      "Cyanobacteria",
    ];

    const result = runParityScenario({
      datasetIndex: DATASET_INDEX,
      focusPath,
      depthLimit: 20,
      collapse: true,
      label: "cyano-collapsed",
    });

    assertStrictParity(result);
  });

  it("matches krona geometry/color across deterministic sub-path matrix", () => {
    expect(DATASET).toBeTruthy();
    const tree = DATASET!.tree;
    const maxDepth = Math.max(2, computeMaxDepth(tree));
    const focusCandidates = collectFocusCandidates(tree);
    expect(focusCandidates.length).toBeGreaterThan(0);

    const selectedSubpaths = selectDeterministicSubpaths(
      focusCandidates,
      DEFAULT_SUBPATH_SAMPLE_SIZE,
    );
    const depthOptions = uniqueSortedNumbers([
      clampDepth(6, maxDepth),
      clampDepth(10, maxDepth),
      clampDepth(20, maxDepth),
    ]);

    const scenarios: ParityScenario[] = [];
    for (const focusPath of selectedSubpaths) {
      for (const collapse of [false, true]) {
        for (const depthLimit of depthOptions) {
          scenarios.push({
            datasetIndex: DATASET_INDEX,
            focusPath,
            depthLimit,
            collapse,
            label: `subpath=${focusPath.join("/")}|collapse=${collapse}|depth=${depthLimit}`,
          });
        }
      }
    }

    const failures = runStrictParityScenarios(scenarios);
    if (failures.length > 0) {
      throw new Error(formatStrictFailures(`deterministic-subpath-matrix`, failures));
    }
  }, 30000);

  it("matches krona geometry/color for seeded monte-carlo scenarios", () => {
    expect(DATASET).toBeTruthy();
    const tree = DATASET!.tree;
    const focusCandidates = collectFocusCandidates(tree);
    expect(focusCandidates.length).toBeGreaterThan(0);

    const maxDepth = Math.max(2, computeMaxDepth(tree));
    const seed = parseEnvInt("JOWNA_PARITY_SEED", DEFAULT_MONTE_CARLO_SEED);
    const cases = Math.max(
      1,
      parseEnvInt("JOWNA_PARITY_MONTE_CARLO_CASES", DEFAULT_MONTE_CARLO_CASES),
    );
    const random = mulberry32(seed);
    const scenarios: ParityScenario[] = [];

    for (let index = 0; index < cases; index += 1) {
      const focusPath = focusCandidates[Math.floor(random() * focusCandidates.length)]!;
      const collapse = random() >= 0.5;
      const depthLimit = clampDepth(2 + Math.floor(random() * 19), maxDepth);
      scenarios.push({
        datasetIndex: DATASET_INDEX,
        focusPath,
        depthLimit,
        collapse,
        label: `seed=${seed}|case=${index}|focus=${focusPath.join("/")}|collapse=${collapse}|depth=${depthLimit}`,
      });
    }

    const failures = runStrictParityScenarios(scenarios);
    if (failures.length > 0) {
      throw new Error(
        formatStrictFailures(`seed=${seed},cases=${cases},fixture=${DATASET!.name}`, failures),
      );
    }
  }, 30000);
});

function runStrictParityScenarios(scenarios: ParityScenario[]): ParityRunResult[] {
  const failures: ParityRunResult[] = [];
  for (const scenario of scenarios) {
    const result = runParityScenario(scenario);
    if (!isStrictParity(result.comparison)) {
      failures.push(result);
    }
  }
  return failures;
}

function runParityScenario(scenario: ParityScenario): ParityRunResult {
  const dataset = FIXTURE_PARSED.datasets[scenario.datasetIndex];
  if (!dataset) {
    throw new Error(`Missing dataset at index ${scenario.datasetIndex}.`);
  }

  const krona = renderKronaSnapshot({
    content: FIXTURE_CONTENT,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    datasetIndex: scenario.datasetIndex,
    selectedPath: scenario.focusPath,
    maxAbsoluteDepth: scenario.depthLimit,
    collapse: scenario.collapse,
    showMagnitude: true,
    fontSize: FONT_SIZE,
  });

  const resolvedFocusPath =
    krona.state.selectedPath.length > 0 ? krona.state.selectedPath : scenario.focusPath;
  const jownaSvg = renderJownaSnapshotSvg({
    root: dataset.tree,
    focusedPath: resolvedFocusPath,
    depthLimit: scenario.depthLimit,
    collapseRedundant: scenario.collapse,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    centerX: krona.geometry.centerX,
    centerY: krona.geometry.centerY,
    radius: krona.geometry.radius,
    fontSizePx: FONT_SIZE,
    fontFamily: FONT_FAMILY,
  });

  const kronaCanonical = canonicalizeSvg(krona.svg, { decimals: 3 });
  const jownaCanonical = canonicalizeSvg(jownaSvg, { decimals: 3 });
  const comparison = compareCanonicalSvg(kronaCanonical, jownaCanonical);
  return { scenario, comparison };
}

function assertStrictParity(result: ParityRunResult): void {
  const { comparison } = result;
  expect(comparison.wedgeCountExpected).toBeGreaterThan(0);
  expect(comparison.wedgeCountActual).toBe(comparison.wedgeCountExpected);
  expect(comparison.wedgeGeometryMatchRatio).toBeGreaterThanOrEqual(STRICT_GEOMETRY_RATIO);
  expect(comparison.wedgeColorMatchRatio).toBeGreaterThanOrEqual(STRICT_COLOR_RATIO);
  expect(comparison.labelMatchRatio).toBeGreaterThanOrEqual(STRICT_LABEL_RATIO);
}

function isStrictParity(comparison: ReturnType<typeof compareCanonicalSvg>): boolean {
  if (comparison.wedgeCountExpected <= 0) {
    return false;
  }
  if (comparison.wedgeCountActual !== comparison.wedgeCountExpected) {
    return false;
  }
  if (comparison.wedgeGeometryMatchRatio < STRICT_GEOMETRY_RATIO) {
    return false;
  }
  if (comparison.wedgeColorMatchRatio < STRICT_COLOR_RATIO) {
    return false;
  }
  if (comparison.labelMatchRatio < STRICT_LABEL_RATIO) {
    return false;
  }
  return true;
}

function formatStrictFailures(header: string, failures: ParityRunResult[]): string {
  const preview = failures.slice(0, 10).map((failure, index) => {
    const { scenario, comparison } = failure;
    return [
      `#${index + 1} ${scenario.label}`,
      `focus=${scenario.focusPath.join("/")}`,
      `collapse=${scenario.collapse}`,
      `depth=${scenario.depthLimit}`,
      `wedgeCount expected=${comparison.wedgeCountExpected} actual=${comparison.wedgeCountActual}`,
      `ratios geometry=${comparison.wedgeGeometryMatchRatio.toFixed(4)} color=${comparison.wedgeColorMatchRatio.toFixed(4)} label=${comparison.labelMatchRatio.toFixed(4)}`,
      `missingWedgeSample=${comparison.samples.missingExpectedWedgeD[0] ?? "none"}`,
      `unexpectedWedgeSample=${comparison.samples.unexpectedActualWedgeD[0] ?? "none"}`,
    ].join("\n");
  });
  return [`Strict parity failed for ${failures.length} scenario(s): ${header}`, ...preview].join(
    "\n\n",
  );
}

function collectFocusCandidates(root: TreeNode): string[][] {
  const candidates: string[][] = [];
  const visit = (node: TreeNode, path: string[]): void => {
    const nextPath = [...path, node.name];
    if (
      nextPath.length > 1 &&
      (node.children?.length ?? 0) > 0 &&
      Number.isFinite(node.magnitude) &&
      node.magnitude > 0
    ) {
      candidates.push(nextPath);
    }
    for (const child of node.children ?? []) {
      visit(child, nextPath);
    }
  };
  visit(root, []);
  return candidates.sort((left, right) => {
    if (left.length !== right.length) {
      return left.length - right.length;
    }
    return left.join("/").localeCompare(right.join("/"));
  });
}

function selectDeterministicSubpaths(paths: string[][], targetCount: number): string[][] {
  if (paths.length <= targetCount) {
    return [...paths];
  }

  const picks: string[][] = [];
  const seen = new Set<string>();
  for (let index = 0; index < targetCount; index += 1) {
    const ratio = targetCount === 1 ? 0 : index / (targetCount - 1);
    const pathIndex = Math.floor(ratio * (paths.length - 1));
    const path = paths[pathIndex]!;
    const key = path.join("/");
    if (!seen.has(key)) {
      picks.push(path);
      seen.add(key);
    }
  }
  return picks;
}

function computeMaxDepth(root: TreeNode): number {
  const visit = (node: TreeNode, depth: number): number => {
    let maxDepth = depth;
    for (const child of node.children ?? []) {
      maxDepth = Math.max(maxDepth, visit(child, depth + 1));
    }
    return maxDepth;
  };
  return visit(root, 1);
}

function clampDepth(depth: number, maxDepth: number): number {
  return Math.max(2, Math.min(depth, maxDepth));
}

function uniqueSortedNumbers(values: number[]): number[] {
  return Array.from(new Set(values)).sort((left, right) => left - right);
}

function parseEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return parsed;
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function findPathEndingWith(root: TreeNode, suffix: string[]): string[] | null {
  const matches: string[][] = [];
  const visit = (node: TreeNode, path: string[]): void => {
    const nextPath = [...path, node.name];
    if (pathEndsWith(nextPath, suffix)) {
      matches.push(nextPath);
    }
    for (const child of node.children ?? []) {
      visit(child, nextPath);
    }
  };
  visit(root, []);
  return matches[0] ?? null;
}

function pathEndsWith(path: string[], suffix: string[]): boolean {
  if (suffix.length === 0 || suffix.length > path.length) {
    return false;
  }
  const start = path.length - suffix.length;
  for (let index = 0; index < suffix.length; index += 1) {
    if (path[start + index] !== suffix[index]) {
      return false;
    }
  }
  return true;
}
