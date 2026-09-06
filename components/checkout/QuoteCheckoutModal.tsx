"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuoteForm, { type QuoteFormSeed } from "@/components/checkout/QuoteForm";

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

type Props = {
  brandName: string;
  modelName?: string;
  engineCode?: string;
};

function querySeed(
  searchParams: ReturnType<typeof useSearchParams>,
  brandName: string,
  modelName?: string,
  engineCode?: string,
): QuoteFormSeed | null {
  if (searchParams.get("quote") !== "open") return null;

  return {
    registrationNumber: searchParams.get("reg") || searchParams.get("registrationNumber") || "",
    make: searchParams.get("make") || (brandName === "replacement" ? "" : brandName),
    model: searchParams.get("model") || modelName || "",
    year: searchParams.get("year") || "",
    engineCode: searchParams.get("engineCode") || engineCode || "",
    remarks: searchParams.get("context") ? `Context: ${searchParams.get("context")}` : "",
    sourceLabel: "query-string",
    searchMode: searchParams.get("reg") ? "registration" : "manual",
  };
}

export default function QuoteCheckoutModal({ brandName, modelName, engineCode }: Props) {
  const searchParams = useSearchParams();
  const [seed, setSeed] = useState<QuoteFormSeed | null>(() =>
    querySeed(searchParams, brandName, modelName, engineCode),
  );

  useEffect(() => {
    function openQuote(detail: QuoteTriggerDetail = {}) {
      const context = detail.context?.trim() || "";
      setSeed({
        registrationNumber: detail.regNumber || "",
        engineCode: detail.engineCode || engineCode || "",
        make: detail.make || (brandName === "replacement" ? "" : brandName),
        model: detail.model || modelName || "",
        year: detail.year || "",
        remarks: context ? `Context: ${context}` : "",
        sourceLabel: detail.source || "quote-popup",
        sourcePage: window.location.href,
        searchMode: detail.searchMode || (detail.regNumber ? "registration" : "manual"),
      });
    }

    function onCustomOpen(event: Event) {
      openQuote((event as CustomEvent<QuoteTriggerDetail>).detail || {});
    }

    function onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('a[href="#quote-form"], [data-quote-trigger="true"]') as HTMLElement | null;
      if (!trigger) return;

      event.preventDefault();
      let scope: HTMLElement | null = trigger.parentElement;
      let registrationInput: HTMLInputElement | null = null;
      for (let depth = 0; scope && depth < 8; depth += 1) {
        registrationInput = scope.querySelector(
          'input[aria-label*="registration" i], input[name="reg"], input[name="registration"], input[placeholder*="registration" i], input[placeholder*="reg" i]',
        );
        if (registrationInput) break;
        scope = scope.parentElement;
      }

      openQuote({
        regNumber: trigger.dataset.quoteReg || registrationInput?.value.trim(),
        engineCode: trigger.dataset.quoteEngineCode,
        context: trigger.dataset.quoteContext || trigger.textContent?.trim(),
        source: trigger.dataset.quoteSource || "cta-link",
      });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSeed(null);
    }

    window.addEventListener("engine-market:open-quote", onCustomOpen as EventListener);
    document.addEventListener("click", onDocumentClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("engine-market:open-quote", onCustomOpen as EventListener);
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [brandName, engineCode, modelName]);

  useEffect(() => {
    document.body.style.overflow = seed ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [seed]);

  if (!seed) return null;

  function closeModal() {
    if (window.location.search.includes("quote=open")) {
      window.history.replaceState({}, "", window.location.pathname);
    }
    setSeed(null);
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#071936]/70 px-3 py-5 backdrop-blur-sm sm:px-6">
      <button type="button" aria-label="Close quote form" className="fixed inset-0 cursor-default" onClick={closeModal} />
      <div className="relative mx-auto w-full max-w-[520px]">
        <QuoteForm key={JSON.stringify(seed)} initialData={seed} onClose={closeModal} />
      </div>
    </div>
  );
}
