import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { getPublicHtmlLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Engine Price Guides | Engines Market",
  description: "Browse UK engine replacement and repair cost guides.",
};

export default function PricesPage() {
  return (
    <ResourceHubPage
      eyebrow="Prices"
      title="Engine Price Guides"
      description="Compare typical UK costs for engine replacement, fitting, rebuilds, timing chains, turbos and related repairs."
      sections={[{ title: "Price Guides", links: getPublicHtmlLinks("prices") }]}
    />
  );
}
