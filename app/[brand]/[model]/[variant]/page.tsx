import type { Metadata } from "next";
import DocumentVariantPage from "@/components/pages/DocumentVariantPage";
import { getVariantPageData, getVariantPageStaticParams } from "@/lib/variantPageData";
import { INDEX_VARIANT_PAGES } from "@/lib/site";
import { notFound, permanentRedirect } from "next/navigation";

type VariantPageProps = {
  params: Promise<{
    brand: string;
    model: string;
    variant: string;
  }>;
};

export async function generateStaticParams() {
  return getVariantPageStaticParams();
}

export async function generateMetadata({ params }: VariantPageProps): Promise<Metadata> {
  const { brand, model, variant } = await params;
  const pageData = await getVariantPageData(brand, model, variant);

  if (!pageData) {
    return {};
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
    alternates: {
      canonical: pageData.seo.canonical,
    },
    robots: INDEX_VARIANT_PAGES
      ? undefined
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        },
  };
}

export default async function VariantPage({ params }: VariantPageProps) {
  const { brand, model, variant } = await params;
  const pageData = await getVariantPageData(brand, model, variant);

  if (!pageData) {
    notFound();
  }

  if (
    brand !== pageData.brand.slug ||
    model !== pageData.model.slug ||
    variant !== pageData.variant.slug
  ) {
    permanentRedirect(`/${pageData.brand.slug}/${pageData.model.slug}/${pageData.variant.slug}`);
  }

  return <DocumentVariantPage data={pageData} />;
}
