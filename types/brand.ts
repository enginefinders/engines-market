export type BrandPageData = {
  brand: {
    name: string;
    slug: string;
    tone: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  assets: {
    heroBg: string;
    howItWorksBg: string;
    commonProblemsBg?: string;
    engineCodesBg?: string;
    engineTypesBg?: string;
    engineSizesBg?: string;
    fuelTypesBg?: string;
    engineCodeDirectoryBg?: string;
  };
  structuredData?: Record<string, unknown>;
  sections: {
    hero: HeroSectionData;
    howItWorks: HowItWorksData;
    liveMarketPrices: LiveMarketPricesData;
    reviews: ReviewsSectionData;
    models: ModelsSectionData;
    engineCodes: EngineCodesData;
    commonProblems: CommonProblemsData;
    engineTypes: EngineTypesData;
    engineSizes: EngineSizesData;
    fuelTypes: FuelTypesData;
    engineCodeDirectory: EngineCodeDirectoryData;
    engineYears: EngineYearsData;
    faq: FaqSectionData;
    trustCta: TrustCtaData;
  };
};

export type HeroSectionData = {
  tag: string;
  h1: string;
  headingLines?: string[];
  subheading: string;
  trustBadges: string[];
  ctaLinkText: string;
  supportingText: string;
  ticker: string;
  imageAlt?: string;
  highlights?: {
    title: string;
    price: string;
    line1?: string;
    line2?: string;
    detail?: string;
    image?: string;
    imageAlt?: string;
  }[];
  mobileBar?: {
    brandText?: string;
    callLabel?: string;
    quoteLabel?: string;
  };
  registrationInput?: {
    label?: string;
    platePlaceholder?: string;
    countryCode?: string;
    countryLabel?: string;
  };
  form: {
    heading: string;
    subtitle: string;
    inputPlaceholder: string;
    buttonText: string;
    note: string;
  };
};

export type HowItWorksData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  cards: {
    number: number;
    icon: string;
    front: {
      h3: string;
      text: string;
    };
    back: {
      heading: string;
      text: string;
      bullets: string[];
    };
  }[];
  tagline: string;
  ui?: {
    stepLabel?: string;
    desktopClosedLabel?: string;
    desktopOpenLabel?: string;
    mobileOpenLabel?: string;
    mobileCloseLabel?: string;
    footerNote?: string;
    mobileTrustItems?: string[];
  };
};
export type LiveMarketPricesData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  h3: string;
  imageAlt?: string;
  introBullets: {
    label: string;
    text: string;
  }[];
  cta: {
    heading: string;
    text: string;
    buttonText: string;
    note: string;
  };
  badges: string[];
  filterTabs?: {
    key: string;
    label: string;
    matchers: string[];
  }[];
  ui?: {
    showingSingleLabel?: string;
    showingPluralLabel?: string;
    acrossAllLabel?: string;
    noEntriesLabel?: string;
    updatedLabel?: string;
    ctaLabel?: string;
  };
  feed: {
    isDynamic: boolean;
    rowsCount: number;
    columns: string[];
    timestampLabel: string;
    refreshLabel: string;
    density: "standard" | "premium";
    visibleRows: number;
    entries: LiveMarketPriceEntry[];
  };
};

export type LiveMarketPriceEntry = {
  Year: string;
  Model: string;
  "Engine Code": string;
  Fuel: string;
  "Avg. Quoted Price": string;
  "Reported Issue": string;
};

export type ReviewsSectionData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  rating: {
    value: number;
    count: number;
    summary: string;
    basedOn: string;
  };
  sources?: string[];
  reviews: {
    text: string;
    name: string;
    location: string;
  }[];
  leaveReviewCta: {
    text: string;
    linkText: string;
  };
  ui?: {
    leaveReviewTitle?: string;
    reviewAriaLabelPrefix?: string;
  };
};

export type ModelsSectionData = {
  tag: string;
  h2: string;
  subheading: string;
  cards: {
    h3: string;
    slug: string;
    subtitle: string;
    priceRange: string;
    cta: string;
    image: string;
  }[];
};

export type EngineCodesData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  h3: string;
  closingLine?: string;
  closingAction?: {
    title?: string;
    buttonText?: string;
  };
  ui?: {
    summaryPriceLabel?: string;
    exampleImageLabel?: string;
    historyLabel?: string;
    variantsLabel?: string;
    specsTitle?: string;
    fuelLabel?: string;
    sizeLabel?: string;
    powerLabel?: string;
    yearsLabel?: string;
    failuresTitle?: string;
    supplyLabel?: string;
  };
  filters: string[];
  groups: {
    name: string;
    era: string;
    failureNote: string;
    engines: {
      code: string;
      title?: string;
      familyHeading?: string;
      fuel: string;
      size: string;
      power: string;
      compatibleModels: string;
      avgRebuiltPrice: string;
      cta: string;
      image?: string;
    }[];
  }[];
};

