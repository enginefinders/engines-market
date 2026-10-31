import type { StaticBlock } from "@/lib/staticPagePreview";
type LabelBlock = Extract<StaticBlock, { type: "label" }>;
export default function SymptomLabelSection({ block }: { block: LabelBlock }) {
  return <p className={`mt-5 text-xs font-black uppercase tracking-[0.12em] text-violet-700`}>{block.text}</p>;
}

