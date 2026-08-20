"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import type { EngineCodesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineCodesData;
  bgImage?: string;
};

type EngineItem = EngineCodesData["groups"][number]["engines"][number] & {
  groupName: string;
  era: string;
  failureNote: string;
};

type FuelTab = {
  key: "diesel" | "petrol" | "hybrid";
  title: string;
  subtitle: string;
  items: EngineItem[];
};

const ENGINE_IMAGE_POOL = [
  "/images/engines/fac66331-c94d-48e9-983a-7997fd84a619_removalai_preview.webp",
];

function clean(text?: string) {
  return (text ?? "")
    .replace(/Ãƒâ€šÃ‚Â£|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£|Ã‚Â£/g, "Â£")
    .replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“|ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â|ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Ëœ|Ã¢â‚¬â€œ|Ã¢â‚¬â€/g, "-")
    .replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢/g, "'")
    .replace(/ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ|ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â/g, '"')
    .replace(/Ãƒâ€šÃ‚Â·|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·/g, "Â·")
    .replace(/ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢/g, "->")
    .replace(/\s+/g, " ")
    .trim();
}

function brandFromHeading(data: EngineCodesData) {
  const source = clean(data.h2 || data.tag);
  return source.split(/\s+/)[0] || "BMW";
}

function tabKeyForFuel(fuel: string): FuelTab["key"] {
  if (/petrol/i.test(fuel)) return "petrol";
  if (/hybrid|electric|phev|bev/i.test(fuel)) return "hybrid";
  return "diesel";
}

function tabMeta(key: FuelTab["key"]) {
  if (key === "petrol") return { title: "Petrol Engines", subtitle: "Most replaced in the UK" };
  if (key === "hybrid") return { title: "Hybrid & Electrified Engines", subtitle: "Most replaced in the UK" };
  return { title: "Diesel Engines", subtitle: "Most replaced in the UK" };
}

function imageIndexForCode(code: string) {
  const hash = code.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return hash % ENGINE_IMAGE_POOL.length;
}

function engineImage(code: string, suppliedImage?: string) {
  if (suppliedImage && !suppliedImage.includes("/brands/bmw/engines/") && suppliedImage.includes("/engines/")) {
    return suppliedImage;
  }

  return ENGINE_IMAGE_POOL[imageIndexForCode(code)];
}

function heroImageForBrand(brand: string, bgImage?: string) {
  if (/bmw/i.test(brand)) return ENGINE_IMAGE_POOL[0];
  if (bgImage && bgImage.includes("/engines/")) return bgImage;
  return ENGINE_IMAGE_POOL[0];
}

function yearsFromModels(text: string) {
  const match = clean(text).match(/\(([^)]+)\)/);
  return match?.[1]?.trim() ?? "Check by registration";
}

function summaryTitle(engine: EngineItem) {
  const title = clean(engine.title);
  if (title && /[a-z]/i.test(title) && !/^\d+(?:\.\d+)?$/i.test(title)) {
    return title;
  }

  return [clean(engine.size), clean(engine.fuel)].filter(Boolean).join(" ");
}

function engineSeries(code: string) {
  const primaryCode = clean(code).split("/")[0]?.trim().toUpperCase() || clean(code).toUpperCase();
  const match = primaryCode.match(/^[A-Z]\d+/);
  return match?.[0] ?? primaryCode;
}

function accordionHeading(engine: EngineItem) {
  const years = yearsFromModels(engine.compatibleModels);
  return `${engineSeries(engine.code)} Series (${years})`;
}

function engineDescription(engine: EngineItem) {
  const title = summaryTitle(engine);
  const compatible = clean(engine.compatibleModels);
  const power = clean(engine.power);
  const fuel = clean(engine.fuel).toLowerCase();

  return `${clean(engine.code)} is a ${title}${power ? ` producing ${power}` : ""}. This ${fuel} setup appears across ${compatible} and remains one of the most commonly requested ${clean(engine.groupName).toLowerCase()} replacements.`;
}

function tableRows(engine: EngineItem) {
  return [
    {
      label: "ENGINE CODE(S)",
      value: clean(engine.code),
    },
    {
      label: "COMPATIBLE MODELS (UK)",
      value: clean(engine.compatibleModels),
    },
    {
      label: "PRODUCTION YEARS",
      value: yearsFromModels(engine.compatibleModels),
    },
  ];
}

