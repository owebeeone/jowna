# Jowna - Data Visualizer

- Project: <https://github.com/owebeeone/jowna>
- Live demo: <https://owebeeone.github.io/jowna>

## Why Jowna

Jowna is inspired by the Krona ecosystem and documentation:
<https://github.com/marbl/Krona/wiki>

The goal is similar: interactive hierarchical exploration of tabular data.

The difference is delivery:

- no Perl installation required
- no local CLI pipeline required for day-to-day use
- runs entirely in the browser
- easy sharing through downloadable self-contained HTML and SVG exports

## Core Concepts

- **Project**: a container for one or more datasets.
- **Dataset**: parsed source data + generated hierarchy and metadata.
- **Chart view**: interactive radial hierarchy (Krona-style navigation model).
- **Import tool**: file/URL input + parser settings + preview + warnings.

## What Jowna Can Do

- Create/copy/delete projects
- Rename projects and datasets inline
- Import CSV/TSV/JSON with configurable parsing parameters
- Preview normalized rows and warnings before applying import
- Build chart-ready hierarchical data
- Navigate chart with focus breadcrumbs, back/forward/up/reset, and depth control
- Configure chart settings (stroke, colors, typography, dimensions)
- Export chart as:
  - standalone single-file HTML
  - SVG snapshot of current chart state
- Export dataset as JSON
- Export/import entire Jowna project files (`.jowna`)

## Browser-Only Persistence

Jowna stores project data in browser storage (IndexedDB/local storage metadata).
This is convenient, but not guaranteed forever.

You should periodically export:

- the project (`Download Jowna`) for backup/move
- key datasets (`Download Dataset`) where needed

## Quick Start

1. Open Jowna (local dev or live demo).
2. Create a project.
3. Open **Import Tool**.
4. Load file or URL.
5. Configure parser fields (format, delimiter, headers, magnitude/path mappings).
6. Click **Preview Parse** and review warnings.
7. Click **Apply Import**.
8. Open chart for the dataset.
9. Navigate and tune settings.
10. Export HTML/SVG as needed.

## Import Workflow Details

In the import dialog you can control:

- format (`auto`, `tsv`, `csv`, `json-hierarchy`, `json-flat`)
- delimiter
- header-row behavior
- comment prefix
- magnitude field
- path fields
- optional URL/description fields
- optional attribute fields

Jowna follows a best-effort parse strategy:

- row-level issues are reported as warnings
- usable rows still load whenever possible

## Chart Usage

### Navigation

- click wedges to focus
- hover wedges for detail emphasis
- use breadcrumbs to jump to ancestor nodes
- use **Back/Forward/Up/Reset**
- use **Depth** to limit rendered levels

### Chart Settings

Use **Chart Settings** to change:

- background and border
- wedge stroke color/width
- font family and size
- optional fixed width/height (or fit mode)

### Chart Export

- **Download HTML**: standalone interactive chart page
- **Download SVG**: current chart image snapshot

## Data Export/Import

### Dataset export

- from dataset row, click **Download Dataset**
- output: `.json` containing export metadata + dataset payload

### Project export/import

- **Download Jowna** exports a `.jowna` file
- **Upload Project** imports previously exported `.jowna` archives

Jowna archives are versioned for migration compatibility.

## Development

### Requirements

- Node.js + npm
- `rsync` (for docs publish workflow)
- Python 3 (for release/publish automation script)

### Run locally

```bash
npm install
npm run dev
```

### Build and validate

```bash
npm run build
npm run format
npm run typecheck
npm run test
```

## Publishing to GitHub Pages

Jowna is configured for Pages path hosting (`/jowna/`).

Use:

```bash
npm run publish:site
```

This runs `tools/publish.py`, which:

1. verifies clean git state
2. bumps package version and creates a release tag (`vX.Y.Z`) on `main`
3. merges `main` into `publish`
4. runs docs deploy (`npm run deploy:docs`)
5. commits and pushes publish artifacts

## Tech Stack

- React + TypeScript + Vite
- `@owebeeone/grip-react` for grips/taps state flow
- `papaparse` for CSV/TSV parsing
