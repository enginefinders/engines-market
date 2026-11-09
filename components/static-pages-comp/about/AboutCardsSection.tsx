import type { StaticBlock } from "@/lib/staticPagePreview";
type CardsBlock = Extract<StaticBlock, { type: "cards" }>;
export default function AboutCardsSection({ block }: { block: CardsBlock }) {
  return <div className="my-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{block.cards.map((card, index) => <article className="rounded-xl border border-[#cfe8da] bg-gradient-to-b from-white to-[#f5fcf8] p-4" key={card.title + index}><h3 className="text-sm font-bold leading-5 text-[#082952]">{card.title}</h3>{card.highlight ? <p className="mt-2 text-xl font-black text-[#078d4a]">{card.highlight}</p> : null}{card.text ? <p className="mt-2 text-sm leading-6 text-[#68819a]">{card.text}</p> : null}{card.meta ? <p className="mt-2 text-xs text-slate-500">{card.meta}</p> : null}</article>)}</div>;
}

