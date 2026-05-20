import type { FaqSectionData } from "@/types/brand";
import { WarningCard } from "@/components/ui/CalloutCards";
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

export default function FaqSection({ data }: Props) {
  const heading = splitHeading(data.h2);
  const headingLines = data.headingLines?.length ? data.headingLines : [heading.primary, heading.accent].filter(Boolean);
  const ui = data.ui ?? {};
  const defaultOpenIndex = data.defaultOpenIndex ?? 0;

  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <p className="section-pill mb-1.5">{data.tag}</p>
          <h2>
            {headingLines.map((line, index) => (
              <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
                {line}
              </span>
            ))}
          </h2>
          <p className="text-body mt-2.5 text-slate-700">{data.intro}</p>
        </div>

        <div className="faq-scroll-panel mx-auto mt-6 max-w-5xl space-y-2.5">
          {data.items.map((item, index) => (
            <details key={item.question} className="surface-card-soft overflow-hidden" open={index === defaultOpenIndex}>
              <summary className="cursor-pointer list-none px-4 py-3.5">
                <p className="text-label text-green-700">{ui.questionLabelPrefix ?? "Question"} {index + 1}</p>
                <h3 className="mt-1 pr-6 text-[0.98rem]">{item.question}</h3>
              </summary>

              <div className="border-t border-slate-200 bg-white px-4 py-3.5">
                <p className="text-small text-slate-700">{item.answer}</p>

                {item.keyPoints?.length ? (
                  <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3">
                    <p className="text-label text-slate-500">{ui.keyPointsLabel ?? "Key points"}</p>
                    <ul className="mt-2 space-y-1.5 text-small font-semibold text-slate-700">
                      {item.keyPoints.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.warning && (
                  <div className="mt-3">
                    <WarningCard
                      label="Warning"
                      title={ui.warningTitle ?? "Check fitment and engine condition before ordering"}
                      body={item.warning}
                    />
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
