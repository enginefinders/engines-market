import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("locations");
}

export default function LocationsPage() {
  return <HubPage slug="locations" />;
}
