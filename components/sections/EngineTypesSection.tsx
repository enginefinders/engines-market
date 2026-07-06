"use client";

import { useEffect, useRef, useState } from "react";
import type { EngineTypesData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  TbArrowRight,
  TbEngine,
  TbRefresh,
  TbSettings,
  TbShieldCheck,
  TbTool,
  TbTools,
  TbTruck,
} from "react-icons/tb";

type Props = {
  data: EngineTypesData;
  bgImage?: string;
  dynamicBrandCta?: boolean;
  displayMode?: "brand" | "document";
  sectionId?: string;
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
  const noteMatch = value.match(/(\s*(\(.+\)|on top of engine price))$/i);
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

function isFeaturedCard(title: string) {
  return title.toLowerCase().includes("rebuilt");
}

function getTypeIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return <TbEngine className="h-6 w-6" />;
  if (normalized.includes("supply")) return <TbTruck className="h-6 w-6" />;
  if (normalized.includes("used")) return <TbTool className="h-6 w-6" />;
  if (normalized.includes("refurbished")) return <TbTools className="h-6 w-6" />;
  if (normalized.includes("rebuilt")) return <TbSettings className="h-6 w-6" />;
  return <TbEngine className="h-6 w-6" />;
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
  frontActionLabel: string;
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
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#e8f4fd] text-[#0d1b2e] lg:h-11 lg:w-11">
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
              <div className="text-[10.5px] font-medium text-[#6b7280] lg:text-[11px]">
                {(priceLabel || price.label).replace(/:$/, "")}:
              </div>

              <div className="mt-2 grid grid-cols-[112px_1px_minmax(0,1fr)] items-center gap-3 lg:grid-cols-[132px_1px_minmax(0,1fr)]">
                <div className="min-w-0">
                  <div className="font-['Manrope'] text-[17px] font-extrabold leading-[1.1] text-[#0d1b2e] lg:text-[18px]">
                    {price.main}
                  </div>
                  {price.note ? (
                    <div className="mt-1 whitespace-nowrap text-[9px] font-semibold leading-[1.2] text-[#4b5563] lg:text-[10.5px]">
                      {price.note}
                    </div>
                  ) : null}
                </div>

                <div className="h-9 w-px bg-[#d7dde5]" />

                <a
                  href="#quote-form"
                  data-quote-context={type.title}
                  data-quote-source="engine-types"
                  className="inline-flex min-w-0 items-center justify-between gap-2 pl-0.5 text-[11px] font-semibold leading-[1.35] text-[#059669] transition-colors hover:text-[#047857] lg:text-[12px]"
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
          <div className="scrollbar-dark h-full overflow-y-auto rounded-[12px] border border-[#1e3a5f] bg-[#0d1b2e] px-4 py-4 shadow-[0_2px_8px_rgba(13,27,46,0.15)] lg:rounded-[16px] lg:px-5 lg:py-4 lg:shadow-[0_8px_24px_rgba(13,27,46,0.18)]">
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
  );
}

function inferBrandLabel(title: string) {
  const match = title.match(/^(.*?)\s+Engine Types/i);
  return match?.[1]?.trim() || "Engine";
}

export default function EngineTypesSection({
  data,
  bgImage,
  dynamicBrandCta = false,
  displayMode = "brand",
  sectionId,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [uniformHeight, setUniformHeight] = useState(228);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingLines = data.headingLines?.length ? data.headingLines : data.h2.split(/\s+-\s+/);
  const brandLabel = inferBrandLabel(data.h2);
  const ui = data.ui ?? {};
  const closingCard = data.closingCard ?? {};
  const isDocumentMode = displayMode === "document";

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

      <Container className="relative max-w-[1400px]">
        <div className="section-pill mb-[14px]">
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[920px] font-['Manrope'] text-[26px] font-extrabold leading-[1.14] tracking-[-0.7px] text-[#0d1b2e] md:text-[30px] lg:text-[36px]">
          {headingLines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}
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

        <div className="mt-[22px] grid gap-x-3 gap-y-2 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-2.5">
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
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
                frontActionLabel={isDocumentMode ? (ui.frontActionLabel || "") : (ui.frontActionLabel ?? "What is it?")}
                backActionLabel={isDocumentMode ? (ui.backActionLabel || "") : (ui.backActionLabel ?? "Flip back")}
                priceLabel={isDocumentMode ? (ui.priceLabel || "") : (ui.priceLabel ?? "Typical price range")}
                uniformHeight={uniformHeight}
              />
            </div>
          ))}
        </div>

        {isDocumentMode ? (
          <p className="mt-4 text-[12.5px] leading-[1.75] text-[#4b5563] lg:text-center lg:text-[13px]">
            {normalizeText(data.closing)}
          </p>
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
              description={normalizeText(data.closing)}
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
