"use client";

import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { headerNavigation } from "@/lib/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#061a33] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Engines Market homepage">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 text-sm font-black text-[#061a33]">
            EM
          </span>
          <span className="text-base font-black tracking-[0.02em] sm:text-lg">Engines Market</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex" aria-label="Primary navigation">
          {headerNavigation.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex h-16 items-center gap-1 px-3 transition hover:text-[#86efac]"
              >
                {item.label}
                {item.links ? <FiChevronDown className="h-4 w-4 transition group-hover:rotate-180" aria-hidden="true" /> : null}
              </Link>

              {item.links ? (
                <div className="invisible absolute left-0 top-full w-72 translate-y-2 rounded-b-lg border border-slate-200 bg-white p-2 text-[#122033] opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-slate-100 hover:text-green-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:03330000044" className="text-sm font-bold">
            0333 000 0044
          </a>
          <Link
            href="/get-a-quote"
            data-quote-source="navbar"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold hover:bg-green-700"
          >
            Get Quote
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 lg:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <FiX className="h-5 w-5" aria-hidden="true" /> : <FiMenu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-white/10 bg-[#061a33] px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="space-y-3">
            {headerNavigation.map((item) => (
              <div key={item.label} className="rounded-lg bg-white/5">
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-black"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.links ? (
                  <div className="grid gap-1 px-4 pb-4">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="py-1.5 text-sm text-slate-300"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Link
            href="/get-a-quote"
            className="mt-4 block rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-black"
            onClick={() => setMobileOpen(false)}
          >
            Get Quote
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
