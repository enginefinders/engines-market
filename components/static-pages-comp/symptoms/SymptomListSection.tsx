import type { StaticBlock } from "@/lib/staticPagePreview";
type ListBlock = Extract<StaticBlock, { type: "list" }>;
export default function SymptomListSection({ block }: { block: ListBlock }) {
  const List = block.ordered ? "ol" : "ul";
  return <List className="mt-4 list-inside list-disc space-y-2 text-slate-700">{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
}

