"use client";

import { useMemo, useState } from "react";
import type { CommonProblemsData } from "@/types/brand";
import { RecommendationCard } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: CommonProblemsData;
  bgImage?: string;
};

function normalizeText(text: string) {
  return text.replace(/[–—]/g, "-");
}

function splitHeading(text: string) {
  const accent = "What It Costs to Fix & When Replacement Makes Sense";
  if (text.includes(accent)) {
    return {
      primary: text.replace(accent, "").replace(/\s+-\s*$/, "").trim(),
      accent,
    };
  }

  const parts = text.split(/\s+-\s+/);
  return {
    primary: parts[0] ?? text,
    accent: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function splitProblemDetail(group: string, detail: string) {
  const normalizedGroup = normalizeText(group).trim();
  const normalizedDetail = normalizeText(detail).trim();

  if (!normalizedDetail) {
    return {
      title: normalizedGroup,
      supporting: "",
    };
  }

  if (normalizedDetail.toLowerCase().startsWith(normalizedGroup.toLowerCase())) {
    const supporting = normalizedDetail
      .slice(normalizedGroup.length)
      .replace(/^\s*-\s*/, "")
      .trim();

    return {
      title: normalizedGroup,
      supporting,
    };
  }

  const [maybeTitle, ...rest] = normalizedDetail.split(/\s+-\s+/);

  if (maybeTitle?.trim().toLowerCase() === normalizedGroup.toLowerCase() && rest.length) {
    return {
      title: normalizedGroup,
      supporting: rest.join(" - ").trim(),
    };
  }

  return {
    title: normalizedGroup,
    supporting: normalizedDetail,
  };
}

function tierVariant(tier: string) {
  const label = normalizeText(tier).toLowerCase();

  if (label.includes("full replacement") || label.includes("recommended") || label.includes("best value")) {
    return "recommended";
  }

  if (label.includes("intermediate") || label.includes("moderate")) {
    return "moderate";
  }

  return "minor";
}

function ProblemIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M12 2 4 10l4 12h8l4-12-8-8Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="m9.5 12 2 2 4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="1" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>,
    <svg key="2" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 11h3M17 11h3M9 4v3M15 4v3M9 17v3M15 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>,
    <svg key="3" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 4v3M16 4v3M8 17v3M16 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>,
  ];

  return icons[index % icons.length];
}

