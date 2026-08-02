import Image from "next/image";
import type { VariantEngineGuideData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantEngineGuideData;
};

const engineImage = "/images/shared/hero-engines/temporary-petrol-engine.jpeg";
const bearingImage = "/case-studies/assets/3.1-ford-ranger-32-seized-bearings.png";

function AssetIcon({
  src,
  alt = "",
  className = "h-5 w-5 object-contain",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return <Image src={src} alt={alt} width={28} height={28} className={className} />;
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
    <AssetIcon key="power" src="/icons/variant/dark-green/upgraded-components.png" className="h-5 w-5 object-contain" />,
    <AssetIcon key="calendar" src="/icons/variant/dark-green/calendar.png" className="h-5 w-5 object-contain" />,
    <AssetIcon key="car" src="/icons/variant/dark-green/car.png" className="h-5 w-5 object-contain" />,
  ];

  return icons[index % icons.length];
}

function getVariantReplacementLabel(sectionTitle: string) {
  const cleaned = sectionTitle
    .replace(/\s+Engine Codes?\s*[—-]\s*Specifications\s*&\s*Replacement Cost$/i, "")
    .replace(/\s+Engine Code\s*[—-]\s*Specifications\s*&\s*Replacement Cost$/i, "")
    .trim();

  return cleaned ? `${cleaned} engine replacement` : "engine replacement";
}

