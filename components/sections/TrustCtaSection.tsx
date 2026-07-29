import Image from "next/image";
import type { ReactElement } from "react";
import { CtaStrip } from "@/components/ui/CalloutCards";
import Section from "@/components/ui/Section";
import type { TrustCtaData } from "@/types/brand";

type Props = {
  data: TrustCtaData;
  brandName: string;
  imageSrc: string;
  displayMode?: "brand" | "document" | "variant";
};

function splitFinalCtaText(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return { title: "", description: "" };
  }

  const firstSentenceMatch = normalized.match(/^(.+?[.!?])\s+(.+)$/);
  if (!firstSentenceMatch) {
    return { title: normalized, description: "" };
  }

  return {
    title: firstSentenceMatch[1].trim(),
    description: firstSentenceMatch[2].trim(),
  };
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 7h8M4 17h8M12 7l3-3m-3 3 3 3M12 17l3-3m-3 3 3 3M20 7h-2M20 17h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M14 11h4l3 3v3h-7v-6Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 5h14v14H5V5Zm4 4h6m-6 4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M6.5 4.5h3l1.2 3.3-1.8 1.8a15 15 0 0 0 5.3 5.3l1.8-1.8 3.3 1.2v3A2 2 0 0 1 17.3 20C10.5 20 4 13.5 4 6.7A2 2 0 0 1 6.5 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type TrustIconAsset = {
  src?: string;
  alt: string;
  fallback: () => ReactElement;
};

function getTrustIcon(title: string): TrustIconAsset {
  const normalized = title.toLowerCase();

  if (normalized.includes("compare")) {
    return {
      src: "/icons/engine-market/accent-variant-directory.png",
      alt: "Variant directory icon",
      fallback: CompareIcon,
    };
  }

  if (normalized.includes("service") || normalized.includes("supply")) {
    return {
      src: "/icons/engine-market/accent-nationwide-delivery.png",
      alt: "Nationwide delivery icon",
      fallback: DeliveryIcon,
    };
  }

  return {
    src: "/icons/engine-market/accent-warranty-minimum-standard.png",
    alt: "Warranty minimum standard icon",
    fallback: ShieldIcon,
  };
}

