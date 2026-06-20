import Link from "next/link";
import type { NavigationLink } from "@/lib/navigation";

type ResourceHubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: {
    id?: string;
    title: string;
    links: NavigationLink[];
  }[];
};

export default function ResourceHubPage({
  eyebrow,
  title,
  description,
  sections,
}: ResourceHubPageProps) {
  return (
    <div className="bg-slate-50">
      <section className="bg-[#061a33] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.12em] text-green-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-white">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">{description}</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} id={section.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#0a2952]">{section.title}</h2>
              <ul className="mt-5 grid gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-semibold text-slate-700 hover:text-green-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
