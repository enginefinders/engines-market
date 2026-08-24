import { getBrandPageData } from "@/lib/brandData";
import { getEngineCodeLookupKeys } from "@/lib/engineLinks";
import { getAllEnginePageData } from "@/lib/enginePageData";
import { getAllModelPageData } from "@/lib/modelPageData";
import { getModelRouteSlug } from "@/lib/modelRoutes";
import { getAllVariantPageData } from "@/lib/variantPageData";

export type InternalLinkPageType = "brand" | "model" | "variant" | "engine";
export type InternalLinkTargetType = "brand" | "engine" | "model" | "variant";

export type InternalLinkTarget = {
  href: string;
  label: string;
  terms: string[];
  type: InternalLinkTargetType;
  priority?: number;
  maxOccurrences?: number;
};

export type InternalLinkPlan = {
  targets: InternalLinkTarget[];
  maxLinksPerPage: number;
  defaultMaxLinksPerTarget: number;
  maxLinksByType?: Partial<Record<InternalLinkTargetType, number>>;
};

type InternalLinkContext = {
  brandSlug: string;
  modelSlug?: string;
  engineSlug?: string;
  currentPath?: string;
  pageType: InternalLinkPageType;
};

type PageSettings = {
  maxLinksPerPage: number;
  defaultMaxLinksPerTarget: number;
  maxLinksByType?: Partial<Record<InternalLinkTargetType, number>>;
};

const PAGE_SETTINGS: Record<InternalLinkPageType, PageSettings> = {
  brand: {
    maxLinksPerPage: 32,
    defaultMaxLinksPerTarget: 1,
  },
  model: {
    maxLinksPerPage: 40,
    defaultMaxLinksPerTarget: 1,
  },
  variant: {
    maxLinksPerPage: 10,
    defaultMaxLinksPerTarget: 1,
    maxLinksByType: {
      brand: 1,
      engine: 5,
      model: 1,
    },
  },
  engine: {
    maxLinksPerPage: 20,
    defaultMaxLinksPerTarget: 1,
  },
};

function normalizeSlug(value: string) {
  return value.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

function normalizePath(value?: string) {
  if (!value) {
    return "";
  }

  return `/${normalizeSlug(value)}`.replace(/\/+$/g, "");
}

function cleanTerm(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripBrandPrefix(value: string, brandName: string) {
  const escapedBrand = brandName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(new RegExp(`^${escapedBrand}\\s+`, "i"), "").trim();
}

function stripEngineSuffix(value: string) {
  return value
    .replace(/\s+Engine\s+Replacement$/i, "")
    .replace(/\s+Engines$/i, "")
    .replace(/-engine$/i, "")
    .trim();
}

function slugToLabel(value: string) {
  return normalizeSlug(value)
    .replace(/-engine$/i, "")
    .split("-")
    .filter(Boolean)
    .join(" ")
    .trim();
}

function dedupeTerms(terms: string[]) {
  const seen = new Set<string>();
  const cleanTerms: string[] = [];

  for (const term of terms.map(cleanTerm).filter(Boolean)) {
    const key = term.toLowerCase();
    if (seen.has(key) || term.length < 2) {
      continue;
    }

    seen.add(key);
    cleanTerms.push(term);
  }

  return cleanTerms;
}

function addTarget(
  targets: InternalLinkTarget[],
  seenHrefs: Set<string>,
  target: InternalLinkTarget,
  currentPath: string,
) {
  const href = normalizePath(target.href);
  if (!href || href === currentPath || seenHrefs.has(href)) {
    return;
  }

  const terms = dedupeTerms(target.terms);
  if (!terms.length) {
    return;
  }

  seenHrefs.add(href);
  targets.push({
    ...target,
    href,
    terms,
  });
}

function getCanonicalVariantRoute(page: Awaited<ReturnType<typeof getAllVariantPageData>>[number]) {
  const canonical = page.seo.canonical?.trim();
  return normalizePath(canonical || `/${page.brand.slug}/${page.model.slug}/${page.variant.slug}`);
}

function getVariantShortName(variantName: string, brandName: string, modelName: string, variantSlug: string) {
  const withoutBrand = stripBrandPrefix(variantName, brandName);
  const escapedModel = modelName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withoutModel = withoutBrand.replace(new RegExp(`^${escapedModel}\\s+`, "i"), "").trim();
  return stripEngineSuffix(withoutModel || slugToLabel(variantSlug));
}

function getModelShortName(modelName: string, brandName: string) {
  return stripBrandPrefix(modelName, brandName);
}

function compactEngineCode(value: string) {
  return cleanTerm(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function buildEngineFamilyTerms(code: string) {
  const compact = compactEngineCode(code);
  if (!compact) {
    return [];
  }

  const segments = compact.match(/[A-Z]+[0-9]*/g) ?? [compact];
  const joinedTerms = new Set<string>();
  let prefix = "";
  let spacedPrefix = "";

  for (const segment of segments) {
    prefix += segment;
    spacedPrefix = spacedPrefix ? `${spacedPrefix} ${segment}` : segment;
    joinedTerms.add(prefix);

    if (spacedPrefix !== prefix) {
      joinedTerms.add(spacedPrefix);
    }
  }

  return [...joinedTerms];
}

function getCompatibleModelHrefs(
  pageType: InternalLinkPageType,
  engineSlug: string | undefined,
  normalizedBrand: string,
  enginePages: Awaited<ReturnType<typeof getAllEnginePageData>>,
) {
  if (pageType !== "engine" || !engineSlug) {
    return null;
  }

  const currentEnginePage = enginePages.find(
    (page) =>
      normalizeSlug(page.brand.slug) === normalizedBrand &&
      normalizeSlug(page.engine.slug) === normalizeSlug(engineSlug),
  );

  if (!currentEnginePage) {
    return null;
  }

  return new Set(
    currentEnginePage.sections.compatibility.rows
      .flatMap((row) => row.links ?? [])
      .map((link) => normalizePath(link.href))
      .filter(Boolean),
  );
}

function getRelatedEngineHrefs(
  pageType: InternalLinkPageType,
  engineSlug: string | undefined,
  normalizedBrand: string,
  enginePages: Awaited<ReturnType<typeof getAllEnginePageData>>,
) {
  if (pageType !== "engine" || !engineSlug) {
    return null;
  }

  const currentEnginePage = enginePages.find(
    (page) =>
      normalizeSlug(page.brand.slug) === normalizedBrand &&
      normalizeSlug(page.engine.slug) === normalizeSlug(engineSlug),
  );

  if (!currentEnginePage) {
    return null;
  }

  return new Set(
    currentEnginePage.sections.related.items
      .map((item) => normalizePath(item.href))
      .filter(Boolean),
  );
}

function getBrandTargetPriority(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "model":
      return 260;
    case "variant":
      return 280;
    case "engine":
      return 220;
    default:
      return 0;
  }
}

function getBrandTargetMaxOccurrences(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "model":
      return 2;
    case "variant":
      return 1;
    case "engine":
      return 1;
    default:
      return 1;
  }
}

function getModelTargetPriority(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "brand":
      return 420;
    case "variant":
      return 520;
    case "engine":
      return 460;
    default:
      return 0;
  }
}

function getModelTargetMaxOccurrences(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "brand":
      return 2;
    case "variant":
      return 1;
    case "engine":
      return 2;
    default:
      return 1;
  }
}

