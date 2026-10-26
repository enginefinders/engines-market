# Static content page inventory

Audit date: 2026-10-25

## Scope and accounting

This audit covers every HTML content document found in the project’s two content locations:

- `public/**/*.html`: 131 independent static HTML documents.
- `content/hub-pages/*.html`: 10 HTML hub documents loaded by the App Router’s `HubPage`.

Total inventoried: **141 static content pages**. All 141 are assigned to a group; unresolved: **0**.

The route is taken from the page’s canonical link when one exists. For the 21 documents without a canonical link (20 case studies and `get-a-quote.html`), the route is derived from the public file path and is marked in the special-requirements column.

This inventory intentionally does not expand data-generated route instances into one row per URL. Those pages use shared dynamic route source files and data records rather than independent static HTML documents. The relevant route families are listed under [non-inventory route families](#non-inventory-route-families).

### Routing and shell findings

- The project uses the **Next.js App Router only**: route files are under `app/`; there is no `pages/` directory.
- `app/layout.tsx` supplies the React application shell: `Navbar`, `Footer`, global styles, and `QuoteCheckoutModal`.
- The 10 `content/hub-pages/*.html` files are read by `lib/hubPageContent.ts`, page-specific CSS is scoped, and the HTML is inserted by `components/pages/HubPage.tsx`.
- The 131 `public` documents carry their own HTML and mostly inline CSS. Their static navigation is supplied through `static-nav.css`/`static-nav.js` references or equivalent embedded markup; they are not React page components.
- The React theme is primarily Urbanist with navy/blue/green tokens, white cards, rounded controls and a dark navy shell. The static HTML families commonly use Barlow Condensed or Inter plus IBM Plex Mono, with related navy/green tokens but independently authored spacing and component classes.
- Existing static content primitives include hero blocks, cards, tables, callout/warning panels, FAQ `<details>`, comparison grids, timelines, tabbed price panels, forms, CTA sections and image frames. The inventory records which of those each page actually contains.

### Structure notation

`P` = paragraph elements, `H2/H3` = heading counts, `UL/OL` = unordered/ordered list counts, `T` = tables, `I` = images, `Q` = `<details>` FAQ/accordion blocks, `F` = forms, `B` = buttons. Counts are from the main content/body markup, excluding script/style text.

## Group summary

| Group ID | Content/UI family | Pages | Approval representative | Shared visual requirements within the group |
|---|---|---:|---|---|
| HUB-01 | App-rendered directory and category hubs | 10 | `/compare` | Hero, intro, link/card directory, optional table, CTA; must tolerate different directory lengths. |
| CASE-01 | Evidence-led case-study narratives | 20 | `/case-studies/bmw-320d-engine-replacement` | Image-led chronology, diagnostic evidence, comparison/price cards, decision tabs, one FAQ, final CTA. |
| COMP-01 | Side-by-side comparison guides | 13 | `/compare/used-vs-rebuilt-engine` | Comparison hero, multiple decision tables, explanatory sections, lists, CTA/form, optional FAQ set. |
| FAIL-01 | Failure diagnosis and escalation guides | 25 | `/failures/engine-seizure` | Diagnostic hero/form, risk/urgency callouts, cause/symptom lists, repair-cost tables, FAQ and CTA. |
| SYM-01 | Symptom diagnosis guides | 20 | `/symptoms/black-smoke` | Symptom-pattern hero/form, cause/urgency tables, warning/checklist panels, FAQ and CTA. |
| PRICE-01 | Cost and price guides | 15 | `/prices/used-engine-cost` | Data-led hero/form, cost tables, price/decision sections, many FAQ items, CTA. |
| INSIGHT-01 | Market, ranking and statistical reports | 10 | `/insights/uk-engine-market-report-2026` | Data-report hero/form, dense tables/stat blocks, methodology/source notes, FAQ and CTA. |
| SERVICE-01 | Service and product/service explainers | 15 | `/services/engine-fitting` | Service hero/form, process/eligibility sections, structured tables, optional lists/FAQ, CTA. |
| GUIDE-01 | Informational, trust and process guides | 4 | `/about/engine-warranty-guide` | Narrative sections, checklists/lists, policy/process tables, FAQ and CTA. |
| LEGAL-01 | Legal, privacy and compliance documents | 5 | `/legal/terms-and-conditions` | Dense nested clauses, numbered headings, lists/tables, optional FAQ or complaint form; needs long-document navigation. |
| CORP-01 | Corporate, contact, reviews and quote conversion pages | 4 | `/get-a-quote` | Marketing sections, trust proof, contact/quote form, comparison or review content, FAQ and final CTA. |

**Group total: 141 pages.**

## Complete inventory

### HUB-01 — App-rendered directory and category hubs (10)

Source files are loaded by `components/pages/HubPage.tsx`; their content and CSS remain page-specific HTML.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/case-studies` | `content/hub-pages/case-studies.html` | P8, H2×7, H3×23, UL×5, T×3, I×2, B×1; case-study directory with cards/links and table content. | Hub directory density; preserve image/card links and CTA. |
| `/compare` | `content/hub-pages/compare.html` | P23, H2×7, H3×15, UL×5, T×3, I×2, B×1; comparison directory with explanatory copy and structured comparison data. | Representative; optional table block must not force all hubs into the same height. |
| `/failures` | `content/hub-pages/failures.html` | P10, H2×7, H3×7, UL×5, T×3, I×2, B×1; failure-category directory with cost/diagnosis content. | Warning/risk emphasis and link-heavy card layout. |
| `/guides` | `content/hub-pages/guides.html` | P24, H2×8, H3×11, UL×5, I×2, B×1; guide directory with explanatory cards and links. | No tables; more text/card density than data hubs. |
| `/insights` | `content/hub-pages/insights.html` | P27, H2×7, H3×15, UL×5, T×3, I×2, B×1; insight/report directory with data-oriented cards. | Report-card hierarchy and table preview. |
| `/legal` | `content/hub-pages/legal.html` | P22, H2×7, H3×15, UL×5, I×2, B×1; legal/resource directory with policy links. | Trust-oriented presentation; no tables. |
| `/locations` | `content/hub-pages/locations.html` | P10, H2×9, H3×1, UL×5, T×2, I×2, B×1; location/service coverage directory. | Location cards and tabular coverage content. |
| `/prices` | `content/hub-pages/prices.html` | P9, H2×7, H3×1, UL×5, T×1, I×2, B×1; price directory with real-data framing. | Data/trust emphasis; concise hub content. |
| `/services` | `content/hub-pages/services.html` | P22, H2×8, H3×13, UL×5, I×2, B×1; service directory with grouped service cards. | Longer card labels and category grouping. |
| `/symptoms` | `content/hub-pages/symptoms.html` | P10, H2×7, H3×7, UL×5, T×2, I×2, B×1; symptom directory with diagnostic navigation. | Symptom categories and urgency language. |

### CASE-01 — Evidence-led case-study narratives (20)

All pages contain a narrative timeline, multiple evidence images, comparison/price panels, a tabbed or button-driven decision section, a parts/evidence table, one FAQ accordion, and a final CTA. None uses UL/OL in the main content; the visual language is driven by sections, cards, articles, image frames and buttons.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/case-studies/audi-a4-timing-chain-failure` | `public/case-studies/audi-a4-timing-chain-failure.html` | P38, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route from file path. Image evidence and preventative-repair decision paths. |
| `/case-studies/audi-a6-oil-consumption` | `public/case-studies/audi-a6-oil-consumption.html` | P43, H2×10, H3×7, T×1, I×9, Q×1, B×5. | No canonical; derive route. Four-option repair/replacement comparison. |
| `/case-studies/bmw-320d-engine-replacement` | `public/case-studies/bmw-320d-engine-replacement.html` | P43, H2×10, H3×7, T×1, I×9, Q×1, B×5. | No canonical; derive route. Representative; four-way decision tabs and multiple diagnostic images. |
| `/case-studies/bmw-n47-timing-chain-failure` | `public/case-studies/bmw-n47-timing-chain-failure.html` | P41, H2×10, H3×6, T×1, I×8, Q×1, B×4. | No canonical; derive route. Fewer evidence images; used/reconditioned/new comparison. |
| `/case-studies/bmw-n57-engine-replacement` | `public/case-studies/bmw-n57-engine-replacement.html` | P40, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Bottom-end damage and debris-risk evidence. |
| `/case-studies/ford-ranger-engine-replacement` | `public/case-studies/ford-ranger-engine-replacement.html` | P42, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Oil-pressure escalation and replacement-path choice. |
| `/case-studies/ford-transit-engine-failure` | `public/case-studies/ford-transit-engine-failure.html` | P40, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Fleet downtime and injector/bore-wash decision. |
| `/case-studies/jaguar-ingenium-timing-chain` | `public/case-studies/jaguar-ingenium-timing-chain.html` | P41, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Chain-repair versus engine decision. |
| `/case-studies/jaguar-xf-engine-replacement` | `public/case-studies/jaguar-xf-engine-replacement.html` | P40, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Multi-fault diagnosis and sunk-cost decision. |
| `/case-studies/land-rover-discovery-crank-failure` | `public/case-studies/land-rover-discovery-crank-failure.html` | P43, H2×10, H3×7, T×1, I×9, Q×1, B×5. | No canonical; derive route. Crank/debris evidence and four replacement choices. |
| `/case-studies/mercedes-om651-timing-chain` | `public/case-studies/mercedes-om651-timing-chain.html` | P41, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Preventative chain-replacement emphasis. |
| `/case-studies/mercedes-sprinter-engine-replacement` | `public/case-studies/mercedes-sprinter-engine-replacement.html` | P42, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Fleet deadline and injector-damage evidence. |
| `/case-studies/nissan-navara-d40-case-study` | `public/case-studies/nissan-navara-d40-case-study.html` | P43, H2×10, H3×6, T×1, I×8, Q×1, B×4. | No canonical; derive route. Route also has a sitemap-specific mapping; verify before UI work. |
| `/case-studies/peugeot-boxer-engine-replacement` | `public/case-studies/peugeot-boxer-engine-replacement.html` | P45, H2×10, H3×8, T×1, I×9, Q×1, B×6. | No canonical; derive route. Five-way choice and motorhome/AdBlue context. |
| `/case-studies/range-rover-evoque-timing-chain` | `public/case-studies/range-rover-evoque-timing-chain.html` | P40, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. MOT advisory-to-failure timeline. |
| `/case-studies/range-rover-sdv6-crankshaft-failure` | `public/case-studies/range-rover-sdv6-crankshaft-failure.html` | P40, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. High-value vehicle economics and turbo debris risk. |
| `/case-studies/toyota-hilux-engine-replacement` | `public/case-studies/toyota-hilux-engine-replacement.html` | P43, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Injector failure, bore damage and rebuild decision. |
| `/case-studies/vauxhall-vivaro-engine-failure` | `public/case-studies/vauxhall-vivaro-engine-failure.html` | P44, H2×10, H3×7, T×1, I×9, Q×1, B×5. | No canonical; derive route. DPF/turbo/seizure chain and four-way choice. |
| `/case-studies/vw-amarok-engine-replacement` | `public/case-studies/vw-amarok-engine-replacement.html` | P39, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Dealer-versus-specialist cost comparison. |
| `/case-studies/vw-transporter-engine-rebuild` | `public/case-studies/vw-transporter-engine-rebuild.html` | P39, H2×10, H3×6, T×1, I×9, Q×1, B×4. | No canonical; derive route. Cylinder-head damage and rebuild decision. |

### COMP-01 — Side-by-side comparison guides (13)

All pages include a comparison hero with a quote form and CTA button, explanatory paragraphs, unordered lists, multiple structured comparison tables, and a closing exploration section. Six pages use no FAQ accordion; seven use 10–12 FAQ details.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/compare/diesel-vs-petrol-running-cost` | `public/compare/diesel-vs-petrol-running-cost.html` | P25, H2×12, H3×4, UL×4, T×3, I×1, Q×10, F×1, B×1. | FAQ-rich; preserve fuel-cost comparison tables. |
| `/compare/local-garage-vs-specialist` | `public/compare/local-garage-vs-specialist.html` | P26, H2×14, H3×13, UL×2, T×13, I×1, Q×10, F×1, B×1. | Table-dense outlier; needs horizontal table handling. |
| `/compare/main-dealer-vs-independent-specialist` | `public/compare/main-dealer-vs-independent-specialist.html` | P24, H2×13, H3×7, UL×6, T×4, I×1, F×1, B×1. | No FAQ block; decision matrix is the primary interaction. |
| `/compare/new-vs-reconditioned-engine` | `public/compare/new-vs-reconditioned-engine.html` | P27, H2×14, H3×13, UL×2, T×12, I×1, Q×10, F×1, B×1. | Table-dense; preserve multi-column cost/feature comparisons. |
| `/compare/rebuild-vs-replacement` | `public/compare/rebuild-vs-replacement.html` | P24, H2×13, H3×6, UL×6, T×4, I×1, F×1, B×1. | No FAQ block; repair decision sections dominate. |
| `/compare/reconditioned-vs-rebuilt-engine` | `public/compare/reconditioned-vs-rebuilt-engine.html` | P31, H2×15, H3×13, UL×2, T×12, I×1, Q×10, F×1, B×1. | Long table-dense representative variant. |
| `/compare/reconditioned-vs-remanufactured-engine` | `public/compare/reconditioned-vs-remanufactured-engine.html` | P25, H2×13, H3×6, UL×6, T×4, I×1, F×1, B×1. | No FAQ block; process/condition comparison. |
| `/compare/repair-vs-reconditioned-engine` | `public/compare/repair-vs-reconditioned-engine.html` | P27, H2×13, H3×3, UL×4, T×4, I×1, Q×10, F×1, B×1. | FAQ-rich; fewer subheadings than other comparison pages. |
| `/compare/repair-vs-replacement` | `public/compare/repair-vs-replacement.html` | P45, H2×13, H3×8, UL×3, T×4, I×1, F×1, B×1. | Long narrative; no FAQ block. |
| `/compare/repairing-vs-scrapping` | `public/compare/repairing-vs-scrapping.html` | P23, H2×12, H3×9, UL×7, T×4, I×1, F×1, B×1. | No FAQ block; requires strong decision/choice panels. |
| `/compare/supply-only-vs-supply-fit` | `public/compare/supply-only-vs-supply-fit.html` | P51, H2×13, H3×9, UL×3, T×5, I×1, F×1, B×1. | Longest comparison narrative; supply/install risk matrix. |
| `/compare/used-vs-rebuilt-engine` | `public/compare/used-vs-rebuilt-engine.html` | P24, H2×15, H3×5, UL×8, T×4, I×1, Q×12, F×1, B×1. | Representative; FAQ-rich and includes multiple risk/price tables. |
| `/compare/used-vs-reconditioned-engine` | `public/compare/used-vs-reconditioned-engine.html` | P24, H2×13, H3×1, UL×8, T×4, I×1, Q×12, F×1, B×1. | FAQ-rich; fewer headings, same decision-table emphasis. |

### FAIL-01 — Failure diagnosis and escalation guides (25)

The family is structurally related but not uniform: all pages use a diagnostic hero/form, lists, FAQ details, CTA controls and risk-oriented sections; table counts range from 0 to 6, and several pages include extra H3-heavy diagnostic subsections or source notes.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/failures/camshaft-failure` | `public/failures/camshaft-failure.html` | P55, H2×10, H3×12, UL×10, T×2, I×1, Q×6, F×4, B×10. | Long diagnostic article; multiple symptom/cause lists. |
| `/failures/coolant-contamination` | `public/failures/coolant-contamination.html` | P51, H2×14, H3×15, UL×5, T×5, I×1, Q×6, F×5, B×12. | Table- and warning-heavy; preserve contamination urgency. |
| `/failures/crankshaft-failure` | `public/failures/crankshaft-failure.html` | P44, H2×13, H3×8, UL×10, T×2, Q×6, F×4, B×10. | No content image; crankshaft damage and escalation tables. |
| `/failures/cylinder-bore-damage` | `public/failures/cylinder-bore-damage.html` | P53, H2×11, H3×24, UL×14, T×2, I×1, Q×7, F×4, B×10. | H3/list-dense outlier; requires scannable nested diagnostic sections. |
| `/failures/dpf-failure` | `public/failures/dpf-failure.html` | P25, H2×7, H3×2, UL×8, Q×6, F×4, B×10. | No main-content table/image; FAQ and diagnostic lists carry the page. |
| `/failures/egr-failure` | `public/failures/egr-failure.html` | P50, H2×8, H3×19, UL×6, T×2, Q×6, F×4, B×10. | H3-heavy; preserve form/CTA controls and EGR diagnostic hierarchy. |
| `/failures/engine-knock` | `public/failures/engine-knock.html` | P29, H2×10, H3×5, UL×8, T×2, Q×6, F×4, B×11. | Includes warning/choice lists and audio-description table. |
| `/failures/engine-management-light` | `public/failures/engine-management-light.html` | P36, H2×10, H3×18, UL×6, T×2, I×1, Q×7, F×4, B×15. | H3-heavy and control-heavy; preserve warning severity states. |
| `/failures/engine-seizure` | `public/failures/engine-seizure.html` | P39, H2×14, H3×7, UL×10, T×4, Q×6, F×5, B×11. | Representative; four diagnostic/cost tables and urgent CTA. |
| `/failures/engine-vibration` | `public/failures/engine-vibration.html` | P25, H2×10, H3×2, UL×9, T×6, Q×6, F×4, B×10. | Table-dense vibration stages and risk-model comparisons. |
| `/failures/excessive-oil-consumption` | `public/failures/excessive-oil-consumption.html` | P30, H2×10, H3×2, UL×3, T×5, Q×6, F×4, B×14. | Multiple CTA controls; cost/risk decision tables. |
| `/failures/excessive-smoke` | `public/failures/excessive-smoke.html` | P20, H2×9, H3×2, UL×1, T×6, Q×7, F×4, B×10. | Table-led smoke-colour classification; no content image. |
| `/failures/fuel-pump-failure` | `public/failures/fuel-pump-failure.html` | P33, H2×11, H3×2, UL×4, T×4, Q×7, F×4, B×14. | Multiple CTA controls; fuel-system decision tables. |
| `/failures/head-gasket-failure` | `public/failures/head-gasket-failure.html` | P34, H2×10, H3×2, UL×7, T×1, Q×6, F×4, B×10. | One primary table; warning and repair/replacement lists. |
| `/failures/injector-failure` | `public/failures/injector-failure.html` | P35, H2×11, H3×2, UL×9, T×1, Q×7, F×4, B×10. | List-heavy injector diagnosis; one cost table. |
| `/failures/low-compression` | `public/failures/low-compression.html` | P34, H2×9, H3×2, UL×3, T×5, Q×7, F×4, B×10. | Table-led compression diagnosis; no content image. |
| `/failures/misfiring-engine` | `public/failures/misfiring-engine.html` | P39, H2×12, H3×3, UL×3, T×6, F×4, B×21. | FAQ content is represented in JSON-LD/source data rather than `<details>`; unusually button-heavy. |
| `/failures/oil-pump-failure` | `public/failures/oil-pump-failure.html` | P38, H2×13, H3×7, UL×7, T×3, F×4, B×20. | FAQ content is primarily structured data; many diagnostic controls. |
| `/failures/overheating-engine` | `public/failures/overheating-engine.html` | P36, H2×11, H3×2, UL×1, T×6, F×4, B×22. | FAQ content is primarily structured data; very control-heavy urgent page. |
| `/failures/piston-failure` | `public/failures/piston-failure.html` | P31, H2×10, H3×2, UL×5, T×4, F×4, B×20. | FAQ content is primarily structured data; repair-versus-replacement focus. |
| `/failures/rod-bearing-failure` | `public/failures/rod-bearing-failure.html` | P31, H2×12, H3×2, UL×6, T×4, Q×6, F×4, B×10. | Cost escalation and stop-driving warnings. |
| `/failures/timing-belt-failure` | `public/failures/timing-belt-failure.html` | P33, H2×11, H3×2, UL×3, T×1, Q×6, F×4, B×10. | One main table; lifecycle/repair decision content. |
| `/failures/timing-chain-failure` | `public/failures/timing-chain-failure.html` | P29, H2×10, H3×2, UL×5, T×1, Q×5, F×4, B×10. | One main table; warning/maintenance progression. |
| `/failures/turbo-failure` | `public/failures/turbo-failure.html` | P30, H2×12, H3×2, UL×7, T×1, Q×7, F×4, B×10. | One main table; symptom list and escalation CTA. |
| `/failures/water-pump-failure` | `public/failures/water-pump-failure.html` | P36, H2×12, H3×2, UL×5, T×4, Q×7, F×4, B×10. | Cooling-system tables and urgent stop-driving messaging. |

### SYM-01 — Symptom diagnosis guides (20)

Every page has the same broad anatomy: diagnostic hero/form, paragraph-led explanation, unordered lists, 4–6 structured tables, FAQ details, CTA controls and six content images/stat icons. The distinguishing content is pattern matching (noise, smoke, warning light, behaviour) rather than a confirmed component failure.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/symptoms/black-smoke` | `public/symptoms/black-smoke.html` | P21, H2×12, H3×2, UL×4, T×4, I×6, Q×4, F×4, B×8. | Representative; warning card, diagnosis checklist and repair-range tables. |
| `/symptoms/blue-smoke` | `public/symptoms/blue-smoke.html` | P20, H2×12, H3×2, UL×2, T×4, I×6, Q×4, F×4, B×8. | Smoke timing/cause matrix and urgency treatment. |
| `/symptoms/check-engine-light` | `public/symptoms/check-engine-light.html` | P30, H2×15, H3×2, UL×5, T×5, I×6, Q×6, F×4, B×8. | More sections and FAQ items; warning-light state distinctions. |
| `/symptoms/coolant-loss` | `public/symptoms/coolant-loss.html` | P17, H2×13, H3×2, UL×3, T×5, I×6, Q×4, F×4, B×8. | Compact but table-heavy; urgency/cause mapping. |
| `/symptoms/coolant-warning-light` | `public/symptoms/coolant-warning-light.html` | P32, H2×14, H3×2, UL×4, T×5, I×6, Q×5, F×4, B×8. | Warning-light classification and escalation content. |
| `/symptoms/dpf-warning-light` | `public/symptoms/dpf-warning-light.html` | P41, H2×15, H3×5, UL×3, T×5, I×6, Q×5, F×4, B×8. | Longest symptom article; DPF regeneration/repair decision sections. |
| `/symptoms/engine-knocking-noise` | `public/symptoms/engine-knocking-noise.html` | P26, H2×12, H3×10, UL×3, T×4, I×6, Q×4, F×4, B×8. | H3-heavy audio/condition classification. |
| `/symptoms/engine-overheating` | `public/symptoms/engine-overheating.html` | P26, H2×14, H3×2, UL×5, T×6, I×6, Q×4, F×4, B×8. | Six tables and stop-driving urgency. |
| `/symptoms/engine-rattling-noise` | `public/symptoms/engine-rattling-noise.html` | P25, H2×12, H3×10, UL×2, T×4, I×6, Q×5, F×4, B×8. | H3-heavy noise-pattern decision content. |
| `/symptoms/engine-stalling` | `public/symptoms/engine-stalling.html` | P31, H2×13, H3×2, UL×1, T×5, I×6, Q×4, F×4, B×8. | Stalling-pattern table and compact cause list. |
| `/symptoms/engine-ticking-noise` | `public/symptoms/engine-ticking-noise.html` | P26, H2×12, H3×6, UL×2, T×4, I×6, Q×4, F×4, B×8. | H3/audio diagnosis variation. |
| `/symptoms/engine-wont-start` | `public/symptoms/engine-wont-start.html` | P30, H2×13, H3×2, UL×2, T×5, I×6, Q×4, F×4, B×8. | No-start triage and repair-path tables. |
| `/symptoms/excessive-oil-consumption` | `public/symptoms/excessive-oil-consumption.html` | P26, H2×13, H3×2, UL×3, T×5, I×6, Q×4, F×4, B×8. | Consumption-rate matrix and repair-range content. |
| `/symptoms/exhaust-leak-sound` | `public/symptoms/exhaust-leak-sound.html` | P23, H2×14, H3×2, UL×4, T×5, I×6, Q×5, F×4, B×8. | Sound-pattern plus urgency comparison. |
| `/symptoms/limp-mode` | `public/symptoms/limp-mode.html` | P20, H2×14, H3×2, UL×4, T×5, I×6, Q×7, F×4, B×8. | FAQ-rich; diagnostic escalation and safe-driving advice. |
| `/symptoms/loss-of-power` | `public/symptoms/loss-of-power.html` | P17, H2×13, H3×2, UL×3, T×5, I×6, Q×4, F×4, B×8. | Compact symptom-to-cause guide. |
| `/symptoms/metal-shavings-in-oil` | `public/symptoms/metal-shavings-in-oil.html` | P26, H2×15, H3×2, UL×3, T×6, I×6, Q×5, F×4, B×8. | Six tables; evidence/urgency treatment. |
| `/symptoms/oil-warning-light` | `public/symptoms/oil-warning-light.html` | P26, H2×14, H3×2, UL×7, T×5, I×6, Q×5, F×4, B×8. | List-heavy urgent warning-light page. |
| `/symptoms/rough-idle` | `public/symptoms/rough-idle.html` | P17, H2×13, H3×2, UL×3, T×5, I×6, Q×4, F×4, B×8. | Compact symptom-pattern guide. |
| `/symptoms/white-smoke` | `public/symptoms/white-smoke.html` | P12, H2×12, H3×2, UL×3, T×4, I×6, Q×4, F×4, B×8. | Shortest symptom page; smoke colour/urgency focus. |

### PRICE-01 — Cost and price guides (15)

All pages use a data-led hero with quote forms, six images/stat icons, multiple cost tables, FAQ details (14–15), CTA buttons and explanatory sections. They vary mainly by table count and long-form copy length.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/prices/crankshaft-repair-cost` | `public/prices/crankshaft-repair-cost.html` | P33, H2×14, H3×3, T×4, I×6, Q×14, F×4, B×8. | Cost range and repair-versus-replacement tables. |
| `/prices/dpf-replacement-cost` | `public/prices/dpf-replacement-cost.html` | P52, H2×15, H3×6, T×5, I×6, Q×14, F×4, B×8. | Long DPF cleaning/replacement decision article. |
| `/prices/engine-fitting-cost` | `public/prices/engine-fitting-cost.html` | P45, H2×15, H3×4, UL×4, T×4, I×6, Q×14, F×4, B×8. | Includes fitting option lists and labour tables. |
| `/prices/engine-replacement-cost` | `public/prices/engine-replacement-cost.html` | P44, H2×14, H3×4, T×5, I×6, Q×14, F×4, B×8. | Broadest replacement-cost comparison; multiple condition/brand/location tables. |
| `/prices/labour-cost-guide` | `public/prices/garage-labour-rates.html` | P24, H2×13, H3×5, UL×5, T×4, I×6, Q×14, F×4, B×8. | Route/source filename mismatch; labour-rate tables and lists. |
| `/prices/gearbox-replacement-cost` | `public/prices/gearbox-replacement-cost.html` | P35, H2×15, H3×7, T×11, I×6, Q×14, F×4, B×8. | Table-dense gearbox cost page; horizontal table handling. |
| `/prices/head-gasket-repair-cost` | `public/prices/head-gasket-repair-cost.html` | P33, H2×15, H3×2, UL×6, T×8, I×6, Q×14, F×4, B×8. | List and table-heavy repair-cost guidance. |
| `/prices/injector-replacement-cost` | `public/prices/injector-replacement-cost.html` | P34, H2×14, H3×3, UL×2, T×5, I×6, Q×14, F×4, B×8. | Injector cost and vehicle/application comparisons. |
| `/prices/rebuilt-engine-cost` | `public/prices/rebuilt-engine-cost.html` | P45, H2×12, H3×8, UL×3, T×4, I×6, Q×14, F×4, B×8. | Rebuild option explained through process and comparison sections. |
| `/prices/reconditioned-engine-cost` | `public/prices/reconditioned-engine-cost.html` | P43, H2×17, H3×12, UL×1, T×12, I×6, Q×15, F×4, B×8. | Very table/heading dense; needs strong section navigation. |
| `/prices/remanufactured-engine-cost` | `public/prices/remanfactured-engine-cost.html` | P31, H2×14, H3×4, UL×6, T×4, I×6, Q×14, F×4, B×8. | Route/source filename typo mismatch; process and warranty comparison. |
| `/prices/timing-chain-replacement-cost` | `public/prices/timing-chain-replacement-cost.html` | P35, H2×17, H3×4, UL×3, T×9, I×25, Q×14, F×4, B×8. | Image-heavy outlier; preserve 25 image assets alongside cost tables. |
| `/prices/turbo-replacement-cost` | `public/prices/turbo-replacement-cost.html` | P35, H2×13, H3×5, UL×3, T×4, I×6, Q×14, F×4, B×8. | Turbo repair/replacement comparison. |
| `/prices/used-engine-cost` | `public/prices/used-engine-cost.html` | P68, H2×18, H3×12, UL×3, T×13, I×6, Q×15, F×4, B×8. | Representative and longest price article; table-heavy long-form page. |
| `/prices/vehicle-recovery-cost` | `public/prices/vehicle-recovery-cost.html` | P23, H2×13, H3×4, T×1, I×6, Q×14, F×4, B×8. | Short, service-adjacent price page with one primary table. |

### INSIGHT-01 — Market, ranking and statistical reports (10)

All pages use a report-style hero/form, six images/stat icons, structured data tables, FAQ details (7–12), CTA controls and methodology/source-oriented copy. The number of tables ranges from 3 to 20.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/insights/average-engine-replacement-times` | `public/insights/average-engine-replacement-times.html` | P20, H2×13, H3×7, T×5, I×6, Q×8, F×4, B×8. | Timeline/statistics tables. |
| `/insights/engine-warranty-statistics-uk` | `public/insights/engine-warranty-statistics-uk.html` | P24, H2×14, H3×4, T×4, I×6, Q×8, F×4, B×8. | Warranty/reliability data and methodology. |
| `/insights/most-common-engine-failures-uk` | `public/insights/most-common-engine-failures-uk.html` | P21, H2×13, H3×2, UL×1, T×15, I×6, Q×10, F×4, B×8. | Very table-dense ranking report. |
| `/insights/most-expensive-engine-repairs-uk` | `public/insights/most-expensive-engine-repairs-uk.html` | P21, H2×15, H3×9, UL×2, T×10, I×6, Q×10, F×4, B×8. | Ranking and cost-benchmark sections. |
| `/insights/most-reliable-diesel-engines` | `public/insights/most-reliable-diesel-engines.html` | P33, H2×11, H3×5, T×3, I×6, Q×12, F×4, B×8. | Reliability methodology and FAQ-rich report. |
| `/insights/most-reliable-petrol-engines` | `public/insights/most-reliable-petrol-engines.html` | P33, H2×13, H3×3, UL×16, T×3, I×6, Q×7, F×4, B×8. | List-heavy ranking report. |
| `/insights/most-replaced-engines-uk` | `public/insights/most-replaced-engines-uk.html` | P27, H2×14, H3×4, UL×1, T×9, I×6, Q×8, F×4, B×8. | Replacement-volume ranking and tables. |
| `/insights/uk-engine-market-report-2026` | `public/insights/uk-engine-market-report-2026.html` | P27, H2×17, H3×12, T×17, I×6, Q×9, F×4, B×8. | Representative; dense market-report tables, PDF/report block and FAQ. |
| `/insights/uk-engine-price-index` | `public/insights/uk-engine-price-index.html` | P42, H2×14, H3×24, UL×7, T×20, I×6, Q×10, F×4, B×8. | Largest insight outlier; very dense index tables and nested headings. |
| `/insights/uk-engine-replacement-statistics` | `public/insights/uk-engine-replacement-statistics.html` | P26, H2×11, H3×7, T×3, I×6, Q×10, F×4, B×8. | Data-collection and replacement-statistics narrative. |

### SERVICE-01 — Service and product/service explainers (15)

These pages share the service hero/form and six-image/stat treatment, then vary between process steps, eligibility/symptom sections, condition comparisons, structured tables, optional ordered lists and FAQ blocks.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/services/engine-diagnostics` | `public/services/engine-diagnostic.html` | P22, H2×10, H3×7, T×3, I×6, Q×8, F×4, B×8. | Route/source filename mismatch; diagnostic service framing. |
| `/services/engine-fitting` | `public/services/engine-fitting.html` | P31, H2×12, H3×11, UL×3, T×6, I×6, Q×8, F×4, B×8. | Representative; multiple labour/risk tables and fitting checklist. |
| `/services/engine-inspection-service` | `public/services/engine-inspection-service.html` | P27, H2×11, H3×7, T×4, I×6, Q×8, F×4, B×8. | Standalone inspection workflow. |
| `/services/engine-inspection` | `public/services/engine-inspection.html` | P22, H2×9, H3×8, UL×2, T×6, I×6, Q×8, F×4, B×8. | Two-use-case structure; table-heavy. |
| `/services/engine-repair` | `public/services/engine-repair.html` | P21, H2×12, H3×15, UL×2, T×10, I×6, Q×8, F×4, B×8. | H3/table-dense repair-versus-replacement framework. |
| `/services/gearbox-replacement/automatic` | `public/services/gearbox-replacement/automatic.html` | P28, H2×11, H3×11, UL×1, T×9, I×6, Q×8, F×4, B×8. | Automatic gearbox-specific tables and symptoms. |
| `/services/gearbox-replacement/manual` | `public/services/gearbox-replacement/manual.html` | P25, H2×10, H3×10, T×8, I×6, Q×8, F×4, B×8. | Manual gearbox variant; no UL in main content. |
| `/services/gearbox-replacement` | `public/services/gearbox-replacement.html` | P25, H2×10, H3×10, UL×1, T×5, I×6, Q×8, F×4, B×8. | General gearbox page linking to automatic/manual variants. |
| `/services/rebuilt-engines` | `public/services/rebuilt-engines.html` | P37, H2×15, H3×11, UL×5, OL×1, T×10, I×6, Q×9, F×4, B×8. | Ordered process list and premium-option comparison. |
| `/services/reconditioned-engines` | `public/services/reconditioned-engines.html` | P61, H2×13, H3×8, UL×4, OL×1, T×8, I×6, F×4, B×8. | Long product explainer; no visible FAQ details. |
| `/services/remanufactured-engines` | `public/services/remanufactured-engines.html` | P28, H2×11, H3×11, UL×4, OL×1, T×7, I×6, F×4, B×8. | No visible FAQ details; ordered remanufacturing/process content. |
| `/services/replacement-engines` | `public/services/replacement-engines.html` | P36, H2×9, H3×9, UL×3, T×5, I×6, F×4, B×8. | No visible FAQ details; broad replacement explainer. |
| `/services/supply-and-fit` | `public/services/supply-and-fit.html` | P26, H2×8, H3×8, UL×2, T×3, I×6, F×4, B×8. | No visible FAQ details; package/decision comparison. |
| `/services/used-engines` | `public/services/used-engines.html` | P35, H2×16, H3×12, UL×5, OL×1, T×10, I×6, Q×8, F×4, B×8. | Used-engine market explainer with ordered content and FAQ. |
| `/services/vehicle-recovery` | `public/services/vehicle-recovery.html` | P65, H2×14, H3×11, T×4, I×6, Q×10, F×4, B×8. | Longest service page; recovery workflow and cost tables. |

### GUIDE-01 — Informational, trust and process guides (4)

These are the four informational pages stored in `public/about/` after the corporate/about-us and contact pages are separated into CORP-01. They use narrative sections, lists/checklists, some tables and FAQ details.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/about/engine-warranty-guide` | `public/about/engine-warranty-guide.html` | P28, H2×11, UL×7, T×3, Q×5. | Representative; warranty inclusions/exclusions, duration table, checklist and FAQ. |
| `/about/how-engines-market-works` | `public/about/how-engines-market-works.html` | P12, H2×5, UL×5, Q×5. | Four-step process; no tables, primarily cards/lists and FAQ. |
| `/about/supplier-standards` | `public/about/supplier-standards.html` | P27, H2×8, UL×4, T×2, Q×4. | Vetting/monitoring process with standards tables. |
| `/about/warranty-claims-guide` | `public/about/warranty-claims-guide.html` | P28, H2×9, UL×7, T×3, Q×5. | Step-by-step claims process, checklist and escalation table. |

### LEGAL-01 — Legal, privacy and compliance documents (5)

These pages require a long-document treatment rather than a normal marketing/article layout. They contain nested numbered clauses and/or policy subsections; the FAQ count varies, and the complaint page includes a form.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/complaints-procedure` | `public/legal/complaints-procedure.html` | P18, H2×6, H3×1, UL×4, Q×4, F×1, B×1. | Route is outside `/legal`; complaint form and escalation process. |
| `/legal/cookie-policy` | `public/legal/cookie-policy.html` | P27, H2×7, H3×10, UL×6, T×5. | Nested policy headings and cookie-type tables; no FAQ details. |
| `/legal/data-handling-policy` | `public/legal/data-handlng-policy.html` | P44, H2×14, H3×19, UL×14, OL×1, T×7. | Route/source filename typo mismatch; deepest nested operational policy. |
| `/legal/privacy-policy` | `public/legal/privacy-policy.html` | P64, H2×17, H3×11, UL×7, T×11, Q×8. | Longest privacy document; nested UK GDPR sections and FAQ. |
| `/legal/terms-and-conditions` | `public/legal/terms-and-conditions.html` | P72, H2×17, H3×36, UL×15, T×6, Q×9. | Representative; deepest clause hierarchy, definitions, limitations and quick-reference accordions. |

### CORP-01 — Corporate, contact, reviews and quote conversion pages (4)

These pages are not ordinary long-form guides: they combine brand/trust messaging with contact, quote, review or conversion interactions.

| Route | Source file | Content structure | Special requirements |
|---|---|---|---|
| `/about` | `public/about/about-us.html` | P11, H2×8, UL×2, Q×5; cards, values, steps, testimonials and FAQ. | Brand-story and trust proof; no table/form. |
| `/about/contact` | `public/about/contact.html` | P17, H2×7, T×2, Q×4, F×1, B×1. | Contact form, response-channel tables and FAQ. |
| `/get-a-quote` | `public/get-a-quote.html` | P8, H2×6, H3×5, T×1, Q×5, F×2, B×2. | No canonical; derive route from file path. Conversion form and final CTA are primary. |
| `/reviews` | `public/reviews.html` | P18, H2×9, UL×2, Q×4; review/testimonial sections and FAQ. | Trust/review cards and review-submission pathway; no table/form in main content. |

## Non-inventory route families

These were inspected so that generated/application routes are not confused with the 141 independent HTML documents above. They are not counted as independent static content pages because their source is a shared route component plus data or a remote CMS response.

| Route family | Source | Classification and audit treatment |
|---|---|---|
| `/` | `app/page.tsx` plus `components/sections/*` and `lib/homepageData.ts` | Application homepage with bespoke hero, live feed, brand grid, decision hub, reviews/FAQ and structured data; not one of the independent HTML documents. |
| `/blog` | `app/blog/page.tsx` and `lib/cms.ts` | CMS-backed paginated archive using `searchParams`, `revalidate` and `cache: "no-store"`; not statically enumerable from local source. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` and `lib/cms.ts` | CMS-backed article route; article HTML and images are remote/runtime data. |
| `/brand` | `app/[brand]/page.tsx`, `data/brands/*.json`, `components/sections/new-doc-brand-page-sections/*` | Data-generated brand pages; 41 valid brand data records were found. |
| `/[brand]/[model]` | `app/[brand]/[model]/page.tsx`, `data/models/*.json`, `data/engines/*.json` | Shared model/engine route; the route generator combines model and engine params, so source-file count is not the same as unique URL count. |
| `/[brand]/[model]/[variant]` | `app/[brand]/[model]/[variant]/page.tsx`, `data/variants/*.json` | Data-generated variant pages; 1,002 valid variant records were found. |
| `/compare/[slug]` | `app/compare/[slug]/page.tsx`, `data/comparisonGuides.ts`, `data/staticComparisonGuides.ts` | Shared comparison renderer/data lookup. The public comparison HTML documents are inventoried in COMP-01; the route implementation is separate. |
| `/failures/[slug]` | `app/failures/[slug]/page.tsx`, `data/failureGuides.ts`, `data/failureSourceDetails.ts` | Shared failure renderer with generated static params. The 25 public failure HTML files are inventoried in FAIL-01, while the App Router renderer consumes transformed data. |
| `/form` | `app/form/page.tsx`, `app/form/Components/FormClient.tsx` | Interactive application form, not a content article. |
| `/api/*`, `/send-email`, `/robots.txt`, `/sitemap` | `app/**/route.ts`, `app/sitemap.ts` | Route handlers/metadata endpoints; excluded from page inventory. |

## Audit limitations and follow-up cautions

- The 21 no-canonical documents are fully accounted for, but their route assignment is path-derived rather than verified from page metadata.
- The public HTML and App Router route families can represent the same subject matter in different render paths. In particular, failure pages have public HTML sources plus `app/failures/[slug]/page.tsx` data/component rendering; UI approval should confirm which render path is authoritative before implementation.
- Blog pages cannot be fully content-audited from this checkout because the article body is fetched from the external CMS at runtime; they are therefore not included in the 141 independent HTML-page count.
- This is a source audit only. No application source, style, route, metadata, navigation, schema or behavior was changed.
