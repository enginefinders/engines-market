import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import ServiceHeadingSection from "@/components/static-pages-comp/services/ServiceHeadingSection";
import ServiceParagraphSection from "@/components/static-pages-comp/services/ServiceParagraphSection";
import ServiceListSection from "@/components/static-pages-comp/services/ServiceListSection";
import ServiceTableSection from "@/components/static-pages-comp/services/ServiceTableSection";
import ServiceFaqSection from "@/components/static-pages-comp/services/ServiceFaqSection";
import ServiceFormSection from "@/components/static-pages-comp/services/ServiceFormSection";
import ServiceLinksSection from "@/components/static-pages-comp/services/ServiceLinksSection";
import ServiceLabelSection from "@/components/static-pages-comp/services/ServiceLabelSection";
import ServiceCardsSection from "@/components/static-pages-comp/services/ServiceCardsSection";
import ServiceStatSection from "@/components/static-pages-comp/services/ServiceStatSection";
import ServiceImageSection from "@/components/static-pages-comp/services/ServiceImageSection";
import ServiceQuoteSection from "@/components/static-pages-comp/services/ServiceQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";

function renderServiceContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <ServiceHeadingSection block={block} key={index} />;
    case "paragraph": return <ServiceParagraphSection block={block} key={index} />;
    case "list": return <ServiceListSection block={block} key={index} />;
    case "table": return <ServiceTableSection block={block} key={index} />;
    case "faq": return <ServiceFaqSection block={block} key={index} />;
    case "form": return <ServiceFormSection form={block} key={index} />;
    case "links": return <ServiceLinksSection block={block} key={index} />;
    case "label": return <ServiceLabelSection block={block} key={index} />;
    case "cards": return <ServiceCardsSection block={block} key={index} />;
    case "stat": return <ServiceStatSection block={block} key={index} />;
    case "image": return <ServiceImageSection block={block} key={index} />;
    case "quote": return <ServiceQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function ServicePageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {forms.slice(hero.blocks.filter((block) => block.type === "form").length).map((form: StaticForm, index) => <ServiceFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderServiceContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><AccentHeading text={section.heading} className="text-2xl font-black leading-[1.02] text-[#0a2952] sm:text-3xl" /><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderServiceContentBlock(block, index))}{section.links.length ? <ServiceLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><ServiceTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className={`mt-10 rounded-2xl border border-sky-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-sky-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

