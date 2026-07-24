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
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">The Joyful Blog</h1>
      <p className="mt-4 max-w-2xl opacity-80">
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

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} href={`/blog/${post.slug}/`} />
        ))}
      </div>
    </div>
  );
}
