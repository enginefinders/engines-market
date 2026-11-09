import type { StaticBlock } from "@/lib/staticPagePreview";
type ParagraphBlock = Extract<StaticBlock, { type: "paragraph" }>;
export default function PriceParagraphSection({ block }: { block: ParagraphBlock }) {
  return <p className="mt-5 max-w-4xl text-[15px] leading-8 text-slate-600">{block.text}</p>;
}

