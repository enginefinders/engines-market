"use client";

import { useMemo, useState } from "react";
import type React from "react";
import type { FuelTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: FuelTypesData;
  bgImage?: string;
  engineLinks?: unknown;
  strictData?: boolean;
  documentMode?: boolean;
};

type FuelItem = FuelTypesData["items"][number];
type FuelKind = "diesel" | "petrol" | "hybrid" | "electric";
type IconName =
  | "balance"
  | "bars"
  | "bolt"
  | "calendar"
  | "car"
  | "cube"
  | "engine"
  | "fuel"
  | "gauge"
  | "list"
  | "plug"
  | "pound"
  | "shield"
  | "star"
  | "user"
  | "warning";

const SITE_BLUE = "#06265a";
const SITE_BLUE_DARK = "#061a33";
const SITE_BLUE_BRIGHT = "#0d4edb";
const ENGINE_IMAGE = "/images/engines/fac66331-c94d-48e9-983a-7997fd84a619_removalai_preview.webp";

const fuelStyles: Record<
  FuelKind,
  {
    name: string;
    subtitle: string;
    color: string;
    soft: string;
    vehicle: string;
    icon: IconName;
  }
> = {
  diesel: {
    name: "Diesel Engines",
    subtitle: "The Motorway Workhorse",
    color: "#08784a",
    soft: "#eef8f1",
    vehicle: "/images/brands/bmw/models/bmw-1-series-model-card.png",
    icon: "fuel",
  },
  petrol: {
    name: "Petrol Engines",
    subtitle: "Performance & Refinement",
    color: SITE_BLUE_BRIGHT,
    soft: "#eef4ff",
    vehicle: "/images/brands/bmw/models/bmw-2-series-model-card.png",
    icon: "fuel",
  },
  hybrid: {
    name: "Hybrid (PHEV)",
    subtitle: "The Electrified Balance",
    color: "#6d28d9",
    soft: "#f4ecff",
    vehicle: "/images/brands/bmw/models/bmw-i-series-model-card.png",
    icon: "bolt",
  },
  electric: {
    name: "Electric (BEV)",
    subtitle: "The Future of Driving",
    color: "#087ea4",
    soft: "#e9f8ff",
    vehicle: "/images/brands/bmw/models/bmw-i-series-model-card.png",
    icon: "plug",
  },
};

const fallbackItems: Record<FuelKind, FuelItem> = {
  diesel: {
    title: "Diesel Engines",
    description: "Excellent fuel economy, strong torque and proven long-distance durability.",
    descriptor:
      "Diesel engines remain a strong choice for motorway commuters and high-mileage drivers, especially where torque and fuel economy matter most.",
    families: ["Typical replacement cost: \u00A31,500 - \u00A34,000"],
    foundIn: ["1 Series", "3 Series", "5 Series", "X models"],
    knownFor: ["Timing chain wear", "DPF and AdBlue issues", "EGR cooler leaks"],
    typicalModels: ["BMW 1 Series", "BMW 3 Series", "BMW X5"],
    importantNotes: ["Best for long-distance driving"],
    cta: "Get quotes for Diesel engines",
  },
  petrol: {
    title: "Petrol Engines",
    description: "Smooth and quiet performance with lower maintenance needs.",
    descriptor:
      "Petrol engines suit lower-mileage drivers, city use and performance-focused models where refinement and responsive power delivery matter.",
    families: ["Typical replacement cost: \u00A31,500 - \u00A33,800"],
    foundIn: ["1 Series", "3 Series", "M models"],
    knownFor: ["Timing chain guide wear", "Coolant housing leaks", "High pressure fuel pump faults"],
    typicalModels: ["BMW 1 Series", "BMW 2 Series", "BMW M models"],
    importantNotes: ["Best for city and short trips"],
    cta: "Get quotes for Petrol engines",
  },
  hybrid: {
    title: "Hybrid (PHEV)",
    description: "Electric assistance with petrol efficiency for mixed driving.",
    descriptor:
      "Hybrid engines combine a combustion engine with an electric drive system, reducing urban running costs while keeping petrol flexibility.",
    families: ["Typical replacement cost: \u00A32,500 - \u00A34,500 + battery"],
    foundIn: ["PHEV models"],
    knownFor: ["Battery degradation", "Thermal shock wear", "Electric water pump failure"],
    typicalModels: ["BMW 330e", "BMW 530e", "BMW X5 xDrive45e"],
    importantNotes: ["Best for company car users"],
    cta: "Get quotes for Hybrid engines",
  },
  electric: {
    title: "Electric (BEV)",
    description: "Zero tailpipe emissions with low routine maintenance.",
    descriptor:
      "Electric drivetrains remove many combustion-engine service items, though drive units, battery modules and charging systems still need specialist checks.",
    families: ["Typical replacement cost: \u00A32,500 - \u00A35,000 + battery"],
    foundIn: ["BEV models"],
    knownFor: ["Battery module degradation", "Onboard charger failure", "Electric motor bearing wear"],
    typicalModels: ["BMW i3", "BMW i4", "BMW iX"],
    importantNotes: ["Best for low-maintenance city drivers"],
    cta: "Get quotes for Electric engines",
  },
};

