"use client";

import { useState } from "react";
import type { HowItWorksData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: HowItWorksData;
  bgImage: string;
};

function RegistrationIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      <rect x="10" y="18" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M16 26h24M16 34h12" stroke="currentColor" strokeWidth="3" />
      <circle cx="44" cy="44" r="10" fill="#fff" stroke="#16a34a" strokeWidth="3" />
      <path d="m39 44 4 4 7-9" stroke="#16a34a" strokeWidth="3" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      <path d="M18 8h22l10 10v38H18V8Z" stroke="currentColor" strokeWidth="3" />
      <path d="M40 8v12h12" stroke="currentColor" strokeWidth="3" />
      <path d="M25 40h16M25 48h10" stroke="currentColor" strokeWidth="3" />
      <path d="M32 20c-5 0-7 4-7 8h12" stroke="#16a34a" strokeWidth="3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none">
      <path
        d="M32 7 52 15v14c0 14-8 23-20 28C20 52 12 43 12 29V15l20-8Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="m23 32 6 6 13-15" stroke="#16a34a" strokeWidth="4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function getIcon(icon: string) {
  if (icon === "registration") return <RegistrationIcon />;
  if (icon === "quote") return <QuoteIcon />;
  if (icon === "shield") return <ShieldIcon />;
  return <ShieldIcon />;
}

export default function HowItWorksSection({ data, bgImage }: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <Section className="relative overflow-hidden bg-[#f8fafc] py-10 lg:py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-[250px] w-[340px] opacity-[0.14] lg:h-[330px] lg:w-[440px]"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-label text-green-700">{data.tag}</p>
          <h2 className="text-[25px] font-black leading-[1.08] tracking-[-0.04em] text-[#061a33] sm:text-[2rem] lg:text-[2.35rem]">
            {data.h2}
          </h2>
          <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-green-500" />
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {data.cards.map((card) => {
            const isActive = activeCard === card.number;

            return (
              <article key={card.number} className="h-[292px] perspective-1000">
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveCard(isActive ? null : card.number)}
                  className="group relative h-full w-full text-left"
                >
                  <div
                    className={`relative h-full w-full rounded-[18px] transition-transform duration-500 [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)] ${
                      isActive ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    <div className="absolute inset-0 rounded-[18px] border border-slate-200 bg-white p-5 text-center shadow-[var(--shadow-card)] [backface-visibility:hidden]">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#061a33]">
                        {getIcon(card.icon)}
                      </div>

                      <p className="mt-4 text-[0.68rem] font-black uppercase tracking-wide text-green-600">
                        Step {card.number}
                      </p>

                      <h3 className="mx-auto mt-2.5 max-w-[220px] text-[1.04rem] font-black leading-tight text-[#061a33]">
                        {card.front.h3}
                      </h3>

                      <p className="mx-auto mt-3 max-w-[245px] text-[0.78rem] leading-5 text-slate-600">
                        {card.front.text}
                      </p>
                    </div>

                    <div className="absolute inset-0 overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-[0.68rem] font-black uppercase tracking-wide text-green-600">
                        Step {card.number}
                      </p>

                      <h4 className="mt-2 text-lg font-black leading-tight text-[#061a33]">
                        {card.back.heading}
                      </h4>

                      <p className="mt-2.5 text-[0.78rem] leading-5 text-slate-600">{card.back.text}</p>

                      <ul className="mt-3 space-y-2">
                        {card.back.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-[0.76rem] leading-5 text-slate-700">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[11px] font-black text-green-700">
                              <CheckIcon />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-5 flex max-w-5xl items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-5 py-4 text-green-900 shadow-sm">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-600">
            <ShieldIcon />
          </div>

          <p className="text-[0.84rem] font-bold leading-5 sm:text-[0.92rem]">{data.tagline}</p>
        </div>
      </Container>
    </Section>
  );
}
