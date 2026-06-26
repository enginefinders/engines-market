import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://enginesmarket.co.uk").trim().replace(/\/+$/, "");
const INDEX_MODEL_PAGES = process.env.INDEX_MODEL_PAGES == null ? true : process.env.INDEX_MODEL_PAGES === "true";
const INDEX_VARIANT_PAGES =
  process.env.INDEX_VARIANT_PAGES == null ? true : process.env.INDEX_VARIANT_PAGES === "true";
const PUBLIC_DIR = path.join(ROOT, "public");
const STATIC_APP_ROUTES = [
  "/blog",
  "/case-studies",
  "/compare",
  "/failures",
  "/form",
  "/guides",
  "/insights",
  "/legal",
  "/locations",
  "/prices",
  "/resources",
  "/services",
  "/symptoms",
];
const UTF8_BOM = /^\uFEFF/;

function normalizeSlugPart(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRoute(route) {
  if (!route) {
    return "/";
  }

  if (route === "/") {
    return route;
  }

  return route.replace(/\/+$/, "");
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

function extractPathnameFromCanonical(value) {
  try {
    const url = new URL(value);
    return normalizeRoute(url.pathname);
  } catch {
    return null;
  }
}

function extractCanonicalRoute(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!match) {
    return null;
  }

  return extractPathnameFromCanonical(match[1]);
}

function deriveStaticRouteFromFilePath(filePath) {
  const relativePath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");

  if (relativePath === "about/about-us.html") {
    return "/about";
  }

  if (relativePath === "reviews.html") {
    return "/reviews";
  }

  if (relativePath === "get-a-quote.html") {
    return "/get-a-quote";
  }

  if (relativePath === "case-studies/nissan-navara-d40-case-study.html") {
    return "/case-studies/nissan-navara-engine-failure";
  }

  const withoutExtension = relativePath.replace(/\.html$/i, "");
  const segments = withoutExtension.split("/");

  if (segments[0] === "services" && segments[1] === "gearbox-replacement" && segments[2]) {
    return `/services/gearbox-replacement/${segments[2]}`;
  }

  if (
    ["about", "compare", "insights", "services", "prices", "legal", "failures", "case-studies", "symptoms"].includes(
      segments[0],
    ) &&
    segments[1]
  ) {
    return `/${segments.join("/")}`;
  }

  if (segments.length === 1 && segments[0]) {
    return `/${segments[0]}`;
  }

  return null;
}

async function readStaticPublicRoutes(dirPath = PUBLIC_DIR) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const routes = new Set();

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const nestedRoutes = await readStaticPublicRoutes(entryPath);
      for (const route of nestedRoutes) {
        routes.add(route);
      }
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".html")) {
      continue;
    }

    try {
      const raw = await readFile(entryPath, "utf-8");
      const route = extractCanonicalRoute(raw) ?? deriveStaticRouteFromFilePath(entryPath);
      if (route) {
        routes.add(route);
      }
    } catch {
      continue;
    }
  }

  return routes;
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
  const staticPublicRoutes = await readStaticPublicRoutes();

  const entryMap = new Map();

  function addEntry(route, priority) {
    const normalizedRoute = normalizeRoute(route);
    const url = normalizedRoute === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedRoute}`;
    entryMap.set(url, toUrlEntry(url, lastModified, priority));
  }

  addEntry("/", 1);

  for (const route of STATIC_APP_ROUTES) {
    addEntry(route, 0.75);
  }

  for (const route of staticPublicRoutes) {
    addEntry(route, 0.75);
  }

  const seenBrands = new Set();
  for (const page of brandPages) {
    const brandSlug = normalizeSlugPart(page.brand.slug);
    if (!brandSlug || seenBrands.has(brandSlug)) {
      continue;
    }
    seenBrands.add(brandSlug);
    addEntry(`/${brandSlug}`, 0.8);
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
      addEntry(`/${brandSlug}/${modelSlug}`, 0.7);
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
      addEntry(`/${brandSlug}/${modelSlug}/${variantSlug}`, 0.6);
    }
  }

  const entries = [...entryMap.values()];
  await writeFile(path.join(ROOT, "sitemap.xml"), renderSitemap(entries), "utf-8");
  console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
}

await main();
