import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Curriculum } from "@/lib/curriculum";
import { freeQuestions } from "@/lib/curriculum";
import ChapterCard from "@/components/templates/ChapterCard";
import FaqAccordion from "@/components/FaqAccordion";
import DownloadCta from "@/components/DownloadCta";
import CtaBanner from "@/components/CtaBanner";
import AppIconBadge from "@/components/AppIconBadge";
import FlagAccentBar from "@/components/FlagAccentBar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import QuizPanel from "@/components/practice/QuizPanel";
import { MockTestIcon, RevisionIcon, StudyGuideIcon, TopicsIcon } from "@/components/dashboard/icons";
import {
  cheatSheetPath,
  chapterPath,
  revisionNotesPath,
  studyGuidePath,
} from "@/lib/urls";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
};

/**
 * Template A — the exam hub at the keyword-silo root (/life-in-the-uk-test/).
 * App-first: it opens with instant value (a live diagnostic quiz + practice
 * route cards), the way SEO and paid traffic both want, then carries the
 * long-form, keyword-rich SEO body below. Branding is national-flag-accented
 * (buttons in the flag-primary accent, a FlagAccentBar under titles, the app
 * logo in the header) so each silo feels country-specific.
 */
export default function TemplateAHub({ app, curriculum }: Props) {
  const firstChapter = curriculum.chapters[0];
  const diagnostic = firstChapter ? freeQuestions(firstChapter).slice(0, 3) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              Joyful
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">{curriculum.testName}</li>
        </ol>
      </nav>

      {/* App-first hero: brand + logo, keyword H1, flag bar, real-number chips */}
      <header className="mt-6">
        <div className="flex items-center gap-3">
          <AppIconBadge app={app} size={48} />
          <span className="text-sm font-bold opacity-70">
            {app.flagEmoji} {app.name}
          </span>
        </div>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
          {curriculum.testName} Practice
        </h1>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-4 w-24" />
        <p className="mt-5 max-w-2xl text-lg opacity-75">{curriculum.intro}</p>
        <dl className="mt-6 flex flex-wrap gap-3">
          {[curriculum.facts.questions, curriculum.facts.toPass, curriculum.facts.timeLimit].map(
            (fact) => (
              <div
                key={fact}
                className="rounded-full border border-black/10 px-4 py-1.5 font-mono text-sm dark:border-white/15"
              >
                {fact}
              </div>
            ),
          )}
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#quiz"
            className="rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Start practising free
          </a>
          <a
            href="#download"
            className="rounded-full border-2 px-7 py-3 text-sm font-bold uppercase tracking-wide"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Get the app
          </a>
        </div>
      </header>

      {/* Instant value: a real diagnostic quiz, above the fold */}
      <section id="quiz" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-bold">Try a few questions right now</h2>
        <p className="mt-2 max-w-2xl opacity-70">
          A quick taster of the real {curriculum.testName}. No sign-up — just start.
        </p>
        <div className="mt-6">
          <QuizPanel
            questions={diagnostic}
            chapterName="starter"
            hasLockedContent
            appName={app.name}
            appStoreUrl={app.appStoreUrl}
            playStoreUrl={app.playStoreUrl}
          />
        </div>
      </section>

      {/* Route picker — how do you want to prepare? */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Choose how to prepare</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DashboardCard
            icon={<TopicsIcon />}
            title="Practise by chapter"
            description="Work through the official chapters one at a time, each with its own quiz."
            ctaLabel="See chapters"
            href="#chapters"
          />
          <DashboardCard
            icon={<MockTestIcon />}
            title="Full mock tests"
            description={`Sit the real ${curriculum.fullTest.questionCount}-question, ${curriculum.fullTest.minutes}-minute format against the clock.`}
            ctaLabel="Get the app"
            href="#download"
          />
          <DashboardCard
            icon={<StudyGuideIcon />}
            title="Study guide & notes"
            description="Read the full study guide, quick revision notes, or a one-page cheat sheet."
            ctaLabel="Read the guide"
            href={studyGuidePath(app)}
          />
        </div>
      </section>

      {/* Chapter grid → Template B */}
      <section id="chapters" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-bold">Practise by chapter</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
        <p className="mt-3 max-w-2xl opacity-70">
          The {curriculum.testName} handbook is organised into these chapters. Each has its own
          practice quiz — work through them in order, or jump to the ones you find hardest.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.chapters.map((chapter, i) => (
            <ChapterCard key={chapter.slug} chapter={chapter} app={app} number={i + 1} />
          ))}
        </div>
      </section>

      {/* Free study resources — the second keyword surface, internally linked */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Free study resources</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <DashboardCard
            icon={<StudyGuideIcon />}
            title="Study guide"
            description={`The full ${curriculum.testName}, explained chapter by chapter.`}
            ctaLabel="Read the guide"
            href={studyGuidePath(app)}
          />
          <DashboardCard
            icon={<RevisionIcon />}
            title="Revision notes"
            description="The key facts for every chapter, condensed for a fast recap."
            ctaLabel="Open notes"
            href={revisionNotesPath(app)}
          />
          <DashboardCard
            icon={<MockTestIcon />}
            title="Cheat sheet"
            description="Every high-yield fact on a single page — perfect to cram."
            ctaLabel="View cheat sheet"
            href={cheatSheetPath(app)}
          />
        </div>
      </section>

      {/* Branded, per-app download banner */}
      <section id="download" className="mt-14 scroll-mt-24">
        <CtaBanner
          app={app}
          heading={`Get ${app.name}`}
          body={`The full ${curriculum.testName} question bank, saved progress across devices, mistake review, and an offline study guide.`}
        >
          <DownloadCta app={app} />
        </CtaBanner>
      </section>

      {/* Long-form SEO body */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">About the {curriculum.testName}</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
        <p className="mt-4 opacity-80">{curriculum.about}</p>

        <h2 className="mt-12 text-2xl font-bold">How to prepare</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
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

        <h2 className="mt-12 text-2xl font-bold">What&rsquo;s covered</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
        <p className="mt-4 opacity-80">
          The {curriculum.testName} draws its questions from every chapter of the official
          material. In practice that means being comfortable across{" "}
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
          . Working through each chapter&rsquo;s quiz here is the fastest way to find the gaps
          before you book.
        </p>
      </section>

      {/* FAQ (mirrors the FAQPage schema emitted by the route) */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <FlagAccentBar colors={app.theme.flagColors} className="mt-3" />
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

      {/* Closing CTA */}
      <section className="mt-14 text-center">
        <a
          href="#quiz"
          className="inline-block rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Start practising free
        </a>
      </section>
    </div>
  );
}
