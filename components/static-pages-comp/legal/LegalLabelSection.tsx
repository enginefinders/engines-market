import type { StaticBlock } from "@/lib/staticPagePreview";
type LabelBlock = Extract<StaticBlock, { type: "label" }>;
export default function LegalLabelSection({ block }: { block: LabelBlock }) {
  return <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#116533]">{block.text}</p>;
}

