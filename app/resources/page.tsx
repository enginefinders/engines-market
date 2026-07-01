import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { brandLinks, resourceSections } from "@/lib/navigation";
import { getPublicHtmlLinks, guideLinks, symptomLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Complete Resource Directory | Engines Market",
  description: "Every Engines Market service, price guide, brand, failure guide, case study and insight in one place.",
};

export default function ResourcesPage() {
  return (
    <ResourceHubPage
      eyebrow="Resources"
      title="Engines Market Complete Resource Directory"
      description="Browse the full site directory for services, pricing, brands, failures, comparisons, guides, case studies and insight reports."
      sections={[
        ...resourceSections,
        { id: "failures", title: "Engine Failures", links: getPublicHtmlLinks("failures") },
        { id: "symptoms", title: "Car Symptoms", links: symptomLinks },
        { id: "compare", title: "Compare Options", links: getPublicHtmlLinks("compare") },
        { id: "case-studies", title: "Case Studies", links: getPublicHtmlLinks("case-studies") },
        { id: "guides", title: "Guides & Tools", links: guideLinks },
        { id: "locations", title: "Locations", links: brandLinks.slice(0, 12).map((brand) => ({ label: `${brand.label} engine specialists`, href: brand.href })) },
      ]}
    />
  );
}