function getVariantTargetPriority(pageType: InternalLinkPageType, isCurrentModel: boolean) {
  switch (pageType) {
    case "brand":
      return 120;
    case "model":
      return isCurrentModel ? 440 : 80;
    case "engine":
      return 260;
    default:
      return 0;
  }
}

function getVariantTargetMaxOccurrences(pageType: InternalLinkPageType, isCurrentModel: boolean) {
  switch (pageType) {
    case "brand":
      return 1;
    case "model":
      return isCurrentModel ? 2 : 1;
    case "engine":
      return 1;
    default:
      return 1;
  }
}

function getEngineTargetPriority(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "brand":
      return 280;
    case "model":
      return 400;
    case "variant":
      return 320;
    case "engine":
      return 260;
    default:
      return 0;
  }
}

function getEngineTargetMaxOccurrences(pageType: InternalLinkPageType) {
  switch (pageType) {
    case "brand":
      return 2;
    case "model":
      return 3;
    case "variant":
      return 1;
    case "engine":
      return 1;
    default:
      return 1;
  }
}

export async function getInternalLinkPlan({
  brandSlug,
  modelSlug,
  engineSlug,
  currentPath,
  pageType,
}: InternalLinkContext): Promise<InternalLinkPlan> {
  const normalizedBrand = normalizeSlug(brandSlug);
  const normalizedModel = modelSlug ? normalizeSlug(modelSlug) : "";
  const normalizedCurrentPath = normalizePath(currentPath);
  const settings = PAGE_SETTINGS[pageType];
  const targets: InternalLinkTarget[] = [];
  const seenHrefs = new Set<string>();

  const [brandPageData, enginePages, modelPages, variantPages] = await Promise.all([
    getBrandPageData(normalizedBrand),
    getAllEnginePageData(),
    getAllModelPageData(),
    getAllVariantPageData(),
  ]);

  const compatibleModelHrefs = getCompatibleModelHrefs(pageType, engineSlug, normalizedBrand, enginePages);
  const relatedEngineHrefs = getRelatedEngineHrefs(pageType, engineSlug, normalizedBrand, enginePages);

  if (brandPageData && pageType !== "brand") {
    addTarget(
      targets,
      seenHrefs,
      {
        href: brandPageData.seo.canonical,
        label: brandPageData.brand.name,
        terms: [
          brandPageData.brand.name,
          `${brandPageData.brand.name} engines`,
          `${brandPageData.brand.name} engine replacement`,
        ],
        type: "brand",
        priority: getBrandTargetPriority(pageType),
        maxOccurrences: getBrandTargetMaxOccurrences(pageType),
      },
      normalizedCurrentPath,
    );
  }

  for (const page of modelPages) {
    if (normalizeSlug(page.brand.slug) !== normalizedBrand) {
      continue;
    }

    const routeSlug = getModelRouteSlug(page.model);
    const href = `/${page.brand.slug}/${routeSlug}`;
    const normalizedHref = normalizePath(href);
    const isCurrentModel = normalizedModel && normalizeSlug(routeSlug) === normalizedModel;

    if (pageType === "model") {
      continue;
    }

    if (pageType === "variant" && !isCurrentModel) {
      continue;
    }

    if (pageType === "engine" && compatibleModelHrefs && !compatibleModelHrefs.has(normalizedHref)) {
      continue;
    }

    const shortName = getModelShortName(page.model.name, page.brand.name);
    addTarget(
      targets,
      seenHrefs,
      {
        href,
        label: page.model.name,
        terms: [page.model.name, shortName, slugToLabel(routeSlug)],
        type: "model",
        priority: getModelTargetPriority(pageType),
        maxOccurrences: getModelTargetMaxOccurrences(pageType),
      },
      normalizedCurrentPath,
    );
  }

  for (const page of enginePages) {
    if (normalizeSlug(page.brand.slug) !== normalizedBrand) {
      continue;
    }

    const href = `/${page.brand.slug}/${page.engine.slug}`;
    const normalizedHref = normalizePath(href);

    if (pageType === "engine" && relatedEngineHrefs && !relatedEngineHrefs.has(normalizedHref)) {
      continue;
    }

    const familyTerms = buildEngineFamilyTerms(page.engine.code);
    addTarget(
      targets,
      seenHrefs,
      {
        href,
        label: page.engine.code,
        terms: [
          page.engine.code,
          ...getEngineCodeLookupKeys(page.engine.code),
          ...familyTerms,
          slugToLabel(page.engine.slug).toUpperCase(),
        ],
        type: "engine",
        priority: getEngineTargetPriority(pageType),
        maxOccurrences: getEngineTargetMaxOccurrences(pageType),
      },
      normalizedCurrentPath,
    );
  }

  for (const page of variantPages) {
    if (normalizeSlug(page.brand.slug) !== normalizedBrand) {
      continue;
    }

    if (pageType === "variant") {
      continue;
    }

    const isCurrentModel = normalizedModel && normalizeSlug(page.model.slug) === normalizedModel;
    const href = getCanonicalVariantRoute(page);

    if (pageType === "model" && !isCurrentModel) {
      continue;
    }

    if (pageType === "engine" && compatibleModelHrefs) {
      const modelHref = normalizePath(`/${page.brand.slug}/${page.model.slug}`);
      if (!compatibleModelHrefs.has(modelHref)) {
        continue;
      }
    }

    const shortName = getVariantShortName(page.variant.name, page.brand.name, page.model.name, page.variant.slug);
    const modelShortName = getModelShortName(page.model.name, page.brand.name);
    const broadTerms = [
      page.variant.name,
      `${modelShortName} ${shortName}`,
      slugToLabel(page.variant.storageSlug),
      slugToLabel(page.variant.slug),
    ];
    const scopedTerms = isCurrentModel ? [shortName] : [];

    addTarget(
      targets,
      seenHrefs,
      {
        href,
        label: page.variant.name,
        terms: [...broadTerms, ...scopedTerms],
        type: "variant",
        priority: getVariantTargetPriority(pageType, Boolean(isCurrentModel)),
        maxOccurrences: getVariantTargetMaxOccurrences(pageType, Boolean(isCurrentModel)),
      },
      normalizedCurrentPath,
    );
  }

  return {
    targets: targets.sort((left, right) => {
      const priorityDelta = (right.priority ?? 0) - (left.priority ?? 0);
      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      const leftLongest = Math.max(...left.terms.map((term) => term.length));
      const rightLongest = Math.max(...right.terms.map((term) => term.length));
      if (rightLongest !== leftLongest) {
        return rightLongest - leftLongest;
      }

      return left.label.localeCompare(right.label);
    }),
    maxLinksPerPage: settings.maxLinksPerPage,
    defaultMaxLinksPerTarget: settings.defaultMaxLinksPerTarget,
    maxLinksByType: settings.maxLinksByType,
  };
}
