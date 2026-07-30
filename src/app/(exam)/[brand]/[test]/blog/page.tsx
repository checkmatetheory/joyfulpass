import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { blogIndex, blogPost } from "@/lib/urls";

export const dynamicParams = false;

export function generateStaticParams() {
  return examPathParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}): Promise<Metadata> {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  return {
    title: "Blog",
    description: `Guides and study tips for the ${app.examName}, from the ${app.name} team.`,
    alternates: { canonical: blogIndex(app) },
  };
}

export default async function ExamBlogIndexPage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();

  const posts = getAllPosts(app.blogCategory);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-5 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between dark:border-white/10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{app.name} blog</h1>
        <p className="max-w-md opacity-80 lg:text-right">
          Study guides, exam-format breakdowns, and tips for the {app.examName}.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} href={blogPost(app, post.slug)} />
        ))}
        {posts.length === 0 && <p className="opacity-60">No posts published yet.</p>}
      </div>
    </div>
  );
}
