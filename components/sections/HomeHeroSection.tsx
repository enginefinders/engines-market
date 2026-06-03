"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import type { HomeHeroData } from "@/lib/homepageData";
import { carModelsBySeries, carSeries } from "@/data/brands_Models";
import { PiEngine } from "react-icons/pi";
import { GoShield } from "react-icons/go";
import { GoVerified } from "react-icons/go";

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

type EngineCarouselItem = {
  brand: string;
  code: string;
  spec: string;
  price: string;
};

type SearchMode = "registration" | "manual";

type VehicleRegistrationData = {
  registrationNumber: string;
  year: string;
  make: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  color: string;
  wheelplan: string;
};

const manualMakeOptions = Object.keys(carSeries).sort();
const manualYearOptions = Array.from({ length: 2026 - 1990 + 1 }, (_, index) => String(2026 - index));
const carModelsBySeriesMap = carModelsBySeries as Record<string, string[]>;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const modelsByMake: Record<string, string[] | Record<string, string[]>> = Object.entries(carSeries).reduce(
  (accumulator, [brand, items]) => {
    const normalizedBrand = normalize(brand);

    if (Array.isArray(items) && items.length > 0 && carModelsBySeriesMap[items[0]]) {
      const seriesMap: Record<string, string[]> = {};

      items.forEach((seriesName) => {
        seriesMap[seriesName] = carModelsBySeriesMap[seriesName] ?? [];
      });

      accumulator[normalizedBrand] = seriesMap;
      return accumulator;
    }

    accumulator[normalizedBrand] = items;
    return accumulator;
  },
  {} as Record<string, string[] | Record<string, string[]>>,
);

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

const engineCarouselItems: EngineCarouselItem[] = [
  { brand: "BMW", code: "N47D20", spec: "2.0L Diesel", price: "£2,200" },
  { brand: "Mercedes", code: "OM651", spec: "2.2L Diesel", price: "£2,800" },
  { brand: "Land Rover", code: "306DT", spec: "3.0L Diesel", price: "£4,100" },
  { brand: "Audi", code: "CAGA", spec: "2.0L TDI", price: "£2,000" },
  { brand: "Volkswagen", code: "CAYC", spec: "2.0L TDI", price: "£1,900" },
  { brand: "Ford", code: "HHDA", spec: "1.0L Petrol", price: "£1,500" },
  { brand: "Nissan", code: "K9K", spec: "1.5L Diesel", price: "£1,600" },
  { brand: "Toyota", code: "2AD-FTV", spec: "2.2L Diesel", price: "£1,800" },
];

const bottomBarItems = [
  { icon: "lightning", text: "Instant engine replacement quote — 100% free, no obligation" },
  { icon: "location", text: "Engine replacement near me — UK-wide specialist network" },
  { icon: "pound", text: "Compare reconditioned, rebuilt & used engine prices" },
  { icon: "wrench", text: "Supply & fit available — parts and labour from vetted specialists" },
  { icon: "shield", text: "12–24 month warranty on all replacement engines" },
];

// Map brand names to their logo image filenames
function getBrandLogoPath(brand: string): string {
  const brandMap: Record<string, string> = {
    BMW: "bmw-logo-small.webp.webp",
    "Land Rover": "land-rover-logo-small.webp.webp",
    "Mercedes-Benz": "mercedes-logo-small.webp.webp",
    Ford: "ford-logo-small.webp.webp",
    Volkswagen: "volkswagon-logo-small.webp.webp",
    Jaguar: "jaguar-logo-small.webp.webp",
    Nissan: "nissan-logo-small.webp.webp",
    Renault: "renault-logo-small.webp.webp",
    Toyota: "toyota-logo-small.webp.webp",
    Mitsubishi: "mitsubishi-logo-small.webp.webp",
    Peugeot: "peugeot-logo-small.webp.webp",
    Audi: "audi-logo-small.webp.webp",
    Honda: "honda-logo-small.webp.webp",
    Kia: "kia-logo-small.webp.webp",
    Mazda: "mazda-logo-small.webp.webp",
  };
  return `/BrandsLogos/${brandMap[brand] || "default-logo.webp"}`;
}

