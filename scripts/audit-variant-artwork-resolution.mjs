import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const BRANDS = ["audi", "ford", "renault", "toyota", "volkswagen"];
const MATCH_BRANDS = [...BRANDS, "vw"];
const REPORT_PATH = path.join(REPO_ROOT, "reports", "variant-artwork-sync-report.md");

const NUMERIC_TOKEN_ALIASES = {
  "10": "1-0",
  "12": "1-2",
  "13": "1-3",
  "14": "1-4",
  "15": "1-5",
  "16": "1-6",
  "17": "1-7",
  "18": "1-8",
  "19": "1-9",
  "20": "2-0",
  "22": "2-2",
  "24": "2-4",
  "25": "2-5",
  "28": "2-8",
  "30": "3-0",
  "32": "3-2",
  "35": "3-5",
  "36": "3-6",
  "40": "4-0",
  "42": "4-2",
  "44": "4-4",
  "50": "5-0",
};

const EXPLICIT_SLUG_ALIASES = {
  "volkswagen-golf-1-5-tsi": ["volkswagen-golf-1-5-tsi-etsi"],
  "volkswagen-golf-15-tsi": ["volkswagen-golf-1-5-tsi-etsi"],
  "volkswagen-polo-1-4-tdi": ["volkswagen-polo-1-4-1-6-tdi"],
  "volkswagen-polo-1-6-tdi": ["volkswagen-polo-1-4-1-6-tdi"],
  "volkswagen-polo-14-tdi": ["volkswagen-polo-1-4-1-6-tdi"],
  "volkswagen-polo-16-tdi": ["volkswagen-polo-1-4-1-6-tdi"],
  "vw-golf-1-5-tsi-etsi": ["volkswagen-golf-1-5-tsi-etsi"],
  "vw-passat-2-0-tsi": ["volkswagen-passat-2-0-tsi"],
  "vw-polo-1-4-1-6-tdi": ["volkswagen-polo-1-4-1-6-tdi"],
  "vw-polo-gti-2-0-tsi": ["volkswagen-polo-gti-2-0-tsi"],
  "vw-sharan-1-4-2-0-tsi": ["volkswagen-sharan-1-4-2-0-tsi"],
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function listJsonFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return listJsonFiles(entryPath);
      }
      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    });
}

