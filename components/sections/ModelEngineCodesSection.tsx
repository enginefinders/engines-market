"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { EngineCodesData } from "@/types/brand";
import type { ModelPageData } from "@/types/model";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: EngineCodesData;
  guide: ModelPageData["sections"]["variantCoverage"]["engineGuide"];
  modelName: string;
};

type GuideEntry = ModelPageData["sections"]["variantCoverage"]["engineGuide"]["families"][number]["entries"][number];
type EngineRow = EngineCodesData["groups"][number]["engines"][number];

function normalizeCode(code: string) {
  return code
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildGuideLookup(guide: Props["guide"]) {
  const map = new Map<string, GuideEntry>();

  for (const family of guide.families) {
    for (const entry of family.entries) {
      for (const code of normalizeCode(entry.code)) {
        if (!map.has(code)) {
          map.set(code, entry);
        }
      }
    }
  }

  return map;
}

function getGuideDetail(code: string, lookup: Map<string, GuideEntry>) {
  for (const candidate of normalizeCode(code)) {
    const match = lookup.get(candidate);
    if (match) {
      return match;
    }
  }

  return null;
}

function deriveYears(compatibleModels: string, fallback?: string) {
  if (fallback?.trim()) {
    return fallback.trim();
  }

  const match = compatibleModels.match(/\(([^)]+)\)/);
  return match?.[1]?.trim() ?? "Check by registration";
}

function toPriceText(price: string) {
  return price.replace(/^from\s+/i, "").trim();
}

function toSummary(engine: EngineRow) {
  return `${engine.size.replace(/(\d(?:\.\d)?)L\b/gi, "$1 Litre")} ${engine.fuel}`
    .replace(/\s+/g, " ")
    .trim();
}

function buildHistory(engine: EngineRow, detail: GuideEntry | null, modelName: string) {
  if (detail?.history?.trim()) {
    return detail.history.trim();
  }

  return `${engine.code} appears across ${modelName} variants including ${engine.compatibleModels}. Compare fitment, specs and rebuilt pricing before choosing a replacement unit.`;
}

function buildVariants(engine: EngineRow, detail: GuideEntry | null) {
  if (detail?.compatibleVariants?.length) {
    return detail.compatibleVariants;
  }

  return engine.compatibleModels
    .split(",")
    .map((item) => item.replace(/\([^)]*\)/g, "").trim())
    .filter(Boolean);
}

function buildFailures(detail: GuideEntry | null, fallback: string) {
  if (detail?.commonFailures?.length) {
    return detail.commonFailures;
  }

  return [fallback];
}

