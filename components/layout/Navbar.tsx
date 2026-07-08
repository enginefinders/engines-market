"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getBrandHref } from "@/lib/modelRoutes";

type NavItem = {
  label: string;
  href: string;
};

function buildNavItems(pathname: string): NavItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const brandSlug = segments[0];
  const modelSlug = segments[1];
  const brandHref = brandSlug ? getBrandHref(brandSlug) : "/#brands";
  const modelHref = brandSlug && modelSlug ? `${brandHref}/${modelSlug}` : "";

  if (brandSlug && modelSlug) {
    return [
      { label: "Engines", href: `${modelHref}#model-engine-types` },
      { label: "Brands", href: "/#brands" },
      { label: "Model Engines", href: `${brandHref}#brand-models` },
      { label: "Engine Codes", href: `${modelHref}#model-engine-codes` },
      { label: "Supply & Fit", href: `${modelHref}#how-it-works` },
      { label: "About Us", href: "/#home-why-use-us" },
    ];
  }

  if (brandSlug) {
    return [
      { label: "Engines", href: `${brandHref}#brand-engine-types` },
      { label: "Brands", href: "/#brands" },
      { label: "Model Engines", href: `${brandHref}#brand-models` },
      { label: "Engine Codes", href: `${brandHref}#brand-engine-codes` },
      { label: "Supply & Fit", href: `${brandHref}#how-it-works` },
      { label: "About Us", href: "/#home-why-use-us" },
    ];
  }

  return [
    { label: "Engines", href: "/#engine-types" },
    { label: "Brands", href: "/#brands" },
    { label: "Model Engines", href: "/#brands" },
    { label: "Engine Codes", href: "/#brands" },
    { label: "Supply & Fit", href: "/#how-it-works" },
    { label: "About Us", href: "/#home-why-use-us" },
  ];
}

export default function Navbar() {
  const pathname = usePathname();
  const navItems = buildNavItems(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-100 bg-[#061a33] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/branding/engine-market-logo-rectangle.png"
            alt="Engines Market"
            width={182}
            height={46}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-[#86efac]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:03330000044" className="text-sm font-bold">
            0333 000 0044
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[#0b2241] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile site navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-[12px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 flex flex-col gap-2">
            <a href="tel:03330000044" className="rounded-[12px] border border-white/10 px-4 py-3 text-sm font-bold text-white">
              0333 000 0044
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
