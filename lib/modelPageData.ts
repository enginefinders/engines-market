import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { sanitizeMojibake } from "@/lib/sanitizeBrandData";
import type { ModelPageData } from "@/types/model";

const MODELS_DIR = path.join(process.cwd(), "data", "models");
const UTF8_BOM = /^\uFEFF/;

function normalizeSlugPart(value: string) {
  return value.trim().toLowerCase();
}

function getCanonicalModelSlug(brandSlug: string, modelSlug: string) {
  const normalizedBrand = normalizeSlugPart(brandSlug);
  const normalizedModel = normalizeSlugPart(modelSlug);
  const prefixedBrand = `${normalizedBrand}-`;

  if (normalizedModel.startsWith(prefixedBrand)) {
    return normalizedModel.slice(prefixedBrand.length);
  }

  return normalizedModel;
}

function getModelRouteCandidates(page: ModelPageData) {
  const candidates = new Set<string>();

  candidates.add(getCanonicalModelSlug(page.brand.slug, page.model.slug));
  candidates.add(normalizeSlugPart(page.model.slug));

  if (page.model.legacySlug) {
    candidates.add(normalizeSlugPart(page.model.legacySlug));
  }

  return [...candidates].filter(Boolean);
}

function isModelPageData(value: unknown): value is ModelPageData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const page = value as Partial<ModelPageData>;

  return Boolean(
    page.brand &&
      typeof page.brand.name === "string" &&
      typeof page.brand.slug === "string" &&
      page.model &&
      typeof page.model.name === "string" &&
      typeof page.model.slug === "string" &&
      page.sections &&
      typeof page.sections === "object",
  );
}

function parseModelPageData(raw: string) {
  const parsed = sanitizeMojibake(
    JSON.parse(raw.replace(UTF8_BOM, "")) as ModelPageData,
  );

  return isModelPageData(parsed) ? parsed : null;
}

async function readModelPageDataFile(fileBaseName: string) {
  try {
    const filePath = path.join(MODELS_DIR, `${fileBaseName}.json`);
    const raw = await readFile(filePath, "utf-8");
    return parseModelPageData(raw);
  } catch {
    return null;
  }
}

async function getAllModelPageData() {
  try {
    const entries = await readdir(MODELS_DIR, { withFileTypes: true });
    const pages = await Promise.all(
      entries
        .filter(
          (entry) =>
            entry.isFile() &&
            entry.name.endsWith(".json") &&
            entry.name.toLowerCase() !== "warnings.json",
        )
        .map(async (entry) => {
          try {
            const filePath = path.join(MODELS_DIR, entry.name);
            const raw = await readFile(filePath, "utf-8");
            return parseModelPageData(raw);
          } catch {
            return null;
          }
        }),
    );

    return pages.filter((page): page is ModelPageData => page !== null);
  } catch {
    return [];
  }
}

export async function getModelPageData(brand: string, model: string) {
  const normalizedBrand = normalizeSlugPart(brand);
  const normalizedModel = normalizeSlugPart(model);
  const directCandidates = [
    normalizedModel,
    `${normalizedBrand}-${normalizedModel}`,
  ];

  for (const candidate of directCandidates) {
    const directMatch = await readModelPageDataFile(candidate);
    if (
      directMatch &&
      normalizeSlugPart(directMatch.brand.slug) === normalizedBrand &&
      getModelRouteCandidates(directMatch).includes(normalizedModel)
    ) {
      return directMatch;
    }
  }

  const pages = await getAllModelPageData();

  return (
    pages.find(
      (page) =>
        normalizeSlugPart(page.brand.slug) === normalizedBrand &&
        getModelRouteCandidates(page).includes(normalizedModel),
    ) ?? null
  );
}

export async function getModelPageStaticParams() {
  const pages = await getAllModelPageData();

  const seen = new Set<string>();

  return pages.flatMap((page) => {
    const normalizedModelSlug = getCanonicalModelSlug(
      page.brand.slug,
      page.model.slug,
    );
    const key = `${normalizeSlugPart(page.brand.slug)}::${normalizedModelSlug}`;

    if (seen.has(key)) {
      return [];
    }

    seen.add(key);

    return {
      brand: page.brand.slug,
      model: normalizedModelSlug,
    };
  });
}
