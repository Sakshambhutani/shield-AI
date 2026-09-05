# Public-source audit — 5 September 2026

All 50 prompt URLs were checked with direct HTTP requests; all Shield AI pages were also opened with the research browser, which could read them despite curl returning 403. The local `link-audit.json` records the direct HTTP results, not the browser corroboration. Four supplemental references are included in the app registry. No research downloads are part of the production assets.

## Findings and corrections

| Claim / source | Finding / implementation |
| --- | --- |
| MoD FY2026–27 / PIB 2221612 | Verified ₹7.85 lakh Cr, ₹2.19 lakh Cr capital, ~₹1.85 lakh Cr acquisition, ₹1.39 lakh Cr domestic earmark and ₹29,100.25 Cr DRDO. These are nested annual contexts, not additive markets. The release contains an apparent unit typo in one detailed capital sentence; the headline and rounded allocation are used. |
| SBS-III / Hindustan Times | Verified reported ₹26,968 Cr, 52 satellites and 21 ISRO / 31 private split. No official individual budget line or Shield participation inferred. |
| DRDO SBS clipping | Supplied URL returned 404. Retained with a visible limitation; the accessible Hindustan Times report independently supplies the programme claim. |
| Civil space / PIB 2245313 | Supports ₹13,705.63 Cr total. Supplemental ISRO annual report Budget at a Glance supports ₹10,397.06 Cr Space Technology. Both excluded. |
| MHA / PRS | Verified ₹2,55,234 Cr total, ₹21,272 Cr police capital, ₹1,16,789 Cr CAPF, ₹5,577 Cr border infrastructure and ₹4,061 Cr modernisation. Adjacency only. |
| CAPF / SSB PIB releases | Operational technology / drone / surveillance context checked; no whole-budget addressability asserted. |
| Tactical UAS / Reuters | Direct link restricted (HTTP 401 / browser unavailable). Reuters-byline Business Recorder republication supports >$2B and expected 18–24-month delivery pipeline. ₹19,000 Cr is a user-requested conversion convention, explicitly not the report's exact rupee figure or live FX. |
| DAC March 2026 | Runway Independent Aerial Surveillance appears in the full ₹2.38 lakh Cr bundle. No individual value disclosed. |
| DAC July 2026 | Verified jet kamikaze / Anti-UAV EW, NSUAS and FW-HAPS in the full ₹52,000 Cr bundle. None assigned that total. |
| DAC July / August 2025 | Verified submersible autonomous vessels / compact autonomous surface craft, respectively. Full ₹1.05 lakh Cr / ₹67,000 Cr bundles are context only. |
| Coast Guard / parliamentary report | Detailed table, printed p.44 / PDF page 50: **revenue ₹4,392.85 Cr; capital ₹4,000 Cr; derived total ₹8,392.85 Cr**. Summary on printed p.103 / PDF p.109 reverses labels and rounds revenue. Detailed table used with visible note. |
| February DAC / PIB 2227018 | Supports AS-HAPS and Coast Guard Dornier EO/IR acquisition. Does **not** contain Full Mission Simulator; that signal is sourced to the MoD year-end review PIB 2210154 instead. |
| MALE / India Today + Economic Times | Early ~₹20,000 Cr and later ~₹30,000 Cr reporting retained as a range. Tri-service 87-aircraft programme appears once in the model. |
| Indian Army / Shield AI | January 28, 2026 selection and SDK sovereign / select-partner licensing verified. No undisclosed contract amount invented. |
| India engineering office / Shield AI | New Delhi operational; Bengaluru described as planned. Page date April 29, dateline April 30. No assertion Bengaluru has opened. |
| Netherlands / Shield AI | V-BAT declared operational. Source says 12 **being acquired**, eight vessels **will be equipped**; wording preserves these stages rather than claiming all deliveries / installations completed. |
| Frontex / Shield AI | 150 flight hours over 19 days verified. Classified as border / coast security precedent only. |
| Hivemind / Shield AI | Solutions / Enterprise distinction and sovereign SDK route verified. Singapore, ST Engineering, MHI, KAI, USAF CCA, Thunder Tiger, HII, RTX, LUCAS, Destinus and DiSCO sources opened and checked. Partnership / demonstration / production-contract distinctions retained. |
| NOVI / Sedaro / Shield AI | August 24, 2026 on-orbit Hivemind demonstration verified. It is capability proof, not an international military customer or SBS-III participation claim. Aechelon not credited with Sedaro's simulator. |
| Vision / Shield AI | Product page and NAVAIR deliveries / September 1, 2026 VAMPIRE licence sources checked. Sentient announcement supports allied-market acquisition strategy. |
| Aechelon / Shield AI | Current product page supports >1,200 operational training systems and simulation programmes across U.S., NATO and allies. Separate simulation layer retained. September 2, 2026 blog checked. |
| Benchmark / Shield AI | Product page and Hivemind page support post-flight scoring and U.S. Air Force platform heritage including T-6, T-38, F-15E and F-16. |
| X-BAT / Shield AI | First VTOL flight scheduled 2026, mission capability 2028, production 2029: roadmap targets, not achieved milestones. Excluded from model and short-term revenue. |
| IMTAR-21 | Original PDF 404. Official DRDO document page links a current compressed PDF. Table 21.B2.1 supports <25 / 25–150 / >150 kg and weaponised any weight. Adjacent prose says “up to 25”; table convention used and discrepancy noted. U.S. crosswalk is approximate. |

## Audit limits

A 200 response alone does not prove claim accuracy. Direct curl 403 on Shield AI is access control, not evidence the pages are missing: research-browser retrieval succeeded. The two legacy 404 links are preserved because the brief explicitly asks for literal supplied URLs. Their replacement/corroborating references are displayed where applicable. No guarantee is made that all external publishers remain accessible in every browser or region.

Validation checks source references, parent levels, default visibility, combined filters, every product's proof path, executive tags, calculator arithmetic, the three-programme-only allowlist, absence of annual budgets / X-BAT / MHA / civil-space entries in the model, and absence of application runtime fetch APIs. Production build and a successful local HTTP response were checked. A follow-up browser interaction check verified that a single MoD card click expands all four service children and opens the evidence drawer. The domestic-earmark control was verified to select ₹1.39 lakh Cr and a 17.71% proportional bar. No broad visual regression suite was run.
