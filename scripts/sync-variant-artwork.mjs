import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = process.argv[2];

if (!sourceRoot) {
  console.error("Usage: node scripts/sync-variant-artwork.mjs <source-folder>");
  process.exit(1);
}

const BRAND_SLUGS = ["audi", "ford", "renault", "toyota", "volkswagen"];
const IMAGE_EXTENSIONS = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function normalizeAssetSlug(value) {
  return (value ?? "")
    .replace(/ΓÇæ|â€‘|–|—/g, "-")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBrandSlug(folderName) {
  const normalized = normalizeAssetSlug(folderName);
  return BRAND_SLUGS.find((brandSlug) => normalized.includes(brandSlug));
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function getUniqueDestination(destinationDirectory, preferredName, usedDestinations) {
  const parsed = path.parse(preferredName);
  let candidate = preferredName;
  let counter = 2;

  while (usedDestinations.has(path.join(destinationDirectory, candidate))) {
    candidate = `${parsed.name}-${counter}${parsed.ext}`;
    counter += 1;
  }

  usedDestinations.add(path.join(destinationDirectory, candidate));
  return candidate;
}

function walkFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
      ? [fullPath]
      : [];
  });
}

function copyIncomingArtwork() {
  const copied = [];
  const skipped = [];
  const usedDestinations = new Set();

  for (const brandFolder of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
    if (!brandFolder.isDirectory()) {
      continue;
    }

    const brandSlug = getBrandSlug(brandFolder.name);
    if (!brandSlug) {
      skipped.push({ file: brandFolder.name, reason: "No supported brand found in folder name" });
      continue;
    }

    const sourceBrandDirectory = path.join(sourceRoot, brandFolder.name);
    const destinationDirectory = path.join(repoRoot, "public", "images", "brands", brandSlug, "variant-artwork");
    ensureDirectory(destinationDirectory);

    for (const sourceFile of walkFiles(sourceBrandDirectory)) {
      const extension = path.extname(sourceFile).toLowerCase();
      const baseSlug = normalizeAssetSlug(path.basename(sourceFile, extension));
      const assetSlug = baseSlug.startsWith(`${brandSlug}-`) ? baseSlug : `${brandSlug}-${baseSlug}`;
      const destinationName = getUniqueDestination(destinationDirectory, `${assetSlug}${extension}`, usedDestinations);
      const destinationPath = path.join(destinationDirectory, destinationName);

      fs.copyFileSync(sourceFile, destinationPath);
      copied.push({
        brandSlug,
        source: path.relative(sourceRoot, sourceFile),
        destination: path.relative(repoRoot, destinationPath).replaceAll(path.sep, "/"),
        slug: path.basename(destinationName, extension),
      });
    }
  }

  return { copied, skipped };
}

function buildArtworkIndex() {
  const brandsDirectory = path.join(repoRoot, "public", "images", "brands");
  const index = {};

  for (const brandDirectory of fs.readdirSync(brandsDirectory, { withFileTypes: true })) {
    if (!brandDirectory.isDirectory()) {
      continue;
    }

    const artworkDirectory = path.join(brandsDirectory, brandDirectory.name, "variant-artwork");
    if (!fs.existsSync(artworkDirectory)) {
      continue;
    }

    const artworkFiles = fs
      .readdirSync(artworkDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));

    if (!artworkFiles.length) {
      continue;
    }

    index[brandDirectory.name] = {};
    for (const fileName of artworkFiles) {
      const slug = normalizeAssetSlug(path.basename(fileName, path.extname(fileName)));
      index[brandDirectory.name][slug] = `/images/brands/${brandDirectory.name}/variant-artwork/${fileName}`;
    }
  }

  const sortedIndex = Object.fromEntries(
    Object.entries(index)
      .sort(([brandA], [brandB]) => brandA.localeCompare(brandB))
      .map(([brand, entries]) => [
        brand,
        Object.fromEntries(Object.entries(entries).sort(([slugA], [slugB]) => slugA.localeCompare(slugB))),
      ]),
  );

  fs.writeFileSync(
    path.join(repoRoot, "lib", "variant-artwork-index.json"),
    `${JSON.stringify(sortedIndex, null, 2)}\n`,
  );

  return sortedIndex;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function stripEngineSuffix(value) {
  return value.replace(/-engine$/i, "");
}

