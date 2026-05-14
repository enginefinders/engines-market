"use client";

import { useEffect, useMemo, useState } from "react";
import type { LiveMarketPriceEntry, LiveMarketPricesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: LiveMarketPricesData;
};

type FeedRow = LiveMarketPriceEntry & {
  timestamp: Date;
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

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 16 9 11l4 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M15 6a3 3 0 1 0-6 0v11m-2-5h8m-8 4h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M5 5h14v14H5V5Zm4 4h6m-6 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12h5M10 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function getIntroIcon(label: string, index: number) {
  const normalized = label.toLowerCase();

  if (normalized.includes("real-time") || normalized.includes("real time")) return DataIcon;
  if (normalized.includes("transparent")) return TrendIcon;
  if (normalized.includes("cost") || normalized.includes("price")) return PoundIcon;
  if (normalized.includes("quote")) return QuoteIcon;

  return [DataIcon, TrendIcon, PoundIcon, QuoteIcon][index % 4];
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

function formatRelativeTime(timestamp: Date, clock: Date) {
  const diffMinutes = Math.max(1, Math.floor((clock.getTime() - timestamp.getTime()) / 60_000));

  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function formatUpdatedAt(clock: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(clock);
}

export default function LiveMarketPricesSection({ data }: Props) {
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [clock, setClock] = useState(() => new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(new Date());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const feedRows = useMemo(
    () => buildFeedRows(data.feed.entries, data.feed.density, data.feed.visibleRows, refreshSeed, clock),
    [clock, data.feed.density, data.feed.entries, data.feed.visibleRows, refreshSeed]
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshSeed((value) => value + 1);
    window.setTimeout(() => setIsRefreshing(false), 650);
  };

  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1180px]">
        <div className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-[4px] text-[10px] font-bold uppercase tracking-[0.8px] text-[#15803d]">
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#15803d]" />
          <span>{data.tag}</span>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
          <div>
            <h2 className="max-w-[520px] font-['Manrope'] text-[24px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[28px] md:tracking-[-0.7px]">
              {data.h2}
            </h2>

            <p className="mt-[10px] text-[13px] leading-[1.6] text-[#6b7280] md:max-w-[470px]">
              {data.h3}
            </p>

            <div className="mt-5 hidden gap-[10px] sm:grid sm:grid-cols-2 xl:grid">
              {data.introBullets.map((item, index) => {
                const Icon = getIntroIcon(item.label, index);

                return (
                  <div
                    key={item.label}
                    className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_12px_rgba(13,27,46,0.05)]"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f8fbff] text-[#0d1b2e]">
                      <Icon />
                    </div>
                    <div className="font-['Manrope'] text-[14px] font-bold leading-[1.25] text-[#0d1b2e]">{item.label}</div>
                    <p className="mt-3 text-[12px] leading-[1.6] text-[#6b7280]">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 hidden rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_12px_rgba(13,27,46,0.05)] xl:block">
              <div className="font-['Manrope'] text-[14px] font-bold leading-[1.25] text-[#0d1b2e]">{data.cta.heading}</div>
              <p className="mt-2 text-[12px] leading-[1.6] text-[#6b7280]">{data.cta.text}</p>
              <a
                href="#quote-form"
                data-quote-context={data.cta.heading}
                data-quote-source="live-market-prices"
                className="mt-3 inline-flex items-center rounded-[9px] bg-[#15803d] px-4 py-[10px] font-['Manrope'] text-[13px] font-bold text-white transition hover:bg-[#166534]"
              >
                {data.cta.buttonText}
              </a>
              <p className="mt-2 text-[11px] leading-[1.5] text-[#6b7280]">{data.cta.note}</p>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_2px_12px_rgba(13,27,46,0.07)]">
              <div className="sticky top-0 z-10 bg-[#0d1b2e] px-4 py-[14px] md:px-5 md:py-4">
                <div className="mb-[6px] flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-[6px] rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.12)] px-[10px] py-[3px] text-[9px] font-bold uppercase tracking-[0.8px] text-[#22c55e]">
                    <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-[#22c55e]" />
                    <span>Live Feed</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="inline-flex items-center gap-[5px] text-[11px] font-semibold text-[#22c55e] transition hover:opacity-75"
                  >
                    <RefreshIcon spinning={isRefreshing} />
                    <span>{data.feed.refreshLabel}</span>
                  </button>
                </div>

                <div role="heading" aria-level={3} className="font-['Manrope'] text-[15px] font-bold text-white">
                  Recent enquiries
                </div>
                <div className="mt-[3px] text-[11px] tracking-[0.1px] text-[#64748b]">
                  Showing {feedRows.length} of {data.feed.rowsCount} researched rows
                </div>

                <div className="mt-4 hidden border-t border-white/10 pt-3 md:grid md:grid-cols-[0.7fr_1.35fr_1fr_0.95fr_1.25fr] md:gap-3">
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">Year</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">Model</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">Engine Code<br />(Fuel Type)</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">Avg. Quoted Price</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">Reported Issue</div>
                </div>
              </div>

              <div className="h-[420px] overflow-y-auto px-3 py-3 [scrollbar-color:#d1d5db_#f8f9fa] [scrollbar-width:thin] md:px-0 md:py-0">
                <div className="flex flex-col gap-2 md:hidden">
                  {feedRows.map((row, index) => (
                    <div
                      key={`${row.Year}-${row.Model}-${row["Engine Code"]}-${index}`}
                      className="relative rounded-[10px] border border-[#f1f5f9] bg-white px-3 pb-[10px] pl-[14px] pt-3 transition hover:border-[#bbf7d0]"
                    >
                      <div className="absolute bottom-4 left-0 top-4 w-[3px] rounded-r-[2px] bg-[#e5e7eb]" />

                      <div className="mb-[6px] flex items-start justify-between gap-2">
                        <div className="font-['Manrope'] text-[13px] font-bold leading-[1.3] text-[#0d1b2e]">{row.Model}</div>
                        <div className="flex-none whitespace-nowrap text-[10px] font-medium text-[#9ca3af]">
                          {formatRelativeTime(row.timestamp, clock)}
                        </div>
                      </div>

                      <div className="mb-[7px] flex flex-wrap gap-[5px]">
                        <span className="rounded-[5px] bg-[#f1f5f9] px-[7px] py-[2px] text-[10px] font-semibold text-[#374151]">{row.Year}</span>
                        <span className="rounded-[5px] border border-[#bbf7d0] bg-[#f0fdf4] px-[7px] py-[2px] text-[10px] font-semibold text-[#15803d]">{row.Fuel}</span>
                        <span className="rounded-[5px] border border-[#e5e7eb] bg-[#f8f9fa] px-[7px] py-[2px] font-mono text-[10px] font-semibold text-[#6b7280]">
                          {row["Engine Code"]}
                        </span>
                      </div>

                      <div className="mb-[5px] text-[13px] font-bold tracking-[-0.2px] text-[#15803d]">
                        {row["Avg. Quoted Price"]}
                      </div>

                      <div className="text-[11.5px] leading-[1.45] text-[#6b7280]">
                        <strong className="font-semibold text-[#374151]">{row["Reported Issue"].split(" - ")[0]}</strong>
                        {row["Reported Issue"].includes(" - ") ? ` - ${row["Reported Issue"].split(" - ").slice(1).join(" - ")}` : ""}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden md:block">
                  {feedRows.map((row, index) => (
                    <div
                      key={`${row.Year}-${row.Model}-${row["Engine Code"]}-${index}`}
                      className="grid grid-cols-[0.7fr_1.35fr_1fr_0.95fr_1.25fr] gap-3 border-b border-[#f1f5f9] px-5 py-4 text-[12px] text-[#374151] last:border-b-0"
                    >
                      <div className="font-semibold text-[#0d1b2e]">{row.Year}</div>
                      <div>
                        <div className="font-['Manrope'] text-[13px] font-bold leading-[1.35] text-[#0d1b2e]">{row.Model}</div>
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-[#0d1b2e]">{row["Engine Code"]}</div>
                        <div className="text-[11px] text-[#6b7280]">({row.Fuel})</div>
                      </div>
                      <div className="font-['Manrope'] text-[13px] font-extrabold text-[#22c55e]">{row["Avg. Quoted Price"]}</div>
                      <div className="text-[11.5px] leading-[1.45] text-[#374151]">{row["Reported Issue"]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#f1f5f9] bg-[#fafafa] px-4 py-[10px] md:px-5">
                <div className="flex items-center gap-[6px] text-[11px] font-medium text-[#9ca3af]">
                  <ClockIcon />
                  <span>
                    Last updated: <span className="font-semibold text-[#6b7280]">{formatUpdatedAt(clock)}</span>
                  </span>
                </div>
                <div className="rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-[2px] text-[10px] font-semibold text-[#15803d]">
                  UK Specialists
                </div>
              </div>
            </div>

            <div className="mt-4 hidden gap-[10px] sm:grid-cols-2 xl:hidden">
              {data.introBullets.map((item, index) => {
                const Icon = getIntroIcon(item.label, index);

                return (
                  <div
                    key={item.label}
                    className="rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_12px_rgba(13,27,46,0.05)] sm:block"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#f8fbff] text-[#0d1b2e]">
                      <Icon />
                    </div>
                    <div className="font-['Manrope'] text-[14px] font-bold leading-[1.25] text-[#0d1b2e]">{item.label}</div>
                    <p className="mt-3 text-[12px] leading-[1.6] text-[#6b7280]">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 hidden rounded-[12px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_12px_rgba(13,27,46,0.05)] xl:hidden">
              <div className="font-['Manrope'] text-[14px] font-bold leading-[1.25] text-[#0d1b2e]">{data.cta.heading}</div>
              <p className="mt-2 text-[12px] leading-[1.6] text-[#6b7280]">{data.cta.text}</p>
              <a
                href="#quote-form"
                data-quote-context={data.cta.heading}
                data-quote-source="live-market-prices"
                className="mt-3 inline-flex items-center rounded-[9px] bg-[#15803d] px-4 py-[10px] font-['Manrope'] text-[13px] font-bold text-white transition hover:bg-[#166534]"
              >
                {data.cta.buttonText}
              </a>
              <p className="mt-2 text-[11px] leading-[1.5] text-[#6b7280]">{data.cta.note}</p>
            </div>
          </div>
        </div>

        {data.badges.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#dbe6f3] bg-white px-3 py-[7px] text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0d1b2e]"
              >
                {badge}
              </span>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
