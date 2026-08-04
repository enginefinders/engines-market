"use client";

import Image from "next/image";
import type { VariantHeroData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHeroData;
  backgroundArtwork?: string;
  vehicleImage: string;
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

function normalizeCopy(text: string) {
  return text
    .replaceAll("Â£", "£")
    .replaceAll("Â·", "·")
    .replace(/[â€“â€”]/g, "-")
    .replaceAll("Â", "")
    .trim();
}

function stripLeadingArrow(text: string) {
  return normalizeCopy(text).replace(/^\s*->\s*/u, "").trim();
}

function parseAnchorPrice(data: VariantHeroData) {
  const line = normalizeCopy(data.highlights?.[0]?.line1 ?? data.highlights?.[0]?.price ?? "");
  if (!line) return normalizeCopy(data.highlights?.[0]?.price ?? "");
  const pieces = line.split(/[-:]/);
  const extracted = pieces.length > 1 ? pieces.slice(1).join("-").trim() : line;
  return extracted.replace(/^from\s+/i, "").trim();
}

function getEngineCards(data: VariantHeroData) {
  if (data.engineOptions?.length) {
    return data.engineOptions.map((option) => ({
      ...option,
      label: normalizeCopy(option.label),
      price: normalizeCopy(option.price),
      description: stripLeadingArrow(option.description),
    }));
  }

  const detail = stripLeadingArrow(data.highlights?.[0]?.detail ?? "");
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
  const normalized = normalizeCopy(h1);
  const match = normalized.match(/^(.*?)(?:\s*-\s*)(.*)$/);
  if (!match) {
    return { lead: normalized, accent: "" };
  }
  return {
    lead: match[1].trim(),
    accent: match[2].trim(),
  };
}

export default function VariantHeroSection({ data, backgroundArtwork, vehicleImage }: Props) {
  const headline = getHeadlineParts(data.h1);
  const optionCards = getEngineCards(data);
  const anchorPrice = parseAnchorPrice(data);
  const detailLine = stripLeadingArrow(data.highlights?.[0]?.detail ?? data.highlights?.[0]?.line2 ?? "");
  const bottomTickerLoop = [...bottomBarItems, ...bottomBarItems];
  const vehicleBadge = normalizeCopy(data.vehicleBadge || headline.lead.split(" ").slice(-1)[0] || "BMW");
  const tagText = normalizeCopy(data.tag);
  const subheading = normalizeCopy(data.subheading);
  const trustBadges = data.trustBadges.map((badge) => normalizeCopy(badge));
  const formButtonText = stripLeadingArrow(data.form.buttonText).replace(/\s*->\s*$/u, "");
  const inputPlaceholder = normalizeCopy(data.registrationInput?.platePlaceholder || data.form.inputPlaceholder);
  const formNote = normalizeCopy(data.form.note);
  const highlightLabel = normalizeCopy(data.highlights?.[0]?.title?.replace(/\s+Engine$/i, "") || "Engine Code");

  return (
    <Section className="overflow-hidden !px-0 !py-[2px]">
      <div className="relative overflow-hidden bg-[#eef3f8]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.98),rgba(255,255,255,0.92)_22%,rgba(239,244,250,0.82)_50%,rgba(229,237,247,0.8)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_44%,rgba(210,221,236,0.42)_44%,rgba(210,221,236,0.42)_49%,rgba(255,255,255,0)_49%,rgba(255,255,255,0)_58%,rgba(215,226,240,0.22)_58%,rgba(215,226,240,0.22)_64%,rgba(255,255,255,0)_64%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.76)_0%,rgba(255,255,255,0.32)_36%,rgba(239,244,250,0.08)_58%,rgba(232,239,248,0.55)_100%)]" />
        {backgroundArtwork ? (
          <div
            className="absolute inset-y-0 right-[-8%] hidden w-[42%] opacity-[0.035] blur-[1px] lg:block"
            style={{
              backgroundImage: `url(${backgroundArtwork})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              backgroundSize: "cover",
            }}
          />
        ) : null}
        <div className="absolute right-[6%] top-8 hidden font-['Manrope'] text-[160px] font-extrabold uppercase leading-none tracking-[-0.08em] text-[#dbe4ef] opacity-70 lg:block xl:text-[190px]">
          {vehicleBadge}
        </div>
        <div className="absolute inset-y-0 right-0 hidden w-[54%] bg-[radial-gradient(circle_at_72%_38%,rgba(255,255,255,0.52),rgba(255,255,255,0)_44%)] lg:block" />

        <Container className="relative max-w-[1400px] !px-0 sm:!px-0 lg:!px-0">
          <div className="grid items-center gap-5 px-0 pb-6 pt-4 sm:pb-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.02fr)] lg:gap-8 lg:pb-5 lg:pt-7">
            <div className="relative z-10 max-w-[700px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1f8b41] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.03em] text-white shadow-[0_8px_18px_rgba(31,139,65,0.18)]">
                <span className="text-white">
                  <ShieldIcon />
                </span>
                <span>{tagText}</span>
              </div>

              <h1 className="mt-4 max-w-[760px] font-['Manrope'] text-[33px] font-extrabold leading-[0.98] tracking-normal text-[#0b2347] sm:text-[42px] lg:text-[58px]">
                <span className="block">{headline.lead}</span>
                {headline.accent ? <span className="mt-1.5 block text-[#169347]">{headline.accent}</span> : null}
              </h1>

              <p className="mt-4 max-w-[650px] text-[15px] leading-[1.68] text-[#253c5d] sm:text-[16px]">
                {subheading}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 py-1 sm:grid-cols-4 lg:max-w-[760px]">
                {trustBadges.map((badge, index) => (
                  <div
                    key={`${badge}-${index}`}
                    className={`flex min-w-0 items-center gap-3 rounded-[14px] border border-[#e0e7f1] bg-white/88 px-3 py-3 text-[#163d8c] shadow-[0_10px_20px_rgba(15,23,42,0.05)] backdrop-blur-[6px] lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none lg:backdrop-blur-none ${
                      index < trustBadges.length - 1 ? "lg:border-r lg:border-[#dbe5f2] lg:pr-4" : ""
                    }`}
                  >
                    <div className="text-[#1558c0]">{getTrustIcon(index)}</div>
                    <p className="text-[13px] font-semibold leading-[1.24] text-[#112b57]">{badge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 min-h-[230px] sm:min-h-[280px] lg:min-h-[430px]">
              <div className="absolute inset-x-[8%] bottom-[7%] top-[20%] rounded-full bg-[radial-gradient(circle,rgba(132,149,175,0.18),rgba(132,149,175,0)_68%)] blur-3xl lg:inset-x-[16%] lg:bottom-[8%] lg:top-[14%]" />
              <Image
                src={vehicleImage}
                alt={normalizeCopy(data.imageAlt || headline.lead)}
                fill
                priority
                className="object-contain object-[72%_66%] lg:translate-x-[8%] lg:object-[78%_62%] xl:translate-x-[12%] xl:object-[82%_61%]"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </div>

          <div className="relative grid gap-4 pb-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(400px,0.84fr)]">
            <div className="rounded-[20px] border border-[#dfe7f1] bg-white/96 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[188px_minmax(0,1fr)] lg:items-center">
                <div className="relative mx-auto flex h-[174px] w-full max-w-[210px] items-center justify-center lg:h-[188px] lg:max-w-[220px]">
                  <Image
                    src={optionCards[0]?.image || defaultEngineImage}
                    alt={normalizeCopy(optionCards[0]?.imageAlt || `${headline.lead} engine`)}
                    fill
                    className="object-contain"
                    sizes="220px"
                  />
                </div>

                <div>
                  <div className="inline-flex rounded-full bg-[#09295a] px-3 py-1 text-[10px] font-extrabold tracking-[0.03em] text-white">
                    {highlightLabel}
                  </div>

                  <p className="mt-2.5 font-['Manrope'] text-[26px] font-extrabold tracking-normal text-[#0b2347] sm:text-[30px]">
                    From <span className="text-[#149347]">{anchorPrice || normalizeCopy(data.highlights?.[0]?.price || "")}</span>
                  </p>

                  {detailLine ? <p className="mt-1.5 text-[13px] leading-[1.6] text-[#334a68]">{detailLine}</p> : null}

                  <div
                    className="mt-4 grid overflow-hidden rounded-[18px] border border-[#dfe7f1]"
                    style={{ gridTemplateColumns: `repeat(${optionCards.length}, minmax(0, 1fr))` }}
                  >
                    {optionCards.map((option, index) => {
                      const tone = getOptionToneClasses(option.tone);
                      return (
                        <div
                          key={`${option.label}-${index}`}
                          className={`bg-[#fbfdff] px-3 py-3 sm:px-4 sm:py-4 ${index < optionCards.length - 1 ? "border-r border-[#dfe7f1]" : ""}`}
                        >
                          <div className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.04em] ${tone.badge}`}>
                            {option.label}
                          </div>
                          <p className={`mt-2 text-[13px] font-extrabold ${tone.price} sm:text-[14px]`}>{option.price}</p>
                          <p className="mt-1 text-[11px] leading-[1.55] text-[#4d6483] sm:text-[12px]">{option.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex min-h-[250px] items-center rounded-[20px] border border-[#dfe7f1] bg-white/98 p-4 shadow-[0_16px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:min-h-[262px] sm:p-5">
              <div className="grid w-full gap-4">
                <div className="grid grid-cols-[104px_1fr] overflow-hidden rounded-[12px] border border-[#d7e1ee] bg-[#fbfcfe]">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-r border-[#d7e1ee] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <UkFlagIcon />
                      <span className="text-[15px] font-extrabold text-[#0b2347]">{normalizeCopy(data.registrationInput?.countryCode ?? "UK")}</span>
                    </div>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0b2347]" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={inputPlaceholder}
                    className="min-h-[58px] min-w-0 border-0 bg-transparent px-4 text-[16px] font-medium text-[#0b2347] outline-none placeholder:font-normal placeholder:text-[#7487a1]"
                    aria-label={normalizeCopy(data.registrationInput?.label || data.form.heading)}
                  />
                </div>

                <a
                  href="#quote-form"
                  data-quote-context={normalizeCopy(data.form.heading)}
                  data-quote-source="variant-hero"
                  className="inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[12px] bg-[#169347] px-5 text-center text-[15px] font-extrabold text-white shadow-[0_16px_28px_rgba(22,147,71,0.24)] transition hover:bg-[#117f3b]"
                >
                  <span>{formButtonText}</span>
                  <span className="pl-1">
                    <ArrowIcon />
                  </span>
                </a>

                <div className="flex items-start gap-3 px-1 text-[13px] leading-[1.52] text-[#253a58]">
                  <span className="mt-1 text-[#0b2347]">
                    <LockIcon />
                  </span>
                  <p>{formNote}</p>
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
