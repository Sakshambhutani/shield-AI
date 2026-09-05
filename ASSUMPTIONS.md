# Assumptions — Shield AI India strategy

As of **5 September 2026**. Independent public-source analysis. These assumptions are not procurement advice, orders, forecasts, disclosed pricing or Shield AI guidance.

## Facts are stored separately

Source metadata and exact supported claims live in `src/strategy/sources.ts`; each opportunity has claim-level citations. The source registry distinguishes GOI, Shield AI, Indian OEM and reported sources, and records verification limits. Phase 1's existing sources are merged into that registry. See `research/PHASE2_SOURCE_AUDIT.md` for the new audit. A platform announcement does not establish that a third-party software layer is open.

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
| --- | --- | ---: | ---: | ---: |
| V-BAT · end-customer programme: System-package ASP | ₹ Cr | 20 | 30 | 40 |
| V-BAT · end-customer programme: Army additional packages | packages | 16 | 24 | 40 |
| V-BAT · end-customer programme: Navy packages | packages | 6 | 12 | 20 |
| V-BAT · end-customer programme: ICG packages | packages | 4 | 8 | 12 |
| V-BAT · end-customer programme: Army win probability | % | 45 | 60 | 75 |
| V-BAT · end-customer programme: Navy win probability | % | 20 | 35 | 40 |
| V-BAT · end-customer programme: ICG win probability | % | 20 | 30 | 40 |
| Tactical UAS · shared attach pool: Reported pool convention | ₹ Cr | 20000 | 20000 | 20000 |
| Tactical UAS · shared attach pool: Non-VBAT share | % | 90 | 80 | 70 |
| Tactical UAS · shared attach pool: Mission-autonomy attach | % | 2 | 4 | 6 |
| Tactical UAS · shared attach pool: Win probability | % | 10 | 20 | 30 |
| 87-MALE · two distinct layers: Reported programme value | ₹ Cr | 20000 | 20000 | 20000 |
| 87-MALE · two distinct layers: Hivemind attach | % | 3 | 5 | 8 |
| 87-MALE · two distinct layers: Hivemind win probability | % | 5 | 10 | 20 |
| 87-MALE · two distinct layers: Vision attach | % | 2 | 3 | 5 |
| 87-MALE · two distinct layers: Vision win probability | % | 5 | 10 | 15 |
| 87-MALE · two distinct layers: Potential tactical overlap deduction | % | 0 | 0 | 0 |
| SBS-III · strategic only: Reported programme value | ₹ Cr | 26968 | 26968 | 26968 |
| SBS-III · strategic only: Autonomy attach | % | 0.5 | 1.5 | 3 |
| SBS-III · strategic only: Win probability | % | 5 | 10 | 15 |

### Reconciliation of omitted V-BAT probabilities

The brief specifies base V-BAT win probabilities but omits conservative and upside probabilities while providing target totals. **45%/20%/20% conservative and 75%/40%/40% upside** (Army/Navy/ICG) are explicit analyst choices to reproduce those approximate totals. They are not uniquely implied by the brief and are not evidence-based forecasts.

