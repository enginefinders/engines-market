import Link from "next/link";
import type { StaticBlock } from "@/lib/staticPagePreview";
type LinksBlock = Extract<StaticBlock, { type: "links" }>;
export default function LegalLinksSection({ block }: { block: LinksBlock }) {
  return <ul className="mt-4 grid gap-2 sm:grid-cols-2">{block.links.map((link) => <li key={link.href + link.text}>{link.href.startsWith("/") ? <Link className="flex items-center justify-between gap-3 rounded-lg border border-[#d8e4ef] bg-[#fbfdff] px-3.5 py-2.5 text-sm font-bold text-[#078d4a] transition hover:border-[#86ba9b] hover:bg-[#f2faf4]" href={link.href}>{link.text}<span aria-hidden="true" className="text-[#14803d]">→</span></Link> : <a className="flex items-center justify-between gap-3 rounded-lg border border-[#d8e4ef] bg-[#fbfdff] px-3.5 py-2.5 text-sm font-bold text-[#078d4a] transition hover:border-[#86ba9b] hover:bg-[#f2faf4]" href={link.href}>{link.text}<span aria-hidden="true" className="text-[#14803d]">→</span></a>}</li>)}</ul>;
}

