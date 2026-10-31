import type { StaticBlock } from "@/lib/staticPagePreview";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";
type CardsBlock = Extract<StaticBlock, { type: "cards" }>;
export default function LegalCardsSection({ block }: { block: CardsBlock }) {
  const isProcess = block.cards.length > 1 && block.cards.every((card) => /^\d+$/.test(card.meta || card.highlight || ""));
  const isSummary = block.cards.length > 3 && block.cards.every((card) => !card.title && card.fullText);
  if (isProcess) {
    return <div className="my-5 grid gap-3">{block.cards.map((card, index) => {
      const source = card.fullText || card.text;
      const timingMatch = source.match(/(Within|After)\s+.+$/i);
      const timing = timingMatch?.[0] || "";
      const body = card.text.replace(card.title, "").replace(timing, "").trim();
      return <article className="relative grid gap-3 rounded-xl border border-[#dbe8f1] bg-[#f7fbfe] p-4 sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] sm:items-start sm:p-5" key={card.title + index}>
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[#078d4a] text-sm font-black text-white shadow-[0_0_0_4px_#e9f8f0]" aria-label={`Step ${card.meta || card.highlight}`}>{card.meta || card.highlight}</div>
        <div className="min-w-0"><h3 className="text-sm font-bold leading-6 text-[#082952] sm:text-[15px]">{card.title}</h3>{body ? <p className="mt-1 text-sm leading-6 text-slate-700"><LegalInlineText text={body} /></p> : null}</div>
        {timing ? <span className="inline-flex w-fit rounded-full bg-[#e9f8f0] px-3 py-1 text-xs font-bold text-[#078d4a] sm:mt-1 sm:justify-self-end">{timing}</span> : null}
      </article>;
    })}</div>;
  }
  if (isSummary) {
    return <div className="my-5 grid gap-x-8 sm:grid-cols-2">{block.cards.map((card, index) => {
      const source = card.fullText || card.text;
      const separator = source.indexOf("?");
      const question = separator >= 0 ? source.slice(0, separator + 1) : source;
      const answer = separator >= 0 ? source.slice(separator + 1).trim() : "";
      return <article className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] py-3" key={`${source}-${index}`}><span className="text-sm font-semibold leading-6 text-[#082952]">{question}</span><span className="max-w-[52%] text-right text-sm leading-6 text-slate-700"><LegalInlineText text={answer} /></span></article>;
    })}</div>;
  }
  return <div className="my-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{block.cards.map((card, index) => <article className="border border-[#dbe8f1] bg-[#f7fbfe] p-3.5" key={card.title + index}><h3 className="text-sm font-bold leading-5 text-[#082952]">{card.title}</h3>{card.highlight ? <p className="mt-1.5 text-base font-black text-[#078d4a]"><LegalInlineText text={card.highlight} /></p> : null}{card.text ? <p className="mt-1.5 text-sm leading-6 text-slate-700"><LegalInlineText text={card.text} /></p> : null}{card.items?.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700 marker:text-[#078d4a]">{card.items.map((item, itemIndex) => <li key={`${item}-${itemIndex}`}><LegalInlineText text={item} /></li>)}</ul> : null}{card.meta ? <p className="mt-2 text-xs font-semibold leading-5 text-slate-500"><LegalInlineText text={card.meta} /></p> : null}</article>)}</div>;
}

