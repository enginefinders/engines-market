import { existsSync } from "node:fs";
import path from "node:path";
import type { BrandPageData } from "@/types/brand";

const PUBLIC_DIR = path.join(process.cwd(), "public");

const SHARED_ENGINE_IMAGES = [
  "/images/shared/hero-engines/temporary-diesel-engine.jpeg",
  "/images/shared/hero-engines/temporary-petrol-engine.jpeg",
  "/images/shared/hero-engines/temporary-performance-engine.jpeg",
] as const;

function toPublicFilePath(assetPath: string) {
  return path.join(PUBLIC_DIR, assetPath.replace(/^\//, ""));
}

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return existsSync(toPublicFilePath(assetPath));
}

function uniquePaths(paths: Array<string | undefined>) {
  return [...new Set(paths.map((pathValue) => pathValue?.trim()).filter(Boolean))] as string[];
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
  return uniquePaths([
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
    carCandidates[1] ?? carCandidates[0] ?? pageData.sections.models.cards[0]?.image ?? pageData.assets.heroBg;

  return {
    hero: heroMainCar,
    liveMarket: liveMarketCar,
    heroCardEngines,
  };
}
