"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Card = {
  id: string;
  title: string;
  bullets: string[];
  icon: "clipboard" | "monitoring" | "warranty" | "coverage";
};

type Stat = {
  value: string;
  label: string;
};

const cards: Card[] = [
  {
    id: "verification",
    title: "Supplier Verification Standards",
    icon: "clipboard",
    bullets: [
      "Verified UK business address and active trading history - minimum 12 months operation",
      "Warranty compliance confirmed - all network suppliers must offer a minimum 12-month unlimited mileage warranty",
      "Engine compatibility process checked - suppliers must demonstrate structured DVLA/engine-code matching capability before joining the network",
    ],
  },
  {
    id: "monitoring",
    title: "Ongoing Quality Monitoring",
    icon: "monitoring",
    bullets: [
      "Customer feedback reviewed after every quote interaction - ratings and complaints tracked per supplier",
      "Suppliers with repeat complaints or unresolved disputes are placed under review",
      "Underperforming suppliers are removed from the network - we have removed suppliers based on sustained negative feedback from EnginesMarket users",
    ],
  },
  {
    id: "warranty",
    title: "Warranty Compliance",
    icon: "warranty",
    bullets: [
      "Every supplier in our network must offer a minimum 12-month unlimited mileage warranty as standard",
      "Many network specialists offer 24-month warranty on reconditioned and rebuilt units",
      "Warranty terms - including what is and is not covered - must be provided in writing with every quote",
    ],
  },
  {
    id: "coverage",
    title: "UK-Wide Specialist Coverage",
    icon: "coverage",
    bullets: [
      "100+ vetted specialists across the UK - covering all major makes, engine types and regions",
      "Network includes independent specialists, engine rebuilders, and supply & fit centres",
      "Nationwide delivery available for supply-only orders - most engines dispatched within 2-3 working days of order confirmation",
    ],
  },
];

const stats: Stat[] = [
  { value: "100+", label: "Vetted Specialists" },
  { value: "12-Month", label: "Warranty Minimum Standard" },
  { value: "Removed", label: "Suppliers For Poor Feedback" },
];

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <rect x="12" y="8" width="24" height="32" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="18" y="5" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m29.5 31.2 2.2 2.1 4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitoringIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M9 35V23h6v12M21 35V15h6v20M33 35V9h6v26" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="34.5" cy="18.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m38.5 22.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WarrantyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M24 6 37 11v9c0 8-5 13-13 17-8-4-13-9-13-17v-9L24 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 21h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 17v8M24 17v8M30 17v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CoverageIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none" aria-hidden="true">
      <path d="M22 5c3 2 4 5 4 8s-1 5-3 7c2 1 3 3 3 5 0 3-2 6-5 8 1 2 1 4 0 7-4-2-8-5-10-10 0-4 2-7 5-10-2-2-3-5-2-8 1-4 4-6 8-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="28" cy="12" r="1.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="22" r="1.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="29" cy="28" r="1.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="34" r="1.7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="18.5" cy="17.5" r="4.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="m16.8 15.8 3.4 3.4M20.2 15.8l-3.4 3.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getCardIcon(icon: Card["icon"]) {
  if (icon === "clipboard") return <ClipboardIcon />;
  if (icon === "monitoring") return <MonitoringIcon />;
  if (icon === "warranty") return <WarrantyIcon />;
  return <CoverageIcon />;
}

function getStatIcon(index: number) {
  if (index === 0) return <UsersIcon />;
  if (index === 1) return <ShieldIcon />;
  return <RemoveIcon />;
}

