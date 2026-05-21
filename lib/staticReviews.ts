import type { ReviewsSectionData } from "@/types/brand";

const STATIC_REVIEW_ENTRIES = [
  {
    text: "Thanks to EngineMarket, I saved over £1,200 on my engine replacement and got matched with a great local specialist within the hour.",
    name: "Jimmy",
    location: "London",
  },
  {
    text: "Got three quotes within an hour and chose the best deal easily. The whole process was quick, clear and stress-free.",
    name: "Pete",
    location: "Leeds",
  },
  {
    text: "I wasn't sure what I needed, but they helped me identify the right engine and connected me with a trusted garage.",
    name: "Sophie",
    location: "Birmingham",
  },
  {
    text: "Fast turnaround and excellent aftercare. The 12-month warranty gave me real peace of mind.",
    name: "Ahmed",
    location: "Bradford",
  },
  {
    text: "Best car-related experience I've had in years. Honest, quick, and saved me a fortune.",
    name: "Liam",
    location: "London",
  },
  {
    text: "EngineMarket made a stressful situation so much easier. I'd happily recommend them to anyone replacing an engine.",
    name: "Tom",
    location: "Manchester",
  },
] as const;

export function buildStaticReviewsSection(brandName: string): ReviewsSectionData {
  return {
    tag: "Customer Reviews",
    h2: `Trusted by ${brandName} Owners Across the UK`,
    rating: {
      value: 4.8,
      count: 1081,
      summary: `Rated 4.8 out of 5 by 1,081 verified customers who sourced reconditioned and used ${brandName} engines through EngineMarket.`,
      basedOn: "Based on real post-sale feedback from buyers matched with our network of UK engine specialists.",
    },
    reviews: STATIC_REVIEW_ENTRIES.map((review) => ({ ...review })),
    leaveReviewCta: {
      text: `Had a great experience? Your feedback helps other ${brandName} owners find trusted engine specialists.`,
      linkText: "Leave a review ->",
    },
  };
}
