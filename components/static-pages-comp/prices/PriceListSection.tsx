import type { StaticBlock } from "@/lib/staticPagePreview";
type ListBlock = Extract<StaticBlock, { type: "list" }>;
export default function PriceListSection({ block }: { block: ListBlock }) {
  const List = block.ordered ? "ol" : "ul";
  return <List className="mt-5 grid gap-3 text-[15px] leading-7 text-slate-600">{block.items.map((item, index) => <li className="flex items-start gap-3" key={`${item}-${index}`}><span aria-hidden="true" className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-black text-[#14803d]">{block.ordered ? index + 1 : "✓"}</span><span>{item}</span></li>)}</List>;
}

