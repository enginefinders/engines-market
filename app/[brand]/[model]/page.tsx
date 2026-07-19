import type { Metadata } from "next";
import DocumentEnginePage from "@/components/pages/DocumentEnginePage";
import DocumentModelPage from "@/components/pages/DocumentModelPage";
import { getEnginePageData, getEnginePageStaticParams } from "@/lib/enginePageData";
import { getModelPageData, getModelPageStaticParams } from "@/lib/modelPageData";
import { SITE_URL } from "@/lib/site";
import { notFound, permanentRedirect } from "next/navigation";

type ModelPageProps = {
  params: Promise<{
    brand: string;
    model: string;
  }>;
};

export async function generateStaticParams() {
  const [modelParams, engineParams] = await Promise.all([
    getModelPageStaticParams(),
    getEnginePageStaticParams(),
  ]);

  return [...modelParams, ...engineParams];
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const enginePageData = await getEnginePageData(brand, model);

  if (enginePageData) {
    return {
      title: enginePageData.seo.title,
      description: enginePageData.seo.description,
      alternates: {
        canonical: enginePageData.seo.canonical,
      },
      metadataBase: new URL(SITE_URL),
    };
  }

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
    metadataBase: new URL(SITE_URL),
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { brand, model } = await params;
  const enginePageData = await getEnginePageData(brand, model);

  if (enginePageData) {
    if (brand !== enginePageData.brand.slug || model !== enginePageData.engine.slug) {
      permanentRedirect(`/${enginePageData.brand.slug}/${enginePageData.engine.slug}`);
    }

    return <DocumentEnginePage data={enginePageData} />;
  }

  const pageData = await getModelPageData(brand, model);

  if (!pageData) {
    notFound();
  }

  if (brand !== pageData.brand.slug || model !== pageData.model.slug) {
    permanentRedirect(`/${pageData.brand.slug}/${pageData.model.slug}`);
  }

  return <DocumentModelPage data={pageData} />;
}
