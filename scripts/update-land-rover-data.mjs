import fs from "node:fs/promises";
import path from "node:path";

const filePath = path.resolve("C:/Users/Rahma/new_engine/engine-market/data/brands/land-rover.json");
const raw = await fs.readFile(filePath, "utf8");
const data = JSON.parse(raw);

function sanitizeString(value) {
  return value
    .replaceAll("Â£", "?")
    .replaceAll("â€“", "?")
    .replaceAll("â€”", "?")
    .replaceAll("Ã¢â‚¬â€", "-")
    .replaceAll("Ã¢â‚¬â€“", "-")
    .replaceAll("Ã¢â€ â€™", "->")
    .replaceAll("Ã¢â‚¬", '"')
    .replaceAll("Ã‚Â£", "?")
    .replaceAll("Ãƒâ€”", "x")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€", '"')
    .replaceAll("â€¦", "...");
}

function sanitizeDeep(value) {
  if (typeof value === "string") {
    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeDeep);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeDeep(nestedValue)]),
    );
  }

  return value;
}

const years = [
  {
    year: "2008",
    preview: "Defender 2.4 Puma, Disco 3 2.7 TDV6, Range Rover Sport V8",
    description:
      "Defender 2.4 Puma TDCi (ZSD-424), Disco 3 2.7 TDV6 & 4.4 V8, Freelander 2 2.2 TD4 & 3.2 i6, RR L322 adds 3.6 TDV8.",
    cta: "Get quotes for 2008 Land Rover replacement engines ->",
  },
  {
    year: "2009",
    preview: "5.0 AJ133 V8 arrives, Discovery 4 launches, 3.0 SDV6 added",
    description:
      "5.0 AJ133 V8 replaces the old supercharged unit. Discovery 4 launches with 2.7 TDV6 and 3.0 SDV6. 4.4 TDV8 reaches Range Rover.",
    cta: "Compare 2009 Land Rover engine prices from UK suppliers ->",
  },
  {
    year: "2010",
    preview: "Discovery 4 leans on 3.0 SDV6, Range Rover expands V8 options",
    description:
      "Discovery 4 pushes 3.0 SDV6 as its main diesel. Range Rover Sport adds the 5.0 supercharged V8 and 3.0 SDV6. Freelander 2 and Defender remain stable.",
    cta: "Get quotes for 2010 Land Rover replacement engines ->",
  },
  {
    year: "2011",
    preview: "Evoque launches, 2.2 TD4 and 2.0 Si4 arrive, Defender moves to 2.2",
    description:
      "Evoque launches with 2.2 TD4 and 2.0 Si4. Defender moves from 2.4 Puma to the 2.2 family. Discovery 4 and RR Sport keep SDV6 and V8 choices.",
    cta: "Compare 2011 Land Rover engine replacement costs ->",
  },
  {
    year: "2012",
    preview: "Range Rover L405 arrives with 3.0 SDV6, 4.4 SDV8 and 5.0 V8",
    description:
      "L405 Range Rover launches with 3.0 SDV6, 4.4 SDV8 and 5.0 supercharged V8. Evoque adds the SD4 190 diesel while Defender stays on the 2.2 Puma.",
    cta: "Get quotes for 2012 Land Rover engines with warranty ->",
  },
  {
    year: "2013",
    preview: "Range Rover Sport L494 debuts, 3.0 supercharged V6 joins range",
    description:
      "Range Rover Sport L494 arrives with 3.0 SDV6, 4.4 SDV8, 5.0 V8 and 3.0 supercharged V6 petrol. Evoque, Discovery 4, Freelander 2 and Defender carry over.",
    cta: "Compare rebuilt 2013 Land Rover engine prices ->",
  },
  {
    year: "2014",
    preview: "SVAutobiography V8 expands the range while Evoque and Freelander continue",
    description:
      "Range Rover adds the SVAutobiography 5.0 V8 and 3.0 SDV6 hybrid. Evoque and Freelander 2 continue with 2.2 TD4 and 2.0 Si4 power.",
    cta: "Get quotes for 2014 Land Rover replacement engines ->",
  },
  {
    year: "2015",
    preview: "Ingenium diesel era begins with Discovery Sport and Evoque 2.0 diesel",
    description:
      "Discovery Sport launches with 204DTD / AJ200D 2.0 Ingenium diesel. Evoque adopts the same family. Defender production ends while Discovery 4 continues.",
    cta: "Compare 2015 Land Rover engine replacement costs from UK specialists ->",
  },
  {
    year: "2016",
    preview: "Discovery 5 arrives, Ingenium petrol expands, Defender production ends",
    description:
      "Discovery 5 arrives with Ingenium 2.0 diesel and 3.0 SDV6. Evoque and Discovery Sport add Ingenium 2.0 petrol. Defender production has fully ceased.",
    cta: "Get quotes for 2016 Land Rover replacement engines ->",
  },
  {
    year: "2017",
    preview: "Velar launches with Ingenium and SDV6 options, Discovery 5 adds 3.0 SDV6",
    description:
      "Velar launches with Ingenium diesel and petrol, plus SDV6 and supercharged V6 options. Discovery 5 adds 3.0 SDV6 while Evoque and Discovery Sport expand petrol variants.",
    cta: "Compare 2017 Land Rover engine prices from UK suppliers ->",
  },
  {
    year: "2018",
    preview: "Ingenium 3.0 diesel replaces older SDV6 in major Range Rover models",
    description:
      "AJ20D6 3.0 Ingenium diesel replaces the older Ford-derived diesel in Range Rover and RR Sport. Discovery 5 and Velar move deeper into the modern Ingenium era.",
    cta: "Get quotes for 2018 Land Rover replacement engines ->",
  },
  {
    year: "2019",
    preview: "New Evoque brings mild-hybrid Ingenium engines and P400e joins range",
    description:
      "The new Evoque and refreshed Discovery Sport move to mild-hybrid Ingenium petrol and diesel units. Range Rover adds the P400e plug-in hybrid setup.",
    cta: "Compare rebuilt 2019 Land Rover engine costs ->",
  },
  {
    year: "2020-2025",
    preview: "New Defender, BMW 4.4 V8 and the full modern Ingenium era",
    description:
      "Defender L663 launches with Ingenium diesel, petrol and later 5.0 V8 power. The newest Range Rover and RR Sport add the BMW-sourced 4.4 V8 beside updated Ingenium and PHEV options.",
    cta: "Get quotes for 2020-2025 Land Rover replacement engines ->",
  },
];

