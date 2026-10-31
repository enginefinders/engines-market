"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { carSeries } from "@/data/brands_Models";

type SearchMode = "registration" | "manual";
type VehicleRegistrationData = Record<string, string> & { registrationNumber: string };

const makeOptions = Object.keys(carSeries).sort();
const yearOptions = Array.from({ length: 37 }, (_, index) => String(2026 - index));

const statItems = [
  { src: "/Home/enginelogo.webp", alt: "Engine Codes", value: "8,000+", label: "Engine Codes" },
  { src: "/Home/carlogo.webp", alt: "Car Brands", value: "40+", label: "Car Brands" },
  { src: "/Home/verifiedlogo.webp", alt: "Free No Obligation", value: "100%", label: "Free · No Obligation" },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 20 20">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="m5 11 1.8-5.4A2 2 0 0 1 8.7 4h6.6a2 2 0 0 1 1.9 1.6L19 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <rect height="7" rx="2" stroke="currentColor" strokeWidth="1.5" width="18" x="3" y="11" />
      <circle cx="7.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 18H3v-2M18.5 18H21v-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function ManualSearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function UkFlag() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-[2px]" viewBox="0 0 20 14">
      <rect fill="#012169" height="14" width="20" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#fff" strokeWidth="3" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#c8102e" strokeWidth="1.8" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4.5" />
      <path d="M10 0v14M0 7h20" stroke="#c8102e" strokeWidth="2.8" />
    </svg>
  );
}

