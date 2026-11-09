"use client";

import type { FormEvent } from "react";
import type { StaticForm } from "@/lib/staticPagePreview";

const FIELD_LABELS: Record<string, string> = {
  fullname: "Full name",
  email: "Email address",
  "order-ref": "Order reference (if you have one — optional)",
  category: "Complaint category",
  details: "Complaint details",
  "file-upload": "Upload supporting documents (optional — e.g., screenshots, emails)",
};

const COMPLAINT_CATEGORIES = [
  ["technical", "Technical / website issue"],
  ["data", "Data protection concern"],
  ["customer-service", "Customer service"],
  ["supplier", "Supplier complaint (for monitoring)"],
  ["other", "Other"],
] as const;

function fieldLabel(name: string, placeholder: string, index: number) {
  return FIELD_LABELS[name] || placeholder || `Field ${index + 1}`;
}

export default function LegalFormSection({ form }: { form: StaticForm }) {
  const fields = form.fields.filter((field) => ["input", "select", "textarea"].includes(field.element));
  const isComplaintForm = !form.action;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isComplaintForm) return;
    event.preventDefault();
    window.alert("Thank you for your complaint. We will acknowledge receipt within 48 hours.");
  };

  return (
    <form action={form.action || undefined} method={form.method === "post" ? "post" : "get"} onSubmit={handleSubmit} className="my-6 rounded-xl border border-[#cfe1d5] bg-[#f7fcf8] p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field, index) => {
          const id = `legal-${field.name || index}`;
          const label = fieldLabel(field.name, field.placeholder, index);
          const isWide = field.element === "textarea" || field.element === "select" || field.type === "file" || field.name === "order-ref";
          const fieldClass = "mt-1.5 w-full rounded-lg border border-[#c9d9e6] bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#14803d] focus:ring-4 focus:ring-[#14803d]/10";

          return (
            <label className={`block text-sm font-extrabold text-[#0a2952] ${isWide ? "sm:col-span-2" : ""}`} htmlFor={id} key={`${field.name}-${index}`}>
              {label}{field.required ? <span className="ml-1 text-[#14803d]" aria-hidden="true">*</span> : null}
              {field.element === "textarea" ? (
                <>
                  <textarea className={`${fieldClass} min-h-32 resize-y`} id={id} name={field.name || `field-${index + 1}`} placeholder={field.placeholder} maxLength={field.name === "details" ? 1200 : undefined} required={field.required} />
                  {field.name === "details" ? <span className="mt-1 block text-xs font-medium text-slate-500">Max 1200 characters</span> : null}
                </>
              ) : field.element === "select" ? (
                <select className={fieldClass} defaultValue="" id={id} name={field.name || `field-${index + 1}`} required={field.required}>
                  <option value="">— Please select —</option>
                  {field.name === "category" ? COMPLAINT_CATEGORIES.map(([value, text]) => <option value={value} key={value}>{text}</option>) : null}
                </select>
              ) : (
                <input className={fieldClass} id={id} name={field.name || `field-${index + 1}`} type={field.type || "text"} placeholder={field.placeholder} required={field.required} accept={field.type === "file" ? ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx" : undefined} multiple={field.type === "file"} />
              )}
            </label>
          );
        })}
      </div>
      <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#14803d] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#116533] focus:outline-none focus:ring-4 focus:ring-[#14803d]/20" type="submit">
        {isComplaintForm ? "Submit Complaint" : "Submit form"}
        <span aria-hidden="true" className="ml-2">→</span>
      </button>
    </form>
  );
}

