import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticPageRecord } from "@/lib/staticPagePreview";
import LegalHeadingSection from "@/components/static-pages-comp/legal/LegalHeadingSection";
import LegalParagraphSection from "@/components/static-pages-comp/legal/LegalParagraphSection";
import LegalListSection from "@/components/static-pages-comp/legal/LegalListSection";
import LegalTableSection from "@/components/static-pages-comp/legal/LegalTableSection";
import LegalFaqSection from "@/components/static-pages-comp/legal/LegalFaqSection";
import LegalFormSection from "@/components/static-pages-comp/legal/LegalFormSection";
import LegalLinksSection from "@/components/static-pages-comp/legal/LegalLinksSection";
import LegalLabelSection from "@/components/static-pages-comp/legal/LegalLabelSection";
import LegalCardsSection from "@/components/static-pages-comp/legal/LegalCardsSection";
import LegalStatSection from "@/components/static-pages-comp/legal/LegalStatSection";
import LegalImageSection from "@/components/static-pages-comp/legal/LegalImageSection";
import LegalQuoteSection from "@/components/static-pages-comp/legal/LegalQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";

const CTA_LINK_ROUTES: Record<string, string> = {
  "Privacy Policy": "/legal/privacy-policy",
  "Cookie Policy": "/legal/cookie-policy",
  "Data Handling Policy": "/legal/data-handling-policy",
  "Terms & Conditions": "/legal/terms-and-conditions",
  "Complaints Procedure": "/legal/complaints-procedure",
};

const RELATED_LINK_ROUTES: Record<string, string> = {
  "Privacy policy": "/legal/privacy-policy",
  "Data handling policy": "/legal/data-handling-policy",
  "Warranty claims guide": "/warranty-claims-guide",
  "Supplier standards": "/about/supplier-standards",
  "Terms and conditions": "/legal/terms-and-conditions",
};

function getCtaLinks(section: { blocks: StaticBlock[]; links: Array<{ href: string; text: string }> }) {
  const sourceLinks = new Map(section.links.map((link) => [link.text, link]));
  const sourceText = new Set(section.blocks.filter((block): block is Extract<StaticBlock, { type: "paragraph" }> => block.type === "paragraph").map((block) => block.text));
  const labels = ["Privacy Policy", "Cookie Policy", "Data Handling Policy", "Terms & Conditions", "Complaints Procedure"];
  return labels.filter((label) => sourceText.has(label) || sourceLinks.has(label)).map((label) => sourceLinks.get(label) || { href: CTA_LINK_ROUTES[label], text: label });
}

function getCompanyDetails(blocks: StaticBlock[]) {
  const labels = new Set(["Company name", "Company number", "Registered address", "Trading brand", "Website", "Data Protection Officer (DPO)", "DPO contact email"]);
  const rows: string[][] = [];
  let index = 0;
  while (index + 1 < blocks.length) {
    const labelBlock = blocks[index];
    const valueBlock = blocks[index + 1];
    if (labelBlock.type !== "paragraph" || valueBlock.type !== "paragraph" || !labels.has(labelBlock.text)) break;
    rows.push([labelBlock.text, valueBlock.text]);
    index += 2;
  }
  return { rows, blocks: blocks.slice(index) };
}

const SOURCE_SECTION_MARKER = /^(Section\s+\d+|Summary|Get Started|Complaints Procedure|Cookie Categories|Third Parties|User Controls|Governance & Retention|At a Glance|Ready to find your engine\?|Option \d+|Escalation|Questions\?|Our Process|Related Documents|Supplier Standards)$/i;

function prepareSections(sections: ReturnType<typeof getNormalizedPreviewContent>["sections"]) {
  const labels = new Map<string, string>();
  const prepared = sections.map((section) => ({ ...section, blocks: [...section.blocks] }));

  prepared.forEach((section, index) => {
    const last = section.blocks[section.blocks.length - 1];
    if (last?.type !== "paragraph" || !SOURCE_SECTION_MARKER.test(last.text.trim())) return;
    section.blocks.pop();
    const next = prepared[index + 1];
    if (next) labels.set(next.id, last.text.trim());
  });

  return { sections: prepared, labels };
}

function renderLegalContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <LegalHeadingSection block={block} key={index} />;
    case "paragraph": return <LegalParagraphSection block={block} key={index} />;
    case "list": return <LegalListSection block={block} key={index} />;
    case "table": return <LegalTableSection block={block} key={index} />;
    case "faq": return <LegalFaqSection block={block} key={index} />;
    case "form": return <LegalFormSection form={block} key={index} />;
    case "links": return <LegalLinksSection block={block} key={index} />;
    case "label": return <LegalLabelSection block={block} key={index} />;
    case "cards": return <LegalCardsSection block={block} key={index} />;
    case "stat": return <LegalStatSection block={block} key={index} />;
    case "image": return <LegalImageSection block={block} key={index} />;
    case "quote": return <LegalQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function LegalPageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections: rawSections, faqs, relatedLinks } = getNormalizedPreviewContent(page);
  const preparedSections = prepareSections(rawSections);
  const sections = preparedSections.sections;
  const leadBlocks = rawLeadBlocks.filter((block) => {
    if (block.type === "heading" && block.level === "h1") return false;
    if (block.type === "paragraph" && block.text === hero.description) return false;
    return true;
  });
  const leadParagraphs = leadBlocks.filter(
    (block): block is Extract<StaticBlock, { type: "paragraph" }> => block.type === "paragraph",
  );
  const sectionEyebrow = leadParagraphs.find((block) => block.text.includes("&"))?.text || "Legal document";
  const introNarrative = leadBlocks.filter((block) => block.type !== "paragraph");
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const ctaSections = sections.filter((section) => section.id === "compare-quotes-from-vetted-uk-suppliers" || /get a free, no-pressure quote today|compare quotes from vetted uk suppliers/i.test(section.heading));
  const ctaLinks = ctaSections.flatMap((section) => getCtaLinks(section));
  const ctaPrimaryLinks = ctaSections.flatMap((section) => section.links.filter((link) => link.href === "/get-a-quote"));
  const ctaLinkKeys = new Set([...ctaLinks, ...ctaPrimaryLinks].map((link) => `${link.href}|${link.text}`));
  const visibleRelatedLinks = relatedLinks.filter((link) => !ctaLinkKeys.has(`${link.href}|${link.text}`));
  const faqSource = sections.find((section) => section.blocks.some((block) => block.type === "faq"));
  const faqBlocks = faqSource?.blocks || [];
  const firstFaqIndex = faqBlocks.findIndex((block) => block.type === "faq");
  const relatedParagraphs = firstFaqIndex >= 0 ? faqBlocks.slice(firstFaqIndex).filter((block): block is Extract<StaticBlock, { type: "paragraph" }> => block.type === "paragraph") : [];
  const relatedLinkItems = relatedParagraphs.filter((block) => RELATED_LINK_ROUTES[block.text]).map((block) => ({ href: RELATED_LINK_ROUTES[block.text], text: block.text }));
  const relatedInfoTitle = relatedParagraphs.find((block) => block.text !== "Related Information")?.text || "Related information";
  const relatedInfoDescription = relatedParagraphs.find((block) => block.text.includes("Find out how"))?.text || "";
  const relatedParagraphTexts = new Set(relatedParagraphs.map((block) => block.text));
  const hasReadyEyebrow = rawSections.some((section) => section.blocks.some((block) => block.type === "paragraph" && block.text === "Ready to find your engine?"));
  return (
    <main className="py-10">
      {introNarrative.length ? <div className="mb-8 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.06)] sm:p-10">{introNarrative.map((block, index) => renderLegalContentBlock(block, index))}</div> : null}

      <div>
        {sections.map((section) => {
          if (ctaSections.some((ctaSection) => ctaSection.id === section.id)) {
            const links = getCtaLinks(section);
            const primary = section.links.find((link) => link.href === "/get-a-quote") || { href: "/get-a-quote", text: section.heading.match(/quote/i) ? "Get your quote" : "Get a free quote" };
            return <div className="scroll-mt-28 mb-8 rounded-md bg-[#0a2952] p-8 text-center text-white sm:px-10" id={section.id} key={section.id}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#34d399]">{hasReadyEyebrow ? "Ready to find your engine?" : "Get Started"}</p>
              <h2 className="mx-auto mb-3 max-w-3xl font-display text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-[1.15] text-white">{section.heading}</h2>
              {section.description ? <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-[1.6] text-[#cbd5e1]">{section.description}</p> : null}
              <Link className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#078d4a] px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(7,141,74,.3)] transition hover:bg-[#05703d]" href={primary.href}>{primary.text}<span aria-hidden="true">→</span></Link>
              {links.length ? <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">{links.map((link) => <Link className="text-sm text-white/80 underline decoration-white/30 underline-offset-2 transition hover:text-white" href={link.href} key={link.href + link.text}>{link.text}</Link>)}</div> : null}
            </div>;
          }

          const sectionLabel = preparedSections.labels.get(section.id) || section.heading || sectionEyebrow || "Legal section";
          const companyDetails = section.id === "who-we-are-data-controller" ? getCompanyDetails(section.blocks) : { rows: [], blocks: section.blocks };
          return <section className="scroll-mt-28 mb-8 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.06)] transition hover:border-[#cbd5e1] hover:shadow-[0_4px_6px_rgba(0,0,0,.07)] sm:p-10" id={section.id} key={section.id}>
            <div className="mb-6 border-b border-[#e6edf3] pb-[18px]"><p className="mb-2 inline-block rounded-full border border-[#b9e9ce] bg-[#e9f8f0] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#078d4a]">{sectionLabel}</p><AccentHeading text={section.heading} className="mt-3 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#0a2952]" />{section.description ? <p className="mt-3 text-[17px] leading-[1.6] text-[#64748b]"><LegalInlineText text={section.description} /></p> : null}</div>
            <div className="legal-section-body">
              {companyDetails.rows.length ? <div className="my-4 grid grid-cols-2 gap-x-6 gap-y-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-5 max-[680px]:grid-cols-1">{companyDetails.rows.map(([label, value]) => <Fragment key={label}><span className="text-[15px] font-bold text-[#0a2952]">{label}</span><span className="text-[15px] text-[#1e293b]"><LegalInlineText text={value} /></span></Fragment>)}</div> : null}
              {companyDetails.blocks.filter((block) => {
                if (block.type === "paragraph" && /^Section \d+$/i.test(block.text)) return false;
                if (section === faqSource && block.type === "paragraph" && relatedParagraphTexts.has(block.text)) return false;
                return true;
              }).map((block, index) => renderLegalContentBlock(block, index))}
            </div>
          </section>;
        })}
      </div>

      {!sectionsContainFaqs && faqs.length ? (
        <section className="mb-8 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.06)] sm:p-10">
          <p className="mb-2 inline-block rounded-full border border-[#b9e9ce] bg-[#e9f8f0] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#078d4a]">Questions and answers</p>
          <AccentHeading text="Frequently asked questions" className="mt-3 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#0a2952]" />
          <div className="mt-5 max-w-4xl space-y-2">{faqs.map((faq) => <LegalFaqSection block={{ type: "faq", ...faq }} key={faq.question} />)}</div>
        </section>
      ) : null}

      {visibleRelatedLinks.length ? (
        <section className="mb-8 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,.06)] sm:p-10">
          <p className="mb-2 inline-block rounded-full border border-[#b9e9ce] bg-[#e9f8f0] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#078d4a]">Related documents</p>
          <AccentHeading text="Related legal documents" className="mt-3 font-display text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#0a2952]" />
          <LegalLinksSection block={{ type: "links", links: visibleRelatedLinks }} />
        </section>
      ) : null}

      {relatedLinkItems.length ? (
        <section className="mb-8 scroll-mt-28 rounded-2xl bg-[#0a2952] p-7 text-white shadow-[0_8px_24px_rgba(10,41,82,.16)] sm:p-10" id="related-information">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#34d399]">Related info</p>
          <AccentHeading text={relatedInfoTitle} className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-bold leading-[1.1] text-white" />
          {relatedInfoDescription ? <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-slate-300">{relatedInfoDescription}</p> : null}
          <div className="mt-6 flex flex-wrap justify-center gap-3">{relatedLinkItems.map((link) => <Link className="rounded-md border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white underline decoration-emerald-300 underline-offset-4 transition hover:bg-white/20" href={link.href} key={link.href}>{link.text}</Link>)}</div>
        </section>
      ) : null}
    </main>
  );
}

