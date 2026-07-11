"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { EngineCodesData } from "@/types/brand";
import type { ModelPageData } from "@/types/model";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { FaArrowRight, FaCar, FaCheck, FaChevronDown, FaExclamationTriangle, FaGasPump } from "react-icons/fa";
import { TbEngineFilled } from "react-icons/tb";

type Props = {
  data: EngineCodesData;
  guide: ModelPageData["sections"]["variantCoverage"]["engineGuide"];
  modelName: string;
  strictData?: boolean;
  documentMode?: boolean;
};

type GuideEntry = ModelPageData["sections"]["variantCoverage"]["engineGuide"]["families"][number]["entries"][number];
type EngineRow = EngineCodesData["groups"][number]["engines"][number];

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function sanitizeDashText(value: string) {
  return normalizeWhitespace(value.replace(/[–—]/g, "-"));
}

function repairEngineCodeValue(code: string) {
  const cleaned = sanitizeDashText(code);
  const parts = cleaned.split(/\s+-\s+/);

  if (parts.length > 1) {
    const suffix = parts.slice(1).join(" - ").trim();
    if (/^\d+(?:\.\d+)?$/.test(suffix) || /^\d+\.$/.test(suffix)) {
      return parts[0].trim();
    }
  }

  return cleaned;
}

function normalizeCode(code: string) {
  const normalized = repairEngineCodeValue(code)
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);

  return Array.from(new Set([...normalized, ...normalized.map((item) => item.replace(/\s+/g, ""))]));
}

function buildGuideLookup(guide: Props["guide"]) {
  const map = new Map<string, GuideEntry>();

  for (const family of guide.families) {
    for (const entry of family.entries) {
      for (const code of normalizeCode(entry.code)) {
        if (!map.has(code)) {
          map.set(code, entry);
        }
      }
    }
  }

  return map;
}

function getGuideDetail(code: string, lookup: Map<string, GuideEntry>) {
  for (const candidate of normalizeCode(code)) {
    const match = lookup.get(candidate);
    if (match) {
      return match;
    }
  }

  return null;
}

function deriveYears(compatibleModels: string, fallback?: string, strictData = false) {
  if (fallback?.trim()) {
    return fallback.trim();
  }

  const match = compatibleModels.match(/\(([^)]+)\)/);
  return match?.[1]?.trim() ?? (strictData ? "" : "Check by registration");
}

function toPriceText(price: string) {
  return price.replace(/^from\s+/i, "").trim();
}

function simplifyFuelForTitle(fuel: string) {
  return normalizeWhitespace(fuel.replace(/\s*\(([^)]+)\)\s*/g, "").replace(/\s+\/\s+/g, " / "));
}

function formatSizeFuel(size: string, fuel: string) {
  const normalizedSize = normalizeWhitespace(size.replace(/(\d+(?:\.\d+)?)L\b/gi, "$1 Litre"));
  const normalizedFuel = simplifyFuelForTitle(fuel);

  return [normalizedSize, normalizedFuel].filter(Boolean).join(" ").trim();
}

function isMeaningfulEngineTitle(value: string) {
  const cleanedValue = sanitizeDashText(value);

  if (!cleanedValue) {
    return false;
  }

  if (/^\d+(?:\.\d+)?\.?$/i.test(cleanedValue)) {
    return false;
  }

  return /[a-z]/i.test(cleanedValue);
}

function repairEngineTitleValue(code: string, title: string, size: string, fuel: string) {
  const cleanedTitle = sanitizeDashText(title);
  const cleanedCode = sanitizeDashText(code);
  const trailingFragmentMatch = cleanedCode.match(/\s+-\s+(\d+\.)$/);

  if (trailingFragmentMatch) {
    const repaired = normalizeWhitespace(`${trailingFragmentMatch[1]}${cleanedTitle}`).replace(/(\d)\.\s+(\d)/g, "$1.$2");
    if (isMeaningfulEngineTitle(repaired)) {
      return repaired;
    }
  }

  if (isMeaningfulEngineTitle(cleanedTitle)) {
    return cleanedTitle;
  }

  return formatSizeFuel(size, fuel) || cleanedTitle;
}

function toSummary(engine: EngineRow) {
  return formatSizeFuel(engine.size, engine.fuel)
    .replace(/\s+/g, " ")
    .trim();
}

function extractEngineSeries(code: string) {
  const repairedCode = repairEngineCodeValue(code);
  const primaryCode = repairedCode.split("/")[0]?.trim().toUpperCase() || repairedCode.toUpperCase();
  const match = primaryCode.match(/^[A-Z]\d+/);

  return match?.[0] ?? primaryCode;
}

