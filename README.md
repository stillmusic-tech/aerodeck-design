# aerodeck-design

Aerodeck design system. Source of truth for tokens (`src/index.css`) and primitive components (`src/components/ui/*`).

Surfaces consume this system via the `@aerodeck` shadcn registry. One registry, governs every Aerodeck and AEROS surface across marketing site and product.

## Architecture

- **Tokens** live in `src/index.css` under `@theme`. Three tiers: primitives → semantic → component. Tailwind v4 generates utility classes from the namespace, so `--color-action-primary` becomes `bg-action-primary` automatically. The `--color-*: initial` line nukes Tailwind defaults — off-brand utilities like `bg-blue-500` will not compile.
- **Components** live in `src/components/ui/`. Each one references semantic tokens only, never primitives or hardcoded values.
- **Registry** is declared in `registry.json` at the repo root. Each item lists its files, dependencies, and metadata.
- **Calibration page** is the default Vite app at `/`. Renders every token + every component state. Visual sanity check on any token change.

## Running locally

```bash
npm install
npm run dev
```

Default port `5173` (or `3020` via the project's launch.json). Calibration page at `http://localhost:<port>/`.

## Hosting (current)

GitHub raw, public. Once components are stable, consumers can install via:

```bash
npx shadcn add @aerodeck/<component-name>
```

This requires:

1. The consuming project's `components.json` registers the `@aerodeck` namespace.
2. A `shadcn build` step generates `public/r/<name>.json` files (deferred — not yet wired).

Until the build step is wired, the registry is structurally correct but installs are manual (copy the source file). Lean first-pass intentionally.

## Reference

- Brand identity: `Aerodeck/Aerodeck Brand Identity` (vault)
- Style guide: `Aerodeck/Branding/Style guide` (vault)
- Design plan: `Aerodeck/Aerodeck Design Plan` (vault)
- Research underpinning this build:
  - `Design/Shadcn Registries and Design Tokens as AI Governance Layer` (vault)
  - `Design/Modern Motion and Scroll-Driven Interaction for React 2026` (vault)
  - `Design/Generative UI and AG-UI Protocol — Implementation Deep Dive` (vault)
