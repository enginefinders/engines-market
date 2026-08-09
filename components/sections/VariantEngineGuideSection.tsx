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

function normalizeCopy(text: string) {
  return text
    .replaceAll("Â£", "£")
    .replaceAll("Â·", "·")
    .replace(/[â€“â€”]/g, "-")
    .replaceAll("Â", "")
    .trim();
}

function stripArrow(text: string) {
  return normalizeCopy(text).replace(/^\s*->\s*/u, "").replace(/\s*->\s*$/u, "").trim();
}

function getCostTone(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("reconditioned")) {
    return "text-[#15803d]";
  }
  if (normalized.includes("rebuilt")) {
    return "text-[#ea7a12]";
  }
  return "text-[#1d4ed8]";
}

function getCostMeta(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("reconditioned")) {
    return {
      icon: "/icons/variant/white/warranty.png",
      iconBg: "bg-[#15803d]",
      rowBg: "bg-[#f4fbf6]",
      rowBorder: "border-[#ccebd3]",
      detail: "Addressed known issues, tested",
      iconClassName: "h-[18px] w-[18px] object-contain",
    };
  }

  if (normalized.includes("rebuilt")) {
    return {
      icon: "/icons/variant/dark-green/upgraded-components.png",
      iconBg: "bg-[#ea7a12]",
      rowBg: "bg-[#fff8f1]",
      rowBorder: "border-[#f6d4b6]",
      detail: "Full teardown, upgraded internals",
      iconClassName: "h-[18px] w-[18px] object-contain brightness-0 invert",
    };
  }

  return {
    icon: "/icons/variant/white/em-pound.png",
    iconBg: "bg-[#2f6fed]",
    rowBg: "bg-[#f4f8ff]",
    rowBorder: "border-[#cdddff]",
    detail: "Tested, ready-to-fit engine",
    iconClassName: "h-[18px] w-[18px] object-contain",
  };
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
  const cleaned = normalizeCopy(sectionTitle)
    .replace(/\s+Engine Codes?\s*-\s*Specifications\s*&\s*Replacement Cost$/i, "")
    .replace(/\s+Engine Code\s*-\s*Specifications\s*&\s*Replacement Cost$/i, "")
    .trim();

  return cleaned ? `${cleaned} engine replacement` : "engine replacement";
}

function renderMobileGuideHeading(heading: string) {
  const match = heading.match(/(Codes?\s*-\s*Specifications\s*&\s*Replacement Cost)/i);
  if (!match || match.index === undefined) {
    return heading;
  }

  const before = heading.slice(0, match.index);
  const accent = match[0];
  const after = heading.slice(match.index + accent.length);

  return (
    <>
      {before}
      <span className="text-[#16803d]">{accent}</span>
      {after}
    </>
  );
}

