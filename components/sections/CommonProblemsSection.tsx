"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import type { CommonProblemsData } from "@/types/brand";
import { RecommendationCard } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: CommonProblemsData;
  bgImage?: string;
  documentMode?: boolean;
};

function normalizeText(text: string) {
  return text.replace(/[–—]/g, "-");
}

function formatAffectedModelLabel(value: string, isPrimary: boolean) {
  const normalized = normalizeText(value).trim();

  if (!isPrimary) {
    return normalized;
  }

  const seriesMatch = normalized.match(/(?:^|\s)(?:Series|Class)\s+(.+)$/i);
  if (seriesMatch?.[1]) {
    return seriesMatch[1].trim();
  }

  const tokens = normalized.split(/\s+/);
  if (tokens.length > 2) {
    return tokens.slice(-2).join(" ");
  }

  return normalized;
}

function FailureMileageGauge({ mobile = false }: { mobile?: boolean }) {
  const gaugeId = useId().replace(/:/g, "");
  const width = mobile ? 118 : 140;
  const height = mobile ? 60 : 72;
  const strokeWidth = mobile ? 10 : 12;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={mobile ? "h-[56px] w-[110px]" : "h-[68px] w-[132px]"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gaugeId}-track`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="50%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id={`${gaugeId}-needle`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id={`${gaugeId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.18" />
        </filter>
      </defs>

      <path
        d={`M ${strokeWidth} ${height - strokeWidth} A ${(width / 2) - strokeWidth / 2} ${(width / 2) - strokeWidth / 2} 0 0 1 ${width - strokeWidth} ${height - strokeWidth}`}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`M ${strokeWidth} ${height - strokeWidth} A ${(width / 2) - strokeWidth / 2} ${(width / 2) - strokeWidth / 2} 0 0 1 ${width - strokeWidth} ${height - strokeWidth}`}
        fill="none"
        stroke={`url(#${gaugeId}-track)`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="220"
        strokeDashoffset="58"
        filter={`url(#${gaugeId}-glow)`}
      />

      <g transform={`translate(${width / 2} ${height - strokeWidth})`}>
        <line
          x1="0"
          y1="0"
          x2={mobile ? "28" : "34"}
          y2={mobile ? "-22" : "-26"}
          stroke={`url(#${gaugeId}-needle)`}
          strokeWidth={mobile ? "4" : "5"}
          strokeLinecap="round"
        />
        <circle r={mobile ? "7" : "8"} fill="#0f172a" />
        <circle r={mobile ? "3.5" : "4"} fill="#60a5fa" />
      </g>
    </svg>
  );
}

function parseAffectedModelsSummary(affectedModels: string) {
  const normalized = normalizeText(affectedModels).trim();
  const match = normalized.match(/^(.*?)(?:\s*\(([^()]*)\)\s*)?$/);
  const vehiclePart = match?.[1]?.trim() ?? normalized;
  const metaPart = match?.[2]?.trim() ?? "";

  const vehicles = vehiclePart
    .split(",")
    .map((item, index) => formatAffectedModelLabel(item, index === 0))
    .filter(Boolean);

  const yearMatch = metaPart.match(/\b\d{4}\s*-\s*\d{4}\b/);
  const productionYears = yearMatch ? yearMatch[0].replace(/\s*-\s*/g, " - ") : "";
  const engineText = metaPart
    .replace(yearMatch?.[0] ?? "", "")
    .replace(/^[,\s-]+/, "")
    .trim();

  const engine = engineText
    ? engineText
        .split(/\s*(?:&|\/|,)\s*/)
        .map((item) => item.trim())
        .filter(Boolean)
        .join(" / ")
    : "";

  return {
    vehicles,
    productionYears,
    engine,
  };
}