data.seo = {
  title: "Land Rover Engine Replacement - Compare Prices & Save",
  description:
    "Land Rover engine replacement cost guide. Compare rebuilt, reconditioned and used Land Rover engine prices from trusted UK specialists, with 12-month warranty and supply & fit available.",
  canonical: "/land-rover",
};

data.sections.hero = {
  tag: "UK Engine Marketplace",
  h1: "Land Rover Engine Replacement - Compare Prices & Save",
  subheading:
    "Get quotes today from trusted UK Land Rover engine specialists. Compare prices on reconditioned, rebuilt and used engines - supply & fit available.",
  trustBadges: ["Supply & Fit Available", "12-Month Warranty", "Nationwide Delivery"],
  ctaLinkText: "Compare Land Rover Engine Prices ->",
  supportingText: "Get instant Land Rover engine quote today, from the biggest Engine Marketplace in UK.",
  ticker: "Instant Quotes - No Obligation - 100% Free - Trusted UK Suppliers -",
  form: {
    heading: "Find Your Land Rover Engine",
    subtitle: "Enter your registration number to get started.",
    inputPlaceholder: "Registration Number",
    buttonText: "Get Free Engine Quotes",
    note: "Your details are secure. No spam, just genuine quotes from UK Land Rover specialists.",
  },
};

data.sections.howItWorks = {
  tag: "How It Works",
  h2: "3 Simple Steps to Finding the Best Land Rover Replacement Engine",
  cards: [
    {
      number: 1,
      icon: "registration",
      front: {
        h3: "Enter Your Land Rover Registration",
        text: "Instantly verify your exact model, engine code and fuel type via DVLA - Defender to Range Rover.",
      },
      back: {
        heading: "Your Car, Precisely Identified",
        text: "Engines Market uses the official DVLA database to pull accurate details about your Land Rover, not just model name.",
        bullets: [
          "Your Precise Model - from Defender, Freelander, Discovery to Range Rover, Range Rover Sport, Evoque",
          "Your Engine Code - TDV6, SDV6, 2.0 Ingenium, 5.0 V8, 2.2 TDCi and more",
          "Vehicle Specs Check - fuel type, engine size, year, variant - all verified instantly",
          "No paperwork, no guesswork, 100% free",
        ],
      },
    },
    {
      number: 2,
      icon: "quote",
      front: {
        h3: "Get Quotes from Land Rover Engine Specialists",
        text: "Same-day quotes from vetted UK suppliers - full breakdown, no obligation.",
      },
      back: {
        heading: "Quotes You Can Trust",
        text: "Your verified details are securely shared with up to 10 of our most relevant UK suppliers, matched to your variant and location.",
        bullets: [
          "Vetted UK Suppliers - specialists who understand Land Rover diesel and petrol engines",
          "Same-Day Quotes - usually within hours, not days",
          "Supply & Fit Service - or supply-only to your own garage",
          "Full Breakdown - price, warranty length, delivery estimate and fitting cost all shown clearly",
          "No hidden fees. No sales calls unless you approve",
        ],
      },
    },
    {
      number: 3,
      icon: "shield",
      front: {
        h3: "Choose the Best Deal & Save",
        text: "Compare supplier reviews, warranty and price - then pick the right one for you.",
      },
      back: {
        heading: "Your Choice, Your Control",
        text: "You decide which specialist to go with. We simply make the search fast, safe and transparent.",
        bullets: [
          "Online Reviews - read real customer feedback",
          "Warranty Length - minimum 12 months, often 24 months on rebuilt units",
          "Terms of Service - including collection, fitting and aftercare",
          "Technical Expertise - see each supplier's Land Rover experience",
          "You deal directly with your chosen provider. No pressure, no commitment until you're ready",
        ],
      },
    },
  ],
  tagline:
    "Get Instant Quotes from Land Rover Engine Specialists Across the UK - 100% free, no obligation. Most replacements completed within 3-5 days.",
};

data.sections.liveMarketPrices.tag = "Live Market Prices";
data.sections.liveMarketPrices.h2 = "Recent Land Rover Engine Quotes & Price Guide";
data.sections.liveMarketPrices.h3 =
  "Based on real enquiries from UK buyers - updated regularly. All prices are typical UK rebuilt engine market ranges and reflect recent quotes from our network of Land Rover engine specialists.";
data.sections.liveMarketPrices.introBullets = [
  {
    label: "Real-Time Data",
    text: "View the 20 most recently requested Land Rover engine replacement enquiries to see genuine search patterns, not static stock listings.",
  },
  {
    label: "Transparent Pricing",
    text: "Benchmark the typical Land Rover engine replacement price UK and live Land Rover engine prices against actual market ranges.",
  },
  {
    label: "Cost Insights",
    text: "Understand the full Land Rover engine replacement cost and compare affordable UK engine options by reviewing quoted prices and failure reasons.",
  },
  {
    label: "Get Your Quote",
    text: "Use this guide to see what Land Rover owners are paying, then enter your registration above for a tailored quote.",
  },
];
data.sections.liveMarketPrices.cta = {
  heading: "Use the feed as your benchmark",
  text: "Use these recent buyer enquiries to benchmark your own Land Rover engine price before you compare specialist quotes.",
  buttonText: "Compare My Land Rover Engine",
  note: "Last updated should be driven by the feed timestamp so the section stays fresh for visitors and SEO.",
};
data.sections.liveMarketPrices.feed.visibleRows = 20;
data.sections.liveMarketPrices.feed.timestampLabel = "Last Updated";
data.sections.liveMarketPrices.feed.refreshLabel = "Refresh feed";
data.sections.liveMarketPrices.badges = [
  "20 recent enquiries visible",
  "Typical UK rebuilt ranges",
  "Engine-code matched rows",
  "Updated regularly",
];

