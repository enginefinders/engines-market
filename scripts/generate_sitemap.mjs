import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://enginesmarket.co.uk").trim().replace(/\/+$/, "");
const INDEX_MODEL_PAGES = process.env.INDEX_MODEL_PAGES == null ? true : process.env.INDEX_MODEL_PAGES === "true";
const INDEX_VARIANT_PAGES =
  process.env.INDEX_VARIANT_PAGES == null ? false : process.env.INDEX_VARIANT_PAGES === "true";
const UTF8_BOM = /^\uFEFF/;

function normalizeSlugPart(value) {
  return String(value || "").trim().toLowerCase();
}

function getCanonicalModelSlug(brandSlug, modelSlug) {
  const normalizedBrand = normalizeSlugPart(brandSlug);
  const normalizedModel = normalizeSlugPart(modelSlug);
  const prefixedBrand = `${normalizedBrand}-`;

  if (normalizedModel.startsWith(prefixedBrand)) {
    return normalizedModel.slice(prefixedBrand.length);
  }

  return normalizedModel;
}

function parseJson(raw) {
  return JSON.parse(raw.replace(UTF8_BOM, ""));
}

function isBrandPageData(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      value.brand &&
      typeof value.brand.slug === "string",
  );
}

function isModelPageData(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      value.brand &&
      typeof value.brand.slug === "string" &&
      value.model &&
      typeof value.model.slug === "string" &&
      value.sections &&
      typeof value.sections === "object",
  );
}

function isVariantPageData(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      value.brand &&
      typeof value.brand.slug === "string" &&
      value.model &&
      typeof value.model.slug === "string" &&
      value.variant &&
      typeof value.variant.slug === "string",
  );
}

async function readJsonFiles(dirPath, predicate) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const items = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map(async (entry) => {
        try {
          const raw = await readFile(path.join(dirPath, entry.name), "utf-8");
          const parsed = parseJson(raw);
          return predicate(parsed) ? parsed : null;
        } catch {
          return null;
        }
      }),
  );

  return items.filter(Boolean);
}

function toUrlEntry(url, lastModified, priority) {
  return {
    url,
    lastModified,
    changeFrequency: "weekly",
    priority,
  };
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderSitemap(entries) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

  for (const entry of entries) {
    lines.push("<url>");
    lines.push(`<loc>${escapeXml(entry.url)}</loc>`);
    lines.push(`<lastmod>${entry.lastModified}</lastmod>`);
    lines.push(`<changefreq>${entry.changeFrequency}</changefreq>`);
    lines.push(`<priority>${entry.priority}</priority>`);
    lines.push("</url>");
  }

  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const brandsDir = path.join(ROOT, "data", "brands");
  const modelsDir = path.join(ROOT, "data", "models");
  const variantsDir = path.join(ROOT, "data", "variants");
  const lastModified = new Date().toISOString();

  const brandPages = await readJsonFiles(brandsDir, isBrandPageData);
  const modelPages = await readJsonFiles(modelsDir, isModelPageData);
  const variantPages = await readJsonFiles(variantsDir, isVariantPageData);

  const entries = [toUrlEntry(`${SITE_URL}/`, lastModified, 1)];

  const seenBrands = new Set();
  for (const page of brandPages) {
    const brandSlug = normalizeSlugPart(page.brand.slug);
    if (!brandSlug || seenBrands.has(brandSlug)) {
      continue;
    }
    seenBrands.add(brandSlug);
    entries.push(toUrlEntry(`${SITE_URL}/${brandSlug}`, lastModified, 0.8));
  }

  if (INDEX_MODEL_PAGES) {
    const seenModels = new Set();
    for (const page of modelPages) {
      const brandSlug = normalizeSlugPart(page.brand.slug);
      const modelSlug = getCanonicalModelSlug(page.brand.slug, page.model.slug);
      const key = `${brandSlug}::${modelSlug}`;
      if (!brandSlug || !modelSlug || seenModels.has(key)) {
        continue;
      }
      seenModels.add(key);
      entries.push(toUrlEntry(`${SITE_URL}/${brandSlug}/${modelSlug}`, lastModified, 0.7));
    }
  }

  if (INDEX_VARIANT_PAGES) {
    const seenVariants = new Set();
    for (const page of variantPages) {
      const brandSlug = normalizeSlugPart(page.brand.slug);
      const modelSlug = normalizeSlugPart(page.model.slug);
      const variantSlug = normalizeSlugPart(page.variant.slug);
      const key = `${brandSlug}::${modelSlug}::${variantSlug}`;
      if (!brandSlug || !modelSlug || !variantSlug || seenVariants.has(key)) {
        continue;
      }
      seenVariants.add(key);
      entries.push(toUrlEntry(`${SITE_URL}/${brandSlug}/${modelSlug}/${variantSlug}`, lastModified, 0.6));
    }
  }

  await writeFile(path.join(ROOT, "sitemap.xml"), renderSitemap(entries), "utf-8");
  console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
}

await main();