| Scenario | Gross | Capture-weighted |
| --- | ---: | ---: |
| Conservative | ₹2,014.84 Cr | ₹276.742 Cr |
| Base | ₹3,964.52 Cr | ₹958.452 Cr |
| Upside | ₹7,129.04 Cr | ₹2,555.356 Cr |

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
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| 01 | Army V-BAT expansion | 5 | 5 | 5 | 5 | 4 | 4 | 96 | 0-18m | existing JSW route |
| 02 | Naval Shipborne UAS | 5 | 4 | 5 | 4 | 4 | 4 | 89 | 18-36m | existing JSW route |
| 03 | Coast Guard OPV maritime ISR | 4 | 3 | 4 | 3 | 3 | 2 | 67 | 18-36m | existing JSW route |
| 04 | Army sovereign autonomy lab | 5 | 5 | 5 | 5 | 4 | 4 | 96 | 0-18m | B2G direct |
| 05 | HAL CATS Warrior | 5 | 4 | 5 | 3 | 4 | 3 | 84 | 18-36m | B2B OEM attach |
| 06 | HAL CATS Infinity / HAPS | 5 | 4 | 5 | 3 | 4 | 3 | 84 | 18-36m | B2B OEM attach |
| 07 | NewSpace heterogeneous UAV / swarms | 5 | 5 | 5 | 3 | 4 | 3 | 88 | 0-18m | B2B OEM attach |
| 08 | TASL Rakshak / Sky-I | 4 | 4 | 5 | 2 | 3 | 3 | 74 | 18-36m | B2B OEM attach |
| 09 | TASL Advanced Loitering Systems | 4 | 3 | 5 | 2 | 3 | 3 | 70 | 18-36m | B2B OEM attach |
| 10 | BEL unmanned system family | 5 | 4 | 5 | 3 | 3 | 3 | 82 | 18-36m | B2B OEM attach |
| 11 | BEL / Army counter-UAS | 4 | 4 | 4 | 2 | 3 | 3 | 70 | 18-36m | B2B OEM attach |
| 12 | GRSE Swadheen / ASV MCM | 5 | 4 | 5 | 3 | 4 | 3 | 84 | 18-36m | B2B OEM attach |
| 13 | GRSE / partner AUV | 5 | 3 | 5 | 2 | 4 | 3 | 77 | 18-36m | B2B OEM attach |
| 14 | MDL swarm AUV / autonomous tug | 4 | 3 | 5 | 2 | 3 | 2 | 68 | 18-36m | B2B OEM attach |
| 15 | BDL / DRDO collaborative weapon autonomy | 4 | 3 | 5 | 2 | 3 | 3 | 70 | 18-36m | B2B OEM attach |
| 16 | Jet-based kamikaze drone autonomy | 4 | 4 | 4 | 2 | 2 | 3 | 68 | 18-36m | pilot-to-program |
| 17 | 87-MALE mission-autonomy layer | 4 | 3 | 4 | 1 | 1 | 3 | 59 | 18-36m | B2B OEM attach |
| 18 | 87-MALE perception layer | 4 | 3 | 4 | 1 | 2 | 3 | 61 | 18-36m | B2B OEM attach |
| 19 | SBS-III constellation autonomy | 4 | 1 | 4 | 1 | 2 | 2 | 51 | 3-5y | consortium |
| 20 | IAF autonomy / simulator / T&E environment | 5 | 4 | 4 | 2 | 4 | 2 | 75 | 0-18m | B2B OEM attach |
| 21 | IAF pilot / simulator debrief | 4 | 4 | 4 | 2 | 4 | 2 | 70 | 0-18m | pilot-to-program |
| 22 | Future Indian autonomous combat airpower | 4 | 1 | 3 | 1 | 2 | 1 | 45 | strategic | B2B OEM attach |
| 23 | Naval aviation mission rehearsal | 4 | 4 | 4 | 2 | 4 | 2 | 70 | 0-18m | pilot-to-program |
| 24 | NSTL underwater autonomy validation | 4 | 3 | 5 | 2 | 3 | 2 | 68 | 18-36m | pilot-to-program |

### 01 — Army V-BAT expansion

- Product/mission hypothesis: V-BAT; Formation-level tactical ISR.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Agree delivery readiness, local supply-chain milestones and a joint service expansion plan.
- Qualification: Local manufacturing, licensing and partner economics are not public. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 02 — Naval Shipborne UAS

- Product/mission hypothesis: V-BAT + Vision / ViDAR; Shipborne ISR / maritime domain awareness.
- Proposed buyer / technical route: Indian Navy; VCNS / ACNS (Air) + NIIO / TDAC; SPB / DPB / DAC + Service HQ / MoD.
- First move: Agree delivery readiness, local supply-chain milestones and a joint service expansion plan.
- Qualification: Local manufacturing, licensing and partner economics are not public. Demonstrations fit 0–18 months; the full package model is assigned to a three-year planning window. NSUAS scale is not added a second time. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 03 — Coast Guard OPV maritime ISR

- Product/mission hypothesis: V-BAT + Vision / ViDAR; Maritime-security ISR on patrol vessels.
- Proposed buyer / technical route: Indian Coast Guard; HQ aviation / technical authority; SPB / DPB / DAC + Service HQ / MoD.
- First move: Agree delivery readiness, local supply-chain milestones and a joint service expansion plan.
- Qualification: Local manufacturing, licensing and partner economics are not public. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 04 — Army sovereign autonomy lab

- Product/mission hypothesis: Hivemind Enterprise; Sovereign mission-autonomy development.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Deliver the current V-BAT programme well; convene ADB and selected partners around a sovereign Hivemind developer environment.
- Qualification: Current selection does not disclose expansion quantities or contract economics. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 05 — HAL CATS Warrior

- Product/mission hypothesis: Hivemind Enterprise + Hivemind Solutions + Aechelon; Collaborative autonomous airpower.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Secure a CATS/HAPS architecture workshop. Use MHI proof to propose a 60–90-day Enterprise integration on an available test vehicle.
- Qualification: Indigenous architecture ownership is essential; incumbent mission-autonomy selection is not established. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 06 — HAL CATS Infinity / HAPS

