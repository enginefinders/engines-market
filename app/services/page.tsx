import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("services");
}

export default function ServicesPage() {
  return <HubPage slug="services" />;
}
