import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const failuresDirectory = path.join(process.cwd(), "public", "failures");
const outputFile = path.join(process.cwd(), "data", "failureSourceDetails.ts");

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&pound;/gi, "£")
    .replace(/&ndash;/gi, "-")
    .replace(/&mdash;/gi, "-");
}

function plainText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function questionText(html) {
  return plainText(html)
    .replace(/^\d+\s*/, "")
    .replace(/\s*[-–—]?\s*\+\s*$/, "")
    .trim();
}

function extractTables(html) {
  return [...html.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((match) => {
    const rows = [...match[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
      [...row[1].matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((cell) => plainText(cell[2])),
    );
    return { headers: rows[0] ?? [], rows: rows.slice(1) };
  }).filter((table) => table.headers.length > 0 && table.rows.length > 0);
}

function extractDetails(html) {
  return [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((match) => {
    const summary = /<summary\b[^>]*>([\s\S]*?)<\/summary>/i.exec(match[1]);
    const answer = plainText(match[1].replace(/<summary\b[^>]*>[\s\S]*?<\/summary>/i, ""));
    return { question: questionText(summary?.[1] ?? ""), answer };
  }).filter((item) => item.question && item.answer);
}

function extractSections(main) {
  const headings = [...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  return headings.map((heading, index) => {
    const start = (heading.index ?? 0) + heading[0].length;
    const end = headings[index + 1]?.index ?? main.length;
    const html = main.slice(start, end);
    const title = plainText(heading[1]);
    const paragraphs = unique([...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => plainText(match[1])));
    const bullets = unique([...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => plainText(match[1])));
    const tables = extractTables(html);
    const sourceText = plainText(html);
    const extractedText = [...paragraphs, ...bullets, ...tables.flatMap((table) => [table.headers.join(" "), ...table.rows.map((row) => row.join(" "))])].join(" ");
    const sourceTextIsAlreadyRendered = paragraphs.includes(sourceText);
    return {
      title,
      paragraphs: paragraphs.length || bullets.length || tables.length ? paragraphs : [plainText(html)],
      bullets,
      tables,
      additionalText: !sourceTextIsAlreadyRendered && sourceText.length > extractedText.length * 1.15 ? sourceText : "",
    };
  }).filter((section) => section.title && !/(common questions|frequently asked|faq)/i.test(section.title) && (section.paragraphs.length || section.bullets.length || section.tables.length));
}

function extractGuide(html) {
  const main = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? html;
  return { sections: extractSections(main), faqs: extractDetails(main) };
}

const files = (await readdir(failuresDirectory)).filter((file) => file.endsWith(".html"));
const sourceDetails = {};

for (const file of files) {
  const slug = path.basename(file, ".html");
  sourceDetails[slug] = extractGuide(await readFile(path.join(failuresDirectory, file), "utf8"));
}

const content = `// Generated from public/failures/*.html by scripts/extract-failure-guide-details.mjs.\n// Do not hand-edit: update the static source and regenerate when source content changes.\n\nexport type FailureSourceTable = { headers: string[]; rows: string[][] };\nexport type FailureSourceSection = { title: string; paragraphs: string[]; bullets: string[]; tables: FailureSourceTable[]; additionalText: string };\nexport type FailureSourceFaq = { question: string; answer: string };\nexport type FailureSourceDetails = { sections: FailureSourceSection[]; faqs: FailureSourceFaq[] };\n\nexport const failureSourceDetails: Record<string, FailureSourceDetails> = ${JSON.stringify(sourceDetails, null, 2)};\n`;

await writeFile(outputFile, content);
console.log(`Extracted ${Object.keys(sourceDetails).length} static failure guides to ${path.relative(process.cwd(), outputFile)}.`);