- Product/mission hypothesis: Hivemind Enterprise + Aechelon; Persistent military ISR and autonomy verification.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Secure a CATS/HAPS architecture workshop. Use MHI proof to propose a 60–90-day Enterprise integration on an available test vehicle.
- Qualification: Indigenous architecture ownership is essential; incumbent mission-autonomy selection is not established. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 07 — NewSpace heterogeneous UAV / swarms

- Product/mission hypothesis: Hivemind Solutions + Hivemind Enterprise; Heterogeneous teaming and dynamic retasking.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Propose a Catalyst-style trial for heterogeneous teaming and dynamic retasking on one platform family.
- Qualification: Own autonomy IP; willingness to adopt external tooling and current legacy product-family availability are unconfirmed. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 08 — TASL Rakshak / Sky-I

- Product/mission hypothesis: Hivemind Enterprise + Hivemind Solutions + Vision / ViDAR; Mission autonomy above autopilot and route following.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Scope contested-environment mission autonomy and teaming above the existing autopilot; agree a measurable integration trial.
- Qualification: Own autopilot, GCS and mission software. Incremental value must exceed existing autonomy. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 09 — TASL Advanced Loitering Systems

- Product/mission hypothesis: Hivemind Solutions; Collaborative mission behaviours on military platforms.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Scope contested-environment mission autonomy and teaming above the existing autopilot; agree a measurable integration trial.
- Qualification: Own autopilot, GCS and mission software. Incremental value must exceed existing autonomy. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 10 — BEL unmanned system family

- Product/mission hypothesis: Hivemind Enterprise + Vision / ViDAR; Third-party autonomy and perception modules.
- Proposed buyer / technical route: DRDO / defence R&D; ADE / CABS / NSTL + certification authority; Lab / DRDO + service financial chain.
- First move: Run a mission-autonomy / Tracker workshop and identify one UAV, USV or counter-UAS demonstrator.
- Qualification: Strong internal capability. The BEL-hosted portfolio confirms a partner ecosystem; verify the current architecture and partnership remit. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 11 — BEL / Army counter-UAS

- Product/mission hypothesis: Tracker C-UAS; Perception integration for counter-UAS systems.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Run a mission-autonomy / Tracker workshop and identify one UAV, USV or counter-UAS demonstrator.
- Qualification: Strong internal capability. The BEL-hosted portfolio confirms a partner ecosystem; verify the current architecture and partnership remit. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 12 — GRSE Swadheen / ASV MCM

- Product/mission hypothesis: Hivemind Solutions + Aechelon; Autonomous maritime ISR / MCM support.
- Proposed buyer / technical route: Indian Navy; VCNS / ACNS (Air) + NIIO / TDAC; SPB / DPB / DAC + Service HQ / MoD.
- First move: Propose one USV ISR or ASW-support demonstrator, using Thunder Tiger as capability proof before multi-asset teaming.
- Qualification: A platform signal does not establish an open autonomy architecture or Shield selection. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 13 — GRSE / partner AUV

- Product/mission hypothesis: Hivemind Solutions + Aechelon; Underwater mission autonomy and validation.
- Proposed buyer / technical route: Indian Navy; VCNS / ACNS (Air) + NIIO / TDAC; SPB / DPB / DAC + Service HQ / MoD.
- First move: Propose one USV ISR or ASW-support demonstrator, using Thunder Tiger as capability proof before multi-asset teaming.
- Qualification: A platform signal does not establish an open autonomy architecture or Shield selection. Surface-vessel teaming is an adjacent capability analogue, not proof of underwater deployment. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 14 — MDL swarm AUV / autonomous tug

- Product/mission hypothesis: Hivemind Solutions + Aechelon; Underwater autonomy / mission simulation.
- Proposed buyer / technical route: Indian Navy; VCNS / ACNS (Air) + NIIO / TDAC; SPB / DPB / DAC + Service HQ / MoD.
- First move: Confirm one active underwater autonomy programme and its simulation / mission-software integration gap.
- Qualification: R&D disclosure is not a funded software procurement; verify programme and design opening. Maritime surface proof does not establish underwater capability. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 15 — BDL / DRDO collaborative weapon autonomy

- Product/mission hypothesis: Hivemind Solutions + Vision / ViDAR; Collaborative mission behaviours under Indian design authority.
- Proposed buyer / technical route: DRDO / defence R&D; ADE / CABS / NSTL + certification authority; Lab / DRDO + service financial chain.
- First move: Define a collaborative mission-behaviour evaluation with BDL, DRDO and the user; clarify design rights before integration.
- Qualification: DRDO and service gates govern weapons integration; no assumption of terminal seeker or guidance-IP control. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 16 — Jet-based kamikaze drone autonomy

