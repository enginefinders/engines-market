"use client";

import { useState } from "react";

type FailureItem = {
  title: string;
  onset: string;
  whatHappens: string;
  repairVsReplace: string;
};

type Props = {
  ctaText: string;
  engineCode: string;
  failuresTitle: string;
  goodYearsLine: string;
  items: FailureItem[];
};

function ArrowRightMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FailureIssueIcon({ title, active = false }: { title: string; active?: boolean }) {
  const iconClass = active ? "h-6 w-6" : "h-5 w-5";

  if (/timing chain/i.test(title)) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M9 8a3 3 0 1 1-4.2 4.2L8 9m8 7a3 3 0 1 1 4.2-4.2L16 15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m10 14 4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (/coolant|leak/i.test(title)) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M12 4v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M8 12.5c0-1.7 1.8-2.8 4-2.8s4 1.1 4 2.8V16a4 4 0 0 1-8 0v-3.5Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M4 17c1 .8 2.5 1.3 4 1.3s3-.5 4-1.3m4 0c1 .8 2.5 1.3 4 1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4 12h2.5M17.5 12H20M12 4v2.5M12 17.5V20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function CompatibilityMetaIcon({ kind }: { kind: "years" | "badges" | "link" }) {
  if (kind === "years") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "badges") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="m8.7 12 2.2 2.2 4.6-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M10 14l9-9M19 14v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V5h5M5 5l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpecsPanelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PriceTableHeaderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M21 7.2 16.8 11 13 7.2l3.2-3.2a2.4 2.4 0 0 1 3.4 0l1.4 1.4a2.4 2.4 0 0 1 0 3.4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m14 10-8.5 8.5a2 2 0 1 1-2.8-2.8L11.2 7M7 7l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v5h5M10 12h4M10 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TagOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M10 4H5v5l8.7 8.7a2 2 0 0 0 2.8 0l2.5-2.5a2 2 0 0 0 0-2.8L10 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="7.7" cy="7.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function DocumentFailureDesktopPanel({ ctaText, engineCode, failuresTitle, goodYearsLine, items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  if (!activeItem) return null;

  return (
    <div className="mt-3 hidden gap-4 lg:grid lg:grid-cols-[344px_minmax(0,1fr)] lg:items-start">
      <div className="grid gap-3">
        {items.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`flex w-full items-center gap-4 rounded-[12px] border px-4 py-3 text-left transition ${
                active ? "border-[#7fd292] bg-[#fbfffc]" : "border-[#e1e9f4] bg-white hover:border-[#cfe0dd]"
              }`}
            >
              <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-[10px] ${active ? "bg-[#17803d] text-white" : "bg-[#081f47] text-white"}`}>
                <FailureIssueIcon title={item.title} active={active} />
              </div>
              <div className={`min-w-0 text-[17px] font-extrabold leading-[1.35] tracking-[-0.03em] ${active ? "text-[#17803d]" : "text-[#0b2347]"}`}>
                {index + 1}. {item.title}
              </div>
              <div className={`ml-auto ${active ? "text-[#17803d]" : "text-[#0b2347]"}`}>
                <ArrowRightMiniIcon />
              </div>
            </button>
          );
        })}

        <div className="rounded-[12px] border border-[#dce9df] bg-[linear-gradient(180deg,#fbfffc_0%,#f3fbf5_100%)] px-4 py-4">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#f3fbf5] text-[#17803d]">
              <CompatibilityMetaIcon kind="badges" />
            </div>
            <p className="text-[16px] leading-[1.8] text-[#173660]">{goodYearsLine}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <article className="overflow-hidden rounded-[12px] border border-[#e4ecf6] bg-white">
          <div className="flex items-center gap-4 border-b border-[#e6edf6] px-5 py-3.5">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#17803d] text-white">
              <FailureIssueIcon title={activeItem.title} active />
            </div>
            <div className="min-w-0">
              <h3 className="font-['Manrope'] text-[27px] font-extrabold leading-[1.12] tracking-[-0.04em] text-[#17803d]">
                {activeIndex + 1}. {activeItem.title}
              </h3>
              <p className="mt-1 text-[15px] text-[#516581]">Why it fails / Symptoms / Repair vs replace</p>
            </div>
          </div>

          <div className="grid gap-3 p-4">
            <div className="rounded-[12px] border border-[#e4ecf6] bg-white px-4 py-4">
              <div className="grid gap-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1faf4] text-[#17803d]">
                  <CompatibilityMetaIcon kind="years" />
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-[#17803d]">Typical onset:</div>
                  <div className="mt-1 text-[22px] font-extrabold tracking-[-0.03em] text-[#0b2347]">{activeItem.onset}</div>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#e4ecf6] bg-white px-4 py-4">
              <div className="grid gap-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f8ff] text-[#0b2347]">
                  <SpecsPanelIcon />
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-[#0b2347]">What happens:</div>
                  <p className="mt-2 text-[17px] leading-[1.72] text-[#173660]">{activeItem.whatHappens}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#e4ecf6] bg-white px-4 py-4">
              <div className="grid gap-4 sm:grid-cols-[70px_minmax(0,1fr)] sm:items-start">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f1faf4] text-[#17803d]">
                  <PriceTableHeaderIcon />
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-[#17803d]">Repair vs replace:</div>
                  <p className="mt-2 text-[17px] leading-[1.72] text-[#173660]">{activeItem.repairVsReplace}</p>
                </div>
              </div>
            </div>

          </div>
        </article>

        <div className="grid items-stretch gap-4 lg:grid-cols-[3fr_7fr]">
          <a
            href="#quote-form"
            data-quote-context={failuresTitle}
            data-quote-source="engine-failures-inline"
            data-quote-engine-code={engineCode}
            className="flex min-h-[68px] items-center justify-between rounded-[10px] border border-[#d9e4f6] bg-[#f7fbff] px-4 py-3 text-[#1d4ed8] transition hover:border-[#bfd4f3] hover:text-[#17803d]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <DocumentLinkIcon />
              <span className="text-[15px] font-extrabold leading-[1.2] tracking-[-0.02em]">Read more about {activeItem.title}</span>
            </div>
            <span className="flex-none" aria-hidden="true">
              <CompatibilityMetaIcon kind="link" />
            </span>
          </a>

          <div className="relative overflow-hidden rounded-[8px] bg-[linear-gradient(90deg,#081f47_0%,#071a3b_100%)] px-4 py-3 text-white shadow-[0_8px_16px_rgba(8,31,71,0.1)]">
            <div className="relative z-[1] flex h-full items-center justify-between gap-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#17803d] text-white">
                  <TagOutlineIcon />
                </div>
                <p className="max-w-[520px] font-['Manrope'] text-[20px] font-extrabold leading-[1.22] tracking-[-0.03em] text-white">
                  {ctaText}
                </p>
              </div>
              <a
                href="#quote-form"
                data-quote-context={failuresTitle}
                data-quote-source="engine-failures-cta"
                data-quote-engine-code={engineCode}
                className="inline-flex min-h-[42px] flex-none items-center justify-center rounded-[6px] bg-[#0d8d3b] px-4 py-1 text-[16px] font-semibold text-white shadow-[0_8px_16px_rgba(13,141,59,0.12)] transition hover:bg-[#0a7b33]"
              >
                Compare Rebuilt {engineCode} Prices
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