export default function HomeWhyUseUsSection() {
  return (
    <Section className="bg-[#f7f8fb] py-7 sm:py-8 lg:py-10">
      <Container className="max-w-[1200px]">
        <div id="home-why-use-us">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="section-pill mx-auto">
            <span>Why Use EnginesMarket</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[28px] font-bold leading-[1.12] text-[#0d1b2e] sm:text-[32px] lg:text-[36px]">
            <span>How We </span>
            <span className="text-[#15803d]">Vet UK Engine Specialists</span>
            <span> - And Why It Matters</span>
          </h2>

          <p className="mx-auto mt-4 \\ text-[16px] leading-[1.7] text-[#6b7280]">
            EnginesMarket connects you with vetted UK engine specialists - we are not a supplier, garage, or engine builder. Every specialist in our network has passed our verification criteria, and we actively monitor and remove suppliers who do not meet the standard.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-[10px] border border-[#e5e7eb] bg-white p-4 shadow-[0_2px_10px_rgba(13,27,46,0.05)]"
            >
                            {/* Wrap icon and title in a flex container to align them side-by-side */}
              <div className="flex items-center gap-2">
                <div className="text-[#0d1b2e] flex-shrink-0">{getCardIcon(card.icon)}</div>
                <h3 className="font-['Manrope'] text-[18px] font-semibold leading-[1.2] text-[#0d1b2e]"
                style={{ fontSize: '24px' }}
                >
                  {card.title}
                </h3>
              </div>

              <ul className="mt-4 space-y-4">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-[13px] leading-[1.65] text-[#6b7280] sm:text-[14px]">
                    <span className="mt-[8px] h-1 w-1 flex-none bg-[#0d1b2e]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-[12px] bg-[#0d1b2e] px-5 py-5 text-white shadow-[0_12px_28px_rgba(13,27,46,0.18)] sm:px-6 sm:py-6">
          <div className="grid gap-4 sm:gap-0 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-4 ${index < stats.length - 1 ? "lg:border-r lg:border-white/15 lg:pr-6" : ""} ${index > 0 ? "lg:pl-6" : ""}`}
              >
                <div className="text-[#86efac]">{getStatIcon(index)}</div>
                <div className="min-w-0">
                  <p className="text-[24px] font-black leading-none text-white">{stat.value}</p>
                  <p className="mt-1 text-[13px] leading-[1.4] text-white/70">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-left text-[14px] leading-[1.7] text-[#6b7280] md:text-center">
          Had a negative experience with a supplier you found through EnginesMarket?{" "}
          <a
            href="mailto:ef2crm@gmail.com?subject=Supplier%20complaint%20or%20review"
            className="font-semibold text-[#15803d] underline underline-offset-2"
          >
            Submit a supplier complaint or review -
          </a>
        </p>

        {/* <div className="mt-5 flex justify-center">
          <a
            href="mailto:ef2crm@gmail.com?subject=How%20do%20you%20vet%20your%20supplier%20network%3F"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[8px] border border-[#0d1b2e] bg-white px-5 text-[14px] font-semibold text-[#0d1b2e] transition hover:bg-[#f8fbff] sm:w-auto sm:min-w-[310px]"
          >
            See how we vet our supplier network -
          </a>
        </div> */}
<div className="border-t border-[#eef2f7]  px-4 py-5 sm:px-6 sm:py-6">
                            <div className="rounded-[16px] border border-[#dfe6ef] bg-[#f8fbff] p-4 sm:p-5">
                                <div className="flex flex-col gap-4 border-l-4 border-[#0d1b2e] pl-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="max-w-6xl">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">Who We Are?</p>
                                        <p className="mt-2 text-[14px] leading-[1.7] text-[#475569] sm:text-[15px]">
                                           EnginesMarket is an engine replacement marketplace and comparison platform - not a supplier, garage, engine builder, or parts retailer. We do not supply, build, or fit engines. We connect vehicle owners with independent UK engine specialists who have met our network&apos;s vetting criteria. Quotes received through EnginesMarket are provided directly by those specialists. EnginesMarket is not party to any contract between you and a supplier.
                                        </p>
                                    </div>

                                    {/* <a
                                        href="#home-hero-reg-form"
                                        data-quote-context="FAQ footer CTA"
                                        data-quote-source="home-faq-footer-cta"
                                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0d1b2e] px-5 text-[14px] font-semibold text-white transition hover:bg-[#11284a] sm:w-auto sm:min-w-[250px]"
                                    >
                                        <span>Get Free Engine Quotes</span>
                                        <ArrowIcon />
                                    </a> */}
                                </div>
                            </div>
                        </div>
        {/* <div className="mx-auto mt-6 max-w-[72ch] border-t border-[#e5e7eb] pt-5 text-center text-[14px] leading-[1.7] text-[#6b7280] sm:text-[12px]">
          EnginesMarket is an engine replacement marketplace and comparison platform - not a supplier, garage, engine builder, or parts retailer. We do not supply, build, or fit engines. We connect vehicle owners with independent UK engine specialists who have met our network&apos;s vetting criteria. Quotes received through EnginesMarket are provided directly by those specialists. EnginesMarket is not party to any contract between you and a supplier.
        </div> */}
        </div>
      </Container>
    </Section>
  );
}
