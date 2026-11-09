import type { StaticPageRecord } from "@/lib/staticPagePreview";
import InsightPreview from "@/components/static-pages-comp/insights/InsightPreview";

export default function InsightsPage({ page }: { page: StaticPageRecord }) {
  return <InsightPreview page={page} />;
}
