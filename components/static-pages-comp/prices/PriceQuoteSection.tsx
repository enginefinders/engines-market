import type { StaticBlock } from "@/lib/staticPagePreview";
type QuoteBlock = Extract<StaticBlock, { type: "quote" }>;
export default function PriceQuoteSection({ block }: { block: QuoteBlock }) {
  return <blockquote className="my-7 rounded-r-2xl border-l-4 border-amber-500 bg-amber-50/70 px-5 py-4 text-base italic leading-7 text-slate-700 shadow-sm">{block.text}</blockquote>;
}

