import type { VariantHistoryTimelineData } from "@/types/variant";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: VariantHistoryTimelineData;
};

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 4v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TimelineDot() {
  return <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-[#15803d]" aria-hidden="true" />;
}

export default function VariantHistoryTimelineSection({ data }: Props) {
  return (
    <Section className="bg-white">
      <Container className="max-w-[1180px]">
        <div className="max-w-[760px]">
          <p className="section-pill">
            <HistoryIcon />
            {data.tag}
          </p>

          <h2 className="mt-3">{data.h2}</h2>
          <p className="text-body mt-4 text-slate-600">{data.intro}</p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_4px_18px_rgba(13,27,46,0.05)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-['Manrope'] text-[20px] font-extrabold tracking-[-0.03em] text-[#0d1b2e]">
                Variant History & Key Milestones
              </h3>
              <span className="h-[3px] w-10 rounded-full bg-[#15803d]" />
            </div>

            <div className="space-y-4">
              {data.milestones.map((milestone, index) => (
                <div key={`${milestone}-${index}`} className="flex gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <TimelineDot />
                  <p className="text-[14px] leading-[1.75] text-slate-700">{milestone}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[18px] border border-[#0d1b2e] bg-[#0d1b2e] p-5 text-white shadow-[0_16px_40px_rgba(13,27,46,0.16)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#86efac]">{data.specsLabel}</p>
            <h3 className="mt-2 font-['Manrope'] text-[22px] font-extrabold tracking-[-0.03em] text-white">
              Production Snapshot
            </h3>

            <div className="mt-5 space-y-3">
              {data.specs.map((item, index) => (
                <div key={`${item}-${index}`} className="rounded-[12px] border border-white/10 bg-white/[0.05] px-4 py-3 text-[13px] leading-[1.65] text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
