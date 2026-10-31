import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const ROOT = process.cwd();
const DATA_ROOT = path.join(ROOT, "data", "static-pages");
const BASE_URL = process.env.STATIC_PREVIEW_BASE_URL || "http://localhost:3000";
const DEFAULT_REPORT = path.join(process.env.USERPROFILE || ROOT, "Desktop", "static-preview-parity-audit-29.md");

const index = JSON.parse(await fs.readFile(path.join(DATA_ROOT, "index.json"), "utf8"));
const targets = index.records.map((record) => `${record.id}.json`);

function normalize(value) {
  return String(value ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function collectBlockTexts(block, output) {
  if (!block || typeof block !== "object") return;
  for (const key of ["text", "value", "label", "highlight", "meta", "question", "answer"]) {
    if (typeof block[key] === "string" && block[key].trim()) output.push(block[key]);
  }
  if (Array.isArray(block.items)) output.push(...block.items.filter((item) => typeof item === "string"));
  if (Array.isArray(block.headers)) output.push(...block.headers.filter((item) => typeof item === "string"));
  if (Array.isArray(block.rows)) {
    for (const row of block.rows) if (Array.isArray(row)) output.push(...row.filter((item) => typeof item === "string"));
  }
  if (Array.isArray(block.links)) {
    for (const link of block.links) if (link && typeof link.text === "string") output.push(link.text);
  }
  if (Array.isArray(block.cards)) {
    for (const card of block.cards) collectBlockTexts(card, output);
  }
}

function expectedTexts(page) {
  const values = [];
  for (const key of ["eyebrow", "heading", "lead"]) if (page.hero?.[key]) values.push(page.hero[key]);
  for (const option of page.hero?.options ?? []) values.push(option.label, option.amount, option.detail);
  values.push(...(page.hero?.trust ?? []));
  for (const heading of page.content?.headings ?? []) values.push(heading.text);
  for (const block of page.content?.leadBlocks ?? []) collectBlockTexts(block, values);
  for (const section of page.content?.sections ?? []) {
    values.push(section.heading);
    for (const block of section.blocks ?? []) collectBlockTexts(block, values);
  }
  for (const form of page.forms ?? []) {
    for (const field of form.fields ?? []) values.push(field.name);
  }
  return [...new Set(values.filter((value) => typeof value === "string" && normalize(value).length >= 4))];
}

function headingExpectedCounts(page) {
  const counts = new Map();
  const headings = [
    { text: page.hero?.heading },
    ...(page.content?.sections ?? []).map((section) => ({ text: section.heading })),
    ...(page.content?.leadBlocks ?? []).filter((block) => block.type === "heading" && block.level !== "h1"),
    ...(page.content?.sections ?? []).flatMap((section) => section.blocks.filter((block) => block.type === "heading" && block.level !== "h1")),
  ];
  for (const heading of headings) {
    if (!heading.text) continue;
    const key = normalize(heading.text);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function expectedImageAlts(page) {
  const alts = [];
  if (page.hero?.image?.alt) alts.push(page.hero.image.alt);
  for (const section of page.content?.sections ?? []) {
    for (const block of section.blocks ?? []) if (block.type === "image" && block.alt) alts.push(block.alt);
  }
  return [...new Set(alts)].map(normalize);
}

async function inspectTarget(browser, relativePath) {
  const pageData = JSON.parse(await fs.readFile(path.join(DATA_ROOT, relativePath), "utf8"));
  const family = pageData.contentType;
  const slug = pageData.slug.split("/").pop();
  const url = `${BASE_URL}/preview/static-pages/${family}/${slug}`;
  const browserPage = await browser.newPage();
  const result = { source: pageData.source.originalFile, route: url, failures: [], warnings: [], metrics: null };

  try {
    const response = await browserPage.goto(url, { waitUntil: "domcontentloaded" });
    if (!response || response.status() !== 200) {
      result.failures.push(`preview returned HTTP ${response?.status() ?? "no response"}`);
      return result;
    }

    const actual = await browserPage.locator("article").first().evaluate((article) => ({
      text: article.innerText,
      allText: article.textContent ?? "",
      headings: [...article.querySelectorAll("h1, h2, h3, h4")].map((node) => ({ level: node.tagName.toLowerCase(), text: node.textContent?.replace(/\s+/g, " ").trim() ?? "" })),
      h1Count: article.querySelectorAll("h1").length,
      formCount: article.querySelectorAll("form").length,
      tableCount: article.querySelectorAll("table").length,
      detailsCount: article.querySelectorAll("details").length,
      imageCount: article.querySelectorAll("img").length,
      imageAlts: [...article.querySelectorAll("img")].map((image) => image.getAttribute("alt") ?? ""),
      inputPlaceholders: [...article.querySelectorAll("input, textarea")].map((field) => field.getAttribute("placeholder") ?? ""),
    }));
    result.metrics = actual;

    if (actual.h1Count !== 1) result.failures.push(`expected exactly 1 H1, found ${actual.h1Count}`);
    if (actual.formCount !== pageData.forms.length) result.failures.push(`expected ${pageData.forms.length} form(s), found ${actual.formCount}`);
    if (actual.tableCount !== pageData.tables.length) result.failures.push(`expected ${pageData.tables.length} table(s), found ${actual.tableCount}`);
    if (actual.detailsCount < pageData.faqs.length) result.failures.push(`expected at least ${pageData.faqs.length} FAQ detail(s), found ${actual.detailsCount}`);

    const actualText = normalize(actual.allText);
    const missing = expectedTexts(pageData).filter((value) => !actualText.includes(normalize(value)));
    if (missing.length) {
      result.failures.push(`missing ${missing.length} exported content value(s)`);
      result.missing = missing.slice(0, 12);
    }
    const expectedAlts = expectedImageAlts(pageData);
    const actualAlts = actual.imageAlts.map(normalize);
    const missingAlts = expectedAlts.filter((alt) => !actualAlts.includes(alt));
    if (missingAlts.length) result.failures.push(`missing ${missingAlts.length} image alt text value(s)`);
    const expectedPlaceholders = (pageData.forms ?? []).flatMap((form) => (form.fields ?? []).map((field) => field.placeholder).filter(Boolean)).map(normalize);
    const actualPlaceholders = actual.inputPlaceholders.map(normalize);
    const missingPlaceholders = expectedPlaceholders.filter((placeholder) => !actualPlaceholders.includes(placeholder));
    if (missingPlaceholders.length) result.failures.push(`missing ${missingPlaceholders.length} form placeholder value(s)`);

    const actualHeadingCounts = new Map();
    for (const heading of actual.headings) {
      const key = normalize(heading.text);
      actualHeadingCounts.set(key, (actualHeadingCounts.get(key) ?? 0) + 1);
    }
    for (const [heading, expectedCount] of headingExpectedCounts(pageData)) {
      const found = actualHeadingCounts.get(heading) ?? 0;
      if (found < expectedCount) result.failures.push(`missing heading: ${heading}`);
      if (found > expectedCount) result.failures.push(`duplicated heading: ${heading} (expected ${expectedCount}, found ${found})`);
    }
  } catch (error) {
    result.failures.push(`preview request failed: ${error.message}`);
  } finally {
    await browserPage.close();
  }
  return result;
}

async function mapWithConcurrency(items, worker, concurrency) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function runWorker() {
    while (true) {
      const index = nextIndex++;
      if (index >= items.length) return;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker()));
  return results;
}

function renderReport(results) {
  const passed = results.filter((result) => result.failures.length === 0).length;
  const lines = [
    "# Static Preview Content-Parity Audit",
    "",
    "**Audit mode:** read-only",
    "**Source policy:** existing static HTML and production routes were not modified",
    `**Preview base URL:** ${BASE_URL}`,
    `**Preview pages audited:** ${results.length}`,
    `**Passed:** ${passed}`,
    `**Failed:** ${results.length - passed}`,
    "",
    passed === results.length ? "## Result\n\nPASS — the enabled preview pages contain the exported source content without duplicate H1s, forms, tables, or source headings." : "## Result\n\nFAIL — review the page-level differences before expanding the preview renderer.",
    "",
    "## Page results",
    "",
    "| Source page | Result | H1 | Forms | Tables | Details | Images |",
    "|---|---|---:|---:|---:|---:|---:|",
  ];
  for (const result of results) {
    const metrics = result.metrics ?? {};
    lines.push(`| \`${result.source}\` | ${result.failures.length ? "FAIL" : "PASS"} | ${metrics.h1Count ?? "-"} | ${metrics.formCount ?? "-"} | ${metrics.tableCount ?? "-"} | ${metrics.detailsCount ?? "-"} | ${metrics.imageCount ?? "-"} |`);
  }
  for (const result of results.filter((item) => item.failures.length)) {
    lines.push("", `### \`${result.source}\``, "", ...result.failures.map((failure) => `- ${failure}`));
    if (result.missing?.length) lines.push("", "Missing values (first 12):", "", ...result.missing.map((value) => `- ${value}`));
  }
  lines.push(
    "",
    "## Checks performed",
    "",
    "- Preview HTTP status",
    "- Rendered H1, forms, tables, FAQ details and image counts",
    "- Presence of exported hero, heading, paragraph, list, table, FAQ, form, card, stat, link and quote text",
    "- Source heading occurrence counts to detect duplicate or missing headings",
    "",
    "## Scope note",
    "",
    "This audit covers every clean JSON record currently enabled by the isolated preview route. It does not activate dynamic production routes or replace any static fallback page.",
    "",
  );
  return lines.join("\n");
}

const reportPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_REPORT;
const browser = await chromium.launch({ headless: true });
let results;
try {
  results = await mapWithConcurrency(targets, (target) => inspectTarget(browser, target), 6);
} finally {
  await browser.close();
}
const report = renderReport(results);
await fs.mkdir(path.dirname(reportPath), { recursive: true });
await fs.writeFile(reportPath, report, "utf8");
console.log(report);
process.exitCode = results.some((result) => result.failures.length) ? 1 : 0;
