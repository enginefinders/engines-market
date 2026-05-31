"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type QuoteTriggerDetail = {
  regNumber?: string;
  engineCode?: string;
  context?: string;
  searchMode?: "registration" | "manual";
  make?: string;
  model?: string;
  year?: string;
  source?: string;
};

type SearchParamsLike = {
  get(name: string): string | null;
};

type QuoteFormState = {
  regNumber: string;
  engineCode: string;
  selectedContext: string;
  make: string;
  model: string;
  year: string;
  searchMode: "registration" | "manual";
  source: string;
  fullName: string;
  email: string;
  phone: string;
  postcode: string;
  engineType: string;
  fitting: string;
  notes: string;
};

type Props = {
  brandName: string;
};

const defaultFormState: QuoteFormState = {
  regNumber: "",
  engineCode: "",
  selectedContext: "",
  make: "",
  model: "",
  year: "",
  searchMode: "registration",
  source: "",
  fullName: "",
  email: "",
  phone: "",
  postcode: "",
  engineType: "Rebuilt",
  fitting: "Supply & fit",
  notes: "",
};

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6 8h9a2 2 0 0 1 2 2v5H7a3 3 0 0 1-3-3V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17 10h2l1 2v3h-3" stroke="currentColor" strokeWidth="2" />
      <path d="M8 6V4M13 6V4M9 15v3m5-3v3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FlashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function QuoteSuccessIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="24" fill="#dcfce7" />
      <path d="m22 33 7 7 14-16" stroke="#15803d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function buildInitialState(detail: QuoteTriggerDetail) {
  const make = detail.make ?? "";
  const model = detail.model ?? "";
  const year = detail.year ?? "";
  const selectedContext =
    detail.context ??
    [make, model, year].filter(Boolean).join(" ").trim();

  return {
    ...defaultFormState,
    regNumber: detail.regNumber ?? "",
    engineCode: detail.engineCode ?? "",
    selectedContext,
    make,
    model,
    year,
    searchMode: detail.searchMode ?? (detail.regNumber ? "registration" : "manual"),
    source: detail.source ?? "",
    notes: selectedContext ? `Context: ${selectedContext}` : "",
  };
}

function getQueryTriggerDetail(searchParams: SearchParamsLike): QuoteTriggerDetail {
  if (searchParams.get("quote") !== "open") {
    return {};
  }

  return {
    regNumber: searchParams.get("reg") ?? undefined,
    engineCode: searchParams.get("engineCode") ?? undefined,
    context: searchParams.get("context") ?? undefined,
    source: "query-string",
  };
}

