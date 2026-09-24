import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { freeQuestions, getCurriculum, passRatio } from "@/lib/curriculum";
import { correctOptions } from "@/lib/scoring";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, quizJsonLd } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ProLink from "@/components/ProLink";
import { chapterPath, examHub, practicePath, pricingPath, questionsPath } from "@/lib/urls";

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
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) return {};
  const count = curriculum.chapters.flatMap((c) => freeQuestions(c)).length;
  return buildMetadata({
    title: `${curriculum.testName} Questions & Answers — Free Practice`,
    description: `${count} free ${curriculum.testName} sample questions with answers and explanations, grouped by topic — plus the key facts to know for each part of the test.`,
    path: questionsPath(app),
    brand: app.name,
  });
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * The "questions and answers" pillar page: every free sample question with its
 * answer and explanation, grouped by topic with that topic's key facts. Answers
 * sit behind a native <details> toggle — readers can test themselves, and the
 * full text is still in the HTML for search engines.
 */
export default async function QuestionsPage({ params }: { params: Promise<{ brand: string; test: string }> }) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) notFound();

  const all = curriculum.chapters.flatMap((c) => freeQuestions(c));
  const { questions: realCount, toPass, timeLimit } = curriculum.facts;
  const passPct = Math.round(passRatio(curriculum) * 100);

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <JsonLd
          data={quizJsonLd({
            name: `${curriculum.testName} questions and answers`,
            about: `Free sample questions for the ${curriculum.testName}, with answers and explanations.`,
            testName: curriculum.testName,
            path: questionsPath(app),
            questions: all,
          })}
        />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Joyful", path: "/" },
            { name: curriculum.testName, path: examHub(app) },
            { name: "Questions and answers", path: questionsPath(app) },
          ])}
        />

        <nav aria-label="Breadcrumb" className="text-sm opacity-60">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={examHub(app)} className="hover:underline">
                {curriculum.testName}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-semibold opacity-90">Questions and answers</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {curriculum.testName} questions and answers
        </h1>
        <p className="mt-4 text-lg opacity-75">
          {all.length} free sample questions in the style of the real test, each with the answer and a
          short explanation, grouped by topic. The real {curriculum.testName} has {realCount}: you need{" "}
          {toPass}, in {timeLimit}.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={practicePath(app)}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Test yourself instead — scored practice
          </Link>
        </div>

        {curriculum.chapters.map((chapter) => {
          const questions = freeQuestions(chapter);
          if (questions.length === 0) return null;
          return (
            <section key={chapter.slug} className="mt-12" aria-labelledby={`q-${chapter.slug}`}>
              <h2 id={`q-${chapter.slug}`} className="text-2xl font-bold">
                <span aria-hidden>{chapter.icon}</span> {chapter.name}
              </h2>
              <p className="mt-2 opacity-75">{chapter.summary}</p>

              <h3 className="mt-5 text-sm font-bold uppercase tracking-wide opacity-60">Key facts</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm opacity-85">
                {chapter.keyFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>

              <ol className="mt-6 space-y-4">
                {questions.map((q, i) => {
                  const correct = correctOptions(q);
                  return (
                    <li key={q.id} className="rounded-2xl border border-black/10 p-5 dark:border-white/10">
                      <p className="font-semibold">
                        {i + 1}. {q.prompt}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm">
                        {q.options.map((option, oi) => (
                          <li key={option}>
                            <span className="font-mono font-bold opacity-60">{LETTERS[oi]}.</span> {option}
                          </li>
                        ))}
                      </ul>
                      <details className="group mt-3">
                        <summary className="cursor-pointer text-sm font-bold" style={{ color: "var(--accent)" }}>
                          Show answer
                        </summary>
                        <p className="mt-2 text-sm">
                          <strong>Answer: {correct.map((c) => `${LETTERS[c]}. ${q.options[c]}`).join("; ")}</strong>
                        </p>
                        <p className="mt-1 text-sm opacity-75">{q.explanation}</p>
                      </details>
                    </li>
                  );
                })}
              </ol>

              <Link
                href={chapterPath(app, chapter.slug)}
                className="mt-4 inline-block text-sm font-bold hover:underline"
                style={{ color: "var(--accent)" }}
              >
                Practise {chapter.shortLabel.toLowerCase()} questions with instant scoring →
              </Link>
            </section>
          );
        })}

        <section
          className="mt-14 rounded-3xl p-6 text-white sm:p-8"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
        >
          <h2 className="text-xl font-extrabold">Want the full question bank?</h2>
          <p className="mt-2 text-sm text-white/85">
            {app.name} Pro adds every question for every topic and full-length {realCount} mock tests
            against the clock, scored against the real {passPct}% pass mark — with your mistakes saved
            so you can retry them.
          </p>
          <ProLink
            href={pricingPath(app)}
            appSlug={app.slug}
            location="questions_page"
            className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[color:var(--accent-dark)]"
          >
            See {app.name} Pro
          </ProLink>
        </section>

        <p className="mt-8 text-xs opacity-55">
          These are original practice questions written by the {app.name} team from the official study
          material — not real test questions. Always check the latest details with{" "}
          {app.officialSource.name}.
        </p>
      </div>
    </div>
  );
}
