import type { StaticBlock } from "@/lib/staticPagePreview";
type HeadingBlock = Extract<StaticBlock, { type: "heading" }>;
export default function PriceHeadingSection({ block }: { block: HeadingBlock }) {
  return block.level === "h3" ? <h3 id={block.id || undefined} className="mt-9 flex items-start gap-3 text-xl font-extrabold leading-tight tracking-tight text-[#0a2952]"><span aria-hidden="true" className="mt-1.5 h-5 w-1 shrink-0 rounded-full bg-emerald-500" />{block.text}</h3> : <h4 id={block.id || undefined} className="mt-7 text-base font-extrabold leading-tight text-[#0a2952]">{block.text}</h4>;
}

