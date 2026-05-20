"use client";

import { useMemo, useState } from "react";
import type { HowItWorksData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: HowItWorksData;
  bgImage: string;
};

function RegistrationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="14" r="1" fill="currentColor" />
      <path d="M10 14h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none" aria-hidden="true">
      <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[11px] w-[11px]" fill="none" aria-hidden="true">
      <path d="M1 4v6h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[10px] w-[10px]" fill="none" aria-hidden="true">
      <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14v7h-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 10v11h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowChevron() {
  return <span className="text-[22px] font-extralight leading-none text-[#d1d5db]">›</span>;
}

function getIcon(icon: string) {
  if (icon === "registration") return <RegistrationIcon />;
  if (icon === "quote") return <QuoteIcon />;
  if (icon === "shield") return <ShieldIcon />;
  return <ShieldIcon />;
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

function DesktopSideCard({
  card,
  onOpen,
  stepLabel,
  actionLabel,
}: {
  card: HowItWorksData["cards"][number];
  onOpen: () => void;
  stepLabel: string;
  actionLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-full flex-col rounded-[12px] border border-[#e5e7eb] bg-white px-[14px] py-[14px] text-left shadow-[0_2px_12px_rgba(13,27,46,0.06)] transition hover:border-[#0d1b2e]"
    >
      <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-[12px] bg-[#0d1b2e] text-[#22c55e]">
        {getIcon(card.icon)}
      </div>

      <span className="mt-[10px] inline-flex w-fit text-[9px] font-bold uppercase tracking-[0.9px] text-[#15803d]">
        {stepLabel} {card.number}
      </span>

      <div role="heading" aria-level={3} className="mt-[10px] font-['Manrope'] text-[15px] font-bold leading-[1.25] text-[#0d1b2e]">
        {card.front.h3}
      </div>

      <p className="mt-[8px] text-[12px] leading-[1.55] text-[#6b7280]">{card.front.text}</p>

      <div className="mt-auto flex items-center justify-end pt-5 text-[10px] font-semibold text-[#6b7280]">
        <span className="inline-flex items-center gap-[5px]">
          <RefreshIcon />
          <span>{actionLabel}</span>
        </span>
        <span className="ml-2">
          <ArrowChevron />
        </span>
      </div>
    </button>
  );
}

function DesktopActiveCard({
  card,
  onClose,
  stepLabel,
  actionLabel,
}: {
  card: HowItWorksData["cards"][number];
  onClose: () => void;
  stepLabel: string;
  actionLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="h-full w-full rounded-[12px] border border-[#1e3a5f] bg-[#0d1b2e] px-[18px] py-[18px] text-left shadow-[0_6px_20px_rgba(13,27,46,0.18)]"
    >
      <div className="mb-[14px] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.1)] text-[#22c55e]">
            {getIcon(card.icon)}
          </div>
          <span className="inline-flex text-[9px] font-bold uppercase tracking-[0.9px] text-[#22c55e]">
            {stepLabel} {card.number}
          </span>
        </div>
        <span className="inline-flex items-center gap-[4px] text-[9px] font-semibold text-[#64748b]">
          <span>{actionLabel}</span>
          <ExternalIcon />
        </span>
      </div>

      <div role="heading" aria-level={3} className="max-w-[520px] font-['Manrope'] text-[17px] font-bold leading-[1.25] !text-white">
        {card.back.heading}
      </div>

      <p className="mt-[10px] max-w-[560px] text-[12px] leading-[1.55] text-[#94a3b8]">{card.back.text}</p>

      <ul className="mt-[14px] space-y-[10px]">
        {card.back.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-[9px] border-b border-[rgba(148,163,184,0.16)] pb-[10px] text-[12px] leading-[1.45] text-[#cbd5e1] last:border-b-0 last:pb-0">
            <span className="mt-[1px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
              <CheckIcon />
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}

function MobileCard({
  card,
  open,
  onToggle,
  stepLabel,
  openLabel,
  closeLabel,
}: {
  card: HowItWorksData["cards"][number];
  open: boolean;
  onToggle: () => void;
  stepLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[12px]">
      {!open ? (
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-start gap-3 rounded-[12px] border border-[#e5e7eb] bg-white px-[14px] py-[14px] text-left transition hover:border-[#0d1b2e]"
        >
          <div className="flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[10px] bg-[#0d1b2e] text-[#22c55e]">
            {getIcon(card.icon)}
          </div>

          <div className="min-w-0 flex-1">
            <span className="mb-[6px] inline-block text-[9px] font-bold uppercase tracking-[0.9px] text-[#15803d]">
              {stepLabel} {card.number}
            </span>
            <div role="heading" aria-level={3} className="font-['Manrope'] text-[14px] font-bold leading-[1.3] text-[#0d1b2e]">
              {card.front.h3}
            </div>
            <p className="mt-[5px] text-[11.5px] leading-[1.5] text-[#6b7280]">{card.front.text}</p>
            <span className="mt-2 inline-flex items-center gap-[5px] text-[10px] font-semibold text-[#15803d]">
              <RefreshIcon />
              <span>{openLabel}</span>
            </span>
          </div>

          <span className="flex-none pt-[14px]">
            <ArrowChevron />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="w-full rounded-[12px] border border-[#1e3a5f] bg-[#0d1b2e] px-[18px] py-[18px] text-left"
        >
          <div className="mb-[14px] flex items-center justify-between gap-3">
            <span className="inline-flex text-[9px] font-bold uppercase tracking-[0.9px] text-[#22c55e]">
              {stepLabel} {card.number}
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#475569]">
              <span>{closeLabel}</span>
              <RefreshIcon />
            </span>
          </div>

          <div role="heading" aria-level={3} className="font-['Manrope'] text-[17px] font-bold leading-[1.25] !text-white">
            {card.back.heading}
          </div>
          <p className="mt-2 text-[12px] leading-[1.55] text-[#94a3b8]">{card.back.text}</p>

          <ul className="mt-[14px] space-y-[10px]">
            {card.back.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-[9px] text-[12px] leading-[1.45] text-[#cbd5e1]">
                <span className="mt-[1px] flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
                  <CheckIcon />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </button>
      )}
    </div>
  );
}

export default function HowItWorksSection({ data, bgImage }: Props) {
  const defaultCardNumber = data.cards[1]?.number ?? data.cards[0]?.number ?? 1;
  const [activeCard, setActiveCard] = useState<number>(defaultCardNumber);
  const tagline = splitTagline(data.tagline);
  const headingLines = data.headingLines?.length ? data.headingLines : splitHeading(data.h2);
  const ui = data.ui ?? {};
  const stepLabel = ui.stepLabel ?? "Step";
  const footerNote = ui.footerNote ?? "Most replacements completed within 3-5 days.";

  const active = useMemo(
    () => data.cards.find((card) => card.number === activeCard) ?? data.cards[0],
    [activeCard, data.cards],
  );

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
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
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

      <Container className="relative max-w-[1180px] px-0 sm:px-5 lg:px-4">
        <div className="px-4 pt-[28px] sm:px-0 lg:pt-0">
          <div className="section-pill mb-[14px]">
            <span>{data.tag}</span>
          </div>

          <h2 className="max-w-[760px] font-['Manrope'] text-[27px] font-extrabold leading-[1.12] tracking-[-0.5px] text-[#0d1b2e] lg:text-[44px] lg:leading-[1.03] lg:tracking-[-1px]">
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

        <div className="mt-[18px] px-4 sm:px-0 lg:hidden">
          <div className="flex flex-col gap-[10px]">
            {data.cards.map((card) => (
              <MobileCard
                key={card.number}
                card={card}
                open={activeCard === card.number}
                onToggle={() => setActiveCard((current) => (current === card.number ? 0 : card.number))}
                stepLabel={stepLabel}
                openLabel={ui.mobileOpenLabel ?? "Tap to flip"}
                closeLabel={ui.mobileCloseLabel ?? "Tap to flip back"}
              />
            ))}
          </div>
        </div>

        <div className="mt-[18px] hidden lg:block">
          <div className="grid gap-[14px] lg:grid-cols-3">
            {data.cards.map((card) => {
              const isActive = card.number === active?.number;

              return isActive ? (
                <DesktopActiveCard
                  key={card.number}
                  card={card}
                  onClose={() => setActiveCard(card.number)}
                  stepLabel={stepLabel}
                  actionLabel={ui.desktopOpenLabel ?? "Click to view details"}
                />
              ) : (
                <DesktopSideCard
                  key={card.number}
                  card={card}
                  onOpen={() => setActiveCard(card.number)}
                  stepLabel={stepLabel}
                  actionLabel={ui.desktopClosedLabel ?? "Click to expand"}
                />
              );
            })}
          </div>
        </div>

        <div className="mx-4 mt-4 rounded-[12px] border border-[#0d1b2e] bg-white px-4 py-4 lg:mx-0 lg:mt-[14px] lg:flex lg:items-center lg:gap-4">
          <div className="mb-3 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#15803d] text-white lg:mb-0 lg:h-[46px] lg:w-[46px]">
            <MedalIcon />
          </div>
          <div className="text-[13px] leading-[1.45] text-[#0d1b2e]">
            <p className="font-semibold">
              {tagline.lead}
              {tagline.emphasis ? <span className="font-bold text-[#15803d]"> - {tagline.emphasis}</span> : null}
            </p>
            <p className="mt-1 text-[12px] font-normal leading-[1.4] text-[#6b7280]">{footerNote}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-[6px] border-t border-[#e5e7eb] bg-white px-[10px] py-[14px] lg:hidden">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-[6px] text-center">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-[#f0fdf4] text-[#15803d]">
                {item.icon}
              </div>
              <span className="text-[9px] font-semibold leading-[1.3] text-[#6b7280]">{item.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
