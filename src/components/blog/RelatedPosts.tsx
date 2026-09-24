import Link from "next/link";

/** "Related guides" — keeps readers moving through the silo (and spreads links). */
export default function RelatedPosts({
  posts,
}: {
  posts: { title: string; description: string; href: string }[];
}) {
  if (posts.length === 0) return null;
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold">Related guides</h2>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => (
          <li key={post.href}>
            <Link
              href={post.href}
              className="block rounded-2xl border border-black/10 p-4 transition-colors hover:border-current dark:border-white/10"
            >
              <p className="font-semibold leading-snug">{post.title}</p>
              <p className="mt-1 line-clamp-2 text-sm opacity-65">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
