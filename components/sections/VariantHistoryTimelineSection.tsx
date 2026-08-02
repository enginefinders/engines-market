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

function normalizeMilestoneText(description: string) {
  const match = description.match(/^(.*?)(?:,\s+|:\s+)(.+)$/);
  if (!match) {
    return { title: description, body: "" };
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

  const metaItems = data.vehicleMeta?.length ? data.vehicleMeta : specs.slice(0, 3);
  const vehicleTitle = data.vehicleTitle?.trim() || data.h2.replace(/\s+[—-]\s+Engine History.*$/i, "").trim() || data.h2;

  return (
    <Section className="bg-white !py-[2px]">
      <Container className="max-w-[1400px] px-0 sm:px-0 lg:px-0">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#edf4ff_0%,#ffffff_54%,#f7fbff_100%)] py-[2px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(520px,1.04fr)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-[#16803d]">
                <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-4 w-4 object-contain" />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-3 max-w-[720px] font-['Manrope'] text-[34px] font-extrabold leading-[1.03] tracking-normal text-[#0b2347] sm:text-[44px] lg:text-[54px]">
                {data.h2}
              </h2>

              <p className="mt-3 max-w-[590px] text-[15px] leading-[1.65] text-[#243b5a]">{data.intro}</p>

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
                          <span className="pl-8">{milestone.year}</span>
                        </div>

                        <div className="mt-1 flex h-16 w-16 items-center justify-center rounded-[16px] bg-[#f3f8f4] text-[#1f4e3c]">
                          <TimelineIcon index={index} />
                        </div>

                        <div className="border-b border-[#e7edf5] py-3 last:border-b-0">
                          <p className="text-[14px] leading-[1.55] text-[#314865] sm:text-[15px]">
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

            <div>
              <div className="relative min-h-[280px] overflow-hidden bg-[#eef3fa] sm:min-h-[332px]">
                <div className="absolute inset-0">
                  <Image
                    src={vehicleImage || "/images/brands/bmw/models/bmw-m3-removebg.png"}
                    alt={vehicleTitle}
                    fill
                    className="object-cover object-[72%_center] sm:object-[74%_center] lg:object-[78%_center]"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(240,246,252,0.24))]" />
                <div className="absolute inset-y-0 left-0 w-[24%] bg-[linear-gradient(90deg,rgba(238,243,250,0.56),rgba(238,243,250,0))]" />
              </div>

              <div className="mt-4 rounded-[20px] border border-[#e4ebf4] bg-white px-5 py-4 shadow-[0_14px_26px_rgba(15,23,42,0.05)]">
                <h3 className="text-[22px] font-extrabold tracking-normal text-[#0b2347] sm:text-[26px]">
                  {vehicleTitle}
                </h3>

                {metaItems.length ? (
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#233a5d]">
                    {metaItems.map((item, index) => (
                      <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                        <span className="text-[#16803d]">{getMetaIcon(item.label, "h-4 w-4")}</span>
                        <span>{item.value}</span>
                        {index < metaItems.length - 1 ? <span className="text-[#9cb0c9]">|</span> : null}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 rounded-[22px] border border-[#e4ebf4] bg-white px-5 py-5 shadow-[0_14px_26px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <ShieldIcon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[18px] font-extrabold tracking-normal">{data.specsLabel}</h3>
                  <span className="h-px flex-1 bg-[#dbe5f2]" />
                </div>

                <div className="mt-4 grid grid-cols-4">
                  {specs.map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className="px-2 py-4 text-center border-r border-[#e5edf6] last:border-r-0 sm:px-4 sm:py-5"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8ef] text-[#16803d] sm:h-16 sm:w-16">
                        {getMetaIcon(spec.label, "h-6 w-6 sm:h-7 sm:w-7")}
                      </div>
                      <p className="mt-3 text-[12px] leading-[1.5] text-[#173153] sm:text-[14px] sm:leading-[1.55]">
                        <span className="font-semibold">{spec.label}</span>
                        <span className="hidden px-1.5 text-[#9cb0c9] sm:inline">-</span>
                        <span className="mt-1 block text-[#314865] sm:mt-0 sm:inline">{spec.value}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {data.closingNote ? (
                  <div className="mt-4 rounded-[18px] border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-4 py-4 shadow-[0_12px_24px_rgba(22,128,61,0.08)]">
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px] sm:items-center">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-[#16803d] shadow-[0_10px_20px_rgba(22,128,61,0.1)]">
                          <ShieldIcon className="h-6 w-6" />
                        </div>
                        <p className="text-[14px] leading-[1.65] text-[#24405a]">{data.closingNote}</p>
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
