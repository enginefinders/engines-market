export type FailureTypeId =
  | "timing-chain"
  | "seized-engine"
  | "head-gasket"
  | "turbo-damage"
  | "crankshaft-bearing"
  | "oil-pump"
  | "unknown";

export type VehicleAgeId = "under-5" | "5-to-10" | "10-to-15" | "over-15";
export type EngineConditionId = "reconditioned" | "rebuilt" | "used";
export type VerdictId = "A" | "B" | "C" | "D";

export type FailureType = {
  id: FailureTypeId;
  label: string;
  shortLabel: string;
  description: string;
  emoji: string;
  sectionRange: string;
};

export type VehicleAgeOption = {
  id: VehicleAgeId;
  label: string;
};

export type EngineCondition = {
  id: EngineConditionId;
  label: string;
  from: string;
};

export type CostEntry = {
  low: number;
  high: number;
  mdLow: number;
  mdHigh: number;
};

export type CostLookupTable = Record<FailureTypeId, Record<EngineConditionId, CostEntry>>;

export const failureTypes: FailureType[] = [
  {
    id: "timing-chain",
    emoji: "🔗",
    label: "Timing Chain Failure",
    shortLabel: "Timing Chain",
    description: "Rattle on startup / chain snapped",
    sectionRange: "GBP 2,200 - 7,000 S&F",
  },
  {
    id: "seized-engine",
    emoji: "💀",
    label: "Seized Engine",
    shortLabel: "Seized Engine",
    description: "Engine locked up / will not turn over",
    sectionRange: "GBP 1,800 - 8,000 S&F",
  },
  {
    id: "head-gasket",
    emoji: "🌡️",
    label: "Head Gasket Blown",
    shortLabel: "Head Gasket",
    description: "White smoke / coolant loss / overheating",
    sectionRange: "GBP 1,200 - 5,500 S&F",
  },
  {
    id: "turbo-damage",
    emoji: "💨",
    label: "Turbo Failure + Engine Damage",
    shortLabel: "Turbo Damage",
    description: "Loss of power / smoke / oil in intake",
    sectionRange: "GBP 2,000 - 6,500 S&F",
  },
  {
    id: "crankshaft-bearing",
    emoji: "🔩",
    label: "Crankshaft / Bearing Failure",
    shortLabel: "Crankshaft",
    description: "Knocking / low oil pressure / metal in oil",
    sectionRange: "GBP 2,500 - 9,000 S&F",
  },
  {
    id: "oil-pump",
    emoji: "🫧",
    label: "Oil Pump Failure",
    shortLabel: "Oil Pump",
    description: "Oil light on / sudden engine death",
    sectionRange: "GBP 1,800 - 7,500 S&F",
  },
  {
    id: "unknown",
    emoji: "❓",
    label: "Not Sure / Multiple Issues",
    shortLabel: "Not Sure",
    description: "Garage says engine is beyond repair",
    sectionRange: "GBP 1,500 - 8,000 S&F",
  },
];

export const vehicleAgeOptions: VehicleAgeOption[] = [
  { id: "under-5", label: "Under 5 years" },
  { id: "5-to-10", label: "5-10 years" },
  { id: "10-to-15", label: "10-15 years" },
  { id: "over-15", label: "Over 15 years" },
];

export const vehicleValueSteps = [500, 1000, 2500, 5000, 10000, 15000, 20000];

export const engineConditions: EngineCondition[] = [
  { id: "reconditioned", label: "Reconditioned Engine", from: "From GBP 1,800 S&F" },
  { id: "rebuilt", label: "Rebuilt Engine", from: "From GBP 1,200 S&F" },
  { id: "used", label: "Used Engine", from: "From GBP 850 S&F" },
];

export const costLookupTable: CostLookupTable = {
  "timing-chain": {
    reconditioned: { low: 2200, high: 5500, mdLow: 7000, mdHigh: 14000 },
    rebuilt: { low: 1500, high: 4000, mdLow: 7000, mdHigh: 14000 },
    used: { low: 900, high: 2800, mdLow: 7000, mdHigh: 14000 },
  },
  "seized-engine": {
    reconditioned: { low: 2500, high: 7000, mdLow: 8000, mdHigh: 16000 },
    rebuilt: { low: 1800, high: 5500, mdLow: 8000, mdHigh: 16000 },
    used: { low: 1200, high: 3500, mdLow: 8000, mdHigh: 16000 },
  },
  "head-gasket": {
    reconditioned: { low: 1800, high: 4500, mdLow: 5000, mdHigh: 9000 },
    rebuilt: { low: 1200, high: 3800, mdLow: 5000, mdHigh: 9000 },
    used: { low: 850, high: 2500, mdLow: 5000, mdHigh: 9000 },
  },
  "turbo-damage": {
    reconditioned: { low: 2200, high: 6500, mdLow: 5000, mdHigh: 12000 },
    rebuilt: { low: 1600, high: 5000, mdLow: 5000, mdHigh: 12000 },
    used: { low: 950, high: 3000, mdLow: 5000, mdHigh: 12000 },
  },
  "crankshaft-bearing": {
    reconditioned: { low: 2800, high: 9000, mdLow: 10000, mdHigh: 20000 },
    rebuilt: { low: 2200, high: 7000, mdLow: 10000, mdHigh: 20000 },
    used: { low: 1500, high: 4000, mdLow: 10000, mdHigh: 20000 },
  },
  "oil-pump": {
    reconditioned: { low: 1800, high: 6000, mdLow: 6000, mdHigh: 14000 },
    rebuilt: { low: 1200, high: 4500, mdLow: 6000, mdHigh: 14000 },
    used: { low: 850, high: 2800, mdLow: 6000, mdHigh: 14000 },
  },
  unknown: {
    reconditioned: { low: 1800, high: 7000, mdLow: 6000, mdHigh: 14000 },
    rebuilt: { low: 1200, high: 5000, mdLow: 6000, mdHigh: 14000 },
    used: { low: 850, high: 3000, mdLow: 6000, mdHigh: 14000 },
  },
};

