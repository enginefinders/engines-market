import { readFileSync } from "node:fs";
import { join } from "node:path";

export type StaticComparisonSection = {
  eyebrow: string;
  heading: string;
  subheadings: string[];
  paragraphs: string[];
  bullets: string[];
  tables: Array<{ headers: string[]; rows: string[][] }>;
};

export type StaticComparisonGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  options: Array<{ label: string; amount: string; detail: string }>;
  sections: StaticComparisonSection[];
};

export const staticComparisonSlugs = [
  "diesel-vs-petrol-running-cost",
  "local-garage-vs-specialist",
  "main-dealer-vs-independent-specialist",
  "new-vs-reconditioned-engine",
  "rebuild-vs-replacement",
  "reconditioned-vs-rebuilt-engine",
  "reconditioned-vs-remanufactured-engine",
  "repair-vs-reconditioned-engine",
  "repair-vs-replacement",
  "repairing-vs-scrapping",
  "supply-only-vs-supply-fit",
  "used-vs-reconditioned-engine",
  "used-vs-rebuilt-engine",
] as const;

const entityMap: Record<string, string> = {
  "&amp;": "&",
  "&pound;": "£",
  "&ndash;": "-",
  "&mdash;": "-",
  "&rsquo;": "'",
  "&lsquo;": "'",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

function text(value: string) {
  return value
    .replace(/<br\s*\/?>(\s*)/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|pound|ndash|mdash|rsquo|lsquo|quot|nbsp);|&#39;/g, (entity) => entityMap[entity] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(source: string, expression: RegExp) {
  return expression.exec(source)?.[1] ? text(expression.exec(source)?.[1] ?? "") : "";
}

function extractTables(source: string) {
  return [...source.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map((table) => {
    const rows = [...table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((row) =>
      [...row[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) => text(cell[1])),
    ).filter((row) => row.length > 0);
    return { headers: rows.shift() ?? [], rows };
  }).filter((table) => table.headers.length > 0);
}

function extractSections(source: string): StaticComparisonSection[] {
  const headings = [...source.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  return headings.map((match, index) => {
    const start = match.index ?? 0;
    const end = headings[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    const heading = text(match[1]);
    const labelMatch = source.slice(Math.max(0, start - 380), start).match(/<div\b[^>]*class=["'][^"']*(?:sec-label|section-label)[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    const paragraphs = [...block.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((paragraph) => text(paragraph[1]))
      .filter((paragraph) => paragraph.length > 25)
      .filter((paragraph, paragraphIndex, list) => list.indexOf(paragraph) === paragraphIndex);
    const subheadings = [...block.matchAll(/<h[34]\b[^>]*>([\s\S]*?)<\/h[34]>/gi)]
      .map((subheading) => text(subheading[1]))
      .filter((subheading) => subheading.length > 0)
      .filter((subheading, subheadingIndex, list) => list.indexOf(subheading) === subheadingIndex);
    const bullets = [...block.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((bullet) => text(bullet[1]))
      .filter((bullet) => bullet.length > 0)
      .filter((bullet, bulletIndex, list) => list.indexOf(bullet) === bulletIndex);
    return {
      eyebrow: text(labelMatch?.[1] ?? "Comparison guide"),
      heading,
      subheadings,
      paragraphs,
      bullets,
      tables: extractTables(block),
    };
  }).filter((section) => section.heading.length > 0 && !/get.*quote|find.*engine/i.test(section.heading));
}

export function getStaticComparisonGuide(slug: string): StaticComparisonGuide | null {
  if (!staticComparisonSlugs.includes(slug as (typeof staticComparisonSlugs)[number])) return null;

  const source = readFileSync(join(process.cwd(), "public", "compare", `${slug}.html`), "utf8");
  const h1 = firstMatch(source, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = firstMatch(source, /<title>([\s\S]*?)<\/title>/i) || h1;
  const description = firstMatch(source, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const eyebrow = firstMatch(source, /<div\b[^>]*class=["'][^"']*hero-eyebrow[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || "UK comparison guide · 2026 data";
  const lead = firstMatch(source, /<p\b[^>]*class=["'][^"']*hero-tagline[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
  const labels = [...source.matchAll(/<div\b[^>]*class=["'][^"']*hcost-label[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)].map((match) => text(match[1]));
  const amounts = [...source.matchAll(/<div\b[^>]*class=["'][^"']*hcost-amount[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)].map((match) => text(match[1]));
  const details = [...source.matchAll(/<div\b[^>]*class=["'][^"']*hcost-sub[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)].map((match) => text(match[1]));

  return {
    slug,
    title,
    description,
    eyebrow,
    heading: h1,
    lead,
    options: labels.map((label, index) => ({ label, amount: amounts[index] ?? "", detail: details[index] ?? "" })).slice(0, 3),
    sections: extractSections(source),
  };
}
