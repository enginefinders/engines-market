import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { guideLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Guides & Tools | Engines Market",
  description: "Helpful engine replacement guides and tools.",
};

export default function GuidesPage() {
  return (
    <ResourceHubPage
      eyebrow="Knowledge"
      title="Guides & Tools"
      description="Practical guides for engine replacement, warranties, supplier standards, labour costs and quote preparation."
      sections={[{ title: "Guides & Tools", links: guideLinks }]}
    />
  );
}