function clean(text?: string) {
  return (text ?? "")
    .replace(/Ã‚Â£|Ãƒâ€šÃ‚Â£|Â£/g, "\u00A3")
    .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€|Ã¢â‚¬â€˜|â€“|â€”/g, "-")
    .replace(/Ã¢â‚¬â„¢/g, "'")
    .replace(/Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"')
    .replace(/Ã‚Â·|Ãƒâ€šÃ‚Â·|Â·/g, "·")
    .replace(/\s+/g, " ")
    .trim();
}

function brandFromHeading(data: FuelTypesData) {
  const source = clean(data.h2 || data.tag);
  return source.split(/\s+/)[0] || "BMW";
}

function kindFromTitle(title: string): FuelKind {
  if (/petrol/i.test(title)) return "petrol";
  if (/hybrid|phev|mhev/i.test(title)) return "hybrid";
  if (/electric|bev/i.test(title)) return "electric";
  return "diesel";
}

function orderedItems(items: FuelItem[]) {
  const byKind = new Map<FuelKind, FuelItem>();
  items.forEach((item) => byKind.set(kindFromTitle(item.title), item));
  return (["diesel", "petrol", "hybrid", "electric"] as FuelKind[]).map((kind) => byKind.get(kind) ?? fallbackItems[kind]);
}

function priceFor(item: FuelItem, kind: FuelKind) {
  const source = [...(item.families ?? []), item.description, item.descriptor].join(" ");
  const match = clean(source).match(/\u00A3[\d,]+\s*-\s*\u00A3[\d,]+/);
  if (match) return match[0].replace(/\s*-\s*/g, " - ");
  if (kind === "petrol") return "\u00A31,500 - \u00A33,800";
  if (kind === "hybrid") return "\u00A32,500 - \u00A34,500 + \u00A33,000 - \u00A38,000 battery";
  if (kind === "electric") return "\u00A32,500 - \u00A35,000 + \u00A35,000 - \u00A312,000 battery";
  return "\u00A31,500 - \u00A34,000";
}

function mpgFor(kind: FuelKind) {
  if (kind === "petrol") return "30 - 50 mpg";
  if (kind === "hybrid") return "30 - 60 mpg + electric";
  if (kind === "electric") return "120 - 300 miles";
  return "45 - 65 mpg";
}

function commonIssues(item: FuelItem) {
  const notes = [...(item.knownFor ?? []), ...(item.importantNotes ?? [])].map(clean).filter(Boolean);
  return notes.length ? notes.slice(0, 3) : ["Timing chain wear", "Cooling system leaks", "Turbo and EGR issues"];
}

function benefits(item: FuelItem, kind: FuelKind) {
  const source = [...(item.foundIn ?? []), ...(item.typicalModels ?? []), ...commonIssues(item)]
    .map(clean)
    .filter(Boolean)
    .slice(0, 4);
  if (source.length >= 4) return source;
  if (kind === "petrol") return ["Smooth and quiet performance", "Lower maintenance needs", "Wide range of power options", "Great for city and short trips"];
  if (kind === "hybrid") return ["Lower running costs", "Electric plus petrol efficiency", "20-40 miles electric range", "Ideal for company car drivers"];
  if (kind === "electric") return ["Zero emissions", "Low running and maintenance", "120-300 miles real-world range", "Perfect for city and daily use"];
  return ["Excellent fuel economy", "Strong torque and durability", "Ideal for long-distance driving", "Proven reliability"];
}

function bestFor(kind: FuelKind) {
  if (kind === "petrol") return "Lower-mileage drivers and performance users";
  if (kind === "hybrid") return "Company car users and urban drivers";
  if (kind === "electric") return "Low-maintenance city drivers";
  return "Motorway commuters and high-mileage drivers";
}

function engineImage(bgImage?: string) {
  if (!bgImage || /fuel-types-bg|engine-codes-bg/i.test(bgImage)) return ENGINE_IMAGE;
  return bgImage;
}

