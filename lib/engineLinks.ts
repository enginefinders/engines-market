export type EngineLinkMap = Record<string, string>;

function normalizeDashes(value: string) {
  return value.replace(/[–—]/g, "-");
}

function compactSpaces(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function getEngineCodeLookupKeys(code: string) {
  const normalized = compactSpaces(normalizeDashes(code).toUpperCase());
  if (!normalized) {
    return [];
  }

  const keys = new Set<string>();

  const addKey = (value: string) => {
    const clean = compactSpaces(value);
    if (!clean) {
      return;
    }

    keys.add(clean);
    keys.add(clean.replace(/\s+/g, ""));
  };

  addKey(normalized.replace(/\(.*?\)/g, "").trim());

  normalized
    .split(/\/|,|\bor\b/gi)
    .map((part) => part.replace(/\(.*?\)/g, "").trim())
    .filter(Boolean)
    .forEach(addKey);

  return Array.from(keys);
}

export function getEngineLinkForCode(code: string, engineLinks?: EngineLinkMap) {
  if (!engineLinks) {
    return null;
  }

  for (const key of getEngineCodeLookupKeys(code)) {
    if (engineLinks[key]) {
      return engineLinks[key];
    }
  }

  return null;
}

export function splitLeadingEngineCode(text: string) {
  const normalized = compactSpaces(normalizeDashes(text));
  const match = normalized.match(/^([A-Z0-9][A-Z0-9/ .+-]{1,40}?)(\s+-\s+.*)$/i);

  if (!match) {
    return null;
  }

  return {
    code: match[1].trim(),
    remainder: match[2],
  };
}
