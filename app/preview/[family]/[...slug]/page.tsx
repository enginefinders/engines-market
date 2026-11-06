import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FamilyPreviewRouter from "@/components/static-pages-comp/FamilyPreviewRouter";
import {
  getStaticFamilyParams,
  getStaticPageByRoute,
  type StaticPageRecord,
} from "@/lib/staticPagePreview";
import { getStaticPageMetadata } from "@/lib/staticPageMetadata";

const FAMILY_PREFIXES = {
  "case-studies": "/case-studies",
  compare: "/compare",
  failures: "/failures",
  prices: "/prices",
  insights: "/insights",
  symptoms: "/symptoms",
  services: "/services",
  about: "/about",
  legal: "/legal",
} as const;

type Family = keyof typeof FAMILY_PREFIXES;

type PageProps = {
  params: Promise<{ family: string; slug: string[] }>;
};

function findPage(family: string, slug: string) {
  if (!(family in FAMILY_PREFIXES)) return undefined;
  if (family === "legal" && slug === "data-handling-policy") {
    return getStaticPageByRoute("/legal/data-handlng-policy", family);
  }
  return getStaticPageByRoute(`${FAMILY_PREFIXES[family as Family]}/${slug}`, family);
}

export const dynamicParams = true;

export function generateStaticParams() {
  return (Object.entries(FAMILY_PREFIXES) as [Family, string][]).flatMap(([family, prefix]) =>
    getStaticFamilyParams(family, prefix).map(({ slug }) => ({ family, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family, slug } = await params;
  const page = findPage(family, slug.join("/"));
  return page ? getStaticPageMetadata(page) : { title: "Static page preview", robots: { index: false, follow: false } };
}

export default async function PreviewFamilyDetailPage({ params }: PageProps) {
  const { family, slug } = await params;
  const page = findPage(family, slug.join("/")) as StaticPageRecord | undefined;
  if (!page) notFound();
  return <FamilyPreviewRouter page={page} />;
}