data.sections.reviews = {
  tag: "Customer Reviews",
  h2: "Trusted by Land Rover Owners Across the UK",
  rating: {
    value: 4.8,
    count: 1081,
    summary:
      "Rated 4.8 out of 5 by 1,081 verified customers who sourced reconditioned and used Land Rover engines through EngineMarket.",
    basedOn:
      "Based on real post-sale feedback from buyers matched with our network of UK engine specialists.",
  },
  reviews: [
    {
      text: "Thanks to EngineMarket, I saved over £1,200 on my Defender engine. Matched with a great local specialist within the hour.",
      name: "Jimmy",
      location: "London",
    },
    {
      text: "Got three quotes within an hour and chose the best deal easily. The whole process was stress-free.",
      name: "Pete",
      location: "Leeds",
    },
    {
      text: "Wasn't sure what I needed, but they helped me identify the right engine and connected me with a trusted garage.",
      name: "Sophie",
      location: "Birmingham",
    },
    {
      text: "Fast turnaround and excellent aftercare. The 12-month warranty gave me real peace of mind.",
      name: "Ahmed",
      location: "Bradford",
    },
    {
      text: "Best car-related experience I've had in years. Honest, quick, and saved me a fortune.",
      name: "Liam",
      location: "London",
    },
    {
      text: "EngineMarket made a stressful situation so much easier. Cannot recommend them enough.",
      name: "Tom",
      location: "Manchester",
    },
  ],
  leaveReviewCta: {
    text: "Had a great experience? Your feedback helps other Land Rover owners find trusted engine specialists.",
    linkText: "Leave a review ->",
  },
};

data.sections.models = {
  tag: "Models We Cover",
  h2: "Popular Land Rover Engine Replacement Models",
  subheading:
    "From the rugged Defender to the luxury Range Rover, our network of UK Land Rover engine specialists covers every model. Select your vehicle to compare prices and get quotes.",
  cards: [
    {
      h3: "Land Rover Defender Engines",
      slug: "defender",
      subtitle: "Available for Defender 90, 110, 130, Pickup, Station Wagon & more",
      priceRange: "Starting from £1,200 - £3,500",
      cta: "Compare Defender Engine Prices ->",
      image: "/images/brands/land-rover/v.webp",
    },
    {
      h3: "Land Rover Discovery Engines",
      slug: "discovery",
      subtitle: "Available for Discovery 3, 4, Discovery Sport & commercial variants",
      priceRange: "Starting from £1,500 - £4,500",
      cta: "Compare Discovery Engine Prices ->",
      image: "/images/brands/land-rover/v.webp",
    },
    {
      h3: "Land Rover Freelander Engines",
      slug: "freelander",
      subtitle: "Available for Freelander 1 & Freelander 2 (all trims)",
      priceRange: "Starting from £900 - £2,500",
      cta: "Compare Freelander Engine Prices ->",
      image: "/images/brands/land-rover/v.webp",
    },
    {
      h3: "Range Rover Engines",
      slug: "range-rover",
      subtitle: "Available for Range Rover, Sport, Evoque, Velar & Autobiography",
      priceRange: "Starting from £2,000 - £8,500",
      cta: "Compare Range Rover Engine Prices ->",
      image: "/images/brands/land-rover/v.webp",
    },
  ],
};

