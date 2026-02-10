# Jowna - data visualizer

Project link: <https://github.com/owebeeone/jowna>
Live demo: <https://owebeeone.github.io/jowna>

## What this app currently does

- Manages projects and datasets.
- Imports CSV/TSV/JSON through an import popover.
- Previews normalized rows and warnings before apply.
- Renders interactive chart view with focus/hover/breadcrumb navigation.
- Downloads chart view as a standalone single-file HTML export.
- Persists data in IndexedDB with in-memory fallback.

## Stack

- Vite + React + TypeScript
- `@owebeeone/grip-react` for grips/taps state wiring
- `papaparse` for delimited parsing

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run format
npm run typecheck
npm run test
```

## Publish (GitHub Pages)

```bash
npm run publish:site
```

This runs `tools/publish.py`, which:

- bumps `package.json` version and creates a git tag (`vX.Y.Z`) on `main`
- merges `main` into `publish`
- runs `npm run deploy:docs` (`build` + sync `dist/` into `docs/`)
- commits/pushes publish artifacts
