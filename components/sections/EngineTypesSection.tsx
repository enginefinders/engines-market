"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { EngineTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineTypesData;
  bgImage?: string;
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

function MobileCard({
  type,
  open,
  onToggle,
}: {
  type: EngineTypesData["types"][number];
  open: boolean;
  onToggle: () => void;
}) {
  const icon = getTypeIcon(type.title);
  const badge = typeBadge(type.title);
  const variant = typeVariant(type.title);
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
          : "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]";

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
    <div className="overflow-hidden rounded-[12px] [perspective:1000px]" style={{ height: cardHeight || undefined }}>
      <div
        className={`relative h-full w-full transition-transform duration-[550ms] [transform-style:preserve-3d] ${
          open ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div
          ref={frontRef}
          className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
        >
          <div className="flex h-full rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.06)]">
            <div className="flex-1 px-[16px] py-[14px]">
              <span className={`mb-[7px] inline-block rounded-full border px-[9px] py-[2px] text-[9px] font-bold uppercase tracking-[0.7px] ${badgeClass}`}>
                {badge}
              </span>
              <div className="font-['Manrope'] text-[14px] font-extrabold leading-[1.25] text-[#0d1b2e]">{type.title}</div>
              <p className="mt-1 text-[11.5px] leading-[1.45] text-[#6b7280]">{teaserText(type.description)}</p>
              <div className="mb-[2px] mt-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">Typical price range</div>
              <div className="font-['Manrope'] text-[16px] font-extrabold tracking-[-0.3px] text-[#15803d]">{type.priceRange}</div>
              <a
                href="#quote-form"
                data-quote-context={type.title}
                data-quote-source="engine-types"
                className="mt-[10px] inline-flex items-center gap-1 text-[11px] font-bold text-[#15803d] transition hover:gap-[7px]"
              >
                <ArrowIcon />
                <span>{type.cta}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={onToggle}
              className="flex w-[52px] flex-none cursor-pointer flex-col items-center justify-center gap-2 border-l border-[#f1f5f9] bg-[#f8f9fa] transition hover:bg-[#f0fdf4]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#0d1b2e] text-[#22c55e]">
                {icon}
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.5px] text-[#9ca3af] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
                What is it?
              </span>
            </button>
          </div>
        </div>

        <div
          ref={backRef}
          className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="h-full rounded-[12px] border border-[#1e3a5f] bg-[#0d1b2e] px-[18px] py-[18px] shadow-[0_2px_8px_rgba(13,27,46,0.15)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-[9px] py-[2px] text-[9px] font-bold uppercase tracking-[0.7px] text-[#22c55e]">
                {badge}
              </span>
              <button type="button" onClick={onToggle} className="inline-flex items-center gap-1 text-[9px] font-bold text-[#475569]">
                <RefreshIcon />
                <span>Flip back</span>
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

export default function EngineTypesSection({ data, bgImage }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const desktopTypes = useMemo(() => data.types, [data.types]);

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
        <div className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-[4px] text-[10px] font-bold uppercase tracking-[0.8px] text-[#15803d]">
          <TagIcon />
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[820px] font-['Manrope'] text-[24px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[28px] lg:text-[30px]">
          {data.h2}
        </h2>
        <p className="mt-[10px] max-w-[720px] text-[13px] leading-[1.6] text-[#6b7280]">{data.intro}</p>

        <div className="mt-[22px] flex flex-col gap-[10px] lg:hidden">
          {data.types.map((type, index) => (
            <MobileCard
              key={type.title}
              type={type}
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
            />
          ))}
        </div>

        <div className="mt-[22px] hidden gap-4 lg:grid lg:grid-cols-3">
          {desktopTypes.map((type) => {
            const icon = getTypeIcon(type.title);
            const badge = typeBadge(type.title);
            const featured = isFeaturedCard(type.title);
            const variant = typeVariant(type.title);

            const badgeClass =
              featured
                ? "bg-[#22c55e] text-white border-transparent"
                : variant === "used"
                  ? "bg-[#0d1b2e] text-white border-transparent"
                  : "bg-[#0d1b2e] text-white border-transparent";

            return (
              <div
                key={type.title}
                className={`rounded-[12px] border px-4 py-4 shadow-[0_2px_12px_rgba(13,27,46,0.06)] ${
                  featured
                    ? "border-[#1e3a5f] bg-[#0d1b2e] text-white"
                    : "border-[#e5e7eb] bg-white"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className={`inline-flex rounded-[6px] border px-[10px] py-[3px] text-[9px] font-bold uppercase tracking-[0.7px] ${badgeClass}`}>
                    {badge}
                  </span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${featured ? "text-[#22c55e]" : "text-[#0d1b2e]"}`}>
                    {icon}
                  </div>
                </div>

                <div
                  role="heading"
                  aria-level={3}
                  className={`font-['Manrope'] text-[14px] font-extrabold leading-[1.3] ${
                    featured ? "text-white" : "text-[#0d1b2e]"
                  }`}
                >
                  {type.title}
                </div>
                <p className={`mt-[8px] text-[12px] leading-[1.55] ${featured ? "text-[#cbd5e1]" : "text-[#6b7280]"}`}>
                  {teaserText(type.description)}
                </p>
                <div className={`mt-4 font-['Manrope'] text-[16px] font-extrabold tracking-[-0.3px] ${featured ? "text-[#22c55e]" : "text-[#15803d]"}`}>
                  {type.priceRange}
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={type.title}
                  data-quote-source="engine-types"
                  className={`mt-4 inline-flex items-center gap-1 text-[12px] font-bold transition hover:gap-[7px] ${
                    featured ? "text-[#22c55e]" : "text-[#15803d]"
                  }`}
                >
                  <ArrowIcon className="h-[12px] w-[12px]" />
                  <span>{type.cta}</span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-4 shadow-[0_2px_8px_rgba(13,27,46,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
              <ShieldIcon />
            </div>
            <p className="text-[12px] leading-[1.65] text-[#6b7280]">
              {normalizeText(data.closing)}
            </p>
          </div>
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
