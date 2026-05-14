"use client";

import { useMemo, useState } from "react";
import type { EngineCodeDirectoryData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineCodeDirectoryData;
  bgImage?: string;
};

function parseFamilyName(name: string) {
  const match = name.match(/^(.*?)(?:\s*\(([^)]+)\))?$/);
  return {
    label: (match?.[1] ?? name).trim(),
    subtitle: match?.[2]?.trim() ?? "",
  };
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180 text-green-600" : "text-slate-500"}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10v6M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DieselIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M15 7V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PetrolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
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

function extractCodeLabel(title: string) {
  const match = title.match(/^[A-Z0-9-]+(?:\s*\/\s*[A-Z0-9-]+)*/);
  return match?.[0] ?? title;
}

export default function EngineCodeDirectorySection({ data, bgImage }: Props) {
  const [activeFamilyIndex, setActiveFamilyIndex] = useState(0);
  const [openIndices, setOpenIndices] = useState<number[]>(() => data.families.map(() => 0));
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeFamily = data.families[activeFamilyIndex] ?? data.families[0];
  const activeOpenIndex = openIndices[activeFamilyIndex] ?? 0;
  const familyMeta = parseFamilyName(activeFamily?.name ?? "");
  const decorativeBgImage = bgImage ?? activeFamily?.entries[0]?.image ?? data.families[0]?.entries[0]?.image;

  const filteredCodes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return data.directory.codes;

    return data.directory.codes.filter((item) => {
      const haystack = `${item.code} ${item.fuel}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [data.directory.codes, searchQuery]);

  function handleOpenEntry(entryIndex: number) {
    setOpenIndices((current) => current.map((value, index) => (index === activeFamilyIndex ? entryIndex : value)));
  }

  return (
    <Section className="relative overflow-hidden bg-white">
      {decorativeBgImage ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden overflow-hidden lg:block">
          <div
            className="absolute right-0 top-0 h-[230px] w-[470px] opacity-[0.22]"
            style={{
              backgroundImage: `linear-gradient(270deg, rgba(255,255,255,0.12), rgba(255,255,255,0.9) 48%, rgba(255,255,255,0.98) 100%), url(${decorativeBgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
              filter: "grayscale(1)",
            }}
          />
        </div>
      ) : null}

      <Container>
        <div className="relative z-[1] max-w-[620px]">
          <div>
            {data.tag ? <p className="text-label mb-0.5 text-green-700">{data.tag}</p> : null}
            <h2>{data.h2}</h2>
            {data.intro ? <p className="text-body mt-1.5 max-w-[560px] text-slate-700">{data.intro}</p> : null}
          </div>
        </div>

        {data.families.length > 0 ? (
          <>
            <div className="mt-3 flex gap-0 overflow-x-auto rounded-[10px] border border-slate-200 bg-white pb-0 lg:hidden">
              {data.families.map((family, index) => {
                const isActive = index === activeFamilyIndex;
                const parsed = parseFamilyName(family.name);

                return (
                  <button
                    key={family.name}
                    type="button"
                    onClick={() => setActiveFamilyIndex(index)}
                    className={`min-w-[120px] shrink-0 border-r border-slate-200 px-4 py-3 text-center font-['Manrope'] text-[11.5px] font-extrabold transition last:border-r-0 lg:hidden ${
                      isActive ? "bg-[#0d1b2e] text-white shadow-[inset_0_-3px_0_#16a34a]" : "bg-white text-[#0d1b2e]"
                    }`}
                  >
                    {parsed.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[168px_minmax(0,1fr)] lg:items-start">
              <div className="hidden lg:block">
                <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(13,27,46,0.06)]">
                  {data.families.map((family, index) => {
                    const isActive = index === activeFamilyIndex;
                    const parsed = parseFamilyName(family.name);

                    return (
                      <button
                        key={family.name}
                        type="button"
                        onClick={() => setActiveFamilyIndex(index)}
                        className={`flex w-full items-start gap-3 border-b border-slate-200 px-4 py-3 text-left last:border-b-0 ${
                          isActive ? "bg-[#0d1b2e] text-white shadow-[inset_3px_0_0_#16a34a]" : "bg-white text-[#0d1b2e]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border ${
                            isActive
                              ? "border-white/15 bg-white/6 text-green-400"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                          }`}
                        >
                          {index % 2 === 0 ? <DieselIcon /> : <PetrolIcon />}
                        </span>
                        <span className="min-w-0">
                            <span className="block font-['Manrope'] text-[13px] font-extrabold leading-[1.2]">
                              {parsed.label}
                            </span>
                          {parsed.subtitle ? (
                            <span className={`mt-1 block text-[10.5px] font-semibold ${isActive ? "text-green-400" : "text-green-700"}`}>
                              {parsed.subtitle}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(13,27,46,0.06)]">
                <div className="bg-[#0d1b2e] px-4 py-3 lg:hidden">
                  <div
                    role="heading"
                    aria-level={3}
                    className="font-['Manrope'] text-[15px] font-extrabold leading-[1.2] text-white"
                  >
                    {familyMeta.label}
                  </div>
                  {familyMeta.subtitle ? (
                    <p className="mt-1 text-[11.5px] font-semibold text-green-400">{familyMeta.subtitle}</p>
                  ) : null}
                </div>

                <div className="p-2.5 lg:p-0">
                  {activeFamily.entries.map((entry, entryIndex) => {
                    const isOpen = entryIndex === activeOpenIndex;

                    return (
                      <article
                        key={entry.title}
                        className={`overflow-hidden rounded-[12px] border ${
                          isOpen ? "border-green-100 bg-[#fbfdfb]" : "border-slate-200 bg-white"
                        } ${entryIndex > 0 ? "mt-1.5" : ""} lg:rounded-none lg:border-x-0 lg:border-t-0 lg:last:border-b-0`}
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenEntry(entryIndex)}
                          className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left ${
                            isOpen ? "bg-[#f7fbf8]" : ""
                          }`}
                        >
                          <span className={`font-['Manrope'] text-[14px] font-extrabold leading-[1.25] ${isOpen ? "text-green-700" : "text-[#0d1b2e]"}`}>
                            {entry.title}
                          </span>
                          <ChevronIcon open={isOpen} />
                        </button>

                        {isOpen ? (
                          <div className="px-4 pb-3">
                            <p className="border-t border-slate-200 pt-2.5 text-[12.5px] leading-[1.68] text-slate-700">
                              {entry.description}
                            </p>
                            <div className="mt-2.5 hidden rounded-[10px] border border-green-100 bg-[#f7fbf8] p-3 lg:block">
                              <p className="text-[10px] font-black uppercase tracking-[0.08em] text-green-700">Common Issues</p>
                              <ul className="mt-1.5 space-y-1 text-[11px] leading-[1.35] text-slate-600">
                                {entry.description
                                  .split(/[,.]/)
                                  .map((part) => part.trim())
                                  .filter(Boolean)
                                  .slice(0, 4)
                                  .map((issue) => (
                                    <li key={issue} className="flex gap-2">
                                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                                      <span>{issue}</span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                            <a
                              href="#quote-form"
                              data-quote-engine-code={extractCodeLabel(entry.title)}
                              data-quote-context={entry.title}
                              className="mt-2.5 inline-flex items-center gap-2 text-[12.2px] font-bold leading-[1.35] text-green-600"
                            >
                              {entry.cta.replace(/\s*-+>\s*$/, "")}
                              <ArrowIcon className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-2.5 hidden rounded-[12px] border border-green-200 bg-[#f6fff8] px-4 py-3 lg:block">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
              <InfoIcon />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-['Manrope'] text-[13px] font-extrabold leading-[1.2] text-[#0d1b2e]">Need Help Choosing?</p>
              <p className="mt-0.5 text-[11px] leading-[1.45] text-slate-600">{data.closing}</p>
            </div>
            <a
              href="#quote-form"
              className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-green-300 px-4 py-2 text-[10.5px] font-black uppercase tracking-[0.08em] text-green-700 transition hover:bg-white"
            >
              Get Help
              <ArrowIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-2.5 flex gap-3 rounded-[12px] border border-green-200 bg-[#f0fdf4] px-4 py-3 lg:hidden">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <InfoIcon />
          </span>
          <p className="text-[12px] leading-[1.5] text-slate-700">{data.closing}</p>
        </div>

        <div className={`mt-2.5 overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(13,27,46,0.05)] ${directoryOpen ? "ring-1 ring-green-100" : ""}`}>
          <button
            type="button"
            onClick={() => setDirectoryOpen((current) => !current)}
            className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
          >
            <span className="min-w-0">
              <span className="block font-['Manrope'] text-[14px] font-extrabold leading-[1.3] text-[#0d1b2e] lg:text-[15px]">
                {data.directory.h3}
              </span>
              {data.directory.label ? (
                <span className="mt-1 block text-[12px] leading-[1.45] text-slate-500">{data.directory.label}</span>
              ) : null}
            </span>
            <ChevronIcon open={directoryOpen} />
          </button>

          {directoryOpen ? (
            <div className="border-t border-slate-200">
              <div className="px-3 pt-3 lg:px-4">
                <label className="relative block">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path
                        d="m21 21-4.35-4.35M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Filter engine codes..."
                    className="h-10 w-full rounded-[9px] border border-slate-300 bg-slate-50 pl-10 pr-4 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-300 focus:bg-white"
                  />
                </label>
              </div>

              <p className="border-b border-slate-200 px-4 py-2.5 text-[12.1px] leading-[1.55] text-slate-500">
                {data.directory.intro}
              </p>

              <div className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-4 lg:gap-2.5 lg:p-3">
                {filteredCodes.map((item, index) => {
                  const isPetrol = item.fuel.toLowerCase().includes("petrol");

                  return (
                    <a
                      key={`${item.code}-${item.fuel}-${index}`}
                      href="#quote-form"
                      data-quote-engine-code={item.code}
                      data-quote-context={item.code}
                      className="flex items-start gap-2 rounded-[10px] border border-slate-200 bg-white px-3 py-2.5 transition hover:border-green-200 hover:bg-[#fbfdfb]"
                    >
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] ${
                          isPetrol ? "bg-orange-50 text-amber-500" : "bg-blue-50 text-blue-400"
                        }`}
                      >
                        {isPetrol ? <PetrolIcon /> : <DieselIcon />}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-['Manrope'] text-[13px] font-extrabold leading-[1.2] text-slate-700">{item.code}</span>
                        <span className="mt-1 block text-[11px] text-slate-400">{item.fuel}</span>
                      </span>
                    </a>
                  );
                })}
              </div>

              {filteredCodes.length === 0 ? (
                <p className="px-4 pb-4 text-[12.5px] text-slate-500">No engine codes match that filter yet.</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
