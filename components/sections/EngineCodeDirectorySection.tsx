"use client";

import { useMemo, useState } from "react";
import type { EngineCodeDirectoryData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  data: EngineCodeDirectoryData;
  bgImage?: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function extractCodeLabel(title: string) {
  const match = title.match(/^[A-Z0-9-]+(?:\s*\/\s*[A-Z0-9-]+)*/);
  return match?.[0] ?? title;
}

function getCodeTags(title: string) {
  return extractCodeLabel(title)
    .split("/")
    .map((code) => code.trim())
    .filter(Boolean);
}

export default function EngineCodeDirectorySection({ data, bgImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllCodes, setShowAllCodes] = useState(false);
  const activeFamily = useMemo(() => data.families[activeIndex] ?? data.families[0], [activeIndex, data.families]);
  const hasFamilies = data.families.length > 0;
  const activeEntries = activeFamily?.entries ?? [];

  return (
    <Section className="relative overflow-hidden bg-white">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[220px] w-[300px] opacity-[0.11] lg:h-[280px] lg:w-[390px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.8)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <SectionHeader tag={data.tag} title={data.h2} subtitle={data.intro} />

        {hasFamilies ? (
          <>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {data.families.map((family, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={family.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`shrink-0 rounded-xl border px-3.5 py-3 text-left transition ${
                      isActive
                        ? "border-[#0e2f72] bg-[#0e2f72] text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-green-200 hover:bg-green-50"
                    }`}
                  >
                    <p className="text-[0.83rem] font-bold leading-tight">{family.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="surface-card mt-4 overflow-hidden">
              <div className="divide-y divide-slate-200">
                {activeEntries.slice(0, 3).map((entry) => (
                  <article
                    key={entry.title}
                    className="grid gap-4 px-4 py-4 lg:grid-cols-[168px_1fr_210px] lg:items-center lg:px-4"
                  >
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mx-auto flex aspect-[4/3] max-w-[128px] items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                        {entry.image ? (
                          <img
                            src={entry.image}
                            alt={entry.title}
                            className="h-full w-full object-contain"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="h-full w-full rounded-lg bg-slate-100" />
                        )}
                      </div>
                    </div>

                    <div>
                      <h3>{entry.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {getCodeTags(entry.title).map((tag) => (
                          <span key={tag} className="section-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-small mt-2 text-slate-600">{entry.description}</p>
                    </div>

                    <div className="lg:border-l lg:border-slate-200 lg:pl-5">
                      <a
                        href="#quote-form"
                        data-quote-engine-code={extractCodeLabel(entry.title)}
                        data-quote-context={entry.title}
                        className="inline-flex items-center gap-2 text-sm font-bold text-green-700"
                      >
                        {entry.cta}
                        <ArrowIcon />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className="surface-card mt-5 grid gap-4 px-4 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-label text-green-700">Engine codes covered</p>
            {data.directory.h3 ? <h3 className="mt-1 text-[1rem]">{data.directory.h3}</h3> : null}
            <p className="text-small mt-2 text-slate-600">{data.directory.intro}</p>
          </div>

          <a
            href="#quote-form"
            data-quote-engine-code={activeEntries[0] ? extractCodeLabel(activeEntries[0].title) : ""}
            data-quote-context={activeFamily?.name ?? data.h2}
            className="button-primary"
          >
            Get Quote for This Engine
          </a>
        </div>

        <div className="mt-3">
          {data.directory.label ? (
            <p className="mb-2 text-[0.72rem] font-black uppercase tracking-[0.08em] text-slate-500">{data.directory.label}</p>
          ) : null}
          <div className={`relative overflow-hidden ${showAllCodes ? "" : "max-h-[2.9rem]"}`}>
            <div
              className={`flex gap-2 ${showAllCodes ? "flex-wrap" : "codes-row-peek flex-nowrap whitespace-nowrap"}`}
            >
              {data.directory.codes.map((item, index) => (
                <span key={`${item.code}-${item.fuel || "unknown"}-${index}`} className="code-label-chip shrink-0">
                  {item.code}
                </span>
              ))}
            </div>

            {!showAllCodes ? (
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/92 to-transparent" />
            ) : null}
          </div>

          {data.directory.codes.length > 12 ? (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllCodes((current) => !current)}
                className="rounded-full bg-slate-100 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.08em] text-[#0a2952] transition hover:bg-green-50 hover:text-green-700"
              >
                {showAllCodes ? "Show fewer codes" : "View all engine codes"}
              </button>
            </div>
          ) : null}
        </div>

        <div className="section-callout mt-5 px-4 py-3.5">
          <p className="text-small text-center font-semibold text-green-900">{data.closing}</p>
        </div>
      </Container>
    </Section>
  );
}
