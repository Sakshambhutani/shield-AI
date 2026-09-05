import { writeFileSync } from "node:fs";
import { accounts } from "../src/strategy/accounts";
import { cells } from "../src/strategy/cells";
import { fields, presets, totals, money } from "../src/strategy/model";
const out: string[] = [
  `# Assumptions — Shield AI India strategy

As of **5 September 2026**. Independent public-source analysis. These assumptions are not procurement advice, orders, forecasts, disclosed pricing or Shield AI guidance.

## Facts are stored separately

Source metadata and exact supported claims live in \`src/strategy/sources.ts\`; each opportunity has claim-level citations. The source registry distinguishes GOI, Shield AI, Indian OEM and reported sources, and records verification limits. Phase 1's existing sources are merged into that registry. See \`research/PHASE2_SOURCE_AUDIT.md\` for the new audit. A platform announcement does not establish that a third-party software layer is open.

## Unit and accounting conventions

- Opportunity cell = product × mission × Indian platform/programme × prime × government buyer × technical/acquisition chain. Company-wide TAM is not calculated.
- All financial model amounts are ₹ crore. Gross layer and capture-weighted planning value are not revenue or ARR. Shield net revenue is unknown, especially under JSW manufacturing/licensing/local-content economics.
- A V-BAT system package is a hypothetical procurement bundle; aircraft count, training, payload and support composition are unspecified. No Indian ASP, incremental order quantity or contract net share is known. ViDAR on V-BAT is not added as a separate priced layer.
- Tactical ₹20,000 Cr is a rounded analyst convention based on Reuters' >$2B industry signal. It is not an official rupee allocation or live exchange-rate conversion. The model excludes the assumed V-BAT portion before attaching mission-autonomy software.
- MALE uses early reported ₹20,000 Cr / 87 aircraft, not Phase 1's former ₹25,000 Cr mid-range convention. Later reporting cited by Phase 1 estimates ₹30,000 Cr. The public figure appears in two cell references but is never summed as two programmes.
- Mission software and perception are assumed separable MALE layers. The editable overlap deduction applies to both MALE layers if tactical reporting overlaps MALE scope; default 0% assumes distinct scopes, not established mutual exclusivity.
- The tactical software pool is counted once and is not allocated across Army SDK, NewSpace, TASL, BEL and weapon-drone pursuit routes. Shared-pool cells remain unpriced individually. No extra pool amounts are added for their secondary products.
- HAL CATS, HAPS-specific software, naval / underwater autonomy, simulation, Benchmark and weapon-autonomy targets without defensible individual values remain unpriced. NSUAS does not receive its bundled DAC total or a second value beyond the naval V-BAT package model.
- SBS-III value and satellite count are reported. Its third-party autonomy architecture, sovereign access and buying route are unverified. NOVI is capability proof, not a military programme sale. X-BAT is unpriced and strategic in every scenario.

## Scenario inputs (editable in the app)

Public programme reference facts stay unchanged when these planning inputs are edited. Percentages are bounded to 0–100; package quantities are whole numbers. No model is persisted to external storage.

| Input | Unit | Conservative | Base | Upside |
| --- | --- | ---: | ---: | ---: |`,
];
for (const f of fields)
  out.push(
    `| ${f.group}: ${f.label} | ${f.unit} | ${presets.Conservative[f.key]} | ${presets.Base[f.key]} | ${presets.Upside[f.key]} |`,
  );
out.push(`
### Reconciliation of omitted V-BAT probabilities

The brief specifies base V-BAT win probabilities but omits conservative and upside probabilities while providing target totals. **45%/20%/20% conservative and 75%/40%/40% upside** (Army/Navy/ICG) are explicit analyst choices to reproduce those approximate totals. They are not uniquely implied by the brief and are not evidence-based forecasts.

| Scenario | Gross | Capture-weighted |
| --- | ---: | ---: |`);
for (const n of ["Conservative", "Base", "Upside"] as const) {
  const t = totals(presets[n]);
  out.push(`| ${n} | ${money(t.gross, 2)} | ${money(t.weighted, 3)} |`);
}
out.push(`
## Time horizons

- 18-month numerical view includes only the additional Army V-BAT planning envelope (base ₹720 Cr gross / ₹432 Cr weighted). This is an opportunity envelope, not an award or delivery forecast.
- Full Navy / ICG V-BAT scale, tactical pool and MALE layers enter the three-year view. Base three-year total is ₹3,560 Cr gross / ₹918 Cr weighted.
- Five-year view adds SBS-III. X-BAT never contributes a financial value.
- The brief's broad 0–36-month windows are normalised to 18–36 months for full programme pricing; early demonstrations and unpriced trials may start within 18 months.
- The portfolio scenario is visibly independent of account filters. Filters consistently affect the graph, radar, directory and opportunity table. The decision-power view is reusable account context rather than a numerical aggregation.
- 60–90-day Indian Catalyst-style integrations are proposed pilot targets, not an agreed or guaranteed duration. Demo → integration → field trial → AoN/RFP → contract → delivery is an indicative sequence, not a binding procurement schedule.

## Priority score

25% mission fit + 20% timing + 20% indigenisation fit + 15% access + 10% competitive openness + 10% authority clarity. Each input is 1–5; the weighted mean is divided by 5 and multiplied by 100, then rounded. Thus 1 maps to 20 and 5 maps to 100. The score is not a probability. All six inputs can be edited in a cell drawer.

Radar X = competitive openness, independent of scenario win probability. Y = 60% mission fit + 40% indigenisation fit, an analyst proxy for strategic/platform leverage. Circle area uses the current scenario's gross layer; unpriced cells have a consistent small outlined marker. Equal coordinates can overlap, so a complete keyboard-accessible cell list sits below the chart. All horizons are retained in the radar unless the cell filters narrow them.

### All opportunity-cell assumptions

Product fit, additional product attachment, mission, buyer mappings, account route, horizon, next moves and the following scores are analyst judgements. Evidence badges concern the underlying platform/programme claim only. Public values and quantities are source references, not analyst-generated facts.

| Cell | Platform | Fit | Timing | Indigenous | Access | Open | Authority | Score | Horizon | Route |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |`);
for (const c of cells)
  out.push(
    `| ${c.id} | ${c.platformOrProgram} | ${c.missionFit} | ${c.timing} | ${c.indigenisationFit} | ${c.access} | ${c.competitiveOpenness} | ${c.authorityClarity} | ${c.priorityScore} | ${c.horizon} | ${c.route} |`,
  );
