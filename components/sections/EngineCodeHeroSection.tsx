"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { EnginePageHeroData } from "@/types/engine-page";

type Props = {
  data: EnginePageHeroData;
};

const heroImageCutoutMap: Record<string, string> = {
  "/images/shared/hero-engines/temporary-diesel-engine.jpeg": "/images/shared/hero-engines/temporary-diesel-engine-cutout.png",
  "/images/shared/hero-engines/temporary-petrol-engine.jpeg": "/images/shared/hero-engines/temporary-petrol-engine-cutout.png",
  "/images/shared/hero-engines/temporary-performance-engine.jpeg": "/images/shared/hero-engines/temporary-performance-engine-cutout.png",
  "/images/shared/hero-engines/aston-martin-aj133-hero.png": "/images/shared/hero-engines/aston-martin-aj133-hero-cutout.png",
};

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m7 4 6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11V8.5a4 4 0 0 1 8 0V11" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 22 14" className="h-[16px] w-[24px] rounded-[3px]" aria-hidden="true">
      <rect width="22" height="14" fill="#012169" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#fff" strokeWidth="3.5" />
      <path d="M0 0 22 14M22 0 0 14" stroke="#C8102E" strokeWidth="2" />
      <path d="M11 0v14M0 7h22" stroke="#fff" strokeWidth="4.5" />
      <path d="M11 0v14M0 7h22" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function getTrustIcon(index: number) {
  if (index === 0) {
    return <WrenchIcon />;
  }
  if (index === 1) {
    return <ShieldIcon />;
  }
  if (index === 2) {
    return <TruckIcon />;
  }
  return <UsersIcon />;
}

function splitHeroTitle(title: string) {
  const marker = "Problems & Compatibility";
  if (!title.includes(marker)) {
    return { before: title, accent: "" };
  }

  const [before] = title.split(marker);
  return {
    before: before.trimEnd(),
    accent: marker,
  };
}

