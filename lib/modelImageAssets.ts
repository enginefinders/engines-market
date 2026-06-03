import path from "node:path";
import imageManifest from "./image-manifest.json";

const manifest = imageManifest as Record<string, number>;

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return Boolean(manifest[assetPath]);
}

function unique(values: Array<string | undefined | null>) {
  return [...new Set(values.map((value) => value?.trim()).filter(Boolean))] as string[];
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getSlugCandidates(modelSlug: string, legacySlug?: string, modelName?: string) {
  const candidates = new Set<string>();
  const rawName = modelName
    ?.replace(/^(BMW|Audi|Ford|Jaguar|Mercedes-Benz|Mercedes|Land Rover|Range Rover)\s+/i, "")
    .trim();

  if (modelSlug) {
    candidates.add(normalizeSlug(modelSlug));
  }

  if (legacySlug) {
    candidates.add(normalizeSlug(legacySlug));
  }

  if (rawName) {
    candidates.add(normalizeSlug(rawName));
  }

  const values = [...candidates];
  for (const value of values) {
    const seriesMatch = value.match(/^series-(\d+)$/i);
    if (seriesMatch) {
      candidates.add(`${seriesMatch[1]}-series`);
    }

    const reverseSeriesMatch = value.match(/^(\d+)-series$/i);
    if (reverseSeriesMatch) {
      candidates.add(`series-${reverseSeriesMatch[1]}`);
    }
  }

  return [...candidates].filter(Boolean);
}

function buildMainImagePath(brandSlug: string, imageSlug: string) {
  return `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-main.webp`;
}

function buildSmallImagePath(brandSlug: string, imageSlug: string) {
  return `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-small.webp`;
}

function buildLegacyCardCandidates(brandSlug: string, imageSlug: string) {
  return [
    `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-model-card.webp`,
    `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-model-card.png`,
    `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-model-card.jpeg`,
    `/images/brands/${brandSlug}/models/${brandSlug}-${imageSlug}-model-card.jpg`,
  ];
}

function pickFirstExisting(candidates: string[]) {
  return candidates.find(assetExists);
}

export function getExpectedModelImagePaths({
  brandSlug,
  modelSlug,
  legacySlug,
  modelName,
}: {
  brandSlug: string;
  modelSlug: string;
  legacySlug?: string;
  modelName?: string;
}) {
  const candidates = getSlugCandidates(modelSlug, legacySlug, modelName);
  const preferredSlug = candidates[0] ?? normalizeSlug(modelSlug);

  return {
    imageSlug: preferredSlug,
    main: buildMainImagePath(brandSlug, preferredSlug),
    small: buildSmallImagePath(brandSlug, preferredSlug),
    candidates,
  };
}

export function resolveModelImagePaths({
  brandSlug,
  modelSlug,
  legacySlug,
  modelName,
  configuredMainImage,
  configuredSmallImage,
  configuredHeroImage,
  configuredCtaImage,
}: {
  brandSlug: string;
  modelSlug: string;
  legacySlug?: string;
  modelName?: string;
  configuredMainImage?: string | null;
  configuredSmallImage?: string | null;
  configuredHeroImage?: string | null;
  configuredCtaImage?: string | null;
}) {
  const expected = getExpectedModelImagePaths({
    brandSlug,
    modelSlug,
    legacySlug,
    modelName,
  });

  const mainCandidates = unique([
    ...expected.candidates.map((candidate) => buildMainImagePath(brandSlug, candidate)),
    configuredMainImage,
    configuredHeroImage,
    configuredCtaImage,
    ...expected.candidates.flatMap((candidate) => buildLegacyCardCandidates(brandSlug, candidate)),
  ]);

  const smallCandidates = unique([
    ...expected.candidates.map((candidate) => buildSmallImagePath(brandSlug, candidate)),
    configuredSmallImage,
    ...expected.candidates.flatMap((candidate) => buildLegacyCardCandidates(brandSlug, candidate)),
    configuredMainImage,
    configuredHeroImage,
  ]);

  return {
    imageSlug: expected.imageSlug,
    expectedMainImage: expected.main,
    expectedSmallImage: expected.small,
    resolvedMainImage: pickFirstExisting(mainCandidates) ?? expected.main,
    resolvedSmallImage: pickFirstExisting(smallCandidates) ?? expected.small,
  };
}
