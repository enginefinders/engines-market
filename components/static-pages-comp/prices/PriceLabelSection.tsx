import type { StaticBlock } from "@/lib/staticPagePreview";
type LabelBlock = Extract<StaticBlock, { type: "label" }>;
export default function PriceLabelSection({ block }: { block: LabelBlock }) {
  return <p className="mt-7 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-amber-700">{block.text}</p>;
}

