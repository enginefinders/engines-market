"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getEngineLinkForCode, splitLeadingEngineCode, type EngineLinkMap } from "@/lib/engineLinks";
import type { EngineYearsData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineYearsData;
  engineLinks?: EngineLinkMap;
  strictData?: boolean;
};

function normalizeText(text: string) {
  return text.replace(/[â€“â€”]/g, "-");
}

function AssetIcon({
  src,
  className = "h-5 w-5",
}: {
  src: string;
  className?: string;
}) {
  return <img src={src} alt="" aria-hidden="true" className={`${className} object-contain`} loading="lazy" />;
}

function CalendarIcon({ className = "h-5 w-5", tone = "green" }: { className?: string; tone?: "green" | "white" }) {
  return (
    <AssetIcon
      src={tone === "white" ? "/icons/engine-market/white-calendar-icon.png" : "/icons/engine-market/dark-green-key-change.png"}
      className={className}
    />
  );
}

function StarIcon() {
  return <AssetIcon src="/icons/engine-market/dark-green-major-change.png" className="h-3.5 w-3.5" />;
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
  return <AssetIcon src="/icons/engine-market/dark-green-engine-icon.png" className="h-[14px] w-[14px]" />;
}

function CheckIcon() {
  return <AssetIcon src="/icons/engine-market/dark-green-known-for.png" className="h-[14px] w-[14px] flex-none" />;
}

function ListIcon() {
  return <AssetIcon src="/icons/engine-market/dark-green-car-icon.png" className="h-[14px] w-[14px]" />;
}

function TagIcon() {
  return <AssetIcon src="/icons/engine-market/dark-green-tag-directory.png" className="h-[14px] w-[14px]" />;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
  engineLinks,
  linkLeadingCode = false,
}: {
  items: string[];
  useCheck?: boolean;
  engineLinks?: EngineLinkMap;
  linkLeadingCode?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex items-start gap-2 text-[12.2px] leading-[1.6] text-[#374151]">
          {useCheck ? <span className="mt-[1px] text-[#15803d]"><CheckIcon /></span> : <span className="mt-[5px] h-[7px] w-[7px] flex-none rounded-full bg-[#15803d]" />}
          <span>
            {(() => {
              if (!linkLeadingCode) {
                return item;
              }

              const parsed = splitLeadingEngineCode(item);
              if (!parsed) {
                return item;
              }

              const href = getEngineLinkForCode(parsed.code, engineLinks);
              if (!href) {
                return item;
              }

              return (
                <>
                  <Link href={href} className="font-extrabold text-[#0d1b2e] underline-offset-2 hover:text-[#15803d] hover:underline">
                    {parsed.code}
                  </Link>
                  {parsed.remainder ? ` - ${parsed.remainder}` : ""}
                </>
              );
            })()}
          </span>
        </div>
      ))}
    </div>
  );
}

function EngineCodeBadge({
  code,
  engineLinks,
}: {
  code: string;
  engineLinks?: EngineLinkMap;
}) {
  const href = getEngineLinkForCode(code, engineLinks);
  const className = "rounded-[7px] border-[0.5px] border-[#2a6dd6] bg-[#f8fbff] px-[10px] py-[5px] text-[11.5px] font-bold text-[#0d1b2e] shadow-[0_0_3px_rgba(42,109,214,0.4),0_0_6px_rgba(42,109,214,0.2),0_2px_4px_rgba(42,109,214,0.15)]";

  if (!href) {
    return <span className={className}>{code}</span>;
  }

  return (
    <Link href={href} className={`${className} inline-flex underline-offset-2 hover:text-[#15803d] hover:underline`}>
      {code}
    </Link>
  );
}

