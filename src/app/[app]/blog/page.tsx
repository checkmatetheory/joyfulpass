import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) return {};
  return {
    title: "Blog",
    description: `Guides and study tips for the ${app.examName}, from the ${app.name} team.`,
    alternates: { canonical: `/${app.slug}/blog/` },
  };
}

export default async function AppBlogIndexPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  const posts = getAllPosts(app.blogCategory);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">{app.name} blog</h1>
      <p className="mt-4 max-w-2xl opacity-80">
        Study guides, exam-format breakdowns, and tips for the {app.examName}.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} href={`/${app.slug}/blog/${post.slug}/`} />
        ))}
        {posts.length === 0 && <p className="opacity-60">No posts published yet.</p>}
      </div>
    </div>
  );
}