export default function VariantEngineGuideSection({ data }: Props) {
  const replacementLabel = getVariantReplacementLabel(data.h2);

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
          <div className="py-[2px]">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-[#0b2347] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.03em] text-white">
                {data.tag}
              </span>
            </div>

            <div className="grid gap-5">
              {data.items.map((item, index) => (
                <article key={`${item.code}-${index}`} className="space-y-4">
                  <div className="mt-3 max-w-[720px] font-['Manrope'] text-[34px] font-extrabold leading-[1.03] tracking-normal text-[#0b2347] sm:text-[44px] lg:text-[54px]">
                    {data.h2}
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(390px,0.88fr)] xl:items-start">
                    <div className="flex flex-col gap-4">
                      <div className="max-w-[760px] rounded-[10px] border border-[#dbe5f2] bg-white p-3.5 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:p-4">
                        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-start lg:grid-cols-[minmax(0,1fr)_250px] lg:items-center">
                          <div>
                            <div className="mt-1 flex items-start gap-4">
                              <div className="flex h-16 w-16 flex-none items-center justify-center rounded-[10px] bg-[#0b2347] text-white">
                                <AssetIcon src="/icons/variant/white/engine.png" className="h-8 w-8 object-contain" />
                              </div>
                              <div>
                                <div className="font-['Manrope'] text-[40px] font-extrabold leading-none tracking-normal text-[#16803d] sm:text-[52px] lg:text-[58px]">
                                  {item.code}
                                </div>
                                <p className="mt-1 text-[15px] font-semibold text-[#0b2347] sm:text-[17px]">{item.title}</p>
                              </div>
                            </div>

                            <div className="mt-4 grid gap-4 border-t border-[#e7edf5] pt-4">
                              {item.specs.map((spec, specIndex) => (
                                <div key={`${item.code}-${spec.label}-${specIndex}`} className="grid gap-3 sm:grid-cols-[34px_minmax(0,1fr)]">
                                  <div className="text-[#16803d] [&_svg]:h-7 [&_svg]:w-7">{getSpecIcon(specIndex)}</div>
                                  <div>
                                    <p className="text-[15px] font-semibold text-[#0f274d] sm:text-[17px]">{spec.label}</p>
                                    <p className="mt-1 text-[14px] leading-[1.55] text-[#314865] sm:text-[15px]">{spec.value}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {item.compatibleTrimLevels?.length ? (
                              <div className="mt-4">
                                <div className="flex items-center gap-2 text-[#0f274d]">
                                  <span className="text-[#16803d] [&_svg]:h-7 [&_svg]:w-7">
                                    {getSpecIcon(2)}
                                  </span>
                                  <p className="text-[17px] font-semibold">Compatible Trim Levels</p>
                                </div>
                                <ul className="mt-2.5 space-y-1.5 text-[13px] leading-[1.55] text-[#314865] sm:text-[14px]">
                                  {item.compatibleTrimLevels.map((trim) => (
                                    <li key={trim} className="flex gap-3">
                                      <span className="mt-[9px] h-2 w-2 flex-none rounded-full bg-[#15803d]" />
                                      <span>{trim}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </div>

                          <div className="relative mx-auto h-[250px] w-full max-w-[210px] sm:h-[300px] sm:max-w-[270px]">
                            <Image src={engineImage} alt={`${item.code} engine`} fill className="object-contain" sizes="270px" />
                          </div>
                        </div>
                      </div>

                      <div className="max-w-[760px] grid gap-3 rounded-[12px] bg-[#071d45] px-4 py-3 text-white shadow-[0_14px_28px_rgba(8,31,71,0.18)] sm:grid-cols-[minmax(0,1fr)_180px] sm:items-stretch">
                        <div className="flex items-center gap-4">
                          <div className="relative h-14 w-14 flex-none overflow-hidden rounded-[10px] border border-white/10 bg-white/5">
                            <Image src={engineImage} alt={`${item.code} quote`} fill className="object-cover" sizes="64px" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-3 text-[15px] font-semibold leading-[1.35] text-white">
                              <span className="text-white">
                                <ArrowIcon />
                              </span>
                              <span>{`Get quotes for ${item.code}`}</span>
                            </div>
                            <p className="mt-1 text-[17px] font-semibold leading-[1.35] text-white">
                              {replacementLabel}
                            </p>
                          </div>
                        </div>

                        <a
                          href="#quote-form"
                          data-quote-context={`${item.code} engine guide`}
                          data-quote-source="variant-engine-guide"
                          className="inline-flex min-h-[56px] w-full flex-col items-center justify-center rounded-[8px] bg-[#1f9f43] px-4 text-white transition hover:bg-[#18873a] sm:min-h-full"
                        >
                          <span className="text-[15px] font-medium">Get Free Quotes</span>
                          <span className="mt-0.5 text-[12px] font-medium text-white/80">No Obligation</span>
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                    <div className="rounded-[10px] border border-[#dbe5f2] bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                          <AssetIcon src="/icons/variant/white/pound.png" className="h-7 w-7 object-contain" />
                          </div>
                        <div className="text-[22px] font-extrabold uppercase tracking-[0.02em] text-[#0f274d]">Cost Guide</div>
                      </div>

                      {data.intro ? <p className="mt-3 text-[15px] leading-[1.6] text-[#314865]">{data.intro}</p> : null}

                      <div className="mt-4 space-y-2.5">
                        {item.costs.map((cost, costIndex) => (
                          <div key={`${item.code}-${cost.label}-${costIndex}`} className="grid gap-4 rounded-[8px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-2.5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                            <div>
                              <p className={`text-[15px] font-extrabold uppercase tracking-[0.02em] sm:text-[16px] ${getCostTone(cost.label)}`}>{cost.label}</p>
                              {cost.description ? <p className="mt-1 text-[13px] leading-[1.55] text-[#314865] sm:text-[14px]">{cost.description}</p> : null}
                            </div>
                            <p className="text-[18px] font-extrabold text-[#0b2347]">{cost.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-[#f3d1cf] bg-[linear-gradient(135deg,#fff8f7,#fff5f3)] p-4 shadow-[0_16px_30px_rgba(185,28,28,0.05)] sm:p-4">
                      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_110px] sm:items-center">
                        <div>
                          <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-white text-[#dc2626] shadow-[0_10px_22px_rgba(220,38,38,0.12)]">
                              <AssetIcon src="/icons/variant/dark-green/rod-bearing.png" className="h-7 w-7 object-contain" />
                            </div>
                            <div>
                              <h4 className="text-[18px] font-extrabold tracking-normal text-[#b91c1c]">Common Failure</h4>
                              <p className="mt-3 text-[14px] leading-[1.65] text-[#5d1c1c] sm:text-[15px]">{item.commonFailure}</p>
                            </div>
                          </div>
                        </div>

                        <div className="relative mx-auto h-[120px] w-[110px] overflow-hidden rounded-[12px]">
                          <Image src={bearingImage} alt="Bearing damage" fill className="object-cover" sizes="110px" />
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </article>
              ))}
            </div>

            {data.prompt ? (
              <div className="mt-5 grid gap-4 rounded-[14px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                      <AssetIcon src="/icons/variant/white/not-sure.png" className="h-6 w-6 object-contain" />
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
                  className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[10px] bg-[#0b2347] px-6 text-[15px] font-extrabold text-white transition hover:bg-[#081a37]"
                >
                  <span>Enter Your Registration</span>
                  <ArrowIcon />
                </a>
              </div>
            ) : null}
        </div>
      </Container>
    </Section>
  );
}
