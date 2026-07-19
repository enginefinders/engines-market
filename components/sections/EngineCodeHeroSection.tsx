"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { EnginePageHeroData } from "@/types/engine-page";

type Props = {
  data: EnginePageHeroData;
};

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m7 4 6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
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
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UkFlagIcon() {
  return (
    <svg viewBox="0 0 22 14" className="h-[15px] w-[22px] rounded-[2px]" aria-hidden="true">
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

function getPriceToneClasses(tone: EnginePageHeroData["prices"][number]["tone"]) {
  if (tone === "reconditioned") {
    return {
      label: "text-[#16a34a]",
      price: "text-[#0b2347]",
    };
  }

  if (tone === "rebuilt") {
    return {
      label: "text-[#f59e0b]",
      price: "text-[#0b2347]",
    };
  }

  return {
    label: "text-[#2563eb]",
    price: "text-[#0b2347]",
  };
}

export default function EngineCodeHeroSection({ data }: Props) {
  return (
    <Section className="overflow-hidden bg-[radial-gradient(circle_at_top,#eef5ff_0%,#ffffff_38%,#f4fbf5_100%)] pt-4 sm:pt-5 lg:pt-6">
      <Container className="max-w-[1400px] px-4 sm:px-6">
        <div className="relative">
          <div className="absolute right-[-8%] top-[72px] hidden h-[680px] w-[680px] rounded-full border border-[#dfe8f4] lg:block" />
          <div className="absolute right-[0%] top-[108px] hidden h-[560px] w-[560px] rounded-full border border-[#e9eff8] lg:block" />
          <div className="absolute right-[8%] top-[144px] hidden h-[440px] w-[440px] rounded-full border border-[#eef3fa] lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:items-start">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14px] font-semibold text-[#1d4ed8] sm:text-[15px]">
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

              <div className="mt-6 flex flex-wrap gap-3">
                {data.pills.map((pill, index) => (
                  <span
                    key={`${pill}-${index}`}
                    className={`inline-flex min-h-[38px] items-center rounded-full border px-4 text-[13px] font-semibold ${
                      index === 0
                        ? "border-[#0b2347] bg-[#0b2347] text-white"
                        : "border-[#dbe5f2] bg-white text-[#173660]"
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <h1 className="mt-8 max-w-[760px] font-['Manrope'] text-[42px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#0b2347] sm:text-[56px] lg:text-[70px]">
                {data.title}
              </h1>

              <p className="mt-6 max-w-[740px] text-[18px] leading-[1.75] text-[#516581] sm:text-[19px]">
                {data.description}
              </p>

              <div className="mt-8 rounded-[22px] border border-[#dbe5f2] bg-white px-5 py-5 shadow-[0_14px_32px_rgba(15,23,42,0.06)] sm:px-7">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {data.trustBadges.map((badge, index) => (
                    <div
                      key={`${badge}-${index}`}
                      className="flex items-center gap-3 text-[#17803d] xl:border-r xl:border-[#e6edf7] xl:pr-4 xl:last:border-r-0 xl:last:pr-0"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-[#edf9f0]">
                        {getTrustIcon(index)}
                      </div>
                      <p className="text-[15px] font-semibold leading-[1.35] text-[#0f274d]">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-[#dbe5f2] bg-[linear-gradient(180deg,#ffffff_0%,#fbfefd_100%)] px-5 py-6 shadow-[0_16px_36px_rgba(15,23,42,0.06)] sm:px-7 sm:py-7">
                <div className="grid gap-6 sm:grid-cols-3 sm:gap-0">
                  {data.prices.map((item, index) => {
                    const tone = getPriceToneClasses(item.tone);
                    return (
                      <div
                        key={`${item.label}-${index}`}
                        className="sm:px-5 sm:first:pl-0 sm:last:pr-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-[#e5edf7]"
                      >
                        <div className={`text-[14px] font-extrabold uppercase tracking-[0.02em] ${tone.label}`}>{item.label}</div>
                        <div className={`mt-2 font-['Manrope'] text-[34px] font-extrabold tracking-[-0.04em] ${tone.price}`}>
                          {item.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {data.priceNote ? <p className="mt-6 text-[15px] text-[#6b7f99]">{data.priceNote}</p> : null}
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto flex min-h-[260px] w-full max-w-[700px] items-center justify-center sm:min-h-[360px] lg:min-h-[540px]">
                <div className="absolute left-[10%] top-[12%] hidden rounded-full border border-[#cfe9d8] bg-white/90 px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#17803d] lg:inline-flex">
                  Reconditioned from GBP3,200
                </div>
                <div className="absolute inset-x-10 bottom-6 h-10 rounded-full bg-[#dce7f4] blur-2xl" />
                <Image
                  src={data.engineImage.src}
                  alt={data.engineImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-contain object-center drop-shadow-[0_28px_44px_rgba(15,23,42,0.16)]"
                />
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(160deg,#081f47_0%,#0d2a57_65%,#123a27_100%)] p-5 text-white shadow-[0_24px_50px_rgba(8,31,71,0.22)] sm:p-7">
                <h2 className="font-['Manrope'] text-[34px] font-extrabold tracking-[-0.04em] text-white sm:text-[38px] lg:text-[42px]">
                  {data.quoteCard.heading}
                </h2>
                <p className="mt-2 text-[17px] leading-[1.65] text-[#d7e1f0]">{data.quoteCard.subtitle}</p>

                <div className="mt-7 overflow-hidden rounded-[16px] border border-[#d6e1ef] bg-white">
                  <div className="grid min-h-[64px] grid-cols-[108px_1fr]">
                    <div className="flex items-center gap-3 border-r border-[#dbe5f2] px-4 text-[#0b2347]">
                      <UkFlagIcon />
                      <span className="text-[17px] font-bold">{data.quoteCard.countryCode}</span>
                    </div>
                    <input
                      type="text"
                      aria-label="Vehicle registration"
                      placeholder={data.quoteCard.placeholder}
                      className="min-w-0 border-0 px-4 text-[17px] text-[#0b2347] outline-none placeholder:text-[#90a0b6]"
                    />
                  </div>
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={data.quoteCard.heading}
                  data-quote-source="engine-hero"
                  data-quote-engine-code={data.pills[1] ?? ""}
                  className="mt-5 inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-[14px] bg-[#1da23f] px-6 text-center text-[18px] font-extrabold text-white shadow-[0_16px_30px_rgba(29,162,63,0.28)] transition hover:bg-[#198a36]"
                >
                  <span>{data.quoteCard.buttonText}</span>
                  <ArrowIcon />
                </a>

                <div className="mt-6 flex items-start gap-3 text-[15px] leading-[1.65] text-[#d7e1f0]">
                  <span className="mt-1 text-white">
                    <LockIcon />
                  </span>
                  <p>{data.quoteCard.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
