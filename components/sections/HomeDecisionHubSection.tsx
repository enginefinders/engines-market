"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import {
  costLookupTable,
  engineConditions,
  failureTypes,
  formatCurrency,
  formatVehicleValueStep,
  getVerdict,
  staticCostTableRows,
  vehicleAgeOptions,
  vehicleValueSteps,
  type EngineConditionId,
  type FailureTypeId,
  type VehicleAgeId,
  type VerdictId,
} from "@/lib/homeDecisionHubData";

type StepId = 1 | 2 | 3;

function TickIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CircleTickIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="m7.5 12 3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 4v16M7 7h10M5 7l-3 5h6L5 7Zm14 0-3 5h6l-3-5Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <path d="M12 4 3 20h18L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 9v5M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function getVerdictMeta(verdict: VerdictId) {
  if (verdict === "A") {
    return {
      icon: <CircleTickIcon />,
      accent: "text-[#15803d]",
      bg: "bg-[#f0fdf4]",
      border: "border-[#86efac]",
      title: "Replacement is likely worth it for your vehicle.",
      subtitle: "Based on your answers, engine replacement makes financial sense.",
    };
  }

  if (verdict === "B") {
    return {
      icon: <ScaleIcon />,
      accent: "text-[#b45309]",
      bg: "bg-[#fffbeb]",
      border: "border-[#fcd34d]",
      title: "Engine replacement is borderline. Get real quotes before deciding.",
      subtitle: "Real specialist quotes could change this picture significantly.",
    };
  }

  if (verdict === "C") {
    return {
      icon: <LoopIcon />,
      accent: "text-[#1d4ed8]",
      bg: "bg-[#eff6ff]",
      border: "border-[#93c5fd]",
      title: "You have two strong options. Here is the comparison.",
      subtitle: "Your vehicle value supports both replacement and buying another used car.",
    };
  }

  return {
    icon: <WarningIcon />,
    accent: "text-[#dc2626]",
    bg: "bg-[#fef2f2]",
    border: "border-[#fca5a5]",
    title: "Replacement costs may exceed your vehicle's value.",
    subtitle: "Consider all options carefully - but low-cost used routes can still be worth checking.",
  };
}

