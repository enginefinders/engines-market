import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { inflateRawSync } from "node:zlib";

const EXPECTED_COLUMNS = [
  "Year",
  "Model",
  "Engine Code",
  "Fuel",
  "Avg. Quoted Price",
  "Reported Issue",
];
const NORMALIZED_EXPECTED_COLUMNS = EXPECTED_COLUMNS.map((column) => normalize(column));

const UTF8_BOM = /^\uFEFF/;
const BRANDS_DIR = path.join(process.cwd(), "data", "brands");
const MODELS_DIR = path.join(process.cwd(), "data", "models");
const LIVE_MARKET_DIR = path.join(process.cwd(), "data", "live-market");
const LIVE_MARKET_SOURCE_PATH = path.join(LIVE_MARKET_DIR, "live-market-source.json");

function printUsage() {
  console.log(`Usage:
  node scripts/import-live-market-from-xlsx.mjs "C:\\path\\to\\file.xlsx"
  node scripts/import-live-market-from-xlsx.mjs "C:\\path\\to\\file.xlsx" --write

Options:
  --write             Update matching data/brands/*.json files. Omit for dry-run.
  --brand=BMW         Limit import to one workbook sheet/brand.
  --visible-rows=20   Override feed.visibleRows on updated brand pages.
  --report-unmatched  Print unmatched sheet names and row samples.

Writes on --write:
  data/brands/*.json
  data/live-market/live-market-source.json`);
}

function getArg(name) {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : null;
}

const xlsxPath = process.argv[2];
const shouldWrite = process.argv.includes("--write");
const reportUnmatched = process.argv.includes("--report-unmatched");
const brandFilter = getArg("brand");
const visibleRowsArg = getArg("visible-rows");
const visibleRowsOverride = visibleRowsArg ? Number.parseInt(visibleRowsArg, 10) : null;

if (!xlsxPath || xlsxPath.startsWith("--")) {
  printUsage();
  process.exit(1);
}

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/mercedes-benz/g, "mercedes benz")
    .replace(/citroën/g, "citroen")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value = "") {
  return normalize(value).replace(/\s+/g, "-");
}

function escapeRegExp(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getBrandAliases(brand) {
  const normalized = normalize(brand);
  const aliases = new Set([normalized, slugify(brand)]);

  if (normalized === "mercedes benz") {
    aliases.add("mercedes");
    aliases.add("mercedes-benz");
  }

  if (normalized === "mg") {
    aliases.add("m g");
  }

  return aliases;
}

function decodeXml(value = "") {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

function getAttr(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match ? decodeXml(match[1]) : "";
}

function xmlText(fragment = "") {
  return decodeXml(fragment.replace(/<[^>]+>/g, ""));
}

function parseZipEntries(buffer) {
  let eocdOffset = -1;
  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      eocdOffset = index;
      break;
    }
  }

  if (eocdOffset === -1) {
    throw new Error("Could not find xlsx zip directory.");
  }

  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  let cursor = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map();

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error("Invalid xlsx zip central directory.");
    }

    const method = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localHeaderOffset = buffer.readUInt32LE(cursor + 42);
    const name = buffer.toString("utf8", cursor + 46, cursor + 46 + nameLength);

    const localNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    const content = method === 0 ? compressed : inflateRawSync(compressed);

    entries.set(name.replace(/\\/g, "/"), content);
    cursor += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

function getZipText(entries, name) {
  const entry = entries.get(name);
  if (!entry) {
    throw new Error(`Missing xlsx entry: ${name}`);
  }

  return entry.toString("utf8").replace(UTF8_BOM, "");
}

