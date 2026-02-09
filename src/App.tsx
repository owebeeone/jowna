import type { ModuleBoundaryMap } from "./app/module-map";

const boundaryMap: ModuleBoundaryMap = {
  domain: "src/domain",
  parsers: "src/parsers",
  storage: "src/storage/indexeddb",
  importTool: "src/features/import-tool",
  fileManager: "src/features/file-manager",
  chart: "src/features/chart",
  state: "src/grips.ts + src/taps.ts + src/runtime.ts",
};

export function App() {
  return (
    <main>
      <h1>Jowna: Phase 1 Foundations</h1>
      <p>Core contracts and initial implementation modules are in place.</p>
      <ul>
        {Object.entries(boundaryMap).map(([name, path]) => (
          <li key={name}>
            <code>{name}</code>: <code>{path}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