export default function EngineCodeHeroSection({ data }: Props) {
  const title = splitHeroTitle(data.title);
  const desktopTrustBadges = data.trustBadges;
  const mobileTrustBadges = data.trustBadges;
  const cleanedQuoteNote = data.quoteCard.note.replace(/^Secure enquiry\s*-\s*no spam\.?\s*/i, "").trim();
  const heroImageSrc = heroImageCutoutMap[data.engineImage.src] ?? data.engineImage.src;
  const lowerSplitDesktop = "lg:grid-cols-[minmax(0,1fr)_420px]";

  return (
    <Section className="overflow-hidden bg-[radial-gradient(circle_at_top,#f5f8fd_0%,#ffffff_35%,#ffffff_100%)] pb-4 pt-4 sm:pb-6 sm:pt-5 lg:pb-7 lg:pt-5">
      <Container className="!max-w-[1400px]">
        <div className="relative">
          <div className="absolute right-[10%] top-[66px] hidden h-[540px] w-[540px] rounded-full border border-[#ebf0f7] lg:block" />
          <div className="absolute right-[16%] top-[116px] hidden h-[404px] w-[404px] rounded-full border border-[#f1f5fa] lg:block" />
          <div className="absolute right-[21%] top-[166px] hidden h-[286px] w-[286px] rounded-full border border-[#f6f8fc] lg:block" />

          <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.78fr)] lg:items-start xl:gap-5">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb" className="hidden flex-wrap items-center gap-1.5 text-[14px] font-semibold text-[#17803d] sm:text-[15px] lg:flex">
                {data.breadcrumbs.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                    {item.href ? (
                      <Link href={item.href} className="transition hover:text-[#0b2347]">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[#0b2347]">{item.label}</span>
                    )}
                    {index < data.breadcrumbs.length - 1 ? <ChevronRightIcon /> : null}
                  </div>
                ))}
              </nav>

              <div className="mt-3 hidden max-w-full flex-wrap items-center gap-x-4 gap-y-2 rounded-[10px] border border-[#dbe5f2] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0b2347] shadow-[0_6px_18px_rgba(15,23,42,0.035)] sm:mt-4 sm:gap-x-5 sm:text-[14px] lg:inline-flex">
                {data.pills.map((pill, index) => (
                  <div key={`${pill}-${index}`} className="inline-flex items-center gap-3.5">
                    {index > 0 ? <span className="hidden h-1.5 w-1.5 rounded-full bg-[#17803d] sm:inline-flex" /> : null}
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              <h1
                className="mt-0 max-w-[780px] text-[36px] font-black leading-[0.98] tracking-[-0.05em] text-[#0b2347] normal-case sm:text-[48px] lg:mt-5 lg:text-[50px] xl:text-[52px]"
                style={{ fontFamily: '"Urbanist", ui-sans-serif, system-ui, sans-serif' }}
              >
                <span>{title.before}</span>
                {title.accent ? (
                  <>
                    <span className="hidden lg:inline"> {title.accent}</span>
                    <span className="block text-[#17803d] lg:hidden">{title.accent}</span>
                  </>
                ) : null}
              </h1>

              <p className="mt-3.5 max-w-[690px] text-[17px] leading-[1.58] text-[#1f3460] sm:text-[18px] lg:mt-4 lg:max-w-[680px] lg:text-[16px] lg:leading-[1.48]">
                {data.description}
              </p>

              <div className="mt-4 hidden max-w-[810px] grid-cols-4 gap-2.5 lg:grid">
                {desktopTrustBadges.map((badge, index) => (
                  <div
                    key={`${badge}-${index}`}
                    className="flex items-center gap-2.5 rounded-[8px] border border-[#0b2347] bg-[#082553] px-3.5 py-2.5 text-white shadow-none"
                  >
                    <div className="flex flex-none items-center justify-center text-white">
                      {getTrustIcon(index)}
                    </div>
                    <p className="text-[13px] font-semibold leading-[1.2] text-white">
                      {badge}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative ml-auto flex min-h-[250px] w-full max-w-[560px] items-center justify-end sm:min-h-[390px] lg:min-h-[450px] xl:max-w-[590px]">
                <div className="absolute inset-x-[10%] bottom-[11%] h-[44px] rounded-full bg-[#d5deea] blur-[7px]" />
                <Image
                  src={heroImageSrc}
                  alt={data.engineImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-contain object-center lg:origin-right lg:object-right lg:scale-[1.12] xl:scale-[1.15] drop-shadow-[0_22px_34px_rgba(15,23,42,0.12)]"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-1 lg:hidden">
            {mobileTrustBadges.map((badge, index) => (
              <div
                key={`${badge}-mobile-${index}`}
                className="flex min-h-[42px] items-center gap-1 rounded-[6px] border border-[#12325f] bg-[#082553] px-1.5 py-1.5 shadow-[0_7px_16px_rgba(8,37,83,0.14)]"
              >
                <div className="flex h-7 w-7 flex-none items-center justify-center text-white [&_svg]:h-5 [&_svg]:w-5">
                  {getTrustIcon(index)}
                </div>
                <p className="min-w-0 text-[8px] font-semibold leading-[1.08] text-white sm:text-[8.5px]">{badge}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-3">
            <div className="overflow-hidden rounded-[10px] border border-[#dbe5f2] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <div className="divide-y divide-[#e7edf7] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_420px] lg:divide-y-0">
                {data.prices.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={`relative flex items-center justify-between gap-2.5 px-3.5 py-2 lg:min-h-[92px] lg:flex-col lg:justify-center lg:px-6 lg:py-4 lg:text-center ${
                      index < data.prices.length - 1
                        ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-[44px] lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#dbe5f2] lg:after:content-['']"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-baseline gap-1.5 lg:block lg:flex-none">
                      <div className="text-[12px] font-semibold leading-[1.15] text-[#0b2347] lg:text-[15px]">{item.label}</div>
                      <div className="mt-0 text-[19px] font-extrabold tracking-[-0.05em] text-[#17803d] sm:text-[24px] lg:text-[30px]" style={{ fontFamily: '"Urbanist", ui-sans-serif, system-ui, sans-serif' }}>
                        {item.price}
                      </div>
                    </div>
                    <span className="text-[#94a3b8] lg:hidden">
                      <ChevronRightIcon />
                    </span>
                  </div>
                ))}
                <div className="bg-transparent p-0 lg:relative lg:flex lg:h-full lg:items-center lg:bg-white lg:p-1 lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:block lg:before:h-[44px] lg:before:w-px lg:before:-translate-y-1/2 lg:before:bg-[#dbe5f2] lg:before:content-['']">
                  <div className="grid min-h-[50px] w-full grid-cols-[92px_1fr] overflow-hidden rounded-[8px] bg-[#ffcc12] sm:grid-cols-[140px_1fr] lg:min-h-[58px] lg:w-[calc(100%-12px)] lg:mx-auto">
                    <div className="flex items-center gap-2 border-r border-[#d5a800] px-2.5 text-[#0b2347] sm:px-4 lg:px-3.5">
                      <UkFlagIcon />
                      <span className="text-[14px] font-extrabold">{data.quoteCard.countryCode}</span>
                      <ChevronDownIcon />
                    </div>
                    <input
                      type="text"
                      aria-label="Vehicle registration"
                      placeholder={data.quoteCard.placeholder}
                      className="min-w-0 border-0 bg-transparent px-2.5 text-[14px] font-medium text-[#0b2347] outline-none placeholder:text-[#334155] sm:px-4 sm:text-[17px] lg:px-3.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`relative mt-2.5 grid gap-2.5 ${lowerSplitDesktop}`}>
            <div className="order-2 min-h-[82px] rounded-[10px] border border-[#dbe5f2] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5 lg:order-1 lg:flex lg:items-center">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[8px] bg-[#17803d] text-white">
                  <LockIcon />
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-[1.2] text-[#0b2347]">Secure enquiry - no spam.</p>
                  <p className="mt-1 text-[15px] leading-[1.38] text-[#1f3460]">{cleanedQuoteNote}</p>
                </div>
              </div>
            </div>

            <div className="order-1 min-h-[50px] border-0 bg-transparent p-0 shadow-none lg:order-2 lg:flex lg:min-h-[74px] lg:items-center lg:rounded-[10px] lg:border lg:border-[#dbe5f2] lg:bg-white lg:p-1 lg:shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <a
                href="#quote-form"
                data-quote-context={data.quoteCard.heading}
                data-quote-source="engine-hero"
                data-quote-engine-code={data.pills[1] ?? ""}
                className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#0d8d3b] px-3 text-center text-[16px] font-extrabold text-white shadow-[0_14px_30px_rgba(13,141,59,0.2)] transition hover:bg-[#0a7b33] lg:min-h-[50px] lg:w-[calc(100%-12px)] lg:px-4 lg:text-[18px] lg:mx-auto"
              >
                <span>{data.quoteCard.buttonText}</span>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
