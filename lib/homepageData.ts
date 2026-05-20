export type HomeHeroData = {
  tag: string;
  headingLead: string;
  headingAccent: string;
  subheading: string;
  trustBadges: string[];
  formPlaceholder: string;
  formButtonText: string;
  gdprNote: string;
  subCopy: string;
  tickerItems: string[];
};

export type HomeHowItWorksStep = {
  number: number;
  icon: "registration" | "quote" | "shield";
  frontTitle: string;
  frontBody: string;
  backTitle: string;
  backBody: string;
  bullets: string[];
};

export type HomeLiveFeedRow = {
  brand: string;
  model: string;
  years: string;
  price: string;
  issue: string;
  engineCode: string;
  fuel: string;
};

export type HomeEngineTypeCard = {
  id: string;
  label: string;
  title: string;
  price: string;
  summary: string;
  cta: string;
  icon: "used" | "reconditioned" | "rebuilt" | "remanufactured" | "supply-fit" | "refurbished";
  backHeader: string;
  details: {
    label: string;
    value: string;
  }[];
  closing: string;
  backCta: string;
};

export const homeHeroData: HomeHeroData = {
  tag: "ENGINE REPLACEMENT MARKETPLACE",
  headingLead: "Engine Replacement Cost UK",
  headingAccent: "Compare Prices from Vetted Specialists",
  subheading:
    "Reconditioned, rebuilt and used replacement engines - with 12-24 month warranty and supply & fit available UK-wide.",
  trustBadges: [
    "Supply & Fit Available",
    "12-24 Month Warranty",
    "Nationwide UK Delivery",
    "100+ Vetted Specialists",
  ],
  formPlaceholder: "Enter your reg - e.g. AB12 CDE",
  formButtonText: "Get Free Engine Quotes",
  gdprNote:
    "Your details are secure. No spam - genuine quotes from vetted UK engine specialists only.",
  subCopy:
    "Covering 8,000+ engine codes across 40+ makes - from BMW and Land Rover to Ford and Vauxhall.",
  tickerItems: [
    "Instant engine replacement quote - 100% free, no obligation quotes",
    "Engine replacement near me - UK-wide specialist network",
    "Compare reconditioned, rebuilt & used engine prices",
    "Supply & fit available - parts and labour from vetted specialists",
  ],
};

export const homeHowItWorksSteps: HomeHowItWorksStep[] = [
  {
    number: 1,
    icon: "registration",
    frontTitle: "Enter Your Registration",
    frontBody:
      "Your reg identifies your exact engine, model, fuel type and variant via DVLA - in seconds. Free.",
    backTitle: "Your Car, Precisely Identified",
    backBody:
      "EnginesMarket cross-references your registration against the DVLA database - pulling exact engine code, fuel type, variant and year. No guesswork, no manual input.",
    bullets: [
      "Exact engine code matched - not just the model name",
      "Fuel type, engine size and variant confirmed",
      "Works across 8,000+ engine codes and 40+ makes",
      "No paperwork. 100% free.",
    ],
  },
  {
    number: 2,
    icon: "quote",
    frontTitle: "Compare Prices from UK Specialists",
    frontBody:
      "Your verified details go to matched UK suppliers. Same-day quotes with full price, warranty and fitting breakdown - no obligation.",
    backTitle: "Quotes You Can Compare, Not Just Collect",
    backBody:
      "Up to 10 matched suppliers receive your verified vehicle details. Each returns a structured quote - not a ballpark figure.",
    bullets: [
      "Price, warranty length and delivery estimate in every quote",
      "Supply & fit or supply-only - your choice",
      "Suppliers matched by engine code and location",
      "No sales calls unless you approve contact",
    ],
  },
  {
    number: 3,
    icon: "shield",
    frontTitle: "Choose the Best Deal & Save",
    frontBody:
      "Compare supplier ratings, warranty terms and price. Pick the right specialist - then deal directly with them.",
    backTitle: "Your Decision. Your Control.",
    backBody:
      "You choose which supplier to proceed with. EnginesMarket facilitates the comparison - we don't add margin to your quote.",
    bullets: [
      "Real customer reviews per supplier",
      "Warranty: minimum 12 months, up to 24 months on rebuilt units",
      "Transparent terms - fitting, collection and aftercare shown",
      "No commitment until you contact your chosen specialist",
    ],
  },
];

