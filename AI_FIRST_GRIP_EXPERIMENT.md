# AI-First State Management Experiment: Using Grip Exclusively

## Why we used `grip-react` exclusively

This project intentionally used `@owebeeone/grip-react` as the only state-management approach in React screens.

The goal was to test an **AI-first library hypothesis**:

- Can agents reliably implement and refactor features when state has a single explicit contract?
- Does a contract-first model reduce hidden coupling compared with scattered local React state?
- Can we improve first-pass correctness for AI-generated code by making read/write flows explicit?

Using one paradigm across the app removed ambiguity. Agents had one expected pattern:

- define state contract in grips
- read through `useGrip(...)`
- mutate through taps (`useAtomValueTap(...)`, `*.Tap`, and grip helpers)

## What we found

The experiment was informative and mostly smooth.

- There were **no major architectural hiccups** from using grip state end-to-end.
- Refactors were generally straightforward because state intent was explicit and centrally named.
- Agents were able to understand and work within the model faster than expected.

The primary issue we saw was process drift, not model failure:

- A few agent-generated updates introduced React local state patterns (`useState`/`useEffect`) in screen code.
- Those were cleaned up and moved back to grips/taps.
- A guardrail test was added to prevent regression (`src/screens/state-management.rules.test.ts`).

So the friction was mostly enforcement/consistency, not a conceptual problem with grip state.

## Contract-first structure: why the extra verbosity helped LLMs

Grip contracts are more verbose than plain React primitives, but that verbosity had real upside for AI-assisted development.

### Advantages

- **Explicit schema**: state keys and defaults are declared up front in one place.
- **Predictable naming**: `FOO` + `FOO_TAP` patterns are easy for agents to follow and extend.
- **Clear read/write boundary**: reads (`useGrip`) and writes (tap handle updates) are distinct.
- **Safer refactors**: moving state across screens/features is easier when contracts are explicit and shared.
- **Better reviewability**: diffs show state contract changes directly, instead of hidden lifecycle behavior.
- **Better test hooks**: guardrails can assert pattern compliance (for example, no screen-level `useState`/`useEffect`).

### Costs

- More boilerplate for simple UI flags.
- More initial setup per screen/context.
- Requires discipline to keep all contributors (human or agent) inside the contract model.

## Git history insights: what actually consumed effort

Reviewing this repository's history confirms that the hardest work was chart-fidelity engineering, not grip adoption.

- Total commits on `main`: 50.
- Commits touching chart/fidelity areas (`features/chart`, `screens/chart`, `ChartScreen`): 26.
- Commits touching grip-state core files (`grips`, `taps_app`, `SelectionScreen`, state rule test): 23.
- Commit overlap is high, but chart-only commits still outnumber grip-only commits.
Aggregate churn is chart-dominant.
- Chart/fidelity files: `+19110 / -5044`.
- Grip-state files: `+3117 / -431`.

The biggest technical inflection points were fidelity-focused:

- Wedge/ring geometry and interaction behavior corrections.
- Krona-like color assignment and key/callout layout.
- Oracle-driven parity testing against Krona snapshots.
- Static export pipeline rework so exported HTML uses the same rendering path.

Grip-specific cleanup happened later in the cycle:

- Explicit non-grip screen state removal landed late.
- A guardrail test was added to enforce no screen `useState`/`useEffect`.

## Conclusions from progression data

- The primary engineering risk in this project was reproducing Krona interaction fidelity in TypeScript/SVG.
- Grip-first state management was not the bottleneck and did not prevent large refactors.
- The contract model provided stable scaffolding while chart behavior evolved rapidly.
- For AI-first projects, the winning combination here was contract-first state for predictable edits, parity/oracle testing for domain correctness, and lightweight guardrails to prevent pattern drift.

## Summary

As an experiment, this validated the core hypothesis:

- A grip-first, contract-driven model is practical for real feature work.
- AI agents were able to grok the system and execute refactors with relatively low friction.
- The main risk was occasional pattern drift, which is manageable with explicit tests and review rules.

For this project, the tradeoff favored contract clarity and AI reliability over minimal local-state brevity.
