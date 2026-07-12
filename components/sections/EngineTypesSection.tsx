"use client";

import { useEffect, useRef, useState } from "react";
import type { EngineTypesData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  TbArrowRight,
  TbRefresh,
  TbShieldCheck,
} from "react-icons/tb";

type Props = {
  data: EngineTypesData;
  bgImage?: string;
  dynamicBrandCta?: boolean;
  displayMode?: "brand" | "document";
  sectionId?: string;
  documentMode?: boolean;
};

function normalizeText(text: string) {
  return text.replace(/[\u2013\u2014]/g, "-");
}

function fullText(text?: string) {
  return normalizeText(text ?? "").trim();
}

function typeVariant(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return "remanu";
  if (normalized.includes("refurbished")) return "refurb";
  if (normalized.includes("supply")) return "supplyfit";
  if (normalized.includes("used")) return "used";
  if (normalized.includes("rebuilt")) return "rebuilt";
  return "recon";
}

function priceParts(text: string) {
  const normalized = normalizeText(text);
  const [rawLabel, rawValue] = normalized.split(":");
  const label = rawValue === undefined ? "Typical price range" : rawLabel.trim();
  const value = (rawValue ?? normalized).trim();
  const formatNote = (note: string) => {
    const cleaned = note.replace(/^\(|\)$/g, "").trim();

    if (/on top of engine price/i.test(cleaned)) {
      return "Added to the engine price";
    }

    return cleaned;
  };
  const noteMatch = value.match(/(\s*(\(.+\)|on top of engine price|added to engine price))$/i);
  const note = noteMatch ? formatNote(noteMatch[1]) : "";
  const main = noteMatch ? value.slice(0, noteMatch.index).trim() : value;

  return {
    label,
    main,
    note,
  };
}

function typeBadge(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return "Remanufactured";
  if (normalized.includes("refurbished")) return "Refurbished";
  if (normalized.includes("supply")) return "Supply & Fit";
  if (normalized.includes("used")) return "Used";
  if (normalized.includes("rebuilt")) return "Rebuilt";
  return "Reconditioned";
}

function priceDisplayLabel(label: string) {
  const cleaned = label.replace(/ range:?$/i, "").replace(/:$/, "").trim();
  return cleaned.replace(/^typical price$/i, "Typical Price");
}

function isFeaturedCard(title: string) {
  return title.toLowerCase().includes("rebuilt");
}

function DesignerIcon({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-11 w-11 scale-[1.75] object-contain drop-shadow-[0_2px_8px_rgba(13,27,46,0.2)]"
      loading="lazy"
    />
  );
}

function getTypeIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return <DesignerIcon src="/icons/engine-market/type-remanufactured.png" />;
  if (normalized.includes("supply")) return <DesignerIcon src="/icons/engine-market/type-supply-fit.png" />;
  if (normalized.includes("used")) return <DesignerIcon src="/icons/engine-market/type-used.png" />;
  if (normalized.includes("refurbished")) return <DesignerIcon src="/icons/engine-market/type-refurbished.png" />;
  if (normalized.includes("rebuilt")) return <DesignerIcon src="/icons/engine-market/type-rebuilt.png" />;
  return <DesignerIcon src="/icons/engine-market/type-reconditioned.png" />;
}

