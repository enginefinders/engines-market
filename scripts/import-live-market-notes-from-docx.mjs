import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { inflateRawSync } from "node:zlib";

const UTF8_BOM = /^\uFEFF/;
const BRANDS_DIR = path.join(process.cwd(), "data", "brands");
const OUTPUT_DIR = path.join(process.cwd(), "data", "live-market");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "brand-notes.json");

function printUsage() {
  console.log(`Usage:
  node scripts/import-live-market-notes-from-docx.mjs "C:\\path\\to\\notes.docx"

Writes:
  data/live-market/brand-notes.json`);
}

const docxPath = process.argv[2];

if (!docxPath || docxPath.startsWith("--")) {
  printUsage();
  process.exit(1);
}

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    throw new Error("Could not find docx zip directory.");
  }

  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  let cursor = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map();

  for (let index = 0; index < entryCount; index += 1) {
    const method = buffer.readUInt16LE(cursor + 10);
    const compressedSize = buffer.readUInt32LE(cursor + 20);
    const nameLength = buffer.readUInt16LE(cursor + 28);
    const extraLength = buffer.readUInt16LE(cursor + 30);
    const commentLength = buffer.readUInt16LE(cursor + 32);
    const localHeaderOffset = buffer.readUInt32LE(cursor + 42);
    const name = buffer.toString("utf8", cursor + 46, cursor + 46 + nameLength).replace(/\\/g, "/");

    const localNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    const content = method === 0 ? compressed : inflateRawSync(compressed);

    entries.set(name, content);
    cursor += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

function decodeXml(value = "") {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

function getDocumentParagraphs(xml) {
  const paragraphs = [];

  for (const match of xml.matchAll(/<w:p[\s\S]*?<\/w:p>/g)) {
    const text = [...match[0].matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)]
      .map((valueMatch) => decodeXml(valueMatch[1]))
      .join("");
    const cleaned = text.replace(/\s+/g, " ").trim();

    if (cleaned) {
      paragraphs.push(cleaned);
    }
  }

  return paragraphs;
}

async function loadBrands() {
  const entries = await readdir(BRANDS_DIR, { withFileTypes: true });
  const brands = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;

    const raw = await readFile(path.join(BRANDS_DIR, entry.name), "utf8");
    const parsed = JSON.parse(raw.replace(UTF8_BOM, ""));

    if (!parsed?.brand?.name || !parsed?.brand?.slug) continue;

    brands.push({
      name: parsed.brand.name,
      slug: parsed.brand.slug,
      normalizedName: normalize(parsed.brand.name),
    });
  }

  return brands;
}

function groupNotesByBrand(paragraphs, brands) {
  const notesBySlug = {};
  let currentBrand = null;

  for (const paragraph of paragraphs) {
    const normalizedParagraph = normalize(paragraph);
    const matchedBrand =
      brands.find((brand) => (
        normalizedParagraph === brand.normalizedName ||
        normalizedParagraph.endsWith(` ${brand.normalizedName}`) ||
        normalizedParagraph.endsWith(brand.normalizedName)
      )) ?? null;

    if (matchedBrand) {
      currentBrand = matchedBrand;
      notesBySlug[currentBrand.slug] = {
        brandName: currentBrand.name,
        title: `${currentBrand.name} Notes`,
        items: [],
      };
      continue;
    }

    if (!currentBrand) continue;
    notesBySlug[currentBrand.slug].items.push(paragraph);
  }

  return notesBySlug;
}

const fileBuffer = await readFile(path.resolve(docxPath));
const entries = parseZipEntries(fileBuffer);
const documentXml = entries.get("word/document.xml")?.toString("utf8").replace(UTF8_BOM, "");

if (!documentXml) {
  throw new Error("Missing word/document.xml in docx.");
}

const brands = await loadBrands();
const paragraphs = getDocumentParagraphs(documentXml);
const notesBySlug = groupNotesByBrand(paragraphs, brands);

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(
  OUTPUT_PATH,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceFileName: path.basename(docxPath),
      brands: notesBySlug,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`Parsed notes for ${Object.keys(notesBySlug).length} brands.`);
console.log(`Wrote ${OUTPUT_PATH}`);
