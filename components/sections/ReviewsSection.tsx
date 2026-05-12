import type { ReviewsSectionData } from "@/types/brand";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

type Props = {
  data: ReviewsSectionData;
};

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="m12 2 2.9 6 6.6.9-4.8 4.7 1.1 6.5L12 17l-5.8 3.1 1.1-6.5-4.8-4.7 6.6-.9L12 2Z" />
    </svg>
  );
}

export default function ReviewsSection({ data }: Props) {
  return (
    <Section className="bg-white">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader tag={data.tag} title={data.h2} />
          <p className="text-body mt-3 text-slate-600">{data.rating.summary}</p>
          <p className="text-small mt-2 text-slate-600">{data.rating.basedOn}</p>

          <div className="surface-card mx-auto mt-4 flex w-fit items-center gap-3 px-5 py-2.5">
            <div className="flex text-green-600">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} />
              ))}
            </div>
            <span className="font-black text-[#061a33]">
              {data.rating.value}/5
            </span>
          </div>

          <p className="text-small mt-2.5 font-semibold text-slate-600">
            Based on {data.rating.count.toLocaleString()} verified customer reviews
          </p>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {data.reviews.map((review) => (
            <article
              key={`${review.name}-${review.location}`}
              className="surface-card-soft min-w-[260px] p-4"
            >
              <div className="mb-3 flex text-green-600">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>

              <p className="text-small text-slate-700">
                &ldquo;{review.text}&rdquo;
              </p>

              <p className="text-label mt-3 text-[#061a33]">
                - {review.name}, {review.location}
              </p>
            </article>
          ))}
        </div>

        <div className="section-callout mt-5 flex flex-col items-center justify-between gap-3 px-4 py-3.5 text-center sm:flex-row sm:text-left">
          <p className="text-small font-bold text-green-900">
            {data.leaveReviewCta.text}
          </p>
          <Button href="#" className="px-5 py-3">
            {data.leaveReviewCta.linkText}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
