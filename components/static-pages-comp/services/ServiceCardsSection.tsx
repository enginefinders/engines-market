import type { StaticBlock } from "@/lib/staticPagePreview";
type CardsBlock = Extract<StaticBlock, { type: "cards" }>;
export default function ServiceCardsSection({ block }: { block: CardsBlock }) {
  return <div className="my-5 grid gap-3 md:grid-cols-2">{block.cards.map((card, index) => <article className={`rounded-xl border border-sky-200 bg-white p-4`} key={card.title + index}>{card.icon ? <p className="text-2xl" aria-hidden="true">{card.icon}</p> : null}<h3 className="text-sm font-bold leading-5 text-[#0a2952]">{card.title}</h3>{card.highlight ? <p className="mt-2 text-xl font-black text-[#14803d]">{card.highlight}</p> : null}{card.items?.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">{card.items.map((item) => <li key={item}>{item}</li>)}</ul> : card.text ? <p className="mt-2 text-slate-700">{card.text}</p> : null}{card.meta ? <p className="mt-2 text-xs text-slate-500">{card.meta}</p> : null}</article>)}</div>;
}

