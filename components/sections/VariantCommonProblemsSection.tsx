"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { VariantCommonProblemsData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantCommonProblemsData;
  vehicleImage?: string;
};

const engineImage = "/images/brands/bmw/models/bmw-m3-removebg.png";
const bearingImage = "/case-studies/assets/3.1-ford-ranger-32-seized-bearings.png";
const ctaEngineImage = "/images/shared/hero-engines/temporary-performance-engine.jpeg";

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

function WarningIcon() {
  return <AssetIcon src="/icons/variant/dark-green/major-change.png" className="h-6 w-6 object-contain" />;
}

function CarIcon() {
  return <AssetIcon src="/icons/variant/dark-green/car.png" className="h-5 w-5 object-contain" />;
}

function GaugeIcon() {
  return <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-5 w-5 object-contain" />;
}

function CogIcon() {
  return <AssetIcon src="/icons/variant/dark-green/upgraded-components.png" className="h-5 w-5 object-contain" />;
}

function ClockIcon() {
  return <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-5 w-5 object-contain" />;
}

function RecommendationIcon() {
  return <AssetIcon src="/icons/variant/white/warranty.png" className="h-6 w-6 object-contain" />;
}

function SummaryIcon() {
  return <AssetIcon src="/icons/variant/dark-green/known-for.png" className="h-6 w-6 object-contain" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function splitProblemHeading(text: string) {
  const parts = text.split(/\s+-\s+/);
  return {
    title: parts[0] ?? text,
    detail: parts.length > 1 ? parts.slice(1).join(" - ") : "",
  };
}

function reviewStars(rating: string) {
  const rounded = Math.round(Number.parseFloat(rating.split("/")[0] || "5"));
  return Array.from({ length: 5 }, (_, index) => index < Math.min(Math.max(rounded, 0), 5));
}

function getTimeLabel(value?: string) {
  return value && value.trim() ? value : "1 - 2 days";
}

function getRepairTierMeta(index: number) {
  if (index === 0) {
    return {
      icon: "/icons/engine-market/white-warranty.png",
      iconBg: "bg-[#1f8b41]",
      label: "Minor",
      labelClass: "bg-[#e8f6eb] text-[#16803d]",
    };
  }

  return {
    icon: "/icons/engine-market/white-petrol-engine.png",
    iconBg: "bg-[#ef4444]",
    label: "Best Value",
    labelClass: "bg-[#fde8e8] text-[#dc2626]",
  };
}

export default function VariantCommonProblemsSection({ data, vehicleImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProblem = data.problems[activeIndex] ?? data.problems[0];
  const heading = useMemo(() => (activeProblem ? splitProblemHeading(activeProblem.h4) : null), [activeProblem]);
  const leadProblemImage = bearingImage;
  const headerVehicleImage = vehicleImage || engineImage;
  const headingParts = data.h2.split("Repair Cost");

  if (!activeProblem && !data.emptyState) {
    return null;
  }

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="!max-w-none !px-[2px] sm:!px-[2px] lg:!px-[2px]">
        <div>
          <div className="relative overflow-hidden bg-[linear-gradient(90deg,rgba(2,9,24,0.95),rgba(7,19,38,0.8)),url('/images/brands/bmw/brand/bmw-live-market-bg.png')] bg-cover bg-center px-5 py-4 sm:px-6 lg:px-9 lg:py-5">
            <div className="relative grid gap-4 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.9fr)] lg:items-center">
              <div className="relative z-10 pr-[34%] sm:pr-[40%] lg:pr-0">
                <div className="inline-flex rounded-full bg-[#1f8b41] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                  {data.tag}
                </div>
                <div className="mt-3 max-w-[820px] font-['Manrope'] text-[31px] font-extrabold leading-[1.04] tracking-normal text-white sm:text-[40px] lg:text-[50px]">
                  {headingParts.length > 1 ? (
                    <>
                      {headingParts[0]}
                      <span className="text-[#2db24c]">Repair Cost</span>
                      {headingParts.slice(1).join("Repair Cost")}
                    </>
                  ) : (
                    data.h2
                  )}
                </div>
                <p className="mt-2 max-w-[700px] text-[14px] leading-[1.55] text-slate-200">{data.h3}</p>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-[-4%] hidden w-[58%] items-end justify-center lg:relative lg:flex lg:right-auto lg:w-full lg:max-w-[520px] lg:pointer-events-auto lg:min-h-[230px]">
                <div className="absolute inset-x-14 bottom-4 h-12 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),rgba(59,130,246,0))] blur-2xl" />
                <Image
                  src={headerVehicleImage}
                  alt={data.h2}
                  fill
                  className="object-contain object-right-bottom drop-shadow-[0_24px_34px_rgba(2,8,22,0.36)] lg:object-center"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </div>
          </div>

          <div className="px-[2px] py-[2px]">
            {data.problems.length > 1 ? (
              <div className="mb-4 flex flex-wrap gap-2.5">
                {data.problems.map((problem, index) => (
                  <button
                    key={`${problem.group}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${
                      index === activeIndex
                        ? "bg-[#0b2347] text-white shadow-[0_10px_20px_rgba(11,35,71,0.14)]"
                        : "bg-[#eef4ff] text-[#0b2347] hover:bg-[#dde9fb]"
                    }`}
                  >
                    {problem.group}
                  </button>
                ))}
              </div>
            ) : null}

            {activeProblem && heading ? (
              <>
                <div className="grid items-start gap-5 sm:grid-cols-[minmax(180px,0.72fr)_minmax(0,1.28fr)] xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
                  <div className="overflow-hidden rounded-[14px] border border-[#dbe5f2] bg-white shadow-[0_16px_30px_rgba(15,23,42,0.08)] sm:mt-[72px] xl:mt-[96px]">
                    <div className="relative min-h-[250px] w-full sm:min-h-[320px] xl:min-h-[372px]">
                      <Image
                        src={leadProblemImage}
                        alt={activeProblem.imageAlt || heading.title}
                        fill
                        className="h-full w-full object-cover object-center"
                        sizes="(max-width: 1280px) 100vw, 32vw"
                      />
                    </div>
                  </div>

                  <div className="bg-white px-4 py-4 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:px-5">
                    <div className="inline-flex rounded-full bg-[#0b2347] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                      {activeProblem.group}
                    </div>

                    <div className="mt-3 font-['Manrope'] text-[34px] font-extrabold leading-[1.05] tracking-normal text-[#0b2347] sm:text-[42px]">
                      {heading.title}
                    </div>
                    {heading.detail ? <p className="mt-1.5 text-[14px] font-semibold text-[#233a5d]">{heading.detail}</p> : null}

                    <div className="mt-4 grid overflow-hidden rounded-[16px] border border-[#dbe5f2] grid-cols-2">
                      <div className="border-b border-[#dbe5f2] px-3.5 py-3 md:border-b-0 md:border-r">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <CarIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Affected Vehicles</p>
                            <p className="mt-1.5 text-[13px] leading-[1.5] text-[#314865]">{activeProblem.affectedModels}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3.5 py-3">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <GaugeIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Typical Failure Mileage</p>
                            <p className="mt-1.5 text-[13px] leading-[1.5] text-[#314865]">{activeProblem.typicalFailureMileage}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#dbe5f2] px-3.5 py-3 md:border-r">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <CogIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Root Cause</p>
                            <p className="mt-1.5 text-[13px] leading-[1.5] text-[#314865]">{activeProblem.rootCause}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#dbe5f2] px-3.5 py-3">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <WarningIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Why It Happens</p>
                            <p className="mt-1.5 text-[13px] leading-[1.5] text-[#314865]">
                              {activeProblem.whyItHappens?.trim() || activeProblem.rootCause}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {activeProblem.repairOptions?.length ? (
                  <div className="mt-5 overflow-hidden rounded-[12px] border border-[#dbe5f2] bg-white shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
                    <div className="bg-[#081f47] px-4 py-2.5 text-white">
                      <div className="text-[17px] font-extrabold tracking-normal !text-white">
                        Repair Options & Estimated Costs (UK Ranges)
                      </div>
                    </div>

                    <div className="grid gap-4 p-4 lg:hidden">
                      {activeProblem.repairOptions.map((option, index) => (
                        <div key={`${option.tier}-mobile-${index}`} className="overflow-hidden rounded-[16px] border border-[#dbe5f2] bg-[#fbfdff]">
                          <div className={`px-4 py-3 text-[17px] font-extrabold leading-[1.35] ${
                            index === 0 ? "text-[#15803d]" : "text-[#0b2347]"
                          }`}>
                            {option.tier}
                          </div>

                          <div className="grid grid-cols-2 border-t border-[#dbe5f2]">
                            <div className="border-r border-[#dbe5f2] px-4 py-4">
                              <p className="text-[12px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Dealer (parts + labour)</p>
                              <p className="mt-2 text-[16px] font-extrabold text-[#b91c1c]">{option.dealerPrice}</p>
                            </div>
                            <div className="px-4 py-4">
                              <p className="text-[12px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Specialist (parts + labour)</p>
                              <p className="mt-2 text-[16px] font-extrabold text-[#15803d]">{option.specialistPrice}</p>
                            </div>
                          </div>

                          <div className="grid border-t border-[#dbe5f2] sm:grid-cols-2">
                            <div className="border-b border-[#dbe5f2] px-4 py-4 sm:border-b-0 sm:border-r">
                              <p className="text-[12px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">What it involves</p>
                              <p className="mt-2 text-[13px] leading-[1.65] text-[#314865]">{option.whatItInvolves}</p>
                            </div>
                            <div className="px-4 py-4">
                              <p className="text-[12px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Suitability</p>
                              <p className="mt-2 text-[13px] leading-[1.65] text-[#314865]">{option.longevity}</p>
                            </div>
                          </div>

                          <div className="border-t border-[#dbe5f2] px-4 py-3">
                            <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f3fbf4] px-3 py-2 text-[13px] font-bold text-[#15803d]">
                              <ClockIcon />
                              <span>{getTimeLabel(option.estimatedTime).replace(/\s+/g, " ")}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-start gap-3 rounded-[14px] border border-[#dbe5f2] bg-[#fbfdff] px-4 py-3 text-[13px] leading-[1.6] text-[#314865]">
                        <span className="mt-0.5 text-[#0b2347]">
                          <SummaryIcon />
                        </span>
                        <span>All prices are indicative UK market ranges based on current UK specialist supplier data.</span>
                      </div>
                    </div>

                    <div className="hidden overflow-x-auto lg:block">
                      <table className="min-w-full border-collapse">
                        <thead className="bg-[#f6f9fc]">
                          <tr className="text-left text-[12px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">Repair Tier</th>
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">Dealer (Parts + Labour)</th>
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">Specialist (Parts + Labour)</th>
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">What It Involves</th>
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">Suitability</th>
                            <th className="border-b border-[#dbe5f2] px-4 py-3.5">Estimated Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeProblem.repairOptions.map((option, index) => (
                            <tr key={`${option.tier}-${index}`} className="align-top">
                              <td className="border-b border-[#e7edf5] px-4 py-4">
                                <div className="flex items-start gap-3">
                                  <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${getRepairTierMeta(index).iconBg}`}>
                                    <Image
                                      src={getRepairTierMeta(index).icon}
                                      alt=""
                                      width={18}
                                      height={18}
                                      className="object-contain"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-[14px] font-extrabold leading-[1.4] text-[#0b2347]">{option.tier}</p>
                                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.03em] ${getRepairTierMeta(index).labelClass}`}>
                                      {getRepairTierMeta(index).label}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[16px] font-extrabold text-[#b91c1c]">{option.dealerPrice}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[16px] font-extrabold text-[#15803d]">{option.specialistPrice}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[13px] leading-[1.6] text-[#314865]">{option.whatItInvolves}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[13px] leading-[1.6] text-[#314865]">{option.longevity}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4">
                                <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#f3fbf4] px-3 py-2 text-[13px] font-bold text-[#15803d]">
                                  <ClockIcon />
                                  <span>{getTimeLabel(option.estimatedTime).replace(/\s+/g, " ")}</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                <div className="mt-5 grid gap-4 xl:grid-cols-2">
                  {activeProblem.vehicleValueCheck ? (
                    <div className="rounded-[14px] border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-5 py-4 shadow-[0_12px_24px_rgba(22,128,61,0.08)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(22,128,61,0.12)]">
                          <Image src="/icons/engine-market/dark-blue-pound.png" alt="" width={22} height={22} className="object-contain" />
                        </div>
                        <div>
                          <p className="text-[17px] font-extrabold text-[#16803d]">Vehicle Value Check</p>
                          <p className="mt-2 text-[14px] leading-[1.6] text-[#24405a]">{activeProblem.vehicleValueCheck}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {activeProblem.recommendation ? (
                    <div className="rounded-[14px] border border-[#d7e4fb] bg-[linear-gradient(135deg,#f7fbff,#eff6ff)] px-5 py-4 shadow-[0_12px_24px_rgba(37,99,235,0.07)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(37,99,235,0.12)]">
                          <Image src="/icons/engine-market/dark-blue-warranty.png" alt="" width={22} height={22} className="object-contain" />
                        </div>
                        <div>
                          <p className="text-[17px] font-extrabold text-[#2563eb]">Our Recommendation</p>
                          <p className="mt-2 text-[14px] leading-[1.6] text-[#24405a]">{activeProblem.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="grid gap-4 rounded-[14px] bg-[#081f47] px-4 py-4 text-white shadow-[0_18px_34px_rgba(8,31,71,0.18)] sm:grid-cols-[88px_minmax(0,1fr)] sm:items-center">
                    <div className="relative mx-auto h-[70px] w-[70px] overflow-hidden rounded-[12px]">
                      <Image src={ctaEngineImage} alt="" fill className="object-contain" sizes="70px" />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_280px] sm:items-center">
                      <p className="text-[16px] font-semibold leading-[1.4] text-white">
                        {activeProblem.cta.replace(/\s*->\s*$/, "")}
                      </p>
                      <a
                        href="#quote-form"
                        data-quote-context={`${activeProblem.group} repair guidance`}
                        data-quote-source="variant-common-problems"
                        className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#1d9f42] px-6 text-[15px] font-bold text-white transition hover:bg-[#18883a]"
                      >
                        <span>Compare Engine Prices</span>
                        <ArrowIcon />
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-5 rounded-[16px] bg-[#071735] px-5 py-5 text-white shadow-[0_18px_34px_rgba(8,31,71,0.18)] lg:grid-cols-[minmax(0,0.96fr)_minmax(320px,0.54fr)] lg:items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full border border-[#1f8b41] bg-[#071c38] text-[#6ae086]">
                        <RecommendationIcon />
                      </div>
                      <div>
                        <h4 className="font-['Manrope'] text-[30px] font-extrabold leading-[1.1] tracking-normal text-white sm:text-[36px]">
                          {data.finalCta.h4}
                        </h4>
                        <p className="mt-3 text-[14px] leading-[1.65] text-slate-200">{data.finalCta.paragraph}</p>
                      </div>
                    </div>

                    <div className="rounded-[14px] border border-[#1f8b41]/55 bg-[#081f47] p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/15 bg-[#0b2347]">
                          <Image src="/icons/engine-market/white-technical-spec.png" alt="" width={22} height={22} className="object-contain" />
                        </div>
                        <p className="text-[15px] font-semibold leading-[1.5] text-[#39c85e]">
                          {data.finalCta.buttonText.replace(/\s*->\s*$/, "")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="border border-[#dbe5f2] bg-[#fbfdff] px-5 py-6">
                <p className="text-[24px] font-extrabold text-[#0b2347]">{data.emptyState?.title}</p>
                {data.emptyState?.description ? <p className="mt-3 text-[17px] leading-[1.7] text-[#314865]">{data.emptyState.description}</p> : null}
              </div>
            )}

            <div
              className={`mt-5 grid gap-4 border border-[#dbe5f2] bg-[#fbfdff] px-5 py-5 ${
                data.reviewSummary ? "lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-[#0b2347] shadow-[0_8px_18px_rgba(11,35,71,0.08)]">
                  <SummaryIcon />
                </div>
                <div>
                  <p className="text-[17px] font-extrabold text-[#0f274d]">Important Information</p>
                  <p className="mt-2 text-[15px] leading-[1.7] text-[#314865]">{data.finalCta.disclaimer}</p>
                </div>
              </div>

              {data.reviewSummary ? (
                <div className="border border-[#dbe5f2] bg-white px-5 py-5 text-center shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                  <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">{data.reviewSummary.label}</p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <p className="text-[34px] font-black tracking-normal text-[#0b2347]">Excellent</p>
                    <div className="flex items-center gap-1.5">
                      {reviewStars(data.reviewSummary.rating).map((filled, index) => (
                        <span
                          key={index}
                          className={`rounded-[4px] px-1.5 py-1 text-[14px] ${
                            filled ? "bg-[#16a34a] text-white" : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          {"\u2605"}
                        </span>
                      ))}
                    </div>
                    <span className="text-[18px] font-extrabold text-[#0b2347]">{data.reviewSummary.rating}</span>
                  </div>
                  <p className="mt-3 text-[14px] text-[#314865]">{data.reviewSummary.basedOn}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
