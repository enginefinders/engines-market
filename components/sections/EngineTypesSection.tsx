"use client";

import { useState } from "react";
import type { EngineTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  data: EngineTypesData;
  bgImage?: string;
};

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 10h4l2-3h5l2 3h3v7h-3l-2 2H9l-2-2H4v-7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7M15 7V4M5 14H2M22 14h-2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m14 7 3-3 3 3-8 8-3 .5.5-3L14 7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M7 14 4 17l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 20V8l6 3V8l6 3V5l6 4v11H3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M7 20v-4m4 4v-3m4 3v-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function getTypeIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("remanufactured")) {
    return FactoryIcon;
  }

  if (normalized.includes("supply")) {
    return DeliveryIcon;
  }

  if (normalized.includes("used") || normalized.includes("refurbished")) {
    return RefreshIcon;
  }

  if (normalized.includes("rebuilt") || normalized.includes("reconditioned")) {
    return WrenchIcon;
  }

  return EngineIcon;
}

export default function EngineTypesSection({ data, bgImage }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const columns = data.types.reduce<[typeof data.types, typeof data.types]>(
    (acc, item, index) => {
      acc[index % 2].push(item);
      return acc;
    },
    [[], []],
  );

  return (
    <Section className="relative overflow-hidden bg-slate-50">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[220px] w-[300px] opacity-[0.12] lg:h-[290px] lg:w-[390px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,250,252,0.1), rgba(248,250,252,0.74)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <SectionHeader tag={data.tag} title={data.h2} subtitle={data.intro} />

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={`engine-type-column-${columnIndex}`} className="space-y-3">
              {column.map((type) => {
                const index = data.types.findIndex((item) => item.title === type.title);
                const isOpen = openIndex === index;
                const Icon = getTypeIcon(type.title);

                return (
                  <article key={type.title} className="surface-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                          <Icon />
                        </div>

                        <div>
                          <h3>{type.title}</h3>
                          <p className="text-small mt-1 text-green-700">{type.priceRange}</p>
                        </div>
                      </div>

                      <span className="text-xl font-bold text-green-700">{isOpen ? "-" : "+"}</span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 px-4 py-3.5">
                        <p className="text-small text-slate-600">{type.description}</p>
                        <a href="#quote-form" data-quote-context={type.title} data-quote-source="engine-types" className="action-link mt-4">
                          {type.cta}
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ))}
        </div>

        <div className="section-callout mx-auto mt-5 max-w-4xl px-4 py-3.5 text-center">
          <p className="text-small font-semibold text-green-900">{data.closing}</p>
        </div>
      </Container>
    </Section>
  );
}
