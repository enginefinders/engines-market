import type { StaticPageRecord } from "@/lib/staticPagePreview";
import HubPreview from "@/components/static-pages-comp/hub/HubPreview";

export default function HubPage({ page }: { page: StaticPageRecord }) {
  return <HubPreview page={page} />;
}
