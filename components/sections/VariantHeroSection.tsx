"use client";

import Image from "next/image";
import type { VariantHeroData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHeroData;
  bgImage: string;
};

const defaultEngineImage = "/images/shared/hero-engines/temporary-performance-engine.jpeg";

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 22 14" className="h-[15px] w-[22px] rounded-[2px]" aria-hidden="true">
      <rect width="22" height="14" fill="#012169" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#fff" strokeWidth="3.5" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#C8102E" strokeWidth="2" />
      <path d="M11 0v14M0 7h22" stroke="#fff" strokeWidth="4.5" />
      <path d="M11 0v14M0 7h22" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function getTrustIcon(index: number) {
  if (index === 0) {
    return <WrenchIcon />;
  }
  if (index === 1) {
    return <ShieldIcon />;
  }
  if (index === 2) {
    return <TruckIcon />;
  }
  return <UsersIcon />;
}

function getOptionToneClasses(tone?: string) {
  if (tone === "reconditioned") {
    return {
      badge: "bg-[#eef9f1] text-[#15803d]",
      price: "text-[#15803d]",
    };
  }
  if (tone === "rebuilt") {
    return {
      badge: "bg-[#fff7e8] text-[#ca8a04]",
      price: "text-[#0f172a]",
    };
  }
  return {
    badge: "bg-[#eef4ff] text-[#1d4ed8]",
    price: "text-[#0f172a]",
  };
}

function parseAnchorPrice(data: VariantHeroData) {
  const line = data.highlights?.[0]?.line1 ?? data.highlights?.[0]?.price ?? "";
  if (!line) {
    return data.highlights?.[0]?.price ?? "";
  }

  const pieces = line.split(/[-:]/);
  return pieces.length > 1 ? pieces.slice(1).join("-").trim() : line;
}

function getEngineCards(data: VariantHeroData) {
  if (data.engineOptions?.length) {
    return data.engineOptions;
  }

  const detail = data.highlights?.[0]?.detail ?? "";
  return [
    {
      label: "Used",
      price: "From quote",
      description: detail || "Verified UK stock from vetted suppliers.",
      image: data.highlights?.[0]?.image,
      imageAlt: data.highlights?.[0]?.imageAlt,
      tone: "used" as const,
    },
  ];
}

function getHeadlineParts(h1: string) {
  const match = h1.match(/^(.*?)(?:\s*-\s*)(.*)$/);
  if (!match) {
    return { lead: h1, accent: "" };
  }
  return {
    lead: match[1].trim(),
    accent: match[2].trim(),
  };
}

