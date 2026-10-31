import type { StaticBlock } from "@/lib/staticPagePreview";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";
type FaqBlock = Extract<StaticBlock, { type: "faq" }>;
export default function LegalFaqSection({ block }: { block: FaqBlock }) {
  return <details className="group overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8fafc] transition open:border-[#078d4a] open:bg-white open:shadow-[0_1px_3px_rgba(0,0,0,.06)]">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-[17px] font-bold text-[#0a2952] [&::-webkit-details-marker]:hidden">
      <LegalInlineText text={block.question} />
      <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center text-xl leading-none text-[#078d4a] transition group-open:rotate-45">+</span>
    </summary>
    <p className="border-t border-[#edf2f7] px-5 pb-4 pt-3 text-[15px] leading-[1.65] text-[#1e293b]"><LegalInlineText text={block.answer} /></p>
  </details>;
}

