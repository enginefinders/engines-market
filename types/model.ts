import type {
  EngineCodesData,
  EngineSizesData,
  EngineTypesData,
  EngineYearsData,
  FaqSectionData,
  FuelTypesData,
  HeroSectionData,
  LiveMarketPricesData,
  TrustCtaData,
} from "@/types/brand";

export type ModelVariantCoverageSectionData = {
  tag: string;
  h2: string;
  subheading: string;
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
    h3: string;
    intro: string;
    groups: {
      title: string;
      items: string[];
    }[];
  };
  engineGuide: {
    tag: string;
    h2: string;
    h3: string;
    families: {
      name: string;
      entries: {
        code: string;
        title: string;
        history: string;
        fuel: string;
        size: string;
        power: string;
        years: string;
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
    heroBg: string;
    engineCodesBg?: string;
    engineTypesBg?: string;
    engineSizesBg?: string;
    fuelTypesBg?: string;
    ctaImage?: string;
  };
  structuredData?: Record<string, unknown>;
  sections: {
    hero: HeroSectionData;
    liveMarketPrices: LiveMarketPricesData;
    variantCoverage: ModelVariantCoverageSectionData;
    engineCodes: EngineCodesData;
    engineTypes: EngineTypesData;
    engineSizes: EngineSizesData;
    fuelTypes: FuelTypesData;
    engineYears: EngineYearsData;
    faq: FaqSectionData;
    trustCta: TrustCtaData;
  };
};
