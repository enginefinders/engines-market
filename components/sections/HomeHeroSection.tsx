"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Container from "@/components/ui/Container";
import type { HomeHeroData } from "@/lib/homepageData";

type Props = {
  data: HomeHeroData;
};

type HeroBrandRow = {
  brand: string;
  stat: string;
  price: string;
  codes: string;
};

type TickerItem = {
  brand: string;
  code: string;
  price: string;
};

const rowGroups: HeroBrandRow[][] = [
  [
    { brand: "BMW", stat: "820+ quotes · last 30 days", price: "£1,800 - £4,500", codes: "N47D20 · B47D20 · N57D30" },
    { brand: "Land Rover", stat: "540+ quotes · last 30 days", price: "£3,200 - £6,500", codes: "306DT · 508PN · 276DT" },
    { brand: "Mercedes-Benz", stat: "675+ quotes · last 30 days", price: "£2,200 - £5,500", codes: "OM651 · M271 · M276" },
  ],
  [
    { brand: "Ford", stat: "480+ quotes · last 30 days", price: "£1,200 - £3,200", codes: "HHDA · M8MA · PNDA" },
    { brand: "Volkswagen", stat: "340+ quotes · last 30 days", price: "£1,400 - £3,500", codes: "CAYC · CFFB · CZCA" },
    { brand: "Jaguar", stat: "300+ quotes · last 30 days", price: "£2,800 - £5,800", codes: "306PS · 508PN · AJ126" },
  ],
  [
    { brand: "Nissan", stat: "280+ quotes · last 30 days", price: "£1,400 - £3,200", codes: "K9K · HR16DE · YD25DDTi" },
    { brand: "Renault", stat: "250+ quotes · last 30 days", price: "£1,100 - £2,800", codes: "K9K · M9R · H4M" },
    { brand: "Toyota", stat: "220+ quotes · last 30 days", price: "£1,200 - £3,000", codes: "1ND-TV · 2AD-FTV · 2ZR-FE" },
  ],
  [
    { brand: "Mitsubishi", stat: "175+ quotes · last 30 days", price: "£1,800 - £3,800", codes: "4N14 · 4D56 · 6G74" },
    { brand: "Peugeot", stat: "160+ quotes · last 30 days", price: "£1,100 - £2,800", codes: "DV6C · DW10 · EP6" },
    { brand: "Audi", stat: "160+ quotes · last 30 days", price: "£1,600 - £4,200", codes: "CAGA · CFFB · CDUC" },
  ],
  [
    { brand: "Honda", stat: "140+ quotes · last 30 days", price: "£1,300 - £3,000", codes: "N22A · R20A · K20C" },
    { brand: "Kia", stat: "125+ quotes · last 30 days", price: "£1,200 - £2,800", codes: "D4FB · G4FJ · D4HA" },
    { brand: "Mazda", stat: "120+ quotes · last 30 days", price: "£1,400 - £3,200", codes: "SH-VPTS · R2AA · L5-VE" },
  ],
];

const tickerItems: TickerItem[] = [
  { brand: "BMW", code: "N47D20", price: "£2,200" },
  { brand: "Land Rover", code: "306DT", price: "£4,100" },
  { brand: "Mercedes", code: "OM651", price: "£2,800" },
  { brand: "Ford", code: "HHDA", price: "£1,500" },
  { brand: "VW", code: "CAYC", price: "£1,800" },
  { brand: "Jaguar", code: "306PS", price: "£3,400" },
  { brand: "Nissan", code: "K9K", price: "£1,600" },
  { brand: "Renault", code: "M9R", price: "£1,400" },
  { brand: "Toyota", code: "2AD-FTV", price: "£1,800" },
  { brand: "Mitsubishi", code: "4N14", price: "£2,200" },
  { brand: "Peugeot", code: "DW10", price: "£1,400" },
  { brand: "Audi", code: "CAGA", price: "£2,100" },
  { brand: "Honda", code: "N22A", price: "£1,600" },
  { brand: "Kia", code: "D4FB", price: "£1,500" },
  { brand: "Mazda", code: "SH-VPTS", price: "£1,800" },
];

const bottomTickerMessages = [
  "Instant engine replacement quote - 100% free, no obligation",
  "Engine replacement near me - UK-wide specialist network",
  "Compare reconditioned, rebuilt & used engine prices",
  "Supply & fit available - parts and labour from vetted specialists",
];

