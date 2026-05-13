import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve("C:/Users/Rahma/new_engine/engine-market/data/brands/land-rover.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const REPLACEMENTS = [
  ["Â£", "£"],
  ["â†’", "->"],
  ["â€“", "-"],
  ["â€”", "-"],
  ["â€˜", "'"],
  ["â€™", "'"],
  ['â€œ', '"'],
  ['â€', '"'],
  ["â€¦", "..."],
  ["ðŸ”’", ""],
  ["ðŸ”´", ""],
  ["ðŸ›¡ï¸", ""],
  ["ðŸ’°", ""],
  ["ðŸ–¼ï¸", ""],
  ["âš ï¸", ""],
  ["Â ", " "],
  ["12month", "12-month"],
  ["postsale", "post-sale"],
  ["stressfree", "stress-free"],
  ["carrelated", "car-related"],
  ["sidebyside", "side-by-side"],
  ["supplyonly", "supply-only"],
  ["supplyandfit", "supply-and-fit"],
  ["brandwide", "brand-wide"],
  ["Plugin", "Plug-in"],
];

function repairText(value) {
  if (typeof value !== "string") return value;
  let next = value;

  for (const [search, replace] of REPLACEMENTS) {
    next = next.split(search).join(replace);
  }

  next = next.replace(/\s+/g, " ").trim();
  next = next.replace(/\s+->/g, " ->");
  next = next.replace(/\s+-\s+/g, " - ");
  next = next.replace(/\s+\)/g, ")");
  next = next.replace(/\(\s+/g, "(");
  next = next.replace(/ ,/g, ",");

  return next;
}

function repairDeep(value) {
  if (Array.isArray(value)) {
    return value.map(repairDeep);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairDeep(item)]));
  }

  return repairText(value);
}

data.seo = {
  title: "Land Rover Engine Replacement - Compare Prices & Save",
  description:
    "Land Rover engine replacement cost guide. Compare rebuilt, reconditioned and used Land Rover engine prices from £650 (200Tdi) to £8,500 (5.0 Supercharged V8), with 12-month warranty and supply & fit available from UK specialists.",
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

data.sections.liveMarketPrices = {
  ...data.sections.liveMarketPrices,
  tag: "Live Market Prices",
  h2: "Recent Land Rover Engine Quotes & Price Guide",
  h3: "Based on real enquiries from UK buyers - updated regularly. All prices are typical UK rebuilt engine market ranges and reflect recent quotes from our network of Land Rover engine specialists.",
  introBullets: [
    {
      label: "Real-Time Data",
      text: "View the 20 most recently requested Land Rover engine replacement enquiries to see genuine search patterns, not static stock listings.",
    },
    {
      label: "Transparent Pricing",
      text: "Benchmark the typical Land Rover engine replacement price UK and live Land Rover engine prices trends against actual market ranges.",
    },
    {
      label: "Cost Insights",
      text: "Understand the full Land Rover engine replacement cost and find affordable Land Rover engines UK by reviewing common failure reasons and quoted prices.",
    },
    {
      label: "Get Your Quote",
      text: "Use this guide to see what Land Rover owners are paying; for a tailored quote, enter your registration above.",
    },
  ],
  feed: {
    ...data.sections.liveMarketPrices.feed,
    visibleRows: 20,
    timestampLabel: "Last Updated",
  },
};

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
      image: "/images/brands/land-rover/models/land-rover-defender-model-card.webp",
    },
    {
      h3: "Land Rover Discovery Engines",
      slug: "discovery",
      subtitle: "Available for Discovery 3, 4, Discovery Sport & commercial variants",
      priceRange: "Starting from £1,500 - £4,500",
      cta: "Compare Discovery Engine Prices ->",
      image: "/images/brands/land-rover/models/land-rover-discovery-model-card.webp",
    },
    {
      h3: "Land Rover Freelander Engines",
      slug: "freelander",
      subtitle: "Available for Freelander 1 & Freelander 2 (all trims)",
      priceRange: "Starting from £900 - £2,500",
      cta: "Compare Freelander Engine Prices ->",
      image: "/images/brands/land-rover/models/land-rover-freelander-model-card.webp",
    },
    {
      h3: "Range Rover Engines",
      slug: "range-rover",
      subtitle: "Available for Range Rover, Sport, Evoque, Velar & Autobiography",
      priceRange: "Starting from £2,000 - £8,500",
      cta: "Compare Range Rover Engine Prices ->",
      image: "/images/brands/land-rover/models/land-rover-range-rover-model-card.webp",
    },
  ],
};