function getTickerItems(ticker: string) {
  return ticker
    .split(/[●•·|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function VariantHeroSection({ data, bgImage }: Props) {
  const headline = getHeadlineParts(data.h1);
  const optionCards = getEngineCards(data);
  const anchorPrice = parseAnchorPrice(data);
  const detailLine = data.highlights?.[0]?.detail ?? data.highlights?.[0]?.line2 ?? "";
  const tickerItems = getTickerItems(data.ticker);

  return (
    <Section className="overflow-hidden bg-white !py-0">
      <Container className="!max-w-none !px-0 sm:!px-0 lg:!px-0">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(126deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.98)_40%,rgba(241,246,253,0.98)_58%,rgba(225,234,247,0.95)_74%,rgba(211,224,243,0.92)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden w-[52%] bg-[linear-gradient(135deg,transparent_0%,transparent_28%,rgba(195,210,236,0.3)_28%,rgba(195,210,236,0.3)_36%,transparent_36%,transparent_49%,rgba(195,210,236,0.22)_49%,rgba(195,210,236,0.22)_57%,transparent_57%)] lg:block" />
          <div className="pointer-events-none absolute right-[2%] top-1 hidden text-[150px] font-black leading-none text-[#d4e2f6] opacity-70 lg:block">
            {data.vehicleBadge ?? "M3"}
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.03fr)_minmax(500px,0.97fr)] lg:items-center">
            <div className="max-w-[700px] pt-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f8b41] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white shadow-[0_8px_18px_rgba(31,139,65,0.18)]">
                <ShieldIcon />
                <span>{data.tag}</span>
              </div>

              <h1 className="mt-5 max-w-[760px] font-['Manrope'] text-[38px] font-extrabold leading-[0.98] tracking-normal text-[#0b2347] sm:text-[50px] lg:text-[64px]">
                <span className="block">{headline.lead}</span>
                {headline.accent ? <span className="mt-2 block text-[#169347]">{headline.accent}</span> : null}
              </h1>

              <p className="mt-4 max-w-[650px] text-[17px] leading-[1.65] text-[#253c5d]">{data.subheading}</p>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-[#e2e8f1] py-4 sm:grid-cols-4 lg:max-w-[720px]">
                {data.trustBadges.map((badge, index) => (
                  <div
                    key={`${badge}-${index}`}
                    className={`inline-flex min-w-0 items-center gap-3 pr-4 text-[#163d8c] ${
                      index < data.trustBadges.length - 1 ? "border-r border-[#dbe5f2]" : ""
                    }`}
                  >
                    <div className="text-[#1558c0]">{getTrustIcon(index)}</div>
                    <p className="text-[14px] font-semibold leading-[1.35] text-[#112b57]">{badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[250px] w-full max-w-[690px] items-end justify-center lg:min-h-[410px]">
              <div className="absolute inset-x-14 bottom-4 h-12 rounded-full bg-[radial-gradient(circle,rgba(100,116,139,0.24),rgba(100,116,139,0))] blur-2xl" />
              <Image
                src={bgImage}
                alt={data.imageAlt ?? data.h1}
                fill
                className="object-contain object-center drop-shadow-[0_28px_34px_rgba(15,23,42,0.16)]"
                sizes="(max-width: 1024px) 100vw, 48vw"
                priority
              />
            </div>
          </div>

          <div className="relative mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.38fr)_minmax(390px,0.82fr)]">
            <div className="rounded-none border border-[#e0e7f1] bg-white/92 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5">
              <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
                <div className="relative mx-auto flex h-[190px] w-full max-w-[240px] items-center justify-center">
                  <Image
                    src={optionCards[0]?.image || defaultEngineImage}
                    alt={optionCards[0]?.imageAlt || `${data.h1} engine`}
                    fill
                    className="object-contain"
                    sizes="240px"
                  />
                </div>

                <div>
                  <div className="inline-flex rounded-full bg-[#09295a] px-4 py-1.5 text-[13px] font-extrabold tracking-[0.03em] text-white">
                    {data.highlights?.[0]?.title?.replace(/\s+Engine$/i, "") || "Engine Code"}
                  </div>

                  <p className="mt-3 font-['Manrope'] text-[25px] font-extrabold tracking-normal text-[#0b2347] sm:text-[33px]">
                    From <span className="text-[#149347]">{anchorPrice || data.highlights?.[0]?.price}</span>
                  </p>

                  {detailLine ? <p className="mt-2 text-[15px] leading-[1.6] text-[#334a68]">{detailLine}</p> : null}

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {optionCards.map((option, index) => {
                      const tone = getOptionToneClasses(option.tone);
                      return (
                        <div key={`${option.label}-${index}`} className="rounded-none border border-[#dfe7f1] bg-[#fbfdff] px-4 py-3.5">
                          <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.04em] ${tone.badge}`}>
                            {option.label}
                          </div>
                          <p className={`mt-3 text-[16px] font-extrabold ${tone.price}`}>{option.price}</p>
                          <p className="mt-1.5 text-[13px] leading-[1.5] text-[#4d6483]">{option.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-none border border-[#e0e7f1] bg-white/95 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5">
              <div className="grid gap-4">
                <div className="grid grid-cols-[92px_1fr] overflow-hidden rounded-none border border-[#dbe4f0] bg-[#fbfdff]">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-r border-[#dbe4f0] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UkFlagIcon />
                      <span className="text-[16px] font-extrabold text-[#0b2347]">{data.registrationInput?.countryCode ?? "GB"}</span>
                    </div>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0b2347]" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={data.registrationInput?.platePlaceholder || data.form.inputPlaceholder}
                    className="min-w-0 border-0 bg-transparent px-5 text-[17px] text-[#0b2347] outline-none placeholder:text-[#7487a1]"
                    aria-label={data.registrationInput?.label || data.form.heading}
                  />
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={data.form.heading}
                  data-quote-source="variant-hero"
                  className="inline-flex min-h-[72px] items-center justify-center gap-3 rounded-none bg-[#169347] px-6 text-center text-[17px] font-extrabold text-white shadow-[0_16px_28px_rgba(22,147,71,0.24)] transition hover:bg-[#117f3b]"
                >
                  <span>{data.form.buttonText.replace(/\s*->\s*$/, "")}</span>
                  <ArrowIcon />
                </a>

                <div className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#253a58]">
                  <span className="mt-1 text-[#0b2347]">
                    <LockIcon />
                  </span>
                  <p>{data.form.note}</p>
                </div>
              </div>
            </div>
          </div>

          {tickerItems.length ? (
            <div className="relative mt-4 overflow-hidden rounded-[18px] bg-[#061d46] px-4 py-3 text-white shadow-[0_12px_24px_rgba(8,31,71,0.16)]">
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[14px] font-medium">
                {tickerItems.map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
                    <span>{item}</span>
                    {index < tickerItems.length - 1 ? <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> : null}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
