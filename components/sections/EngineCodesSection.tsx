"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EngineCodesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineCodesData;
  bgImage?: string;
};

type TabMeta = {
  index: number;
  title: string;
  subtitle: string;
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
      className={`h-[14px] w-[14px] flex-none transition-transform ${open ? "rotate-180" : ""}`}
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
    : "border-[#0d1b2e] bg-[#f8fbff] text-[#0d1b2e]";
}

function normalizeLabel(text: string) {
  return text.replace(/[–—]/g, "-");
}

function formatTabTitle(name: string) {
  const normalized = normalizeLabel(name);

  if (/ingenium/i.test(normalized)) return "Modern Ingenium Diesel";
  if (/tdv6|sdv6/i.test(normalized)) return "TDV6 / SDV6 Diesel";
  if (/v8/i.test(normalized)) return "V8 Petrol";
  if (/defender/i.test(normalized)) return "Defender Diesel";
  if (/other|special/i.test(normalized)) return "Additional & Specialist Engines";

  return normalized.replace(/\s+Family.*$/i, "").trim();
}

function formatTabSubtitle(name: string, era: string) {
  if (/other|special/i.test(name)) return "Mixed";
  return normalizeLabel(era);
}

function splitHeading(title: string) {
  const accent = "Average Rebuilt Prices (UK Supply)";
  const parts = title.split(accent);
  return {
    before: parts[0]?.trim() ?? title,
    accent: parts.length > 1 ? accent : "",
  };
}