export default function QuoteCheckoutModal({ brandName }: Props) {
  const searchParams = useSearchParams();
  const queryTrigger = useMemo(() => getQueryTriggerDetail(searchParams), [searchParams]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formState, setFormState] = useState<QuoteFormState>(defaultFormState);

  useEffect(() => {
    function openQuote(detail: QuoteTriggerDetail = {}) {
      setFormState(buildInitialState(detail));
      setIsSubmitted(false);
      setSubmitError("");
      setIsOpen(true);
    }

    function onCustomOpen(event: Event) {
      const customEvent = event as CustomEvent<QuoteTriggerDetail>;
      openQuote(customEvent.detail ?? {});
    }

    function onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('a[href="#quote-form"], [data-quote-trigger="true"]') as HTMLElement | null;

      if (!trigger) {
        return;
      }

      event.preventDefault();

      openQuote({
        regNumber: trigger.dataset.quoteReg,
        engineCode: trigger.dataset.quoteEngineCode,
        context: trigger.dataset.quoteContext ?? trigger.textContent?.trim(),
        source: trigger.dataset.quoteSource ?? "cta-link",
      });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (window.location.search.includes("quote=open")) {
          window.history.replaceState({}, "", window.location.pathname);
        }
        setIsOpen(false);
      }
    }

    window.addEventListener("engine-market:open-quote", onCustomOpen as EventListener);
    document.addEventListener("click", onDocumentClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("engine-market:open-quote", onCustomOpen as EventListener);
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeFormState = !isOpen && queryTrigger.source ? buildInitialState(queryTrigger) : formState;
  const isVisible = isOpen || Boolean(queryTrigger.source);

  const activeReference = useMemo(() => {
    if (activeFormState.regNumber.trim()) {
      return {
        label: "Registration",
        value: activeFormState.regNumber.trim(),
      };
    }

    if (activeFormState.engineCode.trim()) {
      return {
        label: "Engine code",
        value: activeFormState.engineCode.trim(),
      };
    }

    if (activeFormState.selectedContext.trim()) {
      return {
        label: "Selected request",
        value: activeFormState.selectedContext.trim(),
      };
    }

    return {
      label: "Quote request",
      value: `${brandName} replacement enquiry`,
    };
  }, [activeFormState.engineCode, activeFormState.regNumber, activeFormState.selectedContext, brandName]);

  if (!isVisible) {
    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const formData = new FormData();
    const resolvedBrand = activeFormState.make.trim() || brandName;
    const resolvedModel = activeFormState.model.trim() || activeFormState.selectedContext.trim();
    const descriptionLines = [
      activeFormState.notes.trim(),
      activeFormState.source ? `Source: ${activeFormState.source}` : "",
      typeof window !== "undefined" ? `Page URL: ${window.location.href}` : "",
      activeFormState.searchMode ? `Search mode: ${activeFormState.searchMode}` : "",
    ].filter(Boolean);

    formData.set("name", activeFormState.fullName.trim());
    formData.set("email", activeFormState.email.trim());
    formData.set("number", activeFormState.phone.trim());
    formData.set("postcode", activeFormState.postcode.trim());
    formData.set("vehicle_model", resolvedModel);
    formData.set("vehicle_reg", activeFormState.year.trim());
    formData.set("vehicle_series", activeFormState.selectedContext.trim());
    formData.set("engine_code", activeFormState.engineCode.trim());
    formData.set("vehicle_part", "engine");
    formData.set("vehicle_vrm", activeFormState.regNumber.trim());
    formData.set("vehicle_brand", resolvedBrand);
    formData.set("vehicle_title", `${brandName} engine enquiry`);
    formData.set("engin_capacity", "");
    formData.set("fuelType", "");
    formData.set("description", descriptionLines.join("\n"));
    formData.set("source", activeFormState.source || "engine-market-quote-modal");

    if (activeFormState.fitting === "Supply & fit" || activeFormState.fitting === "Open to both") {
      formData.set("part_supplied", "on");
    }
    if (activeFormState.fitting === "Supply only" || activeFormState.fitting === "Open to both") {
      formData.set("supply_only", "on");
    }

    if (activeFormState.engineType === "Used") {
      formData.set("used_condition", "on");
    } else if (activeFormState.engineType === "New") {
      formData.set("new_condition", "on");
    } else {
      formData.set("reconditioned_condition", "on");
    }

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#071936]/65 px-3 py-4 backdrop-blur-sm sm:px-6">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={() => {
          if (window.location.search.includes("quote=open")) {
            window.history.replaceState({}, "", window.location.pathname);
          }
          setIsOpen(false);
        }}
      />

      <div className="relative z-[1] max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(7,25,54,0.28)]">
        <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[1.12fr_0.88fr]">
          <div className="bg-white px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-label text-green-700">Secure Quote Checkout</p>
                <h2 className="mt-2 text-[1.8rem] font-black leading-[1.04] text-[#071936]">
                  Complete your {brandName} engine enquiry
                </h2>
                <p className="mt-3 max-w-2xl text-[0.9rem] leading-6 text-slate-600">
                  We use your details to match the exact engine, shortlist trusted UK specialists, and send back the
                  strongest quotes without the dealership markup.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.location.search.includes("quote=open")) {
                    window.history.replaceState({}, "", window.location.pathname);
                  }
                  setIsOpen(false);
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Close quote checkout"
              >
                <CloseIcon />
              </button>
            </div>

            {isSubmitted ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center px-2 py-6 text-center">
                <QuoteSuccessIcon />
                <h3 className="mt-5 text-[1.5rem] font-black text-[#071936]">Your quote request is ready</h3>
                <p className="mt-3 max-w-xl text-[0.92rem] leading-6 text-slate-600">
                  We have captured your enquiry for <span className="font-bold text-slate-900">{activeReference.value}</span>.
                  A specialist shortlist will be matched against your details so you can compare warranty, delivery,
                  and supply-and-fit options with confidence.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="summary-badge">{activeReference.label}</span>
                  <span className="summary-badge">{activeReference.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.location.search.includes("quote=open")) {
                      window.history.replaceState({}, "", window.location.pathname);
                    }
                    setIsOpen(false);
                  }}
                  className="button-primary mt-7"
                >
                  Return to page
                </button>
              </div>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={handleSubmit}
              >
                {activeFormState.selectedContext && (
                  <div className="rounded-[22px] border border-blue-100 bg-blue-50 px-4 py-3.5">
                    <p className="text-label text-blue-700">Selected enquiry</p>
                    <p className="mt-1 text-sm font-bold text-[#071936]">{activeFormState.selectedContext}</p>
                  </div>
                )}

                <div className="grid gap-4 rounded-[22px] border border-slate-200 bg-slate-50/80 p-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Registration number</span>
                    <input
                      type="text"
                      value={activeFormState.regNumber}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({
                          ...current,
                          regNumber: event.target.value.toUpperCase(),
                        }));
                      }}
                      placeholder="AB12 CDE"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Engine code</span>
                    <input
                      type="text"
                      value={activeFormState.engineCode}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({
                          ...current,
                          engineCode: event.target.value.toUpperCase(),
                        }));
                      }}
                      placeholder="204DTD / AJ200D"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Full name</span>
                    <input
                      type="text"
                      required
                      value={activeFormState.fullName}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({ ...current, fullName: event.target.value }));
                      }}
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Email address</span>
                    <input
                      type="email"
                      required
                      value={activeFormState.email}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({ ...current, email: event.target.value }));
                      }}
                      placeholder="name@email.com"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Phone number</span>
                    <input
                      type="tel"
                      required
                      value={activeFormState.phone}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({ ...current, phone: event.target.value }));
                      }}
                      placeholder="07..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Postcode</span>
                    <input
                      type="text"
                      required
                      value={activeFormState.postcode}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({
                          ...current,
                          postcode: event.target.value.toUpperCase(),
                        }));
                      }}
                      placeholder="SW1A 1AA"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-400"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Preferred engine type</span>
                    <select
                      value={activeFormState.engineType}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({ ...current, engineType: event.target.value }));
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-green-400"
                    >
                      <option>Rebuilt</option>
                      <option>Reconditioned</option>
                      <option>Used</option>
                      <option>Remanufactured</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-label text-slate-700">Fitting option</span>
                    <select
                      value={activeFormState.fitting}
                      onChange={(event) => {
                        setIsOpen(true);
                        setFormState((current) => ({ ...current, fitting: event.target.value }));
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-green-400"
                    >
                      <option>Supply & fit</option>
                      <option>Supply only</option>
                      <option>Open to both</option>
                    </select>
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="text-label text-slate-700">Additional details</span>
                  <textarea
                    rows={4}
                    value={activeFormState.notes}
                    onChange={(event) => {
                      setIsOpen(true);
                      setFormState((current) => ({ ...current, notes: event.target.value }));
                    }}
                    placeholder="Tell us about the issue, preferred turnaround, or any known engine symptoms."
                    className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-400"
                  />
                </label>

                <div className="flex flex-col gap-3 rounded-[22px] border border-green-100 bg-green-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-green-700">
                      <LockIcon />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#071936]">No payment required</p>
                      <p className="text-small mt-1 text-slate-700">
                        Your details are secure and only used to source genuine {brandName} engine quotes from trusted UK specialists.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary min-w-[220px] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending enquiry..." : "Secure My Quotes"}
                  </button>
                </div>

                {submitError ? (
                  <p className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                ) : null}
              </form>
            )}
          </div>

          <aside className="bg-[#071936] px-5 py-5 text-white sm:px-7 sm:py-6">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-4">
              <p className="text-label text-green-300">Quote summary</p>
              <h3 className="mt-2 text-[1.36rem] font-black leading-[1.05] !text-white">
                Real checkout feel, but built for engine comparison
              </h3>
              <p className="mt-3 text-[0.9rem] leading-6 text-slate-200">
                We keep the process structured like a premium checkout so owners can submit the right details quickly,
                while our supplier network handles the actual matching behind the scenes.
              </p>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5">
                  <p className="text-label text-green-300">{activeReference.label}</p>
                  <p className="mt-1 text-[1rem] font-black text-white">{activeReference.value}</p>
                </div>

                {activeFormState.selectedContext && activeReference.label !== "Selected request" && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5">
                    <p className="text-label text-green-300">Selected enquiry</p>
                    <p className="mt-1 text-[1rem] font-black text-white">{activeFormState.selectedContext}</p>
                  </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5">
                  <p className="text-label text-green-300">Engine type</p>
                  <p className="mt-1 text-[1rem] font-black text-white">{activeFormState.engineType}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5">
                  <p className="text-label text-green-300">Fitting</p>
                  <p className="mt-1 text-[1rem] font-black text-white">{activeFormState.fitting}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-[#0d2444] p-4">
              <p className="text-label text-green-300">What happens next</p>
              <div className="mt-4 space-y-3">
                {[
                  {
                    icon: EngineIcon,
                    title: "Exact engine match",
                    text: `We verify the right ${brandName} engine against your registration or engine code.`,
                  },
                  {
                    icon: ShieldIcon,
                    title: "Trusted specialist shortlist",
                    text: "Only vetted UK suppliers with warranty-backed rebuilt and reconditioned options are matched.",
                  },
                  {
                    icon: FlashIcon,
                    title: "Fast quote turnaround",
                    text: "Most buyers receive multiple quote options quickly, with supply-only and supply-and-fit pricing.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-green-300">
                      <item.icon />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-small mt-1 text-slate-200">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-green-500/20 bg-green-500/10 px-4 py-4">
              <div className="flex items-center gap-2 text-green-300">
                <LockIcon />
                <p className="text-label">Trust signals</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.68rem] font-bold text-slate-100">
                  12-month warranty minimum
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.68rem] font-bold text-slate-100">
                  Nationwide delivery
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.68rem] font-bold text-slate-100">
                  Supply & fit available
                </span>
              </div>
              <a href="tel:03330000044" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                Need help right now? Call 0333 000 0044
                <ArrowIcon />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
