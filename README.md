# Shield AI / India — strategy & execution

An independent, public-source executive strategy application. Vite + React + TypeScript + Tailwind, React Router, React Flow and Recharts. Static assets only: no backend, authentication, database, analytics or application runtime data fetching. External URLs are citation links.

## Run locally

Requires Node.js 20.19+ (tested with 22.17.1).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/ or http://127.0.0.1:5173/bottom-up.

```sh
npm run build
npm run preview
npm run validate
npx playwright install chromium
npm run test:e2e
```

## Routes and capabilities

- `/`: executive thesis, five evidence/model headlines, top-down and bottom-up entry cards.
- `/top-down`: preserves the existing Phase-1 budget explorer, BudgetLens, programme tree and sources. The shared Phase-2 scenario panel replaces the former fit-envelope panel.
- `/bottom-up`: 24 typed opportunity cells, seven priced portfolio layers, 18 government/OEM account entries. Includes a paginated five-stage React Flow map, connected-path fading, account drawers, decision chains, editable influence bars, radar with an accessible list, sortable table, OEM cards, editable scenarios, source popovers, and city clusters.
- `/roadmap`, `/operating-model`, `/md-dashboard`, `/cadence`, `/goals`: substantive, explicitly labelled future-module scaffolds. No fabricated operating metrics.
- `/sources`: unified Phase-1/Phase-2 registry, exact claim support, verification notes and methodology.
- Persistent nine-step Story Mode moves across the full argument. Navigation and source modals support keyboard use; Escape closes the topmost modal and focus returns to its trigger.

Filters (product, domain, buyer, route, horizon, evidence, tier and search), view and selected cell are encoded in query parameters, e.g. `/bottom-up?product=V-BAT&buyer=Navy&view=table`. Secondary product fits also match. Graph pagination shows four complete five-stage paths at a time. Account filters affect the graph, radar, directory and table; decision-power context can independently select any government account. Portfolio scenario totals are explicitly separate from account filtering.

Financial and priority edits are shared across routes during the session. Financial inputs are not encoded in the URL and reset on reload; influence-bar edits reset on reopening an account. Print CSS supports browser print-to-PDF without navigation or controls. All external source links use a new tab with `noopener noreferrer`.

## Model and evidence

**As of 5 September 2026.** Quantified values are gross addressable layers and capture-weighted planning values, never ARR or revenue forecasts. Indian V-BAT package price, quantities and win probabilities are assumptions; Shield net revenue under JSW economics is unknown. Official, Shield, OEM, reported and model evidence are visibly distinguished.

Full five-year defaults:

| Scenario | Gross layer | Capture-weighted planning value |
| --- | ---: | ---: |
| Conservative | ₹2,014.84 Cr | ₹276.742 Cr |
| Base | ₹3,964.52 Cr | ₹958.452 Cr |
| Upside | ₹7,129.04 Cr | ₹2,555.356 Cr |

The brief omits conservative/upside V-BAT probabilities. Explicit analyst inputs of 45%/20%/20% and 75%/40%/40% (Army/Navy/ICG) reconcile its approximate totals. The base uses the supplied 60%/35%/30%.

Base 18-month view includes ₹720 Cr gross / ₹432 Cr weighted Army V-BAT planning value, plus unpriced pilot priorities. Three-year view adds naval/ICG scale, the tactical software pool and two MALE layers (₹3,560 Cr gross / ₹918 Cr weighted). Five-year view adds SBS-III. X-BAT is always unpriced. No bundled DAC amount is assigned to an individual system.

See [ASSUMPTIONS.md](ASSUMPTIONS.md) for all numeric and qualitative assumptions, every seeded score, power profile and next move; [Phase-2 source audit](research/PHASE2_SOURCE_AUDIT.md) for verification and limitations. The prior Phase-1 README/audit remain in `research/` for historical context; their former numerical fit-envelope is no longer the UI model.

## Project structure

```text
src/strategy/
  types.ts          OpportunityCell, Account, role and claim types
  sources.ts        Unified source registry and verification notes
  accounts.ts       6 B2G and 12 prime/OEM profiles (2 diligence-only)
  cells.ts          24 seeded opportunity cells, filters and precedents
  model.ts          Pure seven-layer calculator and scenario defaults
  shared.tsx        Shared state, evidence, modals and scenario calculator
  BottomUp.tsx      Graph, radar, table, account briefs, power and geography
  Shell.tsx         Router, navigation, thesis, Story Mode and scaffolds
  strategy.css      Responsive executive design and print rules
src/App.tsx         Preserved Phase-1 tree, using shared scenario panel
src/BudgetLens.tsx  Existing official budget lens
scripts/           Data/accounting validation and assumptions generation
 tests/            Browser interaction, route and responsive checks
```

## Deploy to Vercel

1. Push this project to a Git repository and import it into Vercel.
2. Select **Vite**. Root directory: this project. Install: `npm ci`. Build: `npm run build`. Output: `dist`.
3. No environment variables are required. `vercel.json` includes the SPA rewrite for React Router; assets use `/assets/...` so deep links work on refresh.
4. Deploy, then check `/`, `/bottom-up?buyer=Navy&view=table`, and `/sources` directly in a fresh tab.

Alternatively, from this directory use the Vercel CLI (`vercel` for a preview; `vercel --prod` to publish). No deployment has been performed by this implementation.

## Verification

- Production TypeScript/Vite build.
- Phase-1 regression validation: 330 tree nodes, source references, product proof paths, visibility and original calculation utilities.
- Phase-2 validation: IDs and references, score formula, all three scenarios, no duplicate tactical allocation, strategic exclusions, overlap adjustment, secondary-product and combined filters.
- Six Playwright tests: financial editing/reset, horizon changes, URL filter reloads across graph/table/radar, keyboard node selection, nested source modals, priority editing, Story Mode, cross-route model state, all routes at 1440/768/390px with no page overflow or runtime errors.
- Desktop and mobile screenshots in `artifacts/` were inspected. External publishers may block some requests; citation accessibility and claim-verification limitations are disclosed rather than hidden.
