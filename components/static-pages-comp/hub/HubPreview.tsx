import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import HubHero from "@/components/static-pages-comp/hub/HubHero";
import HubPageContent from "@/components/static-pages-comp/hub/HubPageContent";

export default function HubPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="hub" mode="hub" hero={<HubHero page={page} />} body={<HubPageContent page={page} />} />;
}