// Map engine codes to their image filenames
function getEngineImagePath(code: string): string {
  const engineMap: Record<string, string> = {
    "N47D20": "/96da5878-45b8-406b-8fc7-32f8a60d5c5c_removalai_preview.webp",
    "OM651": "/194ff4f9-dd13-4c28-b2fc-4307d63ae0ce_removalai_preview.webp",
    "306DT": "/16924a6b-58ec-44d8-9ed5-ccd89f220a22_removalai_preview.webp",
    "CAGA": "/04544090-33c9-4640-8eb7-0aa9041ae6b7_removalai_preview.webp",
    "CAYC": "/d1ba9486-2d7d-4d0a-8b67-a00842d083c6_removalai_preview.webp",
    "HHDA": "/dded14b9-939e-4104-9e75-073a942a5c68_removalai_preview.webp",
    "K9K": "/e0597dc3-6685-4beb-bf5f-8be1626b14a1_removalai_preview.webp",
    "2AD-FTV": "/fac66331-c94d-48e9-983a-7997fd84a619_removalai_preview.webp",
  };
  return `/images/engines/${engineMap[code] || "engine-placeholder.webp"}`;
}

/* ─── Icon Components ─── */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 flex-none" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EngineTickerIcon() {
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

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 11l1.8-5.4A2 2 0 0 1 8.7 4h6.6a2 2 0 0 1 1.9 1.6L19 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="3" y="11" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 18H3v-2M18.5 18H21v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M7 16V4m0 0L3 8m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EngineCodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="10" rx="2" stroke="#15803d" strokeWidth="1.5" />
      <rect x="8" y="5" width="8" height="4" rx="1" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="1.5" fill="#15803d" />
      <circle cx="18" cy="16" r="1.5" fill="#15803d" />
      <path d="M3 13H1M21 13h2" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldStarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v5c0 4.8 3.4 9.3 8 10.3C16.6 21.3 20 16.8 20 12V7L12 3z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8l.9 2.6H16l-2.5 1.9 1 2.5L12 13.5l-2.5 1.5 1-2.5L8 10.6h3.1L12 8z"
        stroke="#15803d"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#15803d" strokeWidth="1.5" />
      <path d="M8 12l3 3 5-5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M13 2L4.5 13.5H11L10 22l9.5-12H13V2z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M12 2C8.7 2 6 4.7 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="2" stroke="#15803d" strokeWidth="1.5" />
    </svg>
  );
}

function PoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path d="M8 18h8" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 14h7" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 14V9.5C9 7.6 10.6 6 12.5 6 14.4 6 16 7.6 16 9.5" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 7v5c0 4.8 3.4 9.3 8 10.3C16.6 21.3 20 16.8 20 12V7L12 3z"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BottomBarIcon({ type }: { type: string }) {
  switch (type) {
    case "lightning":
      return <LightningIcon />;
    case "location":
      return <LocationIcon />;
    case "pound":
      return <PoundIcon />;
    case "wrench":
      return <WrenchIcon />;
    case "shield":
      return <ShieldCheckIcon />;
    default:
      return null;
  }
}

/* UK Flag SVG */
function UKFlag() {
  return (
    <svg viewBox="0 0 20 14" className="h-[14px] w-[20px] flex-none rounded-[2px]" aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="white" strokeWidth="3" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M10 0 V14 M0 7 H20" stroke="white" strokeWidth="4.5" />
      <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

/* Engine illustration for carousel cards */
function EngineIllustration() {
  return (
    <svg viewBox="0 0 100 72" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Main engine block */}
      <rect x="16" y="22" width="68" height="36" rx="4" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
      {/* Cylinder head */}
      <rect x="20" y="13" width="60" height="12" rx="3" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
      {/* Cylinders */}
      <rect x="25" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="41" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="57" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      <rect x="73" y="15" width="11" height="8" rx="2" fill="#9ca3af" />
      {/* Valve cover detail */}
      <rect x="22" y="25" width="56" height="8" rx="2" fill="#c4c9d1" stroke="#9ca3af" strokeWidth="0.8" />
      {/* Intake manifold */}
      <path d="M30 22 Q28 32 36 36" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Oil filler cap */}
      <circle cx="66" cy="30" r="6" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      <circle cx="66" cy="30" r="3" fill="#6b7280" />
      {/* Alternator */}
      <rect x="74" y="35" width="14" height="12" rx="3" fill="#b0b8c4" stroke="#6b7280" strokeWidth="0.8" />
      <circle cx="81" cy="41" r="4" fill="#6b7280" />
      <circle cx="81" cy="41" r="2" fill="#9ca3af" />
      {/* Drive belt */}
      <path d="M16 38 Q8 38 8 46 Q8 56 16 56" stroke="#374151" strokeWidth="2" fill="none" />
      <circle cx="12" cy="47" r="6" stroke="#374151" strokeWidth="1.5" fill="#e5e7eb" />
      {/* Sump / oil pan */}
      <rect x="22" y="55" width="56" height="6" rx="2" fill="#c4c9d1" stroke="#9ca3af" strokeWidth="0.8" />
      {/* Exhaust ports */}
      <rect x="26" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
      <rect x="45" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
      <rect x="64" y="58" width="7" height="10" rx="1" fill="#9ca3af" />
    </svg>
  );
}

