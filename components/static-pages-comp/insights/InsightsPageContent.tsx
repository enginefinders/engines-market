import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import InsightsHeadingSection from "@/components/static-pages-comp/insights/InsightsHeadingSection";
import InsightsParagraphSection from "@/components/static-pages-comp/insights/InsightsParagraphSection";
import InsightsListSection from "@/components/static-pages-comp/insights/InsightsListSection";
import InsightsTableSection from "@/components/static-pages-comp/insights/InsightsTableSection";
import InsightsFaqSection from "@/components/static-pages-comp/insights/InsightsFaqSection";
import InsightsFormSection from "@/components/static-pages-comp/insights/InsightsFormSection";
import InsightsLinksSection from "@/components/static-pages-comp/insights/InsightsLinksSection";
import InsightsLabelSection from "@/components/static-pages-comp/insights/InsightsLabelSection";
import InsightsCardsSection from "@/components/static-pages-comp/insights/InsightsCardsSection";
import InsightsStatSection from "@/components/static-pages-comp/insights/InsightsStatSection";
import InsightsImageSection from "@/components/static-pages-comp/insights/InsightsImageSection";
import InsightsQuoteSection from "@/components/static-pages-comp/insights/InsightsQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";

function renderInsightsContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <InsightsHeadingSection block={block} key={index} />;
    case "paragraph": return <InsightsParagraphSection block={block} key={index} />;
    case "list": return <InsightsListSection block={block} key={index} />;
    case "table": return <InsightsTableSection block={block} key={index} />;
    case "faq": return <InsightsFaqSection block={block} key={index} />;
    case "form": return <InsightsFormSection form={block} key={index} />;
    case "links": return <InsightsLinksSection block={block} key={index} />;
    case "label": return <InsightsLabelSection block={block} key={index} />;
    case "cards": return <InsightsCardsSection block={block} key={index} />;
    case "stat": return <InsightsStatSection block={block} key={index} />;
    case "image": return <InsightsImageSection block={block} key={index} />;
    case "quote": return <InsightsQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function InsightsPageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {forms.slice(hero.blocks.filter((block) => block.type === "form").length).map((form: StaticForm, index) => <InsightsFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderInsightsContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><AccentHeading text={section.heading} className="text-2xl font-black leading-[1.02] text-[#0a2952] sm:text-3xl" /><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderInsightsContentBlock(block, index))}{section.links.length ? <InsightsLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><InsightsTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className={`mt-10 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-indigo-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

