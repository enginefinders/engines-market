"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBalanceScale, FaCar, FaChartBar, FaCheck, FaChevronRight, FaClock, FaDatabase, FaExclamationTriangle, FaExternalLinkAlt, FaEye, FaInfoCircle, FaLink, FaMoneyBillWave, FaPlus, FaShieldAlt, FaTag, FaTools, FaUsers } from "react-icons/fa";
import type { StaticComparisonGuide, StaticComparisonSection } from "@/data/staticComparisonGuides";
import base from "./ComparisonGuide.module.css";
import additions from "./ComparisonGuideAdditions.module.css";
import dynamic from "./DynamicComparisonGuide.module.css";
import brand from "./DynamicComparisonGuideBrand.module.css";

const engineImage = "/images/shared/hero-engines/temporary-performance-engine-cutout.png";
const ukMapImage = "/images/compare/uk-map-dots-alpha-v2.png";
const emIcons = {
  specialists: "/icons/engine-market/white-vetted-specialists.png",
  quotes: "/icons/engine-market/white-calendar-icon.png",
  warranty: "/icons/engine-market/white-warranty.png",
  car: "/icons/engine-market/dark-blue-car.png",
};
const methodologyItems = [
  { label: "[EM-VERIFIED]", copy: "Exact count or percentage from our CRM", Icon: FaShieldAlt },
  { label: "[EM-OBSERVED]", copy: "Observed patterns from our platform data", Icon: FaEye },
  { label: "[EM-QUOTE]", copy: "Derived from supplier quotes and interviews", Icon: FaMoneyBillWave },
  { label: "[EM-INTERVIEW]", copy: "Workshop interviews with UK specialists", Icon: FaUsers },
  { label: "[THIRD-PARTY]", copy: "External named industry sources", Icon: FaDatabase },
];

function OptionIcon({ label }: { label: string }) {
  if (/used|budget|petrol/i.test(label)) return <FaTag />;
  if (/rebuild|repair|specialist/i.test(label)) return <FaTools />;
  if (/warranty|matching|new/i.test(label)) return <FaShieldAlt />;
  return <FaBalanceScale />;
}

function RowIcon({ label }: { label: string }) {
  if (/warranty|insurance|protection/i.test(label)) return <FaShieldAlt />;
  if (/time|off-road|mile|journey|delivery/i.test(label)) return <FaClock />;
  if (/cost|price|fuel|labour/i.test(label)) return <FaMoneyBillWave />;
  if (/risk|emission|ulez/i.test(label)) return <FaExclamationTriangle />;
  if (/repair|component|engine/i.test(label)) return <FaTools />;
  return <FaCar />;
}

function SourceHeading({ section }: { section: StaticComparisonSection }) {
  return <header className={base.heading}>
    <p>{section.eyebrow}</p>
    <h2>{section.heading}</h2>
  </header>;
}

function QuoteForm({ compact = false, buttonLabel = "Compare real quotes" }: { compact?: boolean; buttonLabel?: string }) {
  if (compact) {
    return <form className={base.quoteCompact} action="/get-a-quote" method="get">
      <label><span className={additions.compactFlag}><img src="/failures/img/gb.webp" alt="" aria-hidden="true" /></span><input name="reg" aria-label="Vehicle registration number" placeholder="Enter your registration number" /></label>
      <button>{buttonLabel}<FaChevronRight /></button>
    </form>;
  }

  return <div className={dynamic.quoteCard}>
    <form className={dynamic.quoteForm} action="/get-a-quote" method="get">
      <label className={dynamic.regField}><span className={dynamic.plateBand}><img src="/failures/img/gb.webp" alt="" aria-hidden="true" /></span><input name="reg" aria-label="Vehicle registration number" placeholder="ENTER YOUR REG" /><small className={dynamic.regHint}>e.g. AB12 CDE</small></label>
      <i className={dynamic.quoteArrow} aria-hidden="true">&raquo;</i>
      <button>{buttonLabel}<b className={dynamic.buttonArrow} aria-hidden="true" /></button>
    </form>
    <div className={dynamic.quoteDetails}><p className={dynamic.secure}>Secure enquiry · no spam · genuine quotes from vetted UK engine suppliers.</p></div>
  </div>;
}