data.sections.engineCodes = {
  tag: "Replacement Cost",
  h2: "Land Rover Engine Codes & Average Rebuilt Prices (UK Supply)",
  h3: "Compare costs for every major Land Rover engine - TDV6, Ingenium, V8, Td5 and legacy units. All prices are typical UK market ranges for professionally rebuilt engines with warranty. Click Get Quote on any engine to receive tailored prices from our network of UK Land Rover specialists.",
  filters: ["All", "Diesel", "Petrol", "TDV6", "Ingenium", "V8", "Defender"],
  groups: [
    {
      name: "Modern Ingenium Diesel",
      era: "2015-Present",
      failureNote:
        "AJ200D / 204DTD units are known for timing chain stretch, DPF-related oil dilution and turbocharger failure. AJ20D6 3.0 engines need uprated bearing shells and improved oil supply on early builds.",
      engines: [
        {
          code: "AJ200D",
          fuel: "Diesel",
          size: "2.0L",
          power: "150-180 HP",
          compatibleModels:
            "Discovery Sport (L550), Range Rover Evoque (L538), Discovery 5, Velar, Range Rover Sport",
          avgRebuiltPrice: "£2,500 - £5,000",
          cta: "Get Quote",
        },
        {
          code: "204DTD",
          fuel: "Diesel",
          size: "2.0L",
          power: "150-180 HP",
          compatibleModels: "Discovery Sport, Range Rover Evoque (2015-2019), Jaguar XE/XF",
          avgRebuiltPrice: "£2,500 - £4,500",
          cta: "Get Quote",
        },
        {
          code: "204DTA",
          fuel: "Diesel",
          size: "2.0L",
          power: "180-240 HP",
          compatibleModels: "Range Rover Evoque, Discovery Sport, Velar",
          avgRebuiltPrice: "£2,500 - £4,000",
          cta: "Get Quote",
        },
        {
          code: "AJ20D6",
          fuel: "Diesel",
          size: "3.0L",
          power: "250-300 HP",
          compatibleModels: "Range Rover (L405), Range Rover Sport (L494), Discovery 5",
          avgRebuiltPrice: "£4,500 - £8,500",
          cta: "Get Quote",
        },
      ],
    },
    {
      name: "TDV6 Diesel",
      era: "2004-2018",
      failureNote:
        "The 276DT 2.7 and 306DT / 306DTX 3.0 TDV6 family are infamous for crankshaft bearing failure. Strong rebuilds include uprated bearings, revised oil pump assemblies and improved EGR / turbo support parts.",
      engines: [
        {
          code: "276DT",
          fuel: "Diesel",
          size: "2.7L",
          power: "190 HP",
          compatibleModels: "Discovery 3 (L319), Range Rover Sport (L320, 2005-2009)",
          avgRebuiltPrice: "£2,800 - £4,500",
          cta: "Get Quote",
        },
        {
          code: "306DT",
          fuel: "Diesel",
          size: "3.0L",
          power: "211-245 HP",
          compatibleModels: "Discovery 4 (L319), Range Rover Sport (L320, 2009-2013), Range Rover (L322)",
          avgRebuiltPrice: "£2,800 - £5,200",
          cta: "Get Quote",
        },
        {
          code: "306DTX",
          fuel: "Diesel",
          size: "3.0L",
          power: "250-306 HP",
          compatibleModels: "Discovery 4, Range Rover Sport (2012-2018), Range Rover (L405)",
          avgRebuiltPrice: "£3,500 - £5,500",
          cta: "Get Quote",
        },
      ],
    },
    {
      name: "V8 Petrol",
      era: "2004-Present",
      failureNote:
        "The 508PN 5.0 Supercharged V8 is known for timing chain tensioner wear, water pump leakage and supercharger coupler issues. Older 448PN 4.4 units suffer chain guide rail and VANOS failures.",
      engines: [
        {
          code: "448PN",
          fuel: "Petrol",
          size: "4.4L",
          power: "299 HP",
          compatibleModels: "Discovery 3 (L319, 2004-2009), Range Rover Sport (L320)",
          avgRebuiltPrice: "£2,800 - £4,500",
          cta: "Get Quote",
        },
        {
          code: "508PN",
          fuel: "Petrol",
          size: "5.0L",
          power: "375-510 HP",
          compatibleModels: "Range Rover, Range Rover Sport, Discovery 4, SVAutobiography",
          avgRebuiltPrice: "£5,500 - £8,500",
          cta: "Get Quote",
        },
        {
          code: "306PS",
          fuel: "Petrol",
          size: "3.0L",
          power: "340-380 HP",
          compatibleModels: "Range Rover Sport (L494, 2014+), Range Rover (L405)",
          avgRebuiltPrice: "£4,500 - £7,500",
          cta: "Get Quote",
        },
      ],
    },
    {
      name: "Defender Diesel",
      era: "1990-2016",
      failureNote:
        "Defender diesels range from 200Tdi / 300Tdi to Td5 and Puma. The 200Tdi / 300Tdi tend toward head gasket and belt wear, while ZSD-424 / 244DT units are known for injector seal, EGR and VNT turbo issues.",
      engines: [
        {
          code: "11L",
          fuel: "Diesel",
          size: "2.5L",
          power: "85-113 HP",
          compatibleModels: "Defender 90 / 110 / 130 (1990-1994), 200Tdi",
          avgRebuiltPrice: "£650 - £1,500",
          cta: "Get Quote",
        },
        {
          code: "23L",
          fuel: "Diesel",
          size: "2.5L",
          power: "107-122 HP",
          compatibleModels: "Defender 90 / 110 / 130 (1994-1998), Discovery 1, Range Rover Classic",
          avgRebuiltPrice: "£1,200 - £2,200",
          cta: "Get Quote",
        },
        {
          code: "ZSD-424",
          fuel: "Diesel",
          size: "2.4L",
          power: "122 HP",
          compatibleModels: "Defender 90 / 110 / 130 (2007-2011), Puma TDCi",
          avgRebuiltPrice: "£2,200 - £3,500",
          cta: "Get Quote",
        },
        {
          code: "244DT",
          fuel: "Diesel",
          size: "2.4L",
          power: "122 HP",
          compatibleModels: "Defender Station Wagon, Pickup, Cabrio, Platform / Chassis",
          avgRebuiltPrice: "£2,800 - £3,800",
          cta: "Get Quote",
        },
        {
          code: "56D",
          fuel: "Diesel",
          size: "2.5L",
          power: "122 HP",
          compatibleModels: "Defender (Td5, 1998-2006), Discovery 2",
          avgRebuiltPrice: "£1,800 - £3,000",
          cta: "Get Quote",
        },
      ],
    },
    {
      name: "Additional & Specialist Engines",
      era: "Mixed",
      failureNote:
        "224DT is more reliable than some Land Rover diesels but still sees EGR and turbo oil feed issues. Specialist petrols like M52B28 and Rover V8 derivatives bring their own cooling, VANOS and oiling concerns.",
      engines: [
        {
          code: "224DT",
          fuel: "Diesel",
          size: "2.2L",
          power: "150-190 HP",
          compatibleModels: "Freelander 2 (L359), Range Rover Evoque (L538, 2011-2015)",
          avgRebuiltPrice: "£1,200 - £3,700",
          cta: "Get Quote",
        },
        {
          code: "DW12BTED4",
          fuel: "Diesel",
          size: "2.7L",
          power: "190 HP",
          compatibleModels: "Discovery 3, Range Rover Sport (early models)",
          avgRebuiltPrice: "£2,500 - £4,500",
          cta: "Get Quote",
        },
        {
          code: "M52B28",
          fuel: "Petrol",
          size: "2.8L",
          power: "193 HP",
          compatibleModels: "Defender conversions and limited UK fitment",
          avgRebuiltPrice: "£2,000 - £3,500",
          cta: "Get Quote",
        },
      ],
    },
  ],
};

data.sections.commonProblems = {
  tag: "Common Problems",
  h2: "Common Land Rover Engine Problems - What It Costs to Fix & When Replacement Makes Sense",
  h3: "Land Rover's rugged engineering is celebrated off-road, but specific engine families dominate the UK replacement market due to predictable design weaknesses. Every rebuilt engine supplied through EngineMarket's network uses upgraded internal components designed to eliminate the original failure point and includes a minimum 12-month unlimited mileage warranty.",
  problems: [
    {
      group: "Crankshaft & Bearing Failure",
      h4: "The TDV6 V6 critical weakness",
      affectedModels: "Range Rover Sport L320 / L494, Discovery 4, Defender L663 (2.7L & 3.0L TDV6 / SDV6)",
      typicalFailureMileage: "60,000-100,000 miles",
      rootCause: "Original main bearings lack sufficient clearance under sustained load, causing oil starvation, crankshaft flex and spun bearings.",
      recommendation:
        "Once deep sump knocking begins, minor repair rarely lasts. A fully rebuilt TDV6 with reinforced crankshaft, uprated oil pump and upgraded bearings is the strongest long-term fix.",
      cta: "Compare rebuilt TDV6 engine prices",
    },
    {
      group: "Timing Chain Failure",
      h4: "Why Land Rover petrol engines rattle and stall",
      affectedModels: "Range Rover L405, Range Rover Sport L494, Discovery (5.0L AJ133 & 2.0L Si4 GTDi)",
      typicalFailureMileage: "70,000-120,000 miles",
      rootCause: "Plastic timing guides and tensioners degrade under heat cycling, creating chain slack and eventual valve-to-piston contact.",
      recommendation:
        "If cold-start rattle or cam correlation faults appear, replace the timing system immediately. Once valves bend, a rebuilt engine with upgraded metal guides becomes the sensible route.",
      cta: "Get quotes for rebuilt V8 and Si4 engines",
    },
    {
      group: "Injector Seal Failure & Head Damage",
      h4: "The 2.2L TD4 carbon buildup issue",
      affectedModels: "Defender Puma, Freelander 2, Discovery 4, Range Rover Evoque (2.2L TD4 Ford Duratorq)",
      typicalFailureMileage: "75,000-110,000 miles",
      rootCause: "Copper injector washers harden and leak, allowing combustion gases into the head galleries and driving carbon damage, low compression and bore wear.",
      recommendation:
        "Catch injector weeping early or the repair escalates quickly. If bore scoring or low compression is already present, a fully rebuilt 2.2 TD4 block is the safer choice.",
      cta: "Compare 2.2L TD4 replacement engine prices",
    },
    {
      group: "Coolant Intrusion & Turbo Failure",
      h4: "The Ingenium 2.0L / 3.0L cooling-system weakness",
      affectedModels: "Range Rover Velar, Discovery 5, Defender L663, Range Rover Evoque (2015-present Ingenium diesel)",
      typicalFailureMileage: "50,000-90,000 miles",
      rootCause: "EGR coolers and thermostat housings can crack internally, letting coolant contaminate oil or the turbocharger centre section.",
      recommendation:
        "If coolant disappears without an external leak, assume internal contamination. Rebuilt Ingenium engines with upgraded cooling parts and fresh turbo hardware are far more dependable than patch repairs.",
      cta: "Enquire about rebuilt Ingenium diesel engines",
    },
  ],
  finalCta: {
    h4: "Don't let engine failure write off your Land Rover",
    paragraph:
      "Land Rover engine failures rarely happen overnight, but once warning signs appear the final bill usually climbs fast. Compare transparent specialist quotes and choose rebuilt engines fitted with upgraded components instead of repeating the same factory weak points.",
    buttonText: "Compare Land Rover Engine Replacement Prices Now ->",
    disclaimer:
      "All prices are indicative UK market ranges based on historical quote data and specialist repair requests. Actual costs vary by model, damage severity and location. Every engine supplied through EngineMarket carries a minimum 12-month unlimited mileage warranty - always confirm exact terms with your chosen supplier.",
  },
};

