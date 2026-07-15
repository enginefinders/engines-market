import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import FaqSection from "@/components/sections/FaqSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import VariantCommonProblemsSection from "@/components/sections/VariantCommonProblemsSection";
import VariantEngineGuideSection from "@/components/sections/VariantEngineGuideSection";
import VariantHeroSection from "@/components/sections/VariantHeroSection";
import VariantHistoryTimelineSection from "@/components/sections/VariantHistoryTimelineSection";
import VariantTrustCtaSection from "@/components/sections/VariantTrustCtaSection";
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

      <VariantHeroSection data={data.sections.hero} bgImage={mainImage} />

      <HowItWorksSection
        data={data.sections.howItWorks}
        bgImage={data.assets.howItWorksBg}
        sectionId="how-it-works"
        flush
      />

      <VariantHistoryTimelineSection data={data.sections.historyTimeline} vehicleImage={mainImage} />

      <VariantEngineGuideSection data={data.sections.engineGuide} />

      <VariantCommonProblemsSection data={data.sections.commonProblems} vehicleImage={mainImage} />

      <FaqSection data={data.sections.faq} strictData documentMode />

      <VariantTrustCtaSection
        data={data.sections.trustCta}
        brandName={data.variant.name}
        imageSrc={mainImage}
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={data.variant.name} />
      </Suspense>
    </>
  );
}
