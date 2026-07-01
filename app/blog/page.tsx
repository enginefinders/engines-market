import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { insightLinks, knowledgeLinks } from "@/lib/navigation";

export const metadata = {
  title: "Blog | Engines Market",
  description: "Latest engine replacement guides, insights and resources.",
};

export default function BlogPage() {
  return (
    <ResourceHubPage
      eyebrow="Blog"
      title="Engine Replacement Blog"
      description="Browse the latest guides and market insights while the dedicated blog archive is being built."
      sections={[
        { title: "Knowledge", links: knowledgeLinks },
        { title: "Insights", links: insightLinks },
      ]}
    />
  );
}
