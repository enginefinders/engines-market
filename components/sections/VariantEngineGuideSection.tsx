"use client";

import { useMemo, useState } from "react";
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

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function normalizeCopy(text = "") {
  return text
    .replace(/Ã‚Â£|Â£/g, "£")
    .replace(/Ã‚Â·|Â·/g, "·")
    .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€|â€“|â€”/g, "-")
    .replace(/Ã‚|Â/g, "")
    .trim();
}

function stripArrow(text: string) {
  return normalizeCopy(text).replace(/^\s*->\s*/u, "").replace(/\s*->\s*$/u, "").trim();
}

function getSpecIcon(label: string, className = "h-5 w-5") {
  const normalized = label.toLowerCase();

  if (normalized.includes("power") || normalized.includes("output") || normalized.includes("hp")) {
    return <AssetIcon src="/icons/variant/dark-green/upgraded-components.png" className={`${className} object-contain`} />;
  }
  if (normalized.includes("torque")) {
    return <AssetIcon src="/icons/variant/dark-green/known-for.png" className={`${className} object-contain`} />;
  }
  if (normalized.includes("displacement") || normalized.includes("litre") || normalized.includes("engine")) {
    return <AssetIcon src="/icons/variant/dark-green/engine.png" className={`${className} object-contain`} />;
  }
  if (normalized.includes("year") || normalized.includes("fitted")) {
    return <AssetIcon src="/icons/variant/dark-green/calendar.png" className={`${className} object-contain`} />;
  }
  if (normalized.includes("trim") || normalized.includes("compatible")) {
    return <AssetIcon src="/icons/variant/dark-green/car.png" className={`${className} object-contain`} />;
  }

  return <AssetIcon src="/icons/variant/dark-green/engine.png" className={`${className} object-contain`} />;
}