function SvgIcon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const common = { stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {name === "balance" && (
        <>
          <path {...common} d="M12 3v18M5 7h14M6 7l-3 6h6L6 7Zm12 0-3 6h6l-3-6Z" />
          <path {...common} d="M8 21h8" />
        </>
      )}
      {name === "bars" && (
        <>
          <path {...common} d="M5 19V9M12 19V5M19 19v-7" />
          <path {...common} d="M3 19h18" />
        </>
      )}
      {name === "bolt" && <path {...common} d="m13 2-8 12h6l-1 8 9-13h-6l1-7Z" />}
      {name === "calendar" && (
        <>
          <path {...common} d="M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
          <path {...common} d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01" />
        </>
      )}
      {name === "car" && (
        <>
          <path {...common} d="m5 12 1.5-4h11L19 12M4 12h16v5H4v-5Z" />
          <path {...common} d="M7 17v2M17 17v2M7 15h.01M17 15h.01" />
        </>
      )}
      {name === "cube" && (
        <>
          <path {...common} d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path {...common} d="M12 12 4 7.5M12 12l8-4.5M12 12v9" />
        </>
      )}
      {name === "engine" && (
        <>
          <path {...common} d="M8 7h5l2 2h2v3h2v5h-3l-2 2H7v-3H4v-5h3V9h1V7Z" />
          <path {...common} d="M9 4h5M11 4v3" />
        </>
      )}
      {name === "fuel" && (
        <>
          <path {...common} d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
          <path {...common} d="M4 21h12M8 7h4M15 7l3 3v7a2 2 0 1 0 4 0v-5l-3-3" />
        </>
      )}
      {name === "gauge" && (
        <>
          <path {...common} d="M4 14a8 8 0 0 1 16 0" />
          <path {...common} d="m12 14 4-4" />
          <path {...common} d="M6 18h12" />
        </>
      )}
      {name === "list" && (
        <>
          <path {...common} d="M8 6h12M8 12h12M8 18h12" />
          <path {...common} d="M4 6h.01M4 12h.01M4 18h.01" />
        </>
      )}
      {name === "plug" && (
        <>
          <path {...common} d="M9 3v6M15 3v6M7 9h10v4a5 5 0 0 1-10 0V9Z" />
          <path {...common} d="M12 18v3" />
        </>
      )}
      {name === "pound" && <path {...common} d="M17 19H7c2-2 3-4 2-8a5 5 0 0 1 9-3M6 12h8" />}
      {name === "shield" && <path {...common} d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />}
      {name === "star" && <path {...common} d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L6.8 19l1-5.8-4.2-4.1 5.8-.8L12 3Z" />}
      {name === "user" && (
        <>
          <path {...common} d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path {...common} d="M4 21a8 8 0 0 1 16 0" />
        </>
      )}
      {name === "warning" && (
        <>
          <path {...common} d="m12 3 10 18H2L12 3Z" />
          <path {...common} d="M12 9v5M12 17h.01" />
        </>
      )}
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true" style={{ color }}>
      <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBubble({ icon, color, className = "" }: { icon: IconName; color: string; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full text-white shadow-[0_10px_22px_rgba(6,26,51,0.1)] ${className || "h-12 w-12"}`}
      style={{ backgroundColor: color }}
    >
      <SvgIcon name={icon} className="h-6 w-6" />
    </span>
  );
}

function FuelBadge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-bold" style={{ color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </span>
  );
}

function InfoIcon({ icon }: { icon: IconName }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#071f48] text-white shadow-[0_8px_18px_rgba(6,26,51,0.1)]">
      <SvgIcon name={icon} className="h-5 w-5" />
    </span>
  );
}

function FuelCard({
  item,
  active,
  onClick,
}: {
  item: FuelItem;
  active: boolean;
  onClick: () => void;
}) {
  const kind = kindFromTitle(item.title);
  const style = fuelStyles[kind];
  const price = priceFor(item, kind);
  const label = style.name.replace(" Engines", "");

  return (
    <article
      className="rounded-[10px] border bg-white p-4 shadow-[0_10px_22px_rgba(6,26,51,0.055)] transition"
      style={{ borderColor: active ? style.color : "#dce6f2" }}
    >
      <button type="button" onClick={onClick} className="flex w-full items-start justify-between gap-2 text-left">
        <span className="flex items-start gap-2.5">
          <IconBubble icon={style.icon} color={style.color} className="h-10 w-10" />
          <span>
            <span className="block font-['Manrope'] text-[17px] font-black uppercase leading-none" style={{ color: style.color }}>
              {style.name}
            </span>
            <span className="mt-0.5 block text-[11px] font-bold text-[#28354b]">{style.subtitle}</span>
          </span>
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[color:var(--fuel)]" style={{ "--fuel": style.color, borderColor: `${style.color}55` } as React.CSSProperties}>
          <Chevron open={active} />
        </span>
      </button>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_110px] items-center gap-2">
        <ul className="space-y-1.5 text-[11px] font-semibold leading-snug text-[#061a33]">
          {benefits(item, kind).map((note) => (
            <li key={note} className="flex gap-1.5">
              <CheckIcon color={style.color} />
              <span>{note}</span>
            </li>
          ))}
        </ul>
        <img src={style.vehicle} alt="" className="h-[86px] w-full object-contain" loading="lazy" />
      </div>

      <div className="mt-3 rounded-[8px] px-2.5 py-2 text-center" style={{ backgroundColor: style.soft }}>
        <p className="text-[9px] font-black uppercase tracking-[0.07em] text-[#061a33]">Avg. replacement cost (supply only)</p>
        <p className="mt-0.5 font-['Manrope'] text-[18px] font-black leading-tight" style={{ color: style.color }}>{price}</p>
      </div>

      <a href="#quote-form" data-quote-context={item.title} className="mt-2.5 flex items-center justify-center gap-2 rounded-[7px] px-3 py-2 text-[12px] font-bold text-white" style={{ backgroundColor: style.color }}>
        Get quotes for {label} engines <Arrow />
      </a>

      <button type="button" onClick={onClick} className="mt-2 flex w-full items-center justify-center gap-2 rounded-[7px] border px-3 py-2 text-[12px] font-bold" style={{ borderColor: style.color, color: style.color }}>
        Learn more about {label} engines <Chevron open={active} />
      </button>
    </article>
  );
}

function DetailPanel({ brand, item, bgImage }: { brand: string; item: FuelItem; bgImage?: string }) {
  const kind = kindFromTitle(item.title);
  const style = fuelStyles[kind];
  const label = style.name.replace(" Engines", "");
  const accordions: Array<{ title: string; icon: IconName; body: string }> = [
    { title: `How ${brand} ${label} Engines Work`, icon: "engine", body: clean(item.description) },
    { title: "Real-World MPG (Brand-Wide)", icon: "gauge", body: `${mpgFor(kind)} is typical, depending on model, usage, maintenance and engine code.` },
    { title: `Common ${brand} ${label} Issues`, icon: "warning", body: commonIssues(item).join(", ") },
    { title: `Which ${brand} Models Use ${label} Engines`, icon: "car", body: (item.typicalModels ?? item.foundIn ?? []).map(clean).filter(Boolean).join(", ") || "Model availability varies by year and trim." },
    { title: `Average ${label} Replacement Cost`, icon: "pound", body: `${priceFor(item, kind)} supply-only. Fitting varies by vehicle and workshop location.` },
    { title: `Who Should Choose ${label}?`, icon: "user", body: bestFor(kind) },
  ];

  return (
    <div className="relative rounded-[10px] border bg-[#fbfffc] p-4 shadow-[0_10px_24px_rgba(6,26,51,0.05)]" style={{ borderColor: `${style.color}80` }}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px_220px] lg:items-start">
        <div>
          <h3 className="font-['Manrope'] text-[24px] font-black leading-tight" style={{ color: style.color }}>
            {brand} {style.name} - {style.subtitle}
          </h3>
          <p className="mt-3 max-w-[690px] text-[13px] leading-[1.65] text-[#112844]">
            {clean(item.descriptor || item.description)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[12px] lg:block lg:space-y-2">
          <FuelBadge color={style.color}>110 - 170 hp</FuelBadge>
          <FuelBadge color={style.color}>{label}</FuelBadge>
          <FuelBadge color={style.color}>UK supply options</FuelBadge>
          <FuelBadge color={style.color}>2008 - present</FuelBadge>
        </div>
        <div className="relative min-h-[120px]">
          <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,rgba(13,78,219,0.12)_0_1px,transparent_1px_28px)]" />
          <img src={engineImage(bgImage)} alt="" className="relative z-[1] h-[125px] w-full object-contain" loading="lazy" />
        </div>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {accordions.map((accordion) => (
          <details key={accordion.title} className="group rounded-[8px] border border-[#e0e8f2] bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 font-bold text-[#06265a]">
              <span className="inline-flex items-center gap-2">
                <SvgIcon name={accordion.icon} className="h-5 w-5 text-[#0b2b63]" />
                <span className="text-[13px]">{accordion.title}</span>
              </span>
              <Chevron />
            </summary>
            <div className="border-t border-[#edf2f7] px-3 py-2.5 text-[12px] leading-[1.55] text-slate-700">
              {accordion.body}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-4 rounded-[10px] border border-[#d9e8de] bg-white p-3">
        <p className="flex items-center gap-2 font-bold text-[#061a33]">
          <SvgIcon name="list" className="h-5 w-5 text-[#06265a]" />
          Typical {label} search queries
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[`${brand} ${label} engine replacement`, `${brand} ${label} engine price`, `${brand} ${label} rebuild`, `${brand} ${label} specialist UK`].map((chip) => (
            <span key={chip} className="rounded-full border px-3 py-1.5 text-[12px] font-semibold" style={{ borderColor: `${style.color}88`, color: style.color }}>
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <a href="#quote-form" className="flex items-center justify-center gap-2 rounded-[7px] px-4 py-2.5 text-[13px] font-bold text-white" style={{ backgroundColor: style.color }}>
            Get quotes for {brand} {label} replacement engines <Arrow />
          </a>
          <a href="#quote-form" className="flex items-center justify-center gap-2 rounded-[7px] border px-4 py-2.5 text-[13px] font-bold" style={{ borderColor: style.color, color: style.color }}>
            Not sure which fuel you have? <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

function normalizeText(text = "") {
  return text.replace(/Â·/g, "·").replace(/Â£/g, "£").replace(/[Ã¢â‚¬â€œÃ¢â‚¬â€]/g, "-");
}

function ModelFuelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M7 3h8v18H7V3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7h4" stroke="currentColor" strokeWidth="2" />
      <path d="M15 8h2l3 3v7a2 2 0 0 1-4 0v-3h-1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return <img src="/icons/engine-market/light-green-not-sure-circle.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" loading="lazy" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getModelTabLabel(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("diesel")) return "Diesel";
  if (normalized.includes("petrol")) return "Petrol";
  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) return "MHEV";
  if (normalized.includes("plug-in") || normalized.includes("phev")) return "PHEV";
  if (normalized.includes("electric")) return "Electric";
  return title;
}

function getModelTabKind(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("diesel")) return "diesel";
  if (normalized.includes("petrol")) return "petrol";
  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) return "mhev";
  if (normalized.includes("plug-in") || normalized.includes("phev")) return "phev";
  if (normalized.includes("electric")) return "electric";
  return "other";
}

function ModelTabFuelIcon({ kind }: { kind: ReturnType<typeof getModelTabKind> }) {
  if (kind === "petrol") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "mhev" || kind === "phev" || kind === "electric") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 15 17 18 14 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="18" x2="9" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "diesel") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 7V5h8v2M6 10h2M16 10h2M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

function splitDashItem(entry: string) {
  const parts = normalizeText(entry).split(" - ");
  if (parts.length < 2) {
    return { title: normalizeText(entry), detail: "" };
  }

  return {
    title: parts[0],
    detail: parts.slice(1).join(" - "),
  };
}

function splitFamilyEntry(entry: string) {
  const normalized = normalizeText(entry);
  const [left, ...rest] = normalized.split(" - ");

  return {
    code: left?.trim() ?? normalized,
    detail: rest.join(" - ").trim(),
  };
}

function deriveFamiliesLabel(title: string) {
  const normalized = normalizeText(title).trim();
  const base = normalized.replace(/\s+Engines$/i, "").trim();
  return base ? `Common ${base} Engine Families` : "";
}

function resolveSectionLabel({
  itemLabel,
  uiLabel,
  strictData,
  fallback,
}: {
  itemLabel?: string;
  uiLabel?: string;
  strictData: boolean;
  fallback: string;
}) {
  const label = itemLabel?.trim() || uiLabel?.trim();
  if (label) return label;
  return strictData ? "" : fallback;
}

function ModelFuelPanel({
  item,
  ui,
  strictData = false,
}: {
  item: FuelItem;
  ui: NonNullable<FuelTypesData["ui"]>;
  strictData?: boolean;
}) {
  const families = item.families ?? [];
  const foundIn = item.foundIn ?? [];
  const knownFor = item.knownFor ?? [];
  const typicalModels = item.typicalModels ?? [];
  const importantNotes = item.importantNotes ?? [];
  const familiesLabel = resolveSectionLabel({
    itemLabel: item.familiesLabel || deriveFamiliesLabel(item.title),
    uiLabel: ui.familiesLabel,
    strictData,
    fallback: "Common Engine Families",
  });
  const foundInLabel = resolveSectionLabel({
    itemLabel: item.foundInLabel,
    uiLabel: ui.foundInLabel,
    strictData,
    fallback: "Found In",
  });
  const knownForLabel = resolveSectionLabel({
    itemLabel: item.knownForLabel,
    uiLabel: ui.knownForLabel,
    strictData,
    fallback: "Known For",
  });
  const modelsLabel = resolveSectionLabel({
    itemLabel: item.modelsLabel,
    uiLabel: ui.modelsLabel,
    strictData,
    fallback: "Typical Models (UK)",
  });
  const notesLabel = resolveSectionLabel({
    itemLabel: item.notesLabel,
    uiLabel: ui.notesLabel,
    strictData,
    fallback: "Important Notes",
  });

  return (
    <div className="flex h-full flex-col rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_2px_10px_rgba(13,27,46,0.05)]">
      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="text-[12px] leading-[1.7] text-[#475569]">
          {normalizeText(item.descriptor || item.description)}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {families.length ? (
            <div className="rounded-[10px] bg-white">
              {familiesLabel ? (
                <div className="px-1 pb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#2a6dd6]">
                  {familiesLabel}
                </div>
              ) : null}
              <div className="overflow-hidden rounded-[10px] bg-white">
                <div className="divide-y divide-[#e9eef5]">
                  {families.map((entry) => {
                    const parsed = splitFamilyEntry(entry);
                    return (
                      <div key={entry} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 px-1 py-3 text-[11.5px] leading-[1.55]">
                        <div className="font-extrabold text-[#0d1b2e]">{parsed.code}</div>
                        <div className="text-[#64748b]">{parsed.detail || parsed.code}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {foundIn.length ? (
            <div className="rounded-[10px] bg-white md:border-l md:border-[#eef2f7] md:pl-5">
              {foundInLabel ? (
                <div className="px-1 pb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#2a6dd6]">
                  {foundInLabel}
                </div>
              ) : null}
              <div className="overflow-hidden rounded-[10px] bg-white">
                <div className="divide-y divide-[#e9eef5]">
                  {foundIn.map((entry) => {
                    const parsed = splitDashItem(entry);
                    return (
                      <div key={entry} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-1 py-3 text-[11.5px] leading-[1.55]">
                        <div className="font-extrabold text-[#0d1b2e]">{parsed.title}</div>
                        <div className="text-[#64748b]">{parsed.detail || parsed.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {knownFor.length ? (
            <div className="rounded-[10px] bg-white">
              {knownForLabel ? (
                <div className="px-1 pb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#2a6dd6]">
                  {knownForLabel}
                </div>
              ) : null}
              <div className="overflow-hidden rounded-[10px] bg-white">
                <div className="divide-y divide-[#e9eef5]">
                  {knownFor.map((entry) => (
                    <div key={entry} className="px-1 py-3 text-[11.5px] leading-[1.6] text-[#64748b]">
                      {normalizeText(entry)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {typicalModels.length ? (
            <div className="rounded-[10px] bg-white md:border-l md:border-[#eef2f7] md:pl-5">
              {modelsLabel ? (
                <div className="px-1 pb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#2a6dd6]">
                  {modelsLabel}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3 px-1 py-1">
                {typicalModels.map((entry) => (
                  <span
                    key={entry}
                    className="inline-flex rounded-[10px] border border-[#2D6BFF] bg-white px-3 py-2 text-[11px] font-bold leading-[1.35] text-[#1D4ED8] shadow-[0_0_0_1px_rgba(45,107,255,0.18),0_0_10px_rgba(45,107,255,0.18)]"
                  >
                    {normalizeText(entry)}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {item.cta ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[10px] border border-green-400 bg-white px-4 py-3 shadow-md shadow-green-400/30">
            <a
              href="#quote-form"
              data-quote-context={item.title}
              data-quote-source="fuel-types"
              className="inline-flex min-w-0 items-center gap-2 text-[11.5px] font-bold leading-[1.45] text-[#0d1b2e]"
            >
              <span className="truncate">{normalizeText(item.cta).replace(/\s*->\s*$/, "")}</span>
            </a>
            <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[8px] bg-[#16a34a] text-white">
              <ArrowIcon />
            </span>
          </div>
        ) : null}

        {importantNotes.length ? (
          <div className="mt-4 rounded-[10px] bg-white">
            {notesLabel ? (
              <div className="px-1 pb-2 text-[10px] font-black uppercase tracking-[0.08em] text-[#2a6dd6]">
                {notesLabel}
              </div>
            ) : null}
            <div className="overflow-hidden rounded-[10px] bg-white">
              <div className="divide-y divide-[#e9eef5]">
                {importantNotes.map((entry) => (
                  <div key={entry} className="px-1 py-3 text-[11.5px] leading-[1.6] text-[#64748b]">
                    {normalizeText(entry)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-auto" />
      </div>
    </div>
  );
}

function ModelFuelTypesContent({ data, bgImage, strictData = false, documentMode = false }: Props) {
  const items = data.items ?? [];
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const mobileTabRailClass = "mt-6 max-[720px]:mx-[-16px]";
  const activeItem = items[activeItemIndex] ?? items[0] ?? null;
  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const ui = data.ui ?? {};

  return (
    <Section className={documentMode ? "relative overflow-hidden bg-white !py-[20px] md:!py-[24px] lg:!py-[28px]" : "relative overflow-hidden bg-white"}>
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 hidden h-[260px] w-[360px] opacity-[0.1] lg:block"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.82)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className={documentMode ? "max-w-[1400px] px-0 sm:px-0 lg:px-0" : ""}>
        <div className="relative z-[1]">
          <p className="section-pill">{data.tag}</p>

          <div className="mt-3">
            <div className="max-w-[760px]">
              <h2 className="text-[26px] font-extrabold leading-[1.16] tracking-[-0.5px] text-[#0d1b2e] md:text-[30px] lg:text-[34px]">
                {headingLines.map((line, index) => (
                  <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-3 max-w-[760px] text-[12.5px] leading-[1.7] text-slate-600 lg:text-[13px]">
                {normalizeText(data.intro)}
              </p>
            </div>

            {items.length > 1 && (
              <div className={mobileTabRailClass}>
                <div className="overflow-hidden rounded-[6px] border border-[#d9e1ea] bg-white shadow-[0_4px_12px_rgba(13,27,46,0.05)] max-[720px]:rounded-none max-[720px]:border-x-0">
                  <div className="flex items-stretch divide-x divide-[#d9e1ea]">
                    {items.map((item, index) => {
                      const isActive = index === activeItemIndex;
                      const fuelType = getModelTabLabel(item.title);
                      const fuelKind = getModelTabKind(item.title);

                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setActiveItemIndex(index)}
                          className={`relative flex min-h-[42px] basis-0 flex-1 items-center justify-center px-2 py-[10px] font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.02em] transition-all duration-200 md:min-h-[44px] md:px-4 md:py-[11px] md:text-[12px] ${
                            isActive
                              ? "z-10 bg-[linear-gradient(180deg,#173a6d_0%,#0c213f_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(6,18,35,0.85),0_0_0_1px_rgba(45,107,255,0.45),0_0_20px_rgba(45,107,255,0.45),0_8px_18px_rgba(17,47,95,0.32)] before:absolute before:inset-x-0 before:top-0 before:h-[42%] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] before:content-['']"
                              : "bg-white text-[#22324a] shadow-none hover:bg-[#f8fafc]"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            <ModelTabFuelIcon kind={fuelKind} />
                            <span>{fuelType.toUpperCase()}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {activeItem && items.length ? (
          <div className="mt-6">
            <ModelFuelPanel item={activeItem} ui={ui} strictData={strictData} />
          </div>
        ) : (
          <div className="mt-6 rounded-[14px] border border-slate-200 bg-white px-5 py-5 shadow-[0_2px_10px_rgba(13,27,46,0.04)]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0d1b2e] text-white">
                <ModelFuelIcon />
              </span>
              <div>
                <div role="heading" aria-level={3} className="font-['Manrope'] text-[16px] font-extrabold leading-[1.2] text-[#0d1b2e]">
                  {strictData ? (ui.emptyStateTitle || "") : (ui.emptyStateTitle ?? "Fuel type guidance")}
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-slate-600">
                  {normalizeText(data.intro)}
                </p>
                <p className="mt-3 text-[12px] leading-[1.65] text-slate-500">
                  {strictData
                    ? (ui.emptyStateDescription || "")
                    : (ui.emptyStateDescription ??
                      "Detailed fuel-type content is being standardised across all brand pages. You can still use the registration form above to identify the correct engine and matching replacement options.")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-[12px] border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_6px_rgba(13,27,46,0.04)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-50 text-green-700">
                <ShieldCheckIcon />
              </span>
              <p className="text-[12px] leading-[1.65] text-slate-500 lg:text-[12.5px]">
                {normalizeText(data.closing)}
              </p>
            </div>

            {strictData ? (
              ui.closingButtonText ? (
                <a
                  href="#quote-form"
                  data-quote-context="Fuel type finder"
                  data-quote-source="fuel-types-summary"
                  className="hidden flex-none items-center gap-2 rounded-[9px] border border-[#0d1b2e] bg-white px-4 py-3 text-[11.5px] font-bold text-[#0d1b2e] lg:inline-flex"
                >
                  <span>{ui.closingButtonText}</span>
                  <ArrowIcon />
                </a>
              ) : null
            ) : (
              <a
                href="#quote-form"
                data-quote-context="Fuel type finder"
                data-quote-source="fuel-types-summary"
                className="hidden flex-none items-center gap-2 rounded-[9px] border border-[#0d1b2e] bg-white px-4 py-3 text-[11.5px] font-bold text-[#0d1b2e] lg:inline-flex"
              >
                <span>{ui.closingButtonText ?? "Find my engine"}</span>
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BrandFuelTypesContent({ data, bgImage }: Props) {
  const brand = brandFromHeading(data);
  const items = useMemo(() => orderedItems(data.items ?? []), [data.items]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  if (!items.length) return null;

  return (
    <Section id="brand-fuel-types" className="relative overflow-hidden bg-white !py-0">
      <Container className="max-w-[1450px] px-4 py-7 sm:px-5 lg:px-6 lg:py-9">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0c3fa6,#07316f)] px-4 py-2 text-[12px] font-black uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(13,78,219,0.2)]">
              <SvgIcon name="balance" className="h-4 w-4" />
              {brand} Engines by Fuel Type
            </div>
            <h2 className="mt-5 max-w-[760px] font-['Manrope'] text-[34px] font-black leading-[1.08] tracking-[-1px] text-[#061a33] sm:text-[42px] lg:text-[52px]">
              {brand} Diesel vs Petrol vs Hybrid vs Electric - <span className="text-[#08784a]">Which Fuel Type Is Right For You?</span>
            </h2>
            <p className="mt-4 max-w-[700px] text-[15px] leading-[1.65] text-[#112844]">
              Compare {brand} engine fuel types by replacement costs, running costs, reliability reputation, and model availability. Use this guide to understand your options, then enter your registration for an instant match.
            </p>
          </div>
          <div className="relative min-h-[220px]">
            <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle,rgba(13,78,219,0.15)_0_1px,transparent_1px_38px)]" />
            <img src={engineImage(bgImage)} alt="" className="relative z-[1] h-[245px] w-full object-contain drop-shadow-[0_18px_28px_rgba(6,26,51,0.18)] lg:h-[315px]" loading="lazy" />
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-[10px] border border-[#d8e4f2] bg-white shadow-[0_10px_24px_rgba(6,26,51,0.07)]">
          <div className="flex items-center gap-3 bg-[linear-gradient(135deg,#061a33,#07316f)] px-5 py-3 text-white">
            <SvgIcon name="balance" className="h-6 w-6" />
            <p className="font-['Manrope'] text-[17px] font-black uppercase">Quick comparison: {brand} diesel, petrol, hybrid & electric</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-center">
              <thead>
                <tr className="text-[11px] font-black uppercase tracking-[0.04em] text-[#06265a]">
                  <th className="border-b border-r border-[#e4ebf4] px-3 py-3">Fuel type</th>
                  <th className="border-b border-r border-[#e4ebf4] px-3 py-3">Avg. replacement cost</th>
                  <th className="border-b border-r border-[#e4ebf4] px-3 py-3">Typical MPG / range</th>
                  <th className="border-b border-r border-[#e4ebf4] px-3 py-3">Common issues</th>
                  <th className="border-b border-[#e4ebf4] px-3 py-3">Best for</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const kind = kindFromTitle(item.title);
                  const style = fuelStyles[kind];
                  return (
                    <tr key={item.title} className="text-[13px] text-[#061a33]">
                      <td className="border-r border-t border-[#e4ebf4] px-3 py-4 text-left">
                        <span className="mx-auto grid min-w-[132px] grid-cols-[36px_minmax(0,1fr)] items-center gap-3 font-black leading-tight" style={{ color: style.color }}>
                          <IconBubble icon={style.icon} color={style.color} className="h-9 w-9" />
                          <span>{style.name.replace(" Engines", "")}</span>
                        </span>
                      </td>
                      <td className="border-r border-t border-[#e4ebf4] px-3 py-4 font-black" style={{ color: style.color }}>{priceFor(item, kind)}</td>
                      <td className="border-r border-t border-[#e4ebf4] px-3 py-4 font-bold">{mpgFor(kind)}</td>
                      <td className="border-r border-t border-[#e4ebf4] px-3 py-4 text-left">
                        <ul className="list-disc space-y-1 pl-4">{commonIssues(item).map((issue) => <li key={issue}>{issue}</li>)}</ul>
                      </td>
                      <td className="border-t border-[#e4ebf4] px-3 py-4 font-bold">{bestFor(kind)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {[
            { icon: "bolt" as const, title: "Labour / Installation Notes", body: "Hybrid and electric vehicles may require specialist safety training. Always ensure the quote includes labour and safety checks." },
            { icon: "star" as const, title: "Performance / Model Premium", body: "High-output models command a premium due to specialist components, lower supply volumes and more complex fitting." },
            { icon: "bars" as const, title: "Running Cost Comparison", body: "Diesel can suit motorway mileage, petrol often suits shorter trips, and hybrid or electric value depends on charging habits." },
          ].map((card) => (
            <div key={card.title} className="flex gap-3 rounded-[10px] border border-[#e0e8f2] bg-white p-4 shadow-[0_8px_18px_rgba(6,26,51,0.045)]">
              <InfoIcon icon={card.icon} />
              <div>
                <h3 className="font-['Manrope'] text-[12px] font-black uppercase text-[#06265a]">{card.title}</h3>
                <p className="mt-1.5 text-[11px] leading-[1.55] text-[#112844]">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const active = activeIndex === index;
            const activeStyle = fuelStyles[kindFromTitle(item.title)];

            return (
              <div key={`${item.title}-${index}`} className="relative min-w-0">
                <FuelCard item={item} active={active} onClick={() => setActiveIndex((current) => (current === index ? null : index))} />
                {active ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-[-18px] left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 rotate-45 border-b border-r md:block"
                      style={{ backgroundColor: "#fbfffc", borderColor: `${activeStyle.color}80` }}
                    />
                    <div className="mt-3 md:hidden">
                      <DetailPanel brand={brand} item={item} bgImage={bgImage} />
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>

        {activeItem ? <div className="mt-5 hidden md:block"><DetailPanel brand={brand} item={activeItem} bgImage={bgImage} /></div> : null}
      </Container>

      <div className="mt-7 bg-[linear-gradient(135deg,#061a33,#07316f)] py-5 text-white shadow-[0_14px_30px_rgba(6,26,51,0.16)]">
        <Container className="max-w-[1450px] px-4 sm:px-5 lg:px-6">
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_330px_1fr]">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/30 text-white">
                <SvgIcon name="shield" className="h-8 w-8" />
              </span>
              <div>
                <p className="font-['Manrope'] text-[16px] font-black uppercase">Not sure which fuel type your {brand} has?</p>
                <p className="mt-1 text-[12px] leading-[1.5] text-white/80">Enter your registration to identify your model, engine code and compatible replacement options.</p>
              </div>
            </div>
            <a href="#quote-form" className="grid rounded-[9px] bg-white/10 p-3 text-center ring-1 ring-white/20">
              <span className="text-[10px] font-black uppercase tracking-[0.08em]">Enter your registration</span>
              <span className="mt-2 rounded-[7px] bg-white px-5 py-2.5 font-['Manrope'] text-[25px] font-black tracking-[0.08em] text-slate-300">AB12 CDE</span>
              <span className="mt-2 rounded-[7px] bg-[#08784a] py-2 text-[12px] font-bold">Find My Engine</span>
            </a>
            <div className="flex items-center gap-4 lg:justify-end">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] border-2 border-[#f5c542] text-[18px] font-black text-[#f5c542]">12</span>
              <p className="font-['Manrope'] text-[16px] font-black uppercase">Minimum 12-month unlimited mileage warranty</p>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}

export default function FuelTypesSection({ data, bgImage, strictData = false, documentMode = false }: Props) {
  if (strictData) {
    return <ModelFuelTypesContent data={data} bgImage={bgImage} strictData={strictData} documentMode={documentMode} />;
  }

  return <BrandFuelTypesContent data={data} bgImage={bgImage} documentMode={documentMode} />;
}
