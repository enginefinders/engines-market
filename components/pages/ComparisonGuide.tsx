"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBalanceScale, FaBolt, FaBuilding, FaCar, FaChartBar, FaChartLine, FaCheck, FaChevronRight, FaClock, FaCogs, FaCoins, FaDatabase, FaExclamationTriangle, FaExchangeAlt, FaExternalLinkAlt, FaEye, FaGem, FaInfoCircle, FaLink, FaLock, FaMicrochip, FaMoneyBillWave, FaPlus, FaPoundSign, FaSearch, FaShieldAlt, FaSlidersH, FaStar, FaTag, FaTachometerAlt, FaTimes, FaTools, FaUserShield, FaUsers, FaWrench } from "react-icons/fa";
import type { ComparisonGuide as ComparisonGuideData } from "@/data/comparisonGuides";
import styles from "./ComparisonGuide.module.css";
import additions from "./ComparisonGuideAdditions.module.css";
import dynamic from "./DynamicComparisonGuide.module.css";
import dynamicBrand from "./DynamicComparisonGuideBrand.module.css";
import RiskAnalysis from "./RiskAnalysis";

const engineImage = "/images/shared/hero-engines/temporary-performance-engine-cutout.png";
const ukMapImage = "/images/compare/uk-map-dots-alpha-v2.png";
const emIcons = {
  car: "/icons/engine-market/white-petrol-engine.png",
  warranty: "/icons/engine-market/white-warranty.png",
  technical: "/icons/engine-market/white-technical-spec.png",
  specialists: "/icons/engine-market/white-vetted-specialists.png",
  calendar: "/icons/engine-market/white-calendar-icon.png",
};
const usedRules = ["Vehicle value is under £4,000 - replacement cost may exceed vehicle value [EM-OBSERVED]", "You plan to sell within 12 months - no need to invest in long-term reliability", "You need the absolute cheapest option - used engines are the lowest upfront cost", "Vehicle is being repaired purely to keep mobile", "You cannot tolerate 1-3 weeks downtime - used engines can be fitted in 3-5 days"];
const rebuiltRules = ["Vehicle value is £15,000+ - rebuild protects a significant asset", "You plan to keep the car 3+ years - long-term ownership justifies the investment", "Original engine has sentimental or matching-numbers value - only a rebuild preserves the original block", "You want full warranty protection (12-24 months)", "Vehicle is a classic or future classic - matching-numbers preservation is critical for value", "You can manage 1-3 weeks downtime - rebuilds require significant workshop time"];
const rebuildStages = ["Strip down & inspection", "Cleaning & machining", "OEM component replacement", "Reassembly & calibration", "Dynamic testing & verification"];
const rebuildParts = [["Block", "Cleaned, inspected, machined if required"], ["Crank", "Inspected, reground if required"], ["Bearings", "Replaced with new OEM-spec"], ["Pistons + rings", "Replaced with new components"], ["Gaskets + seals", "Fully replaced"], ["Timing chain + tensioner", "Replaced"], ["Oil pump", "Inspected, replaced if worn"], ["Injectors", "Tested, cleaned or replaced"], ["Turbo", "Inspected, rebuilt or replaced if worn"], ["Cylinder head", "Inspected, pressure tested, skimmed if required"], ["Valves + guides", "Inspected, replaced if worn"], ["Testing", "Compression, oil pressure, hot + cold dynamic testing"]];
const related = ["Used engine cost guide", "Rebuilt engine cost guide", "Engine replacement cost guide", "Used vs reconditioned comparison", "Reconditioned vs rebuilt comparison", "Repair vs replacement comparison", "Timing chain failure guide", "Engine seizure guide", "UK Engine Price Index - 2025 data"];

function SectionHeading({ eyebrow, children, copy }: { eyebrow: string; children: React.ReactNode; copy?: string }) {
  return <div className={styles.heading}><p>{eyebrow}</p><h2>{children}</h2>{copy ? <span>{copy}</span> : null}</div>;
}

