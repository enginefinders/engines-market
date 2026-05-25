"use client";

import { useMemo, useRef, useState } from "react";
import type { EngineYearsData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineYearsData;
  strictData?: boolean;
};

function normalizeText(text: string) {
  return text.replace(/[â€“â€”]/g, "-");
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <polyline
        points="23 6 13.5 15.5 8.5 10.5 1 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="17 6 23 6 23 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] flex-none" fill="none" aria-hidden="true">
      <polyline
        points="20 6 9 17 4 12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <polyline
        points="15 18 9 12 15 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function topBadges(item: EngineYearsData["years"][number]) {
  return (item.badges ?? []).map((badge) => ({
    label: badge.label,
    grey: badge.tone === "muted",
    icon: badge.tone === "muted" ? "trend" : "star",
  }));
}

function splitTicker(ticker?: string) {
  if (!ticker) return [];

  const normalized = normalizeText(ticker);
  const parts = normalized
    .split(/[•;|]/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.length ? parts.slice(0, 4) : [normalized];
}

void splitTicker;

function compactYearCta(year: string, cta: string) {
  const normalized = normalizeText(cta);
  if (/compare/i.test(normalized)) {
    return `Compare ${year} ${normalized.replace(/compare/i, "").trim()}`.replace(/\s+/g, " ").trim();
  }

  return normalized;
}

function normalizeYearLabel(year: string) {
  const normalized = normalizeText(year).replace(/\s+/g, " ").trim();
  const duplicatedYearMatch = normalized.match(/^(\d{4})\s*-\s*\1$/);

  if (duplicatedYearMatch) {
    return duplicatedYearMatch[1];
  }

  return normalized;
}

function normalizeYearPreview(year: string, preview: string) {
  const normalizedPreview = normalizeText(preview).replace(/\s+/g, " ").trim();
  const yearLabel = normalizeYearLabel(year);
  const yearPrefix = `${yearLabel} - `;

  if (normalizedPreview.toLowerCase().startsWith(yearPrefix.toLowerCase())) {
    return normalizedPreview.slice(yearPrefix.length).trim();
  }

  return normalizedPreview;
}

function splitHeading(text: string) {
  const accent = "What Was Fitted & When";
  if (text.includes(accent)) {
    return {
      primary: text.replace(accent, "").replace(/\s+-\s*$/, "").trim(),
      accent,
    };
  }

  const parts = text.split(/\s+-\s+/);
  return {
    primary: parts[0] ?? text,
    accent: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function SectionLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="mb-[10px] flex items-center gap-[7px] text-[10.5px] font-bold uppercase tracking-[0.6px] text-[#0d1b2e]">
      <span className="text-[#15803d]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function BulletList({
  items,
  useCheck = false,
}: {
  items: string[];
  useCheck?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-start gap-2 text-[12.2px] leading-[1.6] text-[#374151]">
          {useCheck ? <span className="mt-[1px] text-[#15803d]"><CheckIcon /></span> : <span className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full bg-[#15803d]" />}
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function YearPanel({
  item,
  brandName,
  mobile = false,
  ui,
  strictData = false,
}: {
  item: EngineYearsData["years"][number];
  brandName: string;
  mobile?: boolean;
  ui: NonNullable<EngineYearsData["ui"]>;
  strictData?: boolean;
}) {
  const enquiries = item.enquiries ?? [];
  const ctaText = strictData ? (item.ctaText || item.cta || "") : (item.ctaText || compactYearCta(item.year, item.cta));
  const yearLabel = normalizeYearLabel(item.year);
  const previewLabel = normalizeYearPreview(item.year, item.preview);
  const keyChangesLabel = strictData ? (ui.keyChangesLabel || "") : (ui.keyChangesLabel ?? "Key Changes");
  const knownForLabel = strictData ? (ui.knownForLabel || "") : (ui.knownForLabel ?? "Known For");
  const mainEnginesLabel = strictData ? (ui.mainEnginesLabel || "") : (ui.mainEnginesLabel ?? "Main Engines");
  const engineCodesLabel = strictData ? (ui.engineCodesLabel || "") : (ui.engineCodesLabel ?? "Engine Codes Covered");
  const popularModelsLabel = strictData ? (ui.popularModelsLabel || "") : (ui.popularModelsLabel ?? "Popular Models");
  const enquiriesLabel = strictData ? (ui.enquiriesLabel || "") : (ui.enquiriesLabel ?? "Common Replacement Enquiries");

  return (
    <>
      <div className="overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_2px_16px_rgba(13,27,46,0.06)] md:rounded-[16px]">
        <div className="flex items-start gap-[13px] border-b border-[#f1f5f9] px-4 py-4 md:px-6 md:py-5">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-[11px] bg-[#15803d] text-white md:h-[52px] md:w-[52px] md:rounded-[12px]">
            <CalendarIcon className="h-6 w-6 md:h-[26px] md:w-[26px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-['Manrope'] text-[17px] font-extrabold leading-[1.25] text-[#0d1b2e] md:text-[20px]">
              {previewLabel ? `${yearLabel} - ${previewLabel}` : yearLabel}
            </div>
            <div className="mt-2 flex flex-wrap gap-[6px] md:gap-2">
              {topBadges(item).map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center gap-[5px] rounded-full text-[10.5px] font-semibold ${
                    badge.grey
                      ? "text-[#6b7280]"
                      : "text-[#15803d]"
                  }`}
                >
                  {badge.icon === "star" ? <StarIcon /> : <TrendIcon />}
                  <span>{badge.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-[#f1f5f9] px-4 py-[14px] text-[12.8px] leading-[1.75] text-[#374151] md:px-6 md:py-4 md:text-[13.5px]">
          {item.description}
        </div>

        {mobile ? (
          <>
            {item.keyChanges?.length ? (
              <div className="border-b border-[#f1f5f9] px-4 py-3">
                <SectionLabel icon={<CalendarIcon className="h-[14px] w-[14px]" />} label={keyChangesLabel} />
                <BulletList items={item.keyChanges} />
              </div>
            ) : null}

            {item.knownFor?.length ? (
              <div className="border-b border-[#f1f5f9] px-4 py-3">
                <SectionLabel icon={<CheckIcon />} label={knownForLabel} />
                <BulletList items={item.knownFor} useCheck />
              </div>
            ) : null}

            {(item.mainEngines?.length || item.engineCodesCovered?.length) ? (
              <div className="grid grid-cols-2 border-b border-[#f1f5f9]">
                <div className="border-r border-[#f1f5f9] px-[14px] py-3">
                  <SectionLabel icon={<EngineIcon />} label={mainEnginesLabel} />
                  <BulletList items={item.mainEngines ?? []} />
                </div>
                <div className="px-[14px] py-3">
                  <SectionLabel icon={<TagIcon />} label={engineCodesLabel} />
                  <div className="mt-1 flex flex-wrap gap-[6px]">
                    {(item.engineCodesCovered ?? []).map((code, index) => (
                      <span key={`${code}-${index}`} className="rounded-[7px] border border-[#0d1b2e] bg-[#f8fbff] px-[10px] py-[5px] text-[11.5px] font-bold text-[#0d1b2e]">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {(item.popularModels?.length || enquiries.length) ? (
              <div className="grid grid-cols-2">
                <div className="border-r border-[#f1f5f9] px-[14px] py-3">
                  <SectionLabel icon={<ListIcon />} label={popularModelsLabel} />
                  <div className="flex flex-col gap-0">
                    {(item.popularModels ?? []).map((model, index) => (
                      <div key={`${model}-${index}`} className="flex items-center justify-between border-b border-[#f8f9fa] py-[6px] text-[12px] text-[#374151] last:border-b-0">
                        <span>{model}</span>
                        <span className="text-[#15803d]">
                          <ArrowRightIcon className="h-3 w-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-[14px] py-3">
                  <SectionLabel icon={<SearchIcon />} label={enquiriesLabel} />
                  <BulletList items={enquiries} />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="grid border-b border-[#f1f5f9] md:grid-cols-4">
              {item.keyChanges?.length ? (
                <div className="border-r border-[#f1f5f9] px-5 py-[18px] last:border-r-0">
                  <SectionLabel icon={<CalendarIcon className="h-[14px] w-[14px]" />} label={keyChangesLabel} />
                  <BulletList items={item.keyChanges} />
                </div>
              ) : <div className="border-r border-[#f1f5f9] px-5 py-[18px]" />}

              {item.knownFor?.length ? (
                <div className="border-r border-[#f1f5f9] px-5 py-[18px] last:border-r-0">
                  <SectionLabel icon={<CheckIcon />} label={knownForLabel} />
                  <BulletList items={item.knownFor} useCheck />
                </div>
              ) : <div className="border-r border-[#f1f5f9] px-5 py-[18px]" />}

              {item.mainEngines?.length ? (
                <div className="border-r border-[#f1f5f9] px-5 py-[18px] last:border-r-0">
                  <SectionLabel icon={<EngineIcon />} label={mainEnginesLabel} />
                  <BulletList items={item.mainEngines} />
                </div>
              ) : <div className="border-r border-[#f1f5f9] px-5 py-[18px]" />}

              {item.popularModels?.length ? (
                <div className="px-5 py-[18px]">
                  <SectionLabel icon={<ListIcon />} label={popularModelsLabel} />
                  <div className="flex flex-col gap-0">
                    {item.popularModels.map((model, index) => (
                      <div key={`${model}-${index}`} className="flex items-center justify-between border-b border-[#f1f5f9] py-2 text-[12.5px] text-[#374151] last:border-b-0">
                        <span className="font-semibold text-[#0d1b2e]">{model}</span>
                        <span className="text-[#15803d]">
                          <ArrowRightIcon className="h-[13px] w-[13px]" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : <div className="px-5 py-[18px]" />}
            </div>

            {(item.engineCodesCovered?.length || enquiries.length) ? (
              <div className="grid md:grid-cols-2">
                <div className="border-r border-[#f1f5f9] px-5 py-[18px]">
                  <SectionLabel icon={<TagIcon />} label={engineCodesLabel} />
                  <div className="mt-1 flex flex-wrap gap-[7px]">
                    {(item.engineCodesCovered ?? []).map((code, index) => (
                      <span key={`${code}-${index}`} className="rounded-[7px] border border-[#0d1b2e] bg-[#f8fbff] px-[11px] py-[5px] text-[12px] font-bold text-[#0d1b2e]">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-[18px]">
                  <SectionLabel icon={<SearchIcon />} label={enquiriesLabel} />
                  <div className="grid gap-[6px] md:grid-cols-2 md:gap-x-4">
                    {enquiries.map((entry, index) => (
                      <div key={`${entry}-${index}`} className="flex items-start gap-[6px] text-[12.2px] leading-[1.55] text-[#374151]">
                        <span className="mt-[5px] h-[6px] w-[6px] flex-none rounded-full bg-[#15803d]" />
                        <span>{entry}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      {ctaText ? (
        <a
          href="#quote-form"
          data-quote-context={`${item.year} ${brandName} engines`}
          data-quote-source="engine-years"
          className="mt-[14px] flex items-center gap-[13px] rounded-[14px] bg-[#0d1b2e] px-[18px] py-[15px] transition hover:bg-[#1e3a5f] md:mt-0 md:rounded-none md:px-7 md:py-[18px]"
        >
          <div className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[10px] bg-[#15803d] text-white md:h-[44px] md:w-[44px] md:rounded-[11px]">
            <CalendarIcon className="h-[22px] w-[22px]" />
          </div>
            <div className="min-w-0 flex-1">
              <div className="font-['Manrope'] text-[14.5px] font-extrabold leading-[1.25] text-white md:text-[15px]">
                {ctaText}
              </div>
            </div>
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[8px] bg-[#15803d] text-white md:h-10 md:w-10 md:rounded-[9px]">
            <ArrowRightIcon />
          </div>
        </a>
      ) : null}
    </>
  );
}

export default function EngineYearsSection({ brandName, data, strictData = false }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const desktopStripRef = useRef<HTMLDivElement>(null);
  const activeYear = useMemo(() => data.years[activeIndex] ?? data.years[0], [activeIndex, data.years]);
  const headingLines = data.headingLines?.length ? data.headingLines : [splitHeading(data.h2).primary, splitHeading(data.h2).accent].filter(Boolean);
  const ui = data.ui ?? {};
  const summaryCta = data.summaryCta ?? {};

  const shiftYears = (direction: number) => {
    desktopStripRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1200px]">
        <div className="section-pill mb-[14px]">
          <CalendarIcon className="h-[13px] w-[13px]" />
          <span>{data.tag}</span>
        </div>

        <h2 className="text-[30px] font-extrabold leading-[1.12] tracking-[-0.6px] text-[#0d1b2e] md:text-[41px] md:tracking-[-0.8px]">
          {headingLines.map((line, index) => (
            <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
              {line}
            </span>
          ))}
        </h2>
        <p className="mb-[22px] mt-[14px] max-w-[880px] text-[12.8px] leading-[1.75] text-[#4b5563] md:mb-8 md:text-[14px]">
          {data.intro}
        </p>

        <div className="hidden md:flex md:items-center md:gap-2 md:pb-1 md:pr-1">
          <button
            type="button"
            onClick={() => shiftYears(-1)}
            className="flex h-16 w-9 flex-none items-center justify-center rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-[#0d1b2e] transition hover:border-[#0d1b2e] hover:text-[#0d1b2e]"
          >
            <ArrowLeftIcon />
          </button>

          <div
            ref={desktopStripRef}
            className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {data.years.map((item, index) => (
              <button
                key={`${item.year}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex h-[58px] w-[110px] flex-none items-center justify-center rounded-[10px] border bg-white px-[10px] text-center transition ${
                  activeIndex === index
                    ? "border-2 border-[#0d1b2e]"
                    : "border-[1.5px] border-[#e5e7eb] hover:border-[#0d1b2e]"
                }`}
              >
                <div className={`font-['Manrope'] text-[14px] font-extrabold leading-[1.15] ${activeIndex === index ? "text-[#15803d]" : "text-[#0d1b2e]"}`}>
                  {normalizeYearLabel(item.year)}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => shiftYears(1)}
            className="flex h-16 w-9 flex-none items-center justify-center rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-[#0d1b2e] transition hover:border-[#0d1b2e] hover:text-[#0d1b2e]"
          >
            <ArrowRightIcon />
          </button>
        </div>

        <div className="mb-[18px] flex items-center gap-[6px] overflow-x-auto rounded-[14px] bg-[#0d1b2e] p-[10px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden">
          {data.years.map((item, index) => (
            <button
              key={`${item.year}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`min-w-[90px] flex-none rounded-[10px] border px-[14px] py-[9px] text-left transition ${
                activeIndex === index
                  ? "border-[#15803d] bg-[#15803d]"
                  : "border-[#334155] bg-transparent"
              }`}
            >
              <div className="font-['Manrope'] text-[13px] font-extrabold leading-[1.15] text-white">{normalizeYearLabel(item.year)}</div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => desktopStripRef.current?.scrollTo({ left: desktopStripRef.current.scrollWidth, behavior: "smooth" })}
            className="ml-auto flex h-9 w-9 flex-none items-center justify-center rounded-[10px] border border-[#334155] text-[#94a3b8]"
          >
            <ArrowRightIcon className="h-4 w-4 rotate-90" />
          </button>
        </div>

        {activeYear ? (
          <>
            <div className="hidden md:block">
              <YearPanel item={activeYear} brandName={brandName} ui={ui} strictData={strictData} />
            </div>

            <div className="md:hidden">
              <YearPanel item={activeYear} brandName={brandName} mobile ui={ui} strictData={strictData} />
            </div>
          </>
        ) : null}

        {strictData ? (
          summaryCta.title && summaryCta.buttonText ? (
            <div className="mt-3">
              <CtaStrip
                tone="light"
                label={summaryCta.label}
                title={summaryCta.title}
                description={data.closing}
                buttonText={summaryCta.buttonText}
                icon={<ShieldIcon />}
                linkProps={{
                  href: "#quote-form",
                  "data-quote-context": `${brandName} engine year finder`,
                  "data-quote-source": "engine-years-summary",
                }}
              />
            </div>
          ) : data.closing ? (
            <p className="mt-3 text-[12.5px] leading-[1.7] text-[#4b5563]">{data.closing}</p>
          ) : null
        ) : (
          <div className="mt-3">
            <CtaStrip
              tone="light"
              label={summaryCta.label ?? "Year Finder"}
              title={summaryCta.title ?? `Not sure which year your ${brandName} was built?`}
              description={data.closing}
              buttonText={summaryCta.buttonText ?? "Find My Engine"}
              icon={<ShieldIcon />}
              linkProps={{
                href: "#quote-form",
                "data-quote-context": `${brandName} engine year finder`,
                "data-quote-source": "engine-years-summary",
              }}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