data.sections.engineTypes = {
  tag: "Replacement Engine Options",
  h2: "Land Rover Engine Types - Options, Costs & What to Expect",
  intro:
    "Every Land Rover engine type available through our UK network, with typical price ranges and recommendations based on your vehicle's age, condition and your budget.",
  types: [
    {
      title: "Land Rover Reconditioned Engines (Recon)",
      description:
        "A stripped, cleaned and fully inspected engine where worn components are replaced with OEM-spec parts. Best for owners who want factory reliability without factory pricing.",
      priceRange: "Typical price range: £1,500 - £4,500",
      cta: "Compare reconditioned Land Rover engine prices ->",
    },
    {
      title: "Land Rover Rebuilt Engines",
      description:
        "A complete rebuild with upgraded components addressing known failure points such as reinforced timing chains, uprated bearings and revised oil pumps.",
      priceRange: "Typical price range: £2,500 - £5,500",
      cta: "Get rebuilt Land Rover engine quotes ->",
    },
    {
      title: "Used Land Rover Engines",
      description:
        "A tested donor engine for owners prioritising upfront savings, often with low mileage and limited warranty options.",
      priceRange: "Typical price range: £800 - £3,000",
      cta: "Check used Land Rover engine availability ->",
    },
    {
      title: "Land Rover Remanufactured Engines",
      description:
        "A factory-spec as-new unit with every surface machined and every component renewed to OEM tolerances.",
      priceRange: "Typical price range: £3,000 - £6,000",
      cta: "Compare remanufactured Land Rover engine costs ->",
    },
    {
      title: "Land Rover Refurbished Engines",
      description:
        "A lightly serviced, cleaned and tested engine that can be a pragmatic choice for older Defender or Discovery models where a full recon is not economical.",
      priceRange: "Typical price range: £1,000 - £3,500",
      cta: "View refurbished Land Rover engine options ->",
    },
    {
      title: "Land Rover Supply & Fit Engines",
      description:
        "Your replacement engine delivered and professionally installed by a UK specialist, including removal, fitting, fluids and workmanship cover.",
      priceRange: "Typical added cost: £500 - £1,500 on top of engine price",
      cta: "Find Land Rover engine supply & fit deals ->",
    },
  ],
  closing:
    "All engine types include a minimum 12-month warranty. Prices are typical UK market ranges and depend on exact engine code, supplier and any additional fitting services. Use our free comparison tool to get a tailored quote for your Land Rover model today.",
};

data.sections.engineSizes = {
  tag: "Engine Sizes",
  h2: "Land Rover Engines by Size - Find the Right Displacement for Your Model",
  intro:
    "Every Land Rover engine size explained - with the models and engine codes that used each displacement - so you can quickly identify the correct replacement unit for your vehicle.",
  groups: [
    {
      title: "Diesel Land Rover Engine Sizes",
      items: [
        {
          title: "2.0L Diesel Engines",
          description:
            "AJ200D / 204DTD / 204DTA units power Discovery Sport, Evoque, Velar and newer Discovery / RR Sport applications. Common failures include EGR cooler cracks, HP fuel pump wear and timing-system issues.",
          cta: "Get quotes for Land Rover 2.0L diesel engines ->",
        },
        {
          title: "2.2L Diesel Engines",
          description:
            "224DT / TDCi engines appear in Freelander 2, Evoque and Defender-era applications. Replacement demand is driven by injector seal leakage, turbo oil feed degradation and DPF pressure-sensor faults.",
          cta: "Get quotes for Land Rover 2.2L diesel engines ->",
        },
        {
          title: "2.5L Diesel Engines",
          description:
            "Td5-era 2.5 diesels remain core to Defender and Discovery 2 demand. Injector loom faults, head gasket issues and ageing ancillaries are the usual reasons owners seek replacement.",
          cta: "Get quotes for Land Rover 2.5L diesel engines ->",
        },
        {
          title: "2.7L Diesel Engines",
          description:
            "The 276DT TDV6 serves Discovery 3 and early Range Rover Sport models. Oil pump pickup issues and crank-related failures dominate replacement enquiries.",
          cta: "Get quotes for Land Rover 2.7L diesel engines ->",
        },
        {
          title: "3.0L Diesel Engines",
          description:
            "306DT / 306DTX / AJ20D6 span late TDV6, SDV6 and modern Ingenium six-cylinder diesel demand across Discovery, Defender and Range Rover applications.",
          cta: "Get quotes for Land Rover 3.0L diesel engines ->",
        },
      ],
    },
    {
      title: "Petrol Land Rover Engine Sizes",
      items: [
        {
          title: "1.8L Petrol Engines",
          description:
            "K-Series 1.8 petrol engines mainly serve Freelander 1 demand and are known for head gasket and cooling-related failures.",
          cta: "Compare Land Rover 1.8L petrol engine prices ->",
        },
        {
          title: "2.0L Petrol Engines",
          description:
            "204PT / AJ200P petrol engines cover Evoque, Discovery Sport, Velar and newer Defender / Discovery demand, with coolant leaks and direct-injection carbon buildup as common issues.",
          cta: "Compare Land Rover 2.0L petrol engine prices ->",
        },
        {
          title: "2.5L Petrol Engines",
          description:
            "KV6-era 2.5 petrol units appear in Freelander 1 and earlier mixed-platform demand, usually replaced after timing and cooling-system failures.",
          cta: "Compare Land Rover 2.5L petrol engine prices ->",
        },
        {
          title: "3.0L Petrol Engines",
          description:
            "AJ126 supercharged V6 petrol units serve premium Range Rover and Sport applications, with timing chain wear and boost-related ancillaries driving replacement.",
          cta: "Compare Land Rover 3.0L petrol engine prices ->",
        },
        {
          title: "5.0L Petrol Engines",
          description:
            "AJ133 5.0 V8 and supercharged V8 engines power flagship Range Rover, Defender V8 and Sport models. Timing chain tensioners, couplers and cooling issues are the main failure triggers.",
          cta: "Compare Land Rover 5.0L petrol engine prices ->",
        },
      ],
    },
  ],
  closing:
    "Not sure which engine size your Land Rover needs? Enter your registration number and we'll match you to the exact engine code and displacement instantly. All engines are supplied with a minimum 12-month warranty from UK Land Rover specialists.",
};

