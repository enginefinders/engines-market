"use client";

import { useState } from "react";
import type { FuelTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: FuelTypesData;
  bgImage?: string;
  strictData?: boolean;
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

function PetrolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M18 10h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10v4M12 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 7v4a5 5 0 0 0 10 0V7M9 7V3M15 7V3M12 16v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ElectricIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M13 6 8 13h4l-1 5 5-7h-4l1-5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" aria-hidden="true">
      <path d="M7 7h11m0 0-3-3m3 3-3 3M17 17H6m0 0 3-3m-3 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-[14px] w-[14px] transition ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PanelIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("plug-in") || normalized.includes("phev")) return <PlugIcon />;
  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) return <BatteryIcon />;
  if (normalized.includes("electric")) return <ElectricIcon />;
  if (normalized.includes("petrol")) return <PetrolIcon />;
  return <FuelIcon />;
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
  mobile = false,
  ui,
  strictData = false,
}: {
  item: FuelItem;
  mobile?: boolean;
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
      <div className="rounded-t-[14px] bg-[#0d1b2e] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-[#16a34a] text-white">
            <PanelIcon title={item.title} />
          </span>
          <div
            role="heading"
            aria-level={3}
            className="font-['Manrope'] text-[15px] font-extrabold leading-[1.2] !text-white"
          >
            {item.title}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="text-[12px] leading-[1.7] text-[#475569]">
          {normalizeText(item.descriptor || item.description)}
        </p>

        {families.length ? (
          <div className="mt-4 rounded-[12px] border border-[#e5e7eb] bg-white">
            {familiesLabel ? <div className="border-b border-[#eef2f7] px-4 py-[10px] text-[10px] font-black uppercase tracking-[0.08em] text-[#16a34a]">{familiesLabel}</div> : null}
            <div className="px-4 py-3">
              <div className="space-y-[10px]">
                {families.map((entry) => {
                  const parsed = splitDashItem(entry);
                  return (
                    <div key={entry} className="flex gap-2 text-[11.5px] leading-[1.55] text-[#475569]">
                      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
                      <span>
                        <span className="font-bold text-[#0d1b2e]">{parsed.title}</span>
                        {parsed.detail ? ` - ${parsed.detail}` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {foundIn.length ? (
          <div className="mt-3 rounded-[12px] border border-[#e5e7eb] bg-white">
            {foundInLabel ? <div className="border-b border-[#eef2f7] px-4 py-[10px] text-[10px] font-black uppercase tracking-[0.08em] text-[#16a34a]">{foundInLabel}</div> : null}
            <div className="px-4 py-3">
              <div className="space-y-[10px]">
                {foundIn.map((entry) => {
                  const parsed = splitDashItem(entry);
                  return (
                    <div key={entry} className="flex gap-2 text-[11.5px] leading-[1.55] text-[#475569]">
                      <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
                      <span>
                        <span className="font-bold text-[#0d1b2e]">{parsed.title}</span>
                        {parsed.detail ? ` - ${parsed.detail}` : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {knownFor.length ? (
            <div className="mt-3 rounded-[12px] border border-[#e5e7eb] bg-white">
              {knownForLabel ? <div className="border-b border-[#eef2f7] px-4 py-[10px] text-[10px] font-black uppercase tracking-[0.08em] text-[#16a34a]">{knownForLabel}</div> : null}
            <div className="px-4 py-3">
              <div className="space-y-[10px]">
                {knownFor.map((entry) => (
                  <div key={entry} className="flex gap-2 text-[11.5px] leading-[1.55] text-[#475569]">
                    <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
                    <span>{normalizeText(entry)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {typicalModels.length ? (
          <div className="mt-3 rounded-[12px] border border-[#e5e7eb] bg-white">
            {modelsLabel ? <div className="border-b border-[#eef2f7] px-4 py-[10px] text-[10px] font-black uppercase tracking-[0.08em] text-[#16a34a]">{modelsLabel}</div> : null}
            <div className={`grid gap-x-4 gap-y-[10px] px-4 py-3 ${mobile ? "grid-cols-1" : "grid-cols-2"}`}>
              {typicalModels.map((entry) => (
                <div key={entry} className="flex gap-2 text-[11.5px] leading-[1.55] text-[#475569]">
                  <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
                  <span>{normalizeText(entry)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {item.cta ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-[10px] border border-[#0d1b2e] bg-white px-4 py-3">
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
          <div className="mt-3 rounded-[12px] border border-[#e5e7eb] bg-white">
            {notesLabel ? <div className="border-b border-[#eef2f7] px-4 py-[10px] text-[10px] font-black uppercase tracking-[0.08em] text-[#16a34a]">{notesLabel}</div> : null}
            <div className="px-4 py-3">
              <div className="space-y-[10px]">
                {importantNotes.map((entry) => (
                  <div key={entry} className="flex gap-2 text-[11.5px] leading-[1.55] text-[#475569]">
                    <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
                    <span>{normalizeText(entry)}</span>
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

export default function FuelTypesSection({ data, bgImage, strictData = false }: Props) {
  const items = data.items ?? [];
  const [visibleItemIndices, setVisibleItemIndices] = useState(items.length >= 2 ? [0, 1] : [0]);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [desktopSwapOpen, setDesktopSwapOpen] = useState(false);
  const [mobileSwapOpen, setMobileSwapOpen] = useState(false);

  const activeItem = items[activeItemIndex] ?? items[0] ?? null;
  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const ui = data.ui ?? {};
  const visibleItems = visibleItemIndices.map((index) => items[index]).filter(Boolean);
  const hiddenItemIndices = items
    .map((_, index) => index)
    .filter((index) => !visibleItemIndices.includes(index));

  const desktopSwapIn = (incomingIndex: number) => {
    setVisibleItemIndices((current) => {
      if (current.includes(incomingIndex)) return current;
      const replaceSlot = current.findIndex((index) => index !== activeItemIndex);
      const slot = replaceSlot >= 0 ? replaceSlot : Math.max(current.length - 1, 0);
      const next = [...current];
      next[slot] = incomingIndex;
      return next;
    });
    setActiveItemIndex(incomingIndex);
    setDesktopSwapOpen(false);
  };

  const mobileSelectItem = (incomingIndex: number) => {
    setActiveItemIndex(incomingIndex);
    setMobileSwapOpen(false);
  };

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

      <Container>
        <div className="relative z-[1]">
          <p className="section-pill">{data.tag}</p>

          <div className="mt-3 flex items-start justify-between gap-4">
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

            {items.length > 1 ? (
              <div className="relative hidden lg:block">
                <button
                  type="button"
                  onClick={() => setDesktopSwapOpen((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-[9px] bg-[#0d1b2e] px-4 py-3 text-white transition hover:bg-[#16304e]"
                >
                  <SwapIcon />
                  <ChevronDownIcon open={desktopSwapOpen} />
                </button>

                {desktopSwapOpen ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[240px] rounded-[12px] border border-[#e5e7eb] bg-white p-2 shadow-[0_14px_34px_rgba(13,27,46,0.16)]">
                    {strictData ? (ui.swapLabel ? <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">{ui.swapLabel}</div> : null) : <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">{ui.swapLabel ?? "Swap panel"}</div>}
                    <div className="flex flex-col gap-1">
                      {hiddenItemIndices.map((index) => {
                        const item = items[index];
                        return (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => desktopSwapIn(index)}
                            className="flex items-center gap-2 rounded-[9px] px-3 py-[10px] text-left text-[11px] font-bold text-[#0d1b2e] transition hover:bg-[#f8fafc]"
                          >
                            <PanelIcon title={item.title} />
                            <span>{getTabLabel(item.title)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {activeItem && items.length ? (
          <>
            <div className="relative mt-5 lg:hidden">
              <div className="rounded-[10px] bg-[#0d1b2e] p-[3px]">
                <div className="flex items-center justify-between gap-2 rounded-[8px] bg-[#0d1b2e] px-3 py-[10px] text-white">
                  <div className="flex min-w-0 items-center gap-2">
                    <PanelIcon title={activeItem.title} />
                    <span className="truncate text-[12px] font-bold">{activeItem.title}</span>
                  </div>
                  {items.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setMobileSwapOpen((current) => !current)}
                      className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/5 px-2 py-[6px] text-white"
                    >
                      <SwapIcon />
                      <ChevronDownIcon open={mobileSwapOpen} />
                    </button>
                  ) : null}
                </div>
              </div>

              {mobileSwapOpen ? (
                <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[240px] rounded-[12px] border border-[#e5e7eb] bg-white p-2 shadow-[0_12px_30px_rgba(13,27,46,0.14)]">
                  {strictData ? (ui.swapLabel ? <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">{ui.swapLabel}</div> : null) : <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.5px] text-[#94a3b8]">{ui.swapLabel ?? "Swap panel"}</div>}
                  <div className="flex flex-col gap-1">
                    {items
                      .map((item, index) => ({ item, index }))
                      .filter(({ index }) => index !== activeItemIndex)
                      .map(({ item, index }) => (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => mobileSelectItem(index)}
                          className="flex items-center gap-2 rounded-[9px] px-3 py-[10px] text-left text-[11px] font-bold text-[#0d1b2e] transition hover:bg-[#f8fafc]"
                        >
                          <PanelIcon title={item.title} />
                          <span>{item.title}</span>
                        </button>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mt-5 hidden gap-4 lg:grid lg:grid-cols-2 lg:items-stretch">
              {(visibleItems.length ? visibleItems : [activeItem]).map((item, slot) => {
                const itemIndex = visibleItemIndices[slot] ?? activeItemIndex;
                const isVisibleActive = itemIndex === activeItemIndex;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveItemIndex(itemIndex)}
                    className={`h-full text-left transition ${isVisibleActive ? "" : "lg:opacity-[0.98]"}`}
                  >
                    <FuelPanel item={item} mobile={false} ui={ui} strictData={strictData} />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 lg:hidden">
              <FuelPanel item={activeItem} mobile ui={ui} strictData={strictData} />
            </div>
          </>
        ) : (
          <div className="mt-5 rounded-[14px] border border-slate-200 bg-white px-5 py-5 shadow-[0_2px_10px_rgba(13,27,46,0.04)]">
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
                  {strictData ? (ui.emptyStateDescription || "") : (ui.emptyStateDescription ?? "Detailed fuel-type content is being standardised across all brand pages. You can still use the registration form above to identify the correct engine and matching replacement options.")}
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
