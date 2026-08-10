import type { Metadata } from "next";
import AutoInternalLinks from "@/components/internal-links/AutoInternalLinks";
import DocumentVariantPage from "@/components/pages/DocumentVariantPage";
import { getInternalLinkTargets } from "@/lib/internalLinkIndex";
import { getVariantPageData, getVariantPageStaticParams } from "@/lib/variantPageData";
import { SITE_URL } from "@/lib/site";
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
    metadataBase: new URL(SITE_URL),
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

  const internalLinkTargets = await getInternalLinkTargets({
    brandSlug: pageData.brand.slug,
    modelSlug: pageData.model.slug,
    currentPath: pageData.seo.canonical,
  });

  return (
    <>
      <AutoInternalLinks targets={internalLinkTargets} />
      <DocumentVariantPage data={pageData} />
    </>
  );
}
