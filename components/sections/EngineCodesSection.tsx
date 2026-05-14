"use client";

import { useMemo, useState } from "react";
import type { EngineCodesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineCodesData;
  bgImage?: string;
};

function MoneyTagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[14px] w-[14px] flex-none text-[#15803d] transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points="6 9 12 15 18 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GroupIcon({ index }: { index: number }) {
  const icons = [
    <svg key="0" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.8" />
      <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.8" />
    </svg>,
    <svg key="1" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" stroke="currentColor" strokeWidth="1.8" />
    </svg>,
    <svg key="2" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>,
    <svg key="3" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>,
    <svg key="4" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.8" />
    </svg>,
  ];

  return icons[index % icons.length];
}

function QuoteArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-[11px] w-[11px]" fill="none" aria-hidden="true">
      <polyline
        points="9 18 15 12 9 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="12 5 19 12 12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function fuelClass(fuel: string) {
  return /petrol/i.test(fuel)
    ? "border-[#fed7aa] bg-[#fff8f0] text-[#c2410c]"
    : "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]";
}

function normalizeLabel(text: string) {
  return text.replace(/[–—]/g, "-");
}

function groupLabel(name: string) {
  return normalizeLabel(name).split(" ")[0] || name;
}

export default function EngineCodesSection({ data, bgImage: _bgImage }: Props) {
  void _bgImage;

  const [activeIndex, setActiveIndex] = useState(0);
  const [openFailures, setOpenFailures] = useState<Record<number, boolean>>({});

  const activeGroup = useMemo(() => data.groups[activeIndex] ?? data.groups[0], [activeIndex, data.groups]);

  const isOpen = openFailures[activeIndex] ?? false;

  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1200px]">
        <div className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#15803d] md:rounded-md md:px-3 md:py-[5px] md:text-[11px] md:tracking-[0.7px]">
          <MoneyTagIcon />
          <span>{data.tag}</span>
        </div>

        <div className="mb-5 md:mb-7">
          <h2 className="font-['Manrope'] text-[24px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[34px] md:leading-[1.15] md:tracking-[-0.7px]">
            {data.h2}
          </h2>
          <p className="mt-[10px] max-w-[820px] text-[13px] leading-[1.6] text-[#6b7280] md:text-[13.5px] md:leading-[1.75]">
            {data.h3}
          </p>
        </div>

        <div className="mb-4 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mb-6">
          <div className="flex w-max gap-[6px] md:flex-wrap">
            {data.groups.map((group, index) => {
              const active = index === activeIndex;
              const tabLabel = normalizeLabel(data.filters[index] ?? "").trim() || groupLabel(group.name);

              return (
                <button
                  key={group.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 whitespace-nowrap border font-['Manrope'] font-bold transition ${
                    active
                      ? "border-[#0d1b2e] bg-[#0d1b2e] text-white md:border-[#15803d] md:bg-[#15803d]"
                      : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#0d1b2e] hover:text-[#0d1b2e] md:border-[1.5px] md:hover:border-[#15803d]"
                  } rounded-full px-[14px] py-[7px] text-[12px] md:rounded-lg md:px-4 md:py-[9px] md:text-[13px]`}
                >
                  {tabLabel}
                  <span className={`ml-[3px] text-[10px] ${active ? "opacity-80" : "opacity-70 md:inline-flex md:h-5 md:min-w-5 md:items-center md:justify-center md:rounded-[5px] md:bg-[#f1f5f9] md:px-1 md:text-[11px] md:text-[#6b7280] md:opacity-100"}`}>
                    {group.engines.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {activeGroup ? (
          <>
            <div className="hidden md:block">
              <div className="rounded-t-[10px] bg-[#0d1b2e] px-5 py-[14px]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[9px] bg-[#15803d] text-white">
                      <GroupIcon index={activeIndex} />
                    </div>
                    <div>
                      <div className="font-['Manrope'] text-[16px] font-extrabold leading-[1.2] text-white">{activeGroup.name}</div>
                      <div className="mt-0.5 text-[11px] text-[#4ade80]">{activeGroup.era}</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-white/8 px-[10px] py-1 text-[11px] font-semibold text-[#94a3b8]">
                    {activeGroup.engines.length} engines
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-b-[10px] border border-t-0 border-[#e5e7eb]">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#0d1b2e]">
                        <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Engine Code</th>
                        <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Specs</th>
                        <th className="px-[14px] py-[10px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Compatible Models</th>
                        <th className="px-[14px] py-[10px] text-right text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">
                          Avg. Rebuilt Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeGroup.engines.map((engine) => (
                        <tr key={engine.code} className="border-b border-[#f1f5f9] transition hover:bg-[#fafafa] last:border-b-0">
                          <td className="px-[14px] py-[14px] align-top text-[13px]">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-['Manrope'] text-[15px] font-extrabold text-[#0d1b2e]">{engine.code}</span>
                              <div className="mt-1 flex flex-wrap gap-[5px]">
                                <span className={`rounded-[4px] border px-[7px] py-[2px] text-[10px] font-semibold ${fuelClass(engine.fuel)}`}>{engine.fuel}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-[14px] py-[14px] align-top text-[13px]">
                            <div className="mt-[5px] flex flex-wrap gap-[6px]">
                              <span className="rounded-[4px] border border-[#e5e7eb] bg-[#f8f9fa] px-2 py-[2px] text-[11px] font-semibold text-[#374151]">
                                {engine.size}
                              </span>
                              <span className="rounded-[4px] border border-[#e5e7eb] bg-[#f8f9fa] px-2 py-[2px] text-[11px] font-semibold text-[#374151]">
                                {engine.power}
                              </span>
                            </div>
                          </td>
                          <td className="px-[14px] py-[14px] align-top">
                            <div className="text-[12px] leading-[1.6] text-[#4b5563]">{engine.compatibleModels}</div>
                          </td>
                          <td className="px-[14px] py-[14px] align-top text-right">
                            <div className="text-[10px] uppercase tracking-[0.5px] text-[#9ca3af]">Avg. Result</div>
                            <div className="mt-1 font-['Manrope'] text-[15px] font-extrabold text-[#15803d]">{engine.avgRebuiltPrice}</div>
                            <a
                              href="#quote-form"
                              data-quote-engine-code={engine.code}
                              data-quote-context={engine.compatibleModels}
                              className="mt-[6px] inline-flex items-center gap-[5px] rounded-[7px] bg-[#0d1b2e] px-[13px] py-[7px] font-['Manrope'] text-[11.5px] font-bold text-white transition hover:bg-[#15803d]"
                            >
                              {engine.cta}
                              <QuoteArrow />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_2px_10px_rgba(13,27,46,0.06)] md:hidden">
              <div className="flex items-center justify-between bg-[#0d1b2e] px-4 py-[13px]">
                <div className="flex items-center gap-[10px]">
                  <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[8px] bg-[#15803d] text-white">
                    <GroupIcon index={activeIndex} />
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[14px] font-bold leading-[1.2] text-white">{activeGroup.name}</div>
                    <div className="mt-0.5 text-[11px] text-[#64748b]">{activeGroup.era}</div>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-[#94a3b8]">{activeGroup.engines.length} engines</div>
              </div>

              {activeGroup.engines.map((engine) => (
                <div key={engine.code} className="border-b border-[#f1f5f9] px-4 py-[14px] last:border-b-0">
                  <div className="mb-[6px] flex items-start justify-between gap-4">
                    <div className="font-['Manrope'] text-[16px] font-extrabold tracking-[-0.3px] text-[#0d1b2e]">{engine.code}</div>
                    <div className="text-right">
                      <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.6px] text-[#9ca3af]">Avg. Rebuilt</div>
                      <div className="text-[14px] font-bold tracking-[-0.2px] text-[#15803d]">{engine.avgRebuiltPrice}</div>
                    </div>
                  </div>

                  <div className="mb-[7px] flex flex-wrap gap-[5px]">
                    <span className={`rounded-[5px] border px-[7px] py-[2px] text-[10px] font-semibold ${fuelClass(engine.fuel)}`}>{engine.fuel}</span>
                    <span className="rounded-[5px] bg-[#f1f5f9] px-[7px] py-[2px] text-[10px] font-semibold text-[#374151]">{engine.size}</span>
                    <span className="rounded-[5px] border border-[#e5e7eb] bg-[#f8f9fa] px-[7px] py-[2px] text-[10px] font-semibold text-[#6b7280]">
                      {engine.power}
                    </span>
                  </div>

                  <div className="mb-[10px] text-[11.5px] leading-[1.45] text-[#6b7280]">{engine.compatibleModels}</div>

                  <a
                    href="#quote-form"
                    data-quote-engine-code={engine.code}
                    data-quote-context={engine.compatibleModels}
                    className="inline-flex items-center justify-center rounded-[7px] bg-[#0d1b2e] px-[14px] py-[7px] font-['Manrope'] text-[11px] font-bold tracking-[0.3px] text-white transition hover:bg-[#15803d]"
                  >
                    {engine.cta}
                  </a>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setOpenFailures((current) => ({ ...current, [activeIndex]: !isOpen }))}
                className="flex w-full items-center justify-between border-t border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.3px] text-[#15803d]">
                  <WarningIcon />
                  <span>Common Failure Points</span>
                </div>
                <ChevronDownIcon open={isOpen} />
              </button>

              {isOpen ? (
                <div className="border-t border-[#d1fae5] bg-[#f0fdf4] px-4 pb-4 pt-3">
                  <p className="text-[12px] leading-[1.65] text-[#374151]">{activeGroup.failureNote}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-3 hidden md:block">
              <button
                type="button"
                onClick={() => setOpenFailures((current) => ({ ...current, [activeIndex]: !isOpen }))}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#e5e7eb] bg-white px-[14px] py-[10px] text-left transition hover:border-[#15803d] hover:bg-[#f0fdf4]"
              >
                <div className="flex items-center gap-[7px] text-[12px] font-bold leading-[1.2] text-[#15803d]">
                  <WarningIcon />
                  <span>Common Failure Points</span>
                </div>
                <ChevronDownIcon open={isOpen} />
              </button>
              {isOpen ? (
                <div className="rounded-b-[8px] border border-t-0 border-[#e5e7eb] bg-white px-[14px] py-3 text-[12.5px] leading-[1.75] text-[#374151]">
                  {activeGroup.failureNote}
                </div>
              ) : null}
            </div>

            <div className="mt-3 hidden items-center justify-between gap-4 rounded-[12px] border border-[#e5e7eb] bg-white px-6 py-[18px] md:flex">
              <div className="flex items-center gap-[14px]">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-[#f0fdf4] text-[#15803d]">
                  <ShieldIcon />
                </div>
                <p className="text-[13px] leading-[1.65] text-[#374151]">
                  <strong className="font-bold text-[#0d1b2e]">Can&apos;t find your engine code?</strong> Enter your registration number above and we&apos;ll
                  match it instantly to the correct replacement engine -
                  <a href="#quote-form" className="ml-1 font-semibold text-[#15803d] no-underline">
                    all backed by a genuine 12-month warranty
                  </a>{" "}
                  from vetted UK Land Rover specialists.
                </p>
              </div>
              <a
                href="#quote-form"
                className="flex flex-none items-center gap-2 rounded-[9px] bg-[#15803d] px-[22px] py-3 font-['Manrope'] text-[13.5px] font-bold text-white transition hover:bg-[#166534]"
              >
                <span>Get Free Engine Quotes</span>
                <CtaArrow />
              </a>
            </div>
          </>
        ) : null}
      </Container>
    </Section>
  );
}