- Product/mission hypothesis: Hivemind Solutions; Mission-autonomy software on an Indian-owned platform.
- Proposed buyer / technical route: Indian Army; DCOAS (CD&S) + ADB; SPB / DPB / DAC + Service HQ / MoD.
- First move: Deliver the current V-BAT programme well; convene ADB and selected partners around a sovereign Hivemind developer environment.
- Qualification: Current selection does not disclose expansion quantities or contract economics. Prime / design authority TBD. No terminal guidance design or autonomy architecture assumed. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity. Shared tactical pool, no individual allocation.

### 17 — 87-MALE mission-autonomy layer

- Product/mission hypothesis: Hivemind Solutions + Hivemind Enterprise; Standalone mission software in a potentially closed architecture.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Target an open architecture outside incumbent-controlled MALE and MCM work; validate sensor or simulation interfaces.
- Qualification: GA-ASI MALE and Exail MCM partnerships constrain entry; an open future programme needs separate qualification. L&T / GA-ASI and Adani / Elbit incumbent architectures lower openness. ₹20,000 Cr is the early report; later estimates differ. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 18 — 87-MALE perception layer

- Product/mission hypothesis: Vision / ViDAR; Wide-area autonomous maritime / ISR detection.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Ask about open perception interfaces or future indigenous systems; qualify the architecture before pursuing an autonomy replacement.
- Qualification: Drishti has an Elbit-derived technology architecture; low openness unless the user requires a separate software layer. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 19 — SBS-III constellation autonomy

- Product/mission hypothesis: Hivemind Enterprise + Hivemind Solutions + Aechelon; Military constellation tasking and spacecraft resource management.
- Proposed buyer / technical route: DSA / HQ IDS / NSCS; Programme / satellite technical authority; Programme sanction / financial authority · confirm.
- First move: Use NOVI to discuss constellation tasking and health constraints; establish whether a third-party autonomy layer is permitted.
- Qualification: Reported programme structure; third-party software architecture and procurement access are unknown. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 20 — IAF autonomy / simulator / T&E environment

- Product/mission hypothesis: Aechelon + Hivemind Enterprise; Synthetic testing before platform-scale autonomy procurement.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Secure a CATS/HAPS architecture workshop. Use MHI proof to propose a 60–90-day Enterprise integration on an available test vehicle.
- Qualification: Indigenous architecture ownership is essential; incumbent mission-autonomy selection is not established. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 21 — IAF pilot / simulator debrief

- Product/mission hypothesis: Benchmark; Post-flight evaluation and pilot readiness analytics.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Propose a Hivemind Enterprise / Aechelon evaluation workflow with ASTE, DRDO and HAL before fleet-scale procurement.
- Qualification: Test, training and requirement organisations have different remits. No disclosed Indian CCA software budget. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 22 — Future Indian autonomous combat airpower

- Product/mission hypothesis: X-BAT + Hivemind Solutions; Long-term autonomous combat airpower concepts.
- Proposed buyer / technical route: Indian Air Force; DCAS + ASTE / relevant technical branch; SPB / DPB / DAC + Service HQ / MoD.
- First move: Secure a CATS/HAPS architecture workshop. Use MHI proof to propose a 60–90-day Enterprise integration on an available test vehicle.
- Qualification: Indigenous architecture ownership is essential; incumbent mission-autonomy selection is not established. Relationship / concept shaping only. Excluded from all priced totals and 18-month planning values. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 23 — Naval aviation mission rehearsal

- Product/mission hypothesis: Aechelon + Benchmark; Mission rehearsal, sensor simulation and debrief.
- Proposed buyer / technical route: Indian Navy; VCNS / ACNS (Air) + NIIO / TDAC; SPB / DPB / DAC + Service HQ / MoD.
- First move: Tie a V-BAT/ViDAR shipboard demonstration to NSUAS CONOPS; run a parallel NIIO/TDAC maritime autonomy workshop.
- Qualification: AoN is an in-principle approval. Individual values and vendor selection are not disclosed. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

### 24 — NSTL underwater autonomy validation

- Product/mission hypothesis: Hivemind Enterprise + Aechelon; Cooperative AUV control development and synthetic verification.
- Proposed buyer / technical route: DRDO / defence R&D; ADE / CABS / NSTL + certification authority; Lab / DRDO + service financial chain.
- First move: Frame Enterprise as a sovereign development and validation accelerator; identify a lab-owned test platform.
- Qualification: Indian R&D retains programme ownership; airworthiness is a separate gate. Exact programme access requires diligence. Surface-vessel autonomy demonstration is not underwater capability proof. Product fit, access, priority and next move are analyst judgement; evidence of a platform is not evidence of an open Shield sales opportunity.

## Accounts, role power and presence