function priceText(value: string) {
  return clean(value).replace(/^from\s+/i, "");
}

function buildTabs(data: EngineCodesData): FuelTab[] {
  const buckets = new Map<FuelTab["key"], EngineItem[]>();

  data.groups.forEach((group) => {
    group.engines.forEach((engine) => {
      const key = tabKeyForFuel(engine.fuel);
      const next = buckets.get(key) ?? [];
      next.push({
        ...engine,
        groupName: group.name,
        era: group.era,
        failureNote: group.failureNote,
      });
      buckets.set(key, next);
    });
  });

  return (["diesel", "petrol", "hybrid"] as const)
    .map((key) => ({
      key,
      ...tabMeta(key),
      items: buckets.get(key) ?? [],
    }))
    .filter((tab) => tab.items.length > 0);
}

function SvgIcon({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function EngineStrokeIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M7 9V6h4v3h2.8l1.4 2H18v6h-2.8l-1.4 2H7.2L5.8 17H4v-6h1.8L7.2 9H7Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9 6V4h4v2M18 13h2M4 13H2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </SvgIcon>
  );
}

function FuelPumpIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M6 21V4.8A1.8 1.8 0 0 1 7.8 3h6.4A1.8 1.8 0 0 1 16 4.8V21M5 21h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6h5v4H8zM16 8h1.6L20 10.4V18a2 2 0 1 1-4 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function BoltIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="m13 2-8 12h6l-1 8 9-13h-6V2Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function CubeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5 7 7 4 7-4M12 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </SvgIcon>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M5 5h14v15H5zM8 3v4M16 3v4M5 9h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function CodeIcon() {
  return (
    <SvgIcon className="h-4 w-4">
      <path d="M7 8h10M7 16h10M4 5h16v14H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function ListIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </SvgIcon>
  );
}