const logoMarkup: Record<string, string> = {
  BMW: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="9" stroke="#1c69d4" stroke-width="1.5"/><circle cx="10" cy="10" r="6" stroke="#1c69d4" stroke-width="1"/><path d="M10 4v6h6" stroke="#1c69d4" stroke-width="1" stroke-linecap="round"/><rect x="4" y="4" width="6" height="6" fill="#1c69d4" rx="0.5"/><rect x="10" y="10" width="6" height="6" fill="#1c69d4" rx="0.5"/><rect x="4" y="10" width="6" height="6" fill="white" rx="0.5"/><rect x="10" y="4" width="6" height="6" fill="white" rx="0.5"/></svg>`,
  "Land Rover": `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="6" width="16" height="8" rx="2" fill="#004225"/><path d="M5 10h10M7 8v4M13 8v4" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  "Mercedes-Benz": `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="#222" stroke-width="1.2"/><path d="M10 1.5v8.5M10 10l7.1 4.5M10 10L2.9 14.5" stroke="#222" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  Ford: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><ellipse cx="10" cy="10" rx="9" ry="5.5" stroke="#003475" stroke-width="1.5"/><text x="10" y="13.5" text-anchor="middle" fill="#003475" font-size="6" font-family="serif" font-style="italic" font-weight="700">Ford</text></svg>`,
  Volkswagen: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="#001e50" stroke-width="1.2"/><path d="M6.5 6l2 5 1.5-3 1.5 3 2-5" stroke="#001e50" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10.5h10" stroke="#001e50" stroke-width="1" stroke-linecap="round"/></svg>`,
  Jaguar: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10c2-5 12-5 14 0-2 5-12 5-14 0z" stroke="#b8912a" stroke-width="1.2"/><circle cx="10" cy="10" r="2" fill="#b8912a"/><path d="M10 5v2M10 13v2M5 10H3M17 10h-2" stroke="#b8912a" stroke-width="1" stroke-linecap="round"/></svg>`,
  Nissan: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="1.5" y="8.5" width="17" height="3" rx="1.5" stroke="#c3002f" stroke-width="1.2"/><path d="M7 8.5V6.5a3 3 0 0 1 6 0v2" stroke="#c3002f" stroke-width="1.2"/></svg>`,
  Renault: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2L16 10l-6 8-6-8z" stroke="#efdf00" stroke-width="1.5"/><path d="M10 5l4 5-4 5-4-5z" fill="#efdf00"/></svg>`,
  Toyota: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><ellipse cx="10" cy="10" rx="8" ry="5" stroke="#eb0a1e" stroke-width="1.3"/><ellipse cx="10" cy="10" rx="4.5" ry="8" stroke="#eb0a1e" stroke-width="1.3"/><ellipse cx="10" cy="10" rx="8" ry="2.5" stroke="#eb0a1e" stroke-width="1.3"/></svg>`,
  Mitsubishi: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2l2.6 4.5H7.4z" fill="#e60012"/><path d="M5 13l2.6-4.5L10 13z" fill="#e60012"/><path d="M15 13l-2.6-4.5L10 13z" fill="#e60012"/></svg>`,
  Peugeot: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2c1.5 0 3 1.5 3 3.5 0 1.5-.8 2.8-2 3.2V18H9V8.7C7.8 8.3 7 7 7 5.5 7 3.5 8.5 2 10 2z" stroke="#003087" stroke-width="1.2"/><circle cx="10" cy="5.5" r="1.5" fill="#003087"/></svg>`,
  Audi: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="5" cy="10" r="3.5" stroke="#bb0a21" stroke-width="1.3"/><circle cx="9" cy="10" r="3.5" stroke="#bb0a21" stroke-width="1.3"/><circle cx="13" cy="10" r="3.5" stroke="#bb0a21" stroke-width="1.3"/><circle cx="17" cy="10" r="3.5" stroke="#bb0a21" stroke-width="1.3"/></svg>`,
  Honda: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M8 4v12M12 4v12M8 10h4" stroke="#cc0000" stroke-width="2" stroke-linecap="round"/></svg>`,
  Kia: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="1.5" y="6" width="17" height="8" rx="4" stroke="#05141f" stroke-width="1.2"/><path d="M5 10h1.5L8 7.5M8 12.5L6.5 10M10 7.5v5M12 7.5l1.5 2.5-1.5 2.5" stroke="#05141f" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  Mazda: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3c1.5 2 6 3.5 6 7s-3 7-6 7-6-3.5-6-7 4.5-5 6-7z" stroke="#910000" stroke-width="1.3"/><path d="M10 7c0 2-2 3-2 5s1 3 2 3 2-1 2-3-2-3-2-5z" fill="#910000"/></svg>`,
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="5" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="16" r="1.5" fill="currentColor" stroke="none" />
      <path d="M3 13H1M21 13h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlaceholderEngineIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" aria-hidden="true">
      <rect x="8" y="20" width="48" height="28" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="20" y="14" width="24" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="44" r="4" fill="currentColor" stroke="none" />
      <circle cx="48" cy="44" r="4" fill="currentColor" stroke="none" />
      <path d="M8 34H2M56 34h6M32 20v-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LogoBadge({ brand }: { brand: string }) {
  return (
    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-[8px] border border-[rgba(13,27,46,0.1)] bg-[#f9fafb]">
      <span className="h-5 w-5" dangerouslySetInnerHTML={{ __html: logoMarkup[brand] ?? "" }} />
    </div>
  );
}

function HeroRow({ row }: { row: HeroBrandRow }) {
  return (
    <div className="flex h-[76px] items-center gap-3 border-b border-[rgba(13,27,46,0.1)] px-4 last:border-b-0">
      <LogoBadge brand={row.brand} />
      <div className="min-w-0 flex-1">
        <div className="mb-[3px] flex items-center justify-between gap-2">
          <span className="text-[14px] font-bold text-[#0d1b2e]">{row.brand}</span>
          <span className="whitespace-nowrap text-[11px] font-semibold text-[#15803d]">{row.stat}</span>
        </div>
        <div className="mb-[2px] text-[13px] font-semibold text-[#0d1b2e]">
          Avg. rebuilt quote: <span className="text-[#15803d]">{row.price}</span>{" "}
          <span className="text-[11px] font-normal text-[#6b7280]">· supply only</span>
        </div>
        <div className="truncate text-[11px] text-[#6b7280]">Most requested: {row.codes}</div>
      </div>
      <span className="flex-none text-[#9ca3af]">
        <ArrowIcon />
      </span>
    </div>
  );
}

export default function HomeHeroSection({ data }: Props) {
  const [registration, setRegistration] = useState("");
  const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGroupIndex((current) => (current + 1) % rowGroups.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const engineTickerLoop = useMemo(() => [...tickerItems, ...tickerItems], []);
  const bottomTickerLoop = useMemo(() => [...bottomTickerMessages, ...bottomTickerMessages], []);

  function openQuoteCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent("engine-market:open-quote", {
        detail: {
          regNumber: registration.trim(),
          source: "home-hero-registration",
        },
      }),
    );
  }

  const activeGroup = rowGroups[groupIndex] ?? rowGroups[0];

  return (
    <>
      <section className="overflow-hidden bg-white pt-10 lg:pt-12">
        <Container className="max-w-[1200px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12 lg:pb-10">
            <div className="flex flex-col">
              <span className="mb-4 inline-flex w-fit items-center gap-[6px] rounded-full bg-[#0d1b2e] px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                <span className="h-[6px] w-[6px] rounded-full bg-[#15803d]" />
                <span>{data.tag}</span>
              </span>

              <h1
                className="mb-3 leading-[1.1] tracking-[-0.03em] text-[#0d1b2e]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="block text-[clamp(28px,5vw,48px)] font-extrabold">{data.headingLead}</span>
                <span className="mt-[2px] block text-[clamp(20px,3.5vw,36px)] font-semibold text-[#15803d]">
                  — {data.headingAccent}
                </span>
              </h1>

              <p
                className="mb-6 max-w-[42ch] text-[16px] leading-[1.6] text-[#6b7280]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {data.subheading.replace(" - ", " — ")}
              </p>

              <div className="overflow-hidden rounded-[12px] border border-[rgba(13,27,46,0.1)] bg-white shadow-[0_2px_12px_rgba(13,27,46,0.06)]">
                {activeGroup.map((row) => (
                  <HeroRow key={`${groupIndex}-${row.brand}`} row={row} />
                ))}
              </div>

              <p
                className="px-1 pb-3 pt-[6px] text-[10px] italic leading-[1.4] text-[#9ca3af]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Prices are indicative rebuilt/reconditioned supply-only averages. Actual quotes vary by variant, year and supplier.
              </p>

              <form
                id="home-hero-reg-form"
                className="mb-[10px] flex items-center gap-2 rounded-[12px] border-2 border-[rgba(13,27,46,0.1)] border-l-[4px] border-l-[#0d1b2e] bg-[#f9fafb] px-3 py-1 shadow-[0_2px_8px_rgba(13,27,46,0.06)]"
                onSubmit={openQuoteCheckout}
              >
                <div className="flex flex-none items-center gap-[5px]">
                  <span className="rounded-[4px] bg-[#0d1b2e] px-[5px] py-[2px] text-[11px] font-extrabold tracking-[0.05em] text-white">
                    GB
                  </span>
                </div>

                <label
                  htmlFor="home-reg-input"
                  className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]"
                >
                  Enter your vehicle registration
                </label>

                <input
                  id="home-reg-input"
                  type="text"
                  value={registration}
                  onChange={(event) => setRegistration(event.target.value.toUpperCase())}
                  placeholder="Enter your reg — e.g. AB12 CDE"
                  maxLength={8}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 border-none bg-transparent text-[17px] font-bold tracking-[0.08em] text-[#0d1b2e] outline-none placeholder:text-[14px] placeholder:font-medium placeholder:tracking-normal placeholder:text-[#9ca3af]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />

                <button
                  type="submit"
                  className="flex-none rounded-[10px] bg-[#15803d] px-5 py-[13px] text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.32)] transition hover:bg-[#166534]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Get Free Engine Quotes →
                </button>
              </form>

              <p
                className="mb-3 flex items-center justify-center gap-[5px] text-center text-[12px] text-[#9ca3af]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <LockIcon />
                <span>{data.gdprNote.replace(" - ", " — ")}</span>
              </p>

              <p
                className="mb-5 text-center text-[13px] leading-[1.5] text-[#6b7280]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Covering <strong className="font-bold text-[#0d1b2e]">8,000+</strong> engine codes across{" "}
                <strong className="font-bold text-[#0d1b2e]">40+</strong> makes — from{" "}
                <strong className="font-bold text-[#0d1b2e]">BMW</strong> and{" "}
                <strong className="font-bold text-[#0d1b2e]">Land Rover</strong> to{" "}
                <strong className="font-bold text-[#0d1b2e]">Ford</strong> and{" "}
                <strong className="font-bold text-[#0d1b2e]">Vauxhall</strong>.
              </p>

              <div className="-mx-6 block h-16 overflow-hidden border-y border-[rgba(13,27,46,0.1)] bg-[#f9fafb] lg:hidden">
                <div className="hero-ticker-track h-16">
                  {engineTickerLoop.map((item, index) => (
                    <div
                      key={`${item.brand}-${item.code}-${index}`}
                      className="flex h-16 min-w-[90px] flex-none flex-col items-center justify-center border-r border-[rgba(13,27,46,0.1)] px-4"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d1b2e] text-white">
                        <EngineIcon />
                      </div>
                      <span className="mt-[2px] whitespace-nowrap text-[9px] font-bold tracking-[0.04em] text-[#0d1b2e]">
                        {item.brand} · {item.code}
                      </span>
                      <span className="whitespace-nowrap text-[9px] font-semibold text-[#15803d]">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden lg:flex lg:flex-col">
              <div className="relative flex h-[340px] flex-col items-center justify-center gap-3 overflow-hidden rounded-[16px] border border-[rgba(13,27,46,0.1)] bg-[linear-gradient(135deg,#f1f5f9_0%,#e2e8f0_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(21,128,61,0.08)_0%,transparent_70%)]" />
                <div className="relative z-[1] flex h-20 w-20 items-center justify-center rounded-[16px] bg-[rgba(13,27,46,0.06)] text-[#0d1b2e]/40">
                  <PlaceholderEngineIcon />
                </div>
                <span className="relative z-[1] text-[12px] font-medium uppercase tracking-[0.06em] text-[#6b7280]">
                  Engine Image
                </span>
                <span className="relative z-[1] text-[11px] text-[#9ca3af]">Replace with OEM engine photo</span>
              </div>

              <div className="mt-3 h-14 overflow-hidden rounded-[10px] border border-[rgba(13,27,46,0.1)] bg-[#f9fafb]">
                <div className="hero-ticker-track h-14">
                  {engineTickerLoop.map((item, index) => (
                    <div
                      key={`desktop-${item.brand}-${item.code}-${index}`}
                      className="flex h-14 min-w-[90px] flex-none flex-col items-center justify-center border-r border-[rgba(13,27,46,0.1)] px-4"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d1b2e] text-white">
                        <EngineIcon />
                      </div>
                      <span className="mt-[2px] whitespace-nowrap text-[9px] font-bold tracking-[0.04em] text-[#0d1b2e]">
                        {item.brand} · {item.code}
                      </span>
                      <span className="whitespace-nowrap text-[9px] font-semibold text-[#15803d]">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="flex h-11 items-center overflow-hidden bg-[#0d1b2e]">
        <div className="flex h-11 flex-none items-center gap-[5px] border-r border-r-white/15 bg-[#15803d] px-3 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white">
          <span className="h-[6px] w-[6px] rounded-full bg-white" />
          <span>Live</span>
        </div>

        <div className="h-11 flex-1 overflow-hidden">
          <div className="hero-ticker-track h-11">
            {bottomTickerLoop.map((message, index) => (
              <span
                key={`${message}-${index}`}
                className="flex h-11 flex-none items-center gap-[6px] border-r border-r-white/10 px-6 text-[12px] text-white/85"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-[#15803d]" />
                <span>{message}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
