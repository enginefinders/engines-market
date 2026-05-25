import type {
  CommonProblemsData,
  FaqSectionData,
  HeroSectionData,
  HowItWorksData,
  TrustCtaData,
} from "@/types/brand";

export type VariantHistoryTimelineData = {
  tag: string;
  h2: string;
  intro: string;
  milestones: string[];
  specsLabel: string;
  specs: string[];
};

export type VariantEngineGuideData = {
  tag: string;
  h2: string;
  intro?: string;
  items: {
    code: string;
    title: string;
    specs: {
      label: string;
      value: string;
    }[];
    costs: {
      label: string;
      value: string;
    }[];
    commonFailure: string;
    cta: string;
    closing: string;
  }[];
  closing: string;
};

export type VariantPageData = {
  brand: {
    name: string;
    slug: string;
    tone: string;
  };
  model: {
    name: string;
    slug: string;
  };
  variant: {
    name: string;
    slug: string;
    storageSlug: string;
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
    ctaImage?: string;
  };
  structuredData?: Record<string, unknown>;
  sections: {
    hero: HeroSectionData;
    howItWorks: HowItWorksData;
    historyTimeline: VariantHistoryTimelineData;
    engineGuide: VariantEngineGuideData;
    commonProblems: CommonProblemsData;
    faq: FaqSectionData;
    trustCta: TrustCtaData;
  };
};
