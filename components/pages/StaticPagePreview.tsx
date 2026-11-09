import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getNormalizedPreviewContent } from "@/lib/staticPagePreview";
import type { StaticBlock, StaticFaq, StaticForm, StaticPageRecord, StaticTable } from "@/lib/staticPagePreview";

export type PreviewVariant =
  | "generic"
  | "case-studies"
  | "compare"
  | "failures"
  | "prices"
  | "services"
  | "symptoms"
  | "insights"
  | "about"
  | "legal"
  | "hub"
  | "root";

const previewStyles: Record<PreviewVariant, {
  page: string;
  notice: string;
  shell: string;
  hero: string;
  heading: string;
  lead: string;
  option: string;
  trust: string;
  section: string;
  sectionHeading: string;
}> = {
  generic: {
    page: "bg-slate-100",
    notice: "border-amber-300 bg-amber-50 text-amber-950",
    shell: "border-slate-200 bg-white",
    hero: "border-slate-200 bg-slate-50",
    heading: "text-[#0a2952]",
    lead: "text-slate-700",
    option: "border-slate-200 bg-white",
    trust: "bg-emerald-100 text-emerald-900",
    section: "border-slate-200",
    sectionHeading: "text-[#0a2952]",
  },
  "case-studies": {
    page: "bg-orange-50/50",
    notice: "border-orange-300 bg-orange-50 text-orange-950",
    shell: "border-orange-200 bg-white",
    hero: "border-orange-200 bg-orange-50/70",
    heading: "text-orange-950",
    lead: "text-orange-900/80",
    option: "border-orange-200 bg-white",
    trust: "bg-orange-100 text-orange-950",
    section: "border-orange-200",
    sectionHeading: "text-orange-950",
  },
  compare: {
    page: "bg-cyan-50/50",
    notice: "border-cyan-300 bg-cyan-50 text-cyan-950",
    shell: "border-cyan-200 bg-white",
    hero: "border-cyan-200 bg-cyan-50/70",
    heading: "text-cyan-950",
    lead: "text-cyan-900/80",
    option: "border-cyan-200 bg-white",
    trust: "bg-cyan-100 text-cyan-950",
    section: "border-cyan-200",
    sectionHeading: "text-cyan-950",
  },
  failures: {
    page: "bg-rose-50/50",
    notice: "border-rose-300 bg-rose-50 text-rose-950",
    shell: "border-rose-200 bg-white",
    hero: "border-rose-200 bg-rose-50/70",
    heading: "text-rose-950",
    lead: "text-rose-900/80",
    option: "border-rose-200 bg-white",
    trust: "bg-rose-100 text-rose-950",
    section: "border-rose-200",
    sectionHeading: "text-rose-950",
  },
  prices: {
    page: "bg-amber-50/50",
    notice: "border-amber-300 bg-amber-50 text-amber-950",
    shell: "border-amber-200 bg-white",
    hero: "border-amber-200 bg-amber-50/70",
    heading: "text-amber-950",
    lead: "text-amber-900/80",
    option: "border-amber-200 bg-white",
    trust: "bg-amber-100 text-amber-950",
    section: "border-amber-200",
    sectionHeading: "text-amber-950",
  },
  services: {
    page: "bg-sky-50/50",
    notice: "border-sky-300 bg-sky-50 text-sky-950",
    shell: "border-sky-200 bg-white",
    hero: "border-sky-200 bg-sky-50/70",
    heading: "text-sky-950",
    lead: "text-sky-900/80",
    option: "border-sky-200 bg-white",
    trust: "bg-sky-100 text-sky-950",
    section: "border-sky-200",
    sectionHeading: "text-sky-950",
  },
  symptoms: {
    page: "bg-violet-50/50",
    notice: "border-violet-300 bg-violet-50 text-violet-950",
    shell: "border-violet-200 bg-white",
    hero: "border-violet-200 bg-violet-50/70",
    heading: "text-violet-950",
    lead: "text-violet-900/80",
    option: "border-violet-200 bg-white",
    trust: "bg-violet-100 text-violet-950",
    section: "border-violet-200",
    sectionHeading: "text-violet-950",
  },
  insights: {
    page: "bg-indigo-50/50",
    notice: "border-indigo-300 bg-indigo-50 text-indigo-950",
    shell: "border-indigo-200 bg-white",
    hero: "border-indigo-200 bg-indigo-50/70",
    heading: "text-indigo-950",
    lead: "text-indigo-900/80",
    option: "border-indigo-200 bg-white",
    trust: "bg-indigo-100 text-indigo-950",
    section: "border-indigo-200",
    sectionHeading: "text-indigo-950",
  },
  about: {
    page: "bg-emerald-50/50",
    notice: "border-emerald-300 bg-emerald-50 text-emerald-950",
    shell: "border-emerald-200 bg-white",
    hero: "border-emerald-200 bg-emerald-50/70",
    heading: "text-emerald-950",
    lead: "text-emerald-900/80",
    option: "border-emerald-200 bg-white",
    trust: "bg-emerald-100 text-emerald-950",
    section: "border-emerald-200",
    sectionHeading: "text-emerald-950",
  },
  legal: {
    page: "bg-slate-100",
    notice: "border-slate-300 bg-slate-50 text-slate-950",
    shell: "border-slate-300 bg-white",
    hero: "border-slate-300 bg-slate-50",
    heading: "text-slate-950",
    lead: "text-slate-700",
    option: "border-slate-300 bg-white",
    trust: "bg-slate-200 text-slate-900",
    section: "border-slate-300",
    sectionHeading: "text-slate-950",
  },
  hub: {
    page: "bg-teal-50/50",
    notice: "border-teal-300 bg-teal-50 text-teal-950",
    shell: "border-teal-200 bg-white",
    hero: "border-teal-200 bg-teal-50/70",
    heading: "text-teal-950",
    lead: "text-teal-900/80",
    option: "border-teal-200 bg-white",
    trust: "bg-teal-100 text-teal-950",
    section: "border-teal-200",
    sectionHeading: "text-teal-950",
  },
  root: {
    page: "bg-blue-50/50",
    notice: "border-blue-300 bg-blue-50 text-blue-950",
    shell: "border-blue-200 bg-white",
    hero: "border-blue-200 bg-blue-50/70",
    heading: "text-blue-950",
    lead: "text-blue-900/80",
    option: "border-blue-200 bg-white",
    trust: "bg-blue-100 text-blue-950",
    section: "border-blue-200",
    sectionHeading: "text-blue-950",
  },
};

