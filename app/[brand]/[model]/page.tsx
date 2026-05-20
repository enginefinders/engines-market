import type { Metadata } from "next";
import DocumentModelPage from "@/components/pages/DocumentModelPage";
import { getModelPageData, getModelPageStaticParams } from "@/lib/modelPageData";
import { notFound, permanentRedirect } from "next/navigation";

type ModelPageProps = {
  params: Promise<{
    brand: string;
    model: string;
  }>;
};

export async function generateStaticParams() {
  return getModelPageStaticParams();
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const pageData = await getModelPageData(brand, model);

  if (!pageData) {
    return {};
  }

  return {
    title: pageData.seo.title,
    description: pageData.seo.description,
    alternates: {
      canonical: pageData.seo.canonical,
    },
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { brand, model } = await params;
  const pageData = await getModelPageData(brand, model);

  if (!pageData) {
    notFound();
  }

  if (brand !== pageData.brand.slug || model !== pageData.model.slug) {
    permanentRedirect(`/${pageData.brand.slug}/${pageData.model.slug}`);
  }

  return <DocumentModelPage data={pageData} />;
}
