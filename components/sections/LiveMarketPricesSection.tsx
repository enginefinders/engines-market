"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { LiveMarketPriceEntry, LiveMarketPricesData, ModelsSectionData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: LiveMarketPricesData;
  modelCards?: ModelsSectionData["cards"];
  imageSrc?: string;
  displayMode?: "brand" | "document";
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
    ((clock.getHours() * 11) + (clock.getDate() * 7) + refreshSeed * visibleRows) % entries.length;

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
  }).format(clock);
}

export default function LiveMarketPricesSection({
  data,
  modelCards,
  imageSrc,
  displayMode = "brand",
}: Props) {
  const [clock, setClock] = useState(() => new Date());
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
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1220px]">
        <div className="section-pill mb-[14px]">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#15803d]" />
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-none font-['Manrope'] text-[26px] font-extrabold leading-[1.18] tracking-[-0.4px] text-[#0d1b2e] md:text-[30px] md:tracking-[-0.7px] lg:text-[43px] lg:leading-[1.06] lg:tracking-[-1px]">
          {headingLines.map((line, index) => {
            const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
            return (
              <span key={`${line}-${index}`} className={`block ${isAccent ? "text-[#15803d]" : ""}`}>
                {line}
              </span>
            );
          })}
        </h2>

        <p className="mt-[10px] max-w-[760px] text-[13px] leading-[1.6] text-[#6b7280] md:text-[14px]">
          {data.h3}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0_2px_12px_rgba(13,27,46,0.07)]">
            <div className="relative aspect-[4/3.6] min-h-[340px] lg:min-h-[520px]">
              {sectionImage ? (
                <Image
                  src={sectionImage}
                  alt={data.imageAlt ?? ""}
                  fill
                  className="object-contain object-center p-3 lg:p-4"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              ) : null}
            </div>
          </div>

          <div className="space-y-3 lg:flex lg:h-full lg:flex-col">
            {isDocumentMode ? (
              <div className="rounded-[10px] bg-[#0d1b2e] px-4 py-[12px] shadow-[0_2px_12px_rgba(13,27,46,0.16)]">
                <div className="text-[12px] font-bold uppercase tracking-[0.08em] text-white">
                  Average Market Prices
                </div>
              </div>
            ) : filterTabs.length ? (
              <div className="rounded-[10px] bg-[#0d1b2e] p-[10px] shadow-[0_2px_12px_rgba(13,27,46,0.16)]">
                <div className="flex items-center gap-[6px]">
                  <div className="flex min-w-0 flex-1 items-center gap-[6px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {pinnedTabs.map((tab) => {
                      const active = activeTab === tab.key;

                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setActiveTab(tab.key)}
                          className={`flex-none rounded-full border px-[12px] py-[7px] text-[11.5px] font-medium transition ${
                            active
                              ? "border-[#15803d] bg-[#15803d] text-white"
                              : "border-white/15 bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {overflowTabs.length ? (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setDrawerOpen((current) => !current)}
                        className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                      >
                        <ChevronDownIcon open={drawerOpen} />
                      </button>

                      {drawerOpen ? (
                        <div className="absolute right-0 top-[calc(100%+8px)] z-20 flex min-w-[180px] flex-col gap-1 rounded-[12px] border border-[#e5e7eb] bg-white p-2 shadow-[0_14px_34px_rgba(13,27,46,0.16)]">
                          {overflowTabs.map((tab) => (
                            <button
                              key={tab.key}
                              type="button"
                              onClick={() => {
                                setActiveTab(tab.key);
                                setDrawerOpen(false);
                              }}
                              className="rounded-[9px] px-3 py-[10px] text-left text-[11px] font-bold text-[#0d1b2e] transition hover:bg-[#f8fafc]"
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
            ) : null}

            <div className="space-y-2 lg:flex lg:h-full lg:flex-col lg:space-y-0">
              <div className="overflow-hidden rounded-[14px] border border-[#dfe5ee] bg-white shadow-[0_2px_12px_rgba(13,27,46,0.07)] lg:flex lg:h-[520px] lg:flex-col">
                {isDocumentMode ? null : (
                  <div className="border-b border-[#e4e7ee] bg-[#f9fafc] px-4 py-[10px] text-[11px] font-medium text-[#9aa3b5]">
                    Showing {visibleRows.length} {visibleRows.length === 1 ? (ui.showingSingleLabel ?? "entry") : (ui.showingPluralLabel ?? "entries")}
                    {activeFilter?.key && activeFilter.key !== "all"
                      ? ` for ${activeFilter.label}`
                      : ` ${ui.acrossAllLabel ?? "across all models"}`}
                  </div>
                )}

                <div className="max-h-[520px] overflow-y-auto lg:flex-1 lg:max-h-none">
                  {visibleRows.length ? (
                    <ul className="list-none">
                      {visibleRows.map((row, index) => (
                        <li
                          key={`${row.Year}-${row.Model}-${row["Engine Code"]}-${index}`}
                          className="border-b border-[#e4e7ee] px-[14px] py-[11px] transition hover:bg-[rgba(45,122,58,0.04)] last:border-b-0 md:px-[16px]"
                        >
                          <div className="mb-[4px] flex items-baseline justify-between gap-[8px]">
                            <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#0d1f3c]">
                              {row.Model}
                            </span>
                            <span className="flex-none whitespace-nowrap text-[11px] font-normal text-[#9aa3b5]">
                              {row.Year}
                            </span>
                            <span className="flex-none whitespace-nowrap text-[15px] font-bold text-[#2d7a3a]">
                              {row["Avg. Quoted Price"]}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-[8px]">
                            <span className="min-w-0 flex-1 truncate text-[11.5px] text-[#5a6478]">
                              {row["Reported Issue"]}
                            </span>
                            <div className="flex flex-none gap-[4px]">
                              <span className="rounded-full bg-[#0d1f3c] px-[7px] py-[2px] text-[10.5px] font-medium text-white">
                                {row["Engine Code"]}
                              </span>
                              <span className="rounded-full bg-[#0d1f3c] px-[7px] py-[2px] text-[10.5px] font-medium text-white">
                                {row.Fuel}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-10 text-center text-[13px] text-[#5a6478]">
                      {isDocumentMode ? (ui.noEntriesLabel || "") : (ui.noEntriesLabel ?? "No entries match that model filter yet.")}
                    </div>
                  )}
                </div>

                {isDocumentMode ? null : (
                  <div className="border-t border-[#e4e7ee] bg-[#f9fafc] px-4 py-[10px]">
                    <div className="flex items-center gap-[6px] text-[11px] font-medium text-[#9aa3b5]">
                      <RefreshIcon />
                      <span>
                        {ui.updatedLabel ?? "Last updated:"} <span className="font-semibold text-[#6b7280]">{formatUpdatedAt(clock)}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {isDocumentMode ? (
                <div className="rounded-[10px] bg-[#0d1b2e] px-4 py-[10px] shadow-[0_2px_12px_rgba(13,27,46,0.16)]">
                  <div className="flex items-center gap-[6px] text-[11px] font-medium text-white/80">
                    <RefreshIcon />
                    <span>
                      {isDocumentMode ? (ui.updatedLabel || "") : (ui.updatedLabel ?? "Last updated:")} <span className="font-semibold text-white">{formatUpdatedAt(clock)}</span>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
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
