import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppByExamSlug } from "@/lib/apps";
import { getChapter, getCurriculum, passRatio } from "@/lib/curriculum";
import { getProAccess } from "@/lib/entitlements";
import { getChapterBank, toQuizQuestion } from "@/lib/questionBank";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import ProGate from "@/components/pro/ProGate";
import ProAttemptRunner from "@/components/pro/ProAttemptRunner";
import { pricingPath, proPath, proTopicPath } from "@/lib/urls";

export const metadata: Metadata = { title: "Topic practice", robots: { index: false, follow: false } };

export default async function ProTopicPage({
  params,
}: {
  params: Promise<{ brand: string; test: string; chapter: string }>;
}) {
  const { test, chapter: chapterSlug } = await params;
  const app = getAppByExamSlug(test);
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  const chapter = app ? getChapter(app.slug, chapterSlug) : undefined;
  if (!app || !curriculum || !chapter) notFound();

  const access = await getProAccess(app.slug);
  if (access.state !== "pro") {
    return (
      <div className="px-5 py-8 sm:px-10">
        <DashboardBreadcrumb app={app} current={chapter.shortLabel} />
        <ProGate app={app} access={access} returnTo={proTopicPath(app, chapter.slug)} feature="Full topic question banks" />
      </div>
    );
  }

  const questions = getChapterBank(app.slug, chapter.slug).map(toQuizQuestion);
  const idx = curriculum.chapters.findIndex((c) => c.slug === chapter.slug);
  const nextChapter = curriculum.chapters[idx + 1];

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <DashboardBreadcrumb app={app} current={chapter.shortLabel} />
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span aria-hidden>{chapter.icon}</span> {chapter.name}
        </h1>
        <p className="mt-2 opacity-70">
          Every {chapter.shortLabel.toLowerCase()} question in the bank — {questions.length} in all —
          with an explanation after each answer.
        </p>
        <div className="mt-8">
          <ProAttemptRunner
            questions={questions}
            appSlug={app.slug}
            appName={app.name}
            setName={chapter.shortLabel}
            setId={`topic-${chapter.slug}`}
            kind="topic"
            passRatio={passRatio(curriculum)}
            pricingHref={pricingPath(app)}
            next={
              nextChapter
                ? { href: proTopicPath(app, nextChapter.slug), label: `Next: ${nextChapter.shortLabel}` }
                : { href: proPath(app), label: "Back to Pro dashboard" }
            }
          />
        </div>
      </div>
    </div>
  );
}
