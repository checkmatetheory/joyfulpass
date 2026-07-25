import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import JsonLd from "@/components/JsonLd";
import {
  cheatSheetPath,
  chapterPath,
  examHub,
  revisionNotesPath,
  studyGuidePath,
} from "@/lib/urls";
import { breadcrumbJsonLd, learningResourceJsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string }>;
}): Promise<Metadata> {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) return {};
  return {
    title: `${app.examName} Study Guide — Free Online Notes | ${app.name}`,
    description: `A free, chaptered ${app.examName} study guide covering every topic on the test, with a practice quiz on each chapter. Read online — no sign-up.`,
    alternates: { canonical: studyGuidePath(app) },
  };
}

export default async function StudyGuidePage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  if (!curriculum) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Joyful", path: "/" },
          { name: curriculum.testName, path: examHub(app) },
          { name: "Study guide", path: studyGuidePath(app) },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${app.examName} Study Guide`,
          description: `A free, chaptered study guide for the ${app.examName}.`,
          path: studyGuidePath(app),
          learningResourceType: "study guide",
        })}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={examHub(app)} className="hover:underline">
              {curriculum.testName}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">Study guide</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {curriculum.testName} Study Guide
      </h1>
      <p className="mt-5 max-w-2xl text-lg opacity-75">
        A free, chaptered study guide covering everything the {curriculum.testName} can ask. Read a
        chapter, then test yourself with its quiz — the fastest way to find your gaps before you
        book.
      </p>

      {/* Cross-links to the other study surfaces (topical cluster) */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link
          href={revisionNotesPath(app)}
          className="rounded-full px-4 py-1.5 font-semibold text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Revision notes →
        </Link>
        <Link
          href={cheatSheetPath(app)}
          className="rounded-full border px-4 py-1.5 font-semibold"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          Cheat sheet →
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Table of contents */}
        <nav className="lg:sticky lg:top-24 lg:h-fit">
          <p className="text-[11px] font-bold uppercase tracking-wide opacity-50">Contents</p>
          <ol className="mt-3 space-y-2 text-sm">
            {curriculum.chapters.map((chapter, i) => (
              <li key={chapter.slug}>
                <a href={`#${chapter.slug}`} className="opacity-75 hover:opacity-100">
                  {i + 1}. {chapter.shortLabel}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Chapter sections */}
        <div className="space-y-12">
          {curriculum.chapters.map((chapter, i) => (
            <section key={chapter.slug} id={chapter.slug} className="scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {chapter.icon}
                </span>
                <h2 className="text-2xl font-bold">
                  {i + 1}. {chapter.name}
                </h2>
              </div>
              <p className="mt-3 opacity-80">{chapter.summary}</p>

              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide opacity-60">
                Key facts to remember
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] opacity-85">
                {chapter.keyFacts.map((fact, j) => (
                  <li key={j}>{fact}</li>
                ))}
              </ul>

              {/* On-page sub-topics (long-tail without thin URLs) */}
              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide opacity-60">
                Topics in this chapter
              </h3>
              <p className="mt-2 text-sm opacity-75">
                {chapter.cores.map((c) => c.name).join(" · ")}
              </p>

              <Link
                href={chapterPath(app, chapter.slug)}
                className="mt-4 inline-block text-sm font-bold"
                style={{ color: "var(--accent)" }}
              >
                Practise this chapter →
              </Link>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-12 text-xs opacity-50">
        This is an original, condensed study guide written by the {app.name} team — not a
        reproduction of the official handbook. Always confirm details with{" "}
        <a href={app.officialSource.url} className="underline">
          {app.officialSource.name}
        </a>
        .
      </p>
    </div>
  );
}
