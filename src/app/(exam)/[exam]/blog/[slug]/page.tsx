import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getPost, getPostSlugs } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { blogPost } from "@/lib/urls";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamSlugs().flatMap((exam) => {
    const app = getAppByExamSlug(exam);
    if (!app) return [];
    return getPostSlugs(app.blogCategory).map((slug) => ({ exam, slug }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string; slug: string }>;
}): Promise<Metadata> {
  const { exam, slug } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) return {};
  const post = await getPost(app.blogCategory, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: blogPost(app, slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ExamBlogPostPage({
  params,
}: {
  params: Promise<{ exam: string; slug: string }>;
}) {
  const { exam, slug } = await params;
  const app = getAppByExamSlug(exam);
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
    mainEntityOfPage: `${SITE_URL}${blogPost(app, slug)}`,
  };

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <JsonLd data={articleJsonLd} />
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