function normalizeWorkbookTarget(target) {
  const normalized = target.replace(/\\/g, "/").replace(/^\//, "");
  return normalized.startsWith("xl/") ? normalized : `xl/${normalized}`;
}

function parseSharedStrings(xml) {
  const shared = [];

  for (const match of xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) {
    shared.push(xmlText(match[1]));
  }

  return shared;
}

function parseWorkbookSheets(workbookXml, relsXml) {
  const relMap = new Map();
  for (const match of relsXml.matchAll(/<Relationship\b([^>]*)\/>/g)) {
    relMap.set(getAttr(match[1], "Id"), normalizeWorkbookTarget(getAttr(match[1], "Target")));
  }

  const sheets = [];
  for (const match of workbookXml.matchAll(/<sheet\b([^>]*)\/>/g)) {
    const attrs = match[1];
    const name = getAttr(attrs, "name");
    const relId = getAttr(attrs, "r:id");
    const sheetPath = relMap.get(relId);

    if (name && sheetPath) {
      sheets.push({ name, path: sheetPath });
    }
  }

  return sheets;
}

function getColumnIndex(cellRef) {
  const letters = (cellRef.match(/^[A-Z]+/i)?.[0] ?? "").toUpperCase();
  let index = 0;

  for (const letter of letters) {
    index = index * 26 + (letter.charCodeAt(0) - 64);
  }

  return index - 1;
}

function parseSheetRows(sheetXml, shared) {
  const rows = [];

  for (const rowMatch of sheetXml.matchAll(/<row\b([^>]*)>([\s\S]*?)<\/row>/g)) {
    const rowNumber = getAttr(rowMatch[1], "r");
    const cells = [];

    for (const cellMatch of rowMatch[2].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cellMatch[1];
      const body = cellMatch[2];
      const ref = getAttr(attrs, "r");
      const type = getAttr(attrs, "t");
      const valueMatch = body.match(/<v\b[^>]*>([\s\S]*?)<\/v>/);
      const rawValue = valueMatch ? xmlText(valueMatch[1]) : "";
      let value = rawValue;

      if (type === "s") {
        value = shared[Number.parseInt(rawValue, 10)] ?? "";
      } else if (type === "inlineStr") {
        const inlineMatch = body.match(/<is\b[^>]*>([\s\S]*?)<\/is>/);
        value = inlineMatch ? xmlText(inlineMatch[1]) : "";
      }

      cells[getColumnIndex(ref)] = value;
    }

    rows.push({ rowNumber, cells });
  }

  return rows;
}

function getExpectedHeaderIndexes(cells) {
  const normalizedCells = cells.map((value) => normalize(value));

  for (let startIndex = 0; startIndex <= normalizedCells.length - EXPECTED_COLUMNS.length; startIndex += 1) {
    const matchesHeader = NORMALIZED_EXPECTED_COLUMNS.every(
      (column, columnIndex) => normalizedCells[startIndex + columnIndex] === column,
    );

    if (matchesHeader) {
      return EXPECTED_COLUMNS.map((_, columnIndex) => startIndex + columnIndex);
    }
  }

  return null;
}

async function readWorkbookRows(workbookPath) {
  const buffer = await readFile(workbookPath);
  const entries = parseZipEntries(buffer);
  const shared = parseSharedStrings(getZipText(entries, "xl/sharedStrings.xml"));
  const sheets = parseWorkbookSheets(
    getZipText(entries, "xl/workbook.xml"),
    getZipText(entries, "xl/_rels/workbook.xml.rels"),
  );
  const rows = [];

  for (const sheet of sheets) {
    if (sheet.name === "List") continue;

    const sheetRows = parseSheetRows(getZipText(entries, sheet.path), shared);
    let activeHeaderIndexes = null;

    for (const row of sheetRows) {
      if (!row.cells.some(Boolean)) continue;

      const headerIndexes = getExpectedHeaderIndexes(row.cells);
      if (headerIndexes) {
        activeHeaderIndexes = headerIndexes;
        continue;
      }

      if (!activeHeaderIndexes) {
        continue;
      }

      const item = { Sheet: sheet.name };
      for (let columnIndex = 0; columnIndex < EXPECTED_COLUMNS.length; columnIndex += 1) {
        const columnName = EXPECTED_COLUMNS[columnIndex];
        const cellIndex = activeHeaderIndexes[columnIndex];
        item[columnName] = row.cells[cellIndex] ?? "";
      }

      const populatedExpectedCells = EXPECTED_COLUMNS.filter((column) => item[column]).length;
      if (populatedExpectedCells < 2) {
        continue;
      }

      rows.push(item);
    }
  }

  return rows;
}

function normalizeEntry(row) {
  return {
    Year: String(row.Year ?? "").trim(),
    Model: String(row.Model ?? "").trim(),
    "Engine Code": String(row["Engine Code"] ?? "").trim(),
    Fuel: String(row.Fuel ?? "").trim(),
    "Avg. Quoted Price": String(row["Avg. Quoted Price"] ?? "").trim(),
    "Reported Issue": String(row["Reported Issue"] ?? "").trim(),
  };
}

function isCompleteEntry(entry) {
  return EXPECTED_COLUMNS.every((column) => entry[column]);
}

async function loadBrandPages() {
  const entries = await readdir(BRANDS_DIR, { withFileTypes: true });
  const brands = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }

    const filePath = path.join(BRANDS_DIR, entry.name);

    try {
      const raw = await readFile(filePath, "utf8");
      const page = JSON.parse(raw.replace(UTF8_BOM, ""));

      if (!page?.brand?.name || !page?.brand?.slug || !page?.sections?.liveMarketPrices?.feed) {
        continue;
      }

      brands.push({
        fileName: entry.name,
        filePath,
        page,
        brandAliases: getBrandAliases(page.brand.name),
      });
    } catch {
      // Ignore malformed brand files here and let app validation handle them separately.
    }
  }

  return brands;
}

