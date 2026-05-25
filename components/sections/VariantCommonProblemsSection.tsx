"use client";

import { useState } from "react";
import type { CommonProblemsData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: CommonProblemsData;
};

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
  );
}

function splitProblemHeading(text: string) {
  const normalized = text.replace(/[â€“â€”]/g, "-");
  const parts = normalized.split(/\s+-\s+/);
  return {
    title: parts[0] ?? normalized,
    supporting: parts.length > 1 ? parts.slice(1).join(" - ") : "",
  };
}

function severityLabel(text: string) {
  const normalized = text.toLowerCase();
  if (normalized.includes("timing chain") || normalized.includes("catastrophic")) {
    return {
      label: "High Risk",
      className: "border-[#fecdd3] bg-[#fff1f2] text-[#be123c]",
    };
  }

  return {
    label: "Watchpoint",
    className: "border-[#d9f99d] bg-[#f7fee7] text-[#3f6212]",
  };
}

function SelectorCard({
  problem,
  active,
  onClick,
}: {
  problem: CommonProblemsData["problems"][number];
  active: boolean;
  onClick: () => void;
}) {
  const detail = splitProblemHeading(problem.h4);
  const severity = severityLabel(problem.h4);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[12px] border px-3 py-2.5 text-left transition ${
        active
          ? "border-[#0d1b2e] bg-[#0d1b2e] text-white shadow-[0_10px_20px_rgba(13,27,46,0.12)]"
          : "border-slate-200 bg-white text-[#0d1b2e] shadow-[0_2px_10px_rgba(13,27,46,0.04)] hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div
            className={`inline-flex rounded-full border px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${
              active ? "border-white/15 bg-white/10 text-white" : severity.className
            }`}
          >
            {severity.label}
          </div>
          <h3 className="mt-1.5 font-['Manrope'] text-[14px] font-extrabold leading-[1.25] tracking-[-0.03em]">
            {detail.title}
          </h3>
        </div>
        <span
          className={`mt-1 h-2 w-2 flex-none rounded-full ${active ? "bg-white" : "bg-[#15803d]"}`}
          aria-hidden="true"
        />
      </div>

      <div className={`mt-1 text-[10.5px] leading-[1.45] ${active ? "text-white" : "text-slate-600"}`}>
        {detail.supporting || "Specialist repair and replacement guidance"}
      </div>
      <div className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.04em] ${active ? "text-white" : "text-[#15803d]"}`}>
        {problem.typicalFailureMileage}
      </div>
    </button>
  );
}

function CostPathCard({
  option,
  highlight,
}: {
  option: NonNullable<CommonProblemsData["problems"][number]["repairOptions"]>[number];
  highlight: boolean;
}) {
  return (
    <div
      className={`rounded-[12px] border p-3 ${
        highlight
          ? "border-[#15803d] bg-[#f0fdf4] shadow-[0_8px_18px_rgba(21,128,61,0.10)]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-['Manrope'] text-[13px] font-extrabold leading-[1.3] tracking-[-0.03em] text-[#0d1b2e]">
          {option.tier}
        </h4>
        {highlight ? (
          <span className="inline-flex rounded-full bg-[#15803d] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white">
            Best Value
          </span>
        ) : null}
      </div>

      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-[10px] border border-slate-200 bg-white px-2.5 py-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">Dealer</p>
          <p className="mt-1 text-[12px] font-bold text-slate-700">{option.dealerPrice}</p>
        </div>
        <div className="rounded-[10px] border border-[#bbf7d0] bg-white px-2.5 py-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500">Specialist</p>
          <p className="mt-1 text-[12px] font-extrabold text-[#15803d]">{option.specialistPrice}</p>
        </div>
      </div>

      <p className="mt-2 text-[10.5px] leading-[1.5] text-slate-700">{option.whatItInvolves}</p>
      <div className="mt-2 rounded-[10px] bg-white px-2.5 py-2 text-[10px] leading-[1.45] text-slate-600">
        {option.longevity}
      </div>
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-2.5 py-2">
      <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-slate-500">{label}</p>
      <p className="mt-1 text-[11px] leading-[1.5] text-slate-700">{value}</p>
    </div>
  );
}

