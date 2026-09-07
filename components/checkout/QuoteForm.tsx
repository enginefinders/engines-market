"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FaCar, FaGasPump, FaPalette, FaUser } from "react-icons/fa";

export type QuoteFormSeed = {
  registrationNumber?: string;
  make?: string;
  model?: string;
  year?: string;
  fuelType?: string;
  engineCapacity?: string;
  engineCode?: string;
  color?: string;
  wheelplan?: string;
  remarks?: string;
  sourceLabel?: string;
  sourcePage?: string;
  searchMode?: "registration" | "manual";
};

type Props = {
  initialData?: QuoteFormSeed;
  onClose?: () => void;
  title?: string;
};

type VehicleRegistrationData = {
  registrationNumber: string;
  year: string;
  make: string;
  model: string;
  fuelType: string;
  engineCapacity: string;
  color: string;
  wheelplan: string;
};

const fieldClass =
  "h-14 w-full rounded-[7px] border border-slate-300 bg-white px-5 text-[16px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#168b4c] focus:ring-1 focus:ring-[#168b4c]";

function initialState(seed: QuoteFormSeed = {}) {
  return {
    registrationNumber: seed.registrationNumber || "",
    make: seed.make || "",
    model: seed.model || "",
    year: seed.year || "",
    fuelType: seed.fuelType || "",
    engineCapacity: seed.engineCapacity || "",
    engineCode: seed.engineCode || "",
    color: seed.color || "",
    wheelplan: seed.wheelplan || "",
    fullName: "",
    phone: "",
    email: "",
    postcode: "",
    remarks: seed.remarks || "",
    engineType: "Reconditioned",
    fitting: "Supply & fit",
  };
}

function formatCapacity(value: string) {
  const rawValue = value.trim();
  if (!rawValue) return "";

  const numericValue = Number(rawValue.replace(/,/g, "").match(/\d+(?:\.\d+)?/)?.[0]);
  if (!Number.isFinite(numericValue)) return rawValue;

  if (/(?:litre|liter|\bl\b|l$)/i.test(rawValue)) {
    return `${numericValue.toFixed(1)}L`;
  }

  if (numericValue >= 500) {
    return `${(Math.round(numericValue / 100) / 10).toFixed(1)}L`;
  }

  return rawValue;
}

