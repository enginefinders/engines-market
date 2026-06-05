"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { HomeBrandPriceEntry } from "@/lib/homeBrandGridData";

type Props = {
  brands: HomeBrandPriceEntry[];
  featuredSlugs: string[];
};

function ChevronIcon({ open = false, animate = false }: { open?: boolean; animate?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-[#15803d] transition-transform duration-300 ${open ? "rotate-180" : ""} ${animate ? "chevron-breathe-down" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ open = false }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${open ? "rotate-45" : ""}`} fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const brandLogoSources: Record<string, string> = {
  "alfa-romeo": "/BrandsLogos/alpha-romeo-logo-small.webp.webp",
  "aston-martin": "/BrandsLogos/aston-martin-logo-small.webp.webp",
  audi: "/BrandsLogos/audi-logo-small.webp.webp",
  bentley: "/BrandsLogos/bentley-logo-small.webp.webp",
  bmw: "/BrandsLogos/bmw-logo-small.webp.webp",
  cadillac: "/BrandsLogos/cadillac-logo-small.webp.webp",
  chevrolet: "/BrandsLogos/chevrolet-logo-small.webp.webp",
  chrysler: "/BrandsLogos/chrysler-logo-small.webp.webp",
  citroen: "/BrandsLogos/citroen-logo-small.webp.webp",
  dacia: "/BrandsLogos/dacia-logo-small.webp",
  daewoo: "/BrandsLogos/daewoo-logo-small.webp.webp",
  daihatsu: "/BrandsLogos/daihatsu-logo-small.webp.webp",
  dodge: "/BrandsLogos/dodge-logo-small.webp.webp",
  ferrari: "/BrandsLogos/ferrari-logo-small.webp.webp",
  fiat: "/BrandsLogos/fiat-logo-small.webp.webp",
  ford: "/BrandsLogos/ford-logo-small.webp.webp",
  genesis: "/BrandsLogos/gensis-logo-small.webp",
  gm: "/BrandsLogos/gm-logo-small.webp",
  honda: "/BrandsLogos/honda-logo-small.webp.webp",
  hyundai: "/BrandsLogos/hyundai-logo-small.webp.webp",
  isuzu: "/BrandsLogos/isuzu-logo-small.webp.webp",
  iveco: "/BrandsLogos/iveco-logo-small.webp.webp",
  jaguar: "/BrandsLogos/jaguar-logo-small.webp.webp",
  jeep: "/BrandsLogos/jeep-logo-small.webp.webp",
  kia: "/BrandsLogos/kia-logo-small.webp.webp",
  lancia: "/BrandsLogos/lancia-logo-small.webp",
  "land-rover": "/BrandsLogos/land-rover-logo-small.webp.webp",
  lexus: "/BrandsLogos/lexus-logo-small.webp.webp",
  lotus: "/BrandsLogos/lotus-logo-small.webp",
  mclaren: "/BrandsLogos/mclaren-logo-small.webp",
  mg: "/BrandsLogos/mg-logo-small.webp.webp",
  "mercedes-benz": "/BrandsLogos/mercedes-logo-small.webp.webp",
  mini: "/BrandsLogos/mini-logo-small.webp.webp",
  mitsubishi: "/BrandsLogos/mitsubishi-logo-small.webp.webp",
  nissan: "/BrandsLogos/nissan-logo-small.webp.webp",
  peugeot: "/BrandsLogos/peugeot-logo-small.webp.webp",
  polestar: "/BrandsLogos/polestar-logo-small.webp",
  porsche: "/BrandsLogos/porsche-logo-small.webp.webp",
  "range-rover": "/BrandsLogos/range-rover-logo-small.webp.webp",
  renault: "/BrandsLogos/renault-logo-small.webp.webp",
  "rolls-royce": "/BrandsLogos/rolls-royce-logo-small.webp.webp",
  saab: "/BrandsLogos/saab-logo-small.webp.webp",
  seat: "/BrandsLogos/seat-logo-small.webp.webp",
  skoda: "/BrandsLogos/skoda-logo-small.webp.webp",
  smart: "/BrandsLogos/smart-logo-small.webp.webp",
  ssangyong: "/BrandsLogos/ssangyong-logo-small.webp",
  subaru: "/BrandsLogos/subaru-logo-small.webp.webp",
  suzuki: "/BrandsLogos/suzuki-logo-small.webp.webp",
  toyota: "/BrandsLogos/toyota-logo-small.webp.webp",
  vauxhall: "/BrandsLogos/vauxhall-logo-small.webp.webp",
  volkswagen: "/BrandsLogos/volkswagon-logo-small.webp.webp",
  volvo: "/BrandsLogos/volvo-logo-small.webp.webp",
};

function GenericLogo({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 180 60" className="h-[36px] w-[120px]" fill="none" aria-hidden="true">
      <text x="90" y="36" textAnchor="middle" fontSize="22" fontWeight="700" letterSpacing="2" fill="#4b5563">
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

function BrandLogo({ logo, label }: { logo: string; label: string }) {
  const src = brandLogoSources[logo];

  if (src) {
    return (
      <Image
        src={src}
        alt={`${label} logo`}
        width={120}
        height={60}
        sizes="120px"
        className="h-auto max-h-[60px] w-auto max-w-[120px] object-contain"
      />
    );
  }

  return <GenericLogo label={label} />;
}

export default function HomeBrandGridSection({ brands, featuredSlugs }: Props) {
  const [openBrand, setOpenBrand] = useState<string | null>("bmw");
  const [hasSeen, setHasSeen] = useState<string[]>(["bmw"]);

  const [expanded, setExpanded] = useState(false);
  const [columns, setColumns] = useState<number>(2);

  useEffect(() => {
    const getColumns = () => {
      if (typeof window === 'undefined') return 2;
      const width = window.innerWidth;
      if (width >= 1280) return 6; // xl
      if (width >= 768) return 3;  // md
      return 2; // default / sm
    };
    const handleResize = () => setColumns(getColumns());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialRows = columns <= 2 ? 3 : 2;
  const initialVisibleCount = columns === 6 ? 12 : columns * initialRows;

  const sortedBrands = useMemo(() => {
    const featured = brands.filter(b => featuredSlugs.includes(b.slug));
    const others = brands.filter(b => !featuredSlugs.includes(b.slug));
    return [...featured, ...others];
  }, [brands, featuredSlugs]);

  const visibleBrands = expanded
    ? sortedBrands
    : sortedBrands.slice(0, Math.min(sortedBrands.length, initialVisibleCount));

  // Calculate total rows to determine which cards are in the last row
  const totalRows = Math.ceil(visibleBrands.length / columns);

  function toggleBrand(slug: string) {
    setOpenBrand((current) => (current === slug ? null : slug));
    setHasSeen((current) => (current.includes(slug) ? current : [...current, slug]));
  }

  return (
    <Section id="brands" className="bg-[#f7f8fb] py-7 sm:py-8 lg:py-10">
      {/* FIX: Added missing closing quote on className */}
      <Container className="max-w-[1200px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="section-pill mx-auto">
            <span>Engine Replacement By Make</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[32px] lg:text-[36px]">
            <span>Replacement Engine Prices for </span>
            <span className="text-[#15803d]">Your Make</span>
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7] text-[#6b7280]">
            Select your make below to see typical price ranges - from used take-out units to fully rebuilt engines, with supply & fit available UK-wide.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {visibleBrands.map((brand, index) => {
            // Determine which row this card is in
            const rowIndex = Math.floor(index / columns);
            // Last row check (only apply upward dropdown if there's more than 1 row)
            const isLastRow = rowIndex === totalRows - 1 && totalRows > 1;
            const isOpen = openBrand === brand.slug;
            const shouldAnimate = !hasSeen.includes(brand.slug);

            return (
              <article key={brand.slug} className="relative">
                {/* Card Container */}
                <div
                  className={`relative border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.06)] ${
                    isOpen
                      ? isLastRow
                        ? "rounded-b-[10px] rounded-t-none border-t-0"
                        : "rounded-t-[10px] rounded-b-none border-b-0"
                      : "rounded-[10px]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleBrand(brand.slug)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Collapse ${brand.displayName}` : `Expand ${brand.displayName}`}
                    className="flex min-h-[120px] w-full flex-col items-center px-4 py-5 text-center"
                  >
                    <div className="flex h-[60px] items-center justify-center">
                      <BrandLogo logo={brand.logo} label={brand.displayName} />
                    </div>
                    <p className="mt-2 text-[12px] text-[#6b7280]">from {brand.fromPrice}</p>
                    <div className="mt-auto pt-3">
                      <ChevronIcon open={isOpen} animate={shouldAnimate && !isOpen} />
                    </div>
                  </button>

                  {/* Dropdown */}
                  {isOpen ? (
                    <div
                      className={`absolute left-[-1px] right-[-1px] z-50 bg-[#0d1b2e] p-2 py-4 border border-[#e5e7eb] ${
                        isLastRow
                          ? "bottom-full rounded-t-[10px] border-b-0"
                          : "top-full rounded-b-[10px] border-t-0"
                      }`}
                    >
                      <div className="space-y-2 text-left">
                        <div className="flex items-baseline gap-2 text-[11px]">
                          <span className="text-white/60">From price:</span>
                          <span className="font-semibold text-white">{brand.fromPrice} <span className="text-[11px] font-normal text-white/70">(supply only)</span></span>
                        </div>
                        <div className="flex items-baseline gap-2 text-[11px]">
                          <span className="text-white/60">Avg rebuilt:</span>
                          <span className="font-semibold text-white">{brand.avgRebuilt}</span>
                        </div>
                        <div className="flex items-baseline gap-2 text-[11px]">
                          <span className="text-white/60">Supply & fit:</span>
                          <span className="font-semibold text-white">Available UK-wide</span>
                        </div>
                      </div>

                      <Link
                        href={`/${brand.slug}`}
                        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#15803d] p-2 text-center text-[13px] font-semibold leading-[1.3] text-white transition hover:bg-[#116533]"
                      >
                        <span className="whitespace-normal">{brand.ctaText}</span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {sortedBrands.length > initialVisibleCount && (
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="mt-5 flex h-12 w-auto mx-auto items-center justify-center gap-2 rounded-[8px] bg-[#15803d] px-4 text-[14px] font-semibold text-white transition hover:bg-[#116533] duration-300"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'See Less' : `See More Brands`}</span>
          </button>
        )}
<div className="border-t border-[#eef2f7]  px-4 py-5 sm:px-6 sm:py-6">
                            <div className="rounded-[16px] border border-[#dfe6ef] bg-[#f8fbff] p-4 sm:p-5">
                                <div className="flex flex-col gap-4 border-l-4 border-[#0d1b2e] pl-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="max-w-6xl">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">Still Need A Real Price?</p>
                                        <p className="mt-2 text-[14px] leading-[1.7] text-[#475569] sm:text-[15px]">
                                            Prices shown are typical UK market ranges based on historical enquiry data. Actual quotes depend on engine code, variant, mileage and supplier. Enter your registration above for a tailored quote within hours.
                                        </p>
                                    </div>

                                    {/* <a
                                        href="#home-hero-reg-form"
                                        data-quote-context="FAQ footer CTA"
                                        data-quote-source="home-faq-footer-cta"
                                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0d1b2e] px-5 text-[14px] font-semibold text-white transition hover:bg-[#11284a] sm:w-auto sm:min-w-[250px]"
                                    >
                                        <span>Get Free Engine Quotes</span>
                                        <ArrowIcon />
                                    </a> */}
                                </div>
                            </div>
                        </div>
        {/* <p className="mx-auto mt-4 max-w-[60ch] text-center text-[12px] leading-[1.7] text-[#6b7280]">
          Prices shown are typical UK market ranges based on historical enquiry data. Actual quotes depend on engine code, variant, mileage and supplier. Enter your registration above for a tailored quote within hours.
        </p> */}
      </Container>
    </Section>
  );
}