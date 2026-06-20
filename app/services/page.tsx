import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Engine Services | Engines Market",
  description: "Browse engine replacement, fitting, repair and gearbox services.",
};

export default function ServicesPage() {
  return (
    <ResourceHubPage
      eyebrow="Services"
      title="Engine Services"
      description="Explore replacement, used, reconditioned and rebuilt engine services, plus fitting, repair and diagnostics."
      sections={[{ title: "Services", links: getPublicHtmlLinks("services") }]}
    />
  );
}
