import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const modelsDir = path.join(repoRoot, "data", "models");
const variantsDir = path.join(repoRoot, "data", "variants");
const outputPath = path.join(repoRoot, "docs", "model-image-manifest.csv");

function buildMainImage(brandSlug, modelSlug) {
  return `/images/brands/${brandSlug}/models/${brandSlug}-${modelSlug}-main.webp`;
}

function buildSmallImage(brandSlug, modelSlug) {
  return `/images/brands/${brandSlug}/models/${brandSlug}-${modelSlug}-small.webp`;
}

async function readJsonFiles(folder) {
  try {
    const entries = await readdir(folder, { withFileTypes: true });
    const items = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map(async (entry) => {
          try {
            const raw = await readFile(path.join(folder, entry.name), "utf-8");
            return JSON.parse(raw);
          } catch {
            return null;
          }
        }),
    );

    return items.filter(Boolean);
  } catch {
    return [];
  }
}

function toCsvValue(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildRows(pages, pageType) {
  return pages.map((page) => {
    const brandSlug = page?.brand?.slug ?? "";
    const modelSlug = page?.model?.slug ?? "";
    const variantSlug = page?.variant?.slug ?? "";
    const displayName = pageType === "variant" ? page?.variant?.name ?? "" : page?.model?.name ?? "";
    const assets = page?.assets ?? {};

    return {
      page_type: pageType,
      route: page?.seo?.canonical ?? "",
      brand_slug: brandSlug,
      model_slug: modelSlug,
      variant_slug: variantSlug,
      display_name: displayName,
      main_image: assets.mainImage || buildMainImage(brandSlug, modelSlug),
      small_image: assets.smallImage || buildSmallImage(brandSlug, modelSlug),
    };
  });
}

async function main() {
  const [modelPages, variantPages] = await Promise.all([
    readJsonFiles(modelsDir),
    readJsonFiles(variantsDir),
  ]);

  const rows = [
    ...buildRows(modelPages, "model"),
    ...buildRows(variantPages, "variant"),
  ];

  const headers = [
    "page_type",
    "route",
    "brand_slug",
    "model_slug",
    "variant_slug",
    "display_name",
    "main_image",
    "small_image",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => toCsvValue(row[header])).join(",")),
  ].join("\n");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${csv}\n`, "utf-8");
  console.log(`Wrote ${rows.length} rows to ${outputPath}`);
}

await main();
