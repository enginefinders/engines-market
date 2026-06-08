"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-50 hidden bg-[#061a33] text-white shadow-md lg:block">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="Engine Market homepage">
          <Image
            src="/branding/engine-market-logo-rectangle.png"
            alt="Engines Market"
            width={5752}
            height={2280}
            priority
            className="h-10 w-auto object-contain"
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
          <a
            href="#quote-form"
            data-quote-source="navbar"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold hover:bg-green-700"
          >
            Get Quote
          </a>
        </div>

        <button className="lg:hidden" aria-label="Open navigation menu">
          <span className="text-2xl">+</span>
        </button>
      </div>
    </header>
  );
}
