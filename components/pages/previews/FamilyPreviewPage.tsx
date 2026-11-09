import type { ReactNode } from "react";
import type { StaticPageShellRecord } from "@/lib/staticPagePreview";

export type FamilyPreviewMode = "comparison" | "risk" | "price" | "service" | "diagnostic" | "story" | "data" | "brand" | "document" | "hub" | "action" | "generic";
export type FamilyPreviewTheme = "generic" | "case-studies" | "compare" | "failures" | "prices" | "services" | "symptoms" | "insights" | "about" | "legal" | "hub" | "root";

const pageThemes: Record<FamilyPreviewTheme, { page: string; notice: string; shell: string }> = {
  generic: { page: "bg-[#f7fafc]", notice: "border-emerald-200 bg-emerald-50 text-[#0a2952]", shell: "border-slate-200 bg-white" },
  "case-studies": { page: "bg-orange-50/50", notice: "border-orange-200 bg-orange-50 text-[#0a2952]", shell: "border-orange-200 bg-white" },
  compare: { page: "bg-blue-50/50", notice: "border-blue-200 bg-blue-50 text-[#0a2952]", shell: "border-blue-200 bg-white" },
  failures: { page: "bg-rose-50/50", notice: "border-rose-200 bg-rose-50 text-[#0a2952]", shell: "border-rose-200 bg-white" },
  prices: { page: "bg-amber-50/50", notice: "border-amber-200 bg-amber-50 text-[#0a2952]", shell: "border-amber-200 bg-white" },
  services: { page: "bg-sky-50/50", notice: "border-sky-200 bg-sky-50 text-[#0a2952]", shell: "border-sky-200 bg-white" },
  symptoms: { page: "bg-violet-50/50", notice: "border-violet-200 bg-violet-50 text-[#0a2952]", shell: "border-violet-200 bg-white" },
  insights: { page: "bg-indigo-50/50", notice: "border-indigo-200 bg-indigo-50 text-[#0a2952]", shell: "border-indigo-200 bg-white" },
  about: { page: "bg-emerald-50/50", notice: "border-emerald-200 bg-emerald-50 text-[#0a2952]", shell: "border-emerald-200 bg-white" },
  legal: { page: "bg-slate-100", notice: "border-slate-300 bg-slate-50 text-slate-950", shell: "border-slate-300 bg-white" },
  hub: { page: "bg-teal-50/50", notice: "border-teal-200 bg-teal-50 text-[#0a2952]", shell: "border-teal-200 bg-white" },
  root: { page: "bg-blue-50/50", notice: "border-blue-200 bg-blue-50 text-[#0a2952]", shell: "border-blue-200 bg-white" },
};

export default function FamilyPreviewPage({ page, themeName, mode, hero, body }: { page: StaticPageShellRecord; themeName: FamilyPreviewTheme; mode: FamilyPreviewMode; hero: ReactNode; body: ReactNode }) {
  const theme = pageThemes[themeName];
  const polishedFamily = themeName === "about" || themeName === "legal";

  if (polishedFamily) {
    return (
      <div data-preview-family={themeName} data-preview-mode={mode} className={`min-h-screen ${themeName === "about" ? "bg-[#f4f6fb]" : "bg-[linear-gradient(180deg,#eef4f9_0%,#f5f9fc_45%,#edf4f9_100%)]"}`}>
        {hero}
        <div className={`mx-auto px-4 sm:px-6 ${themeName === "about" ? "max-w-[1120px] lg:px-6" : "max-w-[1040px] lg:px-0"}`}>
          {body}
        </div>
      </div>
    );
  }

  return <div data-preview-family={themeName} data-preview-mode={mode} className={`min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${theme.page}`}>
    <div className="mx-auto max-w-[1280px]">
      {page.structuredData.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.structuredData) }} /> : null}
      <article>
        {hero}
        {body}
      </article>
    </div>
  </div>;
}
