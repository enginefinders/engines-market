import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import HubHeadingSection from "@/components/static-pages-comp/hub/HubHeadingSection";
import HubParagraphSection from "@/components/static-pages-comp/hub/HubParagraphSection";
import HubListSection from "@/components/static-pages-comp/hub/HubListSection";
import HubTableSection from "@/components/static-pages-comp/hub/HubTableSection";
import HubFaqSection from "@/components/static-pages-comp/hub/HubFaqSection";
import HubFormSection from "@/components/static-pages-comp/hub/HubFormSection";
import HubLinksSection from "@/components/static-pages-comp/hub/HubLinksSection";
import HubLabelSection from "@/components/static-pages-comp/hub/HubLabelSection";
import HubCardsSection from "@/components/static-pages-comp/hub/HubCardsSection";
import HubStatSection from "@/components/static-pages-comp/hub/HubStatSection";
import HubImageSection from "@/components/static-pages-comp/hub/HubImageSection";
import HubQuoteSection from "@/components/static-pages-comp/hub/HubQuoteSection";
import AccentHeading from "@/components/static-pages-comp/AccentHeading";

function renderHubContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <HubHeadingSection block={block} key={index} />;
    case "paragraph": return <HubParagraphSection block={block} key={index} />;
    case "list": return <HubListSection block={block} key={index} />;
    case "table": return <HubTableSection block={block} key={index} />;
    case "faq": return <HubFaqSection block={block} key={index} />;
    case "form": return <HubFormSection form={block} key={index} />;
    case "links": return <HubLinksSection block={block} key={index} />;
    case "label": return <HubLabelSection block={block} key={index} />;
    case "cards": return <HubCardsSection block={block} key={index} />;
    case "stat": return <HubStatSection block={block} key={index} />;
    case "image": return <HubImageSection block={block} key={index} />;
    case "quote": return <HubQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function HubPageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {forms.slice(hero.blocks.filter((block) => block.type === "form").length).map((form: StaticForm, index) => <HubFormSection form={form} key={form.action + index} />)}
    {leadBlocks.length ? <div className="mt-8">{leadBlocks.map((block, index) => renderHubContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><AccentHeading text={section.heading} className="text-2xl font-black leading-[1.02] text-[#0a2952] sm:text-3xl" /><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderHubContentBlock(block, index))}{section.links.length ? <HubLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-10" key={index}><HubTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className={`mt-10 rounded-2xl border border-teal-200 bg-white p-6 shadow-sm`}><p className={`text-xs font-black uppercase tracking-[0.12em] text-teal-700`}>Questions and answers</p><h2 className="mt-2 text-2xl font-black text-[#0a2952]">Frequently asked questions</h2><div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

