import { notFound } from "next/navigation";
import ComparisonGuide from "@/components/pages/ComparisonGuide";
import SharedComparisonGuide from "@/components/pages/SharedComparisonGuide";
import { usedVsRebuiltEngine } from "@/data/comparisonGuides";
import { getStaticComparisonGuide } from "@/data/staticComparisonGuides";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === usedVsRebuiltEngine.slug) return { title: usedVsRebuiltEngine.title, description: usedVsRebuiltEngine.description };
  const guide = getStaticComparisonGuide(slug);
  return guide ? { title: guide.title, description: guide.description } : {};
}

export default async function ComparisonGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === usedVsRebuiltEngine.slug) return <ComparisonGuide guide={usedVsRebuiltEngine} />;
  const guide = getStaticComparisonGuide(slug);
  if (!guide) notFound();
  return <SharedComparisonGuide guide={guide} />;
}
