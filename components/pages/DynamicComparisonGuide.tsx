"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCar, FaClock, FaExclamationTriangle, FaExchangeAlt, FaEye, FaGlobeEurope, FaLink, FaMoneyBillWave, FaRegCommentDots, FaShieldAlt, FaStar, FaTag, FaTools, FaUsers } from "react-icons/fa";
import type { StaticComparisonGuide } from "@/data/staticComparisonGuides";
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

function QuoteForm({ compact = false }: { compact?: boolean }) {
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
      <button>Compare real quotes <b className={styles.buttonArrow} aria-hidden="true" /></button>
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
  const [expanded, setExpanded] = useState<number | null>(null);
  const eyebrow = guide.eyebrow.includes("[EM-VERIFIED]") ? guide.eyebrow : `${guide.eyebrow} [EM-VERIFIED]`;
  return <main className={`${styles.page} ${brand.em}`}>
    <section className={`${styles.hero} ${brand.hero}`}><div className={styles.container}><p className={styles.eyebrow}>{eyebrow}</p><div className={styles.heroGrid}><div><h1>{guide.heading}</h1><i /><p>{highlightHeroPrices(guide.lead)}</p><div className={`${styles.trust} ${brand.trust}`}><span><Image src={icons.specialists} alt="" width={26} height={26} />100+ UK specialists</span><span><Image src={icons.quotes} alt="" width={26} height={26} />24,650 quote requests</span><span><Image src={icons.warranty} alt="" width={26} height={26} />No obligation</span></div></div><div className={styles.visual}><Image src={engineImage} alt="Engine assembly" width={390} height={255} priority /><span /><aside className={styles.heroStats}><article><b>24,650</b><small>Real quote requests<br />in 2025</small></article><article><b>5.2 days</b><small>Average quote-to-delivery<br />timeline</small></article></aside></div></div><div className={`${styles.optionGrid} ${brand.optionGrid}`}>{guide.options.map((option) => { const OptionIcon = getOptionIcon(option); return <article key={option.label}><span className={styles.optionIcon}><OptionIcon /></span><div><b>{option.label}</b><strong>{option.amount}</strong><small>{option.detail}</small></div></article>; })}</div><QuoteForm /></div></section>

    <section className={styles.aboutCard}>
      <div className={styles.aboutCopy}>
        <p className={styles.aboutEyebrow}>ABOUT THIS DATA · OUR METHODOLOGY</p>
        <p>This guide is based on <b>24,650</b> real UK engine replacement quote requests submitted through Engines Market between January and December 2025. Every quote comes from a real UK vehicle owner; supplier prices are anonymised and aggregated.</p>
      </div>
      <div className={styles.aboutLegend}>
        {methodologyItems.map((item) => <article key={item.label}><span className={styles.aboutIcon}><item.Icon /></span><div><b>{item.label}</b><p>{item.text}</p></div></article>)}
      </div>
      <div className={styles.aboutMap}><Image src={ukMapImage} alt="Map of the United Kingdom" width={360} height={460} /></div>
      <footer className={styles.aboutFooter}>
        <span>Document ID: <b>EM-CMP-2026</b></span>
        <span>Last updated: <b>18 June 2026</b></span>
        <strong>Status: Live dataset</strong>
      </footer>
    </section>

    <div className={styles.content}>{guide.sections.map((section, index) => {
      const isDecisionTable = /instant decision table/i.test(section.eyebrow);
      if (isDecisionTable) return <section className={styles.decisionPanel} key={`${section.heading}-${index}`}>
        {section.tables.map((table, tableIndex) => <div className={styles.decisionTable} key={`${section.heading}-table-${tableIndex}`}><table><thead><tr>{table.headers.map((header, headerIndex) => <th className={headerIndex === 0 ? styles.factorHeading : ""} key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => { const Icon = getDecisionIcon(row[0] ?? ""); return <tr key={rowIndex}>{row.map((cell, cellIndex) => <td className={cellIndex === 0 ? styles.decisionFactor : isDecisionAccent(cell) ? styles.decisionAccent : styles.decisionValue} key={cell}>{cellIndex === 0 ? <span><Icon />{cell}</span> : cell}</td>)}</tr>; })}</tbody></table></div>)}
      </section>;
      const hasAdditionalContent = section.paragraphs.length > 1 || section.subheadings.length > 0 || section.bullets.length > 0;
      return <section className={`${styles.section} ${brand.section}`} key={`${section.heading}-${index}`}><header><Image src={icons.car} alt="" width={24} height={24} /><div><p>{section.eyebrow}</p><h2>{section.heading}</h2></div></header>{section.paragraphs.length > 0 ? <div className={`${styles.copy} ${brand.copy}`}><p>{section.paragraphs[0]}</p></div> : null}{section.tables.map((table, tableIndex) => <div className={`${styles.tableWrap} ${brand.tableWrap}`} key={`${section.heading}-table-${tableIndex}`}><table><thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>)}{hasAdditionalContent ? <button className={`${styles.more} ${brand.more}`} type="button" onClick={() => setExpanded(expanded === index ? null : index)}>{expanded === index ? "Show less" : "Read section"} <b>→</b></button> : null}{expanded === index ? <div className={styles.expanded}>{section.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.subheadings.map((subheading) => <h3 key={subheading}>{subheading}</h3>)}{section.bullets.length > 0 ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</div> : null}</section>;
    })}</div>

    <section className={`${styles.container} ${styles.finalCta} ${brand.finalCta}`}><div><p>COMPARE LIVE UK PRICES</p><h2>Find the right engine<br /><span>for your vehicle</span></h2><small>Compare supply, fitting, repair and specialist quotes from vetted UK suppliers.</small></div><QuoteForm compact /><Image src={engineImage} alt="Engine" width={270} height={170} /></section>
  </main>;
}