function chunkEngines(engines: EngineRow[]) {
  const rows: EngineRow[][] = [];

  for (let i = 0; i < engines.length; i += 2) {
    rows.push(engines.slice(i, i + 2));
  }

  return rows;
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="7" width="13" height="10" rx="2" />
      <path d="M17 10h3l2 2v3h-5" />
      <path d="M8 7V4h5v3" />
      <circle cx="8.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SpecsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 13 7.4 7.9C7.7 7.2 8.3 6.8 8.9 6.8H15.1C15.7 6.8 16.3 7.2 16.6 7.9L19 13" />
      <path d="M4.5 13H19.5C20.3 13 21 13.7 21 14.5V17.5C21 18.3 20.3 19 19.5 19H4.5C3.7 19 3 18.3 3 17.5V14.5C3 13.7 3.7 13 4.5 13Z" />
      <circle cx="7.5" cy="16" r="1" />
      <circle cx="16.5" cy="16" r="1" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

type Selection = {
  familyIndex: number;
  engineIndex: number;
} | null;

export default function ModelEngineCodesSection({ data, guide, modelName }: Props) {
  const [selection, setSelection] = useState<Selection>(null);
  const guideLookup = useMemo(() => buildGuideLookup(guide), [guide]);
  const headingLines = data.headingLines?.length ? data.headingLines : [guide.h2 || data.h2];
  const intro = guide.h3 || data.h3;
  const closingLine = guide.closing || data.closingLine || "";
  const ui = data.ui ?? {};
  const closingAction = data.closingAction ?? {};

  function toggleSelection(familyIndex: number, engineIndex: number) {
    setSelection((current) =>
      current?.familyIndex === familyIndex && current.engineIndex === engineIndex
        ? null
        : { familyIndex, engineIndex },
    );
  }

  return (
    <Section className="model-engine-codes bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)]">
      <Container className="max-w-[1240px]">
        <div className="engine-codes-section">
          <div className="ecs-container">
            <header className="ecs-header">
              <div className="tag">{guide.tag || data.tag}</div>
              <h2>
                {headingLines.map((line, index) => (
                  <span key={`${line}-${index}`} style={{ display: "block", color: headingLines.length > 1 && index === headingLines.length - 1 ? "#15803d" : undefined }}>
                    {line}
                  </span>
                ))}
              </h2>
              <p>{intro}</p>
            </header>

            {data.groups.map((group, familyIndex) => {
              const rows = chunkEngines(group.engines);

              return (
                <section key={group.name} className="engine-family">
                  <div className="family-title">
                    <span className="family-icon" aria-hidden="true">
                      <EngineIcon />
                    </span>
                    <div>
                      <h3>{group.name}</h3>
                      <p>{group.era}</p>
                    </div>
                  </div>

                  <div className="engine-list">
                    {rows.map((row, rowIndex) => {
                      const startIndex = rowIndex * 2;
                      const selectedRowEngineIndex = row.findIndex(
                        (_engine, index) =>
                          selection?.familyIndex === familyIndex &&
                          selection.engineIndex === startIndex + index,
                      );
                      const activeEngine =
                        selectedRowEngineIndex >= 0 ? row[selectedRowEngineIndex] : null;
                      const visibleRow = activeEngine ? [activeEngine] : row;
                      const trailingRow = activeEngine
                        ? row.filter((engine) => engine.code !== activeEngine.code)
                        : [];

                      const renderEngineCard = (engine: EngineRow) => {
                        const originalIndex = group.engines.findIndex(
                          (candidate) => candidate.code === engine.code,
                        );
                        const selected =
                          selection?.familyIndex === familyIndex &&
                          selection.engineIndex === originalIndex;
                        const detail = getGuideDetail(engine.code, guideLookup);
                        const years = deriveYears(engine.compatibleModels, detail?.years);

                        return (
                          <article
                            key={engine.code}
                            className={`engine-card${selected ? " is-active" : ""}`}
                          >
                            <button
                              className={`engine-summary${selected ? " is-selected" : ""}`}
                              type="button"
                              aria-expanded={selected}
                              onClick={() => toggleSelection(familyIndex, originalIndex)}
                            >
                              <span className="engine-thumb" aria-hidden="true">
                                <EngineIcon />
                              </span>

                              <span className="engine-main">
                                <span className="summary-line">
                                  <strong>{engine.code}</strong>
                                  <span className="summary-separator" aria-hidden="true">
                                    &bull;
                                  </span>
                                  <small>{toSummary(engine)}</small>
                                  <span className="summary-years">({years})</span>
                                </span>
                                <span className="engine-meta">{engine.power}</span>
                              </span>

                              <span className="price">
                                <small>{ui.summaryPriceLabel ?? "Avg. rebuilt price"}</small>
                                <strong>{toPriceText(engine.avgRebuiltPrice)}</strong>
                              </span>

                              <span className="chev" aria-hidden="true">
                                <ChevronIcon />
                              </span>
                            </button>
                          </article>
                        );
                      };

                      return (
                        <div key={`${group.name}-${rowIndex}`} className="engine-row">
                          {visibleRow.map(renderEngineCard)}

                          <div className={`family-open-slot${activeEngine ? " is-visible" : ""}`}>
                            {activeEngine ? (
                              (() => {
                                const detail = getGuideDetail(activeEngine.code, guideLookup);
                                const years = deriveYears(
                                  activeEngine.compatibleModels,
                                  detail?.years,
                                );
                                const detailImage = detail?.image || activeEngine.image;
                                const quoteText = detail?.cta || activeEngine.cta || `Get quotes for ${activeEngine.code}`;

                                return (
                                  <div className="engine-details">
                                    <div className="open-panel">
                                      <div className="hero-row">
                                        <div className="image-frame">
                                          <div className="image-placeholder">
                                            <div className="engine-image">
                                              {detailImage ? (
                                                <Image
                                                  src={detailImage}
                                                  alt={`${activeEngine.code} engine`}
                                                  fill
                                                  className="object-contain"
                                                  sizes="150px"
                                                />
                                              ) : null}
                                            </div>
                                            <div>
                                              <strong>{activeEngine.code}</strong>
                                              <span>{ui.exampleImageLabel ?? "Example engine visual"}</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="hero-copy">
                                          <div className="hero-top">
                                            <div className="history-block">
                                              <span className="history-label">{ui.historyLabel ?? "Engine History"}</span>
                                              <p>
                                                {buildHistory(
                                                  activeEngine,
                                                  detail,
                                                  modelName,
                                                )}
                                              </p>
                                            </div>

                                            <div className="price-box">
                                              <small>{ui.summaryPriceLabel ?? "Avg. rebuilt price"}</small>
                                              <strong>
                                                {toPriceText(activeEngine.avgRebuiltPrice)}
                                              </strong>
                                              <span>{ui.supplyLabel ?? "Supply only"}</span>
                                              <a
                                                className="quote-link"
                                                href="#quote-form"
                                                data-quote-engine-code={activeEngine.code}
                                                data-quote-context={activeEngine.compatibleModels}
                                              >
                                                <span className="quote-link-text">
                                                  <span>{quoteText}</span>
                                                </span>
                                                <ArrowIcon />
                                              </a>
                                            </div>
                                          </div>

                                          <div className="variant-wrap">
                                            <small>{ui.variantsLabel ?? `Compatible ${modelName} variants`}</small>
                                            <div className="variant-tags">
                                              {buildVariants(activeEngine, detail).map((variant) => (
                                                <span key={variant}>{variant}</span>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="info-grid">
                                        <section className="info-box specs-box">
                                          <h4>
                                            <span className="icon">
                                              <SpecsIcon />
                                            </span>
                                            {ui.specsTitle ?? "Technical Specifications"}
                                          </h4>
                                          <ul className="spec-list">
                                            <li>
                                              <span>{ui.fuelLabel ?? "Fuel type"}</span>
                                              <strong>{detail?.fuel || activeEngine.fuel}</strong>
                                            </li>
                                            <li>
                                              <span>{ui.sizeLabel ?? "Engine size"}</span>
                                              <strong>{detail?.size || activeEngine.size}</strong>
                                            </li>
                                            <li>
                                              <span>{ui.powerLabel ?? "Power output"}</span>
                                              <strong>{detail?.power || activeEngine.power}</strong>
                                            </li>
                                            <li>
                                              <span>{ui.yearsLabel ?? "Years fitted"}</span>
                                              <strong>{years}</strong>
                                            </li>
                                          </ul>
                                        </section>

                                        <section className="info-box failures-box">
                                          <h4>
                                            <span className="icon">
                                              <WarningIcon />
                                            </span>
                                            {ui.failuresTitle ?? "Common Failures"}
                                          </h4>
                                          <ul className="failure-list">
                                            {buildFailures(detail, group.failureNote).map((failure) => (
                                              <li key={failure}>{failure}</li>
                                            ))}
                                          </ul>
                                        </section>
                                      </div>

                                      <div className="mobile-action-row">
                                        <div className="mobile-price-summary">
                                          <small>{ui.summaryPriceLabel ?? "Avg. rebuilt price"}</small>
                                          <strong>
                                            {toPriceText(activeEngine.avgRebuiltPrice)}
                                          </strong>
                                          <span>{ui.supplyLabel ?? "Supply only"}</span>
                                        </div>
                                        <a
                                          className="quote-link"
                                          href="#quote-form"
                                          data-quote-engine-code={activeEngine.code}
                                          data-quote-context={activeEngine.compatibleModels}
                                        >
                                          <span className="quote-link-text">
                                            <span>{quoteText}</span>
                                          </span>
                                          <ArrowIcon />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : null}
                          </div>

                          {trailingRow.map(renderEngineCard)}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            <div className="closing-card">
              <div className="closing-icon">
                <CarIcon />
              </div>
              <div>
                <h3>{closingAction.title ?? "Can't find your engine code?"}</h3>
                <p>{closingLine}</p>
              </div>
              <a href="#quote-form" className="cta-btn">
                {closingAction.buttonText ?? "Enter Your Reg"}
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .model-engine-codes svg {
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .model-engine-codes .engine-codes-section {
          padding: 42px 18px 64px;
        }

        .model-engine-codes .ecs-container {
          max-width: 1240px;
          margin: 0 auto;
        }

        .model-engine-codes .ecs-header {
          max-width: 960px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .model-engine-codes .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 16px;
          border-radius: 999px;
          background: linear-gradient(180deg, #16355d 0%, #081a34 100%);
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          box-shadow: 0 8px 20px rgba(8, 26, 52, 0.14);
          margin-bottom: 14px;
        }

        .model-engine-codes .ecs-header h2 {
          margin: 0 0 10px;
          font-size: clamp(31px, 4vw, 52px);
          line-height: 1.03;
          letter-spacing: -0.04em;
          color: #10203a;
        }

        .model-engine-codes .ecs-header p {
          margin: 0;
          color: #64748b;
          font-size: 16px;
          line-height: 1.55;
        }

        .model-engine-codes .engine-family {
          margin-top: 24px;
        }

        .model-engine-codes .family-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .model-engine-codes .family-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: #f5f8fc;
          color: #0d1b2e;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .model-engine-codes .family-icon svg,
        .model-engine-codes .closing-icon svg {
          width: 24px;
          height: 24px;
        }

        .model-engine-codes .family-title h3 {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.03em;
          color: #10203a;
        }

        .model-engine-codes .family-title p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.45;
        }

        .model-engine-codes .engine-list {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .model-engine-codes .engine-row {
          display: contents;
        }

        .model-engine-codes .engine-card {
          min-width: 0;
        }

        .model-engine-codes .engine-card.is-active {
          grid-column: 1 / -1;
        }

        .model-engine-codes .engine-summary {
          width: 100%;
          border: 1px solid #dfe7ef;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(12, 29, 53, 0.06);
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr) minmax(122px, 150px) 16px;
          align-items: center;
          gap: 10px;
          min-height: 76px;
          padding: 14px 16px;
          text-align: left;
          color: inherit;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .model-engine-codes .engine-summary:hover {
          background: #fbfdff;
        }

        .model-engine-codes .engine-summary.is-selected {
          grid-template-columns: minmax(0, 1fr) 16px;
          min-height: 60px;
          padding: 10px 14px;
          border-radius: 20px 20px 0 0;
          border-color: #b8cadb;
          box-shadow: 0 10px 22px rgba(16, 39, 68, 0.08);
          background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
        }

        .model-engine-codes .engine-thumb {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid #d7e2ec;
          background: linear-gradient(180deg, #eef3f9 0%, #dfe8f2 100%);
          color: #334155;
          display: grid;
          place-items: center;
        }

        .model-engine-codes .engine-thumb svg {
          width: 22px;
          height: 22px;
        }

        .model-engine-codes .engine-main {
          min-width: 0;
        }

        .model-engine-codes .summary-line {
          display: block;
        }

        .model-engine-codes .summary-line strong {
          display: block;
          margin: 0 0 3px;
          font-family: Consolas, "SFMono-Regular", monospace;
          font-size: 20px;
          line-height: 1;
          letter-spacing: -0.05em;
          color: #10203a;
        }

        .model-engine-codes .summary-separator {
          display: none;
          color: #5b6d84;
          font-size: 13px;
          font-weight: 800;
          line-height: 1;
        }

        .model-engine-codes .summary-line small {
          display: block;
          margin: 0;
          color: #2c3b50;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.3;
        }

        .model-engine-codes .summary-years {
          display: none;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.2;
          color: #64748b;
        }

        .model-engine-codes .engine-meta {
          margin-top: 4px;
          color: #64748b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .model-engine-codes .price {
          text-align: right;
          padding-left: 4px;
        }

        .model-engine-codes .price small {
          display: block;
          color: #64748b;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .model-engine-codes .price strong {
          color: #13823d;
          font-size: 18px;
          line-height: 0.96;
          letter-spacing: -0.05em;
        }

        .model-engine-codes .chev {
          color: #13823d;
          display: grid;
          place-items: center;
          transition: transform 0.2s ease;
        }

        .model-engine-codes .chev svg {
          width: 18px;
          height: 18px;
        }

        .model-engine-codes .engine-summary.is-selected .chev {
          transform: rotate(180deg);
        }

        .model-engine-codes .engine-summary.is-selected .engine-thumb,
        .model-engine-codes .engine-summary.is-selected .price,
        .model-engine-codes .engine-summary.is-selected .engine-meta {
          display: none;
        }

        .model-engine-codes .engine-summary.is-selected .summary-line {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .model-engine-codes .engine-summary.is-selected .summary-line strong,
        .model-engine-codes .engine-summary.is-selected .summary-line small,
        .model-engine-codes .engine-summary.is-selected .summary-years {
          display: inline;
          margin: 0;
          color: #10203a;
        }

        .model-engine-codes .engine-summary.is-selected .summary-line strong {
          font-size: 20px;
        }

        .model-engine-codes .engine-summary.is-selected .summary-separator {
          display: inline;
        }

        .model-engine-codes .engine-summary.is-selected .summary-line small {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
        }

        .model-engine-codes .family-open-slot {
          grid-column: 1 / -1;
          display: none;
          margin-top: -14px;
        }

        .model-engine-codes .family-open-slot.is-visible {
          display: block;
        }

        .model-engine-codes .open-panel {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          column-gap: 12px;
          background: linear-gradient(135deg, #081a34 0%, #0d2848 100%);
          border-radius: 0 0 18px 18px;
          box-shadow: 0 18px 30px rgba(11, 31, 57, 0.26);
          overflow: hidden;
          padding: 0 12px 5px;
        }

        .model-engine-codes .hero-row {
          display: grid;
          grid-template-columns: 150px minmax(0, 1fr);
          color: #ffffff;
          overflow: hidden;
        }

        .model-engine-codes .image-frame {
          padding: 8px;
          display: flex;
          align-items: center;
        }

        .model-engine-codes .image-placeholder {
          width: 100%;
          max-height: 96px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
          display: grid;
          place-items: center;
          text-align: center;
          padding: 10px;
        }

        .model-engine-codes .engine-image {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: 96px;
        }

        .model-engine-codes .image-placeholder strong {
          display: block;
          font-size: 10px;
          line-height: 1.3;
        }

        .model-engine-codes .image-placeholder span {
          display: block;
          margin-top: 3px;
          color: #bfd0e1;
          font-size: 8px;
          line-height: 1.32;
        }

        .model-engine-codes .hero-copy {
          padding: 12px 16px 4px 12px;
          display: grid;
          gap: 8px;
        }

        .model-engine-codes .hero-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 180px;
          gap: 8px;
          align-items: start;
        }

        .model-engine-codes .hero-copy p {
          margin: 0;
          color: #e1ebf5;
          font-size: 11px;
          line-height: 1.4;
        }

        .model-engine-codes .history-label {
          display: block;
          margin: 0 0 5px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.2;
        }

        .model-engine-codes .price-box {
          width: 100%;
          max-width: 178px;
          justify-self: end;
          padding: 2px 0 2px 16px;
          border-left: 1px solid rgba(255, 255, 255, 0.16);
        }

        .model-engine-codes .price-box small,
        .model-engine-codes .mobile-price-summary small,
        .model-engine-codes .variant-wrap small {
          display: block;
          color: #bfd0e1;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .model-engine-codes .price-box strong,
        .model-engine-codes .mobile-price-summary strong {
          display: block;
          color: #42d272;
          font-size: 18px;
          line-height: 1;
          letter-spacing: -0.05em;
          margin: 4px 0;
        }

        .model-engine-codes .price-box span,
        .model-engine-codes .mobile-price-summary span {
          display: block;
          color: #bfd0e1;
          font-size: 9px;
          line-height: 1.4;
          margin-bottom: 6px;
        }

        .model-engine-codes .quote-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #42d272;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.35;
        }

        .model-engine-codes .quote-link-text {
          display: inline-grid;
          gap: 1px;
        }

        .model-engine-codes .quote-link svg,
        .model-engine-codes .cta-btn svg {
          width: 14px;
          height: 14px;
        }

        .model-engine-codes .variant-wrap {
          display: grid;
          gap: 6px;
          margin-top: -8px;
        }

        .model-engine-codes .variant-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .model-engine-codes .variant-tags span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 22px;
          padding: 0 9px;
          border-radius: 2px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #f7fbff;
          font-size: 8px;
          font-weight: 700;
          line-height: 1;
        }

        .model-engine-codes .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          padding: 8px 0 0;
        }

        .model-engine-codes .info-box {
          border: 1px solid #dfe7ef;
          border-radius: 4px;
          background: #ffffff;
          padding: 9px 9px 6px;
        }

        .model-engine-codes .info-box h4 {
          margin: 0 0 7px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          letter-spacing: -0.02em;
          color: #10203a;
        }

        .model-engine-codes .info-box .icon {
          width: 24px;
          height: 24px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .model-engine-codes .specs-box .icon {
          background: #eef5fb;
          color: #274564;
        }

        .model-engine-codes .failures-box .icon {
          background: #fff2f2;
          color: #c73a3a;
        }

        .model-engine-codes .spec-list,
        .model-engine-codes .failure-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 5px;
        }

        .model-engine-codes .spec-list li {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 3px 0;
          border-bottom: 1px solid #e8eef5;
        }

        .model-engine-codes .spec-list li:last-child {
          border-bottom: 0;
          padding-bottom: 1px;
        }

        .model-engine-codes .spec-list span {
          color: #64748b;
          font-size: 10px;
          line-height: 1.2;
        }

        .model-engine-codes .spec-list strong {
          font-size: 11px;
          line-height: 1.2;
          text-align: right;
          color: #10203a;
        }

        .model-engine-codes .failure-list li {
          position: relative;
          padding-left: 12px;
          color: #2d3e55;
          font-size: 10px;
          line-height: 1.28;
        }

        .model-engine-codes .failure-list li::before {
          content: "";
          position: absolute;
          top: 6px;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c73a3a;
          box-shadow: 0 0 0 3px rgba(199, 58, 58, 0.14);
        }

        .model-engine-codes .mobile-action-row {
          display: none;
        }

        .model-engine-codes .closing-card {
          margin-top: 30px;
          border: 1px solid #0d1b2e;
          border-radius: 22px;
          background: #ffffff;
          display: grid;
          grid-template-columns: 74px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 18px;
          box-shadow: 0 12px 30px rgba(12, 29, 53, 0.06);
        }

        .model-engine-codes .closing-icon {
          width: 58px;
          height: 58px;
          border-radius: 16px;
          background: #f5f8fc;
          color: #0d1b2e;
          display: grid;
          place-items: center;
        }

        .model-engine-codes .closing-card h3 {
          margin: 0 0 6px;
          font-size: 20px;
          letter-spacing: -0.03em;
          color: #10203a;
        }

        .model-engine-codes .closing-card p {
          margin: 0;
          color: #40546c;
          font-size: 14px;
          line-height: 1.5;
        }

        .model-engine-codes .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 14px;
          background: #0d1b2e;
          color: #ffffff;
          font-size: 15px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 10px 20px rgba(13, 27, 46, 0.18);
        }

        @media (max-width: 920px) {
          .model-engine-codes .engine-list,
          .model-engine-codes .open-panel {
            grid-template-columns: 1fr;
          }

          .model-engine-codes .hero-row {
            grid-template-columns: 132px minmax(0, 1fr);
          }

          .model-engine-codes .hero-top {
            grid-template-columns: minmax(0, 1fr) 188px;
          }

          .model-engine-codes .closing-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .model-engine-codes .engine-codes-section {
            padding: 34px 12px 50px;
          }

          .model-engine-codes .ecs-header h2 {
            font-size: 32px;
          }

          .model-engine-codes .ecs-header p,
          .model-engine-codes .family-title p {
            font-size: 15px;
          }

          .model-engine-codes .family-title h3 {
            font-size: 24px;
          }

          .model-engine-codes .engine-summary {
            grid-template-columns: 44px minmax(0, 1fr) minmax(104px, 122px) 14px;
            gap: 8px;
            padding: 12px;
            min-height: 70px;
          }

          .model-engine-codes .engine-thumb {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }

          .model-engine-codes .engine-thumb svg {
            width: 19px;
            height: 19px;
          }

          .model-engine-codes .summary-line strong {
            font-size: 18px;
          }

          .model-engine-codes .summary-line small {
            font-size: 11px;
          }

          .model-engine-codes .price strong {
            font-size: 16px;
          }

          .model-engine-codes .open-panel {
            padding: 0 10px 5px;
          }

          .model-engine-codes .info-grid {
            grid-template-columns: 1fr 1fr;
          }

          .model-engine-codes .hero-row {
            grid-template-columns: 120px minmax(0, 1fr);
          }

          .model-engine-codes .hero-top {
            grid-template-columns: 1fr;
          }

          .model-engine-codes .price-box {
            display: none;
          }

          .model-engine-codes .mobile-action-row {
            display: grid;
            gap: 10px;
            padding: 8px 0 4px;
          }
        }
      `}</style>
    </Section>
  );
}