for (const c of cells)
  out.push(`
### ${c.id} — ${c.platformOrProgram}

- Product/mission hypothesis: ${[c.shieldProduct, ...c.additionalProducts].join(" + ")}; ${c.mission}.
- Proposed buyer / technical route: ${c.b2gBuyer}; ${c.technicalAuthority}; ${c.acquisitionAuthority}.
- First move: ${c.nextMove}
- Qualification: ${c.caveats.join(" ")}${c.coveredByPool ? " Shared tactical pool, no individual allocation." : ""}`);
out.push(`
## Accounts, role power and presence

Tier, priority and power are analyst judgement, not legal delegation. Power bars use 0–5 and can be edited in the app. ADB's budget role is distinct from DCOAS CD&S. Aggregated account profiles do not mean each role has all the powers shown. Buyer chains are proposed role mappings, to be confirmed for each programme. Titles are used instead of current people.

| Account | Tier | Mission | Technical | Budget | Integration | Presence hypothesis / ecosystem |
| --- | ---: | ---: | ---: | ---: | ---: | --- |`);
for (const a of accounts)
  out.push(
    `| ${a.name} | ${a.tier} | ${a.power.join(" | ")} | ${a.location} |`,
  );
for (const a of accounts)
  out.push(`
### ${a.name}

- Platform target: ${a.platforms}.
- Product-fit hypothesis: ${a.products.join(" / ")}.
- Target titles: ${a.roles.join("; ")}.
- Proposed move: ${a.nextMove}
- Constraint: ${a.constraint}${a.chain ? "\n" + a.chain.map((r) => `- Role: ${r.title}. Control mapping: ${r.controls}. Ask: ${r.ask}. Stage: ${r.stage}. Model powers (mission / technical / budget / integration): ${r.power.join(" / ")}.`).join("\n") : ""}`);
out.push(`
## Location, operating-model and roadmap assumptions

Delhi government capture, Bengaluru engineering / simulation / customer success and Hyderabad / JSW manufacturing / training / MRO are a proposed operating structure, not confirmation of staffed offices. Mumbai / Kattupalli, Visakhapatnam, Kolkata, Kochi and Pune / Talegaon are engagement clusters; they are not geographical TAM. Specific role locations and programme access need current qualification. Kalyani and Sagar remain diligence leads without opportunity cells or pricing.

All roadmap swimlanes, cadence frequencies, ownership allocations, HQ decision rights, pilot gates, objectives and hiring implications are proposed scaffolds. No internal bookings, pipeline, headcount, cash, commitments, production or delivery data is supplied. No target count or date should be interpreted as approved.

## Policy interpretation

The app uses DAP-2020 as of 5 September 2026 based on the February 2026 draft notice and the official policy register checked. The sources establish draft status and the listed DAP-2020 baseline; absence of a later amendment is an audit limitation, not a legal certification. AoN thresholds come from PIB's capital process statement. DPM-2025 revenue procurement and June 2026 delegation are kept separate; no exact new sub-threshold is invented. DSA/SBS-III does not automatically inherit the standard service acquisition chain.

## Storage and reproducibility

Scenario and priority edits are shared across routes during the session. Account filters and selected cells use URL query parameters; financial edits are not encoded in shared URLs and reset on reload. Power-slider edits currently reset when their account view is reopened. Static qualitative judgements and all seeded defaults are editable in typed source data. Recreate this document after changing defaults with \`npx tsx scripts/write-assumptions.ts\`.
`);
writeFileSync("ASSUMPTIONS.md", out.join("\n") + "\n");
