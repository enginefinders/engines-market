/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const dataDir = path.join(
  "C:",
  "Users",
  "Rahma",
  "new_engine",
  "engine-market",
  "data",
  "brands",
);

const files = fs
  .readdirSync(dataDir)
  .filter((file) => file.endsWith(".json"))
  .sort();

const CTA_PREFIX = "Compare";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeFuel(value) {
  const text = String(value || "").toLowerCase();
  if (!text) return null;
  if (
    text.includes("plug-in hybrid") ||
    text.includes("mhev") ||
    text.includes("phev") ||
    text.includes("hybrid")
  ) {
    return "Hybrid";
  }
  if (text.includes("electric") || text.includes("bev") || text.includes("ev")) {
    return "Electric";
  }
  if (text.includes("diesel")) return "Diesel";
  if (text.includes("petrol") || text.includes("gasoline")) return "Petrol";
  return null;
}

function stripRedMarkers(text) {
  return String(text)
    .replace(
      /\s*🔴\s*(Major Engine Family Introduction|Performance Landmark|Technology Introduction)/g,
      "",
    )
    .replace(/🔴/g, "");
}

function stripInstructionNoise(text) {
  let next = String(text);

  next = next.replace(/##\s*Keyword Coverage Table[\s\S]*$/i, "");
  next = next.replace(/Keyword Coverage Table[\s\S]*$/i, "");
  next = next.replace(/Developer Implementation Notes[\s\S]*$/i, "");
  next = next.replace(/Master Prompt[\s\S]*$/i, "");
  next = next.replace(
    /\*?`?\s*button should pre-fill the engine code in the quote request form\.?/gi,
    "",
  );
  next = next.replace(/\bbutton for each row\.\s*/gi, "");
  next = next.replace(
    /Common failure points \(expandable[^)]*\):/gi,
    "Common failure points:",
  );
  next = next.replace(/``/g, "");
  next = next.replace(
    /##\s*Not sure which engine code your .*? specialists\./gi,
    "",
  );
  next = next.replace(
    /Not sure which engine code your .*? specialists\./gi,
    "",
  );
  next = next.replace(/Closing line \(Block A\):.*$/gi, "");
  next = next.replace(/\s+\|\s*$/g, "");
  next = next.replace(/\s{2,}/g, " ");

  return next.trim();
}

function cleanString(text) {
  if (typeof text !== "string") return text;
  return stripInstructionNoise(stripRedMarkers(text)).trim();
}

function walkAndClean(value) {
  if (typeof value === "string") return cleanString(value);
  if (Array.isArray(value)) return value.map((item) => walkAndClean(item));
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = walkAndClean(value[key]);
    }
  }
  return value;
}

function makeHeroNote(brandName) {
  return `Secure enquiry — no spam, no pressure. Genuine quotes only from vetted UK ${brandName} specialists.`;
}

function buildFallbackCta(brandName, problemTitle) {
  const base = cleanString(problemTitle || "").replace(/[–—:|].*$/, "").trim();
  if (!base) {
    return `${CTA_PREFIX} ${brandName} replacement engine quotes`;
  }
  return `${CTA_PREFIX} ${brandName} replacement engine quotes for ${base.toLowerCase()}`;
}

function inferFuelTypes(sections, brandName) {
  const models = unique(
    (sections.models?.cards || [])
      .map((card) => cleanString(card.h3 || ""))
      .filter(Boolean),
  );

  const codes = [
    ...((sections.engineCodeDirectory?.directory?.codes || []).map((code) => ({
      fuel: normalizeFuel(code.fuel),
      code: cleanString(code.code || ""),
    })) || []),
    ...((sections.engineCodes?.groups || []).flatMap((group) =>
      (group.engines || []).map((engine) => ({
        fuel: normalizeFuel(engine.fuel),
        code: cleanString(engine.code || ""),
      })),
    ) || []),
  ];

  const orderedFuels = ["Diesel", "Petrol", "Hybrid", "Electric"];
  const presentFuels = unique(codes.map((entry) => entry.fuel)).filter(Boolean);

  if (!presentFuels.length) {
    const groupTitleFuels = (sections.engineSizes?.groups || [])
      .map((group) => normalizeFuel(group.title))
      .filter(Boolean);
    presentFuels.push(...unique(groupTitleFuels));
  }

  const fuelSet = unique(presentFuels);
  if (!fuelSet.length) fuelSet.push("Petrol");

  const sizeGroups = sections.engineSizes?.groups || [];
  const engineGroups = sections.engineCodes?.groups || [];

  return orderedFuels
    .filter((fuel) => fuelSet.includes(fuel))
    .map((fuel) => {
      const matchingGroupTitles = unique(
        engineGroups
          .filter((group) =>
            (group.engines || []).some(
              (engine) => normalizeFuel(engine.fuel) === fuel,
            ),
          )
          .map((group) => cleanString(group.name || "")),
      ).slice(0, 4);

      const matchingFailurePoints = unique(
        sizeGroups
          .filter((group) => normalizeFuel(group.title) === fuel)
          .flatMap((group) => group.items || [])
          .flatMap((item) => item.commonFailurePoints || [])
          .map((point) => cleanString(point)),
      ).slice(0, 4);

      const typicalModels = models.slice(0, 4);
      const families = matchingGroupTitles.length
        ? matchingGroupTitles
        : unique(
            codes
              .filter((entry) => entry.fuel === fuel)
              .map((entry) => entry.code),
          ).slice(0, 4);

      const descriptionByFuel = {
        Diesel: `${brandName} diesel engines cover many of the brand's highest-mileage UK models. Replacement demand is usually driven by timing system wear, injector and turbo faults, plus EGR or DPF-related damage once repeat short-journey use starts affecting reliability.`,
        Petrol: `${brandName} petrol engines span everything from core daily-driver models to higher-output performance variants. Most replacement enquiries start with timing chain noise, oil consumption, cooling-system failure, or internal wear that makes a warranted replacement more sensible than repeated repairs.`,
        Hybrid: `${brandName} hybrid powertrains combine combustion engines with electric assistance across newer electrified models. Replacement demand is lower than traditional petrol or diesel units, but generator-engine faults, inverter issues, cooling-system failures, and calibration-sensitive repairs still require specialist support.`,
        Electric: `${brandName} electric powertrains use high-voltage drive motors and supporting control systems rather than conventional engine internals. Failures are less common, but inverter faults, bearing noise, resolver issues, or battery-related drivetrain problems still require specialist diagnosis and replacement support.`,
      };

      const descriptorByFuel = {
        Diesel: "High-mileage motorway and SUV applications",
        Petrol: "Core passenger-car and performance applications",
        Hybrid: "Electrified models with combustion backup",
        Electric: "High-voltage drive units and EV systems",
      };

      const notesByFuel = {
        Diesel: [
          "Short-journey use increases DPF, EGR, and oil-dilution risk on many diesel engines.",
          "A documented service history matters more on diesel replacements because injector, turbo, and timing faults often build gradually.",
        ],
        Petrol: [
          "Cold-start rattles, overheating history, and oil use are the biggest warning signs before a petrol engine replacement becomes necessary.",
          "Direct-injection petrol engines often need specialist attention for carbon build-up alongside the main mechanical repair.",
        ],
        Hybrid: [
          "Hybrid faults often need both mechanical and high-voltage diagnosis, so replacement decisions should be made by specialists familiar with the full system.",
          "Battery cooling, inverter health, and software calibration are just as important as the combustion-engine condition on hybrid models.",
        ],
        Electric: [
          "Electric drivetrain repairs should always include high-voltage safety checks and verification of the inverter and battery support systems.",
          "Low mechanical wear does not eliminate replacement demand when control electronics or motor bearings begin to fail.",
        ],
      };

      return {
        title: `${brandName} ${fuel} Engines`,
        description: descriptionByFuel[fuel],
        descriptor: descriptorByFuel[fuel],
        families,
        foundIn: typicalModels,
        knownFor: matchingFailurePoints,
        typicalModels,
        importantNotes: notesByFuel[fuel],
        cta: `${CTA_PREFIX} ${brandName} ${fuel.toLowerCase()} engine prices`,
      };
    });
}

