import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getPost, getPostSlugs } from "@/lib/blog";
import { OG_IMAGE } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return getPostSlugs("hub").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost("hub", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [OG_IMAGE],
    },
  };
}

export default async function HubBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost("hub", slug);
  if (!post) notFound();

  const article = articleJsonLd({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}/`,
    datePublished: post.date,
    author: post.author,
    image: post.coverImage,
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: "Joyful", path: "/" },
    { name: "Blog", path: "/blog/" },
    { name: post.title, path: `/blog/${slug}/` },
  ]);

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 672px) 100vw, 672px"
          className="object-cover"
          priority
        />
      </div>
      <p className="text-sm opacity-60">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" · "}
        {post.readingMinutes} min read
      </p>
      <h1 className="mt-2 text-4xl font-extrabold">{post.title}</h1>
      <p className="mt-3 text-sm font-medium opacity-70">
        By {post.author} — {post.authorCredential}
      </p>
      <div
        className="prose prose-neutral mt-10 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
