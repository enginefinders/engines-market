"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  homeEngineTypeCards,
  type HomeEngineTypeCard,
} from "@/lib/homepageData";

type Props = {
  cards?: HomeEngineTypeCard[];
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M20 7v5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17v-5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 12A6.5 6.5 0 0 0 7.1 7.4L5 9M5.8 12a6.5 6.5 0 0 0 11.1 4.6L19 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#16a34a] text-white">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m3.2 8.2 3 3 6.6-6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function getIcon(title: string, className = "h-10 w-10") {
  const normalizedTitle = title.toLowerCase();
  let iconName = "type-rebuilt";

  if (normalizedTitle.includes("used")) iconName = "type-used";
  else if (normalizedTitle.includes("refurbished"))
    iconName = "type-refurbished";
  else if (normalizedTitle.includes("reconditioned"))
    iconName = "type-reconditioned";
  else if (
    normalizedTitle.includes("supply") ||
    normalizedTitle.includes("fit")
  )
    iconName = "type-supply-fit";
  else if (
    normalizedTitle.includes("remanufactured") ||
    normalizedTitle.includes("manufactured")
  )
    iconName = "type-remanufactured";

  return (
    <Image
      src={`/icons/engine-market/${iconName}.png`}
      alt=""
      aria-hidden="true"
      width={80}
      height={80}
      className={`${className} object-contain`}
    />
  );
}

function getIconClasses(icon: HomeEngineTypeCard["icon"]) {
  return icon === "used" || icon === "reconditioned" || icon === "supply-fit"
    ? "bg-[#e8f8ee] text-[#087f55]"
    : "bg-[#edf4ff] text-[#1450a3]";
}

