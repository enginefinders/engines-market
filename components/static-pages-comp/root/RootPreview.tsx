import FamilyPreviewPage from "@/components/pages/previews/FamilyPreviewPage";
import type { StaticPageRecord } from "@/lib/staticPagePreview";
import RootHero from "@/components/static-pages-comp/root/RootHero";
import RootPageContent from "@/components/static-pages-comp/root/RootPageContent";

export default function RootPreview({ page }: { page: StaticPageRecord }) {
  return <FamilyPreviewPage page={page} themeName="root" mode="action" hero={<RootHero page={page} />} body={<RootPageContent page={page} />} />;
}
