import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getPost, getPostSlugs } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs().flatMap((appSlug) => {
    const app = getApp(appSlug);
    if (!app) return [];
    return getPostSlugs(app.blogCategory).map((slug) => ({ app: appSlug, slug }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; slug: string }>;
}): Promise<Metadata> {
  const { app: appSlug, slug } = await params;
  const app = getApp(appSlug);
  if (!app) return {};
  const post = await getPost(app.blogCategory, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/${app.slug}/blog/${slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function AppBlogPostPage({
  params,
}: {
  params: Promise<{ app: string; slug: string }>;
}) {
  const { app: appSlug, slug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  const post = await getPost(app.blogCategory, slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    mainEntityOfPage: `${SITE_URL}/${app.slug}/blog/${slug}/`,
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <JsonLd data={articleJsonLd} />
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
