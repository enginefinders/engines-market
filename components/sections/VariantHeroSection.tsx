"use client";

import Image from "next/image";
import type { VariantHeroData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHeroData;
  bgImage: string;
};

const defaultEngineImage = "/images/shared/hero-engines/temporary-performance-engine.jpeg";
const bottomBarItems = [
  {
    src: "/icons/engine-market/light-green-instant-quote.png",
    text: "Instant engine replacement quote - 100% free, no obligation",
  },
  {
    src: "/icons/engine-market/light-green-pound.png",
    text: "Engine replacement near me - UK-wide specialist network",
  },
  {
    src: "/icons/engine-market/light-green-pound.png",
    text: "Compare reconditioned, rebuilt & used engine prices",
  },
  {
    src: "/icons/engine-market/light-green-supply-fit.png",
    text: "Supply & fit available - parts and labour from vetted specialists",
  },
] as const;

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

function AssetIcon({
  src,
  alt = "",
  className = "h-5 w-5 object-contain",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return <Image src={src} alt={alt} width={28} height={28} className={className} />;
}

function getTrustIcon(index: number) {
  if (index === 0) return <AssetIcon src="/icons/variant/light-blue/supply-fit.png" className="h-5 w-5 object-contain" />;
  if (index === 1) return <AssetIcon src="/icons/variant/light-blue/warranty.png" className="h-5 w-5 object-contain" />;
  if (index === 2) return <AssetIcon src="/icons/variant/light-blue/nationwide.png" className="h-5 w-7 object-contain" />;
  return <AssetIcon src="/icons/variant/light-blue/specialists.png" className="h-5 w-5 object-contain" />;
}

function getOptionToneClasses(tone?: string) {
  if (tone === "reconditioned") {
    return {
      badge: "bg-[#eef9f1] text-[#15803d]",
      price: "text-[#15803d]",
    };
  }
  if (tone === "rebuilt") {
    return {
      badge: "bg-[#fff7e8] text-[#ca8a04]",
      price: "text-[#0f172a]",
    };
  }
  return {
    badge: "bg-[#eef4ff] text-[#1d4ed8]",
    price: "text-[#0f172a]",
  };
}

function parseAnchorPrice(data: VariantHeroData) {
  const line = data.highlights?.[0]?.line1 ?? data.highlights?.[0]?.price ?? "";
  if (!line) return data.highlights?.[0]?.price ?? "";
  const pieces = line.split(/[-:]/);
  return pieces.length > 1 ? pieces.slice(1).join("-").trim() : line;
}

function getEngineCards(data: VariantHeroData) {
  if (data.engineOptions?.length) {
    return data.engineOptions;
  }

  const detail = data.highlights?.[0]?.detail ?? "";
  return [
    {
      label: "Used",
      price: "From quote",
      description: detail || "Verified UK stock from vetted suppliers.",
      image: data.highlights?.[0]?.image,
      imageAlt: data.highlights?.[0]?.imageAlt,
      tone: "used" as const,
    },
  ];
}

function getHeadlineParts(h1: string) {
  const match = h1.match(/^(.*?)(?:\s*-\s*)(.*)$/);
  if (!match) {
    return { lead: h1, accent: "" };
  }
  return {
    lead: match[1].trim(),
    accent: match[2].trim(),
  };
}

export default function VariantHeroSection({ data, bgImage }: Props) {
  const headline = getHeadlineParts(data.h1);
  const optionCards = getEngineCards(data);
  const anchorPrice = parseAnchorPrice(data);
  const detailLine = data.highlights?.[0]?.detail ?? data.highlights?.[0]?.line2 ?? "";
  const bottomTickerLoop = [...bottomBarItems, ...bottomBarItems];

  return (
    <Section className="overflow-hidden bg-white !py-[2px]">
      <div className="relative overflow-hidden">
        <div className="relative min-h-[320px] overflow-hidden bg-[#f7f9fc] sm:min-h-[360px] lg:min-h-[420px]">
          <div className="absolute inset-0">
            <Image
              src={bgImage}
              alt=""
              fill
              className="object-cover object-[92%_center] sm:object-[92%_center] lg:object-[94%_center]"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,249,252,0.995)_0%,rgba(247,249,252,0.985)_22%,rgba(247,249,252,0.94)_38%,rgba(247,249,252,0.76)_52%,rgba(247,249,252,0.34)_70%,rgba(247,249,252,0.04)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_28%,rgba(247,249,252,0.08)_72%,rgba(247,249,252,0.52)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden w-[50%] bg-[radial-gradient(circle_at_72%_45%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.04)_34%,rgba(255,255,255,0.3)_62%,rgba(247,249,252,0.72)_100%)] lg:block" />
          <div className="absolute inset-y-0 right-0 hidden w-[52%] bg-[linear-gradient(135deg,transparent_0%,transparent_32%,rgba(195,210,236,0.12)_32%,rgba(195,210,236,0.12)_40%,transparent_40%,transparent_52%,rgba(195,210,236,0.08)_52%,rgba(195,210,236,0.08)_60%,transparent_60%)] lg:block" />

          <Container className="relative max-w-[1400px] px-0 sm:px-0 lg:px-0">
            <div className="px-0 pb-5 pt-4 sm:px-0 sm:pb-6 lg:px-0 lg:pb-8 lg:pt-6">
              <div className="max-w-[700px] pt-1 lg:max-w-[52%]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e4fb] bg-[#f2f7ff] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.03em] text-[#1558c0] shadow-[0_8px_18px_rgba(31,139,65,0.08)] lg:border-0 lg:bg-[#1f8b41] lg:text-white lg:shadow-[0_8px_18px_rgba(31,139,65,0.18)]">
                <span className="text-[#0b2347] lg:text-white">
                  <ShieldIcon />
                </span>
                <span>{data.tag}</span>
              </div>

              <h1 className="mt-4 max-w-[760px] font-['Manrope'] text-[33px] font-extrabold leading-[0.98] tracking-normal text-[#0b2347] sm:text-[42px] lg:text-[58px]">
                <span className="block">{headline.lead}</span>
                {headline.accent ? <span className="mt-1.5 block text-[#169347]">{headline.accent}</span> : null}
              </h1>

              <p className="mt-4 max-w-[650px] text-[15px] leading-[1.65] text-[#253c5d] sm:text-[16px]">
                {data.subheading}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 py-1 sm:grid-cols-4 lg:max-w-[720px]">
                {data.trustBadges.map((badge, index) => (
                  <div
                    key={`${badge}-${index}`}
                    className={`flex min-w-0 items-center gap-3 rounded-[14px] border border-[#e0e7f1] bg-white/88 px-3 py-3 text-[#163d8c] shadow-[0_10px_20px_rgba(15,23,42,0.05)] backdrop-blur-[6px] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none ${
                      index < data.trustBadges.length - 1 ? "lg:border-r lg:border-[#dbe5f2] lg:pr-3" : ""
                    }`}
                  >
                    <div className="text-[#1558c0]">{getTrustIcon(index)}</div>
                    <p className="text-[13px] font-semibold leading-[1.22] text-[#112b57]">{badge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Container>
        </div>

        <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
          <div className="relative mt-3 grid gap-3 px-0 pb-3 sm:px-0 xl:grid-cols-[minmax(0,1.38fr)_minmax(390px,0.82fr)] lg:px-0">
            <div className="rounded-[18px] border border-[#e0e7f1] bg-white/92 p-3 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-4 lg:rounded-none">
              <div className="grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)] lg:items-center">
                <div className="relative mx-auto flex h-[168px] w-full max-w-[210px] items-center justify-center">
                  <Image
                    src={optionCards[0]?.image || defaultEngineImage}
                    alt={optionCards[0]?.imageAlt || `${data.h1} engine`}
                    fill
                    className="object-contain"
                    sizes="210px"
                  />
                </div>

                <div>
                  <div className="inline-flex rounded-full bg-[#09295a] px-3 py-1 text-[10px] font-extrabold tracking-[0.03em] text-white">
                    {data.highlights?.[0]?.title?.replace(/\s+Engine$/i, "") || "Engine Code"}
                  </div>

                  <p className="mt-2.5 font-['Manrope'] text-[22px] font-extrabold tracking-normal text-[#0b2347] sm:text-[28px]">
                    From <span className="text-[#149347]">{anchorPrice || data.highlights?.[0]?.price}</span>
                  </p>

                  {detailLine ? <p className="mt-1.5 text-[13px] leading-[1.55] text-[#334a68]">{detailLine}</p> : null}

                  <div className="mt-3 grid grid-cols-3 gap-0 overflow-hidden rounded-[16px] border border-[#dfe7f1]">
                    {optionCards.map((option, index) => {
                      const tone = getOptionToneClasses(option.tone);
                      return (
                        <div key={`${option.label}-${index}`} className={`bg-[#fbfdff] px-3 py-3 ${index < optionCards.length - 1 ? "border-r border-[#dfe7f1]" : ""}`}>
                          <div className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.04em] ${tone.badge}`}>
                            {option.label}
                          </div>
                          <p className={`mt-2 text-[13px] font-extrabold ${tone.price} sm:text-[14px]`}>{option.price}</p>
                          <p className="mt-1 text-[11px] leading-[1.5] text-[#4d6483] sm:text-[12px]">{option.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-[250px] items-center rounded-[18px] border border-[#e0e7f1] bg-white/95 p-3 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:min-h-[262px] sm:p-4 lg:rounded-none">
              <div className="grid w-full gap-3">
                <div className="grid grid-cols-[88px_1fr] overflow-hidden rounded-none border border-[#dbe4f0] bg-[#fbfdff]">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-r border-[#dbe4f0] px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <UkFlagIcon />
                      <span className="text-[15px] font-extrabold text-[#0b2347]">{data.registrationInput?.countryCode ?? "GB"}</span>
                    </div>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0b2347]" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={data.registrationInput?.platePlaceholder || data.form.inputPlaceholder}
                    className="min-w-0 border-0 bg-transparent px-4 text-[15px] text-[#0b2347] outline-none placeholder:text-[#7487a1]"
                    aria-label={data.registrationInput?.label || data.form.heading}
                  />
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={data.form.heading}
                  data-quote-source="variant-hero"
                  className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[10px] bg-[#169347] px-5 text-center text-[15px] font-extrabold text-white shadow-[0_16px_28px_rgba(22,147,71,0.24)] transition hover:bg-[#117f3b]"
                >
                  <span>{data.form.buttonText.replace(/\s*->\s*$/, "")}</span>
                  <span className="pl-1.5">
                    <ArrowIcon />
                  </span>
                </a>

                <div className="flex items-start gap-3 px-1 text-[13px] leading-[1.5] text-[#253a58]">
                  <span className="mt-1 text-[#0b2347]">
                    <LockIcon />
                  </span>
                  <p>{data.form.note}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="bg-[#0a1c36]">
          <div className="hidden h-14 items-center overflow-hidden bg-[#0a1c36] lg:flex">
            <Container className="!max-w-none !px-4 sm:!px-4 lg:!px-6">
              <div className="hero-ticker-track h-14 bg-[#0a1c36]" style={{ animationDuration: "32s" }}>
                {bottomTickerLoop.map((item, index) => (
                  <span
                    key={`desktop-bottom-ticker-${index}`}
                    className="flex h-14 flex-none items-center gap-[10px] border-r border-r-white/10 px-6 text-[12px] leading-[1.4] text-white/80"
                  >
                    <img src={item.src} alt="" aria-hidden="true" className="h-7 w-7 flex-none object-contain" loading="eager" />
                    <span>{item.text}</span>
                  </span>
                ))}
              </div>
            </Container>
          </div>

          <div className="flex h-12 items-center overflow-hidden bg-[#0a1c36] lg:hidden">
            <div className="hero-ticker-track h-12 bg-[#0a1c36]" style={{ animationDuration: "45s" }}>
              {bottomTickerLoop.map((item, index) => (
                <span
                  key={`mobile-bottom-ticker-${index}`}
                  className="flex h-12 flex-none items-center gap-[8px] border-r border-r-white/10 px-5 text-[12px] text-white/80"
                >
                  <img src={item.src} alt="" aria-hidden="true" className="h-6 w-6 flex-none object-contain" loading="eager" />
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
