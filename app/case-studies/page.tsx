import HubPage, { getHubPageMetadata } from "@/components/pages/HubPage";

export function generateMetadata() {
  return getHubPageMetadata("case-studies");
}

export default function CaseStudiesPage() {
  return <HubPage slug="case-studies" />;
}
