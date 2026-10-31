import Image from "next/image";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import PriceQuoteCta from "@/components/static-pages-comp/prices/PriceQuoteCta";

export default function FailureHero({ page }: { page: StaticPageRecord }) {
  const { hero } = getNormalizedPreviewContent(page);
  return <section className="rounded-2xl border border-[#0a2952] bg-[#0a2952] p-6 shadow-sm sm:p-8"><div className={hero.blocks.some((block) => block.type === "form") ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,.72fr)]" : ""}><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.14em] text-rose-300">{hero.eyebrow}</p><h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">{hero.title || page.seo.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{hero.description}</p>{hero.trust.length?<div className="mt-5 flex flex-wrap gap-2">{hero.trust.map(item=><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200" key={item}>{item}</span>)}</div>:null}{hero.options.length?<div className="mt-7 grid gap-3 md:grid-cols-3">{hero.options.map(o=><article className="rounded-xl border border-white/15 bg-white/10 p-4" key={o.label}><p className="font-bold text-white">{o.label}</p><strong className="mt-2 block text-xl text-rose-300">{o.amount}</strong><small className="mt-1 block text-slate-200">{o.detail}</small></article>)}</div>:null}{hero.image?<Image className="mt-6 max-h-72 w-full rounded-xl object-contain" src={hero.image.src} alt={hero.image.alt} width={1200} height={630}/>:null}</div>{hero.blocks.some((block) => block.type === "form") ? <PriceQuoteCta /> : null}</div></section>;
}
