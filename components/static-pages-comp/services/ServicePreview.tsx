import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import ServiceHero from "@/components/static-pages-comp/services/ServiceHero";
import ServicePageContent from "@/components/static-pages-comp/services/ServicePageContent";

export default function ServicePreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="services" mode="service" hero={<ServiceHero page={page} />} body={<ServicePageContent page={page} />} />;
}
