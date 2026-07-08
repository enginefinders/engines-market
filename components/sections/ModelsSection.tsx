"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getModelHref } from "@/lib/modelRoutes";
import type { ModelsSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelsSectionData;
  brandSlug: string;
  documentMode?: boolean;
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

export default function ModelsSection({ data, brandSlug, documentMode = false }: Props) {
  const heading = splitHeading(data.h2);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [showAllModels, setShowAllModels] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialVisibleCount = 4;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") {
        return;
      }

      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setShowAllModels(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = useMemo(
    () => (isMobile && !showAllModels ? data.cards.slice(0, initialVisibleCount) : data.cards),
    [data.cards, initialVisibleCount, isMobile, showAllModels],
  );
  const hiddenModelsCount = Math.max(data.cards.length - initialVisibleCount, 0);

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

      <Container className={documentMode ? "max-w-[1400px] px-0 sm:px-0 lg:px-0" : ""}>
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

        <div className="mt-7 grid grid-cols-2 gap-3 md:hidden">
          {visibleCards.map((model) => {
            const modelHref = getModelHref(brandSlug, model);

            return (
              <article
                key={model.slug}
                className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(13,27,46,0.08)]"
              >
                <Link href={modelHref} className="block h-full">
                  <div className="relative aspect-[1.18/1] overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eef3f9_100%)]">
                    <Image
                      src={model.image || `/images/brands/${brandSlug}/models/${brandSlug}-${model.slug}-small.webp`}
                      alt={model.h3}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 767px) 50vw, 25vw"
                    />
                  </div>

                  <div className="space-y-2 px-3 pb-3 pt-3">
                    <h3 className="font-['Manrope'] text-[15px] font-extrabold leading-[1.15] text-[#0d1b2e]">
                      {model.h3}
                    </h3>
                    <p className="text-[10.5px] leading-[1.45] text-slate-500">{model.subtitle}</p>

                    <div className="border-t border-slate-100 pt-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                        Starting from
                      </p>
                      <p className="mt-1 font-['Manrope'] text-[14px] font-extrabold leading-none text-[#15803d]">
                        {normalizePriceRange(model.priceRange)}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#15803d]">
                      <span>{model.cta.replace(/\s*-+>\s*$/, "")}</span>
                      <ArrowIcon />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-7 hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-5">
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

        {isMobile && hiddenModelsCount > 0 ? (
          <div className="mt-5 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setShowAllModels((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold text-[#0d1b2e] transition hover:border-[#0d1b2e] hover:bg-slate-50"
            >
              <span>
                {showAllModels
                  ? "Show Fewer Models"
                  : `View More Models (${hiddenModelsCount})`}
              </span>
              <ArrowIcon open={showAllModels} />
            </button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
