import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
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
import { practicePath } from "@/lib/urls";

export const metadata: Metadata = buildMetadata({
  title: "Free Citizenship Test & SERU Practice | Joyful",
  absoluteTitle: true,
  description:
    "Free practice tests and study guides for the Life in the UK Test, Canadian citizenship test, German Einbürgerungstest and TfL SERU assessment — built from the official material.",
  path: "/",
});

export default function HomePage() {
  const hubPosts = getAllPosts("hub").slice(0, 4);

  return (
    <>
      <Hero
        eyebrow="A family of focused exam-prep apps"
        headline="Pass your citizenship or licensing test first time"
        subheadline="Free practice questions for the Life in the UK Test, Canadian citizenship test, German Einbürgerungstest and TfL SERU assessment — straight from the official material, so you learn exactly what's tested."
        gradientFrom="#7C3AED"
        gradientTo="#2E1065"
        media={{
          type: "image",
          url: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1LuHGI5VQaYokTvKbhGgEjf0tpBqVMArZeSOc",
        }}
      >
        {/* One click from the homepage into a real, playable practice test. */}
        <div className="w-full">
          <p className="text-sm font-bold uppercase tracking-wide text-white/80">
            Start a free practice test
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-3">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link
                  href={practicePath(app)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#4C1D95] shadow transition hover:-translate-y-0.5"
                >
                  <span aria-hidden>{app.flagEmoji}</span>
                  {app.examName}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-white/75">
            No sign-up needed.{" "}
            <Link href="/about/" className="font-semibold underline underline-offset-4">
              Our story
            </Link>
          </p>
        </div>
      </Hero>

      {/* App directory — pick your exam, right under the hero */}
      <section id="apps" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <AppDirectory apps={apps} />
      </section>

      {/* Outcome-focused feature section */}
      <FeatureBullets />

      {/* Impact / reassurance band */}
      <ImpactStats />


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
