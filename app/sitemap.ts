import type { MetadataRoute } from "next";
import { getBrandSlugs } from "@/lib/brandData";
import { getModelPageStaticParams } from "@/lib/modelPageData";
import { getVariantPageStaticParams } from "@/lib/variantPageData";
import { INDEX_MODEL_PAGES, INDEX_VARIANT_PAGES, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brandSlugs = await getBrandSlugs();
  const modelParams = await getModelPageStaticParams();
  const variantParams = await getVariantPageStaticParams();
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
    ...(INDEX_MODEL_PAGES
      ? modelParams.map(({ brand, model }) => ({
          url: `${SITE_URL}/${brand}/${model}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }))
      : []),
    ...(INDEX_VARIANT_PAGES
      ? variantParams.map(({ brand, model, variant }) => ({
          url: `${SITE_URL}/${brand}/${model}/${variant}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))
      : []),
  ];
}
