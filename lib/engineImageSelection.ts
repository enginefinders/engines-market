import path from "node:path";
import imageManifest from "./image-manifest.json";
import type { BrandPageData } from "@/types/brand";

const manifest = imageManifest as Record<string, number>;

const SHARED_ENGINE_IMAGES = [
  "/images/shared/hero-engines/temporary-diesel-engine.jpeg",
  "/images/shared/hero-engines/temporary-petrol-engine.jpeg",
  "/images/shared/hero-engines/temporary-performance-engine.jpeg",
] as const;

const BRAND_IMAGE_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg"] as const;

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return Boolean(manifest[assetPath]);
}

function uniquePaths(paths: Array<string | undefined>) {
  return [...new Set(paths.map((pathValue) => pathValue?.trim()).filter(Boolean))] as string[];
}

function resolveBrandAsset(brandSlug: string, baseName: string) {
  const candidates = BRAND_IMAGE_EXTENSIONS.map(
    (extension) => `/images/brands/${brandSlug}/brand/${baseName}${extension}`,
  );

  return candidates.find(assetExists);
}

function selectSharedFallbacks(brandSlug: string) {
  const seed = Array.from(brandSlug).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const heroIndex = seed % SHARED_ENGINE_IMAGES.length;
  const liveMarketIndex = (heroIndex + 1) % SHARED_ENGINE_IMAGES.length;

  return {
    hero: SHARED_ENGINE_IMAGES[heroIndex],
    liveMarket: SHARED_ENGINE_IMAGES[liveMarketIndex],
  };
}

function collectBrandEngineCandidates(pageData: BrandPageData) {
  const heroHighlights = pageData.sections.hero.highlights?.map((highlight) => highlight.image) ?? [];
  const directoryImages = pageData.sections.engineCodeDirectory.families.flatMap((family) =>
    family.entries.map((entry) => entry.image),
  );
  const engineCodeImages = pageData.sections.engineCodes.groups.flatMap((group) =>
    group.engines.map((engine) => engine.image),
  );
  const problemImages = pageData.sections.commonProblems.problems.map((problem) => problem.image);

  return uniquePaths([
    ...heroHighlights,
    ...directoryImages,
    ...engineCodeImages,
    ...problemImages,
  ]).filter(assetExists);
}

function collectBrandCarCandidates(pageData: BrandPageData) {
  const brandSlug = pageData.brand.slug;

  return uniquePaths([
    pageData.sections.liveMarketPrices.imageSrc,
    resolveBrandAsset(brandSlug, `live-feed-${brandSlug}`),
    resolveBrandAsset(brandSlug, `${brandSlug}-live-market-bg`),
    resolveBrandAsset(brandSlug, `${brandSlug}-hero-bg`),
    ...pageData.sections.models.cards.map((card) => card.image),
    pageData.assets.heroBg,
  ]).filter(assetExists);
}

export function resolveBrandPageVisuals(pageData: BrandPageData) {
  const brandCandidates = collectBrandEngineCandidates(pageData);
  const carCandidates = collectBrandCarCandidates(pageData);
  const sharedFallbacks = selectSharedFallbacks(pageData.brand.slug);
  const heroCardEngines = Array.from({ length: 3 }, (_, index) =>
    brandCandidates[index]
      ?? [sharedFallbacks.hero, sharedFallbacks.liveMarket, SHARED_ENGINE_IMAGES[(pageData.brand.slug.length + 2) % SHARED_ENGINE_IMAGES.length]][index],
  );
  const heroMainCar =
    carCandidates[0] ?? pageData.sections.models.cards[0]?.image ?? pageData.assets.heroBg;
  const liveMarketCar =
    uniquePaths([
      pageData.sections.liveMarketPrices.imageSrc,
      resolveBrandAsset(pageData.brand.slug, `live-feed-${pageData.brand.slug}`),
      resolveBrandAsset(pageData.brand.slug, `${pageData.brand.slug}-live-market-bg`),
      carCandidates[1],
      carCandidates[0],
      pageData.sections.models.cards[0]?.image,
      pageData.assets.heroBg,
    ]).find(assetExists)
    ?? heroMainCar;

  return {
    hero: heroMainCar,
    liveMarket: liveMarketCar,
    heroCardEngines,
  };
}
