import vehicleImages from "./checkout-vehicle-images.json";

type VehicleImageEntry = {
  make: string;
  searchText: string;
  startYear: number | null;
  endYear: number | null;
  path: string;
};

const entries = vehicleImages as VehicleImageEntry[];
const STOP_WORDS = new Set([
  "auto",
  "automatic",
  "diesel",
  "electric",
  "hybrid",
  "petrol",
  "phev",
  "door",
  "edition",
]);

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/mercedes[ -]?benz/g, "mercedes-benz")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeCandidates(make: string, model: string) {
  const normalizedMake = normalize(make);
  const normalizedModel = normalize(model);

  if (normalizedMake.includes("mercedes")) return new Set(["mercedes-benz"]);
  if (normalizedMake.includes("land-rover")) {
    return normalizedModel.includes("range-rover")
      ? new Set(["range-rover", "land-rover"])
      : new Set(["land-rover", "range-rover"]);
  }
  if (normalizedMake.includes("range-rover")) return new Set(["range-rover", "land-rover"]);
  return new Set([normalizedMake]);
}

function scoreEntry(entry: VehicleImageEntry, model: string, year: number | null) {
  const normalizedModel = normalize(model);
  const modelTokens = normalizedModel
    .split("-")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  let score = entry.searchText.includes(normalizedModel) ? 40 : 0;

  for (const token of modelTokens) {
    score += entry.searchText.includes(token) ? Math.min(8, token.length + 2) : -2;
  }

  if (/\([2-9]\)/.test(entry.searchText)) score -= 1;

  if (year && entry.startYear) {
    const endYear = entry.endYear || entry.startYear;
    if (year >= entry.startYear && year <= endYear) {
      score += 24;
    } else {
      score -= Math.min(20, Math.min(Math.abs(year - entry.startYear), Math.abs(year - endYear)) * 2);
    }
  }

  return score;
}

export function findCheckoutVehicleImage(make: string, model: string, yearValue?: string) {
  if (!make || !model) return null;

  const allowedMakes = makeCandidates(make, model);
  const year = Number.parseInt(yearValue || "", 10) || null;
  const candidates = entries.filter((entry) => allowedMakes.has(entry.make));

  let best: VehicleImageEntry | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const entry of candidates) {
    const score = scoreEntry(entry, model, year);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  return best && bestScore > 0 ? best.path : null;
}
