import { createHash } from "node:crypto";
import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = process.argv[2];
const PUBLIC_DIR = path.join(process.cwd(), "public", "images", "checkout-vehicles");
const INDEX_FILE = path.join(process.cwd(), "lib", "checkout-vehicle-images.json");

if (!SOURCE_DIR) {
  throw new Error("Pass the source image directory as the first argument.");
}

const BRANDS = [
  "mercedes-benz",
  "range-rover",
  "land-rover",
  "volkswagen",
  "mitsubishi",
  "vauxhall",
  "renault",
  "toyota",
  "jaguar",
  "honda",
  "ford",
  "jeep",
  "mini",
];

const MERCEDES_PREFIXES = [
  "a-class",
  "amg-gt",
  "b-class",
  "c-class",
  "citan",
  "cla-",
  "clc-class",
  "clk-",
  "cls-",
  "e-class",
  "eq",
  "g-class",
  "gl-",
  "gla-",
  "glb-",
  "glc-",
  "gle-",
  "glk-",
  "gls-",
  "m-class",
  "r-class",
  "s-class",
  "sl-",
  "slc-",
  "slk-",
  "sls-",
  "sprinter",
  "v-class",
  "vaneo",
  "viano",
  "vito",
];

function normalize(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/mercedes[ -]?benz/g, "mercedes-benz")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectBrand(searchText) {
  const direct = BRANDS.find((brand) => searchText.startsWith(`${brand}-`));
  if (direct) return direct;
  if (MERCEDES_PREFIXES.some((prefix) => searchText.startsWith(prefix))) return "mercedes-benz";
  return "";
}

function yearsFrom(value) {
  const years = [...value.matchAll(/(?:19|20)\d{2}/g)].map((match) => Number(match[0]));
  return {
    startYear: years[0] || null,
    endYear: years[1] || years[0] || null,
  };
}

await mkdir(PUBLIC_DIR, { recursive: true });

const sourceFiles = (await readdir(SOURCE_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(webp|png|jpe?g)$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

const entries = [];
for (const fileName of sourceFiles) {
  const searchText = normalize(path.parse(fileName).name.replace(/-45-angle-front-view$/i, ""));
  const make = detectBrand(searchText);
  if (!make) continue;

  const extension = path.extname(fileName).toLowerCase();
  const id = createHash("sha1").update(fileName).digest("hex").slice(0, 16);
  const outputName = `${id}${extension}`;
  await copyFile(path.join(SOURCE_DIR, fileName), path.join(PUBLIC_DIR, outputName));

  entries.push({
    make,
    searchText,
    ...yearsFrom(searchText),
    path: `/images/checkout-vehicles/${outputName}`,
  });
}

await writeFile(INDEX_FILE, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
console.log(`Imported ${entries.length} checkout vehicle images from ${sourceFiles.length} source files.`);
