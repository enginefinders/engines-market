"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getModelHref } from "@/lib/modelRoutes";
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

function ArrowIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ModelsSection({ data, brandSlug }: Props) {
  const heading = splitHeading(data.h2);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const visibleCards = useMemo(() => data.cards.slice(0, 5), [data.cards]);

  return (
    <Section id="brand-models" className="relative overflow-hidden bg-white">
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
        <div className="relative z-[1] max-w-[760px] text-left">
          <p className="section-pill">
            <GridIcon />
            {data.tag}
          </p>

          <h2 className="mt-3">
            {heading.before}
            {heading.accent ? (
              <>
                {" "}
                <span className="text-[#15803d]">{heading.accent}</span>
              </>
            ) : null}
          </h2>

          <div className="mt-3 h-[3px] w-12 rounded-full bg-green-500" />
          <p className="text-body mt-4 max-w-[660px] text-slate-600">{data.subheading}</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {visibleCards.map((model) => {
            const isOpen = openCard === model.slug;
            const modelHref = getModelHref(brandSlug, model);

            return (
              <article
                key={model.slug}
                className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(13,27,46,0.06)] transition hover:border-[#0d1b2e] hover:shadow-[0_8px_24px_rgba(13,27,46,0.1)]"
              >
                <div className="flex items-center justify-between gap-3 px-4 py-4">
                  <div className="min-w-0">
                    <div
                      role="heading"
                      aria-level={3}
                      className="font-['Manrope'] text-[13px] font-extrabold leading-[1.25] text-[#0d1b2e]"
                    >
                      {model.h3}
                    </div>
                    <p className="mt-2 font-['Manrope'] text-[15px] font-extrabold tracking-[-0.02em] text-green-700">
                      {normalizePriceRange(model.priceRange)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenCard((current) => (current === model.slug ? null : model.slug))}
                    aria-label={isOpen ? `Hide ${model.h3} details` : `Show ${model.h3} details`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#15803d] transition hover:border-[#0d1b2e] hover:bg-[#f8fbff]"
                  >
                    <ArrowIcon open={isOpen} />
                  </button>
                </div>

                {isOpen ? (
                  <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-white">
                      <Image
                        src={model.image || `/images/brands/${brandSlug}/models/${brandSlug}-${model.slug}-small.webp`}
                        alt={model.h3}
                        fill
                        className="object-contain p-3"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                      />
                    </div>

                    <p className="mt-3 text-[11px] leading-[1.55] text-slate-500">{model.subtitle}</p>

                    <Link
                      href={modelHref}
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0d1b2e] transition hover:gap-2"
                    >
                      <span>{model.cta.replace(/\s*-+>\s*$/, "")}</span>
                      <span className="text-[#15803d]">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