function getCostMeta(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("reconditioned")) {
    return {
      icon: "/icons/variant/white/warranty.png",
      tone: "text-[#16803d]",
      bg: "bg-[#16803d]",
      detail: "Addressed known issues, tested",
    };
  }

  if (normalized.includes("rebuilt")) {
    return {
      icon: "/icons/variant/white/rod-bearing.png",
      tone: "text-[#c66a08]",
      bg: "bg-[#ea7a12]",
      detail: "Full teardown, upgraded internals",
    };
  }

  return {
    icon: "/icons/variant/white/em-pound.png",
    tone: "text-[#0b57d0]",
    bg: "bg-[#0b57d0]",
    detail: "Tested, ready-to-fit engine",
  };
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const replacementLabel = getVariantReplacementLabel(data.h2);
  const normalizedTag = normalizeCopy(data.tag);
  const normalizedHeading = normalizeCopy(data.h2);
  const visibleItems = data.items.slice(0, 3);
  const moreItems = data.items.slice(3);
  const selectedItem = data.items[selectedIndex] ?? data.items[0];
  const selectedFromMore = selectedIndex >= 3;

  const compatibleTrimLevels = useMemo(
    () => selectedItem?.compatibleTrimLevels?.map((trim) => normalizeCopy(trim)).filter(Boolean) ?? [],
    [selectedItem],
  );

  if (!selectedItem) {
    return null;
  }

  const selectEngine = (index: number) => {
    setSelectedIndex(index);
    setMoreOpen(false);
  };

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="max-w-[1400px] px-4 sm:px-5 lg:px-0">
        <div className="bg-white py-[2px]">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#0b2347] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-white sm:px-4 sm:py-2 sm:text-[12px]">
              {normalizedTag}
            </span>
          </div>

          <h2 className="max-w-none font-['Manrope'] text-[22px] font-extrabold leading-[1.03] tracking-normal text-[#0b2347] sm:max-w-[760px] sm:text-[32px] lg:text-[44px]">
            <span className="sm:hidden">{renderMobileGuideHeading(normalizedHeading)}</span>
            <span className="hidden sm:inline">{normalizedHeading}</span>
          </h2>

          <div className="relative z-20 mt-3 flex flex-wrap gap-2 sm:mt-4">
            {visibleItems.map((item, index) => {
              const isActive = selectedIndex === index;

              return (
                <button
                  key={`${item.code}-${index}`}
                  type="button"
                  onClick={() => selectEngine(index)}
                  className={`min-h-[74px] min-w-[140px] flex-1 rounded-[10px] border px-3 py-3 text-left transition sm:max-w-[260px] sm:px-4 ${
                    isActive
                      ? "border-[#16803d] bg-[#f0fbf3] shadow-[0_10px_20px_rgba(22,128,61,0.08)]"
                      : "border-[#dbe5f2] bg-white hover:border-[#b9cadf]"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-[8px] ${isActive ? "bg-[#071d45]" : "bg-[#f3f7fb]"}`}>
                      <AssetIcon src={isActive ? "/icons/variant/white/engine.png" : "/icons/variant/dark-green/engine.png"} className="h-4 w-4 object-contain" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[14px] font-extrabold text-[#16803d] sm:text-[16px]">{normalizeCopy(item.code)}</span>
                      <span className="mt-0.5 block line-clamp-2 text-[10px] font-semibold leading-[1.35] text-[#314865] sm:text-[11px]">{normalizeCopy(item.title)}</span>
                    </span>
                  </span>
                </button>
              );
            })}

            {moreItems.length ? (
              <div className="relative min-w-[150px] flex-1 sm:max-w-[240px]">
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`flex min-h-[74px] h-full w-full items-center justify-between rounded-[10px] border px-3 py-3 text-left transition sm:px-4 ${
                    selectedFromMore ? "border-[#16803d] bg-[#f0fbf3]" : "border-[#dbe5f2] bg-white hover:border-[#b9cadf]"
                  }`}
                  aria-expanded={moreOpen}
                >
                  <span>
                    <span className="block text-[13px] font-extrabold text-[#0b2347]">
                      {selectedFromMore ? normalizeCopy(selectedItem.code) : "View More"}
                    </span>
                    <span className="mt-0.5 block text-[10px] font-semibold text-[#60728a]">
                      {selectedFromMore ? `+${moreItems.length} More Engines` : `+${moreItems.length} More Engines`}
                    </span>
                  </span>
                  <ChevronIcon className={`h-4 w-4 text-[#0b2347] transition ${moreOpen ? "rotate-180" : ""}`} />
                </button>

                {moreOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-[8px] border border-[#dbe5f2] bg-white shadow-[0_18px_34px_rgba(15,23,42,0.14)]">
                    {moreItems.map((item, offset) => {
                      const index = offset + 3;
                      const isActive = selectedIndex === index;

                      return (
                        <button
                          key={`${item.code}-${index}`}
                          type="button"
                          onClick={() => selectEngine(index)}
                          className={`flex w-full items-center justify-between gap-3 border-b border-[#e7edf5] px-3 py-2 text-left last:border-b-0 ${
                            isActive ? "bg-[#f0fbf3]" : "hover:bg-[#f7fbff]"
                          }`}
                        >
                          <span>
                            <span className="block text-[13px] font-extrabold text-[#16803d]">{normalizeCopy(item.code)}</span>
                            <span className="mt-0.5 block text-[10px] font-semibold text-[#60728a]">{normalizeCopy(item.title)}</span>
                          </span>
                          {isActive ? <span className="h-2 w-2 rounded-full bg-[#16803d]" /> : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.06fr)_minmax(320px,0.94fr)]">
            <div className="rounded-[12px] border border-[#dbe5f2] bg-white p-3 shadow-[0_14px_26px_rgba(15,23,42,0.055)] sm:p-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_252px] lg:items-start">
                <div className="min-w-0">
                  <div className="font-['Manrope'] text-[28px] font-extrabold leading-none tracking-normal text-[#16803d] sm:text-[36px]">
                    {normalizeCopy(selectedItem.code)}
                  </div>
                  <p className="mt-1 text-[12px] font-semibold leading-[1.35] text-[#0b2347] sm:text-[15px]">
                    {normalizeCopy(selectedItem.title)}
                  </p>

                  <div className="mt-4 divide-y divide-[#e6eef6] border-y border-[#e6eef6]">
                    {selectedItem.specs.map((spec, specIndex) => (
                      <div key={`${selectedItem.code}-${spec.label}-${specIndex}`} className="grid grid-cols-[28px_112px_minmax(0,1fr)] items-center gap-2 py-2.5 sm:grid-cols-[32px_148px_minmax(0,1fr)]">
                        <span className="text-[#16803d]">{getSpecIcon(spec.label, "h-5 w-5")}</span>
                        <span className="text-[11px] font-bold text-[#314865] sm:text-[12px]">{normalizeCopy(spec.label)}</span>
                        <span className="min-w-0 text-[12px] font-semibold leading-[1.45] text-[#0b2347] sm:text-[13px]">{normalizeCopy(spec.value)}</span>
                      </div>
                    ))}
                  </div>

                  {compatibleTrimLevels.length ? (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-[#0f274d]">
                        <span className="text-[#16803d]">{getSpecIcon("Compatible Trim Levels", "h-5 w-5")}</span>
                        <p className="text-[12px] font-extrabold sm:text-[13px]">Compatible Trim Levels</p>
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {compatibleTrimLevels.map((trim) => (
                          <li key={trim} className="inline-flex items-center rounded-full border border-[#cfe4d4] bg-[#f5fbf6] px-2.5 py-1 text-[10px] font-bold text-[#16803d] sm:text-[11px]">
                            {trim}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="rounded-[12px] border border-[#e3ebf4] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f4f8fd_100%)] p-4">
                  <div className="relative mx-auto h-[188px] w-full max-w-[220px] sm:h-[220px] lg:h-[250px] lg:max-w-[250px]">
                    <Image
                      src={engineImage}
                      alt={`${normalizeCopy(selectedItem.code)} engine`}
                      fill
                      className="object-contain object-center drop-shadow-[0_18px_24px_rgba(15,23,42,0.13)]"
                      sizes="300px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-[10px] bg-[#071d45] px-2.5 py-2 text-white shadow-[0_14px_28px_rgba(8,31,71,0.18)]">
                <div className="grid grid-cols-[44px_minmax(0,1fr)_112px] items-center gap-2.5 sm:grid-cols-[56px_minmax(0,1fr)_168px]">
                  <div className="relative h-11 w-11 overflow-hidden rounded-[8px] border border-white/10 bg-white/5 sm:h-14 sm:w-14">
                    <Image src={engineImage} alt={`${normalizeCopy(selectedItem.code)} quote`} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold leading-[1.2] text-white/88 sm:text-[13px]">
                      <ArrowIcon className="h-4 w-4 flex-none" />
                      <span className="truncate">{`Get quotes for ${normalizeCopy(selectedItem.code)}`}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] font-semibold leading-[1.2] text-white sm:text-[15px]">
                      {replacementLabel}
                    </p>
                  </div>

                  <a
                    href="#quote-form"
                    data-quote-context={`${normalizeCopy(selectedItem.code)} engine guide`}
                    data-quote-source="variant-engine-guide"
                    className="inline-flex min-h-[40px] w-full items-center justify-center rounded-[7px] bg-[#1f9f43] px-2.5 text-center text-[11px] font-bold leading-[1.15] text-white transition hover:bg-[#18873a] sm:min-h-[44px] sm:text-[13px]"
                  >
                    Compare Prices
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[#dbe5f2] bg-white shadow-[0_14px_26px_rgba(15,23,42,0.055)]">
              <div className="flex items-center gap-2.5 border-b border-[#e6eef6] px-3 py-3 sm:px-4">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                  <AssetIcon src="/icons/variant/white/em-pound.png" className="h-4 w-4 object-contain" />
                </div>
                <div>
                  <div className="text-[14px] font-extrabold uppercase tracking-[0.02em] text-[#0f274d] sm:text-[16px]">Cost Guide</div>
                  {data.sectionSubtitle ? (
                    <p className="mt-0.5 text-[10px] leading-[1.35] text-[#556b86] sm:text-[11px]">{normalizeCopy(data.sectionSubtitle)}</p>
                  ) : null}
                </div>
              </div>

              <div className="divide-y divide-[#e6eef6]">
                {selectedItem.costs.map((cost, costIndex) => {
                  const meta = getCostMeta(cost.label);

                  return (
                    <div key={`${selectedItem.code}-${cost.label}-${costIndex}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 sm:px-4">
                      <div className="flex min-w-0 items-start gap-2.5">
                        <div className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full ${meta.bg} text-white`}>
                          <Image src={meta.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-[11px] font-extrabold uppercase tracking-[0.02em] sm:text-[12px] ${meta.tone}`}>
                            {normalizeCopy(cost.label)}
                          </p>
                          <p className="mt-0.5 text-[10px] leading-[1.35] text-[#314865] sm:text-[11px]">
                            {normalizeCopy(cost.description || meta.detail)}
                          </p>
                        </div>
                      </div>
                      <p className="whitespace-nowrap pl-2 text-right text-[12px] font-extrabold text-[#0b2347] sm:text-[15px]">{normalizeCopy(cost.value)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#e6eef6] bg-[linear-gradient(135deg,#fff8f7,#fff5f3)] px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex items-center gap-2.5 border-b border-[#e6eef6] px-3 py-2.5 sm:px-4">
                  <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#c62828] shadow-[0_10px_22px_rgba(198,40,40,0.16)]">
                    <AssetIcon src="/icons/variant/white/rod-bearing.png" className="h-4 w-4 object-contain" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-extrabold tracking-normal text-[#b91c1c] sm:text-[17px]">Common Failure</h4>
                    <p className="mt-2 text-[11px] leading-[1.5] text-[#5d1c1c] sm:text-[13px]">
                      {normalizeCopy(selectedItem.commonFailure)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_88px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_116px]">
                  <div className="text-[11px] leading-[1.5] text-[#5d1c1c] sm:text-[13px]">
                    Early diagnosis is recommended if symptoms appear, especially on higher-mileage examples where damage can escalate quickly.
                  </div>

                  <div className="relative mx-auto h-[88px] w-[82px] overflow-hidden rounded-[8px] sm:h-[112px] sm:w-[106px]">
                    <Image src={bearingImage} alt="Bearing damage" fill className="object-cover" sizes="116px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {data.prompt ? (
            <div className="mt-4 grid gap-4 rounded-[12px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-4 shadow-[0_14px_28px_rgba(15,23,42,0.05)] lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#0b2347] text-white">
                  <AssetIcon src="/icons/variant/white/rod-bearing.png" className="h-6 w-6 object-contain" />
                </div>
                <p className="text-[16px] leading-[1.6] text-[#173153]">{normalizeCopy(data.prompt)}</p>
              </div>

              <div className="overflow-hidden rounded-[10px] border border-[#d5a300] bg-[#f3c423] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]">
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
