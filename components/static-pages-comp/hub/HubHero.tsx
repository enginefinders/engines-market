import Image from "next/image";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticPageRecord } from "@/lib/staticPagePreview";

export default function HubHero({ page }: { page: StaticPageRecord }) {
  const { hero } = getNormalizedPreviewContent(page);
  return <section className="rounded-2xl border border-[#0a2952] bg-gradient-to-br from-[#0a2952] to-[#123d84] p-6 shadow-sm sm:p-8"><p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-300">{hero.eyebrow}</p><h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">{hero.title || page.seo.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{hero.description}</p>{hero.trust.length?<div className="mt-5 flex flex-wrap gap-2">{hero.trust.map(item=><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200" key={item}>{item}</span>)}</div>:null}{hero.image?<Image className="mt-6 max-h-72 w-full rounded-xl object-contain" src={hero.image.src} alt={hero.image.alt} width={1200} height={630}/>:null}</section>;
}
