import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import CompareHeadingSection from "@/components/static-pages-comp/compare/CompareHeadingSection";
import CompareParagraphSection from "@/components/static-pages-comp/compare/CompareParagraphSection";
import CompareListSection from "@/components/static-pages-comp/compare/CompareListSection";
import CompareTableSection from "@/components/static-pages-comp/compare/CompareTableSection";
import CompareFaqSection from "@/components/static-pages-comp/compare/CompareFaqSection";
import CompareFormSection from "@/components/static-pages-comp/compare/CompareFormSection";
import CompareLinksSection from "@/components/static-pages-comp/compare/CompareLinksSection";
import CompareLabelSection from "@/components/static-pages-comp/compare/CompareLabelSection";
import CompareCardsSection from "@/components/static-pages-comp/compare/CompareCardsSection";
import CompareStatSection from "@/components/static-pages-comp/compare/CompareStatSection";
import CompareImageSection from "@/components/static-pages-comp/compare/CompareImageSection";
import CompareQuoteSection from "@/components/static-pages-comp/compare/CompareQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";

function renderCompareContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <CompareHeadingSection block={block} key={index} />;
    case "paragraph": return <CompareParagraphSection block={block} key={index} />;
    case "list": return <CompareListSection block={block} key={index} />;
    case "table": return <CompareTableSection block={block} key={index} />;
    case "faq": return <CompareFaqSection block={block} key={index} />;
    case "form": return <CompareFormSection form={block} key={index} />;
    case "links": return <CompareLinksSection block={block} key={index} />;
    case "label": return <CompareLabelSection block={block} key={index} />;
    case "cards": return <CompareCardsSection block={block} key={index} />;
    case "stat": return <CompareStatSection block={block} key={index} />;
    case "image": return <CompareImageSection block={block} key={index} />;
    case "quote": return <CompareQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function ComparePageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {forms.slice(hero.blocks.filter((block) => block.type === "form").length).map((form: StaticForm, index) => <CompareFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderCompareContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><AccentHeading text={section.heading} className="text-2xl font-black leading-[1.02] text-[#0a2952] sm:text-3xl" /><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderCompareContentBlock(block, index))}{section.links.length ? <CompareLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><CompareTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className={`mt-10 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-blue-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