function buildAccordionHeading(engine: EngineRow, detail: GuideEntry | null, years: string) {
  if (detail?.familyHeading?.trim()) {
    return sanitizeDashText(detail.familyHeading.trim());
  }

  return `${extractEngineSeries(engine.code)} Series (${years})`;
}

function buildEngineHeading(engine: EngineRow, detail: GuideEntry | null) {
  const code = repairEngineCodeValue(detail?.code || engine.code);
  const title = repairEngineTitleValue(
    detail?.code || engine.code,
    detail?.title || engine.title || "",
    detail?.size || engine.size,
    detail?.fuel || engine.fuel,
  );

  return title ? `${code} - ${title}` : code;
}

function buildHistory(engine: EngineRow, detail: GuideEntry | null, modelName: string, strictData = false) {
  if (detail?.history?.trim()) {
    return detail.history.trim();
  }

  return strictData ? "" : `${engine.code} appears across ${modelName} variants including ${engine.compatibleModels}. Compare fitment, specs and rebuilt pricing before choosing a replacement unit.`;
}

function buildVariants(engine: EngineRow, detail: GuideEntry | null) {
  if (detail?.compatibleVariants?.length) {
    return detail.compatibleVariants
      .flatMap((variant) => variant.split(","))
      .map((variant) => variant.trim())
      .filter(Boolean);
  }

  return engine.compatibleModels
    .split(",")
    .map((item) => item.replace(/\([^)]*\)/g, "").trim())
    .filter(Boolean);
}

function buildFailures(detail: GuideEntry | null, fallback: string) {
  if (detail?.commonFailures?.length) {
    return detail.commonFailures;
  }

  return [fallback];
}

function isRenderableEngineRow(engine: EngineRow) {
  const repairedCode = repairEngineCodeValue(engine.code);
  const normalizedCode = repairedCode.trim().toUpperCase();
  const looksLikeCode =
    /^[A-Z0-9][A-Z0-9./+-]*(?:\s+[A-Z0-9][A-Z0-9./+-]*)*(?:\s*\/\s*[A-Z0-9][A-Z0-9./+-]*(?:\s+[A-Z0-9][A-Z0-9./+-]*)*)*$/.test(normalizedCode) &&
    /[A-Z]/.test(normalizedCode) &&
    !/^\d+(?:\.\d+)?$/.test(normalizedCode);

  return looksLikeCode && Boolean(engine.size || engine.fuel || engine.power || engine.avgRebuiltPrice);
}

function chunkEngines(engines: EngineRow[]) {
  const rows: EngineRow[][] = [];

  for (let i = 0; i < engines.length; i += 2) {
    rows.push(engines.slice(i, i + 2));
  }

  return rows;
}

function EngineIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return <TbEngineFilled className={className} />;
}

function FuelPumpIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return <FaGasPump className={className} />;
}

function SpecsIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return <FaCheck className={className} />;
}

function WarningIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return <FaExclamationTriangle className={className} />;
}

function CarIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return <FaCar className={className} />;
}

function ChevronIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return <FaChevronDown className={className} />;
}

function ArrowIcon({ className = "w-[14px] h-[14px]" }: { className?: string }) {
  return <FaArrowRight className={className} />;
}

