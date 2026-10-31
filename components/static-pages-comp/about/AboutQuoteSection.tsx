import type { StaticBlock } from "@/lib/staticPagePreview";
type QuoteBlock = Extract<StaticBlock, { type: "quote" }>;
export default function AboutQuoteSection({ block }: { block: QuoteBlock }) {
  return <blockquote className={`my-5 border-l-4 border-emerald-500 pl-4 italic text-slate-700`}>{block.text}</blockquote>;
}

