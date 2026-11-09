import type { StaticBlock } from "@/lib/staticPagePreview";
type HeadingBlock = Extract<StaticBlock, { type: "heading" }>;
export default function LegalHeadingSection({ block }: { block: HeadingBlock }) {
  return block.level === "h3" ? (
    <h3 id={block.id || undefined} className="mt-8 font-display text-[21px] font-bold leading-[1.28] text-[#0a2952]">{block.text}</h3>
  ) : (
    <h4 id={block.id || undefined} className="mt-5 font-display text-[17.5px] font-semibold leading-[1.28] text-[#0a2952]">{block.text}</h4>
  );
}

