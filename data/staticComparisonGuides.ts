import { readFileSync } from "node:fs";
import { join } from "node:path";

export type StaticComparisonSection = {
  eyebrow: string;
  heading: string;
  subheadings: string[];
  paragraphs: string[];
  bullets: string[];
  comparisonGroups: Array<{ heading: string; bullets: string[] }>;
  contentCards: Array<{ heading: string; highlight: string; lines: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string }>;
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
  finalCta: {
    eyebrow: string;
    heading: string;
    copy: string;
    trust: string;
    buttonLabel: string;
  };
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

function classText(source: string, className: string) {
  return [...source.matchAll(new RegExp(`<([a-z0-9]+)\\b[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, "gi"))]
    .map((match) => text(match[2]))
    .filter(Boolean);
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
    const comparisonGroups = [...block.matchAll(/<h[34]\b[^>]*>([\s\S]*?)<\/h[34]>/gi)].map((subheading, subheadingIndex, list) => {
      const groupStart = subheading.index ?? 0;
      const groupEnd = list[subheadingIndex + 1]?.index ?? block.length;
      const group = block.slice(groupStart, groupEnd);
      return {
        heading: text(subheading[1]),
        bullets: [...group.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
          .map((bullet) => text(bullet[1]))
          .filter((bullet) => bullet.length > 0),
      };
    }).filter((group) => group.heading.length > 0 && group.bullets.length > 0);
    const cardStarts = [...block.matchAll(/<div\b[^>]*class=["'][^"']*(?:decision-card|choice-card|scenario-card|risk-card)[^"']*["'][^>]*>/gi)];
    const contentCards = cardStarts.map((card, cardIndex) => {
      const cardStart = card.index ?? 0;
      const cardEnd = cardStarts[cardIndex + 1]?.index ?? block.length;
      const cardSource = block.slice(cardStart, cardEnd);
      const headings = classText(cardSource, "(?:decision-title|choice-title|scenario-title|risk-title)");
      const highlights = classText(cardSource, "(?:decision-cost|choice-cost|scenario-cost|risk-cost)");
      const lines = classText(cardSource, "(?:decision-desc|choice-desc|scenario-desc|risk-desc)");
      return { heading: headings[0] ?? "", highlight: highlights[0] ?? "", lines };
    }).filter((card) => card.heading.length > 0 && (card.highlight.length > 0 || card.lines.length > 0));
    const faqs = [...block.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((faq) => {
      const question = text(faq[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ?? "").replace(/\+$/, "").trim();
      const answer = text(faq[1].match(/<div\b[^>]*class=["'][^"']*faq-body[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? "");
      return { question, answer };
    }).filter((faq) => faq.question.length > 0 && faq.answer.length > 0);
    const relatedLinks = [...block.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
      .map((link) => ({ href: link[1], label: text(link[2]) }))
      .filter((link) => link.label.length > 2 && !link.href.startsWith("#"))
      .filter((link, linkIndex, list) => list.findIndex((candidate) => candidate.href === link.href && candidate.label === link.label) === linkIndex);
    return {
      eyebrow: text(labelMatch?.[1] ?? "Comparison guide"),
      heading,
      subheadings,
      paragraphs,
      bullets,
      comparisonGroups,
      contentCards,
      faqs,
      relatedLinks,
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
  const finalCta = {
    eyebrow: firstMatch(source, /<div\b[^>]*class=["'][^"']*fc-eyebrow[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || "Get an accurate engine price",
    heading: firstMatch(source, /<div\b[^>]*class=["'][^"']*fc-headline[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || h1,
    copy: firstMatch(source, /<p\b[^>]*class=["'][^"']*fc-sub[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || lead,
    trust: firstMatch(source, /<p\b[^>]*class=["'][^"']*fc-trust[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) || "Free comparison · No obligation · 100+ UK specialists",
    buttonLabel: firstMatch(source, /<a\b[^>]*class=["'][^"']*btn-cta[^"']*["'][^>]*>([\s\S]*?)<\/a>/i).replace(/^[^A-Za-z£]+/, "") || "Get your free quote now",
  };

  return {
    slug,
    title,
    description,
    eyebrow,
    heading: h1,
    lead,
    options: labels.map((label, index) => ({ label, amount: amounts[index] ?? "", detail: details[index] ?? "" })).slice(0, 3),
    finalCta,
    sections: extractSections(source),
  };
}
