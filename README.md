# Shield AI India: Defence & Autonomy Opportunity Map

A presentation-grade, static defence strategy map built with Vite, React, TypeScript, Tailwind CSS and React Flow. It connects budget owners to missions, programme signals, Shield AI products and international evidence. It deliberately does not display a grand “India TAM”.

## Run locally

Node.js 22 LTS recommended. No environment variables or credentials are required.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run validate
npm run build
npm run preview
```

`npm run build` performs strict TypeScript checking and emits the static site in `dist/`. `npm run preview` serves that production build locally. It is not necessary to run a server-side application in deployment.

## Deploy to Vercel (recommended)

1. Commit this folder to a Git repository and push it to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project**, import the repository, and select its root directory.
3. Use the **Vite** framework preset. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install` (or `npm ci` with the committed lockfile).
4. Select **Deploy** and share the resulting URL.

No `vercel.json`, rewrites, server functions, API keys, database or authentication are needed. All navigation changes in-page state rather than server routes. See [Vercel Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

**Cloudflare Pages:** import the repository, build with `npm run build`, output `dist`, and use Node.js 22. **GitHub Pages:** build in a GitHub Actions workflow, upload `dist` with `actions/upload-pages-artifact`, then deploy with `actions/deploy-pages`. Enable Pages from GitHub Actions. Vite uses `base: './'`, so assets work under a repository subdirectory. See [Vite static deployment guidance](https://vite.dev/guide/static-deploy.html).

This deliverable is repo-ready code; no cloud deployment or account configuration has been performed.

## Presenting the map

- The initial graph contains the strategic root and four first-level branches only.
- Click a card to reveal its next generation and open the evidence drawer. Click it again to collapse descendants. Active ancestors and descendants stay prominent; unrelated siblings fade.
- Drag to pan, scroll or use controls to zoom, and use **Fit all visible** when you want the broader tree.
- **Walk the core path** follows India → MoD → Navy → NSUAS → V-BAT → Netherlands precedent. The final source is opened only by a deliberate click, so the walkthrough never triggers a popup.
- Product, service and horizon filters work together. Matching programmes and their ancestors are revealed. Empty combinations show a reset action.
- Evidence cards include what a number means, fit, limits, sources and executive tags. Source links open a new tab with `noopener noreferrer`.
- Escape closes the evidence drawer and pauses the walkthrough. Native buttons, sliders, selects and disclosure panels support keyboard use. Motion styling respects reduced-motion preferences.
- Expand the opportunity model, taxonomy or methodology below the graph. The evidence key remains visible at the bottom of the viewport.

## Data and accounting

- `src/data/opportunities.ts`: typed graph data, mission branches, product explanations and proof definitions. Product/proof instances are generated per programme to maintain a six-level family tree; repeated instances never enter the calculator.
- `src/data/sources.ts`: all 50 literal supplied URLs, plus four checked corroborating/current references. No runtime fetches.
- `src/model.ts`: isolated scenario arithmetic and explicit three-programme allowlist.
- `src/graph.ts`: pure path, filter and visibility logic.
- `scripts/validate.ts`: integrity and accounting checks.
- `research/SOURCE_AUDIT.md`: research findings, corrections and access limitations.
- `research/link-audit.json`: direct HTTP checks of the original supplied references. HTTP accessibility and editorial evidence verification are distinct.

Annual MoD/MHA/Coast Guard allocations are context. Nested capital allocations are not added. DAC bundle totals are shown only as warnings and are never attributed to individual systems. SBS-III is reported national-security spending; civil ISRO spending is grey and excluded. OEMs are a channel, not an extra budget. X-BAT is a development roadmap and is excluded from every numerical scenario.

The calculator sums three **multi-year fit envelopes**, not revenue, wins or an official forecast. Defaults are ₹19,000 Cr × 20%, ₹25,000 Cr × 7.5%, and ₹26,968 Cr × 2%. Results are conservative ₹1,584.84 Cr, base ₹6,214.36 Cr and upside ₹11,748.40 Cr, rounded to whole crore in the UI. Conservative/upside use minimum/maximum fit shares. All use current edited programme values. No annual budgets enter this calculation.

The tactical ₹19,000 Cr default is a requested modelling convention: a $2B baseline at assumed ₹95/$, not a live currency quote. The reported claim is **more than** $2B. The public record does not establish that tactical and MALE pipelines are wholly disjoint; an explicit overlap slider discounts the MALE attach contribution. The phrase “quantified floor” refers to coverage only, not a guaranteed monetary lower bound.

## Offline and privacy

Production has no backend, runtime API calls, analytics, remote fonts, images, authentication or browser storage. Only same-origin HTML, CSS and JavaScript assets load; external websites are visited only on explicit link clicks. Vite's development-only HMR connection is not included in the production build. Serve `dist/` over HTTP(S); opening `index.html` with `file://` is not supported by browser ES modules. Refreshing resets filters and assumptions intentionally.

## Research limitations

Last researched: **5 September 2026**. Source access can change. Some publishers reject automated clients; two supplied legacy DRDO PDF URLs returned 404. The registry preserves these original URLs with notes and provides an official replacement for the taxonomy. Reuters' direct URL was restricted; its report was corroborated in a Reuters-attributed republication. Do not interpret the link audit as a guarantee of future accessibility.

Source inspection corrected the Coast Guard budget head ordering and distinguishes published development targets and planned fleet equipment from achieved milestones. See the audit for details. Product fit, priority, confidence and time horizons are explicitly analyst judgements. No affiliation or endorsement by Shield AI is implied.
