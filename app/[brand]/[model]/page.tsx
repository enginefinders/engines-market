import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteCheckoutModal from "@/components/checkout/QuoteCheckoutModal";
import CommonProblemsSection from "@/components/sections/CommonProblemsSection";
import EngineCodesSection from "@/components/sections/EngineCodesSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import LiveMarketPricesSection from "@/components/sections/LiveMarketPricesSection";
import ModelsSection from "@/components/sections/ModelsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import TrustCtaSection from "@/components/sections/TrustCtaSection";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getBrandPageData, getBrandSlugs } from "@/lib/brandData";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import type {
  BrandPageData,
  CommonProblemsData,
  EngineCodesData,
  LiveMarketPricesData,
} from "@/types/brand";
import { notFound } from "next/navigation";

type ModelCard = BrandPageData["sections"]["models"]["cards"][number];

type ModelPageProps = {
  params: Promise<{
    brand: string;
    model: string;
  }>;
};

function findModel(
  pageData: BrandPageData,
  modelSlug: string,
) {
  return pageData.sections.models.cards.find((card) => card.slug === modelSlug) ?? null;
}

function matchesModelText(text: string, model: ModelCard) {
  const normalizedText = text.toLowerCase();
  const candidates = [
    model.h3,
    model.slug,
    model.slug.replace(/-/g, " "),
  ];

  return candidates.some((candidate) =>
    normalizedText.includes(candidate.toLowerCase()),
  );
}

function buildModelHeroData(pageData: BrandPageData, model: ModelCard) {
  const modelLabel = `${pageData.brand.name} ${model.h3}`;

  return {
    ...pageData.sections.hero,
    tag: `${pageData.brand.name} model guide`,
    h1: `${modelLabel} Engine Replacement - Compare UK Quotes`,
    subheading: `${model.subtitle} Compare rebuilt, reconditioned and used ${modelLabel} engines from trusted UK specialists. Typical quoted range: ${model.priceRange}.`,
    ctaLinkText: `Compare ${modelLabel} Engine Prices ->`,
    supportingText: `Get tailored ${modelLabel} engine quotes from Engine Market.`,
    form: {
      ...pageData.sections.hero.form,
      heading: `Find Your ${modelLabel} Engine`,
      subtitle: `Enter your registration number to compare ${modelLabel} engine options.`,
    },
  };
}

function buildModelLiveMarketData(
  pageData: BrandPageData,
  model: ModelCard,
) {
  const matchingEntries = pageData.sections.liveMarketPrices.feed.entries.filter((entry) =>
    matchesModelText(entry.Model, model),
  );

  if (!matchingEntries.length) {
    return null;
  }

  const feed = pageData.sections.liveMarketPrices.feed;

  return {
    ...pageData.sections.liveMarketPrices,
    h2: `${pageData.brand.name} ${model.h3} live market prices`,
    h3: `Recent ${pageData.brand.name} ${model.h3} engine enquiries from the Engine Market network.`,
    feed: {
      ...feed,
      entries: matchingEntries,
      rowsCount: matchingEntries.length,
      visibleRows: Math.min(feed.visibleRows, matchingEntries.length),
    },
  } satisfies LiveMarketPricesData;
}

function buildModelEngineCodesData(
  pageData: BrandPageData,
  model: ModelCard,
) {
  const groups = pageData.sections.engineCodes.groups
    .map((group) => ({
      ...group,
      engines: group.engines.filter((engine) =>
        matchesModelText(engine.compatibleModels, model),
      ),
    }))
    .filter((group) => group.engines.length > 0);

  if (!groups.length) {
    return null;
  }

  return {
    ...pageData.sections.engineCodes,
    h2: `${pageData.brand.name} ${model.h3} engine codes`,
    h3: `Relevant engine codes and quoted price ranges commonly matched to the ${pageData.brand.name} ${model.h3}.`,
    groups,
  } satisfies EngineCodesData;
}

function buildModelCommonProblemsData(
  pageData: BrandPageData,
  model: ModelCard,
) {
  const problems = pageData.sections.commonProblems.problems.filter((problem) =>
    matchesModelText(problem.affectedModels, model),
  );

  if (!problems.length) {
    return null;
  }

  return {
    ...pageData.sections.commonProblems,
    h2: `${pageData.brand.name} ${model.h3} engine problems`,
    h3: `Common issues owners report most often for the ${pageData.brand.name} ${model.h3}.`,
    problems,
  } satisfies CommonProblemsData;
}

function buildModelFaqData(pageData: BrandPageData, model: ModelCard) {
  return {
    ...pageData.sections.faq,
    h2: `${pageData.brand.name} ${model.h3} engine FAQs`,
    intro: `Answers to the most common questions about ${pageData.brand.name} ${model.h3} engine prices, fitment and replacement options.`,
  };
}

function buildRelatedModelsData(pageData: BrandPageData, currentModelSlug: string) {
  const cards = pageData.sections.models.cards.filter((card) => card.slug !== currentModelSlug);

  if (!cards.length) {
    return null;
  }

  return {
    ...pageData.sections.models,
    h2: `More ${pageData.brand.name} engine pages`,
    subheading: `Explore other ${pageData.brand.name} models while comparing engine options and quote ranges.`,
    cards,
  };
}

