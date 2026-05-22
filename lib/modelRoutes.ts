import type { BrandPageData } from "@/types/brand";

type ModelCard = BrandPageData["sections"]["models"]["cards"][number];

const numericSeriesSlugPattern = /^(\d+)-series$/i;
const legacySeriesSlugPattern = /^series-(\d+)$/i;
const seriesHeadingPattern = /\b(\d+)\s+Series\b/i;

function getSeriesSlug(value: string) {
  const normalized = value.trim().toLowerCase();
  const slugMatch = normalized.match(numericSeriesSlugPattern);

  if (slugMatch) {
    return `${slugMatch[1]}-series`;
  }

  const legacyMatch = normalized.match(legacySeriesSlugPattern);

  if (legacyMatch) {
    return `${legacyMatch[1]}-series`;
  }

  const headingMatch = value.match(seriesHeadingPattern);

  if (headingMatch) {
    return `${headingMatch[1]}-series`;
  }

  return null;
}

export function getModelRouteSlug(model: Pick<ModelCard, "slug" | "h3">) {
  return getSeriesSlug(model.slug) ?? getSeriesSlug(model.h3) ?? model.slug;
}

export function matchesModelRouteSlug(
  model: Pick<ModelCard, "slug" | "h3">,
  requestedSlug: string,
) {
  const normalizedRequestedSlug = requestedSlug.toLowerCase();

  return [getModelRouteSlug(model), model.slug].some(
    (candidate) => candidate.toLowerCase() === normalizedRequestedSlug,
  );
}
