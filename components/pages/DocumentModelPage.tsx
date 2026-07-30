import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import CommonProblemsSection from "@/components/sections/CommonProblemsSection";
import EngineSizesSection from "@/components/sections/EngineSizesSection";
import EngineIntelligenceSection from "@/components/sections/EngineIntelligenceSection";
import EngineTypesSection from "@/components/sections/EngineTypesSection";
import EngineYearsSection from "@/components/sections/EngineYearsSection";
import FaqSection from "@/components/sections/FaqSection";
import FuelTypesSection from "@/components/sections/FuelTypesSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveMarketPricesSection from "@/components/sections/LiveMarketPricesSection";
import ModelEngineCodesSection from "@/components/sections/ModelEngineCodesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TrustCtaSection from "@/components/sections/TrustCtaSection";
import VariantCoverageSection from "@/components/sections/VariantCoverageSection";
import { TIER3_BRAND_SLUGS } from "@/lib/tier3Brands";
import { applyModelPageVisualPlaceholders } from "@/lib/modelVisualSelection";
import { getVariantRouteMapForModel } from "@/lib/variantPageData";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import type { ModelPageData } from "@/types/model";
import { getEngineLinkMapForBrand } from "@/lib/enginePageData";

function toHeroCards(data: ModelPageData) {
  return data.sections.variantCoverage.cards.map((card) => ({
    h3: card.h3,
    slug: card.slug,
    subtitle: card.subtitle,
    priceRange: card.priceRange,
    cta: card.cta,
    image: card.image ?? "",
    engineCodes: card.engineCodes,
    heroLineTwo: `-> Rebuilt units from ${card.priceRange} - Common codes: ${card.engineCodes.join(", ")}`,
  }));
}

function buildModelMarketplaceLabel(modelName: string, brandName: string) {
  const escapedBrand = brandName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const shortModelName = modelName.replace(new RegExp(`^${escapedBrand}\\s+`, "i"), "").trim();
  return `${shortModelName || modelName} Marketplace`;
}

function stripBrandFromModelName(modelName: string, brandName: string) {
  const escapedBrand = brandName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const shortModelName = modelName.replace(new RegExp(`^${escapedBrand}\\s+`, "i"), "").trim();
  return shortModelName || modelName;
}

function buildMobileLiveMarketHeading(modelName: string, brandName: string) {
  return `${stripBrandFromModelName(modelName, brandName)} Engine Replacement`;
}

type DocumentModelPageProps = {
  data: ModelPageData;
};

export default async function DocumentModelPage({
  data,
}: DocumentModelPageProps) {
  const visualData = applyModelPageVisualPlaceholders(data);
  const structuredData = visualData.structuredData;
  const heroCards = toHeroCards(visualData);
  const reviewsData = buildStaticReviewsSection(visualData.model.name);
  const resolvedModelImage = visualData.assets.mainImage || visualData.assets.heroBg;
  const initialTimestamp = new Date().toISOString();
  const marketplaceLabel = buildModelMarketplaceLabel(visualData.model.name, visualData.brand.name);
  const mobileLiveMarketHeading = buildMobileLiveMarketHeading(visualData.model.name, visualData.brand.name);
  const showEngineIntelligence =
    TIER3_BRAND_SLUGS.has(visualData.brand.slug) &&
    Boolean(visualData.sections.engineIntelligence?.cards.length);
  const variantRouteMap = await getVariantRouteMapForModel(
    visualData.brand.slug,
    visualData.model.slug,
    visualData.sections.variantCoverage.cards,
  );
  const engineLinks = await getEngineLinkMapForBrand(visualData.brand.slug);

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}

      <HeroSection
        data={visualData.sections.hero}
        bgImage={resolvedModelImage}
        modelCards={heroCards}
        strictData
        tagOverride={marketplaceLabel}
        disclaimerMode="icon"
      />

      <HowItWorksSection
        data={visualData.sections.howItWorks}
        bgImage={visualData.assets.howItWorksBg}
        sectionId="how-it-works"
      />

      {showEngineIntelligence && visualData.sections.engineIntelligence ? (
        <EngineIntelligenceSection
          data={visualData.sections.engineIntelligence}
          imageSrc={resolvedModelImage}
        />
      ) : (
        <LiveMarketPricesSection
          data={visualData.sections.liveMarketPrices}
          modelCards={heroCards}
          imageSrc={visualData.sections.liveMarketPrices.imageSrc ?? resolvedModelImage}
          displayMode="document"
          initialTimestamp={initialTimestamp}
          mobileHeadingOverride={mobileLiveMarketHeading}
        />
      )}

      <ReviewsSection data={reviewsData} useDataHeading documentMode />

      <VariantCoverageSection 
        data={visualData.sections.variantCoverage} 
        brandName={visualData.brand.name}
        brandSlug={visualData.brand.slug}
        modelName={visualData.model.name}
        modelSlug={visualData.model.slug}
        variantRouteMap={variantRouteMap}
        documentMode
      />

      <ModelEngineCodesSection
        data={visualData.sections.engineCodes}
        guide={visualData.sections.variantCoverage.engineGuide}
        modelName={visualData.model.name}
        engineLinks={engineLinks}
        strictData
        documentMode
      />

      {visualData.sections.commonProblems ? (
        <CommonProblemsSection
          data={visualData.sections.commonProblems}
          bgImage={resolvedModelImage}
          documentMode
        />
      ) : null}

      <EngineTypesSection
        data={visualData.sections.engineTypes}
        dynamicBrandCta
        displayMode="document"
        documentMode
        sectionId="model-engine-types"
      />

      <EngineSizesSection
        brandName={visualData.model.name}
        data={visualData.sections.engineSizes}
        bgImage={visualData.assets.engineSizesBg}
        dynamicBrandLabel
        displayMode="document"
        engineLinks={engineLinks}
      />

      <FuelTypesSection
        data={visualData.sections.fuelTypes}
        bgImage={visualData.assets.fuelTypesBg}
        engineLinks={engineLinks}
        strictData
        documentMode
      />

      <EngineYearsSection brandName={visualData.model.name} data={visualData.sections.engineYears} engineLinks={engineLinks} strictData />

      <FaqSection data={visualData.sections.faq} strictData documentMode />

      <TrustCtaSection
        data={visualData.sections.trustCta}
        brandName={visualData.model.name}
        imageSrc={visualData.assets.ctaImage ?? resolvedModelImage}
        displayMode="document"
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={visualData.model.name} />
      </Suspense>
    </>
  );
}
