import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("compare");
}

export default function ComparePage() {
  return <HubPage slug="compare" />;
}