data.sections.fuelTypes = {
  tag: "Complete Land Rover Engines List",
  h2: "Land Rover Engines by Fuel Type",
  intro:
    "Choose your Land Rover engine by fuel type to compare realistic replacement prices, known brand-wide issues and UK specialist supply - from diesel workhorses to modern electrified powertrains.",
  items: [
    {
      title: "Land Rover Diesel Engines",
      description:
        "Diesel dominates UK Land Rover engine demand across Defender, Discovery and Range Rover lines, with TDV6, 2.2 TD4 and Ingenium families leading most replacement enquiries.",
      cta: "Get quotes for Land Rover Diesel replacement engines ->",
    },
    {
      title: "Land Rover Petrol Engines",
      description:
        "Petrol Land Rover engines balance refinement with performance, but AJ133 V8 timing wear and early Ingenium coolant leaks remain key replacement triggers.",
      cta: "Compare Land Rover Petrol engine prices ->",
    },
    {
      title: "Land Rover Mild Hybrid Engines",
      description:
        "48V MHEV systems sit on top of modern Ingenium petrol and diesel blocks. Replacement needs specialist diagnostic resets and battery-health awareness.",
      cta: "Enquire about Land Rover Mild Hybrid engine availability ->",
    },
    {
      title: "Land Rover Plug-in Hybrid Engines",
      description:
        "P300e / P400e powertrains pair Ingenium petrol engines with electric assistance and require specialist hybrid-safe inspection and sourcing.",
      cta: "Enquire about Land Rover Plug-in Hybrid engine availability ->",
    },
    {
      title: "Land Rover Electric Powertrains",
      description:
        "Pure electric Land Rover demand remains limited, but we can still connect owners with verified high-voltage repair and motor replacement specialists.",
      cta: "Enquire about Land Rover Electric motor repair or replacement ->",
    },
  ],
  closing:
    "Not sure which fuel type your Land Rover uses? Enter your registration number above to identify the exact model, engine code and fuel system instantly, with all options backed by a minimum 12-month unlimited mileage warranty.",
};

