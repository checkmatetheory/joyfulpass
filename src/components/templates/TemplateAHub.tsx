import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Curriculum } from "@/lib/curriculum";
import ChapterCard from "@/components/templates/ChapterCard";
import FaqAccordion from "@/components/FaqAccordion";
import DownloadCta from "@/components/DownloadCta";
import CtaBanner from "@/components/CtaBanner";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
};

/**
 * Template A — the app hub page living at the real test-name slug
 * (/britpass/life-in-the-uk-test/). Keyword-rich, chapter grid into Template B,
 * practice CTAs with real numbers, download banner at the natural upgrade moment,
 * then a long-form content stack + FAQ (schema emitted by the route).
 */
export default function TemplateAHub({ app, curriculum }: Props) {
  const firstChapter = curriculum.chapters[0];

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
          <li>
            <Link href={`/${app.slug}/`} className="hover:underline">
              {app.name}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">{curriculum.testName}</li>
        </ol>
      </nav>

      {/* Header + real-number "official record" stats */}
      <header className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {curriculum.testName} — free practice
        </h1>
        <p className="mt-4 max-w-2xl text-lg opacity-75">{curriculum.intro}</p>
        <dl className="mt-6 flex flex-wrap gap-3">
          {[
            curriculum.facts.questions,
            curriculum.facts.toPass,
            curriculum.facts.timeLimit,
          ].map((fact) => (
            <div
              key={fact}
              className="rounded-full border border-black/10 px-4 py-1.5 font-mono text-sm dark:border-white/15"
            >
              {fact}
            </div>
          ))}
        </dl>
      </header>

      {/* Practice CTAs — diagnostic (low commitment) + full-length (real numbers) */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {firstChapter && (
          <Link
            href={`/${app.slug}/${firstChapter.slug}/`}
            className="rounded-2xl border-2 p-6"
            style={{ borderColor: "var(--accent)" }}
          >
            <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>
              Quick start
            </p>
            <p className="mt-1 text-lg font-bold">Take a diagnostic set</p>
            <p className="mt-1 text-sm opacity-70">
              A short sampler from Chapter 1 — see where you stand in two minutes.
            </p>
          </Link>
        )}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ backgroundColor: "var(--accent-dark)" }}
        >
          <p className="text-sm font-bold opacity-80">Full-length mock</p>
          <p className="mt-1 text-lg font-bold">
            {curriculum.fullTest.questionCount} questions · {curriculum.fullTest.minutes} min
          </p>
          <p className="mt-1 text-sm text-white/75">
            Mirrors the real test: {curriculum.fullTest.passMark} correct to pass. Sit it in the
            app.
          </p>
          <div className="mt-3">
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                className="inline-block rounded-lg bg-white px-4 py-2 text-sm font-bold text-black"
              >
                Practise in {app.name}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Chapter grid → Template B */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Practise by chapter</h2>
        <p className="mt-2 max-w-2xl opacity-70">
          The {curriculum.testName} handbook is organised into these chapters. Each has its own
          practice quiz — work through them in order, or jump to the ones you find hardest.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.chapters.map((chapter, i) => (
            <ChapterCard
              key={chapter.slug}
              chapter={chapter}
              appSlug={app.slug}
              number={i + 1}
            />
          ))}
        </div>
      </section>

      {/* App download banner — the natural upgrade moment, after the practice CTAs */}
      <section id="download" className="mt-14 scroll-mt-24">
        <CtaBanner
          app={app}
          heading={`Get ${app.name}`}
          body={`The full ${curriculum.testName} question bank, saved progress across devices, mistake review, and an offline study guide.`}
        >
          <DownloadCta app={app} />
        </CtaBanner>
      </section>

      {/* Long-form content stack (rewritten per app, not templated) */}
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">About the {curriculum.testName}</h2>
        <p className="mt-4 opacity-80">{curriculum.about}</p>

        <h2 className="mt-12 text-2xl font-bold">How to prepare</h2>
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
        <p className="mt-4 opacity-80">
          The {curriculum.testName} draws its questions from every chapter of the official
          material. In practice that means being comfortable across{" "}
          {curriculum.chapters.map((c, i) => (
            <span key={c.slug}>
              <Link href={`/${app.slug}/${c.slug}/`} className="font-semibold hover:underline">
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

      {/* FAQ (visible content mirrors the FAQPage schema emitted by the route) */}
      <section className="mt-14 max-w-3xl">
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

      {/* Closing CTA */}
      <section className="mt-14 text-center">
        {firstChapter && (
          <Link
            href={`/${app.slug}/${firstChapter.slug}/`}
            className="inline-block rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Start practising free
          </Link>
        )}
      </section>
    </div>
  );
}