function YearPanel({
  item,
  brandName,
  mobile = false,
  engineLinks,
  ui,
  strictData = false,
}: {
  item: EngineYearsData["years"][number];
  brandName: string;
  mobile?: boolean;
  engineLinks?: EngineLinkMap;
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
              <CalendarIcon tone="white" className="h-6 w-6 md:h-[26px] md:w-[26px]" />
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
                <SectionLabel icon={<AssetIcon src="/icons/engine-market/dark-green-key-change.png" className="h-[14px] w-[14px]" />} label={keyChangesLabel} />
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
                  <BulletList items={item.mainEngines ?? []} engineLinks={engineLinks} linkLeadingCode />
                </div>
                <div className="px-[14px] py-3">
                  <SectionLabel icon={<TagIcon />} label={engineCodesLabel} />
                  <div className="mt-1 flex flex-wrap gap-[6px]">
                    {(item.engineCodesCovered ?? []).map((code, index) => (
                      <EngineCodeBadge key={`${code}-${index}`} code={code} engineLinks={engineLinks} />
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
                  <SectionLabel icon={<AssetIcon src="/icons/engine-market/dark-green-key-change.png" className="h-[14px] w-[14px]" />} label={keyChangesLabel} />
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
                  <BulletList items={item.mainEngines} engineLinks={engineLinks} linkLeadingCode />
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
                      <EngineCodeBadge key={`${code}-${index}`} code={code} engineLinks={engineLinks} />
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
          className="mt-[14px] flex items-center gap-3 rounded-[8px] border border-[#16a34a] bg-[linear-gradient(180deg,#16345e_0%,#0d1b2e_100%)] px-4 py-3 text-white transition hover:bg-[linear-gradient(180deg,#1b3d6c_0%,#112643_100%)] md:mt-0 md:px-5 md:py-[13px] shadow-[0_0_0_1px_rgba(22,163,74,0.14),0_0_14px_rgba(22,163,74,0.38)]"
        >
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[8px] bg-[#16a34a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <CalendarIcon tone="white" className="h-[18px] w-[18px]" />
            </div>
          <div className="min-w-0 flex-1">
            <div className="font-['Manrope'] text-[13.5px] font-extrabold leading-[1.2] text-white md:text-[14px]">
              {ctaText}
            </div>
          </div>
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[8px] bg-[#16a34a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
            <ArrowRightIcon />
          </div>
        </a>
      ) : null}
    </>
  );
}

export default function EngineYearsSection({ brandName, data, engineLinks, strictData = false }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeYear = useMemo(() => data.years[activeIndex] ?? data.years[0], [activeIndex, data.years]);
  const headingLines = data.headingLines?.length ? data.headingLines : [splitHeading(data.h2).primary, splitHeading(data.h2).accent].filter(Boolean);
  const ui = data.ui ?? {};

  return (
    <Section className="bg-[#f8f9fa] !py-[20px] md:!py-[24px] lg:!py-[28px]">
      <Container className="max-w-[1400px]">
        <div className="section-pill mb-[14px]">
          {/* <CalendarIcon className="h-[13px] w-[13px]" /> */}
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

        <div className="mb-[18px] overflow-hidden border border-[#13243d] bg-[#0d1b2e] shadow-[0_10px_24px_rgba(13,27,46,0.12)] max-[720px]:mx-[-16px] max-[720px]:border-x-0">
          <div
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${Math.max(data.years.length, 1)}, minmax(0, 1fr))` }}
          >
            {data.years.map((item, index) => (
              <button
                key={`${item.year}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative flex min-h-[44px] items-center justify-center border-r border-[#233856] px-2 py-3 text-center transition last:border-r-0 md:min-h-[46px] md:px-4 ${
                  activeIndex === index
                    ? "bg-[linear-gradient(180deg,#1fa34a_0%,#15803d_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(10,87,42,0.5),0_0_0_1px_rgba(34,197,94,0.2)] before:absolute before:inset-x-0 before:top-0 before:h-[45%] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] before:content-['']"
                    : "bg-[#0d1b2e] text-white hover:bg-[#10233d]"
                }`}
              >
                <span className="relative z-[1] font-['Manrope'] text-[12px] font-extrabold leading-[1.1] md:text-[14px]">
                  {normalizeYearLabel(item.year)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {activeYear ? (
          <>
            <div className="hidden md:block">
              <YearPanel item={activeYear} brandName={brandName} engineLinks={engineLinks} ui={ui} strictData={strictData} />
            </div>

            <div className="md:hidden">
              <YearPanel item={activeYear} brandName={brandName} engineLinks={engineLinks} mobile ui={ui} strictData={strictData} />
            </div>
          </>
        ) : null}

        {/* {strictData ? (
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
        )} */}
      </Container>
    </Section>
  );
}