export default function EngineCodesSection({ data, bgImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFailures, setOpenFailures] = useState<Record<number, boolean>>({});
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [mobileOverflowOpen, setMobileOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const mobileOverflowRef = useRef<HTMLDivElement | null>(null);

  const tabs = useMemo<TabMeta[]>(
    () =>
      data.groups.map((group, index) => ({
        index,
        title: formatTabTitle(group.name),
        subtitle: formatTabSubtitle(group.name, group.era),
      })),
    [data.groups],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!overflowRef.current?.contains(event.target as Node)) {
        setOverflowOpen(false);
      }
      if (!mobileOverflowRef.current?.contains(event.target as Node)) {
        setMobileOverflowOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeGroup = useMemo(() => data.groups[activeIndex] ?? data.groups[0], [activeIndex, data.groups]);
  const isOpen = openFailures[activeIndex] ?? false;
  const visibleTabs = tabs.slice(0, 3);
  const overflowTabs = tabs.slice(3);
  const heading = splitHeading(data.h2);
  const footerText =
    data.closingLine ??
    "Enter your registration number above and we'll match it instantly to the correct replacement engine - all backed by a genuine 12-month warranty from vetted UK Land Rover specialists.";

  return (
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[220px] lg:block">
          <div
            className="absolute right-0 top-0 h-full w-[360px] opacity-[0.16]"
            style={{
              backgroundImage: `linear-gradient(270deg, rgba(248,249,250,0.08), rgba(248,249,250,0.9) 45%, rgba(248,249,250,1) 100%), url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className="relative max-w-[1200px]">
        <div className="section-pill mb-[14px] md:rounded-full">
          <MoneyTagIcon />
          <span>{data.tag}</span>
        </div>

        <div className="mb-5 md:mb-7">
          <h2 className="font-['Manrope'] text-[26px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[36px] md:leading-[1.15] md:tracking-[-0.7px]">
            {heading.before}
            {heading.accent ? <> <span className="text-[#15803d]">{heading.accent}</span></> : null}
          </h2>
          <p className="mt-[10px] max-w-[820px] text-[13px] leading-[1.6] text-[#6b7280] md:text-[13.5px] md:leading-[1.75]">
            {data.h3}
          </p>
        </div>

        {activeGroup ? (
          <>
            <div className="mb-4 md:mb-5">
              <div className="hidden w-full items-stretch gap-[6px] overflow-visible md:flex">
                {visibleTabs.map((tab) => {
                  const active = tab.index === activeIndex;

                  return (
                    <button
                      key={tab.index}
                      type="button"
                      onClick={() => {
                        setActiveIndex(tab.index);
                        setOverflowOpen(false);
                      }}
                      className={`min-w-0 flex-1 rounded-[8px] px-4 py-3 text-center transition ${
                        active ? "bg-[#15803d] text-white" : "bg-[#0d1b2e] text-white hover:bg-[#10294b]"
                      }`}
                    >
                      <span className="block font-['Manrope'] text-[13px] font-bold leading-[1.2]">{tab.title}</span>
                      <span className={`mt-1 block text-[10px] ${active ? "text-white/85" : "text-[#94a3b8]"}`}>
                        {tab.subtitle}
                      </span>
                    </button>
                  );
                })}

                {overflowTabs.length ? (
                  <div className="relative" ref={overflowRef}>
                    <button
                      type="button"
                      onClick={() => setOverflowOpen((current) => !current)}
                      className={`flex h-full min-w-[116px] items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-center transition ${
                        overflowTabs.some((tab) => tab.index === activeIndex)
                          ? "bg-[#15803d] text-white"
                          : "bg-[#0d1b2e] text-white hover:bg-[#10294b]"
                      }`}
                    >
                      <span className="font-['Manrope'] text-[13px] font-bold leading-[1.2]">
                        +{overflowTabs.length} More
                      </span>
                      <ChevronDownIcon open={overflowOpen} />
                    </button>

                    {overflowOpen ? (
                      <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[230px] rounded-[12px] border border-slate-200 bg-white p-2 shadow-[0_14px_30px_rgba(13,27,46,0.16)]">
                        {overflowTabs.map((tab) => (
                          <button
                            key={tab.index}
                            type="button"
                            onClick={() => {
                              setActiveIndex(tab.index);
                              setOverflowOpen(false);
                            }}
                            className="flex w-full flex-col items-start rounded-[10px] px-3 py-2 text-left transition hover:bg-slate-50"
                          >
                            <span className="font-['Manrope'] text-[12px] font-bold leading-[1.2] text-[#0d1b2e]">{tab.title}</span>
                            <span className="mt-1 text-[10px] text-slate-500">{tab.subtitle}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="md:hidden" ref={mobileOverflowRef}>
                <div className="flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => setMobileOverflowOpen((current) => !current)}
                    className="min-w-0 flex-1 rounded-[8px] bg-[#15803d] px-4 py-3 text-center text-white"
                  >
                    <span className="block font-['Manrope'] text-[12px] font-bold leading-[1.2]">{tabs[activeIndex]?.title}</span>
                    <span className="mt-1 block text-[10px] text-white/85">{tabs[activeIndex]?.subtitle}</span>
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setMobileOverflowOpen((current) => !current)}
                      className="flex h-full min-w-[96px] items-center justify-center gap-2 rounded-[8px] bg-[#0d1b2e] px-4 py-3 text-white"
                    >
                      <span className="font-['Manrope'] text-[12px] font-bold leading-[1.2]">
                        {tabs.length - 1} more
                      </span>
                      <ChevronDownIcon open={mobileOverflowOpen} />
                    </button>

                    {mobileOverflowOpen ? (
                      <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[220px] rounded-[12px] border border-slate-200 bg-white p-2 shadow-[0_14px_30px_rgba(13,27,46,0.16)]">
                        {tabs
                          .filter((tab) => tab.index !== activeIndex)
                          .map((tab) => (
                            <button
                              key={tab.index}
                              type="button"
                              onClick={() => {
                                setActiveIndex(tab.index);
                                setMobileOverflowOpen(false);
                              }}
                              className="flex w-full flex-col items-start rounded-[10px] px-3 py-2 text-left transition hover:bg-slate-50"
                            >
                              <span className="font-['Manrope'] text-[12px] font-bold leading-[1.2] text-[#0d1b2e]">{tab.title}</span>
                              <span className="mt-1 text-[10px] text-slate-500">{tab.subtitle}</span>
                            </button>
                          ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0_2px_10px_rgba(13,27,46,0.06)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#0d1b2e]">
                      <th className="px-[14px] py-[11px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Engine Code</th>
                      <th className="px-[14px] py-[11px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Specs</th>
                      <th className="px-[14px] py-[11px] text-left text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Compatible Models</th>
                      <th className="px-[14px] py-[11px] text-right text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#94a3b8]">Avg. Rebuilt Price</th>
                    </tr>
                  </thead>
                  <tbody className="hidden md:table-row-group">
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
                          <div className="flex flex-wrap gap-[6px]">
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
                          <div className="font-['Manrope'] text-[15px] font-extrabold text-[#15803d]">{engine.avgRebuiltPrice}</div>
                          <a
                            href="#quote-form"
                            data-quote-engine-code={engine.code}
                            data-quote-context={engine.compatibleModels}
                            className="mt-[8px] inline-flex items-center gap-[5px] rounded-[7px] bg-[#0d1b2e] px-[13px] py-[7px] font-['Manrope'] text-[11.5px] font-bold text-white transition hover:bg-[#10294b]"
                          >
                            {engine.cta}
                            <QuoteArrow />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="md:hidden">
                  {activeGroup.engines.map((engine) => (
                    <div key={engine.code} className="border-b border-[#f1f5f9] px-4 py-[14px] last:border-b-0">
                      <div className="mb-[6px] flex items-start justify-between gap-4">
                        <div className="font-['Manrope'] text-[16px] font-extrabold tracking-[-0.3px] text-[#0d1b2e]">{engine.code}</div>
                        <div className="text-right">
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
                        className="inline-flex items-center justify-center rounded-[7px] bg-[#0d1b2e] px-[14px] py-[7px] font-['Manrope'] text-[11px] font-bold tracking-[0.3px] text-white transition hover:bg-[#10294b]"
                      >
                        {engine.cta}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={() => setOpenFailures((current) => ({ ...current, [activeIndex]: !isOpen }))}
                className="flex w-full items-center justify-between rounded-[8px] border border-[#fdba74] bg-[#fff7ed] px-[14px] py-[11px] text-left transition hover:border-[#fb923c]"
              >
                <div className="flex items-center gap-[7px] text-[12px] font-bold leading-[1.2] text-[#ea580c]">
                  <WarningIcon />
                  <span>Common Failure Points</span>
                </div>
                <div className="text-[#ea580c]">
                  <ChevronDownIcon open={isOpen} />
                </div>
              </button>
              {isOpen ? (
                <div className="rounded-b-[8px] border border-t-0 border-[#fdba74] bg-[#fffaf5] px-[14px] py-3 text-[12.5px] leading-[1.75] text-[#7c2d12]">
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
                  {data.closingLine ? (
                    footerText
                  ) : (
                    <>
                      <strong className="font-bold text-[#0d1b2e]">Can&apos;t find your engine code?</strong>{" "}
                      {footerText}
                    </>
                  )}
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
