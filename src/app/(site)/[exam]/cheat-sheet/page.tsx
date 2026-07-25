import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import JsonLd from "@/components/JsonLd";
import { cheatSheetPath, examHub, revisionNotesPath, studyGuidePath } from "@/lib/urls";
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
    title: `${app.examName} Cheat Sheet — Key Facts on One Page | ${app.name}`,
    description: `The ${app.examName} on one page: the highest-yield facts, grouped by chapter, for a last-minute cram before your test.`,
    alternates: { canonical: cheatSheetPath(app) },
  };
}

export default async function CheatSheetPage({
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
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Joyful", path: "/" },
          { name: curriculum.testName, path: examHub(app) },
          { name: "Cheat sheet", path: cheatSheetPath(app) },
        ])}
      />
      <JsonLd
        data={learningResourceJsonLd({
          name: `${app.examName} Cheat Sheet`,
          description: `Key facts for the ${app.examName} on one page.`,
          path: cheatSheetPath(app),
          learningResourceType: "cheat sheet",
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
          <li className="font-semibold opacity-90">Cheat sheet</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {curriculum.testName} Cheat Sheet
      </h1>
      <p className="mt-5 max-w-2xl opacity-75">
        Every high-yield fact for the {curriculum.testName} on one page — grouped by chapter for a
        last-minute cram. Want more depth? Read the{" "}
        <Link href={studyGuidePath(app)} className="font-semibold underline">
          study guide
        </Link>{" "}
        or the{" "}
        <Link href={revisionNotesPath(app)} className="font-semibold underline">
          revision notes
        </Link>
        .
      </p>

      {/* Dense, scannable grid — the "cram" format */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {curriculum.chapters.map((chapter) => (
          <div
            key={chapter.slug}
            className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
          >
            <h2 className="flex items-center gap-2 text-base font-bold">
              <span aria-hidden>{chapter.icon}</span>
              {chapter.shortLabel}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm opacity-85">
              {chapter.keyFacts.map((fact, j) => (
                <li key={j} className="flex gap-2">
                  <span style={{ color: "var(--accent)" }} aria-hidden>
                    ▪
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl p-6 text-center text-white" style={{ backgroundColor: "var(--accent-dark)" }}>
        <p className="font-bold">Think you&rsquo;ve got it?</p>
        <p className="mt-1 text-sm text-white/80">Put the cheat sheet to the test with a real quiz.</p>
        <Link
          href={examHub(app)}
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black"
        >
          Take a practice quiz
        </Link>
      </div>
    </div>
  );
}
