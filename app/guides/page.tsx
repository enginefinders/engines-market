import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("guides");
}

export default function GuidesPage() {
  return <HubPage slug="guides" />;
}
