"use client";

import { useEffect, useState } from "react";
import type { LiveMarketPriceEntry, LiveMarketPricesData } from "@/types/brand";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: LiveMarketPricesData;
};

type FeedRow = LiveMarketPriceEntry & {
  timestamp: Date;
};

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 16 9 11l4 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6h4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 5h14v14H5V5Zm4 4h6m-6 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M6 8h9a2 2 0 0 1 2 2v5H7a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17 10h2l1 2v3h-3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6V4M13 6V4M9 15v3m5-3v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function getIntroIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("transparent")) {
    return TrendIcon;
  }

  if (normalized.includes("cost")) {
    return PoundIcon;
  }

  if (normalized.includes("quote")) {
    return QuoteIcon;
  }

  return BoltIcon;
}

function buildFeedRows(
  entries: LiveMarketPriceEntry[],
  density: "standard" | "premium",
  visibleRows: number,
  refreshSeed: number,
  clock: Date,
) {
  if (!entries.length) {
    return [];
  }

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

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const feedRows = buildFeedRows(
    data.feed.entries,
    data.feed.density,
    data.feed.visibleRows,
    refreshSeed,
    clock,
  );

  return (
    <Section className="overflow-hidden bg-[#fbfcff]">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <div className="max-w-[780px]">
              <p className="text-label mb-1.5 text-green-700">{data.tag}</p>
              <h2 className="text-[#0a2952]">{data.h2}</h2>
              <p className="text-body mt-2.5 text-slate-600">{data.h3}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {data.introBullets.map((item) => {
                const Icon = getIntroIcon(item.label);

                return (
                <div key={item.label} className="surface-card p-4">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon />
                  </div>
                  <h3 className="text-[#0a2952]">{item.label}</h3>
                  <p className="text-small mt-1.5 text-slate-600">{item.text}</p>
                </div>
              )})}
            </div>

            <div className="surface-card bg-white p-5">
              <p className="text-label text-green-700">{data.cta.heading}</p>
              <p className="text-body mt-2.5 text-slate-600">{data.cta.text}</p>
              <Button href="#quote-form" data-quote-context={data.cta.heading} data-quote-source="live-market-prices" className="mt-4">
                {data.cta.buttonText}
              </Button>
              <p className="text-small mt-2.5 text-slate-600">{data.cta.note}</p>
            </div>
          </div>

          <div className="surface-card overflow-hidden bg-white">
            <div className="bg-[#0b2747] px-4 py-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-label flex items-center gap-2 text-green-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    Live feed
                  </div>
                  <h3 className="mt-1.5 !text-white">Recent enquiries</h3>
                  <p className="text-small mt-1 text-slate-300">
                    Showing {feedRows.length} of {data.feed.rowsCount} researched rows
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setRefreshSeed((value) => value + 1)}
                  className="text-label inline-flex items-center gap-2 rounded-full border border-white/[0.2] bg-white/[0.08] px-3 py-1.5 text-white transition hover:bg-white/[0.14]"
                >
                  <ClockIcon />
                  {data.feed.refreshLabel}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {data.feed.columns.map((column) => (
                  <span
                    key={column}
                    className="rounded-full border border-white/[0.15] bg-white/[0.08] px-3 py-1 text-tiny font-black uppercase tracking-[0.14em] text-slate-200"
                  >
                    {column}
                  </span>
                ))}
              </div>

              <p className="text-small mt-3 text-slate-100">
                {data.feed.timestampLabel}: {formatUpdatedAt(clock)}
              </p>
            </div>

            <div className="max-h-[31rem] overflow-y-auto px-4 py-4">
              <div className="relative space-y-3 pl-6">
                <div className="absolute bottom-3 left-[0.7rem] top-3 w-px bg-slate-200" />

                {feedRows.map((row, index) => (
                  <article key={`${row.Year}-${row.Model}-${row["Engine Code"]}-${index}`} className="relative">
                    <div className="absolute left-[-1.05rem] top-5 h-3 w-3 rounded-full border-[3px] border-white bg-[#1677c8]" />

                    <div className="surface-card-soft p-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-label text-blue-700">
                          {formatRelativeTime(row.timestamp, clock)}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="summary-badge">{row.Year}</span>
                          <span className="summary-badge">{row.Fuel}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-[0.98rem] text-[#061a33]">{row.Model}</h3>
                          <div className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-small font-bold text-slate-700">
                            <EngineIcon />
                            {row["Engine Code"]}
                          </div>
                        </div>

                        <p className="shrink-0 text-[0.86rem] font-black text-green-700">
                          {row["Avg. Quoted Price"]}
                        </p>
                      </div>

                      <div className="mt-3 rounded-2xl bg-white px-3 py-2.5">
                        <p className="text-tiny font-black uppercase tracking-[0.14em] text-slate-400">
                          Reported Issue
                        </p>
                        <p className="text-small mt-1 text-slate-700">{row["Reported Issue"]}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {data.badges.map((badge) => (
            <span key={badge} className="section-chip">
              {badge}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
