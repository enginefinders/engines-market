import vehicleImages from "./checkout-vehicle-images.json";
import imageManifest from "./image-manifest.json";

type VehicleImageEntry = {
  make: string;
  searchText: string;
  startYear: number | null;
  endYear: number | null;
  path: string;
};

const entries = vehicleImages as VehicleImageEntry[];
const modelAssetPaths = Object.keys(imageManifest as Record<string, unknown>).filter((path) =>
  /^\/images\/brands\/[^/]+\/models\/[^/]+\.(?:png|jpe?g|webp|jfif)$/i.test(path),
);
const modelAssetBrandSlugs = new Set(
  modelAssetPaths
    .map((path) => path.match(/^\/images\/brands\/([^/]+)\/models\//i)?.[1])
    .filter((brandSlug): brandSlug is string => Boolean(brandSlug)),
);
const modelAssetPathsByBrand = new Map<string, string[]>();
for (const path of modelAssetPaths) {
  const brandSlug = path.match(/^\/images\/brands\/([^/]+)\/models\//i)?.[1];
  if (!brandSlug) continue;
  const pathsForBrand = modelAssetPathsByBrand.get(brandSlug) ?? [];
  pathsForBrand.push(path);
  modelAssetPathsByBrand.set(brandSlug, pathsForBrand);
}
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

function compact(value: string) {
  return normalize(value).replace(/-/g, "");
}

function modelAssetMakeCandidates(make: string) {
  const normalizedMake = normalize(make);
  const candidates = new Set<string>();
  const compactMake = compact(make);

  for (const brandSlug of modelAssetBrandSlugs) {
    if (compact(brandSlug) === compactMake) candidates.add(brandSlug);
  }

  if (normalizedMake.includes("land-rover") || compactMake === "landrover") {
    candidates.add("land-rover");
    candidates.add("range-rover");
  }
  if (normalizedMake.includes("range-rover") || compactMake === "rangerover") {
    candidates.add("range-rover");
    candidates.add("land-rover");
  }

  return candidates;
}

function getModelSlugCandidates(
  make: string,
  model: string,
  additionalPrefixes: string[] = [],
) {
  const normalizedModel = normalize(model);
  const prefixes = [
    normalize(make),
    ...makeCandidates(make, model),
    ...modelAssetMakeCandidates(make),
    ...additionalPrefixes,
  ];
  let modelSlug = normalizedModel;

  for (const prefix of prefixes) {
    if (modelSlug.startsWith(`${prefix}-`)) {
      modelSlug = modelSlug.slice(prefix.length + 1);
      break;
    }
  }

  modelSlug = modelSlug.replace(
    /-(?:alcohol|cng|diesel|electric|flexfuel|hydrogen|hybrid|petrol|petroleum-gas|phev)(?:-.+)?$/,
    "",
  );
  const candidates = new Set<string>([modelSlug]);
  if (modelSlug.startsWith("c-")) candidates.add(modelSlug.slice(2));
  const seriesOrClassMatch = modelSlug.match(/^(.*-(?:series|class))(?:-|$)/);
  if (seriesOrClassMatch) candidates.add(seriesOrClassMatch[1]);

  const firstToken = modelSlug.split("-")[0];
  const secondToken = modelSlug.split("-")[1];
  if (firstToken?.length === 1 && secondToken) {
    candidates.add(`${firstToken}-${secondToken}`);
  }
  if (
    firstToken &&
    (firstToken.length > 2 || /^(?:[a-z]+\d+|\d+[a-z]+)$/i.test(firstToken))
  ) {
    candidates.add(firstToken);
  }

  return [...candidates].filter(Boolean);
}

function scoreEntry(entry: VehicleImageEntry, make: string, model: string, year: number | null) {
  const modelCandidates = getModelSlugCandidates(make, model);
  const entryModelHead = entry.searchText.split("-").slice(0, 12).join("-");
  let score = Number.NEGATIVE_INFINITY;

  for (const candidate of modelCandidates) {
    if (entryModelHead.includes(candidate)) {
      score = Math.max(score, 100 + Math.min(candidate.length, 40));
    }
  }

  if (score === Number.NEGATIVE_INFINITY) return score;
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

function getFallbackModelCandidates(make: string, model: string, brandSlug: string) {
  return getModelSlugCandidates(make, model, [brandSlug]);
}

function scoreModelAsset(path: string, make: string, model: string) {
  const match = path.match(/^\/images\/brands\/([^/]+)\/models\/([^/]+)$/i);
  if (!match) return Number.NEGATIVE_INFINITY;

  const brandSlug = match[1];
  if (!modelAssetMakeCandidates(make).has(brandSlug)) {
    return Number.NEGATIVE_INFINITY;
  }

  const assetName = normalize(match[2].replace(/\.[^.]+$/, ""));
  const assetModelSlug = assetName
    .replace(/^live-feed-/, "")
    .replace(new RegExp(`^${normalize(brandSlug)}-`), "")
    .replace(/-model-card$/, "");
  const candidates = getFallbackModelCandidates(make, model, brandSlug);
  let score = Number.NEGATIVE_INFINITY;

  for (const candidate of candidates) {
    if (assetModelSlug === candidate) {
      score = Math.max(score, 220 + candidate.length);
    } else if (assetModelSlug.startsWith(`${candidate}-`)) {
      score = Math.max(score, 140 + candidate.length);
    } else if (assetModelSlug.includes(`-${candidate}-`)) {
      score = Math.max(score, 100 + candidate.length);
    }
  }

  if (score === Number.NEGATIVE_INFINITY) return score;
  if (assetName.includes("model-card")) score += 6;
  if (assetName.includes("live-feed")) score += 4;
  return score;
}

function findBrandModelFallbackImage(make: string, model: string) {
  let bestPath: string | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  const assetMakeCandidates = modelAssetMakeCandidates(make);
  const candidatePaths = [...assetMakeCandidates].flatMap(
    (brandSlug) => modelAssetPathsByBrand.get(brandSlug) ?? [],
  );

  for (const path of candidatePaths) {
    const score = scoreModelAsset(path, make, model);
    if (score > bestScore) {
      bestPath = path;
      bestScore = score;
    }
  }

  return bestPath && bestScore > 0 ? bestPath : null;
}

export function findCheckoutVehicleImage(make: string, model: string, yearValue?: string) {
  if (!make || !model) return null;

  const allowedMakes = makeCandidates(make, model);
  const year = Number.parseInt(yearValue || "", 10) || null;
  const candidates = entries.filter((entry) => allowedMakes.has(entry.make));

  let best: VehicleImageEntry | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const entry of candidates) {
    const score = scoreEntry(entry, make, model, year);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (best && bestScore > 0) return best.path;

  return findBrandModelFallbackImage(make, model);
}
