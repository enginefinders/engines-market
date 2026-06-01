import type {
  CommonProblemsData,
  EngineCodesData,
  EngineSizesData,
  EngineTypesData,
  EngineYearsData,
  FaqSectionData,
  FuelTypesData,
  HeroSectionData,
  HowItWorksData,
  LiveMarketPricesData,
  ReviewsSectionData,
  TrustCtaData,
} from "@/types/brand";

export type ModelVariantCoverageSectionData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  subheading: string;
  groups?: {
    title: string;
    cardSlugs: string[];
  }[];
  ui?: {
    fromPriceLabel?: string;
    specsLabel?: string;
    rebuiltLabel?: string;
    yearsLabel?: string;
    yearsFallback?: string;
  };
  cards: {
    h3: string;
    slug: string;
    subtitle: string;
    priceRange: string;
    cta: string;
    engineCodes: string[];
    fuel: string;
    power: string;
    years?: string;
    image?: string;
  }[];
  directory: {
    label?: string;
    h3: string;
    intro: string;
    groups: {
      title: string;
      items: string[];
    }[];
  };
  closing?: string;
  engineGuide: {
    tag: string;
    h2: string;
    h3: string;
    families: {
      name: string;
      entries: {
        code: string;
        title: string;
        familyHeading?: string;
        history: string;
        fuel: string;
        size: string;
        power: string;
        years: string;
        image?: string;
        compatibleVariants: string[];
        commonFailures: string[];
        avgRebuiltPrice: string;
        cta: string;
      }[];
    }[];
    closing: string;
  };
};

export type ModelPageData = {
  brand: {
    name: string;
    slug: string;
    tone: string;
  };
  model: {
    name: string;
    slug: string;
    legacySlug?: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  assets: {
    mainImage?: string;
    smallImage?: string;
    heroBg: string;
    howItWorksBg: string;
    engineCodesBg?: string;
    engineTypesBg?: string;
    engineSizesBg?: string;
    fuelTypesBg?: string;
    ctaImage?: string;
  };
  structuredData?: Record<string, unknown>;
  sections: {
    hero: HeroSectionData;
    howItWorks: HowItWorksData;
    liveMarketPrices: LiveMarketPricesData;
    reviews?: ReviewsSectionData;
    variantCoverage: ModelVariantCoverageSectionData;
    engineCodes: EngineCodesData;
    commonProblems?: CommonProblemsData;
    engineTypes: EngineTypesData;
    engineSizes: EngineSizesData;
    fuelTypes: FuelTypesData;
    engineYears: EngineYearsData;
    faq: FaqSectionData;
    trustCta: TrustCtaData;
  };
};
