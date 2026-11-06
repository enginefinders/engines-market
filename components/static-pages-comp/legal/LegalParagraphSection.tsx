import type { StaticBlock } from "@/lib/staticPagePreview";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";
type ParagraphBlock = Extract<StaticBlock, { type: "paragraph" }>;
export default function LegalParagraphSection({ block }: { block: ParagraphBlock }) {
  return <p className="mb-4 text-[15px] leading-[1.65] text-[#1e293b]"><LegalInlineText text={block.text} /></p>;
}