function makeMercedesEngineTypes() {
  return [
    {
      title: "Mercedes-Benz Reconditioned Engines (Recon)",
      description:
        "A stripped, cleaned and fully inspected engine where worn components are replaced with OEM-spec parts. Best for OM651, OM642, M274 and M276 applications where you want factory reliability without main-dealer pricing.",
      priceRange: "Typical price range: £2,200 – £5,800 (depending on engine code)",
      cta: "Compare reconditioned Mercedes-Benz engine prices",
    },
    {
      title: "Mercedes-Benz Rebuilt Engines",
      description:
        "A full rebuild using upgraded components that address known failure points such as OM651 timing chain wear, OM642 oil cooler seal leaks, OM654 AdBlue-related issues, and M274 cooling-system weaknesses.",
      priceRange: "Typical price range: £2,800 – £6,500",
      cta: "Get rebuilt Mercedes-Benz engine quotes",
    },
    {
      title: "Used Mercedes-Benz Engines",
      description:
        "A tested donor engine with verified mileage and basic warranty cover. Often the most affordable route for older C-Class, E-Class, ML, Sprinter or Vito applications where budget matters most.",
      priceRange: "Typical price range: £1,200 – £3,800",
      cta: "Check used Mercedes-Benz engine availability",
    },
    {
      title: "Mercedes-Benz Remanufactured Engines",
      description:
        "A factory-spec, as-new engine built with machined surfaces, replacement internals, and tight assembly tolerances. Ideal for premium passenger cars, AMG applications, and long-term ownership where zero-mile confidence matters.",
      priceRange: "Typical price range: £4,200 – £9,500",
      cta: "Compare remanufactured Mercedes-Benz engine costs",
    },
    {
      title: "Mercedes-Benz Refurbished Engines",
      description:
        "A cleaned, checked and lightly serviced engine that offers a practical middle ground for older vehicles where a full rebuild is not always economical but warranty-backed replacement is still preferred.",
      priceRange: "Typical price range: £1,500 – £4,500",
      cta: "View refurbished Mercedes-Benz engine options",
    },
    {
      title: "Mercedes-Benz Supply & Fit Engines",
      description:
        "Your replacement engine delivered and installed by a UK Mercedes-Benz specialist, including removal of the old unit, ancillaries transfer, fluids, setup, and workmanship cover.",
      priceRange: "Typical added cost: £700 – £1,800 on top of engine price",
      cta: "Find Mercedes-Benz engine supply & fit deals",
    },
  ];
}

