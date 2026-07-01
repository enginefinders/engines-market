import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("insights");
}

export default function InsightsPage() {
  return <HubPage slug="insights" />;
}
