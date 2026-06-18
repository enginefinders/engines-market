/* eslint-disable */
import { GET_ALL_POSTS } from "@/lib/queries";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { wpFetch } from "@/lib/wpFetch";

export const metadata: Metadata = {
  alternates: {
    canonical: "http://enginesmarket.co.uk/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  const data = await wpFetch<{ posts: any }>(GET_ALL_POSTS);

  if (!data?.posts?.nodes?.length) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="rounded-md bg-white px-4 py-6 text-center text-gray-700 shadow-sm">
          No posts available right now. Please try again later.
        </p>
      </main>
    );
  }

  const posts = data.posts;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900 sm:mb-10 sm:text-4xl lg:text-5xl">
        Blog
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts?.nodes?.map((post: any) => (
          <article
            key={post.id}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            {post.featuredImage?.node?.sourceUrl && (
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                </div>
              </Link>
            )}

            <div className="flex h-full flex-col p-4 sm:p-5 lg:p-6">
              <time className="mb-2 text-xs uppercase tracking-wide text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <Link href={`/blog/${post.slug}`}>
                <h2
                  className="text-xl font-semibold leading-snug text-gray-900 group-hover:underline sm:text-2xl"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>

              <div
                className="prose prose-sm mt-4 line-clamp-3 max-w-none text-sm leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />

              <div className="flex-grow" />

              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex min-h-10 items-center text-sm font-medium text-gray-700 hover:text-gray-950"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
