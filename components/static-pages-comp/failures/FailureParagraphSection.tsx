import type { StaticBlock } from "@/lib/staticPagePreview";
type ParagraphBlock = Extract<StaticBlock, { type: "paragraph" }>;
export default function FailureParagraphSection({ block }: { block: ParagraphBlock }) {
  return <p className="mt-4 leading-7 text-slate-700">{block.text}</p>;
}

