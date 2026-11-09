import type { AboutPageRecord } from "@/lib/staticPagePreview";

function HeroTitle({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  const accentCount = Math.min(2, words.length);
  return <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">{words.slice(0, -accentCount).join(" ")}{words.length > accentCount ? " " : null}<span className="text-[#22c55e]">{words.slice(-accentCount).join(" ")}</span></h1>;
}

export default function AboutHero({ page }: { page: AboutPageRecord }) {
  const { hero } = page.sections;

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0b1628] py-0 text-white">
      <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#22a7ff]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[42%] h-72 w-72 rounded-full bg-[#1687e8]/35 blur-3xl" />
      <div className="hero-inner relative z-10 mx-auto grid min-h-[480px] max-w-[1120px] grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-6 lg:py-14">
        <div className="hero-content flex flex-col justify-center">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2ecc76]">{hero.eyebrow}</span>
          <HeroTitle text={hero.title} />
          <p className="mb-5 mt-4 max-w-[480px] text-[15px] leading-7 text-white/60">{hero.description}</p>
          <p className="mb-5 max-w-[480px] text-[15px] leading-7 text-white/60"><strong className="text-white">{hero.supportingDescription.split(".")[0]}.</strong>{hero.supportingDescription.includes(".") ? hero.supportingDescription.slice(hero.supportingDescription.indexOf(".") + 1) : null}</p>
          {hero.stats.length ? <div className="flex flex-wrap gap-7">{hero.stats.map((stat) => <div className="flex flex-col" key={`${stat.value}-${stat.label}`}><strong className="text-[29px] font-black leading-none text-[#2ecc76]">{stat.value}</strong><span className="mt-1 text-[11px] tracking-[0.04em] text-white/40">{stat.label}</span></div>)}</div> : null}
        </div>
        <div className="flex items-center justify-center lg:pl-6">
          <div className="relative flex w-full max-w-[360px] flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-8">
            <svg viewBox="0 0 180 120" className="w-full max-w-[180px]" fill="none" aria-hidden="true"><rect x="20" y="30" width="140" height="60" rx="8" stroke="#2ecc76" strokeWidth="2" /><circle cx="60" cy="60" r="16" stroke="#2ecc76" strokeWidth="2" /><circle cx="120" cy="60" r="16" stroke="#2ecc76" strokeWidth="2" /><line x1="40" y1="30" x2="40" y2="18" stroke="#2ecc76" strokeWidth="2" /><line x1="140" y1="30" x2="140" y2="18" stroke="#2ecc76" strokeWidth="2" /><line x1="60" y1="90" x2="60" y2="102" stroke="#2ecc76" strokeWidth="2" /><line x1="120" y1="90" x2="120" y2="102" stroke="#2ecc76" strokeWidth="2" /><text x="90" y="100" textAnchor="middle" fontSize="12" fill="#22A05A" fontWeight="700">COMPARE</text></svg>
            <div className="text-[22px] font-bold tracking-[0.04em] text-white">{hero.brand.name.split(" ")[0]} <span className="text-[#2ecc76]">{hero.brand.name.split(" ").slice(1).join(" ")}</span></div>
            <div className="text-center text-xs text-white/40">{hero.brand.tagline}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
