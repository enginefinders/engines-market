import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("failures");
}

export default function FailuresPage() {
  return <HubPage slug="failures" />;
}
