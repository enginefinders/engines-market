"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
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
};

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
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

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M16 8h4l3 5v4h-7V8z" stroke="currentColor" strokeWidth="2" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.37 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-2.93-8.38A2 2 0 0 1 4.11 2.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

const badgeIcons = [ToolIcon, ShieldIcon, DeliveryIcon, UsersIcon];
const carIcons = [CarIconOne, CarIconTwo, CarIconThree];

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

function resolveHeroCards(data: HeroSectionData, modelCards: HeroModelCard[]) {
  if (data.highlights?.length) {
    return data.highlights.map((card, index) => ({
      h3: card.title,
      slug: `highlight-${index + 1}`,
      subtitle: "",
      priceRange: card.price,
      cta: "",
      image: card.image ?? "",
      lineOne: card.line1 ?? "",
      heroLineTwo: card.detail ?? "",
      imageAlt: card.imageAlt ?? card.title,
    }));
  }

  return buildHeroCards(modelCards);
}

export default function HeroSection({
  data,
  bgImage,
  modelCards = [],
  brandSlug,
  strictData = false,
}: HeroSectionProps) {
  const [registration, setRegistration] = useState("");
  const [showHeroImage, setShowHeroImage] = useState(Boolean(bgImage));
  const headingLines = resolveHeadingLines(data);
  const tickerItems = getTickerItems(data.ticker);
  const tickerLoop = buildTickerLoop(tickerItems);
  const brandName = inferBrandName(data);
  const displayModels = resolveHeroCards(data, modelCards);
  const mobileBar = data.mobileBar ?? {};
  const registrationInput = data.registrationInput ?? {};

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
      <div className="bg-[#0d1b2e] text-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-['Manrope'] text-[17px] font-extrabold tracking-[-0.3px] text-white">
            {strictData ? mobileBar.brandText : (mobileBar.brandText ?? "ENGINEMARKET")}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:03330000044"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-[7px] text-[11px] font-semibold text-white"
            >
              <PhoneIcon />
              <span>{strictData ? mobileBar.callLabel : (mobileBar.callLabel ?? "Call")}</span>
            </a>
            <a
              href="#quote-form"
              data-quote-source="hero-mobile"
              className="rounded-md bg-[#15803d] px-3 py-[7px] font-['Manrope'] text-[11.5px] font-bold text-white"
            >
              {strictData ? mobileBar.quoteLabel : (mobileBar.quoteLabel ?? "GET QUOTES")}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] min-w-0 items-center gap-8 px-3 py-7 sm:px-6 md:px-8 md:py-8 lg:grid-cols-[62fr_38fr] lg:gap-7 lg:px-8 lg:py-[52px]">
        <div className="flex min-w-0 flex-col">
          <span className="mb-[14px] inline-flex w-fit items-center rounded-[20px] bg-[#0d1b2e] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white md:mb-[18px] md:px-[14px] md:py-[6px] md:text-[10.5px]">
            {data.tag}
          </span>

          <h1 className="max-w-none min-w-0 font-['Manrope'] font-extrabold tracking-[-0.03em] text-[#152b4a]">
            {headingLines.map((line, index) => {
              const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
              return (
                <span
                  key={`${line}-${index}`}
                  className={`block max-w-none min-w-0 break-words text-[clamp(25px,5.4vw,56px)] leading-[1.06] ${isAccent ? "text-[#15803d]" : "text-[#152b4a] lg:whitespace-nowrap"}`}
                >
                  {line}
                </span>
              );
            })}
          </h1>

          <p className="mt-[10px] max-w-none min-w-0 text-[13px] leading-[1.65] text-[#64748b] md:mt-[14px] md:max-w-[58ch] md:text-[clamp(14px,1.1vw,17px)]">
            {data.subheading}
          </p>

          <div className="mt-[18px] grid min-w-0 grid-cols-2 gap-2 md:mt-6 md:flex md:flex-wrap lg:flex-nowrap lg:overflow-x-auto lg:pb-1 [&::-webkit-scrollbar]:hidden">
            {data.trustBadges.slice(0, 4).map((badge, index) => {
              const Icon = badgeIcons[index] ?? ShieldIcon;

              return (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-lg bg-[#13253f] px-[13px] py-2 text-[11.5px] font-semibold text-white md:px-[14px] md:py-[9px] md:text-[12.5px]"
                >
                  <Icon />
                  <span className="whitespace-nowrap">{badge}</span>
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
                      <div className="mr-2 flex h-[34px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-md bg-white md:mr-[10px] md:h-[40px] md:w-[72px]">
                        {model.image ? (
                          <Image
                            src={model.image}
                            alt={model.imageAlt ?? model.h3}
                            width={72}
                            height={40}
                            sizes="72px"
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-[22px] w-[38px] items-center text-[#0d1b2e]/50 md:h-[26px] md:w-[44px]">
                            <Icon />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex min-w-0 items-center overflow-hidden whitespace-nowrap">
                          {modelHref ? (
                            <Link
                              href={modelHref}
                              className="min-w-0 truncate font-['Manrope'] text-[13.5px] font-bold text-[#0d1b2e] transition hover:text-[#15803d] md:text-[clamp(14px,1vw,17px)]"
                            >
                              {lineOne.lead}
                            </Link>
                          ) : (
                            <span className="min-w-0 truncate font-['Manrope'] text-[13.5px] font-bold text-[#0d1b2e] md:text-[clamp(14px,1vw,17px)]">
                              {lineOne.lead}
                            </span>
                          )}
                          {lineOne.accent ? (
                            <span className="min-w-0 truncate font-['Manrope'] text-[13.5px] font-bold text-[#15803d] md:text-[clamp(14px,1vw,17px)]">
                              {" "}
                              {lineOne.accent}
                            </span>
                          ) : null}
                        </div>
                        {model.lineOne?.trim() && model.heroLineTwo?.trim() ? (
                          <p className="mt-1 text-[11px] leading-[1.45] text-[#64748b] md:text-[12px]">
                            {model.heroLineTwo.trim()}
                          </p>
                        ) : !strictData && buildHeroLineTwo(model) ? (
                          <p className="mt-1 text-[11px] leading-[1.45] text-[#64748b] md:text-[12px]">
                            {buildHeroLineTwo(model)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <form
            id="hero-reg-form"
            className="mt-5 flex min-w-0 flex-col gap-[10px] md:mt-[26px] md:flex-row md:items-stretch"
            onSubmit={openQuoteCheckout}
          >
            <label
              htmlFor="reg-input"
              className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]"
            >
              {strictData ? registrationInput.label : (registrationInput.label ?? "Enter your vehicle registration")}
            </label>

            <div className="flex h-[68px] w-full min-w-0 overflow-hidden rounded-lg border-[3px] border-[#1a1a1a] bg-[#ffdd00] md:h-[56px] md:w-[52%] md:min-w-[300px] md:flex-[0_0_auto]">
              <div className="flex h-full w-[46px] shrink-0 flex-col items-center justify-center gap-[3px] border-r-2 border-[#1a1a1a] bg-[#003399] px-0.5 md:w-11">
                <UkFlagIcon />
                <span className="text-[12px] font-extrabold leading-none tracking-[0.05em] text-white">
                  {strictData ? registrationInput.countryCode : (registrationInput.countryCode ?? "UK")}
                </span>
              </div>

              <input
                id="reg-input"
                type="text"
                placeholder={
                  strictData
                    ? (registrationInput.platePlaceholder || data.form.inputPlaceholder || "")
                    : (registrationInput.platePlaceholder ?? data.form.inputPlaceholder ?? "AB12 CDE")
                }
                maxLength={8}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                value={registration}
                onChange={(event) => setRegistration(event.target.value.toUpperCase())}
                className="h-full min-w-0 flex-1 bg-transparent px-2 text-center text-[28px] font-bold uppercase tracking-[0.11em] text-[#111] outline-none placeholder:text-[rgba(30,30,30,0.35)] placeholder:text-[22px] placeholder:tracking-[0.05em] md:text-[24px] md:placeholder:text-[18px]"
                style={{
                  fontFamily: '"Charles Wright","Arial Black","Arial",sans-serif',
                }}
              />
            </div>

            <button
              type="submit"
              aria-label={`Get free ${brandName} engine replacement quotes`}
              className="flex h-[52px] w-full min-w-0 items-center justify-center gap-1 rounded-lg bg-[#15803d] px-5 font-['Manrope'] text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.30)] transition hover:bg-[#16a34a] hover:shadow-[0_6px_22px_rgba(21,128,61,0.42)] md:h-[56px] md:flex-1"
            >
              <span>{buttonText(data, brandName, strictData)}</span>
              <span className="hidden text-base md:inline-block">-&gt;</span>
            </button>
          </form>

          {secureNote(data, brandName, strictData) ? (
            <p className="mt-[10px] flex items-start gap-1.5 text-[12px] leading-[1.55] text-[#64748b] md:text-[12.5px]">
              <span className="mt-px shrink-0 text-[#6b7280]">
                <LockIcon />
              </span>
              <span>{secureNote(data, brandName, strictData)}</span>
            </p>
          ) : null}
        </div>

        <div className="relative hidden min-h-[340px] items-center justify-center lg:flex">
          {bgImage && showHeroImage ? (
            <div className="relative h-full min-h-[340px] w-full overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_rgba(13,27,46,0.16)]">
              <Image
                src={bgImage}
                alt={data.imageAlt ?? brandName}
                fill
                className="object-contain p-6"
                sizes="(min-width: 1024px) 420px, 100vw"
                onError={() => setShowHeroImage(false)}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <EngineWatermark />
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[42px] w-full items-center overflow-hidden bg-[#0d1b2e]">
        <div className="hero-ticker-track">
          {[0, 1].map((copyIndex) => (
            <div key={copyIndex} className="hero-ticker-segment">
              {tickerLoop.map((item, itemIndex) => (
                <span
                  key={`${copyIndex}-${itemIndex}-${item}`}
                  className="inline-flex items-center px-4 text-[11.5px] font-medium uppercase tracking-[0.05em] text-white md:px-5 md:text-[12px]"
                >
                  <span className="mr-[11px] inline-block h-[5px] w-[5px] rounded-full bg-[#15803d] md:mr-3 md:h-[6px] md:w-[6px]" />
                  <span>{item}</span>
                  <span className="mx-[10px] text-[11px] text-[#4b5563] md:mx-3">|</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
