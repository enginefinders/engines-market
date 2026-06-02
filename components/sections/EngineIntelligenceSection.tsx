"use client";

import Image from "next/image";
import type { ModelEngineIntelligenceData } from "@/types/model";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: ModelEngineIntelligenceData;
  imageSrc: string;
};

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function EngineIntelligenceSection({ data, imageSrc }: Props) {
  const ui = data.ui ?? {};

  return (
    <Section className="bg-[#f8f9fa]">
      <Container className="max-w-[1240px]">
        <div className="section-pill mb-[14px]">
          <span>{data.tag}</span>
        </div>

        <h2 className="max-w-[760px] font-['Manrope'] text-[28px] font-extrabold leading-[1.12] tracking-[-0.04em] text-[#0d1b2e] lg:text-[52px]">
          {data.h2}
        </h2>

        <p className="mt-4 max-w-[760px] text-[14px] leading-[1.8] text-slate-600 lg:text-[15px]">
          {data.description}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(340px,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div className="relative overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white shadow-[0_10px_40px_rgba(13,27,46,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(21,128,61,0.08),transparent_36%),radial-gradient(circle_at_70%_70%,rgba(13,27,46,0.08),transparent_42%)]" />
            <div className="relative aspect-[1/1.02] min-h-[340px]">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={data.imageAlt ?? data.h2}
                  fill
                  className="object-contain p-6 lg:p-8"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 lg:content-start">
            {data.cards.map((card, index) => {
              const shouldSpan = data.cards.length % 2 === 1 && index === data.cards.length - 1;

              return (
                <article
                  key={`${card.code}-${index}`}
                  className={`overflow-hidden rounded-[20px] border border-[#e5e7eb] bg-white shadow-[0_10px_34px_rgba(13,27,46,0.07)] ${
                    shouldSpan ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="px-6 pb-6 pt-5">
                    <h3 className="font-['Manrope'] text-[26px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">
                      {card.code}
                    </h3>

                    <div className="mt-4 space-y-5">
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0d1b2e]">
                          {ui.productionHistoryLabel ?? "Production History"}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.7] text-slate-700">
                          {card.productionHistory.map((item, itemIndex) => (
                            <li key={`${card.code}-history-${itemIndex}`} className="flex gap-2">
                              <span className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full bg-[#22c55e]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[#e5e7eb] pt-5">
                        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0d1b2e]">
                          {ui.knownFailuresLabel ?? "Known Failures"}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.7] text-slate-700">
                          {card.knownFailures.map((item, itemIndex) => (
                            <li key={`${card.code}-failure-${itemIndex}`} className="flex gap-2">
                              <span className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full bg-[#22c55e]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-[#e5e7eb] pt-5">
                        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0d1b2e]">
                          {ui.specsLabel ?? "Specs"}
                        </p>
                        <p className="mt-2 text-[14px] leading-[1.7] text-slate-700">{card.specs}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-[#0d1b2e] px-6 py-4 text-white">
                    <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-[12px] bg-white text-[#15803d]">
                      <TagIcon />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#86efac]">
                        {ui.replacementCostLabel ?? "Replacement Cost"}
                      </p>
                      <p className="mt-1 text-[16px] font-semibold leading-[1.55] text-white">{card.replacementCost}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
