"use client";

import { type ReactNode, useState, useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeEngineTypeCard } from "@/lib/homepageData";

type Props = {
  cards: HomeEngineTypeCard[];
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldTickIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M12 3 19 6.2v5.5c0 4.9-3.05 8.13-7 10.3-3.95-2.17-7-5.4-7-10.3V6.2L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m8.8 12.15 2.1 2.1 4.3-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TickStarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M8 2.4v11.2M2.4 8h11.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="m4.2 4.2 7.6 7.6M11.8 4.2 4.2 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UsedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9 28.5 14.2 21h11l4.6 3.4h4.9c1.3 0 2.4 1.1 2.4 2.4v7.3H9.8c-1.5 0-2.8-1.2-2.8-2.8v-1.2c0-.7.3-1.3.8-1.6L9 28.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 21.1 18.1 17h9.4l6.1 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.2" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="29.8" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="36" cy="22" r="8.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M36 22v-4.3M36 22l3.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EngineBlockBase({ children }: { children?: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9.5 15.5h23.6a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H9.5a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.5 19H4m2.5 10H4m32.1-10H39m-2.9 10H39" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14.7" cy="24" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="24" cy="24" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      {children}
    </svg>
  );
}

function ReconditionedIcon() {
  return (
    <EngineBlockBase>
      <path d="M31.8 28.8a6.8 6.8 0 1 0-.8-9.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m29.2 17 3.6.5-.3-3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function RebuiltIcon() {
  return (
    <EngineBlockBase>
      <path d="m29.8 16.2 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33.2 14.3 36 11.5l2.7 2.7-2.8 2.8M27.9 19.6l4.6 4.6-2.2 2.2-4.6-4.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function RemanufacturedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9 34V19l8-6 8 6v15H9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M25 34V22.5H39V34" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 24h4v6h-4zm14 3h4v7h-4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M38 18.7a4.7 4.7 0 1 1-4.7 4.7A4.7 4.7 0 0 1 38 18.7Zm0 2v5.4m-2.7-2.7h5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SupplyFitIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M8.8 29 14 21.5h11l4.8 3.5h5.3a2.3 2.3 0 0 1 2.3 2.3v6.8H10.2A3.2 3.2 0 0 1 7 30.9v-.6c0-.5.3-1 .8-1.3l1-.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 21.5 18.3 17h9.2l5.9 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15.4" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="30.2" cy="34.2" r="2.9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 8v13.3m0 0-4.2-4.3m4.2 4.3 4.2-4.3M9 40h30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RefurbishedIcon() {
  return (
    <EngineBlockBase>
      <path d="m14.2 25.4 3.3 3.3 6.6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </EngineBlockBase>
  );
}

function getIcon(icon: HomeEngineTypeCard["icon"]) {
  if (icon === "used") return <UsedIcon />;
  if (icon === "reconditioned") return <ReconditionedIcon />;
  if (icon === "rebuilt") return <RebuiltIcon />;
  if (icon === "remanufactured") return <RemanufacturedIcon />;
  if (icon === "supply-fit") return <SupplyFitIcon />;
  return <RefurbishedIcon />;
}

export default function HomeEngineTypesSection({ cards }: Props) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 767px)");
    const update = () => setIsMobile(!!mq?.matches);
    update();
    if (mq && mq.addEventListener) mq.addEventListener("change", update);
    else if (mq && mq.addListener) mq.addListener(update);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener("change", update);
      else if (mq && mq.removeListener) mq.removeListener(update);
    };
  }, []);

  return (
    <Section id="engine-types" className="bg-white py-7 sm:py-8 lg:py-10">
      <Container className="max-w-[1180px]">
        <div className="max-w-[760px]">
          <div className="section-pill">
            <span>Replacement Engine Options</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[32px] lg:text-[36px]">
            <span>Compare Used, </span>
            <span className="text-[#15803d]">Reconditioned & Rebuilt</span>
            <span> Replacement Engines</span>
          </h2>

          <p className="mt-4 max-w-[60ch] text-[16px] leading-[1.7] text-[#6b7280]">
            Every engine type available through our UK network - with typical price ranges, honest definitions and the right choice for your budget, mileage and how long you plan to keep the vehicle.
          </p>
        </div>

        {isMobile ? (
          <MobileStack cards={cards} />
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const flipped = activeCard === card.id;

              return (
                <div key={card.id} className="perspective-1000 min-h-[286px] sm:min-h-[304px] xl:min-h-[280px]">
                  <button
                    type="button"
                    onClick={() => setActiveCard(flipped ? null : card.id)}
                    className="block h-full w-full text-left"
                    aria-pressed={flipped}
                    aria-label={`${flipped ? "Hide details for" : "Show details for"} ${card.title}`}
                  >
                    <div
                      className={`relative h-full min-h-[286px] rounded-[18px] transition duration-500 [transform-style:preserve-3d] sm:min-h-[304px] xl:min-h-[280px] ${flipped ? "[transform:rotateY(180deg)]" : ""
                        }`}
                    >
                      <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0d1b2e]/14 bg-white p-5 shadow-[0_18px_38px_rgba(13,27,46,0.06)] [backface-visibility:hidden] sm:p-6">
                        <div className="mt-4 flex items-start gap-4 justify-center">
                          <div className="min-w-0 flex-1 text-center">
                            <h3
                              className="font-['Manrope'] text-[22px] font-bold leading-[1.02] text-[#0d1b2e] sm:text-[24px]"
                            >
                              {card.title}
                            </h3>

                            <p className="mt-2.5 text-[14px] font-bold leading-[1.45] text-[#0d1b2e]">
                              {card.price}
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 line-clamp-4 text-center text-[14px] leading-[1.65] text-[#5a6478]">
                          {card.summary}
                        </p>

                        <span className="mt-auto inline-flex items-center justify-center gap-2 pt-4 text-[14px] font-bold text-[#15803d]">
                          <span>{card.cta}</span>
                          <ArrowIcon />
                        </span>
                      </div>

                      <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[18px] border border-[#0d1b2e] bg-[#0d1b2e] p-5 text-white shadow-[0_24px_48px_rgba(7,25,54,0.18)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-4">
                        <h3
                          className="font-['Manrope'] text-[20px] font-bold leading-[1.2] text-white"
                        >
                          {card.backHeader}
                        </h3>

                        <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-color:#86efac_transparent] [scrollbar-width:thin]">
                          <div className="space-y-3">
                            {card.details.map((detail) => (
                              <div key={`${card.id}-${detail.label}`} className="flex items-start gap-3 text-[13px] leading-[1.55] text-[#e8eef7]">
                                <span className="mt-[1px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#15803d] text-white">
                                  <TickStarIcon />
                                </span>
                                <div>
                                  <span className="font-semibold text-white">{detail.label}</span>
                                  <span className="text-[#c7d3e1]">{" "}{detail.value}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <p className="mt-5 text-[13px] leading-[1.65] text-[#c7d3e1]">
                            {card.closing}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Section>
  );
}

// Mobile stacked interactive layout
function MobileStack({ cards }: { cards: HomeEngineTypeCard[] }) {
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [flippedIdx, setFlippedIdx] = useState<number>(-1);
  const cardExpandRefs = useRef<Array<HTMLDivElement | null>>([]);
  const expandInnerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Set heights when active card changes
  useEffect(() => {
    cardExpandRefs.current.forEach((ce, idx) => {
      if (ce) {
        if (idx === activeIdx) {
          const ei = expandInnerRefs.current[idx];
          if (ei) {
            requestAnimationFrame(() => {
              ce.style.height = ei.scrollHeight + 'px';
            });
          }
        } else {
          ce.style.height = '0px'; 
        }
      }
    });
  }, [activeIdx]);

  // Open last card by default on mount
  useEffect(() => {
    if (!cards || cards.length === 0) return;
    const last = cards.length - 1;
    setActiveIdx(last);
  }, [cards]);

  function activateCard(i: number) {
    if (activeIdx === i) {
      setActiveIdx(-1);
      setFlippedIdx(-1);
      return;
    }
    
    if (flippedIdx !== -1 && flippedIdx !== i) {
      setFlippedIdx(-1);
    }
    
    setActiveIdx(i);
  }

  function flipCard(i: number) {
    if (activeIdx !== i) return;
    setFlippedIdx(i);
  }

  function unflipCard(i: number) {
    setFlippedIdx(-1);
  }

  return (
    <div className="mobile-stack-root">
      <style>{`
        .mobile-stack-root {
          padding: 0 4px;
        }
        
        /* CARD BASE */
        .c-card {
          position: relative;
          border-radius: 22px;
          cursor: pointer;
          transition: transform 0.42s cubic-bezier(0.34,1.22,0.64,1), 
                      margin-top 0.38s cubic-bezier(0.4,0,0.2,1), 
                      box-shadow 0.3s ease;
          will-change: transform;
          perspective: 1000px;
        }
        
        /* REDUCED OVERLAP TO ENSURE PEEK-BAR IS FULLY VISIBLE */
        .c-card + .c-card {
          margin-top: -30px; 
        }
        
        .c-card.active + .c-card {
          margin-top: 14px;
        }
        
        .c-card.active ~ .c-card + .c-card {
          margin-top: -30px; 
        }
        
        /* FLIP CONTAINER */
        .flip-inner {
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
          border-radius: 22px;
        }
        
        .c-card.flipped .flip-inner {
          transform: rotateY(180deg);
        }
        
        /* FACES */
        .face {
          border-radius: 22px;
          overflow: hidden;
          backface-visibility: hidden;
        }
        
        .face-front {
          background: #ffffff;
          box-shadow: 0 8px 30px rgba(0,0,50,0.1);
          border: 1px solid #e5e7eb;
        }
        
        .face-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0; 
          transform: rotateY(180deg);
          background: linear-gradient(155deg, #0d1b2e 0%, #0f2642 40%, #0d1b2e 100%);
          box-shadow: 0 12px 40px rgba(0,0,50,0.3);
          display: flex;
          flex-direction: column;
        }
        
        /* PEEK BAR */
        .peek-bar {
          display: flex;
          align-items: flex-start; 
          justify-content: space-between;
          padding: 18px 20px;
          min-height: 82px;
        }
        
        .peek-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .peek-num {
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        
        .peek-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 0.02em;
          color: #000032;
          line-height: 1;
        }
        
        .peek-price {
          font-family: 'Urbanist', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #15803d;
          white-space: nowrap;
        }
        
        .peek-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s;
          font-size: 14px;
          color: #15803d;
          margin-top: 2px;
        }
        
        .c-card.active .peek-icon {
          transform: rotate(45deg);
        }
        
        /* EXPANDED FRONT */
        .card-expand {
          height: 0;
          overflow: hidden;
          transition: height 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        
        .c-card.active .card-expand {
          height: var(--expand-h, auto);
        }
        
        .expand-inner {
          padding: 0 20px 22px;
          border-top: 1px solid #f3f4f6;
        }
        
        .exp-desc {
          font-size: 13px;
          color: #374151;
          line-height: 1.65;
          margin-bottom: 16px;
        }
        
        .exp-items {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 16px;
        }
        
        .exp-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        
        .exp-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 9px;
          color: #15803d;
        }
        
        .exp-item-text {
          font-size: 12.5px;
          color: #374151;
          line-height: 1.5;
        }
        
        .exp-item-text strong {
          color: #111827;
          font-weight: 700;
        }
        
        .flip-hint {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          font-size: 11.5px;
          color: #9ca3af;
          font-weight: 600;
          cursor: pointer;
          padding: 2px 0;
          transition: color 0.2s;
        }
        
        .flip-hint:hover {
          color: #15803d;
        }
        
        .flip-hint-arrow {
          font-size: 13px;
          color: #15803d;
        }
        
        /* BACK FACE */
        .back-inner {
          flex: 1;
          min-height: 0; 
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
        }
        
        .back-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          color: #fff;
          line-height: 0.05;
          letter-spacing: 0.02em;
          margin-bottom: 14px;
        }
        
        .back-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          line-height: 1.65;
          margin-bottom: 16px;
        }
        
        /* SCROLLABLE ITEMS LIST */
        .back-items {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
          scrollbar-width: thin;
          scrollbar-color: #86efac transparent;
        }
        
        .back-items::-webkit-scrollbar {
          width: 6px;
        }
        
        .back-items::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .back-items::-webkit-scrollbar-thumb {
          background-color: #86efac;
          border-radius: 3px;
        }
        
        .back-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }
        
        .back-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(22,163,74,0.2);
          border: 1.5px solid rgba(22,163,74,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 9px;
          color: #16a34a;
        }
        
        .back-item-text {
          font-size: 12.5px;
          color: rgba(255,255,255,0.75);
          line-height: 1.5;
        }
        
        .back-item-text strong {
          color: #fff;
          font-weight: 700;
        }
        
        .back-flip-back {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 14px;
          font-size: 11.5px;
          color: rgba(255,255,255,0.45);
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
          padding-bottom: 4px;
        }
        
        .back-flip-back:hover {
          color: rgba(255,255,255,0.8);
        }
        
        /* ACTIVE CARD LIFT */
        .c-card.active {
          transform: translateY(-6px);
          z-index: 10;
        }
        
        .c-card {
          z-index: 1;
        }
      `}</style>

      {cards.map((c, i) => {
        const active = activeIdx === i;
        const flipped = flippedIdx === i;
        
        return (
          <div 
            key={c.id} 
            className={`c-card ${active ? 'active' : ''} ${flipped ? 'flipped' : ''}`}
            style={{ zIndex: active ? 10 : 1 }}
          >
            <div className="flip-inner">
              {/* FRONT FACE */}
              <div className="face face-front">
                <div 
                  className="peek-bar" 
                  onClick={() => activateCard(i)}
                >
                  <div className="peek-left">
                    <div className="peek-title">{c.title}</div>
                  </div>
                  
                  <div className="peek-price">{c.pricetag}</div>
                </div>
                
                <div 
                  className="card-expand"
                  ref={(el) => { cardExpandRefs.current[i] = el; }}
                >
                  <div 
                    className="expand-inner"
                    ref={(el) => { expandInnerRefs.current[i] = el; }}
                  >
                    <div className="peek-price">{c.price}</div>
                    <div className="exp-desc">{c.summary}</div>
                    <div className="exp-items">
                      {c.details?.slice(0, 3).map((d) => (
                        <div key={`${c.id}-${d.label}`} className="exp-item">
                          <div className="exp-check">
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <polyline points="1.5,4.5 3.5,6.8 7.5,2" stroke="#15803d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="exp-item-text">
                            <strong>{d.label}:</strong> {d.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          flipCard(i);
                        }}
                        style={{ 
                          background: 'transparent', 
                          border: 0, 
                          color: '#15803d', 
                          fontWeight: 700,
                          fontSize: '11.5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        Tap to see full details
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M11.5 6.5A5 5 0 0 1 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M1.5 6.5A5 5 0 0 1 11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <polyline points="10,2.5 11,5 8.5,5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="face face-back">
                <div className="back-inner">
                  <div className="back-title" style={{ marginTop: '16px' }}>{c.title}</div>
                  <div className="back-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.12)', marginBottom: '14px' }}></div>
                  <div className="back-desc">{c.closing}</div>
                  
                  {/* SCROLLABLE SECTION */}
                  <div className="back-items">
                    {c.details?.map((d) => (
                      <div key={`${c.id}-back-${d.label}`} className="back-item">
                        <div className="back-check">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <polyline points="1.5,4.5 3.5,6.8 7.5,2" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="back-item-text">
                          <strong>{d.label}:</strong> {d.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FIXED BUTTON AT BOTTOM */}
                  <div style={{ marginTop: 12, flexShrink: 0 }}>
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.stopPropagation();
                        unflipCard(i);
                      }}
                      style={{ 
                        background: 'transparent', 
                        border: 0, 
                        color: '#FFFFFF',
                        fontWeight: 600,
                        fontSize: '11.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        width: '100%',
                        marginTop: '14px'
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M11.5 6.5A5 5 0 0 1 2 8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M1.5 6.5A5 5 0 0 1 11 5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
                        <polyline points="10,2.5 11,5 8.5,5.8" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back to overview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}