data.sections.commonProblems = {
  tag: "Common Problems",
  h2: "Common Land Rover Engine Problems - What It Costs to Fix & When Replacement Makes Sense",
  h3: "Land Rover's rugged engineering is celebrated off-road, but specific engine families dominate the UK replacement market due to predictable design weaknesses. The TDV6 V6 diesel, 5.0L V8 petrol, and 2.0L/2.2L TD4 units account for the highest volume of specialist enquiries we handle. Every rebuilt Land Rover engine supplied through EngineMarket's network features upgraded internal components engineered to eliminate these original failure points, backed by a minimum 12-month unlimited mileage warranty. Below is a practical breakdown of the most common failures, realistic repair costs, and when replacement genuinely offers better long-term value.",
  problems: [
    {
      group: "Crankshaft & Bearing Failure",
      h4: "The TDV6 V6 Critical Weakness",
      image: "/images/brands/land-rover/engines/land-rover-crankshaft-bearing-card.webp",
      affectedModels:
        "Land Rover Range Rover Sport L320/L494, Discovery 4, Defender L663 (2009-2018, 2.7L & 3.0L TDV6/SDV6)",
      typicalFailureMileage: "60,000-100,000 miles",
      rootCause:
        "The original main bearings lack sufficient clearance under sustained high-load off-road driving, leading to premature wear and oil starvation. This causes crankshaft flex, spun bearings, and often catastrophic block damage without clear warning.",
      recommendation:
        "On a TDV6 Land Rover, once you hear the characteristic deep knocking from the sump, the crankshaft has already compromised. A minor flush or standard reground rarely survives more than 10k-15k miles. We strongly recommend a fully rebuilt unit with a reinforced crankshaft and uprated oil pump to prevent repeat failure and protect the vehicle's resale value.",
      cta: "Compare rebuilt TDV6 engine prices with reinforced crankshafts",
    },
    {
      group: "Timing Chain Failure",
      h4: "Why Land Rover Petrol Engines Rattle & Stall",
      image: "/images/brands/land-rover/engines/land-rover-timing-chain-card.webp",
      affectedModels:
        "Land Rover Range Rover L405, Range Rover Sport L494, Discovery (2010-2018, 5.0L V8 AJ133 & 2.0L Si4 GTDi)",
      typicalFailureMileage: "70,000-120,000 miles",
      rootCause:
        "Original nylon tensioner guides degrade prematurely under thermal cycling, while plastic chain guides crack under sustained oil pressure. This leads to chain slack, mis-timed camshaft rotation, and eventual valve-piston contact if the chain jumps teeth.",
      recommendation:
        "If your 5.0L V8 or 2.0L Si4 exhibits a cold-start rattle or warning lights for camshaft correlation, replace the timing kit immediately. Catching it early keeps costs manageable, but if the chain has already jumped teeth or valves are damaged, a full rebuilt engine with upgraded metal guides is the only cost-effective path forward.",
      cta: "Get quotes for rebuilt 5.0L V8 and 2.0L Si4 engines",
    },
    {
      group: "Injector Seal Failure & Cylinder Head Damage",
      h4: "The 2.2L TD4 Carbon Buildup",
      image: "/images/brands/land-rover/engines/land-rover-injector-head-damage-card.webp",
      affectedModels:
        "Land Rover Defender Puma, Freelander 2, Discovery 4, Range Rover Evoque (2011-2018, 2.2L TD4 Ford Duratorq)",
      typicalFailureMileage: "75,000-110,000 miles",
      rootCause:
        "Copper injector base washers harden and lose their seal, allowing combustion gases and oil vapour to escape into the cylinder head galleries. This carbonises the injector seats, cracks the cylinder head, and eventually leads to compression loss or piston ring damage.",
      recommendation:
        "On a 2.2L TD4, ignoring a faint exhaust leak or oil vapour around the injectors quickly turns a £800 washer job into a complete engine failure. We advise replacing the injectors with new copper seats at the first sign of weeping, or opting for a fully rebuilt unit if bore scoring or low compression has already occurred.",
      cta: "Compare 2.2L TD4 replacement engine prices",
    },
    {
      group: "Coolant Intrusion & Turbo Failure",
      h4: "The Ingenium 2.0L/3.0L Weakness",
      image: "/images/brands/land-rover/engines/land-rover-coolant-turbo-card.webp",
      affectedModels:
        "Land Rover Range Rover Velar, Discovery 5, Defender L663, Range Rover Evoque (2015-present, 2.0L & 3.0L Ingenium Diesel)",
      typicalFailureMileage: "50,000-90,000 miles",
      rootCause:
        "The integrated EGR cooler and plastic coolant thermostat housing develop micro-fractures under heat cycling, allowing coolant to leak into the turbocharger centre section or mix with engine oil. This dilutes lubrication, causing turbo seal failure and potential hydrolock.",
      recommendation:
        "Ingenium coolant leaks often mask themselves until white smoke appears or the engine runs rough on cold starts. If diagnostic scans show coolant loss without external leaks, assume internal contamination. A complete rebuilt engine with upgraded cooling components is vastly more reliable than patching individual cooler and turbo components on a high-mileage unit.",
      cta: "Enquire about rebuilt Ingenium 2.0L and 3.0L diesel engines",
    },
  ],
  finalCta: {
    h4: "Don't Let Engine Failure Write Off Your Land Rover",
    paragraph:
      "Land Rover engine failures rarely happen overnight - but once warning signs appear, delaying repairs almost always multiplies the final bill. EngineMarket cuts through the main dealer premium by aggregating transparent quotes from trusted UK rebuild specialists, all using upgraded components and rigorous bench testing. Whether your Defender needs a TD4 refresh or your Range Rover Sport requires a TDV6 crankshaft upgrade, our network ensures you get specialist-grade reliability without the dealership markup.",
    buttonText: "Compare Land Rover Engine Replacement Prices Now ->",
    disclaimer:
      "All prices are indicative UK market ranges based on historical quote data and repair requests from our network of engine specialists. Dealer pricing is estimated based on published main dealer labour rates and genuine OEM parts pricing. Specialist pricing reflects actual quote data from EngineMarket's UK network. Actual costs vary depending on damage severity, vehicle condition, variant, and workshop location within the UK. Use our free comparison tool to get tailored quotes for your specific Land Rover model and engine code. Every engine supplied through EngineMarket carries a minimum 12-month unlimited mileage warranty - always confirm exact terms with your chosen supplier.",
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
        "A stripped, cleaned and fully inspected engine where all worn components are replaced with OEM-spec parts. Best for owners who want factory reliability without the factory price.",
      priceRange: "Typical price range: £1,500 - £4,500 (depending on engine code)",
      cta: "Compare reconditioned Land Rover engine prices ->",
    },
    {
      title: "Land Rover Rebuilt Engines",
      description:
        "A complete rebuild with upgraded components addressing known failure points - such as reinforced timing chains, uprated bearings and revised oil pumps - for a longer service life than a standard replacement.",
      priceRange: "Typical price range: £2,500 - £5,500",
      cta: "Get rebuilt Land Rover engine quotes ->",
    },
    {
      title: "Used Land Rover Engines",
      description:
        "A tested, low-mileage take-out unit from a donor vehicle. The most affordable option when budget is the priority, with verified history and warranty available.",
      priceRange: "Typical price range: £800 - £3,000",
      cta: "Check used Land Rover engine availability ->",
    },
    {
      title: "Land Rover Remanufactured Engines",
      description:
        "A factory-spec, as-new engine: every surface is machined, every component is replaced, and the unit is built to meet exact OEM tolerances. The premium choice for performance models like Range Rover Supercharged or SDV6.",
      priceRange: "Typical price range: £3,000 - £6,000",
      cta: "Compare remanufactured Land Rover engine costs ->",
    },
    {
      title: "Land Rover Refurbished Engines",
      description:
        "A lightly serviced, cleaned, and tested engine that works reliably but hasn't had a complete rebuild. Often a pragmatic, fast solution for older Defender or Discovery models where a full recon isn't economical.",
      priceRange: "Typical price range: £1,000 - £3,500",
      cta: "View refurbished Land Rover engine options ->",
    },
    {
      title: "Land Rover Supply & Fit Engines",
      description:
        "Your replacement engine delivered and professionally installed by a UK Land Rover specialist. Includes removal of the old unit, fitting, fluids, and a workmanship warranty.",
      priceRange: "Typical added cost: £500 - £1,500 on top of engine price",
      cta: "Find Land Rover engine supply & fit deals ->",
    },
  ],
  closing:
    "All engine types include a minimum 12-month warranty. Prices are typical UK market ranges and depend on exact engine code, supplier, and any additional fitting services. Use our free comparison tool to get a tailored quote for your Land Rover model today.",
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
          title: "1.5L Diesel Engines",
          description:
            "Compact three-cylinder diesel demand mainly comes from later Evoque and Discovery Sport applications. High-mileage replacements are usually driven by turbo actuator fatigue and injector seal degradation.",
          cta: "Get quotes for Land Rover 1.5L diesel engines ->",
        },
        {
          title: "2.0L Diesel Engines",
          description:
            "The core modern Land Rover diesel size, spanning TD4 and Ingenium families across Discovery Sport, Defender, Evoque and RR Sport. EGR cooler failures and high-pressure fuel pump wear are the most common replacement triggers.",
          cta: "Get quotes for Land Rover 2.0L diesel engines ->",
        },
        {
          title: "2.2L Diesel Engines",
          description:
            "Ford Duratorq-based 2.2 diesels power Freelander 2, Evoque and Defender-era applications. Copper washer injector leaks, oil cooler gasket issues and turbo oil feed degradation create most enquiries.",
          cta: "Get quotes for Land Rover 2.2L diesel engines ->",
        },
        {
          title: "2.5L Diesel Engines",
          description:
            "Td5-era five-cylinder diesel demand remains strong for Defender and Discovery restorations. Injector loom faults, head gasket fatigue and ageing ancillaries are the usual reasons owners move to replacement.",
          cta: "Get quotes for Land Rover 2.5L diesel engines ->",
        },
        {
          title: "2.7L Diesel Engines",
          description:
            "The original TDV6 2.7 powers Discovery 3 and early Range Rover Sport models. Oil pump pickup problems and crankshaft-related failures dominate this engine's replacement market.",
          cta: "Get quotes for Land Rover 2.7L diesel engines ->",
        },
        {
          title: "3.0L Diesel Engines",
          description:
            "From 306DT and SDV6 through to later Ingenium six-cylinder diesels, 3.0-litre replacements cover Discovery, Defender and Range Rover applications. Timing-system wear, injector tracking and turbo actuator faults remain the main issues.",
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
            "K-Series 1.8 petrol engines mainly serve Freelander 1 demand. Head gasket failure, VVC wear and cooling-system weakness are the common reasons for replacement.",
          cta: "Compare Land Rover 1.8L petrol engine prices ->",
        },
        {
          title: "2.0L Petrol Engines",
          description:
            "The standard premium petrol displacement across newer Defender, Discovery Sport, Evoque and Velar applications. Coolant crossover leaks and direct-injection carbon buildup drive most replacement demand.",
          cta: "Compare Land Rover 2.0L petrol engine prices ->",
        },
        {
          title: "2.5L Petrol Engines",
          description:
            "KV6 and related 2.5 petrol demand remains tied to older Freelander and Discovery-era applications. Timing tensioner failures and cooling issues are the usual triggers.",
          cta: "Compare Land Rover 2.5L petrol engine prices ->",
        },
        {
          title: "3.0L Petrol Engines",
          description:
            "AJ126 supercharged V6 petrol units support premium Range Rover and Sport models. Timing chain stretch and intercooler boost leaks are the most frequent replacement causes.",
          cta: "Compare Land Rover 3.0L petrol engine prices ->",
        },
        {
          title: "4.0L Petrol Engines",
          description:
            "Older Rover V8 4.0 demand remains relevant for Discovery 2 and P38-era owners. Coolant crossover failures, valley gasket leaks and ignition wear tend to drive replacement.",
          cta: "Compare Land Rover 4.0L petrol engine prices ->",
        },
        {
          title: "5.0L Petrol Engines",
          description:
            "AJ133 5.0 V8 and supercharged V8 engines power flagship Range Rover, Sport and Defender V8 models. Rod bearing wear, supercharger coupler noise and oil cooler thermostat issues lead most replacement enquiries.",
          cta: "Compare Land Rover 5.0L petrol engine prices ->",
        },
      ],
    },
    {
      title: "Hybrid & Electric Powertrains",
      items: [
        {
          title: "P400e PHEV Systems",
          description:
            "Land Rover plug-in hybrid applications pair the Ingenium 2.0 petrol architecture with electric assistance across Range Rover, Discovery Sport and Evoque lines. Replacement requires high-voltage safety checks, battery state-of-health diagnostics and specialist recalibration.",
          cta: "Enquire about Land Rover hybrid engine availability ->",
        },
      ],
    },
  ],
  closing:
    "Not sure which engine size your Land Rover needs? Enter your registration number and we'll match you to the exact engine code and displacement - instantly. All engines supplied with a minimum 12-month warranty from UK Land Rover specialists.",
};

