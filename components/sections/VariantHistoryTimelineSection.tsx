import Image from "next/image";
import type { VariantHistoryTimelineData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHistoryTimelineData;
  vehicleImage?: string;
};

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

function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineIcon({ index }: { index: number }) {
  const icons = [
    <AssetIcon key="engine" src="/icons/variant/dark-green/engine.png" className="h-7 w-7 object-contain" />,
    <AssetIcon key="known" src="/icons/variant/dark-green/known-for.png" className="h-7 w-7 object-contain" />,
    <AssetIcon key="bearing" src="/icons/variant/dark-green/rod-bearing.png" className="h-7 w-7 object-contain" />,
    <AssetIcon key="major" src="/icons/variant/dark-green/major-change.png" className="h-7 w-7 object-contain" />,
    <AssetIcon key="calendar" src="/icons/variant/dark-green/calendar.png" className="h-7 w-7 object-contain" />,
  ];

  return icons[index % icons.length];
}

function getMetaIcon(label: string, className = "h-5 w-5") {
  const normalizedLabel = label.toLowerCase();

  if (normalizedLabel.includes("fuel")) {
    return <AssetIcon src="/icons/variant/dark-green/petrol.png" className={`${className} object-contain`} />;
  }
  if (normalizedLabel.includes("engine")) {
    return <AssetIcon src="/icons/variant/dark-green/engine.png" className={`${className} object-contain`} />;
  }
  if (normalizedLabel.includes("power") || normalizedLabel.includes("hp")) {
    return <AssetIcon src="/icons/variant/dark-green/upgraded-components.png" className={`${className} object-contain`} />;
  }
  if (normalizedLabel.includes("year") || normalizedLabel.includes("produced") || normalizedLabel.includes("fitted")) {
    return <AssetIcon src="/icons/variant/dark-green/calendar.png" className={`${className} object-contain`} />;
  }

  return <AssetIcon src="/icons/variant/dark-green/calendar.png" className={`${className} object-contain`} />;
}

function normalizeCopy(text: string) {
  return text
    .replaceAll("Â£", "£")
    .replaceAll("Â·", "·")
    .replace(/[â€“â€”]/g, "-")
    .replaceAll("Â", "")
    .trim();
}

function normalizeMilestoneText(description: string) {
  const match = normalizeCopy(description).match(/^(.*?)(?:,\s+|:\s+)(.+)$/);
  if (!match) {
    return { title: normalizeCopy(description), body: "" };
  }
  return { title: match[1].trim(), body: match[2].trim() };
}

