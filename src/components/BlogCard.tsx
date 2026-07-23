import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";

export default function BlogCard({ post, href }: { post: PostMeta; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
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
        <p className="mt-2 flex-1 text-sm opacity-75">{post.description}</p>
        <p className="mt-3 text-xs font-medium opacity-60">
          By {post.author} — {post.authorCredential}
        </p>
      </div>
    </Link>
  );
}
