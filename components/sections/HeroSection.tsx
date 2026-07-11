"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import { getModelHref } from "@/lib/modelRoutes";
import type { HeroSectionData, ModelsSectionData } from "@/types/brand";

type HeroModelCard = ModelsSectionData["cards"][number] & {
  engineCodes?: string[];
  lineOne?: string;
  heroLineTwo?: string;
  imageAlt?: string;
};

type HeroSectionProps = {
  data: HeroSectionData;
  bgImage: string;
  modelCards?: HeroModelCard[];
  brandSlug?: string;
  strictData?: boolean;
  tagOverride?: string;
  disclaimerMode?: "accordion" | "icon";
};

function ToolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[15px] w-[15px] ${className || ""}`} fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[15px] w-[15px] ${className || ""}`} fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[15px] w-[15px] ${className || ""}`} fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M16 8h4l3 5v4h-7V8z" stroke="currentColor" strokeWidth="2" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-[15px] w-[15px] ${className || ""}`} fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 22 14" className="h-[14px] w-[22px] rounded-[2px]" aria-hidden="true">
      <rect width="22" height="14" fill="#012169" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#fff" strokeWidth="3.5" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#C8102E" strokeWidth="2" />
      <path d="M11 0v14M0 7h22" stroke="#fff" strokeWidth="4.5" />
      <path d="M11 0v14M0 7h22" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function CarIconOne() {
  return (
    <svg viewBox="0 0 60 26" className="h-[22px] w-[38px] md:h-[26px] md:w-[44px]" fill="none" aria-hidden="true">
      <rect x="2" y="13" width="56" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="8" y="6" width="38" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="12" y="3" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="26" y="3" width="16" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="46" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CarIconTwo() {
  return (
    <svg viewBox="0 0 60 26" className="h-[22px] w-[38px] md:h-[26px] md:w-[44px]" fill="none" aria-hidden="true">
      <rect x="2" y="13" width="56" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 13Q9 5 16 4h28q8 1 11 9" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="24" y="5" width="14" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <rect x="40" y="5" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="46" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CarIconThree() {
  return (
    <svg viewBox="0 0 60 26" className="h-[22px] w-[38px] md:h-[26px] md:w-[44px]" fill="none" aria-hidden="true">
      <rect x="2" y="13" width="56" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 13Q10 4 18 3h24q10 1 14 10" stroke="currentColor" strokeWidth="1.3" />
      <rect x="10" y="4" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="25" y="4" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="43" y="4" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14.5" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="45.5" cy="22" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function EngineWatermark() {
  return (
    <svg viewBox="0 0 400 320" className="h-auto w-[90%] fill-[#0d1b2e] opacity-[0.04]" aria-hidden="true">
      <rect x="60" y="100" width="280" height="160" rx="8" />
      <rect x="80" y="60" width="40" height="50" rx="4" />
      <rect x="130" y="60" width="40" height="50" rx="4" />
      <rect x="180" y="60" width="40" height="50" rx="4" />
      <rect x="230" y="60" width="40" height="50" rx="4" />
      <rect x="280" y="60" width="40" height="50" rx="4" />
      <path d="M80 65Q100 40 120 65" />
      <path d="M130 65Q150 40 170 65" />
      <path d="M180 65Q200 40 220 65" />
      <path d="M230 65Q250 40 270 65" />
      <path d="M280 65Q300 40 320 65" />
      <rect x="80" y="255" width="240" height="30" rx="6" />
      <circle cx="40" cy="150" r="25" />
      <circle cx="40" cy="150" r="14" />
      <circle cx="40" cy="150" r="5" />
      <circle cx="360" cy="150" r="25" />
      <circle cx="360" cy="150" r="14" />
      <circle cx="360" cy="150" r="5" />
      <rect x="60" y="100" width="30" height="100" rx="4" />
      <rect x="110" y="80" width="180" height="30" rx="6" />
      <circle cx="75" cy="115" r="4" />
      <circle cx="75" cy="140" r="4" />
      <circle cx="75" cy="165" r="4" />
      <circle cx="75" cy="190" r="4" />
      <circle cx="325" cy="115" r="4" />
      <circle cx="325" cy="140" r="4" />
      <circle cx="325" cy="165" r="4" />
      <circle cx="325" cy="190" r="4" />
      <rect x="90" y="108" width="220" height="18" rx="4" opacity="0.6" />
      <rect x="90" y="174" width="220" height="18" rx="4" opacity="0.6" />
      <circle cx="310" cy="108" r="12" />
      <rect x="95" y="100" width="5" height="40" rx="2" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M13 2L4.5 13.5H11L10 22l9.5-12H13V2z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="2" stroke="#15803d" strokeWidth="1.5" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M8 18h8" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14h7" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14V9.5C9 7.6 10.6 6 12.5 6 14.4 6 16 7.6 16 9.5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v5c0 4.8 3.4 9.3 8 10.3C16.6 21.3 20 16.8 20 12V7L12 3z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BottomBarIcon({ type }: { type: string }) {
  switch (type) {
    case "lightning":
      return <LightningIcon />;
    case "location":
      return <LocationIcon />;
    case "pound":
      return <PoundIcon />;
    case "wrench":
      return <WrenchIcon />;
    case "shield":
      return <ShieldCheckIcon />;
    default:
      return null;
  }
}

const badgeIcons = [ToolIcon, ShieldIcon, DeliveryIcon, UsersIcon];
const carIcons = [CarIconOne, CarIconTwo, CarIconThree];
const bottomBarItems = [
  { icon: "lightning", text: "Instant engine replacement quote - 100% free, no obligation" },
  { icon: "location", text: "Engine replacement near me - UK-wide specialist network" },
  { icon: "pound", text: "Compare reconditioned, rebuilt & used engine prices" },
  { icon: "wrench", text: "Supply & fit available - parts and labour from vetted specialists" }
];

function splitHeadline(title: string) {
  const normalizedTitle = title.replace(/[–—]/g, "-");
  const match = normalizedTitle.match(/^(.*?)(?:\s+-\s+)(.+)$/);
  if (!match) {
    return { lead: title, accent: "" };
  }

  return {
    lead: match[1].trim(),
    accent: match[2].trim(),
  };
}

function getTickerItems(ticker: string) {
  return ticker
    .split(/\s+-\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildTickerLoop(items: string[]) {
  if (!items.length) {
    return [];
  }

  return Array.from({ length: 4 }, () => items).flat();
}

function inferBrandName(data: HeroSectionData) {
  const headingMatch = data.h1.match(/^(.*?)\s+Engine Replacement/i);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  const formMatch = data.form.heading.match(/^Find Your\s+(.*?)\s+Engine$/i);
  if (formMatch) {
    return formMatch[1].trim();
  }

  return "your";
}

function stripBrandFromModel(modelName: string, brandName: string) {
  return modelName
    .replace(new RegExp(`^${brandName}\\s+`, "i"), "")
    .replace(/^(BMW|Land Rover|Range Rover)\s+/i, "")
    .trim();
}

function secureNote(data: HeroSectionData, brandName: string, strictData = false) {
  if (data.form.note.trim()) {
    return data.form.note;
  }

  if (strictData) {
    return "";
  }

  return `Secure enquiry - no spam, no pressure. Genuine quotes only from vetted UK ${brandName} specialists.`;
}

function buttonText(data: HeroSectionData, brandName: string, strictData = false) {
  if (data.form.buttonText.trim()) {
    return data.form.buttonText;
  }

  if (strictData) {
    return "";
  }

  return `Get Free ${brandName} Engine Quotes`;
}

function buildHeroCards(modelCards: HeroModelCard[]) {
  const preferred = [
    modelCards.find((card) => /defender/i.test(card.slug)),
    modelCards.find((card) => /discovery/i.test(card.slug)),
    modelCards.find((card) => /range-rover/i.test(card.slug)),
  ].filter(Boolean) as HeroModelCard[];

  return (preferred.length >= 3 ? preferred : modelCards).slice(0, 3);
}

function buildHeroLineTwo(model: HeroModelCard) {
  if (model.heroLineTwo?.trim()) {
    return model.heroLineTwo.trim();
  }

  if (model.engineCodes?.length) {
    return `-> Rebuilt units from ${model.priceRange} - Common codes: ${model.engineCodes.join(", ")}`;
  }

  return "";
}

function extractStartingPrice(priceRange: string) {
  const match = priceRange.match(/£\s?[\d,]+/);
  return match ? match[0].replace(/\s+/g, " ") : "";
}

function buildCommonCodesLine(model: HeroModelCard) {
  if (model.engineCodes?.length) {
    return `Common codes: ${model.engineCodes.join(", ")}`;
  }

  const detailText = buildHeroLineTwo(model);
  const match = detailText.match(/Common codes:\s*(.+)$/i);

  return match ? `Common codes: ${match[1].trim()}` : "";
}

function buildRebuiltUnitsLine(model: HeroModelCard) {
  const detailText = buildHeroLineTwo(model);
  const detailMatch = detailText.match(
    /Rebuilt units from\s+(.+?)(?=\s*(?:[·•]|Common codes:|$))/i,
  );

  if (detailMatch) {
    return `Rebuilt units from ${detailMatch[1].trim()}`;
  }

  const startingPrice = extractStartingPrice(model.priceRange);
  return startingPrice ? `Rebuilt units from ${startingPrice}` : "";
}

function splitHighlightLineOne(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const match = normalized.match(/^(.*?)(\s+[—-]\s+from\s+.+)$/i);
  if (!match) {
    return { lead: normalized, accent: "" };
  }

  return {
    lead: match[1].trim(),
    accent: match[2].trim(),
  };
}

function splitCommonCodesText(text: string) {
  const match = text.match(/^(.*?Common codes:\s*)(.+)$/i);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1],
    codes: match[2],
  };
}

function buildDisclaimerLines(note: string) {
  const normalized = note.replace(/\s+/g, " ").trim();
  const sentences = normalized.match(/[^.!?]+[.!?]?/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? [];

  return (sentences.length ? sentences : [normalized]).slice(0, 3);
}

function resolveHeadingLines(data: HeroSectionData) {
  if (data.headingLines?.length) {
    return data.headingLines.filter((line) => line.trim());
  }

  const heading = splitHeadline(data.h1);
  if (heading.accent) {
    return [`${heading.lead} -`, heading.accent];
  }

  return [data.h1];
}

function resolveHeroCards(data: HeroSectionData, modelCards: HeroModelCard[], fallbackImage: string) {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/^bmw\s+/i, "")
      .replace(/\s+engine replacement$/i, "")
      .replace(/\s+engines?$/i, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

  const findMatchingModelCard = (title: string) => {
    const target = normalize(title);

    return modelCards.find((card) => {
      const cardTitle = normalize(card.h3);
      const cardSlug = normalize(card.slug.replace(/-/g, " "));

      return cardTitle === target || cardSlug === target;
    });
  };

  if (data.highlights?.length) {
    return data.highlights.map((card, index) => {
      const matchedModelCard = findMatchingModelCard(card.title);

      return {
        h3: card.title,
        slug: matchedModelCard?.slug ?? `highlight-${index + 1}`,
        subtitle: matchedModelCard?.subtitle ?? "",
        priceRange: card.price || matchedModelCard?.priceRange || "",
        cta: matchedModelCard?.cta ?? "",
        image: card.image?.trim() || matchedModelCard?.image || fallbackImage || "",
        lineOne: card.line1 ?? matchedModelCard?.lineOne ?? "",
        heroLineTwo: card.detail ?? card.line2 ?? matchedModelCard?.heroLineTwo ?? "",
        engineCodes: matchedModelCard?.engineCodes,
        imageAlt: card.imageAlt ?? matchedModelCard?.imageAlt ?? card.title,
      };
    });
  }

  return buildHeroCards(modelCards);
}

export default function HeroSection({
  data,
  bgImage,
  modelCards = [],
  brandSlug,
  strictData = false,
  tagOverride,
  disclaimerMode = "accordion",
}: HeroSectionProps) {
  const [registration, setRegistration] = useState("");
  const [showHeroImage, setShowHeroImage] = useState(Boolean(bgImage));
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const headingLines = resolveHeadingLines(data);
  const brandName = inferBrandName(data);
  const displayModels = resolveHeroCards(data, modelCards, bgImage);
  const registrationInput = data.registrationInput ?? {};
  const disclaimer = data.disclaimer;
  const hasDisclaimer = Boolean(disclaimer?.note?.trim());
  const disclaimerLines = disclaimer?.note?.trim() ? buildDisclaimerLines(disclaimer.note) : [];

  const bottomTickerLoop = useMemo(() => [...bottomBarItems, ...bottomBarItems], []);

  function openQuoteCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent("engine-market:open-quote", {
        detail: {
          regNumber: registration.trim(),
          source: "hero-registration",
        },
      }),
    );
  }

  return (
    <section className="overflow-x-hidden bg-[#f8f9fa]">
      <div className="mx-auto grid max-w-[1400px] min-w-0 items-center px-3 py-5 sm:gap-8 sm:px-6 md:px-8 md:py-8 lg:grid-cols-[55fr_45fr] lg:gap-7 lg:px-8 lg:py-[52px]">
        {/* LEFT COLUMN */}
        <div className="flex min-w-0 flex-col lg:pr-8 xl:pr-10">
          <span className="mb-[14px] inline-flex w-fit items-center rounded-[20px] bg-[#0d1b2e] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white md:mb-[18px] md:px-[14px] md:py-[6px] md:text-[10.5px]">
            {tagOverride ?? data.tag}
          </span>

          <h1 className="max-w-none min-w-0 font-['Manrope'] font-extrabold tracking-[-0.03em] text-[#152b4a]">
            {headingLines.map((line, index) => {
              const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
              return (
                <span
                  key={`${line}-${index}`}
                  className={`block max-w-none min-w-0 break-words text-[clamp(25px,5vw,56px)] leading-[1.06] ${isAccent ? "text-[#15803d]" : "text-[#152b4a]"}`}
                >
                  {line}
                </span>
              );
            })}
          </h1>

          <p className="mt-[10px] max-w-none min-w-0 text-[13px] leading-[1.65] text-[#64748b] md:mt-[14px] md:max-w-[58ch] md:text-[clamp(14px,1.1vw,17px)]">
            {data.subheading}
          </p>

          <div className="mt-[18px] grid min-w-0 grid-cols-4 gap-1.5 md:mt-6 md:flex md:flex-wrap lg:flex-nowrap lg:overflow-x-auto lg:pb-1 [&::-webkit-scrollbar]:hidden">
            {data.trustBadges.slice(0, 4).map((badge, index) => {
              const Icon = badgeIcons[index] ?? ShieldIcon;

              return (
                <div
                  key={badge}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg bg-[#13253f] px-2 py-2 text-[11px] font-semibold text-white md:flex-row md:items-center md:justify-start md:px-[14px] md:py-[9px] md:text-[12.5px]"
                >
                  {/* Added flex-shrink-0 and fixed size to icon so it doesn't squish */}
                  <Icon className="w-4 h-4 flex-shrink-0" />

                  {/* Removed whitespace-nowrap so text wraps exactly like in your screenshot */}
                  <span className="leading-tight text-center md:text-left">{badge}</span>
                </div>
              );
            })}
          </div>

          {displayModels.length ? (
            <div className="mt-5 flex min-w-0 flex-col md:mt-7">
              {displayModels.map((model, index) => {
                const Icon = carIcons[index] ?? CarIconThree;
                const shortTitle = stripBrandFromModel(model.h3, brandName);
                const normalizedPrice = model.priceRange.replace(/^Starting\s+/i, "").replace(/^Available\s+/i, "");
                const modelHref = brandSlug ? getModelHref(brandSlug, model) : null;
                const commonCodesLine = buildCommonCodesLine(model);
                const rebuiltUnitsLine = buildRebuiltUnitsLine(model);
                const desktopDetailLine =
                  model.lineOne?.trim() && model.heroLineTwo?.trim()
                    ? model.heroLineTwo.trim()
                    : !strictData && buildHeroLineTwo(model)
                      ? buildHeroLineTwo(model)
                      : "";
                const commonCodesParts = splitCommonCodesText(commonCodesLine);
                const desktopDetailCommonCodesParts = splitCommonCodesText(desktopDetailLine);
                const lineOne = model.lineOne?.trim()
                  ? splitHighlightLineOne(model.lineOne)
                  : {
                      lead: shortTitle,
                      accent: normalizedPrice ? `- ${normalizedPrice}` : "",
                    };

                return (
                  <div
                    key={model.slug}
                    className={`py-[10px] md:py-3 ${index < displayModels.length - 1 ? "border-b border-[#f3f4f6]" : ""}`}
                  >
                    <div className="flex min-w-0 items-start overflow-hidden">
                      <div className="mr-3 flex h-[42px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-md md:mr-[10px] md:h-[60px] md:w-[72px]">
                        {model.image ? (
                          <Image
                            src={model.image}
                            alt={model.imageAlt ?? model.h3}
                            width={72}
                            height={40}
                            sizes="(max-width: 767px) 68px, 72px"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-[30px] w-[52px] items-center text-[#0d1b2e]/50 md:h-[26px] md:w-[44px]">
                            <Icon />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 md:space-y-0">
                        <div className="flex min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5 overflow-hidden">
                          {modelHref ? (
                            <Link
                              href={modelHref}
                              className="min-w-0 max-w-full font-['Manrope'] text-[13.5px] font-bold leading-tight text-[#0d1b2e] transition hover:text-[#15803d] md:text-[clamp(14px,1vw,17px)]"
                            >
                              {lineOne.lead}
                            </Link>
                          ) : (
                            <span className="min-w-0 max-w-full font-['Manrope'] text-[13.5px] font-bold leading-tight text-[#0d1b2e] md:text-[clamp(14px,1vw,17px)]">
                              {lineOne.lead}
                            </span>
                          )}
                          {lineOne.accent ? (
                            <span className="min-w-0 max-w-full font-['Manrope'] text-[13.5px] font-bold leading-tight text-[#15803d] md:text-[clamp(14px,1vw,17px)]">
                              {lineOne.accent}
                            </span>
                          ) : null}
                        </div>
                        {commonCodesLine ? (
                          <p className="text-[11px] leading-[1.45] text-[#64748b] md:hidden">
                            {commonCodesParts ? (
                              <>
                                {commonCodesParts.prefix}
                                <span className="text-[#2563eb]">{commonCodesParts.codes}</span>
                              </>
                            ) : (
                              commonCodesLine
                            )}
                          </p>
                        ) : null}
                        {rebuiltUnitsLine ? (
                          <p className="text-[11px] leading-[1.45] text-[#64748b] md:hidden">
                            {rebuiltUnitsLine}
                          </p>
                        ) : null}
                        {desktopDetailLine ? (
                          <p className="hidden text-[12px] leading-[1.45] text-[#64748b] md:mt-1 md:block">
                            {desktopDetailCommonCodesParts ? (
                              <>
                                {desktopDetailCommonCodesParts.prefix}
                                <span className="text-[#2563eb]">{desktopDetailCommonCodesParts.codes}</span>
                              </>
                            ) : (
                              desktopDetailLine
                            )}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          {hasDisclaimer ? (
            disclaimerMode === "icon" ? (
              <div className="mt-4">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsDisclaimerOpen((current) => !current)}
                    aria-expanded={isDisclaimerOpen}
                    aria-label="Toggle disclaimer"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black text-[11px] font-bold leading-none text-black transition focus:outline-none focus:ring-2 focus:ring-[#2d7a3a] focus:ring-offset-2"
                  >
                    !
                  </button>
                </div>

                {isDisclaimerOpen ? (
                  <div className="mt-2 rounded-[16px] border border-[#dbe4ef] bg-white/85 px-4 py-3 text-[11.5px] leading-[1.6] text-[#64748b] shadow-[0_12px_32px_rgba(13,27,46,0.07)] backdrop-blur-sm md:px-5 md:text-[12.5px]">
                    <div className="space-y-1.5">
                      {disclaimerLines.map((line, index) => (
                        <p key={`${line}-${index}`}>{line}</p>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 rounded-[20px] border border-[#dbe4ef] bg-white/80 shadow-[0_12px_40px_rgba(13,27,46,0.06)] backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setIsDisclaimerOpen((current) => !current)}
                  aria-expanded={isDisclaimerOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left md:px-5"
                >
                  <span className="font-['Manrope'] text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#152b4a] md:text-[12.5px]">
                    {disclaimer?.title?.trim() || "Disclaimer Note"}
                  </span>
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#cbd5e1] text-[18px] font-semibold leading-none text-[#15803d]">
                    {isDisclaimerOpen ? "-" : "+"}
                  </span>
                </button>

                {isDisclaimerOpen ? (
                  <div className="border-t border-[#e2e8f0] px-4 py-4 text-[12px] leading-[1.65] text-[#475569] md:px-5 md:text-[13px]">
                    <p>
                      <span className="font-['Manrope'] text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#152b4a]">
                        {disclaimer?.title?.trim() || "Disclaimer Note"}:
                      </span>{" "}
                      {disclaimer?.note.trim()}
                    </p>

                    {disclaimer?.notes?.length ? (
                      <div className="mt-3">
                        <p className="font-['Manrope'] text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#152b4a]">
                          {disclaimer.notesTitle?.trim() || "Notes"}:
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {disclaimer.notes.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )
          ) : null}
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative mt-5 flex w-full min-w-0 flex-col items-center justify-center gap-4 overflow-hidden px-3 pt-1 md:mt-0 md:gap-5 md:pt-0 lg:min-h-0 lg:px-0">
          {bgImage && showHeroImage ? (
            <div className="relative h-auto w-full max-w-[320px] overflow-hidden rounded-[24px] md:max-w-full lg:min-h-[300px]">
              <div className="relative aspect-[2.05/1] w-full md:aspect-[5/3] lg:aspect-auto lg:min-h-[300px]">
                <Image
                  src={bgImage}
                  alt={data.imageAlt ?? brandName}
                  fill
                  className="object-contain md:p-2"
                  sizes="(max-width: 767px) 100vw, (min-width: 768px) 600px"
                  onError={() => setShowHeroImage(false)}
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <EngineWatermark />
            </div>
          )}

          {/* FORM MOVED HERE */}
          <form
            id="hero-reg-form"
            className="flex w-full max-w-md flex-col gap-[10px] px-0 sm:px-2"
            onSubmit={openQuoteCheckout}
          >
            <label
              htmlFor="reg-input"
              className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]"
            >
              {strictData ? registrationInput.label : (registrationInput.label ?? "Enter your vehicle registration")}
            </label>

            <div className="flex h-[60px] w-full min-w-0 overflow-hidden rounded-[8px] border-[3px] border-[#1a1a1a] bg-[#ffdd00] md:h-[56px]">
              <div className="flex h-full w-[52px] shrink-0 flex-col items-center justify-center border-r-2 border-[#1a1a1a] bg-[#003399] px-0.5 md:w-[50px]">
                <div className="relative -top-[2px]">
                  <UkFlagIcon />
                </div>
                <span className="relative top-[2px] text-[12px] font-extrabold leading-none tracking-[0.04em] text-[#ffdd00] md:text-[11px]">
                  UK
                </span>
              </div>

              <input
                id="reg-input"
                type="text"
                placeholder="REG HERE"
                maxLength={8}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                value={registration}
                onChange={(event) => setRegistration(event.currentTarget.value.toUpperCase())}
                className="h-full min-w-0 flex-1 bg-transparent px-2 pb-[1px] pt-0 text-center text-[28px] font-bold uppercase tracking-[0.06em] text-[#111] outline-none placeholder:text-[#111] placeholder:text-[24px] placeholder:font-bold placeholder:tracking-[0.04em] md:text-[24px] md:placeholder:text-[20px]"
                style={{
                  fontFamily: '"Charles Wright","Arial Black","Arial",sans-serif',
                }}
              />
            </div>

            <button
              type="submit"
              aria-label={`Get free ${brandName} engine replacement quotes`}
              className="flex h-[52px] w-full min-w-0 items-center justify-center gap-1 rounded-lg bg-[#15803d] px-5 font-['Manrope'] text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.30)] transition hover:bg-[#16a34a] hover:shadow-[0_6px_22px_rgba(21,128,61,0.42)] md:h-[56px]"
            >
              <span>{buttonText(data, brandName, strictData)}</span>
            </button>
          </form>

          {/* SECURE NOTE MOVED HERE */}
          {secureNote(data, brandName, strictData) ? (
            <p className="flex w-full max-w-full items-center justify-center px-4 text-center text-[12px] leading-[1.55] text-[#64748b] md:text-[12.5px]">
              <span>{secureNote(data, brandName, strictData)}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="bg-[#0d1b2e]">
        {/* Desktop: scrolling ticker */}
        <div className="hidden h-14 items-center overflow-hidden lg:flex">
          <Container className="max-w-[1400px] px-10">
            <div className="hero-ticker-track h-14" style={{ animationDuration: "32s" }}>
              {bottomTickerLoop.map((item, index) => (
                <span
                  key={`desktop-bottom-ticker-${index}`}
                  className="flex h-14 flex-none items-center gap-[10px] border-r border-r-white/10 px-6 text-[12px] leading-[1.4] text-white/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <BottomBarIcon type={item.icon} />
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </Container>
        </div>

        {/* Mobile: scrolling ticker */}
        <div className="flex h-12 items-center overflow-hidden lg:hidden">
          <div className="hero-ticker-track h-12" style={{ animationDuration: "45s" }}>
            {bottomTickerLoop.map((item, index) => (
              <span
                key={`bottom-ticker-${index}`}
                className="flex h-12 flex-none items-center gap-[8px] border-r border-r-white/10 px-5 text-[12px] text-white/80"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <BottomBarIcon type={item.icon} />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
