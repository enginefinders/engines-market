"use client";

import { useMemo, useState } from "react";
import type { ReviewsSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ReviewsSectionData;
  useDataHeading?: boolean;
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

function ReviewBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 1 1-4.14-7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9.5 12 1.8 1.8 4.7-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m8.7 20.3-.5 2.7 3.8-2.1 3.8 2.1-.5-2.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
      className={`absolute top-1/2 z-[2] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-[0_4px_14px_rgba(13,27,46,0.10)] transition hover:border-green-300 hover:text-green-700 lg:flex ${
        direction === "prev" ? "-left-5" : "-right-5"
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

function splitHeading(title: string) {
  const match = title.match(/^(Trusted by .*? Owners)\s+(Across the UK)$/i);

  if (!match) {
    return {
      lineOne: title,
      lineTwo: "",
    };
  }

  return {
    lineOne: match[1],
    lineTwo: match[2],
  };
}

export default function ReviewsSection({ data, useDataHeading = false }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewCount = data.reviews.length;
  const heading = splitHeading(data.h2);
  const ratingLabel = `${data.rating.value} out of 5`;

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
          <div>
            <p className="section-pill">
              <TagIcon />
              {data.tag}
            </p>

            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[620px]">
                <span className="block">
                  {useDataHeading ? heading.lineOne : <>Trusted by Land Rover <span className="text-[#15803d]">Owners</span></>}
                </span>
                <span className="block text-[#15803d]">{heading.lineTwo || "Across the UK"}</span>
              </h2>

              <div className="flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(13,27,46,0.05)] lg:mb-1">
                <StarRow size="text-[18px]" />
                <div className="text-[13px] leading-[1.35] text-slate-500">
                  <div className="font-['Manrope'] text-[16px] font-extrabold leading-none text-[#0d1b2e]">
                    {ratingLabel}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 max-w-[680px] text-[13px] leading-[1.6] text-slate-500">{data.rating.summary}</p>
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
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <ReviewBadgeIcon />
              </span>
              <div>
                <p className="font-['Manrope'] text-[14px] font-bold text-[#0d1b2e]">Highly Rated Experience - Leave a Review</p>
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
