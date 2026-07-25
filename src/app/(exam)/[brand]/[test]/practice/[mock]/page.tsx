import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { getMockTest, getMockTests } from "@/lib/mockTests";
import QuizPanel from "@/components/practice/QuizPanel";
import JsonLd from "@/components/JsonLd";
import { examHub, practicePath, practiceTestPath } from "@/lib/urls";
import { breadcrumbJsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.flatMap((app) =>
    getMockTests(app).map((mock) => ({
      brand: app.slug,
      test: app.examSlug,
      mock: mock.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string; mock: string }>;
}): Promise<Metadata> {
  const { test, mock } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  return {
    title: `${app.examName} Mock Test ${mock} — Free Practice`,
    description: `Free ${app.examName} mock test ${mock} — play it now, scored instantly with an explanation for every answer.`,
    alternates: { canonical: practiceTestPath(app, mock) },
  };
}

export default async function MockTestPage({
  params,
}: {
  params: Promise<{ brand: string; test: string; mock: string }>;
}) {
  const { test, mock: mockSlug } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  const mock = getMockTest(app, mockSlug);
  if (!curriculum || !mock) notFound();

  const quizJsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${curriculum.testName} Mock Test ${mock.number}`,
    about: `A free practice mock test for the ${curriculum.testName}.`,
    educationalLevel: "citizenship test preparation",
  };

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <JsonLd data={quizJsonLd} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Joyful", path: "/" },
            { name: curriculum.testName, path: examHub(app) },
            { name: "Practice tests", path: practicePath(app) },
            { name: `Mock Test ${mock.number}`, path: practiceTestPath(app, mock.slug) },
          ])}
        />

        <nav aria-label="Breadcrumb" className="text-sm opacity-60">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={practicePath(app)} className="hover:underline">
                Practice tests
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-semibold opacity-90">Mock Test {mock.number}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {curriculum.testName} Mock Test {mock.number}
        </h1>
        <p className="mt-3 opacity-75">
          A free {curriculum.testName} practice test — {mock.questions.length} questions, scored
          instantly with an explanation for every answer. No sign-up needed.
        </p>

        <div className="mt-8">
          <QuizPanel
            questions={mock.questions}
            chapterName={`Mock Test ${mock.number}`}
            hasLockedContent={false}
            appName={app.name}
            appStoreUrl={app.appStoreUrl}
            playStoreUrl={app.playStoreUrl}
          />
        </div>

        <p className="mt-8 text-sm opacity-70">
          Want another go?{" "}
          <Link href={practicePath(app)} className="font-semibold hover:underline">
            Take a different mock test →
          </Link>
        </p>
      </div>
    </div>
  );
}
