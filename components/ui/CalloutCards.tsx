import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type CtaStripProps = {
  tone: "light" | "dark";
  label?: string;
  title: string;
  description: string;
  buttonText: string;
  icon?: ReactNode;
  linkProps?: LinkProps;
  secondaryAction?: ReactNode;
  titleAs?: "div" | "h2" | "h3";
  descriptionAs?: "p" | "h3" | "div";
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
};

type RecommendationCardProps = {
  label?: string;
  title?: string;
  body: string;
  chips?: string[];
  ctaText?: string;
  linkProps?: LinkProps;
};

type WarningCardProps = {
  label?: string;
  title: string;
  body: string;
  chips?: string[];
  ctaText?: string;
  linkProps?: LinkProps;
};

type AdviceCardProps = {
  tone: "light" | "dark";
  label?: string;
  title: string;
  body: string;
  chips?: string[];
  ctaText?: string;
  linkProps?: LinkProps;
};

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function AdviceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChipRow({
  chips,
  tone,
}: {
  chips: string[];
  tone: "light" | "dark" | "warning" | "recommendation";
}) {
  if (!chips.length) return null;

  const chipClass =
    tone === "dark"
      ? "border-white/12 bg-white/8 text-white/85"
      : tone === "warning"
        ? "border-[#f8d8ab] bg-[#fff7ea] text-[#b45309]"
        : tone === "recommendation"
          ? "border-[#dbe4ef] bg-[#f8fbff] text-[#0d1b2e]"
          : "border-[#d9ebf8] bg-[#f8fbff] text-[#0d1b2e]";

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none ${chipClass}`}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

export function CtaStrip({
  tone,
  label,
  title,
  description,
  buttonText,
  icon,
  linkProps,
  secondaryAction,
  titleAs: TitleTag = "div",
  descriptionAs: DescriptionTag = "p",
  titleClassName,
  descriptionClassName,
  buttonClassName,
}: CtaStripProps) {
  const light = tone === "light";
  const outerClass = light
    ? "border border-[#0d1b2e] bg-white shadow-[0_10px_28px_rgba(13,27,46,0.06)]"
    : "border border-[#12294a] bg-[#0d1b2e] shadow-[0_18px_38px_rgba(7,25,54,0.18)]";
  const iconWrapClass = light ? "bg-[#f5f8fc] text-[#0d1b2e]" : "bg-white/10 text-white";
  const labelClass = light ? "text-[#64748b]" : "text-white/72";
  const titleClass = light ? "text-[#0d1b2e]" : "text-white";
  const bodyClass = light ? "text-[#475569]" : "text-slate-200";
  const buttonClass = light
    ? "bg-[#0d1b2e] text-white hover:bg-[#16304e]"
    : "bg-[#16a34a] text-white hover:bg-[#15803d]";

  return (
    <div className={`rounded-[14px] px-4 py-4 ${outerClass}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${iconWrapClass}`}>
            {icon ?? <ShieldIcon />}
          </div>
          <div className="min-w-0">
            {label ? (
              <div className={`text-[10px] font-extrabold uppercase tracking-[0.12em] ${labelClass}`}>{label}</div>
            ) : null}
            <TitleTag className={`mt-1 text-[13px] font-extrabold leading-[1.35] ${titleClass} ${titleClassName ?? ""}`}>{title}</TitleTag>
            <DescriptionTag className={`mt-1 text-[12px] leading-[1.6] ${bodyClass} ${descriptionClassName ?? ""}`}>{description}</DescriptionTag>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <a
            href={linkProps?.href ?? "#quote-form"}
            {...linkProps}
            className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] px-5 text-[12px] font-bold transition ${buttonClass} ${buttonClassName ?? ""} ${linkProps?.className ?? ""}`}
          >
            <span>{buttonText}</span>
            <ArrowIcon className="h-[13px] w-[13px]" />
          </a>
          {secondaryAction}
        </div>
      </div>
    </div>
  );
}