function getCanonicalModelSlug(brandSlug, modelSlug) {
  const normalizedBrand = String(brandSlug ?? "").trim().toLowerCase();
  const normalizedModel = String(modelSlug ?? "").trim().toLowerCase();
  const prefixedBrand = `${normalizedBrand}-`;

  return normalizedModel.startsWith(prefixedBrand)
    ? normalizedModel.slice(prefixedBrand.length)
    : normalizedModel;
}

function getPageIdentityKey(page) {
  return `${String(page.brand?.slug ?? "").trim().toLowerCase()}::${getCanonicalModelSlug(
    page.brand?.slug,
    page.model?.slug,
  )}`;
}

function getModelFileSpecificity(page, fileBaseName) {
  const normalizedFileBaseName = fileBaseName.trim().toLowerCase();
  const brandSlug = String(page.brand?.slug ?? "").trim().toLowerCase();
  const canonicalModelSlug = getCanonicalModelSlug(page.brand?.slug, page.model?.slug);
  const brandPrefixedCanonicalSlug = `${brandSlug}-${canonicalModelSlug}`;
  const legacySlug = page.model?.legacySlug ? String(page.model.legacySlug).trim().toLowerCase() : "";
  const modelSlug = String(page.model?.slug ?? "").trim().toLowerCase();

  if (normalizedFileBaseName === brandPrefixedCanonicalSlug) return 4;
  if (legacySlug && normalizedFileBaseName === legacySlug) return 3;
  if (normalizedFileBaseName === modelSlug) return 2;
  if (normalizedFileBaseName === canonicalModelSlug) return 1;
  return 0;
}

async function loadPreferredModelFiles() {
  const entries = await readdir(MODELS_DIR, { withFileTypes: true });
  const loadedPages = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json") || entry.name.toLowerCase() === "warnings.json") {
      continue;
    }

    const filePath = path.join(MODELS_DIR, entry.name);

    try {
      const raw = await readFile(filePath, "utf8");
      const page = JSON.parse(raw.replace(UTF8_BOM, ""));

      if (!page?.brand?.name || !page?.brand?.slug || !page?.model?.name || !page?.model?.slug) {
        continue;
      }

      loadedPages.push({
        fileName: entry.name,
        fileBaseName: entry.name.replace(/\.json$/i, ""),
        filePath,
        page,
      });
    } catch {
      // Ignore malformed model files here and let app validation handle them separately.
    }
  }

  const preferred = new Map();

  for (const loadedPage of loadedPages) {
    const key = getPageIdentityKey(loadedPage.page);
    const existing = preferred.get(key);

    if (!existing) {
      preferred.set(key, loadedPage);
      continue;
    }

    const currentScore = getModelFileSpecificity(loadedPage.page, loadedPage.fileBaseName);
    const existingScore = getModelFileSpecificity(existing.page, existing.fileBaseName);

    if (currentScore > existingScore) {
      preferred.set(key, loadedPage);
    }
  }

  return [...preferred.values()].map((loadedPage) => {
    const brandName = loadedPage.page.brand.name;
    const modelName = loadedPage.page.model.name;
    const normalizedBrand = normalize(brandName);
    const normalizedModel = normalize(modelName);
    const shortModel = normalizedModel.replace(new RegExp(`^${escapeRegExp(normalizedBrand)}\\s+`), "");

    return {
      ...loadedPage,
      brandAliases: getBrandAliases(brandName),
      normalizedBrand,
      normalizedModel,
      shortModel,
    };
  });
}

