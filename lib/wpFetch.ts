const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WP_GRAPHQL ??
  "https://admin.private-numberplates.uk/graphql";

export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // 👈 ISR enabled
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL error: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}
