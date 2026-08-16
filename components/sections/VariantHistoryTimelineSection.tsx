import Image from "next/image";
import type { VariantHistoryTimelineData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHistoryTimelineData;
  vehicleImage?: string;
  mobileVehicleImage?: string;
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

function SpecDividerRow({
  items,
  dark = false,
}: {
  items: Array<{ label: string; value: string }>;
  dark?: boolean;
}) {
  return (
    <div
      className={`grid gap-0 ${items.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"} ${
        dark ? "text-white" : "text-[#0b2347]"
      }`}
    >
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={`flex min-w-0 items-center gap-2 px-2 py-2 first:pl-0 last:pr-0 sm:gap-2.5 sm:px-4 lg:px-5 ${
            index < items.length - 1 ? dark ? "border-r border-white/18" : "border-r border-[#d9e3ee]" : ""
          }`}
        >
          <span
            className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${
              dark ? "bg-[#123765] text-[#8bd35d]" : "bg-[#eef8ef] text-[#16803d]"
            } sm:h-9 sm:w-9`}
          >
            {getMetaIcon(item.label, "h-[17px] w-[17px] sm:h-5 sm:w-5")}
          </span>
          <span className="min-w-0 text-left">
            <span className={`block text-[10px] font-semibold leading-tight ${dark ? "text-white/70" : "text-[#60728a]"}`}>
              {normalizeCopy(item.label)}
            </span>
            <span className={`mt-0.5 block text-[11px] font-extrabold leading-tight sm:text-[12px] ${dark ? "text-white" : "text-[#071d45]"}`}>
              {normalizeCopy(item.value)}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
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

function renderMobileHistoryHeading(heading: string) {
  const accentMatch = heading.match(/(Engine History\s*&\s*Specs)/i);
  if (!accentMatch || accentMatch.index === undefined) {
    return heading;
  }

  const accent = accentMatch[0];
  const before = heading.slice(0, accentMatch.index);
  const after = heading.slice(accentMatch.index + accent.length);

  return (
    <>
      {before}
      <span className="text-[#16803d]">{accent}</span>
      {after}
    </>
  );
}

export default function VariantHistoryTimelineSection({ data, vehicleImage, mobileVehicleImage }: Props) {
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
  const normalizedVehicleTitle = data.vehicleTitle ? normalizeCopy(data.vehicleTitle) : "";
  const normalizedVehicleSubtitle = data.vehicleSubtitle ? normalizeCopy(data.vehicleSubtitle) : "";
  const vehicleMeta = (data.vehicleMeta ?? []).map((item) => ({
    label: normalizeCopy(item.label),
    value: normalizeCopy(item.value),
  }));

  return (
    <Section className="-mt-[1px] bg-white !py-0">
      <Container className="max-w-[1400px] px-4 sm:px-5 lg:px-0">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#edf4ff_0%,#ffffff_54%,#f7fbff_100%)] py-2 sm:py-3 lg:mx-0 lg:bg-none lg:bg-white lg:px-0 lg:py-5">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-9 xl:gap-10">
            <div className="relative z-10 min-w-0 lg:pr-4">
              <div className="lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-[#16803d]">
                  <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-4 w-4 object-contain" />
                  <span>{normalizedTag}</span>
                </div>

                <h2 className="mt-2.5 w-full max-w-none font-['Manrope'] text-[24px] font-extrabold leading-[1.01] tracking-normal text-[#0b2347]">
                  {renderMobileHistoryHeading(normalizedHeading)}
                </h2>

                <p className="mt-2.5 text-[12px] leading-[1.62] text-[#243b5a]">
                  {normalizedIntro}
                </p>

                {mobileVehicleImage ? (
                  <div className="-mx-4 mt-3 overflow-hidden bg-transparent">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.82)_45%,rgba(247,251,255,0)_100%)]" />
                      <Image
                        src={mobileVehicleImage}
                        alt={normalizedHeading}
                        width={1280}
                        height={853}
                        className="relative z-[1] h-auto w-full object-cover object-center"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="hidden sm:gap-4 lg:block">
                <div className="lg:block">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.03em] text-[#16803d] sm:px-4 sm:py-2 sm:text-[12px]">
                      <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-4 w-4 object-contain" />
                      <span>{normalizedTag}</span>
                    </div>

                    <h2 className="mt-2.5 max-w-[520px] font-['Manrope'] text-[22px] font-extrabold leading-[1.02] tracking-normal text-[#0b2347] sm:mt-3 sm:max-w-[640px] sm:text-[32px] lg:max-w-[720px] lg:text-[54px]">
                      {normalizedHeading}
                    </h2>

                    <p className="mt-2.5 max-w-[420px] text-[12px] leading-[1.48] text-[#243b5a] sm:max-w-[520px] sm:text-[14px] sm:leading-[1.62] lg:mt-3 lg:max-w-[600px] lg:text-[15px] lg:leading-[1.68]">
                      {normalizedIntro}
                    </p>
                  </div>
                </div>
              </div>

              {(normalizedVehicleTitle || normalizedVehicleSubtitle || vehicleMeta.length > 0) ? (
                <div className="mt-2 bg-transparent lg:hidden">
                  {normalizedVehicleTitle ? <h3 className="text-[16px] font-extrabold text-[#0b2347]">{normalizedVehicleTitle}</h3> : null}
                  {normalizedVehicleSubtitle ? <p className="mt-1 text-[12px] leading-[1.45] text-[#314865]">{normalizedVehicleSubtitle}</p> : null}
                  {vehicleMeta.length ? <div className="mt-2"><SpecDividerRow items={vehicleMeta} /></div> : null}
                </div>
              ) : null}

              <div className="mt-4 sm:mt-5 lg:mt-6">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <AssetIcon src="/icons/variant/dark-green/calendar.png" className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
                  </span>
                  <h3 className="text-[16px] font-extrabold tracking-normal sm:text-[18px]">Engine History Timeline</h3>
                </div>

                <div className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                  {milestones.map((milestone, index) => {
                    const split = normalizeMilestoneText(milestone.description);

                    return (
                      <div key={`${milestone.year}-${index}`} className="grid grid-cols-[52px_44px_minmax(0,1fr)] items-start gap-2.5 border-b border-[#e3edf7] pb-1 last:border-b-0 sm:grid-cols-[72px_58px_minmax(0,1fr)] sm:gap-3 sm:border-b-0 sm:pb-0">
                        <div className="relative pt-3 text-[14px] font-extrabold text-[#16803d] sm:pt-3.5 sm:text-[16px]">
                          {index < milestones.length - 1 ? (
                            <span className="absolute left-[5px] top-7 h-[calc(100%+10px)] w-px bg-[#bad7c0] sm:left-[6px] sm:top-8" aria-hidden="true" />
                          ) : null}
                          <span className="absolute left-0 top-3 h-3 w-3 rounded-full border-[3px] border-white bg-[#16803d] shadow-[0_0_0_1px_rgba(22,128,61,0.28)] sm:h-[13px] sm:w-[13px]" aria-hidden="true" />
                          <span className="pl-5 sm:pl-7">{normalizeCopy(milestone.year)}</span>
                        </div>

                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f3f8f4] text-[#1f4e3c] sm:h-12 sm:w-12 sm:rounded-[14px]">
                          <TimelineIcon index={index} />
                        </div>

                        <div className="py-2.5 sm:border-b sm:border-[#e7edf5] sm:py-3 sm:last:border-b-0">
                          <p className="text-[12px] leading-[1.45] text-[#314865] sm:text-[13px] sm:leading-[1.52]">
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

            <div className="min-w-0 lg:pl-0">
              <div className="relative hidden overflow-hidden bg-transparent lg:-ml-4 lg:block xl:-ml-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(255,255,255,0.66),rgba(255,255,255,0)_48%)]" />
                {vehicleImage ? (
                  <Image
                    src={vehicleImage}
                    alt={normalizedHeading}
                    width={1280}
                    height={853}
                    className="relative z-[1] h-auto w-full object-cover object-center drop-shadow-[0_18px_30px_rgba(15,23,42,0.08)]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0.2)_100%)]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,#f7fbff_0%,rgba(247,251,255,0.99)_16%,rgba(247,251,255,0.84)_40%,rgba(247,251,255,0.42)_70%,rgba(247,251,255,0)_100%)]" />
              </div>

              {(normalizedVehicleTitle || normalizedVehicleSubtitle || vehicleMeta.length > 0) ? (
                <div className="mt-3 hidden bg-white/85 lg:block">
                  {normalizedVehicleTitle ? <h3 className="text-[20px] font-extrabold text-[#0b2347]">{normalizedVehicleTitle}</h3> : null}
                  {normalizedVehicleSubtitle ? <p className="mt-1 text-[13px] leading-[1.45] text-[#314865]">{normalizedVehicleSubtitle}</p> : null}
                  {vehicleMeta.length ? <div className="mt-3"><SpecDividerRow items={vehicleMeta} /></div> : null}
                </div>
              ) : null}

              <div className="mt-4 sm:mt-5 lg:mt-6">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <ShieldIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <h3 className="text-[16px] font-extrabold tracking-normal sm:text-[18px]">{normalizedSpecsLabel}</h3>
                  <span className="h-px flex-1 bg-[#dbe5f2]" />
                </div>

                <div className="mt-2.5 rounded-[10px] bg-[#071d45] p-3 shadow-[0_14px_28px_rgba(8,31,71,0.14)] sm:mt-3 sm:p-4">
                  <SpecDividerRow items={specs} dark />
                </div>

                {normalizedClosingNote ? (
                  <div className="mt-3 rounded-[10px] border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-2.5 py-2 shadow-[0_10px_20px_rgba(22,128,61,0.07)] sm:mt-4 sm:px-3 sm:py-2.5">
                    <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_92px] sm:items-center">
                      <div className="flex items-start gap-2.5">
                        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[#16803d] shadow-[0_8px_16px_rgba(22,128,61,0.09)] sm:h-9 sm:w-9">
                          <ShieldIcon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                        </div>
                        <p className="text-[11px] leading-[1.42] text-[#24405a] sm:text-[12px] sm:leading-[1.5]">{normalizedClosingNote}</p>
                      </div>
                      <div className="relative mx-auto hidden h-[66px] w-[92px] sm:block">
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
