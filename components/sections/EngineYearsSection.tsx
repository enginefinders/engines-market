"use client";

import { useState, type ChangeEvent } from "react";
import type { EngineYearsData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineYearsData;
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 7h11v9H3V7Zm11 3h3l3 3v3h-6v-6Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M15 6a3 3 0 1 0-6 0v11m-2-5h8m-8 4h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 36 24" className="h-5 w-7 rounded-[3px]" aria-hidden="true">
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#C8102E" strokeWidth="3" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
      <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="4.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function scrollToYear(value: string) {
  if (!value) return;

  const target = document.getElementById(`year-${value.replace(/[^0-9]/g, "-")}`);
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function compactYearCta(year: string, cta: string) {
  if (cta.toLowerCase().includes("compare")) {
    return `Compare ${year} engine prices`;
  }

  return `Get quotes for ${year} engines`;
}

export default function EngineYearsSection({ brandName, data }: Props) {
  const [registration, setRegistration] = useState("");
  const midpoint = Math.ceil(data.years.length / 2);
  const yearColumns = [data.years.slice(0, midpoint), data.years.slice(midpoint)];

  return (
    <Section className="bg-[#fcfdff]">
      <Container className="max-w-[1300px]">
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-label text-green-700">{data.tag}</p>
            <h2 className="mt-2 text-[#0a2952]">{data.h2}</h2>
            <p className="text-body mt-2.5 text-slate-600">{data.intro}</p>
          </div>

          <div className="relative min-h-[180px] overflow-visible">
            <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(135deg,rgba(238,249,241,0.7)_0%,rgba(255,255,255,0.92)_46%,rgba(226,244,235,0.92)_100%)]" />
            <div className="absolute right-0 top-0 h-full w-[56%] rounded-[26px] bg-[linear-gradient(145deg,rgba(210,240,222,0.92)_0%,rgba(233,248,239,0.75)_52%,rgba(255,255,255,0.35)_100%)]" />

            <div className="relative flex min-h-[180px] items-center justify-end px-4 py-3 sm:px-5">
              <div className="w-full max-w-[302px] rounded-[18px] bg-[#0b2850] px-5 py-4 text-white shadow-[0_14px_30px_rgba(7,25,54,0.2)]">
                <p className="text-label text-green-300">{data.jumpLabel}</p>

                <div className="mt-3 rounded-[14px] border border-white/10 bg-[#102f5f] px-4 py-3">
                  <label htmlFor="year-jump-select" className="sr-only">
                    Select a year
                  </label>
                  <select
                    id="year-jump-select"
                    defaultValue=""
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => scrollToYear(event.target.value)}
                    className="w-full bg-transparent text-[0.95rem] font-semibold text-white outline-none"
                  >
                    <option value="" disabled className="text-slate-900">
                      Select a year...
                    </option>
                    {data.years.map((item) => (
                      <option key={item.year} value={item.year} className="text-slate-900">
                        {item.year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {yearColumns.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="relative space-y-3 pl-4">
              <div className="absolute bottom-2 left-0 top-2 w-px bg-[#d6ebe0]" />

              {column.map((item) => (
                <article
                  id={`year-${item.year.replace(/[^0-9]/g, "-")}`}
                  key={item.year}
                  className="relative surface-card overflow-hidden"
                >
                  <span className="absolute left-[-1.05rem] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#d6ebe0] bg-white" />

                  <div className="grid gap-0 md:grid-cols-[108px_minmax(0,1fr)_154px]">
                    <div className="flex min-h-full items-center justify-center bg-[#102e72] px-3 py-4 text-white">
                      <div className="flex items-center gap-2">
                        <CalendarIcon />
                        <span className="text-[1.15rem] font-black leading-none">{item.year}</span>
                      </div>
                    </div>

                    <div className="px-4 py-3.5">
                      <p className="text-[0.86rem] font-semibold leading-6 text-slate-700">{item.preview}</p>
                      <p className="mt-2 text-[0.78rem] leading-5 text-slate-600">{item.description}</p>

                      {(item.keyChanges?.length ||
                        item.mainEngines?.length ||
                        item.popularModels?.length ||
                        item.knownFor?.length ||
                        item.engineCodesCovered?.length ||
                        item.ticker) && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {item.keyChanges?.length ? (
                            <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Key changes</p>
                              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-small font-semibold text-slate-700">
                                {item.keyChanges.slice(0, 4).map((point, index) => (
                                  <li key={`${point}-${index}`}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {item.mainEngines?.length ? (
                            <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Main engines</p>
                              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-small font-semibold text-slate-700">
                                {item.mainEngines.slice(0, 4).map((point, index) => (
                                  <li key={`${point}-${index}`}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {item.popularModels?.length ? (
                            <div className="rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2.5">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Popular models</p>
                              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-small font-semibold text-slate-700">
                                {item.popularModels.map((point, index) => (
                                  <li key={`${point}-${index}`}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {item.engineCodesCovered?.length ? (
                            <div className="rounded-xl bg-white ring-1 ring-slate-200 px-3 py-2.5">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Engine codes covered</p>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {item.engineCodesCovered.map((code, index) => (
                                  <span key={`${code}-${index}`} className="summary-badge">
                                    {code}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {item.knownFor?.length ? (
                            <div className="rounded-xl bg-green-50 px-3 py-2.5 sm:col-span-2">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-green-700">Known for</p>
                              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-small font-semibold text-green-900">
                                {item.knownFor.slice(0, 4).map((point, index) => (
                                  <li key={`${point}-${index}`}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {item.ticker ? (
                            <div className="rounded-xl bg-[#f2f7ff] px-3 py-2.5 sm:col-span-2">
                              <p className="text-tiny font-black uppercase tracking-[0.12em] text-[#0a2952]">Common replacement enquiries</p>
                              <p className="mt-1 text-small font-semibold text-[#35506b]">{item.ticker}</p>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center px-4 pb-3.5 md:justify-end md:pb-0 md:pl-0">
                      <a
                        href="#quote-form"
                        data-quote-context={`${item.year} ${brandName} engines`}
                        data-quote-source="engine-years"
                        className="inline-flex items-center gap-2 text-[0.84rem] font-bold leading-5 text-green-700"
                      >
                        {compactYearCta(item.year, item.cta)}
                        <ArrowIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-[22px] border border-[#0e3164] bg-[#071c47] text-white shadow-[0_16px_34px_rgba(7,25,54,0.16)]">
          <div className="grid gap-3 px-4 py-3 lg:grid-cols-[1.02fr_1.08fr_0.85fr] lg:items-center">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-300">
                <CalendarIcon />
              </div>
              <div className="max-w-[330px]">
                <p className="text-sm font-semibold text-white">Not sure which year your {brandName} was built?</p>
                <p className="mt-1.5 text-[0.74rem] leading-5 text-slate-200">{data.closing}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white shadow-[0_12px_28px_rgba(7,25,54,0.12)]">
              <div className="grid sm:grid-cols-[88px_minmax(0,1fr)_150px]">
                <div className="flex items-center justify-center gap-2 border-b border-slate-200 px-3 py-2 text-[0.76rem] font-bold text-[#0b2850] sm:border-b-0 sm:border-r">
                  <UkFlagIcon />
                  <span>UK</span>
                </div>
                <input
                  type="text"
                  value={registration}
                  onChange={(event) => setRegistration(event.target.value.toUpperCase())}
                  placeholder="Enter your registration number"
                  className="min-w-0 border-b border-slate-200 px-4 py-2 text-[0.8rem] font-semibold text-[#0b2850] outline-none placeholder:text-slate-400 sm:border-b-0 sm:border-r"
                />
                <a href="#quote-form" data-quote-context={`${brandName} engine year finder`} data-quote-source="engine-years-summary" className="button-primary min-h-full rounded-none px-4 py-2 text-[0.76rem] shadow-none">
                  Find My Engine
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:justify-end">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-300">
                <ShieldIcon />
              </div>
              <p className="max-w-[220px] text-[0.74rem] leading-5 text-slate-200">
                All engines supplied with a minimum 12-month warranty from UK {brandName} specialists.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { icon: BoltIcon, title: "Instant Quotes", subtitle: "From UK specialists" },
            { icon: ShieldIcon, title: "No Obligation", subtitle: "100% free to use" },
            { icon: TruckIcon, title: "Nationwide Delivery", subtitle: "Fast & secure" },
            { icon: CalendarIcon, title: "Trusted UK Suppliers", subtitle: "Quality engines, guaranteed" },
            { icon: PoundIcon, title: "Competitive Prices", subtitle: "Save hundreds" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl px-2 py-1.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <item.icon />
              </div>
              <div>
                <p className="text-[0.82rem] font-black uppercase tracking-[0.04em] text-[#0a2952]">{item.title}</p>
                <p className="text-small mt-1 text-slate-600">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