export function RecommendationCard({
  label = "Our Recommendation",
  title,
  body,
  chips = [],
  ctaText,
  linkProps,
}: RecommendationCardProps) {
  return (
    <div className="rounded-[14px] border border-[#0d1b2e] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(13,27,46,0.06)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#f5f8fc] text-[#0d1b2e]">
            <ShieldIcon />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#64748b]">{label}</div>
            {title ? <div className="mt-1 text-[13px] font-extrabold leading-[1.35] text-[#0d1b2e]">{title}</div> : null}
            <p className="mt-1 text-[12px] leading-[1.65] text-[#475569]">{body}</p>
            <ChipRow chips={chips} tone="recommendation" />
          </div>
        </div>

        {ctaText ? (
          <a
            href={linkProps?.href ?? "#quote-form"}
            {...linkProps}
            className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] border border-[#0d1b2e] bg-white px-4 text-[11px] font-bold text-[#0d1b2e] transition hover:bg-[#f8fbff] md:min-w-[220px] ${linkProps?.className ?? ""}`}
          >
            <span>{ctaText}</span>
            <ArrowIcon className="h-[12px] w-[12px]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function WarningCard({
  label = "Important Advice",
  title,
  body,
  chips = [],
  ctaText,
  linkProps,
}: WarningCardProps) {
  return (
    <div className="rounded-[14px] border border-[#f6d4a8] bg-[linear-gradient(180deg,#fffaf2_0%,#fff5e9_100%)] px-4 py-4 shadow-[0_8px_20px_rgba(217,119,6,0.07)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#fff1d8] text-[#f59e0b]">
            <WarningIcon />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#d97706]">{label}</div>
            <div className="mt-1 text-[13px] font-extrabold leading-[1.35] text-[#92400e]">{title}</div>
            <p className="mt-1 text-[12px] leading-[1.65] text-[#9a3412]">{body}</p>
            <ChipRow chips={chips} tone="warning" />
          </div>
        </div>

        {ctaText ? (
          <a
            href={linkProps?.href ?? "#quote-form"}
            {...linkProps}
            className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] border border-[#f1c88b] bg-white px-4 text-[11px] font-bold text-[#b45309] transition hover:bg-[#fff8ee] md:min-w-[220px] ${linkProps?.className ?? ""}`}
          >
            <span>{ctaText}</span>
            <ArrowIcon className="h-[12px] w-[12px]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function AdviceCard({
  tone,
  label = "Expert Recommendation",
  title,
  body,
  chips = [],
  ctaText,
  linkProps,
}: AdviceCardProps) {
  const dark = tone === "dark";

  return (
    <div
      className={`rounded-[14px] px-4 py-4 ${
        dark
          ? "border border-[#12294a] bg-[#0d1b2e] shadow-[0_18px_38px_rgba(7,25,54,0.18)]"
          : "border border-[#0d1b2e] bg-white shadow-[0_10px_24px_rgba(13,27,46,0.06)]"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-full ${
              dark ? "bg-white/10 text-white" : "bg-[#f5f8fc] text-[#0d1b2e]"
            }`}
          >
            <AdviceIcon />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-extrabold uppercase tracking-[0.12em] ${dark ? "text-white/72" : "text-[#64748b]"}`}>
              {label}
            </div>
            <div className={`mt-1 text-[13px] font-extrabold leading-[1.35] ${dark ? "text-white" : "text-[#0d1b2e]"}`}>
              {title}
            </div>
            <p className={`mt-1 text-[12px] leading-[1.65] ${dark ? "text-slate-200" : "text-[#475569]"}`}>{body}</p>
            <ChipRow chips={chips} tone={dark ? "dark" : "light"} />
          </div>
        </div>

        {ctaText ? (
          <a
            href={linkProps?.href ?? "#quote-form"}
            {...linkProps}
            className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] px-4 text-[11px] font-bold transition md:min-w-[220px] ${
              dark
                ? `bg-[#16a34a] text-white hover:bg-[#15803d] ${linkProps?.className ?? ""}`
                : `border border-[#0d1b2e] bg-white text-[#0d1b2e] hover:bg-[#f8fbff] ${linkProps?.className ?? ""}`
            }`}
          >
            <span>{ctaText}</span>
            <ArrowIcon className="h-[12px] w-[12px]" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