function QuoteForm({ compact = false }: { compact?: boolean }) {
  if (compact) return <form className={styles.quoteCompact} action="/get-a-quote" method="get"><label><span className={additions.compactFlag}><img src="/failures/img/gb.webp" alt="" aria-hidden="true" /></span><input name="reg" aria-label="Vehicle registration number" placeholder="Enter your registration number" /></label><button>Compare real quotes <FaChevronRight /></button></form>;
  return <div className={dynamic.quoteCard}><form className={dynamic.quoteForm} action="/get-a-quote" method="get"><label className={dynamic.regField}><span className={dynamic.plateBand}><img src="/failures/img/gb.webp" alt="" aria-hidden="true" /></span><input name="reg" aria-label="Vehicle registration number" placeholder="ENTER YOUR REG" /><small className={dynamic.regHint}>e.g. AB12 CDE</small></label><i className={dynamic.quoteArrow} aria-hidden="true">»</i><button>Compare real quotes <b className={dynamic.buttonArrow} aria-hidden="true" /></button></form><div className={dynamic.quoteDetails}><p className={dynamic.secure}><FaLock />Secure enquiry · no spam · genuine quotes from vetted UK engine suppliers.</p></div></div>;
}

function EmIcon({ icon, alt = "" }: { icon: keyof typeof emIcons; alt?: string }) {
  return <Image className={additions.emIcon} src={emIcons[icon]} alt={alt} width={34} height={34} />;
}

function DecisionIcon({ factor }: { factor: string }) {
  if (/warranty/i.test(factor)) return <FaShieldAlt />;
  if (/off-road/i.test(factor)) return <FaCar />;
  if (/best for/i.test(factor)) return <FaStar />;
  if (/risk/i.test(factor)) return <FaExclamationTriangle />;
  if (/matching/i.test(factor)) return <FaLink />;
  if (/fitted|labour/i.test(factor)) return <FaTools />;
  return <FaMoneyBillWave />;
}

function TechnicalPartIcon({ part }: { part: string }) {
  if (/internal inspection/i.test(part)) return <FaSearch />;
  if (/bearings/i.test(part)) return <FaCogs />;
  if (/pistons/i.test(part)) return <FaTools />;
  if (/gaskets/i.test(part)) return <FaShieldAlt />;
  if (/timing/i.test(part)) return <FaClock />;
  if (/oil pump/i.test(part)) return <FaMoneyBillWave />;
  if (/injectors/i.test(part)) return <FaBolt />;
  if (/turbocharger/i.test(part)) return <FaTachometerAlt />;
  if (/testing/i.test(part)) return <FaChartLine />;
  if (/warranty/i.test(part)) return <FaUserShield />;
  if (/vehicle off-road/i.test(part)) return <FaCar />;
  if (/labour/i.test(part)) return <FaWrench />;
  return <FaLink />;
}


function RebuildStageIcon({ index }: { index: number }) {
  const icons = [
    "/icons/engine-market/white-blue-technical-spec.png",
    "/icons/engine-market/dark-blue-not-sure.png",
    "/icons/engine-market/dark-blue-diesel-engine.png",
    "/icons/engine-market/dark-blue-supply-fit.png",
    "/icons/engine-market/dark-blue-warranty.png",
  ];
  return <Image className={additions.rebuildStageAsset} src={icons[index]} alt="" width={24} height={24} aria-hidden="true" />;
}

function RebuildPartIcon({ part }: { part: string }) {
  let icon = "/icons/engine-market/dark-blue-vetted-specialists.png";
  if (/^block$/i.test(part)) icon = "/icons/engine-market/dark-blue-diesel-engine.png";
  if (/^crank$/i.test(part)) icon = "/icons/engine-market/dark-blue-rod-bearing.png";
  if (/bearings/i.test(part)) icon = "/icons/engine-market/dark-blue-cooling-system.png";
  if (/pistons/i.test(part)) icon = "/icons/engine-market/dark-blue-petrol-engine.png";
  if (/gaskets/i.test(part)) icon = "/icons/engine-market/dark-blue-warranty.png";
  if (/timing/i.test(part)) icon = "/icons/engine-market/dark-blue-not-sure.png";
  if (/oil pump/i.test(part)) icon = "/icons/engine-market/dark-blue-hpfp-icon.png";
  if (/injectors/i.test(part)) icon = "/icons/engine-market/dark-blue-instant-quote.png";
  if (/turbo/i.test(part)) icon = "/icons/engine-market/dark-blue-hybrid-engine.png";
  if (/cylinder head/i.test(part)) icon = "/icons/engine-market/dark-blue-egr-icon.png";
  if (/valves/i.test(part)) icon = "/icons/engine-market/dark-blue-supply-fit.png";
  return <Image className={additions.rebuildPartAsset} src={icon} alt="" width={22} height={22} aria-hidden="true" />;
}

