"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { LiveMarketPriceEntry, LiveMarketPricesData, ModelsSectionData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { GiNetworkBars } from "react-icons/gi";

type Props = {
  data: LiveMarketPricesData;
  modelCards?: ModelsSectionData["cards"];
  imageSrc?: string;
  displayMode?: "brand" | "document";
  initialTimestamp?: string;
};

type FeedRow = LiveMarketPriceEntry & {
  timestamp: Date;
};

type FilterTab = {
  key: string;
  label: string;
  matchers: string[];
};

function RefreshIcon({ spinning = false }: { spinning?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[13px] w-[13px] ${spinning ? "animate-spin" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 20v-6h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[12px] w-[12px] transition ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function buildFeedRows(
  entries: LiveMarketPriceEntry[],
  density: "standard" | "premium",
  visibleRows: number,
  refreshSeed: number,
  clock: Date,
) {
  if (!entries.length) return [];

  const gaps = density === "premium" ? [6, 8, 11, 15, 19, 24] : [12, 16, 21, 28, 36];
  const startIndex =
    ((clock.getUTCHours() * 11) + (clock.getUTCDate() * 7) + refreshSeed * visibleRows) % entries.length;

  let elapsedMinutes = density === "premium" ? 3 : 9;
  const rows: FeedRow[] = [];

  for (let index = 0; index < visibleRows; index += 1) {
    const entry = entries[(startIndex + index) % entries.length];
    elapsedMinutes += gaps[(index + refreshSeed) % gaps.length];

    rows.push({
      ...entry,
      timestamp: new Date(clock.getTime() - elapsedMinutes * 60_000),
    });
  }

  return rows;
}

function cleanModelLabel(label: string) {
  return label
    .replace(/\s+Engine Replacement$/i, "")
    .replace(/\s+Engines?$/i, "")
    .replace(/^BMW\s+/i, "")
    .replace(/^Land Rover\s+/i, "")
    .replace(/^Range Rover\s+/i, "")
    .trim();
}

function buildFilterTabs(modelCards?: ModelsSectionData["cards"]): FilterTab[] {
  if (!modelCards?.length) return [];

  const tabs = modelCards.map((card) => {
    const label = cleanModelLabel(card.h3);
    const slugWords = card.slug.replace(/-/g, " ").trim();

    return {
      key: card.slug,
      label,
      matchers: [label.toLowerCase(), slugWords.toLowerCase()],
    };
  });

  return [
    {
      key: "all",
      label: "All",
      matchers: [],
    },
    ...tabs,
  ];
}

function formatUpdatedAt(clock: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(clock);
}

export default function LiveMarketPricesSection({
  data,
  modelCards,
  imageSrc,
  displayMode = "brand",
  initialTimestamp,
}: Props) {
  const [clock, setClock] = useState(() => new Date(initialTimestamp ?? "2025-01-01T12:00:00.000Z"));
  const [activeTab, setActiveTab] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDocumentMode = displayMode === "document";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(new Date());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const feedRows = useMemo(
    () => buildFeedRows(data.feed.entries, data.feed.density, data.feed.visibleRows, 0, clock),
    [clock, data.feed.density, data.feed.entries, data.feed.visibleRows],
  );

  const filterTabs = useMemo(
    () => data.filterTabs?.length ? data.filterTabs : buildFilterTabs(modelCards),
    [data.filterTabs, modelCards],
  );
  const activeFilter = filterTabs.find((tab) => tab.key === activeTab) ?? filterTabs[0] ?? null;
  const ui = data.ui ?? {};

  const visibleRows = useMemo(() => {
    if (isDocumentMode) return feedRows;
    if (!activeFilter || activeFilter.key === "all") return feedRows;

    return feedRows.filter((row) => {
      const model = row.Model.toLowerCase();
      return activeFilter.matchers.some((matcher) => model.includes(matcher));
    });
  }, [activeFilter, feedRows, isDocumentMode]);

  const pinnedTabs = filterTabs.length ? filterTabs.slice(0, 5) : [];
  const overflowTabs = filterTabs.slice(5);

  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const sectionImage = imageSrc || "";

  return (
    <Section className="bg-[#f5f5f5] sm:px-2 py-7 sm:py-8 lg:py-10">
      <Container className="max-w-[1400px] px-2">
        <div className=" max-w-190 text-start">
          <div className="section-pill">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span>{data.tag}</span>
          </div>

          <div className="mt-4 flex flex-col">
            <h2 className="font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[30px] lg:text-[32px]">
  {headingLines.map((line, index) => {
    const parts = line.split(/(Engine Replacement)/);

    return (
      <span key={`${line}-${index}`} className="block">
        {parts.map((part, i) =>
          part === "Engine Replacement" ? (
            <span key={i} className="text-[#15803d]">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  })}
</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch">
          {/* Desktop Image: Hidden on mobile, shown on lg and up */}
          <div className="relative hidden min-h-55 overflow-hidden lg:min-h-full lg:block">
            {sectionImage ? (
              <Image
                src={sectionImage}
                alt={data.imageAlt ?? "Market data visualization"}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            ) : null}
          </div>

          {/* Right Table Container */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1a2e] via-[#0f2035] to-[#0a1628] shadow-[0_10px_28px_rgba(0,0,0,0.4)] w-full overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
            
            {/* Header/Nav */}
            {!isDocumentMode && filterTabs.length ? (
              <nav className="relative z-10 mb-4 flex-shrink-0" aria-label="Filter live engine data by brand">
                <div className="rounded-t-xl bg-[#0d1f3c] shadow-[0_10px_24px_rgba(13,31,60,0.15)]">
                  <div className="flex items-center gap-1 px-2 py-2">
                    <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {pinnedTabs.map((tab) => {
                        const active = activeTab === tab.key;

                        return (
                          <button
                            key={tab.key}
                            type="button"
                            onClick={() => {
                              setActiveTab(tab.key);
                              setDrawerOpen(false);
                            }}
                            className={`flex-none rounded-full border px-3 py-2 text-[11.5px] font-medium transition ${
                              active
                                ? "border-[#15803d] bg-[#15803d] text-white"
                                : "border-white/15 bg-transparent text-white/75 hover:bg-white/12 hover:text-white"
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {overflowTabs.length ? (
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
                          <div className="absolute right-0 top-[calc(100%+8px)] z-20 flex min-w-49 flex-col gap-1 rounded-xl border border-white/15 bg-[#0f2035] p-2 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                            {overflowTabs.map((tab) => (
                              <button
                                key={tab.key}
                                type="button"
                                onClick={() => {
                                  setActiveTab(tab.key);
                                  setDrawerOpen(false);
                                }}
                                className="rounded-[9px] px-3 py-2.5 text-left text-[11px] font-bold text-white transition hover:bg-white/10"
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </nav>
            ) : isDocumentMode ? (
              <div className="rounded-t-xl bg-[#0d1f3c] px-4 py-3 flex-shrink-0 shadow-[0_10px_24px_rgba(13,31,60,0.15)]">
                <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563eb] drop-shadow-[0_0_10px_rgba(37,99,235,0.8),0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
                  <GiNetworkBars /> Average Market Prices
                </div>
              </div>
            ) : null}

            {/* Scrollable Area */}
            <div className="flex-1 flex flex-col overflow-hidden overflow-x-hidden w-full">
              {!isDocumentMode && (
                <div className="border-b border-[#e4e7ee] bg-[#f9fafc] px-4 py-[10px] text-[11px] font-medium text-[#9aa3b5] flex-shrink-0">
                  Showing {visibleRows.length} {visibleRows.length === 1 ? (ui.showingSingleLabel ?? "entry") : (ui.showingPluralLabel ?? "entries")}
                  {activeFilter?.key && activeFilter.key !== "all"
                    ? ` for ${activeFilter.label}`
                    : ` ${ui.acrossAllLabel ?? "across all models"}`}
                </div>
              )}

              <div className="flex-1 overflow-y-auto pr-4 [scrollbar-width:thin] [scrollbar-color:#ffffff_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/80">
                {visibleRows.length ? (
                  <ul className="list-none">
                    {visibleRows.map((row, index) => (
                      <li
                        key={`${row.Year}-${row.Model}-${row["Engine Code"]}-${index}`}
                        className="border-b border-white/10 px-4 py-3 transition hover:bg-white/5 last:border-b-0"
                      >
                        <div className="mb-1.5 flex items-baseline justify-between gap-2">
                          <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                            {row.Model}
                          </span>
                          <span className="hidden whitespace-nowrap text-[11px] text-white sm:inline">
                            {row.Year}
                          </span>
                          <span className="whitespace-nowrap text-[15px] font-bold text-[#4ade80]">
                            {row["Avg. Quoted Price"]}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="min-w-0 flex-1 truncate text-[11.5px] text-white">
                            {row["Reported Issue"]}
                          </span>
                          <div className="flex flex-none gap-1">
                            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.75 text-[10px] font-medium text-white/80">
                              {row["Engine Code"]}
                            </span>
                            <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.75 text-[10px] font-medium text-white/80">
                              {row.Fuel}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1 flex items-center justify-center px-4 py-10 text-center text-[13px] text-white/45">
                    <div>
                      <strong className="block text-white">No entries for this brand.</strong>
                      <span>Try selecting a different filter above.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Mobile Image — now BELOW the table, only visible on phones */}
        <div className="relative mt-6 h-[480px] w-full overflow-hidden rounded-2xl lg:hidden">
          {sectionImage ? (
            <Image
              src={sectionImage}
              alt={data.imageAlt ?? "Market data visualization"}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : null}
        </div>

        <div className="flex justify-end items-center gap-[6px] px-4 py-3 text-[11px] font-medium text-[#9aa3b5] border-t border-white/10">
          <RefreshIcon />
          <span>
            {ui.updatedLabel ?? "Last updated:"} <span className="font-semibold text-[#6b7280]">{formatUpdatedAt(clock)}</span>
          </span>
        </div>

        {isDocumentMode ? null : (
          <div className="mt-5">
            <CtaStrip
              tone="light"
              label={ui.ctaLabel ?? "Live Quote Benchmark"}
              title={data.cta.heading}
              description={data.cta.text}
              buttonText={data.cta.buttonText.replace(/\s*->\s*$/, "")}
              linkProps={{
                href: "#quote-form",
                "data-quote-context": data.cta.heading,
                "data-quote-source": "live-market-prices",
              }}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