export type CommonProblemsData = {
  tag: string;
  h2: string;
  h3: string;
  problems: {
    group: string;
    h4: string;
    image?: string;
    affectedModels: string;
    typicalFailureMileage: string;
    rootCause: string;
    repairOptions?: {
      tier: string;
      dealerPrice: string;
      specialistPrice: string;
      whatItInvolves: string;
      longevity: string;
    }[];
    recommendation: string;
    cta: string;
  }[];
  emptyState?: {
    title: string;
    description: string;
    placeholder?: string;
  } | null;
  finalCta: {
    h4: string;
    paragraph: string;
    buttonText: string;
    disclaimer: string;
  };
};

export type EngineTypesData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  intro: string;
  types: {
    title: string;
    description: string;
    frontDescription?: string;
    frontDisclaimer?: string;
    backDescription?: string;
    backBullets?: string[];
    priceRange: string;
    cta: string;
  }[];
  closing: string;
  closingCard?: {
    label?: string;
    title?: string;
    buttonText?: string;
  };
  ui?: {
    priceLabel?: string;
    frontActionLabel?: string;
    backActionLabel?: string;
  };
};

export type EngineSizesData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  intro: string;
  groups: {
    title: string;
    items: {
      title: string;
      description: string;
      engineCodes?: string[];
      compatibleModels?: string[];
      productionYears?: string;
      commonFailurePoints?: string[];
      cta: string;
    }[];
  }[];
  closing: string;
  ui?: {
    swapLabel?: string;
    engineCodesLabel?: string;
    compatibleModelsLabel?: string;
    productionYearsLabel?: string;
    warningLabel?: string;
    warningTitle?: string;
    helperLabel?: string;
    helperTitle?: string;
    helperButtonText?: string;
  };
};

export type FuelTypesData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  intro: string;
  items: {
    title: string;
    description: string;
    descriptor?: string;
    familiesLabel?: string;
    foundInLabel?: string;
    knownForLabel?: string;
    modelsLabel?: string;
    notesLabel?: string;
    families?: string[];
    foundIn?: string[];
    knownFor?: string[];
    typicalModels?: string[];
    importantNotes?: string[];
    cta: string;
  }[];
  closing: string;
  ui?: {
    swapLabel?: string;
    familiesLabel?: string;
    foundInLabel?: string;
    knownForLabel?: string;
    modelsLabel?: string;
    notesLabel?: string;
    closingButtonText?: string;
    emptyStateTitle?: string;
    emptyStateDescription?: string;
  };
};

export type EngineCodeDirectoryData = {
  tag: string;
  h2: string;
  intro: string;
  families: {
    name: string;
    entries: {
      title: string;
      image?: string;
      description: string;
      cta: string;
    }[];
  }[];
  closing: string;
  directory: {
    h3: string;
    label: string;
    intro: string;
    codes: {
      code: string;
      fuel: string;
    }[];
  };
};

export type EngineYearsData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  intro: string;
  jumpLabel: string;
  years: {
    year: string;
    preview: string;
    description: string;
    keyChanges?: string[];
    mainEngines?: string[];
    popularModels?: string[];
    knownFor?: string[];
    engineCodesCovered?: string[];
    ticker?: string;
    enquiries?: string[];
    badges?: {
      label: string;
      tone?: "accent" | "muted";
    }[];
    ctaText?: string;
    cta: string;
  }[];
  closing: string;
  summaryCta?: {
    label?: string;
    title?: string;
    buttonText?: string;
  };
  ui?: {
    keyChangesLabel?: string;
    knownForLabel?: string;
    mainEnginesLabel?: string;
    popularModelsLabel?: string;
    engineCodesLabel?: string;
    enquiriesLabel?: string;
  };
};

export type FaqSectionData = {
  tag: string;
  h2: string;
  headingLines?: string[];
  intro: string;
  defaultOpenIndex?: number;
  disclaimer?: string;
  items: {
    question: string;
    answer: string;
    keyPoints?: string[];
    comparisonTable?: {
      headers: string[];
      rows: string[][];
    };
    cta: string;
    warning?: string;
  }[];
  ui?: {
    questionLabelPrefix?: string;
    keyPointsLabel?: string;
    comparisonTableLabel?: string;
    disclaimerLabel?: string;
    warningTitle?: string;
  };
};

export type TrustCtaData = {
  tag: string;
  h2: string;
  intro: string;
  points: {
    title: string;
    description: string;
  }[];
  finalText: string;
  buttonText: string;
  imageAlt?: string;
  secondaryAction?: {
    text?: string;
    href?: string;
  };
  ui?: {
    pointLabel?: string;
    showPointLabel?: boolean;
    stripLabel?: string;
    showStripLabel?: boolean;
    stripTitle?: string;
    stripDescription?: string;
    trustBullets?: string[];
    imageBadgeLabel?: string;
    imageBadgeTitle?: string;
    imageBadgeText?: string;
    showSecondaryAction?: boolean;
  };
};
