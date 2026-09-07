"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

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
  "h-11 w-full rounded-[5px] border border-slate-300 bg-white px-3 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#268b3b] focus:ring-1 focus:ring-[#268b3b]";

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
  const vehicleDetails = [
    { label: "Registration Number", value: formData.registrationNumber },
    { label: "Fuel Type", value: formData.fuelType },
    { label: "Engine Size", value: formatCapacity(formData.engineCapacity) },
    { label: "Colour", value: formData.color },
    { label: "Wheelplan", value: formData.wheelplan, wide: true },
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

      {isVehicleLocked && vehicleTitle ? (
        <div className="flex min-h-28 items-center gap-4 border-b border-slate-200 bg-white px-6 py-4">
          {vehicleImage ? (
            <Image
              src={vehicleImage}
              alt={vehicleTitle}
              width={190}
              height={112}
              className="h-[78px] w-[132px] shrink-0 object-contain sm:h-[92px] sm:w-[160px]"
            />
          ) : (
            <div className="flex h-[78px] w-[132px] shrink-0 items-center justify-center rounded bg-slate-100 text-xs text-slate-400 sm:h-[92px] sm:w-[160px]">Vehicle</div>
          )}
          <p className="min-w-0 text-[16px] font-medium leading-6 text-slate-800 sm:text-[18px]">{vehicleTitle}</p>
        </div>
      ) : null}

      <div className="relative border-b border-slate-200 px-6 py-5 text-center">
        <h1 className="!text-[18px] font-extrabold !leading-tight text-slate-900">{title}</h1>
      </div>

      <section>
        <h2 className="border-b border-slate-200 px-6 py-4 !text-[14px] !leading-tight font-bold text-slate-800">Car Details</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 py-4">
          {vehicleLookupError ? <p className="col-span-2 text-[12px] font-medium text-red-600">{vehicleLookupError}</p> : null}
          {vehicleDetails.map((detail) => (
            <VehicleDetail key={detail.label} {...detail} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200">
        <h2 className="border-b border-slate-200 px-6 py-4 !text-[14px] !leading-tight font-bold text-slate-800">Customer Details</h2>
        <div className="space-y-4 px-6 py-5">
          <EditableField label="Full Name" name="fullName" value={formData.fullName} placeholder="Enter Your Name" required onChange={updateField} />
          <EditableField label="Phone" name="phone" value={formData.phone} placeholder="Phone/Mobile Number" type="tel" required onChange={updateField} />
          <EditableField label="Email" name="email" value={formData.email} placeholder="Your email address" type="email" required onChange={updateField} />
          <EditableField label="Postcode" name="postcode" value={formData.postcode} placeholder="Enter Postcode" required onChange={updateField} />

          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-[12px] font-semibold text-slate-800">Engine option</span>
              <select className={fieldClass} value={formData.engineType} onChange={(event) => updateField("engineType", event.currentTarget.value)}>
                <option>Reconditioned</option>
                <option>Rebuilt</option>
                <option>Used</option>
                <option>Remanufactured</option>
                <option>New</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-[12px] font-semibold text-slate-800">Fitting option</span>
              <select className={fieldClass} value={formData.fitting} onChange={(event) => updateField("fitting", event.currentTarget.value)}>
                <option>Supply &amp; fit</option>
                <option>Supply only</option>
                <option>Open to both</option>
              </select>
            </label>
          </div>

          <label>
            <span className="mb-1.5 block text-[12px] font-semibold text-slate-800">Any remarks</span>
            <textarea
              rows={4}
              value={formData.remarks}
              onChange={(event) => updateField("remarks", event.currentTarget.value)}
              placeholder="Enter any additional information..."
              className={`${fieldClass} h-24 resize-y py-3`}
            />
          </label>

          {submitError ? <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">{submitError}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting || (!isVehicleLocked && !formData.engineCode)}
            className="h-[54px] w-full rounded-[6px] bg-[#268b3b] text-[15px] font-extrabold uppercase text-white shadow-sm transition hover:bg-[#1f7431] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "SENDING..." : "SEND ME PRICE QUOTE"}
          </button>
        </div>
      </section>
    </form>
  );
}

function VehicleDetail({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`min-w-0 border-b border-slate-100 pb-2 ${wide ? "col-span-2" : ""}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-slate-500">{label}</p>
      <p className="mt-0.5 truncate text-[13px] font-semibold text-slate-800">{value || "—"}</p>
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
      <span className="mb-1.5 block text-[12px] font-semibold text-slate-800">
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
