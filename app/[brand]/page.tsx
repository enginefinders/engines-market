import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveMarketPricesSection from "@/components/sections/LiveMarketPricesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ModelsSection from "@/components/sections/ModelsSection";
import EngineCodesSection from "@/components/sections/EngineCodesSection";
import CommonProblemsSection from "@/components/sections/CommonProblemsSection";
import EngineTypesSection from "@/components/sections/EngineTypesSection";
import EngineSizesSection from "@/components/sections/EngineSizesSection";
import FuelTypesSection from "@/components/sections/FuelTypesSection";
import EngineYearsSection from "@/components/sections/EngineYearsSection";
import FaqSection from "@/components/sections/FaqSection";
import TrustCtaSection from "@/components/sections/TrustCtaSection";
import AutoInternalLinks from "@/components/internal-links/AutoInternalLinks";
import { getBrandPageData, getBrandSlugs } from "@/lib/brandData";
import { getEngineLinkMapForBrand } from "@/lib/enginePageData";
import { resolveBrandPageVisuals } from "@/lib/engineImageSelection";
import { getInternalLinkPlan } from "@/lib/internalLinkIndex";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import { getBrandModelCards } from "@/lib/modelPageData";
import { SITE_URL } from "@/lib/site";
import { buildBrandStructuredData } from "@/lib/structuredData";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import { notFound } from "next/navigation";

type BrandPageProps = {
  params: Promise<{
    brand: string;
  }>;
};

export async function generateStaticParams() {
  const brandSlugs = await getBrandSlugs();

  return brandSlugs.map((brand) => ({
    brand,
  }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const pageData = await getBrandPageData(brand);

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

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const pageData = await getBrandPageData(brand);

  if (!pageData) {
    notFound();
  }

  const allBrandModelCards = await getBrandModelCards(
    pageData.brand.slug,
    pageData.sections.models.cards,
  );
  const structuredData = buildBrandStructuredData(pageData, allBrandModelCards);
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);
  const brandVisuals = resolveBrandPageVisuals(pageData);
  const modelCardsWithResolvedImages = allBrandModelCards.map((card) => ({
    ...card,
    image: resolveModelImagePaths({
      brandSlug: pageData.brand.slug,
      modelSlug: card.slug,
      modelName: card.h3,
      configuredSmallImage: card.image,
      configuredHeroImage: card.image,
    }).resolvedSmallImage,
  }));
  const heroModelCards = modelCardsWithResolvedImages.slice(0, 3);
  const trustCtaImage =
    pageData.brand.slug === "land-rover"
      ? "/images/brands/land-rover/cta-image.webp"
      : brandVisuals.hero ?? modelCardsWithResolvedImages[0]?.image;
  const initialTimestamp = new Date().toISOString();
  const engineLinks = await getEngineLinkMapForBrand(pageData.brand.slug);
  const internalLinkPlan = await getInternalLinkPlan({
    brandSlug: pageData.brand.slug,
    currentPath: pageData.seo.canonical,
    pageType: "brand",
  });

  return (
    <>
      <AutoInternalLinks
        targets={internalLinkPlan.targets}
        maxLinksByType={internalLinkPlan.maxLinksByType}
        maxLinksPerPage={internalLinkPlan.maxLinksPerPage}
        maxLinksPerTarget={internalLinkPlan.defaultMaxLinksPerTarget}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        data={pageData.sections.hero}
        bgImage={brandVisuals.hero}
        modelCards={heroModelCards}
        brandSlug={pageData.brand.slug}
        disclaimerMode="icon"
        engineLinks={engineLinks}
      />

      <HowItWorksSection
        data={pageData.sections.howItWorks}
        bgImage={pageData.assets.howItWorksBg}
        sectionId="how-it-works"
        compactSpacing
      />

      <LiveMarketPricesSection
        data={pageData.sections.liveMarketPrices}
        modelCards={pageData.sections.models.cards}
        imageSrc={pageData.sections.liveMarketPrices.imageSrc ?? brandVisuals.liveMarket}
        displayMode="document"
        initialTimestamp={initialTimestamp}
      />

      <ReviewsSection data={reviewsData} useDataHeading documentMode />

      <ModelsSection
        data={{
          ...pageData.sections.models,
          cards: modelCardsWithResolvedImages,
        }}
        brandSlug={pageData.brand.slug}
        documentMode
      />

      <EngineCodesSection data={pageData.sections.engineCodes} bgImage={brandVisuals.hero} />

      <CommonProblemsSection data={pageData.sections.commonProblems} bgImage={pageData.assets.commonProblemsBg} documentMode />

      <EngineTypesSection
        data={pageData.sections.engineTypes}
        bgImage={pageData.assets.engineTypesBg}
        documentMode
        sectionId="brand-engine-types"
      />

      <EngineSizesSection
        brandName={pageData.brand.name}
        data={pageData.sections.engineSizes}
        bgImage={pageData.assets.engineSizesBg}
        documentMode
      />

      <FuelTypesSection data={pageData.sections.fuelTypes} bgImage={pageData.assets.fuelTypesBg} documentMode />

      <EngineYearsSection brandName={pageData.brand.name} data={pageData.sections.engineYears} />

      <FaqSection data={pageData.sections.faq} documentMode />

      <TrustCtaSection
        data={pageData.sections.trustCta}
        brandName={pageData.brand.name}
        imageSrc={trustCtaImage}
      />
    </>
  );
}
