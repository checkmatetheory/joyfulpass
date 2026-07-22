import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export default function BlogCard({ post, href }: { post: PostMeta; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col rounded-xl border border-black/10 p-5 transition hover:border-black/25 dark:border-white/10 dark:hover:border-white/30"
    >
      <p className="text-xs font-medium uppercase tracking-wide opacity-60">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" · "}
        {post.readingMinutes} min read
      </p>
      <h3 className="mt-2 text-lg font-bold">{post.title}</h3>
      <p className="mt-2 text-sm opacity-75">{post.description}</p>
      <p className="mt-3 text-xs font-medium opacity-60">
        By {post.author} — {post.authorCredential}
      </p>
    </Link>
  );
}
