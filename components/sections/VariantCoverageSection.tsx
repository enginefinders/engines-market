"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ModelVariantCoverageSectionData } from "@/types/model";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelVariantCoverageSectionData;
};

type VariantCard = ModelVariantCoverageSectionData["cards"][number];

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 0 17.5 16H4V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M4 16v1.5A2.5 2.5 0 0 0 6.5 20H20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChevronIcon({
  open,
  animated,
}: {
  open: boolean;
  animated: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : animated ? "chevron-breathe-down" : ""
      }`}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points="6 9 12 15 18 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatVariantName(title: string) {
  return title
    .replace(/\s+Engine Replacement$/i, "")
    .replace(/^BMW\s+/i, "")
    .trim();
}

function extractEngineType(card: VariantCard) {
  const match = card.subtitle.match(/\d(?:\.\d)?L\s+[A-Za-z]+/);
  return match?.[0] ?? `${card.fuel}`.trim();
}

function formatCodeAndType(card: VariantCard) {
  const codes = card.engineCodes.length ? card.engineCodes.join("/") : "";
  const engineType = extractEngineType(card);

  return [codes, engineType].filter(Boolean).join(" ");
}

function getPerformanceScore(power: string) {
  const values = power.match(/\d+/g)?.map(Number) ?? [];
  return values.length ? Math.max(...values) : 0;
}

function getCardGroup(card: VariantCard) {
  if (/^BMW\s+M/i.test(card.h3) || getPerformanceScore(card.power) >= 250) {
    return "performance";
  }

  return /diesel/i.test(card.fuel) ? "diesel" : "petrol";
}

function groupCards(cards: VariantCard[]) {
  const orderedGroups = [
    { key: "diesel", title: "Core Diesel Range" },
    { key: "petrol", title: "Core Petrol Range" },
    { key: "performance", title: "Performance Range" },
  ] as const;

  return orderedGroups
    .map((group) => ({
      ...group,
      cards: cards.filter((card) => getCardGroup(card) === group.key),
    }))
    .filter((group) => group.cards.length > 0);
}

function groupCardsFromData(data: ModelVariantCoverageSectionData) {
  if (data.groups?.length) {
    return data.groups
      .map((group) => ({
        key: group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: group.title,
        cards: group.cardSlugs
          .map((slug) => data.cards.find((card) => card.slug === slug))
          .filter((card): card is VariantCard => Boolean(card)),
      }))
      .filter((group) => group.cards.length > 0);
  }

  return groupCards(data.cards);
}

export default function VariantCoverageSection({ data }: Props) {
  const defaultOpenCard = data.cards[0]?.slug ?? null;
  const [openCard, setOpenCard] = useState<string | null>(defaultOpenCard);
  const [seenCards, setSeenCards] = useState<Record<string, boolean>>(
    defaultOpenCard ? { [defaultOpenCard]: true } : {},
  );
  const groupedCards = useMemo(() => groupCardsFromData(data), [data]);
  const headingLines = data.headingLines?.length ? data.headingLines : [data.h2];
  const ui = data.ui ?? {};

  function toggleCard(slug: string) {
    setOpenCard((current) => (current === slug ? null : slug));
    setSeenCards((current) => (current[slug] ? current : { ...current, [slug]: true }));
  }

  return (
    <Section className="bg-white">
      <Container className="max-w-[1120px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="section-pill mx-auto mb-[14px]">
            <GridIcon />
            <span>{data.tag}</span>
          </div>

          <h2 className="mx-auto max-w-[760px] text-[30px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0d1b2e] md:text-[40px]">
            {headingLines.map((line, index) => {
              const isAccent = headingLines.length > 1 && index === headingLines.length - 1;
              return (
                <span key={`${line}-${index}`} className={`block ${isAccent ? "text-[#15803d]" : ""}`}>
                  {line}
                </span>
              );
            })}
          </h2>
          <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-[1.75] text-slate-600">
            {data.subheading}
          </p>
        </div>

        <div className="mt-9 space-y-9">
          {groupedCards.map((group) => (
            <div key={group.key}>
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-[2px] w-10 rounded-full bg-[#15803d]" />
                <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[#0d1b2e]">{group.title}</h3>
                <span className="h-[2px] w-10 rounded-full bg-[#15803d]" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {group.cards.map((card) => {
                  const isOpen = openCard === card.slug;
                  const shortName = formatVariantName(card.h3);
                  const animateChevron = !isOpen && !seenCards[card.slug];
                  const codeAndType = formatCodeAndType(card);

                  return (
                    <article
                      key={card.slug}
                      className={`overflow-hidden rounded-[12px] border bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)] transition duration-300 ${
                        isOpen
                          ? "border-[rgba(21,128,61,0.18)] shadow-[0_10px_26px_rgba(13,27,46,0.12)]"
                          : "border-slate-200 hover:border-slate-300 hover:shadow-[0_8px_18px_rgba(13,27,46,0.08)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCard(card.slug)}
                        aria-expanded={isOpen}
                        className="flex min-h-[230px] w-full flex-col items-center px-4 py-4 text-center md:min-h-[248px]"
                      >
                        <div className="flex min-h-[78px] w-full items-center justify-center">
                          {card.image ? (
                            <div className="relative h-[62px] w-full max-w-[152px]">
                              <Image
                                src={card.image}
                                alt={card.h3}
                                fill
                                className="object-contain"
                                sizes="150px"
                              />
                            </div>
                          ) : (
                            <div className="font-['Manrope'] text-[27px] font-extrabold leading-[0.92] text-[#0d1b2e] sm:text-[31px]">
                              {shortName}
                            </div>
                          )}
                        </div>

                        <div className="mt-4 w-full max-w-[250px]">
                          <div className="font-['Manrope'] text-[15px] font-extrabold leading-[1.18] text-[#0d1b2e]">
                            {card.h3}
                          </div>
                          <p className="mt-2 text-[11.5px] font-semibold leading-[1.4] text-[#4b5563]">
                            {codeAndType}
                          </p>
                          <p className="mt-3 font-['Manrope'] text-[15px] font-semibold leading-none text-[#374151]">
                            Rebuilt: {card.priceRange}
                          </p>
                        </div>

                        <span className="mt-auto inline-flex pt-4 text-[#15803d]">
                          <ChevronIcon open={isOpen} animated={animateChevron} />
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="bg-[#0d1b2e] px-4 pb-4 pt-4 text-white">
                          <div className="space-y-[10px]">
                            <div className="flex items-center justify-between gap-3 rounded-[8px] border border-white/8 bg-white/[0.03] px-3 py-[9px]">
                              <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
                                {ui.specsLabel ?? "Specs"}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-right text-[11px] font-semibold leading-none text-white md:text-[11.5px]">
                                {card.power}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-[8px] border border-white/8 bg-white/[0.03] px-3 py-[9px]">
                              <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
                                {ui.yearsLabel ?? "Years"}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-right text-[11px] font-semibold leading-none text-white md:text-[11.5px]">
                                {card.years?.trim() || ui.yearsFallback || "Check exact year coverage by registration"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 rounded-[8px] border border-white/8 bg-white/[0.03] px-3 py-[9px]">
                              <span className="flex-none text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
                                {ui.rebuiltLabel ?? "Rebuilt"}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-right font-['Manrope'] text-[14px] font-extrabold leading-none text-white md:text-[15px]">
                            {card.priceRange}
                              </span>
                            </div>
                          </div>

                          <a
                            href="#quote-form"
                            data-quote-context={card.h3}
                            data-quote-source="variant-coverage"
                            className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[7px] bg-[#15803d] px-4 text-[12.5px] font-semibold text-white transition hover:bg-[#166534]"
                          >
                            <span>{card.cta}</span>
                            <ArrowIcon />
                          </a>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[18px] border border-slate-200 bg-[#f8fafc] p-4 md:p-5">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#15803d]">
            <BookIcon />
            <span>{data.directory.label ?? "Variant Directory"}</span>
          </div>
          <h3 className="mt-3 text-[24px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">{data.directory.h3}</h3>
          <p className="mt-2 max-w-[900px] text-[13px] leading-[1.7] text-slate-600">{data.directory.intro}</p>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {data.directory.groups.map((group) => (
              <article key={group.title} className="rounded-[14px] border border-slate-200 bg-white p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#15803d]">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-[7px]">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-[10px] py-[5px] text-[11px] font-semibold text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

