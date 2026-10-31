import type { StaticBlock } from "@/lib/staticPagePreview";
type FaqBlock = Extract<StaticBlock, { type: "faq" }>;
export default function PriceFaqSection({ block }: { block: FaqBlock }) {
  return <details className="group border-b border-slate-200 py-4 last:border-b-0"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a2952] marker:hidden [&::-webkit-details-marker]:hidden"><span>{block.question}</span><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-normal text-slate-500 transition group-open:rotate-45">+</span></summary><p className="max-w-4xl pr-10 pt-3 leading-7 text-slate-600">{block.answer}</p></details>;
}