export default function QuoteForm({ initialData = {}, onClose, title = "Confirm Details To Show Price" }: Props) {
  const [formData, setFormData] = useState(() => initialState(initialData));
  const [isVehicleLocked, setIsVehicleLocked] = useState(Boolean(initialData.make && initialData.model));
  const [vehicleLookupError, setVehicleLookupError] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialLookupStarted = useRef(false);

  useEffect(() => {
    if (!formData.make || !formData.model) return;

    const controller = new AbortController();
    const query = new URLSearchParams({ make: formData.make, model: formData.model, year: formData.year });
    fetch(`/api/vehicle-image?${query.toString()}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((payload: { image?: string | null }) => setVehicleImage(payload.image || ""))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setVehicleImage("");
      });

    return () => controller.abort();
  }, [formData.make, formData.model, formData.year]);

  useEffect(() => {
    if (
      initialLookupStarted.current ||
      !formData.registrationNumber.trim() ||
      formData.make.trim() ||
      formData.model.trim()
    ) {
      return;
    }

    initialLookupStarted.current = true;
    const controller = new AbortController();

    fetch(`/api/vehicle-registration?registrationNumber=${encodeURIComponent(formData.registrationNumber)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as { vehicle?: VehicleRegistrationData; error?: string };
        if (!response.ok || !payload.vehicle) {
          throw new Error(payload.error || "We could not load the selected vehicle.");
        }
        return payload.vehicle;
      })
      .then((vehicle) => {
        setFormData((current) => ({
          ...current,
          registrationNumber: vehicle.registrationNumber || current.registrationNumber,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          fuelType: vehicle.fuelType,
          engineCapacity: vehicle.engineCapacity,
          color: vehicle.color,
          wheelplan: vehicle.wheelplan,
        }));
        setIsVehicleLocked(true);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setVehicleLookupError(error instanceof Error ? error.message : "Vehicle lookup failed.");
        }
      });

    return () => controller.abort();
  }, [formData.make, formData.model, formData.registrationNumber]);

  function updateField(name: string, value: string) {
    setSubmitError("");
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          registrationNumber: formData.registrationNumber.trim(),
          source_label: initialData.sourceLabel || "checkout-page",
          source_page:
            initialData.sourcePage || (onClose ? window.location.href : document.referrer || window.location.href),
          search_mode: initialData.searchMode || (formData.registrationNumber ? "registration" : "manual"),
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Your quote could not be sent. Please try again.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Your quote could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full rounded-[7px] bg-white px-6 py-14 text-center shadow-[0_4px_22px_rgba(15,23,42,0.10)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-[#268b3b]">✓</div>
        <h2 className="mt-5 !text-xl !leading-tight font-extrabold text-slate-900">Your quote request has been sent</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
          We have received the details for {formData.registrationNumber || `${formData.make} ${formData.model}`} and will match the right engine specialists.
        </p>
        {onClose ? (
          <button type="button" onClick={onClose} className="mt-6 rounded-[5px] bg-[#268b3b] px-6 py-3 text-sm font-bold text-white">
            Return to page
          </button>
        ) : null}
      </div>
    );
  }

  const vehicleTitle = [formData.make, formData.model, formData.year].filter(Boolean).join(" - ");
  const hasSelectedVehicle = Boolean(vehicleTitle || formData.registrationNumber);
  const vehicleDetails = [
    { label: "Fuel Type", value: formData.fuelType, icon: <FaGasPump /> },
    { label: "Colour", value: formData.color, icon: <FaPalette /> },
    { label: "Engine Size", value: formatCapacity(formData.engineCapacity), icon: <FaCar /> },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-[7px] bg-white shadow-[0_4px_22px_rgba(15,23,42,0.10)]"
    >
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-2xl text-slate-400 shadow-sm hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close quote form"
        >
          ×
        </button>
      ) : null}

      {hasSelectedVehicle ? (
        <header className="grid items-center gap-5 border-b border-slate-200 px-5 py-6 sm:grid-cols-[minmax(210px,280px)_1fr] sm:px-7 sm:py-8">
          {vehicleImage ? (
            <Image
              src={vehicleImage}
              alt={vehicleTitle || "Selected vehicle"}
              width={320}
              height={190}
              className="mx-auto h-[130px] w-[210px] object-contain sm:h-[170px] sm:w-[280px]"
            />
          ) : (
            <div className="mx-auto flex h-[130px] w-[210px] items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-400 sm:h-[170px] sm:w-[280px]">Selected vehicle</div>
          )}
          <div className="min-w-0 text-center sm:text-left">
            {vehicleTitle ? <h1 className="!text-[22px] font-extrabold !leading-tight text-[#08295a] sm:!text-[30px]">{vehicleTitle}</h1> : null}
            {formData.registrationNumber ? (
              <div className="mt-4 inline-flex overflow-hidden rounded-md border border-[#c38a00] shadow-sm">
                <span className="flex w-9 flex-col items-center justify-center bg-[#0b3f88] py-1 text-[9px] font-bold leading-3 text-white"><span>GB</span><span>UK</span></span>
                <span className="bg-[#ffcb18] px-4 py-1.5 text-[22px] font-black tracking-[0.08em] text-slate-950 sm:text-[28px]">{formData.registrationNumber}</span>
              </div>
            ) : null}
          </div>
        </header>
      ) : null}

      {!hasSelectedVehicle ? <div className="border-b border-slate-200 px-6 py-5 text-center"><h1 className="!text-[22px] font-extrabold !leading-tight text-[#08295a]">{title}</h1></div> : null}

      <section>
        <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
          <h2 className="flex items-center gap-3 !text-[20px] font-extrabold !leading-tight text-[#08295a]"><FaCar className="text-[25px]" aria-hidden="true" />Vehicle Details</h2>
          {vehicleLookupError ? <p className="mt-3 text-sm font-medium text-red-600">{vehicleLookupError}</p> : null}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {vehicleDetails.map((detail) => (
              <VehicleDetailTile key={detail.label} {...detail} />
            ))}
          </div>
          {formData.wheelplan ? <p className="mt-3 text-sm text-slate-600"><span className="font-bold text-[#08295a]">Wheelplan:</span> {formData.wheelplan}</p> : null}
        </div>
      </section>

      <section>
        <div className="px-5 py-6 sm:px-7 sm:py-7">
          <h2 className="flex items-center gap-3 !text-[20px] font-extrabold !leading-tight text-[#08295a]"><FaUser className="text-[24px]" aria-hidden="true" />Required Details</h2>
          <div className="mt-6 space-y-4">
          <EditableField label="Full Name" name="fullName" value={formData.fullName} placeholder="Enter your full name" required onChange={updateField} />
          <EditableField label="Phone Number" name="phone" value={formData.phone} placeholder="Enter your phone number" type="tel" required onChange={updateField} />
          <EditableField label="Email Address" name="email" value={formData.email} placeholder="Enter your email address" type="email" required onChange={updateField} />
          <EditableField label="Postcode (Optional)" name="postcode" value={formData.postcode} placeholder="Enter your postcode" onChange={updateField} />

          {submitError ? <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">{submitError}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting || (!isVehicleLocked && !formData.engineCode)}
            className="mt-2 flex h-[64px] w-full items-center justify-center gap-4 rounded-xl bg-[#04964d] text-[20px] font-extrabold text-white shadow-[0_10px_22px_rgba(4,150,77,0.24)] transition hover:bg-[#057f43] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : <>Get Free Qoute <span className="text-[32px] leading-none">→</span></>}
          </button>
          </div>
        </div>
      </section>
    </form>
  );
}

function VehicleDetailTile({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-[#f7fbff] px-4 py-4">
      <p className="text-[15px] font-medium text-[#08295a]">{label}</p>
      <div className="mt-3 flex min-w-0 items-center gap-3 text-[#08295a]">
        <span className="shrink-0 text-[27px]" aria-hidden="true">{icon}</span>
        <p className="truncate text-[18px] font-semibold">{value || "—"}</p>
      </div>
    </div>
  );
}

function EditableField({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-[16px] font-semibold text-[#08295a]">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.currentTarget.value)}
        placeholder={placeholder}
        className={fieldClass}
        required={required}
      />
    </label>
  );
}
