import Link from "next/link";
import Hero from "@/components/Hero";
import AppDirectory from "@/components/AppDirectory";
import BlogCard from "@/components/BlogCard";
import { apps } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const hubPosts = getAllPosts("hub").slice(0, 3);

  return (
    <>
      <Hero
        eyebrow="A family of focused exam-prep apps"
        headline="Unleash your inner test-taker with JoyfulPass"
        subheadline="One app per exam, built from the official source material — so you study exactly what's tested and nothing you don't need."
        gradientFrom="#4F46E5"
        gradientTo="#141048"
      >
        <a
          href="#apps"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#3730A3] shadow"
        >
          Browse our apps
        </a>
        <Link
          href="/about/"
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white"
        >
          Our story
        </Link>
      </Hero>

      <section id="apps" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Find the exam you&rsquo;re studying for</h2>
          <p className="mt-3 opacity-75">
            Every JoyfulPass app is a self-contained study experience — practice questions, tools,
            and test-center directories built specifically for that exam.
          </p>
        </div>
        <div className="mt-10">
          <AppDirectory apps={apps} />
        </div>
      </section>

      <section className="border-t border-black/10 bg-black/[0.02] px-4 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">From the JoyfulPass blog</h2>
            <Link href="/blog/" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
              View all posts →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hubPosts.map((post) => (
              <BlogCard key={post.slug} post={post} href={`/blog/${post.slug}/`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