export default function PriceQuoteCta() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("registration");
  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engineCode, setEngineCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const modelOptions = useMemo(() => make ? ((carSeries as Record<string, string[]>)[make] ?? []) : [], [make]);

  function goToForm(params: URLSearchParams) {
    params.set("sourceLabel", "static-page-quote-search");
    params.set("sourcePage", window.location.href);
    router.push(`/form?${params.toString()}`);
  }

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = registration.trim().toUpperCase();
    if (!value) {
      setError("Please enter your registration number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/vehicle-registration?registrationNumber=${encodeURIComponent(value)}`);
      const payload = (await response.json()) as { vehicle?: VehicleRegistrationData; error?: string };
      if (!response.ok || !payload.vehicle) throw new Error(payload.error || "We could not find vehicle details for that registration.");
      const params = new URLSearchParams({ searchMode: "registration" });
      Object.entries(payload.vehicle).forEach(([key, field]) => { if (field) params.set(key, field); });
      goToForm(params);
    } catch (lookupError) {
      setError(lookupError instanceof Error ? lookupError.message : "Vehicle lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  function submitManual(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!make || !model || !year) {
      setError("Select a make, model and year to continue.");
      return;
    }
    setError("");
    const params = new URLSearchParams({ searchMode: "manual", make, model, year });
    if (engineCode.trim()) params.set("engineCode", engineCode.trim().toUpperCase());
    goToForm(params);
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_50px_rgba(10,41,82,0.14)] lg:sticky lg:top-24" aria-label="Get your free engine quotes">
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
        <button
          aria-controls="price-cta-registration"
          aria-pressed={mode === "registration"}
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-xs font-bold transition sm:text-sm ${mode === "registration" ? "border border-[#0000a3] bg-white text-[#15803d] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          onClick={() => setMode("registration")}
          type="button"
        >
          <CarIcon />
          <span>Search by Registration</span>
        </button>
        <button
          aria-controls="price-cta-manual"
          aria-pressed={mode === "manual"}
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-xs font-bold transition sm:text-sm ${mode === "manual" ? "border border-[#0000a3] bg-white text-[#15803d] shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
          onClick={() => setMode("manual")}
          type="button"
        >
          <ManualSearchIcon />
          <span>Search Manually</span>
        </button>
      </div>

      {mode === "registration" ? (
        <div className="px-3 pb-3 pt-5 text-center sm:px-6 sm:pb-5" id="price-cta-registration">
          <h2 className="text-lg font-extrabold tracking-tight text-[#0a2952]">Get Your Free Engine Quotes</h2>
          <p className="mt-1 text-sm text-[#0a2952]">Instant comparison from UK-vetted engine specialists</p>

          <form className="mt-5" onSubmit={submitRegistration} aria-label="Search by registration">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-[#15803d] focus-within:ring-2 focus-within:ring-emerald-100">
              <span className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-[#0d1b2e]"><UkFlag /> UK</span>
              <span aria-hidden="true" className="h-4 w-px bg-slate-200" />
              <input aria-label="UK vehicle registration" autoCapitalize="characters" autoComplete="off" className="min-w-0 flex-1 bg-transparent text-sm font-bold tracking-[0.06em] text-[#0d1b2e] outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400" maxLength={8} name="registrationNumber" onChange={(event) => setRegistration(event.currentTarget.value.toUpperCase())} placeholder="Enter your reg - e.g. AB12 CDE" spellCheck={false} type="text" value={registration} />
            </div>
            <button className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#078d4a] px-5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(7,141,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#05703d] disabled:cursor-wait disabled:opacity-60" disabled={loading} type="submit">
              <span>{loading ? "Checking Registration..." : "Get Free Engine Quotes"}</span>
              <ArrowIcon />
            </button>
          </form>
          {error ? <p className="mt-3 text-sm font-semibold text-red-600" role="alert">{error}</p> : null}

          <p className="mt-4 flex items-center justify-center gap-2 text-xs leading-5 text-[#0a2952] sm:text-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Your details are secure. No spam - genuine quotes from vetted UK engine specialists only.</span>
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 pt-4 text-center">
            {statItems.map((item) => (
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-1.5" key={item.label}>
                <Image alt={item.alt} className="h-7 w-7 object-contain" height={32} src={item.src} width={32} />
                <span className="min-w-0">
                  <strong className="block text-sm leading-none text-[#0d1b2e] sm:text-base">{item.value}</strong>
                  <small className="mt-1 block text-[10px] leading-tight text-slate-500">{item.label}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-3 pb-3 pt-5 sm:px-6 sm:pb-5" id="price-cta-manual">
          <form className="space-y-3" onSubmit={submitManual} aria-label="Search manually">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1.5 text-left text-xs font-bold text-[#0d1b2e]" htmlFor="price-cta-make">Make
                <select className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-[#0d1b2e] outline-none focus:border-[#15803d] focus:ring-2 focus:ring-emerald-100" id="price-cta-make" name="make" onChange={(event) => { setMake(event.currentTarget.value); setModel(""); }} value={make}>
                  <option value="">Select Make</option>
                  {makeOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
              </label>
              <label className="grid gap-1.5 text-left text-xs font-bold text-[#0d1b2e]" htmlFor="price-cta-model">Model
                <select className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-[#0d1b2e] outline-none focus:border-[#15803d] focus:ring-2 focus:ring-emerald-100" id="price-cta-model" name="model" onChange={(event) => setModel(event.currentTarget.value)} value={model}>
                  <option value="">Select a model</option>
                  {modelOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
              </label>
              <label className="grid gap-1.5 text-left text-xs font-bold text-[#0d1b2e]" htmlFor="price-cta-year">Year
                <select className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal text-[#0d1b2e] outline-none focus:border-[#15803d] focus:ring-2 focus:ring-emerald-100" id="price-cta-year" name="year" onChange={(event) => setYear(event.currentTarget.value)} value={year}>
                  <option value="">Select Model First</option>
                  {yearOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
              </label>
              <label className="grid gap-1.5 text-left text-xs font-bold text-[#0d1b2e]" htmlFor="price-cta-engine-code">Engine Code
                <input className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-normal uppercase text-[#0d1b2e] outline-none placeholder:normal-case placeholder:text-slate-400 focus:border-[#15803d] focus:ring-2 focus:ring-emerald-100" id="price-cta-engine-code" name="engineCode" onChange={(event) => setEngineCode(event.currentTarget.value.toUpperCase())} placeholder="Enter engine code" spellCheck={false} type="text" value={engineCode} />
              </label>
            </div>
            <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#078d4a] px-5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(7,141,74,0.28)] transition hover:-translate-y-0.5 hover:bg-[#05703d]" type="submit">
              <span>Get Free Engine Quotes</span>
              <ArrowIcon />
            </button>
          </form>
          {error ? <p className="mt-3 text-sm font-semibold text-red-600" role="alert">{error}</p> : null}
        </div>
      )}
    </aside>
  );
}
