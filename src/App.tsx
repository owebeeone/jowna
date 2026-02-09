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
      <h1>Jowna: Interface Scaffolding</h1>
      <p>Step 1 is in progress: contracts and module boundaries only.</p>
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

