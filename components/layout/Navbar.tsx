import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#061a33] text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold">
            EM
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold uppercase">Engine</p>
            <p className="text-xs font-semibold text-green-400">Market</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          <a href="#">Engines</a>
          <a href="#">Brands</a>
          <a href="#">Model Engines</a>
          <a href="#">Engine Codes</a>
          <a href="#">Supply & Fit</a>
          <a href="#">About Us</a>
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