Tier, priority and power are analyst judgement, not legal delegation. Power bars use 0–5 and can be edited in the app. ADB's budget role is distinct from DCOAS CD&S. Aggregated account profiles do not mean each role has all the powers shown. Buyer chains are proposed role mappings, to be confirmed for each programme. Titles are used instead of current people.

| Account | Tier | Mission | Technical | Budget | Integration | Presence hypothesis / ecosystem |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Indian Army | 0 | 5 | 4 | 4 | 3 | New Delhi · field commands |
| Indian Navy | 1 | 5 | 4 | 4 | 3 | New Delhi · Mumbai · Visakhapatnam · Kochi |
| Indian Air Force | 1 | 5 | 5 | 4 | 3 | New Delhi · Bengaluru |
| Indian Coast Guard | 2 | 5 | 4 | 3 | 2 | New Delhi · maritime regions |
| DRDO / defence R&D | 1 | 3 | 5 | 2 | 4 | New Delhi · Bengaluru · Visakhapatnam |
| DSA / HQ IDS / NSCS | 3 | 4 | 4 | 3 | 2 | New Delhi · military space ecosystem |
| JSW Defence | 0 | 3 | 4 | 2 | 5 | Hyderabad · India programme route |
| HAL | 1 | 4 | 5 | 2 | 5 | Bengaluru · New Delhi |
| BEL | 1 | 3 | 5 | 2 | 5 | Bengaluru |
| NewSpace Research & Technologies | 1 | 4 | 5 | 1 | 5 | Bengaluru |
| GRSE | 1 | 4 | 5 | 2 | 5 | Kolkata |
| Tata Advanced Systems | 1 | 4 | 5 | 2 | 5 | Hyderabad · New Delhi |
| BDL | 1 | 3 | 4 | 2 | 4 | Hyderabad · Visakhapatnam |
| Adani Defence & Aerospace | 2 | 3 | 4 | 2 | 4 | Hyderabad · Kanpur · Gwalior |
| L&T Precision Engineering & Systems | 2 | 4 | 5 | 2 | 5 | Mumbai · Bengaluru · Talegaon · Kattupalli |
| Mazagon Dock Shipbuilders | 2 | 3 | 5 | 2 | 5 | Mumbai |
| Kalyani / Bharat Forge | 2 | 3 | 4 | 1 | 4 | Pune · Talegaon ecosystem |
| Sagar Defence Engineering | 2 | 3 | 4 | 1 | 4 | Maritime systems ecosystem · location to verify |

### Indian Army

- Platform target: V-BAT; formation ISR; indigenous unmanned platforms.
- Product-fit hypothesis: V-BAT / Hivemind Enterprise / Vision / ViDAR.
- Target titles: DCOAS (CD&S); Army Design Bureau; Army Aviation / ISR / Artillery directorates.
- Proposed move: Deliver the current V-BAT programme well; convene ADB and selected partners around a sovereign Hivemind developer environment.
- Constraint: Current selection does not disclose expansion quantities or contract economics.
- Role: Field command / operational directorate. Control mapping: Mission need and field validation. Ask: A mission sponsor and agreed CONOPS. Stage: Problem definition → field trials. Model powers (mission / technical / budget / integration): 5 / 3 / 2.5 / 2.
- Role: DCOAS (CD&S) + ADB. Control mapping: Capability planning; ADB industry facilitation. Ask: Requirements workshop and trial vehicle. Stage: Requirement → technical evaluation. Model powers (mission / technical / budget / integration): 4 / 4 / 4 / 3.
- Role: SPB / DPB / DAC + Service HQ / MoD. Control mapping: AoN, commercial process and delegated contract approvals. Ask: Funded requirement and viable acquisition category. Stage: AoN → RFP → negotiation → contract. Model powers (mission / technical / budget / integration): 2 / 2 / 5 / 2.
- Role: Indian prime / design authority. Control mapping: Architecture, interfaces and subcontract selection. Ask: An open integration interface and a named engineering owner. Stage: Architecture → integration → acceptance. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### Indian Navy

