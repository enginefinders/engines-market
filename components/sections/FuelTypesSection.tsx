"use client";

import { useState } from "react";
import type { FuelTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: FuelTypesData;
  bgImage?: string;
  strictData?: boolean;
  documentMode?: boolean;
};

type FuelItem = FuelTypesData["items"][number];

function normalizeText(text: string) {
  return text.replace(/Â·/g, "·").replace(/Â£/g, "£").replace(/[Ã¢â‚¬â€œÃ¢â‚¬â€]/g, "-");
}

function FuelIcon() {
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

function getTabLabel(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("diesel")) return "Diesel";
  if (normalized.includes("petrol")) return "Petrol";
  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) return "MHEV";
  if (normalized.includes("plug-in") || normalized.includes("phev")) return "PHEV";
  if (normalized.includes("electric")) return "Electric";
  return title;
}

function getTabKind(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("diesel")) return "diesel";
  if (normalized.includes("petrol")) return "petrol";
  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) return "mhev";
  if (normalized.includes("plug-in") || normalized.includes("phev")) return "phev";
  if (normalized.includes("electric")) return "electric";
  return "other";
}

function TabFuelIcon({ kind }: { kind: ReturnType<typeof getTabKind> }) {
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

  if (kind === "mhev" || kind === "phev" || kind === "electric") {
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

  if (label) {
    return label;
  }

  return strictData ? "" : fallback;
}

function FuelPanel({
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

export default function FuelTypesSection({ data, bgImage, strictData = false, documentMode = false }: Props) {
  const items = data.items ?? [];
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const mobileTabRailClass = "mt-6 max-[720px]:mx-[-16px]";

  const activeItem = items[activeItemIndex] ?? items[0] ?? null;
  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const ui = data.ui ?? {};

  return (
    <Section className="relative overflow-hidden bg-white">
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
                    const fuelType = getTabLabel(item.title);
                    const fuelKind = getTabKind(item.title);

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
                          <TabFuelIcon kind={fuelKind} />
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
            <FuelPanel item={activeItem} ui={ui} strictData={strictData} />
          </div>
        ) : (
          <div className="mt-6 rounded-[14px] border border-slate-200 bg-white px-5 py-5 shadow-[0_2px_10px_rgba(13,27,46,0.04)]">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0d1b2e] text-white">
                <FuelIcon />
              </span>
              <div>
                <div
                  role="heading"
                  aria-level={3}
                  className="font-['Manrope'] text-[16px] font-extrabold leading-[1.2] text-[#0d1b2e]"
                >
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
