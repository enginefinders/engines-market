import Image from "next/image";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import type { TrustCtaData } from "@/types/brand";

type Props = {
  data: TrustCtaData;
  brandName: string;
  imageSrc: string;
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m6 12 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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

function getTrustIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("compare")) {
    return CompareIcon;
  }

  if (normalized.includes("service") || normalized.includes("supply")) {
    return DeliveryIcon;
  }

  return ShieldIcon;
}

export default function TrustCtaSection({ data, brandName, imageSrc }: Props) {
  return (
    <Section className="bg-white px-0 pt-3 sm:pt-4">
      <div className="w-full overflow-hidden bg-[#071936] shadow-[0_18px_46px_rgba(7,25,54,0.16)]">
        <div className="w-full">
          <div className="relative grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative z-[1] px-5 py-4 sm:px-6 sm:py-5 lg:pr-4">
              <p className="text-label text-blue-200">{data.tag}</p>

              <h2 className="mt-2 max-w-[500px] text-[1.5rem] font-black leading-[1.02] !text-white sm:text-[1.8rem]">
                {data.h2}
              </h2>

              <p className="mt-2.5 max-w-[540px] text-[0.85rem] leading-5 text-slate-200">
                {data.intro}
              </p>

              <div className="mt-3.5 grid gap-2 sm:grid-cols-3">
                {data.points.map((point, index) => {
                  const Icon = getTrustIcon(point.title);

                  return (
                    <div key={`${point.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
                      <div className="flex items-center gap-2 text-green-300">
                        <Icon />
                        <p className="text-label text-green-300">Included</p>
                      </div>
                      <p className="mt-1.5 text-[0.8rem] font-bold leading-5 text-white">{point.title}</p>
                      <p className="mt-1 text-[0.7rem] leading-5 text-slate-300">{point.description}</p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-3 max-w-[540px] text-[0.78rem] leading-5 text-blue-100/90">
                {data.finalText}
              </p>

              <div className="mt-4 grid gap-2.5 md:max-w-[500px] md:grid-cols-[1fr_auto]">
                <Button
                  href="#quote-form"
                  data-quote-context={`Final ${brandName} engine comparison`}
                  data-quote-source="trust-cta"
                  className="justify-center rounded-xl bg-[#2463eb] px-5 py-3 text-[0.82rem] hover:bg-[#1f54c7]"
                >
                  <span className="inline-flex items-center gap-2">
                    <QuoteIcon />
                    {data.buttonText.replace("->", "").trim()}
                  </span>
                </Button>

                <a
                  href="tel:03330000044"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.08] px-4 py-3 text-[0.8rem] font-bold text-white transition hover:bg-white/[0.12]"
                >
                  <PhoneIcon />
                  Call Our Experts
                </a>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                {[
                  "100% Free",
                  "No Obligation",
                  "Fast & secure process",
                  "UK-based support",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-slate-300">
                    <CheckIcon />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[210px] overflow-hidden lg:min-h-[100%]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,25,54,1)_0%,rgba(7,25,54,0.55)_18%,rgba(7,25,54,0.12)_34%,rgba(7,25,54,0)_48%)] lg:bg-[linear-gradient(90deg,rgba(7,25,54,1)_0%,rgba(7,25,54,0.42)_18%,rgba(7,25,54,0.12)_34%,rgba(7,25,54,0)_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(59,130,246,0.26),transparent_34%)]" />

              <Image
                src={imageSrc}
                alt={`${brandName} vehicle`}
                fill
                className="object-cover object-center"
              />

              <div className="absolute bottom-3 right-3 rounded-2xl border border-white/10 bg-[#06172f]/88 px-3.5 py-2.5 text-right backdrop-blur-sm">
                <p className="text-label text-green-300">Trusted supplier network</p>
                <p className="mt-1 text-[0.8rem] font-bold text-white">Warranty-backed rebuilt & used options</p>
                <p className="mt-1 text-[0.69rem] text-slate-300">Every quote checked for fitment, quality and lead time.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
