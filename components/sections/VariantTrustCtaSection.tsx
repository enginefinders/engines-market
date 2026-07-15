import Image from "next/image";
import type { TrustCtaData } from "@/types/brand";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

type Props = {
  data: TrustCtaData;
  brandName: string;
  imageSrc: string;
};

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

function AssetIcon({
  src,
  alt = "",
  className = "h-6 w-6",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return <Image src={src} alt={alt} width={28} height={28} className={className} />;
}

function getPointIcon(index: number) {
  if (index === 0) {
    return <AssetIcon src="/icons/variant/white/specialists.png" className="h-8 w-8 object-contain" />;
  }
  if (index === 1) {
    return <AssetIcon src="/icons/variant/white/warranty.png" className="h-8 w-8 object-contain" />;
  }
  return <AssetIcon src="/icons/variant/white/nationwide.png" className="h-8 w-8 object-contain" />;
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
    <Section className="bg-white !py-[2px]">
      <Container className="!max-w-none !px-[2px] sm:!px-[2px] lg:!px-[2px]">
        <div className="overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.15),transparent_23%),linear-gradient(135deg,#071735_0%,#071a37_44%,#091a32_100%)] shadow-[0_18px_34px_rgba(8,31,71,0.18)]">
          <div className="grid gap-6 px-5 py-5 sm:px-7 lg:grid-cols-[minmax(0,0.98fr)_minmax(520px,0.92fr)] lg:items-start lg:px-11 lg:py-8">
            <div className="max-w-[780px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f7f3d] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-white">
                <AssetIcon src="/icons/variant/white/warranty.png" className="h-4 w-4 object-contain" />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-4 max-w-[780px] font-['Manrope'] text-[32px] font-extrabold leading-[1.04] tracking-normal text-white sm:text-[46px] lg:text-[66px]">
                {heading.lead ? <span className="block">{heading.lead}</span> : null}
                {heading.accent ? <span className="block text-[#39c85e]">{heading.accent}</span> : null}
                {heading.tail ? <span className="block">{heading.tail}</span> : null}
              </h2>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {data.points.map((point, index) => (
                  <div
                    key={`${point.title}-${index}`}
                    className="rounded-[14px] border border-white/12 bg-white/[0.04] px-4 py-[18px] text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-[62px] w-[62px] flex-none items-center justify-center rounded-full border border-[#2a7e4b] bg-[#0f2a1f] text-[#7af085]">
                        {getPointIcon(index)}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold leading-[1.5]">{point.title}</p>
                        {point.description ? <p className="mt-1.5 text-[14px] leading-[1.55] text-slate-300">{point.description}</p> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-7 max-w-[720px] text-[16px] leading-[1.75] text-slate-200 sm:text-[17px]">{data.finalText}</p>
            </div>

              <div className="relative mx-auto flex min-h-[240px] w-full max-w-[760px] items-end justify-center sm:min-h-[300px] lg:min-h-[432px]">
                <div className="pointer-events-none absolute inset-x-[6%] bottom-5 h-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2),rgba(255,255,255,0))] blur-[24px]" />
                <div className="pointer-events-none absolute right-[8%] top-[3%] h-[88%] w-[86%] bg-[radial-gradient(circle_at_45%_30%,rgba(255,255,255,0.12),transparent_34%)]" />
                <Image
                  src={imageSrc}
                  alt={data.imageAlt ?? `${brandName} vehicle`}
                  fill
                  className="object-contain object-right-bottom scale-[1.08] drop-shadow-[0_28px_42px_rgba(0,0,0,0.28)] sm:scale-100"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
          </div>

          <div className="px-5 pb-5 sm:px-7 lg:px-11 lg:pb-8">
            <div className="grid gap-4 rounded-[18px] border border-white/10 bg-[#0b1d3f]/88 p-4 backdrop-blur-sm lg:grid-cols-[minmax(250px,0.34fr)_minmax(320px,0.38fr)_56px_minmax(360px,0.42fr)] lg:items-center lg:px-6 lg:py-5">
              <div className="flex items-center gap-4 rounded-[14px] border border-white/10 bg-white/[0.03] px-5 py-5 lg:min-h-[116px]">
                <div className="flex h-[74px] w-[74px] flex-none items-center justify-center rounded-full border border-[#1f7f3d]/35 bg-[#0f2c1e] text-[#8df39e] sm:h-[86px] sm:w-[86px]">
                  <AssetIcon src="/icons/variant/white/not-sure.png" className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <p className="text-[18px] font-medium text-white">Enter your registration</p>
                  <p className="mt-1 text-[14px] leading-[1.65] text-slate-300">and get matched with verified S65B40 specialists.</p>
                </div>
              </div>

              <div className="rounded-[14px] border border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="overflow-hidden rounded-[14px] border-[3px] border-[#172652] bg-[#f3b700] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.34)]">
                  <div className="grid grid-cols-[74px_1fr]">
                    <div className="bg-[#132e73] px-3 py-3 text-center font-bold text-white">
                      <div className="text-[13px]">UK</div>
                    </div>
                    <div className="px-5 py-3 text-center text-[30px] font-black tracking-[0.04em] sm:text-[34px]">REG 123</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[13px] text-slate-300">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>

              <div className="hidden justify-center px-2 text-white lg:flex">
                <span className="inline-flex h-12 w-12 items-center justify-center">
                  <ArrowIcon />
                </span>
              </div>

              <a
                href="#quote-form"
                data-quote-context={`Final ${brandName} engine comparison`}
                data-quote-source="variant-trust-cta"
                className="inline-flex min-h-[92px] flex-col items-center justify-center rounded-[14px] bg-[#1d9f42] px-6 text-center text-white shadow-[0_18px_30px_rgba(29,159,66,0.24)] transition hover:bg-[#18883a] sm:min-h-[116px]"
              >
                <span className="flex items-center justify-center gap-3 text-[18px] font-extrabold sm:text-[20px]">
                  <span>{data.buttonText.replace(/\s*->\s*$/, "")}</span>
                  <ArrowIcon />
                </span>
                <span className="mt-2 text-[15px] text-green-50/92">Fast. Free. No Obligation.</span>
              </a>

              <div className="flex items-center justify-center gap-3 px-2 text-white lg:hidden">
                <ArrowIcon />
                <div className="flex items-center gap-2 text-[13px] text-slate-300">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
