export type ComparisonGuide = {
  slug: string;
  title: string;
  description: string;
  comparisonRows: Array<[string, string, string]>;
  technicalRows: Array<[string, string, string]>;
  priceRows: Array<[string, string, string, string, string]>;
  regionalRows: Array<[string, string, string, string]>;
  faqs: Array<{ question: string; answer: string }>;
};

export const usedVsRebuiltEngine: ComparisonGuide = {
  slug: "used-vs-rebuilt-engine",
  title: "Used vs Rebuilt Engine Cost & Risk Analysis 2026",
  description: "Used vs rebuilt engine UK comparison 2026. Used costs £500-£1,500, rebuilt £1,500-£5,600+. Decision rules, price breakdowns, and real-world scenarios. Based on 24,650 quotes.",
  comparisonRows: [
    ["Cost (supply only)", "£500-£1,500", "£1,500-£5,600+"],
    ["Cost (fitted)", "£1,000-£4,000", "£2,500-£7,000+"],
    ["Warranty", "1-6 months (limited, parts only)", "12-24 months (parts + labour)"],
    ["Vehicle off-road", "3-5 days", "1-3 weeks"],
    ["Best for", "Low-value vehicles (<£4,000)", "Premium vehicles (£15,000+)"],
    ["Risk level", "High", "Medium (downtime-related)"],
    ["Matching-numbers", "Lost (different engine)", "Preserved (original engine retained)"],
    ["Labour content", "Low (removal + fitting)", "High (60-70% of cost)"],
  ],
  technicalRows: [
    ["Internal inspection", "Minimal - external visual only", "Full strip-down to bare block"],
    ["Bearings (main + big-end)", "Original, unknown wear", "New - replaced"],
    ["Pistons + rings", "Original, unknown condition", "New - replaced"],
    ["Gaskets + seals", "Old, may be degraded", "New - fully replaced"],
    ["Timing components", "Unknown condition (high risk)", "New - replaced"],
    ["Oil pump", "Original, unknown condition", "Inspected, replaced if worn"],
    ["Injectors", "Original, unknown condition", "Tested, cleaned or replaced"],
    ["Turbocharger", "Original, unknown condition", "Inspected, replaced if worn"],
    ["Testing", "Basic compression test (at best)", "Professional dynamic testing"],
    ["Warranty structure", "Limited parts-only (1-6 months)", "Full parts + labour (12-24 months)"],
    ["Vehicle off-road", "3-5 days", "1-3 weeks"],
    ["Labour content", "Low (removal + fitting)", "High (60-70% of cost)"],
    ["Matching-numbers", "Lost (different engine)", "Preserved (original engine retained)"],
  ],
  priceRows: [
    ["Small car (Ford Fiesta 1.25)", "£300-£700", "£700-£1,500", "£1,435-£1,850", "£2,000-£2,800"],
    ["Family car (VW Golf 2.0 TDI)", "£800-£1,500", "£1,500-£2,800", "£3,000-£4,500", "£4,000-£6,000"],
    ["Executive (BMW 3 Series 2.0D)", "£1,200-£2,500", "£2,500-£4,500", "£3,800-£5,600", "£5,000-£7,500"],
    ["Premium SUV (Range Rover 3.0 V6)", "£2,500-£4,500", "£4,500-£7,000", "£5,500-£8,500", "£7,500-£10,500"],
    ["Performance (BMW M, Mercedes AMG)", "£3,000-£6,000", "£5,000-£8,500", "£8,000-£15,000+", "£10,000-£18,000+"],
  ],
  regionalRows: [
    ["Scotland, NI, rural", "£55-£80/hr", "£550-£800", "£880-£1,280"],
    ["North England, Midlands, Wales", "£65-£95/hr", "£650-£950", "£1,040-£1,520"],
    ["South England (excl. London/SE)", "£75-£110/hr", "£750-£1,100", "£1,200-£1,760"],
    ["London & South East", "£110-£160/hr", "£1,100-£1,600", "£1,760-£2,560"],
  ],
  faqs: [
    { question: "What's the real difference between used and rebuilt?", answer: "A used engine is removed from a donor vehicle and sold as-is with minimal inspection and a short warranty (1-6 months). A rebuilt engine is your original engine, fully disassembled, machined, and rebuilt with new pistons, rings, bearings, timing components, gaskets, and seals. The rebuilt option preserves matching-numbers and typically includes 12-24 months warranty." },
    { question: "How much does a used engine cost fitted?", answer: "Used engine fitted costs range from £1,000 to £4,000 depending on engine type and labour rates. Supply-only costs are £500-£1,500. Fitting adds £500-£2,500. See the price breakdown table above for specific engine types." },
    { question: "How much does a rebuilt engine cost fitted?", answer: "Rebuilt engine fitted costs range from £2,500 to £7,000+ for most 4-cylinder engines, up to £10,000-£18,000+ for performance V8s. Supply-only costs are £1,500-£5,600+ for 4-cylinder engines, up to £8,000-£15,000+ for V8s. Labour accounts for 60-70% of the total cost." },
    { question: "What does a full rebuild include?", answer: "A full rebuild includes block cleaning and machining, crank regrinding if required, new bearings, pistons and rings, gaskets and seals, timing chain and tensioner, oil pump inspection, injector testing, turbo inspection, cylinder-head inspection and pressure testing, and hot and cold dynamic testing." },
    { question: "Is a rebuilt engine better than a used engine?", answer: "A rebuilt engine is objectively better in reliability, longevity and performance because it is restored to near-new condition with wear parts replaced. However, it costs more and requires 1-3 weeks downtime. Used engines suit lower-value vehicles; rebuilds suit premium, classic or enthusiast vehicles." },
    { question: "What's the difference between reconditioned and rebuilt?", answer: "In the UK engine industry the terms are often used interchangeably. A reconditioned engine typically means an exchange unit: you buy a ready-to-fit replacement and do not get your original engine back. A rebuild restores your own original engine, preserving matching-numbers." },
    { question: "Should I choose used or rebuilt for my car?", answer: "If your vehicle is worth under £4,000, a used engine usually minimises financial loss. At £15,000+ or where sentimental or matching-numbers value matters, a rebuild can protect the investment. Between £4,000 and £15,000, compare both options and consider reconditioned as a middle ground." },
    { question: "What warranty do I get with each option?", answer: "Used engines usually carry a 1-6 month limited, parts-only warranty. Rebuilt engines commonly include 12-24 months parts and labour warranty. Always check the supplier terms in writing. Engines Market does not provide warranties; we connect you with suppliers who do." },
    { question: "How long does a rebuild take?", answer: "A full engine rebuild typically takes 1-3 weeks from drop-off to completion, including disassembly, machining, parts ordering, reassembly and testing. Used engines can usually be fitted in 3-5 days. Plan ahead and arrange alternative transport if needed." },
    { question: "Is a rebuilt engine as good as new?", answer: "A rebuilt engine can deliver up to 94% of a new engine's performance at 40-60% less cost. With new pistons, rings, bearings, timing components and professional machining, the engine is restored to near-new condition. For most owners, the difference is imperceptible." },
    { question: "Is engine replacement covered by car insurance?", answer: "Only if you have comprehensive cover and the damage follows an insured event such as an accident, fire or theft. Mechanical failure is not usually covered. A third-party or used-car warranty may cover engine failure, so check your policy." },
    { question: "Do I need to tell my insurer about an engine replacement?", answer: "Yes. Any major mechanical change, including an engine replacement or rebuild, must be declared to your insurer. Failing to do so could invalidate your insurance. Record the new engine code and number, or rebuild documentation, on your V5C and insurance policy." },
  ],
};
