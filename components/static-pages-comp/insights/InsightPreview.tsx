import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import InsightsHero from "@/components/static-pages-comp/insights/InsightsHero";
import InsightsPageContent from "@/components/static-pages-comp/insights/InsightsPageContent";

export default function InsightPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="insights" mode="data" hero={<InsightsHero page={page} />} body={<InsightsPageContent page={page} />} />;
}
