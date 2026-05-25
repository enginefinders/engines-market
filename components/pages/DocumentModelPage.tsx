import { Suspense } from "react";
import Link from "next/link";
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
import Container from "@/components/ui/Container";
import { getBrandPageData } from "@/lib/brandData";
import { getBrandHref, getModelHref } from "@/lib/modelRoutes";
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

export default async function DocumentModelPage({
  data,
}: DocumentModelPageProps) {
  const brandPageData = await getBrandPageData(data.brand.slug);
  const visualData = applyModelPageVisualPlaceholders(data);
  const structuredData = visualData.structuredData;
  const heroCards = toHeroCards(visualData);
  const reviewsData = buildStaticReviewsSection(visualData.model.name);
  const brandHref = getBrandHref(visualData.brand.slug);
  const relatedModels = (brandPageData?.sections.models.cards ?? []).filter(
    (card) => getModelHref(visualData.brand.slug, card) !== getModelHref(visualData.brand.slug, visualData.model),
  );

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
        bgImage={visualData.assets.heroBg}
        modelCards={heroCards}
        strictData
      />

      <section className="border-y border-slate-200 bg-white py-4">
        <Container className="max-w-[1180px]">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-[#15803d]">
              Home
            </Link>
            <span>/</span>
            <Link href={brandHref} className="transition hover:text-[#15803d]">
              {visualData.brand.name} Engines
            </Link>
            <span>/</span>
            <span className="text-[#0d1b2e]">{visualData.model.name}</span>
          </nav>

          {relatedModels.length ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#15803d]">
                More {visualData.brand.name} model pages
              </span>
              {relatedModels.map((card) => (
                <Link
                  key={card.slug}
                  href={getModelHref(visualData.brand.slug, card)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-semibold text-[#0d1b2e] transition hover:border-[#15803d] hover:text-[#15803d]"
                >
                  {card.h3}
                </Link>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <HowItWorksSection
        data={visualData.sections.howItWorks}
        bgImage={visualData.assets.howItWorksBg}
        sectionId="how-it-works"
      />

      <LiveMarketPricesSection
        data={visualData.sections.liveMarketPrices}
        modelCards={heroCards}
        imageSrc={visualData.assets.heroBg}
        displayMode="document"
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
