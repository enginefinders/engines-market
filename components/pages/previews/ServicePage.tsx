import type { StaticPageRecord } from "@/lib/staticPagePreview";
import ServicePreview from "@/components/static-pages-comp/services/ServicePreview";

export default function ServicePage({ page }: { page: StaticPageRecord }) {
  return <ServicePreview page={page} />;
}