- Platform target: NSUAS; autonomous surface craft; submersible vessels.
- Product-fit hypothesis: V-BAT / Vision / ViDAR / Hivemind Solutions / Aechelon / Benchmark.
- Target titles: VCNS / DCNS; ACNS (Air); NIIO / TDAC; Chief of Materiel.
- Proposed move: Tie a V-BAT/ViDAR shipboard demonstration to NSUAS CONOPS; run a parallel NIIO/TDAC maritime autonomy workshop.
- Constraint: AoN is an in-principle approval. Individual values and vendor selection are not disclosed.
- Role: Commands + naval warfare / aviation user. Control mapping: Maritime CONOPS and operational trials. Ask: Ship access and a defined ISR mission. Stage: User need → sea trials. Model powers (mission / technical / budget / integration): 5 / 3 / 2 / 2.
- Role: VCNS / ACNS (Air) + NIIO / TDAC. Control mapping: Capability / aviation integration; innovation entry. Ask: A trial sponsor and integration requirements. Stage: Requirement → prototype → technical trials. Model powers (mission / technical / budget / integration): 4 / 4 / 3 / 4.
- Role: SPB / DPB / DAC + Service HQ / MoD. Control mapping: AoN, commercial process and delegated contract approvals. Ask: Funded requirement and viable acquisition category. Stage: AoN → RFP → negotiation → contract. Model powers (mission / technical / budget / integration): 2 / 2 / 5 / 2.
- Role: Indian prime / design authority. Control mapping: Architecture, interfaces and subcontract selection. Ask: An open integration interface and a named engineering owner. Stage: Architecture → integration → acceptance. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### Indian Air Force

- Platform target: HAPS; MALE; unmanned teaming; training / T&E.
- Product-fit hypothesis: Hivemind Enterprise / Aechelon / Benchmark / X-BAT.
- Target titles: DCAS; ASTE; Training Command.
- Proposed move: Propose a Hivemind Enterprise / Aechelon evaluation workflow with ASTE, DRDO and HAL before fleet-scale procurement.
- Constraint: Test, training and requirement organisations have different remits. No disclosed Indian CCA software budget.
- Role: Air operations / Training Command. Control mapping: Operational need or pilot readiness. Ask: A use case and baseline performance metrics. Stage: Need → training pilot. Model powers (mission / technical / budget / integration): 5 / 3 / 2 / 2.
- Role: DCAS + ASTE / relevant technical branch. Control mapping: Capability requirements and flight-test evaluation. Ask: A test plan and technical acceptance criteria. Stage: Requirements → T&E. Model powers (mission / technical / budget / integration): 4 / 5 / 3 / 3.
- Role: SPB / DPB / DAC + Service HQ / MoD. Control mapping: AoN, commercial process and delegated contract approvals. Ask: Funded requirement and viable acquisition category. Stage: AoN → RFP → negotiation → contract. Model powers (mission / technical / budget / integration): 2 / 2 / 5 / 2.
- Role: Indian prime / design authority. Control mapping: Architecture, interfaces and subcontract selection. Ask: An open integration interface and a named engineering owner. Stage: Architecture → integration → acceptance. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### Indian Coast Guard

- Platform target: OPV / patrol-vessel maritime ISR.
- Product-fit hypothesis: V-BAT / Vision / ViDAR / Aechelon / Benchmark.
- Target titles: Operations directorate; Aviation authorities; Regional commanders.
- Proposed move: Secure a patrol-vessel ISR pilot sponsor and test deck operations plus automated detection.
- Constraint: Defence / maritime-security adjacency; no disclosed V-BAT selection.
- Role: Regional command / vessel user. Control mapping: Patrol ISR problem. Ask: A pilot vessel and mission baseline. Stage: CONOPS → demonstration. Model powers (mission / technical / budget / integration): 5 / 3 / 2 / 2.
- Role: HQ aviation / technical authority. Control mapping: Flight and ship integration approval. Ask: Defined deck and sensor trial criteria. Stage: Integration → trials. Model powers (mission / technical / budget / integration): 4 / 4 / 2 / 3.
- Role: SPB / DPB / DAC + Service HQ / MoD. Control mapping: AoN, commercial process and delegated contract approvals. Ask: Funded requirement and viable acquisition category. Stage: AoN → RFP → negotiation → contract. Model powers (mission / technical / budget / integration): 2 / 2 / 5 / 2.
- Role: Indian prime / design authority. Control mapping: Architecture, interfaces and subcontract selection. Ask: An open integration interface and a named engineering owner. Stage: Architecture → integration → acceptance. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### DRDO / defence R&D

- Platform target: ADE / CABS unmanned air systems; NSTL underwater autonomy.
- Product-fit hypothesis: Hivemind Enterprise / Aechelon / Vision / ViDAR.
- Target titles: DG Aeronautical Systems; ADE / CABS programme leadership; CEMILAC; NSTL.
- Proposed move: Frame Enterprise as a sovereign development and validation accelerator; identify a lab-owned test platform.
- Constraint: Indian R&D retains programme ownership; airworthiness is a separate gate. Exact programme access requires diligence.
- Role: Service sponsor + lab programme team. Control mapping: Military need and R&D mission. Ask: A service-backed problem statement. Stage: R&D definition. Model powers (mission / technical / budget / integration): 4 / 4 / 2 / 3.
- Role: ADE / CABS / NSTL + certification authority. Control mapping: Design, validation and certification. Ask: Data interfaces and verification criteria. Stage: R&D → certification. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.
- Role: Lab / DRDO + service financial chain. Control mapping: Project and delegated funding. Ask: Identify the actual funding route. Stage: Sanction → contract. Model powers (mission / technical / budget / integration): 2 / 3 / 4 / 2.
- Role: Indian prime / design authority. Control mapping: Architecture, interfaces and subcontract selection. Ask: An open integration interface and a named engineering owner. Stage: Architecture → integration → acceptance. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### DSA / HQ IDS / NSCS