data.sections.engineCodeDirectory = {
  tag: "Engine Codes",
  h2: "Land Rover Engine Codes - Most Replaced Engines (2008-2025)",
  intro:
    "Every major Land Rover engine code from the last two decades, grouped by family, with compatible models and typical reasons why owners seek replacement. Select your engine to compare rebuilt prices and get quotes from UK Land Rover specialists.",
  families: [
    {
      name: "Ingenium Diesel Family (2015-Present)",
      entries: [
        {
          title: "204DTD / AJ200D 2.0L Diesel",
          description:
            "The most common modern Land Rover engine code, fitted to Discovery Sport, Evoque, Discovery 5, Velar and Range Rover Sport. Timing-chain stretch, DPF oil dilution and turbocharger failures drive most replacements.",
          cta: "Get quotes for 204DTD / AJ200D engine replacement ->",
        },
        {
          title: "204DTA 2.0L Diesel",
          description:
            "A higher-output Ingenium 2.0 diesel used in Evoque, Discovery Sport and Velar. Shares the chain and oil-dilution issues of 204DTD and also suffers HP fuel pump failures under load.",
          cta: "Compare 204DTA engine prices ->",
        },
        {
          title: "AJ20D6 3.0L Diesel",
          description:
            "The 3.0-litre Ingenium six-cylinder diesel found in later Range Rover, RR Sport and Discovery 5 models. Early units suffered bearing wear; better rebuilds include uprated shells and revised oil supply.",
          cta: "Get quotes for AJ20D6 3.0L diesel engines ->",
        },
      ],
    },
    {
      name: "TDV6 / SDV6 Diesel Family (2004-2018)",
      entries: [
        {
          title: "276DT 2.7L TDV6 Diesel",
          description:
            "Used in Discovery 3 and early Range Rover Sport models. Famous for crankshaft failure, oil-pump housing problems and catastrophic bottom-end damage.",
          cta: "Compare 276DT TDV6 replacement costs ->",
        },
        {
          title: "306DT 3.0L TDV6 Diesel",
          description:
            "Found in Discovery 4, Range Rover Sport and Range Rover applications. Shares the crank weakness of the 2.7 with added EGR cooler and turbo actuator failures.",
          cta: "Get quotes for 306DT 3.0L TDV6 engines ->",
        },
        {
          title: "306DTX 3.0L SDV6 Diesel",
          description:
            "The twin-turbo SDV6 used in higher-output Discovery 4, Range Rover Sport and Range Rover variants. Crankshaft failure remains the headline risk, with secondary turbo issues also common.",
          cta: "Compare 306DTX SDV6 engine prices ->",
        },
      ],
    },
    {
      name: "Defender Diesel Engines (2007-2016)",
      entries: [
        {
          title: "ZSD-424 2.4L Puma TDCi Diesel",
          description:
            "The Ford Duratorq-based Defender Puma engine used from 2007 to 2011. Injector seal failure, EGR clogging and VNT turbo sticking are the main reasons owners search for replacements.",
          cta: "Get quotes for ZSD-424 Defender engine replacement ->",
        },
        {
          title: "244DT 2.4L Diesel",
          description:
            "A Defender-focused variant of the Puma family used across Station Wagon, Pickup and Platform / Chassis derivatives. Shares the injector-seal and turbo issues of the ZSD-424.",
          cta: "Compare 244DT Defender engine prices ->",
        },
      ],
    },
    {
      name: "V8 Petrol Engines (2009-Present)",
      entries: [
        {
          title: "508PN 5.0L Supercharged V8 Petrol",
          description:
            "The flagship AJ133 supercharged V8 fitted to Range Rover, RR Sport and SVAutobiography models. Timing-chain tensioner wear, supercharger coupler wear and water-pump leakage are the key failure points.",
          cta: "Get quotes for 508PN 5.0 Supercharged V8 engines ->",
        },
        {
          title: "448PN 4.4L V8 Petrol",
          description:
            "Used in Discovery 3 and Range Rover Sport applications. Timing-chain guide rail failure and VANOS issues are the most common reasons for engine replacement.",
          cta: "Compare 448PN V8 replacement prices ->",
        },
      ],
    },
    {
      name: "Other High-Demand Engine Codes",
      entries: [
        {
          title: "224DT 2.2L Diesel",
          description:
            "Used in Freelander 2 and early Evoque models. More reliable than some Land Rover diesels, but still prone to EGR failures and turbo oil-feed restrictions at higher mileage.",
          cta: "Get quotes for 224DT 2.2L diesel engines ->",
        },
        {
          title: "DW12BTED4 2.7L Diesel",
          description:
            "A PSA / Ford co-developed V6 diesel used in early Discovery 3 and RR Sport models. EGR clogging and turbocharger oil leaks are the most common replacement triggers.",
          cta: "Compare DW12BTED4 engine prices ->",
        },
        {
          title: "306PS 3.0L Supercharged V6 Petrol",
          description:
            "Fitted to later Range Rover and RR Sport petrol models. Timing-chain tensioner wear and supercharger issues are the main concerns on higher-mileage engines.",
          cta: "Get quotes for 306PS petrol engine replacement ->",
        },
      ],
    },
  ],
  closing:
    "Can't find your engine code listed above? Use the full Land Rover engine code directory below or enter your registration for an instant match to the correct replacement engine with warranty.",
  directory: {
    h3: "Full Land Rover Engine Code Directory (All Years)",
    label: "View all Land Rover engine codes (90+ codes, 1990-2025)",
    intro:
      "A comprehensive alphabetical listing of Land Rover engine codes from the last 35 years. Use search or your registration for an instant match to the correct replacement engine.",
    codes: [
      "10 H","10 J","11 D","11 L","11 H","12 L","13 L","15 P","16 L","17 L","18 K4F","19 L","20 H","20 T2N","204D3","204DTA","204DTD","204PT","21 L","22 D","22 L","224DT","23 J","23 L","24 D","25 D","25 6T","25 K4F","276DT","306D1","306DT","306PS","30DDTX","31 D","35 D","36 D","368DT","37 D","37 L","38 D","40 D","406PN","42 D","428PS","448DT","448PN","46 D","508PN","508PS","B6324S","B6323T","DW12BTED4","M47","M62B44","PT204","P300","P400","P510","L34","L414"
    ].map((code) => ({
      code,
      fuel: /D|DT|TDV|SDV|DW|ZSD/.test(code) ? "Diesel" : "Petrol",
    })),
  },
};

data.sections.engineYears = {
  tag: "Engine Timeline",
  h2: "Land Rover Engines by Year - What Was Fitted & When",
  intro:
    "Every Land Rover model year brought new engines, revised units or phased-out powerplants. Below is a year-by-year reference covering the main Land Rover engines in service across the UK market since 2008.",
  jumpLabel: "Jump to year",
  years,
  closing:
    "Not sure which year your Land Rover was built? Enter your registration number and we'll identify the exact engine, model year and compatible replacement options instantly - all backed by a minimum 12-month warranty from UK Land Rover specialists.",
};

data.sections.faq = {
  tag: "Frequently Asked Questions",
  h2: "Land Rover Engine Replacement - Frequently Asked Questions",
  intro:
    "Quick, honest answers to the most common questions Land Rover owners ask before comparing engine replacement prices and finding a UK specialist.",
  items: [
    {
      question: "How much does a Land Rover engine replacement cost UK?",
      answer:
        "Land Rover engine replacement usually costs £2,800-£5,200 from specialists, or £6,000-£10,500 at main dealers, depending on engine family and model. Reconditioned units with upgraded components usually offer the best long-term value. Prices vary by engine code, fitment and damage severity.",
      cta: "Get instant Land Rover engine replacement quotes for your model.",
    },
    {
      question: "Which Land Rover engine is the most reliable?",
      answer:
        "The later Ingenium diesels and properly uprated TDV6 rebuilds rank among the strongest choices. Reliability depends less on the badge and more on whether the known weak points - timing chains, bearings, injectors or cooling parts - have already been upgraded.",
      cta: "Compare reliable Land Rover engine options with documented upgrade histories.",
    },
    {
      question: "Is the TDV6 engine really that unreliable?",
      answer:
        "Early TDV6 engines earned their reputation because crankshaft bearing failures can appear between 60,000 and 100,000 miles. The underlying design becomes far more dependable when rebuilt with forged crankshaft options, uprated bearings and revised oil pump parts.",
      cta: "Find rebuilt TDV6 engines with reinforced crankshafts for your Range Rover or Discovery.",
    },
    {
      question: "What causes Land Rover timing chain failure?",
      answer:
        "Timing chain failures usually stem from guide wear and weakened tensioners, especially on 5.0 V8 and early Ingenium petrol engines. Cold-start rattles are the warning sign to act on quickly, because a jumped chain can bend valves and destroy the engine.",
      cta: "Compare Land Rover engines fitted with upgraded metal timing components.",
    },
    {
      question: "Should I buy a used Land Rover engine or reconditioned?",
      answer:
        "Reconditioned Land Rover engines usually offer better long-term value than used units with unknown history. A proper rebuild includes new bearings, seals, gaskets and upgraded weak components, plus a warranty and bench testing.",
      cta: "Compare used versus reconditioned Land Rover engine prices and warranties now.",
    },
    {
      question: "How long do Land Rover diesel engines last?",
      answer:
        "Well-maintained Land Rover diesel engines can reach 150,000-200,000 miles, but known weak families such as early TDV6 and some 2.2 TD4 units often fail earlier if warning signs are ignored. Regular oil changes and prompt attention to leaks make a major difference.",
      cta: "Find long-life rebuilt Land Rover diesel engines with upgrade histories.",
    },
    {
      question: "Is it worth replacing a Land Rover engine or should I scrap the car?",
      answer:
        "Engine replacement is usually worth it if the chassis, transmission and interior are still strong. A specialist rebuild often costs far less than replacing the whole vehicle with another used Land Rover carrying an unknown engine history.",
      cta: "Get a tailored Land Rover engine replacement quote to decide today.",
    },
    {
      question: "What's the difference between Land Rover Ingenium and older diesel engines?",
      answer:
        "Ingenium diesels bring newer emissions hardware, modular aluminium construction and mild-hybrid compatibility, while older TD4 / TDV6 units rely on earlier Ford-derived architecture. Early Ingenium engines also introduced fresh cooling and EGR weaknesses that good rebuilds now address.",
      cta: "Compare rebuilt Ingenium versus TDV6 Land Rover engine options and prices.",
    },
    {
      question: "Can Land Rover engines be remapped safely?",
      answer:
        "Land Rover engines can be remapped safely when the tune is conservative and the specialist understands the engine's oiling, cooling and turbo limits. Aggressive remaps on TDV6 or Ingenium diesels can accelerate wear on already-sensitive components.",
      cta: "Find Land Rover engine specialists who offer conservative, warranty-safe remapping options.",
    },
    {
      question: "Are Land Rover petrol engines more reliable than diesel?",
      answer:
        "Petrol engines avoid DPF and AdBlue issues, but they bring their own timing chain and cooling-system risks, especially on the 5.0 V8 and early Ingenium petrol family. Reliability depends more on maintenance history and upgraded weak points than on fuel type alone.",
      cta: "Compare rebuilt Land Rover petrol engine prices with upgraded timing components.",
    },
  ],
};

