import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import StatBadge from "@/components/StatBadge";
import ToolCard from "@/components/ToolCard";
import FaqAccordion from "@/components/FaqAccordion";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import AppIconBadge from "@/components/AppIconBadge";
import HeroBackground from "@/components/HeroBackground";
import WaveDivider from "@/components/WaveDivider";
import FeatureBlock from "@/components/FeatureBlock";
import DownloadCta from "@/components/DownloadCta";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) return {};
  return {
    title: app.hero.headline,
    description: app.metaDescription,
    alternates: { canonical: `/${app.slug}/` },
  };
}

export default async function AppLandingPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  const posts = getAllPosts(app.blogCategory).slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: app.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${app.name}: ${app.examName} prep`,
    description: app.metaDescription,
    provider: { "@type": "Organization", name: "Joyful", sameAs: SITE_URL },
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={courseJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 text-center text-white">
        <HeroBackground
          media={app.heroMedia}
          gradientFrom={app.theme.gradientFrom}
          gradientTo={app.theme.gradientTo}
        />
        <div className="relative mx-auto max-w-2xl px-4 pb-36 sm:px-6 sm:pb-44">
          <div className="flex justify-center">
            <AppIconBadge app={app} size={88} />
          </div>
          <p className="mt-4 font-display text-lg font-semibold opacity-90">{app.name}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {app.hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{app.hero.subheadline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#download"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide"
              style={{ color: app.theme.accentDark }}
            >
              Get started
            </a>
          </div>
        </div>
        <div className="relative">
          <WaveDivider color="var(--surface-cream)" />
        </div>
      </section>

      {/* Trust section */}
      <section className="bg-cream px-4 pb-16 text-cream-foreground sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{app.trustHeadline}</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-80">{app.trustBody}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6">
          {app.stats.map((stat) => (
            <StatBadge key={stat.label} stat={stat} accent={app.theme.accent} />
          ))}
        </div>
      </section>
      <div className="bg-cream">
        <WaveDivider color={app.theme.accentDark} />
      </div>

      {/* Alternating feature rows */}
      <section
        className="space-y-20 px-4 py-20 sm:px-6"
        style={{ backgroundColor: app.theme.accentDark }}
      >
        <div className="mx-auto max-w-5xl space-y-20">
          {app.features.map((feature, i) => (
            <FeatureBlock
              key={feature.title}
              feature={feature}
              accent={app.theme.accent}
              ctaHref={
                feature.mockup === "tool" && app.tools[0]
                  ? `/${app.slug}/${app.tools[0].slug}/`
                  : "#download"
              }
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Download CTA */}
      <section
        id="download"
        className="px-4 py-16 text-center sm:px-6"
        style={{ backgroundColor: app.theme.accentDark }}
      >
        <h2 className="text-2xl font-bold text-white">Get {app.name}</h2>
        <div className="mt-6">
          <DownloadCta app={app} />
        </div>
      </section>

      {app.testimonials.length > 0 && (
        <section className="px-4 py-16 sm:px-6" style={{ backgroundColor: app.theme.accentDark }}>
          <div className="mx-auto max-w-6xl">
            <TestimonialCarousel testimonials={app.testimonials} />
          </div>
        </section>
      )}

      {app.tools.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold">Tools</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {app.tools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                href={`/${app.slug}/${tool.slug}/`}
                accent={app.theme.accent}
              />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-black/10 px-4 py-16 dark:border-white/10 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold">{app.name} blog</h2>
            <Link
              href={`/${app.slug}/blog/`}
              className="text-sm font-semibold"
              style={{ color: app.theme.accent }}
            >
              View all posts →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} href={`/${app.slug}/blog/${post.slug}/`} />
            ))}
          </div>
        </div>
      </section>

      {app.hasTestCenters && (
        <section className="border-t border-black/10 px-4 py-16 dark:border-white/10 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold">Find a test center</h2>
            <p className="mt-3 opacity-75">
              Browse official {app.examName} locations across {app.country}.
            </p>
            <Link
              href={`/${app.slug}/test-centers/`}
              className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: app.theme.accent }}
            >
              View test centers
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-6">
          <FaqAccordion faqs={app.faqs} accent={app.theme.accent} />
        </div>
        <p className="mt-8 text-sm opacity-70">
          Official source:{" "}
          <a href={app.officialSource.url} className="font-semibold hover:underline">
            {app.officialSource.name}
          </a>
        </p>
      </section>
    </>
  );
}
