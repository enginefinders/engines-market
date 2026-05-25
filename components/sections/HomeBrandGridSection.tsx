"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
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
  audi: "/images/home/brand-logos/audi.png",
  bmw: "/images/home/brand-logos/bmw.png",
  ford: "/images/home/brand-logos/ford.png",
  hyundai: "/images/home/brand-logos/hyundai.png",
  jaguar: "/images/home/brand-logos/jaguar.png",
  "land-rover": "/images/home/brand-logos/land-rover.png",
  "mercedes-benz": "/images/home/brand-logos/mercedes-benz.png",
  mini: "/images/home/brand-logos/mini.png",
  "range-rover": "/images/home/brand-logos/range-rover.png",
  toyota: "/images/home/brand-logos/toyota.png",
  vauxhall: "/images/home/brand-logos/vauxhall.png",
  volkswagen: "/images/home/brand-logos/volkswagen.png",
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
        className="h-auto max-h-[60px] w-auto max-w-[120px] object-contain grayscale"
      />
    );
  }

  return <GenericLogo label={label} />;
}

export default function HomeBrandGridSection({ brands, featuredSlugs }: Props) {
  const [openBrand, setOpenBrand] = useState<string | null>("bmw");
  const [hasSeen, setHasSeen] = useState<string[]>(["bmw"]);
  const [listOpen, setListOpen] = useState(false);

  const featuredBrands = useMemo(
    () =>
      featuredSlugs
        .map((slug) => brands.find((brand) => brand.slug === slug))
        .filter((brand): brand is HomeBrandPriceEntry => Boolean(brand)),
    [brands, featuredSlugs],
  );

  function toggleBrand(slug: string) {
    setOpenBrand((current) => (current === slug ? null : slug));
    setHasSeen((current) => (current.includes(slug) ? current : [...current, slug]));
  }

  return (
    <Section id="brands" className="bg-white py-7 sm:py-8 lg:py-10">
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
          {featuredBrands.map((brand, index) => {
            const isOpen = openBrand === brand.slug;
            const shouldAnimate = !hasSeen.includes(brand.slug);

            return (
              <article key={brand.slug} className={index > 5 ? "hidden md:block" : ""}>
                <div className="overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.06)]">
                  <button
                    type="button"
                    onClick={() => toggleBrand(brand.slug)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Collapse ${brand.displayName}` : `Expand ${brand.displayName}`}
                    className="flex min-h-[120px] w-full flex-col items-center px-4 py-5 text-center"
                  >
                    <div className="flex h-[60px] items-center justify-center grayscale">
                      <BrandLogo logo={brand.logo} label={brand.displayName} />
                    </div>
                    <p className="mt-2 text-[12px] text-[#6b7280]">from {brand.fromPrice}</p>
                    <div className="mt-auto pt-3">
                      <ChevronIcon open={isOpen} animate={shouldAnimate && !isOpen} />
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="bg-[#0d1b2e] px-4 py-4">
                      <div className="space-y-2 text-left">
                        <div className="flex items-baseline justify-between gap-3 text-[13px]">
                          <span className="text-white/60">From price:</span>
                          <span className="font-semibold text-white">{brand.fromPrice} <span className="text-[11px] font-normal text-white/70">(supply only)</span></span>
                        </div>
                        <div className="flex items-baseline justify-between gap-3 text-[13px]">
                          <span className="text-white/60">Avg rebuilt:</span>
                          <span className="font-semibold text-white">{brand.avgRebuilt}</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-3 text-[13px]">
                          <span className="text-white/60">Supply & fit:</span>
                          <span className="font-semibold text-white">Available UK-wide</span>
                        </div>
                      </div>

                      <Link
                        href={`/${brand.slug}`}
                        className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#15803d] px-3 py-3 text-center text-[13px] font-semibold leading-[1.3] text-white transition hover:bg-[#116533]"
                      >
                        <span className="whitespace-normal">{brand.ctaText}</span>
                        <span className="shrink-0">
                          <ArrowIcon />
                        </span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setListOpen((current) => !current)}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] border border-[#0d1b2e] bg-white px-4 text-[14px] font-semibold text-[#0d1b2e] transition hover:bg-[#f8fbff]"
          aria-expanded={listOpen}
        >
          <PlusIcon open={listOpen} />
          <span>View all 40+ makes - full alphabetical list</span>
        </button>

        {listOpen ? (
          <div className="mt-5 rounded-[12px] border border-[#e5e7eb] bg-[#fbfdff] p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 xl:grid-cols-4">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/${brand.slug}`}
                  className="rounded-[8px] px-2 py-2 transition hover:bg-white"
                >
                  <div className="text-[14px] font-bold text-[#0d1b2e]">{brand.displayName}</div>
                  <div className="mt-1 text-[12px] text-[#6b7280]">from {brand.fromPrice}</div>
                  <div className="mt-0.5 text-[12px] text-[#6b7280]">{brand.avgRebuilt}</div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mx-auto mt-4 max-w-[60ch] text-center text-[12px] leading-[1.7] text-[#6b7280]">
          Prices shown are typical UK market ranges based on historical enquiry data. Actual quotes depend on engine code, variant, mileage and supplier. Enter your registration above for a tailored quote within hours.
        </p>
      </Container>
    </Section>
  );
}
