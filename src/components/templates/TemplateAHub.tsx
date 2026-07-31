import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Curriculum } from "@/lib/curriculum";
import FaqAccordion from "@/components/FaqAccordion";
import StoreBadges from "@/components/StoreBadges";
import CtaBanner from "@/components/CtaBanner";
import AppTestimonials from "@/components/AppTestimonials";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  MistakesIcon,
  MockTestIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";
import { HomeIcon } from "@/components/dashboard/icons";
import {
  cheatSheetPath,
  chapterPath,
  mistakesPath,
  practicePath,
  revisionNotesPath,
  studyGuidePath,
  topicsPath,
} from "@/lib/urls";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
};

/**
 * The exam Overview — the silo's landing page, rendered inside the shared shell
 * (the layout provides the sidebar). A route-picker of six cards linking deeper
 * into each subcategory, then the informative, app-store-driving SEO content
 * (About the test, how to prepare, FAQ) below.
 */
export default function TemplateAHub({ app, curriculum }: Props) {
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
        <p className="mt-2 max-w-2xl opacity-70">
          Free practice organised the way the official handbook is. Pick how you want to study —
          every route below is built from the official material.
        </p>

        {/* Practice — the primary route picker */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <DashboardCard
            icon={<MockTestIcon />}
            title="Mock Test"
            description="Sit the real format against the clock — the best indicator of test-day readiness."
            ctaLabel="View mock tests"
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

        {/* Branded, per-app download banner */}
        <section id="download" className="mt-12 scroll-mt-6">
          <CtaBanner app={app} heading={`Download ${app.name}`}>
            <StoreBadges app={app} />
          </CtaBanner>
        </section>

        {/* Social proof — people who passed thanks to the app */}
        <AppTestimonials app={app} />

        {/* Informative content below the CTA — SEO + app-store direction */}
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

          <h2 className="mt-10 text-2xl font-bold">Frequently asked questions</h2>
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
      </div>
    </div>
  );
}
