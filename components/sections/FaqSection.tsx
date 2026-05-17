import type { FaqSectionData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
type Props = {
  data: FaqSectionData;
};

function splitHeading(text: string) {
  const accent = "Frequently Asked Questions";
  if (text.includes(accent)) {
    return {
      primary: text.replace(accent, "").replace(/\s+-\s*$/, "").trim(),
      accent,
    };
  }

  const parts = text.split(/\s+-\s+/);
  return {
    primary: parts[0] ?? text,
    accent: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M12 3 21 19H3L12 3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqSection({ data }: Props) {
  const heading = splitHeading(data.h2);

  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <p className="section-pill mb-1.5">{data.tag}</p>
          <h2>
            <span>{heading.primary}</span>
            {heading.accent ? (
              <>
                <br />
                <span className="text-[#15803d]">{heading.accent}</span>
              </>
            ) : null}
          </h2>
          <p className="text-body mt-2.5 text-slate-700">{data.intro}</p>
        </div>

        <div className="faq-scroll-panel mx-auto mt-6 max-w-5xl space-y-2.5">
          {data.items.map((item, index) => (
            <details key={item.question} className="surface-card-soft overflow-hidden" open={index === 0}>
              <summary className="cursor-pointer list-none px-4 py-3.5">
                <p className="text-label text-green-700">Question {index + 1}</p>
                <h3 className="mt-1 pr-6 text-[0.98rem]">{item.question}</h3>
              </summary>

              <div className="border-t border-slate-200 bg-white px-4 py-3.5">
                <p className="text-small text-slate-700">{item.answer}</p>

                {item.keyPoints?.length ? (
                  <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3">
                    <p className="text-label text-slate-500">Key points</p>
                    <ul className="mt-2 space-y-1.5 text-small font-semibold text-slate-700">
                      {item.keyPoints.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.warning && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
                    <div className="flex items-start gap-3 text-amber-900">
                      <div className="mt-0.5 shrink-0">
                        <WarningIcon />
                      </div>

                      <div>
                        <p className="text-label text-amber-800">Warning</p>
                        <p className="text-small mt-1 font-semibold">{item.warning}</p>
                      </div>
                    </div>
                  </div>
                )}

                <a href="#quote-form" data-quote-context={item.question} data-quote-source="faq" className="action-link mt-4">
                  {item.cta}
                </a>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
