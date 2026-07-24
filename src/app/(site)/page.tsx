import Link from "next/link";
import Hero from "@/components/Hero";
import AppDirectory from "@/components/AppDirectory";
import BlogCard from "@/components/BlogCard";
import FeatureBullets from "@/components/home/FeatureBullets";
import ImpactStats from "@/components/home/ImpactStats";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CommitmentCta from "@/components/home/CommitmentCta";
import { apps } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const hubPosts = getAllPosts("hub").slice(0, 4);

  return (
    <>
      <Hero
        eyebrow="A family of focused exam-prep apps"
        headline="Pass your citizenship test with confidence"
        subheadline="Joyful builds one focused study app per exam — with practice questions straight from the official handbook, so you learn exactly what's tested and nothing you don't need."
        gradientFrom="#7C3AED"
        gradientTo="#2E1065"
        media={{
          type: "image",
          url: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1LuHGI5VQaYokTvKbhGgEjf0tpBqVMArZeSOc",
        }}
      >
        <a
          href="#apps"
          className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#4C1D95] shadow"
        >
          Find your exam
        </a>
        <Link
          href="/about/"
          className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
        >
          Our story
        </Link>
      </Hero>

      {/* Outcome-focused feature section */}
      <FeatureBullets />

      {/* Impact / reassurance band */}
      <ImpactStats />

      {/* App directory — pick your exam */}
      <section id="apps" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <AppDirectory apps={apps} />
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials (placeholder content — replace before launch) */}
      <Testimonials />

      {/* Commitment / closing CTA */}
      <CommitmentCta />

      {/* Blog */}
      <section className="border-t border-black/10 px-4 py-20 dark:border-white/10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">From the Joyful blog</h2>
            <Link href="/blog/" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
              View all posts →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hubPosts.map((post) => (
              <BlogCard key={post.slug} post={post} href={`/blog/${post.slug}/`} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
