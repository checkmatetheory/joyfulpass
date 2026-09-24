import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Curriculum } from "@/lib/curriculum";
import FaqAccordion from "@/components/FaqAccordion";
import StoreBadges from "@/components/StoreBadges";
import CtaBanner from "@/components/CtaBanner";
import AppTestimonials from "@/components/AppTestimonials";
import ProLink from "@/components/ProLink";
import { getAllPosts } from "@/lib/blog";
import { anchorTier, currencyFor, perDay, PRO_FEATURES } from "@/lib/pricing";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { EXTERNAL_LINK_PROPS } from "@/lib/site";
import {
  MistakesIcon,
  MockTestIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";
import { HomeIcon } from "@/components/dashboard/icons";
import {
  blogIndex,
  blogPost,
  cheatSheetPath,
  chapterPath,
  mistakesPath,
  practicePath,
  pricingPath,
  revisionNotesPath,
  studyGuidePath,
  testCentresPath,
  toolPath,
  topicsPath,
} from "@/lib/urls";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
};

/**
 * The exam Overview — the silo's landing page, rendered inside the shared shell
 * (the layout provides the sidebar). Real exam facts, a route-picker into
 * practice, the Pro upsell, study materials and the latest guides, then the
 * crawlable reference content (About the test, how to prepare, FAQ), with the
 * app download banner last.
 */
