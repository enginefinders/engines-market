import Image from "next/image";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import PriceQuoteCta from "@/components/static-pages-comp/prices/PriceQuoteCta";

export default function PriceHero({ page }: { page: StaticPageRecord }) {
  const { hero } = getNormalizedPreviewContent(page);
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#edf4fb_0%,#f8fafc_58%,#f1f8f3_100%)] p-5 shadow-[0_16px_40px_rgba(10,41,82,0.08)] sm:p-8 lg:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="relative grid items-start gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-12">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#116533]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#0a2952] sm:text-5xl lg:text-6xl">{hero.title || page.seo.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{hero.description}</p>

          {hero.trust.length ? <div className="mt-5 flex flex-wrap gap-2">{hero.trust.map(item => <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-[#0a2952] shadow-sm" key={item}>{item}</span>)}</div> : null}

          {hero.options.length ? <div className="mt-8 grid gap-3 sm:grid-cols-3">{hero.options.map((option, index) => <article className="group rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md" key={`${option.label}-${index}`}>
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black ${index === 2 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-[#14803d]"}`}>£</div>
            <p className="text-xs font-bold leading-5 text-slate-500">{option.label}</p>
            <strong className="mt-2 block text-xl font-black tracking-tight text-[#0a2952]">{option.amount}</strong>
            <small className="mt-2 block text-xs leading-5 text-slate-500">{option.detail}</small>
          </article>)}</div> : null}

          {hero.image ? <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"><Image className="max-h-28 w-full object-contain object-left sm:max-h-36" src={hero.image.src} alt={hero.image.alt} width={1200} height={630} /></div> : null}
        </div>

        <PriceQuoteCta />
      </div>
    </section>
  );
}
