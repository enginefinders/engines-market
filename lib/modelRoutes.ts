import type { BrandPageData } from "@/types/brand";

type ModelCard = BrandPageData["sections"]["models"]["cards"][number];

const numericSeriesSlugPattern = /^(\d+)-series$/i;
const seriesHeadingPattern = /\b(\d+)\s+Series\b/i;

function getSeriesSlug(value: string) {
  const slugMatch = value.match(numericSeriesSlugPattern);

  if (slugMatch) {
    return `series-${slugMatch[1]}`;
  }

  const headingMatch = value.match(seriesHeadingPattern);

  if (headingMatch) {
    return `series-${headingMatch[1]}`;
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
