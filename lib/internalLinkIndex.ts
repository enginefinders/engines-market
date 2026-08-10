import { getEngineCodeLookupKeys } from "@/lib/engineLinks";
import { getAllEnginePageData } from "@/lib/enginePageData";
import { getAllModelPageData } from "@/lib/modelPageData";
import { getModelRouteSlug } from "@/lib/modelRoutes";
import { getAllVariantPageData } from "@/lib/variantPageData";

export type InternalLinkTarget = {
  href: string;
  label: string;
  terms: string[];
  type: "engine" | "model" | "variant";
};

type InternalLinkContext = {
  brandSlug: string;
  modelSlug?: string;
  currentPath?: string;
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

  const terms = dedupeTerms(target.terms).filter((term) => normalizePath(term) !== currentPath);
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

export async function getInternalLinkTargets({
  brandSlug,
  modelSlug,
  currentPath,
}: InternalLinkContext) {
  const normalizedBrand = normalizeSlug(brandSlug);
  const normalizedModel = modelSlug ? normalizeSlug(modelSlug) : "";
  const normalizedCurrentPath = normalizePath(currentPath);
  const targets: InternalLinkTarget[] = [];
  const seenHrefs = new Set<string>();

  const [enginePages, modelPages, variantPages] = await Promise.all([
    getAllEnginePageData(),
    getAllModelPageData(),
    getAllVariantPageData(),
  ]);

  for (const page of enginePages) {
    if (normalizeSlug(page.brand.slug) !== normalizedBrand) {
      continue;
    }

    const href = `/${page.brand.slug}/${page.engine.slug}`;
    addTarget(
      targets,
      seenHrefs,
      {
        href,
        label: page.engine.code,
        terms: [
          page.engine.code,
          ...getEngineCodeLookupKeys(page.engine.code),
          slugToLabel(page.engine.slug).toUpperCase(),
        ],
        type: "engine",
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
    const shortName = getModelShortName(page.model.name, page.brand.name);
    addTarget(
      targets,
      seenHrefs,
      {
        href,
        label: page.model.name,
        terms: [page.model.name, shortName, slugToLabel(routeSlug)],
        type: "model",
      },
      normalizedCurrentPath,
    );
  }

  for (const page of variantPages) {
    if (normalizeSlug(page.brand.slug) !== normalizedBrand) {
      continue;
    }

    const isCurrentModel = normalizedModel && normalizeSlug(page.model.slug) === normalizedModel;
    const href = getCanonicalVariantRoute(page);
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
      },
      normalizedCurrentPath,
    );
  }

  return targets;
}
