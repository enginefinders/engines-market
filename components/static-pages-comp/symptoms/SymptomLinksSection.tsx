import Link from "next/link";
import type { StaticBlock } from "@/lib/staticPagePreview";
type LinksBlock = Extract<StaticBlock, { type: "links" }>;
export default function SymptomLinksSection({ block }: { block: LinksBlock }) {
  return <ul className="mt-4 grid gap-2 sm:grid-cols-2">{block.links.map((link) => <li key={link.href + link.text}>{link.href.startsWith("/") ? <Link className="font-bold text-[#078d4a] underline decoration-[#078d4a]/35 underline-offset-4 hover:text-[#05703d]" href={link.href}>{link.text}</Link> : <a className="font-bold text-[#078d4a] underline decoration-[#078d4a]/35 underline-offset-4 hover:text-[#05703d]" href={link.href}>{link.text}</a>}</li>)}</ul>;
}

