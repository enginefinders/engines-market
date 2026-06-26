import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getBrandSlugs } from "@/lib/brandData";
import { getModelPageStaticParams } from "@/lib/modelPageData";
import { getVariantPageStaticParams } from "@/lib/variantPageData";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const PUBLIC_DIR = path.join(process.cwd(), "public");
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

function normalizeRoute(route: string) {
  if (!route) {
    return "/";
  }

  if (route === "/") {
    return route;
  }

  return route.replace(/\/+$/, "");
}

function extractPathnameFromCanonical(value: string) {
  try {
    const url = new URL(value);
    return normalizeRoute(url.pathname);
  } catch {
    return null;
  }
}

function extractCanonicalRoute(html: string) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!match) {
    return null;
  }

  return extractPathnameFromCanonical(match[1]);
}

function deriveStaticRouteFromFilePath(filePath: string) {
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

async function getStaticPublicRoutes() {
  const routes = new Set<string>();

  async function walk(dirPath: string) {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await walk(entryPath);
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
  }

  await walk(PUBLIC_DIR);

  return [...routes].sort((left, right) => left.localeCompare(right));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brandSlugs = await getBrandSlugs();
  const modelParams = await getModelPageStaticParams();
  const variantParams = await getVariantPageStaticParams();
  const staticPublicRoutes = await getStaticPublicRoutes();
  const now = new Date();
  const entries = new Map<string, MetadataRoute.Sitemap[number]>();

  function addEntry(
    route: string,
    priority: number,
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> = "weekly",
  ) {
    const normalizedRoute = normalizeRoute(route);
    const url = normalizedRoute === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedRoute}`;
    entries.set(url, {
      url,
      lastModified: now,
      changeFrequency,
      priority,
    });
  }

  addEntry("/", 1);

  for (const route of STATIC_APP_ROUTES) {
    addEntry(route, 0.75);
  }

  for (const route of staticPublicRoutes) {
    addEntry(route, 0.75);
  }

  for (const brandSlug of brandSlugs) {
    addEntry(`/${brandSlug}`, 0.8);
  }

  for (const { brand, model } of modelParams) {
    addEntry(`/${brand}/${model}`, 0.7);
  }

  for (const { brand, model, variant } of variantParams) {
    addEntry(`/${brand}/${model}/${variant}`, 0.6);
  }

  return [...entries.values()];
}
