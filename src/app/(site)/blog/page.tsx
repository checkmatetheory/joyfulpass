import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Cross-app guidance from ${SITE_NAME} — comparisons, editorial standards, and how we build exam-prep content.`,
  alternates: { canonical: "/blog/" },
};

export default function HubBlogIndexPage() {
  const posts = getAllPosts("hub");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-5 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between dark:border-white/10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">The Joyful Blog</h1>
        <p className="max-w-md opacity-80 lg:text-right">
          Cross-app comparisons and editorial standards. Looking for exam-specific guidance? Visit
          the blog inside each app — for example the{" "}
          <Link href="/britpass/blog/" className="font-semibold hover:underline">
            BritPass blog
          </Link>{" "}
          or the{" "}
          <Link href="/canadapass/blog/" className="font-semibold hover:underline">
            CanadaPass blog
          </Link>
          .
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} href={`/blog/${post.slug}/`} />
        ))}
      </div>
    </div>
  );
}
