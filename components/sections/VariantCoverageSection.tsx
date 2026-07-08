"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ModelVariantCoverageSectionData } from "@/types/model";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelVariantCoverageSectionData;
  brandName?: string;
  modelName?: string;
  documentMode?: boolean;
};

type VariantCard = ModelVariantCoverageSectionData["cards"][number];
const MOBILE_VISIBLE_COUNT = 6;

function isRenderableVariantCard(card: VariantCard) {
  const hasHeading = card.h3.trim().length > 0;
  const hasSlug = card.slug.trim().length > 0 && card.slug.trim() !== "-engine";
  const hasSpecs =
    card.priceRange.trim().length > 0 ||
    card.power.trim().length > 0 ||
    (card.years?.trim().length ?? 0) > 0 ||
    card.engineCodes.length > 0;

  return hasHeading && hasSlug && hasSpecs;
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 0 17.5 16H4V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M4 16v1.5A2.5 2.5 0 0 0 6.5 20H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChevronIcon({
  open,
  animated,
}: {
  open: boolean;
  animated: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : animated ? "chevron-breathe-down" : ""
        }`}
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
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

function formatVariantName(title: string) {
  return title
    .replace(/\s+Engine Replacement$/i, "")
    .replace(/^BMW\s+/i, "")
    .trim();
}

function normalizeVariantSubtitle(subtitle: string) {
  return subtitle.replace(/\u00c2\u00b7/g, "\u00b7").replace(/\s+/g, " ").trim();
}

function resolveVariantVehicleImage(card: VariantCard) {
  const years = card.years?.trim() ?? "";

  if (/^2019-2024$/.test(years) || /^2019/.test(years)) {
    return "/images/brands/bmw/models/bmw-1-series-f40-model-card.png";
  }

  if (/^(2011|2012|2016)/.test(years)) {
    return "/images/brands/bmw/models/bmw-1-series-f20-f21-model-card.png";
  }

  if (/^2004-2011$/.test(years) || /^2004/.test(years)) {
    return "/images/brands/bmw/models/bmw-1-series-e81-e87-model-card.png";
  }

  if (/2004-2024/.test(years)) {
    return "/images/brands/bmw/models/bmw-1-series-model-card.png";
  }

  return "/images/brands/bmw/models/bmw-1-series-model-card.png";
}

function extractEngineType(card: VariantCard) {
  const match = card.subtitle.match(/\d(?:\.\d)?L\s+[A-Za-z]+/);
  return match?.[0] ?? `${card.fuel}`.trim();
}

function formatCodeAndType(card: VariantCard) {
  const codes = card.engineCodes.length ? card.engineCodes.join("/") : "";
  const engineType = extractEngineType(card);

  return [codes, engineType].filter(Boolean).join(" ");
}

function isRenderableDirectoryItem(item: string) {
  const normalizedItem = item.trim();

  if (!normalizedItem) {
    return false;
  }

  if (/^not sure which variant/i.test(normalizedItem)) {
    return false;
  }

  if (normalizedItem.length > 40 && /[.?!]$/.test(normalizedItem)) {
    return false;
  }

  if (/variants$/i.test(normalizedItem) && normalizedItem.split(/\s+/).length > 2) {
    return false;
  }

  return true;
}

function getRenderableDirectoryGroups(data: ModelVariantCoverageSectionData) {
  return data.directory.groups
    .map((group) => {
      const seenItems = new Set<string>();
      const items = group.items.filter((item) => {
        if (!isRenderableDirectoryItem(item)) {
          return false;
        }

        const normalizedKey = item.trim().toLowerCase();
        if (seenItems.has(normalizedKey)) {
          return false;
        }

        seenItems.add(normalizedKey);
        return true;
      });

      return {
        ...group,
        items,
      };
    })
    .filter((group) => group.items.length > 0);
}

export default function VariantCoverageSection({ data, brandName, modelName, documentMode = false }: Props) {
  const renderableCards = useMemo(
    () => data.cards.filter(isRenderableVariantCard),
    [data.cards],
  );
  
  const renderableDirectoryGroups = useMemo(
    () => getRenderableDirectoryGroups(data),
    [data],
  );

  const [openCard, setOpenCard] = useState<string | null>(null);
  const [seenCards, setSeenCards] = useState<Record<string, boolean>>({});

  const [columns, setColumns] = useState<number>(2);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      
      if (width >= 1536) setColumns(6);
      else if (width >= 1280) setColumns(5);
      else setColumns(2);

      const mobile = width < 768;
      setIsMobile(mobile);
      
      if (!mobile) {
        setShowAllCards(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileCardsToDisplay = useMemo(() => {
    if (isMobile && !showAllCards && renderableCards.length > MOBILE_VISIBLE_COUNT) {
      return renderableCards.slice(0, MOBILE_VISIBLE_COUNT);
    }
    return renderableCards;
  }, [isMobile, showAllCards, renderableCards]);

  const totalRows = Math.ceil(renderableCards.length / columns);
  const useStackedExpansion = columns <= 2;

  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const ui = data.ui ?? {};
  const directoryHeading = data.directory.h3.trim();
  const directoryIntro = data.directory.intro.trim();

  if (!renderableCards.length) {
    return null;
  }

  function toggleCard(slug: string) {
    setOpenCard((current) => (current === slug ? null : slug));
    setSeenCards((current) => (current[slug] ? current : { ...current, [slug]: true }));
  }

  function renderExpandedPanel(card: VariantCard, extraClassName = "") {
    return (
      <div
        className={`relative overflow-hidden border-[0.5px] border-[#2969af] bg-[#0d1b2e] px-4 pb-4 pt-4 text-white shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_5px_rgba(42,109,214,0.4),0_0_12px_rgba(42,109,214,0.3),0_0_20px_rgba(42,109,214,0.2),0_3px_10px_rgba(42,109,214,0.25)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(125deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_22%,rgba(255,255,255,0)_42%,rgba(45,107,255,0.16)_50%,rgba(255,255,255,0)_64%)] after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent ${extraClassName}`}
      >
        <div className="relative z-10 space-y-[10px]">
          <div className="flex items-center justify-between gap-3 rounded-[8px] border border-blue-500 bg-white/[0.03] px-3 py-3 shadow-[0_0_15px_rgba(59,130,246,0.5),inset_0_0_12px_rgba(59,130,246,0.3)] transition hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),inset_0_0_15px_rgba(59,130,246,0.5)] sm:py-4">
            <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
              {ui.specsLabel ?? "Specs"}
            </span>
            <span className="min-w-0 flex-1 truncate text-right text-[11px] font-semibold leading-none text-white md:text-[11.5px]">
              {card.power}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[8px] border border-blue-500 bg-white/[0.03] px-3 py-3 shadow-[0_0_15px_rgba(59,130,246,0.5),inset_0_0_12px_rgba(59,130,246,0.3)] transition hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),inset_0_0_15px_rgba(59,130,246,0.5)] sm:py-4">
            <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
              {ui.yearsLabel ?? "Years"}
            </span>
            <span className="min-w-0 flex-1 truncate text-right text-[11px] font-semibold leading-none text-white md:text-[11.5px]">
              {card.years?.trim() || ui.yearsFallback || "Check exact year coverage by registration"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[8px] border border-blue-500 bg-white/[0.03] px-3 py-3 shadow-[0_0_15px_rgba(59,130,246,0.5),inset_0_0_12px_rgba(59,130,246,0.3)] transition hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),inset_0_0_15px_rgba(59,130,246,0.5)] sm:py-4">
            <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
              {ui.rebuiltLabel ?? "Rebuilt"}
            </span>
            <span className="min-w-0 flex-1 truncate text-right font-['Manrope'] text-[14px] font-extrabold leading-none text-white md:text-[15px] ">
              {card.priceRange}
            </span>
          </div>
        </div>

        <a
          href="#quote-form"
          data-quote-context={card.h3}
          data-quote-source="variant-coverage"
          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-green-400 bg-slate-900 px-2 text-[13px] font-semibold text-white shadow-[0_0_15px_rgba(74,222,128,0.5),inset_0_0_12px_rgba(74,222,128,0.3)] transition hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(74,222,128,0.8),inset_0_0_15px_rgba(74,222,128,0.5)]"
        >
          <span>{card.cta}</span>
          <ArrowIcon />
        </a>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes variant-marquee-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .variant-marquee-box {
          max-width: 20ch;
        }
        .variant-marquee-track {
          display: inline-flex;
          white-space: nowrap;
          animation: variant-marquee-slide 12s linear infinite;
          animation-play-state: paused;
        }
        .variant-marquee-box:hover .variant-marquee-track {
          animation-play-state: running; 
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>

      <Section className="bg-[#f7f8fb]">
        <Container className={`max-w-[1400px] ${documentMode ? "px-0 sm:px-0 lg:px-0" : "px-2"}`}>
          <div className=" max-w-[760px] text-left">
            <div className="section-pill mb-[14px]">
              <span>{data.tag}</span>
            </div>

            <h2 className=" max-w-[760px] text-[30px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0d1b2e] md:text-[40px]">
              {headingLines.map((line, index) => {
                const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
                return (
                  <span key={`${line}-${index}`} className={`block ${isAccent ? "text-[#15803d]" : ""}`}>
                    {line}
                  </span>
                );
              })}
            </h2>
            <p className="mt-3 max-w-[720px] text-[14px] leading-[1.75] text-slate-600">
              {data.subheading}
            </p>
          </div>

          <div className="mt-6 md:mt-9">
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {mobileCardsToDisplay.map((card) => {
                const shortName = formatVariantName(card.h3);
                const isOpen = openCard === card.slug;
                const animateChevron = !isOpen && !seenCards[card.slug];
                const vehicleImage = resolveVariantVehicleImage(card);

                return (
                  <article key={card.slug} className="relative">
                    <div
                      className={`overflow-hidden rounded-[12px] border bg-white transition duration-300 ${
                        isOpen
                          ? "rounded-b-none border-[#2969af] border-b-0 shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_5px_rgba(42,109,214,0.4),0_0_12px_rgba(42,109,214,0.3),0_0_20px_rgba(42,109,214,0.2),0_3px_10px_rgba(42,109,214,0.25)]"
                          : "border-slate-200 shadow-[0_2px_8px_rgba(13,27,46,0.05)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCard(card.slug)}
                        aria-expanded={isOpen}
                        className="flex min-h-[224px] w-full flex-col items-center px-3 pb-2 pt-3 text-center"
                      >
                        <div className="flex min-h-[72px] w-full items-center justify-center">
                          <div className="relative h-[66px] w-full max-w-[118px]">
                            <Image
                              src={vehicleImage}
                              alt={shortName}
                              fill
                              className="object-contain"
                              sizes="118px"
                            />
                          </div>
                        </div>

                        <div className="mt-3 flex w-full flex-1 flex-col">
                          <div className="min-h-[32px] font-['Manrope'] text-[13px] font-extrabold leading-[1.18] text-[#0d1b2e]">
                            {shortName}
                          </div>
                          <p className="mt-2 min-h-[28px] text-[10px] font-semibold leading-[1.4] text-[#4b5563]">
                            {normalizeVariantSubtitle(card.subtitle)}
                          </p>
                          <p className="mt-4 font-['Manrope'] text-[13px] font-semibold leading-none text-[#374151]">
                            Rebuilt: {card.priceRange}
                          </p>
                        </div>

                        <span className="mt-auto inline-flex pt-3 text-[#15803d]">
                          <ChevronIcon open={isOpen} animated={animateChevron} />
                        </span>
                      </button>
                    </div>

                    {isOpen ? renderExpandedPanel(card, "rounded-b-[12px] border-t-0") : null}
                  </article>
                );
              })}
            </div>

            <div className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6">
              {renderableCards.map((card, index) => {
                const rowIndex = Math.floor(index / columns);
                const isLastRow = rowIndex === totalRows - 1 && totalRows > 1;
                const isOpen = openCard === card.slug;
                const shortName = formatVariantName(card.h3);
                const animateChevron = !isOpen && !seenCards[card.slug];
                const codeAndType = formatCodeAndType(card);
                const vehicleImage = resolveVariantVehicleImage(card);

                return (
                  <article key={card.slug} className="relative">
                    <div
                      className={`overflow-hidden rounded-[12px] border bg-white transition duration-300 ${isOpen
                          ? `border-[#2969af] shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_5px_rgba(42,109,214,0.4),0_0_12px_rgba(42,109,214,0.3),0_0_20px_rgba(42,109,214,0.2),0_3px_10px_rgba(42,109,214,0.25)] ${useStackedExpansion
                            ? "rounded-b-none border-b-0"
                            : isLastRow
                            ? "rounded-b-[12px] rounded-t-none border-t-0"
                            : "rounded-t-[12px] rounded-b-none border-b-0"
                          }`
                          : "border-slate-200 shadow-[0_2px_8px_rgba(13,27,46,0.05)] hover:border-slate-300 hover:shadow-[0_8px_18px_rgba(13,27,46,0.08)]"
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCard(card.slug)}
                        aria-expanded={isOpen}
                        className="flex min-h-[230px] w-full flex-col items-center px-2 pb-2 pt-1.5 sm:px-4 sm:py-4 text-center md:min-h-[248px]"
                      >
                        <div className="flex min-h-[82px] w-full items-center justify-center">
                          <div className="relative h-[80px] w-full max-w-[170px]">
                            <Image
                              src={vehicleImage}
                              alt={shortName}
                              fill
                              className="object-contain"
                              sizes="170px"
                            />
                          </div>
                        </div>

                        <div className="mt-3 w-full max-w-[250px]">
                          <div className="font-['Manrope'] text-[16px] font-extrabold leading-[1.18] text-[#0d1b2e] md:text-[15px]">
                            {shortName}
                          </div>
                          <p className="mt-2 text-[11.5px] font-semibold leading-[1.4] text-[#4b5563]">
                            {codeAndType}
                          </p>
                          <p className="mt-3 font-['Manrope'] text-[15px] font-semibold leading-none text-[#374151]">
                            Rebuilt: {card.priceRange}
                          </p>
                        </div>

                        <span className="mt-auto inline-flex pt-2 text-[#15803d] md:pt-4">
                          <ChevronIcon open={isOpen} animated={animateChevron} />
                        </span>
                      </button>
                    </div>

                    {isOpen
                      ? renderExpandedPanel(
                          card,
                          `${useStackedExpansion
                            ? "rounded-b-[12px] border-t-0"
                            : `absolute left-[-1px] right-[-1px] z-50 ${
                                isLastRow
                                  ? "bottom-full rounded-t-[12px] border-b-0"
                                  : "top-full rounded-b-[12px] border-t-0"
                              }`
                          } min-h-[248px] sm:min-h-[267px]`,
                        )
                      : null}
                  </article>
                );
              })}
            </div>

            {isMobile && renderableCards.length > MOBILE_VISIBLE_COUNT && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllCards((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-[14px] font-semibold text-white border border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5),inset_0_0_12px_rgba(74,222,128,0.3)] transition hover:shadow-[0_0_20px_rgba(74,222,128,0.8),inset_0_0_15px_rgba(74,222,128,0.5)] hover:bg-slate-800"
                >
                  {showAllCards ? "View Less" : "View More"}
                  <ChevronIcon open={showAllCards} animated={false} />
                </button>
              </div>
            )}
          </div>

          {/* --- ACCORDION SECTION --- */}
          <div className="mt-8 rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4 md:p-5">
            <button
              type="button"
              onClick={() => setIsDirectoryOpen((prev) => !prev)}
              className="w-full text-left flex items-start justify-between gap-4 bg-transparent border-none outline-none cursor-pointer p-0"
            >
              <div>
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#15803d]">
                  <BookIcon />
                  <span>{data.directory.label ?? "Variant Directory"}</span>
                </div>
                {directoryHeading ? (
                  <h3 className="mt-3 text-[24px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">
                    {directoryHeading}
                  </h3>
                ) : null}
              </div>
              <span className={`flex-shrink-0 mt-2 text-[#15803d] transition-transform duration-300 ${isDirectoryOpen ? 'rotate-180' : ''}`}>
                <ChevronIcon open={isDirectoryOpen} animated={false} />
              </span>
            </button>

            {isDirectoryOpen && (
              <div className="animate-fade-in-down mt-4 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scroll-smooth overscroll-contain md:mt-0 md:max-h-none md:overflow-visible md:pr-0">
                {directoryIntro ? (
                  <p className="max-w-[900px] text-[13px] leading-[1.7] text-slate-600">{directoryIntro}</p>
                ) : null}

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {renderableDirectoryGroups.map((group) => (
                    <article key={group.title} className="rounded-sm border-[0.5px] border-[#2a6dd6] shadow-[0_0_3px_rgba(42,109,214,0.4),0_0_6px_rgba(42,109,214,0.2),0_2px_4px_rgba(42,109,214,0.15)] bg-white p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#15803d]">{group.title}</p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {group.items.map((item, index) => {
                          const fullText = [modelName, item].filter(Boolean).join(" ");
                          const isLong = fullText.length > 20;
                          const truncatedText = isLong ? `${fullText.slice(0, 20)}...` : fullText;

                          return (
                            <span
                              key={`${group.title}-${item}-${index}`}
                              className={`group/marquee relative inline-flex min-w-0 w-full items-center justify-center overflow-hidden rounded-[8px] border border-slate-200 bg-slate-50 px-[8px] py-[7px] text-[11px] font-semibold text-slate-700 ${isLong ? 'variant-marquee-box max-w-none' : ''}`}
                              title={fullText}
                            >
                              {!isLong ? (
                                <span className="block w-full truncate text-center">{fullText}</span>
                              ) : (
                                <>
                                  <span className="block w-full whitespace-nowrap text-center transition-opacity duration-300 group-hover/marquee:opacity-0">
                                    {truncatedText}
                                  </span>
                                  <span className="absolute inset-0 flex items-center px-[8px] opacity-0 transition-opacity duration-300 group-hover/marquee:opacity-100">
                                    <span className="variant-marquee-track">
                                      <span className="pr-8">{fullText}</span>
                                      <span className="pr-8">{fullText}</span>
                                    </span>
                                  </span>
                                </>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {data.closing ? (
  <div className="mt-4 flex items-center gap-2">
    <svg
      className="h-4 w-4 flex-shrink-0 text-slate-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="text-[13px] leading-[1.75] text-slate-600">
      {data.closing}
    </p>
  </div>
) : null}
        </Container>
      </Section>
    </>
  );
}
