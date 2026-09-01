"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { FailureGuide } from "@/data/failureGuides";
import FailureSourceDetails from "./FailureSourceDetails";
import styles from "./FailureGuide.module.css";

const greenIcon = "/failures/egr-icons/dark-green/Dark%20Green/";
const blueIcon = "/failures/egr-icons/dark-blue/Dark%20Blue/";
const lightBlueIcon = "/failures/egr-icons/light-blue/Light%20blue/";
const whiteIcon = "/failures/egr-icons/white/White/";

function GuideIcon({ src, alt = "" }: { src: string; alt?: string }) {
  return <Image src={src} alt={alt} width={56} height={56} className={styles.iconImage} />;
}

function TrustRow() {
  return <div className={styles.trustRow} aria-label="Service statistics">
    <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}100%20Vetted%20Specialists%20Icon.png`} /></span><span><b>100+</b><small>UK specialist<br />suppliers</small></span></article>
    <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Instant%20Engine%20Replacement%20Quote.png`} /></span><span><b>24,650</b><small>real quotes<br />in 2025</small></span></article>
    <article className={styles.noSeparator}><span className={styles.poundMark}><GuideIcon src={`${lightBlueIcon}Pound%20Icon.png`} /></span><span><b>No</b><small>obligation</small></span></article>
  </div>;
}

