import fs from "node:fs";
import path from "node:path";

import type { NavigationLink } from "@/lib/navigation";

const ignoredFileNames = new Set(["readme.md"]);

function titleFromSlug(slug: string) {
  return slug
    .replace(/\.html$/i, "")
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (part.toLowerCase() === "uk") return "UK";
      if (part.toLowerCase() === "dpf") return "DPF";
      if (part.toLowerCase() === "egr") return "EGR";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function walkHtmlFiles(directory: string, baseHref: string): NavigationLink[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkHtmlFiles(fullPath, `${baseHref}/${entry.name}`);
    }

    if (!entry.isFile() || ignoredFileNames.has(entry.name.toLowerCase()) || !entry.name.endsWith(".html")) {
      return [];
    }

    const slug = entry.name.replace(/\.html$/i, "");

    return [{
      label: titleFromSlug(slug),
      href: `${baseHref}/${slug}`,
    }];
  });
}

export function getPublicHtmlLinks(publicFolder: string): NavigationLink[] {
  return walkHtmlFiles(path.join(process.cwd(), "public", publicFolder), `/${publicFolder}`)
    .sort((first, second) => first.label.localeCompare(second.label));
}

export const symptomLinks: NavigationLink[] = [
  { label: "Engine Knock", href: "/failures/engine-knock" },
  { label: "Engine Management Light", href: "/failures/engine-management-light" },
  { label: "Engine Vibration", href: "/failures/engine-vibration" },
  { label: "Excessive Smoke", href: "/failures/excessive-smoke" },
  { label: "Excessive Oil Consumption", href: "/failures/excessive-oil-consumption" },
  { label: "Low Compression", href: "/failures/low-compression" },
  { label: "Misfiring Engine", href: "/failures/misfiring-engine" },
  { label: "Overheating Engine", href: "/failures/overheating-engine" },
];

export const guideLinks: NavigationLink[] = [
  { label: "Engine Warranty Guide", href: "/about/engine-warranty-guide" },
  { label: "Warranty Claims Guide", href: "/about/warranty-claims-guide" },
  { label: "How Engines Market Works", href: "/about/how-engines-market-works" },
  { label: "Supplier Standards", href: "/about/supplier-standards" },
  { label: "Engine Fitting Cost", href: "/prices/engine-fitting-cost" },
  { label: "Garage Labour Rates", href: "/prices/garage-labour-rates" },
  { label: "All Resources", href: "/resources" },
];
