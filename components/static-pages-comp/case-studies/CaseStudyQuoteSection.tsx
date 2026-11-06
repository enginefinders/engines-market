import type { StaticBlock } from "@/lib/staticPagePreview";
type QuoteBlock = Extract<StaticBlock, { type: "quote" }>;
export default function CaseStudyQuoteSection({ block }: { block: QuoteBlock }) {
  return <blockquote className={`my-5 border-l-4 border-orange-500 pl-4 italic text-slate-700`}>{block.text}</blockquote>;
}