function ConfidenceIcon({ label }: { label: string }) {
  if (/pricing accuracy/i.test(label)) return <FaPoundSign />;
  if (/regional labour/i.test(label)) return <FaUsers />;
  if (/condition/i.test(label)) return <FaExclamationTriangle />;
  if (/pricing stability/i.test(label)) return <FaShieldAlt />;
  return <FaClock />;
}

function RelatedIcon({ item }: { item: string }) {
  if (/used engine cost/i.test(item)) return <FaPoundSign />;
  if (/rebuilt engine cost/i.test(item)) return <FaCogs />;
  if (/replacement cost/i.test(item)) return <FaBuilding />;
  if (/used vs reconditioned/i.test(item)) return <FaChartBar />;
  if (/reconditioned vs rebuilt/i.test(item)) return <FaBalanceScale />;
  if (/repair vs replacement/i.test(item)) return <FaTools />;
  if (/timing chain/i.test(item)) return <FaClock />;
  if (/seizure/i.test(item)) return <FaBolt />;
  return <FaChartLine />;
}

function MethodologyIcon({ title }: { title: string }) {
  if (/VERIFIED/.test(title)) return <FaShieldAlt />;
  if (/OBSERVED/.test(title)) return <FaEye />;
  if (/QUOTE/.test(title)) return <FaMoneyBillWave />;
  if (/INTERVIEW/.test(title)) return <FaUsers />;
  return <FaDatabase />;
}

