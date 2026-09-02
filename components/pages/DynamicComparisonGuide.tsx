"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCar, FaClock, FaExclamationTriangle, FaExchangeAlt, FaExternalLinkAlt, FaEye, FaGlobeEurope, FaLink, FaMoneyBillWave, FaPlus, FaRegCommentDots, FaShieldAlt, FaStar, FaTag, FaTools, FaUsers } from "react-icons/fa";
import type { StaticComparisonGuide } from "@/data/staticComparisonGuides";
import shared from "./ComparisonGuide.module.css";
import styles from "./DynamicComparisonGuide.module.css";
import brand from "./DynamicComparisonGuideBrand.module.css";

const engineImage = "/images/shared/hero-engines/temporary-performance-engine-cutout.png";
const plateBandImage = "/failures/img/gb.webp";
const ukMapImage = "/images/compare/uk-map-dots-alpha-v2.png";
const icons = {
  specialists: "/icons/engine-market/white-vetted-specialists.png",
  quotes: "/icons/engine-market/white-calendar-icon.png",
  warranty: "/icons/engine-market/white-warranty.png",
  car: "/icons/engine-market/dark-blue-car.png",
};

const methodologyItems = [
  { label: "[EM-VERIFIED]", text: "Exact count or percentage from our CRM", Icon: FaShieldAlt },
  { label: "[EM-OBSERVED]", text: "Observed patterns from our platform data", Icon: FaEye },
  { label: "[EM-QUOTE]", text: "Derived from supplier quotes & interviews", Icon: FaRegCommentDots },
  { label: "[EM-INTERVIEW]", text: "Workshop interviews with 100+ UK specialists", Icon: FaUsers },
  { label: "[THIRD-PARTY]", text: "External data from named industry sources", Icon: FaGlobeEurope },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.arrowIcon} fill="none" aria-hidden="true">
      <path d="m4 5 7 7-7 7M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.lockIcon} fill="none" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10.5V8.3a4 4 0 1 1 8 0v2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function highlightHeroPrices(value: string) {
  return value.split(/(£[\d,]+(?:-£[\d,]+)?\+?)/g).map((part, index) =>
    part.startsWith("£") ? <span className={styles.heroPrice} key={`${part}-${index}`}>{part}</span> : part,
  );
}

function getOptionIcon(option: StaticComparisonGuide["options"][number]) {
  const label = option.label;
  const copy = `${label} ${option.amount} ${option.detail}`;
  if (/matching|preserved|original/i.test(label)) return FaShieldAlt;
  if (/replacement|exchange|reconditioned/i.test(label)) return FaExchangeAlt;
  if (/rebuild|rebuilt|restoration|repair/i.test(label)) return FaTools;
  if (/used|budget/i.test(label)) return FaTag;
  if (/downtime|turnaround|days|weeks|time/i.test(copy)) return FaClock;
  if (/warranty|protection/i.test(copy)) return FaShieldAlt;
  return FaTag;
}

function getDecisionIcon(factor: string) {
  if (/warranty/i.test(factor)) return FaShieldAlt;
  if (/off-road/i.test(factor)) return FaCar;
  if (/best for/i.test(factor)) return FaStar;
  if (/risk/i.test(factor)) return FaExclamationTriangle;
  if (/matching/i.test(factor)) return FaLink;
  if (/fitted|labour/i.test(factor)) return FaTools;
  return FaMoneyBillWave;
}

function isDecisionAccent(value: string) {
  return /£|preserved/i.test(value);
}

function QuoteForm({ compact = false, buttonLabel = "Compare real quotes" }: { compact?: boolean; buttonLabel?: string }) {
  const form = (
    <form className={`${styles.quoteForm}${compact ? ` ${styles.quoteFormCompact}` : ""}`} action="/get-a-quote" method="get">
      <label className={styles.regField}>
        <span className={styles.plateBand}>
          <img src={plateBandImage} alt="" aria-hidden="true" />
        </span>
        <input name="reg" aria-label="Vehicle registration number" placeholder="ENTER YOUR REG" />
        {compact ? null : <small className={styles.regHint}>e.g. AB12 CDE</small>}
      </label>
      {compact ? null : <i className={styles.quoteArrow} aria-hidden="true"><ArrowIcon /></i>}
      <button>{buttonLabel} <b className={styles.buttonArrow} aria-hidden="true" /></button>
    </form>
  );

  if (compact) return form;

  return (
    <div className={styles.quoteCard}>
      {form}
      <div className={styles.quoteDetails}>
        <p className={styles.secure}><LockIcon />Secure enquiry · no spam · genuine quotes from vetted UK engine suppliers.</p>
      </div>
    </div>
  );
}

