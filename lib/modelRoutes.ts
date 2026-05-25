type ModelRouteLike = {
  slug: string;
  h3?: string;
  name?: string;
};

const numericSeriesSlugPattern = /^(\d+)-series$/i;
const legacySeriesSlugPattern = /^series-(\d+)$/i;
const seriesHeadingPattern = /\b(\d+)\s+Series\b/i;

function normalizeSlugPart(value: string) {
  return value.trim().toLowerCase();
}

function getSeriesSlug(value?: string) {
  if (!value?.trim()) {
    return null;
  }

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

export function getBrandHref(brandSlug: string) {
  return `/${normalizeSlugPart(brandSlug)}`;
}

export function getModelRouteSlug(model: ModelRouteLike) {
  return getSeriesSlug(model.slug) ?? getSeriesSlug(model.h3) ?? getSeriesSlug(model.name) ?? normalizeSlugPart(model.slug);
}

export function getModelHref(brandSlug: string, model: ModelRouteLike) {
  return `${getBrandHref(brandSlug)}/${getModelRouteSlug(model)}`;
}

export function matchesModelRouteSlug(
  model: ModelRouteLike,
  requestedSlug: string,
) {
  const normalizedRequestedSlug = normalizeSlugPart(requestedSlug);

  return [getModelRouteSlug(model), model.slug].some(
    (candidate) => normalizeSlugPart(candidate) === normalizedRequestedSlug,
  );
}