export const homeEngineTypeCards: HomeEngineTypeCard[] = [
  {
    id: "used",
    label: "USED ENGINES",
    title: "Used Replacement Engines",
    price: "Avg rebuilt engine: £800 - £2,800 (supply only)",
    summary:
      "The most affordable route - take-out units sourced from donor vehicles, compression-tested and mileage-verified.",
    cta: "Get used engine quotes",
    icon: "used",
    backHeader: "Best for: Budget-priority buyers or vehicles needing a fast turnaround",
    details: [
      { label: "Condition", value: "Tested take-out from a donor vehicle" },
      { label: "Warranty", value: "Short warranty typically included - varies by supplier" },
      { label: "Best suited to", value: "Older vehicles, lower-value cars, fast-return situations" },
      { label: "Avoid if", value: "You plan to keep the vehicle 3+ years or it's a high-mileage donor" },
      { label: "Typical saving vs new", value: "70-85%" },
    ],
    closing:
      "Widely available across all major UK makes. Common diesel units (e.g. 2.0 TDI, 1.6 CDTi, 2.2 CDTI) are the easiest to source.",
    backCta: "Compare used engine prices from vetted UK specialists",
  },
  {
    id: "reconditioned",
    label: "RECONDITIONED ENGINES",
    title: "Reconditioned Engines",
    price: "Avg rebuilt engine: £1,200 - £3,800 (supply only)",
    summary:
      "Stripped, cleaned and rebuilt with OEM-spec gaskets, seals and bearings - the most popular choice in the UK market.",
    cta: "Compare reconditioned engine prices",
    icon: "reconditioned",
    backHeader: "Best for: Owners who want factory reliability at 40-60% of main dealer cost",
    details: [
      { label: "What's replaced", value: "All gaskets, seals, bearings, timing components" },
      { label: "What's retained", value: "Original block and major castings - inspected and approved" },
      { label: "Warranty", value: "12-24 months unlimited mileage (standard through EM network)" },
      { label: "Best suited to", value: "Most vehicles - the default recommendation for mid-range budgets" },
      { label: "Typical saving vs new", value: "50-65%" },
    ],
    closing:
      "Many reconditioned units for known-failure engines (e.g. Ford EcoBoost, Land Rover Ingenium, BMW N47) include upgraded timing components that address the original factory weakness.",
    backCta: "Get reconditioned engine quotes from vetted UK specialists",
  },
  {
    id: "rebuilt",
    label: "REBUILT ENGINES",
    title: "Rebuilt Engines",
    price: "Avg rebuilt engine: £2,500 - £5,500 (supply only)",
    summary:
      "Fully disassembled, every wearing surface inspected, machined or replaced - recommended after catastrophic failure.",
    cta: "Get rebuilt engine quotes",
    icon: "rebuilt",
    backHeader: "Best for: Post-failure vehicles or owners keeping the car long-term",
    details: [
      { label: "What's replaced", value: "Every wearing surface - machined or replaced to spec" },
      { label: "Failure upgrades", value: "Known weak points addressed (tensioners, bearings, oil pump)" },
      { label: "Bench testing", value: "Yes - pressure tested before dispatch" },
      { label: "Warranty", value: "Minimum 12 months, often 24 months" },
      { label: "Best suited to", value: "Post-seizure, post-timing chain failure, high-performance variants" },
      { label: "Typical saving vs new", value: "40-55%" },
    ],
    closing:
      "Rebuilt engines from the EM network are the recommended option after catastrophic engine failure - timing chain snap, spun bearing, seizure - where a used unit carries too much risk.",
    backCta: "Get rebuilt engine quotes from vetted UK specialists",
  },
  {
    id: "remanufactured",
    label: "REMANUFACTURED ENGINES",
    title: "Remanufactured Engines",
    price: "Avg rebuilt engine: £3,000 - £6,500 (supply only)",
    summary:
      "Every surface machined to OEM tolerances, every component replaced - the closest available to a factory-new unit.",
    cta: "Compare remanufactured engine costs",
    icon: "remanufactured",
    backHeader: "Best for: Late-model, higher-value vehicles where resale and performance matter",
    details: [
      { label: "Standard", value: "OEM tolerances - factory specification throughout" },
      { label: "Documentation", value: "Full build documentation included" },
      { label: "Warranty", value: "Extended options available - up to 36 months" },
      { label: "Best suited to", value: "High-value vehicles, newer models, performance variants" },
      { label: "vs. new OEM engine", value: "Typically 50-65% cheaper than a manufacturer-supplied crate engine" },
      { label: "Typical saving vs new", value: "50-65%" },
    ],
    closing:
      "New OEM crate engines from premium manufacturers frequently exceed £8,000-£14,000. Remanufactured units deliver equivalent specification at a fraction of that cost.",
    backCta: "Compare remanufactured engine prices from vetted UK specialists",
  },
  {
    id: "supply-fit",
    label: "SUPPLY & FIT",
    title: "Engine Supply & Fit",
    price: "Fitting: £500 - £1,500 added to engine cost (varies by make, model and location)",
    summary:
      "Engine delivered and professionally installed by a vetted UK specialist - including removal, fitting, fluids and workmanship warranty.",
    cta: "Find supply & fit engine deals",
    icon: "supply-fit",
    backHeader: "Best for: Anyone who wants a single, complete solution - engine + labour",
    details: [
      { label: "What's included", value: "Removal of old unit, fit, new fluids, oil filter, workmanship warranty" },
      { label: "Recovery service", value: "Available if vehicle is currently off the road" },
      { label: "Turnaround", value: "Typically 3-5 working days for most 4-cylinder engines" },
      { label: "Supply-only option", value: "Available - your own garage can fit if preferred" },
      { label: "Warranty", value: "Engine warranty + separate fitting warranty from specialist" },
    ],
    closing:
      "Supply & fit pricing through the EM network is based on vetted specialist labour rates - typically 30-45% below main dealer fitting charges for the same work.",
    backCta: "Get supply & fit engine quotes from vetted UK specialists",
  },
  {
    id: "refurbished",
    label: "REFURBISHED ENGINES",
    title: "Refurbished Engines",
    price: "Avg rebuilt engine: £900 - £2,400 (supply only)",
    summary:
      "Cleaned, bench-tested and passed on core checks - compression, leak-down and oil pressure - without a full strip-down rebuild.",
    cta: "View refurbished engine options",
    icon: "refurbished",
    backHeader: "Best for: Older or lower-value vehicles where a full rebuild isn't economical",
    details: [
      { label: "What's checked", value: "Compression, leak-down, oil pressure - all passed" },
      { label: "What's not done", value: "Full strip-down - not a complete rebuild" },
      { label: "Availability", value: "Faster than a full recon - less workshop time required" },
      { label: "Best suited to", value: "Pre-2012 vehicles, naturally aspirated engines, lower-value cars" },
      { label: "Avoid if", value: "The engine has suffered a known design-failure (e.g. timing chain issues)" },
      { label: "Typical saving vs recon", value: "20-35%" },
    ],
    closing:
      "Refurbished units sit between used and reconditioned in both cost and scope. The right choice when a used unit feels too risky but a full recon isn't warranted by the vehicle's value.",
    backCta: "Compare refurbished engine prices from vetted UK specialists",
  },
];

