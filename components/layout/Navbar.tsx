"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { headerNavigation } from "@/lib/navigation";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.44-1.29a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.64.63A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <header className="sticky top-0 z-100 bg-[#061a33] text-white shadow-md max-[1023px]:shadow-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 max-[1023px]:border-b-0">
        <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
          <Image
            src="/branding/engine-market-logo-rectangle.png"
            alt="Engines Market"
            width={182}
            height={46}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex" aria-label="Primary navigation">
          {headerNavigation.map((item) => (
            <div key={item.label} className="group relative">
              <Link href={item.href} className="flex h-16 items-center gap-1 px-3 transition hover:text-[#86efac]">
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
        </div>

        <div className="flex items-center gap-1.5 self-center lg:hidden">
          <a
            href="tel:03330000044"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label="Call Engines Market"
          >
            <PhoneIcon />
          </a>
          <a
            href="https://wa.me/443330000044"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#25D366] text-white"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp className="h-[17px] w-[17px]" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((current) => !current);
              if (mobileOpen) {
                setMobileExpanded(null);
              }
            }}
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
        <div className="bg-[#0b2241] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile site navigation">
            {headerNavigation.map((item) => {
              const expanded = mobileExpanded === item.label;

              return (
                <div key={item.label} className="overflow-hidden rounded-[12px] border border-white/10 bg-white/5">
                  {item.links ? (
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
                      aria-expanded={expanded}
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <FiChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.links && expanded ? (
                    <div className="border-t border-white/10 px-4 py-3">
                      <div className="grid gap-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-slate-300 transition hover:text-white"
                            onClick={closeMobileMenu}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
