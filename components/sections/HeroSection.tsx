"use client";

import type { HeroSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import { Fragment, useState, type FormEvent } from "react";

type HeroSectionProps = {
  data: HeroSectionData;
  bgImage: string;
};

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M3.5 11.2V5.8c0-.8.7-1.5 1.5-1.5h5.4c.4 0 .8.2 1.1.5l8.1 8.1c.6.6.6 1.6 0 2.2l-4.7 4.7c-.6.6-1.6.6-2.2 0L4 12.3c-.3-.3-.5-.7-.5-1.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function DocumentSearchIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none">
      <path d="M18 8h22l10 10v30H18V8Z" stroke="currentColor" strokeWidth="3" />
      <path d="M40 8v12h12" stroke="currentColor" strokeWidth="3" />
      <path d="M25 30h16M25 38h10" stroke="currentColor" strokeWidth="3" />
      <circle cx="43" cy="45" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="m49 51 6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ToolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="m14 6 4 4-8 8H6v-4l8-8Z" stroke="currentColor" strokeWidth="2" />
      <path d="m16 4 4 4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="2" />
      <path d="M4 21c1-5 15-5 16 0" stroke="currentColor" strokeWidth="2" />
      <path d="M18 10a3 3 0 0 1 3 3M6 10a3 3 0 0 0-3 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 36 24" className="h-6 w-9 rounded-sm" aria-hidden="true">
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 36 24M36 0 0 24" stroke="#C8102E" strokeWidth="3" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
      <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="4.5" />
    </svg>
  );
}

const badgeIcons = [ToolIcon, ShieldIcon, DeliveryIcon];

function stripTrailingArrow(text: string) {
  return text.replace(/\s*(?:->|\u2192)\s*$/, "");
}

function DividerDot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" aria-hidden="true" />;
}

function getTickerItems(ticker: string) {
  return ticker
    .split("-")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function HeroSection({ data, bgImage }: HeroSectionProps) {
  const [registration, setRegistration] = useState("");
  const tickerItems = getTickerItems(data.ticker);

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
    <section className="relative overflow-hidden bg-slate-50">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(248,250,252,0.9) 0%, rgba(248,250,252,0.78) 46%, rgba(248,250,252,0.55) 100%), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />

      <Container className="relative">
        <div className="grid min-h-[430px] items-center gap-6 py-6 lg:grid-cols-[1.16fr_0.84fr] lg:py-7">
          <div className="order-2 lg:order-1">
            <div className="text-label mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[#061a33] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              {data.tag}
            </div>

            <h1 className="text-hero-title max-w-[620px] text-[#061a33]">{data.h1}</h1>

            <p className="text-body mt-4 max-w-xl font-medium text-[#10233f]">{data.subheading}</p>

            <a
              href="#quote-form"
              className="mt-5 flex max-w-[470px] items-center gap-3 rounded-2xl border border-blue-100 bg-white/90 p-3.5 text-left shadow-sm transition hover:border-green-200 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <TagIcon />
              </span>

              <span className="flex-1">
                <span className="text-label block text-[#061a33]">{stripTrailingArrow(data.ctaLinkText)}</span>
                <span className="text-small mt-1 block text-blue-700">{data.supportingText}</span>
              </span>

              <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-blue-700" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <div
              id="quote-form"
              className="mx-auto max-w-[340px] rounded-[18px] border border-slate-200 bg-white p-4 shadow-xl"
            >
              <div className="mb-2 flex justify-center text-[#061a33]">
                <DocumentSearchIcon />
              </div>

              <h2 className="text-form-title mx-auto max-w-[260px] text-center text-[#061a33]">
                {data.form.heading}
              </h2>

              <p className="text-small mt-1.5 text-center text-slate-600">{data.form.subtitle}</p>

              <div className="mx-auto mt-3 h-px w-12 bg-blue-500" />

              <form className="mt-4 space-y-2.5" onSubmit={openQuoteCheckout}>
                <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white">
                  <div className="flex w-14 shrink-0 items-center justify-center bg-[#061a33]">
                    <UkFlagIcon />
                  </div>

                  <input
                    type="text"
                    placeholder={data.form.inputPlaceholder}
                    value={registration}
                    onChange={(event) => setRegistration(event.target.value.toUpperCase())}
                    className="min-h-11 flex-1 px-4 text-center text-sm font-bold uppercase tracking-wider text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="text-label flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-5 py-3 text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
                >
                  {data.form.buttonText}
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </form>

              <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center">
                {data.trustBadges.map((badge, index) => {
                  const Icon = badgeIcons[index] ?? ShieldIcon;

                  return (
                    <div key={badge} className="flex flex-col items-center justify-center text-center">
                      <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        <Icon />
                      </div>
                      <p className="text-tiny font-black uppercase text-[#061a33]">{badge}</p>
                    </div>
                  );
                })}
              </div>

              <p className="text-small mt-2.5 flex items-start justify-center gap-1 text-center text-slate-600">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-green-600" fill="none">
                  <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" />
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{data.form.note}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-label mb-4 flex items-center justify-start gap-4 overflow-x-auto rounded-xl border border-slate-200 bg-white/[0.8] px-4 py-2.5 text-[#061a33] shadow-sm lg:justify-center">
          <span className="shrink-0 text-green-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="m8 5 7 7-7 7M15 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>

          {tickerItems.map((item, index) => {
            const Icon =
              index === 0 ? BoltIcon : index === 1 ? ShieldIcon : index === 2 ? CheckBadgeIcon : UsersIcon;

            return (
              <Fragment key={item}>
                <span className="flex shrink-0 items-center gap-2">
                  <Icon /> {item}
                </span>
                {index < tickerItems.length - 1 && <DividerDot />}
              </Fragment>
            );
          })}

          <span className="shrink-0 text-green-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="m16 5-7 7 7 7M9 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </Container>
    </section>
  );
}
