import { getBrandHref, getModelHref } from "@/lib/modelRoutes";
import { SITE_URL } from "@/lib/site";
import { buildStaticReviewsSection } from "@/lib/staticReviews";
import type { BrandPageData, ModelsSectionData } from "@/types/brand";
import type { ModelPageData } from "@/types/model";

const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const HOME_URL = `${SITE_URL}/`;

const ORGANIZATION_NODE = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Engines Market",
  url: HOME_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-20-3488-4649",
    contactType: "customer service",
    areaServed: "UK",
    availableLanguage: "en-GB",
  },
  sameAs: [
    "https://www.facebook.com/enginesmarket",
    "https://x.com/EnginesMarket",
    "https://www.instagram.com/enginesmarketuk/",
    "https://www.tiktok.com/@enginesmarket",
  ],
} as const;

function toAbsoluteUrl(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function buildWebsiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: HOME_URL,
    name: "Engines Market",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function buildFaqEntities(items: { question: string; answer: string; cta: string }[]) {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: `${item.answer} ${item.cta}`.trim(),
    },
  }));
}

function buildBreadcrumbNode(canonical: string, crumbs: Array<{ name: string; item: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

function stripBrandPrefix(modelName: string, brandName: string) {
  const pattern = new RegExp(`^${brandName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+`, "i");
  return modelName.replace(pattern, "").trim();
}

export function buildBrandStructuredData(
  pageData: BrandPageData,
  modelCards: ModelsSectionData["cards"],
) {
  const canonical = toAbsoluteUrl(pageData.seo.canonical);
  const reviewsData = buildStaticReviewsSection(pageData.brand.name);

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteNode(),
      ORGANIZATION_NODE,
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageData.seo.title,
        description: pageData.seo.description,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: {
          "@type": "Thing",
          name: `${pageData.brand.name} engine replacement`,
        },
        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${canonical}#product`,
        },
      },
      buildBreadcrumbNode(canonical, [
        { name: "Home", item: HOME_URL },
        { name: `${pageData.brand.name} Engines`, item: canonical },
      ]),
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
        mainEntity: buildFaqEntities(pageData.sections.faq.items),
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#models`,
        name: `${pageData.brand.name} Engine Models`,
        numberOfItems: modelCards.length,
        itemListElement: modelCards.map((model, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: model.h3,
            url: toAbsoluteUrl(getModelHref(pageData.brand.slug, model)),
            description: model.subtitle,
          },
        })),
      },
    ],
  };
}

export function buildModelStructuredData(pageData: ModelPageData) {
  const canonical = toAbsoluteUrl(pageData.seo.canonical);
  const reviewsData = buildStaticReviewsSection(pageData.model.name);
  const modelLabel = stripBrandPrefix(pageData.model.name, pageData.brand.name) || pageData.model.name;
  const brandUrl = toAbsoluteUrl(getBrandHref(pageData.brand.slug));
  const variantCards = pageData.sections.variantCoverage.cards;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteNode(),
      ORGANIZATION_NODE,
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageData.seo.title,
        description: pageData.seo.description,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: [
          {
            "@type": "Car",
            name: pageData.model.name,
          },
          {
            "@type": "Service",
            name: `${pageData.model.name} Engine Replacement`,
          },
        ],
        breadcrumb: {
          "@id": `${canonical}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${canonical}#service`,
        },
      },
      buildBreadcrumbNode(canonical, [
        { name: "Home", item: HOME_URL },
        { name: pageData.brand.name, item: brandUrl },
        { name: modelLabel, item: canonical },
      ]),
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: pageData.seo.title,
        url: canonical,
        description: pageData.seo.description,
        serviceType: [
          `${pageData.model.name} Engine Replacement`,
          `Reconditioned ${pageData.model.name} Engines`,
          `Used ${pageData.model.name} Engines`,
          `${pageData.model.name} Engine Supply and Fit`,
          `${pageData.model.name} Engine Price Comparison`,
        ],
        provider: {
          "@id": ORGANIZATION_ID,
        },
        areaServed: {
          "@type": "Country",
          name: "United Kingdom",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: reviewsData.rating.value,
          ratingCount: reviewsData.rating.count,
        },
        brand: {
          "@type": "Brand",
          name: pageData.brand.name,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        mainEntity: buildFaqEntities(pageData.sections.faq.items),
      },
      {
        "@type": "ItemList",
        "@id": `${canonical}#engine-options`,
        name: `${pageData.model.name} Available Engine Options`,
        numberOfItems: variantCards.length,
        itemListElement: variantCards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: card.h3,
            description: `${card.subtitle}. ${card.cta}`.trim(),
          },
        })),
      },
    ],
  };
}
