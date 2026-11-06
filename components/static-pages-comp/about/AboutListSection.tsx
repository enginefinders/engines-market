import type { StaticBlock } from "@/lib/staticPagePreview";
type ListBlock = Extract<StaticBlock, { type: "list" }>;
export default function AboutListSection({ block }: { block: ListBlock }) {
  const List = block.ordered ? "ol" : "ul";
  return <List className={`mt-4 space-y-2 text-sm leading-6 text-[#27476c] ${block.ordered ? "list-decimal pl-5" : "list-none"}`}>{block.items.map((item) => <li className={!block.ordered ? "relative pl-6 before:absolute before:left-0 before:top-0 before:text-[#078d4a] before:content-['✓']" : ""} key={item}>{item}</li>)}</List>;
}

