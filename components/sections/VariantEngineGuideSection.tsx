import type { VariantEngineGuideData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantEngineGuideData;
};

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M17 10h3l2 2v3h-5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7V4h5v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VariantEngineGuideSection({ data }: Props) {
  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1180px]">
        <div className="max-w-[760px]">
          <p className="section-pill">
            <EngineIcon />
            {data.tag}
          </p>
          <h2 className="mt-3">{data.h2}</h2>
          {data.intro ? <p className="text-body mt-4 text-slate-600">{data.intro}</p> : null}
        </div>

        <div className="mt-7 space-y-5">
          {data.items.map((item) => (
            <article
              key={item.code}
              className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_6px_24px_rgba(13,27,46,0.06)]"
            >
              <div className="grid gap-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
                <div className="border-b border-slate-200 bg-[#0d1b2e] px-5 py-5 text-white lg:border-b-0 lg:border-r lg:border-r-white/10">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#86efac]">
                    {item.code}
                  </div>

                  <h3 className="mt-3 font-['Manrope'] text-[24px] font-extrabold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {item.costs.map((cost) => (
                      <div key={`${item.code}-${cost.label}`} className="rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-300">{cost.label}</p>
                        <p className="mt-2 font-['Manrope'] text-[18px] font-extrabold tracking-[-0.03em] text-[#86efac]">
                          {cost.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-300">Common Failure</p>
                    <p className="mt-2 text-[13px] leading-[1.65] text-slate-100">{item.commonFailure}</p>
                  </div>

                  <a
                    href="#quote-form"
                    data-quote-context={`${item.code} engine guide`}
                    data-quote-source="variant-engine-guide"
                    className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-[#15803d] px-4 py-3 text-[12px] font-bold text-white transition hover:bg-[#166534]"
                  >
                    {item.cta}
                    <ArrowIcon />
                  </a>
                </div>

                <div className="px-5 py-5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {item.specs.map((spec) => (
                      <div key={`${item.code}-${spec.label}`} className="rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">{spec.label}</p>
                        <p className="mt-2 text-[14px] font-semibold leading-[1.55] text-[#0d1b2e]">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[14px] border border-slate-200 bg-white px-4 py-4">
                    <p className="text-[13px] leading-[1.75] text-slate-700">{item.closing}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[16px] border border-[#0d1b2e] bg-white px-5 py-4 text-[13px] leading-[1.75] text-slate-700 shadow-[0_6px_22px_rgba(13,27,46,0.05)]">
          {data.closing}
        </div>
      </Container>
    </Section>
  );
}
