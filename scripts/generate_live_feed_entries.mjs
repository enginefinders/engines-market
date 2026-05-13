import fs from "node:fs/promises";
import path from "node:path";

const BRANDS_DIR = path.join(process.cwd(), "data", "brands");
const TARGET_ENTRIES = 30;

function extractEngineCodes(text) {
  const matches = cleanText(text).match(/\b[A-Z]{1,4}\d{1,4}(?:[A-Z-]{0,4})?\b/g) ?? [];
  return [...new Set(matches)];
}

function extractCodeLabel(title) {
  const match = cleanText(title).match(/^[A-Z0-9-]+(?:\s*\/\s*[A-Z0-9-]+)*/);
  return match?.[0] ?? cleanText(title);
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\[Get Quote\s*→\]/gi, " ")
    .replace(/\[Get Quote\s*->\]/gi, " ")
    .replace(/Common failure points\s*\(expandable note\)\s*:\s*/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[ ]+([,.;:])/g, "$1")
    .trim();
}

function titleCaseWord(word) {
  if (!word) {
    return word;
  }

  if (/^[A-Z0-9-]+$/.test(word)) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function normalizeModelName(brandName, rawModel) {
  const cleaned = cleanText(rawModel)
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return brandName;
  }

  if (cleaned.toLowerCase().startsWith(brandName.toLowerCase())) {
    return cleaned;
  }

  return `${brandName} ${cleaned}`;
}

function extractModels(brandName, compatibleModels) {
  const normalized = cleanText(compatibleModels)
    .replace(/\band\b/gi, ",")
    .split(",")
    .map((item) => normalizeModelName(brandName, item))
    .filter(Boolean);

  return [...new Set(normalized)].slice(0, 3);
}

function parseEraYears(era) {
  const text = cleanText(era);
  const matches = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));

  if (!matches.length) {
    return ["2016", "2018", "2020"];
  }

  const start = matches[0];
  const lastToken = text.toLowerCase();
  const end = lastToken.includes("present") ? 2025 : matches[matches.length - 1];

  if (start >= end) {
    return [String(start)];
  }

  const midpoint = Math.floor((start + end) / 2);
  return [...new Set([start, midpoint, end].map((year) => String(year)))];
}

function buildIssueSnippets(...sources) {
  const snippets = [];

  for (const source of sources) {
    const cleaned = cleanText(source);

    if (!cleaned) {
      continue;
    }

    const clauses = cleaned
      .split(/[.;]/)
      .map((item) => item.trim())
      .filter((item) => item.length >= 18);

    for (const clause of clauses) {
      const normalizedClause = clause
        .replace(/\s+/g, " ")
        .replace(/\b(our rebuilt units|rebuilt units|our rebuilt engines|our engines)\b.*$/i, "")
        .replace(/\binclude\b.*$/i, "")
        .replace(/\bfeature\b.*$/i, "")
        .replace(/\bwith\b upgraded.*$/i, "")
        .trim();

      if (normalizedClause.length >= 18) {
        snippets.push(normalizedClause);
      }
    }
  }

  return [...new Set(snippets)].slice(0, 5);
}

function prettifyIssue(issue) {
  const cleaned = cleanText(issue)
    .replace(/\bthis\b/gi, "")
    .replace(/\bthe\b\s+issue\s+was\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "Known internal failure drives full engine replacement demand";
  }

  return titleCaseWord(cleaned.charAt(0)) + cleaned.slice(1);
}

function buildModelVariant(modelName, size, fuel, index) {
  const trimTokens = [
    "",
    ` ${size}`,
    fuel.toLowerCase() === "diesel" ? " Diesel" : fuel.toLowerCase() === "petrol" ? " Petrol" : ` ${fuel}`,
  ];

  const token = trimTokens[index % trimTokens.length];
  return `${modelName}${token}`.replace(/\s+/g, " ").trim();
}

function buildEntriesForBrand(data) {
  const brandName = data.brand?.name ?? "Brand";
  const groups = data.sections?.engineCodes?.groups ?? [];
  const problems = data.sections?.commonProblems?.problems ?? [];
  const entries = [];
  const seen = new Set();

  for (const group of groups) {
    const years = parseEraYears(group.era);
    const familyIssues = buildIssueSnippets(group.failureNote);

    for (const engine of group.engines ?? []) {
      const modelNames = extractModels(brandName, engine.compatibleModels);
      const matchingProblems = problems.filter((problem) => {
        const haystack = `${problem.group} ${problem.h4} ${problem.affectedModels}`.toLowerCase();
        const engineCode = String(engine.code ?? "").toLowerCase();

        return (
          haystack.includes(engineCode) ||
          haystack.includes(String(engine.size ?? "").toLowerCase()) ||
          haystack.includes(String(engine.fuel ?? "").toLowerCase())
        );
      });

      const problemIssues = matchingProblems.flatMap((problem) =>
        buildIssueSnippets(problem.rootCause, problem.h4, problem.group),
      );

      const issueOptions = [...new Set([...problemIssues, ...familyIssues])].slice(0, 4);
      const normalizedIssues = issueOptions.length
        ? issueOptions.map(prettifyIssue)
        : ["Known internal failure drives full engine replacement demand"];

      const modelsToUse = modelNames.length ? modelNames : [brandName];

      let combinationIndex = 0;

      for (const modelName of modelsToUse) {
        for (const year of years) {
          const issue = normalizedIssues[combinationIndex % normalizedIssues.length];
          const model = buildModelVariant(modelName, engine.size ?? "", engine.fuel ?? "", combinationIndex);
          const entry = {
            Year: year,
            Model: model,
            "Engine Code": String(engine.code ?? ""),
            Fuel: String(engine.fuel ?? ""),
            "Avg. Quoted Price": String(engine.avgRebuiltPrice ?? ""),
            "Reported Issue": issue,
          };

          const key = JSON.stringify(entry);
          if (!seen.has(key)) {
            seen.add(key);
            entries.push(entry);
          }

          combinationIndex += 1;

          if (entries.length >= TARGET_ENTRIES) {
            return entries;
          }
        }
      }
    }
  }

  return entries;
}

