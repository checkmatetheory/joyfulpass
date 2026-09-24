import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { getMockTests } from "@/lib/mockTests";
import FaqAccordion from "@/components/FaqAccordion";
import ProLink from "@/components/ProLink";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd, practiceFaqs } from "@/lib/faqs";
import { EXTERNAL_LINK_PROPS } from "@/lib/site";
import {
  cheatSheetPath,
  examHub,
  practicePath,
  practiceTestPath,
  pricingPath,
  revisionNotesPath,
  studyGuidePath,
} from "@/lib/urls";
import { breadcrumbJsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return apps.map((app) => ({ brand: app.slug, test: app.examSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}): Promise<Metadata> {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  return buildMetadata({
    title: `Free ${app.examName} Practice Tests — Play Instantly`,
    description: `Free ${app.examName} practice tests and mock exams that mirror the real format — play them right now, no sign-up. Plus revision notes and a study guide.`,
    path: practicePath(app),
    brand: app.name,
  });
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  if (!curriculum) notFound();
  const mocks = getMockTests(app);
  const { questionCount, passMark, minutes } = curriculum.fullTest;

  const faqs = practiceFaqs(app, curriculum);

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <JsonLd data={faqJsonLd(faqs)} />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Joyful", path: "/" },
            { name: curriculum.testName, path: examHub(app) },
            { name: "Practice tests", path: practicePath(app) },
          ])}
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
            <li className="font-semibold opacity-90">Practice tests</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Free {curriculum.testName} Practice Tests
        </h1>
        <p className="mt-4 max-w-2xl text-lg opacity-75">
          Short, free {curriculum.testName} practice sets built from the official material — play
          any of them right now, no sign-up, with an explanation for every answer. The real test is{" "}
          {questionCount} questions, {passMark} to pass, in {minutes} minutes.
        </p>

        {/* Genuine mock tests, immediately playable */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Free practice tests</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mocks.map((mock) => (
              <Link
                key={mock.slug}
                href={practiceTestPath(app, mock.slug)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-black/10 p-4 transition-colors hover:border-[var(--accent)] dark:border-white/10"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs opacity-50">Test {mock.number}</p>
                  <p className="mt-1 font-bold">Practice test {mock.number}</p>
                  <p className="mt-0.5 text-xs opacity-60">{mock.questions.length} questions</p>
                </div>
                <span
                  className="shrink-0 self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Play
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-black/10 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <div>
              <p className="font-bold">Practise at real exam length</p>
              <p className="mt-1 text-sm opacity-70">
                {app.name} Pro adds full {questionCount}-question mock tests against a {minutes}-minute
                timer, the complete question bank, and a saved history of your mistakes.
              </p>
            </div>
            <ProLink
              href={pricingPath(app)}
              appSlug={app.slug}
              location="practice_index"
              className="shrink-0 rounded-full px-5 py-2.5 text-sm font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              See Pro plans
            </ProLink>
          </div>
        </section>

        {/* Explanatory content */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">How the {curriculum.testName} works</h2>
          <p className="mt-4 opacity-80">{curriculum.about}</p>
          <p className="mt-4 opacity-80">
            The best way to prepare is to practise under real conditions until you&rsquo;re
            consistently above the pass mark. Each test here is scored instantly and explains every
            answer, so you learn as you go.
          </p>
        </section>

        {/* Links to revision materials */}
        <section className="mt-10 max-w-3xl">
          <h2 className="text-2xl font-bold">Revise before you practise</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href={studyGuidePath(app)}
              className="rounded-full px-4 py-1.5 font-semibold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Study guide →
            </Link>
            <Link
              href={revisionNotesPath(app)}
              className="rounded-full border px-4 py-1.5 font-semibold"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
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
        </section>

        {/* FAQ */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-6">
            <FaqAccordion faqs={faqs} accent={app.theme.accent} />
          </div>
          <p className="mt-8 text-sm opacity-70">
            Official source:{" "}
            <a href={app.officialSource.url} {...EXTERNAL_LINK_PROPS} className="font-semibold hover:underline">
              {app.officialSource.name}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