export default function VariantEngineGuideSection({ data }: Props) {
  const replacementLabel = getVariantReplacementLabel(data.h2);
  const normalizedTag = normalizeCopy(data.tag);
  const normalizedHeading = normalizeCopy(data.h2);

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="max-w-[1400px] px-4 sm:px-5 lg:px-0">
        <div className="bg-white py-[2px]">
          <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
            <span className="inline-flex rounded-full bg-[#0b2347] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-white sm:px-4 sm:py-2 sm:text-[12px]">
              {normalizedTag}
            </span>
          </div>

          <h2 className="max-w-none font-['Manrope'] text-[22px] font-extrabold leading-[1.03] tracking-normal text-[#0b2347] sm:max-w-[760px] sm:text-[32px] lg:text-[46px]">
            <span className="sm:hidden">{renderMobileGuideHeading(normalizedHeading)}</span>
            <span className="hidden sm:inline">{normalizedHeading}</span>
          </h2>

          <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-5">
            {data.items.map((item, index) => (
              <article key={`${item.code}-${index}`} className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(410px,0.85fr)] xl:items-start">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="rounded-[10px] border border-[#dbe5f2] bg-white p-2 shadow-[0_14px_26px_rgba(15,23,42,0.055)] sm:p-3 lg:p-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_102px] items-start gap-2 sm:grid-cols-[minmax(0,1fr)_178px] sm:gap-3 lg:grid-cols-[minmax(0,1fr)_238px] lg:gap-3 xl:grid-cols-[minmax(0,1fr)_270px]">
                      <div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#0b2347] text-white shadow-[0_12px_24px_rgba(11,35,71,0.16)] sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:rounded-[12px]">
                            <AssetIcon src="/icons/variant/white/engine.png" className="h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-['Manrope'] text-[22px] font-extrabold leading-none tracking-normal text-[#16803d] sm:text-[28px] lg:text-[40px] xl:text-[46px]">
                              {normalizeCopy(item.code)}
                            </div>
                            <p className="mt-1 text-[11px] font-semibold leading-[1.35] text-[#0b2347] sm:mt-1.5 sm:text-[13px] lg:text-[16px] xl:text-[17px]">
                              {normalizeCopy(item.title)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2.5 grid gap-2 border-t border-[#e7edf5] pt-2.5 sm:mt-3 sm:gap-2.5 sm:pt-3">
                          {item.specs.map((spec, specIndex) => (
                            <div key={`${item.code}-${spec.label}-${specIndex}`} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2 sm:grid-cols-[26px_minmax(0,1fr)] sm:gap-3">
                              <div className="pt-0.5 text-[#16803d]">{getSpecIcon(specIndex)}</div>
                              <div>
                                <p className="text-[12px] font-bold leading-[1.3] text-[#0f274d] sm:text-[13px] lg:text-[15px]">{normalizeCopy(spec.label)}</p>
                                <p className="mt-0.5 text-[12px] leading-[1.38] text-[#314865] sm:mt-1 sm:text-[13px] lg:text-[15px] lg:leading-[1.6]">{normalizeCopy(spec.value)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {item.compatibleTrimLevels?.length ? (
                          <div className="mt-3 sm:mt-4">
                            <div className="flex items-center gap-2 text-[#0f274d]">
                              <span className="text-[#16803d]">{getSpecIcon(2)}</span>
                              <p className="text-[13px] font-bold sm:text-[14px] lg:text-[16px]">Compatible Trim Levels</p>
                            </div>
                            <ul className="mt-2 grid gap-x-3 gap-y-1 text-[11px] leading-[1.4] text-[#314865] sm:mt-2.5 sm:grid-cols-2 sm:gap-y-1.5 sm:text-[12px] lg:block lg:space-y-1.5 lg:text-[14px] lg:leading-[1.6]">
                              {item.compatibleTrimLevels.map((trim) => (
                                <li key={trim} className="flex gap-2 sm:gap-3">
                                  <span className="mt-[6px] h-1.5 w-1.5 flex-none rounded-full bg-[#15803d] sm:mt-[7px] sm:h-2 sm:w-2" />
                                  <span>{normalizeCopy(trim)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>

                      <div className="relative -ml-3 h-[102px] w-[calc(100%+12px)] max-w-[118px] self-start sm:-ml-5 sm:h-[170px] sm:max-w-[190px] lg:-ml-8 lg:h-[230px] lg:max-w-[262px] xl:h-[276px] xl:max-w-[310px]">
                        <Image
                          src={engineImage}
                          alt={`${normalizeCopy(item.code)} engine`}
                          fill
                          className="object-contain object-top"
                          sizes="300px"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hidden gap-3 rounded-[14px] bg-[#071d45] px-4 py-3 text-white shadow-[0_14px_28px_rgba(8,31,71,0.18)] xl:grid xl:grid-cols-[72px_minmax(0,1fr)_190px] xl:items-center">
                    <div className="relative h-14 w-14 overflow-hidden rounded-[10px] border border-white/10 bg-white/5">
                      <Image src={engineImage} alt={`${normalizeCopy(item.code)} quote`} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 text-[14px] font-semibold leading-[1.35] text-white/90">
                        <span className="text-white">
                          <ArrowIcon />
                        </span>
                        <span>{`Get quotes for ${normalizeCopy(item.code)}`}</span>
                      </div>
                      <p className="mt-1 text-[16px] font-semibold leading-[1.35] text-white sm:text-[17px]">
                        {replacementLabel}
                      </p>
                    </div>

                    <a
                      href="#quote-form"
                      data-quote-context={`${normalizeCopy(item.code)} engine guide`}
                      data-quote-source="variant-engine-guide"
                      className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[8px] bg-[#1f9f43] px-4 text-[14px] font-bold text-white transition hover:bg-[#18873a]"
                    >
                      Compare Prices
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="rounded-[10px] border border-[#dbe5f2] bg-white p-2.5 shadow-[0_14px_26px_rgba(15,23,42,0.055)] sm:p-3 lg:p-4">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                        <AssetIcon src="/icons/variant/white/em-pound.png" className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <div className="text-[15px] font-extrabold uppercase tracking-[0.02em] text-[#0f274d] sm:text-[16px] lg:text-[17px]">Cost Guide</div>
                        {data.sectionSubtitle ? (
                          <p className="mt-0.5 text-[10px] leading-[1.35] text-[#556b86] sm:mt-1 sm:text-[11px] lg:text-[12px] lg:leading-[1.5]">{normalizeCopy(data.sectionSubtitle)}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                      {item.costs.map((cost, costIndex) => {
                        const meta = getCostMeta(cost.label);
                        const fallbackDescription = meta.detail;

                        return (
                          <div
                            key={`${item.code}-${cost.label}-${costIndex}`}
                            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[8px] border px-2 py-1.5 sm:gap-2.5 sm:px-2.5 sm:py-2 ${meta.rowBg} ${meta.rowBorder}`}
                          >
                            <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                              <div className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full ${meta.iconBg} text-white sm:h-9 sm:w-9 lg:h-10 lg:w-10`}>
                                <Image src={meta.icon} alt="" width={18} height={18} className={meta.iconClassName} />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-[12px] font-extrabold uppercase tracking-[0.02em] sm:text-[13px] lg:text-[15px] ${getCostTone(cost.label)}`}>
                                  {normalizeCopy(cost.label)}
                                </p>
                                <p className="mt-0.5 text-[9.5px] leading-[1.3] text-[#314865] sm:mt-1 sm:text-[11px] lg:text-[13px] lg:leading-[1.55]">
                                  {normalizeCopy(cost.description || fallbackDescription)}
                                </p>
                              </div>
                            </div>
                            <p className="pl-2 text-right text-[14px] font-extrabold text-[#0b2347] sm:text-[17px] lg:text-[19px]">{normalizeCopy(cost.value)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[10px] border border-[#f3d1cf] bg-[linear-gradient(135deg,#fff8f7,#fff5f3)] p-2 shadow-[0_14px_26px_rgba(185,28,28,0.045)] sm:p-3 lg:p-4">
                    <div className="grid grid-cols-[minmax(0,1fr)_82px] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_104px] sm:gap-2.5 lg:grid-cols-[minmax(0,1fr)_120px] lg:gap-3">
                      <div>
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#c62828] shadow-[0_10px_22px_rgba(198,40,40,0.16)] sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                              <AssetIcon src="/icons/variant/white/rod-bearing.png" className="h-4 w-4 object-contain sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                            </div>
                            <h4 className="text-[14px] font-extrabold tracking-normal text-[#b91c1c] sm:text-[16px] lg:text-[19px]">Common Failure</h4>
                        </div>
                        <p className="mt-1.5 text-[11px] leading-[1.36] text-[#5d1c1c] sm:text-[12px] sm:leading-[1.44] lg:text-[15px] lg:leading-[1.56]">
                          {normalizeCopy(item.commonFailure)}
                        </p>
                      </div>

                      <div className="relative mx-auto h-[82px] w-[76px] overflow-hidden rounded-[8px] sm:h-[98px] sm:w-[90px] lg:h-[122px] lg:w-[112px]">
                        <Image src={bearingImage} alt="Bearing damage" fill className="object-cover" sizes="122px" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[10px] bg-[#071d45] px-2.5 py-2 text-white shadow-[0_14px_28px_rgba(8,31,71,0.18)] xl:hidden">
                    <div className="grid grid-cols-[44px_minmax(0,1fr)_110px] items-center gap-2.5">
                      <div className="relative h-11 w-11 overflow-hidden rounded-[10px] border border-white/10 bg-white/5">
                        <Image src={engineImage} alt={`${normalizeCopy(item.code)} quote`} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold leading-[1.2] text-white/88">
                          <span className="text-white">
                            <span className="block scale-[0.85]">
                              <ArrowIcon />
                            </span>
                          </span>
                          <span className="truncate">{`Get quotes for ${normalizeCopy(item.code)}`}</span>
                        </div>
                        <p className="mt-0.5 text-[12px] font-semibold leading-[1.2] text-white">
                          {replacementLabel}
                        </p>
                      </div>

                      <a
                        href="#quote-form"
                        data-quote-context={`${normalizeCopy(item.code)} engine guide`}
                        data-quote-source="variant-engine-guide"
                        className="inline-flex min-h-[40px] w-full items-center justify-center rounded-[8px] bg-[#1f9f43] px-2.5 text-center text-[11px] font-bold leading-[1.15] text-white transition hover:bg-[#18873a]"
                      >
                        Compare Prices
                      </a>
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
                  <AssetIcon src="/icons/variant/white/rod-bearing.png" className="h-6 w-6 object-contain" />
                </div>
                <p className="text-[16px] leading-[1.6] text-[#173153]">{normalizeCopy(data.prompt)}</p>
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
                <span>{stripArrow("Enter Your Registration")}</span>
                <ArrowIcon />
              </a>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
