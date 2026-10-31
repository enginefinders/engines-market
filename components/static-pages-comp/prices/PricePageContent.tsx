import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticForm, StaticPageRecord } from "@/lib/staticPagePreview";
import PriceHeadingSection from "@/components/static-pages-comp/prices/PriceHeadingSection";
import PriceParagraphSection from "@/components/static-pages-comp/prices/PriceParagraphSection";
import PriceListSection from "@/components/static-pages-comp/prices/PriceListSection";
import PriceTableSection from "@/components/static-pages-comp/prices/PriceTableSection";
import PriceFaqSection from "@/components/static-pages-comp/prices/PriceFaqSection";
import PriceFormSection from "@/components/static-pages-comp/prices/PriceFormSection";
import PriceLinksSection from "@/components/static-pages-comp/prices/PriceLinksSection";
import PriceLabelSection from "@/components/static-pages-comp/prices/PriceLabelSection";
import PriceCardsSection from "@/components/static-pages-comp/prices/PriceCardsSection";
import PriceStatSection from "@/components/static-pages-comp/prices/PriceStatSection";
import PriceImageSection from "@/components/static-pages-comp/prices/PriceImageSection";
import PriceQuoteSection from "@/components/static-pages-comp/prices/PriceQuoteSection";

function renderPriceContentBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading": return <PriceHeadingSection block={block} key={index} />;
    case "paragraph": return <PriceParagraphSection block={block} key={index} />;
    case "list": return <PriceListSection block={block} key={index} />;
    case "table": return <PriceTableSection block={block} key={index} />;
    case "faq": return <PriceFaqSection block={block} key={index} />;
    case "form": return <PriceFormSection form={block} key={index} />;
    case "links": return <PriceLinksSection block={block} key={index} />;
    case "label": return <PriceLabelSection block={block} key={index} />;
    case "cards": return <PriceCardsSection block={block} key={index} />;
    case "stat": return <PriceStatSection block={block} key={index} />;
    case "image": return <PriceImageSection block={block} key={index} />;
    case "quote": return <PriceQuoteSection block={block} key={index} />;
    default: return null;
  }
}

export default function PricePageContent({ page }: { page: StaticPageRecord }) {
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => block.type !== "form" && block.type !== "image" && !(block.type === "heading" && block.level === "h1") && !(block.type === "paragraph" && block.text === hero.description));
  const contentForms = forms.slice(hero.blocks.filter((block) => block.type === "form").length);
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [...leadBlocks, ...sections.flatMap((section) => section.blocks)].filter((block) => block.type === "table").length;
  return <>
    {contentForms.length ? <div className="mt-10 grid gap-5">{contentForms.map((form: StaticForm, index) => <PriceFormSection form={form} key={form.action + index} />)}</div> : null}
    {leadBlocks.length ? <div className="mt-10 grid gap-5">{leadBlocks.map((block, index) => renderPriceContentBlock(block, index))}</div> : null}
    {sections.map((section) => <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] sm:p-7" id={section.id} key={section.id}><div className="mb-6 flex items-start gap-4"><span aria-hidden="true" className="mt-1 h-9 w-1 shrink-0 rounded-full bg-[#14803d]" /><h2 className="text-2xl font-black leading-tight tracking-tight text-[#0a2952] sm:text-3xl">{section.heading}</h2></div><div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderPriceContentBlock(block, index))}{section.links.length ? <PriceLinksSection block={{ type: "links", links: section.links }} /> : null}</div></section>)}
    {tables.slice(renderedTableCount).map((table, index) => <div className="mt-8" key={index}><PriceTableSection block={{ type: "table", ...table }} /></div>)}
    {!sectionsContainFaqs && faqs.length ? <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-8"><p className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-amber-700">Questions and answers</p><h2 className="mt-4 text-2xl font-black tracking-tight text-[#0a2952]">Frequently asked questions</h2><div className="mt-5 divide-y divide-slate-200">{faqs.map((faq) => <details className="group py-4" key={faq.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a2952] marker:hidden [&::-webkit-details-marker]:hidden"><span>{faq.question}</span><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-normal text-slate-500 transition group-open:rotate-45">+</span></summary><p className="max-w-4xl pr-10 pt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}</div></section> : null}
  </>;
}

