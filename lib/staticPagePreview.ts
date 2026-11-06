import fs from "node:fs";
import path from "node:path";

export type StaticTable = {
  headers: string[];
  rows: string[][];
};

export type StaticFaq = {
  question: string;
  answer: string;
};

export type StaticForm = {
  action: string;
  method: string;
  fields: Array<{
    element: string;
    name: string;
    type: string;
    placeholder: string;
    required: boolean;
  }>;
};

export type StaticBlock =
  | { type: "heading"; level: string; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | ({ type: "table" } & StaticTable)
  | ({ type: "faq" } & StaticFaq)
  | ({ type: "form" } & StaticForm)
  | { type: "links"; links: Array<{ href: string; text: string }> }
  | { type: "label"; text: string }
  | { type: "cards"; cards: Array<{ title: string; text: string; highlight: string; meta: string; icon?: string; items?: string[]; fullText?: string }> }
  | { type: "stat"; value: string; label: string }
  | { type: "image"; src: string; alt: string }
  | { type: "quote"; text: string };

export type StaticLink = { href: string; text: string };

export type NormalizedStaticHero = {
  eyebrow: string;
  title: string;
  description: string;
  options: Array<{ label: string; amount: string; detail: string }>;
  trust: string[];
  image: { src: string; alt: string } | null;
  blocks: StaticBlock[];
  links: StaticLink[];
};

export type NormalizedStaticItem = {
  id: string;
  title: string;
  description: string | null;
  blocks: StaticBlock[];
  links: StaticLink[];
  source: { sectionId: string; order: number };
};

export type NormalizedStaticSection = { items: NormalizedStaticItem[] };

export type NormalizedStaticSupplemental = {
  media: Array<{ src: string; alt: string; width: string; height: string }>;
  tables: StaticTable[];
  faqs: StaticFaq[];
  forms: StaticForm[];
  links: StaticLink[];
};

export type NormalizedStaticSections = {
  hero: NormalizedStaticHero;
  supplemental: NormalizedStaticSupplemental;
  ordered?: NormalizedStaticItem[];
  [sectionName: string]: NormalizedStaticHero | NormalizedStaticSupplemental | NormalizedStaticSection | NormalizedStaticItem[] | undefined;
};

export type StaticPageRecord = {
  id: string;
  contentType: string;
  slug: string;
  route: string;
  source: {
    originalFile: string;
    sourceHash: string;
  };
  seo: {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    openGraph: {
      title: string;
      description: string;
      url: string;
      image: string;
      type: string;
    };
  };
  schemaVersion?: number;
  sections: NormalizedStaticSections;
  structuredData: unknown[];
  stats: Record<string, number>;
};

export type AboutPageSections = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    supportingDescription: string;
    breadcrumbs: Array<{ label: string; href: string }>;
    stats: Array<{ value: string; label: string }>;
    brand: { label: string; name: string; tagline: string };
    image: { src: string; alt: string } | null;
    nextSectionLabel: string;
  };
  mission: {
    title: string;
    description: string;
    values: string[];
    nextSectionLabel: string;
  };
  platform: {
    title: string;
    description: string;
    includedLabel: string;
    included: string[];
    excludedLabel: string;
    excluded: string[];
    closing: string;
    nextSectionLabel: string;
  };
  problem: {
    title: string;
    items: Array<{ title: string; description: string }>;
    nextSectionLabel: string;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{ step: string; title: string; description: string }>;
    cta: { text: string; label: string; href: string };
    nextSectionLabel: string;
  };
  trust: {
    title: string;
    description: string;
    principles: Array<{ title: string; description: string }>;
    nextSectionLabel: string;
  };
  testimonials: {
    title: string;
    items: Array<{ quote: string; attribution: string }>;
    note: string;
    link: { href: string; text: string };
    nextSectionLabel: string;
  };
  resources: {
    title: string;
    description: string;
    items: Array<{ icon: string; title: string; description: string; href: string }>;
    nextSectionLabel: string;
  };
  faq: {
    title: string;
    items: StaticFaq[];
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      highlights: string[];
      buttonText: string;
      note: string;
      href: string;
    };
  };
};

export type AboutPageRecord = Omit<StaticPageRecord, "sections"> & {
  contentType: "about";
  sections: AboutPageSections;
};

export type StaticPageShellRecord = Pick<StaticPageRecord, "source" | "route" | "structuredData">;

export type NormalizedPreviewSection = {
  id: string;
  heading: string;
  description: string | null;
  blocks: StaticBlock[];
  links: StaticLink[];
};

