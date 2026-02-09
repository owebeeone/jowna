# Jowna

This workspace currently contains interface-first scaffolding plus initial Step 4 implementations:

- Project structure aligned to Vite + TypeScript.
- Interface-first module boundaries for:
  - `src/domain`
  - `src/parsers`
  - `src/storage/indexeddb`
  - `src/features/import-tool`
  - `src/features/file-manager`
  - `src/features/chart`
  - `src/grips.ts`, `src/taps.ts`, `src/runtime.ts`

Implemented modules:

- `src/parsers`: papaparse-backed delimited parser, JSON parser, parser registry, and parse service.
- `src/storage/indexeddb`: IndexedDB gateway with in-memory fallback.
- `src/features/import-tool`: controller implementation.
- `src/features/file-manager`: controller implementation.
- `src/features/chart`: renderer and navigation implementations.
