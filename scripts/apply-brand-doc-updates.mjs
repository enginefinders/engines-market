import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const MODELS_DIR = path.join(ROOT, "data", "models");
const BRANDS_DIR = path.join(ROOT, "data", "brands");

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const nextToken = argv[index + 1];
    args[key] = nextToken && !nextToken.startsWith("--") ? nextToken : "true";
    if (args[key] !== "true") {
      index += 1;
    }
  }

  return args;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeName(value) {
  return normalizeWhitespace(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^\w\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function replaceBrandSpelling(value) {
  return value
    .replace(/\bAlpha Romeo\b/g, "Alfa Romeo")
    .replace(/\balpha romeo\b/g, "alfa romeo");
}

function replaceBrandSpellingDeep(value) {
  if (typeof value === "string") {
    return replaceBrandSpelling(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceBrandSpellingDeep(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, replaceBrandSpellingDeep(nestedValue)]),
    );
  }

  return value;
}

function buildHeadingLines(h1) {
  const parts = h1.split(/\s[—-]\s/);
  if (parts.length >= 2) {
    return [parts[0].trim(), parts.slice(1).join(" - ").trim()];
  }

  return [h1.trim()];
}

async function extractDocxParagraphs(docxPath) {
  const scriptPath = path.join(os.tmpdir(), `extract-docx-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);
  const script = `
param([string]$DocxPath)
$tmpRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('docx-' + [guid]::NewGuid().ToString())
New-Item -ItemType Directory -Path $tmpRoot | Out-Null
try {
  $zipPath = Join-Path $tmpRoot 'doc.zip'
  $extractPath = Join-Path $tmpRoot 'extracted'
  Copy-Item -LiteralPath $DocxPath -Destination $zipPath
  Expand-Archive -LiteralPath $zipPath -DestinationPath $extractPath -Force
  $xmlPath = Join-Path $extractPath 'word\\document.xml'
  [xml]$doc = Get-Content -LiteralPath $xmlPath
  $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
  $ns.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
  $paras = $doc.SelectNodes('//w:p', $ns) | ForEach-Object {
    ($_.SelectNodes('.//w:t', $ns) | ForEach-Object { $_.'#text' }) -join ''
  } | Where-Object { $_.Trim() -ne '' }
  $paras | ConvertTo-Json -Compress
} finally {
  if (Test-Path -LiteralPath $tmpRoot) {
    Remove-Item -LiteralPath $tmpRoot -Recurse -Force
  }
}
`.trim();

  await fs.writeFile(scriptPath, script, "utf8");

  try {
    const { stdout } = await execFileAsync("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      scriptPath,
      "-DocxPath",
      docxPath,
    ]);

    return JSON.parse(stdout);
  } finally {
    await fs.rm(scriptPath, { force: true });
  }
}

function inferModelNameFromH1(h1, brandName) {
  const normalizedH1 = replaceBrandSpelling(normalizeWhitespace(h1));
  const normalizedBrand = normalizeWhitespace(brandName);

  if (!normalizedH1.toLowerCase().startsWith(normalizedBrand.toLowerCase())) {
    return "";
  }

  const withoutBrand = normalizedH1.slice(normalizedBrand.length).trim();
  const match = withoutBrand.match(
    /^(.*?)(?:\s+(?:Engine Replacement|Reconditioned Engine|Used Engine|Timing Chain|Engine Solutions|Performance Rebuilt Engine|Rebuilt Engine|Engine Prices|Engine\b).*)$/i,
  );

  const modelSuffix = normalizeWhitespace(match ? match[1] : withoutBrand);
  return modelSuffix ? `${normalizedBrand} ${modelSuffix}` : normalizedBrand;
}

function looksLikeModelHeading(paragraph, brandName) {
  const normalized = normalizeWhitespace(paragraph);
  const upper = normalized.toUpperCase();
  const blocked = new Set(["RESEARCH:", "NOTES:", "AUDI", `${brandName.toUpperCase()} MODELS`, brandName.toUpperCase()]);

  if (blocked.has(upper)) {
    return false;
  }

  if (normalized.includes(":")) {
    return false;
  }

  if (!upper.startsWith(brandName.toUpperCase())) {
    return false;
  }

  return normalized === upper;
}

function headingToModelName(heading) {
  return normalizeWhitespace(
    heading
      .toLowerCase()
      .split(/\s+/)
      .map((part) => part.split("-").map((piece) => piece ? piece[0].toUpperCase() + piece.slice(1) : piece).join("-"))
      .join(" "),
  );
}

function parseModelDoc(paragraphs, brandName) {
  const entries = [];
  let current = null;

  function commit() {
    if (current?.modelName && current?.seoTitle && current?.seoDescription && current?.h1 && current?.subheading) {
      entries.push(current);
    }
  }

  function startEntry(initial = {}) {
    commit();
    current = {
      modelName: "",
      route: "",
      sourceLabel: "",
      seoTitle: "",
      seoDescription: "",
      h1: "",
      subheading: "",
      disclaimer: {
        title: "Disclaimer Note",
        note: "",
        notesTitle: "Notes",
        notes: [],
      },
      ...initial,
    };
  }

  for (const rawParagraph of paragraphs) {
    const paragraph = replaceBrandSpelling(normalizeWhitespace(rawParagraph));

    if (paragraph.startsWith("MODEL:")) {
      const modelName = replaceBrandSpelling(normalizeWhitespace(
        paragraph
          .replace(/^MODEL:\s*/i, "")
          .split(/CATEGORY:/i)[0],
      ));

      startEntry({ modelName, sourceLabel: modelName });
      continue;
    }

    if (/^\/[a-z0-9-]+\/[a-z0-9\-+!]+$/i.test(paragraph)) {
      startEntry({ route: paragraph, sourceLabel: paragraph });
      continue;
    }

    if (looksLikeModelHeading(paragraph, brandName)) {
      startEntry({ sourceLabel: paragraph, modelName: headingToModelName(paragraph) });
      continue;
    }

    if (/^[a-z0-9]+(?:-[a-z0-9]+)+-engines$/i.test(paragraph)) {
      startEntry({ sourceLabel: paragraph });
      continue;
    }

    if (paragraph.startsWith("H1:") && (!current || current.h1)) {
      startEntry({ sourceLabel: paragraph });
      continue;
    }

    if (!current) {
      continue;
    }

    if (paragraph.startsWith("H1:")) {
      current.h1 = paragraph.replace(/^H1:\s*/i, "");
      if (!current.modelName) {
        current.modelName = inferModelNameFromH1(current.h1, brandName);
      }
      continue;
    }

    if (paragraph.startsWith("SUBHEADING:")) {
      current.subheading = paragraph.replace(/^SUBHEADING:\s*/i, "");
      continue;
    }

    if (paragraph.startsWith("META TITLE:")) {
      current.seoTitle = paragraph.replace(/^META TITLE:\s*/i, "");
      continue;
    }

    if (paragraph.startsWith("META DESCRIPTION:")) {
      current.seoDescription = paragraph.replace(/^META DESCRIPTION:\s*/i, "");
      continue;
    }

    if (paragraph.startsWith("DISCLAIMER NOTE:")) {
      current.disclaimer.note = paragraph.replace(/^DISCLAIMER NOTE:\s*/i, "");
      continue;
    }

    if (paragraph === "NOTES:") {
      continue;
    }

    current.disclaimer.notes.push(paragraph);
  }

  commit();
  return entries;
}

function parseHeroAnchorRow(paragraph) {
  const normalized = replaceBrandSpelling(normalizeWhitespace(paragraph));
  const match = normalized.match(
    /^PRICE ANCHOR ROW \d+:Line 1: \[(.+?) image\]\s*(.+?)Line 2:\s*(.+?)Engine image alt text:\s*(.+)$/i,
  );

  if (!match) {
    return null;
  }

  const [, imageLabel, line1, line2, imageAlt] = match;
  const priceMatch = line1.match(/from .+$/i);

  return {
    imageLabel: normalizeWhitespace(imageLabel),
    line1: normalizeWhitespace(line1),
    detail: normalizeWhitespace(line2).replace(/^→/u, "->"),
    imageAlt: normalizeWhitespace(imageAlt),
    title: normalizeWhitespace(line1.replace(/\s+-\s+from\s+.+$/i, "")),
    price: priceMatch ? normalizeWhitespace(priceMatch[0]) : "",
  };
}

function parseHeroDoc(paragraphs, brandName) {
  const normalizedBrand = normalizeWhitespace(brandName).toUpperCase();
  const rows = [];
  let insideBrand = false;

  for (const rawParagraph of paragraphs) {
    const paragraph = normalizeWhitespace(rawParagraph);
    if (/^\d+\.\s+/.test(paragraph)) {
      const sectionName = replaceBrandSpelling(paragraph.replace(/^\d+\.\s+/, "")).toUpperCase();
      if (sectionName === normalizedBrand) {
        insideBrand = true;
        continue;
      }

      if (insideBrand) {
        break;
      }
    }

    if (!insideBrand) {
      continue;
    }

    const row = parseHeroAnchorRow(paragraph);
    if (row) {
      rows.push(row);
    }
  }

  return rows;
}

function extractCommonCodesFromDetail(detail) {
  const match = detail.match(/Common codes:\s*(.+)$/i);
  if (!match) {
    return [];
  }

  return match[1]
    .split(",")
    .map((part) => normalizeWhitespace(part))
    .filter(Boolean);
}

function buildBrandDisclaimer(brandName, anchorRows) {
  const modelNames = anchorRows.map((row) => row.title);
  const commonCodes = [...new Set(anchorRows.flatMap((row) => extractCommonCodesFromDetail(row.detail)))].slice(0, 8);
  const primaryModels = modelNames.slice(0, 3).join(", ");

  return {
    title: "Disclaimer Note",
    note: `Prices shown for ${brandName} brand pages are based on UK market research across popular ${primaryModels} replacement enquiries. Final quotes vary by engine code, fuel type, damage severity and whether you need supply-only or supply and fit. [MARKET RESEARCH]`,
    notesTitle: "Notes",
    notes: [
      `${brandName} brand coverage focuses on the models most commonly requested by UK buyers.`,
      commonCodes.length
        ? `Common codes in current demand include ${commonCodes.join(", ")}.`
        : `Engine demand varies by model, fuel type and production generation.`,
      `Higher-output or specialist ${brandName} engines can require dedicated rebuilders and wider quote ranges. [ESTIMATED]`,
      "Vehicle age, mileage, ancillaries and installation scope can materially change the final price.",
    ],
  };
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function loadBrandModelFiles(brandSlug) {
  const fileNames = (await fs.readdir(MODELS_DIR)).filter((fileName) => fileName.endsWith(".json"));
  const pages = [];

  for (const fileName of fileNames) {
    const filePath = path.join(MODELS_DIR, fileName);
    const data = replaceBrandSpellingDeep(await readJson(filePath));
    if (data?.brand?.slug === brandSlug) {
      pages.push({ fileName, filePath, data });
    }
  }

  return pages;
}

function findModelPage(pages, modelName) {
  const normalizedTarget = normalizeName(modelName);
  return pages.find(({ data }) => normalizeName(data.model.name) === normalizedTarget);
}

function findModelPageForEntry(pages, entry) {
  if (entry.route) {
    const routeMatch = pages.find(({ data }) => normalizeWhitespace(data.seo.canonical) === normalizeWhitespace(entry.route));
    if (routeMatch) {
      return routeMatch;
    }
  }

  if (entry.modelName) {
    const directMatch = findModelPage(pages, entry.modelName);
    if (directMatch) {
      return directMatch;
    }
  }

  if (entry.h1) {
    const normalizedH1 = normalizeName(entry.h1);
    const candidates = pages.filter(({ data }) => normalizedH1.startsWith(normalizeName(data.model.name)));
    if (candidates.length) {
      return candidates.sort((left, right) => normalizeName(right.data.model.name).length - normalizeName(left.data.model.name).length)[0];
    }
  }

  if (entry.sourceLabel) {
    const normalizedSource = normalizeName(entry.sourceLabel);
    const sourceMatch = pages.find(({ data }) => {
      const modelSlug = normalizeName(data.model.slug);
      const legacySlug = normalizeName(data.model.legacySlug ?? "");
      const canonical = normalizeName(data.seo.canonical);
      return (
        (modelSlug && normalizedSource.includes(modelSlug)) ||
        (legacySlug && normalizedSource.includes(legacySlug)) ||
        (canonical && normalizedSource.includes(canonical))
      );
    });

    if (sourceMatch) {
      return sourceMatch;
    }
  }

  return null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const brandSlug = args["brand-slug"];
  const brandName = args["brand-name"];
  const modelDocPath = args["model-doc"];
  const modelDocJsonPath = args["model-doc-json"];
  const heroDocPath = args["hero-doc"];
  const heroDocJsonPath = args["hero-doc-json"];

  if (!brandSlug || !brandName || (!modelDocPath && !modelDocJsonPath)) {
    throw new Error("Usage: node scripts/apply-brand-doc-updates.mjs --brand-slug <slug> --brand-name <name> (--model-doc <path> | --model-doc-json <path>) [--hero-doc <path> | --hero-doc-json <path>]");
  }

  const modelParagraphs = modelDocJsonPath
    ? JSON.parse(await fs.readFile(modelDocJsonPath, "utf8"))
    : await extractDocxParagraphs(modelDocPath);
  const modelEntries = parseModelDoc(modelParagraphs, brandName);
  const pages = await loadBrandModelFiles(brandSlug);
  const updatedModels = [];
  const missingModels = [];

  for (const entry of modelEntries) {
    const page = findModelPageForEntry(pages, entry);
    if (!page) {
      missingModels.push(entry.modelName || entry.route || entry.sourceLabel || entry.h1);
      continue;
    }

    const data = page.data;
    data.brand.name = replaceBrandSpelling(data.brand.name);
    data.model.name = replaceBrandSpelling(data.model.name);
    data.seo.title = entry.seoTitle;
    data.seo.description = entry.seoDescription;
    data.sections.hero.h1 = entry.h1;
    data.sections.hero.headingLines = buildHeadingLines(entry.h1);
    data.sections.hero.subheading = entry.subheading;
    data.sections.hero.disclaimer = entry.disclaimer;

    await writeJson(page.filePath, data);
    updatedModels.push(data.model.name);
  }

  const docModelNames = new Set(modelEntries.map((entry) => normalizeName(entry.modelName)));
  const undocumentedModels = pages
    .filter(({ data }) => !docModelNames.has(normalizeName(data.model.name)))
    .map(({ data }) => data.model.name)
    .sort((left, right) => left.localeCompare(right));

  let updatedBrandHighlights = false;

  if (heroDocPath || heroDocJsonPath) {
    const heroParagraphs = heroDocJsonPath
      ? JSON.parse(await fs.readFile(heroDocJsonPath, "utf8"))
      : await extractDocxParagraphs(heroDocPath);
    const anchorRows = parseHeroDoc(heroParagraphs, brandName);

    if (anchorRows.length) {
      const brandFilePath = path.join(BRANDS_DIR, `${brandSlug}.json`);
      const brandData = replaceBrandSpellingDeep(await readJson(brandFilePath));

      brandData.sections.hero.highlights = anchorRows.map((row) => {
        const page = findModelPage(pages, row.title);
        const image = page?.data?.assets?.mainImage || page?.data?.assets?.heroBg || "";

        return {
          title: row.title,
          price: row.price,
          line1: row.line1,
          line2: row.detail,
          detail: row.detail,
          image,
          imageAlt: row.imageAlt,
        };
      });
      brandData.sections.hero.disclaimer = buildBrandDisclaimer(brandName, anchorRows);

      await writeJson(brandFilePath, brandData);
      updatedBrandHighlights = true;
    }
  }

  console.log(JSON.stringify({
    updatedModels,
    missingModels,
    undocumentedModels,
    updatedBrandHighlights,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