export type NormalizedPreviewContent = {
  hero: NormalizedStaticHero;
  leadBlocks: StaticBlock[];
  sections: NormalizedPreviewSection[];
  tables: StaticTable[];
  faqs: StaticFaq[];
  forms: StaticForm[];
  media: Array<{ src: string; alt: string; width: string; height: string }>;
  relatedLinks: StaticLink[];
};

function sectionBlocks(section: Record<string, unknown>): StaticBlock[] {
  const blocks = section.blocks ?? section.content;
  return Array.isArray(blocks) ? blocks as StaticBlock[] : [];
}

function normalizedSectionItems(page: StaticPageRecord): NormalizedStaticItem[] {
  const rawSections = page.sections as unknown as Record<string, Record<string, unknown>>;
  const ordered = rawSections.ordered;
  if (Array.isArray(ordered)) {
    return ordered.map((item, index) => ({
      ...item,
      id: typeof item.id === "string" ? item.id : `section-${index + 1}`,
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : null,
      blocks: sectionBlocks(item as unknown as Record<string, unknown>),
      links: Array.isArray((item as unknown as Record<string, unknown>).links) ? item.links : [],
      source: item.source || { sectionId: item.id || `section-${index + 1}`, order: index },
    })).sort((left, right) => left.source.order - right.source.order);
  }
  return Object.entries(rawSections)
    .filter(([sectionName]) => sectionName !== "hero" && sectionName !== "supplemental")
    .flatMap(([sectionName, section], sectionIndex) => {
      if (Array.isArray(section.items)) {
        return (section.items as NormalizedStaticItem[]).map((item) => ({
          ...item,
          blocks: sectionBlocks(item as unknown as Record<string, unknown>),
          links: Array.isArray((item as unknown as Record<string, unknown>).links) ? item.links : [],
        }));
      }

      if (!section.title && !section.description && !sectionBlocks(section).length) return [];
      return [{
        id: sectionName,
        title: typeof section.title === "string" ? section.title : sectionName,
        description: typeof section.description === "string" ? section.description : null,
        blocks: sectionBlocks(section),
        links: Array.isArray(section.links) ? section.links as StaticLink[] : [],
        source: { sectionId: sectionName, order: sectionIndex },
      }];
    })
    .sort((left, right) => left.source.order - right.source.order);
}

export function getNormalizedPreviewContent(page: StaticPageRecord): NormalizedPreviewContent {
  const rawHero = page.sections.hero as unknown as Record<string, unknown>;
  const hero: NormalizedStaticHero = {
    eyebrow: typeof rawHero.eyebrow === "string" ? rawHero.eyebrow : "",
    title: typeof rawHero.title === "string" ? rawHero.title : "",
    description: typeof rawHero.description === "string" ? rawHero.description : "",
    options: Array.isArray(rawHero.options) ? rawHero.options as NormalizedStaticHero["options"] : [],
    trust: Array.isArray(rawHero.trust) ? rawHero.trust as string[] : [],
    image: rawHero.image && typeof rawHero.image === "object" ? rawHero.image as NormalizedStaticHero["image"] : null,
    blocks: sectionBlocks(rawHero),
    links: Array.isArray(rawHero.links) ? rawHero.links as StaticLink[] : [],
  };
  const items = normalizedSectionItems(page);
  const rawSupplemental = page.sections.supplemental as unknown as Record<string, unknown> | undefined;
  const supplemental: NormalizedStaticSupplemental = {
    media: Array.isArray(rawSupplemental?.media) ? rawSupplemental.media as NormalizedStaticSupplemental["media"] : [],
    tables: Array.isArray(rawSupplemental?.tables) ? rawSupplemental.tables as StaticTable[] : [],
    faqs: Array.isArray(rawSupplemental?.faqs) ? rawSupplemental.faqs as StaticFaq[] : [],
    forms: Array.isArray(rawSupplemental?.forms) ? rawSupplemental.forms as StaticForm[] : [],
    links: Array.isArray(rawSupplemental?.links) ? rawSupplemental.links as StaticLink[] : [],
  };
  const allBlocks = [hero.blocks, ...items.map((item) => item.blocks)].flat();

  return {
    hero,
    leadBlocks: hero.blocks,
    sections: items.map((item) => ({
      id: item.id,
      heading: item.title,
      description: item.description,
      blocks: item.blocks,
      links: item.links,
    })),
    tables: [
      ...allBlocks.flatMap((block) => block.type === "table" ? [{ headers: block.headers, rows: block.rows }] : []),
      ...supplemental.tables,
    ],
    faqs: [
      ...allBlocks.flatMap((block) => block.type === "faq" ? [{ question: block.question, answer: block.answer }] : []),
      ...supplemental.faqs,
    ],
    forms: [
      ...allBlocks.flatMap((block) => block.type === "form" ? [{ action: block.action, method: block.method, fields: block.fields }] : []),
      ...supplemental.forms,
    ],
    media: [
      ...allBlocks.flatMap((block) => block.type === "image" ? [{ src: block.src, alt: block.alt, width: "", height: "" }] : []),
      ...supplemental.media,
    ],
    relatedLinks: [
      ...items.flatMap((item) => item.links),
      ...supplemental.links,
    ],
  };
}

function collectJsonFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectJsonFiles(entryPath);
    return entry.name.endsWith(".json") && entry.name !== "index.json" ? [entryPath] : [];
  });
}

function loadPreviewPages(): StaticPageRecord[] {
  const generatedRoot = path.join(process.cwd(), "data", "static-pages-dynamic");
  const dataRoot = fs.existsSync(generatedRoot) ? generatedRoot : path.join(process.cwd(), "data", "static-pages");
  return collectJsonFiles(dataRoot)
    .map((filePath) => JSON.parse(fs.readFileSync(filePath, "utf8")) as StaticPageRecord)
    .sort((left, right) => left.id.localeCompare(right.id));
}

export const previewPages = loadPreviewPages();

export function getStaticPagesByFamily(family: string) {
  return previewPages.filter((page) => page.contentType === family);
}

function normalizedRoute(route: string) {
  const withoutExtension = route.replace(/\.html$/i, "");
  return withoutExtension.replace(/\/+$/, "") || "/";
}

export function getStaticPageByRoute(route: string, family?: string) {
  const normalized = normalizedRoute(route);

  return previewPages.find((page) => {
    if (family && page.contentType !== family) return false;
    if (page.route === normalized) return true;

    const sourceRoute = `/${page.slug}`;
    if (sourceRoute === normalized) return true;

    const pageSourceSlug = page.source.originalFile
      .replace(/^.*[\\/]public[\\/]?/, "")
      .replace(/\.html$/i, "")
      .replace(/[\\/]+/g, "/");

    return `/${pageSourceSlug}` === normalized;
  });
}

export function getStaticFamilyParams(family: string, prefix: string) {
  const prefixWithSlash = `${prefix.replace(/\/+$/, "")}/`;

  return getStaticPagesByFamily(family).flatMap((page) => {
    const candidates = new Set<string>();
    for (const route of [page.route, `/${page.slug}`]) {
      if (route.startsWith(prefixWithSlash)) candidates.add(route.slice(prefixWithSlash.length));
    }

    return [...candidates].map((slug) => ({ slug: slug.split("/").filter(Boolean) }));
  });
}

export function getStaticFamilySingleSegmentParams(family: string, prefix: string) {
  return getStaticFamilyParams(family, prefix)
    .filter(({ slug }) => slug.length === 1)
    .map(({ slug }) => ({ slug: slug[0] }));
}

export const previewStaticParams = previewPages.map((page) => ({
  family: page.contentType,
  slug: page.slug.split("/").pop() ?? page.slug,
}));

export function getPreviewPage(family: string, slug: string) {
  return previewPages.find((page) => {
    const pageSlug = page.slug.split("/").pop() ?? page.slug;
    return page.contentType === family && pageSlug === slug;
  });
}

const LEGAL_SOURCE_SLUG_ALIASES: Record<string, string> = {
  "data-handling-policy": "data-handlng-policy",
};

export function getLegalPages() {
  return previewPages.filter((page) => page.contentType === "legal");
}

export function getLegalPageByRoute(route: string) {
  const normalizedRoute = route.replace(/\/+$/, "") || "/";

  return getLegalPages().find((page) => {
    if (page.route === normalizedRoute) return true;

    const sourceSlug = page.slug.split("/").pop() ?? page.slug;
    const routeSlug = normalizedRoute.split("/").pop() ?? normalizedRoute;
    return sourceSlug === routeSlug || LEGAL_SOURCE_SLUG_ALIASES[routeSlug] === sourceSlug;
  });
}

export function getLegalPageStaticParams() {
  return getLegalPages().flatMap((page) => {
    const routeSlug = page.route.split("/").pop() ?? page.route;
    const sourceSlug = page.slug.split("/").pop() ?? page.slug;
    const slugs = new Set([routeSlug, sourceSlug]);

    return [...slugs].map((slug) => ({ slug }));
  });
}
