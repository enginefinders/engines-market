import type { StaticBlock } from "@/lib/staticPagePreview";
type StatBlock = Extract<StaticBlock, { type: "stat" }>;
export default function LegalStatSection({ block }: { block: StatBlock }) {
  return <div className="my-5 rounded-lg border border-[#173d70] bg-[#0a2952] p-4 text-white"><p className="text-2xl font-black">{block.value}</p><p className="mt-1 text-xs text-slate-200">{block.label}</p></div>;
}

