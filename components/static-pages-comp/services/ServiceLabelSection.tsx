import type { StaticBlock } from "@/lib/staticPagePreview";
type LabelBlock = Extract<StaticBlock, { type: "label" }>;
export default function ServiceLabelSection({ block }: { block: LabelBlock }) {
  return <p className={`mt-5 text-xs font-black uppercase tracking-[0.12em] text-sky-700`}>{block.text}</p>;
}

