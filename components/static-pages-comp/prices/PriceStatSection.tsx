import type { StaticBlock } from "@/lib/staticPagePreview";
type StatBlock = Extract<StaticBlock, { type: "stat" }>;
export default function PriceStatSection({ block }: { block: StatBlock }) {
  return <div className="my-7 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#071936_0%,#0a2952_62%,#116533_100%)] p-6 text-white shadow-[0_12px_30px_rgba(10,41,82,0.18)]"><div aria-hidden="true" className="mb-5 h-1 w-12 rounded-full bg-emerald-400" /><p className="text-4xl font-black tracking-tight">{block.value}</p><p className="mt-2 text-sm font-semibold text-slate-200">{block.label}</p></div>;
}

