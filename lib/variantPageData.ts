import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { sanitizeMojibake } from "@/lib/sanitizeBrandData";
import type { VariantPageData } from "@/types/variant";

const VARIANTS_DIR = path.join(process.cwd(), "data", "variants");
const UTF8_BOM = /^\uFEFF/;

function normalizeSlugPart(value: string) {
  return value.trim().toLowerCase();
}

function getVariantRouteCandidates(page: VariantPageData) {
  return [page.variant.slug].map(normalizeSlugPart).filter(Boolean);
}

function isVariantPageData(value: unknown): value is VariantPageData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const page = value as Partial<VariantPageData>;

  return Boolean(
    page.brand &&
      typeof page.brand.name === "string" &&
      typeof page.brand.slug === "string" &&
      page.model &&
      typeof page.model.name === "string" &&
      typeof page.model.slug === "string" &&
      page.variant &&
      typeof page.variant.name === "string" &&
      typeof page.variant.slug === "string" &&
      typeof page.variant.storageSlug === "string" &&
      page.sections &&
      typeof page.sections === "object",
  );
}

function parseVariantPageData(raw: string) {
  const parsed = sanitizeMojibake(
    JSON.parse(raw.replace(UTF8_BOM, "")) as VariantPageData,
  );

  return isVariantPageData(parsed) ? parsed : null;
}

async function readVariantPageFile(fileBaseName: string) {
  try {
    const filePath = path.join(VARIANTS_DIR, `${fileBaseName}.json`);
    const raw = await readFile(filePath, "utf-8");
    return parseVariantPageData(raw);
  } catch {
    return null;
  }
}

async function getAllVariantPageData() {
  try {
    const entries = await readdir(VARIANTS_DIR, { withFileTypes: true });
    const pages = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map(async (entry) => {
          try {
            const raw = await readFile(path.join(VARIANTS_DIR, entry.name), "utf-8");
            return parseVariantPageData(raw);
          } catch {
            return null;
          }
        }),
    );

    return pages.filter((page): page is VariantPageData => page !== null);
  } catch {
    return [];
  }
}

export async function getVariantPageData(brand: string, model: string, variant: string) {
  const normalizedBrand = normalizeSlugPart(brand);
  const normalizedModel = normalizeSlugPart(model);
  const normalizedVariant = normalizeSlugPart(variant);
  const directCandidate = `${normalizedBrand}-${normalizedModel}-${normalizedVariant}`;
  const directMatch = await readVariantPageFile(directCandidate);

  if (
    directMatch &&
    normalizeSlugPart(directMatch.brand.slug) === normalizedBrand &&
    normalizeSlugPart(directMatch.model.slug) === normalizedModel &&
    getVariantRouteCandidates(directMatch).includes(normalizedVariant)
  ) {
    return directMatch;
  }

  const pages = await getAllVariantPageData();

  return (
    pages.find(
      (page) =>
        normalizeSlugPart(page.brand.slug) === normalizedBrand &&
        normalizeSlugPart(page.model.slug) === normalizedModel &&
        getVariantRouteCandidates(page).includes(normalizedVariant),
    ) ?? null
  );
}

export async function getVariantPageStaticParams() {
  const pages = await getAllVariantPageData();
  const seen = new Set<string>();

  return pages.flatMap((page) => {
    const key = `${normalizeSlugPart(page.brand.slug)}::${normalizeSlugPart(page.model.slug)}::${normalizeSlugPart(page.variant.slug)}`;

    if (seen.has(key)) {
      return [];
    }

    seen.add(key);

    return {
      brand: page.brand.slug,
      model: page.model.slug,
      variant: page.variant.slug,
    };
  });
}