export default function ComparisonGuide({ guide }: { guide: ComparisonGuideData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return <main className={`${styles.page} ${additions.emTypography} ${dynamic.page} ${dynamicBrand.em}`}>
    <section className={`${dynamic.hero} ${dynamicBrand.hero}`}>
      <div className={dynamic.container}>
        <p className={dynamic.eyebrow}>UK COST &amp; RISK ANALYSIS · 2026 DATA · <b>[EM-VERIFIED]</b></p>
        <div className={dynamic.heroGrid}>
          <div>
            <h1>Used vs Rebuilt Engine<br />Cost &amp; Risk Analysis <span className={dynamic.heroPrice}>2026</span></h1>
            <i />
            <p><b>Used:</b> <span className={dynamic.heroPrice}>£500-£1,500</span> supply · <b>Rebuilt:</b> <span className={dynamic.heroPrice}>£1,500-£5,600+</span> supply<br />Fitting adds <span className={dynamic.heroPrice}>£500-£2,500</span> depending on engine type and region.<br />The real question: cheapest fix or full restoration of your original engine?</p>
            <div className={`${dynamic.trust} ${dynamicBrand.trust}`}>
              <span><Image src={emIcons.specialists} alt="" width={26} height={26} />100+ UK specialists</span>
              <span><Image src={emIcons.calendar} alt="" width={26} height={26} />24,650 quote requests</span>
              <span><Image src={emIcons.warranty} alt="" width={26} height={26} />No obligation</span>
            </div>
          </div>
          <div className={dynamic.visual}>
            <Image src={engineImage} alt="Engine assembly" width={390} height={255} priority />
            <span />
            <aside className={dynamic.heroStats}>
              <article><b>24,650</b><small>Real quote requests<br />in 2025</small></article>
              <article><b>5.2 days</b><small>Average quote-to-delivery<br />timeline</small></article>
            </aside>
          </div>
        </div>
        <div className={`${dynamic.optionGrid} ${dynamicBrand.optionGrid}`}>
          <article><span className={dynamic.optionIcon}><FaTag /></span><div><b>Used engine (budget)</b><strong>£500-£1,500</strong><small>Supply only · 1-6 months warranty</small></div></article>
          <article><span className={dynamic.optionIcon}><FaTools /></span><div><b>Rebuilt (restoration)</b><strong>£1,500-£5,600+</strong><small>Supply only · 12-24 months warranty</small></div></article>
          <article><span className={dynamic.optionIcon}><FaShieldAlt /></span><div><b>Matching-numbers</b><strong>Preserved</strong><small>Original engine retained</small></div></article>
        </div>
        <QuoteForm />
      </div>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.about} ${additions.methodology}`}><div><p className={styles.eyebrow}>ABOUT THIS DATA · OUR METHODOLOGY</p><p>This guide is based on <b>24,650</b> real UK engine replacement quote requests submitted through Engines Market between January and December 2025. Every quote comes from a real UK vehicle owner; supplier prices are anonymised and aggregated.</p></div><div className={styles.legend}>{[["[EM-VERIFIED]", "Exact count or percentage from our CRM"], ["[EM-OBSERVED]", "Observed patterns from our platform data"], ["[EM-QUOTE]", "Derived from supplier quotes & interviews"], ["[EM-INTERVIEW]", "Workshop interviews with 100+ UK specialists"], ["[THIRD-PARTY]", "External named industry sources"]].map(([title, text]) => <span key={title}><MethodologyIcon title={title} /><b>{title}</b>{text}</span>)}</div><div className={styles.map}><Image className={additions.ukMap} src={ukMapImage} alt="Map of the United Kingdom" width={420} height={560} /></div><footer>Document ID: <b>EM-CMP-002-2026</b> · Last updated: <b>18 June 2026</b> · <strong>Status: Live dataset</strong></footer></section>

    <section className={`${styles.container} ${styles.section} ${additions.comparisonExperience}`}>
      <div className={additions.comparisonHero}>
        <div className={additions.comparisonCopy}>
          <p>INSTANT DECISION TABLE</p>
          <h2>Used vs Rebuilt Engine</h2>
          <h3>Cost &amp; Risk Analysis <span>2026</span></h3>
          <i />
          <strong>Used vs Rebuilt - Side by Side</strong>
          <span>The table below shows the key differences at a glance. [EM-VERIFIED] [EM-QUOTE]</span>
        </div>
        <div className={additions.comparisonArtwork} aria-hidden="true">
          <Image className={additions.engineLeft} src={engineImage} alt="" width={360} height={235} />
          <Image className={additions.engineRight} src={engineImage} alt="" width={360} height={235} />
          <Image className={additions.engineFade} src={engineImage} alt="" width={500} height={325} />
          <b />
          <i />
        </div>
      </div>
      <div className={additions.comparisonTable}><table><thead><tr><th>Factor</th><th>Used engine</th><th>Rebuilt engine</th></tr></thead><tbody>{guide.comparisonRows.map(([factor, used, rebuilt]) => <tr key={factor}><td><span className={styles.decisionFactor}><DecisionIcon factor={factor} />{factor}</span></td><td>{used}</td><td>{rebuilt}</td></tr>)}</tbody></table></div>
      <p className={additions.comparisonNote}><FaInfoCircle /> [EM-VERIFIED] [EM-QUOTE] based on 24,650 quote requests. Fitted costs include standard labour, consumables, and warranty.</p>
      <p className={additions.ruleOfThumb}><FaBalanceScale /><span><b>Rule of thumb:</b> If your vehicle is worth less than <em>£4,000</em>, a <em>used engine</em> minimises financial loss. If your vehicle is worth <em>£15,000+</em> or has sentimental/matching-numbers value, a <em>rebuilt engine</em> protects your investment.</span></p>
    </section>

    <section className={`${styles.container} ${styles.section} ${additions.marketInsight}`}>
      <div className={additions.marketRing}>
        <b>29.55%</b>
        <span className={additions.marketHiddenData}>Used engines</span>
      </div>
      <div className={additions.marketCopy}>
        <p>KEY MARKET INSIGHT</p>
        <h2>What the data reveals</h2>
        <small className={additions.marketDemand}>of UK replacement demand <b>[EM-VERIFIED]</b></small>
        <span className={additions.marketDatasetCopy}>&quot;The dataset reveals: Rebuilt engines are not a mass-market solution. They serve a specific segment: high-value vehicles, enthusiast cars, and owners willing to accept longer workshop time for original engine preservation.&quot;</span>
      </div>
      <i className={additions.marketDivider} aria-hidden="true" />
      <div className={additions.marketRebuilt}>
        <FaGem />
        <div><span>Rebuilt engines</span><b>Premium &amp; Enthusiast</b><small>Dominate high-value and classic segments</small></div>
      </div>
      <Image className={additions.marketEngine} src={engineImage} alt="" width={500} height={325} aria-hidden="true" />
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${additions.garage}`}><div className={additions.garageRibbon}><FaTools />REALITY CHECK - UK GARAGE PERSPECTIVE</div><div className={additions.garageHeader}><h2>What <span>independent garages</span> know</h2><p>Many UK buyers assume a &quot;rebuilt engine&quot; is simply a more expensive version of a used engine. In practice, the two options are fundamentally different.</p></div><div><article><h3><FaCogs />Used engines are:</h3><ul>{["Removed from accident-damaged or scrapped vehicles", "Sold as-is with minimal internal inspection", "Unknown maintenance history", "Often already near end-of-life on critical components"].map((item) => <li key={item}><FaCheck />{item}</li>)}</ul></article><article><h3><FaCogs />Rebuilt engines, by contrast:</h3><ul>{["Your original engine, fully disassembled to bare block", "All components inspected, machined if required", "New pistons, rings, bearings, timing components", "Labour accounts for 60-70% of total cost"].map((item) => <li key={item}><FaCheck />{item}</li>)}</ul></article></div><blockquote>&quot;In the UK engine industry, reconditioned and rebuilt are often used interchangeably. Both describe a used engine that has been fully stripped, cleaned, inspected, repaired and rebuilt to meet specific performance standards. Both can deliver up to 94% of a new engine&apos;s performance at 40-60% less cost.&quot; <b>[EM-OBSERVED]</b></blockquote></section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${additions.technical}`}><SectionHeading eyebrow="FULL TECHNICAL COMPARISON" copy="What's actually done to each engine type. [EM-OBSERVED]">Component-by-<span>component</span> breakdown</SectionHeading><div className={styles.techGrid}><div className={styles.techColumn}><b>Component area</b>{guide.technicalRows.map(([name]) => <span key={name}><TechnicalPartIcon part={name} />{name}</span>)}</div><div className={styles.techColumn}><b>Used engine</b>{guide.technicalRows.map(([name, used]) => <span key={name}><FaTimes />{used}</span>)}</div><div className={styles.techColumn}><b>Rebuilt engine</b>{guide.technicalRows.map(([name, , rebuilt]) => <span key={name}><FaCheck />{rebuilt}</span>)}</div></div><p className={styles.note}><FaInfoCircle /> [EM-OBSERVED] based on supplier reconditioning processes and warranty data.</p></section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${additions.price}`}><SectionHeading eyebrow="PRICE BREAKDOWN BY ENGINE TYPE" copy="Based on 24,650 real UK engine replacement quote requests [EM-VERIFIED] [EM-QUOTE].">What you&apos;ll pay for <span>used vs rebuilt</span></SectionHeading><div className={styles.tableWrap}><table><thead><tr><th>Engine type</th><th>Used (supply only)</th><th>Used (fitted)</th><th>Rebuilt (supply only)</th><th>Rebuilt (fitted)</th></tr></thead><tbody>{guide.priceRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 0 ? <span className={additions.engineType}><FaCar />{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div><p className={styles.note}><FaInfoCircle /> Fitted costs include engine, standard replacement labour, consumables, and standard warranty coverage.</p></section>

    <section className={`${styles.container} ${styles.section} ${styles.regional} ${additions.regional}`}><div className={styles.regionalMap}><Image className={additions.regionalMap} src={ukMapImage} alt="Map of the United Kingdom" width={420} height={560} /></div><div><SectionHeading eyebrow="REGIONAL LABOUR RATE IMPACT" copy="Labour accounts for 60-70% of rebuild costs. The same engine can cost £1,000+ more to rebuild in London than in the North. [THIRD-PARTY]">Where you live <span>affects your total cost</span></SectionHeading><div className={styles.tableWrap}><table><thead><tr><th>Region</th><th>Labour rate</th><th>Impact on 4-cyl (10 hrs)</th><th>Impact on V8 (16 hrs)</th></tr></thead><tbody>{guide.regionalRows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></div></section>

    <section className={`${styles.container} ${styles.section} ${styles.decision} ${additions.decision}`}><div className={styles.decisionIntro}><p className={styles.eyebrow}>DECISION FRAMEWORK - RULES-BASED LOGIC</p><h2>Choose <span>used</span> or <strong>rebuilt</strong><br />with confidence</h2><p>Use these decision rules to determine which option is right for your situation.</p><div className={additions.decisionEngines}><Image src={engineImage} alt="Used engine option" width={180} height={105} /><b>VS</b><Image src={engineImage} alt="Rebuilt engine option" width={180} height={105} /></div></div><article><h3><FaTimes /> Choose a <span>used</span> engine if:</h3><ul>{usedRules.map((rule) => <li key={rule}><FaCheck />{rule}</li>)}</ul><b>Default: Used engine</b></article><article className={styles.rebuiltCard}><h3><FaCheck /> Choose a <span>rebuilt</span> engine if:</h3><ul>{rebuiltRules.map((rule) => <li key={rule}><FaCheck />{rule}</li>)}</ul><b>Default: Rebuild</b></article><div className={styles.threshold}><h3>The Vehicle Value <span>Threshold Rule</span></h3>{[["Under £4,000", "Used engine (or scrap) - rebuild cost typically exceeds vehicle value.", "USED", <FaCoins key="coins" />], ["£4,000-£10,000", "Evaluate both options - used cheaper; rebuild viable if sentimental value.", "EVALUATE", <FaBalanceScale key="scales" />], ["£10,000-£15,000", "Consider reconditioned - rebuild may still be worth it.", "EVALUATE", <FaChartBar key="chart" />], ["£15,000+", "Rebuilt or reconditioned - investment justifies full restoration.", "REBUILT", <FaGem key="gem" />]].map(([price, text, tag, icon]) => <span key={String(price)}>{icon}<b>{price}</b><small>{text}</small><em>{tag}</em></span>)}</div></section>

    <section className={`${styles.container} ${styles.section} ${styles.core} ${additions.core}`}><div><p className={styles.eyebrow}>CRITICAL DISTINCTION</p><h2>Exchange vs Own Engine -<br />The <span>single most important difference</span></h2><p>Reconditioned = exchange unit (different engine); rebuilt = your own engine restored. [EM-OBSERVED]</p></div><article><h3><FaExchangeAlt /> <span className={additions.coreUsedLabel}>Reconditioned</span> <small>(Exchange)</small></h3><p>You buy a ready-to-fit replacement unit. You don&apos;t get your original engine back.</p><ul><li>Vehicle off-road: Days (3-7)</li><li>Matching-numbers: Lost</li><li>Convenience: High</li><li>Cost: Medium (£1,200-£3,500 supply)</li></ul></article><b>VS</b><article><h3><FaWrench /> <span className={additions.coreRebuiltLabel}>Rebuilt</span> <small>(Your Own Engine)</small></h3><p>You send your existing engine for rebuild. You get your original engine back, fully restored.</p><ul><li>Vehicle off-road: 1-3 weeks</li><li>Matching-numbers: Preserved</li><li>Convenience: Low</li><li>Cost: High (£1,500-£5,600+ supply)</li></ul></article></section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${additions.scenarios}`}><SectionHeading eyebrow="USE-CASE SCENARIOS - REAL-WORLD APPLICATIONS">What other owners chose in <span>your situation</span></SectionHeading><div>{[["Low-Value Car", "Ford Fiesta Mk7 1.25", "Value: £2,500 · 110,000 miles · Head gasket failure", "Used: £300-£700 supply · Rebuild: £1,435-£1,850 supply", "Used - minimises loss on low-value car", "Rebuild exceeds vehicle value. Consider head gasket repair if body/interior excellent."], ["Mid-Value Enthusiast Car", "BMW 3 Series E46 330i", "Value: £8,000 · 120,000 miles · Piston ring failure", "Used: £1,500-£2,500 supply · Rebuild: £3,500-£5,000 supply", "Rebuild - preserves matching-numbers; restores performance", "Used risks future failure. Reconditioned loses matching-numbers value."], ["Premium/Classic Vehicle", "Jaguar XJ6 (Classic)", "Value: £25,000 · 65,000 miles · Timing chain failure", "Used: £3,000-£5,000 supply · Rebuild: £5,500-£8,500 supply", "Rebuild - preserves matching-numbers; restores original specification", "Used destroys matching-numbers value. New is unnecessarily expensive."]].map(([type, vehicle, details, prices, choice, note]) => <article key={type}><h3><FaCar />{type}</h3><b>{vehicle}</b><p>{details}</p><p>{prices}</p><strong><FaCheck />{choice}</strong><small>{note}</small></article>)}</div><p className={styles.note}><FaInfoCircle /> [EM-QUOTE] All scenarios are based on real Engines Market submissions. Prices are supply-only.</p></section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${styles.rebuild} ${additions.rebuild}`}>
      <div className={additions.rebuildLayout}>
        <div className={additions.rebuildMain}>
          <div className={additions.rebuildHeroRow}>
            <SectionHeading eyebrow="OEM & TECHNICAL AUTHORITY" copy="A rebuild is not a patch - it's a systematic restoration of your engine to a known-good condition.">What a <span>full</span><br />rebuild includes</SectionHeading>
            <div className={additions.rebuildEngineVisual}>
              <Image src={engineImage} alt="Rebuilt engine" width={420} height={260} />
            </div>
          </div>
          <div className={styles.stageBar} role="list">{rebuildStages.map((stage, index) => <div className={additions.stageItem} role="listitem" key={stage}><span className={additions.stageIcon}><RebuildStageIcon index={index} /></span><b>{index + 1}</b><span>{stage}</span></div>)}</div>
          <div className={styles.rebuildTables}>{[rebuildParts.slice(0, 6), rebuildParts.slice(6)].map((items, index) => <table key={index}><thead><tr><th>Component</th><th>Action during rebuild</th></tr></thead><tbody>{items.map(([part, action]) => <tr key={part}><td><RebuildPartIcon part={part} />{part}</td><td>{action}</td></tr>)}</tbody></table>)}</div>
        </div>
        <aside className={additions.oemPanel}>
          <b>OEM PART REFERENCES (EXAMPLES)</b>
          <i />
          <div className={additions.oemBrand}><Image className={additions.brandLogo} src="/BrandsLogos/bmw-logo-small.webp.webp" alt="BMW" width={36} height={36} /><div><strong>BMW</strong><p>BMW N47 piston ring set<br />BMW N47 con rod bearing set</p></div></div>
          <div className={additions.oemBrand}><Image className={additions.brandLogo} src="/BrandsLogos/mercedes-logo-small.webp.webp" alt="Mercedes" width={36} height={36} /><div><strong>MERCEDES</strong><p>Mercedes OM651 timing chain kit</p></div></div>
          <div className={additions.oemBrand}><Image className={additions.brandLogo} src="/BrandsLogos/land-rover-logo-small.webp.webp" alt="Land Rover" width={36} height={36} /><div><strong>LAND ROVER</strong><p>Land Rover TDV6 head gasket</p></div></div>
          <small>[OEM] Part numbers for reference only. Always verify with your supplier.</small>
        </aside>
      </div>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.market} ${additions.marketRefined}`}>
      <SectionHeading eyebrow="MARKET INTELLIGENCE - UK 2025 DATA" copy="Real numbers from our platform. No estimates, no external sources - these are [EM-VERIFIED].">What <span>24,650</span> quote requests tell us</SectionHeading>
      <div className={`${styles.metrics} ${additions.marketMetrics}`}>
        <span className={additions.metricItem}><span className={additions.metricIcon}><FaUsers /></span><b>24,650</b><small>verified UK quote requests analysed in 2025<br /><em>[EM-VERIFIED]</em></small></span>
        <span className={additions.metricItem}><i className={`${additions.metricRing} ${additions.usedRing}`}>29.55%</i><b>Used engines</b><small>29.55% - preferred for lower-value cars</small></span>
        <span className={additions.metricItem}><i className={`${additions.metricRing} ${additions.rebuiltRing}`}>~18.5%</i><b>Rebuilt engines</b><small>premium segment - dominates £15,000+ vehicles</small></span>
        <span className={additions.metricItem}><span className={additions.metricIcon}><FaClock /></span><b>5.2 DAYS</b><small>Average timeline: quote to delivery<br /><em>[EM-VERIFIED]</em></small></span>
      </div>
      <div className={additions.ownerInsight}><FaEye /><div><b>OWNER BEHAVIOUR INSIGHT</b><p>Used engines account for approximately 29.55% of UK replacement demand [EM-VERIFIED], but rebuilt engines dominate the premium and enthusiast segments due to matching-numbers preservation and long-term reliability.</p></div></div>
    </section>

    <RiskAnalysis />

    <section className={`${styles.container} ${additions.riskCta}`}>
      <div className={additions.riskCtaCopy}><h2>Know the <span>true cost</span> before<br />replacing your engine.</h2><p>Compare live UK engine supply &amp; fitting prices from vetted specialists. Fast, free and 100% independent.</p></div>
      <form className={additions.riskCtaForm} action="/get-a-quote" method="get"><label><span><img src="/failures/img/gb.webp" alt="" aria-hidden="true" /></span><input name="reg" aria-label="Vehicle registration number" placeholder="Enter your registration number" /></label><button>Get Your Engine Price Now <FaChevronRight /></button></form>
      <div className={additions.riskCtaTrust}><span><FaShieldAlt /><b>Free</b><small>comparison</small></span><span><FaMoneyBillWave /><b>No</b><small>obligation</small></span><span><FaUsers /><b>100+</b><small>UK specialists</small></span><span><FaClock /><b>Fast response</b><small>within 24 hours</small></span></div>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.method} ${additions.methodRefined}`}>
      <SectionHeading eyebrow="DATA CONFIDENCE & METHODOLOGY" copy="Our methodology combines real-world data, supplier intelligence and expert insights to deliver the most accurate engine pricing guide.">How we build this guide</SectionHeading>
      <div>
        <article><h3><FaShieldAlt /> Confidence levels</h3>{[["Pricing accuracy", "High"], ["Regional labour accuracy", "Medium-High"], ["Used engine condition", "High uncertainty"], ["Rebuild pricing stability", "High"], ["Downtime estimates", "Medium"]].map(([label, level]) => <span key={label}><i><ConfidenceIcon label={label} /></i><em>{label}</em><b className={/uncertainty/i.test(level) ? additions.warningLevel : /medium$/i.test(level) ? additions.mediumLevel : ""}>{level}</b></span>)}</article>
        <article><h3><FaDatabase /> Source data</h3>{["24,650 UK engine replacement quote requests (Jan-Dec 2025) [EM-VERIFIED]", "Aggregated supply pricing from 100+ UK suppliers [EM-QUOTE]", "Real-world installation pricing from supplier confirmed transaction data [SCTD]", "Post-installation survey data from 100+ customers [PSID]", "Workshop interviews with 100+ UK engine specialists [EM-INTERVIEW]"].map((item) => <span key={item}><FaCheck />{item}</span>)}</article>
        <article><h3><FaChartBar /> Data tiers</h3>{[["Tier A", "24,650 quote requests - primary authority"], ["Tier B", "Derived metrics - risk analysis, trends"], ["Tier C", "External validation - labour rates, inflation"]].map(([tier, text]) => <span key={tier}><b>{tier}</b>{text}</span>)}</article>
      </div>
      <p className={styles.limits}><FaInfoCircle /> <span><b>LIMITATIONS:</b> Used engine condition is inherently inconsistent - pricing reflects typical availability, not guaranteed quality. Rebuild quality varies by specialist - always verify experience and warranty terms.</span></p>
      <div className={additions.documentMeta}><span>Document ID: <b>EM-CMP-002-2026</b></span><i /> <span>Last updated: <b>18 June 2026</b></span><i /> <span>Status: <strong>Live dataset</strong></span></div>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.surface} ${styles.faq} ${additions.faqRefined}`}>
      <SectionHeading eyebrow="FREQUENTLY ASKED QUESTIONS">Common <span>questions</span> about used vs rebuilt engines</SectionHeading>
      <div className={additions.faqColumns}>{[guide.faqs.slice(0, 6), guide.faqs.slice(6, 12)].map((column, columnIndex) => <div className={additions.faqColumn} key={columnIndex}>{column.map((faq, itemIndex) => { const index = columnIndex * 6 + itemIndex; return <article key={faq.question} className={openFaq === index ? styles.open : ""}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><b>{index + 1}</b>{faq.question}<FaPlus /></button><p>{faq.answer}</p></article>; })}</div>)}</div>
    </section>

    <section className={`${styles.container} ${styles.section} ${styles.guides} ${additions.guidesRefined}`}>
      <SectionHeading eyebrow="RELATED COST GUIDES">Explore more engine <span>comparison information</span></SectionHeading>
      <div>{related.map((item, index) => <Link key={item} href={index < 2 ? "/prices" : "/compare"}><span className={additions.guideIcon}><RelatedIcon item={item} /></span><span>{item}</span><FaExternalLinkAlt /></Link>)}</div>
    </section>

    <section className={`${styles.container} ${styles.finalCta} ${additions.finalCtaRefined}`}>
      <div className={additions.finalCtaCopy}><h2>Get an accurate<br /><span>engine</span> replacement price</h2><p>Compare live UK engine supply &amp; fitting prices from vetted specialists. Fast, free and 100% independent.</p></div>
      <div className={additions.finalCtaFormWrap}><QuoteForm compact /><div className={additions.finalTrust}><span><FaCheck />Free comparison</span><span><FaCheck />No obligation</span><span><FaCheck />UK-wide network</span><span><FaCheck />Fast response</span></div></div>
      <div className={additions.ctaEngine}><Image src={engineImage} alt="Engine" width={270} height={175} /></div>
    </section>
  </main>;
}
