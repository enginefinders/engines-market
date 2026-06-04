"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeLiveFeedRow } from "@/lib/homepageData";

type Props = {
  rows: HomeLiveFeedRow[];
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

export default function HomeLiveFeedSection({ rows }: Props) {
  const [activeBrand, setActiveBrand] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const sectionImageSrc = "/Home/livemarketdatabanner.webp";

  useEffect(() => {
    const intervalId = window.setInterval(() => setClock(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const brands = useMemo(
    () => Array.from(new Set(rows.map((row) => row.brand))),
    [rows],
  );

  const mobileBrandsCount = 4;
  const desktopBrandsCount = 10;
  const mobileOverflowBrands = brands.length > mobileBrandsCount ? brands.slice(mobileBrandsCount) : [];
  const desktopOverflowBrands = brands.length > desktopBrandsCount ? brands.slice(desktopBrandsCount) : [];

  const visibleRows = useMemo(() => {
    if (activeBrand === "all") return rows;
    return rows.filter((row) => row.brand === activeBrand);
  }, [activeBrand, rows]);

  const countLabel =
    activeBrand === "all"
      ? `Showing ${visibleRows.length} entries across all makes`
      : `Showing ${visibleRows.length} ${visibleRows.length === 1 ? "entry" : "entries"} - ${activeBrand}`;

  return (
    <Section className="bg-[#f5f5f5] px-2 py-7 sm:py-8 lg:py-10">
      {/* Mobile Image: Full width, appears before the Container on phone screens */}
      <div className="relative mb-6 h-150 w-full overflow-hidden lg:hidden">
        <Image
          src={sectionImageSrc}
          alt="Replacement engine in a workshop"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <Container className="max-w-[1400px]">
        <div className="mx-auto max-w-190 text-center">
          <div className="section-pill mx-auto">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span>Live Market Data</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[30px] lg:text-[32px] ">
            What Are UK Drivers Paying for Engine Replacements?
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] border border-black font-bold text-black transition focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] focus:ring-offset-2 align-middle relative -top-0.5 ml-2"
              aria-label="Show pricing information"
            >
              !
            </button>
          </h2>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.4fr_0.6fr] lg:items-stretch">
          {/* Desktop Image: Hidden on mobile, shown on lg and up */}
          <div className="relative hidden min-h-55 overflow-hidden lg:min-h-full lg:block">
            <Image
              src={sectionImageSrc}
              alt="Replacement engine in a workshop"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Right Table Container: Fixed height on desktop, flex column layout */}
<div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1a2e] via-[#0f2035] to-[#0a1628] shadow-[0_10px_28px_rgba(0,0,0,0.4)] -mx-4 sm:mx-0 flex flex-col h-[600px] lg:h-[700px]">
  
  {/* Header/Nav: Prevents shrinking */}
  <nav className="relative z-10 mb-4 flex-shrink-0" aria-label="Filter live engine data by brand">
    <div className="rounded-t-xl bg-[#0d1f3c] shadow-[0_10px_24px_rgba(13,31,60,0.15)]">
      <div className="flex items-center gap-1 px-2 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
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

          {brands.slice(0, mobileBrandsCount).map((brand) => (
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

        <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex">
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

          {brands.slice(0, desktopBrandsCount).map((brand) => (
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
                  : "border-white/15 bg-transparent text-white hover:bg-white/12 hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {mobileOverflowBrands.length ? (
          <div className="relative ml-2 flex-none md:hidden">
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
                {mobileOverflowBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setActiveBrand(brand);
                      setDrawerOpen(false);
                    }}
                    className="rounded-[9px] px-3 py-2.5 text-left text-[11px] font-bold text-white transition hover:bg-white/10"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {desktopOverflowBrands.length ? (
          <div className="relative ml-2 hidden flex-none md:flex">
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
                {desktopOverflowBrands.map((brand) => (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setActiveBrand(brand);
                      setDrawerOpen(false);
                    }}
                    className="rounded-[9px] px-3 py-2.5 text-left text-[11px] font-bold text-white transition hover:bg-white/10"
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

  {/* Scrollable Area Wrapper: Takes up remaining space */}
  <div className="flex-1 flex flex-col overflow-hidden">
    {visibleRows.length ? (
      /* ADDED `pr-4` HERE to create space between the content and the scrollbar */
      <div className="flex-1 overflow-y-auto pr-4 [scrollbar-width:thin] [scrollbar-color:#ffffff_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-white/80">
        <ul className="list-none">
          {visibleRows.map((row, index) => (
            <li
              key={`${row.brand}-${row.model}-${index}`}
              className="border-b border-white/10 px-4 py-3 transition hover:bg-white/5 last:border-b-0"
            >
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                  {row.model}
                </span>
                <span className="hidden whitespace-nowrap text-[11px] text-white sm:inline">
                  {row.years}
                </span>
                <span className="whitespace-nowrap text-[15px] font-bold text-[#4ade80]">
                  {row.price}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 flex-1 truncate text-[11.5px] text-white">
                  {row.issue}
                </span>
                <div className="flex flex-none gap-1">
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.75 text-[10px] font-medium text-white/80">
                    {row.engineCode}
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.75 text-[10px] font-medium text-white/80">
                    {row.fuel}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="flex-1 flex items-center justify-center px-4 py-10 text-center text-[13px] text-white/45">
        <div>
          <strong className="block text-white">No entries for this brand.</strong>
          <span>Try selecting a different filter above.</span>
        </div>
      </div>
    )}

    {/* Footer Stats: Prevents shrinking, stays pinned to bottom */}
    <div className="flex-shrink-0 flex flex-wrap gap-x-5 gap-y-2 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
        <span className="text-[11px] text-white/90">Enquiries 2025:</span>
        <span className="text-[11px] font-semibold text-white">11,856+</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
        <span className="text-[11px] text-white/90">Saving vs dealer:</span>
        <span className="text-[11px] font-semibold text-white">Up to 40%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
        <span className="text-[11px] text-white/90">Vetted suppliers:</span>
        <span className="text-[11px] font-semibold text-white">450+</span>
      </div>
      <div className="ml-auto flex items-center gap-2 text-[11px] text-white/90">
        <RefreshIcon />
        <span>Last updated {formatUpdatedAt(clock)}</span>
      </div>
    </div>
  </div>
</div>
        </div>
      </Container>

      {/* Compact Info Dialog Modal */}
      {dialogOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" 
          onClick={() => setDialogOpen(false)}
        >
          <div 
            className="relative w-full max-w-xs rounded-xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDialogOpen(false)}
              className="absolute right-3 top-3 rounded-full p-1 text-[#5a6478] transition hover:bg-[#f3f4f6] hover:text-[#0d1f3c]"
              aria-label="Close dialog"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="mb-2 pr-6 text-sm font-bold uppercase tracking-wide text-[#2d7a3a]">Pricing Note</h3>
            <p className="text-[13px] leading-[1.6] text-[#5a6478]">
              Typical UK market price ranges across the most requested makes and models. Prices shown are primarily for reconditioned and rebuilt engines unless stated.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}