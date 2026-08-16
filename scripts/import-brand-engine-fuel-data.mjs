import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

const repoRoot = process.cwd();
const brandDir = path.join(repoRoot, "data", "brands");
const engineSourceDir = process.argv[2] || "C:\\Users\\Rahma\\Downloads\\EngineCodes";
const fuelSourceDir = process.argv[3] || "C:\\Users\\Rahma\\Downloads\\FuelType";

const slugAliases = new Map([
  ["alfa romeo", "alfa-romeo"],
  ["aston martin", "aston-martin"],
  ["land rover", "land-rover"],
  ["mercedes", "mercedes-benz"],
  ["mercedes benz", "mercedes-benz"],
  ["peugot", "peugeot"],
  ["range rover", "range-rover"],
  ["rollsroyce", "rolls-royce"],
  ["rolls royce", "rolls-royce"],
]);

function toSlug(name) {
  const key = name.toLowerCase().replace(/\.[^.]+$/, "").trim();
  return slugAliases.get(key) || key.replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function readDocx(file) {
  const tmp = path.join(os.tmpdir(), `em-docx-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  fs.mkdirSync(tmp, { recursive: true });
  const zipPath = path.join(tmp, "source.zip");
  fs.copyFileSync(file, zipPath);
  try {
    execFileSync("powershell.exe", [
      "-NoProfile",
      "-Command",
      `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${tmp.replace(/'/g, "''")}' -Force`,
    ], { stdio: "ignore" });
    const xml = fs.readFileSync(path.join(tmp, "word", "document.xml"), "utf8");
    return xml
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function readSource(file) {
  if (/\.docx$/i.test(file)) return readDocx(file);
  return fs.readFileSync(file, "utf8");
}

function normalizeMarkdown(raw) {
  return raw
    .replace(/\\([*#|>\-+])/g, "$1")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

function cleanText(value = "") {
  return value
    .replace(/【[^】]*】/g, "")
    .replace(/ã€[^ã]*ã€‘/g, "")
    .replace(/â€†L\d+/g, "")
    .replace(/Ãƒâ€šÃ‚Â£|ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â£|Ã‚Â£|Â£/g, "£")
    .replace(/â€“|â€”|â€‘|Ã¢â‚¬â€œ|Ã¢â‚¬â€/g, "-")
    .replace(/â†’|Ã¢Â†Â’|ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢/g, "->")
    .replace(/â€¢|Â·|Ã‚Â·/g, "·")
    .replace(/â€™|Ã¢â‚¬â„¢/g, "'")
    .replace(/â€œ|â€|Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"')
    .replace(/âš¡|âœ…|âŒ|ðŸ[^\s]*/g, "")
    .replace(/[\u{1F1E6}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\*\*/g, "")
    .replace(/^[-*>]\s*/gm, "")
    .replace(/[–—‑]/g, "-")
    .replace(/Â£/g, "£")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanList(lines) {
  return lines.map(cleanText).filter(Boolean);
}

function extractInline(md, label) {
  const re = new RegExp(`\\*\\*${label}(?: \\([^)]*\\))?:\\*\\*\\s*([^\\n]+)`, "i");
  return cleanText(md.match(re)?.[1] || "");
}

function sectionAfter(block, headingLabels) {
  const escaped = headingLabels.map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const re = new RegExp(`\\*\\*(?:${escaped}):\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[^\\n]+?:\\*\\*|\\n---|$)`, "i");
  return block.match(re)?.[1] || "";
}

function parseSpecs(block) {
  const specsText = sectionAfter(block, ["Technical Specifications"]);
  const specs = {};
  for (const line of specsText.split("\n")) {
    const match = line.match(/-\s*\*\*([^:]+):\*\*\s*(.+)/);
    if (match) specs[cleanText(match[1]).toLowerCase()] = cleanText(match[2]);
  }
  return specs;
}

function parseEngineCodes(raw, brandName) {
  const md = normalizeMarkdown(raw);
  const groups = [];
  const h2 = extractInline(md, "H2") || `${brandName} Engine Codes - Most Replaced Engines & Full Directory`;
  const h3 = extractInline(md, "H3") || `Every major ${brandName} engine code with technical specs, compatible UK models, known failures and average rebuilt prices.`;
  const groupRegex = /^###\s+(.+?)\n/gm;
  const groupMatches = [...md.matchAll(groupRegex)];

  for (let i = 0; i < groupMatches.length; i += 1) {
    const start = groupMatches[i].index + groupMatches[i][0].length;
    const end = groupMatches[i + 1]?.index ?? md.length;
    const groupName = cleanText(groupMatches[i][1]);
    const groupBody = md.slice(start, end);
    const engines = [];
    const titleMatches = [...groupBody.matchAll(/^\*\*(?!History|Technical Specifications|Compatible|Common Failures|Avg\. Rebuilt Price)(.+?)\*\*\s*$/gm)];

    for (let j = 0; j < titleMatches.length; j += 1) {
      const blockStart = titleMatches[j].index + titleMatches[j][0].length;
      const blockEnd = titleMatches[j + 1]?.index ?? groupBody.length;
      const block = groupBody.slice(blockStart, blockEnd);
      const fullTitle = cleanText(titleMatches[j][1]);
      const [codePart, titlePart = ""] = fullTitle.split(/\s+-\s+/);
      const specs = parseSpecs(block);
      const failures = cleanList(sectionAfter(block, ["Common Failures"]).split("\n").filter((line) => /^\s*-/.test(line))).slice(0, 3);
      const compatible = cleanText(sectionAfter(block, [`Compatible ${brandName} Variants`, "Compatible Variants", "Compatible Models"]));
      const avg = cleanText((block.match(/\*\*Avg\. Rebuilt Price:\*\*\s*([^\n]+)/i)?.[1] || "").replace(/\(supply only\)/i, "supply only"));
      const cta = cleanText(block.split("\n").find((line) => /Get quotes|Compare/i.test(line)) || `Get quotes for ${codePart} ${brandName} engine replacement`);

      if (!codePart || !specs["fuel type"]) continue;

      engines.push({
        code: codePart,
        title: titlePart || specs["engine size"] || specs["fuel type"],
        familyHeading: fullTitle,
        fuel: specs["fuel type"] || "",
        size: specs["engine size"] || titlePart || "",
        power: specs["power output"] || "",
        compatibleModels: compatible,
        avgRebuiltPrice: avg || "Quote required",
        cta,
        commonFailures: failures,
      });
    }

    if (engines.length) {
      groups.push({
        name: groupName,
        era: `Extracted from ${brandName} ${groupName.toLowerCase()} technical replacement data.`,
        failureNote: engines.flatMap((engine) => engine.commonFailures || []).slice(0, 2).join(", "),
        engines: engines.map((engine) => ({
          code: engine.code,
          title: engine.title,
          familyHeading: engine.familyHeading,
          fuel: engine.fuel,
          size: engine.size,
          power: engine.power,
          compatibleModels: engine.compatibleModels,
          avgRebuiltPrice: engine.avgRebuiltPrice,
          cta: engine.cta,
        })),
      });
    }
  }

  return groups.length
    ? {
        tag: "Engine Codes",
        h2,
        h3,
        closingLine: `Can't find your engine code? Enter your registration number above - we'll identify the exact ${brandName} engine fitted to your vehicle.`,
        filters: groups.map((group) => group.name),
        groups,
      }
    : null;
}

function linesForSubsection(block, labelPattern) {
  const re = new RegExp(`\\*\\*${labelPattern}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[^\\n]+?:\\*\\*|\\n---|$)`, "i");
  const text = block.match(re)?.[1] || "";
  return cleanList(text.split("\n").filter((line) => line.trim()));
}

function parseFuelTypes(raw, brandName) {
  const md = normalizeMarkdown(raw);
  const h2 = extractInline(md, "H2") || `${brandName} Diesel vs Petrol vs Hybrid vs Electric - Which Fuel Type Is Right For You?`;
  const intro = extractInline(md, "H3") || `Compare ${brandName} engine fuel types by replacement costs, running costs, reliability reputation, and model availability.`;
  const items = [];
  const fuelRegex = /^###\s+(.+?(?:Diesel|Petrol|Hybrid|Electric|BEV|PHEV).+?)\n/gim;
  const matches = [...md.matchAll(fuelRegex)].filter((match) => !/Quick Comparison/i.test(match[1]));

  for (let i = 0; i < matches.length; i += 1) {
    const start = matches[i].index + matches[i][0].length;
    const end = matches[i + 1]?.index ?? md.length;
    const body = md.slice(start, end);
    const heading = cleanText(matches[i][1]);
    const [titleRaw, descriptorRaw = ""] = heading.split(/\s+-\s+/);
    const shortDescriptor = cleanText(sectionAfter(body, ["Short descriptor"]));
    const averageCosts = linesForSubsection(body, "Average .* Replacement Cost");
    const how = linesForSubsection(body, `How ${brandName} .* Engines Work|How .* Systems Work`);
    const issues = linesForSubsection(body, `Common ${brandName} .* Issues.*|Common .* Issues.*`);
    const models = linesForSubsection(body, `Which ${brandName} Models Use .* Engines.*|Which .* Models Use .* Engines.*`);
    const who = linesForSubsection(body, "Who Should Choose .*");
    const queryText = cleanText(sectionAfter(body, ["Typical Diesel Search Queries", "Typical Petrol Search Queries", "Typical Hybrid Search Queries", "Typical Electric Search Queries"]));
    const cta = cleanText(body.split("\n").find((line) => /Get quotes|Compare .* prices/i.test(line)) || `Get quotes for ${brandName} ${titleRaw} engines`);

    items.push({
      title: titleRaw.replace(new RegExp(`^${brandName}\\s+`, "i"), ""),
      description: shortDescriptor || descriptorRaw,
      descriptor: shortDescriptor || descriptorRaw,
      families: [...how.slice(0, 3), ...averageCosts.slice(0, 5)],
      foundIn: models.slice(0, 8),
      knownFor: issues.slice(0, 6),
      typicalModels: models.slice(0, 8),
      importantNotes: [...who.slice(0, 5), ...(queryText ? [`Typical searches: ${queryText}`] : [])],
      cta,
    });
  }

  return items.length
    ? {
        tag: `${brandName} Engines by Fuel Type`,
        h2,
        intro,
        items,
        closing: `Not sure which fuel type your ${brandName} has? Enter your registration number for an instant match.`,
      }
    : null;
}

function sourceFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((file) => /\.(md|docx)$/i.test(file))
    .map((file) => path.join(dir, file));
}

function parseSourceFile(file, sectionKey) {
  const slug = toSlug(path.basename(file));
  const brandPath = path.join(brandDir, `${slug}.json`);
  if (!fs.existsSync(brandPath)) {
    return { skipped: `${path.basename(file)} (no ${slug}.json)` };
  }

  const data = JSON.parse(fs.readFileSync(brandPath, "utf8"));
  const parser = sectionKey === "engineCodes" ? parseEngineCodes : parseFuelTypes;
  const parsed = parser(readSource(file), data.brand?.name || slug);
  if (!parsed) {
    return { skipped: `${path.basename(file)} (no parseable ${sectionKey})` };
  }

  data.sections[sectionKey] = parsed;
  fs.writeFileSync(brandPath, `${JSON.stringify(data, null, 2)}\n`);
  return { updated: slug };
}

function importSection(sourceDirs, sectionKey) {
  const updated = [];
  const skipped = [];

  for (const file of sourceDirs.flatMap(sourceFiles)) {
    const result = parseSourceFile(file, sectionKey);
    if (result.updated) {
      updated.push(result.updated);
    } else {
      skipped.push(result.skipped);
    }
  }

  return { updated: [...new Set(updated)], skipped };
}

const sourceDirs = [engineSourceDir, fuelSourceDir];
const engineResult = importSection(sourceDirs, "engineCodes");
const fuelResult = importSection(sourceDirs, "fuelTypes");

console.log(`Engine Codes updated: ${engineResult.updated.length}`);
if (engineResult.skipped.length) console.log(`Engine Codes skipped: ${engineResult.skipped.join("; ")}`);
console.log(`Fuel Types updated: ${fuelResult.updated.length}`);
if (fuelResult.skipped.length) console.log(`Fuel Types skipped: ${fuelResult.skipped.join("; ")}`);