function MetaIcon({ type }: { type: "models" | "mileage" | "root" }) {
  if (type === "models") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 8 8 5h8l2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "mileage") {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
        <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m12 14 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-.33-1 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 .33 1 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.26.3.47.65.6 1 .13.36.2.74.2 1.13s-.07.77-.2 1.13c-.13.35-.34.7-.6 1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M15 6a3 3 0 1 0-6 0v11m-2-5h8m-8 4h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MobileProblemCard({
  problem,
  index,
  open,
  onToggle,
}: {
  problem: CommonProblemsData["problems"][number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const detail = splitProblemDetail(problem.group, problem.h4);

  return (
    <div className="mb-[10px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-[14px] py-[14px] text-left transition hover:bg-[#fafafa]"
      >
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[8px] bg-[#0d1b2e] text-[#22c55e]">
          <ProblemIcon index={index} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-['Manrope'] text-[13.5px] font-bold leading-[1.25] text-[#0d1b2e]">{detail.title}</div>
          {detail.supporting ? (
            <div className="mt-0.5 text-[10.5px] text-[#9ca3af]">{detail.supporting}</div>
          ) : null}
        </div>
        <span className={`flex-none text-[18px] leading-none text-[#d1d5db] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}>⌄</span>
      </button>

      {open ? (
        <div className="border-t border-[#f1f5f9] px-4 py-4">
          <div className="space-y-3">
            <div className="rounded-[10px] border border-[#e5e7eb] bg-[#f8f9fa] p-3">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.6px] text-[#0d1b2e]">
                <MetaIcon type="models" />
                <span>Affected Models</span>
              </div>
              <p className="text-[12px] leading-[1.55] text-[#374151]">{problem.affectedModels}</p>
            </div>
            <div className="rounded-[10px] border border-[#e5e7eb] bg-[#f8f9fa] p-3">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.6px] text-[#0d1b2e]">
                <MetaIcon type="mileage" />
                <span>Typical Failure Mileage</span>
              </div>
              <p className="text-[12px] leading-[1.55] text-[#374151]">{problem.typicalFailureMileage}</p>
            </div>
            <div className="rounded-[10px] border border-[#e5e7eb] bg-[#f8f9fa] p-3">
              <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.6px] text-[#0d1b2e]">
                <MetaIcon type="root" />
                <span>Root Cause</span>
              </div>
              <p className="text-[12px] leading-[1.55] text-[#374151]">{problem.rootCause}</p>
            </div>
          </div>

          {problem.repairOptions?.length ? (
            <div className="mt-4 space-y-3">
              {problem.repairOptions.map((option, optionIndex) => (
                <div key={`${option.tier || "repair-option"}-${optionIndex}`} className="rounded-[12px] border border-[#e5e7eb] bg-white p-3">
                  <div className="font-['Manrope'] text-[12px] font-bold text-[#0d1b2e]">{option.tier}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-[8px] bg-[#f8f9fa] p-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#9ca3af]">Dealer</div>
                      <div className="mt-1 text-[12px] font-bold text-[#64748b]">{option.dealerPrice}</div>
                    </div>
                    <div className="rounded-[8px] bg-[#f8fbff] p-2">
                      <div className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#0d1b2e]">Specialist</div>
                      <div className="mt-1 text-[12px] font-extrabold text-[#0d1b2e]">{option.specialistPrice}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-[11.5px] leading-[1.55] text-[#374151]">{option.whatItInvolves}</p>
                  <div className="mt-2 rounded-[8px] bg-[#f8f9fa] p-2 text-[11px] leading-[1.5] text-[#6b7280]">{option.longevity}</div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-4">
            <RecommendationCard
              title={`Best next step for ${problem.group.toLowerCase()}`}
              body={problem.recommendation}
              ctaText={problem.cta}
              linkProps={{
                href: "#quote-form",
                "data-quote-context": `${problem.group} - ${problem.h4}`,
                "data-quote-source": "common-problem-detail",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CommonProblemsSection({ data, bgImage }: Props) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);
  const current = useMemo(() => data.problems[active] ?? data.problems[0], [active, data.problems]);
  const heading = splitHeading(data.h2);
  const currentDetail = current ? splitProblemDetail(current.group, current.h4) : null;

  const supportItems = [
    { label: "12-Month Warranty", icon: <WarrantyIcon /> },
    { label: "Upgraded Components", icon: <GearIcon /> },
    { label: "Nationwide UK Delivery", icon: <TruckIcon /> },
    { label: "Save vs Main Dealer Price", icon: <PoundIcon /> },
  ];

  return (
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[200px] lg:block">
          <div
            className="absolute right-0 top-0 h-full w-[300px] opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(270deg, rgba(248,249,250,0.1), rgba(248,249,250,0.92) 45%, rgba(248,249,250,1) 100%), url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className="relative max-w-[1180px]">
        <div className="section-pill mb-[14px]">
          <WarningTriangleIcon />
          <span>{data.tag}</span>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_10px_rgba(13,27,46,0.05)]">
            <h2 className="text-[26px] font-extrabold leading-[1.18] tracking-[-0.5px] text-[#0d1b2e]">
              <span>{heading.primary}</span>
              {heading.accent ? (
                <>
                  <br />
                  <span className="text-[#15803d]">{heading.accent}</span>
                </>
              ) : null}
            </h2>
            <p className="mt-4 text-[12px] leading-[1.7] text-[#6b7280]">{data.h3}</p>

            <div className="mt-5 space-y-2">
              {data.problems.map((problem, index) => {
                const activeProblem = index === active;

                return (
                  <button
                    key={`${problem.group || "problem"}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-3 rounded-[10px] border px-3 py-3 text-left transition ${
                      activeProblem
                        ? "border-[#bbf7d0] bg-[#f0fdf4]"
                        : "border-[#e5e7eb] bg-white hover:border-[#cbd5e1] hover:bg-slate-50"
                    }`}
                  >
                    <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-[8px] ${activeProblem ? "bg-[#15803d] text-white" : "bg-[#0d1b2e] text-white"}`}>
                      <ProblemIcon index={index} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-['Manrope'] text-[13px] font-bold leading-[1.25] text-[#0d1b2e]">
                        {index + 1}. {problem.group}
                      </div>
                    </div>
                    <span className="text-[18px] leading-none text-[#9ca3af]">›</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-[10px] border border-[#dbe6f3] bg-[#f8fbff] px-4 py-3">
              <div className="flex items-start gap-2 text-[#15803d]">
                <WarrantyIcon />
                <p className="text-[11px] leading-[1.5] text-[#6b7280]">
                  Every rebuilt engine includes a minimum 12-month unlimited mileage warranty.
                </p>
              </div>
            </div>
          </div>

          {current ? (
            <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_12px_rgba(13,27,46,0.06)]">
              <div className="flex items-start gap-4 border-b border-[#f1f5f9] pb-4">
                <div className="flex h-[44px] w-[44px] flex-none items-center justify-center rounded-[10px] bg-[#15803d] text-white">
                  <ProblemIcon index={active} />
                </div>
                <div className="min-w-0">
                  <div className="font-['Manrope'] text-[16px] font-extrabold leading-[1.25] text-[#0d1b2e]">
                    {active + 1}. {currentDetail?.title ?? current.group}
                  </div>
                  {currentDetail?.supporting ? (
                    <p className="mt-1 text-[12px] text-[#6b7280]">{currentDetail.supporting}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-[10px] border border-[#f1f5f9] px-4 py-3">
                  <div className="mb-2 flex items-center gap-2 text-[#0d1b2e]">
                    <MetaIcon type="models" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d1b2e]">Affected Models</span>
                  </div>
                  <p className="text-[11.5px] leading-[1.55] text-[#374151]">{current.affectedModels}</p>
                </div>

                <div className="rounded-[10px] border border-[#f1f5f9] px-4 py-3">
                  <div className="mb-2 flex items-center gap-2 text-[#0d1b2e]">
                    <MetaIcon type="mileage" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d1b2e]">Typical Failure Mileage</span>
                  </div>
                  <p className="text-[11.5px] leading-[1.55] text-[#374151]">{current.typicalFailureMileage}</p>
                </div>

                <div className="rounded-[10px] border border-[#f1f5f9] px-4 py-3">
                  <div className="mb-2 flex items-center gap-2 text-[#0d1b2e]">
                    <MetaIcon type="root" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d1b2e]">Root Cause</span>
                  </div>
                  <p className="text-[11.5px] leading-[1.55] text-[#374151]">{current.rootCause}</p>
                </div>
              </div>

              {current.repairOptions?.length ? (
                <>
                  <div className="mt-5 text-[12px] font-bold text-[#0d1b2e]">Repair Options &amp; Estimated Costs (UK ranges)</div>
                  <div className="mt-2 overflow-hidden rounded-[10px] border border-[#e5e7eb]">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#0d1b2e]">
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Repair Tier</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Dealer Price</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Specialist Price</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">What It Involves</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Longevity / Suitability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {current.repairOptions.map((option, optionIndex) => {
                            const variant = tierVariant(option.tier);

                            return (
                              <tr key={`${option.tier || "repair-option"}-${optionIndex}`} className="border-b border-[#f1f5f9] align-top last:border-b-0">
                                <td className="px-[12px] py-[12px] text-[11.5px] text-[#374151]">
                                  <div className="font-['Manrope'] text-[12px] font-bold text-[#0d1b2e]">{option.tier}</div>
                                  <div className={`mt-2 inline-flex rounded-[999px] px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.05em] ${
                                    variant === "recommended"
                                      ? "bg-[#f0fdf4] text-[#15803d]"
                                      : variant === "moderate"
                                        ? "bg-[#fff7ed] text-[#c2410c]"
                                        : "bg-[#f8fafc] text-[#64748b]"
                                  }`}>
                                    {variant === "recommended" ? "Best Value" : variant === "moderate" ? "Intermediate" : "Minor"}
                                  </div>
                                </td>
                                <td className="px-[12px] py-[12px] text-[12px] font-semibold text-[#374151]">{option.dealerPrice}</td>
                                <td className="px-[12px] py-[12px] text-[12px] font-extrabold text-[#15803d]">{option.specialistPrice}</td>
                                <td className="px-[12px] py-[12px] text-[11.5px] leading-[1.55] text-[#374151]">{option.whatItInvolves}</td>
                                <td className="px-[12px] py-[12px] text-[11.5px] leading-[1.55] text-[#374151]">{option.longevity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="mt-4">
                <RecommendationCard
                  title={`Best next step for ${current.group.toLowerCase()}`}
                  body={current.recommendation}
                  ctaText={current.cta}
                  linkProps={{
                    href: "#quote-form",
                    "data-quote-context": `${current.group} - ${current.h4}`,
                    "data-quote-source": "common-problem-detail",
                  }}
                />
              </div>

              {(data.finalCta.h4 || data.finalCta.paragraph || data.finalCta.buttonText) ? (
                <div className="mt-4 rounded-[14px] border border-[#dbe6f3] bg-[#f8fbff] p-4 md:p-5">
                  {data.finalCta.h4 ? (
                    <h4 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#0d1b2e]">
                      {data.finalCta.h4}
                    </h4>
                  ) : null}

                  {data.finalCta.paragraph ? (
                    <p className="mt-3 max-w-[760px] text-[12px] leading-[1.75] text-[#4b5563]">
                      {data.finalCta.paragraph}
                    </p>
                  ) : null}

                  {data.finalCta.buttonText ? (
                    <a
                      href="#quote-form"
                      data-quote-context={data.finalCta.h4 || current.group}
                      data-quote-source="common-problems-final-cta"
                      className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#15803d] px-5 text-[12.5px] font-semibold text-white transition hover:bg-[#166534]"
                    >
                      {data.finalCta.buttonText}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="lg:hidden">
          <h2 className="text-[26px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[36px] md:leading-[1.15] md:tracking-[-0.7px]">
            <span>{heading.primary}</span>
            {heading.accent ? (
              <>
                <br />
                <span className="text-[#15803d]">{heading.accent}</span>
              </>
            ) : null}
          </h2>
          <p className="mb-5 mt-[10px] text-[13px] leading-[1.65] text-[#6b7280]">{data.h3}</p>

          {data.problems.map((problem, index) => (
            <MobileProblemCard
              key={`${problem.group || "problem"}-${index}`}
              problem={problem}
              index={index}
              open={openMobile === index}
              onToggle={() => setOpenMobile((currentIndex) => (currentIndex === index ? -1 : index))}
            />
          ))}

          {(data.finalCta.h4 || data.finalCta.paragraph || data.finalCta.buttonText) ? (
            <div className="mt-4 rounded-[14px] border border-[#dbe6f3] bg-[#f8fbff] p-4">
              {data.finalCta.h4 ? (
                <h4 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#0d1b2e]">
                  {data.finalCta.h4}
                </h4>
              ) : null}

              {data.finalCta.paragraph ? (
                <p className="mt-3 text-[12px] leading-[1.75] text-[#4b5563]">
                  {data.finalCta.paragraph}
                </p>
              ) : null}

              {data.finalCta.buttonText ? (
                <a
                  href="#quote-form"
                  data-quote-context={data.finalCta.h4 || "Common problems"}
                  data-quote-source="common-problems-final-cta"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#15803d] px-5 text-[12.5px] font-semibold text-white transition hover:bg-[#166534]"
                >
                  {data.finalCta.buttonText}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {data.finalCta.disclaimer ? (
          <div className="mt-5 rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 lg:mt-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
              <p className="text-[10.5px] leading-[1.65] text-[#9ca3af] md:text-[11px] md:leading-[1.7]">
                <strong className="font-semibold text-[#6b7280]">Disclaimer:</strong> {data.finalCta.disclaimer}
              </p>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {supportItems.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
                      {item.icon}
                    </div>
                    <span className="text-[10px] leading-[1.35] text-[#6b7280]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

function WarningTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 flex-none" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