export default function VariantHistoryTimelineSection({ data, vehicleImage }: Props) {
  const rawMilestones = data.milestones as Array<VariantHistoryTimelineData["milestones"][number] | string>;
  const rawSpecs = data.specs as Array<VariantHistoryTimelineData["specs"][number] | string>;

  const milestones = rawMilestones.map((milestone) => {
    if (typeof milestone === "string") {
      const yearMatch = milestone.match(/^(\d{4}|Present)\s*-\s*(.+)$/i);
      return {
        year: yearMatch?.[1] ?? "",
        description: yearMatch?.[2] ?? milestone,
      };
    }
    return milestone;
  });

  const specs = rawSpecs.map((spec) => {
    if (typeof spec === "string") {
      const split = spec.split(":");
      return {
        label: split[0]?.trim() ?? spec,
        value: split.slice(1).join(":").trim() || spec,
      };
    }
    return spec;
  });

  const normalizedTag = normalizeCopy(data.tag);
  const normalizedHeading = normalizeCopy(data.h2);
  const normalizedIntro = normalizeCopy(data.intro);
  const normalizedSpecsLabel = normalizeCopy(data.specsLabel);
  const normalizedClosingNote = data.closingNote ? normalizeCopy(data.closingNote) : "";

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#edf4ff_0%,#ffffff_54%,#f7fbff_100%)] py-2 sm:py-3 lg:py-5">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:gap-10">
            <div className="lg:pr-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-[#16803d]">
                <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-4 w-4 object-contain" />
                <span>{normalizedTag}</span>
              </div>

              <h2 className="mt-3 max-w-[720px] font-['Manrope'] text-[34px] font-extrabold leading-[1.03] tracking-normal text-[#0b2347] sm:text-[44px] lg:text-[54px]">
                {normalizedHeading}
              </h2>

              <p className="mt-3 max-w-[600px] text-[15px] leading-[1.68] text-[#243b5a]">{normalizedIntro}</p>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-5 w-5 object-contain" />
                  </span>
                  <h3 className="text-[18px] font-extrabold tracking-normal">Engine History Timeline</h3>
                </div>

                <div className="mt-4 space-y-2.5">
                  {milestones.map((milestone, index) => {
                    const split = normalizeMilestoneText(milestone.description);

                    return (
                      <div key={`${milestone.year}-${index}`} className="grid grid-cols-[88px_68px_minmax(0,1fr)] items-start gap-3">
                        <div className="relative pt-4 text-[16px] font-extrabold text-[#16803d] sm:text-[17px]">
                          {index < milestones.length - 1 ? (
                            <span className="absolute left-[7px] top-9 h-[calc(100%+12px)] w-px bg-[#bad7c0]" aria-hidden="true" />
                          ) : null}
                          <span className="absolute left-0 top-4 h-4 w-4 rounded-full border-4 border-white bg-[#16803d] shadow-[0_0_0_1px_rgba(22,128,61,0.28)]" aria-hidden="true" />
                          <span className="pl-8">{normalizeCopy(milestone.year)}</span>
                        </div>

                        <div className="mt-1 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f3f8f4] text-[#1f4e3c]">
                          <TimelineIcon index={index} />
                        </div>

                        <div className="border-b border-[#e7edf5] py-3 last:border-b-0">
                          <p className="text-[14px] leading-[1.58] text-[#314865] sm:text-[15px]">
                            <span className="font-extrabold text-[#0f274d]">{split.title}</span>
                            {split.body ? <span>{` ${split.body}`}</span> : null}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:pl-2">
              <div className="relative overflow-hidden rounded-[26px] bg-transparent">
                <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_72%_34%,rgba(255,255,255,0.68),rgba(255,255,255,0)_48%)]" />
                {vehicleImage ? (
                  <Image
                    src={vehicleImage}
                    alt={normalizedHeading}
                    width={1280}
                    height={853}
                    className="relative z-[1] h-auto w-full object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0.18)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[44%] bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.94)_20%,rgba(247,251,255,0.72)_42%,rgba(247,251,255,0.24)_68%,rgba(247,251,255,0)_100%)]" />
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <ShieldIcon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[18px] font-extrabold tracking-normal">{normalizedSpecsLabel}</h3>
                  <span className="h-px flex-1 bg-[#dbe5f2]" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-y-5 sm:grid-cols-4">
                  {specs.map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className="border-r border-[#e5edf6] px-3 text-center last:border-r-0 sm:px-4"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8ef] text-[#16803d] sm:h-16 sm:w-16">
                        {getMetaIcon(spec.label, "h-6 w-6 sm:h-7 sm:w-7")}
                      </div>
                      <p className="mt-3 text-[12px] leading-[1.5] text-[#173153] sm:text-[13px] sm:leading-[1.58]">
                        <span className="font-semibold">{normalizeCopy(spec.label)}</span>
                        <span className="mt-1 block text-[#314865]">{normalizeCopy(spec.value)}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {normalizedClosingNote ? (
                  <div className="mt-5 rounded-[20px] border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-4 py-4 shadow-[0_12px_24px_rgba(22,128,61,0.08)]">
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_110px] sm:items-center">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-[#16803d] shadow-[0_10px_20px_rgba(22,128,61,0.1)]">
                          <ShieldIcon className="h-6 w-6" />
                        </div>
                        <p className="text-[14px] leading-[1.68] text-[#24405a]">{normalizedClosingNote}</p>
                      </div>
                      <div className="relative mx-auto hidden h-[88px] w-[110px] sm:block">
                        <Image
                          src="/images/shared/hero-engines/temporary-petrol-engine.jpeg"
                          alt=""
                          fill
                          className="object-contain opacity-70"
                          sizes="110px"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