export default function FailureGuide({ guide }: { guide: FailureGuide }) {
  const [activeStage, setActiveStage] = useState(0);
  const [mobileOpenStage, setMobileOpenStage] = useState<number | null>(0);
  const stage = guide.stages[activeStage];
  const activeCause = guide.causes[Math.min(activeStage, guide.causes.length - 1)];
  const faqs = guide.sourceDetails?.faqs ?? [];
  const isEgrGuide = guide.slug === "egr-failure";
  const quoteTitle = isEgrGuide
    ? "Get an EGR diagnostic or cleaning quote"
    : `Get a ${guide.name.toLowerCase()} diagnostic or quote`;
  const cleanIcon = isEgrGuide ? "/failures/egr-icons/EM_Icons/DGreen_Tick-01.png" : `${greenIcon}Warranty%20Minimum%20Standard.png`;
  const replacementIcon = isEgrGuide ? "/failures/egr-icons/EM_Icons/Engine/Blue_engine-01.png" : `${blueIcon}Engine%20Icon.png`;
  const quoteIcon = isEgrGuide ? "/failures/egr-icons/EM_Icons/Engine/DGreen_engine-01.png" : `${greenIcon}Engine%20Icon.png`;
  const preventionTips = guide.preventionTips ?? guide.prevention?.map((text, index) => ({ title: ["Regular checks", "Use the right driving conditions", "Use quality fluids", "Address faults promptly"][index] ?? "Preventative maintenance", text })) ?? [];
  const preventionComparison = guide.preventionComparison ?? { maintenanceCost: guide.costs[0]?.cost ?? "", maintenanceText: "Early diagnosis and routine care", catastrophicTitle: "CATASTROPHIC FAILURE", catastrophicCost: guide.costs.at(-1)?.cost ?? "", catastrophicText: "Major repair or replacement" };
  const related = [
    { label: `${guide.name} repair cost`, href: "/prices", icon: "Pound Icon.png" },
    { label: "DPF failure and cleaning guide", href: "/failures/dpf-failure", icon: "DPF Filter.png" },
    { label: "Turbo failure symptoms and costs", href: "/failures/turbo-failure", icon: "Turbo.png" },
    { label: "Engine diagnostics service", href: "/services/engine-diagnostics", icon: "Engine Icon.png" },
    { label: "Repair vs replacement decision tool", href: "/compare/repair-vs-replacement", icon: "Key Change Icon.png" },
  ];
  const consequences = guide.consequences ?? {
    text: `Ignoring warning signs can turn a contained ${guide.name.toLowerCase()} repair into wider engine damage and a much larger bill.`,
    downstream: guide.causes,
    escalation: guide.costs.map((cost, index) => ({ label: index === 0 ? "Early repair" : index === 1 ? "If delayed" : "Major damage", detail: cost.label, cost: cost.cost })),
    valueRules: [
      { value: "Lower-value vehicle", action: "Start with diagnosis and the lowest viable repair", reasoning: "A major repair can exceed a sensible share of the vehicle value." },
      { value: "Higher-value vehicle", action: "Repair or replacement may be viable", reasoning: "A verified repair can restore reliability and value." },
    ],
    valueNote: "Do not commit to major work until the fault and total repair route have been confirmed.",
  };

  return <main className={styles.page} data-egr={isEgrGuide ? "true" : undefined}>
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <h1 id="page-title">{guide.hero.title}<br /><span>{isEgrGuide ? "Symptoms, Cleaning &" : guide.hero.emphasis}</span>{isEgrGuide ? <><br />Replacement Cost Guide</> : null}</h1>
          <p className={styles.heroIntro}>{guide.hero.description}</p>
          <TrustRow />
        </div>
        <div className={styles.heroVisual} aria-label={`${guide.name} illustration and indicative prices`}>
          <Image src={guide.image} alt={guide.name} width={520} height={390} priority className={styles.heroImage} />
          <article className={`${styles.heroCost} ${styles.cleanCost}`}><span className={styles.iconShell}><GuideIcon src={cleanIcon} /></span><div><b>{guide.hero.primaryLabel}</b><strong>{guide.hero.primaryCost}</strong><p>{guide.hero.primaryNote}</p></div></article>
          <article className={`${styles.heroCost} ${styles.dangerCost}`}><span className={styles.iconShell}><GuideIcon src={replacementIcon} /></span><div><b>{guide.hero.severeLabel}</b><strong>{guide.hero.severeCost}</strong><p>{guide.hero.severeNote}</p></div></article>
        </div>
      </div>
      <div className={`${styles.container} ${styles.mobileHeroCosts}`} aria-label={`${guide.name} indicative mobile prices`}>
        <article className={styles.mobileHeroCost}>
          <span className={styles.iconShell}><GuideIcon src={cleanIcon} /></span>
          <div className={styles.mobileHeroCostLabel}><b>{guide.hero.primaryLabel}</b></div>
          <div className={styles.mobileHeroCostValue}><strong>{guide.hero.primaryCost}</strong><p>{guide.hero.primaryNote}</p></div>
          <span className={styles.mobileHeroChevron} aria-hidden="true">›</span>
        </article>
        <article className={styles.mobileHeroCost}>
          <span className={styles.iconShell}><GuideIcon src={replacementIcon} /></span>
          <div className={styles.mobileHeroCostLabel}><b>{guide.hero.severeLabel}</b></div>
          <div className={styles.mobileHeroCostValue}><strong>{guide.hero.severeCost}</strong><p>{guide.hero.severeNote}</p></div>
          <span className={styles.mobileHeroChevron} aria-hidden="true">›</span>
        </article>
      </div>
      <div className={`${styles.container} ${styles.quoteBar}`} id="quote">
        <div className={styles.quoteLabel}><span className={styles.iconShell}><GuideIcon src={quoteIcon} /></span><div><strong>{quoteTitle}</strong><span>Check symptoms first</span></div></div>
        <div className={styles.regForm}><label className={styles.numberPlate}><span className={styles.plateBand}><span>GB</span><small>UK</small></span><input aria-label="Vehicle registration" maxLength={8} placeholder="REG HERE" /></label><Link href="/get-a-quote" className={styles.quoteButton}>Get Quote <span>→</span></Link></div>
      </div>
    </section>

    <section className={styles.severity} aria-labelledby="severity-title">
      <div className={`${styles.container} ${styles.severityLayout}`}>
        <div className={styles.sectionHeading}><span className={styles.lightPill}>SYMPTOM TO COST - ESCALATION</span><h2 id="severity-title">Understanding The Severity<br />Of Your <span>{guide.name}</span></h2><p>Understanding the severity of this issue is critical to avoiding unnecessary replacement costs.</p></div>
        <div className={styles.stageGrid} role="tablist" aria-label={`${guide.name} severity stages`}>
          {guide.stages.map((item, index) => (
            <Fragment key={item.label}>
              <button
                type="button"
                role="tab"
                aria-selected={activeStage === index}
                aria-expanded={mobileOpenStage === index}
                className={`${styles.stageCard} ${activeStage === index ? styles.stageActive : ""}`}
                onClick={() => {
                  setActiveStage(index);
                  setMobileOpenStage((current) => current === index ? null : index);
                }}
              ><span>{item.label}</span><GuideIcon src={isEgrGuide && index === 0 ? cleanIcon : isEgrGuide && index === 2 ? "/failures/egr-icons/EM_Icons/Engine/DGreen_engine-01.png" : `${greenIcon}${index === 1 ? "crankshaft.png" : index === 2 ? "Engine%20Icon.png" : "Warranty%20Minimum%20Standard.png"}`} /><strong>{item.cost}</strong><p>{item.summary}</p><hr /><p><b>{item.detail}</b></p><em>{item.actionCost ?? item.cost}</em></button>
              {mobileOpenStage === index ? <div className={styles.mobileStageDetail}>
                <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Not%20Sure%20Icon.png`} /></span><div><h3>LIKELY CAUSE</h3><p>{item.cause ?? guide.causes[Math.min(index, guide.causes.length - 1)]?.text ?? ""}</p></div></article>
                <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Key%20Change%20Icon.png`} /></span><div><h3>WHAT TO DO</h3><p>{item.action ?? item.detail}</p></div></article>
                <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Pound%20Icon.png`} /></span><div><h3>REPAIR COST</h3><p>{item.repairCost ?? <><b>{item.cost}</b> is the typical cost band at this severity. Confirm the fault before authorising work.</>}</p></div></article>
              </div> : null}
            </Fragment>
          ))}
        </div>
      </div>
      <div className={`${styles.container} ${styles.stageDetail}`}>
        <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Not%20Sure%20Icon.png`} /></span><div><h3>LIKELY CAUSE</h3><p>{stage.cause ?? activeCause.text}</p></div></article>
        <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Key%20Change%20Icon.png`} /></span><div><h3>WHAT TO DO</h3><p>{stage.action ?? stage.detail}</p></div></article>
        <article><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Pound%20Icon.png`} /></span><div><h3>REPAIR COST</h3><p>{stage.repairCost ?? <><b>{stage.cost}</b> is the typical cost band at this severity. Confirm the fault before authorising work.</>}</p></div></article>
      </div>
      {guide.warning ? <aside className={`${styles.container} ${styles.warning}`}><span className={styles.iconShell}><GuideIcon src={`${lightBlueIcon}Not%20Sure%20Icon.png`} /></span><div><h3>{guide.warning.title}</h3><p>{guide.warning.text}</p></div></aside> : null}
    </section>

    <section className={styles.failureModes} aria-labelledby="failure-title">
      <div className={`${styles.container} ${styles.failureTop}`}>
        <div className={styles.failureIntro}><div className={styles.microLabel}><span /> {isEgrGuide ? "WHY EGR VALVES FAIL" : `WHY ${guide.name.toUpperCase()} HAPPENS`}</div><h2 id="failure-title">THE THREE COMMON<br /><span>FAILURE MODES</span></h2><p>{isEgrGuide ? "The EGR valve is designed to reduce nitrogen oxide (NOx) emissions by recirculating exhaust gas back into the combustion chamber. While effective, this process introduces soot and unburnt fuel into the intake system." : "Knowing why this fault develops helps distinguish a focused repair from a problem that has already affected the wider engine system."}</p></div>
        <div className={styles.failureVisual}><Image src={guide.image} alt="" width={280} height={230} /></div>
        <div className={styles.causeGrid}>{guide.causes.map((cause, index) => <article key={cause.title}><div className={styles.modeHead}><b>0{index + 1}</b><span className={styles.modeIcon}><GuideIcon src={`${blueIcon}${index === 1 ? "Engine%20Icon.png" : index === 2 ? "Injector.png" : "EGR%20Icon.png"}`} /></span></div><h3>{cause.title}</h3><p>{cause.text}</p></article>)}</div>
      </div>
      <div className={`${styles.container} ${styles.compactTrust}`}><TrustRow /></div>
      <div className={`${styles.container} ${styles.slimCta}`}><div><span className={styles.iconShell}><GuideIcon src={quoteIcon} /></span><p><b>{quoteTitle}</b><span>Check symptoms first</span></p></div><Link href="#quote" className={styles.quoteButton}>Get Quote <span>→</span></Link></div>
    </section>

    <section className={styles.decisionSection} aria-labelledby="decision-title"><div className={`${styles.container} ${styles.decision}`}><div className={styles.decisionIntro}><span>CLEAN / REPAIR VS REPLACE -<br />DECISION FRAMEWORK</span><h2 id="decision-title">{isEgrGuide ? <>NOT EVERY EGR FAULT<br />REQUIRES A NEW PART</> : <>NOT EVERY {guide.name.toUpperCase()}<br />NEEDS A NEW PART</>}</h2><div className={styles.shortLine} /><p>A proper diagnostic is essential to determine the most economical route.</p></div><div className={styles.decisionColumn}><div className={styles.decisionTitle}><span className={styles.iconShell}><GuideIcon src={`${greenIcon}Warranty%20Minimum%20Standard.png`} /></span><h3>{guide.decision.repairTitle}</h3></div><ul>{guide.decision.repair.map((item) => <li key={item}>{item}</li>)}</ul><p>{guide.decision.repairLabour}</p></div><span className={styles.orBadge}>OR</span><div className={styles.decisionColumn}><div className={styles.decisionTitle}><span className={styles.iconShell}><GuideIcon src={replacementIcon} /></span><h3>{guide.decision.replaceTitle}</h3></div><ul className={styles.blueChecks}>{guide.decision.replace.map((item) => <li key={item}>{item}</li>)}</ul><p>{guide.decision.replaceLabour}</p></div></div></section>

    <section className={styles.domino} aria-labelledby="consequence-title"><div className={`${styles.container} ${styles.dominoGrid}`}><div className={styles.dominoCopy}><span className={styles.microHeading}>CONSEQUENCES OF DELAY</span><h2 id="consequence-title">THE <span>DOMINO EFFECT</span></h2><p>{consequences.text}</p><div className={styles.downstreamCard}><h3>{isEgrGuide ? "CARBON SPREADS DOWNSTREAM" : "FAULTS CAN SPREAD DOWNSTREAM"}</h3><div className={styles.downstreamFlow}>{consequences.downstream.map((item, index) => <span className={styles.downstreamItem} key={item.title}><article><span className={styles.iconShell}><GuideIcon src={`${greenIcon}${index === 1 ? "DPF%20Filter.png" : index === 2 ? "Turbo.png" : "Engine%20Icon.png"}`} /></span><h4>{item.title}</h4><p>{item.text}</p></article>{isEgrGuide && index < consequences.downstream.length - 1 ? <i>→</i> : null}</span>)}</div></div></div><article className={styles.escalationCard}><h3>THE COST ESCALATION</h3>{consequences.escalation.map((item, index) => <div className={styles.timelineItem} key={item.label}><span className={styles.timelineIcon}><GuideIcon src={`${whiteIcon}${index === 1 ? "DPF%20Filter.png" : index === 2 ? "Turbo.png" : "Engine%20Icon.png"}`} /></span><div><b>{item.label}</b><small>{item.detail}</small></div><strong>{item.cost}</strong></div>)}<p>{isEgrGuide ? "Addressing carbon build-up early can help prevent more costly intake manifold, DPF and turbo repairs." : "Addressing the underlying fault early can prevent more expensive secondary repairs."}</p></article><article className={styles.engineTableCard}><h3><span>RED FLAG ENGINES -</span><br />KNOWN FAILURE PATTERNS</h3><p>{isEgrGuide ? "Engines with known EGR issues" : "Vehicles that warrant a prompt specialist diagnosis."}</p><div className={styles.tableScroll}><table><thead><tr><th>ENGINE / VEHICLE</th><th>{isEgrGuide ? "HIGH RISK MILEAGE" : "YEARS"}</th><th>{isEgrGuide ? "REQUEST VOLUME" : "RISK"}</th></tr></thead><tbody>{guide.riskModels.map((risk) => <tr key={risk.model}><td>{risk.model}</td><td>{risk.years}</td><td>{isEgrGuide ? <><b>{risk.request}</b><small>[EM-VERIFIED]</small></> : risk.risk}</td></tr>)}</tbody></table></div></article></div><div className={`${styles.container} ${styles.vehicleValue}`}><div className={styles.valueCopy}><span className={styles.microHeading}>VEHICLE VALUE<br />THRESHOLD RULE</span><h2>IS {isEgrGuide ? "EGR " : ""}REPAIR<br /><span>ECONOMICAL?</span></h2><div className={styles.shortLine} /><p>Compare the viable repair cost with the vehicle&apos;s current market value before committing.</p></div><div className={styles.valueTableWrap}><div className={styles.tableScroll}><table><thead><tr><th>VEHICLE VALUE</th><th>RECOMMENDED ACTION</th><th>REASONING</th></tr></thead><tbody>{consequences.valueRules.map((rule) => <tr key={rule.value}><td>{rule.value}</td><td>{isEgrGuide ? <span className={styles.valueTick}>✓</span> : null}{rule.action}</td><td>{rule.reasoning}</td></tr>)}</tbody></table></div><p>{consequences.valueNote}</p></div></div></section>

    {preventionTips.length ? <section className={styles.prevention} aria-labelledby="prevention-title"><div className={`${styles.container} ${styles.preventionTop}`}><div className={styles.preventionCopy}><span className={styles.pill}>PREVENTATIVE MAINTENANCE</span><h2 id="prevention-title">Avoiding<br /><span>{isEgrGuide ? "EGR Failure" : guide.name}</span></h2><p>{isEgrGuide ? "You cannot entirely prevent EGR operation, but you can significantly reduce the rate of carbon build-up by following these specialist recommendations." : "You cannot always prevent a component fault, but these practical steps can reduce the chance of avoidable damage."}</p></div><div className={styles.preventionList}>{preventionTips.slice(0, 4).map((tip, index) => <article key={tip.title}><b>0{index + 1}</b><span className={styles.tipIcon}><GuideIcon src={`${whiteIcon}${index === 1 ? "Diesel%20Engine.png" : index === 2 ? "Injector.png" : index === 3 ? "Not%20Sure%20Icon.png" : "Car%20Icon.png"}`} /></span><h3>{tip.title}</h3><p>{tip.text}</p></article>)}</div></div><div className={`${styles.container} ${styles.costCompare}`}><article><span className={styles.iconShell}><GuideIcon src={`${greenIcon}Warranty%20Minimum%20Standard.png`} /></span><div><b>PREVENTATIVE MAINTENANCE</b><strong>{preventionComparison.maintenanceCost}</strong><p>{preventionComparison.maintenanceText}</p></div></article><Image src={guide.image} alt="" width={210} height={160} /><article><span className={`${styles.iconShell} ${styles.dangerShell}`}><GuideIcon src={`${greenIcon}Not%20Sure%20Icon.png`} /></span><div><b>{preventionComparison.catastrophicTitle}</b><strong>{preventionComparison.catastrophicCost}</strong><p>{preventionComparison.catastrophicText}</p></div></article><div className={styles.compareRibbon}><GuideIcon src={`${whiteIcon}Pound%20Icon.png`} />Prevention is always <b>cheaper</b> than replacement.</div></div></section> : null}

    {guide.slug !== "egr-failure" && guide.sourceDetails ? <FailureSourceDetails details={guide.sourceDetails} guideName={guide.name} hideFaqs /> : null}

    {faqs.length ? <section className={styles.faq} aria-labelledby="faq-title"><div className={styles.container}><span className={styles.pill}>FREQUENTLY ASKED QUESTIONS</span><h2 id="faq-title">Common <span>Questions</span> Answered</h2><div className={styles.faqGrid}>{[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map((column, columnIndex) => <div key={columnIndex}>{column.map((faq, index) => <details key={faq.question}><summary><span>{columnIndex * Math.ceil(faqs.length / 2) + index + 1}</span>{faq.question}<b>+</b></summary><p>{faq.answer}</p></details>)}</div>)}</div></div></section> : null}

    <section className={styles.related}><div className={styles.container}><span className={styles.pill}>RELATED COST GUIDES & DIAGNOSTICS</span><div className={styles.relatedGrid}>{related.map((item) => <Link href={item.href} key={item.label}><GuideIcon src={`${greenIcon}${item.icon}`} /><b>{item.label}</b><span>↗</span></Link>)}</div></div></section>

    <section className={styles.finalCta}><div className={`${styles.container} ${styles.finalInner}`}><div className={styles.ctaQuestion}><h2>{guide.cta.question}</h2></div><div className={styles.ctaCopy}><h3>{guide.cta.title}<br />{guide.cta.emphasis ? <span>{guide.cta.emphasis}</span> : null}</h3><p>{isEgrGuide ? "Before you commit to a costly replacement, get a professional diagnostic. In most cases, a simple EGR clean can restore your vehicle's performance for a fraction of the price. Compare fixed-price EGR cleaning and replacement quotes from 100+ vetted UK specialists." : "Before committing to major work, get a professional diagnosis and compare repair or replacement options from vetted UK specialists."}</p></div><div className={styles.ctaAction}><Link href="#quote" className={styles.finalButton}><GuideIcon src={`${whiteIcon}${isEgrGuide ? "EGR%20Icon.png" : "Engine%20Icon.png"}`} /><b>{isEgrGuide ? <>Get a free EGR diagnostic<br />or replacement quote</> : <>Get a free diagnostic<br />or replacement quote</>}</b><span>→</span></Link><div className={styles.benefits}><span><GuideIcon src={`${whiteIcon}Not%20Sure%20Icon.png`} /><small>Free<br />No obligation</small></span><span><GuideIcon src={`${whiteIcon}100%20Vetted%20Specialists%20Icon.png`} /><small>100+<br />UK specialists</small></span><span><GuideIcon src={`${whiteIcon}Instant%20Engine%20Replacement%20Quote.png`} /><small>24,650<br />real UK quotes<br />in 2025</small></span></div></div><p className={styles.disclaimer}><span className={styles.disclaimerIcon}>i</span>No obligation · Based on 24,650 real UK quotes in 2025 · Engines Market is a comparison platform — we connect you with suppliers, we do not supply or fit parts.</p></div></section>
  </main>;
}