function findBrandTargetInTexts(targetTexts, brands) {
  const matches = [];

  for (const brand of brands) {
    let score = 0;

    for (const rawText of targetTexts) {
      const text = normalize(rawText);
      if (!text) continue;

      for (const alias of brand.brandAliases) {
        if (text === alias) {
          score = Math.max(score, alias.length + 100);
          continue;
        }

        if (text.startsWith(`${alias} `)) {
          score = Math.max(score, alias.length);
        }
      }
    }

    if (score > 0) {
      matches.push({ brand, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches[0]?.brand ?? null;
}

function findBrandTarget(sheetName, brands) {
  if (typeof sheetName === "object" && sheetName) {
    const modelMatch = findBrandTargetInTexts([sheetName.Model ?? ""], brands);
    if (modelMatch) {
      return modelMatch;
    }

    return findBrandTargetInTexts([sheetName.Sheet ?? ""], brands);
  }

  return findBrandTargetInTexts([sheetName], brands);
}

function hasSharedBrandAlias(leftAliases, rightAliases) {
  return [...leftAliases].some((alias) => rightAliases.has(alias));
}

function findModelTarget(row, models, brandTarget) {
  const rowModel = normalize(row.Model);
  const targetAliases = brandTarget?.brandAliases ?? getBrandAliases(row.Sheet);
  const candidates = models.filter((model) => hasSharedBrandAlias(targetAliases, model.brandAliases));

  const matches = [];

  for (const candidate of candidates) {
    for (const needle of [candidate.normalizedModel, candidate.shortModel]) {
      if (!needle) continue;
      if (rowModel === needle || rowModel.startsWith(`${needle} `)) {
        matches.push({ candidate, score: needle.length });
      }
    }
  }

  matches.sort((a, b) => b.score - a.score);
  return matches[0]?.candidate ?? null;
}

function groupRowsByBrand(rows, brands, models) {
  const grouped = new Map();
  const unmatched = [];
  const skippedIncomplete = [];
  const normalizedRecords = [];
  let resolvedModelSlugCount = 0;
  const requestedBrandAliases = brandFilter ? getBrandAliases(brandFilter) : null;
  const sheetBrandSlugs = new Set(
    [...new Set(rows.map((row) => row.Sheet))]
      .map((sheetName) => findBrandTarget(sheetName, brands)?.page.brand.slug)
      .filter(Boolean),
  );

  for (const row of rows) {
    const entry = normalizeEntry(row);
    if (!isCompleteEntry(entry)) {
      skippedIncomplete.push(row);
      continue;
    }

    const target = findBrandTarget(row, brands);
    if (!target) {
      unmatched.push(row);
      continue;
    }

    const sheetTarget = findBrandTarget(row.Sheet, brands);
    if (
      sheetTarget &&
      sheetTarget.page.brand.slug !== target.page.brand.slug &&
      sheetBrandSlugs.has(target.page.brand.slug)
    ) {
      continue;
    }

    if (requestedBrandAliases && !hasSharedBrandAlias(requestedBrandAliases, target.brandAliases)) {
      continue;
    }

    const modelTarget = findModelTarget(row, models, target);
    if (modelTarget) {
      resolvedModelSlugCount += 1;
    }

    const existing = grouped.get(target.fileName) ?? { target, entries: [] };
    existing.entries.push(entry);
    grouped.set(target.fileName, existing);

    normalizedRecords.push({
      brandName: target.page.brand.name,
      brandSlug: target.page.brand.slug,
      modelName: entry.Model,
      modelSlug: modelTarget?.page?.model?.slug ?? null,
      modelLegacySlug: modelTarget?.page?.model?.legacySlug ?? null,
      modelCanonical: modelTarget?.page?.seo?.canonical ?? null,
      sourceSheet: row.Sheet,
      ...entry,
    });
  }

  return { grouped, unmatched, skippedIncomplete, normalizedRecords, resolvedModelSlugCount };
}

function dedupeEntries(entries) {
  const seen = new Set();
  const result = [];

  for (const entry of entries) {
    const key = EXPECTED_COLUMNS.map((column) => entry[column]).join("\u0001");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(entry);
  }

  return result;
}

function formatVisibleBadge(visibleRows) {
  return `${visibleRows} recent enquiries visible`;
}

async function writeBrandUpdates(grouped) {
  let changedFiles = 0;

  for (const { target, entries } of grouped.values()) {
    const page = target.page;
    const liveMarket = page.sections.liveMarketPrices;
    const feed = liveMarket.feed;
    const deduped = dedupeEntries(entries);
    const defaultVisibleRows = Number.isFinite(Number(feed.visibleRows)) ? Number(feed.visibleRows) : 20;
    const resolvedVisibleRows = visibleRowsOverride ?? Math.min(defaultVisibleRows, deduped.length || defaultVisibleRows);

    feed.entries = deduped;
    feed.columns = [...EXPECTED_COLUMNS];
    feed.rowsCount = deduped.length;
    feed.visibleRows = resolvedVisibleRows;
    feed.isDynamic = false;

    if (Array.isArray(liveMarket.badges) && liveMarket.badges.length > 0) {
      liveMarket.badges[0] = formatVisibleBadge(resolvedVisibleRows);
    }

    await writeFile(target.filePath, `${JSON.stringify(page, null, 2)}\n`, "utf8");
    changedFiles += 1;
  }

  return changedFiles;
}

async function readExistingNormalizedRows() {
  try {
    const raw = await readFile(LIVE_MARKET_SOURCE_PATH, "utf8");
    const parsed = JSON.parse(raw.replace(UTF8_BOM, ""));
    return Array.isArray(parsed?.rows) ? parsed.rows : [];
  } catch {
    return [];
  }
}

async function writeNormalizedSource(records) {
  await mkdir(LIVE_MARKET_DIR, { recursive: true });

  let rows = records;

  if (brandFilter) {
    const existingRows = await readExistingNormalizedRows();
    const targetBrandSlugs = new Set(records.map((record) => record.brandSlug).filter(Boolean));
    const retainedRows = existingRows.filter((row) => !targetBrandSlugs.has(row.brandSlug));
    rows = [...retainedRows, ...records];
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    columns: [
      "brandName",
      "brandSlug",
      "modelName",
      "modelSlug",
      "modelLegacySlug",
      "modelCanonical",
      "sourceSheet",
      ...EXPECTED_COLUMNS,
    ],
    rowsCount: rows.length,
    rows,
  };

  await writeFile(LIVE_MARKET_SOURCE_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

const workbookRows = await readWorkbookRows(path.resolve(xlsxPath));
const brands = await loadBrandPages();
const models = await loadPreferredModelFiles();
const {
  grouped,
  unmatched,
  skippedIncomplete,
  normalizedRecords,
  resolvedModelSlugCount,
} = groupRowsByBrand(workbookRows, brands, models);
const matchedRows = [...grouped.values()].reduce((total, group) => total + group.entries.length, 0);
const updatedBrands = [...grouped.values()]
  .sort((a, b) => b.entries.length - a.entries.length)
  .map(({ target, entries }) => ({
    brand: target.page.brand.name,
    file: target.fileName,
    rows: entries.length,
  }));

console.log(`${shouldWrite ? "WRITE" : "DRY RUN"} live market Excel import for brand pages`);
console.log(`Workbook rows: ${workbookRows.length}`);
console.log(`Matched rows: ${matchedRows}`);
console.log(`Target brand files: ${grouped.size}`);
console.log(`Unmatched rows: ${unmatched.length}`);
console.log(`Skipped incomplete rows: ${skippedIncomplete.length}`);
console.log(`Rows with resolved modelSlug: ${resolvedModelSlugCount}`);

if (brandFilter) {
  console.log(`Brand filter: ${brandFilter}`);
}

if (updatedBrands.length) {
  console.log("\nBrand updates:");
  for (const item of updatedBrands) {
    console.log(`- ${item.brand} -> ${item.file}: ${item.rows} rows`);
  }
}

if (reportUnmatched && unmatched.length) {
  const unmatchedSheets = [...new Set(unmatched.map((row) => row.Sheet))].sort();
  console.log("\nUnmatched sheets:");
  for (const sheet of unmatchedSheets) {
    console.log(`- ${sheet}`);
  }

  console.log("\nUnmatched sample:");
  for (const row of unmatched.slice(0, 20)) {
    console.log(`- [${row.Sheet}] ${row.Model} (${row["Engine Code"] ?? "no engine code"})`);
  }
}

if (shouldWrite) {
  const changedFiles = await writeBrandUpdates(grouped);
  await writeNormalizedSource(normalizedRecords);
  console.log(`\nUpdated ${changedFiles} brand JSON files.`);
  console.log(`Wrote shared source: ${LIVE_MARKET_SOURCE_PATH}`);
} else {
  console.log("\nNo files changed. Re-run with --write to apply the matched rows.");
}
