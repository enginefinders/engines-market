"use client";

import { useEffect, useRef, useState } from "react";
import type { EngineTypesData } from "@/types/brand";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineTypesData;
  bgImage?: string;
  dynamicBrandCta?: boolean;
};

function normalizeText(text: string) {
  return text.replace(/[â€“â€”]/g, "-");
}

function teaserText(text: string) {
  const normalized = normalizeText(text).trim();
  if (normalized.length <= 90) return normalized;
  return `${normalized.slice(0, 87).trimEnd()}...`;
}

function typeVariant(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return "remanu";
  if (normalized.includes("refurbished")) return "refurb";
  if (normalized.includes("supply")) return "supplyfit";
  if (normalized.includes("used")) return "used";
  if (normalized.includes("rebuilt")) return "rebuilt";
  return "recon";
}

function priceParts(text: string) {
  const normalized = normalizeText(text);
  const [rawLabel, rawValue = normalized] = normalized.split(":");
  const label = rawValue === normalized ? "Typical price range" : rawLabel.trim();
  const value = rawValue.trim();
  const match = value.match(/(£[^A-Za-z(]+?)(\s*(\(.+\)|on top of engine price))?$/i);

  if (!match) {
    return {
      label,
      main: value,
      note: "",
    };
  }

  return {
    label,
    main: match[1].trim(),
    note: match[2]?.trim() ?? "",
  };
}

function typeBadge(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return "Remanufactured";
  if (normalized.includes("refurbished")) return "Refurbished";
  if (normalized.includes("supply")) return "Supply & Fit";
  if (normalized.includes("used")) return "Used";
  if (normalized.includes("rebuilt")) return "Rebuilt";
  return "Reconditioned";
}

function isFeaturedCard(title: string) {
  return title.toLowerCase().includes("rebuilt");
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowIcon({ className = "h-[11px] w-[11px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[10px] w-[10px]" fill="none" aria-hidden="true">
      <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.49 15a9 9 0 1 1-.49-4.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getTypeIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) return <EngineIcon />;
  if (normalized.includes("supply")) return <TruckIcon />;
  if (normalized.includes("used")) return <SearchIcon />;
  if (normalized.includes("refurbished")) return <FactoryIcon />;
  if (normalized.includes("rebuilt")) return <WrenchIcon />;
  return <EngineIcon />;
}

function FlipCard({
  type,
  open,
  onToggle,
  frontActionLabel,
  backActionLabel,
  priceLabel,
}: {
  type: EngineTypesData["types"][number];
  open: boolean;
  onToggle: () => void;
  frontActionLabel: string;
  backActionLabel: string;
  priceLabel: string;
}) {
  const icon = getTypeIcon(type.title);
  const badge = typeBadge(type.title);
  const variant = typeVariant(type.title);
  const price = priceParts(type.priceRange);
  const featured = isFeaturedCard(type.title);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [frontHeight, setFrontHeight] = useState(0);
  const [backHeight, setBackHeight] = useState(0);

  const badgeClass =
    variant === "remanu"
      ? "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]"
      : variant === "refurb"
        ? "bg-[#fefce8] text-[#a16207] border-[#fde68a]"
        : variant === "supplyfit"
        ? "bg-[#fdf4ff] text-[#7c3aed] border-[#e9d5ff]"
        : variant === "used"
          ? "bg-[#f8f9fa] text-[#6b7280] border-[#e5e7eb]"
          : "bg-[#f8fbff] text-[#0d1b2e] border-[#0d1b2e]";

  useEffect(() => {
    const measure = () => {
      setFrontHeight(frontRef.current?.scrollHeight ?? 0);
      setBackHeight(backRef.current?.scrollHeight ?? 0);
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [type.description, type.priceRange, type.cta, type.title]);

  const cardHeight = open ? Math.max(backHeight, 160) : Math.max(frontHeight, 140);

  return (
    <div
      className="overflow-hidden rounded-[12px] lg:rounded-[16px]"
      style={{ height: cardHeight || undefined, perspective: "1200px", WebkitPerspective: "1200px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[550ms]"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: open ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          ref={frontRef}
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div
            className={`flex h-full rounded-[12px] border bg-white shadow-[0_2px_8px_rgba(13,27,46,0.06)] lg:rounded-[16px] lg:shadow-[0_8px_24px_rgba(13,27,46,0.06)] ${
              featured ? "border-[#dbe5f4]" : "border-[#e5e7eb]"
            }`}
          >
            <div className="flex-1 px-[16px] py-[14px] lg:px-5 lg:py-5">
              <span className={`mb-[7px] inline-block rounded-full border px-[9px] py-[2px] text-[9px] font-bold uppercase tracking-[0.7px] ${badgeClass}`}>
                {badge}
              </span>
              <div className="font-['Manrope'] text-[14px] font-extrabold leading-[1.25] text-[#0d1b2e] lg:text-[16px]">{type.title}</div>
              <p className="mt-1 text-[11.5px] leading-[1.45] text-[#6b7280] lg:text-[12.5px] lg:leading-[1.62]">{teaserText(type.description)}</p>
              <div className="mb-[2px] mt-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">{priceLabel || price.label}</div>
              <div className="font-['Manrope'] text-[16px] font-extrabold tracking-[-0.3px] text-[#15803d] lg:text-[18px]">{price.main}</div>
              {price.note ? <div className="mt-[2px] text-[10px] font-medium leading-[1.35] text-[#94a3b8]">{price.note}</div> : null}
              <a
                href="#quote-form"
                data-quote-context={type.title}
                data-quote-source="engine-types"
                className="mt-[10px] inline-flex items-center gap-1 text-[11px] font-bold text-[#15803d] transition hover:gap-[7px] lg:text-[12.5px]"
              >
                <ArrowIcon />
                <span>{type.cta}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onToggle}
              className="flex w-[52px] flex-none cursor-pointer flex-col items-center justify-center gap-2 border-l border-[#f1f5f9] bg-[#f8f9fa] transition hover:bg-[#f8fbff] lg:w-[64px]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0d1b2e] text-[#22c55e]">
                {icon}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.5px] text-[#9ca3af] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                {frontActionLabel}
              </span>
            </button>
          </div>
        </div>

        <div
          ref={backRef}
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full rounded-[12px] border border-[#1e3a5f] bg-[#0d1b2e] px-[18px] py-[18px] shadow-[0_2px_8px_rgba(13,27,46,0.15)] lg:rounded-[16px] lg:px-5 lg:py-5 lg:shadow-[0_8px_24px_rgba(13,27,46,0.18)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-white/20 bg-white/8 px-[9px] py-[2px] text-[9px] font-bold uppercase tracking-[0.7px] text-white/82">
                {badge}
              </span>
              <button type="button" onClick={onToggle} className="inline-flex items-center gap-1 text-[9px] font-bold text-[#475569]">
                <RefreshIcon />
                <span>{backActionLabel}</span>
              </button>
            </div>

            <p className="text-[13px] leading-[1.65] text-[#e2e8f0]">
              {normalizeText(type.description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EngineTypesSection({
  data,
  bgImage,
  dynamicBrandCta = false,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingLines = data.headingLines?.length ? data.headingLines : data.h2.split(/\s+-\s+/);
  const brandLabel = inferBrandLabel(data.h2);
  const ui = data.ui ?? {};
  const closingCard = data.closingCard ?? {};

  return (
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 hidden h-[300px] w-[400px] opacity-[0.08] lg:block"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,249,250,0.15), rgba(248,249,250,0.8)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className="relative max-w-[1180px]">
        <div className="section-pill mb-[14px] lg:mx-auto">
          <TagIcon />
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[920px] font-['Manrope'] text-[26px] font-extrabold leading-[1.14] tracking-[-0.7px] text-[#0d1b2e] md:text-[30px] lg:mx-auto lg:text-center lg:text-[36px]">
          {headingLines.map((line, index) => (
            <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-[8px] hidden justify-center lg:flex">
          <div className="h-[3px] w-12 rounded-full bg-[#22c55e]" />
        </div>

        <p className="mt-[12px] max-w-[760px] text-[13px] leading-[1.7] text-[#64748b] lg:mx-auto lg:text-center lg:text-[15px]">
          {data.intro}
        </p>

        <div className="mt-[22px] grid gap-[10px] lg:grid-cols-2 lg:gap-3">
          {data.types.map((type, index) => (
              <FlipCard
                key={type.title}
                type={type}
                open={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
                frontActionLabel={ui.frontActionLabel ?? "What is it?"}
                backActionLabel={ui.backActionLabel ?? "Flip back"}
                priceLabel={ui.priceLabel ?? "Typical price range"}
              />
            ))}
        </div>

        <div className="mt-4">
          <CtaStrip
            tone="light"
            label={closingCard.label ?? "Engine Replacement Help"}
            title={closingCard.title ?? (dynamicBrandCta ? `Compare ${brandLabel} engine prices with vetted UK suppliers` : "Compare Land Rover engine prices with vetted UK suppliers")}
            description={normalizeText(data.closing)}
            buttonText={closingCard.buttonText ?? (dynamicBrandCta ? `Compare ${brandLabel} Prices` : "Compare Land Rover Prices")}
            icon={<ShieldIcon />}
            linkProps={{
              href: "#quote-form",
              "data-quote-context": "Engine types closing",
              "data-quote-source": "engine-types",
            }}
          />
        </div>
      </Container>
    </Section>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function inferBrandLabel(title: string) {
  const match = title.match(/^(.*?)\s+Engine Types/i);
  return match?.[1]?.trim() || "Engine";
}
