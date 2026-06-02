import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import CommonProblemsSection from "@/components/sections/CommonProblemsSection";
import EngineSizesSection from "@/components/sections/EngineSizesSection";
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
import { applyModelPageVisualPlaceholders } from "@/lib/modelVisualSelection";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import type { ModelPageData } from "@/types/model";

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

type DocumentModelPageProps = {
  data: ModelPageData;
};

export default function DocumentModelPage({
  data,
}: DocumentModelPageProps) {
  const visualData = applyModelPageVisualPlaceholders(data);
  const structuredData = visualData.structuredData;
  const heroCards = toHeroCards(visualData);
  const reviewsData = buildStaticReviewsSection(visualData.model.name);
  const mainImage = visualData.assets.heroBg;
  const initialTimestamp = new Date().toISOString();

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
        bgImage={mainImage}
        modelCards={heroCards}
        strictData
      />

      <HowItWorksSection
        data={visualData.sections.howItWorks}
        bgImage={visualData.assets.howItWorksBg}
        sectionId="how-it-works"
      />

      <LiveMarketPricesSection
        data={visualData.sections.liveMarketPrices}
        modelCards={heroCards}
        imageSrc={visualData.sections.liveMarketPrices.imageSrc ?? mainImage}
        displayMode="document"
        initialTimestamp={initialTimestamp}
      />

      <ReviewsSection data={reviewsData} useDataHeading />

      <VariantCoverageSection data={visualData.sections.variantCoverage} />

      <ModelEngineCodesSection
        data={visualData.sections.engineCodes}
        guide={visualData.sections.variantCoverage.engineGuide}
        modelName={visualData.model.name}
        strictData
      />

      {visualData.sections.commonProblems ? (
        <CommonProblemsSection data={visualData.sections.commonProblems} />
      ) : null}

      <EngineTypesSection
        data={visualData.sections.engineTypes}
        dynamicBrandCta
        displayMode="document"
        sectionId="model-engine-types"
      />

      <EngineSizesSection
        brandName={visualData.model.name}
        data={visualData.sections.engineSizes}
        bgImage={visualData.assets.engineSizesBg}
        dynamicBrandLabel
        displayMode="document"
      />

      <FuelTypesSection
        data={visualData.sections.fuelTypes}
        bgImage={visualData.assets.fuelTypesBg}
        strictData
      />

      <EngineYearsSection brandName={visualData.model.name} data={visualData.sections.engineYears} strictData />

      <FaqSection data={visualData.sections.faq} strictData />

      <TrustCtaSection
        data={visualData.sections.trustCta}
        brandName={visualData.model.name}
        imageSrc={visualData.assets.ctaImage ?? visualData.assets.heroBg}
        displayMode="document"
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={visualData.model.name} />
      </Suspense>
    </>
  );
}
