import type { FaqSectionData } from "@/types/brand";
import { WarningCard } from "@/components/ui/CalloutCards";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
type Props = {
  data: FaqSectionData;
  strictData?: boolean;
  documentMode?: boolean;
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

export default function FaqSection({ data, strictData = false, documentMode = false }: Props) {
  const heading = splitHeading(data.h2);
  const headingLines = data.headingLines?.length ? data.headingLines : [heading.primary, heading.accent].filter(Boolean);
  const ui = data.ui ?? {};
  const defaultOpenIndex = data.defaultOpenIndex ?? 0;
  const mobileHeading = "Frequently Asked Question";

    return (
      <Section className={documentMode ? "bg-white !py-[2px]" : "bg-white"}>
      <Container className={documentMode ? "!max-w-none !px-[2px] sm:!px-[2px] lg:!px-[2px]" : ""}>
        <div className={documentMode ? "max-w-none" : "max-w-[860px]"}>
          <p className="section-pill mb-1.5">{data.tag}</p>
          <h2>
            <span className="block md:hidden text-[#15803d]">{mobileHeading}</span>
            <span className="hidden md:block">
              {headingLines.map((line, index) => (
                <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
                  {line}
                </span>
              ))}
            </span>
          </h2>
          <p className="text-body mt-2.5 text-slate-700">{data.intro}</p>
        </div>

        <div className={`faq-scroll-panel mx-auto mt-6 max-w-[1400px] ${documentMode ? "pr-0" : ""}`}>
          {data.items.map((item, index) => (
            <details key={item.question} className="group block surface-card-soft overflow-hidden" open={index === defaultOpenIndex}>
              <summary className="flex min-h-[56px] w-full cursor-pointer list-none items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 text-left transition hover:bg-slate-50 sm:px-6 group-open:border-b-2 group-open:border-green-700 group-open:text-green-700 [&::-webkit-details-marker]:hidden">
                <div className="flex flex-col gap-1">
                  {strictData ? (
                    ui.questionLabelPrefix ? <p className="text-label text-green-700">{ui.questionLabelPrefix} {index + 1}</p> : null
                  ) : (
                    <p className="text-label text-green-700">{ui.questionLabelPrefix ?? "Question"} {index + 1}</p>
                  )}
                  <h3
                    className="text-[15px] font-semibold leading-[1.45] text-slate-900 group-open:text-green-700"
                    style={{ fontSize: '15px' }}
                  >
                    {item.question}
                  </h3>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] flex-none text-slate-400 transition group-open:rotate-180 group-open:text-green-700"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>

              <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-[15px] leading-[1.75] text-slate-700">{item.answer}</p>

                {item.keyPoints?.length ? (
                  <div className="mt-4">
                    {strictData ? (
                      ui.keyPointsLabel ? <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.keyPointsLabel}</p> : null
                    ) : (
                      <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.keyPointsLabel ?? "Key points"}</p>
                    )}
                    <ul className="space-y-2 rounded-[14px] border border-slate-200 bg-white px-4 py-4 text-[15px] leading-[1.7] text-slate-700">
                      {item.keyPoints.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-[0.55rem] h-2 w-2 flex-none rounded-full bg-[#0d1b2e]" />
                          <span className="font-semibold">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {item.comparisonTable?.headers?.length && item.comparisonTable.rows?.length ? (
                  <div className="mt-4">
                    {strictData ? (
                      ui.comparisonTableLabel ? (
                        <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.comparisonTableLabel}</p>
                      ) : null
                    ) : (
                      <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.comparisonTableLabel ?? "Comparison table"}</p>
                    )}
                    <div className="overflow-x-auto rounded-[14px] border border-slate-200 bg-white">
                      <table className="min-w-full border-collapse text-left text-[14px]">
                        <thead className="bg-slate-50">
                          <tr>
                            {item.comparisonTable.headers.map((header) => (
                              <th
                                key={header}
                                className="border-b border-slate-200 px-4 py-3 font-semibold text-[#0d1b2e]"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {item.comparisonTable.rows.map((row, rowIndex) => (
                            <tr key={`${item.question}-row-${rowIndex}`} className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${item.question}-row-${rowIndex}-cell-${cellIndex}`}
                                  className="border-b border-slate-100 px-4 py-3 align-top text-slate-700"
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
                  <div className="mt-4">
                    <WarningCard
                      label={strictData ? "" : "Warning"}
                      title={strictData ? (ui.warningTitle || "") : (ui.warningTitle ?? "Check fitment and engine condition before ordering")}
                      body={item.warning}
                    />
                  </div>
                )}

                <a
                  href="#quote-form"
                  data-quote-context={item.question}
                  data-quote-source="faq"
                  className="mt-4 flex w-full items-center justify-between rounded-[8px] border border-[#163b6e] bg-[linear-gradient(180deg,#16345e_0%,#0d1b2e_100%)] px-4 py-3 text-[12.5px] font-bold text-white shadow-[0_0_0_1px_rgba(22,163,74,0.1),0_0_12px_rgba(22,163,74,0.14)] transition hover:bg-[linear-gradient(180deg,#1a3b68_0%,#112643_100%)]"
                >
                  <span className="pr-3">{item.cta}</span>
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-[8px] bg-[#16a34a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </details>
          ))}
        </div>

        {data.disclaimer ? (
          <div className="mx-auto mt-3 max-w-[1400px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
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
