"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ModelsSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelsSectionData;
  brandSlug: string;
};

function splitHeading(title: string) {
  const marker = "Engine Replacement Models";
  if (!title.includes(marker)) {
    return { before: title, accent: "" };
  }

  const [before] = title.split(marker);
  return { before: before.trim(), accent: marker };
}

function normalizePriceRange(priceRange: string) {
  return priceRange.replace(/^Starting from\s*/i, "").trim();
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 3v18M3 9h6M3 15h6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" aria-hidden="true">
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

export default function ModelsSection({ data, brandSlug }: Props) {
  const [expanded, setExpanded] = useState(false);
  const hasOverflow = data.cards.length > 4;
  const heading = splitHeading(data.h2);
  const visibleCards = useMemo(
    () => (expanded || !hasOverflow ? data.cards : data.cards.slice(0, 4)),
    [data.cards, expanded, hasOverflow],
  );

  return (
    <Section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden lg:block">
        <div
          className="absolute right-0 top-0 h-[230px] w-[260px] opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(270deg, rgba(255,255,255,0.08), rgba(255,255,255,0.9) 52%, rgba(255,255,255,1) 100%), url(/images/brands/${brandSlug}/brand/${brandSlug}-engine-code-directory-bg.webp)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "top right",
            filter: "grayscale(1)",
          }}
        />
      </div>
      <Container>
        <div className="relative z-[1] mx-auto max-w-[780px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#1e3a8a]">
            <GridIcon />
            {data.tag}
          </p>
          <h2 className="mt-3">
            {heading.before}
            {heading.accent ? (
              <>
                {" "}
                <span className="text-[#3b82f6]">{heading.accent}</span>
              </>
            ) : null}
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-green-500" />
          <p className="text-body mt-4 text-slate-600">{data.subheading}</p>
        </div>

        <div className={`relative mt-7 ${hasOverflow && !expanded ? "overflow-hidden" : ""}`}>
          <div
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${
              hasOverflow && !expanded ? "models-grid-peek" : ""
            }`}
          >
            {visibleCards.map((model) => (
              <article
                key={model.slug}
                className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(13,27,46,0.06)] transition hover:border-green-200 hover:shadow-[0_8px_24px_rgba(13,27,46,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image
                    src={model.image || `/images/brands/${brandSlug}/models/${brandSlug}-${model.slug}-model-card.webp`}
                    alt={model.h3}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <div className="flex min-h-[184px] flex-col p-3">
                  <div
                    role="heading"
                    aria-level={3}
                    className="font-['Manrope'] text-[13px] font-extrabold leading-[1.25] text-[#0d1b2e]"
                  >
                    {model.h3}
                  </div>
                  <p className="mt-1.5 text-[10.8px] leading-[1.5] text-slate-500">{model.subtitle}</p>

                  <div className="mt-auto border-t border-slate-100 pt-3">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400">Starting from</p>
                    <p className="mt-1 font-['Manrope'] text-[15px] font-extrabold tracking-[-0.02em] text-green-700">
                      {normalizePriceRange(model.priceRange)}
                    </p>

                    <a
                      href={`/${brandSlug}/${model.slug}`}
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-green-600 transition hover:gap-1.5"
                    >
                      {model.cta.replace(/\s*-+>\s*$/, "")}
                      <ArrowIcon />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasOverflow && !expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-b from-transparent via-white/70 to-white pb-2">
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