- Platform target: SBS-III surveillance constellation.
- Product-fit hypothesis: Hivemind Enterprise / Hivemind Solutions / Aechelon.
- Target titles: DSA capability / mission leadership; HQ IDS; Programme technical authority.
- Proposed move: Use NOVI to discuss constellation tasking and health constraints; establish whether a third-party autonomy layer is permitted.
- Constraint: Reported programme structure; third-party software architecture and procurement access are unknown.
- Role: DSA / IDS mission sponsor. Control mapping: Military surveillance mission. Ask: Validate autonomy need. Stage: Concept shaping. Model powers (mission / technical / budget / integration): 5 / 3 / 2 / 2.
- Role: Programme / satellite technical authority. Control mapping: Flight software and constellation architecture. Ask: Confirm third-party software access. Stage: Architecture review. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.
- Role: Programme sanction / financial authority · confirm. Control mapping: SBS-III programme funding; specific route unverified. Ask: Identify responsible authority; do not infer standard DAP chain. Stage: Programme diligence. Model powers (mission / technical / budget / integration): 2 / 3 / 4 / 2.
- Role: Satellite builder / design authority. Control mapping: Onboard integration and subcontractors. Ask: A qualified interface and test path. Stage: Integration → validation. Model powers (mission / technical / budget / integration): 3 / 5 / 2 / 5.

### JSW Defence

- Platform target: V-BAT manufacturing, training and MRO.
- Product-fit hypothesis: V-BAT / Hivemind Enterprise.
- Target titles: India programme leadership; Manufacturing / supply chain; Training & sustainment.
- Proposed move: Agree delivery readiness, local supply-chain milestones and a joint service expansion plan.
- Constraint: Local manufacturing, licensing and partner economics are not public.

### HAL

- Platform target: CATS Warrior / Alfa / Hunter / Infinity; 5-tonne HALE.
- Product-fit hypothesis: Hivemind Enterprise / Hivemind Solutions / Aechelon / X-BAT.
- Target titles: Platform programme director; Mission & Combat Systems / avionics; Planning & Projects; Corporate Marketing, New Delhi.
- Proposed move: Secure a CATS/HAPS architecture workshop. Use MHI proof to propose a 60–90-day Enterprise integration on an available test vehicle.
- Constraint: Indigenous architecture ownership is essential; incumbent mission-autonomy selection is not established.

### BEL

- Platform target: Unmanned UAV / UGV / UUV / USV family; counter-UAS.
- Product-fit hypothesis: Hivemind Enterprise / Tracker C-UAS / Vision / ViDAR.
- Target titles: Unmanned Systems vertical; R&D / systems engineering; Strategic Planning / Marketing.
- Proposed move: Run a mission-autonomy / Tracker workshop and identify one UAV, USV or counter-UAS demonstrator.
- Constraint: Strong internal capability. The BEL-hosted portfolio confirms a partner ecosystem; verify the current architecture and partnership remit.

### NewSpace Research & Technologies

- Platform target: Heterogeneous UAVs; brief-supplied Beluga / Nimbus / Mackerel family names to confirm.
- Product-fit hypothesis: Hivemind Enterprise / Hivemind Solutions.
- Target titles: Platform programme leadership; Autonomy engineering; Defence business development.
- Proposed move: Propose a Catalyst-style trial for heterogeneous teaming and dynamic retasking on one platform family.
- Constraint: Own autonomy IP; willingness to adopt external tooling and current legacy product-family availability are unconfirmed.

### GRSE

- Platform target: Swadheen USV / ASV MCM; autonomous underwater R&D.
- Product-fit hypothesis: Hivemind Solutions / Aechelon / Vision / ViDAR.
- Target titles: R&D / autonomous systems; Naval programme director; Design authority.
- Proposed move: Propose one USV ISR or ASW-support demonstrator, using Thunder Tiger as capability proof before multi-asset teaming.
- Constraint: A platform signal does not establish an open autonomy architecture or Shield selection.

### Tata Advanced Systems

