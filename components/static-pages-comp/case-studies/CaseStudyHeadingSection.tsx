import type { StaticBlock } from "@/lib/staticPagePreview";
type HeadingBlock = Extract<StaticBlock, { type: "heading" }>;
export default function CaseStudyHeadingSection({ block }: { block: HeadingBlock }) {
  return block.level === "h3" ? <h3 id={block.id || undefined} className="mt-7 text-lg font-bold text-[#0a2952]">{block.text}</h3> : <h4 id={block.id || undefined} className="mt-5 font-bold text-[#0a2952]">{block.text}</h4>;
}

