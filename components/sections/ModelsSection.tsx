"use client";

import { useMemo, useState } from "react";
import type { ModelsSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelsSectionData;
  brandSlug: string;
};

export default function ModelsSection({ data, brandSlug }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = data.cards.length > 4;
  const visibleCards = useMemo(
    () => (expanded || !hasOverflow ? data.cards : data.cards.slice(0, 4)),
    [data.cards, expanded, hasOverflow],
  );

  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-label text-green-700">{data.tag}</p>
          <h2 className="mt-3">{data.h2}</h2>
          <p className="text-body mt-4 text-slate-600">{data.subheading}</p>
        </div>

        <div className={`relative mt-7 ${hasOverflow && !expanded ? "overflow-hidden" : ""}`}>
          <div
            className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${
              hasOverflow && !expanded ? "models-grid-peek" : ""
            }`}
          >
            {visibleCards.map((model) => (
            <article
              key={model.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)]"
            >
              <div className="flex h-32 items-center justify-center bg-white p-2">
                <img
                  src={model.image || `/images/brands/${brandSlug}/models/${brandSlug}-${model.slug}-model-card.webp`}
                  alt={model.h3}
                  className="h-full w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.src = `/images/brands/${brandSlug}/x.webp`;
                  }}
                />
              </div>

              <div className="p-3.5">
                <h3>{model.h3}</h3>
                <p className="text-small mt-1.5 text-slate-600">{model.subtitle}</p>
                <p className="mt-2.5 font-black text-green-700">{model.priceRange}</p>

                <a
                  href={`/${brandSlug}/${model.slug}`}
                  className="text-label mt-3 inline-flex text-green-700"
                >
                  {model.cta}
                </a>
              </div>
            </article>
            ))}
          </div>

          {hasOverflow && !expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-b from-transparent via-slate-50/70 to-slate-50 pb-2">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="pointer-events-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.08em] text-[#0a2952] shadow-sm transition hover:border-green-200 hover:text-green-700"
              >
                Show all models
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