- Platform target: Sky-I; Rakshak VTOL; Advanced Loitering Systems.
- Product-fit hypothesis: Hivemind Enterprise / Hivemind Solutions / Vision / ViDAR.
- Target titles: Unmanned systems programme director; Mission software / systems engineering; Business development.
- Proposed move: Scope contested-environment mission autonomy and teaming above the existing autopilot; agree a measurable integration trial.
- Constraint: Own autopilot, GCS and mission software. Incremental value must exceed existing autonomy.

### BDL

- Platform target: Missiles / underwater weapons; Jishnu.
- Product-fit hypothesis: Hivemind Solutions / Vision / ViDAR.
- Target titles: Product programme director; R&D / systems engineering; DRDO programme liaison.
- Proposed move: Define a collaborative mission-behaviour evaluation with BDL, DRDO and the user; clarify design rights before integration.
- Constraint: DRDO and service gates govern weapons integration; no assumption of terminal seeker or guidance-IP control.

### Adani Defence & Aerospace

- Platform target: Drishti 10 MALE; other indigenous UAV families.
- Product-fit hypothesis: Hivemind Solutions / Vision / ViDAR.
- Target titles: UAV programme director; Mission systems lead.
- Proposed move: Ask about open perception interfaces or future indigenous systems; qualify the architecture before pursuing an autonomy replacement.
- Constraint: Drishti has an Elbit-derived technology architecture; low openness unless the user requires a separate software layer.

### L&T Precision Engineering & Systems

- Platform target: 87-MALE with GA-ASI; naval / subsea systems.
- Product-fit hypothesis: Hivemind Solutions / Aechelon.
- Target titles: Unmanned systems programme leadership; Naval systems engineering.
- Proposed move: Target an open architecture outside incumbent-controlled MALE and MCM work; validate sensor or simulation interfaces.
- Constraint: GA-ASI MALE and Exail MCM partnerships constrain entry; an open future programme needs separate qualification.

### Mazagon Dock Shipbuilders

- Platform target: AUV / swarm AUV / autonomous tug R&D.
- Product-fit hypothesis: Hivemind Solutions / Aechelon.
- Target titles: R&D leadership; Autonomous systems design authority.
- Proposed move: Confirm one active underwater autonomy programme and its simulation / mission-software integration gap.
- Constraint: R&D disclosure is not a funded software procurement; verify programme and design opening.

### Kalyani / Bharat Forge

- Platform target: Weapons / maritime autonomy · diligence target.
- Product-fit hypothesis: Hivemind Solutions.
- Target titles: Defence systems programme director; R&D / design leadership.
- Proposed move: Qualify an Indian-owned defence platform and programme sponsor before creating an opportunity cell.
- Constraint: Included as a brief-supplied ecosystem lead only. Specific platform ownership and partner rights are unverified.

### Sagar Defence Engineering

- Platform target: Military autonomous surface systems · diligence target.
- Product-fit hypothesis: Hivemind Solutions.
- Target titles: Defence programme leadership; Autonomy integration lead.
- Proposed move: Verify a named active military platform, buyer and integration authority before pursuit.
- Constraint: No active platform or buyer verified in this implementation; excluded from opportunity cells and totals.

## Location, operating-model and roadmap assumptions

Delhi government capture, Bengaluru engineering / simulation / customer success and Hyderabad / JSW manufacturing / training / MRO are a proposed operating structure, not confirmation of staffed offices. Mumbai / Kattupalli, Visakhapatnam, Kolkata, Kochi and Pune / Talegaon are engagement clusters; they are not geographical TAM. Specific role locations and programme access need current qualification. Kalyani and Sagar remain diligence leads without opportunity cells or pricing.

All roadmap swimlanes, cadence frequencies, ownership allocations, HQ decision rights, pilot gates, objectives and hiring implications are proposed scaffolds. No internal bookings, pipeline, headcount, cash, commitments, production or delivery data is supplied. No target count or date should be interpreted as approved.

## Policy interpretation

The app uses DAP-2020 as of 5 September 2026 based on the February 2026 draft notice and the official policy register checked. The sources establish draft status and the listed DAP-2020 baseline; absence of a later amendment is an audit limitation, not a legal certification. AoN thresholds come from PIB's capital process statement. DPM-2025 revenue procurement and June 2026 delegation are kept separate; no exact new sub-threshold is invented. DSA/SBS-III does not automatically inherit the standard service acquisition chain.

## Storage and reproducibility

Scenario and priority edits are shared across routes during the session. Account filters and selected cells use URL query parameters; financial edits are not encoded in shared URLs and reset on reload. Power-slider edits currently reset when their account view is reopened. Static qualitative judgements and all seeded defaults are editable in typed source data. Recreate this document after changing defaults with `npx tsx scripts/write-assumptions.ts`.

