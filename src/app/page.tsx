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
        headline="Unleash your inner test-taker with Joyful"
        subheadline="One app per exam, built from the official source material — so you study exactly what's tested and nothing you don't need."
        gradientFrom="#7C3AED"
        gradientTo="#2E1065"
        // media={{ type: "image", url: "/media/hub/hero.jpg" }} — swap in once a hero photo/video exists
      >
        <a
          href="#apps"
          className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#4C1D95] shadow"
        >
          Browse our apps
        </a>
        <Link
          href="/about/"
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Our story
        </Link>
      </Hero>

      <section className="bg-cream px-4 py-20 text-cream-foreground sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Find the exam you&rsquo;re studying for</h2>
          <p className="mt-3 opacity-75">
            Every Joyful app is a self-contained study experience — practice questions, tools,
            and test-center directories built specifically for that exam.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-3">
          {[
            {
              color: "#7C3AED",
              title: "Pick your exam",
              body: "Choose the citizenship or settlement test you're actually studying for — no filler content for exams you'll never take.",
            },
            {
              color: "#0D9488",
              title: "Practice your way",
              body: "Short, focused sessions built from the official handbook, with mock tests that mirror the real exam format.",
            },
            {
              color: "#EA580C",
              title: "Walk in ready",
              body: "Track your score, use the app's built-in tools, and book your real test once you're consistently passing.",
            },
          ].map((step, i) => (
            <div key={step.title} className="text-center">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                style={{ backgroundColor: step.color }}
              >
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm opacity-75">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apps" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <AppDirectory apps={apps} />
      </section>

      <section className="border-t border-black/10 bg-black/[0.02] px-4 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">From the Joyful blog</h2>
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
