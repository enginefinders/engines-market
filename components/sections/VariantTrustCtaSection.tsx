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
  const cleanedButtonText = data.buttonText.replace(/\s*->\s*$/, "");

  return (
    <Section className="bg-white !pt-[2px] !pb-0">
      <div className="overflow-hidden border-t border-[#d6deea] bg-[radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,#07152d_0%,#081a34_46%,#09182f_100%)]">
        <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
          <div className="grid gap-7 px-4 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(520px,1.04fr)] lg:items-start lg:px-7 lg:py-8 lg:gap-8">
            <div className="max-w-[780px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f7f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.03em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <AssetIcon src="/icons/variant/white/warranty.png" className="h-4 w-4 object-contain" />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-4 max-w-[860px] font-['Manrope'] text-[31px] font-extrabold leading-[1.02] tracking-normal text-white sm:text-[44px] lg:text-[58px]">
                {heading.lead ? <span className="block">{heading.lead}</span> : null}
                {heading.accent ? <span className="block text-[#39c85e]">{heading.accent}</span> : null}
                {heading.tail ? <span className="block">{heading.tail}</span> : null}
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {data.points.map((point, index) => (
                  <div
                    key={`${point.title}-${index}`}
                    className="rounded-[12px] border border-white/12 bg-white/[0.035] px-4 py-3.5 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center text-[#7af085]">
                        {getPointIcon(index)}
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold leading-[1.45]">{point.title}</p>
                        {point.description ? <p className="mt-1 text-[13px] leading-[1.5] text-slate-300">{point.description}</p> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 max-w-[720px] text-[15px] leading-[1.72] text-slate-200 sm:text-[16px]">
                {data.finalText}
              </p>
            </div>

            <div className="relative mx-auto flex min-h-[250px] w-full max-w-[860px] items-end justify-center overflow-hidden sm:min-h-[320px] lg:min-h-[408px]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,45,0.4),rgba(7,21,45,0.16)_28%,rgba(7,21,45,0)_52%)]" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-[linear-gradient(90deg,#07152d_0%,rgba(7,21,45,0.96)_32%,rgba(7,21,45,0.28)_68%,rgba(7,21,45,0)_100%)] lg:w-[20%]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[16%] bg-[linear-gradient(270deg,#081a34_0%,rgba(8,26,52,0.82)_42%,rgba(8,26,52,0.08)_76%,rgba(8,26,52,0)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(180deg,#081a34_0%,rgba(8,26,52,0.7)_42%,rgba(8,26,52,0)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(0deg,#081a34_0%,rgba(8,26,52,0.82)_34%,rgba(8,26,52,0)_100%)]" />
              <div className="pointer-events-none absolute inset-x-[12%] bottom-5 h-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(255,255,255,0))] blur-[22px]" />
              <div className="pointer-events-none absolute right-[10%] top-[6%] h-[76%] w-[70%] bg-[radial-gradient(circle_at_48%_28%,rgba(255,255,255,0.12),transparent_38%)]" />
              <Image
                src={imageSrc}
                alt={data.imageAlt ?? `${brandName} vehicle`}
                fill
                className="object-contain object-[86%_center] opacity-[0.72] [mask-image:radial-gradient(circle_at_72%_50%,black_56%,rgba(0,0,0,0.9)_76%,transparent_100%)] drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)] scale-[0.96] sm:object-[90%_center] sm:scale-[0.98] lg:object-[92%_center] lg:scale-[0.98]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          <div className="border-t border-white/10 px-4 pt-5 pb-0 sm:px-6 sm:pt-5.5 sm:pb-0 lg:px-7 lg:pt-6 lg:pb-0">
            <div className="grid gap-5 lg:grid-cols-[minmax(270px,0.36fr)_minmax(410px,0.42fr)_52px_minmax(420px,0.48fr)] lg:items-center">
              <div className="flex items-center gap-4 px-1 py-3">
                <div className="flex h-[62px] w-[62px] flex-none items-center justify-center rounded-full bg-[#10283e] text-[#8df39e]">
                  <AssetIcon src="/icons/engine-market/dark-green-not-sure.png" className="h-8 w-8 object-contain" />
                </div>
                <div>
                  <p className="text-[19px] font-medium text-white">Enter your registration</p>
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-slate-300">{`and get matched with verified ${brandName} specialists.`}</p>
                </div>
              </div>

              <div className="px-0 py-3">
                <div className="overflow-hidden rounded-[12px] border-[2px] border-[#1a2d5f] bg-[#f3b700] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.28)]">
                  <div className="grid grid-cols-[74px_1fr]">
                    <div className="bg-[#132e73] px-3 py-4 text-center font-bold text-white">
                      <div className="text-[13px]">UK</div>
                    </div>
                    <div className="px-5 py-4 text-center text-[30px] font-black tracking-[0.03em] sm:text-[34px]">REG 123</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[12.5px] text-slate-300">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>

              <div className="hidden justify-center text-white lg:flex">
                <span className="inline-flex h-9 w-9 items-center justify-center">
                  <ArrowIcon />
                </span>
              </div>

              <a
                href="#quote-form"
                data-quote-context={`Final ${brandName} engine comparison`}
                data-quote-source="variant-trust-cta"
                className="inline-flex min-h-[96px] w-full flex-col items-center justify-center rounded-[12px] bg-[#24993f] px-6 text-center text-white shadow-[0_14px_24px_rgba(29,159,66,0.2)] transition hover:bg-[#1f8a39] sm:min-h-[102px]"
              >
                <span className="flex items-center justify-center gap-3 text-[18px] font-extrabold sm:text-[19px]">
                  <span>{cleanedButtonText}</span>
                  <ArrowIcon />
                </span>
                <span className="mt-1.5 text-[14px] text-green-50/92">Fast. Free. No Obligation.</span>
              </a>

              <div className="flex items-center justify-center gap-3 px-2 text-white lg:hidden">
                <ArrowIcon />
                <div className="flex items-center gap-2 text-[12.5px] text-slate-300">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