data.sections.fuelTypes = {
  tag: "Complete Land Rover Engines List",
  h2: "Land Rover Engines by Fuel Type",
  intro:
    "Choose your Land Rover engine by fuel type to compare realistic replacement prices, known brand-wide issues, and UK specialist supply - from the most popular diesel workhorses to the latest electrified powertrains.",
  items: [
    {
      title: "Land Rover Diesel Engines",
      description:
        "Diesel dominates UK Land Rover replacement enquiries across Defender, Discovery and Range Rover lines, delivering torque-rich off-road capability though specific families require proactive component monitoring. TDV6 2.7L/3.0L, Ingenium 2.0 diesel, Ford Duratorq 2.2 TD4 and Ingenium 3.0 diesel families account for most replacement demand.",
      cta: "Get quotes for Land Rover Diesel replacement engines ->",
    },
    {
      title: "Land Rover Petrol Engines",
      description:
        "Petrol Land Rover engines balance refined on-road performance with off-road readiness, though specific families require vigilant timing system and cooling maintenance. AJ133 5.0L V8, Ingenium 2.0 petrol, Ford EcoBoost 2.0 and AJ126 3.0 Supercharged V6 units form the main petrol replacement market.",
      cta: "Compare Land Rover Petrol engine prices ->",
    },
    {
      title: "Land Rover Mild Hybrid (MHEV) Engines",
      description:
        "Land Rover integrated 48V mild-hybrid technology across Ingenium petrol and diesel families from 2020, improving stop-start refinement without altering the core engine architecture. Replacement work needs diagnostic reset capability and battery-health awareness alongside the combustion engine itself.",
      cta: "Enquire about Land Rover Mild Hybrid engine availability ->",
    },
    {
      title: "Land Rover Plug-in Hybrid (PHEV) Engines",
      description:
        "Land Rover PHEV variants pair Ingenium petrol engines with rear-axle electric motors for short-range zero-emission capability in premium Range Rover and Discovery Sport applications. Replacement stock is more limited and high-voltage safety isolation checks are essential.",
      cta: "Enquire about Land Rover Plug-in Hybrid engine availability ->",
    },
    {
      title: "Land Rover Electric Powertrains",
      description:
        "Land Rover's pure electric models remain limited in the UK market, but specialist motor, inverter and battery repair support is still available through verified high-voltage repair networks.",
      cta: "Enquire about Land Rover Electric motor repair or replacement ->",
    },
  ],
  closing:
    "Not sure which fuel type your Land Rover has? Enter your registration number above to instantly identify your model, engine code, fuel system and compatible replacement options - all backed by a minimum 12-month unlimited mileage warranty from UK Land Rover specialists.",
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
          image: "/images/brands/land-rover/engines/land-rover-204dtd-engine.webp",
          description:
            "The most common modern Land Rover engine code. Fitted to Discovery Sport (L550), Range Rover Evoque (L538), Discovery 5, Velar, and Range Rover Sport. Prone to timing-chain stretch, oil dilution from incomplete DPF regeneration, and turbocharger failure - often before 80,000 miles.",
          cta: "Get quotes for 204DTD / AJ200D Land Rover engine replacement ->",
        },
        {
          title: "204DTA 2.0L Diesel",
          image: "/images/brands/land-rover/engines/land-rover-204dta-engine.webp",
          description:
            "The higher-output variant of the Ingenium 2.0 diesel, producing 180-240 HP. Used in Range Rover Evoque, Discovery Sport and Velar. Shares the chain and oil-dilution issues of 204DTD and also suffers high-pressure fuel pump failures under sustained load.",
          cta: "Compare 204DTA Land Rover engine prices ->",
        },
        {
          title: "AJ20D6 3.0L Diesel",
          image: "/images/brands/land-rover/engines/land-rover-aj20d6-engine.webp",
          description:
            "The 3.0-litre Ingenium six-cylinder diesel, producing 250-300 HP. Found in Range Rover (L405, 2018+), Range Rover Sport (L494, 2018+), and Discovery 5. Early examples suffered crankshaft bearing wear, though later revisions improved this.",
          cta: "Get quotes for AJ20D6 3.0L Land Rover diesel engines ->",
        },
      ],
    },
    {
      name: "TDV6 / SDV6 Diesel Family (2004-2018)",
      entries: [
        {
          title: "276DT 2.7L TDV6 Diesel",
          image: "/images/brands/land-rover/engines/land-rover-276dt-engine.webp",
          description:
            "The original TDV6 used in Discovery 3 and early Range Rover Sport models. Notorious for catastrophic crankshaft failure, oil-pump housing disintegration, and snapped timing belts that often write off the whole engine.",
          cta: "Compare 276DT TDV6 Land Rover engine replacement costs ->",
        },
        {
          title: "306DT 3.0L TDV6 Diesel",
          image: "/images/brands/land-rover/engines/land-rover-306dt-engine.webp",
          description:
            "The 3.0-litre TDV6 producing 211-245 HP for Discovery 4, Range Rover Sport and Range Rover applications. Shares the 2.7 crankshaft-bearing vulnerability with added EGR cooler and turbo actuator failures.",
          cta: "Get quotes for 306DT 3.0L Land Rover TDV6 engines ->",
        },
        {
          title: "306DTX 3.0L SDV6 Diesel",
          image: "/images/brands/land-rover/engines/land-rover-306dtx-engine.webp",
          description:
            "The sequential twin-turbo SDV6 producing 250-306 HP for Discovery 4, Range Rover Sport and Range Rover. Crankshaft failure remains the critical risk, with secondary turbo actuator seizure also common.",
          cta: "Compare 306DTX SDV6 engine prices from UK specialists ->",
        },
      ],
    },
    {
      name: "Defender Diesel Engines (2007-2016)",
      entries: [
        {
          title: "ZSD-424 2.4L Puma TDCi Diesel",
          image: "/images/brands/land-rover/engines/land-rover-zsd-424-engine.webp",
          description:
            "The Ford Duratorq-based Puma engine producing 122 HP for Defender 90/110/130 models. Well-documented for injector seal failure, EGR valve clogging, and VNT turbo mechanism sticking.",
          cta: "Get quotes for ZSD-424 Land Rover Defender Puma engine replacement ->",
        },
        {
          title: "244DT 2.4L Diesel",
          image: "/images/brands/land-rover/engines/land-rover-244dt-engine.webp",
          description:
            "A badge-engineered variant of the ZSD-424 used across Defender Station Wagon, Pickup, Cabrio and Platform/Chassis models. Shares the injector-seal and VNT turbo issues of the core Puma engine.",
          cta: "Compare 244DT Land Rover Defender engine prices ->",
        },
      ],
    },
    {
      name: "V8 Petrol Engines (2009-Present)",
      entries: [
        {
          title: "508PN 5.0L Supercharged V8 Petrol",
          image: "/images/brands/land-rover/engines/land-rover-508pn-engine.webp",
          description:
            "Jaguar Land Rover's flagship AJ133 5.0-litre supercharged V8, producing 375-510 HP. The primary failure point is timing-chain tensioner wear, with supercharger coupler wear and cooling leaks also common at higher mileage.",
          cta: "Get quotes for 508PN 5.0 Supercharged Land Rover V8 engines ->",
        },
        {
          title: "448PN 4.4L V8 Petrol",
          image: "/images/brands/land-rover/engines/land-rover-448pn-engine.webp",
          description:
            "The naturally aspirated 4.4-litre V8 producing 299 HP for Discovery 3 and Range Rover Sport. Timing-chain guide-rail disintegration and VANOS solenoid failure are the main reasons for replacement.",
          cta: "Compare 448PN Land Rover V8 engine replacement prices ->",
        },
      ],
    },
    {
      name: "Other High-Demand Engine Codes",
      entries: [
        {
          title: "224DT 2.2L Diesel",
          image: "/images/brands/land-rover/engines/land-rover-224dt-engine.webp",
          description:
            "Used in Freelander 2 and early Range Rover Evoque models. Generally reliable compared to some Land Rover diesels, but EGR valve failure and turbo oil-feed pipe blockages appear at higher mileage.",
          cta: "Get quotes for 224DT 2.2L Land Rover diesel engines ->",
        },
        {
          title: "DW12BTED4 2.7L Diesel",
          image: "/images/brands/land-rover/engines/land-rover-dw12bted4-engine.webp",
          description:
            "A PSA/Ford co-developed 2.7-litre V6 diesel used in early Discovery 3 and Range Rover Sport models. EGR clogging and turbocharger oil leaks are the most common replacement triggers.",
          cta: "Compare DW12BTED4 Land Rover engine prices from UK suppliers ->",
        },
        {
          title: "306PS 3.0L Supercharged V6 Petrol",
          image: "/images/brands/land-rover/engines/land-rover-306ps-engine.webp",
          description:
            "The 3.0-litre supercharged V6 petrol used in later Range Rover Sport and Range Rover models. Timing-chain tensioner wear and supercharger-related issues affect higher-mileage examples.",
          cta: "Get quotes for 306PS Land Rover petrol engine replacement ->",
        },
      ],
    },
  ],
  closing:
    "Can't find your engine code listed above? Use our full Land Rover engine code directory below - every code from the last 35 years - or enter your registration number for an instant match to the correct replacement engine with warranty.",
  directory: {
    h3: "Full Land Rover Engine Code Directory (All Years)",
    label: "View all Land Rover engine codes (90+ codes, 1990-2025)",
    intro:
      "A comprehensive alphabetical listing of every Land Rover engine code from the last 35 years. Use the search above or enter your registration for an instant match to your specific engine. All codes link to a quote request.",
    codes: [
      ["10 H", "Petrol"],
      ["10 J", "Diesel"],
      ["11 D", "Diesel"],
      ["11 L", "Petrol"],
      ["11 H", "Petrol"],
      ["12 L", "Petrol"],
      ["13 L", "Petrol"],
      ["15 P", "Diesel"],
      ["16 L", "Petrol"],
      ["17 L", "Petrol"],
      ["18 K4F", "Petrol"],
      ["19 L", "Petrol"],
      ["20 H", "Petrol"],
      ["20 T2N", "Petrol"],
      ["204D3", "Diesel"],
      ["204DTA", "Diesel"],
      ["204DTD", "Diesel"],
      ["204PT", "Petrol"],
      ["21 L", "Petrol"],
      ["22 D", "Diesel"],
      ["22 L", "Petrol"],
      ["224DT", "Diesel"],
      ["23 J", "Diesel"],
      ["23 L", "Petrol"],
      ["24 D", "Diesel"],
      ["25 D", "Diesel"],
      ["25 6T", "Petrol"],
      ["25 K4F", "Petrol"],
      ["276DT", "Diesel"],
      ["306D1", "Diesel"],
      ["306DT", "Diesel"],
      ["306PS", "Petrol"],
      ["30DDTX", "Diesel"],
      ["31 D", "Diesel"],
      ["35 D", "Diesel"],
      ["36 D", "Diesel"],
      ["368DT", "Diesel"],
      ["37 D", "Diesel"],
      ["37 L", "Petrol"],
      ["38 D", "Diesel"],
      ["40 D", "Diesel"],
      ["406PN", "Petrol"],
      ["42 D", "Diesel"],
      ["428PS", "Petrol"],
      ["448DT", "Diesel"],
      ["448PN", "Petrol"],
      ["46 D", "Diesel"],
      ["508PN", "Petrol"],
      ["508PS", "Petrol"],
      ["B6324S", "Petrol"],
      ["B6323T", "Petrol"],
      ["DW12BTED4", "Diesel"],
      ["M47", "Diesel"],
      ["M62B44", "Petrol"],
      ["PT204", "Petrol"],
      ["P300", "Petrol"],
      ["P400", "Petrol"],
      ["P510", "Petrol"],
      ["L34", "Petrol"],
      ["L414", "Petrol"],
    ].map(([code, fuel]) => ({ code, fuel })),
  },
};

