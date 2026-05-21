import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { sanitizeMojibake } from "@/lib/sanitizeBrandData";
import type { ModelPageData } from "@/types/model";

const MODELS_DIR = path.join(process.cwd(), "data", "models");
const UTF8_BOM = /^\uFEFF/;

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
  const normalizedBrand = brand.toLowerCase();
  const normalizedModel = model.toLowerCase();
  const directMatch = await readModelPageDataFile(normalizedModel);

  if (directMatch && directMatch.brand.slug.toLowerCase() === normalizedBrand) {
    return directMatch;
  }

  const pages = await getAllModelPageData();

  return (
    pages.find(
      (page) =>
        page.brand.slug.toLowerCase() === normalizedBrand &&
        (page.model.slug.toLowerCase() === normalizedModel ||
          page.model.legacySlug?.toLowerCase() === normalizedModel),
    ) ?? null
  );
}

export async function getModelPageStaticParams() {
  const pages = await getAllModelPageData();

  const seen = new Set<string>();

  return pages.flatMap((page) => {
    const candidates = [page.model.slug, page.model.legacySlug].filter(
      (slug): slug is string => Boolean(slug),
    );

    return candidates.flatMap((modelSlug) => {
      const key = `${page.brand.slug}::${modelSlug}`;

      if (seen.has(key)) {
        return [];
      }

      seen.add(key);

      return {
        brand: page.brand.slug,
        model: modelSlug,
      };
    });
  });
}
