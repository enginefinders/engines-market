"use client";

import { type ReactNode, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeEngineTypeCard } from "@/lib/homepageData";

type Props = {
  cards: HomeEngineTypeCard[];
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldTickIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M12 3 19 6.2v5.5c0 4.9-3.05 8.13-7 10.3-3.95-2.17-7-5.4-7-10.3V6.2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m8.8 12.15 2.1 2.1 4.3-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TickStarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M8 2.4v11.2M2.4 8h11.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m4.2 4.2 7.6 7.6M11.8 4.2 4.2 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UsedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9 28.5 14.2 21h11l4.6 3.4h4.9c1.3 0 2.4 1.1 2.4 2.4v7.3H9.8c-1.5 0-2.8-1.2-2.8-2.8v-1.2c0-.7.3-1.3.8-1.6L9 28.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 21.1 18.1 17h9.4l6.1 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.2" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="29.8" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="36" cy="22" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M36 22v-4.3M36 22l3.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EngineBlockBase({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9.5 15.5h23.6a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H9.5a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 19H4m2.5 10H4m32.1-10H39m-2.9 10H39" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14.7" cy="24" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="24" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      {children}
    </svg>
  );
}

function ReconditionedIcon() {
  return (
    <EngineBlockBase>
      <path d="M31.8 28.8a6.8 6.8 0 1 0-.8-9.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m29.2 17 3.6.5-.3-3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function RebuiltIcon() {
  return (
    <EngineBlockBase>
      <path d="m29.8 16.2 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33.2 14.3 36 11.5l2.7 2.7-2.8 2.8M27.9 19.6l4.6 4.6-2.2 2.2-4.6-4.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function RemanufacturedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9 34V19l8-6 8 6v15H9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M25 34V22.5H39V34" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 24h4v6h-4zm14 3h4v7h-4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M38 18.7a4.7 4.7 0 1 1-4.7 4.7A4.7 4.7 0 0 1 38 18.7Zm0 2v5.4m-2.7-2.7h5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SupplyFitIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M8.8 29 14 21.5h11l4.8 3.5h5.3a2.3 2.3 0 0 1 2.3 2.3v6.8H10.2A3.2 3.2 0 0 1 7 30.9v-.6c0-.5.3-1 .8-1.3l1-.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 21.5 18.3 17h9.2l5.9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.4" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="30.2" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 8v13.3m0 0-4.2-4.3m4.2 4.3 4.2-4.3M9 40h30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefurbishedIcon() {
  return (
    <EngineBlockBase>
      <path d="m14.2 25.4 3.3 3.3 6.6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function getIcon(icon: HomeEngineTypeCard["icon"]) {
  if (icon === "used") return <UsedIcon />;
  if (icon === "reconditioned") return <ReconditionedIcon />;
  if (icon === "rebuilt") return <RebuiltIcon />;
  if (icon === "remanufactured") return <RemanufacturedIcon />;
  if (icon === "supply-fit") return <SupplyFitIcon />;
  return <RefurbishedIcon />;
}

export default function HomeEngineTypesSection({ cards }: Props) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <Section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1180px]">
        <div className="max-w-[760px]">
          <div className="section-pill">
            <span>Replacement Engine Options</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[32px] lg:text-[36px]">
            <span>Compare Used, </span>
            <span className="text-[#15803d]">Reconditioned & Rebuilt</span>
            <span> Replacement Engines</span>
          </h2>

          <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.7] text-[#6b7280]">
            Every engine type available through our UK network - with typical price ranges, honest definitions and the right choice for your budget, mileage and how long you plan to keep the vehicle.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const flipped = activeCard === card.id;

            return (
              <div key={card.id} className="perspective-1000 min-h-[470px] sm:min-h-[490px] xl:min-h-[520px]">
                <button
                  type="button"
                  onClick={() => setActiveCard(flipped ? null : card.id)}
                  className="block h-full w-full text-left"
                  aria-pressed={flipped}
                  aria-label={`${flipped ? "Hide details for" : "Show details for"} ${card.title}`}
                >
                  <div
                    className={`relative h-full min-h-[470px] rounded-[18px] transition duration-500 [transform-style:preserve-3d] sm:min-h-[490px] xl:min-h-[520px] ${
                      flipped ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    <div className="absolute inset-0 flex h-full flex-col rounded-[18px] border border-[#0d1b2e]/14 bg-white p-5 shadow-[0_18px_38px_rgba(13,27,46,0.06)] [backface-visibility:hidden] sm:p-6">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#15803d]">
                        {card.label}
                      </span>

                      <div className="mt-4 flex items-start gap-4">
                        <div className="flex h-[74px] w-[74px] flex-none items-center justify-center rounded-[14px] border border-[#0d1b2e]/18 bg-[#f8fbff] text-[#0d1b2e]">
                          {getIcon(card.icon)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-['Manrope'] text-[25px] font-bold leading-[1] text-[#0d1b2e]">
                            {card.title}
                          </h3>

                          <p className="mt-3 text-[14px] font-bold leading-[1.5] text-[#0d1b2e]">
                            {card.price}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 text-[14px] leading-[1.65] text-[#5a6478]">
                        {card.summary}
                      </p>

                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-bold text-[#15803d]">
                        <span>{card.cta}</span>
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-0 flex h-full flex-col rounded-[18px] border border-[#0d1b2e] bg-[#0d1b2e] p-5 text-white shadow-[0_24px_48px_rgba(7,25,54,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
                      <h3 className="font-['Manrope'] text-[20px] font-bold leading-[1.2] text-white">
                        {card.backHeader}
                      </h3>

                      <div className="mt-5 space-y-3">
                        {card.details.map((detail) => (
                          <div key={`${card.id}-${detail.label}`} className="flex items-start gap-3 text-[13px] leading-[1.55] text-[#e8eef7]">
                            <span className="mt-[1px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
                              <TickStarIcon />
                            </span>
                            <div>
                              <span className="font-semibold text-white">{detail.label}</span>
                              <span className="text-[#c7d3e1]">{" "}{detail.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="mt-5 text-[13px] leading-[1.65] text-[#c7d3e1]">
                        {card.closing}
                      </p>

                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-bold text-[#86efac]">
                        <span>{card.backCta}</span>
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[18px] border border-white/10 bg-[#0d1b2e] px-4 py-5 sm:px-5 lg:px-8 lg:py-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#15803d]/18 text-[#86efac]">
              <ShieldTickIcon />
            </div>
            <p className="text-[14px] leading-[1.75] text-white sm:text-[15px]">
              All engine types include a <span className="font-bold text-[#86efac]">minimum 12-month unlimited mileage warranty</span> when sourced through EnginesMarket. Prices are typical UK market ranges based on real enquiry data. Actual quotes depend on engine code, variant, condition and supplier. Enter your registration above for tailored prices within hours.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
