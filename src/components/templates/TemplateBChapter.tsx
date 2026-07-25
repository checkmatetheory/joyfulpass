import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Chapter, Curriculum } from "@/lib/curriculum";
import { freeQuestions } from "@/lib/curriculum";
import QuizPanel from "@/components/practice/QuizPanel";
import CtaBanner from "@/components/CtaBanner";
import { chapterPath, examHub, topicsPath } from "@/lib/urls";

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
  const hasLockedContent = chapter.cores.some((c) => c.locked);
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
          chapterName={chapter.shortLabel}
          hasLockedContent={hasLockedContent}
          appName={app.name}
          appStoreUrl={app.appStoreUrl}
          playStoreUrl={app.playStoreUrl}
        />
      </div>

      {/* In-context app-download banner */}
      <CtaBanner
        app={app}
        variant="split"
        className="mt-8"
        heading="Keep practising on the go"
        body={`Full question bank, saved progress, and mistake review in ${app.name}.`}
      >
        {app.appStoreUrl && (
          <a
            href={app.appStoreUrl}
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black"
          >
            App Store
          </a>
        )}
        {app.playStoreUrl && (
          <a
            href={app.playStoreUrl}
            className="rounded-lg border border-white/40 px-4 py-2 text-sm font-bold"
          >
            Google Play
          </a>
        )}
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
