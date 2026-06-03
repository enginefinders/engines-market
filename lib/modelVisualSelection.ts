import path from "node:path";
import imageManifest from "./image-manifest.json";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import type { ModelPageData } from "@/types/model";

const manifest = imageManifest as Record<string, number>;

const SHARED_ENGINE_IMAGES = [
  "/images/shared/hero-engines/temporary-diesel-engine.jpeg",
  "/images/shared/hero-engines/temporary-petrol-engine.jpeg",
  "/images/shared/hero-engines/temporary-performance-engine.jpeg",
] as const;

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return Boolean(manifest[assetPath]);
}

function uniquePaths(paths: Array<string | undefined | null>) {
  return [...new Set(paths.map((pathValue) => pathValue?.trim()).filter(Boolean))] as string[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function modelSlugCandidates(pageData: ModelPageData) {
  const rawName = pageData.model.name.replace(new RegExp(`^${pageData.brand.name}\\s+`, "i"), "").trim();
  const candidates = new Set<string>([
    pageData.model.slug,
    slugify(rawName),
  ]);

  const seriesMatch = pageData.model.slug.match(/^series-(\d+)$/i) ?? slugify(rawName).match(/^series-(\d+)$/i);
  if (seriesMatch) {
    candidates.add(`${seriesMatch[1]}-series`);
  }

  const reverseSeriesMatch = pageData.model.slug.match(/^(\d+)-series$/i) ?? slugify(rawName).match(/^(\d+)-series$/i);
  if (reverseSeriesMatch) {
    candidates.add(`series-${reverseSeriesMatch[1]}`);
  }

  return [...candidates].filter(Boolean);
}

function buildLiveFeedImagePath(brandSlug: string, imageSlug: string) {
  return `/images/brands/${brandSlug}/models/live-feed-${brandSlug}-${imageSlug}.webp`;
}

function listBrandModelAssets(brandSlug: string) {
  const prefix = `/images/brands/${brandSlug}/models/`;
  return Object.keys(manifest)
    .filter((key) => key.startsWith(prefix) && /\.(png|jpe?g|webp)$/i.test(key));
}

function resolveCarPlaceholder(pageData: ModelPageData) {
  const resolvedImages = resolveModelImagePaths({
    brandSlug: pageData.brand.slug,
    modelSlug: pageData.model.slug,
    legacySlug: pageData.model.legacySlug,
    modelName: pageData.model.name,
    configuredMainImage: pageData.assets.mainImage,
    configuredSmallImage: pageData.assets.smallImage,
    configuredHeroImage: pageData.assets.heroBg,
    configuredCtaImage: pageData.assets.ctaImage,
  });
  const brandAssets = listBrandModelAssets(pageData.brand.slug);
  const preferredCandidates = [
    resolvedImages.resolvedMainImage,
    resolvedImages.resolvedSmallImage,
    pageData.assets.mainImage,
    pageData.assets.smallImage,
    pageData.assets.heroBg,
    pageData.assets.ctaImage,
    ...modelSlugCandidates(pageData).flatMap((candidate) => [
      `/images/brands/${pageData.brand.slug}/models/${pageData.brand.slug}-${candidate}-main.webp`,
      `/images/brands/${pageData.brand.slug}/models/${pageData.brand.slug}-${candidate}-small.webp`,
      `/images/brands/${pageData.brand.slug}/models/${pageData.brand.slug}-${candidate}-model-card.png`,
    ]),
  ];

  const preferred = preferredCandidates.find(assetExists);
  if (preferred) {
    return preferred;
  }

  return brandAssets[0] ?? "";
}

function resolveLiveMarketPlaceholder(pageData: ModelPageData, carPlaceholder: string) {
  const imageCandidates = modelSlugCandidates(pageData).flatMap((candidate) => [
    pageData.sections.liveMarketPrices.imageSrc,
    buildLiveFeedImagePath(pageData.brand.slug, candidate),
  ]);

  const preferred = uniquePaths([
    ...imageCandidates,
    carPlaceholder,
    pageData.assets.mainImage,
    pageData.assets.smallImage,
    pageData.assets.heroBg,
    pageData.assets.ctaImage,
  ]).find(assetExists);

  return preferred ?? carPlaceholder;
}

function isAcceptableEngineImage(assetPath: string | undefined, brandSlug: string) {
  if (!assetPath || !assetExists(assetPath)) {
    return false;
  }

  if (assetPath.startsWith("/images/shared/")) {
    return true;
  }

  if (assetPath.startsWith(`/images/brands/${brandSlug}/`)) {
    return true;
  }

  return !assetPath.startsWith("/images/brands/");
}

function performanceScore(power: string) {
  const values = power.match(/\d+/g)?.map(Number) ?? [];
  return values.length ? Math.max(...values) : 0;
}

function selectEnginePlaceholder(seed: string, fuel: string, power: string) {
  const normalizedFuel = fuel.toLowerCase();
  if (normalizedFuel.includes("diesel")) {
    return SHARED_ENGINE_IMAGES[0];
  }

  if (normalizedFuel.includes("hybrid") || normalizedFuel.includes("electric") || performanceScore(power) >= 250) {
    return SHARED_ENGINE_IMAGES[2];
  }

  const index = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % SHARED_ENGINE_IMAGES.length;
  return SHARED_ENGINE_IMAGES[index === 0 ? 1 : index];
}

export function applyModelPageVisualPlaceholders(pageData: ModelPageData): ModelPageData {
  const carPlaceholder = resolveCarPlaceholder(pageData);
  const liveMarketPlaceholder = resolveLiveMarketPlaceholder(pageData, carPlaceholder);
  const resolvedImages = resolveModelImagePaths({
    brandSlug: pageData.brand.slug,
    modelSlug: pageData.model.slug,
    legacySlug: pageData.model.legacySlug,
    modelName: pageData.model.name,
    configuredMainImage: pageData.assets.mainImage,
    configuredSmallImage: pageData.assets.smallImage,
    configuredHeroImage: pageData.assets.heroBg,
    configuredCtaImage: pageData.assets.ctaImage,
  });

  const cards = pageData.sections.variantCoverage.cards.map((card) => ({
    ...card,
    image: isAcceptableEngineImage(card.image, pageData.brand.slug)
      ? card.image
      : selectEnginePlaceholder(card.slug || card.h3, card.fuel, card.power),
  }));

  const guideFamilies = pageData.sections.variantCoverage.engineGuide.families.map((family) => ({
    ...family,
    entries: family.entries.map((entry) => ({
      ...entry,
      image: isAcceptableEngineImage(entry.image, pageData.brand.slug)
        ? entry.image
        : selectEnginePlaceholder(entry.code || entry.title, entry.fuel, entry.power),
    })),
  }));

  return {
    ...pageData,
    assets: {
      ...pageData.assets,
      mainImage: resolvedImages.resolvedMainImage,
      smallImage: resolvedImages.resolvedSmallImage,
      heroBg: assetExists(resolvedImages.resolvedMainImage) ? resolvedImages.resolvedMainImage : carPlaceholder,
      ctaImage: assetExists(resolvedImages.resolvedMainImage) ? resolvedImages.resolvedMainImage : carPlaceholder,
    },
    sections: {
      ...pageData.sections,
      liveMarketPrices: {
        ...pageData.sections.liveMarketPrices,
        imageSrc: liveMarketPlaceholder,
      },
      variantCoverage: {
        ...pageData.sections.variantCoverage,
        cards,
        engineGuide: {
          ...pageData.sections.variantCoverage.engineGuide,
          families: guideFamilies,
        },
      },
    },
  };
}
