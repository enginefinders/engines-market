"use client";

import { useMemo, useState } from "react";
import type { ReviewsSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ReviewsSectionData;
};

const REVIEW_SOURCES = ["google", "facebook", "trustpilot", "google", "facebook", "trustpilot"] as const;

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRow({ count = 5, size = "text-[20px]" }: { count?: number; size?: string }) {
  return (
    <div className={`flex gap-[2px] leading-none text-amber-500 ${size}`}>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

function ChevronButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-[2] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-[0_1px_6px_rgba(13,27,46,0.08)] transition hover:border-green-300 hover:text-green-700 lg:flex ${
        direction === "prev" ? "-left-4" : "-right-4"
      }`}
      aria-label={direction === "prev" ? "Previous reviews" : "Next reviews"}
    >
      <span className="text-[18px] leading-none">{direction === "prev" ? "‹" : "›"}</span>
    </button>
  );
}

function ReviewSource({ source }: { source: (typeof REVIEW_SOURCES)[number] }) {
  if (source === "facebook") {
    return <span className="text-[11px] font-bold text-[#1877F2]">facebook</span>;
  }

  if (source === "trustpilot") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
        <span className="text-green-500">★</span>
        Trustpilot
      </span>
    );
  }

  return (
    <span className="font-['Manrope'] text-[18px] font-bold leading-none">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#34A853]">g</span>
      <span className="text-[#EA4335]">l</span>
      <span className="text-[#4285F4]">e</span>
    </span>
  );
}

function getVisibleIndices(total: number, current: number, count: number) {
  return Array.from({ length: Math.min(count, total) }, (_, offset) => (current + offset) % total);
}

export default function ReviewsSection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewCount = data.reviews.length;

  const desktopIndices = useMemo(
    () => getVisibleIndices(reviewCount, currentIndex, 3),
    [currentIndex, reviewCount],
  );

  function goTo(index: number) {
    setCurrentIndex((index + reviewCount) % reviewCount);
  }

  function goNext() {
    goTo(currentIndex + 1);
  }

  function goPrev() {
    goTo(currentIndex - 1);
  }

  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-[980px]">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-green-700">
                <TagIcon />
                {data.tag}
              </p>

              <h2 className="mt-3 max-w-[520px]">{data.h2}</h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <StarRow />
                <span className="font-['Manrope'] text-[22px] font-extrabold leading-none text-[#0d1b2e]">
                  {data.rating.value}/5
                </span>
                <div className="text-[12px] leading-[1.4] text-slate-500">
                  <strong className="block font-semibold text-[#0d1b2e]">
                    Based on {data.rating.count.toLocaleString()}
                  </strong>
                  verified customers
                </div>
              </div>

              <p className="mt-3 max-w-[560px] text-[13px] leading-[1.6] text-slate-500">{data.rating.summary}</p>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-4 py-3.5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] border border-green-200 bg-green-50 text-green-700">
                  <ShieldCheckIcon />
                </span>
                <p className="text-[12px] leading-[1.55] text-slate-500">{data.rating.basedOn}</p>
              </div>
            </div>
          </div>

          <div className="relative mt-5">
            <ChevronButton direction="prev" onClick={goPrev} />
            <ChevronButton direction="next" onClick={goNext} />

            <div className="hidden gap-3 lg:grid lg:grid-cols-3">
              {desktopIndices.map((reviewIndex) => {
                const review = data.reviews[reviewIndex];
                const source = REVIEW_SOURCES[reviewIndex % REVIEW_SOURCES.length];

                return (
                  <article
                    key={`${review.name}-${review.location}-${reviewIndex}`}
                    className="rounded-[14px] border border-slate-200 bg-white px-4 py-4 shadow-[0_2px_10px_rgba(13,27,46,0.06)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[14px] font-bold text-slate-700">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-['Manrope'] text-[13px] font-bold leading-[1.2] text-[#0d1b2e]">
                            {review.name}
                          </p>
                          <StarRow size="text-[13px]" />
                        </div>
                      </div>
                      <ReviewSource source={source} />
                    </div>

                    <p className="mt-3 text-[12.5px] leading-[1.6] text-slate-600">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="rounded-[14px] border border-slate-200 bg-white px-4 py-5 shadow-[0_2px_10px_rgba(13,27,46,0.06)] lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <ReviewSource source={REVIEW_SOURCES[currentIndex % REVIEW_SOURCES.length]} />
                <StarRow size="text-[18px]" />
              </div>

              <div className="mt-4">
                <span className="block font-serif text-[36px] leading-[0.6] text-green-600/70">&ldquo;</span>
                <p className="mt-2 min-h-[96px] text-[15px] italic leading-[1.6] text-[#1a1a2e]">
                  {data.reviews[currentIndex]?.text}
                  <span className="float-right font-serif text-[36px] leading-none text-green-600/70">&rdquo;</span>
                </p>
                <p className="mt-3 text-[13px] text-slate-500">
                  - <strong className="font-bold text-[#0d1b2e]">{data.reviews[currentIndex]?.name}</strong>,{" "}
                  {data.reviews[currentIndex]?.location}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-[7px]">
              {data.reviews.map((review, index) => (
                <button
                  key={`${review.name}-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Review ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    index === currentIndex ? "scale-[1.2] bg-green-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[12px] border border-green-200 bg-green-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <div className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="absolute -bottom-1 -right-1 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-green-50 bg-green-600 text-white">
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                    <path d="M2 6 5 9 10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="font-['Manrope'] text-[14px] font-bold text-[#0d1b2e]">Had a great experience?</p>
                <p className="mt-1 text-[12.5px] leading-[1.55] text-slate-500">
                  <a href="#" className="font-semibold text-green-700 underline decoration-green-200 underline-offset-2">
                    {data.leaveReviewCta.linkText.replace(/\s*-+>\s*$/, "")} →
                  </a>{" "}
                  - {data.leaveReviewCta.text.replace(/^Had a great experience\?\s*/i, "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
