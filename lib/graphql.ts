import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_WP_GRAPHQL ? process.env.NEXT_PUBLIC_WP_GRAPHQL : "https://wp.enginesmarket.co.uk/graphql.",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
