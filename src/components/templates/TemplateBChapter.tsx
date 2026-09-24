import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Chapter, Curriculum } from "@/lib/curriculum";
import { freeQuestions, passRatio } from "@/lib/curriculum";
import QuizPanel from "@/components/practice/QuizPanel";
import CtaBanner from "@/components/CtaBanner";
import ProLink from "@/components/ProLink";
import { chapterPath, examHub, practicePath, pricingPath, topicsPath } from "@/lib/urls";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
  chapter: Chapter;
};

/**
 * Template B — chapter practice page, rendered inside the shared shell. A real,
 * functional quiz is the core: it makes the page genuinely useful and is the
 * strongest protection against being read as thin/scaled content.
 */
export default function TemplateBChapter({ app, curriculum, chapter }: Props) {
  const questions = freeQuestions(chapter);
  const idx = curriculum.chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = curriculum.chapters[idx - 1];
  const next = curriculum.chapters[idx + 1];

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={examHub(app)} className="hover:underline">
              {curriculum.testName}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={topicsPath(app)} className="hover:underline">
              Topics
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">{chapter.shortLabel}</li>
        </ol>
      </nav>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden>
          {chapter.icon}
        </span>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{chapter.name}</h1>
      </div>
      <p className="mt-3 opacity-75">{chapter.intro}</p>

      <div className="mt-8">
        <QuizPanel
          questions={questions}
          setName={chapter.shortLabel}
          passRatio={passRatio(curriculum)}
          appSlug={app.slug}
          appName={app.name}
          pricingHref={pricingPath(app)}
          next={
            next
              ? { href: chapterPath(app, next.slug), label: `Next topic: ${next.shortLabel}` }
              : { href: practicePath(app), label: "Try a mixed practice test" }
          }
        />
      </div>

      {/* In-context Pro upsell: web checkout is the primary sale. */}
      <CtaBanner
        app={app}
        variant="split"
        className="mt-8"
        heading={`Practise the whole ${curriculum.testName} with Pro`}
        body={`The full ${curriculum.testName} question bank, full-length timed mock tests at real exam length, and your mistake history — in your browser.`}
      >
        <ProLink
          href={pricingPath(app)}
          appSlug={app.slug}
          location="chapter_banner"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-black"
        >
          See Pro plans
        </ProLink>
      </CtaBanner>

      {/* Sibling navigation */}
      <div className="mt-8 flex items-stretch justify-between gap-4">
        {prev ? (
          <Link
            href={chapterPath(app, prev.slug)}
            className="group flex-1 rounded-xl border border-black/10 p-4 hover:border-[var(--accent)] dark:border-white/10"
          >
            <span className="text-xs opacity-50">← Previous</span>
            <span className="mt-1 block text-sm font-bold">{prev.shortLabel}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={chapterPath(app, next.slug)}
            className="group flex-1 rounded-xl border border-black/10 p-4 text-right hover:border-[var(--accent)] dark:border-white/10"
          >
            <span className="text-xs opacity-50">Next →</span>
            <span className="mt-1 block text-sm font-bold">{next.shortLabel}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  );
}