export const staticCostTableRows = [
  {
    label: "Timing Chain Failure",
    failureTypeId: "timing-chain" as const,
    reconditioned: "GBP 2,200-5,500",
    rebuilt: "GBP 1,500-4,000",
    used: "GBP 900-2,800",
    mainDealer: "GBP 7,000-14,000",
  },
  {
    label: "Seized Engine",
    failureTypeId: "seized-engine" as const,
    reconditioned: "GBP 2,500-7,000",
    rebuilt: "GBP 1,800-5,500",
    used: "GBP 1,200-3,500",
    mainDealer: "GBP 8,000-16,000",
  },
  {
    label: "Head Gasket (with engine damage)",
    failureTypeId: "head-gasket" as const,
    reconditioned: "GBP 1,800-4,500",
    rebuilt: "GBP 1,200-3,800",
    used: "GBP 850-2,500",
    mainDealer: "GBP 5,000-9,000",
  },
  {
    label: "Crankshaft/Bearing Failure",
    failureTypeId: "crankshaft-bearing" as const,
    reconditioned: "GBP 2,800-9,000",
    rebuilt: "GBP 2,200-7,000",
    used: "GBP 1,500-4,000",
    mainDealer: "GBP 10,000-20,000",
  },
  {
    label: "Turbo Failure + Engine Damage",
    failureTypeId: "turbo-damage" as const,
    reconditioned: "GBP 2,200-6,500",
    rebuilt: "GBP 1,600-5,000",
    used: "GBP 950-3,000",
    mainDealer: "GBP 5,000-12,000",
  },
  {
    label: "Oil Pump Failure",
    failureTypeId: "oil-pump" as const,
    reconditioned: "GBP 1,800-6,000",
    rebuilt: "GBP 1,200-4,500",
    used: "GBP 850-2,800",
    mainDealer: "GBP 6,000-14,000",
  },
];

export function formatCurrency(value: number) {
  return `GBP ${value.toLocaleString("en-GB")}`;
}

export function formatVehicleValueStep(value: number) {
  if (value >= 20000) return "GBP 20k+";
  if (value >= 1000) return `GBP ${value / 1000}k`;
  return `GBP ${value}`;
}

export function getVerdict(
  failureType: FailureTypeId,
  carAge: VehicleAgeId,
  carValue: number,
  engineCondition: EngineConditionId,
) {
  const costs = costLookupTable[failureType][engineCondition];
  const replacementMidpoint = (costs.low + costs.high) / 2;
  const replacementAsPercentOfCarValue = Math.round((replacementMidpoint / carValue) * 100);
  const savingVsDealer = Math.round(((costs.mdLow - costs.low) / costs.mdLow) * 100);

  if (carValue < 1500 || (carAge === "over-15" && carValue < 2500)) {
    return {
      verdict: "D" as VerdictId,
      costs,
      replacementMidpoint,
      replacementAsPercentOfCarValue,
      savingVsDealer,
    };
  }

  if (carValue > 12000 && (failureType === "crankshaft-bearing" || failureType === "seized-engine")) {
    return {
      verdict: "C" as VerdictId,
      costs,
      replacementMidpoint,
      replacementAsPercentOfCarValue,
      savingVsDealer,
    };
  }

  if (carValue > replacementMidpoint * 2) {
    return {
      verdict: "A" as VerdictId,
      costs,
      replacementMidpoint,
      replacementAsPercentOfCarValue,
      savingVsDealer,
    };
  }

  if (carValue >= replacementMidpoint) {
    return {
      verdict: "B" as VerdictId,
      costs,
      replacementMidpoint,
      replacementAsPercentOfCarValue,
      savingVsDealer,
    };
  }

  return {
    verdict: "D" as VerdictId,
    costs,
    replacementMidpoint,
    replacementAsPercentOfCarValue,
    savingVsDealer,
  };
}