function splitHeading(text: string) {
  const accent = "What It Costs to Fix & When Replacement Makes Sense";
  if (text.includes(accent)) {
    return {
      primary: text.replace(accent, "").replace(/\s+-\s*$/, "").trim(),
      accent,
    };
  }

  const parts = text.split(/\s+-\s+/);
  return {
    primary: parts[0] ?? text,
    accent: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function splitProblemDetail(group: string, detail: string) {
  const normalizedGroup = normalizeText(group).trim();
  const normalizedDetail = normalizeText(detail).trim();

  if (!normalizedDetail) {
    return {
      title: normalizedGroup,
      supporting: "",
    };
  }

  if (normalizedDetail.toLowerCase().startsWith(normalizedGroup.toLowerCase())) {
    const supporting = normalizedDetail
      .slice(normalizedGroup.length)
      .replace(/^\s*-\s*/, "")
      .trim();

    return {
      title: normalizedGroup,
      supporting,
    };
  }

  const [maybeTitle, ...rest] = normalizedDetail.split(/\s+-\s+/);

  if (maybeTitle?.trim().toLowerCase() === normalizedGroup.toLowerCase() && rest.length) {
    return {
      title: normalizedGroup,
      supporting: rest.join(" - ").trim(),
    };
  }

  return {
    title: normalizedGroup,
    supporting: normalizedDetail,
  };
}

function tierVariant(tier: string) {
  const label = normalizeText(tier).toLowerCase();

  if (label.includes("full replacement") || label.includes("recommended") || label.includes("best value")) {
    return "recommended";
  }

  if (label.includes("intermediate") || label.includes("moderate")) {
    return "moderate";
  }

  return "minor";
}

function ProblemIcon({ index, active = false }: { index: number; active?: boolean }) {
  const icons = active
    ? [
        "/icons/engine-market/active-blue-timing-chain.png",
        "/icons/engine-market/active-blue-rod-bearing.png",
        "/icons/engine-market/active-blue-hpfp-icon.png",
        "/icons/engine-market/active-blue-cooling-system.png",
        "/icons/engine-market/active-blue-egr-icon.png",
      ]
    : [
    "/icons/engine-market/dark-green-timing-chain.png",
    "/icons/engine-market/dark-green-rod-bearing.png",
    "/icons/engine-market/dark-green-hpfp-icon.png",
    "/icons/engine-market/dark-green-cooling-system.png",
    "/icons/engine-market/dark-green-egr-icon.png",
      ];

  return <Image src={icons[index % icons.length]} alt="" width={24} height={24} className="h-[24px] w-[24px] object-contain" />;
}

function MetaIcon({ type, className }: { type: "models" | "mileage" | "root"; className?: string }) {
  if (type === "models") {
    return (
      <svg viewBox="0 0 24 24" className={className ?? "h-[18px] w-[18px]"} fill="none" aria-hidden="true">
        <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 8 8 5h8l2 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "mileage") {
    return (
      <svg viewBox="0 0 24 24" className={className ?? "h-[18px] w-[18px]"} fill="none" aria-hidden="true">
        <path d="M4 14a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m12 14 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-[18px] w-[18px]"} fill="none" aria-hidden="true">
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

function WarrantyIcon() {
  return <Image src="/icons/engine-market/light-green-warranty-minimum.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />;
}

function GearIcon() {
  return <Image src="/icons/engine-market/light-green-upgraded-components.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />;
}

function TruckIcon() {
  return <Image src="/icons/engine-market/light-green-nationwide-delivery-2.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />;
}

function PoundIcon() {
  return <Image src="/icons/engine-market/light-green-pound-icon-2.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />;
}

function AffectedVehiclesCard({
  affectedModels,
  mobile = false,
}: {
  affectedModels: string;
  mobile?: boolean;
}) {
  const summary = parseAffectedModelsSummary(affectedModels);
  const vehicles = summary.vehicles.length ? summary.vehicles : [affectedModels];

  return (
      <div className={`rounded-[10px] border border-[#e7edf6] bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)] ${mobile ? "px-2 py-2" : "px-2 py-2"}`}>
      <div className={`flex items-center gap-2 ${mobile ? "mb-2" : "mb-3"}`}>
        <div className="min-w-0">
          <div className={`font-['Manrope'] font-extrabold uppercase tracking-[0.03em] text-[#172554] ${mobile ? "text-[9px]" : "text-[10px]"}`}>
            Most Affected Vehicles
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {vehicles.slice(0, 4).map((vehicle, index) => (
          <div
            key={`${vehicle}-${index}`}
            className="flex items-center justify-center rounded-[6px] border border-[#2a6dd6] bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_100%)] p-1.5 shadow-[0_0_0_1px_rgba(42,109,214,0.45),0_0_12px_rgba(42,109,214,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <div className={`min-w-0 truncate whitespace-nowrap font-['Manrope'] font-extrabold leading-none tracking-[-0.03em] text-[#0f172a] ${mobile ? "text-[12px]" : "text-[14px]"}`}>
              {vehicle}
            </div>
          </div>
        ))}
      </div>

      {summary.productionYears ? (
        <div className={`mt-2.5 space-y-1 font-['Manrope'] leading-[1.35] text-[#0f172a] ${mobile ? "text-[11px]" : "mt-3 space-y-1.5 text-[13px]"}`}>
          <p>
            <span className="font-extrabold">Production Years:</span>{" "}
            <span className="font-medium text-[#334155]">{summary.productionYears}</span>
          </p>
          {summary.engine ? (
            <p>
              <span className="font-extrabold">Engine:</span>{" "}
              <span className="font-medium text-[#334155]">{summary.engine}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ProblemVisual({
  src,
  alt,
  mobile = false,
}: {
  src: string;
  alt: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[12px] border border-[#dbe5f4] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(243,246,252,0.96))] shadow-[0_6px_18px_rgba(13,27,46,0.08)] ${
        mobile ? "h-[164px]" : "h-[240px]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.44)_0%,rgba(255,255,255,0.08)_30%,rgba(255,255,255,0)_62%)]" />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-3"
        sizes={mobile ? "100vw" : "(max-width: 1024px) 100vw, 40vw"}
      />
    </div>
  );
}

function MobileProblemCard({
  problem,
  index,
  open,
  onToggle,
  fallbackImage,
}: {
  problem: CommonProblemsData["problems"][number];
  index: number;
  open: boolean;
  onToggle: () => void;
  fallbackImage?: string;
}) {
  const detail = splitProblemDetail(problem.group, problem.h4);
  const visualSrc = problem.image?.trim() || fallbackImage?.trim() || "";

  const getTierColors = (tier: string) => {
    const label = normalizeText(tier).toLowerCase();

    if (label.includes("full replacement") || label.includes("recommended") || label.includes("best value")) {
      return {
        accentText: "text-[#15803d]",
      };
    }

    if (label.includes("intermediate") || label.includes("moderate")) {
      return {
        accentText: "text-[#b45309]",
      };
    }

    return {
      accentText: "text-[#2563eb]",
    };
  };

  return (
    <div className="mb-[10px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-[14px] py-[14px] text-left transition hover:bg-[#fafafa]"
      >
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px] bg-[#0d1b2e] text-[#22c55e]">
          <ProblemIcon index={index} active={open} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-['Manrope'] text-[13.5px] font-bold leading-[1.25] text-[#0d1b2e]">{detail.title}</div>
          {detail.supporting ? (
            <div className="mt-0.5 text-[10.5px] text-[#9ca3af]">{detail.supporting}</div>
          ) : null}
        </div>
        <span className={`flex-none text-[18px] leading-none text-[#d1d5db] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}>⌄</span>
      </button>

      {open ? (
        <div className="border-t border-[#f1f5f9] px-3 py-4">
          {visualSrc ? (
            <div className="mb-3">
              <ProblemVisual src={visualSrc} alt={detail.title} mobile />
            </div>
          ) : null}

          {/* 2-column grid for top cards */}
          <div className="grid grid-cols-2 gap-2.5">
            <AffectedVehiclesCard affectedModels={problem.affectedModels} mobile />

            <div className="rounded-[10px] border border-[#f1f5f9] bg-white px-2 py-2 text-center shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              {/* Header */}
              <div className="mb-3 flex items-center justify-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f5f9]">
                  <MetaIcon type="mileage" className="h-4 w-4 text-[#0d1b2e]" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-[#0d1b2e]">
                  Failure Mileage Range
                </span>
              </div>

              {/* Gauge/Meter Image */}
              <div className="mb-3 flex justify-center">
                <FailureMileageGauge mobile />
              </div>

              {/* Mileage Range */}
              <div className="mb-1 text-[13px] font-bold text-[#2563eb]">
                {problem.typicalFailureMileage}
              </div>

              {/* Subtitle */}
              <p className="text-[10px] text-gray-600">
                Typical failure window
              </p>
            </div>
          </div>

          {/* Root Cause - Full Width */}
          <div className="mt-3 rounded-[10px] border border-[#e7edf6] bg-white px-3 py-3 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f5f9]">
                <MetaIcon type="root" className="h-4 w-4 text-[#0d1b2e]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#0d1b2e]">Root Cause</span>
            </div>
            <p className="text-[11.5px] leading-[1.5] text-[#374151]">{problem.rootCause}</p>
          </div>

          {problem.repairOptions?.length ? (
            <div className="mt-3 space-y-2">
              {problem.repairOptions.map((option, optionIndex) => {
                const colors = getTierColors(option.tier);

                return (
                  <div
                    key={`${option.tier || "repair-option"}-${optionIndex}`}
                    className="rounded-[12px] border border-[#d9e1ea] bg-white p-2 shadow-[0_4px_14px_rgba(15,23,42,0.07)]"
                  >
                    <div className="mb-1 rounded-[8px] px-2 py-1 text-black">
                      <div className={`font-['Manrope'] text-[12px] font-bold leading-[1.25] ${colors.accentText}`}>{option.tier}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="relative overflow-hidden rounded-[8px] border border-[#cfe0ff] bg-[linear-gradient(180deg,rgba(23,57,113,0.92)_0%,rgba(12,32,66,0.96)_100%)] p-2 text-white shadow-[0_8px_16px_rgba(23,57,113,0.22),inset_0_1px_0_rgba(255,255,255,0.16)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.03)_38%,rgba(255,255,255,0)_62%)]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                        <div className="relative z-10">
                          <div className="text-[10px] font-bold uppercase tracking-[0.05em] opacity-90">DEALER</div>
                          <div className="mt-1 text-[13px] font-bold">{option.dealerPrice}</div>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-[8px] border border-[#bfe8cb] bg-[linear-gradient(180deg,rgba(44,103,36,0.92)_0%,rgba(25,70,33,0.96)_100%)] p-2 text-white shadow-[0_8px_16px_rgba(44,103,36,0.18),inset_0_1px_0_rgba(255,255,255,0.16)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0)_65%)]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                        <div className="relative z-10">
                          <div className="text-[10px] font-bold uppercase tracking-[0.05em] opacity-90">SPECIALIST</div>
                          <div className="mt-1 text-[13px] font-bold">{option.specialistPrice}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[12px] leading-[1.5] text-[#374151] mb-1.5">{option.whatItInvolves}</p>
                    <div className={`rounded-[8px] text-[11.5px] leading-[1.5] text-[#6b7280]`}>
                      {option.longevity}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-4">
            <RecommendationCard
              title={`Best next step for ${problem.group.toLowerCase()}`}
              body={problem.recommendation}
              ctaText={problem.cta}
              linkProps={{
                href: "#quote-form",
                "data-quote-context": `${problem.group} - ${problem.h4}`,
                "data-quote-source": "common-problem-detail",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CommonProblemsSection({ data, bgImage, documentMode = false }: Props) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState(-1);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false);

  const current = useMemo(() => data.problems[active] ?? data.problems[0], [active, data.problems]);
  const heading = splitHeading(data.h2);
  const currentDetail = current ? splitProblemDetail(current.group, current.h4) : null;

  // Text truncation logic
  const maxLength = 170;
  const isLongText = data.h3.length > maxLength;
  let displayText = data.h3;
  if (isLongText && !isTextExpanded) {
    let truncated = data.h3.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }
    displayText = truncated.trim() + "...";
  }

  const supportItems = [
    { label: "12-Month Warranty", icon: <WarrantyIcon /> },
    { label: "Upgraded Components", icon: <GearIcon /> },
    { label: "Nationwide UK Delivery", icon: <TruckIcon /> },
    { label: "Save vs Main Dealer Price", icon: <PoundIcon /> },
  ];

  return (
    <Section className="relative overflow-hidden bg-[#f7f8fb]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[200px] lg:block">
          <div
            className="absolute right-0 top-0 h-full w-[300px] opacity-[0.08]"
            style={{
              backgroundImage: `linear-gradient(270deg, rgba(248,249,250,0.1), rgba(248,249,250,0.92) 45%, rgba(248,249,250,1) 100%), url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className={`relative max-w-[1400px] ${documentMode ? "" : "px-2"}`}>
        <div className="section-pill mb-[14px]">
          <span>{data.tag}</span>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
          <div className="rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_10px_rgba(13,27,46,0.05)]">
            <h2 className="text-[26px] font-extrabold leading-[1.18] tracking-[-0.5px] text-[#0d1b2e]" style={{ fontSize: '26px' }}>
              <span>{heading.primary}</span>
            </h2>

            {/* Updated Desktop Paragraph */}
            <p className="mt-4 text-[12px] leading-[1.7] text-[#6b7280]">
              {displayText}
              {isLongText && (
                <>
                  {" "}
                  <button
                    type="button"
                    onClick={() => setIsTextExpanded((prev) => !prev)}
                    className="font-semibold text-[#15803d] hover:underline focus:outline-none"
                  >
                    {isTextExpanded ? "see less" : "see more"}
                  </button>
                </>
              )}
            </p>

            <div className="mt-5 space-y-2">
              {data.problems.map((problem, index) => {
                const activeProblem = index === active;

                return (
                  <button
                    key={`${problem.group || "problem"}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-3 rounded-[10px] border px-3 py-3 text-left transition ${activeProblem
                      ? "border border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5),inset_0_0_12px_rgba(74,222,128,0.3)]"
                      : "border-[#e5e7eb] bg-white hover:border-[#cbd5e1] hover:bg-slate-50"
                      }`}
                  >
                    <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-[10px] ${activeProblem ? "bg-[#15803d] text-white" : "bg-[#0d1b2e] text-white"}`}>
                      <ProblemIcon index={index} active={activeProblem} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-['Manrope'] text-[13px] font-bold leading-[1.25] text-[#0d1b2e]">
                        {index + 1}. {problem.group}
                      </div>
                    </div>
                    <span className="text-[18px] leading-none text-[#9ca3af]">›</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 rounded-[10px] border border-[#dbe6f3] bg-[#f8fbff] px-4 py-3">
              <div className="flex items-start gap-2 text-[#15803d]">
                <WarrantyIcon />
                <p className="text-[11px] leading-[1.5] text-[#6b7280]">
                  Every rebuilt engine includes a minimum 12-month unlimited mileage warranty.
                </p>
              </div>
            </div>
          </div>

          {current ? (
            <div className="min-w-0 rounded-[14px] border border-[#e5e7eb] bg-white p-5 shadow-[0_2px_12px_rgba(13,27,46,0.06)]">
              <div className="flex items-start gap-4 border-b border-[#f1f5f9] pb-4">
                <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[12px] bg-[#15803d] text-white">
                  <ProblemIcon index={active} active />
                </div>
                <div className="min-w-0">
                  <div className="font-['Manrope'] text-[16px] font-extrabold leading-[1.25] text-[#0d1b2e]">
                    {active + 1}. {currentDetail?.title ?? current.group}
                  </div>
                  {currentDetail?.supporting ? (
                    <p className="mt-1 text-[12px] text-[#6b7280]">{currentDetail.supporting}</p>
                  ) : null}
                </div>
              </div>

              {!documentMode && (current.image?.trim() || bgImage?.trim()) ? (
                <div className="mt-4">
                  <ProblemVisual
                    src={current.image?.trim() || bgImage?.trim() || ""}
                    alt={currentDetail?.title ?? current.group}
                  />
                </div>
              ) : null}

              <div className="mt-4 grid gap-3 lg:grid-cols-[1.18fr_0.9fr_1fr]">
                <AffectedVehiclesCard affectedModels={current.affectedModels} />

                <div className="rounded-[10px] border border-[#f1f5f9] px-3 py-3 text-center">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9]">
                      <MetaIcon type="mileage" className="h-6 w-6 text-[#0d1b2e]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d1b2e]">
                      Failure Mileage Range
                    </span>
                  </div>

                  {/* Gauge/Meter Image */}
                  <div className="mb-4 flex justify-center">
                    <FailureMileageGauge />
                  </div>

                  {/* Mileage Range */}
                  <div className="mb-1 text-[15px] font-bold text-[#2563eb]">
                    {current.typicalFailureMileage}
                  </div>

                  {/* Subtitle */}
                  <p className="text-[12px] text-gray-800">
                    Typical failure window
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#f1f5f9] px-4 py-3">
                  <div className="mb-2 flex items-center gap-2 text-[#0d1b2e] ">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f5f9]">
                      <MetaIcon type="root" className="h-5 w-5 text-[#0d1b2e]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#0d1b2e]">Root Cause</span>
                  </div>
                  <p className="text-[11.5px] leading-[1.55] text-[#374151]">{current.rootCause}</p>
                </div>
              </div>

              {current.repairOptions?.length ? (
                <>
                  <div className="mt-5 text-[12px] font-bold text-[#0d1b2e]">Repair Options &amp; Estimated Costs (UK ranges)</div>
                  <div className="mt-2 overflow-hidden rounded-[10px] border border-[#e5e7eb]">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#0d1b2e]">
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Repair Tier</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Dealer Price</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Specialist Price</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">What It Involves</th>
                            <th className="px-[12px] py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.06em] text-white/80">Longevity / Suitability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {current.repairOptions.map((option, optionIndex) => {
                            const variant = tierVariant(option.tier);

                            return (
                              <tr key={`${option.tier || "repair-option"}-${optionIndex}`} className="border-b border-[#f1f5f9] align-top last:border-b-0">
                                <td className="px-[12px] py-[12px] text-[11.5px] text-[#374151]">
                                  <div className="font-['Manrope'] text-[12px] font-bold text-[#0d1b2e]">{option.tier}</div>
                                  <div className={`mt-2 inline-flex rounded-[999px] px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.05em] ${variant === "recommended"
                                    ? "bg-[#f0fdf4] text-[#15803d]"
                                    : variant === "moderate"
                                      ? "bg-[#fff7ed] text-[#c2410c]"
                                      : "bg-[#f8fafc] text-[#64748b]"
                                    }`}>
                                    {variant === "recommended" ? "Best Value" : variant === "moderate" ? "Intermediate" : "Minor"}
                                  </div>
                                </td>
                                <td className="px-[12px] py-[12px] text-[12px] font-semibold text-[#374151]">{option.dealerPrice}</td>
                                <td className="px-[12px] py-[12px] text-[12px] font-extrabold text-[#15803d]">{option.specialistPrice}</td>
                                <td className="px-[12px] py-[12px] text-[11.5px] leading-[1.55] text-[#374151]">{option.whatItInvolves}</td>
                                <td className="px-[12px] py-[12px] text-[11.5px] leading-[1.55] text-[#374151]">{option.longevity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="mt-4">
                <RecommendationCard
                  title={`Best next step for ${current.group.toLowerCase()}`}
                  body={current.recommendation}
                  ctaText={current.cta}
                  linkProps={{
                    href: "#quote-form",
                    "data-quote-context": `${current.group} - ${current.h4}`,
                    "data-quote-source": "common-problem-detail",
                  }}
                />
              </div>


            </div>
          ) : null}
        </div>
        {(data.finalCta.h4 || data.finalCta.paragraph || data.finalCta.buttonText) ? (
          <div className="hidden md:block mt-4 rounded-[14px] border border-[#dbe6f3] bg-[#f8fbff] p-4 md:p-5">
            {data.finalCta.h4 ? (
              <h4 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#0d1b2e]">
                {data.finalCta.h4}
              </h4>
            ) : null}

            {data.finalCta.paragraph ? (
              <p className="mt-3 max-w-full text-[12px] leading-[1.75] text-[#4b5563]">
                {data.finalCta.paragraph}
              </p>
            ) : null}

            {data.finalCta.buttonText ? (
              <a
                href="#quote-form"
                data-quote-context={data.finalCta.h4 || current.group}
                data-quote-source="common-problems-final-cta"
                className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#15803d] px-5 text-[12.5px] font-semibold text-white transition hover:bg-[#166534]"
              >
                {data.finalCta.buttonText}
              </a>
            ) : null}
          </div>
        ) : null}
        <div className="lg:hidden">
          <h2 className="mb-4 text-[26px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[36px] md:leading-[1.15] md:tracking-[-0.7px]">
            <span>{heading.primary}</span>
            {heading.accent ? (
              <>
                <br className="hidden md:block" />
                <span className="hidden text-[#15803d] md:inline">{heading.accent}</span>
              </>
            ) : null}
          </h2>

          <p className="mb-5 mt-[10px] hidden text-[13px] leading-[1.65] text-[#6b7280] md:block">
            {displayText}
            {isLongText && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => setIsTextExpanded((prev) => !prev)}
                  className="font-semibold text-[#15803d] hover:underline focus:outline-none"
                >
                  {isTextExpanded ? "see less" : "see more"}
                </button>
              </>
            )}
          </p>

          {data.problems.map((problem, index) => (
            <MobileProblemCard
              key={`${problem.group || "problem"}-${index}`}
              problem={problem}
              index={index}
              open={openMobile === index}
              onToggle={() => setOpenMobile((currentIndex) => (currentIndex === index ? -1 : index))}
              fallbackImage={bgImage}
            />
          ))}

          {/* {(data.finalCta.h4 || data.finalCta.paragraph || data.finalCta.buttonText) ? (
            <div className="mt-4 rounded-[14px] border border-[#dbe6f3] bg-[#f8fbff] p-4">
              {data.finalCta.h4 ? (
                <h4 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#0d1b2e]">
                  {data.finalCta.h4}
                </h4>
              ) : null}

              {data.finalCta.paragraph ? (
                <p className="mt-3 text-[12px] leading-[1.75] text-[#4b5563]">
                  {data.finalCta.paragraph}
                </p>
              ) : null}

              {data.finalCta.buttonText ? (
                <a
                  href="#quote-form"
                  data-quote-context={data.finalCta.h4 || "Common problems"}
                  data-quote-source="common-problems-final-cta"
                  className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[#15803d] px-5 text-[12.5px] font-semibold text-white transition hover:bg-[#166534]"
                >
                  {data.finalCta.buttonText}
                </a>
              ) : null}
            </div>
          ) : null} */}
        </div>

        {data.finalCta.disclaimer ? (
          <div className="mt-5 rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 lg:mt-4">
            <div className="grid gap-4 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-center">
              <div className="support-strip-scroll overflow-x-auto [scrollbar-width:thin] [scrollbar-color:rgba(148,163,184,0.45)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#cbd5e1] [&::-webkit-scrollbar-thumb]:hover:bg-[#94a3b8]">
                <div className="flex min-w-max items-start gap-2 whitespace-nowrap">
                  {supportItems.map((item, index) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="inline-flex min-w-[68px] flex-col items-center gap-2 text-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0fdf4] text-[#15803d]">
                          {item.icon}
                        </div>
                        <span className="text-[10px] leading-[1.35] text-[#6b7280]">{item.label}</span>
                      </div>
                      {index < supportItems.length - 1 ? (
                        <span className="pt-3 text-[16px] leading-none text-[#cbd5e1]">|</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-[10.5px] leading-[1.65] text-[#9ca3af] md:text-[11px] md:leading-[1.7]"
                  style={
                    isDisclaimerExpanded
                      ? undefined
                      : {
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }
                  }
                >
                  <strong className="font-semibold text-[#6b7280]">Disclaimer:</strong> {data.finalCta.disclaimer}
                </p>
                <button
                  type="button"
                  onClick={() => setIsDisclaimerExpanded((current) => !current)}
                  className="mt-2 text-[10.5px] font-semibold text-[#15803d] transition hover:text-[#166534]"
                >
                  {isDisclaimerExpanded ? "View Less" : "View More"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