function buildStructuredData(pageData: BrandPageData, model: ModelCard) {
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);
  const siteUrl = "https://enginesmarket.co.uk";
  const canonical = `${siteUrl}/${pageData.brand.slug}/${model.slug}`;
  const name = `${pageData.brand.name} ${model.h3} Engine`;
  const description = `${model.subtitle} Compare rebuilt, reconditioned and used ${name} quotes from trusted UK specialists.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name,
        description,
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
              item: `${siteUrl}/${pageData.brand.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: model.h3,
              item: canonical,
            },
          ],
        },
      },
      {
        "@type": "Product",
        "@id": `${canonical}#product`,
        name,
        description,
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
    ],
  };
}

export async function generateStaticParams() {
  const brandSlugs = await getBrandSlugs();
  const pages = await Promise.all(
    brandSlugs.map(async (brand) => ({
      brand,
      pageData: await getBrandPageData(brand),
    })),
  );

  return pages.flatMap(({ brand, pageData }) =>
    pageData
      ? pageData.sections.models.cards.map((model) => ({
          brand,
          model: model.slug,
        }))
      : [],
  );
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const pageData = await getBrandPageData(brand);
  const modelCard = pageData ? findModel(pageData, model) : null;

  if (!pageData || !modelCard) {
    return {};
  }

  return {
    title: `${pageData.brand.name} ${modelCard.h3} Engine Replacement - Compare UK Quotes`,
    description: `${modelCard.subtitle} Compare rebuilt, reconditioned and used ${pageData.brand.name} ${modelCard.h3} engines from trusted UK specialists. Typical quoted range: ${modelCard.priceRange}.`,
    alternates: {
      canonical: `/${pageData.brand.slug}/${modelCard.slug}`,
    },
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { brand, model } = await params;
  const pageData = await getBrandPageData(brand);

  if (!pageData) {
    notFound();
  }

  const modelCard = findModel(pageData, model);

  if (!modelCard) {
    notFound();
  }

  const heroData = buildModelHeroData(pageData, modelCard);
  const structuredData = buildStructuredData(pageData, modelCard);
  const modelLiveMarketData = buildModelLiveMarketData(pageData, modelCard);
  const modelEngineCodesData = buildModelEngineCodesData(pageData, modelCard);
  const modelCommonProblemsData = buildModelCommonProblemsData(pageData, modelCard);
  const modelFaqData = buildModelFaqData(pageData, modelCard);
  const relatedModelsData = buildRelatedModelsData(pageData, modelCard.slug);
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroSection
        data={heroData}
        bgImage={pageData.assets.heroBg}
        modelCards={pageData.sections.models.cards}
      />

      <Section className="bg-white">
        <Container>
          <SectionHeader
            tag={`${pageData.brand.name} ${modelCard.h3}`}
            title="Model overview"
            subtitle={`Use this page to compare ${pageData.brand.name} ${modelCard.h3} engine pricing, common fitments and specialist quote options.`}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="surface-card-soft p-4">
              <p className="text-label text-green-700">Typical quote range</p>
              <p className="mt-2 text-2xl font-black text-[#061a33]">{modelCard.priceRange}</p>
              <p className="text-small mt-2 text-slate-600">{modelCard.subtitle}</p>
            </article>

            <article className="surface-card-soft p-4">
              <p className="text-label text-green-700">Page path</p>
              <p className="mt-2 text-lg font-black text-[#061a33]">/{pageData.brand.slug}/{modelCard.slug}</p>
              <p className="text-small mt-2 text-slate-600">Useful for sharing this model-specific engine page directly.</p>
            </article>

            <article className="surface-card-soft p-4">
              <p className="text-label text-green-700">Browse brand page</p>
              <a
                href={`/${pageData.brand.slug}`}
                className="mt-2 inline-flex text-lg font-black text-[#123d84] transition hover:text-green-700"
              >
                View all {pageData.brand.name} engine options
              </a>
              <p className="text-small mt-2 text-slate-600">Jump back to the full brand page to compare other models and engine families.</p>
            </article>
          </div>
        </Container>
      </Section>

      {modelLiveMarketData ? (
        <LiveMarketPricesSection data={modelLiveMarketData} />
      ) : null}

      <ReviewsSection data={reviewsData} />

      {modelEngineCodesData ? (
        <EngineCodesSection
          data={modelEngineCodesData}
          bgImage={pageData.assets.engineCodesBg}
        />
      ) : null}

      {modelCommonProblemsData ? (
        <CommonProblemsSection
          data={modelCommonProblemsData}
          bgImage={pageData.assets.commonProblemsBg}
        />
      ) : null}

      <FaqSection data={modelFaqData} />

      {relatedModelsData ? (
        <ModelsSection
          data={relatedModelsData}
          brandSlug={pageData.brand.slug}
        />
      ) : null}

      <TrustCtaSection
        data={pageData.sections.trustCta}
        brandName={`${pageData.brand.name} ${modelCard.h3}`}
        imageSrc={
          pageData.brand.slug === "land-rover"
            ? "/images/brands/land-rover/cta-image.webp"
            : modelCard.image || pageData.assets.heroBg
        }
      />

      <Suspense fallback={null}>
        <QuoteCheckoutModal brandName={`${pageData.brand.name} ${modelCard.h3}`} />
      </Suspense>
    </>
  );
}