function CardCornerAccent({ tone }: { tone: "green" | "blue" }) {
  const accent = tone === "green" ? "bg-[#effaf4]" : "bg-[#edf4ff]";

  return (
    <>
      <span
        className={`pointer-events-none absolute bottom-0 right-0 z-0 h-[120px] w-[180px] opacity-55 ${accent}`}
        style={{ clipPath: "polygon(42% 100%, 100% 0, 100% 100%)" }}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute bottom-0 right-8 z-0 h-[82px] w-[96px] opacity-30 ${accent}`}
        style={{ clipPath: "polygon(58% 100%, 100% 0, 100% 100%)" }}
        aria-hidden="true"
      />
    </>
  );
}

function PriceLine({ price }: { price: string }) {
  const match = price.match(/£[\d,]+(?:\s*-\s*£[\d,]+)?/);

  if (!match || match.index === undefined) {
    return <>{price}</>;
  }

  return (
    <>
      <span className="font-bold text-[#087f55]">
        {price.slice(0, match.index)}
      </span>
      <span className="font-bold text-[#087f55]">{match[0]}</span>
      <span className="font-normal text-[#5b6675] text-[13px] md:text-[12px]">
        {price.slice(match.index + match[0].length)}
      </span>
    </>
  );
}

function DesktopGrid({ cards }: { cards: HomeEngineTypeCard[] }) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const flipped = activeCard === card.id;

        return (
          <div key={card.id} className="h-[250px] [perspective:1400px]">
            <div
              className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveCard(flipped ? null : card.id)}
                className={`absolute inset-0 z-10 isolate flex h-full w-full flex-col overflow-hidden rounded-[18px] border p-5 text-left shadow-[0_18px_38px_rgba(13,27,46,0.06)] backdrop-blur-xl [backface-visibility:hidden] ${flipped ? "pointer-events-none" : "pointer-events-auto"} ${card.id === "used" ? "border-[#38b88a]/70 bg-white/65" : "border-white/70 bg-white/65"}`}
                aria-pressed={flipped}
                aria-label={`${flipped ? "Hide details for" : "Show details for"} ${card.title}`}
              >
                <CardCornerAccent
                  tone={
                    card.id === "used" ||
                    card.id === "reconditioned" ||
                    card.id === "supply-fit"
                      ? "green"
                      : "blue"
                  }
                />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${getIconClasses(card.icon)}`}
                    >
                      {getIcon(card.title)}
                    </span>
                    <h3 className="min-w-0 flex-1 font-['Manrope'] !text-[22px] font-bold leading-[1.05] text-[#0d1b2e]">
                      {card.title}
                    </h3>
                    <span className="text-[#50647d]">
                      <FlipIcon />
                    </span>
                  </div>

                  <p className="mt-3 text-[17px] line-clamp-1 font-bold leading-[1.3] text-[#087f55]">
                    <PriceLine price={card.price} />
                  </p>

                  <p className="mt-1.5 text-[15px] leading-[1.48] text-[#5b6675]">
                    {card.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[15px] font-bold text-[#087f55]">
                    <span>{card.cta}</span>
                    <ArrowIcon />
                  </span>
                </div>
              </button>

              <div
                className={`absolute inset-0 isolate flex h-full w-full flex-col overflow-hidden rounded-[18px] border-[1.5px] border-[#3b82f6] bg-[#061a33] p-5 text-white shadow-[0_0_0_1px_rgba(59,130,246,1),0_0_8px_rgba(59,130,246,0.5),0_0_16px_rgba(59,130,246,0.38),0_0_26px_rgba(59,130,246,0.24),0_4px_12px_rgba(42,109,214,0.28)] backdrop-blur-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${flipped ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-['Manrope'] !text-[22px] font-bold leading-[1.15] text-white">
                    {card.backHeader}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveCard(null)}
                    className="text-white/80 transition hover:text-white"
                    aria-label={`Close details for ${card.title}`}
                  >
                    <span className="text-2xl leading-none">×</span>
                  </button>
                </div>

                <div className="mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:#86efac_transparent] [scrollbar-width:thin]">
                  {card.details.map((detail) => (
                    <div
                      key={`${card.id}-${detail.label}`}
                      className="flex items-start gap-3 text-[14px] leading-[1.45] text-[#e8eef7]"
                    >
                      <CheckIcon />
                      <div>
                        <span className="font-semibold text-white">
                          {detail.label}:
                        </span>{" "}
                        <span className="text-[#c7d3e1]">{detail.value}</span>
                      </div>
                    </div>
                  ))}
                  <p className="border-t border-white/15 pt-4 text-[13px] leading-[1.55] text-[#c7d3e1]">
                    {card.closing}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MobileStack({ cards }: { cards: HomeEngineTypeCard[] }) {
  const [activeIdx, setActiveIdx] = useState(() => {
    const refurbishedIndex = cards.findIndex((card) =>
      card.title.toLowerCase().includes("refurbish"),
    );
    return refurbishedIndex >= 0
      ? refurbishedIndex
      : cards.length > 0
        ? cards.length - 1
        : -1;
  });
  const [flippedIdx, setFlippedIdx] = useState(-1);
  const cardExpandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const expandInnerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    cardExpandRefs.current.forEach((cardExpand, index) => {
      if (!cardExpand) return;
      if (index === activeIdx) {
        const inner = expandInnerRefs.current[index];
        if (inner) {
          requestAnimationFrame(() => {
            cardExpand.style.height = `${inner.scrollHeight}px`;
          });
        }
      } else {
        cardExpand.style.height = "0px";
      }
    });
  }, [activeIdx]);

  function activateCard(index: number) {
    if (activeIdx === index) {
      setActiveIdx(-1);
      setFlippedIdx(-1);
      return;
    }
    if (flippedIdx !== -1 && flippedIdx !== index) setFlippedIdx(-1);
    setActiveIdx(index);
  }

  function showBack(index: number) {
    setActiveIdx(index);
    setFlippedIdx(index);
  }

  return (
    <div className="mobile-engine-stack mt-[18px] md:hidden">
      <style>{`
        .mobile-engine-stack .flip-inner { position: relative; transform-style: preserve-3d; transition: transform .55s cubic-bezier(.16,1,.3,1); }
        .mobile-engine-stack .stack-card.flipped .flip-inner { height: min(70vh, 420px); min-height: 310px; }
        .mobile-engine-stack .stack-card.flipped .flip-inner { transform: rotateY(180deg); }
        .mobile-engine-stack .face { border-radius: 18px; backface-visibility: hidden; }
        .mobile-engine-stack .face-back { position: absolute; inset: 0; min-height: 0; transform: rotateY(180deg); }
        .mobile-engine-stack .back-inner { min-height: 0; flex: 1 1 0%; }
        .mobile-engine-stack .back-list { position: relative; z-index: 1; min-height: 0; flex: 1 1 0%; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; -webkit-overflow-scrolling: touch; scrollbar-width: thin; scrollbar-color: #86efac transparent; }
        .mobile-engine-stack .back-list::-webkit-scrollbar { width: 6px; }
        .mobile-engine-stack .back-list::-webkit-scrollbar-thumb { background: #86efac; border-radius: 999px; }
      `}</style>
      <div className="relative mx-auto max-w-[520px] overflow-visible px-[2px] pb-4">
      {cards.map((card, index) => {
        const active = activeIdx === index;
        const flipped = flippedIdx === index;
        const previousIsActive = index > 0 && index - 1 === activeIdx;
        const offsetX = active ? 0 : Math.min(index * 16, 80);

        return (
          <article
            key={card.id}
            className={`relative ${active ? "z-30" : "z-10"} ${flipped ? "stack-card flipped" : "stack-card"}`}
            style={{
              marginTop: index === 0 ? 0 : previousIsActive ? 8 : -4,
              transform: `translateX(${offsetX}px) rotate(0deg)`,
              width: active ? "100%" : "calc(100% - 80px)",
              perspective: active ? "1200px" : undefined,
              WebkitPerspective: active ? "1200px" : undefined,
            }}
          >
            <div className="flip-inner">
              <div className="face relative isolate overflow-hidden border border-white/70 bg-white/65 shadow-[0_8px_30px_rgba(0,0,50,0.1)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[2px] before:rounded-t-[18px] before:bg-[linear-gradient(90deg,#061a33_0%,#0c4f8a_32%,#36c293_52%,#061a33_100%)] before:content-['']">
                <CardCornerAccent
                  tone={
                    card.id === "used" ||
                    card.id === "reconditioned" ||
                    card.id === "supply-fit"
                      ? "green"
                      : "blue"
                  }
                />
                <div
                  className={`relative z-10 flex w-full text-left ${active ? "min-h-[60px] items-center gap-3 px-4 py-2.5" : "min-h-[60px] items-center gap-1 px-3.5 py-2"}`}
                >
                  <button
                    type="button"
                    onClick={() => activateCard(index)}
                    className={`flex min-w-0 flex-1 items-center text-left ${active ? "gap-3" : "gap-1"}`}
                    aria-expanded={active}
                    aria-label={`${active ? "Close" : "Open"} ${card.title}`}
                  >
                    <span
                      className={`flex flex-none items-center justify-center rounded-full ${active ? `h-10 w-10 ${getIconClasses(card.icon)}` : "h-8 w-8"}`}
                    >
                      {getIcon(card.title, active ? "h-7 w-7" : "h-6 w-6")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block font-['Manrope'] font-bold text-[#0d1b2e] ${active ? "break-words text-[18px] leading-[1.05]" : "line-clamp-2 text-[13px] uppercase leading-[1.12]"}`}
                      >
                        {card.title}
                      </span>
                    </span>
                  </button>
                  <div className="ml-auto flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-[12px]">
                      <PriceLine price={card.pricetag} />
                    </span>
                    {active ? (
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={() => showBack(index)}
                        className="flex-none text-[#50647d]"
                        aria-label={`Flip ${card.title}`}
                      >
                        <FlipIcon />
                      </button>
                    ) : null}
                  </div>
                </div>

                <div
                  ref={(element) => {
                    cardExpandRefs.current[index] = element;
                  }}
                  className="relative z-10 h-0 overflow-hidden"
                >
                  <div
                    ref={(element) => {
                      expandInnerRefs.current[index] = element;
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => active && setFlippedIdx(index)}
                    onKeyDown={(event) => {
                      if (
                        active &&
                        (event.key === "Enter" || event.key === " ")
                      )
                        setFlippedIdx(index);
                    }}
                    className="border-t border-[#edf1f5] px-4 pb-5 pt-4 text-left"
                    aria-label={`Show full details for ${card.title}`}
                  >
                    <p className="text-[15px] leading-[1.55] text-[#5b6675]">
                      {card.summary}
                    </p>
                    <div className="mt-4 space-y-2.5">
                      {card.details.slice(0, 3).map((detail) => (
                        <div
                          key={`${card.id}-${detail.label}`}
                          className="flex items-start gap-2 text-[14px] leading-[1.45] text-[#4b5b70]"
                        >
                          <CheckIcon />
                          <span>
                            <strong className="text-[#172b45]">
                              {detail.label}:
                            </strong>{" "}
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[14px]">
                      <PriceLine price={card.price} />
                    </p>
                  </div>
                </div>
              </div>

                  <div className="face face-back isolate flex min-h-[310px] flex-col overflow-hidden border-[1.5px] border-white/35 bg-[linear-gradient(155deg,rgba(13,27,46,0.88)_0%,rgba(15,38,66,0.82)_40%,rgba(13,27,46,0.9)_100%)] p-4 text-white shadow-[0_0_0_1px_rgba(59,130,246,1),0_0_8px_rgba(59,130,246,0.5),0_0_16px_rgba(59,130,246,0.38),0_0_26px_rgba(59,130,246,0.24),0_4px_12px_rgba(42,109,214,0.28)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-[1] before:h-[2px] before:rounded-t-[18px] before:bg-[linear-gradient(90deg,#061a33_0%,#0c4f8a_32%,#36c293_52%,#061a33_100%)] before:content-['']">
                <div className="back-inner flex min-h-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-['Manrope'] text-[18px] font-bold leading-[1.15] text-white">
                      {card.backHeader}
                    </h3>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setFlippedIdx(-1);
                      }}
                      className="inline-flex flex-none items-center gap-1 rounded-full border border-white/30 px-2 py-1 text-[10px] font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
                      aria-label={`Flip ${card.title} back to the front`}
                    >
                      <span aria-hidden="true">↶</span>
                      <span>Back</span>
                    </button>
                  </div>
                  <div className="mt-3 border-t border-white/15 pt-3 text-[14px] leading-[1.55] text-white/80">
                    {card.closing}
                  </div>
                  <div className="back-list mt-4 space-y-3 pr-2">
                    {card.details.map((detail) => (
                      <div
                        key={`${card.id}-back-${detail.label}`}
                        className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-[#e8eef7]"
                      >
                        <CheckIcon />
                        <span>
                          <strong className="text-white">
                            {detail.label}:
                          </strong>{" "}
                          <span className="text-[#c7d3e1]">{detail.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </div>
  );
}

export default function HomeEngineTypesSection({
  cards = homeEngineTypeCards,
}: Props) {
  return (
    <Section
      id="engine-types"
      className="relative overflow-hidden bg-[#f8fbff] py-7 sm:py-8 lg:py-10"
    >
      <div
        className="pointer-events-none absolute -left-40 top-44 h-[430px] w-[900px] rotate-[25deg] bg-[#edf5ff] opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-48 top-16 h-[620px] w-[800px] rotate-[28deg] border border-white/70 bg-[#effaf8]/70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[28%] h-[360px] w-[750px] rotate-[-23deg] bg-[#f1f7ff] opacity-90"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-[1400px]">
        <div className="max-w-[800px]">
          <div className="section-pill">
            <span
              className="h-2.5 w-2.5 rounded-full bg-[#19d67a]"
              aria-hidden="true"
            />
            <span>Replacement Engine Options</span>
          </div>

          <h2 className="mt-5 max-w-[900px] font-['Manrope'] text-[38px] font-bold uppercase leading-[0.98] text-[#0d1b2e] sm:text-[48px] lg:text-[58px]">
            <span>Compare Used, </span>
            <span className="text-[#087f55]">Reconditioned &amp; Rebuilt</span>
            <span> Replacement Engines</span>
          </h2>

          <p className="mt-5 max-w-[720px] text-[16px] leading-[1.55] text-[#526174] sm:text-[18px]">
            Every engine type available through our UK network - with typical
            price ranges, honest definitions and the right choice for your
            budget, mileage and how long you plan to keep the vehicle.
          </p>
        </div>

        <div className="pointer-events-none absolute right-[12%] top-[150px] hidden text-center text-[#62738a] lg:block">
          <p className="font-['Manrope'] text-[14px] font-semibold italic leading-[1.25]">
            Click
            <br />
            to flip
          </p>
          <svg
            viewBox="0 0 80 70"
            className="ml-10 mt-1 h-14 w-16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 8c36-3 57 15 57 48"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="m57 48 8 8 7-9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="md:hidden">
          <MobileStack cards={cards} />
        </div>
        <div className="hidden md:block">
          <DesktopGrid cards={cards} />
        </div>
      </Container>
    </Section>
  );
}
