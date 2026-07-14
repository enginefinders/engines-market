import Image from "next/image";
import type { VariantEngineGuideData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantEngineGuideData;
};

const engineImage = "/images/shared/hero-engines/temporary-performance-engine.jpeg";
const bearingImage = "/case-studies/assets/3.1-ford-ranger-32-seized-bearings.png";

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 10h3l2 2v3h-5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V4h5v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M8 18h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 14h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 14V9.5C9 7.6 10.6 6 12.5 6 14.4 6 16 7.6 16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="7.3" r="1" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getCostTone(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("reconditioned")) {
    return "text-[#15803d]";
  }
  if (normalized.includes("rebuilt")) {
    return "text-[#ca8a04]";
  }
  return "text-[#1d4ed8]";
}

function getSpecIcon(index: number) {
  const icons = [
    (
      <svg key="power" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="calendar" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="car" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 14h14l-1.5-4.5a2 2 0 0 0-1.9-1.4H8.4a2 2 0 0 0-1.9 1.4L5 14Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8" cy="16.5" r="1.5" fill="currentColor" />
        <circle cx="16" cy="16.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  ];

  return icons[index % icons.length];
}

export default function VariantEngineGuideSection({ data }: Props) {
  return (
    <Section className="bg-white !py-0">
      <Container className="!max-w-none !px-0 sm:!px-0 lg:!px-0">
        <div>
          <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(90deg,rgba(3,10,24,0.95),rgba(7,20,37,0.78)),url('/images/brands/bmw/brand/bmw-hero-bg.png')] bg-cover bg-center px-5 py-6 shadow-[0_14px_30px_rgba(6,21,45,0.18)] sm:px-8 lg:px-10">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
              <div>
                <div className="inline-flex rounded-full bg-[#1f8b41] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.04em] text-white">
                  Section 4
                </div>
                <h2 className="mt-4 max-w-[860px] font-['Manrope'] text-[34px] font-extrabold tracking-normal text-white sm:text-[46px] lg:text-[56px]">
                  {data.sectionTitle || "Compatible Engine Codes & Cost Guide"}
                </h2>
                <p className="mt-2 max-w-[720px] text-[17px] leading-[1.6] text-slate-200">
                  {data.sectionSubtitle || "Find your exact engine code, specs and UK replacement cost guide."}
                </p>
              </div>

              <div className="rounded-[20px] border border-[#99733c] bg-[#0b2148] px-5 py-4 text-white shadow-[0_16px_28px_rgba(3,10,24,0.22)]">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9b16a] bg-white/6 text-[21px] font-black">
                    BMW
                  </div>
                  <div>
                    <p className="font-['Manrope'] text-[20px] font-extrabold">{data.h2}</p>
                    <p className="mt-1 text-[15px] text-slate-200">{data.tag}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-0 py-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0b2347] px-3 py-2 text-[13px] font-bold uppercase tracking-[0.03em] text-white">
                <EngineIcon />
                TAG:
              </span>
              <span className="rounded-full border border-[#dbe5f2] bg-white px-4 py-2 text-[15px] font-semibold text-[#0b2347]">
                {data.tag}
              </span>
            </div>

            <div className="grid gap-5">
              {data.items.map((item, index) => (
                <article key={`${item.code}-${index}`} className="grid gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(390px,0.92fr)]">
                  <div className="rounded-[22px] border border-[#dbe5f2] bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:p-5">
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
                      <div>
                        <h3 className="font-['Manrope'] text-[28px] font-extrabold leading-[1.12] tracking-normal text-[#0b2347] sm:text-[36px]">
                          BMW M3 E90 Engine Code - Specifications & Replacement Cost
                        </h3>

                        <div className="mt-5 flex items-start gap-4">
                          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-[16px] bg-[#0b2347] text-white">
                            <EngineIcon />
                          </div>
                          <div>
                            <h4 className="font-['Manrope'] text-[38px] font-extrabold leading-none tracking-normal text-[#16803d]">
                              {item.code}
                            </h4>
                            <p className="mt-2 text-[18px] font-semibold text-[#0b2347]">{item.title}</p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4">
                          {item.specs.map((spec, specIndex) => (
                            <div key={`${item.code}-${spec.label}-${specIndex}`} className="grid gap-3 border-b border-[#e7edf5] pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[32px_minmax(0,1fr)]">
                              <div className="text-[#16803d]">{getSpecIcon(specIndex)}</div>
                              <div>
                                <p className="text-[17px] font-semibold text-[#0f274d]">{spec.label}</p>
                                <p className="mt-1 text-[15px] leading-[1.55] text-[#314865]">{spec.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {item.compatibleTrimLevels?.length ? (
                          <div className="mt-5">
                            <p className="text-[17px] font-semibold text-[#0f274d]">Compatible Trim Levels</p>
                            <ul className="mt-3 space-y-2 text-[15px] leading-[1.6] text-[#314865]">
                              {item.compatibleTrimLevels.map((trim) => (
                                <li key={trim} className="flex gap-3">
                                  <span className="mt-[10px] h-2 w-2 flex-none rounded-full bg-[#15803d]" />
                                  <span>{trim}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>

                      <div className="relative mx-auto h-[320px] w-full max-w-[300px]">
                        <Image src={engineImage} alt={`${item.code} engine`} fill className="object-contain" sizes="300px" />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 rounded-[20px] bg-[#071d45] px-4 py-4 text-white shadow-[0_14px_28px_rgba(8,31,71,0.18)] sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-[16px] border border-white/10 bg-white/5">
                          <Image src={engineImage} alt={`${item.code} quote`} fill className="object-cover" sizes="64px" />
                        </div>
                        <p className="max-w-[420px] text-[16px] font-semibold leading-[1.45]">
                          {item.cta.replace(/\s*->\s*$/, "")}
                        </p>
                      </div>

                      <a
                        href="#quote-form"
                        data-quote-context={`${item.code} engine guide`}
                        data-quote-source="variant-engine-guide"
                        className="inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#1f9f43] px-6 text-[16px] font-extrabold text-white transition hover:bg-[#18873a]"
                      >
                        Get Free Quotes
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-[22px] border border-[#dbe5f2] bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                          <PoundIcon />
                        </div>
                        <div>
                          <h4 className="text-[18px] font-extrabold tracking-normal text-[#0f274d]">Cost Guide</h4>
                          {data.intro ? <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">{data.intro}</p> : null}
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {item.costs.map((cost, costIndex) => (
                          <div key={`${item.code}-${cost.label}-${costIndex}`} className="grid gap-4 rounded-[16px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                            <div>
                              <p className={`text-[16px] font-extrabold uppercase tracking-[0.02em] ${getCostTone(cost.label)}`}>{cost.label}</p>
                              {cost.description ? <p className="mt-1 text-[14px] leading-[1.55] text-[#314865]">{cost.description}</p> : null}
                            </div>
                            <p className="text-[18px] font-extrabold text-[#0b2347]">{cost.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#f3d1cf] bg-[linear-gradient(135deg,#fff8f7,#fff5f3)] p-4 shadow-[0_16px_30px_rgba(185,28,28,0.05)] sm:p-5">
                      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_110px] sm:items-center">
                        <div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-white text-[#dc2626] shadow-[0_10px_22px_rgba(220,38,38,0.12)]">
                              <WarningIcon />
                            </div>
                            <div>
                              <h4 className="text-[18px] font-extrabold tracking-normal text-[#b91c1c]">Common Failure</h4>
                              <p className="mt-3 text-[15px] leading-[1.65] text-[#5d1c1c]">{item.commonFailure}</p>
                            </div>
                          </div>
                        </div>

                        <div className="relative mx-auto h-[120px] w-[110px] overflow-hidden rounded-[16px]">
                          <Image src={bearingImage} alt="Bearing damage" fill className="object-cover" sizes="110px" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {data.prompt ? (
              <div className="mt-5 grid gap-4 rounded-[20px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                    <InfoIcon />
                  </div>
                  <p className="text-[16px] leading-[1.6] text-[#173153]">{data.prompt}</p>
                </div>

                <div className="overflow-hidden rounded-[12px] border border-[#d5a300] bg-[#f3c423] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]">
                  <div className="grid grid-cols-[46px_140px]">
                    <div className="bg-[#123075] px-3 py-2 text-center text-[12px] font-bold text-white">
                      <div>UK</div>
                    </div>
                    <div className="px-5 py-2 text-center text-[24px] font-black tracking-[0.04em]">REG 123</div>
                  </div>
                </div>

                <a
                  href="#quote-form"
                  data-quote-context="variant-guide prompt"
                  data-quote-source="variant-engine-guide"
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[14px] bg-[#0b2347] px-6 text-[15px] font-extrabold text-white transition hover:bg-[#081a37]"
                >
                  <span>Enter Your Registration</span>
                  <ArrowIcon />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
