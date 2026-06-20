import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Compare Engine Options | Engines Market",
  description: "Compare repair, replacement, rebuilt, used and reconditioned engine options.",
};

export default function ComparePage() {
  return (
    <ResourceHubPage
      eyebrow="Knowledge"
      title="Compare Engine Options"
      description="Compare the main routes available when an engine has failed or is becoming uneconomical to repair."
      sections={[{ title: "Comparison Guides", links: getPublicHtmlLinks("compare") }]}
    />
  );
}