function findPageMatches(index, copied) {
  const modelDirectory = path.join(repoRoot, "data", "models");
  const variantDirectory = path.join(repoRoot, "data", "variants");
  const routeSlugs = new Set();
  const cardSlugs = new Set();

  for (const fileName of fs.readdirSync(variantDirectory)) {
    if (!fileName.endsWith(".json")) {
      continue;
    }

    const page = readJson(path.join(variantDirectory, fileName));
    const brandSlug = normalizeAssetSlug(page.brand?.slug);
    if (!BRAND_SLUGS.includes(brandSlug)) {
      continue;
    }

    const modelSlug = normalizeAssetSlug(page.model?.slug);
    const variantSlug = stripEngineSuffix(normalizeAssetSlug(page.variant?.slug));
    const variantName = stripEngineSuffix(normalizeAssetSlug(page.variant?.name));
    routeSlugs.add(`${brandSlug}-${modelSlug}-${variantSlug}`);
    routeSlugs.add(`${brandSlug}-${variantSlug}`);
    routeSlugs.add(`${brandSlug}-${modelSlug}-${variantName}`);
  }

  for (const fileName of fs.readdirSync(modelDirectory)) {
    if (!fileName.endsWith(".json")) {
      continue;
    }

    const page = readJson(path.join(modelDirectory, fileName));
    const brandSlug = normalizeAssetSlug(page.brand?.slug);
    if (!BRAND_SLUGS.includes(brandSlug)) {
      continue;
    }

    const modelSlug = normalizeAssetSlug(page.model?.slug);
    const cards = page.sections?.variantCoverage?.cards ?? [];
    for (const card of cards) {
      const cardSlug = stripEngineSuffix(normalizeAssetSlug(card.slug));
      const titleSlug = stripEngineSuffix(normalizeAssetSlug(card.h3?.replace(/\s+engine replacement$/i, "")));
      cardSlugs.add(`${brandSlug}-${modelSlug}-${cardSlug}`);
      cardSlugs.add(`${brandSlug}-${cardSlug}`);
      cardSlugs.add(`${brandSlug}-${modelSlug}-${titleSlug}`);
    }
  }

  return copied.map((item) => ({
    ...item,
    matched:
      routeSlugs.has(item.slug) ||
      cardSlugs.has(item.slug) ||
      Object.keys(index[item.brandSlug] ?? {}).some((assetSlug) => assetSlug === item.slug),
    exactPageMatch: routeSlugs.has(item.slug) || cardSlugs.has(item.slug),
  }));
}

function writeReport({ copied, skipped, matchedItems }) {
  ensureDirectory(path.join(repoRoot, "reports"));

  const grouped = new Map();
  for (const item of matchedItems) {
    if (!grouped.has(item.brandSlug)) {
      grouped.set(item.brandSlug, []);
    }
    grouped.get(item.brandSlug).push(item);
  }

  const lines = [
    "# Variant Artwork Sync Report",
    "",
    `Source: \`${sourceRoot}\``,
    `Copied images: ${copied.length}`,
    `Skipped entries: ${skipped.length}`,
    "",
  ];

  for (const [brandSlug, items] of [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const exactMatches = items.filter((item) => item.exactPageMatch).length;
    const needsAlias = items.filter((item) => !item.exactPageMatch);
    lines.push(`## ${brandSlug}`);
    lines.push("");
    lines.push(`- Copied: ${items.length}`);
    lines.push(`- Exact current page/card matches: ${exactMatches}`);
    lines.push(`- Needs alias/manual review: ${needsAlias.length}`);
    lines.push("");

    if (needsAlias.length) {
      lines.push("| Image | Generated slug | Destination |");
      lines.push("| --- | --- | --- |");
      for (const item of needsAlias) {
        lines.push(`| ${item.source} | \`${item.slug}\` | \`${item.destination}\` |`);
      }
      lines.push("");
    }
  }

  if (skipped.length) {
    lines.push("## Skipped");
    lines.push("");
    lines.push("| Entry | Reason |");
    lines.push("| --- | --- |");
    for (const item of skipped) {
      lines.push(`| ${item.file} | ${item.reason} |`);
    }
    lines.push("");
  }

  fs.writeFileSync(path.join(repoRoot, "reports", "variant-artwork-sync-report.md"), `${lines.join("\n")}\n`);
}

const { copied, skipped } = copyIncomingArtwork();
const index = buildArtworkIndex();
const matchedItems = findPageMatches(index, copied);
writeReport({ copied, skipped, matchedItems });

console.log(`Copied ${copied.length} variant artwork images.`);
console.log(`Skipped ${skipped.length} entries.`);
console.log("Updated lib/variant-artwork-index.json.");
console.log("Wrote reports/variant-artwork-sync-report.md.");