function renderTable(section: StaticComparisonSection, table: StaticComparisonSection["tables"][number], tableIndex: number) {
  const regional = /regional|where you live|location/i.test(`${section.eyebrow} ${section.heading}`);
  const technical = /technical|component|breakdown/i.test(`${section.eyebrow} ${section.heading}`) && table.headers.length === 3;
  if (technical) {
    return <div className={base.techGrid} key={tableIndex}>
      {table.headers.map((header, columnIndex) => <div className={base.techColumn} key={header}><b>{header}</b>{table.rows.map((row, rowIndex) => <span key={`${rowIndex}-${row[columnIndex]}`}><RowIcon label={row[0] ?? ""} />{row[columnIndex] ?? ""}</span>)}</div>)}
    </div>;
  }
  const tableMarkup = <div className={base.tableWrap}><table><thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === 0 ? <span className={base.decisionFactor}><RowIcon label={cell} />{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>;
  return regional ? <section className={`${base.regional} ${additions.regional}`} key={tableIndex}><div className={base.regionalMap}><Image className={additions.regionalMap} src={ukMapImage} alt="Map of the United Kingdom" width={420} height={560} /></div><div>{tableMarkup}</div></section> : <div key={tableIndex}>{tableMarkup}</div>;
}

export default function SharedComparisonGuide({ guide }: { guide: StaticComparisonGuide }) {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const eyebrow = guide.eyebrow.includes("[EM-VERIFIED]") ? guide.eyebrow : `${guide.eyebrow} · [EM-VERIFIED]`;
  const contentSections = guide.sections.filter((section) => section.faqs.length === 0 && section.relatedLinks.length === 0);
  const faqSection = guide.sections.find((section) => section.faqs.length > 0);
  const relatedSection = guide.sections.find((section) => section.relatedLinks.length > 0);

  return <main className={`${base.page} ${additions.emTypography} ${dynamic.page} ${brand.em}`}>
    <section className={`${dynamic.hero} ${brand.hero}`}><div className={dynamic.container}>
      <p className={dynamic.eyebrow}>{eyebrow}</p>
      <div className={dynamic.heroGrid}><div><h1>{guide.heading}</h1><i /><p>{guide.lead}</p><div className={`${dynamic.trust} ${brand.trust}`}><span><Image src={emIcons.specialists} alt="" width={26} height={26} />100+ UK specialists</span><span><Image src={emIcons.quotes} alt="" width={26} height={26} />24,650 quote requests</span><span><Image src={emIcons.warranty} alt="" width={26} height={26} />No obligation</span></div></div><div className={dynamic.visual}><Image src={engineImage} alt="Engine assembly" width={390} height={255} priority /><span /><aside className={dynamic.heroStats}><article><b>24,650</b><small>Real quote requests<br />in 2025</small></article><article><b>UK</b><small>Comparison guide<br />data</small></article></aside></div></div>
      <div className={`${dynamic.optionGrid} ${brand.optionGrid} ${guide.options.length === 2 ? dynamic.twoOptions : ""}`}>{guide.options.map((option) => <article key={option.label}><span className={dynamic.optionIcon}><OptionIcon label={option.label} /></span><div><b>{option.label}</b><strong>{option.amount}</strong><small>{option.detail}</small></div></article>)}</div>
      <QuoteForm buttonLabel={guide.finalCta.buttonLabel} />
    </div></section>

    <section className={`${base.container} ${base.section} ${base.about} ${additions.methodology}`}><div><p className={base.eyebrow}>ABOUT THIS DATA · OUR METHODOLOGY</p><p>{guide.description || guide.lead}</p></div><div className={base.legend}>{methodologyItems.map(({ label, copy, Icon }) => <span key={label}><Icon /><b>{label}</b>{copy}</span>)}</div><div className={base.map}><Image className={additions.ukMap} src={ukMapImage} alt="Map of the United Kingdom" width={420} height={560} /></div><footer>Document ID: <b>EM-CMP-2026</b> · Last updated: <b>18 June 2026</b> · <strong>Status: Live dataset</strong></footer></section>

    {contentSections.map((section, sectionIndex) => {
      const hasTables = section.tables.length > 0;
      const hasComparisonContent = section.comparisonGroups.length > 1 || section.contentCards.length > 1;
      const isDecision = /decision|side by side|comparison|at a glance/i.test(`${section.eyebrow} ${section.heading}`) && hasTables;
      const sectionName = `${section.eyebrow} ${section.heading}`;
      const groups = section.comparisonGroups.concat(section.contentCards.map((card) => ({ heading: card.heading, bullets: [card.highlight, ...card.lines].filter(Boolean) })));
      const isDecisionFramework = /choose|which option|decision framework/i.test(sectionName) && groups.length > 1;
      const isScenario = /scenario|what would you do|case/i.test(sectionName) && (groups.length > 0 || section.subheadings.length > 1);
      const isRisk = /risk|truth|reality|could go wrong/i.test(sectionName) && groups.length > 1;
      const isMarket = /market intelligence|quote requests|satisfaction|data reveals/i.test(sectionName);
      const isTechnical = /technical|detailed breakdown|component|numbers/i.test(sectionName) && hasTables;
      const isPrice = /price|costs/i.test(sectionName) && hasTables;
      if (isDecision) return <section className={`${base.container} ${base.section} ${additions.comparisonExperience}`} key={`${section.heading}-${sectionIndex}`}><div className={additions.comparisonHero}><div className={additions.comparisonCopy}><p>{section.eyebrow}</p><h2>{section.heading}</h2>{section.paragraphs[0] ? <span>{section.paragraphs[0]}</span> : null}</div><div className={additions.comparisonArtwork} aria-hidden="true"><Image className={additions.engineLeft} src={engineImage} alt="" width={360} height={235} /><Image className={additions.engineRight} src={engineImage} alt="" width={360} height={235} /><b /><i /></div></div>{section.tables.map((table, tableIndex) => <div className={additions.comparisonTable} key={tableIndex}><table><thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cellIndex === 0 ? <span className={base.decisionFactor}><RowIcon label={cell} />{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div>)}</section>;
      if (isMarket) return <section className={`${base.container} ${base.section} ${additions.marketInsight}`} key={`${section.heading}-${sectionIndex}`}><div className={additions.marketRing}><b>24,650</b><span>UK quotes</span></div><div className={additions.marketCopy}><p>{section.eyebrow}</p><h2>{section.heading}</h2><span>{section.paragraphs.join(" ")}</span></div><i className={additions.marketDivider} aria-hidden="true" /><div className={additions.marketRebuilt}><FaChartBar /><div><span>Engines Market</span><b>Verified comparison data</b><small>{section.subheadings[0] ?? "Real UK market information"}</small></div></div><Image className={additions.marketEngine} src={engineImage} alt="" width={500} height={325} aria-hidden="true" /></section>;
      if (isDecisionFramework) return <section className={`${base.container} ${base.section} ${base.decision} ${additions.decision}`} key={`${section.heading}-${sectionIndex}`}><div className={base.decisionIntro}><p className={base.eyebrow}>{section.eyebrow}</p><h2>{section.heading}</h2>{section.paragraphs.slice(0, 1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className={additions.decisionEngines}><Image src={engineImage} alt="First comparison option" width={180} height={105} /><b>VS</b><Image src={engineImage} alt="Second comparison option" width={180} height={105} /></div></div>{groups.slice(0, 2).map((group, index) => <article className={index === 1 ? base.rebuiltCard : ""} key={group.heading}><h3><FaCheck />{group.heading}</h3><ul>{group.bullets.map((bullet) => <li key={bullet}><FaCheck />{bullet}</li>)}</ul><b>{index === 0 ? "Option one" : "Option two"}</b></article>)}{section.tables[0] ? <div className={base.threshold}><h3>Decision <span>thresholds</span></h3>{section.tables[0].rows.slice(0, 4).map((row, rowIndex) => <span key={rowIndex}><RowIcon label={row[0] ?? ""} /><b>{row[0]}</b><small>{row.slice(1).join(" · ")}</small><em>COMPARE</em></span>)}</div> : null}</section>;
      if (isScenario) return <section className={`${base.container} ${base.section} ${base.surface} ${additions.scenarios}`} key={`${section.heading}-${sectionIndex}`}><SourceHeading section={section} /><div>{groups.slice(0, 3).map((group) => <article key={group.heading}><h3><FaCar />{group.heading}</h3>{group.bullets.slice(0, 1).map((item) => <b key={item}>{item}</b>)}{group.bullets.slice(1, 3).map((item) => <p key={item}>{item}</p>)}{group.bullets.slice(3).map((item) => <small key={item}>{item}</small>)}</article>)}</div></section>;
      if (isRisk) return <section className={`${base.container} ${base.section} ${base.risks} ${additions.risks}`} key={`${section.heading}-${sectionIndex}`}><SourceHeading section={section} /><div>{groups.slice(0, 2).map((group, index) => <article key={group.heading}><h3><FaExclamationTriangle />{group.heading}</h3>{group.bullets.map((item) => <span key={item}><FaExclamationTriangle /><b>{item}</b></span>)}</article>)}<b className={base.vs}>VS</b></div></section>;
      if (isTechnical) return <section className={`${base.container} ${base.section} ${base.surface} ${additions.technical}`} key={`${section.heading}-${sectionIndex}`}><SourceHeading section={section} />{section.paragraphs.map((paragraph) => <p className={base.note} key={paragraph}>{paragraph}</p>)}{section.tables.map((table, tableIndex) => renderTable(section, table, tableIndex))}</section>;
      if (isPrice) return <section className={`${base.container} ${base.section} ${base.surface} ${additions.price}`} key={`${section.heading}-${sectionIndex}`}><SourceHeading section={section} />{section.paragraphs.map((paragraph) => <p className={base.note} key={paragraph}>{paragraph}</p>)}{section.tables.map((table, tableIndex) => renderTable(section, table, tableIndex))}</section>;
      return <section className={`${base.container} ${base.section} ${base.surface} ${hasComparisonContent ? dynamic.comparisonModule : ""}`} key={`${section.heading}-${sectionIndex}`}><SourceHeading section={section} />{section.paragraphs.length > 0 ? <div className={dynamic.copy}>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : null}{section.subheadings.length > 0 ? <div className={dynamic.sectionDetails}>{section.subheadings.map((item) => <h3 key={item}>{item}</h3>)}</div> : null}{hasComparisonContent ? <div className={dynamic.comparisonColumns}>{groups.map((group) => <article key={group.heading}><h3>{group.heading}</h3><ul>{group.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></article>)}</div> : null}{section.bullets.length > 0 ? <ul className={dynamic.sectionBullets}>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{section.tables.map((table, tableIndex) => renderTable(section, table, tableIndex))}</section>;
    })}

    {faqSection ? <section className={`${base.container} ${base.section} ${base.surface} ${base.faq} ${additions.faqRefined}`}><SourceHeading section={faqSection} /><div className={additions.faqColumns}>{[faqSection.faqs.slice(0, Math.ceil(faqSection.faqs.length / 2)), faqSection.faqs.slice(Math.ceil(faqSection.faqs.length / 2))].map((column, columnIndex) => <div className={additions.faqColumn} key={columnIndex}>{column.map((faq, faqIndex) => { const key = `${columnIndex}-${faqIndex}`; return <article className={openFaq === key ? base.open : ""} key={faq.question}><button type="button" onClick={() => setOpenFaq(openFaq === key ? null : key)}><b>{columnIndex * Math.ceil(faqSection.faqs.length / 2) + faqIndex + 1}</b>{faq.question}<FaPlus /></button><p>{faq.answer}</p></article>; })}</div>)}</div></section> : null}

    {relatedSection ? <section className={`${base.container} ${base.section} ${base.guides} ${additions.guidesRefined}`}><SourceHeading section={relatedSection} /><div>{relatedSection.relatedLinks.map((link) => <Link href={link.href} key={`${link.href}-${link.label}`}><FaLink /><span>{link.label}</span><FaExternalLinkAlt /></Link>)}</div></section> : null}
    <section className={`${base.container} ${base.finalCta} ${additions.finalCtaRefined}`}><div className={additions.finalCtaCopy}><h2>{guide.finalCta.heading}</h2><p>{guide.finalCta.copy}</p></div><div className={additions.finalCtaFormWrap}><QuoteForm compact buttonLabel={guide.finalCta.buttonLabel} /><div className={additions.finalTrust}><span><FaCheck />Free comparison</span><span><FaCheck />No obligation</span><span><FaCheck />UK-wide network</span><span><FaCheck />Fast response</span></div></div><div className={additions.ctaEngine}><Image src={engineImage} alt="Engine" width={270} height={175} /></div></section>
  </main>;
}