data.sections.engineYears = {
  tag: "Engine Years",
  h2: "Land Rover Engines by Year - What Was Fitted & When",
  intro:
    "This section maps every major Land Rover engine change across the full UK model range - from the Td5 and 300Tdi workhorses of the late 1990s through BMW-sourced V8s, TDV6, the Ingenium family launch, and today's MHEV and PHEV inline-six platforms - organised so owners can identify their exact engine by vehicle year and compare rebuilt engine prices from UK Land Rover specialists.",
  jumpLabel: "Jump to year",
  years: [
    {
      year: "1998",
      preview: "Td5 arrives in Discovery II and Defender, 300Tdi overlap remains",
      description:
        "January 1998 brought the Td5 five-cylinder turbodiesel to Discovery II, with Defender adopting it later that year. Early 10P engines are remembered for oil pump drive bolt and head stud weakness, while 15P revisions resolved those issues.",
      cta: "Get quotes for 1998 Land Rover Td5 replacement engines ->",
    },
    {
      year: "1999-2001",
      preview: "Td5 stabilises, P38 ends with BMW diesel and Rover V8 options",
      description:
        "These years consolidated the improved 15P Td5 across Discovery II and Defender while the ageing Range Rover P38 closed out with BMW 2.5 TD six-cylinder diesel and Rover V8 petrol power.",
      cta: "Compare 1999-2001 Land Rover Discovery II and Range Rover P38 replacement engine prices ->",
    },
    {
      year: "2002-2003",
      preview: "Range Rover L322 launches with BMW 4.4 V8 and 3.0 TD6",
      description:
        "The third-generation Range Rover L322 debuted BMW-sourced 4.4 V8 petrol and 3.0 TD6 diesel power, while Discovery II and Defender continued with improved Td5 units and Freelander retained K-Series and BMW-sourced smaller engines.",
      cta: "Get quotes for 2002-2003 Range Rover L322, Discovery II and Defender engines ->",
    },
    {
      year: "2004",
      preview: "Discovery 3 launches the 2.7 TDV6 era",
      description:
        "Discovery 3 introduced the 2.7 TDV6 Lion V6 diesel, replacing Td5 in that platform and setting the tone for a decade of TDV6/SDV6 demand. Range Rover L322 continued BMW-sourced engines and Defender kept the Td5 alive.",
      cta: "Find rebuilt 2004 Land Rover Discovery 3 TDV6 replacement engines ->",
    },
    {
      year: "2005-2006",
      preview: "Range Rover Sport arrives, Freelander 2 debuts, 2.2 TD4 starts",
      description:
        "Range Rover Sport L320 launched with 2.7 TDV6 and supercharged V8 options, while Freelander 2 debuted the Ford/PSA 2.2 Duratorq TD4. Late 2006 also brought the 3.6 TDV8 to Range Rover L322.",
      cta: "Get quotes for 2005-2006 Range Rover Sport, Freelander 2 and Discovery 3 engines ->",
    },
    {
      year: "2007",
      preview: "Defender swaps Td5 for the 2.4 Puma TDCi",
      description:
        "2007 ended the Td5 era in Defender and introduced the Ford-sourced 2.4-litre DuraTorq TDCi Puma diesel with a six-speed gearbox. Discovery 3, Range Rover Sport and Freelander 2 engine ranges carried on unchanged.",
      cta: "Find replacement 2007 Land Rover Defender 2.4 TDCi Puma engines ->",
    },
    {
      year: "2008-2009",
      preview: "Discovery 4, 3.0 SDV6 and 5.0 V8 transform the range",
      description:
        "Discovery 4 introduced the stronger 3.0 TDV6 / SDV6, and Range Rover / RR Sport gained the landmark 5.0 V8 and 5.0 Supercharged V8. This period still defines a huge share of Land Rover replacement demand today.",
      cta: "Compare 2008-2009 Discovery 4, Range Rover Sport and Range Rover replacement engine prices ->",
    },
    {
      year: "2010-2011",
      preview: "4.4 TDV8 expands, Freelander eD4 appears, Defender readies 2.2",
      description:
        "The 4.4 TDV8 delivered prestige-diesel power in Range Rover and Sport applications, while Freelander 2 added eD4 economy variants. The Defender also moved toward the 2.2 TDCi emissions-compliant era.",
      cta: "Get quotes for 2010-2011 Range Rover and Discovery 4 TDV8 / SDV6 engines ->",
    },
    {
      year: "2012",
      preview: "Defender 2.2 TDCi arrives, Discovery 4 and late L322 mature",
      description:
        "2012 brought the 2.2 TDCi Euro 5 update to Defender while Discovery 4 and late Range Rover Sport continued their established SDV6 and V8 lineups. It is also the final mature year of the L322 Range Rover.",
      cta: "Find 2012 Land Rover Defender 2.2 TDCi and Discovery 4 SDV6 replacement engines ->",
    },
    {
      year: "2013-2014",
      preview: "Range Rover L405 and Sport L494 launch on aluminium architecture",
      description:
        "The L405 Range Rover and L494 Sport introduced a lighter aluminium platform with revised 3.0 SDV6, 4.4 SDV8 and 5.0 Supercharged V8 options. These years also signalled the beginning of Land Rover's modern premium engine era.",
      cta: "Get quotes for 2013-2014 Range Rover L405 and Range Rover Sport L494 engines ->",
    },
    {
      year: "2015-2016",
      preview: "Ingenium 2.0 diesel debuts in Discovery Sport and Evoque",
      description:
        "Land Rover's own 2.0 Ingenium diesel replaced the old Ford-sourced family in Discovery Sport and Evoque applications. It was a major technical shift, but early 2015-2018 examples also became the highest-risk period for timing-chain-related failures.",
      cta: "Compare 2015-2016 Discovery Sport and Evoque Ingenium replacement engine prices ->",
    },
    {
      year: "2017",
      preview: "Discovery 5 and Velar launch, Ingenium six-cylinder diesel begins",
      description:
        "2017 introduced Discovery 5 and Range Rover Velar, alongside the first Land Rover use of the Ingenium inline-six diesel. The 3.0 six-cylinder earned stronger reliability marks than the earlier 2.0 four-cylinder diesel.",
      cta: "Find rebuilt 2017 Discovery 5 and Range Rover Velar replacement engines ->",
    },
    {
      year: "2018-2019",
      preview: "Range Rover PHEV arrives, revised Ingenium chain spec rolls out",
      description:
        "The Range Rover P400e launched Land Rover's first production plug-in hybrid, while revised timing chain tensioners improved later Ingenium 2.0 diesel reliability. This is also the point where PHEV demand begins to matter in the UK market.",
      cta: "Get quotes for 2018-2019 Range Rover PHEV, Discovery Sport and Velar replacement engines ->",
    },
    {
      year: "2020-2021",
      preview: "New Defender L663, 3.0 MHEV petrol and diesel, P300e expands",
      description:
        "The new Defender cemented Ingenium as Land Rover's future, bringing 2.0 petrol, 3.0 MHEV diesel and 3.0 MHEV petrol power across the range. Discovery Sport and Evoque also expanded with P300e plug-in hybrid demand.",
      cta: "Get quotes for 2020-2021 New Defender, Discovery Sport and Discovery 5 replacement engines ->",
    },
    {
      year: "2022-Present",
      preview: "Range Rover L460, BMW 4.4 V8 return, larger-battery PHEV era",
      description:
        "The latest Range Rover and Sport range combine mature Ingenium six-cylinder MHEV engines with the return of BMW 4.4 twin-turbo V8 power and larger-battery PHEV systems. It marks Land Rover's most complete electrified powertrain lineup to date.",
      cta: "Get 2022-onwards Range Rover L460, L461 and Defender replacement engine quotes ->",
    },
  ],
  closing:
    "Not sure which year your Land Rover was built? Enter your registration number and we'll identify the exact engine, model year, and compatible replacement options instantly - all backed by a minimum 12-month warranty from UK Land Rover specialists.",
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
        "Land Rover engine replacement costs usually land between £2,800-£5,200 through specialists, or £6,000-£10,500 at main dealers, depending on engine family, damage severity and model. Reconditioned units with upgraded components offer the best long-term value, and prices should always be checked with fitment and warranty included.",
      cta: "Get instant Land Rover engine replacement quotes for your model ->",
    },
    {
      question: "Which Land Rover engine is the most reliable?",
      answer:
        "The 3.0L TDV6 with uprated bearings and the later Ingenium diesels rank among the most dependable options when their weak points have already been upgraded. Early timing-chain and pre-2015 TDV6 crankshaft risks are the main reasons rebuilt units with documented upgrades outperform unknown used engines.",
      cta: "Compare reliable Land Rover engine options with upgrade histories ->",
    },
    {
      question: "Is the TDV6 engine really that unreliable?",
      answer:
        "Early TDV6 engines earned their reputation because crankshaft bearing failures can appear between 60,000 and 100,000 miles. A rebuilt TDV6 with forged crankshaft, uprated bearings and reinforced oil pump parts removes the original weak point and is far more dependable than an untouched used unit.",
      cta: "Find rebuilt TDV6 engines with reinforced crankshafts for your Range Rover or Discovery ->",
      warning: "TDV6 crankshaft failure can seize the engine without warning once bearing wear begins.",
    },
    {
      question: "What causes Land Rover timing chain failure?",
      answer:
        "Timing chain failure usually comes from plastic guide degradation and tensioner wear, particularly on 5.0L V8 and early Ingenium petrol engines. Cold-start rattles are the warning sign to act on quickly, because once the chain jumps teeth the engine can suffer immediate valve damage.",
      cta: "Compare Land Rover engines fitted with upgraded metal timing components ->",
      warning: "A jumped timing chain on Land Rover petrol engines can bend valves instantly.",
    },
    {
      question: "Should I buy a used Land Rover engine or reconditioned?",
      answer:
        "Reconditioned Land Rover engines usually offer far better long-term value than used units because they include new bearings, seals, gaskets, known-upgrade parts and a warranty. Used engines can look cheaper upfront, but hidden wear and unknown service history often make them a false economy within months.",
      cta: "Compare used versus reconditioned Land Rover engine prices and warranties now ->",
    },
    {
      question: "How long do Land Rover diesel engines last?",
      answer:
        "Well-maintained Land Rover diesel engines can reach 150,000-200,000 miles, but specific families like early TDV6 and 2.2L TD4 units often fail sooner because of known design weaknesses. Regular oil changes, timely EGR cleaning and early leak repairs make a major difference, and a rebuilt engine with upgraded parts effectively resets the clock.",
      cta: "Find long-life rebuilt Land Rover diesel engines with upgrade histories ->",
    },
    {
      question: "Is it worth replacing a Land Rover engine or should I scrap the car?",
      answer:
        "Replacing a Land Rover engine is usually worth it if the chassis, transmission and interior are still strong, because specialist rebuilds often cost £2,800-£5,200 versus £8,000+ for a comparable used replacement vehicle. Scrapping only becomes the smart option if several other major systems also need expensive work.",
      cta: "Get a tailored Land Rover engine replacement quote to decide today ->",
    },
    {
      question: "What's the difference between Land Rover Ingenium and older diesel engines?",
      answer:
        "Ingenium diesels use modular aluminium construction, improved emissions systems and later 48V mild-hybrid support compared with older Ford-sourced TD4/TDV6 units. Early Ingenium engines had coolant and timing-system teething problems, but later revisions and quality rebuilt units with upgraded cooling parts have improved the picture significantly.",
      cta: "Compare rebuilt Ingenium versus TDV6 Land Rover engine options and prices ->",
    },
    {
      question: "Can Land Rover engines be remapped safely?",
      answer:
        "Land Rover engines can be remapped safely when the work is carried out by specialists using conservative tune files that respect the original oiling, cooling and turbo limits. Aggressive remaps on TDV6 or Ingenium diesels increase the risk of over-boost, EGR failure and premature bearing wear, so warranty-safe tuning matters.",
      cta: "Find Land Rover engine specialists who offer conservative, warranty-safe remapping options ->",
    },
    {
      question: "Are Land Rover petrol engines more reliable than diesel?",
      answer:
        "Petrol Land Rover engines avoid diesel-specific issues like DPF clogging and EGR buildup, but they bring their own risks such as timing chain guide wear and coolant intrusion on early Ingenium petrol units. In practice, reliability depends more on maintenance history and whether the known weak points have already been upgraded than on fuel type alone.",
      cta: "Compare rebuilt Land Rover petrol engine prices with upgraded timing components ->",
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
      description:
        "Every garage and engine rebuilder in our network is vetted, rated, and reviewed by real customers.",
    },
    {
      title: "Compare Land Rover Engine Replacement Companies",
      description:
        "See prices, warranty terms, and fitting options side-by-side before you commit.",
    },
    {
      title: "UK Engine Replacement Services for Land Rover",
      description:
        "Covering every model from Defender to Range Rover, with supply-only or supply-and-fit available nationwide.",
    },
  ],
  finalText:
    "Find the best Land Rover engine replacement UK drivers rely on. Compare prices from trusted specialists today and get back on the road with confidence.",
  buttonText: "Compare Land Rover Engine Prices Now ->",
};

const repaired = repairDeep(data);
fs.writeFileSync(filePath, `${JSON.stringify(repaired, null, 2)}\n`);
console.log("Updated land-rover.json");
