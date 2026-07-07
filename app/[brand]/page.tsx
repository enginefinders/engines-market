import type { Metadata } from "next";
import { Suspense } from "react";
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
import EngineCodeDirectorySection from "@/components/sections/EngineCodeDirectorySection";
import EngineYearsSection from "@/components/sections/EngineYearsSection";
import FaqSection from "@/components/sections/FaqSection";
import TrustCtaSection from "@/components/sections/TrustCtaSection";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import { getBrandPageData, getBrandSlugs } from "@/lib/brandData";
import { resolveBrandPageVisuals } from "@/lib/engineImageSelection";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import { getBrandModelCards } from "@/lib/modelPageData";
import { buildBrandStructuredData } from "@/lib/structuredData";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import type { BrandPageData } from "@/types/brand";
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
      : pageData.sections.models.cards[0]?.image ?? pageData.assets.heroBg;
  const initialTimestamp = new Date().toISOString();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        data={pageData.sections.hero}
        bgImage={brandVisuals.hero}
        modelCards={heroModelCards}
        brandSlug={pageData.brand.slug}
      />

      <HowItWorksSection
        data={pageData.sections.howItWorks}
        bgImage={pageData.assets.howItWorksBg}
        sectionId="how-it-works"
      />

      <LiveMarketPricesSection
        data={pageData.sections.liveMarketPrices}
        modelCards={pageData.sections.models.cards}
        imageSrc={pageData.sections.liveMarketPrices.imageSrc ?? brandVisuals.liveMarket}
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

      <EngineCodesSection data={pageData.sections.engineCodes} bgImage={pageData.assets.engineCodesBg} />

      <CommonProblemsSection data={pageData.sections.commonProblems} bgImage={pageData.assets.commonProblemsBg} documentMode />

      <EngineTypesSection
        data={pageData.sections.engineTypes}
        bgImage={pageData.assets.engineTypesBg}
        documentMode
        sectionId="brand-engine-types"
      />

      <EngineSizesSection brandName={pageData.brand.name} data={pageData.sections.engineSizes} bgImage={pageData.assets.engineSizesBg} />

      <FuelTypesSection data={pageData.sections.fuelTypes} bgImage={pageData.assets.fuelTypesBg} documentMode />

      <EngineCodeDirectorySection data={pageData.sections.engineCodeDirectory} bgImage={pageData.assets.engineCodeDirectoryBg} documentMode />

      <EngineYearsSection brandName={pageData.brand.name} data={pageData.sections.engineYears} />

      <FaqSection data={pageData.sections.faq} documentMode />

      <TrustCtaSection
        data={pageData.sections.trustCta}
        brandName={pageData.brand.name}
        imageSrc={trustCtaImage}
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={pageData.brand.name} />
      </Suspense>
    </>
  );
}
