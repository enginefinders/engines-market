"use client";

import { useState, type CSSProperties } from "react";
import type { HowItWorksData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: HowItWorksData;
  bgImage: string;
  sectionId?: string;
  flush?: boolean;
  variantLayout?: boolean;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="m3.2 8.3 3 3.1 6.7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function splitHeading(title: string) {
  return title
    .split(/\s+-\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function renderMobileHeadingLine(line: string, index: number, isAccentLine: boolean) {
  const normalizedLine = normalizeCopy(line);
  const accentMatch = normalizedLine.match(/(Best|Replacement Engine|What to Choose|Choose)/i);
  if (!accentMatch || accentMatch.index === undefined) {
    if (isAccentLine) {
      const words = normalizedLine.split(/\s+/);
      const accentWordCount = Math.min(3, Math.max(1, words.length));
      const before = words.slice(0, -accentWordCount).join(" ");
      const accent = words.slice(-accentWordCount).join(" ");
      return (
        <>
          {before ? `${before} ` : ""}
          <span className="text-[#15803d]">{accent}</span>
        </>
      );
    }

    return normalizedLine;
  }

  const before = normalizedLine.slice(0, accentMatch.index);
  const accent = accentMatch[0];
  const after = normalizedLine.slice(accentMatch.index + accent.length);

  return (
    <>
      {before}
      <span className="text-[#15803d]">{accent}</span>
      {after}
    </>
  );
}

function normalizeCopy(text: string) {
  return text
    .replaceAll("Â£", "£")
    .replaceAll("Â·", "·")
    .replace(/[â€“â€”]/g, "-")
    .replaceAll("Â", "")
    .trim();
}

function sanitizeStepText(text: string) {
  return normalizeCopy(text)
    .replace(/^(?:🖼️|ðŸ–¼ï¸)\s*/u, "")
    .replace(/^\[[^\]]+\]\.?\s*/u, "")
    .replace(/^\s*->\s*/u, "")
    .trim();
}

type TrustIconConfig = {
  src: string;
  className: string;
  style?: CSSProperties;
};

function trustIconForLabel(label: string): TrustIconConfig {
  const normalized = label.toLowerCase();

  if (normalized.includes("nationwide") || normalized.includes("delivery") || normalized.includes("uk-wide")) {
    return {
      src: "/icons/engine-market/light-green-nationwide-delivery.png",
      className: "h-[18px] w-[30px] object-contain",
    };
  }

  if (normalized.includes("supplier")) {
    return {
      src: "/icons/engine-market/light-green-trusted-seller.png",
      className: "h-[18px] w-[18px] object-contain",
    };
  }

  if (normalized.includes("warranty")) {
    return {
      src: "/icons/engine-market/light-green-warranty.png",
      className: "h-[16px] w-[16px] object-contain",
    };
  }

  return {
    src: "/icons/engine-market/light-green-supply-fit.png",
    className: "h-[18px] w-[18px] object-contain",
  };
}

function stepIconSrc(card: HowItWorksData["cards"][number]) {
  if (card.number === 1) return "/Home/reg-here.webp";
  if (card.number === 2) return "/icons/engine-market/how-compare-prices-3d.png";
  if (card.number === 3) return "/icons/engine-market/how-choose-deal.png";

  const combined = `${card.front.h3} ${card.front.text} ${card.back.heading}`.toLowerCase();

  if (combined.includes("registration") || combined.includes("reg")) return "/Home/reg-here.webp";
  if (combined.includes("choose") || combined.includes("best deal") || combined.includes("save")) {
    return "/icons/engine-market/how-choose-deal.png";
  }
  if (combined.includes("compare")) return "/icons/engine-market/how-compare-prices-3d.png";
  if (combined.includes("quote")) return "/icons/engine-market/how-get-quote.png";

  return "/icons/engine-market/how-choose-deal.png";
}

export default function HowItWorksSection({
  data,
  bgImage,
  sectionId,
  flush = false,
  variantLayout = false,
}: Props) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const headingLines = data.headingLines?.length ? data.headingLines : splitHeading(data.h2);
  const ui = data.ui ?? {};
  const cards = data.cards.map((card) => ({
    ...card,
    front: {
      ...card.front,
      h3: normalizeCopy(card.front.h3),
      text: sanitizeStepText(card.front.text),
    },
    back: {
      ...card.back,
      heading: normalizeCopy(card.back.heading),
      text: normalizeCopy(card.back.text),
      bullets: card.back.bullets.map((bullet) => normalizeCopy(bullet)),
    },
  }));

  const footerTrustItems = (ui.mobileTrustItems ?? [
    "12-Month Warranty",
    "Supply & Fit Available",
    "Nationwide Delivery",
    "Trusted UK Suppliers",
  ]).map((label) => ({
    label: normalizeCopy(label),
    icon: trustIconForLabel(label),
  }));

  return (
    <Section
      id={sectionId}
      className={`relative overflow-hidden bg-[#f7f8fb] ${flush ? "!px-0 !py-[2px]" : "px-2 pb-7 pt-4 sm:py-8 lg:py-10"}`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0 hidden h-[340px] w-[440px] opacity-[0.08] lg:block"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(248,249,250,0.5), rgba(248,249,250,0.92)), url(${bgImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
          }}
        />
      </div>

      <Container
        className={
          flush
            ? "relative max-w-[1400px] !px-0 sm:!px-0 lg:!px-0"
            : `relative max-w-[1400px] ${variantLayout ? "px-4 sm:px-5 lg:px-6" : ""}`
        }
      >
        <div className="mx-auto lg:mx-0">
          <div className="section-pill mb-[14px]">
            <span>{normalizeCopy(data.tag)}</span>
          </div>

          <h2 className="max-w-[850px] font-['Manrope'] text-[27px] font-extrabold leading-[1.12] tracking-[-0.5px] text-[#0d1b2e] lg:text-[44px] lg:leading-[1.03] lg:tracking-[-1px]">
            {headingLines.map((line, index) => {
              const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
              return (
                <span
                  key={`${line}-${index}`}
                  className={`block ${isAccent ? "lg:text-[#15803d]" : ""} ${index > 0 ? "mt-1 text-[21px] leading-[1.15] lg:text-[34px]" : ""}`}
                >
                  <span className="lg:hidden">{renderMobileHeadingLine(line, index, isAccent)}</span>
                  <span className="hidden lg:inline">{normalizeCopy(line)}</span>
                </span>
              );
            })}
          </h2>
        </div>

        <div className={`mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${variantLayout ? "xl:gap-5" : ""}`}>
          {cards.map((card) => {
            const flipped = activeStep === card.number;
            const isRegistrationCard = card.number === 1;
            const isComparisonCard = card.number === 2;

            return (
              <div
                key={card.number}
                className={`perspective-1000 ${variantLayout ? "min-h-[278px] sm:min-h-[276px] lg:min-h-[282px] xl:min-h-[292px]" : "min-h-[258px] sm:min-h-[266px] lg:min-h-[282px] xl:min-h-[292px]"}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep(flipped ? null : card.number)}
                  className="block h-full w-full text-left"
                  aria-pressed={flipped}
                  aria-label={`${flipped ? "Hide details for" : "Show details for"} step ${card.number}`}
                >
                  <div
                    className={`relative h-full ${variantLayout ? "min-h-[278px] sm:min-h-[276px] lg:min-h-[282px] xl:min-h-[292px]" : "min-h-[258px] sm:min-h-[266px] lg:min-h-[282px] xl:min-h-[292px]"} rounded-[18px] transition duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
                  >
                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#dbe4ef] bg-white px-3 pb-1 pt-3 text-center shadow-[0_18px_40px_rgba(13,27,46,0.08)] [backface-visibility:hidden] sm:px-4 sm:pb-1 sm:pt-4 lg:px-5 lg:pb-1 lg:pt-5">
                      <span className="ml-auto hidden font-['Manrope'] text-[18px] font-extrabold uppercase leading-none tracking-[0.14em] text-gray-400 sm:text-[22px]">
                        0{card.number}
                      </span>

                      <div
                        className={`mx-auto flex items-center justify-center rounded-[14px] lg:min-h-[76px] ${
                          isRegistrationCard
                            ? "h-[74px] w-[224px] sm:h-[86px] sm:w-[242px] md:h-[88px] md:w-[246px]"
                            : isComparisonCard
                              ? "h-[76px] w-[76px] sm:h-[88px] sm:w-[88px] md:h-[90px] md:w-[90px]"
                              : "h-[72px] w-[72px] sm:h-[84px] sm:w-[84px] md:h-[86px] md:w-[86px]"
                        }`}
                      >
                        <img
                          src={stepIconSrc(card)}
                          alt={`Step ${card.number} icon`}
                          className={
                            isRegistrationCard
                              ? "h-[58px] w-[198px] object-contain sm:h-[66px] sm:w-[220px] md:h-[68px] md:w-[224px]"
                              : isComparisonCard
                                ? "h-[68px] w-[68px] object-contain sm:h-[80px] sm:w-[80px] md:h-[82px] md:w-[82px]"
                                : "h-[64px] w-[64px] object-contain sm:h-[76px] sm:w-[76px] md:h-[78px] md:w-[78px]"
                          }
                        />
                      </div>

                      <div className={`mt-2 flex items-start justify-center ${variantLayout ? "min-h-[34px] lg:min-h-[44px]" : "min-h-[32px] lg:min-h-[42px]"}`}>
                        <h3
                          className={`font-['Manrope'] font-bold leading-[1.14] text-[#0d1b2e] ${
                            variantLayout ? "text-[15px] md:text-[17px] xl:text-[18px]" : "text-[16px] md:text-[18px] xl:text-[20px]"
                          }`}
                        >
                          {card.front.h3}
                        </h3>
                      </div>

                      <div className={`mt-1 flex items-start justify-center ${variantLayout ? "min-h-[42px] lg:min-h-[48px]" : "min-h-[36px] lg:min-h-[44px]"}`}>
                        <p
                          className={`mx-auto w-full max-w-[340px] text-[#5a6478] ${
                            variantLayout ? "text-[12px] leading-[1.5] md:text-[13px]" : "text-[12px] leading-[1.42] md:text-[14px] md:leading-[1.55]"
                          }`}
                        >
                          {card.front.text}
                        </p>
                      </div>

                      <span className="ml-auto mt-4 inline-flex min-h-[22px] shrink-0 items-center gap-2 px-1 pb-0 pt-0 text-[12px] font-bold leading-none text-[#15803d] sm:mt-5 sm:min-h-[22px] sm:text-[13px]">
                        <span>See how it works</span>
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border-[0.5px] border-[#2969af] bg-[#0d1b2e] p-4 text-white shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_5px_rgba(42,109,214,0.4),0_0_12px_rgba(42,109,214,0.3),0_0_20px_rgba(42,109,214,0.2),0_3px_10px_rgba(42,109,214,0.25)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5">
                      <h3 className="mt-2 text-center font-['Manrope'] text-[18px] font-bold leading-[1.15] text-white sm:text-[22px]">
                        {card.back.heading}
                      </h3>

                      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#86efac_transparent] [scrollbar-width:thin]">
                        <p className="text-[13px] leading-[1.65] text-[#c3d1e2] sm:text-[14px]">
                          {card.back.text}
                        </p>

                        <ul className="mt-5 space-y-3">
                          {card.back.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-[13px] leading-[1.55] text-[#e7eef8] sm:text-[14px]">
                              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
                                <TickIcon />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div
          className={`mx-auto mt-2 flex flex-nowrap items-stretch justify-center gap-2 rounded-[12px] px-4 py-4 sm:mx-0 sm:mt-6 sm:flex-wrap sm:items-center sm:gap-3 lg:gap-4 ${
            variantLayout ? "border-t border-[#e3ebf5] lg:mt-5 lg:px-0" : "lg:mt-[24px]"
          }`}
        >
          {footerTrustItems.map((item, index) => (
            <div key={item.label} className="contents">
              <div
                className={`flex flex-1 flex-col items-center justify-center gap-1 p-1.5 sm:flex-none sm:flex-row sm:gap-2 ${
                  variantLayout ? "rounded-none bg-transparent sm:px-1 sm:py-0" : "rounded-lg bg-slate-50 sm:rounded-full sm:px-3 sm:py-1.5"
                }`}
              >
                <img
                  src={item.icon.src}
                  alt=""
                  aria-hidden="true"
                  className={`${item.icon.className} shrink-0`}
                  style={item.icon.style}
                />
                <span className="text-center text-[10px] font-medium leading-tight text-slate-700 sm:text-sm sm:leading-none">
                  {item.label}
                </span>
              </div>
              {index < footerTrustItems.length - 1 ? (
                <div className="h-5 w-px shrink-0 self-center bg-slate-300 sm:h-6" aria-hidden="true"></div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
