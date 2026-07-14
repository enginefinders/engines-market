import Image from "next/image";
import type { TrustCtaData } from "@/types/brand";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

type Props = {
  data: TrustCtaData;
  brandName: string;
  imageSrc: string;
};

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CogIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 1 0 12 8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.9 1.9 0 0 1 0 2.7 1.9 1.9 0 0 1-2.7 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.9 1.9 0 0 1-2.7 0 1.9 1.9 0 0 1 0-2.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.9 1.9 0 0 1 0-2.7 1.9 1.9 0 0 1 2.7 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.9 1.9 0 0 1 2.7 0 1.9 1.9 0 0 1 0 2.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
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

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 8v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function getPointIcon(index: number) {
  if (index === 0) {
    return <ShieldIcon />;
  }
  if (index === 1) {
    return <CogIcon />;
  }
  return <TruckIcon />;
}

function getHeadingParts(text: string) {
  const enginePricesMatch = text.match(/^(.*?)(Engine Prices)(.*)$/i);
  if (enginePricesMatch) {
    return {
      lead: enginePricesMatch[1].trim(),
      accent: enginePricesMatch[2].trim(),
      tail: enginePricesMatch[3].trim(),
    };
  }

  const todayMatch = text.match(/^(.*?)(Today)$/i);
  if (todayMatch) {
    return {
      lead: todayMatch[1].trim(),
      accent: "",
      tail: todayMatch[2].trim(),
    };
  }

  return { lead: text, accent: "", tail: "" };
}

export default function VariantTrustCtaSection({ data, brandName, imageSrc }: Props) {
  const heading = getHeadingParts(data.h2);

  return (
    <Section className="bg-white !py-0">
      <Container className="!max-w-none !px-0 sm:!px-0 lg:!px-0">
        <div className="overflow-hidden bg-[radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.2),transparent_24%),linear-gradient(135deg,#071735_0%,#06152d_55%,#08152b_100%)] shadow-[0_18px_34px_rgba(8,31,71,0.18)]">
          <div className="grid gap-5 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-center lg:px-10 lg:py-7">
            <div className="max-w-[760px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f7f3d] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                <ShieldIcon />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-4 max-w-[760px] font-['Manrope'] text-[36px] font-extrabold leading-[1.02] tracking-normal text-white sm:text-[48px] lg:text-[60px]">
                {heading.lead ? <span className="block">{heading.lead}</span> : null}
                {heading.accent ? <span className="block text-[#39c85e]">{heading.accent}</span> : null}
                {heading.tail ? <span className="block">{heading.tail}</span> : null}
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {data.points.map((point, index) => (
                  <div key={`${point.title}-${index}`} className="border border-white/12 bg-white/[0.04] px-4 py-4 text-white/95">
                    <div className="text-[#7af085]">{getPointIcon(index)}</div>
                    <p className="mt-3 text-[16px] font-semibold leading-[1.45]">{point.title}</p>
                    {point.description ? <p className="mt-2 text-[14px] leading-[1.55] text-slate-300">{point.description}</p> : null}
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-[700px] text-[16px] leading-[1.75] text-slate-200">{data.finalText}</p>
            </div>

            <div className="relative mx-auto flex min-h-[240px] w-full max-w-[660px] items-end justify-center lg:min-h-[360px]">
              <div className="absolute inset-x-14 bottom-3 h-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.26),rgba(255,255,255,0))] blur-2xl" />
              <Image
                src={imageSrc}
                alt={data.imageAlt ?? `${brandName} vehicle`}
                fill
                className="object-contain object-center drop-shadow-[0_28px_42px_rgba(0,0,0,0.28)]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="border-t border-white/10 px-5 pb-5 sm:px-7 lg:px-10 lg:pb-7">
            <div className="grid gap-4 border border-white/10 bg-[#0b1d3f]/88 p-4 backdrop-blur-sm lg:grid-cols-[minmax(0,0.44fr)_minmax(280px,0.32fr)_auto_minmax(260px,0.42fr)] lg:items-center lg:p-5">
              <div className="flex items-center gap-4 border border-white/10 bg-white/[0.03] px-4 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1f7f3d]/35 bg-[#0f2c1e] text-[#8df39e]">
                  <SearchIcon />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white">Enter your registration</p>
                  <p className="mt-1 text-[14px] leading-[1.55] text-slate-300">and get matched with verified S65B40 specialists.</p>
                </div>
              </div>

              <div className="border border-white/10 bg-white/[0.04] px-4 py-4">
                <div className="overflow-hidden border border-[#d5a300] bg-[#f3b700] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.34)]">
                  <div className="grid grid-cols-[82px_1fr]">
                    <div className="bg-[#123075] px-3 py-3 text-center font-bold text-white">
                      <div className="text-[13px]">UK</div>
                    </div>
                    <div className="px-5 py-3 text-center text-[28px] font-black tracking-[0.04em] sm:text-[32px]">REG 123</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[13px] text-slate-300">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>

              <div className="hidden justify-center text-white lg:flex">
                <ArrowIcon />
              </div>

              <a
                href="#quote-form"
                data-quote-context={`Final ${brandName} engine comparison`}
                data-quote-source="variant-trust-cta"
                className="inline-flex min-h-[104px] flex-col items-center justify-center bg-[#1d9f42] px-6 text-center text-white shadow-[0_18px_30px_rgba(29,159,66,0.24)] transition hover:bg-[#18883a]"
              >
                <span className="text-[18px] font-extrabold sm:text-[20px]">{data.buttonText.replace(/\s*->\s*$/, "")}</span>
                <span className="mt-2 text-[15px] text-green-50/92">Fast. Free. No Obligation.</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