function QuoteDocIcon({ className = "w-[16px] h-[16px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type Selection = {
  familyIndex: number;
  engineIndex: number;
} | null;

function getFuelIcon(fuelType: string, className?: string) {
  const normalized = fuelType.toLowerCase();
  if (normalized.includes("petrol") || normalized.includes("gasoline")) {
    return <FuelPumpIcon className={className} />;
  }
  return <EngineIcon className={className} />;
}

export default function ModelEngineCodesSection({ data, guide, modelName, strictData = false, documentMode = false }: Props) {
  const [selection, setSelection] = useState<Selection>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const guideLookup = useMemo(() => buildGuideLookup(guide), [guide]);
  const headingLines = data.headingLines?.length ? data.headingLines : [strictData ? data.h2 : (guide.h2 || data.h2)].filter(Boolean);
  const mobileHeadingLine = headingLines[0] ?? "";
  const splitLastHeadingToken = (line: string) => {
    const match = line.match(/^(.*\s)([A-Z][A-Z0-9-]{2,}(?:\/[A-Z0-9-]+)*)$/);
    return match ? { lead: match[1], accent: match[2] } : { lead: line, accent: "" };
  };
  const mobileHeadingParts = splitLastHeadingToken(mobileHeadingLine);
  const intro = strictData ? data.h3 : (guide.h3 || data.h3);
  const closingLine = strictData ? (data.closingLine || "") : (guide.closing || data.closingLine || "");
  const sectionContainerClass = documentMode ? "max-w-[1400px] px-0 sm:px-0 lg:px-0" : "max-w-[1400px]";
  const topShellClass = documentMode
    ? "py-[42px] px-0 pb-[64px] md:py-[42px] md:px-0 md:pb-[64px] max-[720px]:px-0 max-[720px]:pb-[4px] max-[720px]:pt-[20px]"
    : "py-[42px] px-[18px] pb-[64px] md:py-[42px] md:px-[18px] md:pb-[64px] max-[720px]:px-[12px] max-[720px]:pb-[10px] max-[720px]:pt-[20px]";
  const tabShellClass = documentMode
    ? "max-w-[1240px] mx-auto px-0 max-[720px]:mx-[-16px] max-[720px]:px-0"
    : "max-w-[1240px] mx-auto px-[18px] max-[720px]:mx-[-16px] max-[720px]:px-0";
  const contentShellClass = documentMode
    ? "py-[42px] px-0 pb-[64px] max-[720px]:px-0 max-[720px]:pt-[4px] max-[720px]:pb-[50px]"
    : "py-[42px] px-[18px] pb-[64px] max-[720px]:px-[12px] max-[720px]:pt-[10px] max-[720px]:pb-[50px]";
  const ui = data.ui ?? {};
  const closingAction = data.closingAction ?? {};

  const renderableGroups = useMemo(
    () =>
      data.groups
        .map((group, index) => ({ group, index, validEngines: group.engines.filter(isRenderableEngineRow) }))
        .filter((entry) => entry.validEngines.length > 0),
    [data.groups],
  );

  const safeActiveIndex = activeTabIndex >= renderableGroups.length ? 0 : activeTabIndex;
  const activeGroupEntry = renderableGroups[safeActiveIndex];

  function toggleSelection(familyIndex: number, engineIndex: number) {
    setSelection((current) =>
      current?.familyIndex === familyIndex && current.engineIndex === engineIndex
        ? null
        : { familyIndex, engineIndex },
    );
  }

  function handleTabClick(index: number) {
    setActiveTabIndex(index);
    setSelection(null);
  }

    return (
      <Section id="model-engine-codes" className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)]">
      <Container className={sectionContainerClass}>
        <div className={topShellClass}>
          <div className="max-w-[1240px] mx-auto">
            <header className="max-w-[1000px]">
              {strictData ? (data.tag ? <div className="inline-flex items-center justify-center min-h-[34px] px-[16px] rounded-full bg-[linear-gradient(180deg,#16355d_0%,#081a34_100%)] text-white text-[12px] font-extrabold tracking-[0.12em] uppercase shadow-[0_8px_20px_rgba(8,26,52,0.14)] mb-[14px]">{data.tag}</div> : null) : <div className="inline-flex items-center justify-center min-h-[34px] px-[16px] rounded-full bg-[linear-gradient(180deg,#16355d_0%,#081a34_100%)] text-white text-[12px] font-extrabold tracking-[0.12em] uppercase shadow-[0_8px_20px_rgba(8,26,52,0.14)] mb-[14px]">{data.tag || guide.tag}</div>}
              <h2 className="mb-[10px] text-[clamp(31px,4vw,52px)] leading-[1.03] tracking-[-0.04em] text-[#10203a] max-[720px]:mb-[6px] max-[720px]:text-[32px]">
                <span className="block min-[721px]:hidden">
                  {mobileHeadingParts.lead}
                  {mobileHeadingParts.accent ? <span className="text-[#15803d]">{mobileHeadingParts.accent}</span> : null}
                </span>
                {headingLines.map((line, index) => (
                  <span key={`${line}-${index}`} className="hidden min-[721px]:block" style={{ color: headingLines.length > 1 && index === headingLines.length - 1 ? "#15803d" : undefined }}>
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-[#64748b] text-[16px] leading-[1.55] max-[720px]:hidden">{intro}</p>
            </header>
          </div>
        </div>
      </Container>

      {renderableGroups.length > 1 && (
        <Container className={sectionContainerClass}>
          <div className={tabShellClass}>
            <div className="overflow-hidden rounded-[6px] border border-[#d9e1ea] bg-white shadow-[0_4px_12px_rgba(13,27,46,0.05)] max-[720px]:rounded-none max-[720px]:border-x-0">
              <div className="flex items-stretch divide-x divide-[#d9e1ea]">
                {renderableGroups.map((entry, index) => {
                  const isActive = index === safeActiveIndex;
                  return (
                    <button
                      key={entry.group.name}
                      type="button"
                      className={`relative flex min-h-[46px] min-w-0 basis-0 flex-1 items-center justify-center gap-[8px] px-[12px] py-[12px] text-[13px] font-bold tracking-[0.02em] transition-all duration-200 max-[420px]:gap-[6px] max-[420px]:px-[6px] max-[420px]:text-[11px] ${
                        isActive
                          ? "z-10 bg-[linear-gradient(180deg,#173a6d_0%,#0c213f_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(6,18,35,0.85),0_0_0_1px_rgba(45,107,255,0.45),0_0_20px_rgba(45,107,255,0.45),0_8px_18px_rgba(17,47,95,0.32)] before:absolute before:inset-x-0 before:top-0 before:h-[42%] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] before:content-['']"
                          : "bg-white text-[#22324a] shadow-none hover:bg-[#f8fafc]"
                      }`}
                      onClick={() => handleTabClick(index)}
                      aria-selected={isActive}
                      role="tab"
                    >
                      <span className="relative z-10 grid h-[18px] w-[18px] place-items-center text-current max-[420px]:h-[15px] max-[420px]:w-[15px]">
                        {getFuelIcon(entry.group.name, "h-[16px] w-[16px] max-[420px]:h-[14px] max-[420px]:w-[14px]")}
                      </span>
                      <span className="relative z-10 truncate">{entry.group.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      )}

      <Container className={sectionContainerClass}>
        <div className={contentShellClass}>
          <div className="max-w-[1240px] mx-auto">
            {activeGroupEntry ? (
              <section className="mt-[24px]">
                <div className="flex items-center gap-[12px] mb-[12px] max-[720px]:hidden">
                  <span className="w-[38px] h-[38px] rounded-[12px] bg-[#f5f8fc] text-[#0d1b2e] grid place-items-center flex-shrink-0">
                    {getFuelIcon(activeGroupEntry.group.name, "w-[24px] h-[24px]")}
                  </span>
                  <div>
                    <h3 className="text-[26px] tracking-[-0.03em] text-[#10203a] max-[720px]:text-[24px]">{activeGroupEntry.group.name}</h3>
                    <p className="mt-[4px] text-[#64748b] text-[14px] leading-[1.45] max-[720px]:text-[15px]">{activeGroupEntry.group.era}</p>
                  </div>
                </div>
                <p className="hidden max-[720px]:block mb-[12px] text-[#64748b] text-[14px] leading-[1.45]">
                  {activeGroupEntry.group.era}
                </p>

                <div className="grid gap-[10px] grid-cols-2 max-[920px]:grid-cols-1 max-[720px]:gap-[2px]">
                  {chunkEngines(activeGroupEntry.validEngines).map((row, rowIndex) => {
                    const startIndex = rowIndex * 2;
                    const selectedRowEngineIndex = row.findIndex(
                      (_engine, index) =>
                        selection?.familyIndex === safeActiveIndex &&
                        selection.engineIndex === startIndex + index,
                    );
                    const activeEngine =
                      selectedRowEngineIndex >= 0 ? row[selectedRowEngineIndex] : null;
                    const visibleRow = activeEngine ? [activeEngine] : row;
                    const trailingRow = activeEngine
                      ? row.filter((engine) => engine.code !== activeEngine.code)
                      : [];

                    const renderEngineCard = (engine: EngineRow) => {
                      const originalIndex = activeGroupEntry.validEngines.findIndex(
                        (candidate) => candidate.code === engine.code,
                      );
                      const selected =
                        selection?.familyIndex === safeActiveIndex &&
                        selection.engineIndex === originalIndex;
                      const detail = getGuideDetail(engine.code, guideLookup);
                      const years = deriveYears(engine.compatibleModels, detail?.years, strictData);
                      const accordionHeading = buildAccordionHeading(engine, detail, years);
                      const summaryCode = repairEngineCodeValue(detail?.code || engine.code);
                      const summaryTitle = repairEngineTitleValue(
                        detail?.code || engine.code,
                        detail?.title || engine.title || "",
                        detail?.size || engine.size,
                        detail?.fuel || engine.fuel,
                      );

                      return (
                        <article
                          key={engine.code}
                          className={`min-w-0 ${selected ? "col-span-full" : ""}`}
                        >
                          <button
                            className={`w-full border border-[#dfe7ef] rounded-[20px] bg-white shadow-[0_12px_30px_rgba(12,29,53,0.06)] grid items-center gap-[10px] text-left text-inherit cursor-pointer transition-all duration-200 hover:bg-[#fbfdff] ${selected
                              ? "grid-cols-[minmax(0,1fr)_16px] min-h-[60px] items-center py-[11px] px-[14px] rounded-t-[14px] rounded-b-none border-[#b8cadb] shadow-[0_10px_22px_rgba(16,39,68,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] max-[720px]:min-h-[58px] max-[720px]:py-[11px] max-[720px]:px-[16px] max-[720px]:rounded-t-[12px]"
                              : "grid-cols-[54px_minmax(0,1fr)_minmax(122px,150px)_16px] min-h-[76px] py-[14px] px-[16px] max-[720px]:grid-cols-[44px_minmax(0,1fr)_minmax(104px,122px)_14px] max-[720px]:gap-[8px] max-[720px]:min-h-[72px] max-[720px]:rounded-[18px] max-[720px]:px-[12px] max-[720px]:py-[12px]"
                              }`}
                            type="button"
                            aria-expanded={selected}
                            onClick={() => toggleSelection(safeActiveIndex, originalIndex)}
                          >
                            {!selected && (
                              <span className="w-[48px] h-[48px] rounded-[14px] border border-[#d7e2ec] bg-[linear-gradient(180deg,#eef3f9_0%,#dfe8f2_100%)] text-[#334155] grid place-items-center max-[720px]:w-[40px] max-[720px]:h-[40px] max-[720px]:rounded-[12px]">
                                <EngineIcon className="w-[22px] h-[22px] max-[720px]:w-[19px] max-[720px]:h-[19px]" />
                              </span>
                            )}

                            <span className="min-w-0">
                              {selected ? (
                                <span className="block text-[#10203a] text-[18px] font-extrabold leading-[1.2] tracking-[-0.03em] max-[720px]:text-[16px]">{accordionHeading}</span>
                              ) : (
                                <span className="block">
                                  <strong className="block font-[Consolas,'SFMono-Regular',monospace] text-[20px] leading-[1] tracking-[-0.05em] text-[#10203a] max-[720px]:text-[18px]">{summaryCode}</strong>
                                  <small className="block text-[#2c3b50] text-[12px] font-medium leading-[1.3] max-[720px]:text-[11px]">{summaryTitle || toSummary(engine)}</small>
                                </span>
                              )}
                              {!selected && <span className="block mt-[4px] text-[#64748b] text-[10px] font-bold tracking-[0.04em] uppercase">{engine.power}</span>}
                            </span>

                            {!selected && (
                              <span className="text-right pl-[4px]">
                                {ui.summaryPriceLabel && <small className="block text-[#64748b] text-[8px] font-extrabold tracking-[0.12em] uppercase mb-[4px]">{ui.summaryPriceLabel}</small>}
                                <strong className="text-[#13823d] text-[18px] leading-[0.96] tracking-[-0.05em] max-[720px]:text-[16px]">{toPriceText(engine.avgRebuiltPrice)}</strong>
                              </span>
                            )}

                            <span className={`text-[#13823d] grid place-items-center transition-transform duration-200 ${selected ? "rotate-180" : ""}`}>
                              <ChevronIcon />
                            </span>
                          </button>
                        </article>
                      );
                    };

                    return (
                      <div key={`${activeGroupEntry.group.name}-${rowIndex}`} className="contents">
                        {visibleRow.map(renderEngineCard)}

                        <div className={`col-span-full ${activeEngine ? "block" : "hidden"} -mt-[14px]`}>
                          {activeEngine ? (
                            (() => {
                              const detail = getGuideDetail(activeEngine.code, guideLookup);
                              const years = deriveYears(
                                activeEngine.compatibleModels,
                                detail?.years,
                                strictData,
                              );
                              const detailImage = detail?.image || activeEngine.image;
                              const quoteText = detail?.cta || activeEngine.cta || "";
                              const engineHeading = buildEngineHeading(activeEngine, detail);
                              const historyText = buildHistory(
                                activeEngine,
                                detail,
                                modelName,
                                strictData,
                              );

                              return (
                                <div>
                                  <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-x-[12px] overflow-hidden rounded-b-[12px] bg-[linear-gradient(135deg,#081a34_0%,#0d2848_100%)] px-[12px] pb-[10px] pt-0 shadow-[0_18px_30px_rgba(11,31,57,0.26)] max-[920px]:grid-cols-1 max-[720px]:rounded-b-[12px] max-[720px]:px-[12px] max-[720px]:pb-[12px]">
                                    <div className="grid grid-cols-[150px_minmax(0,1fr)] text-white overflow-hidden max-[920px]:grid-cols-[132px_minmax(0,1fr)] max-[720px]:grid-cols-[110px_minmax(0,1fr)]">

                                      {/* Image Column - Tighter padding */}
                                      <div className="flex items-center p-[4px] max-[720px]:pt-[8px]">
                                        <div className="w-full max-h-[150px] rounded-[16px] grid place-items-center text-center">
                                          <div className="engine-image relative w-full aspect-square max-h-[150px]">
                                            {detailImage ? (
                                              <Image
                                                src={detailImage}
                                                alt={`${repairEngineCodeValue(detail?.code || activeEngine.code)} engine`}
                                                fill
                                                className="object-contain"
                                                sizes="150px"
                                              />
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Text Column - Tighter padding and gap */}
                                      <div className="grid gap-[3px] py-[4px] px-[16px] pt-[4px] pl-[12px] max-[720px]:gap-[8px] max-[720px]:px-[8px] max-[720px]:pt-[8px] max-[720px]:pb-[4px] max-[720px]:pl-[12px]">
                                        <div className="grid grid-cols-[minmax(0,1fr)_180px] gap-[8px] items-start max-[920px]:grid-cols-[minmax(0,1fr)_188px] max-[720px]:grid-cols-1">
                                          <div>
                                            {/* Reduced margins */}
                                            <div className="mb-[2px] text-white text-[15px] font-extrabold leading-[1.25] tracking-[-0.02em] max-[720px]:text-[14px]">{engineHeading}</div>
                                            {ui.historyLabel && <span className="block mb-[1px] text-white text-[13px] font-extrabold leading-[1.2] max-[720px]:mb-[4px] max-[720px]:pt-[2px] max-[720px]:text-[12px]">{ui.historyLabel}</span>}
                                            {historyText && <p className="text-[#e1ebf5] text-[11px] leading-[1.4] max-[720px]:text-[10.5px] max-[720px]:leading-[1.55]">{historyText}</p>}
                                          </div>

                                          {/* Price & Quote Column */}
                                          <div className="w-full max-w-[178px] justify-self-end py-[2px] pl-[16px] max-[720px]:hidden">

                                            {/* Glass Price Box - Minimal padding */}
                                            <div className="relative overflow-hidden rounded-[7px] border border-green-400 bg-[#0d1526]/50 backdrop-blur-xl shadow-[0_0_15px_rgba(74,222,128,0.5),inset_0_0_12px_rgba(74,222,128,0.3)] mb-1">
                                              <div
                                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"
                                                style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }}
                                              />
                                              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                              <div className="relative z-10 px-3 py-1.5">
                                                {ui.summaryPriceLabel && (
                                                  <small className="block text-[#bfd0e1] text-[9px] font-extrabold tracking-[0.12em] uppercase">
                                                    {ui.summaryPriceLabel}
                                                  </small>
                                                )}
                                                <strong className="block text-[#42d272] text-[18px] leading-[1] tracking-[-0.05em] my-[1px]">
                                                  {toPriceText(activeEngine.avgRebuiltPrice)}
                                                </strong>
                                                {ui.supplyLabel && (
                                                  <span className="block text-[#bfd0e1] text-[9px] leading-[1.4]">
                                                    {ui.supplyLabel}
                                                  </span>
                                                )}
                                              </div>
                                            </div>

                                            {/* Quote Button - Minimal padding */}
                                            {quoteText && (
                                              <a
  className="group flex w-full items-center justify-between gap-2 rounded-[7px] bg-[#050b14] py-1 px-2 shadow-[0_0_0_1px_rgba(30,144,255,1),0_0_12px_rgba(30,144,255,0.4),inset_0_0_8px_rgba(30,144,255,0.1)] transition hover:shadow-[0_0_0_1px_rgba(30,144,255,1),0_0_20px_rgba(30,144,255,0.6),inset_0_0_12px_rgba(30,144,255,0.2)]"
  href="#quote-form"
  data-quote-engine-code={repairEngineCodeValue(detail?.code || activeEngine.code)}
  data-quote-context={activeEngine.compatibleModels}
>
  <div className="flex-shrink-0 text-[#1e90ff]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <circle cx="18" cy="18" r="3.5" fill="#050b14" stroke="currentColor" />
      <text x="18" y="20" fontSize="7" fontWeight="bold" fill="currentColor" textAnchor="middle" fontFamily="sans-serif">£</text>
    </svg>
  </div>
  <span className="flex-1 text-[10px] font-bold leading-snug text-[#f1f5f9]">
    {quoteText}
  </span>
</a>
                                            )}
                                          </div>
                                        </div>

                                        {/* Variants Section - Desktop only (hidden on mobile) */}
                                        <div className="grid gap-[2px] border-t border-white/16 pt-[4px] max-[720px]:hidden">
                                          {ui.variantsLabel && <small className="block text-[#bfd0e1] text-[9px] font-extrabold tracking-[0.12em] uppercase">{ui.variantsLabel}</small>}
                                          <div className="flex flex-wrap gap-[6px]">
                                            {buildVariants(activeEngine, detail).map((variant) => (
                                              <span key={variant} className="inline-flex items-center justify-center min-h-[20px] px-[8px] rounded-[4px] bg-[linear-gradient(180deg,#1a3a66_0%,#0f2a4e_100%)] text-white text-[8px] font-bold leading-[1] shadow-[0_0_0_1px_rgba(42,109,214,1),0_0_10px_rgba(42,109,214,0.8),0_0_25px_rgba(42,109,214,0.6),0_0_50px_rgba(42,109,214,0.4),0_8px_20px_rgba(42,109,214,0.5)]">{variant}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Variants Section - Mobile only (below image + text row) */}
                                    <div className="hidden max-[720px]:grid gap-[6px] border-t border-white/16 pt-[10px] px-[10px] pb-[4px]">
                                      {ui.variantsLabel && <small className="block text-[#bfd0e1] text-[9px] font-extrabold tracking-[0.12em] uppercase max-[720px]:mb-[2px]">{ui.variantsLabel}</small>}
                                      <div className="flex flex-wrap gap-[6px]">
                                        {buildVariants(activeEngine, detail).map((variant) => (
                                          <span key={variant} className="inline-flex min-h-[26px] items-center justify-center rounded-[5px] border border-[#2d6bff] bg-[#0f2a4e] px-[10px] text-[9px] font-bold leading-[1] text-white shadow-[0_0_0_1px_rgba(45,107,255,0.28),0_0_10px_rgba(45,107,255,0.18)]">{variant}</span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Specs & Failures Columns - Tighter top padding */}
                                    <div className="grid grid-cols-2 gap-[8px] pt-[4px] max-[720px]:pt-[8px]">
                                      <section className="border border-[#dfe7ef] rounded-[7px] bg-white py-[4px] px-[9px] pb-[4px]">
                                        {ui.specsTitle && (
                                          <h4 className="mb-[3px] flex items-center gap-[8px] text-[11px] font-semibold tracking-[-0.02em] text-[#10203a] max-[720px]:mb-[6px]">
                                            <span className="w-[24px] h-[24px] rounded-[10px] grid place-items-center flex-shrink-0 bg-[#eef5fb] text-[#274564] max-[720px]:hidden">
                                              <SpecsIcon />
                                            </span>
                                            {ui.specsTitle}
                                          </h4>
                                        )}
                                        <ul className="list-none m-0 pt-4 grid gap-[8px] max-[720px]:pt-[2px] max-[720px]:gap-[10px]">
                                          {ui.fuelLabel && (
                                            <li className="flex min-h-[28px] items-center justify-between gap-[10px] py-[1px] border-b border-[#e8eef5] last:border-b-0 last:pb-[1px] max-[720px]:py-[3px]">
                                              <span className="flex items-center text-[#64748b] text-[12px] leading-[1.2]">{ui.fuelLabel}</span>
                                              <strong className="flex items-center text-[12px] leading-[1.2] text-right text-[#10203a]">{detail?.fuel || activeEngine.fuel}</strong>
                                            </li>
                                          )}
                                          {ui.sizeLabel && (
                                            <li className="flex min-h-[28px] items-center justify-between gap-[10px] py-[1px] border-b border-[#e8eef5] last:border-b-0 last:pb-[1px] max-[720px]:py-[3px]">
                                              <span className="flex items-center text-[#64748b] text-[12px] leading-[1.2]">{ui.sizeLabel}</span>
                                              <strong className="flex items-center text-[12px] leading-[1.2] text-right text-[#10203a]">{detail?.size || activeEngine.size}</strong>
                                            </li>
                                          )}
                                          {ui.powerLabel && (
                                            <li className="flex min-h-[28px] items-center justify-between gap-[10px] py-[1px] border-b border-[#e8eef5] last:border-b-0 last:pb-[1px] max-[720px]:py-[3px]">
                                              <span className="flex items-center text-[#64748b] text-[12px] leading-[1.2]">{ui.powerLabel}</span>
                                              <strong className="flex items-center text-[12px] leading-[1.2] text-right text-[#10203a]">{detail?.power || activeEngine.power}</strong>
                                            </li>
                                          )}
                                          {ui.yearsLabel && (
                                            <li className="flex min-h-[28px] items-center justify-between gap-[10px] py-[1px] border-b border-[#e8eef5] last:border-b-0 last:pb-[1px] max-[720px]:py-[3px]">
                                              <span className="flex items-center text-[#64748b] text-[12px] leading-[1.2]">{ui.yearsLabel}</span>
                                              <strong className="flex items-center text-[12px] leading-[1.2] text-right text-[#10203a]">{years}</strong>
                                            </li>
                                          )}
                                        </ul>
                                      </section>

                                      <section className="border border-[#dfe7ef] rounded-[7px] bg-white py-[4px] px-[9px] pb-[4px]">
                                        {ui.failuresTitle && (
                                          <h4 className="mb-[3px] flex items-center gap-[8px] text-[11px] font-semibold tracking-[-0.02em] text-[#10203a] max-[720px]:mb-[6px]">
                                            <span className="w-[24px] h-[24px] rounded-[10px] grid place-items-center flex-shrink-0 bg-[#fff2f2] text-[#c73a3a] max-[720px]:hidden">
                                              <WarningIcon />
                                            </span>
                                            {ui.failuresTitle}
                                          </h4>
                                        )}
                                        <ul className="list-none m-0 pt-4 grid gap-[2px] max-[720px]:pt-[2px] max-[720px]:gap-[8px]">
                                          {buildFailures(detail, activeGroupEntry.group.failureNote).map((failure) => (
                                            <li key={failure} className="relative pl-[12px] text-[#2d3e55] text-[12px] leading-[1.28] before:content-[''] before:absolute before:top-[6px] before:left-0 before:w-[6px] before:h-[6px] before:rounded-full before:bg-[#c73a3a] before:shadow-[0_0_0_3px_rgba(199,58,58,0.14)]">{failure}</li>
                                          ))}
                                        </ul>
                                      </section>
                                    </div>

                                    {/* Mobile Bottom Section */}
                                    <div className="hidden max-[720px]:grid gap-[4px] py-[2px] pt-[12px] pb-[2px]">
                                      {/* Price Box */}
                                      <div className="relative overflow-hidden rounded-[7px] border border-green-400 bg-[#0d1526]/50 backdrop-blur-xl shadow-[0_0_15px_rgba(74,222,128,0.5),inset_0_0_12px_rgba(74,222,128,0.3)]">
                                        <div
                                          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"
                                          style={{ clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 40% 100%)' }}
                                        />
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                                        <div className="relative z-10 px-3 py-1.5">
                                          {ui.summaryPriceLabel && (
                                            <small className="block text-[#bfd0e1] text-[9px] font-extrabold tracking-[0.12em] uppercase">
                                              {ui.summaryPriceLabel}
                                            </small>
                                          )}
                                          <strong className="block text-[#42d272] text-[18px] leading-[1] tracking-[-0.05em] my-[1px]">
                                            {toPriceText(activeEngine.avgRebuiltPrice)}
                                          </strong>
                                          {ui.supplyLabel && (
                                            <span className="block text-[#bfd0e1] text-[9px] leading-[1.4]">
                                              {ui.supplyLabel}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Quote CTA */}
                                      {quoteText && (
                                        <a
  className="group flex w-full items-center justify-between gap-3 rounded-[7px] border border-[#2d6bff] bg-[#071322] px-3 py-3 text-left shadow-[0_0_0_1px_rgba(45,107,255,0.32),0_0_16px_rgba(45,107,255,0.18)] transition hover:shadow-[0_0_0_1px_rgba(45,107,255,0.5),0_0_22px_rgba(45,107,255,0.28)]"
  href="#quote-form"
  data-quote-engine-code={repairEngineCodeValue(detail?.code || activeEngine.code)}
  data-quote-context={activeEngine.compatibleModels}
>
  <div className="flex-shrink-0 text-[#2a6dd6] drop-shadow-[0_0_8px_rgba(42,109,214,0.55)]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <circle cx="18" cy="18" r="3.5" fill="#050b14" stroke="currentColor" />
      <text x="18" y="20" fontSize="7" fontWeight="bold" fill="currentColor" textAnchor="middle" fontFamily="sans-serif">£</text>
    </svg>
  </div>
  <span className="flex-1 text-[11px] font-bold leading-snug text-white [&>span]:hidden">
    <span className="mr-[6px] inline-block text-[#2a6dd6] drop-shadow-[0_0_8px_rgba(42,109,214,0.55)]" aria-hidden="true">→</span>
    {quoteText}
  </span>
  <ArrowIcon className="h-[13px] w-[13px] flex-none text-[#2a6dd6] drop-shadow-[0_0_8px_rgba(42,109,214,0.55)]" />
</a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()
                          ) : null}
                        </div>

                        {trailingRow.map(renderEngineCard)}
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {(closingLine || closingAction.title || closingAction.buttonText) && (
              <div className="mt-[30px] border border-[#0d1b2e] rounded-[22px] bg-white grid grid-cols-[74px_1fr_auto] gap-[16px] items-center p-[18px] shadow-[0_12px_30px_rgba(12,29,53,0.06)] max-[920px]:grid-cols-1 max-[720px]:hidden">
                <div className="w-[58px] h-[58px] rounded-[16px] bg-[#f5f8fc] text-[#0d1b2e] grid place-items-center">
                  <CarIcon />
                </div>
                <div>
                  {closingAction.title && <h3 className="mb-[6px] text-[20px] tracking-[-0.03em] text-[#10203a]">{closingAction.title}</h3>}
                  {closingLine && <p className="text-[#40546c] text-[14px] leading-[1.5]">{closingLine}</p>}
                </div>
                {closingAction.buttonText && (
                  <a href="#quote-form" className="inline-flex items-center justify-center gap-[10px] min-h-[48px] px-[20px] rounded-[14px] bg-[#0d1b2e] text-white text-[15px] font-extrabold whitespace-nowrap shadow-[0_10px_20px_rgba(13,27,46,0.18)]">
                    {closingAction.buttonText}
                    <ArrowIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
