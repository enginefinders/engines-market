const DEFAULT_SITE_URL = "https://enginesmarket.co.uk";

function normalizeSiteUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);
