"use client";

import { useState } from "react";
import type { CommonProblemsData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: CommonProblemsData;
  bgImage?: string;
};

export default function CommonProblemsSection({ data, bgImage }: Props) {
  const [active, setActive] = useState(0);
  const current = data.problems[active];

  return (
    <Section className="relative overflow-hidden bg-slate-50">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[240px] w-[320px] opacity-[0.12] lg:h-[300px] lg:w-[420px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,250,252,0.1), rgba(248,250,252,0.75)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <div className="grid gap-5 lg:grid-cols-[0.74fr_1.26fr]">
          <aside className="surface-card-soft h-fit overflow-hidden">
            <div className="border-b border-slate-200 px-4 py-4">
              <p className="text-label text-green-700">{data.tag}</p>
              <h2 className="mt-2">{data.h2}</h2>
              <p className="text-small mt-3 text-slate-600">{data.h3}</p>
            </div>

            <div className="space-y-2 p-2.5">
              {data.problems.map((problem, index) => {
                const isActive = active === index;

                return (
                  <button
                    key={problem.group}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      isActive
                        ? "bg-white shadow-sm ring-1 ring-green-200"
                        : "hover:bg-white/[0.8]"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
                      <img
                        src={problem.image || ""}
                        alt={problem.group}
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#071936]">
                        {index + 1}. {problem.group}
                      </p>
                      <p className="text-small mt-1 text-slate-500">{problem.h4}</p>
                    </div>
                  </button>
                );
              })}
            </div>

              <div className="border-t border-slate-200 bg-white px-4 py-3.5">
              <p className="text-small font-semibold text-slate-700">{data.finalCta.disclaimer}</p>
            </div>
          </aside>

          <div className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 px-4 py-4 lg:px-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5">
                  <img
                    src={current.image || ""}
                    alt={current.group}
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-label text-green-700">Issue {active + 1}</p>
                  <h3 className="mt-1 text-[1.28rem] font-black leading-[1.05] text-[#071936]">
                    {current.group}
                  </h3>
                  <p className="mt-1.5 text-[0.88rem] font-semibold text-slate-600">{current.h4}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-0 rounded-2xl border border-slate-200 bg-white md:grid-cols-[1.05fr_0.8fr_1.15fr]">
                <div className="px-4 py-4">
                  <p className="text-sm font-bold text-[#071936]">Affected models</p>
                  <p className="text-small mt-2 text-slate-600">{current.affectedModels}</p>
                </div>

                <div className="border-t border-slate-200 px-4 py-4 md:border-l md:border-t-0">
                  <p className="text-sm font-bold text-[#071936]">Typical failure mileage</p>
                  <p className="text-small mt-2 text-slate-600">{current.typicalFailureMileage}</p>
                </div>

                <div className="border-t border-slate-200 bg-green-50/65 px-4 py-4 md:border-l md:border-t-0">
                  <p className="text-sm font-bold text-[#071936]">Root cause</p>
                  <p className="mt-2 text-[0.98rem] font-semibold leading-7 text-[#0f2a18]">{current.rootCause}</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-4 lg:px-5">
              <div className="rounded-2xl border border-slate-200 bg-white">
                <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="border-b border-slate-200 px-4 py-4 md:border-b-0 md:border-r">
                    <p className="text-label text-green-700">Repair outlook</p>
                    <p className="text-small mt-3 text-slate-600">
                      This failure is one of the main reasons owners move from repair quotes to full engine replacement. The issue usually escalates once noise, oil starvation, heat damage, or contamination spreads across the unit.
                    </p>
                  </div>

                  <div className="px-4 py-4">
                    <p className="text-label text-green-700">Recommended path</p>
                    <p className="mt-3 text-small font-semibold text-slate-700">{current.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-4">
                <div className="max-w-2xl">
                  <p className="text-label text-green-700">{data.finalCta.h4}</p>
                  <p className="text-small mt-2 text-slate-700">{data.finalCta.paragraph}</p>
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={`${current.group} - ${current.h4}`}
                  data-quote-source="common-problems"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-800"
                >
                  {current.cta}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
