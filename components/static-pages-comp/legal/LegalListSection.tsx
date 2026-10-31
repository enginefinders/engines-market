import type { StaticBlock } from "@/lib/staticPagePreview";
import LegalInlineText from "@/components/static-pages-comp/legal/LegalInlineText";
type ListBlock = Extract<StaticBlock, { type: "list" }>;
export default function LegalListSection({ block }: { block: ListBlock }) {
  const List = block.ordered ? "ol" : "ul";
  return <List className={`mb-5 space-y-2 pl-6 text-[15px] leading-[1.6] text-[#1e293b] ${block.ordered ? "list-decimal" : "list-disc marker:text-[#078d4a]"}`}>{block.items.map((item, index) => <li key={`${item}-${index}`} className="mb-2"><LegalInlineText text={item} /></li>)}</List>;
}

