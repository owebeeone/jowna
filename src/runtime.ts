import type { JownaGripContracts } from "./grips";
import { createGripContracts } from "./grips";
import type { TapGraphContract } from "./taps";
import { createDefaultTapGraph } from "./taps";

export interface JownaRuntimeContract {
  grips: JownaGripContracts;
  tapGraph: TapGraphContract;
}

export interface RuntimeFactoryContract {
  createRuntime(): JownaRuntimeContract;
}

export class JownaRuntimeFactory implements RuntimeFactoryContract {
  constructor(
    private readonly grips: JownaGripContracts = createGripContracts(),
    private readonly tapGraph: TapGraphContract = createDefaultTapGraph(),
  ) {}

  createRuntime(): JownaRuntimeContract {
    return {
      grips: this.grips,
      tapGraph: this.tapGraph,
    };
  }
}

export function createRuntimeFactory(): RuntimeFactoryContract {
  return new JownaRuntimeFactory();
}