function StepIndicator({ step }: { step: StepId }) {
  const steps = [
    { number: 1, label: "Failure Type" },
    { number: 2, label: "Your Vehicle" },
    { number: 3, label: "Engine Type" },
  ] as const;

  return (
    <div className="hidden items-start gap-3 sm:flex">
      {steps.map((item, index) => {
        const done = step > item.number;
        const active = step === item.number;

        return (
          <div key={item.number} className="flex min-w-0 flex-1 items-start gap-3">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[12px] font-bold transition ${
                  done || active
                    ? "border-[#15803d] bg-[#15803d] text-white"
                    : "border-[#d9e2ec] bg-white text-[#94a3b8]"
                }`}
              >
                {done ? <TickIcon /> : item.number}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-[0.08em] ${done || active ? "text-[#15803d]" : "text-[#94a3b8]"}`}>
                {item.label}
              </span>
            </div>

            {index < steps.length - 1 ? (
              <div className={`mt-4 h-[2px] flex-1 ${step > item.number ? "bg-[#15803d]" : "bg-[#e2e8f0]"}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function MobileStepIndicator({ step }: { step: StepId }) {
  const steps = [
    { number: 1, label: "Failure" },
    { number: 2, label: "Vehicle" },
    { number: 3, label: "Engine" },
  ] as const;

  return (
    <div className="mb-4 sm:hidden">
      <div className="mb-3 h-[3px] overflow-hidden rounded-full bg-[#dbe3ec]">
        <div
          className="h-full rounded-full bg-[#15803d] transition-[width]"
          style={{ width: `${Math.round((step / 3) * 100)}%` }}
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        {steps.map((item) => {
          const done = step > item.number;
          const active = step === item.number;

          return (
            <div key={item.number} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-[12px] font-bold ${
                  done || active
                    ? "border-[#15803d] bg-[#15803d] text-white"
                    : "border-[#d9e2ec] bg-white text-[#94a3b8]"
                }`}
              >
                {done ? <TickIcon /> : item.number}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${done || active ? "text-[#15803d]" : "text-[#94a3b8]"}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResultPreview() {
  return (
    <div className="hidden rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.08)] p-5 text-white/80 shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:block">
      <div className="flex items-center gap-3 text-[#86efac]">
        <CircleTickIcon />
        <span className="text-[14px] font-semibold uppercase tracking-[0.08em]">Preview Result</span>
      </div>
      <h3 className="mt-4 font-['Manrope'] text-[24px] font-bold leading-[1.15] text-white">
        Replacement is likely worth it
      </h3>
      <div className="mt-5 rounded-[14px] border border-white/10 bg-white/10 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/60">Typical Cost</p>
        <p className="mt-2 text-[28px] font-black text-[#86efac]">GBP 2,200-5,500</p>
        <p className="mt-2 text-[12px] leading-[1.6] text-white/70">
          Compare it against your car&apos;s current value and see whether replacement makes financial sense.
        </p>
      </div>
    </div>
  );
}

function VerdictScreen({
  failureType,
  carAge,
  carValue,
  engineCondition,
  onReset,
}: {
  failureType: FailureTypeId;
  carAge: VehicleAgeId;
  carValue: number;
  engineCondition: EngineConditionId;
  onReset: () => void;
}) {
  const verdictState = getVerdict(failureType, carAge, carValue, engineCondition);
  const failureLabel = failureTypes.find((item) => item.id === failureType)?.label ?? "";
  const conditionLabel = engineConditions.find((item) => item.id === engineCondition)?.label ?? "";
  const verdict = getVerdictMeta(verdictState.verdict);

  return (
    <div>
      <div className={`rounded-[16px] border p-5 sm:p-6 ${verdict.bg} ${verdict.border}`}>
        <div className={`flex items-start gap-3 ${verdict.accent}`}>
          {verdict.icon}
          <div>
            <h3 className="font-['Manrope'] text-[24px] font-bold leading-[1.2] text-[#0d1b2e]">{verdict.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#4b5563]">{verdict.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white">
        <div className="border-b border-[#e2e8f0] bg-[#0d1b2e] px-5 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">Your Estimated Cost Breakdown</p>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-[12px] border border-[#86efac] bg-[#f0fdf4] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">{failureLabel} - {conditionLabel}</p>
            <p className="mt-2 font-['Manrope'] text-[26px] font-black text-[#15803d]">
              {formatCurrency(verdictState.costs.low)} - {formatCurrency(verdictState.costs.high)}
            </p>
            <p className="mt-1 text-[12px] text-[#6b7280]">Typical cost supplied & fitted</p>
          </div>

          <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">Main Dealer Estimate</p>
            <p className="mt-2 font-['Manrope'] text-[26px] font-black text-[#94a3b8] line-through">
              {formatCurrency(verdictState.costs.mdLow)} - {formatCurrency(verdictState.costs.mdHigh)}
            </p>
            <p className="mt-1 text-[12px] text-[#6b7280]">Typical main dealer pricing</p>
          </div>

          <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">Your Car&apos;s Estimated Value</p>
            <p className="mt-2 font-['Manrope'] text-[24px] font-black text-[#0d1b2e]">{formatCurrency(carValue)}</p>
            <p className="mt-1 text-[12px] text-[#6b7280]">Before the engine failure</p>
          </div>

          <div className="rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">Replacement as % of Car Value</p>
            <p className="mt-2 font-['Manrope'] text-[24px] font-black text-[#0d1b2e]">{verdictState.replacementAsPercentOfCarValue}%</p>
            <p className="mt-1 text-[12px] text-[#6b7280]">EnginesMarket typical cost only</p>
          </div>
        </div>

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="rounded-[12px] border border-[#86efac] bg-[#f0fdf4] px-4 py-3 text-[14px] font-semibold text-[#15803d]">
            Potential saving via EnginesMarket: up to {verdictState.savingVsDealer}%
          </div>

          {verdictState.verdict === "C" ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[12px] border border-[#dbe5f2] bg-[#f8fafc] p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#15803d]">Option 1 - Replace the Engine</p>
                <p className="mt-2 font-['Manrope'] text-[20px] font-black text-[#0d1b2e]">
                  {formatCurrency(verdictState.costs.low)} - {formatCurrency(verdictState.costs.high)}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#6b7280]">
                  Your car retains its value. Cheaper than buying another equivalent vehicle outright.
                </p>
              </div>
              <div className="rounded-[12px] border border-[#dbe5f2] bg-[#f8fafc] p-4">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1d4ed8]">Option 2 - Buy a Replacement Car</p>
                <p className="mt-2 font-['Manrope'] text-[20px] font-black text-[#0d1b2e]">
                  {formatCurrency(Math.round(carValue * 1.1))} - {formatCurrency(Math.round(carValue * 1.4))}
                </p>
                <p className="mt-2 text-[13px] leading-[1.6] text-[#6b7280]">
                  Higher upfront cost. May be preferable if the rest of the vehicle is also near end of life.
                </p>
              </div>
            </div>
          ) : null}

          {verdictState.verdict === "D" ? (
            <div className="mt-4 rounded-[12px] border border-[#fecaca] bg-[#fff7f7] p-4">
              <p className="text-[13px] font-semibold text-[#0d1b2e]">Options worth considering:</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-[1.6] text-[#6b7280]">
                <li>Get quotes anyway - some low-mileage used engines can bring total costs under GBP 1,200.</li>
                <li>DVLA scrap value is typically around GBP 150-350 for an unrunning vehicle.</li>
                <li>Part-exchange as a non-runner can still be an option with some dealers.</li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#home-hero-reg-form"
            data-quote-context={`Engine replacement calculator - ${failureLabel}`}
            data-quote-source="decision-hub-result-primary"
            className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition hover:bg-[#166534]"
          >
            <span>{verdictState.verdict === "B" ? "Compare Quotes & Decide With Real Prices" : verdictState.verdict === "D" ? "Get Quotes Anyway" : "Get Free Engine Replacement Quotes"}</span>
            <ArrowIcon />
          </a>

          {verdictState.verdict === "C" ? (
            <a
              href="#home-hero-reg-form"
              className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] border border-[#d9e2ec] bg-white px-5 text-[14px] font-semibold text-[#0d1b2e] transition hover:bg-[#f8fafc]"
            >
              View Car Value Guide
            </a>
          ) : verdictState.verdict === "D" ? (
            <a
              href="#home-hero-reg-form"
              className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] border border-[#d9e2ec] bg-white px-5 text-[14px] font-semibold text-[#0d1b2e] transition hover:bg-[#f8fafc]"
            >
              Honest Cost Comparison Guide
            </a>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12px] text-[#6b7280]">
          <span>No obligation</span>
          <span>100+ vetted UK specialists</span>
          <span>Free to use</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mx-auto mt-4 block text-[13px] text-[#6b7280] underline underline-offset-2"
        >
          Start again / Try different inputs
        </button>
      </div>
    </div>
  );
}

export default function HomeDecisionHubSection() {
  const [step, setStep] = useState<StepId>(1);
  const [failureType, setFailureType] = useState<FailureTypeId | null>(null);
  const [vehicleAge, setVehicleAge] = useState<VehicleAgeId | null>(null);
  const [vehicleValue, setVehicleValue] = useState<number>(5000);
  const [engineCondition, setEngineCondition] = useState<EngineConditionId>("reconditioned");
  const [showResult, setShowResult] = useState(false);

  const nearestValueIndex = useMemo(
    () =>
      vehicleValueSteps.indexOf(
        vehicleValueSteps.reduce((closest, current) =>
          Math.abs(current - vehicleValue) < Math.abs(closest - vehicleValue) ? current : closest,
        ),
      ),
    [vehicleValue],
  );

  const previewCosts = costLookupTable["timing-chain"].reconditioned;

  function resetTool() {
    setStep(1);
    setFailureType(null);
    setVehicleAge(null);
    setVehicleValue(5000);
    setEngineCondition("reconditioned");
    setShowResult(false);
  }

  return (
    <Section className="bg-[#0d1b2e] py-8 sm:py-9 lg:py-11">
      <Container className="max-w-[1040px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="section-pill mx-auto border border-white/10 bg-white/10">
            <span className="text-white">Engine Failure Cost Calculator</span>
          </div>

          <h2 className="mt-4 font-['Manrope'] text-[30px] font-bold leading-[1.08] text-white sm:text-[34px] lg:text-[40px]">
            <span>Is Engine Replacement </span>
            <span className="text-[#22c55e]">Worth It?</span>
            <span> Find Out in 60 Seconds.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[60ch] text-[15px] leading-[1.7] text-[#94a3b8] sm:text-[16px]">
            Enter your failure type and vehicle details below. We&apos;ll show you the typical replacement cost, how it compares to your car&apos;s value, and whether replacement makes financial sense.
          </p>

          <p className="mx-auto mt-4 max-w-[68ch] text-[14px] leading-[1.7] text-white/65">
            The most common question we receive: &quot;My engine has failed - is it worth replacing, or should I scrap the car?&quot; The answer depends on your failure type, vehicle value, and which type of replacement engine you choose - and the difference between a GBP 2,200 reconditioned engine via EnginesMarket and a GBP 14,000 main dealer quote is often the deciding factor.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
            <div className="h-[3px] w-full bg-[#dbe3ec]">
              {!showResult ? (
                <div className="h-full bg-[#15803d] transition-[width]" style={{ width: `${Math.round((step / 3) * 100)}%` }} />
              ) : (
                <div className="h-full w-full bg-[#15803d]" />
              )}
            </div>

            <div className="p-5 sm:p-7 lg:p-9">
              {showResult && failureType && vehicleAge ? (
                <VerdictScreen
                  failureType={failureType}
                  carAge={vehicleAge}
                  carValue={vehicleValue}
                  engineCondition={engineCondition}
                  onReset={resetTool}
                />
              ) : (
                <>
                  <MobileStepIndicator step={step} />
                  <StepIndicator step={step} />

                  {step === 1 ? (
                    <div>
                      <h3 className="font-['Manrope'] text-[22px] font-bold text-[#0d1b2e]">What happened to your engine?</h3>
                      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                        {failureTypes.slice(0, 6).map((failure) => {
                          const selected = failureType === failure.id;

                          return (
                            <button
                              key={failure.id}
                              type="button"
                              onClick={() => setFailureType(failure.id)}
                              className={`flex min-h-[90px] flex-col items-center justify-center gap-2 rounded-[12px] border px-3 py-4 text-center transition ${
                                selected
                                  ? "border-2 border-[#15803d] bg-[#f0fdf4] shadow-[0_0_0_4px_rgba(21,128,61,0.08)]"
                                  : "border-[#e2e8f0] bg-white hover:border-[#15803d] hover:shadow-[0_2px_12px_rgba(21,128,61,0.15)]"
                              }`}
                            >
                              <span className="text-[24px] leading-none">{failure.emoji}</span>
                              <span className="text-[12px] font-bold leading-[1.35] text-[#0d1b2e]">{failure.label}</span>
                              <span className="text-[10.5px] leading-[1.45] text-[#94a3b8]">{failure.description}</span>
                            </button>
                          );
                        })}
                      </div>

                      {(() => {
                        const unknown = failureTypes.find((item) => item.id === "unknown");
                        const selected = failureType === "unknown";

                        if (!unknown) return null;

                        return (
                          <button
                            type="button"
                            onClick={() => setFailureType("unknown")}
                            className={`mt-3 flex min-h-[68px] w-full items-center gap-4 rounded-[12px] border px-4 py-4 text-left transition ${
                              selected
                                ? "border-2 border-[#15803d] bg-[#f0fdf4] shadow-[0_0_0_4px_rgba(21,128,61,0.08)]"
                                : "border-[#e2e8f0] bg-white hover:border-[#15803d] hover:shadow-[0_2px_12px_rgba(21,128,61,0.15)]"
                            }`}
                          >
                            <span className="text-[24px]">{unknown.emoji}</span>
                            <div>
                              <p className="text-[13px] font-bold text-[#0d1b2e]">{unknown.label}</p>
                              <p className="mt-1 text-[12px] text-[#94a3b8]">{unknown.description}</p>
                            </div>
                          </button>
                        );
                      })()}

                      <button
                        type="button"
                        disabled={!failureType}
                        onClick={() => setStep(2)}
                        className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition hover:bg-[#166534] disabled:cursor-not-allowed disabled:bg-[#d1d5db] disabled:shadow-none"
                      >
                        <span>Next Step</span>
                        <ArrowIcon />
                      </button>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div>
                      <h3 className="font-['Manrope'] text-[22px] font-bold text-[#0d1b2e]">Tell us about your vehicle</h3>

                      <div className="mt-6">
                        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#4b5563]">Vehicle Age</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {vehicleAgeOptions.map((age) => {
                            const selected = vehicleAge === age.id;

                            return (
                              <button
                                key={age.id}
                                type="button"
                                onClick={() => setVehicleAge(age.id)}
                                className={`rounded-full border px-4 py-3 text-[14px] font-bold transition ${
                                  selected
                                    ? "border-[#0d1b2e] bg-[#0d1b2e] text-white"
                                    : "border-[#e2e8f0] bg-white text-[#4b5563] hover:border-[#15803d] hover:text-[#15803d]"
                                }`}
                              >
                                {age.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-7">
                        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#4b5563]">Estimated Current Car Value</p>
                        <p className="mt-2 text-[13px] leading-[1.6] text-[#6b7280]">
                          What would your car sell for in its current condition, before the engine failure?
                        </p>

                        <div className="mt-4 rounded-[12px] border border-[#86efac] bg-[#f0fdf4] px-5 py-4 text-center">
                          <p className="font-['Manrope'] text-[34px] font-black text-[#15803d]">{formatCurrency(vehicleValue)}</p>
                          <p className="mt-1 text-[11px] text-[#6b7280]">estimated car value</p>
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={vehicleValueSteps.length - 1}
                          step={1}
                          value={nearestValueIndex}
	                          onChange={(event) => setVehicleValue(vehicleValueSteps[Number(event.currentTarget.value)] ?? 5000)}
                          className="mt-5 h-1 w-full cursor-pointer accent-[#15803d]"
                        />

                        <div className="mt-2 flex justify-between gap-2 text-[10px] text-[#94a3b8]">
                          {vehicleValueSteps.map((value) => (
                            <span key={value}>{formatVehicleValueStep(value)}</span>
                          ))}
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px]">
                          <div className="text-[12px] leading-[1.6] text-[#94a3b8]">
                            Not sure? Check a quick valuation on Auto Trader or We Buy Any Car. This helps us give you an accurate replacement vs. scrap comparison.
                          </div>
                          <label className="flex flex-col gap-1">
                            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">Manual Value</span>
                            <input
                              type="number"
                              min={500}
                              step={100}
                              value={vehicleValue}
                              onChange={(event) => {
	                                const nextValue = Number(event.currentTarget.value);
                                if (!Number.isFinite(nextValue)) return;
                                setVehicleValue(Math.max(500, Math.min(20000, nextValue)));
                              }}
                              className="h-[44px] rounded-[10px] border border-[#e2e8f0] px-3 text-[14px] font-semibold text-[#0d1b2e] outline-none focus:border-[#15803d]"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-6 hidden items-center gap-3 sm:flex">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-[13px] text-[#6b7280] underline underline-offset-2"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!vehicleAge}
                          onClick={() => setStep(3)}
                          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition hover:bg-[#166534] disabled:cursor-not-allowed disabled:bg-[#d1d5db] disabled:shadow-none"
                        >
                          <span>Next Step</span>
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div>
                      <h3 className="font-['Manrope'] text-[22px] font-bold text-[#0d1b2e]">What type of replacement engine are you open to?</h3>
                      <p className="mt-2 text-[13px] leading-[1.6] text-[#6b7280]">
                        Not sure which is right for you? We&apos;ll show you the cost difference in your results.
                      </p>

                      <div className="mt-5 flex flex-col gap-3 lg:flex-row">
                        {engineConditions.map((condition) => {
                          const selected = engineCondition === condition.id;

                          return (
                            <button
                              key={condition.id}
                              type="button"
                              onClick={() => setEngineCondition(condition.id)}
                              className={`flex-1 rounded-[12px] border px-4 py-5 text-center transition ${
                                selected
                                  ? "border-2 border-[#15803d] bg-[#f0fdf4]"
                                  : "border-[#e2e8f0] bg-white hover:border-[#15803d]"
                              }`}
                            >
                              <p className="font-['Manrope'] text-[18px] font-bold text-[#0d1b2e]">{condition.label}</p>
                              <p className={`mt-2 text-[13px] font-semibold ${selected ? "text-[#15803d]" : "text-[#94a3b8]"}`}>{condition.from}</p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-6 hidden items-center gap-3 sm:flex">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-[13px] text-[#6b7280] underline underline-offset-2"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowResult(true)}
                          className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition hover:bg-[#166534]"
                        >
                          <span>See My Results</span>
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {step > 1 ? (
                    <div className="mt-6 flex items-center gap-3 sm:hidden">
                      <button
                        type="button"
                        onClick={() => setStep((current) => (current === 3 ? 2 : 1))}
                        className="text-[13px] text-[#6b7280] underline underline-offset-2"
                      >
                        Back
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>

          {!showResult ? (
            <div className="lg:sticky lg:top-8">
              <ResultPreview />
              <div className="mt-4 hidden rounded-[18px] border border-white/10 bg-[#112240] p-4 text-white/80 lg:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#94a3b8]">Cross-brand reference</p>
                <p className="mt-2 font-['Manrope'] text-[20px] font-bold text-white">Timing Chain Failure</p>
                <p className="mt-2 text-[13px] text-[#94a3b8]">
                  Reconditioned S&F typical range:
                </p>
                <p className="mt-1 font-['Manrope'] text-[22px] font-black text-[#22c55e]">
                  {formatCurrency(previewCosts.low)} - {formatCurrency(previewCosts.high)}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {!showResult ? (
          <div className="sticky bottom-0 z-10 mt-4 rounded-[16px] border border-[#dbe3ec] bg-white p-4 shadow-[0_-6px_22px_rgba(13,27,46,0.08)] sm:hidden">
            <div className="mb-3 text-[12px] font-semibold text-[#6b7280]">
              {step === 2 ? "Step 2 of 3 - Your Vehicle" : step === 3 ? "Step 3 of 3 - Engine Type" : "Step 1 of 3 - Failure Type"}
            </div>
            {step === 2 ? (
              <button
                type="button"
                disabled={!vehicleAge}
                onClick={() => setStep(3)}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition disabled:cursor-not-allowed disabled:bg-[#d1d5db] disabled:shadow-none"
              >
                <span>Next Step</span>
                <ArrowIcon />
              </button>
            ) : step === 3 ? (
              <button
                type="button"
                onClick={() => setShowResult(true)}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#15803d] px-5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition"
              >
                <span>See My Results</span>
                <ArrowIcon />
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8">
          <h3 className="font-['Manrope'] text-[26px] font-bold text-white sm:text-[28px]">
            Typical UK Engine Replacement Costs by Failure Type
          </h3>

          <div className="mt-5 overflow-x-auto rounded-[16px] border border-white/10">
            <table className="min-w-[720px] w-full border-collapse">
              <thead>
                <tr className="bg-[#15803d]">
                  {["Failure Type", "Reconditioned S&F", "Rebuilt S&F", "Used S&F", "Main Dealer Est."].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-white"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staticCostTableRows.map((row, index) => (
                  <tr key={row.label} className={index % 2 === 0 ? "bg-[#112240]" : "bg-[#0d1b2e]"}>
                    <td className="border-b border-white/5 px-4 py-4 text-[14px] font-semibold text-white">{row.label}</td>
                    <td className="border-b border-white/5 px-4 py-4 text-[15px] font-bold text-[#22c55e]">{row.reconditioned}</td>
                    <td className="border-b border-white/5 px-4 py-4 text-[15px] font-bold text-[#cbd5e1]">{row.rebuilt}</td>
                    <td className="border-b border-white/5 px-4 py-4 text-[15px] font-bold text-[#cbd5e1]">{row.used}</td>
                    <td className="border-b border-white/5 px-4 py-4 text-[15px] font-bold text-[#94a3b8] line-through">{row.mainDealer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-[12px] leading-[1.6] text-white/60">
            Cost ranges shown are typical UK market ranges based on cross-brand EnginesMarket enquiry data. Actual costs vary by make, model, engine code, location, and supplier. Use the calculator above or get free personalised quotes.
          </p>
        </div>
      </Container>
    </Section>
  );
}
