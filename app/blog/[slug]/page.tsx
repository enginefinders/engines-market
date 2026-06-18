import { wpFetch } from "@/lib/wpFetch";
import { GET_ALL_POSTS, GET_POST_BY_SLUG } from "@/lib/queries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Image from "next/image";

export const revalidate = 60;

// Pre-render only the first 10 posts at build time.
export async function generateStaticParams() {
  const data = await wpFetch<{ posts: { nodes: { slug: string }[] } }>(
    GET_ALL_POSTS,
  );

  if (!data?.posts?.nodes) return [];

  return data.posts.nodes.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return {
    alternates: {
      canonical: `https://plate-maker.co.uk/blog/${resolvedParams.slug}`,
    },
  };
}

type WPPost = {
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    notFound();
  }

  const data = await wpFetch<{ post: WPPost }>(GET_POST_BY_SLUG, {
    id: resolvedParams.slug,
  });

  if (!data?.post) notFound();

  const post = data.post;

  return (
    <main className="w-full bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <article className="w-full overflow-hidden rounded-lg bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-8 lg:px-10">
          <h1
            className="mb-5 break-words text-3xl font-bold leading-tight text-gray-950 sm:text-4xl lg:text-5xl"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          {post.featuredImage && post.featuredImage.node!.sourceUrl ? (<div className="mt-4 pb-2 w-full h-full"><Image src={`${post.featuredImage!.node!.sourceUrl}`} alt={`${post.featuredImage.node?.altText ? post.featuredImage.node?.altText : "blog post featured image at plate maker"}`} className="mx-auto aspect-video w-[80%] h-auto object-contain" width={480} height={320} /></div>) : <></>}
          <div
            className="prose prose-neutral max-w-none break-words text-base leading-7 prose-headings:scroll-mt-24 prose-headings:leading-tight prose-a:font-semibold prose-a:text-gray-950 prose-img:h-auto prose-img:w-full prose-img:rounded-md prose-table:block prose-table:w-full prose-table:overflow-x-auto sm:prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="w-full lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <RelatedBlogs />
          </div>
        </aside>
      </div>
    </main>
  );
}
