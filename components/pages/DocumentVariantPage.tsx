import FaqSection from "@/components/sections/FaqSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import VariantCommonProblemsSection from "@/components/sections/VariantCommonProblemsSection";
import VariantEngineGuideSection from "@/components/sections/VariantEngineGuideSection";
import VariantHeroSection from "@/components/sections/VariantHeroSection";
import VariantHistoryTimelineSection from "@/components/sections/VariantHistoryTimelineSection";
import VariantTrustCtaSection from "@/components/sections/VariantTrustCtaSection";
import imageManifest from "@/lib/image-manifest.json";
import { resolveModelImagePaths } from "@/lib/modelImageAssets";
import { resolveVariantArtwork } from "@/lib/variantImageAssets";
import type { VariantPageData } from "@/types/variant";

type DocumentVariantPageProps = {
  data: VariantPageData;
};

const manifest = imageManifest as Record<string, number>;

function assetExists(assetPath?: string | null) {
  if (!assetPath) {
    return false;
  }

  return Boolean(manifest[assetPath]);
}

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
  const heroImage =
    [mainImage, resolvedImages.resolvedSmallImage, data.assets.heroBg, data.assets.mainImage].find(assetExists)
    ?? data.assets.heroBg
    ?? data.assets.mainImage
    ?? mainImage;
  const ctaImage =
    [mainImage, resolvedImages.resolvedSmallImage, data.assets.ctaImage, heroImage].find(assetExists)
    ?? data.assets.ctaImage
    ?? heroImage;
  const variantHistoryImage =
    resolveVariantArtwork({
      brandSlug: data.brand.slug,
      brandName: data.brand.name,
      modelSlug: data.model.slug,
      modelName: data.model.name,
      variantSlug: data.variant.slug,
      variantName: data.variant.name,
    }) || heroImage;

  return (
    <>
      {data.structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
        />
      ) : null}

      <VariantHeroSection
        data={data.sections.hero}
        backgroundArtwork={heroImage}
        vehicleImage={mainImage || heroImage}
      />

      <HowItWorksSection
        data={data.sections.howItWorks}
        bgImage={data.assets.howItWorksBg}
        sectionId="how-it-works"
        variantLayout
      />

      <VariantHistoryTimelineSection
        data={data.sections.historyTimeline}
        vehicleImage={variantHistoryImage}
        mobileVehicleImage={variantHistoryImage}
      />

      <VariantEngineGuideSection data={data.sections.engineGuide} />

      <VariantCommonProblemsSection data={data.sections.commonProblems} vehicleImage={mainImage} />

      <FaqSection data={data.sections.faq} strictData documentMode />

      <VariantTrustCtaSection
        data={data.sections.trustCta}
        brandName={data.variant.name}
        imageSrc={ctaImage}
      />
    </>
  );
}
