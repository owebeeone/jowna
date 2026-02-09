import type { ChartSettings, TreeNode } from "../../domain";

export interface ChartRenderInput {
  root: TreeNode;
  settings: ChartSettings;
  focusedPath: string[] | null;
  depthLimit: number | null;
}

export interface ChartLayoutNode {
  path: string[];
  name: string;
  depth: number;
  magnitude: number;
  startAngle: number;
  endAngle: number;
}

export interface ChartLayoutResult {
  nodes: ChartLayoutNode[];
  totalMagnitude: number;
}

export interface ChartRenderer {
  computeLayout(input: ChartRenderInput): ChartLayoutResult;
}

export interface ChartNavigationState {
  focusHistory: string[][];
  historyIndex: number;
}

export interface ChartNavigationActions {
  focusPath(path: string[]): void;
  goBack(): void;
  goForward(): void;
  reset(): void;
}

export interface ChartNavigationController {
  readonly state: ChartNavigationState;
  readonly actions: ChartNavigationActions;
}

