import type { BrandPageData } from "@/types/brand";

const mojibakeFixes: Array<[RegExp, string]> = [
  [/Â£/g, "£"],
  [/Â·|â€¢/g, "-"],
  [/â€“|â€”/g, "-"],
  [/â€˜|â€™/g, "'"],
  [/â€œ|â€/g, '"'],
  [/â€¦/g, "..."],
  [/â†’/g, "->"],
  [/Ã‚Â£/g, "£"],
  [/Ã¢â‚¬â€œ|Ã¢â‚¬â€/g, "-"],
  [/Ã¢â‚¬Ëœ|Ã¢â‚¬â„¢/g, "'"],
  [/Ã¢â‚¬Å“|Ã¢â‚¬Â/g, '"'],
  [/Ã¢â‚¬Â¦/g, "..."],
  [/Ãƒâ€”/g, "x"],
  [/ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“|ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â/g, "-"],
  [/ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢/g, "->"],
  [/Ãƒâ€šÃ‚Â£/g, "£"],
];

function sanitizeString(value: string) {
  return mojibakeFixes.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    value,
  );
}

function sanitizeDeep<T>(value: T): T {
  if (typeof value === "string") {
    return sanitizeString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, sanitizeDeep(nestedValue)]),
    ) as T;
  }

  return value;
}

export function sanitizeMojibake<T>(data: T): T {
  return sanitizeDeep(data);
}

export function sanitizeBrandPageData(data: BrandPageData): BrandPageData {
  return sanitizeMojibake(data);
}
