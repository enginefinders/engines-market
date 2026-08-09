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
    <Section className="overflow-hidden bg-white !pt-[2px] !pb-0">
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-t border-[#d6deea] bg-[radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.14),transparent_24%),linear-gradient(135deg,#07152d_0%,#081a34_46%,#09182f_100%)]">
        <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
          <div className="grid gap-4 px-3.5 py-4 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(520px,1.04fr)] lg:items-start lg:px-7 lg:py-7 lg:gap-7">
            <div className="max-w-[780px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f7f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.03em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <AssetIcon src="/icons/variant/white/warranty.png" className="h-4 w-4 object-contain" />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-3 max-w-[860px] font-['Manrope'] text-[31px] font-extrabold leading-[1.02] tracking-normal text-white sm:text-[44px] lg:text-[58px]">
                {heading.lead ? <span className="block">{heading.lead}</span> : null}
                {heading.accent ? <span className="block text-[#39c85e]">{heading.accent}</span> : null}
                {heading.tail ? <span className="block">{heading.tail}</span> : null}
              </h2>

              <div className="mt-2 grid gap-2 md:grid-cols-3">
                {data.points.map((point, index) => (
                  <div
                    key={`${point.title}-${index}`}
                    className="rounded-[9px] border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-white/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 flex-none items-center justify-center text-[#7af085]">
                        {getPointIcon(index)}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold leading-[1.18]">{point.title}</p>
                        {point.description ? <p className="mt-0.5 text-[11px] leading-[1.22] text-slate-300">{point.description}</p> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 max-w-[720px] text-[15px] leading-[1.62] text-slate-200 sm:text-[16px]">
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

          <div className="px-3.5 pt-0 pb-3 sm:px-6 sm:pb-4 lg:px-7 lg:pb-5">
            <div className="grid gap-2.5 rounded-[12px] border border-white/18 bg-white/[0.095] p-1.5 pb-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_18px_38px_rgba(0,0,0,0.2)] backdrop-blur-[22px] lg:grid-cols-[minmax(250px,0.36fr)_minmax(300px,0.32fr)_32px_minmax(330px,0.34fr)] lg:items-center lg:p-2">
              <div className="flex items-center gap-3 px-1 py-1">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-[#8df39e] shadow-[0_0_22px_rgba(47,210,92,0.16)]">
                  <AssetIcon src="/icons/engine-market/dark-green-not-sure.png" className="h-5 w-5 object-contain" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-[1.15] text-white">Enter your registration</p>
                  <p className="mt-0.5 text-[10.5px] leading-[1.25] text-slate-300">{`and get matched with verified ${brandName} specialists.`}</p>
                </div>
              </div>

              <div className="px-0 py-1">
                <div className="overflow-hidden rounded-[8px] border border-amber-300/60 bg-[#f3b700] text-[#071735] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]">
                  <div className="grid grid-cols-[52px_1fr]">
                    <div className="bg-[#132e73] px-2 py-2.5 text-center font-bold text-white">
                      <div className="text-[10px]">UK</div>
                    </div>
                    <div className="px-3 py-2.5 text-center text-[22px] font-black tracking-[0.03em]">REG 123</div>
                  </div>
                </div>
                <div className="mt-1 hidden items-center gap-1.5 text-[10px] text-slate-300 lg:flex">
                  <LockIcon />
                  <span>100% Secure</span>
                  <span>{"\u2022"}</span>
                  <span>No obligation</span>
                </div>
              </div>

              <div className="hidden justify-center text-white/90 lg:flex">
                <span className="inline-flex h-7 w-7 items-center justify-center">
                  <ArrowIcon />
                </span>
              </div>

              <a
                href="#quote-form"
                data-quote-context={`Final ${brandName} engine comparison`}
                data-quote-source="variant-trust-cta"
                className="inline-flex min-h-[58px] w-full flex-col items-center justify-center rounded-[8px] bg-[#24993f] px-4 py-2 text-center text-white shadow-[0_14px_24px_rgba(29,159,66,0.2)] transition hover:bg-[#1f8a39]"
              >
                <span className="flex items-center justify-center gap-2.5 text-[13px] font-extrabold sm:text-[14px]">
                  <span>{cleanedButtonText}</span>
                  <ArrowIcon />
                </span>
                <span className="mt-0.5 text-[10.5px] text-green-50/92">Fast. Free. No Obligation.</span>
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
