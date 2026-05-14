"use client";

import { useMemo, useState } from "react";
import type { FuelTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: FuelTypesData;
  bgImage?: string;
};

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

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 15 17 18 14 21M17 18H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ElectricIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M12 3 2.7 19a1.4 1.4 0 0 0 1.2 2h16.2a1.4 1.4 0 0 0 1.2-2L12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FuelTypeIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("plug-in") || normalized.includes("phev")) {
    return <PlugIcon />;
  }

  if (normalized.includes("mild hybrid") || normalized.includes("mhev")) {
    return <BatteryIcon />;
  }

  if (normalized.includes("electric")) {
    return <ElectricIcon />;
  }

  if (normalized.includes("petrol")) {
    return <PetrolIcon />;
  }

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

function isElectrified(title: string) {
  const normalized = title.toLowerCase();
  return normalized.includes("hybrid") || normalized.includes("electric");
}

function splitFoundIn(entry: string) {
  const parts = entry.split(" - ");
  if (parts.length < 2) {
    return { strong: "", text: entry };
  }

  return {
    strong: parts[0],
    text: parts.slice(1).join(" - "),
  };
}

function splitFamily(item: string) {
  const parts = item.split(" - ");
  if (parts.length < 2) {
    return { title: item, detail: "" };
  }

  return {
    title: parts[0],
    detail: parts.slice(1).join(" - "),
  };
}

