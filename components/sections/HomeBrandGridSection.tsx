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
        width={180}
        height={90}
        sizes="180px"
        className="h-auto max-h-[98px] w-auto max-w-[186px] object-contain"
      />
    );
  }

  return <GenericLogo label={label} />;
}

export default function HomeBrandGridSection({ brands, featuredSlugs }: Props) {
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const [hasSeen, setHasSeen] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [columns, setColumns] = useState(2);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const getLayoutState = () => {
      if (typeof window === "undefined") return 2;
      if (window.innerWidth >= 1280) return 5;
      if (window.innerWidth >= 768) return 3;
      return 2;
    };

    const handleResize = () => {
      setColumns(getLayoutState());
      setIsMobileViewport(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featuredBrands = useMemo(() => {
    const featuredLookup = new Map(brands.map((brand) => [brand.slug, brand]));
    return featuredSlugs
      .map((slug) => featuredLookup.get(slug))
      .filter((brand): brand is HomeBrandPriceEntry => Boolean(brand));
  }, [brands, featuredSlugs]);

  const alphabeticalBrands = useMemo(
    () => [...brands].sort((a, b) => a.displayName.localeCompare(b.displayName)),
    [brands],
  );

  const collapsedBrands = isMobileViewport ? featuredBrands.slice(0, 6) : featuredBrands;
  const visibleBrands = expanded ? alphabeticalBrands : collapsedBrands;
  const cardHeightClass = "min-h-[164px] sm:min-h-[172px]";
  const overlayHeightClass = "min-h-[220px] sm:min-h-[228px]";

  function toggleBrand(slug: string) {
    setOpenBrand((current) => (current === slug ? null : slug));
    setHasSeen((current) => (current.includes(slug) ? current : [...current, slug]));
  }

  return (
    <Section id="brands" className="bg-[#f7f8fb] py-7 sm:py-8 lg:py-10">
      <style>{`
        @keyframes brandCardReveal {
          0% {
            opacity: 0;
            transform: translateX(-150px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes brandCardRevealRight {
          0% {
            opacity: 0;
            transform: translateX(150px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .brand-reveal {
          will-change: transform, opacity;
        }

        .brand-reveal-left {
          animation: brandCardReveal 0.9s ease-out forwards;
        }

        .brand-reveal-right {
          animation: brandCardRevealRight 0.9s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-reveal,
          .brand-reveal-left,
          .brand-reveal-right {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
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

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {visibleBrands.map((brand, index) => {
            const isOpen = openBrand === brand.slug;
            const shouldAnimate = !hasSeen.includes(brand.slug);
            const rowIndex = Math.floor(index / columns);
            const isLastMobileRow = isMobileViewport && !expanded && index >= visibleBrands.length - 2;
            const opensUpward = isMobileViewport ? isLastMobileRow : rowIndex > 0;
            const shouldReveal = expanded;
            const revealDirectionClass = index % 2 === 0 ? "brand-reveal-left" : "brand-reveal-right";

            return (
              <article
                key={brand.slug}
                className={`group relative ${isOpen ? "z-30" : "z-10"} ${shouldReveal ? `brand-reveal ${revealDirectionClass}` : ""}`}
              >
                <div
                  className={`relative border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.06)] transition-all duration-300 ${
                    isOpen
                      ? opensUpward
                        ? "rounded-b-[10px] rounded-t-none border-t-0 shadow-[0_18px_34px_rgba(21,128,61,0.16)]"
                        : "rounded-t-[10px] rounded-b-none border-b-0 shadow-[0_18px_34px_rgba(21,128,61,0.16)]"
                      : "rounded-[10px] group-hover:-translate-y-1 group-hover:border-[#b8dcc7] group-hover:shadow-[0_18px_34px_rgba(21,128,61,0.14)]"
                  }`}
                >
                  <div className={`flex flex-col px-3 py-3 text-center sm:px-3 sm:py-3 ${cardHeightClass}`}>
                    <Link
                      href={`/${brand.slug}`}
                      className="flex flex-1 flex-col items-center"
                      aria-label={`Open ${brand.displayName} brand page`}
                    >
                      <div className="flex min-h-[92px] items-end justify-center sm:min-h-[96px]">
                        <div className="transition-transform duration-300 group-hover:scale-[1.04]">
                          <BrandLogo logo={brand.logo} label={brand.displayName} />
                        </div>
                      </div>
                      <p className="mt-2.5 text-[15px] font-bold leading-tight text-[#0d1b2e]">
                        {brand.displayName}
                      </p>
                      <p className="mt-2 text-[12px] font-medium leading-[1.45] text-[#6b7280]">
                        from <span className="font-semibold text-[#15803d]">{brand.fromPrice}</span>
                      </p>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleBrand(brand.slug)}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? `Collapse ${brand.displayName}` : `Expand ${brand.displayName}`}
                      className="mt-auto flex items-center justify-center pt-2"
                    >
                      <ChevronIcon open={isOpen} animate={shouldAnimate && !isOpen} />
                    </button>
                  </div>

                  {isOpen ? (
                    <div
                      className={`absolute left-[-1px] right-[-1px] z-20 border border-[#e5e7eb] bg-[#0d1b2e] p-4 py-5 shadow-[0_20px_38px_rgba(13,27,46,0.24)] ${
                        opensUpward
                          ? `bottom-[calc(100%-1px)] rounded-t-[10px] border-b-0 ${overlayHeightClass}`
                          : `top-[calc(100%-1px)] rounded-b-[10px] border-t-0 ${overlayHeightClass}`
                      }`}
                    >
                      <div className="space-y-3.5 text-left">
                        <div className="flex items-baseline gap-2.5 text-[11px] leading-[1.6]">
                          <span className="text-white/60">Engine prices from:</span>
                          <span className="font-semibold text-white">{brand.fromPrice} <span className="text-[11px] font-normal text-white/70">(supply only)</span></span>
                        </div>
                        <div className="flex items-baseline gap-2.5 text-[11px] leading-[1.6]">
                          <span className="text-white/60">Avg rebuilt:</span>
                          <span className="font-semibold text-white">{brand.avgRebuilt}</span>
                        </div>
                        <div className="flex items-baseline gap-2.5 text-[11px] leading-[1.6]">
                          <span className="text-white/60">Supply & fit:</span>
                          <span className="font-semibold text-white">Available UK-wide</span>
                        </div>
                      </div>

                      <Link
                        href={`/${brand.slug}`}
                        className="mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#15803d] p-2 text-center text-[13px] font-semibold leading-[1.3] text-white transition hover:bg-[#116533]"
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

        {alphabeticalBrands.length > featuredBrands.length && (
          <button
            type="button"
            onClick={() => {
              setExpanded((current) => !current);
              setOpenBrand(null);
            }}
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
