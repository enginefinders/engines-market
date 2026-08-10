import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import DocumentFailureDesktopPanel from "@/components/pages/DocumentFailureDesktopPanel";
import EngineCodeHeroSection from "@/components/sections/EngineCodeHeroSection";
import FaqSection from "@/components/sections/FaqSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { EnginePageData } from "@/types/engine-page";

type DocumentEnginePageProps = {
  data: EnginePageData;
};

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  const headingSeparator = title.includes(" — ") ? " — " : title.includes(" - ") ? " - " : "";
  const headingParts = headingSeparator ? title.split(headingSeparator) : [title];
  const headingLead = headingSeparator ? headingParts.slice(0, -1).join(headingSeparator) : title;
  const headingAccent = headingSeparator ? headingParts[headingParts.length - 1] : "";

  return (
    <div className="max-w-[840px]">
      <div className="inline-flex items-center rounded-full bg-[#081f47] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(8,31,71,0.16)] sm:px-3.5 sm:text-[12px]">
        {tag}
      </div>
      <h2 className="mt-3 font-['Manrope'] text-[34px] font-extrabold tracking-[-0.04em] text-[#0b2347] sm:text-[42px]">
        {headingLead}
        {headingAccent ? (
          <>
            <span>{headingSeparator}</span>
            <span className="text-[#17803d]">{headingAccent}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}

function SpecsPanelIcon({ label }: { label: string }) {
  if (label === "Engine Code") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 10h14v7H5v-7Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10V7h8v3M8 17v2M16 17v2M5 13H3M21 13h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "Fuel") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M6 4h8v16H6V4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 7h3l2 2v5.5a1.5 1.5 0 0 0 3 0V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Configuration") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m19 12 1.8 1-1.2 2.1-2-.4a7.9 7.9 0 0 1-1.5 1.5l.4 2-2.1 1.2-1-1.8a7.4 7.4 0 0 1-2 0l-1 1.8-2.1-1.2.4-2a7.9 7.9 0 0 1-1.5-1.5l-2 .4L3.2 13 5 12a7.4 7.4 0 0 1 0-2l-1.8-1 1.2-2.1 2 .4A7.9 7.9 0 0 1 7.9 5.8l-.4-2L9.6 2.6l1 1.8a7.4 7.4 0 0 1 2 0l1-1.8 2.1 1.2-.4 2a7.9 7.9 0 0 1 1.5 1.5l2-.4L20.8 9 19 10a7.4 7.4 0 0 1 0 2Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (label === "Power Output(s)") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Years Produced") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (label === "UK Models Fitted") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 14.5 7.5 9h9L19 14.5V18h-2v-1H7v1H5v-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (label === "2025 UK Replacement Requests") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 18V6M5 18h14M9 14l2-2 2 1 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Replaced" || label === "Replaced By") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M7 7h10l-2.5-2.5M17 17H7l2.5 2.5M17 7l-2.5 2.5M7 17l2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Most Common Failure") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 4 21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v10M9 9.5c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 2-3 2-3 .9-3 2 1.3 2 3 2 3-.9 3-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SpecsDataRow({ label, value }: { label: string; value: string }) {
  const normalisedValue = value.replace(/Â£/g, "£");
  const valueTone =
    label === "Reconditioned Price Range"
      ? "font-extrabold text-[#0b2347]"
      : label === "2025 UK Replacement Requests"
        ? "font-extrabold text-[#0b2347]"
        : "font-semibold text-[#173660]";

  return (
    <div className="grid grid-cols-[144px_minmax(0,1fr)] border-t border-[#edf3f9] first:border-t-0 sm:grid-cols-[258px_minmax(0,1fr)]">
      <div className="flex items-center gap-2 border-r border-[#edf3f9] px-2.5 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5">
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] border border-[#dde6f2] bg-white text-[#0b2347] shadow-[0_4px_12px_rgba(15,23,42,0.03)] sm:h-9 sm:w-9">
          <SpecsPanelIcon label={label} />
        </div>
        <div className="text-[13px] font-bold leading-[1.14] text-[#0b2347] sm:text-[15px]">{label}</div>
      </div>
      <div className={`px-2.5 py-2 text-[13px] leading-[1.2] sm:px-3 sm:py-2.5 sm:text-[15px] sm:leading-[1.24] ${valueTone}`}>{normalisedValue}</div>
    </div>
  );
}

function CompatibilityMetaIcon({ kind }: { kind: "generation" | "badges" | "years" | "link" }) {
  if (kind === "generation") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 14.5 7.5 9h9L19 14.5V18h-2v-1H7v1H5v-3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "badges") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === "years") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M14 5h5v5M10 14l9-9M19 14v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V5h5M5 5l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17M3.5 14.5h17M12 3c2.6 2.4 4 5.5 4 9s-1.4 6.6-4 9M12 3c-2.6 2.4-4 5.5-4 9s1.4 6.6 4 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LockOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8.5a4 4 0 0 1 8 0V11" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function UkFlagInlineIcon() {
  return (
    <svg viewBox="0 0 22 14" className="h-[15px] w-[24px] rounded-[3px]" aria-hidden="true">
      <rect width="22" height="14" fill="#012169" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#fff" strokeWidth="3.5" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#C8102E" strokeWidth="2" />
      <path d="M11 0v14M0 7h22" stroke="#fff" strokeWidth="4.5" />
      <path d="M11 0v14M0 7h22" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function ChevronDownMiniIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightMiniIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceTableHeaderIcon({ kind }: { kind: "condition" | "supply" | "fitted" | "warranty" }) {
  if (kind === "condition") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M5 10h14v7H5v-7Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M8 10V7h8v3M8 17v2M16 17v2M5 13H3M21 13h-2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "supply") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M12 4c3.3 0 6 2 6 4.4 0 1.7-1.2 3.1-3 3.9V15a4 4 0 1 1-6 0v-2.7c-1.8-.8-3-2.2-3-3.9C6 6 8.7 4 12 4Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M12 8.4v7.1M9.7 10.8c0-.7 1-1.2 2.3-1.2s2.3.5 2.3 1.2-1 1.2-2.3 1.2-2.3.5-2.3 1.2 1 1.2 2.3 1.2 2.3-.5 2.3-1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "fitted") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M21 7.2 16.8 11 13 7.2l3.2-3.2a2.4 2.4 0 0 1 3.4 0l1.4 1.4a2.4 2.4 0 0 1 0 3.4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m14 10-8.5 8.5a2 2 0 1 1-2.8-2.8L11.2 7M7 7l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
      <path d="m8.7 12 2.2 2.2 4.6-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10.5V16M12 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TagOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M10 4H5v5l8.7 8.7a2 2 0 0 0 2.8 0l2.5-2.5a2 2 0 0 0 0-2.8L10 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="7.7" cy="7.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function VehicleValueIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
      <path d="M12 8v8M9.5 10.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1.1 1.7-2.5 1.7-2.5.7-2.5 1.7 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function FailureIssueIcon({ title, active = false }: { title: string; active?: boolean }) {
  const iconClass = active ? "h-6 w-6" : "h-5 w-5";

  if (/timing chain/i.test(title)) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M9 8a3 3 0 1 1-4.2 4.2L8 9m8 7a3 3 0 1 1 4.2-4.2L16 15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m10 14 4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (/swirl|coolant|leak/i.test(title)) {
    return (
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
        <path d="M12 4v8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M8 12.5c0-1.7 1.8-2.8 4-2.8s4 1.1 4 2.8V16a4 4 0 0 1-8 0v-3.5Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M4 17c1 .8 2.5 1.3 4 1.3s3-.5 4-1.3m4 0c1 .8 2.5 1.3 4 1.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={iconClass} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4 12h2.5M17.5 12H20M12 4v2.5M12 17.5V20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function DocumentLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 3v5h5M10 12h4M10 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronToggleIcon({ open = false }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AssetIcon({
  src,
  className = "h-6 w-6",
}: {
  src: string;
  className?: string;
}) {
  return <Image src={src} alt="" aria-hidden="true" width={40} height={40} className={`${className} object-contain`} />;
}

const modelImageMap: Record<string, string> = {
  "1 Series": "/images/brands/bmw/models/bmw-1-series-model-card.png",
  "2 Series": "/images/brands/bmw/models/bmw-2-series-model-card.png",
  "3 Series": "/images/brands/bmw/models/bmw-3-series-model-card.png",
  "4 Series": "/images/brands/bmw/models/bmw-4-series-model-card.png",
  "5 Series": "/images/brands/bmw/models/bmw-5-series-model-card.png",
  X1: "/images/brands/bmw/models/bmw-x1-model-card.png",
  X3: "/images/brands/bmw/models/bmw-x3-model-card.png",
};

const mobileModelCutoutMap: Record<string, string> = {
  "1 Series": "/images/brands/bmw/models/bmw-1-series-116d-removebg.png",
};

const genericMobileCarCutout = "/images/brands/bmw/models/bmw-m3-removebg.png";

const specsBackgroundImageMap: Record<string, { src: string; alt: string }> = {
  bmw: {
    src: "/images/brands/bmw/brand/bmw-live-market-bg.png",
    alt: "BMW background image for engine specifications",
  },
};

function extractFromPrice(value: string) {
  const match = value.match(/£\s?[\d,]+/);
  return match ? match[0].replace(/\s+/g, "") : value;
}

