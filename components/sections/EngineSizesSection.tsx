"use client";

import { useMemo, useState } from "react";
import type { EngineSizesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  brandName: string;
  data: EngineSizesData;
  bgImage?: string;
};

function tagVariant(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("hybrid") || normalized.includes("electric")) return "hybrid";
  if (normalized.includes("petrol")) return "petrol";
  return "diesel";
}

function FuelTabIcon({ kind }: { kind: "diesel" | "petrol" | "hybrid" }) {
  if (kind === "petrol") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "hybrid") {
    return (
      <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 15 17 18 14 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="18" x2="9" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EngineIcon({ hybrid = false }: { hybrid?: boolean }) {
  if (hybrid) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 15 17 18 14 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="17" y1="18" x2="9" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" aria-hidden="true">
      <path
        d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" />
      <polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <span className={`text-[18px] leading-none text-[#d1d5db] transition ${open ? "rotate-180 text-[#15803d]" : ""}`}>
      ⌄
    </span>
  );
}

type GroupItem = EngineSizesData["groups"][number]["items"][number];

function MobileAccordionCard({
  item,
  kind,
  open,
  onToggle,
}: {
  item: GroupItem;
  kind: "diesel" | "petrol" | "hybrid";
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)] ${open ? "open" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-[14px] py-[14px] text-left transition hover:bg-[#fafafa]"
      >
        <div className={`flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[9px] ${kind === "hybrid" ? "bg-[#15803d] text-white" : "bg-[#0d1b2e] text-[#22c55e]"}`}>
          <EngineIcon hybrid={kind === "hybrid"} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-['Manrope'] text-[14.5px] font-extrabold leading-[1.2] text-[#0d1b2e]">{item.title}</div>
          <div className="mt-1 flex flex-wrap gap-[5px]">
            <span className={`rounded-full border px-[8px] py-[2px] text-[9px] font-bold uppercase tracking-[0.5px] ${
              kind === "diesel"
                ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
                : kind === "petrol"
                  ? "border-[#fed7aa] bg-[#fff8f0] text-[#c2410c]"
                  : "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
            }`}>
              {kind === "hybrid" ? "Hybrid & Electric" : kind === "petrol" ? "Petrol" : "Diesel"}
            </span>
            {item.engineCodes?.length ? (
              <span className="rounded-full border border-[#e5e7eb] bg-[#f1f5f9] px-[8px] py-[2px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#374151]">
                {item.engineCodes.slice(0, 2).join(" · ")}
              </span>
            ) : null}
          </div>
        </div>

        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div className="border-t border-[#f1f5f9]">
          <p className="border-b border-[#f1f5f9] px-4 py-[14px] text-[12.5px] leading-[1.7] text-[#374151]">
            {item.description}
          </p>

          <table className="w-full border-collapse">
            <tbody>
              {item.engineCodes?.length ? (
                <tr className="border-b border-[#f1f5f9]">
                  <td className="w-[38%] px-4 py-[9px] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">System / Motor Code(s)</td>
                  <td className="px-4 py-[9px] text-[11.5px] font-medium leading-[1.45] text-[#374151]">
                    <strong className="font-bold text-[#0d1b2e]">{item.engineCodes.join(", ")}</strong>
                  </td>
                </tr>
              ) : null}
              {item.compatibleModels?.length ? (
                <tr className="border-b border-[#f1f5f9]">
                  <td className="w-[38%] px-4 py-[9px] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">Compatible Models (UK)</td>
                  <td className="px-4 py-[9px] text-[11.5px] font-medium leading-[1.45] text-[#374151]">
                    {item.compatibleModels.join(", ")}
                  </td>
                </tr>
              ) : null}
              {item.productionYears ? (
                <tr className="border-b border-[#f1f5f9]">
                  <td className="w-[38%] px-4 py-[9px] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">Production Years</td>
                  <td className="px-4 py-[9px] text-[11.5px] font-medium leading-[1.45] text-[#374151]">
                    {item.productionYears}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>

          {item.commonFailurePoints?.length ? (
            kind === "hybrid" ? (
              <div className="mx-4 mb-[14px] mt-[14px] flex items-start gap-2 rounded-[8px] border border-[#fde68a] bg-[#fffbeb] px-3 py-[10px]">
                <span className="mt-[1px] text-[#f59e0b]">
                  <WarningIcon />
                </span>
                <p className="text-[11px] leading-[1.55] text-[#92400e]">
                  <strong className="font-bold">Important Notes:</strong> {item.commonFailurePoints.join(", ")}
                </p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="w-[38%] px-4 py-[9px] text-[9.5px] font-bold uppercase tracking-[0.5px] text-[#9ca3af]">Common Failures</td>
                    <td className="px-4 py-[9px] text-[11.5px] font-medium leading-[1.45] text-[#374151]">
                      {item.commonFailurePoints.join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          ) : null}

          <a
            href="#quote-form"
            data-quote-context={item.title}
            data-quote-source="engine-sizes"
            className="flex items-center gap-[6px] border-t border-[#f1f5f9] bg-[#fafafa] px-4 py-3 text-[12px] font-bold text-[#15803d] transition hover:bg-[#f0fdf4]"
          >
            <ArrowIcon />
            <span>{item.cta}</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

function DesktopRow({
  item,
  kind,
  open,
  onToggle,
}: {
  item: GroupItem;
  kind: "diesel" | "petrol" | "hybrid";
  open: boolean;
  onToggle: () => void;
}) {
  const badgeClass =
    kind === "diesel"
      ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]"
      : kind === "petrol"
        ? "border-[#fed7aa] bg-[#fff8f0] text-[#c2410c]"
        : "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]";

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_2px_8px_rgba(13,27,46,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-[14px] py-[12px] text-left transition hover:bg-[#fafafa]"
      >
        <span className="h-6 w-[4px] flex-none rounded-full bg-[#22c55e]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <div className="font-['Manrope'] text-[20px] font-extrabold leading-none text-[#0d1b2e]">{item.title}</div>
            <span className={`rounded-[6px] border px-[8px] py-[2px] text-[10px] font-bold uppercase tracking-[0.5px] ${badgeClass}`}>
              {kind === "hybrid" ? "Hybrid & Electric" : kind === "petrol" ? "Petrol" : "Diesel"}
            </span>
            {item.compatibleModels?.length ? (
              <span className="truncate text-[11px] text-[#64748b]">{item.compatibleModels.slice(0, 5).join(", ")}</span>
            ) : null}
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <div className="border-t border-[#f1f5f9] px-[14px] py-[12px]">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.92fr_0.75fr]">
            <div>
              <div className="mb-[6px] font-['Manrope'] text-[15px] font-extrabold text-[#0d1b2e]">
                {brandNameLabel(item.title, kind)}
              </div>
              <p className="text-[12px] leading-[1.7] text-[#374151]">{item.description}</p>
              <a
                href="#quote-form"
                data-quote-context={item.title}
                data-quote-source="engine-sizes"
                className="mt-[14px] inline-flex items-center rounded-[8px] border border-[#dbe6d8] bg-[#f8fff7] px-3 py-[9px] text-[12px] font-bold text-[#15803d] transition hover:bg-[#f0fdf4]"
              >
                <ArrowIcon />
                <span className="ml-[6px]">{item.cta}</span>
              </a>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-[#bbf7d0]">
              <table className="w-full border-collapse">
                <tbody>
                  {item.engineCodes?.length ? (
                    <tr className="border-b border-[#d7f0d7]">
                      <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#374151]">Engine Code(s)</td>
                      <td className="px-3 py-[10px] text-[11px] text-[#374151]">{item.engineCodes.join(", ")}</td>
                    </tr>
                  ) : null}
                  {item.compatibleModels?.length ? (
                    <tr className="border-b border-[#d7f0d7]">
                      <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#374151]">Compatible Models (UK)</td>
                      <td className="px-3 py-[10px] text-[11px] text-[#374151]">{item.compatibleModels.join(", ")}</td>
                    </tr>
                  ) : null}
                  {item.productionYears ? (
                    <tr>
                      <td className="w-[42%] px-3 py-[10px] text-[9px] font-bold uppercase tracking-[0.5px] text-[#374151]">Production Years</td>
                      <td className="px-3 py-[10px] text-[11px] text-[#374151]">{item.productionYears}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {item.commonFailurePoints?.length ? (
              <div className={`rounded-[10px] border px-3 py-[10px] ${
                kind === "hybrid"
                  ? "border-[#fde68a] bg-[#fffbeb]"
                  : "border-[#f3dfd6] bg-[#fffaf7]"
              }`}>
                <div className={`mb-[8px] flex items-center gap-[6px] text-[9px] font-bold uppercase tracking-[0.5px] ${
                  kind === "hybrid" ? "text-[#f59e0b]" : "text-[#c2410c]"
                }`}>
                  <WarningIcon />
                  <span>{kind === "hybrid" ? "Important Notes" : "Common Failure Points"}</span>
                </div>
                <p className={`text-[11px] leading-[1.55] ${
                  kind === "hybrid" ? "text-[#92400e]" : "text-[#6b7280]"
                }`}>
                  {item.commonFailurePoints.join(", ")}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function brandNameLabel(sizeTitle: string, kind: "diesel" | "petrol" | "hybrid") {
  if (kind === "hybrid") return `Land Rover ${sizeTitle}`;
  if (kind === "petrol") return `Land Rover ${sizeTitle} Petrol Engines`;
  return `Land Rover ${sizeTitle} Diesel Engines`;
}

export default function EngineSizesSection({ brandName: _brandName, data, bgImage }: Props) {
  void _brandName;
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [openItemIndex, setOpenItemIndex] = useState(0);

  const activeGroup = data.groups[activeGroupIndex] ?? data.groups[0];
  const fuelKind = tagVariant(activeGroup?.title ?? "diesel");

  useMemo(() => activeGroup, [activeGroup]);

  return (
    <Section className="relative overflow-hidden bg-[#f8f9fa]">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 hidden h-[280px] w-[390px] opacity-[0.07] lg:block"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(248,249,250,0.15), rgba(248,249,250,0.82)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}

      <Container className="relative max-w-[1180px]">
        <div className="mb-[14px] inline-flex items-center gap-[7px] rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-[4px] text-[10px] font-bold uppercase tracking-[0.8px] text-[#15803d]">
          <WarningIcon />
          <span>{data.tag}</span>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_0.9fr] lg:items-start lg:gap-8">
          <div>
            <h2 className="max-w-[620px] font-['Manrope'] text-[24px] font-extrabold leading-[1.2] tracking-[-0.4px] text-[#0d1b2e] md:text-[28px] lg:text-[30px]">
              {data.h2}
            </h2>
            <p className="mt-[10px] max-w-[540px] text-[13px] leading-[1.6] text-[#6b7280]">{data.intro}</p>
          </div>

          <div className="mt-4 hidden rounded-[12px] border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0_2px_8px_rgba(13,27,46,0.04)] lg:flex lg:items-start lg:gap-3">
            <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-[#f0fdf4] text-[#22c55e]">
              <ShieldIcon />
            </div>
            <p className="text-[12px] leading-[1.7] text-[#64748b]">{data.closing}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-[6px] overflow-x-auto pb-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          {data.groups.map((group, index) => {
            const kind = tagVariant(group.title);
            const active = index === activeGroupIndex;

            return (
              <button
                key={group.title}
                type="button"
                onClick={() => {
                  setActiveGroupIndex(index);
                  setOpenItemIndex(0);
                }}
                className={`inline-flex flex-none items-center gap-[6px] rounded-full border px-4 py-2 font-['Manrope'] text-[12px] font-bold transition ${
                  active
                    ? kind === "hybrid"
                      ? "border-[#15803d] bg-[#15803d] text-white"
                      : "border-[#0d1b2e] bg-[#0d1b2e] text-white"
                    : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#0d1b2e] hover:text-[#0d1b2e]"
                }`}
              >
                <FuelTabIcon kind={kind} />
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 hidden rounded-[8px] bg-[#0d1b2e] p-[3px] lg:flex lg:items-center lg:gap-[3px]">
          {data.groups.map((group, index) => {
            const kind = tagVariant(group.title);
            const active = index === activeGroupIndex;

            return (
              <button
                key={group.title}
                type="button"
                onClick={() => {
                  setActiveGroupIndex(index);
                  setOpenItemIndex(0);
                }}
                className={`flex flex-1 items-center justify-center gap-[6px] rounded-[6px] px-4 py-[10px] font-['Manrope'] text-[12px] font-bold transition ${
                  active
                    ? kind === "hybrid"
                      ? "bg-[#15803d] text-white"
                      : "bg-[#16a34a] text-white"
                    : "bg-transparent text-white/80 hover:text-white"
                }`}
              >
                <FuelTabIcon kind={kind} />
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-[10px] lg:hidden">
          {activeGroup.items.map((item, index) => (
            <MobileAccordionCard
              key={item.title}
              item={item}
              kind={fuelKind}
              open={openItemIndex === index}
              onToggle={() => setOpenItemIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </div>

        <div className="mt-3 hidden lg:block">
          <div className="flex flex-col gap-[8px]">
            {activeGroup.items.map((item, index) => (
              <DesktopRow
                key={item.title}
                item={item}
                kind={fuelKind}
                open={openItemIndex === index}
                onToggle={() => setOpenItemIndex((current) => (current === index ? -1 : index))}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[12px] bg-[#0d1b2e] px-5 py-5 lg:hidden">
          <p className="text-[13px] leading-[1.65] text-[#94a3b8]">
            {data.closing}
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="e.g. AB12 CDE"
              maxLength={8}
              className="h-[46px] min-w-0 flex-1 rounded-[8px] border-[1.5px] border-[#e5e7eb] bg-white px-3 text-[14px] uppercase text-[#0d1b2e] outline-none placeholder:text-[#9ca3af] focus:border-[#15803d]"
            />
            <a
              href="#quote-form"
              data-quote-context={activeGroup.title}
              data-quote-source="engine-sizes-summary"
              className="inline-flex h-[46px] items-center rounded-[8px] bg-[#15803d] px-4 font-['Manrope'] text-[12px] font-bold text-white transition hover:bg-[#166534]"
            >
              Find My Engine
            </a>
          </div>
        </div>

      </Container>
    </Section>
  );
}
