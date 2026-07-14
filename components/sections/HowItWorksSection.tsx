"use client";

import { useState } from "react";
import type { HowItWorksData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { CSSProperties } from "react";

type Props = {
  data: HowItWorksData;
  bgImage: string;
  sectionId?: string;
  flush?: boolean;
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

function splitTagline(tagline: string) {
  const normalized = tagline.replace(/[–—]/g, "-");
  const parts = normalized.split("-");

  if (parts.length > 1) {
    return {
      lead: parts[0].trim(),
      emphasis: parts.slice(1).join("-").trim(),
    };
  }

  return {
    lead: normalized,
    emphasis: "",
  };
}

function splitHeading(title: string) {
  return title
    .split(/\s+-\s+/)
    .map((line) => line.trim())
    .filter(Boolean);
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
  if (card.number === 1) return "/icons/engine-market/how-reg.png";
  if (card.number === 2) return "/icons/engine-market/how-compare-prices-3d.png";
  if (card.number === 3) return "/icons/engine-market/how-choose-deal.png";

  const combined = `${card.front.h3} ${card.front.text} ${card.back.heading}`.toLowerCase();

  if (combined.includes("registration") || combined.includes("reg")) return "/icons/engine-market/how-reg.png";
  if (combined.includes("choose") || combined.includes("best deal") || combined.includes("save")) {
    return "/icons/engine-market/how-choose-deal.png";
  }
  if (combined.includes("compare")) return "/icons/engine-market/how-compare-prices-3d.png";
  if (combined.includes("quote")) return "/icons/engine-market/how-get-quote.png";

  return "/icons/engine-market/how-choose-deal.png";
}

export default function HowItWorksSection({ data, bgImage, sectionId, flush = false }: Props) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  splitTagline(data.tagline);
  const headingLines = data.headingLines?.length ? data.headingLines : splitHeading(data.h2);
  const ui = data.ui ?? {};

  const footerTrustItems = (ui.mobileTrustItems ?? [
    "12-Month Warranty",
    "Supply & Fit Available",
    "Nationwide Delivery",
    "Trusted UK Suppliers",
  ]).map((label) => ({
    label,
    icon: trustIconForLabel(label),
  }));

  return (
    <Section
      id={sectionId}
      className={`relative overflow-hidden bg-[#f7f8fb] ${flush ? "!px-0 !py-0" : "px-2 pb-7 pt-4 sm:py-8 lg:py-10"}`}
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

      <Container className={flush ? "relative !max-w-none !px-0 sm:!px-0 lg:!px-0" : "relative max-w-[1400px]"}>
        <div className="mx-auto lg:mx-0">
          <div className="section-pill mb-[14px]">
            <span>{data.tag}</span>
          </div>

          <h2 className="max-w-[850px] font-['Manrope'] text-[27px] font-extrabold leading-[1.12] tracking-[-0.5px] text-[#0d1b2e] lg:text-[44px] lg:leading-[1.03] lg:tracking-[-1px]">
            {headingLines.map((line, index) => {
              const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
              return (
                <span
                  key={`${line}-${index}`}
                  className={`block ${isAccent ? "text-[#15803d]" : ""} ${index > 0 ? "mt-1 text-[21px] leading-[1.15] lg:text-[34px]" : ""}`}
                >
                  {line}
                </span>
              );
            })}
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.cards.map((card) => {
            const flipped = activeStep === card.number;
            const isRegistrationCard = card.number === 1;
            const isComparisonCard = card.number === 2;

            return (
              <div key={card.number} className="perspective-1000 min-h-[258px] sm:min-h-[276px] xl:min-h-[296px]">
                <button
                  type="button"
                  onClick={() => setActiveStep(flipped ? null : card.number)}
                  className="block h-full w-full text-left"
                  aria-pressed={flipped}
                  aria-label={`${flipped ? "Hide details for" : "Show details for"} step ${card.number}`}
                >
                  <div
                    className={`relative h-full min-h-[258px] rounded-[18px] transition duration-500 [transform-style:preserve-3d] lg:min-h-[276px] xl:min-h-[296px] ${flipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                  >
                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#dbe4ef] bg-white px-2.5 pb-4 pt-4 shadow-[0_18px_40px_rgba(13,27,46,0.08)] [backface-visibility:hidden] text-center sm:px-4 sm:pb-5 sm:pt-5">
                      <span className="mt-0 hidden font-['Manrope'] text-left text-2xl font-extrabold uppercase tracking-[0.18em] text-gray-400 md:block">
                        0{card.number}
                      </span>

                      <div
                        className={`mx-auto mt-0 flex items-center justify-center rounded-[14px] p-1 ${
                          isRegistrationCard
                            ? "h-[114px] w-[224px] md:h-[124px] md:w-[236px]"
                            : isComparisonCard
                              ? "h-[114px] w-[114px] md:h-[126px] md:w-[126px]"
                              : "h-[108px] w-[108px] md:h-[118px] md:w-[118px]"
                        }`}
                      >
                        <img
                          src={stepIconSrc(card)}
                          alt={`Step ${card.number} icon`}
                          className={
                            isRegistrationCard
                              ? "h-[96px] w-[196px] object-contain md:h-[106px] md:w-[208px]"
                              : isComparisonCard
                                ? "h-[98px] w-[98px] object-contain md:h-[108px] md:w-[108px]"
                                : "h-[92px] w-[92px] object-contain md:h-[100px] md:w-[100px]"
                          }
                        />
                      </div>

                      <h3 className="mt-3 font-['Manrope'] text-[17px] font-bold leading-[1.18] text-[#0d1b2e] md:text-[18px] xl:text-[20px]">
                        {card.front.h3}
                      </h3>

                      <p className="mx-auto mt-3 w-full max-w-[340px] text-[14px] leading-[1.62] text-[#5a6478] md:text-[14px] md:leading-[1.65]">
                        {card.front.text}
                      </p>

                      <span className="ml-auto mt-auto inline-flex items-center gap-2 pt-3 text-[13px] font-bold text-[#15803d]">
                        <span>See how it works</span>
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] bg-[#0d1b2e] p-4 text-white border-[0.5px] border-[#2969af] shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_5px_rgba(42,109,214,0.4),0_0_12px_rgba(42,109,214,0.3),0_0_20px_rgba(42,109,214,0.2),0_3px_10px_rgba(42,109,214,0.25)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5">
                      <div className="flex flex-col items-center gap-4">
                      </div>

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

        <div className="mx-auto mt-2 flex flex-nowrap items-stretch justify-center gap-2 rounded-[12px] px-4 py-4 sm:mx-0 sm:mt-6 sm:flex-wrap sm:items-center sm:gap-3 lg:mt-[24px] lg:gap-4">
          {footerTrustItems.map((item, index) => (
            <div key={item.label} className="contents">
              <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg bg-slate-50 p-1.5 sm:flex-none sm:flex-row sm:gap-2 sm:rounded-full sm:px-3 sm:py-1.5">
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