function normaliseCopy(value: string) {
  return value.replace(/Ã‚Â£/g, "£").replace(/Â£/g, "£");
}

function cleanCopy(value: string) {
  const pound = String.fromCharCode(163);
  return value.replace(/Ãƒâ€šÃ‚Â£|Ã‚Â£|Â£/g, pound);
}

function renderCopy(value: string) {
  return cleanCopy(normaliseCopy(value));
}

export default function DocumentEnginePage({ data }: DocumentEnginePageProps) {
  const commonFailure = data.sections.specs.specs.find((item) => item.label === "Most Common Failure")?.value;
  const heroPrices =
    data.sections.hero.prices.length > 0
      ? data.sections.hero.prices
      : data.sections.costGuide.rows.slice(0, 3).map((row) => ({
          label: `${row.condition} from`,
          price: extractFromPrice(row.supplyOnly),
          tone:
            row.condition.toLowerCase() === "reconditioned"
              ? ("reconditioned" as const)
              : row.condition.toLowerCase() === "rebuilt"
                ? ("rebuilt" as const)
                : ("used" as const),
        }));
  const heroData = {
    ...data.sections.hero,
    prices: heroPrices,
  };
  const faqData = {
    tag: data.sections.faq.tag,
    h2: data.sections.faq.title,
    intro: `Straight answers on ${data.engine.code} pricing, fitment, timing chain risk and the best replacement option for your BMW.`,
    defaultOpenIndex: 0,
    items: data.sections.faq.items.map((item) => ({
      question: item.question,
      answer: renderCopy(item.answer),
      keyPoints: item.bullets?.map((bullet) => renderCopy(bullet)),
      cta: item.cta ?? `Compare ${data.engine.code} quotes`,
    })),
  };
  const specsBackgroundImage = specsBackgroundImageMap[data.brand.slug] ?? data.sections.hero.engineImage;
  const specsTrustHeadline = data.sections.trustCta.bullets[0] ?? data.sections.trustCta.title;
  const specsTrustSubline = data.sections.trustCta.bullets[1] ?? data.sections.hero.quoteCard.note;
  const compatibilityModels = Array.from(new Set(data.sections.compatibility.rows.map((row) => row.model))).join(", ");
  const compatibilitySummary = `${data.engine.code} is documented across ${data.sections.compatibility.rows.length} BMW applications spanning ${compatibilityModels}. Registration lookup confirms the exact suffix before quotes are sent.`;
  const costGuideTitleBase = data.sections.costGuide.title.replace(/\s*\(UK\)\s*$/i, "").trim();
  const costGuideHasUk = /\(UK\)\s*$/i.test(data.sections.costGuide.title);
  const costGuideTag = data.sections.costGuide.tag.replace(/section\s*4\s*/i, "").trim() || "Prices";
  const costGuideInfoLine = renderCopy(data.sections.costGuide.paragraphs[0] ?? "All pricing guidance shown here is indicative.").replace(/^\(|\)$/g, "").trim();
  const costGuidePriceFactors = data.sections.costGuide.paragraphs.slice(1).map((paragraph) => renderCopy(paragraph));
  const costGuideEngineImage = data.sections.hero.engineImage.src;
  const failureItems = data.sections.failures.items.slice(0, 3);
  const failureTagLabel = /known problems/i.test(data.sections.failures.tag) ? "Common Problems" : data.sections.failures.tag;
  const failureGuideLine = commonFailure
    ? `Verified issue focus: ${commonFailure}.`
    : "Real-world failure data and repair guidance from UK specialists.";
  const variantItems = data.sections.variants.relatives.slice(0, 3);
  const variantTitleSeparator = data.sections.variants.title.includes(" — ")
    ? " — "
    : data.sections.variants.title.includes(" - ")
      ? " - "
      : "";
  const variantTitlePieces = variantTitleSeparator
    ? data.sections.variants.title.split(variantTitleSeparator)
    : [data.sections.variants.title];
  const variantTitleLead = variantTitleSeparator ? variantTitlePieces.slice(0, -1).join(variantTitleSeparator) : data.sections.variants.title;
  const variantTitleAccent = variantTitleSeparator ? variantTitlePieces[variantTitlePieces.length - 1] : "";
  const variantCardLabels = ["Easily Confused", "Alternative / Next-Gen Code", "Related JLR Variants"];
  const variantAccentCards = [
    {
      line: "#ff3a3a",
      glow: "bg-[linear-gradient(180deg,#fff5f5_0%,#ffffff_100%)]",
      pill: "text-[#ff2b2b]",
      iconBg: "bg-[#fff1f1]",
      icon: "/icons/engine-market/imported/accent-engine.png",
    },
    {
      line: "#ff7a1a",
      glow: "bg-[linear-gradient(180deg,#fff8f1_0%,#ffffff_100%)]",
      pill: "text-[#ff7a1a]",
      iconBg: "bg-[#fff4ea]",
      icon: "/icons/engine-market/imported/accent-upgraded-components.png",
    },
    {
      line: "#17803d",
      glow: "bg-[linear-gradient(180deg,#f4fcf6_0%,#ffffff_100%)]",
      pill: "text-[#17803d]",
      iconBg: "bg-[#edf9f0]",
      icon: "/icons/engine-market/imported/accent-variant-directory.png",
    },
  ] as const;
  const buyingGuideCards = [
    {
      label: data.sections.buyingGuide.options[0]?.label ?? "Used",
      body: renderCopy(data.sections.buyingGuide.options[0]?.body ?? ""),
      href: data.sections.buyingGuide.options[0]?.href ?? "#quote-form",
      linkText: `View ${(data.sections.buyingGuide.options[0]?.label ?? "used").toLowerCase()} engines`,
      icon: "/icons/engine-market/imported/blue-engine.png",
      tile: "bg-[#071f54]",
      heading: "text-[#0b2347]",
      link: "text-[#2563eb]",
    },
    {
      label: data.sections.buyingGuide.options[1]?.label ?? "Reconditioned",
      body: renderCopy(data.sections.buyingGuide.options[1]?.body ?? ""),
      href: data.sections.buyingGuide.options[1]?.href ?? "#quote-form",
      linkText: `View ${(data.sections.buyingGuide.options[1]?.label ?? "reconditioned").toLowerCase()} engines`,
      icon: "/icons/engine-market/imported/accent-major-change.png",
      tile: "bg-[#0b6b36]",
      heading: "text-[#146f38]",
      link: "text-[#17803d]",
    },
    {
      label: data.sections.buyingGuide.options[2]?.label ?? "Rebuilt",
      body: renderCopy(data.sections.buyingGuide.options[2]?.body ?? ""),
      href: data.sections.buyingGuide.options[2]?.href ?? "#quote-form",
      linkText: `View ${(data.sections.buyingGuide.options[2]?.label ?? "rebuilt").toLowerCase()} engines`,
      icon: "/icons/engine-market/imported/blue-crankshaft.png",
      tile: "bg-[#071f54]",
      heading: "text-[#0b2347]",
      link: "text-[#2563eb]",
    },
    {
      label: "Supply & Fit Line",
      body: renderCopy(data.sections.buyingGuide.supplyFitLine),
      href: "#quote-form",
      linkText: "View supply & fit services",
      icon: "/icons/engine-market/imported/accent-supply-fit.png",
      tile: "bg-[#0b6b36]",
      heading: "text-[#146f38]",
      link: "text-[#17803d]",
    },
  ];
  const relatedCardMeta = [
    {
      tile: "bg-[#071f54]",
      icon: "/icons/variant/white/engine.png",
      tone: "text-[#146f38]",
    },
    {
      tile: "bg-[#0b6b36]",
      icon: "/icons/engine-market/white-technical-spec.png",
      tone: "text-[#146f38]",
    },
    {
      tile: "bg-[#071f54]",
      icon: "/icons/variant/white/rod-bearing.png",
      tone: "text-[#146f38]",
    },
    {
      tile: "bg-[#0b6b36]",
      icon: "/icons/variant/white/supply-fit.png",
      tone: "text-[#146f38]",
    },
    {
      tile: "bg-[#0b6b36]",
      icon: "/icons/variant/white/supply-fit.png",
      tone: "text-[#146f38]",
    },
  ] as const;
  const trustFeatureCards = [
    {
      title: "Vetted UK Specialists",
      body: renderCopy(data.sections.trustCta.bullets[0] ?? `Vetted UK specialists for ${data.engine.code} replacements`),
      icon: "/icons/variant/white/specialists.png",
    },
    {
      title: "Minimum 12-Month Warranty",
      body: renderCopy(data.sections.trustCta.bullets[1] ?? "Minimum 12-month warranty on reconditioned and rebuilt options"),
      icon: "/icons/variant/white/warranty.png",
    },
    {
      title: "Nationwide Delivery",
      body: renderCopy(data.sections.trustCta.bullets[2] ?? "Nationwide delivery plus supply and fit availability"),
      icon: "/icons/variant/white/nationwide.png",
    },
    {
      title: "Expert Support",
      body: renderCopy(data.sections.trustCta.note),
      icon: "/icons/variant/white/not-sure.png",
    },
  ];

  return (
    <>
      {data.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
        />
      ) : null}

      <EngineCodeHeroSection data={heroData} />

      <Section className="-mt-2 bg-[linear-gradient(180deg,#ffffff_0%,#f7fcf8_100%)] pt-0 pb-2 sm:-mt-2 sm:pt-0 sm:pb-3 lg:-mt-3 lg:pt-0 lg:pb-4">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#f4f8fe_0%,#ffffff_34%,#ffffff_100%)] py-0 lg:min-h-[520px]">
              <div className="absolute inset-y-0 right-0 hidden w-[74%] lg:block">
                <Image
                  src={specsBackgroundImage.src}
                  alt={specsBackgroundImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-[55%_center]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.98)_12%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.68)_29%,rgba(255,255,255,0.34)_40%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_60%)]" />
              </div>

              <div className="relative z-[1] max-w-[660px] pt-2 lg:pt-0">
                <SectionHeading tag={data.sections.specs.tag} title={data.sections.specs.title} />
              </div>

              <div className="relative z-[1] mt-3 lg:hidden">
                <div className="relative aspect-[1.26/1] overflow-hidden rounded-[14px] bg-[#eef3fb]">
                  <Image
                    src={specsBackgroundImage.src}
                    alt={specsBackgroundImage.alt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="relative z-[1] mt-2 max-w-[612px] overflow-hidden rounded-[14px] border border-[#dbe5f2] bg-white/94 shadow-[0_10px_22px_rgba(15,23,42,0.04)] backdrop-blur-[2px] lg:mt-3">
                {data.sections.specs.specs.map((item) => (
                  <SpecsDataRow key={item.label} label={item.label} value={item.value} />
                ))}
              </div>

              <div className="relative z-[1] mt-2 lg:hidden">
                <div className="overflow-hidden rounded-[16px] border border-[#0f315c] bg-[linear-gradient(160deg,#081f47_0%,#0d2a57_72%,#10264d_100%)] px-4 py-4 shadow-[0_14px_28px_rgba(8,31,71,0.16)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-[#0d2a57] text-[#15a24a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
                        <path d="M12 3 19 6v5c0 4.4-2.7 7.3-7 10-4.3-2.7-7-5.6-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.9" />
                        <path d="m8.6 11.8 2.3 2.3 4.6-4.9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-extrabold leading-[1.18] text-white">{specsTrustHeadline}</p>
                      <p className="mt-1.5 text-[14px] leading-[1.4] text-[#d9e3f3]">{specsTrustSubline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 right-0 z-[1] hidden w-[44%] max-w-[600px] lg:block">
                <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[linear-gradient(160deg,rgba(8,31,71,0.98)_0%,rgba(13,42,87,0.98)_100%)] px-5 py-2.5 shadow-[0_18px_38px_rgba(8,31,71,0.2)] backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center text-[#15a24a]">
                      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden="true">
                        <path d="M12 3 19 6v5c0 4.4-2.7 7.3-7 10-4.3-2.7-7-5.6-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.9" />
                        <path d="m8.6 11.8 2.3 2.3 4.6-4.9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[15px] font-extrabold leading-[1.1] text-white">{specsTrustHeadline}</p>
                      <p className="mt-1 whitespace-nowrap text-[13px] leading-[1.15] text-[#d9e3f3]">{specsTrustSubline}</p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Container>
      </Section>

      <Section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f6fbf7_100%)] pt-3 pb-4 sm:pt-4 sm:pb-5 lg:pt-4 lg:pb-6">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#eef5ff_0%,#ffffff_42%,#f7fbff_100%)]">
              <div className="absolute right-[3%] top-[2%] hidden opacity-[0.06] lg:block">
                <Image
                  src="/images/home/brand-logos/bmw.png"
                  alt="BMW watermark"
                  width={320}
                  height={320}
                  className="h-auto w-[280px] object-contain"
                />
              </div>
              <div className="hidden gap-5 lg:grid lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
                <div className="relative z-[1] flex max-w-[420px] flex-col gap-4 pt-2 lg:pt-1">
                  <SectionHeading tag={data.sections.compatibility.tag} title={data.sections.compatibility.title} />
                  <div className="mt-4 h-[4px] w-[64px] rounded-full bg-[#17803d]" />
                  <p className="mt-4 max-w-[430px] text-[17px] leading-[1.82] text-[#243a63]">{data.sections.compatibility.intro}</p>
                </div>

                <div className="relative z-[1]">
                  <div className="overflow-hidden rounded-[14px] border border-[#dbe5f2] bg-white shadow-[0_12px_24px_rgba(15,23,42,0.05)]">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead className="bg-[#081f47] text-white">
                          <tr>
                            <th className="border-r border-white/10 px-3 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.05em]">Model</th>
                            <th className="border-r border-white/10 px-2 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.05em]">Generation/Chassis</th>
                            <th className="border-r border-white/10 px-3 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.05em]">Badge(s)</th>
                            <th className="border-r border-white/10 px-3 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.05em]">Years</th>
                            <th className="px-3 py-3 text-center text-[13px] font-extrabold uppercase tracking-[0.05em]">Link</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.sections.compatibility.rows.map((row, index) => (
                            <tr key={`${row.model}-${row.generation}-${index}`} className="border-t border-[#edf3f9]">
                              <td className="border-r border-[#edf3f9] px-3 py-2.5 align-middle text-[15px] font-bold leading-[1.3] text-[#0b2347]">
                                <div className="flex items-center justify-start gap-2.5 text-left">
                                  <Image
                                    src={modelImageMap[row.model] ?? "/images/brands/bmw/models/bmw-3-series-model-card.png"}
                                    alt={`${data.brand.name} ${row.model}`}
                                    width={58}
                                    height={34}
                                    className="h-[34px] w-[58px] object-contain"
                                  />
                                  <span>{data.brand.name} {row.model}</span>
                                </div>
                              </td>
                              <td className="border-r border-[#edf3f9] px-2 py-2.5 text-center align-middle text-[15px] font-semibold leading-[1.3] text-[#173660]">
                                {row.generation}
                              </td>
                              <td className="border-r border-[#edf3f9] px-3 py-2.5 text-center align-middle text-[15px] font-semibold leading-[1.3] text-[#173660]">
                                {row.badges}
                              </td>
                              <td className="whitespace-nowrap border-r border-[#edf3f9] px-3 py-2.5 text-center align-middle text-[15px] font-semibold text-[#173660]">
                                {row.years}
                              </td>
                              <td className="px-3 py-2.5 text-center align-middle">
                                <div className="grid justify-items-center gap-1.5">
                                  {row.links.map((link, linkIndex) => (
                                    <Link
                                      key={link.label}
                                      href={link.href}
                                      className={`inline-flex items-center gap-1.5 text-center text-[15px] font-bold transition ${
                                        linkIndex === 0 ? "text-[#1d4ed8] hover:text-[#17803d]" : "text-[#173660] hover:text-[#17803d]"
                                      }`}
                                    >
                                      <span>{link.label}</span>
                                      <span aria-hidden="true">
                                        <CompatibilityMetaIcon kind="link" />
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 hidden gap-3 lg:grid lg:grid-cols-[390px_minmax(0,1fr)]">
                <div />
                <div className="overflow-hidden rounded-[14px] border border-[#dbe5f2] bg-[linear-gradient(160deg,#fafdfe_0%,#eef9f1_100%)] px-4 py-3 shadow-[0_10px_22px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center text-[#17803d]">
                      <GlobeOutlineIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[16px] font-extrabold tracking-[-0.03em] text-[#0b2347]">CROSS-BRAND</div>
                      <p className="mt-1 text-[14px] leading-[1.58] text-[#173660]">{compatibilitySummary}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 hidden overflow-hidden rounded-[14px] border border-[#dbe5f2] bg-white shadow-[0_10px_22px_rgba(15,23,42,0.04)] lg:grid lg:grid-cols-[620px_minmax(0,1fr)]">
                <div className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-[#cae9d3] text-[#17803d]">
                      <LockOutlineIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[18px] font-extrabold tracking-[-0.03em] text-[#0b2347]">Not sure which engine your car has?</div>
                      <p className="mt-1 text-[14px] leading-[1.55] text-[#516581]">{data.sections.compatibility.closing}</p>
                    </div>
                  </div>
                </div>

                <div className="relative grid grid-cols-[minmax(0,1fr)_226px] items-center gap-3 px-3 before:absolute before:left-0 before:top-1/2 before:h-[24px] before:w-px before:-translate-y-1/2 before:bg-[#dbe5f2] before:content-['']">
                  <div className="overflow-hidden rounded-[8px] border border-[#e2bc19] bg-[#ffcc12] shadow-[0_10px_20px_rgba(234,179,8,0.12)]">
                    <div className="grid h-[34px] grid-cols-[100px_1fr]">
                      <div className="flex items-center gap-2 border-r border-[#d5a800] px-2 text-[#0b2347]">
                        <UkFlagInlineIcon />
                        <span className="text-[14px] font-extrabold">{data.sections.hero.quoteCard.countryCode}</span>
                        <ChevronDownMiniIcon />
                      </div>
                      <input
                        type="text"
                        aria-label="Vehicle registration"
                        placeholder={data.sections.hero.quoteCard.placeholder}
                        className="min-w-0 border-0 bg-transparent px-2 text-[12px] font-medium text-[#0b2347] outline-none placeholder:text-[#334155]"
                      />
                    </div>
                  </div>

                  <a
                    href="#quote-form"
                    data-quote-context={data.sections.compatibility.title}
                    data-quote-source="engine-compatibility"
                    data-quote-engine-code={data.engine.code}
                    className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] bg-[#0d8d3b] px-2 text-center text-[13px] font-extrabold text-white shadow-[0_10px_22px_rgba(13,141,59,0.16)] transition hover:bg-[#0a7b33]"
                  >
                    <span className="whitespace-nowrap">{data.sections.hero.quoteCard.buttonText}</span>
                    <ArrowRightMiniIcon />
                  </a>
                </div>
              </div>

              <div className="mt-3 grid gap-2.5 lg:hidden">
                {data.sections.compatibility.rows.map((row, index) => (
                  <article
                    key={`mobile-${row.model}-${row.generation}-${index}`}
                    className="overflow-hidden rounded-[10px] border border-[#dbe5f2] bg-white shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
                  >
                    <div className="grid grid-cols-[38%_62%]">
                      <div className="relative min-h-[104px] overflow-hidden bg-[linear-gradient(180deg,#0a2b73_0%,#1643a8_16%,#7ad8ff_50%,#ffffff_100%)]">
                        <div className="absolute left-[8px] top-1/2 h-[72px] w-[72px] -translate-y-1/2 rounded-full border border-[#d6fbff] shadow-[0_0_12px_rgba(224,242,254,0.98),0_0_24px_rgba(34,211,238,0.72),0_0_38px_rgba(125,211,252,0.34)]" />
                        <Image
                          src={mobileModelCutoutMap[row.model] ?? genericMobileCarCutout}
                          alt={`${data.brand.name} ${row.model}`}
                          fill
                          sizes="38vw"
                          className="object-contain p-1 drop-shadow-[0_10px_14px_rgba(2,6,23,0.24)]"
                        />
                      </div>

                      <div className="px-2 py-1.5">
                        <div className="flex items-start gap-1.5">
                          <div className="flex h-6 w-6 flex-none items-center justify-center bg-[linear-gradient(180deg,#001228_0%,#1570ff_52%,#03122e_100%)] text-[10px] font-black tracking-[-0.04em] text-white shadow-[0_0_16px_rgba(56,189,248,0.58)] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <h3 className="pt-0.5 text-[14px] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0b2347]">
                            {data.brand.name} {row.model}
                          </h3>
                        </div>

                        <div className="mt-1.5 grid gap-1">
                          <div className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-2 border-b border-[#e8eef7] pb-1">
                            <div className="flex items-center gap-1.5 text-[#17803d]">
                              <span className="scale-110">
                                <CompatibilityMetaIcon kind="generation" />
                              </span>
                              <span className="text-[9.5px] font-bold leading-[1.05] text-[#0b2347]">Generation/Chassis</span>
                            </div>
                            <div className="pl-0.5 text-[10.5px] font-semibold leading-[1.2] text-[#173660]">{row.generation}</div>
                          </div>

                          <div className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-2 border-b border-[#e8eef7] pb-1">
                            <div className="flex items-center gap-1.5 text-[#17803d]">
                              <CompatibilityMetaIcon kind="badges" />
                              <span className="text-[9.5px] font-bold leading-[1.05] text-[#0b2347]">Badge(s)</span>
                            </div>
                            <div className="pl-0.5 text-[10.5px] font-semibold leading-[1.2] text-[#173660]">{row.badges}</div>
                          </div>

                          <div className="grid grid-cols-[104px_minmax(0,1fr)] items-center gap-2 border-b border-[#e8eef7] pb-1">
                            <div className="flex items-center gap-1.5 text-[#17803d]">
                              <CompatibilityMetaIcon kind="years" />
                              <span className="text-[9.5px] font-bold leading-[1.05] text-[#0b2347]">Years</span>
                            </div>
                            <div className="whitespace-nowrap pl-0.5 text-[10.5px] font-semibold leading-[1.2] text-[#173660]">{row.years}</div>
                          </div>

                          <div className="grid grid-cols-[104px_minmax(0,1fr)] items-start gap-2">
                            <div className="flex items-center gap-1.5 text-[#17803d]">
                              <span className="scale-[0.82]">
                                <CompatibilityMetaIcon kind="link" />
                              </span>
                              <span className="text-[9.5px] font-bold leading-[1.05] text-[#0b2347]">Link</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                              {row.links.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  className="inline-flex items-center gap-0.5 text-[10.5px] font-bold text-[#1d4ed8] transition hover:text-[#17803d]"
                                >
                                  <span>{link.label}</span>
                                  <span aria-hidden="true">
                                    <CompatibilityMetaIcon kind="link" />
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-2.5 grid gap-2.5 lg:hidden">
                <div className="overflow-hidden rounded-[10px] border border-[#103061] bg-[linear-gradient(160deg,#061a40_0%,#0c2a59_74%,#10224c_100%)] px-3 py-3 text-white shadow-[0_12px_26px_rgba(8,31,71,0.18)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#2c6fff] text-[#4ea3ff] shadow-[0_0_18px_rgba(78,163,255,0.2)]">
                      <GlobeOutlineIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-extrabold tracking-[-0.03em] text-white">CROSS-BRAND</div>
                      <p className="mt-1 max-w-[960px] text-[13px] leading-[1.52] text-[#dce6f5]">{compatibilitySummary}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[10px] border border-[#dbe5f2] bg-white px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#cae9d3] text-[#17803d] shadow-[0_8px_18px_rgba(23,128,61,0.07)]">
                      <LockOutlineIcon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-extrabold tracking-[-0.03em] text-[#0b2347]">Not sure which engine your car has?</div>
                      <p className="mt-1 max-w-[920px] text-[13px] leading-[1.5] text-[#516581]">{data.sections.compatibility.closing}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  <div className="overflow-hidden rounded-[7px] border border-[#e2bc19] bg-[#ffcc12] shadow-[0_8px_18px_rgba(234,179,8,0.1)]">
                    <div className="grid min-h-[38px] grid-cols-[108px_1fr]">
                      <div className="flex items-center gap-2 border-r border-[#d5a800] px-2.5 text-[#0b2347]">
                        <UkFlagInlineIcon />
                        <span className="text-[14px] font-extrabold">{data.sections.hero.quoteCard.countryCode}</span>
                        <ChevronDownMiniIcon />
                      </div>
                      <input
                        type="text"
                        aria-label="Vehicle registration"
                        placeholder={data.sections.hero.quoteCard.placeholder}
                        className="min-w-0 border-0 bg-transparent px-2.5 text-[13px] font-medium text-[#0b2347] outline-none placeholder:text-[#334155]"
                      />
                    </div>
                  </div>

                  <a
                    href="#quote-form"
                    data-quote-context={data.sections.compatibility.title}
                    data-quote-source="engine-compatibility"
                    data-quote-engine-code={data.engine.code}
                    className="inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[7px] bg-[#0d8d3b] px-3 text-center text-[14px] font-extrabold text-white shadow-[0_10px_22px_rgba(13,141,59,0.16)] transition hover:bg-[#0a7b33]"
                  >
                    <span>{data.sections.hero.quoteCard.buttonText}</span>
                    <ArrowRightMiniIcon />
                  </a>
                </div>
            </div>
          </div>
          </div>
        </Container>
      </Section>

      <Section className="-mt-8 bg-white lg:-mt-10">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[220px] bg-[radial-gradient(circle_at_top_left,#f5f8ff_0%,#ffffff_52%,#ffffff_100%)]" />
              <div className="absolute right-[-40px] top-4 h-[180px] w-[380px] rounded-full bg-[radial-gradient(circle,#d9e8ff_0%,rgba(217,232,255,0.24)_52%,rgba(217,232,255,0)_76%)] blur-[8px] lg:h-[240px] lg:w-[520px]" />
              <div className="absolute right-[-18px] top-[72px] h-[160px] w-[380px] rounded-full border border-[#dbe8fb] opacity-75 lg:h-[210px] lg:w-[620px]" />
              <div className="absolute right-[-10px] top-[90px] h-[140px] w-[330px] rounded-full border border-[#d8e8ff] opacity-60 lg:h-[180px] lg:w-[560px]" />

              <div className="relative px-4 pb-4 pt-1.5 sm:px-5 sm:pb-4 sm:pt-2 lg:px-6 lg:pb-4 lg:pt-2">
                <div className="grid gap-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(480px,0.95fr)] lg:items-start">
                  <div className="relative z-[1] max-w-[760px] pt-0.5">
                    <span className="inline-flex items-center rounded-full bg-[#0b6b36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(11,107,54,0.16)] sm:px-3.5 sm:text-[12px]">{costGuideTag}</span>
                    <h2 className="mt-2 font-['Manrope'] text-[34px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0b2347] sm:text-[46px] lg:text-[62px]">
                      <span>{costGuideTitleBase} </span>
                      {costGuideHasUk ? <span className="text-[#17803d]">(UK)</span> : null}
                    </h2>
                  </div>

                  <div className="relative min-h-[164px] lg:min-h-[260px] xl:min-h-[282px]">
                    <Image
                      src={genericMobileCarCutout}
                      alt={`${data.brand.name} ${data.engine.code} pricing visual`}
                      fill
                      sizes="(max-width: 1024px) 92vw, 680px"
                      className="scale-[1.08] object-contain object-right-top drop-shadow-[0_18px_22px_rgba(15,23,42,0.16)] lg:scale-[1.16] xl:scale-[1.24]"
                    />
                  </div>
                </div>

                <div className="-mt-2 overflow-hidden rounded-[14px] border border-[#dde7f4] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.04)] lg:-mt-14">
                  <table className="w-full table-fixed border-collapse">
                    <thead className="bg-[#081f47] text-white">
                      <tr>
                        <th className="w-[25%] border-r border-white/10 px-3 py-2 text-center align-middle sm:px-4 lg:px-5 lg:py-2.5">
                          <div className="flex min-h-[44px] flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2.5">
                            <AssetIcon src="/icons/engine-market/engine-green.png" className="h-5 w-5 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                            <span className="text-[8px] font-extrabold uppercase leading-[1.05] tracking-[0.03em] sm:text-[13px] lg:text-[15px]">Condition</span>
                          </div>
                        </th>
                        <th className="w-[25%] border-r border-white/10 px-3 py-2 text-center align-middle sm:px-4 lg:px-5 lg:py-2.5">
                          <div className="flex min-h-[44px] flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2.5">
                            <AssetIcon src="/icons/variant/white/em-pound.png" className="h-5 w-5 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                            <span className="text-[8px] font-extrabold uppercase leading-[1.05] tracking-[0.03em] sm:text-[13px] lg:text-[15px]">Supply Only</span>
                          </div>
                        </th>
                        <th className="w-[24%] border-r border-white/10 px-3 py-2 text-center align-middle sm:px-4 lg:px-5 lg:py-2.5">
                          <div className="flex min-h-[44px] flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2.5">
                            <AssetIcon src="/icons/variant/white/supply-fit.png" className="h-5 w-5 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                            <div className="text-center">
                              <div className="text-[8px] font-extrabold uppercase leading-[1.05] tracking-[0.03em] sm:text-[13px] lg:text-[15px]">Fitted</div>
                              <div className="text-[6px] font-medium uppercase leading-[1.05] tracking-[0.04em] text-[#d9e6fb] sm:text-[9px] lg:text-[10px]">(Independent Specialist)</div>
                            </div>
                          </div>
                        </th>
                        <th className="w-[26%] px-3 py-2 text-center align-middle sm:px-4 lg:px-5 lg:py-2.5">
                          <div className="flex min-h-[44px] flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2.5">
                            <AssetIcon src="/icons/variant/white/warranty.png" className="h-5 w-5 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                            <span className="text-[8px] font-extrabold uppercase leading-[1.05] tracking-[0.03em] sm:text-[13px] lg:text-[15px]">Typical Warranty</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.sections.costGuide.rows.map((row) => {
                        const conditionIcon =
                          row.condition === "Used"
                            ? "/icons/engine-market/type-used.png"
                            : row.condition === "Reconditioned"
                              ? "/icons/engine-market/type-reconditioned.png"
                              : "/icons/engine-market/type-rebuilt.png";
                        const conditionTone = row.condition === "Reconditioned" ? "text-[#17803d]" : "text-[#0b2347]";

                        return (
                          <tr key={row.condition} className="border-t border-[#edf3f9]">
                            <td className="border-r border-[#edf3f9] px-2 py-2.5 align-middle sm:px-4 lg:px-4 lg:py-3">
                              <div className="flex items-center justify-center gap-2 text-center sm:gap-2.5 lg:justify-start lg:pl-16 lg:text-left">
                                <AssetIcon src={conditionIcon} className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                                <span className={`text-[11px] font-bold tracking-[-0.02em] sm:text-[15px] lg:text-[17px] ${conditionTone}`}>{row.condition}</span>
                              </div>
                            </td>
                            <td className="border-r border-[#edf3f9] px-2 py-2.5 text-center text-[11px] font-semibold tracking-[-0.02em] text-[#0b2347] sm:px-4 sm:text-[16px] lg:px-5 lg:py-3.5 lg:text-[20px]">
                              {renderCopy(row.supplyOnly)}
                            </td>
                            <td className="border-r border-[#edf3f9] px-2 py-2.5 text-center text-[11px] font-semibold tracking-[-0.02em] text-[#0b2347] sm:px-4 sm:text-[16px] lg:px-5 lg:py-3.5 lg:text-[20px]">
                              {renderCopy(row.fitted)}
                            </td>
                            <td className="px-2 py-2.5 text-center text-[10px] font-medium text-[#173660] sm:px-4 sm:text-[16px] lg:px-5 lg:py-3.5 lg:text-[19px]">
                              {row.warranty}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
                  <div className="grid gap-3">
                    <div className="rounded-[10px] border border-[#dfe8f5] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-2.5 shadow-[0_8px_18px_rgba(15,23,42,0.03)]">
                      <div className="flex items-center gap-3 text-[#2563eb]">
                        <InfoCircleIcon />
                        <p className="text-[14px] leading-[1.52] text-[#173660] sm:text-[15px]">{costGuideInfoLine}</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="relative rounded-[10px] border border-[#dce6f2] bg-white px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.03)] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:rounded-l-[10px] before:bg-[#2563eb] before:content-[''] sm:px-4 sm:py-4 sm:before:hidden">
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-[#eef4ff] text-[#2563eb] shadow-[0_8px_20px_rgba(37,99,235,0.1)]">
                            <AssetIcon src="/icons/engine-market/dark-blue-supply-fit.png" className="h-8 w-8" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[16px] font-extrabold uppercase tracking-[0.03em] text-[#0b2347] sm:text-[17px]">Labour Guide</div>
                            <p className="mt-2 text-[14px] leading-[1.68] text-[#173660] sm:text-[15px]">
                              {renderCopy(data.sections.costGuide.labourLine)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative rounded-[10px] border border-[#dce6f2] bg-white px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.03)] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[3px] before:rounded-l-[10px] before:bg-[#2563eb] before:content-[''] sm:px-4 sm:py-4 sm:before:hidden">
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-full bg-[#eef4ff] text-[#2563eb] shadow-[0_8px_20px_rgba(37,99,235,0.1)]">
                            <AssetIcon src="/icons/engine-market/dark-blue-pound.png" className="h-8 w-8" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[16px] font-extrabold uppercase tracking-[0.03em] text-[#0b2347] sm:text-[17px]">Price Factors</div>
                            <div className="mt-2 grid gap-3">
                              {costGuidePriceFactors.map((paragraph, index) => (
                                <p key={index} className="text-[14px] leading-[1.68] text-[#173660] sm:text-[15px]">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[10px] border border-[#dce6f2] bg-[linear-gradient(160deg,#fbfefd_0%,#f4fbf7_62%,#eff9f3_100%)] px-2.5 py-2 shadow-[0_10px_20px_rgba(15,23,42,0.04)] lg:self-center lg:px-2 lg:py-1.5">
                    <div className="absolute right-[-38px] top-[-12px] h-[210px] w-[210px] rounded-full bg-[radial-gradient(circle,rgba(48,169,87,0.22)_0%,rgba(48,169,87,0)_72%)]" />
                    <div className="relative z-[1] flex h-full flex-col lg:min-h-[232px]">
                      <div className="grid grid-cols-[minmax(0,1fr)_116px] items-start gap-2 lg:block">
                        <div className="min-w-0 lg:max-w-[58%]">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17803d] text-white shadow-[0_10px_22px_rgba(23,128,61,0.18)] lg:h-10 lg:w-10">
                            <AssetIcon src="/icons/engine-market/light-green-instant-quote.png" className="h-7 w-7" />
                          </div>
                          <h3 className="mt-2.5 font-['Manrope'] text-[16px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0b2347] lg:text-[23px]">
                            Ready to compare {data.engine.code} quotes?
                          </h3>
                          <p className="mt-1.5 max-w-[270px] text-[12px] leading-[1.5] text-[#173660] lg:text-[15px] lg:leading-[1.6]">
                            Get competitive quotes from trusted UK specialists today.
                          </p>
                        </div>
                        <div className="relative min-h-[108px] lg:absolute lg:right-[-18px] lg:top-[-8px] lg:h-[178px] lg:min-h-0 lg:w-[54%]">
                          <Image
                            src="/images/shared/hero-engines/temporary-diesel-engine-cutout.png"
                            alt={`${data.engine.code} engine quote visual`}
                            fill
                            sizes="(max-width: 1024px) 116px, 360px"
                            className="scale-[1.16] object-contain object-right-top drop-shadow-[0_16px_22px_rgba(15,23,42,0.18)]"
                          />
                        </div>
                      </div>
                      <a
                        href="#quote-form"
                        data-quote-context={data.sections.costGuide.title}
                        data-quote-source="engine-cost-guide"
                        data-quote-engine-code={data.engine.code}
                        className="relative z-[1] mt-1.5 inline-flex min-h-[40px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#0d8d3b] px-3 py-1 text-center text-[14px] font-semibold text-white shadow-[0_12px_24px_rgba(13,141,59,0.16)] transition hover:bg-[#0a7b33] lg:mt-auto lg:min-h-[42px] lg:text-[15px]"
                      >
                        <ArrowRightMiniIcon />
                        <span>{data.sections.costGuide.cta}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="-mt-5 bg-[linear-gradient(180deg,#ffffff_0%,#fbfefd_100%)] !pt-0 !pb-0 lg:-mt-6 lg:!pb-0">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="relative px-3 pb-1 pt-0 sm:px-4 sm:pb-2 sm:pt-0 lg:px-2 lg:pb-2 lg:pt-0">
                <div className="grid gap-2 lg:grid-cols-1 lg:items-start">
                  <div className="grid grid-cols-[minmax(0,1fr)_118px] items-start gap-2 lg:block">
                    <div className="relative z-[1] min-w-0">
                      <div className="inline-flex items-center rounded-full bg-[#0b6b36] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(11,107,54,0.14)] sm:px-3 sm:text-[11px] lg:px-3.5 lg:py-1.5 lg:text-[12px]">
                        {failureTagLabel}
                      </div>
                      <h2 className="mt-2 font-['Manrope'] text-[27px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0b2347] sm:text-[42px] lg:text-[44px] lg:leading-none lg:whitespace-nowrap xl:text-[48px]">
                        {data.sections.failures.title}
                      </h2>
                      <div className="mt-2 h-[3px] w-[46px] rounded-full bg-[#17803d] lg:mt-4 lg:h-[4px] lg:w-[56px]" />
                      <p className="mt-2 max-w-[740px] text-[12.5px] leading-[1.45] text-[#173660] sm:text-[15px] lg:mt-4 lg:text-[17px] lg:leading-[1.74]">
                        Every engine has its weak points. Here are the known issues with the {data.engine.code}, based on real-world data and verified failure patterns.
                      </p>
                      <p className="mt-1 max-w-[620px] text-[11.5px] leading-[1.38] text-[#516581] sm:text-[13px] lg:mt-2 lg:text-[15px] lg:leading-[1.65]">{failureGuideLine}</p>
                    </div>

                    <div className="relative min-h-[142px] lg:hidden">
                      <div className="absolute right-[-16px] top-1 h-[118px] w-[146px] bg-[radial-gradient(circle_at_center,rgba(221,235,255,0.42)_0%,rgba(221,235,255,0)_68%)]" />
                      <Image
                        src={genericMobileCarCutout}
                        alt={`${data.brand.name} ${data.engine.code} common problems visual`}
                        fill
                        sizes="120px"
                        className="object-contain object-right-top drop-shadow-[0_14px_18px_rgba(15,23,42,0.14)]"
                      />
                    </div>
                  </div>
                </div>

                <DocumentFailureDesktopPanel
                  ctaText={data.sections.failures.cta}
                  engineCode={data.engine.code}
                  failuresTitle={data.sections.failures.title}
                  goodYearsLine={renderCopy(data.sections.failures.goodYearsLine)}
                  items={failureItems.map((item) => ({
                    title: item.title,
                    onset: renderCopy(item.onset),
                    whatHappens: renderCopy(item.whatHappens),
                    repairVsReplace: renderCopy(item.repairVsReplace),
                  }))}
                />

                <div className="mt-3 grid gap-2.5 lg:hidden">
                  {failureItems.map((item, index) => {
                    const open = index === 0;
                    return (
                      <details
                        key={item.title}
                        open={open}
                        className={`overflow-hidden rounded-[10px] border bg-white shadow-[0_8px_18px_rgba(15,23,42,0.04)] ${open ? "border-[#4aa7ff]" : "border-[#dce5f2]"}`}
                      >
                        <summary className="list-none cursor-pointer">
                          <div className={`flex items-center gap-2.5 px-3 py-3 ${open ? "bg-[linear-gradient(90deg,#061a40_0%,#0a2151_100%)] text-white" : "bg-white text-[#0b2347]"}`}>
                            <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-[8px] ${open ? "bg-[#0b2f79] text-[#55b4ff]" : "bg-[#081f47] text-white"}`}>
                              <FailureIssueIcon title={item.title} active={open} />
                            </div>
                            <div className="min-w-0 flex-1 text-[14px] font-extrabold leading-[1.22] tracking-[-0.03em]">
                              {index + 1}. {item.title}
                            </div>
                            <ChevronToggleIcon open={open} />
                          </div>
                        </summary>

                        {open ? (
                          <div className="grid gap-2.5 p-2.5">
                            <div className="grid gap-2.5 rounded-[10px] border border-[#e5edf7] bg-white px-3 py-3">
                              <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-2.5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1faf4] text-[#17803d]">
                                  <CompatibilityMetaIcon kind="years" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-extrabold text-[#17803d]">Typical onset:</div>
                                  <div className="mt-0.5 text-[14px] font-extrabold tracking-[-0.03em] text-[#0b2347]">{renderCopy(item.onset)}</div>
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-2.5 rounded-[10px] border border-[#e5edf7] bg-white px-3 py-3">
                              <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-2.5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f8ff] text-[#0b2347]">
                                  <SpecsPanelIcon label="Most Common Failure" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-extrabold text-[#0b2347]">What happens:</div>
                                  <p className="mt-1 text-[13px] leading-[1.5] text-[#173660]">{renderCopy(item.whatHappens)}</p>
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-2.5 rounded-[10px] border border-[#e5edf7] bg-white px-3 py-3">
                              <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-2.5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1faf4] text-[#17803d]">
                                  <PriceTableHeaderIcon kind="fitted" />
                                </div>
                                <div>
                                  <div className="text-[13px] font-extrabold text-[#17803d]">Repair vs replace:</div>
                                  <p className="mt-1 text-[13px] leading-[1.5] text-[#173660]">{renderCopy(item.repairVsReplace)}</p>
                                </div>
                              </div>
                            </div>

                            <a
                              href="#quote-form"
                              data-quote-context={data.sections.failures.title}
                              data-quote-source="engine-failures-mobile"
                              data-quote-engine-code={data.engine.code}
                              className="flex items-center justify-between rounded-[9px] border border-[#d9e4f6] bg-[#f7fbff] px-3 py-3 text-[#1d4ed8]"
                            >
                              <div className="flex items-center gap-3">
                                <DocumentLinkIcon />
                                <span className="text-[13px] font-extrabold tracking-[-0.02em]">Read more about this issue</span>
                              </div>
                              <CompatibilityMetaIcon kind="link" />
                            </a>
                          </div>
                        ) : null}
                      </details>
                    );
                  })}

                  <div className="rounded-[10px] border border-[#dce9df] bg-[linear-gradient(180deg,#fbfffc_0%,#f3fbf5_100%)] px-3 py-3 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#17803d] text-white shadow-[0_8px_18px_rgba(23,128,61,0.14)]">
                        <CompatibilityMetaIcon kind="badges" />
                      </div>
                      <p className="text-[13px] leading-[1.52] text-[#173660]">{renderCopy(data.sections.failures.goodYearsLine)}</p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#081f47_0%,#071936_100%)] px-3 py-3 text-white shadow-[0_14px_28px_rgba(8,31,71,0.16)]">
                    <div className="absolute right-0 top-0 h-full w-[44%] opacity-20">
                      <Image
                        src={costGuideEngineImage}
                        alt=""
                        fill
                        sizes="180px"
                        className="object-contain object-right-bottom"
                      />
                    </div>
                    <div className="relative z-[1]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#0b2f79] text-[#48b0ff] shadow-[0_0_18px_rgba(72,176,255,0.3)]">
                          <TagOutlineIcon />
                        </div>
                        <p className="max-w-[360px] font-['Manrope'] text-[17px] font-extrabold leading-[1.24] tracking-[-0.04em] text-white">
                          {data.sections.failures.cta}
                        </p>
                      </div>
                      <a
                        href="#quote-form"
                        data-quote-context={data.sections.failures.title}
                        data-quote-source="engine-failures-mobile-cta"
                        data-quote-engine-code={data.engine.code}
                        className="mt-3 inline-flex min-h-[40px] w-full items-center justify-center rounded-[7px] bg-[#0d8d3b] px-3 py-1.5 text-center text-[14px] font-extrabold text-white shadow-[0_10px_22px_rgba(13,141,59,0.16)]"
                      >
                        Compare Rebuilt {data.engine.code} Prices
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Container>
      </Section>

      <Section className="bg-white !py-0">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#eef5ff_0%,#ffffff_36%,#ffffff_100%)] px-2.5 py-0.5 sm:px-3 sm:py-1 lg:px-1 lg:py-1">
              <div className="absolute right-0 top-0 h-[330px] w-[58%] bg-[radial-gradient(circle_at_right_center,rgba(86,161,255,0.14)_0%,rgba(86,161,255,0.05)_28%,rgba(255,255,255,0)_62%)]" />
              <div className="relative z-[1]">
                <span className="inline-flex items-center rounded-full bg-[#0b6b36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(11,107,54,0.16)] sm:px-3.5 sm:text-[12px]">
                  {data.sections.variants.tag}
                </span>

                <div className="relative mt-2 grid grid-cols-[minmax(0,1fr)_118px] items-start gap-2 lg:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)] lg:gap-3">
                  <div className="relative z-[2] max-w-[760px] pt-0.5">
                    <h2 className="font-['Manrope'] text-[27px] font-extrabold leading-[1.02] tracking-[-0.06em] text-[#0b2347] sm:text-[42px] lg:text-[42px] xl:text-[48px]">
                      {variantTitleLead}
                      {variantTitleAccent ? (
                        <>
                          <span>{variantTitleSeparator}</span>
                          <span className="text-[#17803d]">{variantTitleAccent}</span>
                        </>
                      ) : null}
                    </h2>
                    <p className="mt-2 max-w-[720px] text-[12.5px] leading-[1.42] text-[#173660] sm:text-[15px] lg:mt-2.5 lg:text-[16px] lg:leading-[1.55]">
                      {renderCopy(data.sections.variants.intro)}
                    </p>
                  </div>

                  <div className="relative min-h-[132px] overflow-hidden rounded-[8px] sm:min-h-[220px] lg:min-h-[238px] lg:rounded-[10px]">
                    <div className="absolute inset-y-0 left-[-14%] z-[1] w-[50%] bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.88)_45%,rgba(255,255,255,0)_100%)]" />
                    <div className="absolute inset-0 rounded-full border border-[#d9e7ff] opacity-45" />
                    <Image
                      src={costGuideEngineImage}
                      alt={`${data.engine.code} variant reference`}
                      fill
                      sizes="(max-width: 1024px) 118px, 500px"
                      className="object-contain object-right-top drop-shadow-[0_12px_18px_rgba(15,23,42,0.12)] lg:scale-[1.08]"
                    />
                  </div>
                </div>

                <div className="relative z-[3] mt-2 w-full rounded-[8px] border border-[#cfe0ff] bg-white/92 px-2.5 py-2 shadow-[0_8px_18px_rgba(37,99,235,0.045)] backdrop-blur-sm sm:px-3">
                  <div className="grid grid-cols-[34px_minmax(0,1fr)] items-start gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)] text-[#2563eb] shadow-[0_8px_16px_rgba(37,99,235,0.08)] sm:h-9 sm:w-9 sm:rounded-[8px]">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
                        <path d="M12 10v6M12 7h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-[12.5px] leading-[1.44] tracking-[-0.02em] text-[#173660] sm:text-[14px] lg:text-[14.5px]">
                      {renderCopy(data.sections.variants.closing)}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 grid items-stretch gap-2 lg:gap-2.5 lg:grid-cols-3">
                  {variantItems.map((item, index) => {
                    const accent = variantAccentCards[index] ?? variantAccentCards[variantAccentCards.length - 1];
                    const label = variantCardLabels[index] ?? "Engine Variant";
                    return (
                      <div
                        key={item.code}
                        className={`relative flex h-full min-h-0 overflow-hidden rounded-[8px] border border-[#e8eef7] ${accent.glow} px-2.5 py-2.5 shadow-[0_6px_14px_rgba(15,23,42,0.025)] lg:min-h-[150px] lg:rounded-[9px] lg:px-3 lg:py-3`}
                      >
                        <div className="absolute inset-x-0 bottom-0 h-[3px]" style={{ backgroundColor: accent.line }} />
                        <div className="relative z-[1] flex min-h-full flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className={`flex h-[42px] w-[42px] flex-none items-center justify-center rounded-[8px] ${accent.iconBg} shadow-[0_8px_16px_rgba(15,23,42,0.035)] lg:h-[50px] lg:w-[50px] lg:rounded-[9px]`}>
                              <AssetIcon src={accent.icon} className="h-7 w-7 lg:h-8 lg:w-8" />
                            </div>
                            <div className={`${accent.pill} mt-0.5`}>
                              <ArrowRightMiniIcon />
                            </div>
                          </div>
                          <div className={`mt-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.04em] ${accent.pill} lg:mt-2 lg:text-[10px]`}>{label}</div>
                          <div className="mt-0.5 text-[20px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0b2347] lg:text-[22px]">
                            {item.code}
                          </div>
                          <p className="mt-1 text-[12.5px] leading-[1.38] text-[#173660] lg:mt-1.5 lg:text-[13px] lg:leading-[1.44]">
                            {renderCopy(item.description)}
                          </p>
                          <div className={`${accent.pill} mt-auto hidden`}>
                            <ArrowRightMiniIcon />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2.5 rounded-[9px] border border-[#ccdcff] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-2.5 py-2 shadow-[0_8px_18px_rgba(37,99,235,0.045)] sm:px-3 lg:px-3">
                  <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center">
                    <div className="grid gap-2 sm:grid-cols-[48px_minmax(0,1fr)] sm:items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#d7e5ff] bg-[linear-gradient(180deg,#ffffff_0%,#eef5ff_100%)] text-[#2563eb] shadow-[0_8px_16px_rgba(37,99,235,0.08)]">
                        <LockOutlineIcon />
                      </div>
                      <div>
                        <h3 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#0b2347] sm:text-[20px]">
                          Confirm the exact {data.engine.code} fitment
                        </h3>
                        <p className="mt-1 max-w-[620px] text-[12.5px] leading-[1.42] text-[#173660] sm:text-[13.5px]">
                          {renderCopy(data.sections.variants.closing)}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1.5 rounded-[8px] border border-[#dbe5f6] bg-white p-1.5 sm:grid-cols-[minmax(0,1fr)_144px] sm:items-stretch lg:max-w-[400px]">
                      <div className="flex min-h-[36px] items-center gap-2 rounded-[6px] border border-[#dce6f2] bg-white px-2 text-[#0b2347]">
                        <UkFlagInlineIcon />
                        <ChevronDownMiniIcon />
                        <div className="h-6 w-px bg-[#dbe5f2]" />
                        <input
                          type="text"
                          placeholder="Enter your registration"
                          className="h-full min-w-0 flex-1 border-0 bg-transparent text-[12.5px] outline-none placeholder:text-[#93a3b7] sm:text-[13px]"
                        />
                      </div>
                      <a
                        href="#quote-form"
                        data-quote-context={data.sections.variants.title}
                        data-quote-source="engine-variants-confirm"
                        data-quote-engine-code={data.engine.code}
                        className="inline-flex min-h-[36px] items-center justify-center gap-1.5 rounded-[6px] bg-[linear-gradient(180deg,#2f76ff_0%,#2563eb_100%)] px-2.5 text-center text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.16)] transition hover:brightness-95"
                      >
                        <span>Confirm Engine</span>
                        <ArrowRightMiniIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[linear-gradient(180deg,#ffffff_0%,#fbfefd_100%)] !py-0">
        <Container className="!max-w-[1400px]">
          <div className="px-3 py-0.5 sm:px-4 sm:py-1 lg:px-2 lg:py-0.5">
            <div className="max-w-[1180px]">
              <div className="inline-flex items-center rounded-full bg-[#0b6b36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(11,107,54,0.16)] sm:px-3.5 sm:text-[12px]">
                {data.sections.buyingGuide.tag}
              </div>
              <h2 className="mt-1.5 font-['Manrope'] text-[30px] font-extrabold leading-[1.04] tracking-[-0.05em] text-[#0b2347] sm:text-[36px] lg:text-[38px]">
                {data.sections.buyingGuide.title}
              </h2>
              <p className="mt-1.5 max-w-[860px] text-[13.5px] leading-[1.42] text-[#173660] sm:text-[14px] lg:text-[14.5px]">
                Choosing the right replacement route depends on your budget, risk tolerance, and ownership goals. Here&apos;s a breakdown of your options.
              </p>
            </div>

            <div className="mt-2.5 grid items-start gap-2 lg:grid-cols-2">
              {buyingGuideCards.map((card) => (
                <div key={card.label} className="overflow-hidden rounded-[9px] border border-[#dbe5f2] bg-white shadow-[0_5px_12px_rgba(15,23,42,0.025)]">
                  <div className="flex items-start gap-2.5 px-2.5 py-2 sm:px-3 sm:py-2.5 lg:gap-2.5 lg:px-2.5 lg:py-2">
                    <div className={`flex h-[48px] w-[48px] flex-none items-center justify-center rounded-[7px] ${card.tile} shadow-[0_7px_14px_rgba(15,23,42,0.08)] sm:h-[54px] sm:w-[54px] lg:h-[50px] lg:w-[50px]`}>
                      <AssetIcon src={card.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-['Manrope'] text-[17px] font-extrabold leading-[1.04] tracking-[-0.04em] ${card.heading} sm:text-[18px] lg:text-[18px]`}>
                        {card.label}:
                      </h3>
                      <p className="mt-0.5 text-[12.5px] leading-[1.36] text-[#173660] sm:text-[13px] lg:text-[13px]">
                        {card.body}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#e5edf7] px-2.5 py-1 sm:px-3">
                    <Link href={card.href} className={`text-[12px] font-semibold tracking-[-0.02em] ${card.link} transition hover:opacity-80 sm:text-[12.5px]`}>
                      {card.linkText}
                    </Link>
                    <div className={card.link}>
                      <ArrowRightMiniIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 rounded-[9px] border border-[#dbe5f2] bg-[linear-gradient(180deg,#ffffff_0%,#f8fcf9_100%)] px-2.5 py-2 shadow-[0_5px_12px_rgba(15,23,42,0.025)] sm:px-3 lg:grid lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center lg:gap-2.5">
              <div className="grid gap-2 sm:grid-cols-[52px_minmax(0,1fr)] sm:items-center">
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[7px] bg-[#0b6b36] text-white shadow-[0_7px_14px_rgba(11,107,54,0.09)]">
                  <VehicleValueIcon />
                </div>
                <div className="min-w-0">
                  <h3 className="font-['Manrope'] text-[17px] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#146f38] sm:text-[18px] lg:text-[18px]">Vehicle Value Note:</h3>
                  <p className="mt-0.5 text-[12.5px] leading-[1.34] text-[#173660] sm:text-[13px] lg:text-[13px]">{renderCopy(data.sections.buyingGuide.vehicleValueNote)}</p>
                </div>
              </div>

              <div className="mt-2 min-w-0 border-t border-[#dbe5f2] pt-2 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-2.5 lg:pt-0">
                <div className="grid grid-cols-[42px_minmax(0,1fr)] items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf8ee] text-[#0b6b36] shadow-[0_7px_14px_rgba(11,107,54,0.08)]">
                    <AssetIcon src="/icons/engine-market/imported/blue-engine.png" className="h-6 w-6" />
                  </div>
                  <h3 className="font-['Manrope'] text-[17px] font-extrabold leading-[1.04] tracking-[-0.05em] text-[#0b2347] sm:text-[19px] lg:text-[18px]">
                    {data.sections.buyingGuide.cta}
                  </h3>
                </div>
                <a
                  href="#quote-form"
                  data-quote-context={data.sections.buyingGuide.title}
                  data-quote-source="engine-buying-guide"
                  data-quote-engine-code={data.engine.code}
                  className="mt-1.5 inline-flex min-h-[32px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#0d8d3b] px-2.5 py-0.5 text-center text-[12.5px] font-semibold text-white shadow-[0_7px_14px_rgba(13,141,59,0.1)] transition hover:bg-[#0a7b33]"
                >
                  <span>{data.sections.buyingGuide.cta}</span>
                  <ArrowRightMiniIcon />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white !py-0">
        <Container className="!max-w-[1400px]">
          <div className="py-0">
            <div className="px-3 py-1 sm:px-4 sm:py-1.5 lg:px-4 lg:py-1.5">
              <div className="max-w-[980px]">
                <div className="inline-flex items-center rounded-full bg-[#0b6b36] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_8px_18px_rgba(11,107,54,0.16)] sm:px-3.5 sm:text-[12px]">
                  {data.sections.related.tag}
                </div>
                <h2 className="mt-2 font-['Manrope'] text-[28px] font-extrabold leading-[1.04] tracking-[-0.05em] text-[#0b2347] sm:text-[40px] lg:mt-3 lg:text-[48px]">
                  {data.sections.related.title}
                </h2>
                <p className="mt-2 max-w-[920px] text-[13px] leading-[1.45] text-[#173660] sm:text-[17px] lg:mt-3 lg:text-[18px] lg:leading-[1.68]">
                  Explore engines that are closely related to the {data.brand.name} {data.engine.code}, including its predecessor, successor, and key family variants.
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-2 lg:mt-4 lg:gap-3 xl:grid-cols-4">
                {data.sections.related.items.map((item, index) => {
                  const meta = relatedCardMeta[index % relatedCardMeta.length];
                  return (
                    <Link
                      key={`${item.relation}-${item.code}`}
                      href={item.href}
                      className="group rounded-[10px] bg-white px-2.5 py-3 shadow-[0_6px_14px_rgba(15,23,42,0.035)] transition hover:-translate-y-[2px] sm:px-4 sm:py-4 lg:rounded-[18px] lg:px-4 lg:py-3.5"
                    >
                      <div className="flex h-full flex-col items-center text-center lg:grid lg:grid-cols-[60px_minmax(0,1fr)_18px] lg:items-start lg:gap-4 lg:text-left">
                        <div className={`flex h-[58px] w-[58px] items-center justify-center rounded-full ${meta.tile} shadow-[0_12px_22px_rgba(15,23,42,0.12)] sm:h-[90px] sm:w-[90px] lg:h-[64px] lg:w-[64px] lg:rounded-[14px]`}>
                          <AssetIcon src={meta.icon} className="h-8 w-8 sm:h-[52px] sm:w-[52px] lg:h-[38px] lg:w-[38px]" />
                        </div>

                        <div className="mt-2 min-w-0 sm:mt-4 lg:mt-0">
                          <div className={`text-[10px] font-extrabold uppercase tracking-[0.04em] ${meta.tone} sm:text-[13px]`}>{item.relation}</div>
                          <div className="mt-0.5 flex items-center justify-center gap-1.5 lg:justify-start">
                            <h3 className="font-['Manrope'] text-[18px] font-extrabold leading-[1.02] tracking-[-0.05em] text-[#0b2347] sm:text-[28px] lg:text-[18px]">
                              {item.code}
                            </h3>
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0b2347] sm:h-5 sm:w-5" fill="none" aria-hidden="true">
                              <path d="M14 5h5v5M10 14l9-9M19 14v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5 10V5h5M5 5l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div className="mx-auto mt-2 h-px w-full max-w-[360px] bg-[#e6edf6] lg:mx-0 lg:mt-3" />
                          <p className="mt-2 text-[11.5px] leading-[1.38] text-[#173660] sm:text-[16px] sm:leading-[1.66] lg:mt-3 lg:text-[14px] lg:leading-[1.52]">
                            {renderCopy(item.description)}
                          </p>
                        </div>

                        <div className="mt-2 text-[#146f38] sm:mt-4 lg:mt-1">
                          <svg viewBox="0 0 24 24" className="h-5 w-5 transition group-hover:translate-y-[2px] sm:h-7 sm:w-7 lg:h-5 lg:w-5 lg:group-hover:translate-x-[2px] lg:group-hover:translate-y-0" fill="none" aria-hidden="true">
                            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="lg:hidden" />
                            <path d="M8 5h8M16 5l-4 4m4-4-4-4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="hidden lg:block" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection data={faqData} documentMode />

      <Section className="bg-white !pt-0 !pb-0" id="quote-form">
        <Container className="!max-w-none !px-0">
          <div className="py-0">
            <div className="overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_40%]">
              <div className="bg-[linear-gradient(145deg,#071936_0%,#071f47_48%,#0a234f_100%)] px-4 py-4 text-white sm:px-5 sm:py-5 lg:px-5 lg:py-5">
                <h2 className="font-['Manrope'] text-[31px] font-extrabold leading-[1.04] tracking-[-0.06em] text-white sm:text-[38px] lg:max-w-[760px] lg:text-[50px]">
                  {data.sections.trustCta.title}
                </h2>
                <p className="mt-3 max-w-[760px] text-[16px] leading-[1.68] text-[#d7e1f0] sm:text-[17px] lg:text-[17px]">
                  {renderCopy(data.sections.trustCta.paragraph)}
                </p>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {trustFeatureCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[16px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.05)_100%)] px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[linear-gradient(180deg,#0c284f_0%,#091e40_100%)] shadow-[0_0_24px_rgba(113,211,63,0.16)]">
                          <AssetIcon src={card.icon} className="h-8 w-8" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[16px] font-extrabold leading-[1.2] text-white">{card.title}</div>
                          <p className="mt-1 text-[14px] leading-[1.54] text-[#d7e1f0]">{card.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[20px] bg-[linear-gradient(180deg,#061936_0%,#081f45_100%)] px-3 py-3 lg:hidden">
                  <div className="relative mx-auto h-[230px] w-full max-w-[460px]">
                    <div className="absolute bottom-1 left-1/2 h-[52px] w-[86%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,#eff3f8_0%,#d4dae3_58%,#b7bdc7_100%)] shadow-[0_14px_28px_rgba(0,0,0,0.28)]" />
                    <Image
                      src={genericMobileCarCutout}
                      alt={`${data.brand.name} ${data.engine.code} vehicle reference`}
                      fill
                      sizes="(max-width: 768px) 88vw, 520px"
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>

                <p className="mt-4 text-[15px] leading-[1.74] text-[#f1f5fb] sm:text-[16px]">
                  {renderCopy(data.sections.trustCta.note)}
                </p>

                <a
                  href="#quote-form"
                  data-quote-context={data.sections.trustCta.title}
                  data-quote-source="engine-trust-cta"
                  data-quote-engine-code={data.engine.code}
                  className="mt-4 inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#1a9a3f] px-4 py-1 text-center text-[17px] font-semibold text-white shadow-[0_14px_26px_rgba(26,154,63,0.18)] transition hover:bg-[#168739] lg:max-w-[390px]"
                >
                  <span>{data.sections.trustCta.buttonText}</span>
                  <ArrowRightMiniIcon />
                </a>
              </div>

              <div className="relative hidden bg-[radial-gradient(circle_at_center,#f7f8fb_0%,#eef2f7_44%,#e4e9f0_100%)] lg:block">
                <div className="absolute bottom-[46px] left-1/2 h-[88px] w-[86%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,#eff3f8_0%,#d4dae3_58%,#b7bdc7_100%)] shadow-[0_22px_42px_rgba(15,23,42,0.22)]" />
                <Image
                  src={genericMobileCarCutout}
                  alt={`${data.brand.name} ${data.engine.code} vehicle reference`}
                  fill
                  sizes="40vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={data.engine.code} />
      </Suspense>
    </>
  );
}
