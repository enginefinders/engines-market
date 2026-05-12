import type { BrandPageData } from "@/types/brand";

const mojibakeFixes: Array<[string | RegExp, string]> = [
  [/Â£/g, "£"],
  [/â€“/g, "–"],
  [/â€”/g, "—"],
  [/â€˜|â€™/g, "'"],
  [/â€œ|â€/g, '"'],
  [/â€¦/g, "..."],
  [/Ã—/g, "x"],
  [/Ã¢â‚¬â€œ/g, "–"],
  [/Ã¢â‚¬â€/g, "—"],
  [/Ã¢â€ â€™/g, "->"],
  [/Ã‚Â£/g, "£"],
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

export function sanitizeBrandPageData(data: BrandPageData): BrandPageData {
  return sanitizeDeep(data);
}
