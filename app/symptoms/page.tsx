import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("symptoms");
}

export default function SymptomsPage() {
  return <HubPage slug="symptoms" />;
}
