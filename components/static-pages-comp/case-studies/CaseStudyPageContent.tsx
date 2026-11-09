import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import CaseStudyHeadingSection from "@/components/static-pages-comp/case-studies/CaseStudyHeadingSection";
import CaseStudyParagraphSection from "@/components/static-pages-comp/case-studies/CaseStudyParagraphSection";
import CaseStudyListSection from "@/components/static-pages-comp/case-studies/CaseStudyListSection";
import CaseStudyTableSection from "@/components/static-pages-comp/case-studies/CaseStudyTableSection";
import CaseStudyFaqSection from "@/components/static-pages-comp/case-studies/CaseStudyFaqSection";
import CaseStudyFormSection from "@/components/static-pages-comp/case-studies/CaseStudyFormSection";
import CaseStudyLinksSection from "@/components/static-pages-comp/case-studies/CaseStudyLinksSection";
import CaseStudyLabelSection from "@/components/static-pages-comp/case-studies/CaseStudyLabelSection";
import CaseStudyCardsSection from "@/components/static-pages-comp/case-studies/CaseStudyCardsSection";
import CaseStudyStatSection from "@/components/static-pages-comp/case-studies/CaseStudyStatSection";
import CaseStudyImageSection from "@/components/static-pages-comp/case-studies/CaseStudyImageSection";
import CaseStudyQuoteSection from "@/components/static-pages-comp/case-studies/CaseStudyQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";

function renderCaseStudyContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <CaseStudyHeadingSection block={block} key={index} />;
    case "paragraph": return <CaseStudyParagraphSection block={block} key={index} />;
    case "list": return <CaseStudyListSection block={block} key={index} />;
    case "table": return <CaseStudyTableSection block={block} key={index} />;
    case "faq": return <CaseStudyFaqSection block={block} key={index} />;
    case "form": return <CaseStudyFormSection form={block} key={index} />;
    case "links": return <CaseStudyLinksSection block={block} key={index} />;
    case "label": return <CaseStudyLabelSection block={block} key={index} />;
    case "cards": return <CaseStudyCardsSection block={block} key={index} />;
    case "stat": return <CaseStudyStatSection block={block} key={index} />;
    case "image": return <CaseStudyImageSection block={block} key={index} />;
    case "quote": return <CaseStudyQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function CaseStudyPageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {forms.slice(hero.blocks.filter((block) => block.type === "form").length).map((form: StaticForm, index) => <CaseStudyFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderCaseStudyContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><AccentHeading text={section.heading} className="text-2xl font-black leading-[1.02] text-[#0a2952] sm:text-3xl" /><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderCaseStudyContentBlock(block, index))}{section.links.length ? <CaseStudyLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><CaseStudyTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className={`mt-10 rounded-2xl border border-orange-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-orange-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

