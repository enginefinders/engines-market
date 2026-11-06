import type { StaticBlock } from "@/lib/staticPagePreview";
type QuoteBlock = Extract<StaticBlock, { type: "quote" }>;
export default function LegalQuoteSection({ block }: { block: QuoteBlock }) {
  return <blockquote className="my-4 rounded-r-lg border-l-4 border-[#078d4a] bg-[#effaf4] px-5 py-4 text-[15px] leading-[1.65] text-[#1e293b]">{block.text}</blockquote>;
}