function normalizeAssetSlug(value) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripEngineSuffix(value) {
  return value.replace(/-engine$/i, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function expandNumericAliases(slug) {
  const tokens = slug.split("-");
  const expanded = new Set([slug]);

  tokens.forEach((token, index) => {
    const alias = NUMERIC_TOKEN_ALIASES[token];
    if (!alias) {
      return;
    }

    const replaced = [...tokens];
    replaced.splice(index, 1, ...alias.split("-"));
    expanded.add(replaced.join("-"));
  });

  Object.entries(NUMERIC_TOKEN_ALIASES).forEach(([compact, decimal]) => {
    const decimalPattern = `-${decimal}-`;
    if (slug.includes(decimalPattern)) {
      expanded.add(slug.replace(decimalPattern, `-${compact}-`));
    }
  });

  return [...expanded];
}

function expandClassAliases(slug) {
  return unique([
    slug,
    slug.replace(/-class-/g, "-"),
    slug.replace(/mercedes-benz-a-class-([0-9])/g, "mercedes-benz-a$1"),
    slug.replace(/mercedes-benz-b-class-([0-9])/g, "mercedes-benz-b$1"),
    slug.replace(/mercedes-benz-c-class-([0-9])/g, "mercedes-benz-c$1"),
    slug.replace(/mercedes-benz-e-class-([0-9])/g, "mercedes-benz-e$1"),
    slug.replace(/mercedes-benz-s-class-([0-9])/g, "mercedes-benz-s$1"),
  ]);
}

function expandAliases(candidates) {
  const expanded = new Set();

  candidates.forEach((candidate) => {
    expandClassAliases(candidate).forEach((classAlias) => {
      expanded.add(classAlias);
      expandNumericAliases(classAlias).forEach((numericAlias) => {
        expanded.add(numericAlias);
        EXPLICIT_SLUG_ALIASES[numericAlias]?.forEach((alias) => expanded.add(alias));
      });
      EXPLICIT_SLUG_ALIASES[classAlias]?.forEach((alias) => expanded.add(alias));
    });
    EXPLICIT_SLUG_ALIASES[candidate]?.forEach((alias) => expanded.add(alias));
  });

  return [...expanded];
}

function findClosestArtworkSlug(candidates, artworkIndex) {
  let bestMatch = "";

  candidates.forEach((candidate) => {
    Object.keys(artworkIndex).forEach((artworkSlug) => {
      const isClearPrefixMatch =
        candidate.startsWith(`${artworkSlug}-`) || artworkSlug.startsWith(`${candidate}-`);

      if (isClearPrefixMatch && artworkSlug.length > bestMatch.length) {
        bestMatch = artworkSlug;
      }
    });
  });

  return bestMatch;
}

function stripDuplicateWords(value) {
  const words = value.split("-");
  const deduped = [];

  words.forEach((word) => {
    if (deduped[deduped.length - 1] !== word) {
      deduped.push(word);
    }
  });

  return deduped.join("-");
}

function stripDescriptorTokens(value) {
  return value
    .replace(/-(facelift|early|older|modern|gen[0-9]+|fk8|fn2|fl5|ep|mb6|lwb|swb)(?=-|$)/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripDrivetrainPrefixes(value) {
  return value
    .replace(/-(sdrive|xdrive)(?=[0-9])/g, "-")
    .replace(/-(m-sport|m-mesh-edition|r-design|allgrip|allgrip-pro|4wd|2wd)(?=-|$)/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function expandEngineNamingAliases(value) {
  return unique([
    value,
    value.replace(/-i-ctdi-/g, "-i-dtec-"),
    value.replace(/-i-ctdi$/g, "-i-dtec"),
    value.replace(/-bluehdi-/g, "-blue-hdi-"),
    value.replace(/-bluehdi$/g, "-blue-hdi"),
    value.replace(/-l(?=-|$)/g, ""),
  ]);
}

function stripBrandPrefix(value, brandSlug) {
  const escapedBrand = brandSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(new RegExp(`^${escapedBrand}-`, "i"), "");
}

function stripModelPrefix(value, modelSlug) {
  const escapedModel = modelSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(new RegExp(`^${escapedModel}-`, "i"), "");
}

function canonicalBrandSlug(brandSlug) {
  return brandSlug === "vw" ? "volkswagen" : brandSlug;
}

function resolveVariantArtworkSlug(index, args) {
  const {
    brandSlug,
    brandName,
    modelSlug,
    modelName,
    variantSlug,
    variantName,
    cardTitle,
    cardImage,
  } = args;
  const normalizedBrandSlug = normalizeAssetSlug(brandSlug);
  const lookupBrands = unique([normalizedBrandSlug, normalizedBrandSlug === "vw" ? "volkswagen" : ""]);
  const artworkIndexes = lookupBrands.map((lookupBrand) => index[lookupBrand]).filter(Boolean);

  if (!artworkIndexes.length) {
    return "";
  }

  const normalizedBrandName = normalizeAssetSlug(brandName);
  const normalizedModelSlug = normalizeAssetSlug(modelSlug);
  const normalizedModelName = normalizeAssetSlug(modelName);
  const normalizedVariantSlug = stripEngineSuffix(normalizeAssetSlug(variantSlug));
  const normalizedVariantName = stripEngineSuffix(
    normalizeAssetSlug(variantName?.replace(/\s+engine replacement$/i, "")),
  );
  const normalizedCardTitle = stripEngineSuffix(
    normalizeAssetSlug(cardTitle?.replace(/\s+engine replacement$/i, "")),
  );

  const variantOnlySlug = normalizedModelSlug
    ? stripModelPrefix(stripBrandPrefix(normalizedVariantSlug, normalizedBrandSlug), normalizedModelSlug)
    : stripBrandPrefix(normalizedVariantSlug, normalizedBrandSlug);
  const cardTitleOnlySlug = normalizedModelName
    ? stripModelPrefix(stripBrandPrefix(normalizedCardTitle, normalizedBrandSlug), normalizedModelName)
    : stripBrandPrefix(normalizedCardTitle, normalizedBrandSlug);

  const candidates = expandAliases(
    unique(
      [
        normalizeAssetSlug(cardImage),
        normalizedCardTitle,
        stripDuplicateWords(normalizedCardTitle),
        stripDescriptorTokens(stripDuplicateWords(normalizedCardTitle)),
        stripDrivetrainPrefixes(stripDescriptorTokens(stripDuplicateWords(normalizedCardTitle))),
        normalizedVariantName,
        stripDrivetrainPrefixes(normalizedVariantName),
        normalizedBrandSlug && cardTitleOnlySlug ? `${normalizedBrandSlug}-${cardTitleOnlySlug}` : "",
        normalizedBrandSlug && cardTitleOnlySlug
          ? stripDrivetrainPrefixes(`${normalizedBrandSlug}-${cardTitleOnlySlug}`)
          : "",
        normalizedBrandName && cardTitleOnlySlug ? `${normalizedBrandName}-${cardTitleOnlySlug}` : "",
        normalizedBrandSlug && cardTitleOnlySlug
          ? stripDescriptorTokens(`${normalizedBrandSlug}-${cardTitleOnlySlug}`)
          : "",
        normalizedModelName && variantOnlySlug ? `${normalizedModelName}-${variantOnlySlug}` : "",
        normalizedModelSlug && variantOnlySlug
          ? `${normalizedBrandSlug}-${normalizedModelSlug}-${variantOnlySlug}`
          : "",
        normalizedModelName && variantOnlySlug
          ? `${normalizedBrandName}-${normalizedModelName}-${variantOnlySlug}`
          : "",
        normalizedVariantSlug ? `${normalizedBrandSlug}-${normalizedVariantSlug}` : "",
        normalizedVariantSlug ? `${normalizedBrandName}-${normalizedVariantSlug}` : "",
        normalizedVariantSlug,
        normalizedBrandSlug && variantOnlySlug ? `${normalizedBrandSlug}-${variantOnlySlug}` : "",
        normalizedBrandSlug && variantOnlySlug
          ? stripDrivetrainPrefixes(`${normalizedBrandSlug}-${variantOnlySlug}`)
          : "",
        ...lookupBrands.flatMap((lookupBrand) => [
          lookupBrand && cardTitleOnlySlug ? `${lookupBrand}-${cardTitleOnlySlug}` : "",
          lookupBrand && cardTitleOnlySlug ? stripDrivetrainPrefixes(`${lookupBrand}-${cardTitleOnlySlug}`) : "",
          lookupBrand && variantOnlySlug ? `${lookupBrand}-${variantOnlySlug}` : "",
          lookupBrand && variantOnlySlug ? stripDrivetrainPrefixes(`${lookupBrand}-${variantOnlySlug}`) : "",
        ]),
      ].flatMap(expandEngineNamingAliases),
    ),
  );

  for (const artworkIndex of artworkIndexes) {
    const matchedSlug = candidates.find((candidate) => artworkIndex[candidate]);
    if (matchedSlug) {
      return matchedSlug;
    }

    const closestSlug = findClosestArtworkSlug(candidates, artworkIndex);
    if (closestSlug) {
      return closestSlug;
    }
  }

  return "";
}

function addUsage(usage, brandSlug, slug, label) {
  if (!slug) {
    return;
  }

  if (!usage[brandSlug]) {
    usage[brandSlug] = {};
  }

  usage[brandSlug][slug] ??= [];
  usage[brandSlug][slug].push(label);
}

const index = readJson(path.join(REPO_ROOT, "lib", "variant-artwork-index.json"));
const usage = {};
const missingCurrentContent = {};

listJsonFiles(path.join(REPO_ROOT, "data", "variants")).forEach((filePath) => {
  const data = readJson(filePath);
  const brandSlug = normalizeAssetSlug(data?.brand?.slug);
  if (!MATCH_BRANDS.includes(brandSlug)) {
    return;
  }
  const reportBrandSlug = canonicalBrandSlug(brandSlug);

  const matchedSlug = resolveVariantArtworkSlug(index, {
    brandSlug,
    brandName: data.brand?.name,
    modelSlug: data.model?.slug,
    modelName: data.model?.name,
    variantSlug: data.variant?.slug,
    variantName: data.variant?.name,
  });

  if (matchedSlug) {
    addUsage(usage, reportBrandSlug, matchedSlug, `variant page: ${data.variant?.name ?? data.variant?.slug}`);
  } else {
    missingCurrentContent[reportBrandSlug] ??= [];
    missingCurrentContent[reportBrandSlug].push(`variant page: ${data.variant?.name ?? data.variant?.slug}`);
  }
});

listJsonFiles(path.join(REPO_ROOT, "data", "models")).forEach((filePath) => {
  const data = readJson(filePath);
  const brandSlug = normalizeAssetSlug(data?.brand?.slug);
  if (!MATCH_BRANDS.includes(brandSlug)) {
    return;
  }
  const reportBrandSlug = canonicalBrandSlug(brandSlug);

  const cards = data?.sections?.variantCoverage?.cards ?? [];
  cards.forEach((card) => {
    const matchedSlug = resolveVariantArtworkSlug(index, {
      brandSlug,
      brandName: data.brand?.name,
      modelSlug: data.model?.slug,
      modelName: data.model?.name,
      variantSlug: card.slug,
      variantName: card.h3,
      cardTitle: card.h3,
      cardImage: card.image,
    });

    if (matchedSlug) {
      addUsage(usage, reportBrandSlug, matchedSlug, `model card: ${data.model?.name ?? data.model?.slug} / ${card.h3}`);
    } else {
      missingCurrentContent[reportBrandSlug] ??= [];
      missingCurrentContent[reportBrandSlug].push(`model card: ${data.model?.name ?? data.model?.slug} / ${card.h3}`);
    }
  });
});

const lines = [
  "# Variant Artwork Resolution Report",
  "",
  "This report audits the actual resolver used by variant history sections and model variant cards.",
  "",
];

BRANDS.forEach((brandSlug) => {
  const indexedSlugs = Object.keys(index[brandSlug] ?? {}).sort();
  const usedSlugs = Object.keys(usage[brandSlug] ?? {}).sort();
  const unusedSlugs = indexedSlugs.filter((slug) => !usedSlugs.includes(slug));
  const missing = missingCurrentContent[brandSlug] ?? [];

  lines.push(`## ${brandSlug}`);
  lines.push("");
  lines.push(`- Indexed artwork images: ${indexedSlugs.length}`);
  lines.push(`- Used by current variant pages/model cards: ${usedSlugs.length}`);
  lines.push(`- Indexed but not currently referenced: ${unusedSlugs.length}`);
  lines.push(`- Current pages/cards without a matching artwork image: ${missing.length}`);
  lines.push("");

  if (unusedSlugs.length) {
    lines.push("<details>");
    lines.push("<summary>Indexed but not currently referenced</summary>");
    lines.push("");
    unusedSlugs.forEach((slug) => {
      lines.push(`- \`${slug}\``);
    });
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }

  if (missing.length) {
    lines.push("<details>");
    lines.push("<summary>Current pages/cards without matching artwork</summary>");
    lines.push("");
    missing.forEach((label) => {
      lines.push(`- ${label}`);
    });
    lines.push("");
    lines.push("</details>");
    lines.push("");
  }
});

fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
fs.writeFileSync(REPORT_PATH, `${lines.join("\n")}\n`);

console.log(`Wrote ${path.relative(REPO_ROOT, REPORT_PATH)}`);
