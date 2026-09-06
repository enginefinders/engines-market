"use client";

import { useSearchParams } from "next/navigation";
import QuoteForm, { type QuoteFormSeed } from "@/components/checkout/QuoteForm";

export default function FormPage() {
  const searchParams = useSearchParams();
  const engineCode = searchParams.get("engineCode") || "";
  const initialData: QuoteFormSeed = {
    registrationNumber: searchParams.get("registrationNumber") || searchParams.get("registration") || searchParams.get("reg") || "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    year: searchParams.get("year") || "",
    fuelType: searchParams.get("fuelType") || "",
    engineCapacity: searchParams.get("engineCapacity") || "",
    engineCode,
    color: searchParams.get("color") || searchParams.get("colour") || "",
    wheelplan: searchParams.get("wheelplan") || "",
    remarks: searchParams.get("remarks") || searchParams.get("problem") || "",
    sourceLabel: searchParams.get("sourceLabel") || "checkout-page",
    sourcePage: searchParams.get("sourcePage") || "",
    searchMode: searchParams.get("searchMode") === "manual" ? "manual" : "registration",
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-3 py-7 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[520px]">
        <QuoteForm initialData={initialData} />
      </div>
    </div>
  );
}
