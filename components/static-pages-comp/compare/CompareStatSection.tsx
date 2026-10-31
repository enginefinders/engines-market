import type { StaticBlock } from "@/lib/staticPagePreview";
type StatBlock = Extract<StaticBlock, { type: "stat" }>;
export default function CompareStatSection({ block }: { block: StatBlock }) {
  return <div className="my-5 rounded-xl bg-[#0a2952] p-5 text-white"><p className="text-3xl font-black">{block.value}</p><p>{block.label}</p></div>;
}

