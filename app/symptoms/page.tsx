import ResourceHubPage from "@/components/pages/ResourceHubPage";
import { symptomLinks } from "@/lib/resourceContent";

export const metadata = {
  title: "Car Symptoms | Engines Market",
  description: "Use engine symptoms to find relevant failure guides.",
};

export default function SymptomsPage() {
  return (
    <ResourceHubPage
      eyebrow="Knowledge"
      title="Car Symptoms"
      description="Start with the symptom you can see, hear or feel, then follow the relevant engine guide."
      sections={[{ title: "Common Symptoms", links: symptomLinks }]}
    />
  );
}
