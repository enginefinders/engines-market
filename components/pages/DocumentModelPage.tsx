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
import { SITE_URL } from "@/lib/site";
import type { ModelPageData } from "@/types/model";

function buildStructuredData(pageData: ModelPageData) {
  const canonical = `${SITE_URL}${pageData.seo.canonical}`;

  if (pageData.structuredData) {
    return pageData.structuredData;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: pageData.seo.title,
        description: pageData.seo.description,
        url: canonical,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: pageData.brand.name,
              item: `${SITE_URL}/${pageData.brand.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: pageData.model.name,
              item: canonical,
            },
          ],
        },
      },
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: pageData.seo.title,
        description: pageData.seo.description,
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        provider: {
          "@type": "Organization",
          name: "Engines Market",
          url: SITE_URL,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#variants`,
        name: `${pageData.model.name} engine replacement variants`,
        itemListElement: pageData.sections.variantCoverage.cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: card.h3,
            description: `${card.subtitle}. Typical rebuilt price range: ${card.priceRange}.`,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: pageData.sections.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${item.answer} ${item.cta}`.trim(),
          },
        })),
      },
    ],
  };
}

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
  const structuredData = buildStructuredData(data);
  const heroCards = toHeroCards(data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        data={data.sections.hero}
        bgImage={data.assets.heroBg}
        modelCards={heroCards}
      />

      <HowItWorksSection
        data={data.sections.howItWorks}
        bgImage={data.assets.howItWorksBg}
      />

      <LiveMarketPricesSection
        data={data.sections.liveMarketPrices}
        modelCards={heroCards}
        imageSrc={data.assets.heroBg}
      />

      <ReviewsSection data={data.sections.reviews} useDataHeading />

      <VariantCoverageSection data={data.sections.variantCoverage} />

      <ModelEngineCodesSection
        data={data.sections.engineCodes}
        guide={data.sections.variantCoverage.engineGuide}
        modelName={data.model.name}
      />

      {data.sections.commonProblems ? (
        <CommonProblemsSection data={data.sections.commonProblems} />
      ) : null}

      <EngineTypesSection data={data.sections.engineTypes} dynamicBrandCta />

      <EngineSizesSection
        brandName={data.model.name}
        data={data.sections.engineSizes}
        bgImage={data.assets.engineSizesBg}
        dynamicBrandLabel
      />

      <FuelTypesSection
        data={data.sections.fuelTypes}
        bgImage={data.assets.fuelTypesBg}
      />

      <EngineYearsSection brandName={data.model.name} data={data.sections.engineYears} />

      <FaqSection data={data.sections.faq} />

      <TrustCtaSection
        data={data.sections.trustCta}
        brandName={data.model.name}
        imageSrc={data.assets.ctaImage ?? data.assets.heroBg}
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={data.model.name} />
      </Suspense>
    </>
  );
}
