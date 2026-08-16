"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
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
    .replace(/Ã‚Â£|Ãƒâ€šÃ‚Â£|Â£/g, "£")
    .replace(/Ã¢â‚¬â€œ|Ã¢â‚¬â€|Ã¢â‚¬â€˜|â€“|â€”/g, "-")
    .replace(/Ã¢â‚¬â„¢/g, "'")
    .replace(/Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"')
    .replace(/Ã‚Â·|Ãƒâ€šÃ‚Â·/g, "·")
    .replace(/Ã¢â€ â€™/g, "->")
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
    <SvgIcon className={`${className} transition-transform ${open ? "rotate-180" : ""}`}>
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

function EngineCodeCard({
  engine,
  expanded,
  onToggle,
}: {
  engine: EngineItem;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="flex min-h-full min-w-0 flex-col overflow-hidden rounded-[14px] bg-white p-4 shadow-[0_10px_24px_rgba(6,26,51,0.16)] ring-1 ring-white/70">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="rounded-[7px] bg-[linear-gradient(135deg,#08784a,#064f36)] px-3 py-1.5 font-['Manrope'] text-[18px] font-black leading-none text-white">
            {clean(engine.code)}
          </span>
          <span className="rounded-[7px] bg-[#123f91] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] text-white">
            {clean(engine.size)} {clean(engine.fuel)}
          </span>
        </div>
        <button type="button" onClick={onToggle} className="rounded-full p-1.5 text-[#061a33] hover:bg-slate-100" aria-label="Toggle engine details">
          <Chevron open={expanded} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-[118px_minmax(0,1fr)] gap-4">
        <img src={engineImage(engine.code, engine.image)} alt="" className="h-[116px] w-full object-contain drop-shadow-[0_16px_18px_rgba(6,26,51,0.16)]" loading="lazy" />
        <div className="grid content-center gap-2 text-[13px] text-[#061a33]">
          <p className="flex items-center gap-2"><SpecIcon type="power" />{clean(engine.power)}</p>
          <p className="flex items-center gap-2"><SpecIcon type="fuel" />{clean(engine.fuel)}</p>
          <p className="flex items-center gap-2"><SpecIcon type="size" />{clean(engine.size)}</p>
          <p className="flex items-center gap-2"><SpecIcon type="years" />{clean(engine.era)}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200 pt-3">
        <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[#061a33]">History</p>
        <p className="mt-1 line-clamp-3 text-[13px] leading-[1.55] text-slate-700">{clean(engine.compatibleModels)}</p>
      </div>

      {expanded ? (
        <div className="mt-3 rounded-[10px] border border-[#cfe0f2] bg-[#f8fbff] p-3 text-[12.5px] leading-[1.55] text-slate-700">
          <p><strong className="text-[#061a33]">Known failure note: </strong>{clean(engine.failureNote)}</p>
          <p className="mt-2"><strong className="text-[#061a33]">Compatible models: </strong>{clean(engine.compatibleModels)}</p>
        </div>
      ) : null}

      <div className="mt-auto min-w-0 border-t border-slate-200 pt-3">
        <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#061a33]">Avg. rebuilt price (supply only)</div>
        <div className="mt-1 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <p className="min-w-0 truncate whitespace-nowrap font-['Manrope'] text-[18px] font-black text-[#08784a] xl:text-[19px]">{clean(engine.avgRebuiltPrice)}</p>
          <a href="#quote-form" data-quote-engine-code={engine.code} className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-extrabold text-[#06265a] hover:text-[#08784a] xl:text-[12px]">
            <span>View Details</span> <Arrow className="h-3.5 w-3.5 xl:h-4 xl:w-4" />
          </a>
        </div>
        <a href="#quote-form" data-quote-engine-code={engine.code} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#08784a] px-3 py-2.5 text-[13px] font-extrabold text-[#065f46]">
          <Arrow /> {clean(engine.cta || `Get quotes for ${engine.code}`)}
        </a>
      </div>
    </article>
  );
}

export default function EngineCodesSection({ data, bgImage }: Props) {
  const brand = brandFromHeading(data);
  const tabs = useMemo(() => buildTabs(data), [data]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const currentTab = tabs[activeTab] ?? tabs[0];
  const allEngines = tabs.flatMap((tab) => tab.items);
  const cardsPerSlide = 4;
  const slideCount = Math.max(1, Math.ceil((currentTab?.items.length ?? 0) / cardsPerSlide));
  const safeSlide = Math.min(activeSlide, slideCount - 1);
  const visibleEngines = (currentTab?.items ?? []).slice(safeSlide * cardsPerSlide, safeSlide * cardsPerSlide + cardsPerSlide);

  useEffect(() => {
    setActiveSlide(0);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab >= tabs.length) setActiveTab(0);
  }, [activeTab, tabs.length]);

  const setAdjacentSlide = (direction: "prev" | "next") => {
    setActiveSlide((current) => {
      if (direction === "prev") return current === 0 ? slideCount - 1 : current - 1;
      return current === slideCount - 1 ? 0 : current + 1;
    });
  };

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
                Every major {brand} engine code with technical specs, compatible UK models, known failures and average rebuilt prices. Use the quick-reference accordion below for all remaining codes.
              </p>
            </div>

            <div className="relative min-h-[220px] lg:min-h-[280px]">
              <div className="absolute inset-0 rounded-full bg-[repeating-radial-gradient(circle_at_center,rgba(30,102,210,0.14)_0_1px,transparent_1px_28px)]" />
              <img src={heroImageForBrand(brand, bgImage)} alt="" className="relative z-[1] h-[220px] w-full object-contain drop-shadow-[0_28px_30px_rgba(6,26,51,0.16)] lg:h-[300px]" loading="lazy" />
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

            <div className="relative bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.22),transparent_45%),linear-gradient(135deg,#06265a,#0d4aa2)] px-8 py-4 sm:px-9 sm:py-6 xl:px-12">
              <button
                type="button"
                onClick={() => setAdjacentSlide("prev")}
                className="absolute left-0 top-1/2 z-[80] hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#06265a] text-white shadow-[0_16px_30px_rgba(6,26,51,0.34)] transition hover:scale-105 lg:grid"
                aria-label="Previous engine cards"
              >
                <Arrow direction="left" className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => setAdjacentSlide("next")}
                className="absolute right-0 top-1/2 z-[80] hidden h-14 w-14 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full border border-white/70 bg-[#06265a] text-white shadow-[0_16px_30px_rgba(6,26,51,0.34)] transition hover:scale-105 lg:grid"
                aria-label="Next engine cards"
              >
                <Arrow className="h-6 w-6" />
              </button>

              {currentTab.items.length ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {visibleEngines.map((engine) => (
                      <EngineCodeCard
                        key={`${currentTab.key}-${engine.code}`}
                        engine={engine}
                        expanded={Boolean(expandedCards[engine.code])}
                        onToggle={() => setExpandedCards((current) => ({ ...current, [engine.code]: !current[engine.code] }))}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex justify-center gap-2">
                    {Array.from({ length: slideCount }).map((_, index) => (
                      <button
                        key={`${currentTab.key}-slide-dot-${index}`}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`h-3 w-3 rounded-full transition ${index === safeSlide ? "bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" : "bg-white/38 hover:bg-white/70"}`}
                        aria-label={`Show engine slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-[14px] border border-white/20 bg-white/10 px-5 py-8 text-center text-white">
                  <p className="font-['Manrope'] text-[22px] font-black">{tabMeta(currentTab.key).title}</p>
                  <p className="mx-auto mt-2 max-w-[560px] text-[14px] text-white/80">
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
                    <span className="ml-2 whitespace-nowrap text-[#08784a]">{clean(engine.avgRebuiltPrice)}</span>
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
