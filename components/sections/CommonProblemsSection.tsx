"use client";

import { useMemo, useState } from "react";
import type { CommonProblemsData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: CommonProblemsData;
  bgImage?: string;
};

function normalizeText(text: string) {
  return text.replace(/[â€“â€”]/g, "-");
}

function tabLabel(problem: CommonProblemsData["problems"][number]) {
  return normalizeText(problem.group).trim();
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
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>,
    <svg key="1" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="2" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>,
    <svg key="3" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2.76 1.12-5.26 2.93-7.07"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ];

  return icons[index % icons.length];
}

function CheckShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="12 5 19 12 12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetaDot({ color }: { color: "green" | "amber" }) {
  return <span className={`mt-[4px] h-[7px] w-[7px] flex-none rounded-full ${color === "green" ? "bg-[#15803d]" : "bg-[#f59e0b]"}`} />;
}

function DesktopProblemPanel({
  problem,
  index,
}: {
  problem: CommonProblemsData["problems"][number];
  index: number;
}) {
  return (
    <>
      <div className="rounded-[12px] border border-[#e5e7eb] bg-white px-[22px] py-5">
        <div className="mb-[14px] flex items-start gap-[14px]">
          <div className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[10px] bg-[#0d1b2e] text-[#22c55e]">
            <ProblemIcon index={index} />
          </div>
          <div className="min-w-0">
            <h3 className="font-['Manrope'] text-[20px] font-extrabold leading-[1.25] text-[#0d1b2e]">{problem.group}</h3>
            <p className="mt-1 text-[12px] text-[#6b7280]">{problem.h4}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[#f1f5f9] pt-3">
          <div className="flex items-start gap-[6px] text-[12px]">
            <MetaDot color="green" />
            <span>
              <span className="font-medium text-[#6b7280]">Affected: </span>
              <span className="font-bold text-[#0d1b2e]">{problem.affectedModels}</span>
            </span>
          </div>
          <div className="flex items-start gap-[6px] text-[12px]">
            <MetaDot color="amber" />
            <span>
              <span className="font-medium text-[#6b7280]">Mileage: </span>
              <span className="font-bold text-[#0d1b2e]">{problem.typicalFailureMileage}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-r-[8px] rounded-l-none border-l-[3px] border-[#0d1b2e] bg-[#f8f9fa] px-4 py-3 text-[13px] leading-[1.75] text-[#374151]">
        <strong className="mb-1 block text-[11px] font-bold uppercase tracking-[0.6px] text-[#0d1b2e]">Root Cause</strong>
        {problem.rootCause}
      </div>

      {problem.repairOptions?.length ? (
        <>
          <p className="mb-[10px] mt-4 text-[11px] font-bold uppercase tracking-[0.7px] text-[#0d1b2e]">
            Repair Options &amp; UK Cost Ranges
          </p>
          <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0d1b2e]">
                    <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
                      Repair Tier
                    </th>
                    <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
                      Specialist Price
                    </th>
                    <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
                      Dealer Price
                    </th>
                    <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
                      What It Involves
                    </th>
                    <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">
                      Longevity / Suitability
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {problem.repairOptions.map((option) => {
                    const variant = tierVariant(option.tier);

                    return (
                      <tr
                        key={option.tier}
                        className={`border-b border-[#f1f5f9] align-top last:border-b-0 ${
                          variant === "recommended" ? "bg-[#f0fdf4] hover:bg-[#dcfce7]" : "hover:bg-[#fafafa]"
                        }`}
                      >
                        <td className="px-[14px] py-[13px] text-[12.5px] text-[#374151]">
                          <div className="font-['Manrope'] text-[13px] font-bold text-[#0d1b2e]">
                            {option.tier}
                            {variant === "recommended" ? (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-[4px] bg-[#15803d] px-2 py-[2px] text-[10px] font-bold text-white">
                                Recommended
                              </span>
                            ) : null}
                          </div>
                          <span
                            className={`mt-1 inline-block rounded-[4px] border px-2 py-[2px] text-[10px] font-bold ${
                              variant === "recommended"
                                ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                                : variant === "moderate"
                                  ? "border-[#fed7aa] bg-[#fff7ed] text-[#c2410c]"
                                  : "border-[#e5e7eb] bg-[#f1f5f9] text-[#6b7280]"
                            }`}
                          >
                            {variant === "recommended" ? "Best Value" : variant === "moderate" ? "Moderate" : "Minor"}
                          </span>
                        </td>
                        <td className="px-[14px] py-[13px] text-[12.5px]">
                          <span className="font-['Manrope'] text-[14px] font-extrabold text-[#15803d]">{option.specialistPrice}</span>
                        </td>
                        <td className="px-[14px] py-[13px] text-[12.5px]">
                          <span className="font-['Manrope'] text-[13px] font-bold text-[#9ca3af] line-through">{option.dealerPrice}</span>
                        </td>
                        <td className="px-[14px] py-[13px] text-[12.5px] leading-[1.7] text-[#374151]">{option.whatItInvolves}</td>
                        <td className="px-[14px] py-[13px] text-[12.5px] leading-[1.7] text-[#374151]">{option.longevity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}

      <div className="mt-4 rounded-[10px] border-[1.5px] border-[#bbf7d0] bg-[#f0fdf4] px-[18px] py-4">
        <div className="mb-[10px] flex items-center gap-2">
          <span className="text-[#15803d]">
            <CheckShieldIcon />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.7px] text-[#15803d]">Our Recommendation</span>
        </div>
        <p className="text-[13px] leading-[1.75] text-[#374151]">{problem.recommendation}</p>
        <a
          href="#quote-form"
          data-quote-context={`${problem.group} - ${problem.h4}`}
          data-quote-source="common-problem-detail"
          className="mt-[10px] inline-flex items-center gap-[6px] text-[12.5px] font-bold text-[#15803d] transition hover:underline"
        >
          <ArrowRightIcon />
          <span>{problem.cta}</span>
        </a>
      </div>
    </>
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
          <div className="font-['Manrope'] text-[13.5px] font-bold leading-[1.25] text-[#0d1b2e]">{problem.group}</div>
          <div className="mt-0.5 text-[10.5px] text-[#9ca3af]">{problem.h4}</div>
        </div>
        <span className={`flex-none text-[18px] leading-none text-[#d1d5db] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}>⌄</span>
      </button>

      {open ? (
        <div className="border-t border-[#f1f5f9]">
          <div className="flex flex-col gap-[7px] border-b border-[#f1f5f9] px-4 py-[14px]">
            <div className="flex items-start gap-2 text-[12px] leading-[1.45]">
              <MetaDot color="green" />
              <span>
                <span className="mr-1 font-semibold text-[#374151]">Affected</span>
                <span className="text-[#6b7280]">{problem.affectedModels}</span>
              </span>
            </div>
            <div className="flex items-start gap-2 text-[12px] leading-[1.45]">
              <MetaDot color="amber" />
              <span>
                <span className="mr-1 font-semibold text-[#374151]">Mileage</span>
                <span className="text-[#6b7280]">{problem.typicalFailureMileage}</span>
              </span>
            </div>
          </div>

          <div className="border-b border-[#f1f5f9] px-4 py-3">
            <div className="mb-[5px] text-[10px] font-bold uppercase tracking-[0.7px] text-[#9ca3af]">Root Cause</div>
            <p className="text-[12px] leading-[1.6] text-[#374151]">{problem.rootCause}</p>
          </div>

          {problem.repairOptions?.length ? (
            <>
              <div className="px-4 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.7px] text-[#9ca3af]">
                Repair Options &amp; UK Cost Ranges
              </div>
              {problem.repairOptions.map((option) => {
                const variant = tierVariant(option.tier);

                return (
                  <div key={option.tier} className="border-t border-[#f1f5f9]">
                    <div className="flex items-center justify-between bg-[#0d1b2e] px-4 py-[10px]">
                      <div className="min-w-0 font-['Manrope'] text-[12px] font-bold text-white">{option.tier}</div>
                      <span
                        className={`ml-3 rounded-full border px-[9px] py-[2px] text-[9px] font-bold uppercase tracking-[0.5px] ${
                          variant === "recommended"
                            ? "border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                            : variant === "moderate"
                              ? "border-[rgba(251,146,60,0.3)] bg-[rgba(251,146,60,0.15)] text-[#fb923c]"
                              : "border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.15)] text-[#fbbf24]"
                        }`}
                      >
                        {variant === "recommended" ? "Recommended" : variant === "moderate" ? "Moderate" : "Minor"}
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      <div className="mb-[10px]">
                        <div className="flex items-center justify-between border-b border-[#f8f9fa] py-[5px]">
                          <span className="text-[11.5px] text-[#6b7280]">Specialist</span>
                          <span className="font-['Manrope'] text-[13px] font-bold text-[#15803d]">{option.specialistPrice}</span>
                        </div>
                        <div className="flex items-center justify-between py-[5px]">
                          <span className="text-[11.5px] text-[#6b7280]">Dealer</span>
                          <span className="font-['Manrope'] text-[12px] font-semibold text-[#374151]">{option.dealerPrice}</span>
                        </div>
                      </div>
                      <p className="mb-2 text-[11.5px] leading-[1.55] text-[#374151]">{option.whatItInvolves}</p>
                      <div className="flex items-start gap-[6px] rounded-[7px] bg-[#f8f9fa] px-[10px] py-2 text-[11px] leading-[1.5] text-[#6b7280]">
                        <span className="mt-[2px] text-[9px] text-[#15803d]">●</span>
                        <span>{option.longevity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}

          <div className="mx-4 mb-[14px] mt-[14px] rounded-[10px] border border-[#bbf7d0] bg-[#f0fdf4] p-[14px]">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[#15803d]">
                <CheckShieldIcon />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.8px] text-[#15803d]">Our Recommendation</span>
            </div>
            <p className="mb-[10px] text-[12px] leading-[1.65] text-[#374151]">{problem.recommendation}</p>
            <a
              href="#quote-form"
              data-quote-context={`${problem.group} - ${problem.h4}`}
              data-quote-source="common-problem-detail"
              className="inline-flex items-center gap-[5px] text-[12px] font-semibold text-[#15803d] transition hover:underline"
            >
              <ArrowRightIcon />
              <span>{problem.cta}</span>
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CommonProblemsSection({ data, bgImage: _bgImage }: Props) {
  void _bgImage;

  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(0);
  const current = useMemo(() => data.problems[active] ?? data.problems[0], [active, data.problems]);

  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1180px]">
        <div className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#15803d] md:rounded-md md:px-3 md:py-[5px] md:text-[11px] md:tracking-[0.7px]">
          <WarningTriangleIcon />
          <span>{data.tag}</span>
        </div>

        <h2 className="font-['Manrope'] text-[24px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[34px] md:leading-[1.15] md:tracking-[-0.7px]">
          {data.h2}
        </h2>
        <p className="mb-6 mt-[10px] max-w-[900px] text-[13px] leading-[1.65] text-[#6b7280] md:mb-6 md:text-[13.5px] md:leading-[1.8]">
          {data.h3}
        </p>

        <div className="mb-5 hidden flex-wrap gap-[6px] md:flex">
          {data.problems.map((problem, index) => (
            <button
              key={problem.group}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-[8px] border px-4 py-2 font-['Manrope'] text-[12.5px] font-bold transition ${
                active === index
                  ? "border-[#15803d] bg-[#15803d] text-white"
                  : "border-[#d1d5db] bg-white text-[#4b5563] hover:border-[#15803d] hover:text-[#0d1b2e]"
              }`}
            >
              {tabLabel(problem)}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          {current ? <DesktopProblemPanel problem={current} index={active} /> : null}
        </div>

        <div className="md:hidden">
          {data.problems.map((problem, index) => (
            <MobileProblemCard
              key={problem.group}
              problem={problem}
              index={index}
              open={openMobile === index}
              onToggle={() => setOpenMobile((currentIndex) => (currentIndex === index ? -1 : index))}
            />
          ))}
        </div>

        <div className="mt-6 rounded-[12px] bg-[#0d1b2e] px-[18px] py-[22px] md:mt-7 md:rounded-[14px] md:px-8 md:py-8">
          <div role="heading" aria-level={3} className="font-['Manrope'] text-[21px] font-extrabold leading-[1.2] text-white md:text-[30px]">
            {data.finalCta.h4}
          </div>
          <p className="mb-[18px] mt-[10px] max-w-[640px] text-[12.5px] leading-[1.65] text-[#94a3b8] md:mb-[22px] md:text-[13.5px] md:leading-[1.8]">
            {data.finalCta.paragraph}
          </p>
          <a
            href="#quote-form"
            data-quote-context={data.finalCta.h4}
            data-quote-source="common-problems"
            className="inline-flex items-center justify-between gap-[10px] rounded-[8px] bg-[#15803d] px-4 py-[13px] font-['Manrope'] text-[13px] font-bold text-white transition hover:bg-[#166534] md:rounded-[10px] md:px-7 md:py-[14px] md:text-[15px]"
          >
            <span>{data.finalCta.buttonText.replace(/(?:->|â†’)\s*$/, "").trim()}</span>
            <ArrowRightIcon />
          </a>
        </div>

        {data.finalCta.disclaimer ? (
          <div className="mt-5 rounded-[10px] border border-[#e5e7eb] bg-white p-[14px] md:mt-[14px] md:px-[18px] md:py-[14px]">
            <p className="text-[10.5px] leading-[1.65] text-[#9ca3af] md:text-[11.5px] md:leading-[1.75]">
              <strong className="font-semibold text-[#6b7280]">Disclaimer:</strong> {data.finalCta.disclaimer}
            </p>
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