/* Logo Badge */
function LogoBadge({ brand }: { brand: string }) {
  return (
    <div className="flex h-11 w-11 flex-none items-center justify-center overflow-hidden">
      <img
        src={getBrandLogoPath(brand)}
        alt={`${brand} logo`}
        className="h-11 w-11 object-contain"
      />
    </div>
  );
}

/* Brand Row — matches screenshot layout exactly */
function HeroRow({ row }: { row: HeroBrandRow }) {
  return (
    // Changed px-4 to px-2 sm:px-4 to reduce overall left/right space on mobile
    <div className="flex h-[80px] cursor-pointer items-center sm:gap-20 border-b border-[rgba(13,27,46,0.1)] px-2 sm:px-4 last:border-b-0 transition-colors hover:bg-[#f9fafb]">

      {/* LEFT: Logo + Brand name grouped together */}
      {/* Changed w-[110px] to w-[50px] sm:w-[110px] to reduce space around the logo on mobile */}
      <div className="flex w-[50px] min-[380px]:w-[70px] sm:w-[110px] flex-shrink-0 flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <LogoBadge brand={row.brand} />
        <span className="hidden sm:inline text-md font-bold text-[#0d1b2e] sm:text-left">{row.brand}</span>
      </div>

      {/* CENTER: 3-line stats block */}
      <div className="min-w-0 flex-1">
        {/* Line 1: green quote count */}
        <div className="mb-[3px] text-[13px] font-bold text-[#15803d]">
          {/* Added brand name here for mobile only, in dark blue */}
          <span className="sm:hidden mr-1.5 text-[#0d1b2e]">{row.brand}</span>
          {row.stat}
        </div>
        
        {/* Line 2: price range */}
        <div className="mb-[2px] text-[13px] text-[#0d1b2e]">
          Avg. <span className="font-semibold">Rebuilt</span> Quote:{" "}
          <span className="font-semibold">{row.price}</span>{" "}
          <span className="text-[11px] text-[#6b7280]">· supply only</span>
        </div>
        
        {/* Line 3: most requested codes */}
        <div className="truncate text-[11px] text-[#6b7280]">
          Most requested:{" "}
          <span className="font-medium text-[#374151]">{row.codes}</span>
        </div>
      </div>

      {/* RIGHT: chevron arrow */}
      <span className="flex-none text-[#9ca3af]">
        <ArrowIcon />
      </span>
    </div>
  );
}
/* CTA Panel — reused on both mobile and desktop */
function CTAPanel({
  registration,
  onRegistrationChange,
  onSubmit,
  isRegistrationLookupLoading,
  registrationLookupError,
  gdprNote,
}: {
  registration: string;
  onRegistrationChange: (val: string) => void;
  onSubmit: (payload: {
    searchMode: SearchMode;
    regNumber?: string;
    make?: string;
    model?: string;
    series?: string;
    year?: string;
    engineCode?: string;
  }) => void | Promise<void>;
  isRegistrationLookupLoading: boolean;
  registrationLookupError: string;
  gdprNote: string;
}) {
  const [searchMode, setSearchMode] = useState<SearchMode>("registration");
  const [manualMake, setManualMake] = useState<string>("");
  const [manualModel, setManualModel] = useState<string>("");
  const [manualSeries, setManualSeries] = useState<string>("");
  const [manualYear, setManualYear] = useState<string>("");
  const [manualEngineCode, setManualEngineCode] = useState("");

  const { seriesOptions, modelOptions } = useMemo(() => {
    const entry = modelsByMake[normalize(manualMake)];

    if (entry && !Array.isArray(entry)) {
      return {
        seriesOptions: Object.keys(entry),
        modelOptions: [],
      };
    }

    return {
      seriesOptions: [],
      modelOptions: (entry as string[]) ?? [],
    };
  }, [manualMake]);

  useEffect(() => {
    setManualModel("");
    setManualSeries("");
  }, [manualMake]);

  useEffect(() => {
    if (seriesOptions.length > 0) {
      setManualSeries(seriesOptions[0]);
    } else if (modelOptions.length > 0) {
      setManualModel(modelOptions[0]);
    }
  }, [seriesOptions, modelOptions]);

  const activeModelOptions = useMemo(() => {
    if (seriesOptions.length === 0) {
      return modelOptions;
    }

    const selectedSeriesModels = modelsByMake[normalize(manualMake)];
    if (!selectedSeriesModels || Array.isArray(selectedSeriesModels) || manualSeries === "") {
      return [];
    }

    return selectedSeriesModels[manualSeries] ?? [];
  }, [manualMake, manualSeries, modelOptions, seriesOptions]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchMode === "registration") {
      await onSubmit({
        searchMode,
        regNumber: registration.trim(),
      });
      return;
    }

    await onSubmit({
      searchMode,
      make: manualMake,
      model: manualModel,
      series: manualSeries || undefined,
      year: manualYear,
      engineCode: manualEngineCode.trim().toUpperCase(),
    });
  }

  return (
    <div>
      {/* Toggle buttons */}
      <div className="mb-4 flex w-full gap-0 rounded-t-lg bg-[#f5f5f5] p-1">
        <button
          type="button"
          onClick={() => setSearchMode("registration")}
          aria-pressed={searchMode === "registration"}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 sm:px-4 py-3 text-[12px] sm:text-[13px] font-semibold transition-all ${searchMode === "registration"
            ? "border border-[#0000A3] bg-white text-[#15803d] shadow-sm"
            : "border border-transparent bg-transparent text-[#9ca3af] hover:text-[#6b7280]"
            }`}
        >
          <CarIcon />
          Search by Registration
        </button>
        <button
          type="button"
          onClick={() => setSearchMode("manual")}
          aria-pressed={searchMode === "manual"}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 sm:px-4 py-3 text-[12px] sm:text-[13px] font-semibold transition-all ${searchMode === "manual"
            ? "border border-[#0000A3] bg-white text-[#15803d] shadow-sm"
            : "border border-transparent bg-transparent text-[#9ca3af] hover:text-[#6b7280]"
            }`}
        >
          <SwapIcon />
          Search Manually
        </button>
      </div>

      <div className={`text-center ${searchMode === "manual" ? "p-2 sm:px-6 py-4" : "p-2 sm:p-6"}`}>
        {searchMode === "registration" ? (
          <>
            <h3 className="mb-1 text-[18px] font-semibold text-[#0d1b2e] mx-auto">Get Your Free Engine Quotes</h3>
            <p className="mb-4 text-[15px] text-gray-600 mx-auto">Instant comparison from UK-vetted engine specialists</p>
          </>
        ) : null}

        <form onSubmit={handleSubmit} className={searchMode === "manual" ? "mb-2" : "mb-4"}>
          {searchMode === "registration" ? (
            <div className="flex items-center gap-3 rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 py-[10px]">
              <div className="flex flex-none items-center gap-[6px]">
                <UKFlag />
                <span className="text-[12px] font-extrabold text-[#0d1b2e]">UK</span>
              </div>
              <div className="h-4 w-px bg-[rgba(13,27,46,0.12)]" />
              <input
                type="text"
                value={registration}
                onChange={(e) => onRegistrationChange(e.currentTarget.value.toUpperCase())}
                placeholder="Enter your reg — e.g. AB12 CDE"
                maxLength={8}
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 border-none bg-transparent text-[15px] font-bold tracking-[0.06em] text-[#0d1b2e] outline-none placeholder:text-[13px] placeholder:font-normal placeholder:tracking-normal placeholder:text-[#9ca3af]"
              />
            </div>
          ) : (
            <div className="grid gap-2 text-left">
              <div className="grid grid-cols-1 gap-2">
                <label className="grid gap-0.5 text-[12px] font-semibold text-[#0d1b2e]">
                  Make
                  <select
                    value={manualMake}
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      setManualMake(value);
                      setManualModel("");
                      setManualSeries("");
                    }}
                    className="h-11 w-full rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 text-[14px] text-[#0d1b2e] outline-none"
                  >
                    <option value="">Select Make</option>
                    {manualMakeOptions.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </label>
                {seriesOptions.length > 0 ? (
                  <label className="grid gap-0.5 text-[12px] font-semibold text-[#0d1b2e]">
                    Series
                    <select
                      value={manualSeries}
                      onChange={(e) => {
                        const value = e.currentTarget.value;
                        setManualSeries(value);
                        setManualModel("");
                      }}
                      className="h-11 w-full rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 text-[14px] text-[#0d1b2e] outline-none"
                    >
                      {seriesOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <label className="grid gap-0.5 text-[12px] font-semibold text-[#0d1b2e]">
                  Model
                  <select
                    value={manualModel}
                    onChange={(e) => setManualModel(e.currentTarget.value)}
                    className="h-11 w-full rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 text-[14px] text-[#0d1b2e] outline-none"
                  >
                    {activeModelOptions.length ? (
                      activeModelOptions.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))
                    ) : (
                      <option value="">Select a model</option>
                    )}
                  </select>
                </label>
                <label className="grid gap-0.5 text-[12px] font-semibold text-[#0d1b2e]">
                  Year
                  <select
                    value={manualYear}
                    onChange={(e) => setManualYear(e.currentTarget.value)}
                    disabled={manualModel === ""}
                    className="h-11 w-full rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 text-[14px] text-[#0d1b2e] outline-none"
                  >
                    <option value="">{manualModel === "" ? "Select Model First" : "Select Year"}</option>
                    {manualModel !== "" && manualYearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-0.5 text-left text-[12px] font-semibold text-[#0d1b2e]">
                Engine Code
                <input
                  type="text"
                  value={manualEngineCode}
                  onChange={(e) => setManualEngineCode(e.currentTarget.value.toUpperCase())}
                  placeholder="Enter engine code"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-11 w-full rounded-[8px] border border-[rgba(13,27,46,0.12)] bg-[#f9fafb] px-3 text-[14px] uppercase text-[#0d1b2e] outline-none placeholder:normal-case placeholder:text-[#9ca3af]"
                />
              </label>
            </div>
          )}
          <button
            type="submit"
            disabled={searchMode === "registration" && isRegistrationLookupLoading}
            className={`w-full rounded-[8px] bg-[#15803d] px-6 py-[13px] text-[15px] font-bold text-white shadow-[0_4px_18px_rgba(21,128,61,0.3)] transition hover:bg-[#166534] active:scale-[0.99] ${searchMode === "manual" ? "mt-2" : "mt-3"}`}
          >
            {searchMode === "registration" && isRegistrationLookupLoading ? "Checking Registration..." : "Get Free Engine Quotes →"}
          </button>
        </form>

        {searchMode === "registration" && registrationLookupError ? (
          <p className="-mt-1 mb-3 text-center text-[12px] font-semibold text-red-600">
            {registrationLookupError}
          </p>
        ) : null}

        {/* GDPR */}
        {searchMode === "registration" ? (
          <p className="mb-4 flex items-center justify-center gap-1.5 text-center text-[12px] sm:text-[14px] text-gray-500">
            {/* <LockIcon /> */}
            <span>{gdprNote}</span>
          </p>
        ) : null}

        {searchMode === "registration" ? (
                    <div className="grid grid-cols-3 gap-3 border-t border-[rgba(13,27,46,0.08)] pt-4 text-left sm:grid-cols-3 sm:gap-2 sm:text-center">
            
            {/* 1. Engine Codes */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/enginelogo.webp" 
                alt="Engine Codes" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">8,000+</div>
                <div className="text-[11px] leading-tight text-[#6b7280]">Engine Codes</div>
              </div>
            </div>

            {/* 2. Car Brands */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/carlogo.webp" 
                alt="Car Brands" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">40+</div>
                <div className="text-[11px] leading-tight text-[#6b7280]">Car Brands</div>
              </div>
            </div>

            {/* 3. Free / No Obligation */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-[6px]">
              <img 
                src="/Home/verifiedlogo.webp" 
                alt="Free No Obligation" 
                className="h-8 w-8 flex-none object-contain" 
              />
              <div className="min-w-0 flex flex-col items-center gap-1 sm:gap-0">
                <div className="text-[18px] font-extrabold leading-none text-[#0d1b2e]">100%</div>
                <div className="text-[11px] leading-tight text-[#6b7280] text-center">Free · No Obligation</div>
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function HomeHeroSection({ data }: Props) {
  const router = useRouter();
  const [registration, setRegistration] = useState("");
  const [isRegistrationLookupLoading, setIsRegistrationLookupLoading] = useState(false);
  const [registrationLookupError, setRegistrationLookupError] = useState("");
  const [groupIndex, setGroupIndex] = useState(0);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [desktopCarouselOffset, setDesktopCarouselOffset] = useState(0);

  // How many carousel items are visible depends on viewport — use 3 for mobile logic
  const MOBILE_VISIBLE = 3;
  const DESKTOP_VISIBLE = 6;
  const maxOffset = Math.max(0, engineCarouselItems.length - MOBILE_VISIBLE);
  const desktopMaxOffset = Math.max(0, engineCarouselItems.length - DESKTOP_VISIBLE);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGroupIndex((current) => (current + 1) % rowGroups.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, []);

  const engineTickerLoop = useMemo(() => [...tickerItems, ...tickerItems], []);
  const bottomTickerLoop = useMemo(() => [...bottomBarItems, ...bottomBarItems], []);

  function appendVehicleParams(queryParams: URLSearchParams, vehicle: VehicleRegistrationData) {
    if (vehicle.registrationNumber) queryParams.append("registrationNumber", vehicle.registrationNumber);
    if (vehicle.year) queryParams.append("year", vehicle.year);
    if (vehicle.make) queryParams.append("make", vehicle.make);
    if (vehicle.model) queryParams.append("model", vehicle.model);
    if (vehicle.fuelType) queryParams.append("fuelType", vehicle.fuelType);
    if (vehicle.engineCapacity) queryParams.append("engineCapacity", vehicle.engineCapacity);
    if (vehicle.color) queryParams.append("color", vehicle.color);
    if (vehicle.wheelplan) queryParams.append("wheelplan", vehicle.wheelplan);
  }

  async function fetchVehicleRegistration(regNumber: string) {
    const response = await fetch(`/api/vehicle-registration?registrationNumber=${encodeURIComponent(regNumber)}`);
    const payload = (await response.json()) as { vehicle?: VehicleRegistrationData; error?: string };

    if (!response.ok || !payload.vehicle) {
      throw new Error(payload.error || "We could not find vehicle details for that registration.");
    }

    return payload.vehicle;
  }

  async function openQuoteCheckout(payload: {
    searchMode: SearchMode;
    regNumber?: string;
    make?: string;
    model?: string;
    series?: string;
    year?: string;
    engineCode?: string;
  }) {
    // For manual search, navigate to form page with query parameters
    if (payload.searchMode === "manual") {
      setRegistrationLookupError("");
      const queryParams = new URLSearchParams();
      if (payload.make) queryParams.append("make", payload.make);
      if (payload.model) queryParams.append("model", payload.model);
      if (payload.year) queryParams.append("year", payload.year);
      if (payload.engineCode) queryParams.append("engineCode", payload.engineCode);

      router.push(`/form?${queryParams.toString()}`);
      return;
    }

    const regNumber = payload.regNumber?.trim() ?? "";
    if (!regNumber) {
      setRegistrationLookupError("Please enter your registration number.");
      return;
    }

    setIsRegistrationLookupLoading(true);
    setRegistrationLookupError("");

    try {
      const vehicle = await fetchVehicleRegistration(regNumber);
      const queryParams = new URLSearchParams();
      appendVehicleParams(queryParams, vehicle);
      router.push(`/form?${queryParams.toString()}`);
    } catch (error) {
      setRegistrationLookupError(error instanceof Error ? error.message : "Vehicle lookup failed.");
    } finally {
      setIsRegistrationLookupLoading(false);
    }
  }

  const activeGroup = rowGroups[groupIndex] ?? rowGroups[0];

  return (
    <>
      <style>{`
        @keyframes slideLeftMobile {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideLeftDesktop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mobile-carousel-track {
          animation: slideLeftMobile 30s linear infinite;
        }
        .desktop-carousel-track {
          animation: slideLeftDesktop 40s linear infinite;
        }
                @media (max-width: 767px) {
          .hero-background {
            background-image: none !important;
            background-color: #ffffff !important; /* Fallback to solid white */
          }
        }
      `}</style>
      {/* ─── HERO SECTION ─── */}
      <section
        className="hero-background overflow-hidden pt-8 lg:pt-12"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 25%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.25) 100%), url('/bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container className="max-w-[1400px] px-2 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-10 lg:gap-12 lg:pb-10">

            {/* ── LEFT / MAIN COLUMN ── */}
            <div className="flex flex-col lg:col-span-6">

              {/* Badge */}
              {/* <span className="mb-4 inline-flex w-fit items-center gap-[6px] rounded-full bg-[#0d1b2e] px-[10px] py-[4px] text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                <span className="h-[6px] w-[6px] rounded-full bg-[#15803d]" />
                <span>{data.tag}</span>
              </span> */}

              {/* Heading */}
              <h1
                className="mb-2 text-center leading-[1.1] tracking-[-0.03em] text-[#0d1b2e] lg:text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <span className="block text-[26px] sm:text-[clamp(28px,5vw,48px)] font-extrabold">{data.headingLead}</span>
                <span className="mt-[2px] block text-[clamp(20px,3.5vw,36px)] font-semibold text-[#15803d]">
                  {data.headingAccent}
                </span>
              </h1>

              {/* Green underline — desktop only */}
              <span className="mb-5 hidden h-[3px] w-10 rounded-full bg-[#15803d] lg:block" />

              {/* Subheading */}
              <p
                className="mb-6 text-center text-[16px] leading-[1.6] text-[#6b7280] lg:max-w-[62ch] lg:text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {data.subheading.replace(" - ", " — ")}
              </p>

              {/* ── MOBILE: CTA Card (appears ABOVE brand rows) ── */}
              <div className="mb-5 rounded-[12px] border border-[rgba(13,27,46,0.08)] bg-white p-0 shadow-[0_8px_30px_rgba(13,27,46,0.2)] lg:hidden">
                <CTAPanel
                  registration={registration}
                  onRegistrationChange={setRegistration}
                  onSubmit={openQuoteCheckout}
                  isRegistrationLookupLoading={isRegistrationLookupLoading}
                  registrationLookupError={registrationLookupError}
                  gdprNote={data.gdprNote}
                />
              </div>

              {/* ── MOBILE: "Compare quotes" heading ── */}
              

              {/* Brand rows */}
              <div className="overflow-hidden rounded-[12px] border border-[rgba(13,27,46,0.1)] bg-white shadow-[0_8px_30px_rgba(13,27,46,0.2)]">
                <h3
                className="mb-3 text-[15px] font-bold text-[#0d1b2e] lg:hidden text-center pt-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Compare quotes from vetted specialists
              </h3>
                {activeGroup.map((row) => (
                  <HeroRow key={`${groupIndex}-${row.brand}`} row={row} />
                ))}
              </div>

              {/* Disclaimer */}
              <p
                className="px-1 pb-2 pt-[6px] text-[10px] italic leading-[1.4] text-[#9ca3af]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Prices are indicative rebuilt/reconditioned supply-only averages. Actual quotes vary by variant, year and supplier.
              </p>

              {/* Desktop coverage stats */}
              <p
                className="mb-5 hidden text-center text-[13px] leading-[1.5] text-[#6b7280] lg:block lg:text-left"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Covering <strong className="font-bold text-[#0d1b2e]">8,000+</strong> engine codes across{" "}
                <strong className="font-bold text-[#0d1b2e]">40+</strong> makes — from{" "}
                <strong className="font-bold text-[#0d1b2e]">BMW</strong> and{" "}
                <strong className="font-bold text-[#0d1b2e]">Land Rover</strong> to{" "}
                <strong className="font-bold text-[#0d1b2e]">Ford</strong> and{" "}
                <strong className="font-bold text-[#0d1b2e]">Vauxhall</strong>.
              </p>
            </div>

            {/* ── RIGHT COLUMN — Desktop CTA ── */}
            <div className="relative hidden lg:flex lg:flex-col lg:col-span-4">
              <div className="rounded-[12px] border border-[rgba(13,27,46,0.08)] bg-white shadow-[0_8px_32px_rgba(13,27,46,0.08)]">
                <CTAPanel
                  registration={registration}
                  onRegistrationChange={setRegistration}
                  onSubmit={openQuoteCheckout}
                  isRegistrationLookupLoading={isRegistrationLookupLoading}
                  registrationLookupError={registrationLookupError}
                  gdprNote={data.gdprNote}
                />
              </div>

              {/* Desktop engine ticker strip */}
              {/* <div className="mt-4 h-14 overflow-hidden rounded-[10px] border border-[rgba(13,27,46,0.1)] bg-[#f9fafb]">
                <div className="hero-ticker-track h-14">
                  {engineTickerLoop.map((item, index) => (
                    <div
                      key={`desktop-ticker-${item.brand}-${item.code}-${index}`}
                      className="flex h-14 min-w-[90px] flex-none flex-col items-center justify-center border-r border-[rgba(13,27,46,0.1)] px-4"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-[#0d1b2e] text-white">
                        <EngineTickerIcon />
                      </div>
                      <span className="mt-[2px] whitespace-nowrap text-[9px] font-bold tracking-[0.04em] text-[#0d1b2e]">
                        {item.brand} · {item.code}
                      </span>
                      <span className="whitespace-nowrap text-[9px] font-semibold text-[#15803d]">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── ENGINE CAROUSEL ─── */}
           {/* ─── ENGINE CAROUSEL ─── */}
      <section className="border-t border-[rgba(13,27,46,0.08)] bg-gray-50 py-5">
        
        {/* MOBILE SLIDER - Placed OUTSIDE Container to guarantee 0 left/right padding */}
        <div className="flex items-center gap-3 lg:hidden">
          <div className="overflow-hidden flex-1">
            <div className="mobile-carousel-track flex">
              {[...engineCarouselItems, ...engineCarouselItems].map((item, index) => (
                <div
                  key={`mobile-carousel-${item.code}-${index}`}
                  className="flex items-center gap-2 p-0 min-w-[33.333%] flex-shrink-0"
                >
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px]">
                    <img
                      src={getEngineImagePath(item.code)}
                      alt={`${item.brand} ${item.code} engine`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div className="text-[10px] font-bold leading-tight text-[#0d1b2e]">
                      {item.brand}
                    </div>
                    <div className="text-[9px] text-[#6b7280]">{item.code}</div>
                    <div className="text-[10px] font-bold text-[#15803d]">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP SLIDER - Kept INSIDE Container for proper centering and padding */}
        <Container className="max-w-[1400px] px-2 sm:px-10">
          <div className="hidden items-center gap-3 lg:flex">
            <div className="overflow-hidden flex-1">
              <div className="desktop-carousel-track flex">
                {[...engineCarouselItems, ...engineCarouselItems].map((item, index) => (
                  <div
                    key={`desktop-carousel-${item.code}-${index}`}
                    className="flex items-center gap-2 p-2 min-w-[16.667%] flex-shrink-0"
                  >
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden">
                      <img
                        src={getEngineImagePath(item.code)}
                        alt={`${item.brand} ${item.code} engine`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="whitespace-nowrap text-[13px] font-bold leading-tight text-[#0d1b2e]">
                        {item.brand} {item.code}
                      </div>
                      <div className="whitespace-nowrap text-[11px] text-[#6b7280]">{item.spec}</div>
                      <div className="text-[10px] font-bold text-[#15803d]">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── MOBILE LIVE BAR ─── */}
      {/* <div className="flex h-10 items-center justify-around border-t border-[rgba(13,27,46,0.1)] bg-[#f9fafb] px-3 lg:hidden">
        <div className="flex items-center gap-[5px] text-[11px] font-bold text-[#15803d]">
          <span className="h-[6px] w-[6px] rounded-full bg-[#15803d]" />
          LIVE
        </div>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">8,000+ Engine Codes</span>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">40+ Car Brands</span>
        <span className="h-4 w-px bg-[rgba(13,27,46,0.15)]" />
        <span className="text-[11px] font-semibold text-[#0d1b2e]">100% Free · No Obligation</span>
      </div> */}

      {/* ─── BOTTOM DARK BAR ─── */}
      <div className="bg-[#0d1b2e]">
        {/* Desktop: scrolling ticker */}
        <div className="hidden h-14 items-center overflow-hidden lg:flex">
          <Container className="max-w-[1400px] px-10">
            <div className="hero-ticker-track h-14" style={{ animationDuration: "32s" }}>
              {bottomTickerLoop.map((item, index) => (
                <span
                  key={`desktop-bottom-ticker-${index}`}
                  className="flex h-14 flex-none items-center gap-[10px] border-r border-r-white/10 px-6 text-[12px] leading-[1.4] text-white/80"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <BottomBarIcon type={item.icon} />
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </Container>
        </div>

        {/* Mobile: scrolling ticker */}
        <div className="flex h-12 items-center overflow-hidden lg:hidden">
          <div className="hero-ticker-track h-12" style={{ animationDuration: "45s" }}>
            {bottomTickerLoop.map((item, index) => (
              <span
                key={`bottom-ticker-${index}`}
                className="flex h-12 flex-none items-center gap-[8px] border-r border-r-white/10 px-5 text-[12px] text-white/80"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <BottomBarIcon type={item.icon} />
                <span>{item.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