function isInternalLink(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function previewImageSrc(src: string) {
  if (src.startsWith("/")) return src;
  if (src.startsWith("./")) return `/${src.slice(2)}`;
  return `/${src}`;
}

function PreviewLink({ href, children }: { href: string; children: ReactNode }) {
  if (isInternalLink(href)) {
    return <Link href={href}>{children}</Link>;
  }
  return <a href={href}>{children}</a>;
}

function TableBlock({ table }: { table: StaticTable }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full border-collapse text-left text-sm">
        {table.headers.length > 0 ? (
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              {table.headers.map((header) => <th className="border-b border-slate-200 px-4 py-3 font-bold" key={header}>{header}</th>)}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr className="odd:bg-white even:bg-slate-50" key={`${rowIndex}-${row.join("-")}`}>
              {row.map((cell, cellIndex) => <td className="border-b border-slate-100 px-4 py-3 align-top text-slate-700" key={`${cellIndex}-${cell}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormBlock({ form }: { form: StaticForm }) {
  const fields = form.fields.filter((field) => ["input", "select", "textarea"].includes(field.element));
  return (
    <form action={form.action || "/get-a-quote"} method={form.method === "post" ? "post" : "get"} className="my-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Preview form</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {fields.map((field, index) => (
          <label className="grid gap-1 text-sm font-semibold text-slate-700" key={`${field.name}-${index}`}>
            {field.name || field.placeholder || "Field"}
            <input
              className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal"
              name={field.name || `field-${index + 1}`}
              type={field.type || "text"}
              placeholder={field.placeholder}
              required={field.required}
            />
          </label>
        ))}
      </div>
      <button className="mt-4 rounded-md bg-[#0a2952] px-4 py-2 text-sm font-bold text-white" type="submit">
        Preview existing form action
      </button>
    </form>
  );
}

function LinksBlock({ links }: { links: Array<{ href: string; text: string }> }) {
  return (
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
      {links.map((link) => <li key={`${link.href}-${link.text}`}><PreviewLink href={link.href}>{link.text || link.href}</PreviewLink></li>)}
    </ul>
  );
}

function renderBlock(block: StaticBlock, index: number): ReactNode {
  switch (block.type) {
    case "heading":
      return block.level === "h3" ? <h3 className="mt-7 text-lg font-bold text-[#0a2952]" id={block.id || undefined} key={index}>{block.text}</h3> : <h4 className="mt-5 font-bold text-[#0a2952]" id={block.id || undefined} key={index}>{block.text}</h4>;
    case "paragraph":
      return <p className="mt-4 leading-7 text-slate-700" key={index}>{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return <List className="mt-4 list-inside list-disc space-y-2 text-slate-700" key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
    }
    case "table":
      return <TableBlock key={index} table={block} />;
    case "faq":
      return <details className="border-b border-slate-200 py-3" key={index}><summary className="cursor-pointer font-bold text-[#0a2952]">{block.question}</summary><p className="mt-2 leading-7 text-slate-700">{block.answer}</p></details>;
    case "form":
      return <FormBlock key={index} form={block} />;
    case "links":
      return <LinksBlock key={index} links={block.links} />;
    case "label":
      return <p className="mt-5 text-xs font-black uppercase tracking-[0.12em] text-emerald-700" key={index}>{block.text}</p>;
    case "cards":
      return <div className="my-5 grid gap-3 md:grid-cols-2">{block.cards.map((card, cardIndex) => <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={`${card.title}-${cardIndex}`}><h3 className="font-bold text-[#0a2952]">{card.title}</h3>{card.highlight ? <p className="mt-2 text-xl font-black text-emerald-700">{card.highlight}</p> : null}{card.text ? <p className="mt-2 leading-6 text-slate-700">{card.text}</p> : null}{card.meta ? <p className="mt-2 text-xs font-semibold text-slate-500">{card.meta}</p> : null}</article>)}</div>;
    case "stat":
      return <div className="my-5 rounded-lg bg-[#0a2952] p-5 text-white" key={index}><p className="text-3xl font-black">{block.value}</p><p className="mt-1 text-sm text-slate-200">{block.label}</p></div>;
    case "image":
      return block.src ? <Image className="my-5 max-h-80 w-full rounded-lg object-contain" src={previewImageSrc(block.src)} alt={block.alt} width={1200} height={630} key={index} /> : null;
    case "quote":
      return <blockquote className="my-5 border-l-4 border-emerald-500 pl-4 italic leading-7 text-slate-700" key={index}>{block.text}</blockquote>;
    default:
      return null;
  }
}

function FaqList({ faqs }: { faqs: StaticFaq[] }) {
  if (!faqs.length) return null;
  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6" aria-labelledby="preview-faq-title">
      <h2 className="text-2xl font-black text-[#0a2952]" id="preview-faq-title">Frequently asked questions</h2>
      <div className="mt-4">{faqs.map((faq) => <details className="border-b border-slate-200 py-3" key={faq.question}><summary className="cursor-pointer font-bold text-[#0a2952]">{faq.question}</summary><p className="mt-2 leading-7 text-slate-700">{faq.answer}</p></details>)}</div>
    </section>
  );
}

export default function StaticPagePreview({ page, variant = "generic" }: { page: StaticPageRecord; variant?: PreviewVariant }) {
  const styles = previewStyles[variant];
  const isContactPage = page.route === "/about/contact";
  const { hero, leadBlocks: rawLeadBlocks, sections, forms, tables, faqs } = getNormalizedPreviewContent(page);
  const leadBlocks = rawLeadBlocks.filter((block) => {
    if (block.type === "form" || block.type === "image") return false;
    if (block.type === "heading" && block.level === "h1") return false;
    if (block.type === "paragraph" && block.text === hero.description) return false;
    return true;
  });
  const sectionsContainFaqs = sections.some((section) => section.blocks.some((block) => block.type === "faq"));
  const renderedTableCount = [
    ...leadBlocks,
    ...sections.flatMap((section) => section.blocks),
  ].filter((block) => block.type === "table").length;
  const additionalTables = tables.slice(renderedTableCount);

  return (
    <div data-preview-family={variant} className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 ${isContactPage ? "bg-[#f4f6fb]" : styles.page}`}>
      <div className="mx-auto max-w-5xl">
        {!isContactPage ? <div className={`mb-5 rounded-lg border px-4 py-3 text-sm ${styles.notice}`}>
          <strong>Preview only:</strong> this page is not linked, is marked noindex, and does not replace the existing static page.
        </div> : null}

        <article className={`rounded-2xl border p-6 shadow-sm sm:p-10 ${isContactPage ? "border-transparent bg-transparent p-0 shadow-none" : styles.shell}`}>
          <section className={`rounded-xl border p-6 ${isContactPage ? "border-[#0a2952] bg-[#0a2952] sm:p-10" : styles.hero}`} aria-labelledby="preview-hero-title">
            {hero.eyebrow ? <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">{hero.eyebrow}</p> : null}
            <h1 className={`mt-3 text-3xl font-black leading-tight sm:text-5xl ${isContactPage ? "text-white" : styles.heading}`} id="preview-hero-title">{hero.title || page.seo.title}</h1>
            {hero.description ? <p className={`mt-5 max-w-3xl text-lg leading-8 ${isContactPage ? "text-white/75" : styles.lead}`}>{hero.description}</p> : null}
            {hero.options.length ? <div className="mt-6 grid gap-3 md:grid-cols-3">{hero.options.map((option) => <div className={`rounded-lg border p-4 ${styles.option}`} key={`${option.label}-${option.amount}`}><p className={`text-sm font-bold ${styles.heading}`}>{option.label}</p><p className="mt-2 text-xl font-black text-emerald-700">{option.amount}</p><p className="mt-1 text-xs text-slate-600">{option.detail}</p></div>)}</div> : null}
            {hero.image ? <Image className="mt-6 max-h-80 w-full rounded-lg object-contain" src={previewImageSrc(hero.image.src)} alt={hero.image.alt} width={1200} height={630} /> : null}
            {hero.trust.length ? <div className="mt-5 flex flex-wrap gap-2">{hero.trust.map((item) => <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.trust}`} key={item}>{item}</span>)}</div> : null}
            {hero.links.length ? <div className="mt-7 flex flex-wrap gap-2">{hero.links.map((link) => <PreviewLink href={link.href} key={`${link.href}-${link.text}`}><span className={`inline-flex rounded-md px-3 py-2 text-sm font-semibold underline underline-offset-4 ${isContactPage ? "bg-white/10 text-white decoration-emerald-300" : "bg-emerald-50 text-emerald-800 decoration-emerald-500"}`}>{link.text}</span></PreviewLink>)}</div> : null}
          </section>

          {forms.map((form, index) => <FormBlock form={form} key={`${form.action}-${index}`} />)}

          <div className="mt-8">{leadBlocks.map((block, index) => renderBlock(block, index))}</div>

          {sections.map((section) => (
            <section className={`mt-10 border-t pt-8 ${styles.section}`} id={section.id} key={section.id}>
              <h2 className={`text-xl font-bold leading-tight sm:text-2xl ${styles.sectionHeading}`}>{section.heading}</h2>
              <div>{section.blocks.filter((block) => block.type !== "form").map((block, index) => renderBlock(block, index))}</div>
            </section>
          ))}

          {additionalTables.length ? <div className="mt-10">{additionalTables.map((table, index) => <TableBlock key={`additional-table-${index}`} table={table} />)}</div> : null}

          {!sectionsContainFaqs ? <FaqList faqs={faqs} /> : null}
        </article>

        <details className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
          <summary className="cursor-pointer font-bold text-slate-800">Preview source details</summary>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            <div><dt className="font-bold">Source</dt><dd>{page.source.originalFile}</dd></div>
            <div><dt className="font-bold">Route target</dt><dd>{page.route}</dd></div>
            <div className="sm:col-span-2"><dt className="font-bold">Source hash</dt><dd className="break-all">{page.source.sourceHash}</dd></div>
          </dl>
        </details>
      </div>
    </div>
  );
}
