const DEFAULT_SITE_URL = "https://enginesmarket.co.uk";

function normalizeSiteUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

function readBooleanFlag(name: string, defaultValue: boolean) {
  const raw = process.env[name];
  if (raw == null || raw === "") {
    return defaultValue;
  }

  return raw === "true";
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);

export const INDEX_MODEL_PAGES = readBooleanFlag("INDEX_MODEL_PAGES", true);
export const INDEX_VARIANT_PAGES = readBooleanFlag("INDEX_VARIANT_PAGES", false);