function buildFamiliesFromEngineCodes(sections, brandName) {
  const groups = sections.engineCodes?.groups || [];
  return groups
    .filter((group) => (group.engines || []).length)
    .map((group) => {
      const cleanedFailureNote = cleanString(group.failureNote || "");
      const summary = cleanedFailureNote
        ? cleanedFailureNote.replace(/\.\s.*$/, ".").trim()
        : `${cleanString(group.name)} is one of the key ${brandName} engine families commonly sourced through UK replacement specialists.`;

      return {
        name: cleanString(group.name || ""),
        entries: (group.engines || []).slice(0, 4).map((engine) => {
          const fuel = normalizeFuel(engine.fuel) || cleanString(engine.fuel || "Engine");
          const size = cleanString(engine.size || "");
          return {
            title: [cleanString(engine.code || ""), size, fuel].filter(Boolean).join(" "),
            description: `${cleanString(engine.code || "This engine")} is commonly fitted to ${cleanString(engine.compatibleModels || `${brandName} applications`)}. ${summary}`,
            cta:
              cleanString(engine.cta || "") ||
              `${CTA_PREFIX} ${cleanString(engine.code || brandName)} ${brandName} engine prices`,
          };
        }),
      };
    });
}

function hasBrokenFuelItems(items) {
  return (items || []).some((item) => {
    const text = `${item.title || ""} ${item.description || ""} ${item.cta || ""}`;
    return text.includes("|") || text.includes("Keyword Coverage");
  });
}

const touched = [];

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  const { brand, sections } = data;

  walkAndClean(data);

  if (!sections.hero?.form?.note) {
    sections.hero.form.note = makeHeroNote(brand.name);
  }

  if (!sections.fuelTypes.items?.length || hasBrokenFuelItems(sections.fuelTypes.items)) {
    sections.fuelTypes.items = inferFuelTypes(sections, brand.name);
  }

  if (file === "mercedes-benz.json" && !(sections.engineTypes.types || []).length) {
    sections.engineTypes.types = makeMercedesEngineTypes();
  }

  if (file === "suzuki.json" && !(sections.engineCodeDirectory.families || []).length) {
    sections.engineCodeDirectory.families = buildFamiliesFromEngineCodes(
      sections,
      brand.name,
    );
  }

  if (file === "nissan.json" && !sections.engineCodeDirectory.directory.intro) {
    sections.engineCodeDirectory.directory.intro =
      "A comprehensive alphabetical listing of every Nissan engine code from the last 35 years. Use the search above or enter your registration for an instant match to your specific engine. All codes link to a quote request.";
  }

  if (file === "porsche.json" && !sections.engineCodeDirectory.directory.intro) {
    sections.engineCodeDirectory.directory.intro =
      "A comprehensive alphabetical listing of every Porsche engine code from the last 35 years. Use the search above or enter your registration for an instant match to your specific engine. All codes link to a quote request.";
  }

  if (file === "rolls-royce.json") {
    const target = (sections.commonProblems.problems || [])[5];
    if (target && !target.typicalFailureMileage) {
      target.typicalFailureMileage = "2,500–5,000 operating hours";
    }
  }

  if (file === "ferrari.json") {
    sections.commonProblems.problems = (sections.commonProblems.problems || []).filter(
      (problem) =>
        problem.affectedModels ||
        problem.typicalFailureMileage ||
        problem.rootCause ||
        problem.recommendation ||
        problem.cta,
    );

    const firstSizeItem = sections.engineSizes?.groups?.[0]?.items?.[0];
    if (firstSizeItem && !firstSizeItem.cta) {
      firstSizeItem.cta = "Compare Ferrari 3.0L petrol engine prices";
    }
  }

  sections.engineCodes.groups = (sections.engineCodes.groups || []).filter(
    (group) =>
      cleanString(group.name || "").toLowerCase() !==
        "brand tone & selection rationale" && (group.engines || []).length,
  );

  (sections.commonProblems?.problems || []).forEach((problem) => {
    if (!problem.cta) {
      problem.cta = buildFallbackCta(brand.name, problem.h4 || problem.group);
    }
  });

  (sections.engineSizes?.groups || []).forEach((group) => {
    (group.items || []).forEach((item) => {
      if (!item.cta) {
        item.cta = `${CTA_PREFIX} ${cleanString(item.title || brand.name)} engine prices`;
      }
    });
  });

  fs.writeFileSync(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  touched.push(file);
}

console.log(`Repaired ${touched.length} brand JSON files.`);
