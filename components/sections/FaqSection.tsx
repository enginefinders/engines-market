import type { FaqSectionData } from "@/types/brand";
import { WarningCard } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
type Props = {
  data: FaqSectionData;
  strictData?: boolean;
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

export default function FaqSection({ data, strictData = false }: Props) {
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
                {strictData ? (
                  ui.questionLabelPrefix ? <p className="text-label text-green-700">{ui.questionLabelPrefix} {index + 1}</p> : null
                ) : (
                  <p className="text-label text-green-700">{ui.questionLabelPrefix ?? "Question"} {index + 1}</p>
                )}
                <h3 className="mt-1 pr-6 text-[0.98rem]">{item.question}</h3>
              </summary>

              <div className="border-t border-slate-200 bg-white px-4 py-3.5">
                <p className="text-small text-slate-700">{item.answer}</p>

                {item.keyPoints?.length ? (
                  <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3">
                    {strictData ? (
                      ui.keyPointsLabel ? <p className="text-label text-slate-500">{ui.keyPointsLabel}</p> : null
                    ) : (
                      <p className="text-label text-slate-500">{ui.keyPointsLabel ?? "Key points"}</p>
                    )}
                    <ul className="mt-2 space-y-1.5 text-small font-semibold text-slate-700">
                      {item.keyPoints.map((point) => (
                        <li key={point}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.comparisonTable?.headers?.length && item.comparisonTable.rows?.length ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {strictData ? (
                      ui.comparisonTableLabel ? (
                        <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-2">
                          <p className="text-label text-slate-500">{ui.comparisonTableLabel}</p>
                        </div>
                      ) : null
                    ) : (
                      <div className="border-b border-slate-200 bg-slate-50 px-3.5 py-2">
                        <p className="text-label text-slate-500">{ui.comparisonTableLabel ?? "Comparison table"}</p>
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse text-left">
                        <thead>
                          <tr className="border-b border-slate-200">
                            {item.comparisonTable.headers.map((header) => (
                              <th
                                key={header}
                                className="px-3.5 py-2.5 font-['Manrope'] text-[11px] font-extrabold uppercase tracking-[0.04em] text-[#0d1b2e]"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.comparisonTable.rows.map((row, rowIndex) => (
                            <tr key={`${item.question}-row-${rowIndex}`} className="border-b border-slate-100 last:border-b-0">
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${item.question}-row-${rowIndex}-cell-${cellIndex}`}
                                  className="align-top px-3.5 py-2.5 text-[11.5px] leading-[1.5] text-slate-700"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                {item.warning && (!strictData || ui.warningTitle) && (
                  <div className="mt-3">
                    <WarningCard
                      label={strictData ? "" : "Warning"}
                      title={strictData ? (ui.warningTitle || "") : (ui.warningTitle ?? "Check fitment and engine condition before ordering")}
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

        {data.disclaimer ? (
          <div className="mx-auto mt-3 max-w-5xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            {strictData ? (
              ui.disclaimerLabel ? <p className="text-label text-slate-500">{ui.disclaimerLabel}</p> : null
            ) : (
              <p className="text-label text-slate-500">{ui.disclaimerLabel ?? "Disclaimer"}</p>
            )}
            <p className="mt-1.5 text-[11.5px] leading-[1.6] text-slate-600">{data.disclaimer}</p>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