function buildEntriesFromDirectory(data) {
  const brandName = data.brand?.name ?? "Brand";
  const modelFallbacks = (data.sections?.models?.cards ?? [])
    .map((card) => card.h3.replace(/\s+Engines$/i, "").trim())
    .filter(Boolean);
  const entries = [];
  const seen = new Set();

  for (const family of data.sections?.engineCodeDirectory?.families ?? []) {
    for (const entry of family.entries ?? []) {
      const codes = extractEngineCodes(entry.title);
      const engineCode = codes[0] ?? extractCodeLabel(entry.title);
      const fuel = /\bdiesel\b/i.test(entry.title) || /\bdiesel\b/i.test(entry.description)
        ? "Diesel"
        : /\bpetrol\b/i.test(entry.title) || /\bpetrol\b/i.test(entry.description)
          ? "Petrol"
          : "Petrol";
      const sizeMatch = entry.title.match(/\b\d\.\dL\b/i);
      const size = sizeMatch?.[0] ?? "";
      const models = modelFallbacks.length ? modelFallbacks : [brandName];
      const years = parseEraYears(family.name);
      const issues = buildIssueSnippets(entry.description, family.name).map(prettifyIssue);

      let index = 0;
      for (const modelName of models.slice(0, 3)) {
        for (const year of years) {
          const item = {
            Year: year,
            Model: buildModelVariant(modelName, size, fuel, index),
            "Engine Code": engineCode,
            Fuel: fuel,
            "Avg. Quoted Price": "£1,800 – £4,200",
            "Reported Issue": issues[index % Math.max(issues.length, 1)] ?? "Known internal failure drives full engine replacement demand",
          };

          const key = JSON.stringify(item);
          if (!seen.has(key)) {
            seen.add(key);
            entries.push(item);
          }

          index += 1;
          if (entries.length >= TARGET_ENTRIES) {
            return entries;
          }
        }
      }
    }
  }

  return entries;
}

function buildEntriesFromProblems(data) {
  const brandName = data.brand?.name ?? "Brand";
  const entries = [];
  const seen = new Set();

  for (const problem of data.sections?.commonProblems?.problems ?? []) {
    const codes = extractEngineCodes(`${problem.group} ${problem.h4} ${problem.affectedModels} ${problem.rootCause}`);
    const engineCode = codes[0] ?? problem.group.replace(/\s+/g, "-").toUpperCase();
    const fuel = /\bdiesel\b/i.test(problem.h4) || /\bdiesel\b/i.test(problem.affectedModels) ? "Diesel" : /\bpetrol\b/i.test(problem.h4) || /\bpetrol\b/i.test(problem.affectedModels) ? "Petrol" : "Diesel";
    const models = extractModels(brandName, problem.affectedModels);
    const yearMatches = [...problem.affectedModels.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));
    const years = yearMatches.length ? parseEraYears(`${yearMatches[0]}-${yearMatches[yearMatches.length - 1]}`) : ["2012", "2016", "2020"];
    const issues = buildIssueSnippets(problem.rootCause, problem.h4, problem.group).map(prettifyIssue);

    let index = 0;
    for (const modelName of (models.length ? models : [brandName]).slice(0, 3)) {
      for (const year of years) {
        const item = {
          Year: year,
          Model: modelName,
          "Engine Code": engineCode,
          Fuel: fuel,
          "Avg. Quoted Price": fuel === "Diesel" ? "£2,000 – £4,500" : "£2,200 – £4,800",
          "Reported Issue": issues[index % Math.max(issues.length, 1)] ?? "Known internal failure drives full engine replacement demand",
        };

        const key = JSON.stringify(item);
        if (!seen.has(key)) {
          seen.add(key);
          entries.push(item);
        }

        index += 1;
        if (entries.length >= TARGET_ENTRIES) {
          return entries;
        }
      }
    }
  }

  return entries;
}

async function main() {
  const files = (await fs.readdir(BRANDS_DIR)).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const fullPath = path.join(BRANDS_DIR, file);
    const data = JSON.parse(await fs.readFile(fullPath, "utf8"));
    const existingEntries = data.sections?.liveMarketPrices?.feed?.entries ?? [];

    if (existingEntries.length > 0) {
      continue;
    }

    let generatedEntries = buildEntriesForBrand(data);

    if (!generatedEntries.length) {
      generatedEntries = buildEntriesFromDirectory(data);
    }

    if (!generatedEntries.length) {
      generatedEntries = buildEntriesFromProblems(data);
    }

    data.sections.liveMarketPrices.feed.entries = generatedEntries;
    data.sections.liveMarketPrices.feed.rowsCount = Math.max(
      Number(data.sections.liveMarketPrices.feed.rowsCount ?? 0),
      generatedEntries.length,
      120,
    );
    data.sections.liveMarketPrices.feed.visibleRows = Math.max(
      Number(data.sections.liveMarketPrices.feed.visibleRows ?? 0),
      18,
    );

    await fs.writeFile(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    console.log(`Updated ${file}: ${generatedEntries.length} live feed entries`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
