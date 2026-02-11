import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const SCREEN_STATE_FILES = [
  "src/screens/SelectionScreen.tsx",
  "src/screens/chart/web/useChartScreenModel.ts",
] as const;

describe("screen state management rules", () => {
  it("does not use React useState/useEffect for screen state", () => {
    for (const file of SCREEN_STATE_FILES) {
      const source = readFileSync(resolve(process.cwd(), file), "utf8");
      expect(source).not.toMatch(/\buseState\s*\(/);
      expect(source).not.toMatch(/\buseEffect\s*\(/);
    }
  });
});
