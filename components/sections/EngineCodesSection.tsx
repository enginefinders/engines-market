"use client";

import { useMemo, useState } from "react";
import type { EngineCodesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  data: EngineCodesData;
  bgImage?: string;
};

export default function EngineCodesSection({ data, bgImage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = useMemo(() => data.groups[activeIndex] ?? data.groups[0], [activeIndex, data.groups]);

  return (
    <Section className="relative overflow-hidden bg-white">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[220px] w-[300px] opacity-[0.11] lg:h-[280px] lg:w-[400px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.78)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <SectionHeader tag={data.tag} title={data.h2} subtitle={data.h3} />

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
          {data.groups.map((group, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={group.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[#123d84] bg-[#123d84] text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-green-200 hover:bg-green-50"
                }`}
              >
                <p className="text-sm font-bold leading-tight">{group.name}</p>
                <p className={`mt-1 text-xs ${isActive ? "text-slate-200" : "text-slate-500"}`}>{group.era}</p>
              </button>
            );
          })}
        </div>

        <div className="surface-card mt-5 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4">
            <div>
              <p className="text-label text-green-700">Engine prices</p>
              <h3 className="mt-1">{activeGroup.name}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {data.filters.slice(0, 4).map((filter) => (
                <span key={filter} className="summary-badge">
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse">
              <thead className="bg-[#f8fafc]">
                <tr className="text-left text-[0.7rem] font-black uppercase tracking-[0.08em] text-slate-600">
                  <th className="px-4 py-3">Engine Code</th>
                  <th className="px-4 py-3">Fuel</th>
                  <th className="px-4 py-3">Engine Size</th>
                  <th className="px-4 py-3">Horse Power</th>
                  <th className="px-4 py-3">Models</th>
                  <th className="px-4 py-3">Average Price Quote</th>
                  <th className="px-4 py-3 text-center">Get Quote</th>
                </tr>
              </thead>

              <tbody>
                {activeGroup.engines.map((engine) => (
                  <tr key={engine.code} className="border-t border-slate-200 text-[0.84rem]">
                    <td className="px-4 py-4 font-black text-[#123d84]">{engine.code}</td>
                    <td className="px-4 py-4">{engine.fuel}</td>
                    <td className="px-4 py-4">{engine.size}</td>
                    <td className="px-4 py-4">{engine.power}</td>
                    <td className="max-w-[290px] px-4 py-4 text-slate-600">{engine.compatibleModels}</td>
                    <td className="px-4 py-4 font-black text-green-700">{engine.avgRebuiltPrice}</td>
                    <td className="px-4 py-4 text-center">
                      <a
                        href="#quote-form"
                        data-quote-engine-code={engine.code}
                        data-quote-context={engine.compatibleModels}
                        className="inline-flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-800"
                      >
                        {engine.cta}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-4 py-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-label text-green-700">Common replacement trigger</p>
              <p className="text-small mt-2 text-slate-600">{activeGroup.failureNote}</p>
            </div>

            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-4">
              <p className="text-small font-semibold text-green-900">
                Compare codes one family at a time so owners only see 3-5 relevant engines, not an oversized full-page table.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
