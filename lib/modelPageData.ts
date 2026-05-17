import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { sanitizeMojibake } from "@/lib/sanitizeBrandData";
import type { ModelPageData } from "@/types/model";

const MODELS_DIR = path.join(process.cwd(), "data", "models");
const UTF8_BOM = /^\uFEFF/;

function parseModelPageData(raw: string) {
  return sanitizeMojibake(
    JSON.parse(raw.replace(UTF8_BOM, "")) as ModelPageData,
  );
}

async function getAllModelPageData() {
  try {
    const entries = await readdir(MODELS_DIR, { withFileTypes: true });
    const pages = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
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
  const pages = await getAllModelPageData();
  const normalizedBrand = brand.toLowerCase();
  const normalizedModel = model.toLowerCase();

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

  return pages.map((page) => ({
    brand: page.brand.slug,
    model: page.model.slug,
  }));
}
