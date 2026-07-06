"use client";

import { useState } from "react";
import type { EngineSizesData } from "@/types/brand";
import { AdviceCard } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineSizesData;
  bgImage?: string;
  dynamicBrandLabel?: boolean;
  displayMode?: "brand" | "document";
};

type FuelKind = "diesel" | "petrol" | "hybrid";
type GroupItem = EngineSizesData["groups"][number]["items"][number];

function tagVariant(title: string): FuelKind {
  const normalized = title.toLowerCase();
  if (normalized.includes("hybrid") || normalized.includes("electric")) return "hybrid";
  if (normalized.includes("petrol")) return "petrol";
  return "diesel";
}

function normalizeText(text: string) {
  return text.replace(/Â·/g, "·").replace(/Â£/g, "£").replace(/[Ã¢â‚¬â€œÃ¢â‚¬â€]/g, "-");
}

function splitHeading(text: string) {
  const parts = text.split(/\s+-\s+/);
  return {
    primary: parts[0] ?? text,
    accent: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function brandNameLabel(brandName: string, sizeTitle: string, kind: FuelKind) {
  if (brandName === "__use_item_title__") {
    return sizeTitle;
  }
  if (kind === "hybrid") return `${brandName} ${sizeTitle}`;
  if (kind === "petrol") return `${brandName} ${sizeTitle} Petrol Engines`;
  return `${brandName} ${sizeTitle} Diesel Engines`;
}

function FuelTabIcon({ kind }: { kind: FuelKind }) {
  if (kind === "petrol") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "hybrid") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <path
          d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline points="14 15 17 18 14 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="18" x2="9" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 7V5h8v2M6 10h2M16 10h2M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12Zm8-5v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RowChevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[16px] w-[16px] text-[#94a3b8] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function fuelBadgeLabel(kind: FuelKind) {
  if (kind === "hybrid") return "Hybrid & Electric";
  if (kind === "petrol") return "Petrol";
  return "Diesel";
}

function fuelBadgeClass(kind: FuelKind) {
  if (kind === "petrol") return "border-[#fed7aa] bg-[#fff8f0] text-[#c2410c]";
  if (kind === "hybrid") return "border-[#0d1b2e] bg-[#f8fbff] text-[#0d1b2e]";
  return "border-[#0d1b2e] bg-[#f8fbff] text-[#0d1b2e]";
}

function SizeAccordionCard({
  brandName,
  dynamicBrandLabel,
  displayMode,
  item,
  kind,
  open,
  onToggle,
  ui,
}: {
  brandName: string;
  dynamicBrandLabel: boolean;
  displayMode: "brand" | "document";
  item: GroupItem;
  kind: FuelKind;
  open: boolean;
  onToggle: () => void;
  ui: NonNullable<EngineSizesData["ui"]>;
}) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-[13px] text-left transition hover:bg-[#fafafa]"
      >
        <span className="mt-[2px] h-7 w-[4px] flex-none rounded-full bg-[#22c55e]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="font-['Manrope'] text-[14px] font-extrabold leading-[1.2] text-[#0d1b2e]">
              {item.title}
            </div>
            <span className={`rounded-full border px-[8px] py-[2px] text-[9px] font-bold uppercase tracking-[0.5px] ${fuelBadgeClass(kind)}`}>
              {fuelBadgeLabel(kind)}
            </span>
          </div>
          {item.compatibleModels?.length ? (
            <p className="mt-[2px] text-[10.5px] leading-[1.45] text-[#64748b]">
              {item.compatibleModels.slice(0, 5).join(", ")}
            </p>
          ) : null}
        </div>
        <RowChevron open={open} />
      </button>

      {open ? (
        <div className="border-t border-[#eef2f7] px-4 py-[14px]">
          {displayMode === "brand" ? (
            <div className="font-['Manrope'] text-[14px] font-extrabold leading-[1.25] text-[#0d1b2e]">
              {dynamicBrandLabel
                ? brandNameLabel("__use_item_title__", item.title, kind)
                : brandNameLabel(brandName, item.title, kind)}
            </div>
          ) : null}
          <p className={`${displayMode === "brand" ? "mt-2" : ""} text-[12px] leading-[1.65] text-[#475569]`}>
            {normalizeText(item.description)}
          </p>

          <div className="mt-4 overflow-hidden rounded-[10px] border border-[#d8ebdd] bg-white">
            <table className="w-full border-collapse">
              <tbody>
                {item.engineCodes?.length ? (
                  <tr className="border-b border-[#e5f2e8]">
                    <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#64748b]">{displayMode === "document" ? (ui.engineCodesLabel || "") : (ui.engineCodesLabel ?? "Engine Code(s)")}</td>
                    <td className="px-3 py-[10px] text-[11px] leading-[1.5] text-[#334155]">{item.engineCodes.join(", ")}</td>
                  </tr>
                ) : null}
                {item.compatibleModels?.length ? (
                  <tr className="border-b border-[#e5f2e8]">
                    <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#64748b]">{displayMode === "document" ? (ui.compatibleModelsLabel || "") : (ui.compatibleModelsLabel ?? "Compatible Models (UK)")}</td>
                    <td className="px-3 py-[10px] text-[11px] leading-[1.5] text-[#334155]">{item.compatibleModels.join(", ")}</td>
                  </tr>
                ) : null}
                {item.productionYears ? (
                  <tr>
                    <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#64748b]">{displayMode === "document" ? (ui.productionYearsLabel || "") : (ui.productionYearsLabel ?? "Production Years")}</td>
                    <td className="px-3 py-[10px] text-[11px] leading-[1.5] text-[#334155]">{item.productionYears}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {item.commonFailurePoints?.length ? (
            <div className="mt-4 flex gap-3">
              <div className="w-[2px] flex-none rounded-full bg-[#f97316]" />
              <div className="min-w-0">
                <div className="font-['Manrope'] text-[11px] font-extrabold uppercase tracking-[0.05em] text-[#dc2626]">
                  {displayMode === "document"
                    ? (ui.warningLabel || "Common Failure Points")
                    : (ui.warningLabel ?? (kind === "hybrid" ? "Important Notes" : "Common Failure Points"))}
                </div>
                <p className="mt-1 text-[11px] leading-[1.55] text-[#475569]">
                  {item.commonFailurePoints.join(", ")}
                </p>
              </div>
            </div>
          ) : null}

          <a
            href="#quote-form"
            data-quote-context={item.title}
            data-quote-source="engine-sizes"
            className="mt-4 flex w-full items-center justify-between rounded-[8px] border border-[#12294a] bg-[#0d1b2e] px-3 py-[11px] text-[11.5px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_16px_rgba(13,27,46,0.18)] transition hover:bg-[#16304e]"
          >
            <span>{item.cta.replace(/\s*->\s*$/, "")}</span>
            <span className="text-[#22c55e]">
              <ArrowIcon />
            </span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

function HelperNote({
  text,
  ui,
}: {
  text: string;
  ui: NonNullable<EngineSizesData["ui"]>;
}) {
  return (
    <AdviceCard
      tone="dark"
      label={ui.helperLabel ?? "Engine Size Advice"}
      title={ui.helperTitle ?? "Need help matching the exact engine size?"}
      body={normalizeText(text)}
      ctaText={ui.helperButtonText ?? "Find My Engine"}
      linkProps={{
        href: "#quote-form",
        "data-quote-context": "Engine sizes helper note",
        "data-quote-source": "engine-sizes",
      }}
    />
  );
}

export default function EngineSizesSection({
  brandName,
  data,
  bgImage,
  dynamicBrandLabel = false,
  displayMode = "brand",
}: Props) {
  const ui = data.ui ?? {};
  const groups = data.groups;
  
  // Simplified state management (removed dropdown/swap logic)
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [openItemIndex, setOpenItemIndex] = useState(0);

  const split = splitHeading(data.h2);
  const headingLines = data.headingLines?.length ? data.headingLines : [split.primary, split.accent].filter(Boolean);
  const activeGroup = groups[activeGroupIndex] ?? groups[0];
  const activeKind = tagVariant(activeGroup?.title ?? "diesel");

  return (
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 hidden h-[270px] w-[390px] opacity-[0.08] lg:block"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,249,250,0.08), rgba(248,249,250,0.84)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className="relative max-w-[1400px]">
        <div className="section-pill mb-[14px]">
          {/* <TagIcon /> */}
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[820px] font-['Manrope'] text-[26px] font-extrabold leading-[1.16] tracking-[-0.5px] text-[#0d1b2e] md:text-[30px] lg:text-[34px]">
          {headingLines.map((line, index) => (
            <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-[10px] max-w-[560px] text-[13px] leading-[1.65] text-[#64748b]">{data.intro}</p>

        {/* Unified Responsive Tab Navigation */}
        <div className="mt-5">
          <div className="overflow-hidden rounded-[8px] border border-[#d9e1ea] bg-white shadow-[0_4px_12px_rgba(13,27,46,0.05)]">
            <div className="flex items-stretch">
              {groups.map((group, index) => {
                const isActive = index === activeGroupIndex;
                const kind = tagVariant(group.title);
                const shortLabel = fuelBadgeLabel(kind).toUpperCase();

                return (
                  <button
                    key={group.title}
                    type="button"
                    onClick={() => {
                      setActiveGroupIndex(index);
                      setOpenItemIndex(0);
                    }}
                    className={`flex flex-1 items-center justify-center gap-1 border-r border-[#d9e1ea] px-2 py-[10px] font-['Manrope'] text-[11px] font-bold transition-all duration-200 md:gap-[8px] md:px-4 md:py-[11px] md:text-[12px] ${
                      index === groups.length - 1 ? "border-r-0" : ""
                    } ${
                      isActive
                        ? "bg-[linear-gradient(180deg,#1a3a66_0%,#0f2a4e_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(42,109,214,0.95),0_0_8px_rgba(42,109,214,0.45),0_4px_12px_rgba(42,109,214,0.28)]"
                        : "bg-white text-[#0d1b2e] hover:bg-[#f8fafc]"
                    }`}
                  >
                    {isActive && (
                      <span className="hidden md:inline-flex">
                        <FuelTabIcon kind={kind} />
                      </span>
                    )}
                    <span className="hidden md:inline truncate">
                      {isActive ? group.title.toUpperCase() : shortLabel}
                    </span>
                    <span className="md:hidden truncate">
                      {shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-[10px]">
          {activeGroup?.items.map((item, index) => (
            <SizeAccordionCard
              key={item.title}
              brandName={brandName}
              dynamicBrandLabel={dynamicBrandLabel}
              displayMode={displayMode}
              item={item}
              kind={activeKind}
              open={openItemIndex === index}
              onToggle={() => setOpenItemIndex((current) => (current === index ? -1 : index))}
              ui={ui}
            />
          ))}
        </div>

        {displayMode === "document" ? (
          <p className="mt-5 text-[12.5px] leading-[1.75] text-[#475569]">
            {normalizeText(data.closing)}
          </p>
        ) : (
          <div className="mt-5">
            <HelperNote text={data.closing} ui={ui} />
          </div>
        )}
      </Container>
    </Section>
  );
}