export default function TrustCtaSection({
  data,
  brandName,
  imageSrc,
  displayMode = "brand",
}: Props) {
  const ui = data.ui ?? {};
  const secondaryAction = data.secondaryAction ?? {};
  const headingLines = data.h2 ? data.h2.split(/\s+-\s+/) : [];
  const isDocumentMode = displayMode === "document";
  const isVariantMode = displayMode === "variant";
  const parsedFinalCta = splitFinalCtaText(data.finalText);
  const trustBullets = isDocumentMode || isVariantMode
    ? (ui.trustBullets ?? [])
    : (ui.trustBullets ?? [
        "100% Free",
        "No Obligation",
        "Fast & secure process",
        "UK-based support",
      ]);
  const pointLabel = isDocumentMode || isVariantMode ? (ui.pointLabel?.trim() ?? "") : (ui.pointLabel?.trim() ?? "Included");
  const stripLabel = isDocumentMode || isVariantMode ? (ui.stripLabel?.trim() ?? "") : (ui.stripLabel?.trim() ?? "Trusted UK Engine Marketplace");
  const defaultDocumentStripTitle = `Find the best ${brandName} engine replacement near you`;
  const defaultDocumentStripDescription = `Compare engine prices for ${brandName} in the UK and get competitive quotes from garages near you.`;
  const stripTitle =
    isDocumentMode
      ? defaultDocumentStripTitle
      : isVariantMode
        ? ui.stripTitle?.trim() || parsedFinalCta.title || data.finalText
      : ui.stripTitle?.trim() || `Compare ${brandName} engine prices with vetted UK specialists`;
  const stripDescription =
    isDocumentMode
      ? defaultDocumentStripDescription
      : isVariantMode
        ? ui.stripDescription?.trim() || parsedFinalCta.description
      : ui.stripDescription?.trim() || data.finalText;
  const secondaryActionText = secondaryAction.text?.trim();
  const showPointLabel = ui.showPointLabel ?? (displayMode === "brand");
  const showStripLabel = ui.showStripLabel ?? (displayMode === "brand");
  const showSecondaryAction = ui.showSecondaryAction ?? (displayMode === "brand");

  return (
    <Section className="bg-[#f8fafc] px-0 pt-3 sm:pt-4">
      <div className="w-full overflow-hidden bg-[#071936] shadow-[0_18px_46px_rgba(7,25,54,0.16)]">
        <div className="w-full">
          <div className="relative grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative z-[1] px-5 py-4 sm:px-6 sm:py-5 lg:pr-4">
              <p className="text-label text-blue-200">{data.tag}</p>

              <h2 className="mt-2 max-w-[500px] text-[1.5rem] font-black leading-[1.02] !text-white sm:text-[1.8rem]">
                {headingLines.length > 1 ? (
                  headingLines.map((line, index) => (
                    <span key={`${line}-${index}`} className={`block ${index === headingLines.length - 1 ? "text-[#22c55e]" : ""}`}>
                      {line}
                    </span>
                  ))
                ) : (
                  data.h2
                )}
              </h2>

              <p className="mt-2.5 max-w-[540px] text-[0.85rem] leading-5 text-slate-200">
                {data.intro}
              </p>

              <div className="mt-3.5 grid gap-2 sm:grid-cols-3">
                {data.points.map((point, index) => {
                  const trustIcon = getTrustIcon(point.title);
                  const FallbackIcon = trustIcon.fallback;

                  return (
                    <div key={`${point.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
                      <div className="flex items-center gap-2 text-green-300">
                        {trustIcon.src ? (
                          <Image
                            src={trustIcon.src}
                            alt={trustIcon.alt}
                            width={16}
                            height={16}
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <FallbackIcon />
                        )}
                        {showPointLabel && pointLabel ? <p className="text-label text-green-300">{pointLabel}</p> : null}
                      </div>
                      <p className="mt-1.5 text-[0.8rem] font-bold leading-5 text-white">{point.title}</p>
                      <p className="mt-1 text-[0.7rem] leading-5 text-slate-300">{point.description}</p>
                    </div>
                  );
                })}
              </div>

              {displayMode === "brand" ? (
                <p className="mt-3 max-w-[540px] text-[0.78rem] leading-5 text-blue-100/90">
                  {data.finalText}
                </p>
              ) : null}

              <div className="mt-4">
                {isDocumentMode || isVariantMode ? (
                  <CtaStrip
                    tone="dark"
                    title={stripTitle}
                    description={stripDescription}
                    buttonText={data.buttonText.replace("->", "").trim()}
                    titleAs="h2"
                    descriptionAs="h3"
                    titleClassName="!mt-1 !font-['Urbanist'] !text-[13px] !font-extrabold !leading-[1.35] !tracking-normal !normal-case !text-white"
                    descriptionClassName="!mt-1 !font-['Urbanist'] !text-[12px] !font-medium !leading-[1.6] !tracking-normal !normal-case !text-slate-200"
                    buttonClassName="!relative !min-h-[46px] !overflow-visible !rounded-[10px] !border !border-[#15803d] !bg-[linear-gradient(180deg,#1aae4d_0%,#15803d_100%)] !px-5 !text-[12px] !font-bold !text-white !shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_14px_rgba(34,197,94,0.26)] !whitespace-nowrap md:!min-w-[360px] md:!justify-between before:!absolute before:!inset-x-0 before:!top-0 before:!h-[45%] before:!bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] before:!content-['']"
                    icon={<QuoteIcon />}
                    linkProps={{
                      href: "#quote-form",
                      "data-quote-context": `Final ${brandName} engine comparison`,
                      "data-quote-source": "trust-cta",
                    }}
                    secondaryAction={
                      showSecondaryAction && secondaryActionText ? (
                        <a
                          href={secondaryAction.href ?? "tel:03330000044"}
                          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-white/14 bg-white/[0.08] px-4 text-[11px] font-bold text-white transition hover:bg-white/[0.12]"
                        >
                          <PhoneIcon />
                          {secondaryActionText}
                        </a>
                      ) : undefined
                    }
                  />
                ) : (
                  <CtaStrip
                    tone="dark"
                    label={showStripLabel && stripLabel ? stripLabel : undefined}
                    title={stripTitle}
                    description={stripDescription}
                    buttonText={data.buttonText.replace("->", "").trim()}
                    buttonClassName="!relative !min-h-[46px] !overflow-visible !rounded-[10px] !border !border-[#15803d] !bg-[linear-gradient(180deg,#1aae4d_0%,#15803d_100%)] !px-5 !text-white !shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_14px_rgba(34,197,94,0.26)] !whitespace-nowrap md:!min-w-[360px] md:!justify-between before:!absolute before:!inset-x-0 before:!top-0 before:!h-[45%] before:!bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0))] before:!content-['']"
                    icon={<QuoteIcon />}
                    linkProps={{
                      href: "#quote-form",
                      "data-quote-context": `Final ${brandName} engine comparison`,
                      "data-quote-source": "trust-cta",
                    }}
                    secondaryAction={
                      showSecondaryAction && secondaryActionText ? (
                        <a
                          href={secondaryAction.href ?? "tel:03330000044"}
                          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-white/14 bg-white/[0.08] px-4 text-[11px] font-bold text-white transition hover:bg-white/[0.12]"
                        >
                          <PhoneIcon />
                          {secondaryActionText}
                        </a>
                      ) : undefined
                    }
                  />
                )}
              </div>

              <div className="mt-3">
                <div className="grid grid-cols-2 divide-x divide-y divide-white/14 rounded-none bg-white/[0.04] px-0 py-0 sm:grid-cols-4 sm:divide-y-0">
                  {trustBullets.map((item) => (
                    <span key={item} className="min-w-0 px-2 py-2 text-center text-[0.62rem] leading-[1.25] font-semibold text-slate-300 sm:py-1 sm:text-[0.68rem]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[210px] overflow-hidden lg:min-h-[100%]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,54,1)_0%,rgba(7,25,54,0.55)_18%,rgba(7,25,54,0.12)_34%,rgba(7,25,54,0)_48%)] lg:bg-[linear-gradient(90deg,rgba(7,25,54,1)_0%,rgba(7,25,54,0.42)_18%,rgba(7,25,54,0.12)_34%,rgba(7,25,54,0)_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(59,130,246,0.26),transparent_34%)]" />

              <Image
                src={imageSrc}
                alt={data.imageAlt ?? `${brandName} vehicle`}
                fill
                className="object-cover object-center opacity-[0.84]"
              />
              <div className="absolute inset-x-[12%] top-[14%] h-[26%] rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.05))] opacity-35 blur-[2px]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_24%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.08))] mix-blend-screen" />

              <div className="absolute inset-x-3 bottom-3 max-w-[calc(100%-24px)] rounded-2xl border border-white/10 bg-[#06172f]/88 px-3 py-2.5 text-center backdrop-blur-sm lg:inset-x-auto lg:right-3 lg:max-w-[320px] lg:text-right">
                {isDocumentMode || isVariantMode ? (
                  <>
                    {ui.imageBadgeLabel ? <p className="text-label text-green-300">{ui.imageBadgeLabel}</p> : null}
                    {ui.imageBadgeTitle ? <p className="mt-1 break-words text-[0.74rem] font-bold leading-[1.3] text-white lg:text-[0.8rem]">{ui.imageBadgeTitle}</p> : null}
                    {ui.imageBadgeText ? <p className="mt-1 break-words text-[0.65rem] leading-[1.35] text-slate-300 lg:text-[0.69rem]">{ui.imageBadgeText}</p> : null}
                  </>
                ) : (
                  <>
                    <p className="text-label text-green-300">{ui.imageBadgeLabel ?? "Trusted supplier network"}</p>
                    <p className="mt-1 break-words text-[0.72rem] font-bold leading-[1.3] text-white sm:text-[0.8rem]">{ui.imageBadgeTitle ?? "Warranty-backed rebuilt & used options"}</p>
                    <p className="mt-1 break-words text-[0.64rem] leading-[1.35] text-slate-300 sm:text-[0.69rem]">{ui.imageBadgeText ?? "Every quote checked for fitment, quality and lead time."}</p>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
