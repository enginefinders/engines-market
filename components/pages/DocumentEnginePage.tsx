import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import EngineCodeHeroSection from "@/components/sections/EngineCodeHeroSection";
import FaqSection from "@/components/sections/FaqSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import type { EnginePageData } from "@/types/engine-page";

type DocumentEnginePageProps = {
  data: EnginePageData;
};

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="max-w-[840px]">
      <div className="inline-flex items-center rounded-full bg-[#eaf8ee] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.04em] text-[#17803d]">
        {tag}
      </div>
      <h2 className="mt-3 font-['Manrope'] text-[34px] font-extrabold tracking-[-0.04em] text-[#0b2347] sm:text-[42px]">
        {title}
      </h2>
    </div>
  );
}

function QuoteLink({ text, context, code }: { text: string; context: string; code: string }) {
  return (
    <a
      href="#quote-form"
      data-quote-context={context}
      data-quote-source="engine-page-section"
      data-quote-engine-code={code}
      className="inline-flex items-center gap-2 text-[15px] font-extrabold text-[#0b2347] transition hover:text-[#17803d]"
    >
      {text}
      <span aria-hidden="true">-&gt;</span>
    </a>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-3 border-t border-[#e7eef8] px-5 py-4 first:border-t-0 sm:grid-cols-[230px_1fr] sm:px-6">
      <div className="text-[14px] font-bold uppercase tracking-[0.04em] text-[#173660]">{label}</div>
      <div className="text-[16px] leading-[1.75] text-[#173660]">{value}</div>
    </div>
  );
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

const whyItMatters = [
  "One of BMW's highest-demand diesel engines in the UK replacement market.",
  "Strong specialist support thanks to wide fitment across 1, 2, 3, 4, 5 Series plus X1 and X3.",
  "Timing chain history is the key buying factor, which is why recon and rebuilt units command the premium.",
  "Good torque and economy when healthy, but rear-chain labour makes repair decisions cost-sensitive.",
];

const fitmentSignals = [
  "11 BMW model lines covered",
  "Best-known fits: 320d, 520d and X1 20d",
  "Registration check confirms the exact suffix before quoting",
];

const conditionAccentMap: Record<string, string> = {
  Used: "bg-[#eef4ff] text-[#2563eb]",
  Reconditioned: "bg-[#edf9f0] text-[#17803d]",
  Rebuilt: "bg-[#fff6ea] text-[#d97706]",
};

const problemAccentMap = [
  {
    border: "border-[#e23a3a]",
    pill: "bg-[#fff1f1] text-[#d62828]",
    label: "text-[#d62828]",
  },
  {
    border: "border-[#ee8a1f]",
    pill: "bg-[#fff5ea] text-[#d97706]",
    label: "text-[#d97706]",
  },
  {
    border: "border-[#1a9a4b]",
    pill: "bg-[#edf9f0] text-[#17803d]",
    label: "text-[#17803d]",
  },
];

export default function DocumentEnginePage({ data }: DocumentEnginePageProps) {
  const commonFailure = data.sections.specs.specs.find((item) => item.label === "Most Common Failure")?.value;
  const faqData = {
    tag: data.sections.faq.tag,
    h2: data.sections.faq.title,
    intro: `Straight answers on ${data.engine.code} pricing, fitment, timing chain risk and the best replacement option for your BMW.`,
    defaultOpenIndex: 0,
    items: data.sections.faq.items.map((item) => ({
      question: item.question,
      answer: item.answer,
      keyPoints: item.bullets,
      cta: item.cta ?? `Compare ${data.engine.code} quotes`,
    })),
  };

  return (
    <>
      {data.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
        />
      ) : null}

      <EngineCodeHeroSection data={data.sections.hero} />

      <Section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fcf8_100%)]">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="bg-[radial-gradient(circle_at_top_right,#eef7ff_0%,#ffffff_38%,#f4fbf5_100%)] py-2 sm:py-4">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_420px]">
              <div>
                <SectionHeading tag={data.sections.specs.tag} title={data.sections.specs.title} />
                <p className="mt-5 max-w-[760px] text-[18px] leading-[1.8] text-[#516581]">
                  Everything you need to know about the {data.engine.code} - performance, fitment, reliability and replacement data from across the UK.
                </p>

                <div className="mt-8 overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  {data.sections.specs.specs.map((item) => (
                    <StatRow key={item.label} label={item.label} value={item.value} />
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="relative overflow-hidden rounded-[28px] border border-[#dbe5f2] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f7fbff_64%,#edf8ef_100%)] px-6 py-8">
                  <div className="absolute inset-y-6 left-6 right-6 rounded-full border border-[#e5edf8]" />
                  <div className="absolute inset-x-10 inset-y-12 rounded-full border border-[#edf3fa]" />
                  <div className="relative z-[1] mx-auto mb-4 inline-flex rounded-full bg-[#eaf8ee] px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#17803d]">
                    Most requested BMW diesel replacement
                  </div>
                  <div className="relative mx-auto aspect-[1/1] w-full max-w-[300px]">
                    <Image
                      src={data.sections.hero.engineImage.src}
                      alt={data.sections.hero.engineImage.alt}
                      fill
                      className="object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.16)]"
                      sizes="(max-width: 1024px) 300px, 360px"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[112px_1fr] gap-4 rounded-[24px] border border-[#dbe5f2] bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f4fbf6_100%)]">
                    <Image
                      src="/images/shared/hero-engines/temporary-performance-engine.jpeg"
                      alt="Secondary BMW engine reference"
                      fill
                      className="object-contain p-2"
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#17803d]">Quick Market Read</div>
                    <p className="mt-2 text-[15px] leading-[1.7] text-[#516581]">
                      The N47D20C sits at the center of the UK BMW diesel replacement market, so pricing is competitive but documentation matters.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-[#0f315c] bg-[linear-gradient(160deg,#081f47_0%,#0d2a57_68%,#113522_100%)] shadow-[0_18px_36px_rgba(8,31,71,0.18)]">
                  <div className="border-b border-white/10 px-6 py-5 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[#6fd48e]">
                    Why It Matters
                  </div>
                  <div className="grid divide-y divide-white/10">
                    {whyItMatters.map((item, index) => (
                      <div key={index} className="px-6 py-5 text-[16px] leading-[1.75] text-[#d7e1f0]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f6fbf7_100%)]">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              <div>
                <SectionHeading tag={data.sections.compatibility.tag} title={data.sections.compatibility.title} />
                <p className="mt-5 max-w-[900px] text-[17px] leading-[1.85] text-[#516581]">{data.sections.compatibility.intro}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {fitmentSignals.map((item) => (
                    <span key={item} className="inline-flex rounded-full border border-[#cfe9d8] bg-[#f2fbf4] px-4 py-2 text-[14px] font-semibold text-[#17803d]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="relative mx-auto aspect-[1.7/1] w-full max-w-[350px] overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f5f9fe_60%,#edf8ef_100%)]">
                  <Image
                    src="/images/brands/bmw/models/bmw-3-series-model-card.png"
                    alt="BMW 3 Series using the N47D20C engine"
                    fill
                    className="object-contain p-4"
                    sizes="350px"
                  />
                </div>

                <div className="grid grid-cols-[110px_1fr] gap-4 rounded-[22px] border border-[#dbe5f2] bg-[#fbfefd] p-4">
                  <div className="relative aspect-square overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f3faf5_100%)]">
                    <Image
                      src="/images/shared/hero-engines/temporary-performance-engine.jpeg"
                      alt="N47D20C fitment reference"
                      fill
                      className="object-contain p-2"
                      sizes="110px"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#17803d]">Fitment Snapshot</div>
                    <p className="mt-2 text-[15px] leading-[1.7] text-[#516581]">
                      From late E-series cars through F-series 20d models, this is one of the broadest-fit four-cylinder BMW diesel engine codes in the current site.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#081f47] text-left text-white">
                    <tr>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em]">Model</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em]">Generation / Chassis</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em]">Badge(s)</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em]">Years</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em]">Quick Links</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.sections.compatibility.rows.map((row, index) => (
                      <tr key={`${row.model}-${row.generation}-${index}`} className="border-t border-[#e7eef8] align-top">
                        <td className="px-5 py-4 text-[15px] font-bold text-[#0b2347]">
                          <div className="flex items-center gap-3">
                            <div className="relative h-[44px] w-[58px] flex-none overflow-hidden rounded-[12px] border border-[#e7eef8] bg-[radial-gradient(circle_at_center,#ffffff_0%,#f6f9fd_100%)]">
                              <Image
                                src={modelImageMap[row.model] ?? "/images/brands/bmw/models/bmw-3-series-model-card.png"}
                                alt={row.model}
                                fill
                                className="object-contain p-1.5"
                                sizes="58px"
                              />
                            </div>
                            <span>{row.model}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[15px] text-[#173660]">{row.generation}</td>
                        <td className="px-5 py-4 text-[15px] text-[#173660]">{row.badges}</td>
                        <td className="px-5 py-4 text-[15px] text-[#173660]">
                          <span className="inline-flex rounded-full bg-[#edf9f0] px-4 py-1.5 font-semibold text-[#17803d]">
                            {row.years}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[15px] text-[#1d4ed8]">
                          <div className="flex flex-wrap gap-x-3 gap-y-1">
                            {row.links.map((link) => (
                              <Link key={link.label} href={link.href} className="font-semibold hover:text-[#17803d]">
                                {link.label} <span aria-hidden="true">&gt;</span>
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

            <div className="mt-6 flex flex-col gap-4 rounded-[24px] border border-[#cfe9d8] bg-[linear-gradient(135deg,#fbfefd_0%,#f1faf4_100%)] px-5 py-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <div className="text-[22px] font-extrabold tracking-[-0.03em] text-[#0b2347]">Not sure which engine your car has?</div>
                <p className="mt-2 max-w-[760px] text-[16px] leading-[1.75] text-[#516581]">{data.sections.compatibility.closing}</p>
              </div>
              <a
                href="#quote-form"
                data-quote-context={data.sections.compatibility.title}
                data-quote-source="engine-compatibility"
                data-quote-engine-code={data.engine.code}
                className="inline-flex min-h-[54px] items-center justify-center rounded-[16px] border border-[#8ad0a2] bg-white px-6 text-[16px] font-extrabold text-[#17803d] transition hover:border-[#17803d] hover:bg-[#edf9f0]"
              >
                Enter Your Reg <span className="ml-2" aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
              <div>
                <SectionHeading tag={data.sections.costGuide.tag} title={data.sections.costGuide.title} />
                <p className="mt-5 max-w-[820px] text-[17px] leading-[1.8] text-[#516581]">
                  Compare used, reconditioned and rebuilt {data.engine.code} engine prices - supply only and fitted by independent BMW specialists across the UK.
                </p>
              </div>
              <div className="rounded-[24px] border border-[#dbe5f2] bg-[linear-gradient(160deg,#fbfefd_0%,#eef9f1_100%)] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                <div className="text-[14px] font-extrabold uppercase tracking-[0.05em] text-[#17803d]">Price Drivers</div>
                <ul className="mt-4 grid gap-3">
                  <li className="rounded-[16px] bg-white px-4 py-3 text-[15px] leading-[1.65] text-[#173660]">Documented timing chain work raises value more than mileage alone.</li>
                  <li className="rounded-[16px] bg-white px-4 py-3 text-[15px] leading-[1.65] text-[#173660]">184hp donor availability can be tighter than 163hp stock in some regions.</li>
                  <li className="rounded-[16px] bg-white px-4 py-3 text-[15px] leading-[1.65] text-[#173660]">Turbo and EGR condition can erase the saving on a cheap used unit.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-[#081f47] text-left text-white">
                    <tr>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white">Condition</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white">Supply Only</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white">Fitted Price</th>
                      <th className="px-5 py-4 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white">Typical Warranty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.sections.costGuide.rows.map((row) => (
                      <tr key={row.condition} className="border-t border-[#e7eef8]">
                        <td className="px-5 py-5 align-top">
                          <div className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.04em] ${conditionAccentMap[row.condition] ?? "bg-[#eef4ff] text-[#2563eb]"}`}>
                            {row.condition}
                          </div>
                        </td>
                        <td className="px-5 py-5 align-top text-[16px] font-extrabold text-[#0b2347]">{row.supplyOnly}</td>
                        <td className="px-5 py-5 align-top text-[16px] font-extrabold text-[#0b2347]">{row.fitted}</td>
                        <td className="px-5 py-5 align-top text-[16px] text-[#173660]">{row.warranty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-[#cfe9d8] bg-[linear-gradient(180deg,#f5fbf7_0%,#eef8f1_100%)] px-5 py-5 text-[16px] leading-[1.75] text-[#173660]">
              <span className="font-extrabold text-[#17803d]">Labour Guide:</span> {data.sections.costGuide.labourLine}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="rounded-[24px] border border-[#dbe5f2] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                <div className="text-[28px] font-extrabold tracking-[-0.03em] text-[#0b2347]">What affects the price?</div>
                <div className="mt-4 grid gap-4">
                  {data.sections.costGuide.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-[16px] leading-[1.8] text-[#516581]">{paragraph}</p>
                  ))}
                </div>
                <div className="mt-5">
                  <QuoteLink text={data.sections.costGuide.cta} context={data.sections.costGuide.title} code={data.engine.code} />
                </div>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(160deg,#081f47_0%,#0d2b58_70%,#123a27_100%)] p-6 text-white shadow-[0_18px_36px_rgba(8,31,71,0.18)]">
                <div className="text-[28px] font-extrabold tracking-[-0.03em] text-white">Ready to compare prices?</div>
                <p className="mt-3 text-[16px] leading-[1.75] text-[#d7e1f0]">
                  Get quotes from 100+ vetted UK BMW engine specialists with supply-only and supply & fit options.
                </p>
                <a
                  href="#quote-form"
                  data-quote-context={data.sections.costGuide.title}
                  data-quote-source="engine-cost-guide"
                  data-quote-engine-code={data.engine.code}
                  className="mt-6 inline-flex min-h-[56px] w-full items-center justify-center rounded-[16px] bg-[#1da23f] px-6 text-[18px] font-extrabold text-white transition hover:bg-[#198a36]"
                >
                  Get {data.engine.code} Quotes <span className="ml-2" aria-hidden="true">-&gt;</span>
                </a>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#d7e1f0]">Secure enquiry - no spam. Quotes only from vetted specialists.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f6fbf7_100%)]">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
              <div>
                <SectionHeading tag={data.sections.failures.tag} title={data.sections.failures.title} />
                <p className="mt-5 max-w-[760px] text-[17px] leading-[1.8] text-[#516581]">
                  Real-world failure data, typical mileages and repair versus replacement advice from UK specialists.
                </p>
              </div>
              <div className="rounded-[22px] border border-[#0f315c] bg-[linear-gradient(160deg,#081f47_0%,#0d2a57_72%,#123a27_100%)] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <div className="text-[14px] font-extrabold uppercase tracking-[0.06em] text-[#6fd48e]">Most Common Failure</div>
                <p className="mt-3 text-[18px] font-bold leading-[1.6] text-white">{commonFailure}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex rounded-[14px] bg-[#081f47] px-5 py-3 text-[14px] font-extrabold text-white">All Problems</span>
              {data.sections.failures.items.map((item) => (
                <span key={item.title} className="inline-flex rounded-[14px] border border-[#dbe5f2] bg-white px-5 py-3 text-[14px] font-semibold text-[#173660]">
                  {item.title.replace(/\s*&\s*/g, " / ")}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-5">
              {data.sections.failures.items.map((item, index) => {
                const accent = problemAccentMap[index % problemAccentMap.length];
                return (
                  <article key={item.title} className={`rounded-[24px] border border-[#dbe5f2] border-l-[4px] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)] ${accent.border}`}>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_330px]">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.04em] ${accent.pill}`}>
                            {index === 0 ? "Defining issue" : "Known issue"}
                          </span>
                          <span className={`text-[14px] font-bold uppercase tracking-[0.05em] ${accent.label}`}>Typical onset: {item.onset}</span>
                        </div>
                        <h3 className="mt-4 font-['Manrope'] text-[30px] font-extrabold tracking-[-0.03em] text-[#0b2347]">{item.title}</h3>
                        <p className="mt-4 text-[16px] leading-[1.82] text-[#516581]">{item.whatHappens}</p>
                      </div>

                      <div className="rounded-[20px] bg-[#f8fbff] px-5 py-5">
                        <div className="text-[14px] font-extrabold uppercase tracking-[0.05em] text-[#173660]">Repair vs Replace</div>
                        <p className="mt-3 text-[16px] leading-[1.78] text-[#173660]">{item.repairVsReplace}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-[22px] border border-[#cfe9d8] bg-[linear-gradient(180deg,#fbfefd_0%,#f1faf4_100%)] px-5 py-5 text-[16px] leading-[1.82] text-[#516581]">
              {data.sections.failures.goodYearsLine}
            </div>
            <div className="mt-6">
              <QuoteLink text={data.sections.failures.cta} context={data.sections.failures.title} code={data.engine.code} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <SectionHeading tag={data.sections.variants.tag} title={data.sections.variants.title} />
            <p className="mt-5 max-w-[930px] text-[16px] leading-[1.82] text-[#516581]">{data.sections.variants.intro}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {data.sections.variants.relatives.map((item, index) => (
                <div key={item.code} className="rounded-[24px] border border-[#dbe5f2] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <div className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.04em] ${problemAccentMap[index % problemAccentMap.length].pill}`}>
                    {item.code}
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.82] text-[#173660]">
                    {item.href ? (
                      <>
                        <Link href={item.href} className="font-bold text-[#0b2347] hover:text-[#17803d]">
                          {item.code}
                        </Link>{" "}
                        - {item.description}
                      </>
                    ) : (
                      <>
                        <span className="font-bold text-[#0b2347]">{item.code}</span> - {item.description}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[16px] leading-[1.8] text-[#516581]">{data.sections.variants.closing}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-[linear-gradient(180deg,#f8fbff_0%,#f6fbf7_100%)]">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <SectionHeading tag={data.sections.buyingGuide.tag} title={data.sections.buyingGuide.title} />
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {data.sections.buyingGuide.options.map((option) => (
                <div key={option.label} className="rounded-[24px] border border-[#dbe5f2] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.04em] ${
                      option.label === "Used"
                        ? "bg-[#eef4ff] text-[#2563eb]"
                        : option.label === "Reconditioned"
                          ? "bg-[#edf9f0] text-[#17803d]"
                          : "bg-[#fff6ea] text-[#d97706]"
                    }`}
                  >
                    {option.label}
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.82] text-[#516581]">{option.body}</p>
                  <div className="mt-5">
                    <Link href={option.href} className="text-[15px] font-extrabold text-[#0b2347] hover:text-[#17803d]">
                      Learn more -&gt;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[22px] border border-[#cfe9d8] bg-[linear-gradient(180deg,#fbfefd_0%,#f1faf4_100%)] px-5 py-5 text-[16px] leading-[1.8] text-[#173660] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              {data.sections.buyingGuide.supplyFitLine}
            </div>
            <p className="mt-6 text-[16px] leading-[1.8] text-[#516581]">{data.sections.buyingGuide.vehicleValueNote}</p>
            <div className="mt-6">
              <QuoteLink text={data.sections.buyingGuide.cta} context={data.sections.buyingGuide.title} code={data.engine.code} />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="py-2 sm:py-4">
            <SectionHeading tag={data.sections.related.tag} title={data.sections.related.title} />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.sections.related.items.map((item, index) => (
                <div key={`${item.relation}-${item.code}`} className="rounded-[22px] border border-[#dbe5f2] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.05)]">
                  <div className={`inline-flex rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.04em] ${problemAccentMap[index % problemAccentMap.length].pill}`}>
                    {item.relation}
                  </div>
                  <h3 className="mt-4 font-['Manrope'] text-[24px] font-extrabold tracking-[-0.03em] text-[#0b2347]">
                    <Link href={item.href} className="hover:text-[#17803d]">{item.code}</Link>
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.75] text-[#516581]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <FaqSection data={faqData} documentMode />

      <Section className="bg-white" id="quote-form">
        <Container className="max-w-[1400px] px-4 sm:px-6">
          <div className="bg-[linear-gradient(160deg,#081f47_0%,#0d2a57_62%,#123a27_100%)] px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
              <div>
                <div className="inline-flex rounded-full bg-[#123b2b] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[#6fd48e]">
                  {data.sections.trustCta.tag}
                </div>
                <h2 className="mt-4 font-['Manrope'] text-[34px] font-extrabold tracking-[-0.04em] text-white sm:text-[42px]">
                  {data.sections.trustCta.title}
                </h2>
                <div className="mt-6 grid gap-3 text-[16px] text-[#d7e1f0]">
                  {data.sections.trustCta.bullets.map((bullet, index) => (
                    <p key={index} className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-3">{bullet}</p>
                  ))}
                </div>
                <p className="mt-6 max-w-[760px] text-[16px] leading-[1.8] text-[#d7e1f0]">{data.sections.trustCta.paragraph}</p>
              </div>

              <div className="rounded-[24px] bg-white p-5 text-[#0b2347] shadow-[0_20px_40px_rgba(8,31,71,0.18)] sm:p-6">
                <div className="mb-5 grid grid-cols-[84px_1fr] gap-4 rounded-[18px] border border-[#e6f1ea] bg-[#f4fbf6] p-4">
                  <div className="relative aspect-square overflow-hidden rounded-[14px] bg-white">
                    <Image
                      src="/images/shared/hero-engines/temporary-performance-engine.jpeg"
                      alt="BMW N47D20C quote reference"
                      fill
                      className="object-contain p-2"
                      sizes="84px"
                    />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold uppercase tracking-[0.05em] text-[#17803d]">Matched Before Pricing</div>
                    <p className="mt-1 text-[14px] leading-[1.7] text-[#516581]">
                      We confirm the exact BMW fitment before suppliers send a quote, which helps avoid vague &quot;N47&quot; matches.
                    </p>
                  </div>
                </div>
                <div className="text-[22px] font-extrabold">Get exact {data.engine.code} quotes</div>
                <p className="mt-2 text-[15px] leading-[1.7] text-[#516581]">{data.sections.trustCta.note}</p>
                <div className="mt-5 grid gap-4">
                  <input
                    type="text"
                    placeholder="Enter your registration"
                    className="min-h-[54px] rounded-[14px] border border-[#dbe5f2] px-4 text-[16px] outline-none placeholder:text-[#90a0b6]"
                  />
                  <a
                    href="#quote-form"
                    data-quote-context={data.sections.trustCta.title}
                    data-quote-source="engine-trust-cta"
                    data-quote-engine-code={data.engine.code}
                    className="inline-flex min-h-[54px] items-center justify-center rounded-[14px] bg-[#1da23f] px-5 text-center text-[17px] font-extrabold text-white transition hover:bg-[#198a36]"
                  >
                    {data.sections.trustCta.buttonText}
                  </a>
                </div>
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
