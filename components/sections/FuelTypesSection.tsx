import type { FuelTypesData } from "@/types/brand";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type Props = {
  data: FuelTypesData;
  bgImage?: string;
};

function FuelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <path d="M7 3h8v18H7V3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 7h4" stroke="currentColor" strokeWidth="2" />
      <path d="M15 8h2l3 3v7a2 2 0 0 1-4 0v-3h-1" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PetrolIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M9 3h6v8a4 4 0 1 1-6 0V3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M18 10h2v4h-2M10 9l-2 3h2l-1 3 3-4h-2l1-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M9 4v5M15 4v5M8 9h8v2a4 4 0 0 1-4 4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function getFuelIcon(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("plug-in") || normalized.includes("phev")) {
    return PlugIcon;
  }

  if (normalized.includes("hybrid") || normalized.includes("electric")) {
    return BatteryIcon;
  }

  if (normalized.includes("petrol")) {
    return PetrolIcon;
  }

  return FuelIcon;
}

export default function FuelTypesSection({ data, bgImage }: Props) {
  return (
    <Section className="relative overflow-hidden bg-white">
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute right-0 top-0 h-[220px] w-[300px] opacity-[0.11] lg:h-[280px] lg:w-[390px]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.78)), url(${bgImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top right",
            }}
          />
        </div>
      ) : null}
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-label text-green-700">{data.tag}</p>
          <h2 className="mt-2">{data.h2}</h2>
          <p className="text-body mt-3 text-slate-600">{data.intro}</p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {data.items.map((item) => {
            const Icon = getFuelIcon(item.title);

            return (
            <article
              key={item.title}
              className="surface-card-soft rounded-xl p-4"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                <Icon />
              </div>

              <h3>{item.title}</h3>
              <p className="text-small mt-2 text-slate-600">{item.description}</p>

              <a href="#quote-form" data-quote-context={item.title} data-quote-source="fuel-types" className="text-label mt-4 inline-flex text-green-700">
                {item.cta}
              </a>
            </article>
          )})}
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
          <p className="text-small font-semibold text-slate-700">{data.closing}</p>
        </div>
      </Container>
    </Section>
  );
}
