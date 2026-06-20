import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Engine Case Studies | Engines Market",
  description: "Real engine failure and replacement case studies.",
};

export default function CaseStudiesPage() {
  return (
    <ResourceHubPage
      eyebrow="Knowledge"
      title="Engine Case Studies"
      description="Read real-world examples of diagnosis, failure paths and replacement decisions."
      sections={[{ title: "Case Studies", links: getPublicHtmlLinks("case-studies") }]}
    />
  );
}
