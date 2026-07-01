import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("legal");
}

export default function LegalPage() {
  return <HubPage slug="legal" />;
}
