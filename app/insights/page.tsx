import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Engine Market Insights | Engines Market",
  description: "UK engine market statistics, price reports and reliability insights.",
};

export default function InsightsPage() {
  return (
    <ResourceHubPage
      eyebrow="Insights"
      title="Engine Market Insights"
      description="Explore UK engine replacement statistics, price trends, reliability guides and market reports."
      sections={[{ title: "Insights", links: getPublicHtmlLinks("insights") }]}
    />
  );
}