export default function FuelTypesSection({ data, bgImage }: Props) {
  const items = data.items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0] ?? null;

  const heading = useMemo(() => {
    if (data.h2.toLowerCase().includes("by fuel type")) {
      return {
        lineOne: data.h2,
        lineTwo: "diesel, petrol, hybrid & electric",
      };
    }

    return {
      lineOne: data.h2,
      lineTwo: "",
    };
  }, [data.h2]);

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
        <div className="relative z-[1] max-w-[860px]">
          <p className="inline-flex rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-green-700">
            Engine Fuel Type
          </p>

          <h2 className="mt-3">{heading.lineOne}</h2>
          {heading.lineTwo ? (
            <p className="mt-1 font-['Manrope'] text-[1.15rem] font-bold tracking-[-0.02em] text-green-700 sm:text-[1.32rem]">
              - {heading.lineTwo}
            </p>
          ) : null}
          <p className="text-body mt-3 max-w-[760px] text-slate-600">{data.intro}</p>
        </div>

        <div className="mt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-[10px] border px-4 py-2.5 font-['Manrope'] text-[12.5px] font-bold transition lg:min-w-[140px] lg:justify-center ${
                    isActive
                      ? "border-[#0d1b2e] bg-[#0d1b2e] text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-green-200 hover:text-[#0d1b2e]"
                  }`}
                >
                  <span className={isActive ? "text-green-400" : "text-slate-400"}>
                    <FuelTypeIcon title={item.title} />
                  </span>
                  {getTabLabel(item.title)}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center gap-2 lg:hidden">
            <div className="h-[2px] flex-1 rounded-full bg-[#0d1b2e]" style={{ maxWidth: `${20 + (activeIndex / Math.max(items.length - 1, 1)) * 40}%` }} />
            <div className="h-[2px] flex-1 rounded-full bg-slate-200" />
          </div>
        </div>

        {activeItem ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start">
          <div>
            <div className="rounded-[14px] bg-[#0d1b2e] px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-green-600 text-white">
                  <FuelTypeIcon title={activeItem?.title ?? ""} />
                </span>
                <div
                  role="heading"
                  aria-level={3}
                  className="font-['Manrope'] text-[16px] font-extrabold leading-[1.2] text-white lg:text-[18px]"
                >
                  {activeItem.title}
                </div>
              </div>
            </div>

            <p className="mt-4 text-[12.5px] leading-[1.7] text-slate-700 lg:text-[13px]">
              {activeItem.descriptor || activeItem.description}
            </p>

            {activeItem.families?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.1em] text-green-700">
                  {isElectrified(activeItem.title) ? "Common Engine Codes" : "Common Engine Families"}
                </p>
                <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_1px_6px_rgba(13,27,46,0.05)]">
                  {activeItem.families.map((family, index) => {
                    const parsed = splitFamily(family);

                    return (
                      <div
                        key={family}
                        className={`px-4 py-3 ${index < activeItem.families!.length - 1 ? "border-b border-slate-100" : ""}`}
                      >
                        <div className="font-['Manrope'] text-[13px] font-bold leading-[1.3] text-[#0d1b2e]">
                          {parsed.title}
                        </div>
                        {parsed.detail ? (
                          <p className="mt-1 text-[11.5px] leading-[1.5] text-slate-500">{parsed.detail}</p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {activeItem.foundIn?.length ? (
              <div className="mt-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.1em] text-green-700">Found In</p>
                <div className="space-y-2">
                  {activeItem.foundIn.map((entry) => {
                    const parsed = splitFoundIn(entry);

                    return (
                      <div key={entry} className="flex gap-2 text-[12px] leading-[1.55]">
                        <span className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full bg-green-600" />
                        <span className="text-slate-500">
                          {parsed.strong ? <span className="font-bold text-[#0d1b2e]">{parsed.strong}</span> : null}
                          {parsed.strong ? " - " : ""}
                          {parsed.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between rounded-[12px] bg-[#0d1b2e] px-4 py-4 text-left transition hover:bg-[#16304e]"
            >
              <span className="font-['Manrope'] text-[14px] font-bold leading-[1.3] text-white">
                {activeItem.cta.replace(/\s*-+>\s*$/, "")}
              </span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-green-600 text-white">
                <ArrowIcon />
              </span>
            </button>
          </div>

          <div className="space-y-4">
            {activeItem.knownFor?.length ? (
              <div className="rounded-[12px] border border-green-200 bg-green-50 px-4 py-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.1em] text-green-700">
                  {isElectrified(activeItem.title) ? "How It Works" : "Known For (Brand-wide)"}
                </p>
                <div className="space-y-2">
                  {activeItem.knownFor.map((entry, index) => (
                    <div key={entry} className="flex gap-2 text-[12px] leading-[1.55] text-slate-700">
                      <span className={`mt-[4px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                        isElectrified(activeItem.title) ? "bg-[#0d1b2e] text-white text-[9px] font-bold" : "bg-green-600"
                      }`}>
                        {isElectrified(activeItem.title) ? index + 1 : <span className="h-[7px] w-[7px] rounded-full bg-white" />}
                      </span>
                      <span>{entry}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeItem.typicalModels?.length ? (
              <div className="rounded-[12px] border border-slate-200 bg-white shadow-[0_1px_6px_rgba(13,27,46,0.04)]">
                <p className="px-4 pt-4 text-[10px] font-black uppercase tracking-[0.1em] text-green-700">
                  Typical Models (UK)
                </p>
                <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-b-[12px] border-t border-slate-100">
                  {activeItem.typicalModels.map((model, index) => (
                    <div
                      key={model}
                      className={`px-4 py-3 text-[11.5px] font-medium text-slate-700 ${
                        index % 2 === 0 ? "border-r border-slate-100" : ""
                      } ${index < activeItem.typicalModels!.length - 2 ? "border-b border-slate-100" : ""}`}
                    >
                      {model}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {activeItem.importantNotes?.length ? (
              <div className="rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-4">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.1em] text-amber-700">Important Notes</p>
                <div className="space-y-2">
                  {activeItem.importantNotes.map((entry) => (
                    <div key={entry} className="flex gap-2 text-[12px] leading-[1.55] text-amber-900">
                      <span className="mt-[2px] text-amber-500">
                        <AlertIcon />
                      </span>
                      <span>{entry}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
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
                  Fuel type guidance
                </div>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-slate-600">
                  {data.intro}
                </p>
                <p className="mt-3 text-[12px] leading-[1.65] text-slate-500">
                  Detailed fuel-type content is being standardised across all brand pages. You can still use the registration
                  form above to identify the correct engine and matching replacement options.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-[12px] border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_6px_rgba(13,27,46,0.04)]">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-green-50 text-green-700">
              <ShieldCheckIcon />
            </span>
            <p className="text-[12px] leading-[1.65] text-slate-500 lg:text-[12.5px]">
              {data.closing}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
