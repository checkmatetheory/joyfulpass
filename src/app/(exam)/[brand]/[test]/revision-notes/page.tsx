import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
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
  return examPathParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}): Promise<Metadata> {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  return {
    title: `${app.examName} Revision Notes — Free Quick Recap`,
    description: `Condensed ${app.examName} revision notes — the key facts for every chapter in one place, for a fast recap before your test.`,
    alternates: { canonical: revisionNotesPath(app) },
  };
}

export default async function RevisionNotesPage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  if (!curriculum) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Joyful", path: "/" },
          { name: curriculum.testName, path: examHub(app) },
          { name: "Revision notes", path: revisionNotesPath(app) },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${app.examName} Revision Notes`,
          description: `Condensed revision notes for the ${app.examName}.`,
          path: revisionNotesPath(app),
          learningResourceType: "revision notes",
        })}
      />

      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={examHub(app)} className="hover:underline">
              {curriculum.testName}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">Revision notes</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {curriculum.testName} Revision Notes
      </h1>
      <p className="mt-5 opacity-75">
        The essential facts for the {curriculum.testName}, condensed chapter by chapter — a fast
        recap for the days before your test. For the full explanations, see the{" "}
        <Link href={studyGuidePath(app)} className="font-semibold underline">
          study guide
        </Link>
        ; to cram, use the{" "}
        <Link href={cheatSheetPath(app)} className="font-semibold underline">
          cheat sheet
        </Link>
        .
      </p>

      <div className="mt-10 space-y-8">
        {curriculum.chapters.map((chapter, i) => (
          <section key={chapter.slug}>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span aria-hidden>{chapter.icon}</span>
              {i + 1}. {chapter.shortLabel}
            </h2>
            <ul
              className="mt-3 space-y-2 border-l-2 pl-4 text-[15px] opacity-85"
              style={{ borderColor: "var(--accent-soft)" }}
            >
              {chapter.keyFacts.map((fact, j) => (
                <li key={j}>{fact}</li>
              ))}
            </ul>
            <Link
              href={chapterPath(app, chapter.slug)}
              className="mt-2 inline-block text-sm font-bold"
              style={{ color: "var(--accent)" }}
            >
              Test yourself on this chapter →
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
