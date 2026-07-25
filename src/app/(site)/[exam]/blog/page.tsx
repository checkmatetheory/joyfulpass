import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import { blogIndex, blogPost } from "@/lib/urls";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string }>;
}): Promise<Metadata> {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
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
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
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
          <BlogCard key={post.slug} post={post} href={blogPost(app, post.slug)} />
        ))}
        {posts.length === 0 && <p className="opacity-60">No posts published yet.</p>}
      </div>
    </div>
  );
}
