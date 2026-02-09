import type { JownaGripKey } from "./grips";

export type TapKind = "atom" | "function" | "async";

export interface TapContract {
  id: string;
  kind: TapKind;
  inputGrips: readonly JownaGripKey[];
  outputGrips: readonly JownaGripKey[];
  description: string;
}

export interface TapGraphContract {
  taps: readonly TapContract[];
}

