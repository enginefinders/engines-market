import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FamilyPreviewRouter from "@/components/static-pages-comp/FamilyPreviewRouter";
import { getStaticPageByRoute, type StaticPageRecord } from "@/lib/staticPagePreview";
import { getStaticPageMetadata } from "@/lib/staticPageMetadata";

const ROOT_FAMILIES = ["symptoms", "services", "about", "legal", "case-studies", "compare", "failures", "prices", "insights", "guides", "locations", "reviews", "get-a-quote"] as const;

type PageProps = {
  params: Promise<{ family: string }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return ROOT_FAMILIES.map((family) => ({ family }));
}

function findRootPage(family: string) {
  if (!ROOT_FAMILIES.includes(family as (typeof ROOT_FAMILIES)[number])) return undefined;
  return getStaticPageByRoute(`/${family}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family } = await params;
  const page = findRootPage(family);
  return page ? getStaticPageMetadata(page) : { title: "Static page preview", robots: { index: false, follow: false } };
}

export default async function PreviewFamilyRootPage({ params }: PageProps) {
  const { family } = await params;
  const page = findRootPage(family) as StaticPageRecord | undefined;
  if (!page) notFound();
  return <FamilyPreviewRouter page={page} />;
}
