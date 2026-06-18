/* eslint-disable */
import { wpFetch } from "@/lib/wpFetch";
import { GET_ALL_POSTS } from "@/lib/queries";
import Link from "next/link";

export default async function RelatedBlogs() {
  const data = await wpFetch<{ posts: any }>(GET_ALL_POSTS);

  if (!data?.posts?.nodes?.length) {
    return (
      <section className="border-t border-gray-200 px-4 py-5">
        <p className="text-sm text-gray-700">
          No posts available right now. Please try again later.
        </p>
      </section>
    );
  }

  const posts = data.posts.nodes.slice(0, 4);

  return (
    <section className="border-t border-gray-200 px-4 py-5 sm:px-5">
      <h2 className="text-xl font-bold leading-tight text-gray-900">
        Related Posts
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {posts?.map((post: any) => (
          <article
            key={post.id}
            className="rounded-md border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm"
          >
            <time className="mb-2 block text-xs uppercase tracking-wide text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <Link href={`/blog/${post.slug}`}>
              <h3
                className="text-base font-semibold leading-snug text-gray-900 hover:underline"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </Link>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-2 inline-flex min-h-9 items-center text-sm font-medium text-gray-700 hover:text-gray-950"
            >
              Read more
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
