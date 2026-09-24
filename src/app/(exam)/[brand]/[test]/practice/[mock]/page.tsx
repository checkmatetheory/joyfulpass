import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, passRatio } from "@/lib/curriculum";
import { getMockTest, getMockTests } from "@/lib/mockTests";
import QuizPanel from "@/components/practice/QuizPanel";
import JsonLd from "@/components/JsonLd";
import LeadCapture from "@/components/leads/LeadCapture";
import { examHub, practicePath, practiceTestPath, pricingPath } from "@/lib/urls";
import { breadcrumbJsonLd, quizJsonLd } from "@/lib/schema";

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
  return buildMetadata({
    title: `${app.examName} Practice Test ${mock} — Free Mock Questions`,
    description: `Free ${app.examName} practice test ${mock} — play it now, scored against the real pass mark with an explanation for every answer.`,
    path: practiceTestPath(app, mock),
    brand: app.name,
  });
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
  const mocks = getMockTests(app);
  const nextMock = mocks[mocks.findIndex((m) => m.slug === mock.slug) + 1];

  const quiz = quizJsonLd({
    name: `${curriculum.testName} Practice Test ${mock.number}`,
    about: `A free practice test for the ${curriculum.testName}.`,
    testName: curriculum.testName,
    path: practiceTestPath(app, mock.slug),
    questions: mock.questions,
  });

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <JsonLd data={quiz} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Joyful", path: "/" },
            { name: curriculum.testName, path: examHub(app) },
            { name: "Practice tests", path: practicePath(app) },
            { name: `Practice Test ${mock.number}`, path: practiceTestPath(app, mock.slug) },
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
            <li className="font-semibold opacity-90">Practice Test {mock.number}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {curriculum.testName} Practice Test {mock.number}
        </h1>
        <p className="mt-3 opacity-75">
          A free, short {curriculum.testName} practice set — {mock.questions.length} questions,
          scored instantly against the real {Math.round(passRatio(curriculum) * 100)}% pass mark,
          with an explanation for every answer. No sign-up needed. The real test has{" "}
          {curriculum.facts.questions}; full-length timed mocks are part of {app.name} Pro.
        </p>

        <div className="mt-8">
          <QuizPanel
            questions={mock.questions}
            setName={`Practice Test ${mock.number}`}
            passRatio={passRatio(curriculum)}
            appSlug={app.slug}
            appName={app.name}
            pricingHref={pricingPath(app)}
            next={
              nextMock
                ? { href: practiceTestPath(app, nextMock.slug), label: `Practice Test ${nextMock.number}` }
                : { href: practicePath(app), label: "All practice tests" }
            }
          >
            <LeadCapture
              appSlug={app.slug}
              testName={curriculum.testName}
              source="quiz_results"
              className="mt-8"
            />
          </QuizPanel>
        </div>

        <p className="mt-8 text-sm opacity-70">
          Want another go?{" "}
          <Link href={practicePath(app)} className="font-semibold hover:underline">
            Try a different practice test →
          </Link>
        </p>
      </div>
    </div>
  );
}
