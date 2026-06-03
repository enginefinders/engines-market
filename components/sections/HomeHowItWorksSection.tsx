"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeHowItWorksStep } from "@/lib/homepageData";

type Props = {
  steps: HomeHowItWorksStep[];
};

function RegistrationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 10h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 14h1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 6 8.5 4.5h7L18 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M7 3.5h7l4.5 4.5V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 11.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15.5h3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16.5 12.5c0-1.1-.92-2-2.05-2-.88 0-1.65.5-1.93 1.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M12 3 19 6.2v5.5c0 4.9-3.05 8.13-7 10.3-3.95-2.17-7-5.4-7-10.3V6.2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m8.8 12.15 2.1 2.1 4.3-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function getIcon(icon?: "registration" | "quote" | "shield" | string) {
  if (icon === "registration") return <RegistrationIcon />;
  if (icon === "quote") return <QuoteIcon />;
  return <ShieldIcon />;
}

export default function HomeHowItWorksSection({ steps }: Props) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <Section id="how-it-works" className="bg-[#f7f8fb] py-7 sm:py-8 lg:py-10">
      <Container className="max-w-[1400px]">
        <div className="mx-auto  text-center">
          <div className="section-pill ">
            <span>How It Works</span>
          </div>

          <h2 className="mt-4 text-center font-['Manrope'] text-[28px]  font-bold leading-[1.12] text-[#0d1b2e] sm:text-[30px] lg:text-[32px]">
            <span>How EnginesMarket Works - </span>
            <span className="text-[#15803d]">3 Steps</span>
            <span> to Your Replacement Engine Quote</span>
          </h2>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => {
            const flipped = activeStep === step.number;

            return (
              <div key={step.number} className="perspective-1000 min-h-[260px] sm:min-h-[280px] xl:min-h-[290px]">
                <button
                  type="button"
                  onClick={() => setActiveStep(flipped ? null : step.number)}
                  className="block h-full w-full text-left"
                  aria-pressed={flipped}
                  aria-label={`${flipped ? "Hide details for" : "Show details for"} step ${step.number}`}
                >
                  <div
                    className={`relative h-full min-h-[260px] rounded-[18px] transition duration-500 [transform-style:preserve-3d] lg:min-h-[280px] xl:min-h-[290px] ${flipped ? "[transform:rotateY(180deg)]" : ""
                      }`}
                  >
                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#dbe4ef] bg-white p-2 sm:p-4 shadow-[0_18px_40px_rgba(13,27,46,0.08)] [backface-visibility:hidden] text-center">


                      <span className="mt-0 font-['Manrope'] text-right text-2xl font-extrabold uppercase tracking-[0.18em] text-gray-400">
                        0{step.number}
                      </span>

                      <div className={`mx-auto flex items-center justify-center rounded-[14px]  p-2 ${step.imageClassName || "h-12 w-12 sm:h-14 sm:w-14"}`}>
                        <img
                          src={step.image}
                          alt={`Step ${step.number} icon`}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <h3 className="mt-3 font-['Manrope'] text-[24px] font-bold leading-[1] text-[#0d1b2e]">
                        {step.frontTitle}
                      </h3>

                      <p className="mx-auto mt-4 text-[12px] sm:text-[14px] leading-[1.65] text-[#5a6478]">
                        {step.frontBody}
                      </p>

                      <span className="ml-auto mt-auto inline-flex items-center gap-2 pt-0 text-[14px] font-bold text-[#15803d]">
                        <span>See how it works</span>
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0d1b2e] bg-[#0d1b2e] p-2 sm:p-4 text-white shadow-[0_24px_48px_rgba(7,25,54,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="flex flex-col items-center gap-4">
                        {/* <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[14px] bg-white/10 text-white">
                          {getIcon(step.icon)}
                        </div> */}
                        {/* <span className="pt-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#86efac]">
                          STEP {step.number} OF 3
                        </span> */}
                      </div>

                      <h3 className="mt-5 text-center font-['Manrope'] text-[24px] font-bold leading-[1] text-white">
                        {step.backTitle}
                      </h3>

                      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#86efac_transparent] [scrollbar-width:thin]">
                        <p className="text-[15px] leading-[1.65] text-[#c3d1e2]">
                          {step.backBody}
                        </p>

                        <ul className="mt-5 space-y-3">
                          {step.bullets.map((bullet) => (
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
      </Container>

      {/* <div className="mt-7 border-y border-[#0d1b2e]/10 bg-[#f0fdf4]">
        <Container className="max-w-[1180px]">
          <div className="flex flex-col items-center gap-4 py-5 text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
              <ShieldIcon />
            </div>
            <p className="text-[15px] font-semibold leading-[1.6] text-[#0d1b2e]">
              Get Engine Replacement Quotes from Vetted UK Specialists - 100% Free, No Obligation.
            </p>
          </div>
        </Container>
      </div> */}
    </Section>
  );
}
