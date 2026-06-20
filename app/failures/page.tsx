import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Engine Failures | Engines Market",
  description: "Browse common engine failure guides and warning signs.",
};

export default function FailuresPage() {
  return (
    <ResourceHubPage
      eyebrow="Knowledge"
      title="Engine Failure Guides"
      description="Find detailed guides for common engine failures, warning signs, causes and replacement options."
      sections={[{ title: "All Engine Failures", links: getPublicHtmlLinks("failures") }]}
    />
  );
}
