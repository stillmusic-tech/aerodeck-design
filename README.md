# aerodeck-design

Aerodeck design system. Source of truth for tokens (`src/index.css`) and primitive components (`src/components/ui/*`).

Surfaces consume this system via the `@aerodeck` shadcn registry. One registry, governs every Aerodeck and AEROS surface across marketing site and product.

## Architecture

- **Tokens** live in `src/index.css` under `@theme`. Three tiers: primitives → semantic → component. Tailwind v4 generates utility classes from the namespace, so `--color-action-primary` becomes `bg-action-primary` automatically. The `--color-*: initial` line nukes Tailwind defaults — off-brand utilities like `bg-blue-500` will not compile.
- **Colour primitives are OKLCH**, not hex. Perceptual uniformity across hues and access to Display P3 on supported hardware. Tune chroma in the primitive layer, never in components.
- **Motion vocabulary** is part of `@theme` too: two easings (`--ease-entrance`, `--ease-interaction`), four durations, three staggers, and explicit animations (`--animate-spin` + keyframes). Small enough to stay consistent across every component.
- **Components** live in `src/components/ui/`. Each one references semantic tokens only, never primitives or hardcoded values.
- **Registry** is declared in `registry.json` at the repo root. Each item lists its files, dependencies, and metadata.
- **Calibration page** is the default Vite app at `/`. Renders every token + every component state. Visual sanity check on any token change.

## Running locally

```bash
npm install
npm run dev
```

Default port `5173` (or `3020` via the project's launch.json). Calibration page at `http://localhost:<port>/`.

## Hosting and install

GitHub raw, public. Consumers install with:

```bash
npx shadcn add @aerodeck/<component-name>
```

The consumer's `components.json` must register the `@aerodeck` namespace:

```json
{
  "registries": {
    "@aerodeck": "https://raw.githubusercontent.com/stillmusic-tech/aerodeck-design/main/public/r/{name}.json"
  }
}
```

Building the registry locally:

```bash
npm run build:registry
```

This regenerates `public/r/<name>.json` files with each component's source embedded. Commit and push to make the change live for consumers. Verified end-to-end against a fresh Vite + TS consumer 2026-05-17.

## MCP

The registry is exposed via MCP so Claude Code, Cursor, and v0 can discover and install components conversationally. `.mcp.json` registers the shadcn MCP server; `components.json` registers the `@aerodeck` namespace. Once the dev environment is wired, an agent can browse, search, view, and install Aerodeck components without leaving the editor.

To set MCP up in a consumer project:

```bash
npx shadcn@latest mcp init --client claude
```

Then add the namespace to the consumer's `components.json` (see "Hosting and install" above).

## Linting

Three custom ESLint rules in `eslint-rules/aerodeck.js` enforce the token system:

- `aerodeck/prefer-semantic-classes` — bans direct use of primitive color tokens (`bg-aeros-cyan`, `text-neutral-600`) in component code. Use the semantic layer (`bg-action-primary`, `text-fg`) instead.
- `aerodeck/no-arbitrary-spacing` — bans arbitrary spacing utilities (`p-[12px]`, `gap-[8px]`). Use the scale or extend `@theme`.
- `aerodeck/no-hardcoded-hex` — bans inline hex colour codes (`#fff`, `#28BED2`). Declare colour in `@theme` as OKLCH and consume through semantic tokens.

All three walk through variants and template strings, so `hover:p-[12px]`, `data-[state=open]:bg-aeros-red`, and `style={{ color: '#fff' }}` are still caught.

Run with `npm run lint`.

## Icons

`lucide-react` is the default for UI affordances (chevrons, X, search, check, info). Tree-shakeable, MIT, shadcn-standard so consumers usually have it already.

Bespoke SVGs are reserved for brand marks (the rainbow A) and AerOS-specific glyphs that need brand personality. Don't reach for bespoke when lucide has a fit.

`lucide-react` is not installed yet — the first component that needs an icon adds it as a `dependency` in its registry manifest.

## Ownership

Laurence owns triage on "missing component" requests. The registry is run as a product, not a project — small, opinionated, slow to grow. Five primitives done well beats thirty done loosely. New components only land when a real consuming surface forces the shape, never speculatively.

## Reference

- Brand identity: `Aerodeck/Aerodeck Brand Identity` (vault)
- Style guide: `Aerodeck/Branding/Style guide` (vault)
- Design plan: `Aerodeck/Aerodeck Design Plan` (vault)
- Research underpinning this build:
  - `Design/Shadcn Registries and Design Tokens as AI Governance Layer` (vault)
  - `Design/Modern Motion and Scroll-Driven Interaction for React 2026` (vault)
  - `Design/Generative UI and AG-UI Protocol — Implementation Deep Dive` (vault)
  - `Design/2026 Dashboard Design Trends — Research Brief` (vault)
  - `Design/AI-Driven React Design Trends 2026 — Research Brief` (vault)
  - `Design/2026 Agentic Dashboard UX — Product Teardowns` (vault)
