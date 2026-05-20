import type { MetadataRoute } from "next";
import { getBrandSlugs } from "@/lib/brandData";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brandSlugs = await getBrandSlugs();
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...brandSlugs.map((brandSlug) => ({
      url: `${SITE_URL}/${brandSlug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
