import { mkdir, readdir, stat, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SITE_BRANDS_DIR = path.join(process.cwd(), "public", "images", "brands");
const DEFAULT_SOURCE_ROOT = "C:\\Users\\Rahma\\Downloads\\Watermarked";
const REPORT_PATH = path.join(process.cwd(), "reports", "model-image-revamp-report.json");

const sourceBrandDirMap = {
  "alfa-romeo": "Alfa Romeo",
  "aston-martin": "Aston Martin",
  audi: "Audi",
  bentley: "Bentley",
  bmw: "BMW",
  cadillac: "Cadillac",
  chevrolet: "Chevrolet",
  citroen: "Citroen",
  dodge: "Dodge",
  ferrari: "Ferrari",
  fiat: "Fiat",
  ford: "Ford",
  honda: "Honda",
  hyundai: "Hyundai",
  jaguar: "Jaguar",
  jeep: "Jeep",
  kia: "Kia",
  "land-rover": "Land Rover",
  lexus: "Lexus",
  mazda: "Mazda",
  "mercedes-benz": "Mercedes",
  mg: "MG",
  mini: "Mini",
  mitsubishi: "Mitsubishi",
  nissan: "Nissan",
  peugeot: "Peugeot",
  porsche: "Porsche",
  "range-rover": "Range Rover",
  renault: "Renault",
  "rolls-royce": "Rolls Royce",
  seat: "Seat",
  skoda: "Skoda",
  subaru: "Subaru",
  suzuki: "Suzuki",
  toyota: "Toyota",
  vauxhall: "Vauxhall",
  volkswagen: "Volkswagen",
  volvo: "Volvo",
};

const crossBrandOverrides = {
  "land-rover:land-rover-range-rover": "range-rover",
  "volkswagen:volkswagen-amarok": "vauxhall",
};

const exactOverrides = {
  "bmw:bmw-series-2": "bmw-2-series",
  "land-rover:land-rover-range-rover": "range-rover",
  "alfa-romeo:alfa-romeo-giulietta": "alfa-romeo-giulita",
  "bentley:bentley-arnage-t": "bentley-arnage",
  "cadillac:cadillac-xx5": "cadillac-xt5",
  "citroen:citroen-zero-c-zero": "citroen-zero",
  "citroen:citroen-space-tourer": "citroen-spacetourer",
  "ford:ford-ka-ka": "ford-ka",
  "ford:ford-puma-engines-new-and-classic": "ford-puma",
  "ford:ford-transit-custom": "ford-transit",
  "hyundai:hyundai-equus": "hyundai-equss",
  "kia:kia-enterpise": "kia-enterprise",
  "kia:kia-pro-keed": "kia-pro-ceed",
  "mg:mg-tf": "mg-f-tf",
  "mitsubishi:mitsubishi-3000gt": "mitsubishi-3000",
  "mitsubishi:mitsubishi-outlander": "mitsubishi-outlande",
  "mitsubishi:mitsubishi-outlander-phev": "mitsubishi-outlande",
  "nissan:nissan-apiro": "nissan-aprio",
  "nissan:nissan-prairie": "nissan-prairire",
  "nissan:nissan-primastar": "nissan-primaster",
  "nissan:nissan-rogue": "nissan-roque",
  "peugeot:peugeot-hogger": "peugeot-hoggar",
  "suzuki:suzuki-grand-vitara-engines-j24b-variant-line": "suzuki-grand-vitara",
  "suzuki:suzuki-jimny-engines-m13a-variant-line": "suzuki-jimny",
  "suzuki:suzuki-swift-engines-k14c-variant-line": "suzuki-swift",
  "toyota:toyota-gt86-gr86": "toyota-gt86",
  "toyota:toyota-regius-ace": "toyota-regiusace",
  "toyota:toyota-sequoia": "toyota-seqoia",
  "toyota:toyota-urban-cruiser": "toyota-urbancruiser",
  "toyota:toyota-verso-corolla-verso": "toyota-corolla-verso",
  "volkswagen:volkswagen-caddy": "volkswagen-cady",
};

const fallbackPrefixes = {
  "range-rover:range-rover-evoque-engines-card-cta": ["range-rover-evoque"],
  "range-rover:range-rover-sport-engines-card-l494-generation": ["range-rover-sport"],
  "range-rover:range-rover-velar-engines-card-cta": ["range-rover-velar"],
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function normalizeSourceStem(stem, brandSlug) {
  let normalized = stem
    .replace(/\s+copy(?:\s+\d+)?$/i, "")
    .replace(/\(\d+\)$/g, "")
    .replace(/\.+$/g, "")
    .trim();

  normalized = slugify(normalized);

  if (brandSlug === "audi") {
    normalized = normalized.replace(/^audi-(\d)(?=-|$)/, "audi-a$1");
  }

  if (brandSlug === "mercedes-benz") {
    normalized = normalized
      .replace(/^mercedes-benz-citans(?=-|$)/, "mercedes-benz-citan")
      .replace(/^mercedes-benz-sprinters(?=-|$)/, "mercedes-benz-sprinter");
  }

  if (brandSlug === "mg") {
    normalized = normalized
      .replace(/^mg-mg(\d)(?=-|$)/, "mg-$1")
      .replace(/^mg-zss(?=-|$)/, "mg-zs");
  }

  if (brandSlug === "nissan") {
    normalized = normalized
      .replace(/^nissan-prairire(?=-|$)/, "nissan-prairire")
      .replace(/^nissan-roque(?=-|$)/, "nissan-roque");
  }

  if (brandSlug === "toyota") {
    normalized = normalized
      .replace(/^toyota-reguisace(?=-|$)/, "toyota-regiusace")
      .replace(/^toyota-seqoia(?=-|$)/, "toyota-seqoia")
      .replace(/^toyota-urbancruiser(?=-|$)/, "toyota-urbancruiser");
  }

  return normalized;
}

function normalizeTargetKey(rawKey, brandSlug) {
  let key = slugify(rawKey);

  if (brandSlug === "mercedes-benz") {
    key = key.replace(/^mercedes-benz-mercedes-benz-/, "mercedes-benz-");
  }

  if (brandSlug === "bmw") {
    key = key.replace(/^bmw-series-(\d)(?=-|$)/, "bmw-$1-series");
  }

  if (brandSlug === "audi") {
    key = key.replace(/^audi-(\d)(?=-|$)/, "audi-a$1");
  }

  if (brandSlug === "nissan") {
    key = key.replace(/^nissan-24osx(?=-|$)/, "nissan-240sx");
  }

  return key;
}

function buildAltKeys(targetKey, brandSlug) {
  const altKeys = new Set([targetKey]);

  const noClass = targetKey.replace(/-class$/, "");
  altKeys.add(noClass);

  altKeys.add(
    targetKey
      .replace(/-engines-card-cta$/, "")
      .replace(/-engines-card$/, "")
      .replace(/-generation$/, "")
  );

  altKeys.add(
    targetKey
      .replace(/-engines-card-cta$/, "")
      .replace(/-engines-card$/, "")
      .replace(/-generation$/, "")
      .replace(/-class$/, "")
  );

  altKeys.add(targetKey.replace(/-e-power$/, ""));
  altKeys.add(targetKey.replace(/-phev$/, ""));
  altKeys.add(targetKey.replace(/-\d{2,4}$/, ""));

  if (brandSlug === "range-rover") {
    altKeys.add(targetKey.replace(/-l\d+(-generation)?$/, ""));
  }

  return [...altKeys].filter(Boolean);
}

function createSourceIndex(files, brandSlug) {
  const records = files
    .map((fileName) => {
      const stem = path.parse(fileName).name;
      return {
        fileName,
        stem,
        key: normalizeSourceStem(stem, brandSlug),
      };
    })
    .sort((a, b) => a.fileName.localeCompare(b.fileName));

  const exactMap = new Map();
  for (const record of records) {
    if (!exactMap.has(record.key)) {
      exactMap.set(record.key, record);
    }
  }

  return { records, exactMap };
}

function pickPrefixMatch(records, prefixes) {
  const candidates = records.filter((record) =>
    prefixes.some((prefix) => record.key === prefix || record.key.startsWith(`${prefix}-`) || record.key.startsWith(prefix))
  );

  if (candidates.length === 0) {
    return null;
  }

  return candidates.sort((a, b) => a.key.length - b.key.length || a.fileName.localeCompare(b.fileName))[0];
}

function parseTargetAssetKey(fileName) {
  if (fileName.startsWith("live-feed-") && fileName.endsWith(".webp")) {
    return fileName.replace(/^live-feed-/, "").replace(/\.webp$/, "");
  }

  if (fileName.endsWith("-model-card.png")) {
    return fileName.replace(/-model-card\.png$/, "");
  }

  if (fileName.endsWith("-model-card.webp")) {
    return fileName.replace(/-model-card\.webp$/, "");
  }

  return null;
}

async function getDirectoryFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
}

async function copyOrConvertImage(sourcePath, targetPath) {
  await mkdir(path.dirname(targetPath), { recursive: true });

  if (targetPath.endsWith(".webp")) {
    await copyFile(sourcePath, targetPath);
    return "copied";
  }

  if (targetPath.endsWith(".png")) {
    await sharp(sourcePath).png().toFile(targetPath);
    return "converted";
  }

  return "skipped";
}

async function main() {
  const cliArgs = process.argv.slice(2);
  const apply = cliArgs.includes("--apply");
  const sourceRootArg = cliArgs.find((arg) => !arg.startsWith("--"));
  const sourceRoot = sourceRootArg || DEFAULT_SOURCE_ROOT;
  const report = {
    sourceRoot,
    apply,
    updated: [],
    skipped: [],
    missingSourceBrand: [],
    unmatched: [],
  };

  const brandEntries = await readdir(SITE_BRANDS_DIR, { withFileTypes: true });

  for (const brandEntry of brandEntries) {
    if (!brandEntry.isDirectory()) {
      continue;
    }

    const brandSlug = brandEntry.name;
    const siteModelsDir = path.join(SITE_BRANDS_DIR, brandSlug, "models");
    const sourceBrandDirName = sourceBrandDirMap[brandSlug];

    if (!sourceBrandDirName) {
      report.missingSourceBrand.push({ brandSlug, reason: "No source brand mapping" });
      continue;
    }

    const siteModelsStat = await stat(siteModelsDir).catch(() => null);
    if (!siteModelsStat?.isDirectory()) {
      continue;
    }

    const sourceBrandSlug = brandSlug;
    const sourceBrandDir = path.join(sourceRoot, sourceBrandDirName);
    const sourceBrandStat = await stat(sourceBrandDir).catch(() => null);

    if (!sourceBrandStat?.isDirectory()) {
      report.missingSourceBrand.push({ brandSlug, sourceBrandDirName, reason: "Source brand directory missing" });
      continue;
    }

    const siteFiles = await getDirectoryFiles(siteModelsDir);
    const sourceFiles = (await getDirectoryFiles(sourceBrandDir)).filter((fileName) =>
      fileName.toLowerCase().endsWith(".webp")
    );

    const sourceIndexByBrand = new Map();
    sourceIndexByBrand.set(sourceBrandSlug, createSourceIndex(sourceFiles, sourceBrandSlug));

    const crossBrandTargets = [...new Set(Object.values(crossBrandOverrides).filter(Boolean))];
    for (const targetBrandSlug of crossBrandTargets) {
      if (targetBrandSlug === sourceBrandSlug) {
        continue;
      }

      const sourceDirName = sourceBrandDirMap[targetBrandSlug];
      if (!sourceDirName) {
        continue;
      }

      const sourceDir = path.join(sourceRoot, sourceDirName);
      const sourceDirStat = await stat(sourceDir).catch(() => null);
      if (!sourceDirStat?.isDirectory()) {
        continue;
      }

      const files = (await getDirectoryFiles(sourceDir)).filter((fileName) =>
        fileName.toLowerCase().endsWith(".webp")
      );
      sourceIndexByBrand.set(targetBrandSlug, createSourceIndex(files, targetBrandSlug));
    }

    for (const fileName of siteFiles) {
      const targetAssetKey = parseTargetAssetKey(fileName);
      if (!targetAssetKey) {
        report.skipped.push({
          brandSlug,
          fileName,
          reason: "Non-model-card/live-feed asset left untouched",
        });
        continue;
      }

      const normalizedTargetKey = normalizeTargetKey(targetAssetKey, brandSlug);
      const overrideBrandSlug = crossBrandOverrides[`${brandSlug}:${normalizedTargetKey}`] || sourceBrandSlug;
      const sourceIndex = sourceIndexByBrand.get(overrideBrandSlug);

      if (!sourceIndex) {
        report.unmatched.push({
          brandSlug,
          fileName,
          targetKey: normalizedTargetKey,
          reason: `No indexed source brand available for ${overrideBrandSlug}`,
        });
        continue;
      }

      const exactOverride = exactOverrides[`${brandSlug}:${normalizedTargetKey}`];
      const altKeys = buildAltKeys(normalizedTargetKey, brandSlug);
      if (exactOverride) {
        altKeys.unshift(exactOverride);
      }

      const manualPrefixes = fallbackPrefixes[`${brandSlug}:${normalizedTargetKey}`] || [];
      const prefixCandidates = [...new Set([...manualPrefixes, ...altKeys])];

      let match = null;
      for (const altKey of altKeys) {
        const exact = sourceIndex.exactMap.get(altKey);
        if (exact) {
          match = { record: exact, reason: `exact:${altKey}` };
          break;
        }
      }

      if (!match) {
        const prefixMatch = pickPrefixMatch(sourceIndex.records, prefixCandidates);
        if (prefixMatch) {
          match = { record: prefixMatch, reason: `prefix:${prefixMatch.key}` };
        }
      }

      if (!match) {
        report.unmatched.push({
          brandSlug,
          fileName,
          targetKey: normalizedTargetKey,
          altKeys,
          searchedBrand: overrideBrandSlug,
        });
        continue;
      }

      const sourceDirName = sourceBrandDirMap[overrideBrandSlug];
      const sourcePath = path.join(sourceRoot, sourceDirName, match.record.fileName);
      const targetPath = path.join(siteModelsDir, fileName);

      if (apply) {
        const action = await copyOrConvertImage(sourcePath, targetPath);
        report.updated.push({
          brandSlug,
          fileName,
          targetKey: normalizedTargetKey,
          sourceBrandSlug: overrideBrandSlug,
          sourceFile: match.record.fileName,
          action,
          matchReason: match.reason,
        });
      } else {
        report.updated.push({
          brandSlug,
          fileName,
          targetKey: normalizedTargetKey,
          sourceBrandSlug: overrideBrandSlug,
          sourceFile: match.record.fileName,
          action: "planned",
          matchReason: match.reason,
        });
      }
    }
  }

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, JSON.stringify(report, null, 2));

  const summary = {
    updated: report.updated.length,
    skipped: report.skipped.length,
    unmatched: report.unmatched.length,
    missingSourceBrand: report.missingSourceBrand.length,
    report: REPORT_PATH,
    mode: apply ? "apply" : "dry-run",
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
