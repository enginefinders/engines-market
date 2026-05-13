 "use client";

import { useState } from "react";
import type { EngineSizesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineSizesData;
  bgImage?: string;
};

function SizeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 10h16v8H4v-8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V6h8v4" stroke="currentColor" strokeWidth="2" />
      <path d="M7 14h10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function EngineSizesSection({ brandName, data, bgImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = data.groups[activeIndex] ?? data.groups[0];

  return (
    <Section className="relative overflow-hidden bg-white">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[220px] w-[300px] opacity-[0.11] lg:h-[280px] lg:w-[390px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.78)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <p className="text-label mb-1.5 text-green-700">{data.tag}</p>
          <h2 className="!text-[#061a33]">{data.h2}</h2>
          <p className="text-body mt-2.5 text-[#4b6278]">{data.intro}</p>
        </div>

        <div className="mx-auto mt-5 max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {data.groups.map((group, index) => {
              const isActive = index === activeIndex;
              const isDiesel = index === 0;

              return (
                <button
                  key={group.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-t-xl border px-4 py-2.5 text-sm font-bold transition ${
                    isActive
                      ? isDiesel
                        ? "border-[#102e72] bg-[#102e72] text-white"
                        : "border-green-700 bg-green-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-green-200 hover:bg-green-50"
                  }`}
                >
                  {group.title}
                </button>
              );
            })}
          </div>

          <div className="surface-card overflow-hidden rounded-t-none">
            <div className="divide-y divide-slate-200">
              {activeGroup.items.slice(0, 5).map((item) => (
                <article key={item.title} className="grid gap-3 px-4 py-3.5 sm:grid-cols-[56px_1fr_auto] sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#102e72]">
                    <SizeIcon />
                  </div>

                  <div>
                    <h4 className="!text-[#061a33]">{item.title}</h4>
                    <p className="text-small mt-1.5 text-[#4b6278]">{item.description}</p>

                    {(item.engineCodes?.length ||
                      item.compatibleModels?.length ||
                      item.productionYears ||
                      item.commonFailurePoints?.length) && (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {item.engineCodes?.length ? (
                          <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                            <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Engine codes</p>
                            <p className="mt-1 text-small font-semibold text-slate-700">{item.engineCodes.join(", ")}</p>
                          </div>
                        ) : null}

                        {item.productionYears ? (
                          <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                            <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Production years</p>
                            <p className="mt-1 text-small font-semibold text-slate-700">{item.productionYears}</p>
                          </div>
                        ) : null}

                        {item.compatibleModels?.length ? (
                          <div className="rounded-xl bg-slate-50 px-3 py-2.5 sm:col-span-2">
                            <p className="text-tiny font-black uppercase tracking-[0.12em] text-slate-500">Compatible models</p>
                            <p className="mt-1 text-small font-semibold text-slate-700">{item.compatibleModels.join(", ")}</p>
                          </div>
                        ) : null}

                        {item.commonFailurePoints?.length ? (
                          <div className="rounded-xl bg-green-50 px-3 py-2.5 sm:col-span-2">
                            <p className="text-tiny font-black uppercase tracking-[0.12em] text-green-700">Common failure points</p>
                            <p className="mt-1 text-small font-semibold text-green-900">{item.commonFailurePoints.join(", ")}</p>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div className="sm:pt-1">
                    <a
                      href="#quote-form"
                      data-quote-context={item.title}
                      data-quote-source="engine-sizes"
                      className="inline-flex items-center gap-2 text-sm font-bold text-green-700"
                    >
                      {item.cta}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card mt-4 grid gap-3 px-4 py-4 lg:grid-cols-[1.3fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Not sure which engine size your {brandName} needs?
            </p>
            <p className="text-small mt-2 text-slate-600">{data.closing}</p>
          </div>

          <a href="#quote-form" data-quote-context={activeGroup.title} data-quote-source="engine-sizes-summary" className="button-primary">
            Find My Engine
          </a>
        </div>
      </Container>
    </Section>
  );
}