export default function DynamicComparisonGuide({ guide }: { guide: StaticComparisonGuide }) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const eyebrow = guide.eyebrow.includes("[EM-VERIFIED]") ? guide.eyebrow : `${guide.eyebrow} [EM-VERIFIED]`;
  return <main className={`${styles.page} ${brand.em}`}>
    <section className={`${styles.hero} ${brand.hero}`}><div className={styles.container}><p className={styles.eyebrow}>{eyebrow}</p><div className={styles.heroGrid}><div><h1>{guide.heading}</h1><i /><p>{highlightHeroPrices(guide.lead)}</p><div className={`${styles.trust} ${brand.trust}`}><span><Image src={icons.specialists} alt="" width={26} height={26} />100+ UK specialists</span><span><Image src={icons.quotes} alt="" width={26} height={26} />24,650 quote requests</span><span><Image src={icons.warranty} alt="" width={26} height={26} />No obligation</span></div></div><div className={styles.visual}><Image src={engineImage} alt="Engine assembly" width={390} height={255} priority /><span /><aside className={styles.heroStats}><article><b>24,650</b><small>Real quote requests<br />in 2025</small></article><article><b>5.2 days</b><small>Average quote-to-delivery<br />timeline</small></article></aside></div></div><div className={`${styles.optionGrid} ${brand.optionGrid} ${guide.options.length === 2 ? styles.twoOptions : ""}`}>{guide.options.map((option) => { const OptionIcon = getOptionIcon(option); return <article key={option.label}><span className={styles.optionIcon}><OptionIcon /></span><div><b>{option.label}</b><strong>{option.amount}</strong><small>{option.detail}</small></div></article>; })}</div><QuoteForm /></div></section>

    <section className={`${shared.container} ${shared.section} ${shared.method} ${styles.methodology}`}>
      <header className={shared.heading}><div><p>DATA CONFIDENCE &amp; METHODOLOGY</p><h2>How we build this guide</h2><span>This comparison uses source-page data, supplier intelligence and verified Engines Market quote information.</span></div></header>
      <div>
        <article><h3><FaShieldAlt /> Confidence levels</h3>{[["Pricing accuracy", "High"], ["Regional labour accuracy", "Medium-High"], ["Used engine condition", "High uncertainty"], ["Rebuild pricing stability", "High"], ["Downtime estimates", "Medium"]].map(([label, value]) => <span key={label}><b>{label}</b><em>{value}</em></span>)}</article>
        <article><h3><FaRegCommentDots /> Source data</h3>{methodologyItems.map((item) => <span key={item.label}><item.Icon /><div><b>{item.label}</b><em>{item.text}</em></div></span>)}</article>
        <article><h3><FaGlobeEurope /> Data tiers</h3><span><b>Tier A</b>24,650 quote requests - primary authority</span><span><b>Tier B</b>Derived metrics - risk analysis, trends</span><span><b>Tier C</b>External validation - labour rates, inflation</span></article>
      </div>
      <p className={shared.limits}><FaExclamationTriangle />LIMITATIONS: Individual vehicle condition and regional labour rates vary. Always verify availability, warranty and final fitting costs with your chosen supplier.</p>
      <footer className={styles.methodologyFooter}><span>Document ID: <b>EM-CMP-2026</b></span><span>Last updated: <b>18 June 2026</b></span><strong>Status: Live dataset</strong></footer>
    </section>

    <div className={`${shared.container} ${styles.content}`}>{guide.sections.map((section, index) => {
      const isDecisionTable = /instant decision table/i.test(section.eyebrow);
      if (isDecisionTable) return <section className={styles.decisionPanel} key={`${section.heading}-${index}`}>
        {section.tables.map((table, tableIndex) => <div className={styles.decisionTable} key={`${section.heading}-table-${tableIndex}`}><table><thead><tr>{table.headers.map((header, headerIndex) => <th className={headerIndex === 0 ? styles.factorHeading : ""} key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => { const Icon = getDecisionIcon(row[0] ?? ""); return <tr key={rowIndex}>{row.map((cell, cellIndex) => <td className={cellIndex === 0 ? styles.decisionFactor : isDecisionAccent(cell) ? styles.decisionAccent : styles.decisionValue} key={cell}>{cellIndex === 0 ? <span><Icon />{cell}</span> : cell}</td>)}</tr>; })}</tbody></table></div>)}
      </section>;
      if (section.faqs.length > 0) return <section className={`${shared.section} ${shared.surface} ${shared.faq} ${styles.section}`} key={`${section.heading}-${index}`}><header className={shared.heading}><Image src={icons.car} alt="" width={24} height={24} /><div><p>{section.eyebrow}</p><h2>{section.heading}</h2></div></header><div>{section.faqs.map((faq, faqIndex) => { const key = `${index}-${faqIndex}`; return <article key={key} className={openFaq === key ? shared.open : ""}><button type="button" onClick={() => setOpenFaq(openFaq === key ? null : key)}><b>{faqIndex + 1}</b>{faq.question}<FaPlus /></button><p>{faq.answer}</p></article>; })}</div></section>;
      if (section.relatedLinks.length > 0) return <section className={`${shared.section} ${shared.guides} ${styles.section}`} key={`${section.heading}-${index}`}><header className={shared.heading}><Image src={icons.car} alt="" width={24} height={24} /><div><p>{section.eyebrow}</p><h2>{section.heading}</h2></div></header><div>{section.relatedLinks.map((link) => <Link href={link.href} key={`${link.href}-${link.label}`}><FaLink /><span>{link.label}</span><FaExternalLinkAlt /></Link>)}</div></section>;
       const groupedBullets = section.comparisonGroups.length > 1;
       const hasComparisonCards = section.contentCards.length > 1;
       const isDataModule = /market|intelligence|data|confidence|methodology/i.test(section.eyebrow);
       const isRiskModule = /risk|failure|truth|reality/i.test(section.eyebrow);
       return <section className={`${shared.section} ${groupedBullets || hasComparisonCards ? styles.comparisonModule : shared.surface} ${styles.section} ${brand.section} ${isDataModule ? styles.dataModule : ""} ${isRiskModule ? styles.riskModule : ""}`} key={`${section.heading}-${index}`}><header className={shared.heading}><Image src={icons.car} alt="" width={24} height={24} /><div><p>{section.eyebrow}</p><h2>{section.heading}</h2></div></header>{section.paragraphs.length > 0 ? <div className={`${styles.copy} ${brand.copy}`}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : null}{hasComparisonCards ? <div className={styles.comparisonColumns}>{section.contentCards.map((card) => <article key={card.heading}><h3>{card.heading}</h3>{card.highlight ? <strong>{card.highlight}</strong> : null}<ul>{card.lines.map((line) => <li key={line}>{line}</li>)}</ul></article>)}</div> : groupedBullets ? <div className={styles.comparisonColumns}>{section.comparisonGroups.map((group) => <article key={group.heading}><h3>{group.heading}</h3><ul>{group.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div> : <>{section.subheadings.length > 0 ? <div className={styles.sectionDetails}>{section.subheadings.map((subheading) => <h3 key={subheading}>{subheading}</h3>)}</div> : null}{section.bullets.length > 0 ? <ul className={styles.sectionBullets}>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</>}{section.tables.map((table, tableIndex) => <div className={`${shared.tableWrap} ${styles.tableWrap} ${brand.tableWrap}`} key={`${section.heading}-table-${tableIndex}`}><table><thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>)}</section>;
    })}</div>

    <section className={`${styles.container} ${styles.finalCta} ${brand.finalCta}`}><div><p>{guide.finalCta.eyebrow}</p><h2>{guide.finalCta.heading}</h2><small>{guide.finalCta.copy}<br />{guide.finalCta.trust}</small></div><QuoteForm compact buttonLabel={guide.finalCta.buttonLabel} /><Image src={engineImage} alt="Engine" width={270} height={170} /></section>
  </main>;
}
