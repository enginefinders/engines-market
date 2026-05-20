"use client";

import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeLiveFeedRow } from "@/lib/homepageData";

type Props = {
  rows: HomeLiveFeedRow[];
  pinnedBrands: string[];
};

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 5.5h14A1.5 1.5 0 0 1 20.5 7v9A1.5 1.5 0 0 1 19 17.5H9l-4.5 4V7A1.5 1.5 0 0 1 5 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M4 4v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10a8 8 0 0 0-13.7-4.7L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14a8 8 0 0 0 13.7 4.7L20 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatUpdatedAt(clock: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(clock);
}

export default function HomeLiveFeedSection({ rows, pinnedBrands }: Props) {
  const [activeBrand, setActiveBrand] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setClock(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const brands = useMemo(
    () => Array.from(new Set(rows.map((row) => row.brand))),
    [rows],
  );

  const overflowBrands = brands.filter((brand) => !pinnedBrands.includes(brand));

  const visibleRows = useMemo(() => {
    if (activeBrand === "all") return rows;
    return rows.filter((row) => row.brand === activeBrand);
  }, [activeBrand, rows]);

  const countLabel =
    activeBrand === "all"
      ? `Showing ${visibleRows.length} entries across all makes`
      : `Showing ${visibleRows.length} ${visibleRows.length === 1 ? "entry" : "entries"} - ${activeBrand}`;

  return (
    <Section className="bg-[#f7f8fa] py-7 sm:py-8 lg:py-10">
      <Container className="max-w-[1040px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="section-pill mx-auto">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span>Live Market Data</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[30px] lg:text-[32px]">
            What Are UK Drivers Paying for Engine Replacements?
          </h2>

          <p className="mt-4 text-[15px] leading-[1.7] text-[#5a6478]">
            Typical UK market price ranges across the most requested makes and models. Prices shown are
            primarily for reconditioned and rebuilt engines unless stated.
          </p>
        </div>

        <div className="mt-6">
          <nav className="relative z-10 mb-4" aria-label="Filter live engine data by brand">
            <div className="rounded-[12px] bg-[#0d1f3c] shadow-[0_10px_24px_rgba(13,31,60,0.15)]">
              <div className="flex items-center gap-1 px-2 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveBrand("all");
                      setDrawerOpen(false);
                    }}
                    className={`flex-none rounded-full border px-3 py-2 text-[11.5px] font-medium transition ${
                      activeBrand === "all"
                        ? "border-[#15803d] bg-[#15803d] text-white"
                        : "border-white/15 bg-transparent text-white/75 hover:bg-white/12 hover:text-white"
                    }`}
                  >
                    All
                  </button>

                  {pinnedBrands.map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => {
                        setActiveBrand(brand);
                        setDrawerOpen(false);
                      }}
                      className={`flex-none rounded-full border px-3 py-2 text-[11.5px] font-medium transition ${
                        activeBrand === brand
                          ? "border-[#15803d] bg-[#15803d] text-white"
                          : "border-white/15 bg-transparent text-white/75 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                {overflowBrands.length ? (
                  <div className="relative ml-2 flex-none">
                    <button
                      type="button"
                      onClick={() => setDrawerOpen((current) => !current)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white"
                      aria-expanded={drawerOpen}
                      aria-label="Show more brands"
                    >
                      <ChevronDownIcon open={drawerOpen} />
                    </button>

                    {drawerOpen ? (
                      <div className="absolute right-0 top-[calc(100%+8px)] z-20 flex min-w-[196px] flex-col gap-1 rounded-[12px] border border-[#e4e7ee] bg-white p-2 shadow-[0_16px_36px_rgba(13,31,60,0.18)]">
                        {overflowBrands.map((brand) => (
                          <button
                            key={brand}
                            type="button"
                            onClick={() => {
                              setActiveBrand(brand);
                              setDrawerOpen(false);
                            }}
                            className="rounded-[9px] px-3 py-[10px] text-left text-[11px] font-bold text-[#0d1f3c] transition hover:bg-[#f8fafc]"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </nav>

          <div className="overflow-hidden rounded-[16px] border border-[#e4e7ee] bg-white shadow-[0_10px_28px_rgba(13,31,60,0.08)]">
            <div className="border-b border-[#e4e7ee] bg-[#f9fafc] px-4 py-3">
              <span className="text-[11px] font-medium text-[#9aa3b5]">{countLabel}</span>
            </div>

            {visibleRows.length ? (
              <div className="max-h-[480px] overflow-y-auto">
                <ul className="list-none">
                  {visibleRows.map((row, index) => (
                    <li
                      key={`${row.brand}-${row.model}-${index}`}
                      className="border-b border-[#e4e7ee] px-4 py-3 transition hover:bg-[rgba(45,122,58,0.04)] last:border-b-0"
                    >
                      <div className="mb-1.5 flex items-baseline justify-between gap-2">
                        <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#0d1f3c]">
                          {row.model}
                        </span>
                        <span className="hidden whitespace-nowrap text-[11px] text-[#9aa3b5] sm:inline">
                          {row.years}
                        </span>
                        <span className="whitespace-nowrap text-[15px] font-bold text-[#2d7a3a]">
                          {row.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="min-w-0 flex-1 truncate text-[11.5px] text-[#5a6478]">
                          {row.issue}
                        </span>
                        <div className="flex flex-none gap-1">
                          <span className="rounded-full bg-[#0d1f3c] px-2 py-[3px] text-[10px] font-medium text-white">
                            {row.engineCode}
                          </span>
                          <span className="rounded-full bg-[#0d1f3c] px-2 py-[3px] text-[10px] font-medium text-white">
                            {row.fuel}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="px-4 py-10 text-center text-[13px] text-[#5a6478]">
                <strong className="block text-[#0d1f3c]">No entries for this brand.</strong>
                <span>Try selecting a different filter above.</span>
              </div>
            )}

            <div className="flex flex-col items-start justify-between gap-4 border-t border-[#e4e7ee] bg-[#f9fafc] px-4 py-4 sm:flex-row sm:items-center">
              <p className="max-w-[38rem] text-[12px] leading-[1.6] text-[#5a6478]">
                These are typical UK market price ranges. Get real quotes from vetted suppliers - free, no obligation.
              </p>

              <a
                href="#top"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#2d7a3a] px-5 text-[13px] font-bold text-white transition hover:bg-[#3a9e4a]"
              >
                <MessageIcon />
                <span>Get Free Quotes</span>
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-[#e4e7ee] bg-[rgba(13,31,60,0.03)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2d7a3a]" />
                <span className="text-[11px] text-[#9aa3b5]">Enquiries 2025:</span>
                <span className="text-[11px] font-semibold text-[#5a6478]">11,856+</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2d7a3a]" />
                <span className="text-[11px] text-[#9aa3b5]">Saving vs dealer:</span>
                <span className="text-[11px] font-semibold text-[#5a6478]">Up to 40%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2d7a3a]" />
                <span className="text-[11px] text-[#9aa3b5]">Vetted suppliers:</span>
                <span className="text-[11px] font-semibold text-[#5a6478]">450+</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-[11px] text-[#9aa3b5]">
                <RefreshIcon />
                <span>Last updated {formatUpdatedAt(clock)}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
