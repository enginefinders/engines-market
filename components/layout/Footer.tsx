import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { footerNavigation } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="site-footer bg-[#061a33] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_3fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Engines Market homepage">
              <Image
                src="/branding/engine-market-logo-rectangle.png"
                alt="Engines Market"
                width={5752}
                height={2280}
                className="h-16 w-52 rounded bg-white object-contain p-1.5"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Compare replacement, used and reconditioned engine options from trusted UK specialists.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-slate-200">
              <a href="tel:03330000044" className="hover:text-green-300">0333 000 0044</a>
              <Link href="/get-a-quote" className="hover:text-green-300">Get a quote</Link>
            </div>
          </div>

          <nav className="hidden gap-x-10 gap-y-8 lg:grid lg:grid-cols-5" aria-label="Footer navigation">
            {footerNavigation.map((column) => (
              <div key={column.label}>
                <h2 className="font-black uppercase tracking-[0.08em] text-white">
                  {column.label}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.label}-${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-sm text-slate-300 transition hover:text-green-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <nav className="space-y-3 lg:hidden" aria-label="Footer navigation">
            {footerNavigation.map((column) => (
              <details key={column.label} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 font-black uppercase tracking-[0.08em] text-white">
                  <span>{column.label}</span>
                  <FiChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-white/10 px-4 py-4">
                  <ul className="grid gap-3">
                    {column.links.map((link) => (
                      <li key={`${column.label}-${link.href}-${link.label}`}>
                        <Link href={link.href} className="text-sm text-slate-300 transition hover:text-green-300">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          <p>Copyright {new Date().getFullYear()} Engines Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
