import Link from "next/link";
import type { ReactNode } from "react";
import type { AboutPageRecord } from "@/lib/staticPagePreview";

function ContentLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (href.startsWith("/")) return <Link href={href} className={className}>{children}</Link>;
  return <a href={href} className={className}>{children}</a>;
}

function SectionTitle({ title }: { title: string }) {
  const accent = "transparent across the UK.";
  const accentIndex = title.indexOf(accent);
  return <h2 className="mb-1.5 text-[22px] font-bold leading-[1.15] tracking-[0.01em] text-[#0b1628] sm:text-[24px]">{accentIndex >= 0 ? <>{title.slice(0, accentIndex)}<span className="text-[#22a05a]">{accent}</span></> : title}</h2>;
}

function SectionHeading({ title, label }: { title: string; label: string }) {
  return <div className="mb-5 border-b border-[rgba(11,22,40,.12)] pb-2.5"><div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a99b4]">{label}</div><SectionTitle title={title} /></div>;
}

const cardClass = "mb-4 overflow-hidden rounded-2xl border border-[rgba(11,22,40,.12)] bg-white";
const cardBodyClass = "p-7 sm:px-8";
const subCardClass = "rounded-xl border border-[rgba(11,22,40,.12)] bg-[#f4f6fb] p-[18px_20px]";