export default function VariantCommonProblemsSection({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentProblem = data.problems[activeIndex] ?? data.problems[0];
  const repairOptions = currentProblem?.repairOptions ?? [];

  if (!currentProblem) {
    return null;
  }

  const detail = splitProblemHeading(currentProblem.h4);

  return (
    <Section className="bg-[#f8f9fa] !py-3 sm:!py-4 lg:!py-5">
      <Container className="max-w-[1180px]">
        <div className="max-w-[760px]">
          <p className="section-pill">
            <WarningIcon />
            {data.tag}
          </p>
          <h2 className="mt-1.5">{data.h2}</h2>
          <p className="text-body mt-2 text-slate-600">{data.h3}</p>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {data.problems.map((problem, index) => (
            <SelectorCard
              key={`${problem.group}-${index}`}
              problem={problem}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="mt-2.5 rounded-[16px] border border-slate-200 bg-white p-3 shadow-[0_6px_18px_rgba(13,27,46,0.05)] lg:p-3.5">
          <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="max-w-[720px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#15803d]">Failure Analysis</p>
              <h3 className="mt-1 font-['Manrope'] text-[17px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">
                {detail.title}
              </h3>
              {detail.supporting ? (
                <p className="mt-0.5 text-[11px] leading-[1.5] text-slate-600">{detail.supporting}</p>
              ) : null}
            </div>

            {currentProblem.cta ? (
              <a
                href="#quote-form"
                data-quote-context={`${currentProblem.group} diagnosis`}
                data-quote-source="variant-common-problems"
                className="inline-flex min-h-[34px] items-center justify-center rounded-[10px] bg-[#15803d] px-3 text-[10.5px] font-bold text-white transition hover:bg-[#166534]"
              >
                {currentProblem.cta}
              </a>
            ) : null}
          </div>

          <div className="mt-2.5 grid gap-2 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
            <div className="space-y-2.5">
              <div className="grid gap-2 md:grid-cols-3">
                <MetaCard label="Affected Models" value={currentProblem.affectedModels} />
                <MetaCard label="Typical Failure Mileage" value={currentProblem.typicalFailureMileage} />
                <MetaCard label="Root Cause" value={currentProblem.rootCause} />
              </div>

              {repairOptions.length ? (
                <div>
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-slate-500">Repair Cost Guide</p>
                  <h4 className="mt-0.5 font-['Manrope'] text-[15px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">
                    UK repair routes at a glance
                  </h4>

                  <div className="mt-2 grid gap-2 xl:grid-cols-3">
                    {repairOptions.map((option, index) => (
                      <CostPathCard
                        key={`${option.tier}-${index}`}
                        option={option}
                        highlight={index === repairOptions.length - 1}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="rounded-[14px] border border-[#dbeafe] bg-[#f8fbff] px-3 py-2.5">
                <p className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-[#15803d]">Our Recommendation</p>
                <p className="mt-1 text-[11px] leading-[1.55] text-slate-700">{currentProblem.recommendation}</p>
              </div>

              {(data.finalCta.h4 || data.finalCta.paragraph || data.finalCta.buttonText) ? (
                <div className="rounded-[14px] border border-[#0d1b2e] bg-[#0d1b2e] px-3 py-2.5 text-white">
                  {data.finalCta.h4 ? (
                    <h4 className="font-['Manrope'] text-[14px] font-extrabold tracking-[-0.03em] text-white">
                      {data.finalCta.h4}
                    </h4>
                  ) : null}
                  {data.finalCta.paragraph ? (
                    <p className="mt-1 text-[10.5px] leading-[1.5] text-white">{data.finalCta.paragraph}</p>
                  ) : null}
                  {data.finalCta.buttonText ? (
                    <a
                      href="#quote-form"
                      data-quote-context={data.finalCta.h4 || currentProblem.group}
                      data-quote-source="variant-common-problems-final-cta"
                      className="mt-2 inline-flex min-h-[34px] items-center justify-center rounded-[10px] bg-[#15803d] px-3 text-[10.5px] font-bold text-white transition hover:bg-[#166534]"
                    >
                      {data.finalCta.buttonText}
                    </a>
                  ) : null}
                </div>
              ) : null}

              {data.finalCta.disclaimer ? (
                <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2 text-[9.5px] leading-[1.5] text-slate-500">
                  <span className="font-bold uppercase tracking-[0.08em] text-slate-700">DISCLAIMER:</span>
                  <p className="mt-1">{data.finalCta.disclaimer}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
