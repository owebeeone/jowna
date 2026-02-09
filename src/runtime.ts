import type { JownaGripContracts } from "./grips";
import type { TapGraphContract } from "./taps";

export interface JownaRuntimeContract {
  grips: JownaGripContracts;
  tapGraph: TapGraphContract;
}

export interface RuntimeFactoryContract {
  createRuntime(): JownaRuntimeContract;
}

