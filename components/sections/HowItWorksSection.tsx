"use client";

import { useState } from "react";
import type { HowItWorksData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: HowItWorksData;
  bgImage: string;
  sectionId?: string;
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

function MedalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7a3 3 0 1 0-6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
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

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

export default function HowItWorksSection({ data, bgImage, sectionId }: Props) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const tagline = splitTagline(data.tagline);
  const headingLines = data.headingLines?.length ? data.headingLines : splitHeading(data.h2);
  const ui = data.ui ?? {};
  const footerNote = ui.footerNote ?? "Most replacements completed within 3-5 days.";

  const trustLabels = ui.mobileTrustItems ?? [
    "12-Month Warranty",
    "Supply & Fit Available",
    "Nationwide Delivery",
    "Trusted UK Suppliers",
  ];
  const trustItems = trustLabels.map((label, index) => ({
    label,
    icon:
      index === 0 ? <WarrantyIcon /> : index === 1 ? <WrenchIcon /> : index === 2 ? <TruckIcon /> : <UsersIcon />,
  }));

  return (
    <Section id={sectionId} className="relative overflow-hidden bg-[#f8f9fa] py-7 sm:py-8 lg:py-10">
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

      <Container className="relative max-w-[1400px]">
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

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.cards.map((card) => {
            const flipped = activeStep === card.number;

            return (
              <div key={card.number} className="perspective-1000 min-h-[260px] sm:min-h-[280px] xl:min-h-[290px]">
                <button
                  type="button"
                  onClick={() => setActiveStep(flipped ? null : card.number)}
                  className="block h-full w-full text-left"
                  aria-pressed={flipped}
                  aria-label={`${flipped ? "Hide details for" : "Show details for"} step ${card.number}`}
                >
                  <div
                    className={`relative h-full min-h-[260px] rounded-[18px] transition duration-500 [transform-style:preserve-3d] lg:min-h-[280px] xl:min-h-[290px] ${flipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                  >
                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#dbe4ef] bg-white p-2 sm:p-4 shadow-[0_18px_40px_rgba(13,27,46,0.08)] [backface-visibility:hidden] text-center">
                      <span className="mt-0 font-['Manrope'] text-left text-2xl font-extrabold uppercase tracking-[0.18em] text-gray-400">
                        0{card.number}
                      </span>

                      <div className={`mx-auto flex items-center justify-center rounded-[14px] p-2 ${card.number === 1 ? "w-70 h-22" : "h-12 w-12 sm:h-14 sm:w-14"}`}>
                        <img
                          src={card.number === 1 ? "/Home/reg-here.webp" : card.number === 2 ? "/Home/save-money.webp" : "/Home/quote-button 1.png"}
                          alt={`Step ${card.number} icon`}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <h3 className="mt-3 font-['Manrope'] text-[24px] font-bold leading-[1] text-[#0d1b2e]">
                        {card.front.h3}
                      </h3>

                      <p className="mx-auto mt-4 text-[12px] sm:text-[14px] leading-[1.65] text-[#5a6478]">
                        {card.front.text}
                      </p>

                      <span className="ml-auto mt-auto inline-flex items-center gap-2 pt-0 text-[14px] font-bold text-[#15803d]">
                        <span>See how it works</span>
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0d1b2e] bg-[#0d1b2e] p-2 sm:p-4 text-white shadow-[0_24px_48px_rgba(7,25,54,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <h3 className="mt-5 text-center font-['Manrope'] text-[24px] font-bold leading-[1] text-white">
                        {card.back.heading}
                      </h3>

                      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#86efac_transparent] [scrollbar-width:thin]">
                        <p className="text-[15px] leading-[1.65] text-[#c3d1e2]">
                          {card.back.text}
                        </p>

                        <ul className="mt-5 space-y-3">
                          {card.back.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#e7eef8]">
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

       <div className="mx-auto mt-6 rounded-[12px] px-4 py-4 sm:mx-0 lg:mt-[24px] flex flex-nowrap sm:flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 items-stretch sm:items-center">
  
  {/* 12-Month Warranty */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full bg-slate-50 flex-1 sm:flex-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#15803D] shrink-0">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    <span className="text-[10px] leading-tight font-medium text-slate-700 text-center sm:text-sm sm:leading-none">12-Month Warranty</span>
  </div>

  {/* Supply & Fit Available */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full bg-slate-50 flex-1 sm:flex-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#15803D] shrink-0">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
    <span className="text-[10px] leading-tight font-medium text-slate-700 text-center sm:text-sm sm:leading-none">Supply & Fit Available</span>
  </div>

  {/* Nationwide Delivery */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full bg-slate-50 flex-1 sm:flex-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#15803D] shrink-0">
      <rect width="16" height="13" x="1" y="3" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
    <span className="text-[10px] leading-tight font-medium text-slate-700 text-center sm:text-sm sm:leading-none">Nationwide Delivery</span>
  </div>

  {/* Trusted UK Suppliers */}
  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-full bg-slate-50 flex-1 sm:flex-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#15803D] shrink-0">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
    <span className="text-[10px] leading-tight font-medium text-slate-700 text-center sm:text-sm sm:leading-none">Trusted UK Suppliers</span>
  </div>

</div>

      </Container>
    </Section>
  );
}
