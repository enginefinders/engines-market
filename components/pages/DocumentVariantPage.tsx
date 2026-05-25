import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TrustCtaSection from "@/components/sections/TrustCtaSection";
import VariantCommonProblemsSection from "@/components/sections/VariantCommonProblemsSection";
import VariantEngineGuideSection from "@/components/sections/VariantEngineGuideSection";
import VariantHistoryTimelineSection from "@/components/sections/VariantHistoryTimelineSection";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import type { VariantPageData } from "@/types/variant";

type DocumentVariantPageProps = {
  data: VariantPageData;
};

export default function DocumentVariantPage({ data }: DocumentVariantPageProps) {
  const resolvedImages = resolveModelImagePaths({
    brandSlug: data.brand.slug,
    modelSlug: data.model.slug,
    modelName: data.model.name,
    configuredMainImage: data.assets.mainImage,
    configuredSmallImage: data.assets.smallImage,
    configuredHeroImage: data.assets.heroBg,
    configuredCtaImage: data.assets.ctaImage,
  });
  const mainImage = resolvedImages.resolvedMainImage;

  return (
    <>
      {data.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
        />
      ) : null}

      <HeroSection data={data.sections.hero} bgImage={mainImage} strictData />

      <HowItWorksSection
        data={data.sections.howItWorks}
        bgImage={data.assets.howItWorksBg}
        sectionId="how-it-works"
      />

      <VariantHistoryTimelineSection data={data.sections.historyTimeline} />

      <VariantEngineGuideSection data={data.sections.engineGuide} />

      <VariantCommonProblemsSection data={data.sections.commonProblems} />

      <FaqSection data={data.sections.faq} strictData />

      <TrustCtaSection
        data={data.sections.trustCta}
        brandName={data.variant.name}
        imageSrc={mainImage}
        displayMode="variant"
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={data.variant.name} />
      </Suspense>
    </>
  );
}