function FlipCard({
  type,
  open,
  onToggle,
  backActionLabel,
  priceLabel,
  uniformHeight,
}: {
  type: EngineTypesData["types"][number];
  open: boolean;
  onToggle: () => void;
  backActionLabel: string;
  priceLabel: string;
  uniformHeight: number;
}) {
  const icon = getTypeIcon(type.title);
  const badge = typeBadge(type.title);
  const variant = typeVariant(type.title);
  const price = priceParts(type.priceRange);
  const featured = isFeaturedCard(type.title);
  const frontDescription = fullText(type.frontDescription || type.description);
  const backDescription = fullText(type.backDescription || type.description);
  const backBullets = type.backBullets?.map((bullet) => fullText(bullet)).filter(Boolean) ?? [];

  const badgeClass =
    variant === "remanu"
      ? "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]"
      : variant === "refurb"
        ? "border-[#fde68a] bg-[#fefce8] text-[#a16207]"
        : variant === "supplyfit"
          ? "border-[#e9d5ff] bg-[#fdf4ff] text-[#7c3aed]"
          : variant === "used"
            ? "border-[#e5e7eb] bg-[#f8f9fa] text-[#6b7280]"
            : "border-[#0d1b2e] bg-[#f8fbff] text-[#0d1b2e]";

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    onToggle();
  };

  return (
    <div
      className="overflow-hidden rounded-[12px] lg:rounded-[16px]"
      style={{ height: uniformHeight, perspective: "1200px", WebkitPerspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[550ms]"
        style={{
          transform: open ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div
            onClick={handleCardClick}
            className={`flex h-full cursor-pointer flex-col rounded-[12px] border bg-white shadow-[0_4px_12px_rgba(13,27,46,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(13,27,46,0.12)] lg:rounded-[16px] lg:shadow-[0_8px_24px_rgba(13,27,46,0.08)] lg:hover:shadow-[0_12px_32px_rgba(13,27,46,0.15)] ${
              featured ? "border-[#dbe5f4]" : "border-[#e5e7eb]"
            }`}
          >
            <div className="flex flex-1 gap-3 px-4 py-[18px] lg:px-5 lg:py-5">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#e8f4fd] text-[#0d1b2e] lg:h-[54px] lg:w-[54px]">
                {icon}
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="font-['Manrope'] text-[14px] font-extrabold leading-[1.3] text-[#0d1b2e] lg:text-[13px]">
                  {type.title}
                </h3>
                <p className="mt-1 text-[11.5px] leading-[1.5] text-[#4b5563] lg:text-[12.5px] lg:leading-[1.55]">
                  {frontDescription}
                </p>
              </div>
            </div>

            <div className="mx-4 lg:mx-5">
              <div className="h-px bg-[#e5e7eb]" />
            </div>

            <div className="px-4 py-3 lg:px-5 lg:py-3.5">
              <div className="grid grid-cols-[minmax(138px,150px)_1px_minmax(0,1fr)] items-center gap-2.5 lg:grid-cols-[minmax(160px,176px)_1px_minmax(0,1fr)] lg:gap-3">
                <div className="min-w-0">
                  <div className="text-[10.5px] font-medium leading-[1.2] text-[#6b7280] lg:text-[11px]">
                    {priceDisplayLabel(priceLabel || price.label)}
                  </div>
                  <div className="mt-1 whitespace-nowrap font-['Manrope'] text-[16px] font-extrabold leading-[1.1] text-[#0d1b2e] lg:text-[18px]">
                    {price.main}
                  </div>
                  {price.note ? (
                    <div className="mt-0.5 whitespace-nowrap text-[9px] font-semibold leading-[1.2] text-[#4b5563] lg:text-[10.5px]">
                      ({price.note})
                    </div>
                  ) : null}
                </div>

                <div className="h-9 w-px bg-[#d7dde5]" />

                <a
                  href="#quote-form"
                  data-quote-context={type.title}
                  data-quote-source="engine-types"
                  className="inline-flex min-w-0 items-center justify-between gap-2 pl-1 text-[10px] font-semibold uppercase leading-[1.28] text-[#059669] transition-colors hover:text-[#047857] lg:text-[12px] lg:leading-[1.35]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="min-w-0">{type.cta}</span>
                  <TbArrowRight className="h-3.5 w-3.5 flex-none lg:h-4 lg:w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="scrollbar-dark relative h-full overflow-y-auto rounded-[12px] border-[1.5px] border-[#3b82f6] bg-[#0d1b2e] px-4 py-4 shadow-[0_0_0_1px_rgba(59,130,246,1),0_0_8px_rgba(59,130,246,0.5),0_0_16px_rgba(59,130,246,0.38),0_0_26px_rgba(59,130,246,0.24),0_4px_12px_rgba(42,109,214,0.28)] lg:rounded-[16px] lg:px-5 lg:py-4">
            <div className="relative z-10">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className={`inline-flex rounded-full border px-[8px] py-[1px] text-[8.5px] font-bold uppercase tracking-[0.7px] ${badgeClass}`}>
                  {badge}
                </span>
                <button
                  type="button"
                  onClick={onToggle}
                  className="inline-flex items-center gap-1 text-[8.5px] font-bold text-[#475569] transition-colors hover:text-white"
                >
                  <TbRefresh className="h-3.5 w-3.5" />
                  <span>{backActionLabel}</span>
                </button>
              </div>

              <p className="text-[12.5px] leading-[1.6] text-[#e2e8f0] lg:text-[13px]">
                {backDescription}
              </p>

              {backBullets.length ? (
                <ul className="mt-2 space-y-1.5 text-[11px] leading-[1.55] text-[#cbd5e1] lg:text-[11.5px]">
                  {backBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[4px] h-[5px] w-[5px] flex-none rounded-full bg-[#22c55e]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileEngineTypeStack({
  types,
  activeIndex,
  onSelect,
  onClose,
  backActionLabel,
  priceLabel,
}: {
  types: EngineTypesData["types"];
  activeIndex: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
  backActionLabel: string;
  priceLabel: string;
}) {
  const orderedIndexes = types.map((_, index) => index).filter((index) => index >= 0 && index < types.length);

  return (
    <div className="mt-[18px] md:hidden">
      <div className="relative mx-auto max-w-[520px] overflow-visible px-[2px] pb-8">
        {orderedIndexes.map((originalIndex, stackIndex) => {
          const type = types[originalIndex];
          const active = originalIndex === activeIndex;
          const badge = typeBadge(type.title);
          const variant = typeVariant(type.title);
          const price = priceParts(type.priceRange);
          const icon = getTypeIcon(type.title);
          const frontDescription = fullText(type.frontDescription || type.description);
          const backDescription = fullText(type.backDescription || type.description);
          const backBullets = type.backBullets?.map((bullet) => fullText(bullet)).filter(Boolean) ?? [];
          const previousIsActive = stackIndex > 0 && orderedIndexes[stackIndex - 1] === activeIndex;
          const lastInactive = stackIndex === orderedIndexes.length - 1 && !active;
          const offsetX = Math.min(stackIndex * 14, 52);
          const widthTrim = 42;
          const rotate = 0;
          const badgeClass =
            variant === "remanu"
              ? "border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb]"
              : variant === "refurb"
                ? "border-[#fde68a] bg-[#fefce8] text-[#a16207]"
                : variant === "supplyfit"
                  ? "border-[#e9d5ff] bg-[#fdf4ff] text-[#7c3aed]"
                  : variant === "used"
                    ? "border-[#e5e7eb] bg-[#f8f9fa] text-[#6b7280]"
                    : "border-[#0d1b2e] bg-[#f8fbff] text-[#0d1b2e]";

          return (
            <article
              key={type.title}
              className={`relative transition-all duration-300 ${active ? "z-30" : "z-10"}`}
              style={{
                marginTop: stackIndex === 0 ? 0 : previousIsActive ? 8 : -54,
                transform: `translateX(${offsetX}px) rotate(${rotate}deg)`,
                width: `calc(100% - ${widthTrim}px)`,
                height: active ? 334 : undefined,
                perspective: active ? "1200px" : undefined,
                WebkitPerspective: active ? "1200px" : undefined,
              }}
            >
              {active ? (
                <div
                  className="relative h-full w-full transition-transform duration-[550ms]"
                  style={{
                    transform: "rotateY(180deg)",
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <div className="flex h-full w-full flex-col rounded-[10px] border border-[#d8e6f5] bg-[linear-gradient(180deg,#ffffff_0%,#edf7ff_100%)] shadow-[0_8px_18px_rgba(13,27,46,0.07)]">
                      <div className="flex items-start gap-3 px-3 py-3">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#e8f4fd] text-[#0d1b2e]">
                          {icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-['Manrope'] text-[12px] font-extrabold uppercase leading-[1.16] text-[#0d1b2e]">
                            {type.title}
                          </span>
                          <span className="mt-1 block text-[11px] leading-[1.45] text-[#64748b]">
                            {frontDescription}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="scrollbar-dark h-full overflow-y-auto rounded-[10px] border-[1.5px] border-[#3b82f6] bg-[#0d1b2e] px-4 py-4 shadow-[0_0_0_1px_rgba(59,130,246,1),0_0_8px_rgba(59,130,246,0.5),0_0_16px_rgba(59,130,246,0.38),0_0_26px_rgba(59,130,246,0.24),0_4px_12px_rgba(42,109,214,0.28)]">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className={`inline-flex rounded-full border px-[8px] py-[1px] text-[8.5px] font-bold uppercase tracking-[0.7px] ${badgeClass}`}>
                          {badge}
                        </span>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 text-[8.5px] font-bold text-[#94a3b8] transition-colors hover:text-white"
                        >
                          <TbRefresh className="h-3.5 w-3.5" />
                          <span>{backActionLabel}</span>
                        </button>
                      </div>

                      <p className="text-[12px] leading-[1.6] text-[#e2e8f0]">
                        {backDescription}
                      </p>

                      {backBullets.length ? (
                        <ul className="mt-3 space-y-1.5 text-[11px] leading-[1.5] text-[#cbd5e1]">
                          {backBullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2">
                              <span className="mt-[4px] h-[5px] w-[5px] flex-none rounded-full bg-[#22c55e]" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-4 grid grid-cols-[minmax(145px,1fr)_1px_minmax(0,1fr)] items-center gap-3 border-t border-white/10 pt-3">
                        <div className="min-w-0">
                          <div className="text-[10.5px] font-medium leading-[1.2] text-[#94a3b8]">
                            {priceDisplayLabel(priceLabel || price.label)}
                          </div>
                          <div className="mt-1 whitespace-nowrap font-['Manrope'] text-[16px] font-extrabold leading-[1.1] text-white">
                            {price.main}
                          </div>
                          {price.note ? (
                            <div className="mt-0.5 whitespace-nowrap text-[9px] font-semibold leading-[1.2] text-[#cbd5e1]">
                              ({price.note})
                            </div>
                          ) : null}
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <a
                          href="#quote-form"
                          data-quote-context={type.title}
                          data-quote-source="engine-types-mobile-stack"
                          className="inline-flex min-w-0 items-center justify-between gap-2 pl-1 text-[10px] font-semibold uppercase leading-[1.28] text-[#4ade80] transition-colors hover:text-[#86efac]"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <span className="min-w-0">{type.cta}</span>
                          <TbArrowRight className="h-3.5 w-3.5 flex-none" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(originalIndex)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(originalIndex);
                    }
                  }}
                  className={`w-full rounded-[8px] border bg-white text-left shadow-[0_10px_24px_rgba(13,27,46,0.08)] transition-all duration-300 ${
                    `${lastInactive ? "min-h-0" : "min-h-[112px]"} border-[#d8e6f5] bg-[linear-gradient(180deg,#ffffff_0%,#edf7ff_100%)] opacity-[0.98] shadow-[0_8px_18px_rgba(13,27,46,0.07)] hover:border-[#93c5fd]`
                  }`}
                  aria-expanded={false}
                >
                  <div className="flex items-start gap-3 px-3 py-3">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#e8f4fd] text-[#0d1b2e]">
                      {icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 block font-['Manrope'] text-[12px] font-extrabold uppercase leading-[1.16] text-[#0d1b2e]">
                        {type.title}
                      </span>
                    </span>
                    <span className="ml-auto flex-none text-right">
                      <span className="block whitespace-nowrap font-['Manrope'] text-[12px] font-extrabold leading-none text-[#15803d]">
                        {price.main}
                      </span>
                      {price.note ? (
                        <span className="mt-1 block max-w-[82px] truncate whitespace-nowrap text-[8.5px] font-semibold leading-none text-[#64748b]">
                          ({price.note})
                        </span>
                      ) : null}
                    </span>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function inferBrandLabel(title: string) {
  const match = title.match(/^(.*?)\s+Engine Types/i);
  return match?.[1]?.trim() || "Engine";
}

function compactEngineTypesHeading(title: string) {
  const match = title.match(/^(.*?)\s+Engine Types/i);
  return match ? `${match[1].trim()} Engine Types` : title;
}

function normalizeClosingCopy(text: string) {
  return normalizeText(text).replace(
    /^All engine types include a minimum 12[-\s]?month(?: unlimited mileage)? warranty/i,
    "All rebuilt engines include a minimum 12-month warranty",
  );
}

export default function EngineTypesSection({
  data,
  bgImage,
  dynamicBrandCta = false,
  displayMode = "brand",
  sectionId,
  documentMode = false,
}: Props) {
  const isDocumentMode = displayMode === "document";
  const useFullBleedDocumentLayout = documentMode || isDocumentMode;
  const lastCardIndex = data.types.length - 1;
  const defaultModelCardIndex = lastCardIndex >= 0 ? lastCardIndex : 0;
  const [openIndex, setOpenIndex] = useState<number | null>(() =>
    useFullBleedDocumentLayout && lastCardIndex >= 0 ? lastCardIndex : null,
  );
  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(() =>
    useFullBleedDocumentLayout ? defaultModelCardIndex : null,
  );
  const [isClosingExpanded, setIsClosingExpanded] = useState(false);
  const [uniformHeight, setUniformHeight] = useState(228);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingLines = data.headingLines?.length ? data.headingLines : data.h2.split(/\s+-\s+/);
  const mobileHeading = compactEngineTypesHeading(data.h2);
  const brandLabel = inferBrandLabel(data.h2);
  const closingText = normalizeClosingCopy(data.closing);
  const ui = data.ui ?? {};
  const closingCard = data.closingCard ?? {};

  useEffect(() => {
    const calculateMaxHeight = () => {
      const heights = cardRefs.current.map((ref) => ref?.scrollHeight ?? 0);
      const maxHeight = Math.max(...heights, 228);
      setUniformHeight(maxHeight);
    };

    const timeoutId = setTimeout(calculateMaxHeight, 100);
    window.addEventListener("resize", calculateMaxHeight);

    return () => {
      window.removeEventListener("resize", calculateMaxHeight);
      clearTimeout(timeoutId);
    };
  }, [data.types, openIndex]);

  const handleMobileSelect = (index: number) => {
    setActiveMobileCard((current) => (current === index ? null : index));
  };

  const handleFlipToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
    setActiveMobileCard(index);
  };

  return (
    <Section id={sectionId} className="relative overflow-hidden bg-[#f8fafc]">
      <style jsx>{`
        .scrollbar-dark::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .scrollbar-dark {
          scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
          scrollbar-width: thin;
        }
      `}</style>
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 hidden h-[300px] w-[400px] opacity-[0.08] lg:block"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,249,250,0.15), rgba(248,249,250,0.8)), url(${bgImage})`,
              backgroundPosition: "top right",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </div>
      ) : null}

      <Container className={`relative max-w-[1400px] ${useFullBleedDocumentLayout ? "px-0 sm:px-0 lg:px-0" : ""}`}>
        <div className="section-pill mb-[14px]">
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[920px] font-['Manrope'] text-[26px] font-extrabold leading-[1.14] tracking-[-0.7px] text-[#0d1b2e] md:text-[30px] lg:text-[36px]">
          <span className="block md:hidden">{mobileHeading}</span>
          {headingLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className={`hidden md:block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}
            >
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-[8px] hidden justify-center">
          <div className="h-[3px] w-12 rounded-full bg-[#22c55e]" />
        </div>

        <p className="mt-[12px] max-w-[760px] text-[13px] leading-[1.7] text-[#64748b] lg:text-[15px]">
          {data.intro}
        </p>

        <MobileEngineTypeStack
          types={data.types}
          activeIndex={activeMobileCard}
          onSelect={handleMobileSelect}
          onClose={() => setActiveMobileCard(null)}
          backActionLabel={isDocumentMode ? (ui.backActionLabel || "") : (ui.backActionLabel ?? "Flip back")}
          priceLabel={isDocumentMode ? (ui.priceLabel || "") : (ui.priceLabel ?? "Typical price range")}
        />

        <div className="mt-[22px] hidden gap-x-3 gap-y-2 md:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2.5">
          {data.types.map((type, index) => (
            <div
              key={type.title}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <FlipCard
                type={type}
                open={openIndex === index}
                onToggle={() => handleFlipToggle(index)}
                backActionLabel={isDocumentMode ? (ui.backActionLabel || "") : (ui.backActionLabel ?? "Flip back")}
                priceLabel={isDocumentMode ? (ui.priceLabel || "") : (ui.priceLabel ?? "Typical price range")}
                uniformHeight={uniformHeight}
              />
            </div>
          ))}
        </div>

        {isDocumentMode ? (
          <div className="mt-4 text-[12.5px] leading-[1.75] text-[#4b5563] lg:text-center lg:text-[13px]">
            <p
              style={
                isClosingExpanded
                  ? undefined
                  : {
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
              }
            >
              {closingText}
            </p>
            <button
              type="button"
              onClick={() => setIsClosingExpanded((current) => !current)}
              className="mt-1 text-[12px] font-bold text-[#0d1b2e] underline decoration-[#2D6BFF]/40 underline-offset-4 transition hover:text-[#2D6BFF] lg:text-[12.5px]"
            >
              {isClosingExpanded ? "View Less" : "View More"}
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <CtaStrip
              tone="light"
              label={closingCard.label ?? "Engine Replacement Help"}
              title={
                closingCard.title ??
                (dynamicBrandCta
                  ? `Compare ${brandLabel} engine prices with vetted UK suppliers`
                  : "Compare Land Rover engine prices with vetted UK suppliers")
              }
              description={closingText}
              buttonText={closingCard.buttonText ?? (dynamicBrandCta ? `Compare ${brandLabel} Prices` : "Compare Land Rover Prices")}
              icon={<TbShieldCheck className="h-6 w-6" />}
              linkProps={{
                href: "#quote-form",
                "data-quote-context": "Engine types closing",
                "data-quote-source": "engine-types",
              }}
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
