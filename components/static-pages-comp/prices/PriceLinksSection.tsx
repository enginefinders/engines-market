import Link from "next/link";
import type { StaticBlock } from "@/lib/staticPagePreview";
type LinksBlock = Extract<StaticBlock, { type: "links" }>;
export default function PriceLinksSection({ block }: { block: LinksBlock }) {
  return <ul className="mt-6 grid gap-3 sm:grid-cols-2">{block.links.map((link) => <li className="group" key={link.href + link.text}>{link.href.startsWith("/") ? <Link className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-bold text-[#078d4a] transition hover:border-emerald-200 hover:bg-emerald-50/60" href={link.href}><span>{link.text}</span><span aria-hidden="true" className="text-emerald-600 transition group-hover:translate-x-1">→</span></Link> : <a className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-bold text-[#078d4a] transition hover:border-emerald-200 hover:bg-emerald-50/60" href={link.href}><span>{link.text}</span><span aria-hidden="true" className="text-emerald-600 transition group-hover:translate-x-1">→</span></a>}</li>)}</ul>;
}

