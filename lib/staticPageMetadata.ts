import type { Metadata } from "next";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import { SITE_URL } from "@/lib/site";

export function getStaticPageMetadata(page: StaticPageRecord): Metadata {
  const robots = page.seo.robots.toLowerCase();
  const canonical = page.seo.canonical || `${SITE_URL}${page.route}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical },
    robots: robots.includes("noindex") ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: page.seo.openGraph.title || page.seo.title,
      description: page.seo.openGraph.description || page.seo.description,
      url: page.seo.openGraph.url || canonical,
      type: page.seo.openGraph.type === "article" ? "article" : "website",
      siteName: "Engines Market",
      images: page.seo.openGraph.image ? [{ url: page.seo.openGraph.image, alt: "Engines Market" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.openGraph.title || page.seo.title,
      description: page.seo.openGraph.description || page.seo.description,
    },
    other: {
      googlebot: page.seo.robots || "index, follow",
      language: "English",
      "geo.region": "GB",
      "theme-color": "#0a2952",
    },
  };
}
