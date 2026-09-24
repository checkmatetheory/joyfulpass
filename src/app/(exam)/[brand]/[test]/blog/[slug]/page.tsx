import type { Metadata } from "next";
import ArticleCta from "@/components/blog/ArticleCta";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import RelatedPosts from "@/components/blog/RelatedPosts";
import FaqAccordion from "@/components/FaqAccordion";
import { faqJsonLd } from "@/lib/faqs";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";
import { apps, getAppByExamSlug } from "@/lib/apps";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { blogIndex, blogPost, examHub } from "@/lib/urls";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.flatMap((app) =>
    getPostSlugs(app.blogCategory).map((slug) => ({
      brand: app.slug,
      test: app.examSlug,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string; slug: string }>;
}): Promise<Metadata> {
  const { test, slug } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  const post = await getPost(app.blogCategory, slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: blogPost(app, slug),
    brand: app.name,
    image: { url: post.coverImage, width: 800, height: 500, alt: post.title },
    article: { publishedTime: post.date, authors: [post.author] },
  });
}

export default async function ExamBlogPostPage({
  params,
}: {
  params: Promise<{ brand: string; test: string; slug: string }>;
}) {
  const { test, slug } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();

  const post = await getPost(app.blogCategory, slug);
  if (!post) notFound();

  const article = articleJsonLd({
    title: post.title,
    description: post.description,
    path: blogPost(app, slug),
    datePublished: post.date,
    dateModified: post.updated,
    author: post.author,
    image: post.coverImage,
  });
  const related = getRelatedPosts(app.blogCategory, slug);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Joyful", path: "/" },
    { name: app.name, path: examHub(app) },
    { name: "Blog", path: blogIndex(app) },
    { name: post.title, path: blogPost(app, slug) },
  ]);

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      {post.faqs && <JsonLd data={faqJsonLd(post.faqs)} />}
      <Breadcrumbs
        crumbs={[
          { name: app.name, href: examHub(app) },
          { name: "Guides", href: blogIndex(app) },
          { name: post.title },
        ]}
      />
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
        {post.updated && (
          <>
            {" · Updated "}
            {new Date(post.updated).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </>
        )}
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
      {post.faqs && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4">
            <FaqAccordion faqs={post.faqs} accent={app.theme.accent} />
          </div>
        </section>
      )}
      <ArticleCta app={app} apps={apps} />
      <RelatedPosts
        posts={related.map((p) => ({
          title: p.title,
          description: p.description,
          href: blogPost(app, p.slug),
        }))}
      />
    </article>
  );
}