data.sections.trustCta = {
  tag: "Why Choose Us",
  h2: "Why UK Land Rover Owners Trust EngineMarket",
  intro:
    "Join thousands of UK drivers who compare Land Rover engine prices through our network of trusted specialists, with every rebuilt and reconditioned unit backed by a minimum 12-month unlimited mileage warranty and nationwide delivery.",
  points: [
    {
      title: "Trusted Land Rover Engine Suppliers",
      description: "Every garage and engine rebuilder in our network is vetted, rated and reviewed by real customers.",
    },
    {
      title: "Compare Land Rover Engine Replacement Companies",
      description: "See prices, warranty terms and fitting options side-by-side before you commit.",
    },
    {
      title: "UK Engine Replacement Services for Land Rover",
      description: "Covering every model from Defender to Range Rover, with supply-only or supply-and-fit available nationwide.",
    },
  ],
  finalText:
    "Find the best Land Rover engine replacement UK drivers rely on. Compare prices from trusted specialists today and get back on the road with confidence.",
  buttonText: "Compare Land Rover Engine Prices Now ->",
};

data.structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://enginesmarket.co.uk/land-rover-engines/#website",
      name: "Compare Land Rover Engine Prices - 12m Warranty",
      url: "https://enginesmarket.co.uk/land-rover-engines/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://enginesmarket.co.uk/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://enginesmarket.co.uk/#organization",
      name: "Engines Market",
      url: "https://enginesmarket.co.uk/",
      logo: "https://enginesmarket.co.uk/images/logo.png",
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
    },
    {
      "@type": "WebPage",
      "@id": "https://enginesmarket.co.uk/land-rover-engines/#webpage",
      name: "Land Rover Engine Replacement - Compare Prices & Save",
      description:
        "Land Rover engine replacement cost guide. Compare rebuilt, reconditioned and used Land Rover engine prices from £650 (200Tdi) to £8,500 (5.0 Supercharged V8). 12-month warranty, supply & fit available from UK Land Rover specialists.",
      url: "https://enginesmarket.co.uk/land-rover-engines/",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://enginesmarket.co.uk/#website",
      },
      about: {
        "@type": "Thing",
        name: "Land Rover engine replacement",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://enginesmarket.co.uk/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Land Rover Engines",
            item: "https://enginesmarket.co.uk/land-rover-engines/",
          },
        ],
      },
    },
    {
      "@type": "Product",
      "@id": "https://enginesmarket.co.uk/land-rover-engines/#product",
      name: "Land Rover Engine Replacement - Compare Prices & Save",
      image: "https://enginesmarket.co.uk/images/logo.png",
      description:
        "Compare rebuilt, reconditioned and used Land Rover engine prices from trusted UK specialists. Covers major codes including Ingenium, TDV6, SDV6, V8 petrol and Defender diesel families. Every engine is supplied with a minimum 12-month unlimited mileage warranty and nationwide delivery.",
      brand: {
        "@type": "Brand",
        name: "Land Rover",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1081",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://enginesmarket.co.uk/land-rover-engines/#faq",
      mainEntity: data.sections.faq.items.map((item) => ({
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
      "@id": "https://enginesmarket.co.uk/land-rover-engines/#itemlist",
      name: "Land Rover Engine Models",
      description:
        "Replacement engines for all Land Rover models. Compare rebuilt, reconditioned and used engine prices from UK Land Rover specialists.",
      numberOfItems: 4,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Product",
            name: "Land Rover Defender Engines",
            url: "https://enginesmarket.co.uk/land-rover-defender-engines/",
            description: "Compare rebuilt, reconditioned and used Land Rover Defender engine prices from trusted UK specialists.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Product",
            name: "Land Rover Discovery Engines",
            url: "https://enginesmarket.co.uk/land-rover-discovery-engines/",
            description: "Compare rebuilt, reconditioned and used Land Rover Discovery engine prices from trusted UK specialists.",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Product",
            name: "Land Rover Freelander Engines",
            url: "https://enginesmarket.co.uk/land-rover-freelander-engines/",
            description: "Compare rebuilt, reconditioned and used Land Rover Freelander engine prices from trusted UK specialists.",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Product",
            name: "Range Rover Engines",
            url: "https://enginesmarket.co.uk/range-rover-engines/",
            description: "Compare rebuilt, reconditioned and used Range Rover engine prices from trusted UK specialists.",
          },
        },
      ],
    },
  ],
};

const sanitized = sanitizeDeep(data);
await fs.writeFile(filePath, `${JSON.stringify(sanitized, null, 2)}\n`, "utf8");
