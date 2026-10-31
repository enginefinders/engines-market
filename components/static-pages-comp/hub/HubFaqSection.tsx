import type { StaticBlock } from "@/lib/staticPagePreview";
type FaqBlock = Extract<StaticBlock, { type: "faq" }>;
export default function HubFaqSection({ block }: { block: FaqBlock }) {
  return <details className="border-b border-slate-200 py-3"><summary className="cursor-pointer font-bold text-[#0a2952]">{block.question}</summary><p className="mt-2 leading-7 text-slate-700">{block.answer}</p></details>;
}