export default function AboutPageContent({ page }: { page: AboutPageRecord }) {
  const { mission, platform, problem, process, trust, testimonials, resources, faq } = page.sections;

  return <main className="pb-16 pt-10">
    <section className={cardClass} id="mission"><div className={cardBodyClass}><SectionHeading title={mission.title} label={page.sections.hero.nextSectionLabel} /><p className="mb-5 max-w-[700px] text-[15px] leading-[1.65] text-[#2c3e5a]">{mission.description}</p><div className="mt-2 flex flex-wrap gap-3">{mission.values.map((value) => <span className="rounded-[20px] bg-[#e8f5ee] px-4 py-1.5 text-xs font-semibold text-[#1a6b3c]" key={value}>{value}</span>)}</div></div></section>

    <section className={cardClass} id="platform"><div className={cardBodyClass}><SectionHeading title={platform.title} label={mission.nextSectionLabel} /><p className="mb-5 text-[13.5px] leading-[1.65] text-[#5a6a85]">{platform.description}</p><div className="mb-3 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-[rgba(34,160,90,.25)] bg-[#e8f5ee] p-5"><div className="mb-3 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#1a6b3c]"><span aria-hidden="true">✓</span>{platform.includedLabel}</div><ul className="m-0 flex list-none flex-col gap-2 p-0">{platform.included.map((item) => <li className="relative pl-6 text-xs leading-[1.5] text-[#2c3e5a] before:absolute before:left-0 before:top-0.5 before:text-base before:text-[#1a6b3c] before:content-['✓']" key={item}>{item}</li>)}</ul></div>
      <div className="rounded-xl border border-[rgba(192,57,43,.2)] bg-[#fdecea] p-5"><div className="mb-3 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#c0392b]"><span aria-hidden="true">×</span>{platform.excludedLabel}</div><ul className="m-0 flex list-none flex-col gap-2 p-0">{platform.excluded.map((item) => <li className="relative pl-6 text-xs leading-[1.5] text-[#2c3e5a] before:absolute before:left-0 before:top-0.5 before:text-base before:text-[#c0392b] before:content-['×']" key={item}>{item}</li>)}</ul></div>
    </div><p className="mt-1.5 text-xs leading-[1.5] text-[#8a99b4]">{platform.closing}</p></div></section>

    <section className={cardClass} id="problem"><div className={cardBodyClass}><SectionHeading title={problem.title} label={platform.nextSectionLabel} /><div className="mt-3 grid gap-3 md:grid-cols-3">{problem.items.map((item, index) => <article className={subCardClass} key={item.title}><div className="mb-2 grid h-7 w-7 place-items-center rounded-full bg-[#e8f5ee] text-xs font-bold text-[#1a6b3c]" aria-hidden="true">{index + 1}</div><h3 className="text-[13px] font-semibold leading-5 text-[#0b1628]">{item.title}</h3><p className="mt-1 text-xs leading-[1.5] text-[#5a6a85]">{item.description}</p></article>)}</div></div></section>

    <section className={cardClass} id="process"><div className={cardBodyClass}><SectionHeading title={process.title} label={problem.nextSectionLabel} /><p className="mb-5 text-[13.5px] leading-[1.65] text-[#5a6a85]">{process.description}</p><div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{process.steps.map((step) => <article className="rounded-xl border border-[rgba(11,22,40,.12)] bg-[#f4f6fb] p-[18px_16px] text-center" key={step.step}><div className="mb-1.5 text-[29px] font-bold leading-none text-[#22a05a]">{step.step}</div><h3 className="mb-1 text-xs font-semibold text-[#0b1628]">{step.title}</h3><p className="text-[11.5px] leading-[1.5] text-[#5a6a85]">{step.description}</p></article>)}</div><div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[rgba(34,160,90,.3)] bg-[#e8f5ee] px-[18px] py-3.5 max-[560px]:flex-col max-[560px]:items-start"><span className="text-[13px] font-medium text-[#1a6b3c]">{process.cta.text}</span><ContentLink href={process.cta.href} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#1a6b3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#0f542d]">{process.cta.label}</ContentLink></div></div></section>

    <section className={cardClass} id="trust"><div className={cardBodyClass}><SectionHeading title={trust.title} label={process.nextSectionLabel} /><p className="mb-5 text-[13.5px] leading-[1.65] text-[#5a6a85]">{trust.description}</p><div className="mb-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{trust.principles.map((principle) => <article className={`${subCardClass} text-center`} key={principle.title}><div className="mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full bg-[#e8f5ee] text-sm font-bold text-[#1a6b3c]" aria-hidden="true">✓</div><h3 className="mb-1 text-[13px] font-semibold leading-5 text-[#0b1628]">{principle.title}</h3><p className="text-[11.5px] leading-[1.5] text-[#5a6a85]">{principle.description}</p></article>)}</div></div></section>

    <section className={cardClass} id="testimonials"><div className={cardBodyClass}><SectionHeading title={testimonials.title} label={trust.nextSectionLabel} /><div className="mb-3 grid gap-3 md:grid-cols-3">{testimonials.items.map((item) => <blockquote className="flex flex-col gap-2 rounded-xl border border-[rgba(11,22,40,.12)] bg-[#f4f6fb] p-5" key={item.attribution}><p className="text-xs leading-[1.7] text-[#2c3e5a]">“{item.quote}”</p><cite className="text-[11.5px] font-semibold not-italic text-[#0b1628]">{item.attribution}</cite></blockquote>)}</div><p className="mt-1.5 text-xs text-[#8a99b4]">{testimonials.note} <ContentLink href={testimonials.link.href} className="text-[#1a6b3c] underline underline-offset-2">{testimonials.link.text}</ContentLink></p></div></section>

    <section className={cardClass} id="resources"><div className={cardBodyClass}><SectionHeading title={resources.title} label={testimonials.nextSectionLabel} /><p className="mb-5 text-[13.5px] leading-[1.65] text-[#5a6a85]">{resources.description}</p><div className="grid gap-2.5 md:grid-cols-3">{resources.items.map((item) => <ContentLink href={item.href} className="flex flex-col gap-1 rounded-xl border border-[rgba(11,22,40,.12)] bg-white p-4 transition hover:border-[#1a6b3c] hover:shadow-[0_2px_12px_rgba(26,107,60,.12)]" key={item.title}><span className="text-[11px] text-[#8a99b4]">{item.icon}</span><span className="text-xs font-medium leading-[1.4] text-[#0b1628]">{item.title}</span><span className="text-[11px] leading-[1.4] text-[#8a99b4]">{item.description}</span></ContentLink>)}</div></div></section>

    <section className={cardClass} id="faq"><div className={cardBodyClass}><SectionHeading title={faq.title} label={resources.nextSectionLabel} /><div className="flex flex-col">{faq.items.map((item) => <details className="border-b border-[rgba(11,22,40,.12)] last:border-b-0" key={item.question}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-[#0b1628] [&::-webkit-details-marker]:hidden">{item.question}<span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-[#eef1f8] text-xs text-[#5a6a85]">+</span></summary><p className="pb-4 pr-8 text-[13px] leading-[1.75] text-[#2c3e5a]">{item.answer}</p></details>)}</div></div></section>

    <div className="mb-4 grid items-center gap-8 rounded-2xl bg-[#0b1628] px-7 py-8 sm:px-12 lg:grid-cols-[1fr_auto]"><div><div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2ecc76]">{faq.cta.eyebrow}</div><div className="mb-2.5 text-[28px] font-bold leading-[1.1] text-white">{faq.cta.title}</div><p className="mb-1.5 text-[13.5px] leading-[1.65] text-white/55">{faq.cta.description}</p><p className="text-xs text-white/30">{faq.cta.highlights.join(" · ")}</p></div><div className="flex flex-col items-center gap-2.5"><ContentLink href={faq.cta.href} className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#22a05a] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2ecc76]">{faq.cta.buttonText}<span aria-hidden="true">→</span></ContentLink><div className="text-[11px] text-white/30">{faq.cta.note}</div></div></div>
  </main>;
}
