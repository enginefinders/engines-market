"use client";

import Image from "next/image";
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

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-9 sm:w-9 lg:!h-[52px] lg:!w-[52px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M23 21v-2a4 4 0 0 0-3-3.87"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-9 sm:w-9 lg:!h-[52px] lg:!w-[52px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-9 sm:w-9 lg:!h-[52px] lg:!w-[52px]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.9" />
      <circle
        cx="18.5"
        cy="17.5"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="m16.8 15.8 3.4 3.4M20.2 15.8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

const cardIconMap: Record<Card["icon"], string> = {
  clipboard: "/icons/supplier-verification.png",
  monitoring: "/icons/quality-monitoring.png",
  warranty: "/icons/compliance.png",
  coverage: "/icons/uk-wide.png",
};

function getCardIcon(
  icon: Card["icon"],
  size: "sm" | "md" | "lg" | "xl" = "md",
) {
  const cls =
    size === "sm"
      ? "h-9 w-9 object-contain"
      : size === "xl"
        ? "h-16 w-16 object-contain"
        : size === "lg"
          ? "h-14 w-14 object-contain"
          : "h-11 w-11 object-contain";
  return (
    <Image
      src={cardIconMap[icon]}
      alt=""
      width={56}
      height={56}
      className={cls}
      aria-hidden="true"
    />
  );
}

function getStatIcon(index: number) {
  if (index === 0) return <UsersIcon />;
  if (index === 1) return <ShieldIcon />;
  return <RemoveIcon />;
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#16a34a] text-white">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m3.2 8.2 3 3 6.6-6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CardCornerAccent({ tone }: { tone: "green" | "blue" }) {
  const accent = tone === "green" ? "bg-[#effaf4]" : "bg-[#edf4ff]";

  return (
    <>
      <span
        className={`pointer-events-none absolute bottom-0 right-0 z-0 h-[120px] w-[180px] opacity-55 ${accent}`}
        style={{ clipPath: "polygon(42% 100%, 100% 0, 100% 100%)" }}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute bottom-0 right-8 z-0 h-[82px] w-[96px] opacity-30 ${accent}`}
        style={{ clipPath: "polygon(58% 100%, 100% 0, 100% 100%)" }}
        aria-hidden="true"
      />
    </>
  );
}

export default function WhyChooseEnginesMarket() {
  return (
    <Section
      id="home-why-use-us"
      className="relative overflow-hidden bg-[#f7fbff] py-7 sm:py-8 lg:py-10"
    >
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[900px] rotate-[23deg] bg-[#edf4ff] opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-48 bottom-24 h-[620px] w-[900px] rotate-[-26deg] bg-[#e9f5ff] opacity-75"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-12%] top-[-24%] h-[420px] w-[760px] rotate-[29deg] border border-white/80 bg-white/45"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-[1400px]">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="section-pill relative mx-auto overflow-hidden border border-white/15 bg-[#061a33]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_8px_20px_rgba(6,26,51,0.22)] backdrop-blur-md">
            <span
              className="pointer-events-none absolute -right-2 top-[-12px] h-12 w-20 rotate-[28deg] bg-white/10"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute bottom-[-16px] left-8 h-8 w-16 rotate-[-24deg] bg-[#19d67a]/15"
              aria-hidden="true"
            />
            <span
              className="relative z-10 h-2.5 w-2.5 rounded-full bg-[#19d67a]"
              aria-hidden="true"
            />
            <span className="relative z-10">Why Use EnginesMarket</span>
          </div>

          <h2 className="mx-auto mt-5 max-w-[980px] font-['Manrope'] text-[38px] font-bold uppercase leading-[0.98] text-[#0d1b2e] sm:text-[48px] lg:text-[58px]">
            <span>How We </span>
            <span className="text-[#15805f]">Vet UK Engine Specialists</span>
            <span> - And Why It Matters</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[1150px] text-[16px] leading-[1.55] text-[#475569] sm:text-[18px]">
            EnginesMarket connects you with vetted UK engine specialists - we
            are not a supplier, garage, or engine builder. Every specialist in
            our network has passed our verification criteria, and we actively
            monitor and remove suppliers who do not meet the standard.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <article
              key={card.id}
              className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[15px] border border-[#d8e2ed] bg-white/95 p-4 shadow-[0_8px_24px_rgba(13,27,46,0.08)] ${index % 2 === 0 ? "border-t-[3px] border-t-[#20b96b]" : "border-t-[3px] border-t-[#1597c9]"}`}
            >
              <CardCornerAccent tone={index % 2 === 0 ? "green" : "blue"} />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3 sm:hidden">
                  <div className="flex flex-none items-center justify-center">
                    {getCardIcon(card.icon, "lg")}
                  </div>
                  <h3 className="min-w-0 font-['Manrope'] !text-[22px] font-bold uppercase leading-[0.98] text-[#0d1b2e]">
                    {card.title}
                  </h3>
                </div>

                <div className="hidden items-center gap-3 sm:flex">
                  <div className="flex flex-none items-center justify-center">
                    {getCardIcon(card.icon, "xl")}
                  </div>
                  <h3 className="min-w-0 font-['Manrope'] !text-[20px] font-bold uppercase leading-[1.05] text-[#0d1b2e]">
                    {card.title}
                  </h3>
                </div>

                <ul className="mt-2 space-y-2 sm:mt-1 sm:space-y-2">
                  {card.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[14px] leading-[1.42] text-[#526174] sm:text-[14px]"
                    >
                      <CheckIcon />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-5 overflow-hidden rounded-[17px] border border-[#37658e] bg-[#0d2848] px-3 py-4 text-white shadow-[0_12px_30px_rgba(13,27,46,0.2)] sm:px-8 sm:py-6 lg:px-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),transparent_34%,rgba(255,255,255,0.04)_66%,transparent_67%)]"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-3 gap-2 sm:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex min-w-0 flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-4 ${index < stats.length - 1 ? "border-r border-white/20 sm:border-r sm:border-white/25 sm:pr-8" : ""} ${index > 0 ? "sm:pl-8" : ""}`}
              >
                <div className="text-[#19e38b]">{getStatIcon(index)}</div>
                <div className="min-w-0 text-center sm:text-left">
                  <p className="text-[13px] font-extrabold leading-none text-white sm:text-[14px] lg:!text-[20px]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[9px] leading-[1.25] text-white/85 sm:mt-2 sm:text-[14px] sm:leading-[1.35] lg:!text-[11px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-[14px] leading-[1.7] text-[#64748b]">
          Had a negative experience with a supplier you found through
          EnginesMarket?{" "}
          <a
            href="mailto:ef2crm@gmail.com?subject=Supplier%20complaint%20or%20review"
            className="font-semibold text-[#15803d] underline underline-offset-2"
          >
            Submit a supplier complaint or review -
          </a>
        </p>

        <div className="mt-6 rounded-[16px] border border-[#d8e2ed] bg-white/90 p-5 shadow-[0_5px_18px_rgba(13,27,46,0.05)] sm:p-6">
          <div className="">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0d1b2e]">
              Who We Are?
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[#526174] sm:text-[16px]">
              EnginesMarket is an engine replacement marketplace and comparison
              platform - not a supplier, garage, engine builder, or parts
              retailer. We do not supply, build, or fit engines. We connect
              vehicle owners with independent UK engine specialists who have met
              our network&apos;s vetting criteria. Quotes received through
              EnginesMarket are provided directly by those specialists.
              EnginesMarket is not party to any contract between you and a
              supplier.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