export default function TemplateAHub({ app, curriculum }: Props) {
  const guides = getAllPosts(app.blogCategory).slice(0, 3);
  const plan = anchorTier();
  const fromPerDay = `${currencyFor(app.slug)}${perDay(plan).toFixed(2)}`;

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm opacity-60">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" aria-label="Joyful home">
                <HomeIcon className="h-4 w-4" />
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="font-semibold opacity-90">{curriculum.testName}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {app.name}: {curriculum.testName}
        </h1>
        <p className="mt-2 max-w-2xl opacity-75">{curriculum.intro}</p>

        {/* The real exam at a glance — facts searchers want, in crawlable text. */}
        <ul className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
          {[curriculum.facts.questions, curriculum.facts.toPass, curriculum.facts.timeLimit].map(
            (fact) => (
              <li
                key={fact}
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent-dark)" }}
              >
                {fact}
              </li>
            ),
          )}
        </ul>

        {/* Practice — the primary route picker */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <DashboardCard
            icon={<MockTestIcon />}
            title="Practice Tests"
            description="Free, instantly scored practice sets with an explanation for every answer."
            ctaLabel="Start practising"
            href={practicePath(app)}
          />
          <DashboardCard
            icon={<TopicsIcon />}
            title="Topics"
            description="Practise one chapter at a time, with questions only from the topic you pick."
            ctaLabel="View topics"
            href={topicsPath(app)}
          />
          <DashboardCard
            icon={<MistakesIcon />}
            title="Mistakes Test"
            description="Retry the questions you got wrong before until they stick."
            ctaLabel="Review mistakes"
            href={mistakesPath(app)}
          />
        </div>

        {/* Pro upsell — directly under the route picker, above the fold on desktop. */}
        <section
          className="mt-8 flex flex-col gap-5 rounded-3xl p-6 text-white sm:p-8 md:flex-row md:items-center md:justify-between"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/75">{app.name} Pro</p>
            <h2 className="mt-1 text-2xl font-extrabold">Walk in ready, not hopeful</h2>
            <ul className="mt-3 grid gap-1.5 text-sm text-white/90 sm:grid-cols-2">
              {PRO_FEATURES.slice(0, 4).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0 text-left md:text-right">
            <p className="text-sm text-white/80">
              From <span className="text-xl font-extrabold text-white">{fromPerDay}</span>/day
            </p>
            <ProLink
              href={pricingPath(app)}
              appSlug={app.slug}
              location="hub_card"
              className="mt-2 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[color:var(--accent-dark)] transition hover:opacity-90"
            >
              See Pro plans
            </ProLink>
          </div>
        </section>

        {/* Study materials */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Study Materials</h2>
          <p className="mt-2 opacity-60">
            The essential reading for the {curriculum.testName.toLowerCase()}.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <DashboardCard
              icon={<StudyGuideIcon />}
              title="Full Study Guide"
              description={`The whole ${curriculum.testName}, explained chapter by chapter — read the up-to-date version online.`}
              ctaLabel="Start reading"
              href={studyGuidePath(app)}
            />
            <DashboardCard
              icon={<RevisionIcon />}
              title="Revision Notes"
              description="A condensed version of the core reading — everything you need, fast."
              ctaLabel="Start reading"
              href={revisionNotesPath(app)}
            />
            <DashboardCard
              icon={<MockTestIcon />}
              title="Cheat Sheet"
              description="Every high-yield fact on a single page — perfect for a last-minute cram."
              ctaLabel="View cheat sheet"
              href={cheatSheetPath(app)}
            />
          </div>
        </div>

        {guides.length > 0 && (
          <section className="mt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-bold">{curriculum.testName} guides</h2>
              <Link href={blogIndex(app)} className="text-sm font-semibold hover:underline" style={{ color: "var(--accent)" }}>
                All guides →
              </Link>
            </div>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {guides.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={blogPost(app, post.slug)}
                    className="block h-full rounded-2xl border border-black/10 p-5 transition-colors hover:border-[var(--accent)] dark:border-white/10"
                  >
                    <p className="font-bold leading-snug">{post.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm opacity-65">{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Informative content — the crawlable body of the hub */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">About the {curriculum.testName}</h2>
          <p className="mt-4 opacity-80">{curriculum.about}</p>

          <h2 className="mt-10 text-2xl font-bold">How to prepare</h2>
          <div className="mt-4 space-y-5">
            {curriculum.prep.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm opacity-75">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">What&rsquo;s covered</h2>
          <p className="mt-4 opacity-80">
            The {curriculum.testName} draws its questions from every chapter of the official
            material — being comfortable across{" "}
            {curriculum.chapters.map((c, i) => (
              <span key={c.slug}>
                <Link href={chapterPath(app, c.slug)} className="font-semibold hover:underline">
                  {c.shortLabel.toLowerCase()}
                </Link>
                {i < curriculum.chapters.length - 1
                  ? i === curriculum.chapters.length - 2
                    ? ", and "
                    : ", "
                  : ""}
              </span>
            ))}
            . The full study guide, revision notes and a{" "}
            <Link href={cheatSheetPath(app)} className="font-semibold hover:underline">
              cheat sheet
            </Link>{" "}
            are all free to read.
          </p>
          {(app.hasTestCenters || app.tools.length > 0) && (
            <p className="mt-4 opacity-80">
              {app.hasTestCenters && (
                <>
                  Find an approved{" "}
                  <Link href={testCentresPath(app)} className="font-semibold hover:underline">
                    {curriculum.testName} test centre
                  </Link>
                  .{" "}
                </>
              )}
              {app.tools.map((tool) => (
                <span key={tool.slug}>
                  Try the free{" "}
                  <Link href={toolPath(app, tool.slug)} className="font-semibold hover:underline">
                    {tool.name}
                  </Link>
                  .{" "}
                </span>
              ))}
            </p>
          )}

          <h2 className="mt-10 text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-6">
            <FaqAccordion faqs={app.faqs} accent={app.theme.accent} />
          </div>
          <p className="mt-8 text-sm opacity-70">
            Official source:{" "}
            <a href={app.officialSource.url} {...EXTERNAL_LINK_PROPS} className="font-semibold hover:underline">
              {app.officialSource.name}
            </a>
          </p>
        </section>

        {/* Branded, per-app download banner */}
        <section id="download" className="mt-12 scroll-mt-6">
          <CtaBanner app={app} heading={`Download ${app.name}`}>
            <StoreBadges app={app} />
          </CtaBanner>
        </section>

        {/* Social proof — people who passed thanks to the app */}
        <AppTestimonials app={app} />
      </div>
    </div>
  );
}
