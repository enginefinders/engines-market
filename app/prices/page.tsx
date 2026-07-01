import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("prices");
}

export default function PricesPage() {
  return <HubPage slug="prices" />;
}
