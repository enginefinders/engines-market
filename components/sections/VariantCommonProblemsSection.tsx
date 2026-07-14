"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { VariantCommonProblemsData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantCommonProblemsData;
};

const engineImage = "/images/shared/hero-engines/temporary-performance-engine.jpeg";
const bearingImage = "/case-studies/assets/3.1-ford-ranger-32-seized-bearings.png";

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 14h14l-1.5-4.5a2 2 0 0 0-1.9-1.4H8.4a2 2 0 0 0-1.9 1.4L5 14Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8" cy="16.5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 17a7 7 0 1 1 14 0" stroke="currentColor" strokeWidth="1.8" />
      <path d="m12 13 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.9 1.9 0 0 1 0 2.7 1.9 1.9 0 0 1-2.7 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.9 1.9 0 0 1-2.7 0 1.9 1.9 0 0 1 0-2.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.9 1.9 0 0 1 0-2.7 1.9 1.9 0 0 1 2.7 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.9 1.9 0 0 1 2.7 0 1.9 1.9 0 0 1 0 2.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RecommendationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SummaryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12h8M8 16h5M8 8h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

export default function VariantCommonProblemsSection({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProblem = data.problems[activeIndex] ?? data.problems[0];
  const heading = useMemo(() => (activeProblem ? splitProblemHeading(activeProblem.h4) : null), [activeProblem]);
  const leadProblemImage =
    activeProblem?.image && activeProblem.image !== engineImage ? activeProblem.image : bearingImage;

  if (!activeProblem && !data.emptyState) {
    return null;
  }

  return (
    <Section className="bg-white !py-0">
      <Container className="!max-w-none !px-0 sm:!px-0 lg:!px-0">
        <div>
          <div className="relative overflow-hidden bg-[linear-gradient(90deg,rgba(2,9,24,0.95),rgba(7,19,38,0.8)),url('/images/brands/bmw/brand/bmw-live-market-bg.png')] bg-cover bg-center px-5 py-5 sm:px-7 lg:px-10 lg:py-6">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,0.96fr)_minmax(360px,0.9fr)] lg:items-center">
              <div>
                <div className="inline-flex rounded-full bg-[#1f8b41] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                  {data.tag}
                </div>
                <h2 className="mt-4 max-w-[820px] font-['Manrope'] text-[34px] font-extrabold leading-[1.05] tracking-normal text-white sm:text-[46px] lg:text-[58px]">
                  {data.h2}
                </h2>
                <p className="mt-3 max-w-[760px] text-[16px] leading-[1.65] text-slate-200">{data.h3}</p>
              </div>

              <div className="relative mx-auto flex min-h-[210px] w-full max-w-[520px] items-end justify-center lg:min-h-[260px]">
                <div className="absolute inset-x-14 bottom-4 h-12 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),rgba(59,130,246,0))] blur-2xl" />
                <Image
                  src="/images/brands/bmw/models/bmw-m3-model-card.png"
                  alt="BMW M3"
                  fill
                  className="object-contain object-center drop-shadow-[0_24px_34px_rgba(2,8,22,0.36)]"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
            </div>
          </div>

          <div className="px-0 py-0">
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
                <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                  <div className="overflow-hidden rounded-[16px] border border-[#dbe5f2] bg-[#101317] shadow-[0_16px_30px_rgba(15,23,42,0.1)]">
                    <div className="relative min-h-[320px]">
                      <Image
                        src={leadProblemImage}
                        alt={activeProblem.imageAlt || heading.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 100vw, 32vw"
                      />
                    </div>
                  </div>

                  <div className="border border-[#dbe5f2] bg-white px-5 py-5 shadow-[0_16px_30px_rgba(15,23,42,0.06)] sm:px-6">
                    <div className="inline-flex rounded-full bg-[#0b2347] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                      {activeProblem.group}
                    </div>

                    <h3 className="mt-4 font-['Manrope'] text-[30px] font-extrabold leading-[1.08] tracking-normal text-[#0b2347] sm:text-[40px]">
                      {heading.title}
                    </h3>
                    {heading.detail ? <p className="mt-2 text-[16px] font-semibold text-[#233a5d]">{heading.detail}</p> : null}

                    <div className="mt-5 grid border border-[#dbe5f2] md:grid-cols-2">
                      <div className="border-b border-[#dbe5f2] px-4 py-4 md:border-b-0 md:border-r">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <CarIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Affected Vehicles</p>
                            <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">{activeProblem.affectedModels}</p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-4">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <GaugeIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Typical Failure Mileage</p>
                            <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">{activeProblem.typicalFailureMileage}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#dbe5f2] px-4 py-4 md:border-r">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <CogIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Root Cause</p>
                            <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">{activeProblem.rootCause}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-[#dbe5f2] px-4 py-4">
                        <div className="flex items-start gap-3">
                          <span className="text-[#15803d]">
                            <WarningIcon />
                          </span>
                          <div>
                            <p className="text-[13px] font-bold uppercase tracking-[0.03em] text-[#0f274d]">Why It Happens</p>
                            <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">
                              {activeProblem.whyItHappens?.trim() || activeProblem.rootCause}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {activeProblem.repairOptions?.length ? (
                  <div className="mt-5 overflow-hidden border border-[#dbe5f2] bg-white shadow-[0_16px_30px_rgba(15,23,42,0.06)]">
                    <div className="bg-[#081f47] px-4 py-3 text-white">
                      <h4 className="text-[18px] font-extrabold tracking-normal !text-white">Repair Options & Estimated Costs (UK Ranges)</h4>
                    </div>

                    <div className="overflow-x-auto">
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
                                <p className="text-[16px] font-extrabold leading-[1.35] text-[#0b2347]">{option.tier}</p>
                              </td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[16px] font-extrabold text-[#b91c1c]">{option.dealerPrice}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[16px] font-extrabold text-[#15803d]">{option.specialistPrice}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[14px] leading-[1.65] text-[#314865]">{option.whatItInvolves}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4 text-[14px] leading-[1.65] text-[#314865]">{option.longevity}</td>
                              <td className="border-b border-[#e7edf5] px-4 py-4">
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#f3fbf4] px-3 py-2 text-[14px] font-bold text-[#15803d]">
                                  <ClockIcon />
                                  <span>{getTimeLabel(option.estimatedTime)}</span>
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
                    <div className="border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-5 py-4 shadow-[0_12px_24px_rgba(22,128,61,0.08)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-[#16803d] shadow-[0_8px_18px_rgba(22,128,61,0.12)]">
                          <SummaryIcon />
                        </div>
                        <div>
                          <p className="text-[17px] font-extrabold text-[#16803d]">Vehicle Value Check</p>
                          <p className="mt-2 text-[15px] leading-[1.65] text-[#24405a]">{activeProblem.vehicleValueCheck}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {activeProblem.recommendation ? (
                    <div className="border border-[#d7e4fb] bg-[linear-gradient(135deg,#f7fbff,#eff6ff)] px-5 py-4 shadow-[0_12px_24px_rgba(37,99,235,0.07)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-[#2563eb] shadow-[0_8px_18px_rgba(37,99,235,0.12)]">
                          <RecommendationIcon />
                        </div>
                        <div>
                          <p className="text-[17px] font-extrabold text-[#2563eb]">Our Recommendation</p>
                          <p className="mt-2 text-[15px] leading-[1.65] text-[#24405a]">{activeProblem.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-5 bg-[#081f47] px-5 py-5 text-white shadow-[0_18px_34px_rgba(8,31,71,0.18)] lg:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.56fr)] lg:items-center">
                  <div className="grid gap-4 sm:grid-cols-[126px_minmax(0,1fr)] sm:items-center">
                    <div className="relative mx-auto h-[108px] w-[108px]">
                      <Image src={engineImage} alt={data.finalCta.h4} fill className="object-contain" sizes="108px" />
                    </div>
                    <div>
                      <h4 className="font-['Manrope'] text-[30px] font-extrabold leading-[1.1] tracking-normal text-white sm:text-[36px]">
                        {data.finalCta.h4}
                      </h4>
                      <p className="mt-3 text-[15px] leading-[1.7] text-slate-200">{data.finalCta.paragraph}</p>
                    </div>
                  </div>

                  <div className="border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[16px] font-semibold leading-[1.55] text-white">
                      {activeProblem.cta.replace(/\s*->\s*$/, "")}
                    </p>
                    <a
                      href="#quote-form"
                      data-quote-context={`${activeProblem.group} repair guidance`}
                      data-quote-source="variant-common-problems"
                      className="mt-4 inline-flex min-h-[56px] w-full items-center justify-center gap-3 bg-[#1d9f42] px-6 text-[16px] font-extrabold text-white transition hover:bg-[#18883a]"
                    >
                      <span>{data.finalCta.buttonText.replace(/\s*->\s*$/, "")}</span>
                      <ArrowIcon />
                    </a>

                    <div className="mt-4 grid gap-2 text-[13px] text-slate-300 sm:grid-cols-3">
                      <span>12-Month Warranty Minimum</span>
                      <span>UK Specialists Vetted</span>
                      <span>Best Price Guarantee</span>
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