export const homeLiveFeedPinnedBrands = ["BMW", "Mercedes", "Land Rover", "Jaguar"];

export const homeLiveFeedRows: HomeLiveFeedRow[] = [
  { brand: "BMW", model: "BMW 3 Series (F30) 320d", years: "2012-2019", price: "£2,400 - £3,600", issue: "Timing Chain Failure", engineCode: "N47D20C", fuel: "Diesel 2.0L" },
  { brand: "BMW", model: "BMW 5 Series (F10) 520d", years: "2010-2017", price: "£2,600 - £3,800", issue: "Timing Chain & Swirl Flap", engineCode: "N47D20C", fuel: "Diesel 2.0L" },
  { brand: "BMW", model: "BMW 1 Series (F20) 118d", years: "2011-2018", price: "£2,200 - £3,200", issue: "Timing Chain Failure", engineCode: "N47D20A", fuel: "Diesel 2.0L" },
  { brand: "BMW", model: "BMW X5 (F15) 25d / 30d", years: "2013-2018", price: "£3,200 - £4,800", issue: "Timing Chain & Oil Leak", engineCode: "N47/B47", fuel: "Diesel 2.0-3.0L" },
  { brand: "BMW", model: "BMW 3 Series (E90) 318d", years: "2005-2012", price: "£1,900 - £2,800", issue: "Timing Chain Failure", engineCode: "N47D20A", fuel: "Diesel 2.0L" },
  { brand: "BMW", model: "BMW X3 (G01) 20d", years: "2017-2022", price: "£2,800 - £4,200", issue: "Timing Chain & EGR Failure", engineCode: "B47D20A", fuel: "Diesel 2.0L" },
  { brand: "BMW", model: "BMW 4 Series (F32) 420d", years: "2013-2020", price: "£2,400 - £3,600", issue: "Timing Chain Failure", engineCode: "N47D20C", fuel: "Diesel 2.0L" },
  { brand: "Land Rover", model: "Discovery Sport (L550) TD4", years: "2015-2022", price: "£4,200 - £6,200", issue: "Timing Chain & Turbo Failure", engineCode: "204DTD", fuel: "Diesel 2.0L" },
  { brand: "Land Rover", model: "Freelander 2 (L359) TD4", years: "2006-2014", price: "£2,800 - £4,000", issue: "Head Gasket & Oil Starvation", engineCode: "224DT", fuel: "Diesel 2.2L" },
  { brand: "Land Rover", model: "Discovery 4 (L319) TDV6", years: "2009-2016", price: "£4,800 - £7,200", issue: "EGR & Oil Pump Failure", engineCode: "306D1", fuel: "Diesel 3.0L" },
  { brand: "Land Rover", model: "Defender (L663) D200", years: "2019-2024", price: "£5,200 - £8,000", issue: "Timing Chain & Injector Failure", engineCode: "204DTD", fuel: "Diesel 2.0L" },
  { brand: "Land Rover", model: "Discovery (L462) SD4", years: "2017-2022", price: "£5,000 - £7,600", issue: "Turbo & Timing Chain Failure", engineCode: "204DTD", fuel: "Diesel 2.0L" },
  { brand: "Land Rover", model: "Range Rover Sport (L320) TDV8", years: "2005-2009", price: "£3,400 - £5,200", issue: "Oil Starvation & Head Failure", engineCode: "368DT", fuel: "Diesel 3.6L" },
  { brand: "Range Rover", model: "Range Rover (L405) SDV8 4.4", years: "2012-2017", price: "£6,400 - £9,800", issue: "Timing Chain & Oil Starvation", engineCode: "448DT", fuel: "Diesel 4.4L" },
  { brand: "Range Rover", model: "Range Rover Evoque (L538) TD4", years: "2011-2018", price: "£4,400 - £6,600", issue: "Timing Chain & Turbo Failure", engineCode: "204DTD", fuel: "Diesel 2.0-2.2L" },
  { brand: "Range Rover", model: "Range Rover Sport (L494) SDV6", years: "2013-2019", price: "£5,600 - £8,400", issue: "EGR Valve & Head Gasket", engineCode: "30DDTX", fuel: "Diesel 3.0L" },
  { brand: "Range Rover", model: "Range Rover Velar (L560) D180", years: "2017-2023", price: "£5,400 - £8,000", issue: "Timing Chain & Injector Failure", engineCode: "204DTD", fuel: "Diesel 2.0L" },
  { brand: "Range Rover", model: "Range Rover (L322) TDV8", years: "2006-2012", price: "£3,800 - £5,600", issue: "Oil Starvation & Crack Block", engineCode: "368DT", fuel: "Diesel 3.6L" },
  { brand: "Jaguar", model: "Jaguar XF (X250) 2.2D", years: "2011-2015", price: "£3,200 - £4,800", issue: "EGR & Head Gasket Failure", engineCode: "224DT", fuel: "Diesel 2.2L" },
  { brand: "Jaguar", model: "Jaguar F-Pace (X761) 2.0D", years: "2016-2022", price: "£4,800 - £7,200", issue: "Timing Chain & Turbo Failure", engineCode: "AJ200D", fuel: "Diesel 2.0L" },
  { brand: "Jaguar", model: "Jaguar XE (X760) 2.0D", years: "2015-2020", price: "£4,200 - £6,400", issue: "Timing Chain & Oil Dilution", engineCode: "AJ200D", fuel: "Diesel 2.0L" },
  { brand: "Jaguar", model: "Jaguar XJ (X350) 3.0D V6", years: "2003-2009", price: "£2,600 - £4,200", issue: "Head Gasket & Oil Consumption", engineCode: "AJ-V6D", fuel: "Diesel 3.0L" },
  { brand: "Jaguar", model: "Jaguar E-Pace (D842) D180", years: "2017-2023", price: "£4,600 - £7,000", issue: "Timing Chain & Turbo Failure", engineCode: "AJ200D", fuel: "Diesel 2.0L" },
  { brand: "Mercedes", model: "Mercedes C-Class (W205) C220d", years: "2014-2021", price: "£3,800 - £5,600", issue: "Oil Dilution & Injector Failure", engineCode: "OM654.920", fuel: "Diesel 2.0L" },
  { brand: "Mercedes", model: "Mercedes E-Class (W213) E220d", years: "2016-2023", price: "£4,200 - £6,200", issue: "Oil Dilution & Swirl Valve", engineCode: "OM654.DE20", fuel: "Diesel 2.0L" },
  { brand: "Mercedes", model: "Mercedes GLC (X253) 220d", years: "2015-2022", price: "£3,600 - £5,400", issue: "Timing Chain & EGR Failure", engineCode: "OM651.924", fuel: "Diesel 2.1L" },
  { brand: "Mercedes", model: "Mercedes A-Class (W177) A220d", years: "2018-2024", price: "£3,400 - £5,000", issue: "Oil Dilution & DPF Issues", engineCode: "OM654.920", fuel: "Diesel 2.0L" },
  { brand: "Mercedes", model: "Mercedes Sprinter (W906) 311 CDI", years: "2006-2018", price: "£2,800 - £4,400", issue: "Timing Chain & Injector Wear", engineCode: "OM651.935", fuel: "Diesel 2.2L" },
  { brand: "Ford", model: "Ford Focus (Mk3) 1.6 TDCi", years: "2011-2018", price: "£800 - £1,400", issue: "DPF & Injector Failure", engineCode: "T1DA/T1DB", fuel: "Diesel 1.6L" },
  { brand: "Ford", model: "Ford Fiesta (Mk7) 1.0 EcoBoost", years: "2012-2019", price: "£700 - £1,200", issue: "Coolant Hose & Head Gasket", engineCode: "Fox/B38", fuel: "Petrol 1.0L" },
  { brand: "Ford", model: "Ford Transit (T6.1) 2.0 EcoBlue", years: "2017-2024", price: "£2,200 - £3,400", issue: "EGR Failure & Oil Consumption", engineCode: "YMF", fuel: "Diesel 2.0L" },
  { brand: "Ford", model: "Ford Kuga (Mk2) 2.0 TDCi", years: "2012-2019", price: "£1,000 - £1,800", issue: "EGR Cooler & Turbo Failure", engineCode: "UFDA", fuel: "Diesel 2.0L" },
  { brand: "Ford", model: "Ford Ranger (Mk5) 2.2 TDCi", years: "2011-2019", price: "£2,400 - £3,600", issue: "Injector & Turbo Failure", engineCode: "P4AT", fuel: "Diesel 2.2L" },
  { brand: "Vauxhall", model: "Vauxhall Astra (J) 1.6 CDTi", years: "2009-2015", price: "£600 - £1,100", issue: "EGR & Timing Belt Failure", engineCode: "A16DTH", fuel: "Diesel 1.6L" },
  { brand: "Vauxhall", model: "Vauxhall Corsa (E) 1.4T", years: "2014-2019", price: "£500 - £900", issue: "Cylinder Head & Gasket Failure", engineCode: "A14NET", fuel: "Petrol 1.4L" },
  { brand: "Vauxhall", model: "Vauxhall Insignia (B) 2.0 CDTi", years: "2017-2022", price: "£1,400 - £2,200", issue: "Turbo & EGR Failure", engineCode: "B20DTH", fuel: "Diesel 2.0L" },
  { brand: "VW", model: "VW Golf (Mk7) 2.0 TDI", years: "2012-2020", price: "£2,200 - £3,400", issue: "Timing Chain & EGR Failure", engineCode: "CRBC/DFGA", fuel: "Diesel 2.0L" },
  { brand: "VW", model: "VW Passat (B8) 2.0 TDI", years: "2014-2022", price: "£2,400 - £3,600", issue: "Timing Chain & Injector Wear", engineCode: "DFCA", fuel: "Diesel 2.0L" },
  { brand: "VW", model: "VW Tiguan (Mk2) 2.0 TDI", years: "2016-2023", price: "£2,600 - £3,800", issue: "Timing Chain & EGR Failure", engineCode: "DFGA", fuel: "Diesel 2.0L" },
  { brand: "Audi", model: "Audi A4 (B8/B9) 2.0 TDI", years: "2008-2018", price: "£2,200 - £3,200", issue: "Timing Chain & DPF Failure", engineCode: "CLAB/UKDB", fuel: "Diesel 2.0L" },
  { brand: "Audi", model: "Audi Q5 (8R) 3.0 TDI", years: "2008-2017", price: "£3,400 - £5,200", issue: "Timing Chain & Turbo Failure", engineCode: "CCWA", fuel: "Diesel 3.0L" },
  { brand: "Audi", model: "Audi A6 (C7) 2.0 TDI", years: "2011-2018", price: "£2,400 - £3,600", issue: "EGR & Timing Chain Failure", engineCode: "CGLD", fuel: "Diesel 2.0L" },
  { brand: "Toyota", model: "Toyota Yaris (XP150) 1.33 VVT-i", years: "2011-2017", price: "£450 - £850", issue: "Oil Consumption & Piston Wear", engineCode: "1NR-FE", fuel: "Petrol 1.3L" },
  { brand: "Toyota", model: "Toyota RAV4 (XA50) 2.0 D-4D", years: "2018-2023", price: "£1,600 - £2,400", issue: "EGR Failure & Carbon Build-up", engineCode: "1AD-FTV", fuel: "Diesel 2.0L" },
  { brand: "Hyundai", model: "Hyundai Tucson (LM) 1.7 CRDi", years: "2013-2018", price: "£700 - £1,200", issue: "DPF & Injector Failure", engineCode: "D4FD", fuel: "Diesel 1.7L" },
  { brand: "Hyundai", model: "Hyundai i30 (PD) 1.6 CRDi", years: "2017-2022", price: "£650 - £1,100", issue: "DPF & High-Pressure Fuel Pump", engineCode: "D4FB", fuel: "Diesel 1.6L" },
  { brand: "Nissan", model: "Nissan Qashqai (J11) 1.5 dCi", years: "2013-2019", price: "£700 - £1,200", issue: "DPF Blockage & Injector Wear", engineCode: "K9K", fuel: "Diesel 1.5L" },
  { brand: "Nissan", model: "Nissan Navara (D40) 2.5 dCi", years: "2005-2016", price: "£1,800 - £2,800", issue: "Head Gasket & Crankshaft Failure", engineCode: "YD25DDTi", fuel: "Diesel 2.5L" },
  { brand: "MINI", model: "MINI Cooper (F56) 1.5T B38", years: "2014-2021", price: "£1,800 - £2,800", issue: "Timing Chain & Oil Starvation", engineCode: "B38A15A", fuel: "Petrol 1.5L" },
  { brand: "MINI", model: "MINI Cooper S (R56) 1.6T N18", years: "2010-2014", price: "£1,600 - £2,400", issue: "Timing Chain & Piston Failure", engineCode: "N18B16A", fuel: "Petrol 1.6L" },
  { brand: "Peugeot", model: "Peugeot 308 (T9) 1.6 BlueHDi", years: "2014-2021", price: "£700 - £1,300", issue: "DPF & Swirl Flap Failure", engineCode: "BHX/DV6FC", fuel: "Diesel 1.6L" },
  { brand: "Kia", model: "Kia Sportage (QL) 1.7 CRDi", years: "2015-2021", price: "£800 - £1,400", issue: "DPF Clog & Turbo Failure", engineCode: "D4FD", fuel: "Diesel 1.7L" },
];
