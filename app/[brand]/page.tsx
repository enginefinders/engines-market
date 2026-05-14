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

function buildStructuredData(pageData: BrandPageData) {
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);

  if (pageData.structuredData) {
    return pageData.structuredData;
  }

  const siteUrl = "https://enginesmarket.co.uk";
  const canonical = `${siteUrl}${pageData.seo.canonical}`;

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
              item: siteUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `${pageData.brand.name} Engines`,
              item: canonical,
            },
          ],
        },
      },
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name: pageData.seo.title,
        description: pageData.seo.description,
        brand: {
          "@type": "Brand",
          name: pageData.brand.name,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: reviewsData.rating.value,
          ratingCount: reviewsData.rating.count,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: pageData.sections.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${item.answer} ${item.cta}`,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#models`,
        name: `${pageData.brand.name} Engine Models`,
        itemListElement: pageData.sections.models.cards.map((model, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: model.h3,
            url: `${siteUrl}/${pageData.brand.slug}/${model.slug}`,
            description: model.subtitle,
          },
        })),
      },
    ],
  };
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

  const structuredData = buildStructuredData(pageData);
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);
  const trustCtaImage =
    pageData.brand.slug === "land-rover"
      ? "/images/brands/land-rover/cta-image.webp"
      : pageData.sections.models.cards[0]?.image ?? pageData.assets.heroBg;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        data={pageData.sections.hero}
        bgImage={pageData.assets.heroBg}
        modelCards={pageData.sections.models.cards}
      />

      <HowItWorksSection
        data={pageData.sections.howItWorks}
        bgImage={pageData.assets.howItWorksBg}
      />

      <LiveMarketPricesSection data={pageData.sections.liveMarketPrices} />

      <ReviewsSection data={reviewsData} />

      <ModelsSection data={pageData.sections.models} brandSlug={pageData.brand.slug} />

      <EngineCodesSection data={pageData.sections.engineCodes} bgImage={pageData.assets.engineCodesBg} />

      <CommonProblemsSection data={pageData.sections.commonProblems} bgImage={pageData.assets.commonProblemsBg} />

      <EngineTypesSection data={pageData.sections.engineTypes} bgImage={pageData.assets.engineTypesBg} />

      <EngineSizesSection brandName={pageData.brand.name} data={pageData.sections.engineSizes} bgImage={pageData.assets.engineSizesBg} />

      <FuelTypesSection data={pageData.sections.fuelTypes} bgImage={pageData.assets.fuelTypesBg} />

      <EngineCodeDirectorySection data={pageData.sections.engineCodeDirectory} bgImage={pageData.assets.engineCodeDirectoryBg} />

      <EngineYearsSection brandName={pageData.brand.name} data={pageData.sections.engineYears} />

      <FaqSection data={pageData.sections.faq} />

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
