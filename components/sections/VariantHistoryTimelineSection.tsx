import Image from "next/image";
import type { VariantHistoryTimelineData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHistoryTimelineData;
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 10h3l2 2v3h-5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V4h5v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 3 20 7v5c0 5-3 8-8 10-5-2-8-5-8-10V7l8-4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineIcon({ index }: { index: number }) {
  const icons = [
    <EngineIcon key="engine" />,
    (
      <svg key="chart" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M5 19V9M12 19V5M19 19v-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="bearing" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M7 6h10l3 3-8 9-8-9 3-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg key="cup" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 18h6M12 11v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg key="flag" viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path d="M6 21V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 5c3 0 3 2 6 2s3-2 6-2v8c-3 0-3 2-6 2s-3-2-6-2V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  ];

  return icons[index % icons.length];
}

function getMetaIcon(index: number) {
  const icons = [
    <CalendarIcon key="calendar" />,
    <EngineIcon key="engine" />,
    (
      <svg key="power" viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    <CalendarIcon key="calendar-2" />,
  ];

  return icons[index % icons.length];
}

function normalizeMilestoneText(description: string) {
  const match = description.match(/^(.*?)(?:,\s+|:\s+)(.+)$/);
  if (!match) {
    return { title: description, body: "" };
  }
  return { title: match[1].trim(), body: match[2].trim() };
}

export default function VariantHistoryTimelineSection({ data }: Props) {
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

  return (
    <Section className="bg-white !py-0">
      <Container className="!max-w-none !px-0 sm:!px-0 lg:!px-0">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#edf4ff_0%,#ffffff_54%,#f7fbff_100%)] px-0 py-0">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(520px,1.04fr)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#edf7ef] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.03em] text-[#16803d]">
                <CalendarIcon />
                <span>{data.tag}</span>
              </div>

              <h2 className="mt-4 max-w-[760px] font-['Manrope'] text-[38px] font-extrabold leading-[1.02] tracking-normal text-[#0b2347] sm:text-[50px] lg:text-[62px]">
                {data.h2}
              </h2>

              <p className="mt-4 max-w-[620px] text-[17px] leading-[1.7] text-[#243b5a]">{data.intro}</p>

              <div className="mt-7">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <CalendarIcon />
                  </span>
                  <h3 className="text-[20px] font-extrabold tracking-normal">Engine History Timeline</h3>
                </div>

                <div className="mt-5 space-y-5">
                  {milestones.map((milestone, index) => {
                    const split = normalizeMilestoneText(milestone.description);

                    return (
                      <div key={`${milestone.year}-${index}`} className="grid gap-3 md:grid-cols-[84px_58px_minmax(0,1fr)]">
                        <div className="relative text-[18px] font-extrabold text-[#16803d] sm:text-[20px]">
                          {index < milestones.length - 1 ? (
                            <span className="absolute left-[7px] top-8 h-[calc(100%+20px)] w-px bg-[#bad7c0]" aria-hidden="true" />
                          ) : null}
                          <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-[#16803d] shadow-[0_0_0_1px_rgba(22,128,61,0.28)]" aria-hidden="true" />
                          <span className="pl-8">{milestone.year}</span>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#f3f8f4] text-[#1f4e3c]">
                          <TimelineIcon index={index} />
                        </div>

                        <div className="border-b border-[#e7edf5] pb-4 last:border-b-0">
                          <p className="text-[16px] font-extrabold leading-[1.42] text-[#0f274d] sm:text-[17px]">{split.title}</p>
                          {split.body ? <p className="mt-1.5 text-[15px] leading-[1.6] text-[#314865] sm:text-[16px]">{split.body}</p> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(240,246,252,0.75))] px-4 pt-4">
                <div className="pointer-events-none absolute right-[7%] top-[4%] text-[80px] font-black leading-none text-[#e2e8f2] opacity-90 lg:text-[96px]">M3</div>
                <div className="pointer-events-none absolute right-[12%] top-[8%] h-[220px] w-[220px] rounded-full border-[6px] border-[#e7ecf5]" />
                <div className="pointer-events-none absolute right-[18%] top-[3%] h-[260px] w-[260px] rounded-full border border-[#edf2f8]" />

                <div className="relative mx-auto h-[290px] w-full max-w-[760px]">
                  <Image
                    src="/images/brands/bmw/models/bmw-m3-model-card.png"
                    alt={data.vehicleTitle ?? "BMW M3"}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-[28px] font-extrabold tracking-normal text-[#0b2347] sm:text-[30px]">
                  {data.vehicleTitle || "BMW M3 E90"}
                </h3>

                {metaItems.length ? (
                  <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[16px] text-[#233a5d]">
                    {metaItems.map((item, index) => (
                      <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                        <span className="text-[#16803d]">{getMetaIcon(index)}</span>
                        <span>{item.value}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-[#0f274d]">
                  <span className="text-[#16803d]">
                    <ShieldIcon />
                  </span>
                  <h3 className="text-[22px] font-extrabold tracking-normal">{data.specsLabel}</h3>
                  <span className="hidden h-px flex-1 bg-[#dbe5f2] sm:block" />
                </div>

                <div className="mt-5 grid rounded-[24px] border border-[#e2e9f2] bg-white/85 md:grid-cols-4">
                  {specs.map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className="px-4 py-5 text-center md:border-r md:border-[#e5edf6] md:last:border-r-0"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8ef] text-[#16803d]">
                        {getMetaIcon(index)}
                      </div>
                      <p className="mt-4 text-[17px] font-semibold text-[#173153]">{spec.label}</p>
                      <p className="mt-2 text-[15px] leading-[1.6] text-[#314865]">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {data.closingNote ? (
                <div className="mt-5 rounded-[22px] border border-[#dcebdd] bg-[linear-gradient(135deg,#f1faf3,#edf7f1)] px-5 py-4 shadow-[0_12px_24px_rgba(22,128,61,0.08)]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-white text-[#16803d] shadow-[0_10px_20px_rgba(22,128,61,0.1)]">
                      <ShieldIcon />
                    </div>
                    <p className="text-[17px] leading-[1.65] text-[#24405a]">{data.closingNote}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
