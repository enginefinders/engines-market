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
  const shellClass = documentMode ? "w-full" : "max-w-[860px]";
  const faqPanelClass = documentMode ? "mt-3 w-full" : "faq-scroll-panel mx-auto mt-6 max-w-[1400px]";

  if (documentMode) {
    return (
      <Section className="bg-white !py-0">
        <Container className="max-w-[1400px] px-[15px] sm:px-5 lg:px-4">
          <div className="py-0">
            <div className="px-0 py-0.5 sm:px-0 sm:py-1 lg:px-0 lg:py-1">
              <div className="inline-flex items-center rounded-full bg-[#081f47] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(8,31,71,0.14)]">
                {data.tag}
              </div>

              <h2 className="mt-3 font-['Manrope'] text-[32px] font-extrabold leading-[1.06] tracking-[-0.05em] text-[#0b2347] sm:text-[40px] lg:text-[48px]">
                {headingLines.map((line, index) => (
                  <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#17803d]" : ""}`}>
                    {line}
                  </span>
                ))}
              </h2>

              <div className="mt-3 grid gap-2">
                {data.items.map((item, index) => (
                  <details
                    key={item.question}
                    className="group overflow-hidden rounded-[10px] border border-[#dbe5f2] bg-white"
                  >
                    <summary className="flex min-h-[62px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-left [&::-webkit-details-marker]:hidden sm:px-5 lg:grid lg:grid-cols-[104px_minmax(0,1fr)_18px] lg:gap-4 lg:py-3">
                      <div className="hidden items-center text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#17803d] lg:flex">
                        Question {index + 1}
                      </div>
                      <h3 className="min-w-0 text-[17px] font-extrabold leading-[1.42] tracking-[-0.03em] text-[#0b2347] sm:text-[18px] lg:text-[16px]">
                        {item.question}
                      </h3>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 flex-none text-[#0b2347] transition group-open:rotate-180"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>

                    <div className="border-t border-[#e6edf6] px-4 py-3.5 sm:px-5 sm:py-4 lg:px-5 lg:py-4">
                      <p className="text-[15px] leading-[1.74] text-[#173660] lg:text-[14px] lg:leading-[1.68]">{item.answer}</p>

                      {item.keyPoints?.length ? (
                        <ul className="mt-3 grid gap-1.5 text-[14px] leading-[1.6] text-[#173660]">
                          {item.keyPoints.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-[0.62rem] h-2 w-2 flex-none rounded-full bg-[#17803d]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.cta ? (
                        <a
                          href="#quote-form"
                          data-quote-context={item.question}
                          data-quote-source="faq"
                          className="mt-3 inline-flex items-center gap-2 text-[14px] font-extrabold text-[#17803d] transition hover:opacity-80"
                        >
                          <span>{item.cta}</span>
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                            <path d="M4 12h16" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                            <path d="m13 5 7 7-7 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className={documentMode ? "bg-white !py-[8px] md:!py-[10px] lg:!py-[12px]" : "bg-white"}>
      <Container className={documentMode ? "max-w-[1400px] px-0 sm:px-0 lg:px-0" : ""}>
        <div className={shellClass}>
          <p className="section-pill mb-1.5">{data.tag}</p>
          <h2 className="font-['Manrope'] text-[28px] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#0d1b2e] lg:text-[42px]">
            <span className="block md:hidden">
              {headingLines.map((line, index) => (
                <span key={`${line}-${index}-mobile`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
                  {line}
                </span>
              ))}
            </span>
            <span className="hidden md:block">
              {headingLines.map((line, index) => (
                <span key={`${line}-${index}`} className={`block ${headingLines.length > 1 && index === headingLines.length - 1 ? "text-[#15803d]" : ""}`}>
                  {line}
                </span>
              ))}
            </span>
          </h2>
          <p className="text-body mt-2 text-slate-700">{data.intro}</p>
        </div>

        <div className={`${faqPanelClass} ${documentMode ? "pr-0" : ""}`}>
          {data.items.map((item, index) => (
            <details key={item.question} className="group block surface-card-soft overflow-hidden" open={index === defaultOpenIndex}>
              <summary className="flex min-h-[52px] w-full cursor-pointer list-none items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6 group-open:border-b-2 group-open:border-green-700 group-open:text-green-700 [&::-webkit-details-marker]:hidden">
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

              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[15px] leading-[1.75] text-slate-700">{item.answer}</p>

                {item.keyPoints?.length ? (
                  <div className="mt-4">
                    {strictData ? (
                      ui.keyPointsLabel ? <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.keyPointsLabel}</p> : null
                    ) : (
                      <p className="text-[15px] font-semibold text-slate-900 mb-2">{ui.keyPointsLabel ?? "Key points"}</p>
                    )}
                    <ul className="space-y-2 rounded-[14px] border border-slate-200 bg-white px-4 py-3.5 text-[15px] leading-[1.7] text-slate-700">
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
          <div className={`mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 ${documentMode ? "w-full" : "mx-auto max-w-[1400px]"}`}>
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
