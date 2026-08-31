import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FailureGuide from "@/components/pages/FailureGuide";
import { failureGuides, failureGuidesBySlug } from "@/data/failureGuides";
import { SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return failureGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = failureGuidesBySlug[slug];
  if (!guide) return {};
  return { title: guide.metaTitle, description: guide.metaDescription, alternates: { canonical: `${SITE_URL}/failures/${guide.slug}` }, openGraph: { title: guide.metaTitle, description: guide.metaDescription, url: `${SITE_URL}/failures/${guide.slug}`, images: [{ url: guide.image, alt: guide.name }] } };
}

export default async function FailureGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = failureGuidesBySlug[slug];
  if (!guide) notFound();
  return <FailureGuide guide={guide} />;
}