function Chevron({ open = false, className = "h-4 w-4" }: { open?: boolean; className?: string }) {
  return (
    <SvgIcon className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function Arrow({ direction = "right", className = "h-4 w-4" }: { direction?: "left" | "right"; className?: string }) {
  return (
    <SvgIcon className={`${className} ${direction === "left" ? "rotate-180" : ""}`}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

function TabIcon({ type, className = "h-9 w-9" }: { type: FuelTab["key"]; className?: string }) {
  if (type === "petrol") return <FuelPumpIcon className={className} />;
  if (type === "hybrid") return <BoltIcon className={className} />;
  return <EngineStrokeIcon className={className} />;
}

function SpecIcon({ type }: { type: "power" | "fuel" | "size" | "years" }) {
  const className = "h-[18px] w-[18px] shrink-0 text-[#082c72]";
  if (type === "power") return <BoltIcon className={className} />;
  if (type === "fuel") return <FuelPumpIcon className={className} />;
  if (type === "years") return <CalendarIcon className={className} />;
  return <CubeIcon className={className} />;
}

export default function EngineCodesSection({ data, bgImage }: Props) {
  const brand = brandFromHeading(data);
  const tabs = useMemo(() => buildTabs(data), [data]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEngineCodes, setSelectedEngineCodes] = useState<Record<string, string>>({});
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const safeActiveTab = activeTab < tabs.length ? activeTab : 0;
  const currentTab = tabs[safeActiveTab] ?? tabs[0];
  const allEngines = tabs.flatMap((tab) => tab.items);
  const activeEngines = currentTab?.items ?? [];
  const selectedEngineCode =
    (currentTab ? selectedEngineCodes[currentTab.key] : "") &&
    activeEngines.some((engine) => engine.code === selectedEngineCodes[currentTab.key])
      ? selectedEngineCodes[currentTab.key]
      : activeEngines[0]?.code ?? "";

  if (!currentTab) return null;

  return (
    <Section id="brand-engine-codes" className="relative overflow-hidden bg-white !py-0">
      <Container className="max-w-[1450px] px-4 py-7 sm:px-5 lg:px-6 lg:py-10">
        <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_78%_18%,rgba(43,111,255,0.14),transparent_34%),linear-gradient(115deg,#ffffff_0%,#ffffff_58%,#eef5ff_100%)]">
          <div className="pointer-events-none absolute -right-16 top-8 h-56 w-[58%] rounded-l-full bg-[linear-gradient(135deg,rgba(219,234,254,0.92),rgba(255,255,255,0)_72%)]" />
          <div className="pointer-events-none absolute right-2 top-7 hidden text-[180px] font-black leading-none text-[#dce8f8]/45 lg:block">{brand[0]}</div>

          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_470px] lg:items-center">
            <div className="relative z-[1]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#06265a] px-4 py-2 text-[12px] font-black uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(6,38,90,0.18)]">
                <CodeIcon />
                Engine Codes
              </div>
              <h2 className="mt-5 max-w-[860px] font-['Manrope'] text-[34px] font-black leading-[1.05] tracking-[-1px] text-[#061a33] sm:text-[42px] lg:text-[54px]">
                {brand} Engine Codes - <span className="text-[#08784a]">Most Replaced Engines & Full Directory</span>
              </h2>
              <p className="mt-4 max-w-[760px] text-[16px] leading-[1.7] text-[#112844]">
                Every major {brand} engine code with technical specs, compatible UK models, known failures and average rebuilt prices. Open any accordion below to compare fitment details in one connected view.
              </p>
            </div>

            <div className="relative min-h-[220px] lg:min-h-[280px]">
              <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle_at_center,rgba(30,102,210,0.14)_0_1px,transparent_1px_28px)]" />
              <div className="relative z-[1] h-[220px] lg:h-[300px]">
                <Image
                  src={heroImageForBrand(brand, bgImage)}
                  alt=""
                  fill
                  className="object-contain drop-shadow-[0_28px_30px_rgba(6,26,51,0.16)]"
                  sizes="(max-width: 1024px) 100vw, 470px"
                />
              </div>
            </div>
          </div>

          <div className="relative z-[1] mt-6 rounded-[15px] border border-[#d8e4f2] bg-white shadow-[0_12px_28px_rgba(6,26,51,0.08)]">
            <div className="grid grid-cols-1 overflow-hidden rounded-t-[15px] divide-y divide-[#d8e4f2] sm:divide-x sm:divide-y-0" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
              {tabs.map((tab, index) => {
                const active = index === activeTab;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={`flex min-h-[74px] items-center justify-between gap-4 px-6 py-4 text-left transition ${active ? "bg-[linear-gradient(135deg,#07316f,#061a33)] text-white" : "bg-white text-[#061a33] hover:bg-slate-50"}`}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <TabIcon type={tab.key} className="h-9 w-9 shrink-0" />
                      <span>
                        <span className="block font-['Manrope'] text-[18px] font-black leading-tight">{tab.title}</span>
                        <span className={`mt-0.5 block text-[12px] ${active ? "text-white/82" : "text-slate-500"}`}>{tab.subtitle}</span>
                      </span>
                    </span>
                    <Chevron open={active} className="h-5 w-5 shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              {activeEngines.length ? (
                <>
                  <div className="mb-4 rounded-[14px] border border-[#dbe5f1] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-3 text-[#16304f]">
                    <p className="font-['Manrope'] text-[15px] font-black">Select exact {brand} engine code</p>
                    <p className="mt-1 text-[13px] leading-[1.6] text-slate-600">
                      The open accordion keeps the description, specification table, failure points and quote CTA in one connected block so the active engine is immediately clear.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {activeEngines.map((engine) => {
                      const selected = engine.code === selectedEngineCode;
                      const rows = tableRows(engine);

                      return (
                        <article key={`${currentTab.key}-${engine.code}`} className={selected ? "lg:col-span-2" : ""}>
                          <div
                            className={`overflow-hidden rounded-[20px] bg-white transition-all duration-200 ${
                              selected
                                ? "border border-[#bfd5f8] shadow-[0_0_0_1px_rgba(59,130,246,0.12),0_0_24px_rgba(59,130,246,0.14),0_18px_36px_rgba(12,29,53,0.08)]"
                                : "border border-[#dfe7ef] shadow-[0_12px_30px_rgba(12,29,53,0.06)]"
                            }`}
                          >
                            <button
                              type="button"
                              aria-expanded={selected}
                              onClick={() =>
                                setSelectedEngineCodes((current) => ({
                                  ...current,
                                  [currentTab.key]: current[currentTab.key] === engine.code ? "" : engine.code,
                                }))
                              }
                              className={`w-full text-left transition-all duration-200 hover:bg-[#fbfdff] ${
                                selected
                                  ? "border-b border-[#dbe7f5] px-4 py-4 sm:px-5"
                                  : "px-4 py-4 sm:px-5"
                              }`}
                            >
                              <span className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
                                <span className="flex min-w-0 items-start gap-4">
                                  <span aria-hidden="true" className="mt-[2px] block h-[44px] w-[4px] rounded-full bg-[#22c55e]" />
                                  <span className="min-w-0">
                                    <span className="flex flex-wrap items-center gap-3">
                                      <strong className="text-[24px] leading-[0.96] tracking-[-0.04em] text-[#10203a] max-[720px]:text-[18px]">
                                        {accordionHeading(engine)}
                                      </strong>
                                      <span className="inline-flex min-h-[30px] items-center rounded-full border border-[#9ec1ff] bg-[#f4f8ff] px-3 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#2d6bff]">
                                        {clean(engine.groupName)}
                                      </span>
                                    </span>
                                    <small className="mt-2 block text-[13px] font-medium leading-[1.45] text-[#66778f] max-[720px]:text-[11px]">
                                      {clean(engine.compatibleModels)}
                                    </small>
                                  </span>
                                </span>

                                <span className="flex items-center justify-end gap-3 max-[720px]:mt-[10px]">
                                  {!selected && engine.avgRebuiltPrice ? (
                                    <span className="text-right">
                                      <small className="mb-1 block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#708197]">
                                        Avg. rebuilt price
                                      </small>
                                      <strong className="block text-[20px] leading-none tracking-[-0.04em] text-[#13823d] max-[720px]:text-[16px]">
                                        {priceText(engine.avgRebuiltPrice)}
                                      </strong>
                                    </span>
                                  ) : null}
                                  <span className={`grid h-[34px] w-[34px] place-items-center rounded-full border border-[#d7e5fb] bg-[#f5f9ff] text-[#13823d] transition-transform duration-200 ${selected ? "rotate-180" : ""}`}>
                                    <Chevron />
                                  </span>
                                </span>
                              </span>
                            </button>

                            {selected ? (
                              <div className="grid gap-5 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 lg:grid-cols-[minmax(0,1.18fr)_240px] lg:items-start">
                                <div className="min-w-0">
                                  <div className="text-[30px] font-extrabold leading-none tracking-[-0.05em] text-[#10203a] max-[720px]:text-[24px]">
                                    {clean(engine.code)}
                                  </div>
                                  <p className="mt-2 text-[15px] font-semibold leading-[1.45] text-[#30455f] max-[720px]:text-[13px]">
                                    {summaryTitle(engine)}
                                  </p>

                                  <p className="mt-4 text-[14px] leading-[1.7] text-[#42546d] max-[720px]:mt-[12px] max-[720px]:text-[12.5px]">
                                    {engineDescription(engine)}
                                  </p>

                                  <div className="mt-4 overflow-hidden rounded-[18px] border border-[#dbe7f5] bg-[#fcfdff]">
                                    {rows.map((row, rowIndex) => (
                                      <div
                                        key={`${engine.code}-${row.label}`}
                                        className={`grid grid-cols-[minmax(148px,0.42fr)_minmax(0,1fr)] max-[720px]:grid-cols-[minmax(126px,0.56fr)_minmax(0,1fr)] ${
                                          rowIndex < rows.length - 1 ? "border-b border-[#e7eef8]" : ""
                                        }`}
                                      >
                                        <div className="border-r border-[#e7eef8] px-4 py-[15px] text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#51657f] max-[720px]:px-3 max-[720px]:py-[13px] max-[720px]:text-[10px]">
                                          {row.label}
                                        </div>
                                        <div className="px-[18px] py-[15px] text-[15px] font-medium leading-[1.6] text-[#132640] max-[720px]:px-3 max-[720px]:py-[13px] max-[720px]:text-[12.5px]">
                                          {row.value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="mt-4 border-l-[3px] border-[#f97316] pl-[14px]">
                                    <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-[#dc2626] max-[720px]:text-[11px]">
                                      Common Failure Points
                                    </p>
                                    <p className="mt-2 text-[14px] leading-[1.65] text-[#3e516a] max-[720px]:text-[12.5px]">
                                      {clean(engine.failureNote)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex h-full flex-col gap-4">
                                  <div className="flex min-h-[220px] items-center justify-center rounded-[18px] border border-[#e3ebf4] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f9fe_100%)] p-5 max-[720px]:min-h-[180px]">
                                    <div className="relative aspect-square w-full max-w-[190px]">
                                      <Image
                                        src={engineImage(engine.code, engine.image)}
                                        alt={`${clean(engine.code)} engine`}
                                        fill
                                        className="object-contain"
                                        sizes="190px"
                                      />
                                    </div>
                                  </div>

                                  <div className="rounded-[18px] border border-[#e3ebf4] bg-[#f8fbff] px-4 py-4">
                                    <small className="block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#708197]">
                                      Avg. rebuilt price
                                    </small>
                                    <strong className="mt-1 block text-[30px] leading-none tracking-[-0.05em] text-[#13823d] max-[720px]:text-[24px]">
                                      {priceText(engine.avgRebuiltPrice)}
                                    </strong>
                                    <div className="mt-4 grid gap-3 text-[13px] text-[#061a33]">
                                      <p className="flex items-center gap-2"><SpecIcon type="power" />{clean(engine.power)}</p>
                                      <p className="flex items-center gap-2"><SpecIcon type="fuel" />{clean(engine.fuel)}</p>
                                      <p className="flex items-center gap-2"><SpecIcon type="size" />{clean(engine.size)}</p>
                                      <p className="flex items-center gap-2"><SpecIcon type="years" />{yearsFromModels(engine.compatibleModels)}</p>
                                    </div>
                                  </div>
                                </div>

                                <a
                                  href="#quote-form"
                                  data-quote-engine-code={engine.code}
                                  className="group inline-flex min-h-[58px] items-center justify-between gap-[14px] rounded-[14px] bg-[#071d45] px-[18px] text-[15px] font-extrabold text-white shadow-[0_14px_28px_rgba(7,29,69,0.18)] transition hover:bg-[#0a285f] lg:col-span-2 max-[720px]:min-h-[54px] max-[720px]:px-[14px] max-[720px]:text-[13px]"
                                >
                                  <span>{clean(engine.cta || `Get quotes for ${engine.code}`)}</span>
                                  <Arrow className="h-[14px] w-[14px] text-[#1f9f43] transition-transform duration-200 group-hover:translate-x-[2px]" />
                                </a>
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="rounded-[14px] border border-[#dbe5f1] bg-[#f8fbff] px-5 py-8 text-center text-[#16304f]">
                  <p className="font-['Manrope'] text-[22px] font-black">{tabMeta(currentTab.key).title}</p>
                  <p className="mx-auto mt-2 max-w-[560px] text-[14px] leading-[1.6] text-slate-600">
                    Hybrid engine-code data is ready to display here once the new content is imported.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-[1] mt-5 rounded-[15px] border border-[#e2e8f0] bg-white shadow-[0_8px_22px_rgba(6,26,51,0.06)]">
            <button type="button" onClick={() => setDirectoryOpen((current) => !current)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
              <span className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#061a33] text-white">
                  <ListIcon />
                </span>
                <span>
                  <span className="block font-['Manrope'] text-[22px] font-black text-[#061a33]">View All {brand} Engine Codes</span>
                  <span className="mt-1 block text-[14px] text-slate-600">{allEngines.length}+ codes grouped by fuel type, years and average rebuilt price.</span>
                </span>
              </span>
              <Chevron open={directoryOpen} />
            </button>
            {directoryOpen ? (
              <div className="grid gap-2 border-t border-[#e2e8f0] p-4 sm:grid-cols-2 lg:grid-cols-3">
                {allEngines.map((engine) => (
                  <div key={`all-${engine.code}`} className="rounded-[10px] border border-[#edf2f7] bg-[#fbfdff] px-3 py-2 text-[13px]">
                    <span className="font-black text-[#061a33]">{clean(engine.code)}</span>
                    <span className="ml-2 whitespace-nowrap text-[#08784a]">{priceText(engine.avgRebuiltPrice)}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
