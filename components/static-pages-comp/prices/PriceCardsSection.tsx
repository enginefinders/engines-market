import type { StaticBlock } from "@/lib/staticPagePreview";
type CardsBlock = Extract<StaticBlock, { type: "cards" }>;
export default function PriceCardsSection({ block }: { block: CardsBlock }) {
  return <div className="my-7 grid gap-4 md:grid-cols-2">{block.cards.map((card, index) => <article className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md" key={card.title + index}><div className="mb-4 h-1 w-10 rounded-full bg-emerald-500 transition-all group-hover:w-16" /><h3 className="text-sm font-bold leading-5 text-[#0a2952]">{card.title}</h3>{card.highlight ? <p className="mt-3 text-2xl font-black tracking-tight text-[#14803d]">{card.highlight}</p> : null}{card.text ? <p className="mt-3 leading-7 text-slate-600">{card.text}</p> : null}{card.meta ? <p className="mt-4 text-xs font-semibold text-slate-500">{card.meta}</p> : null}</article>)}</div>;
}

