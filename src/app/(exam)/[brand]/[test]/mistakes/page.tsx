import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, passRatio } from "@/lib/curriculum";
import { getProAccess } from "@/lib/entitlements";
import { getQuestionsById, toQuizQuestion } from "@/lib/questionBank";
import { getMistakeIds } from "@/lib/progress";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import ProGate from "@/components/pro/ProGate";
import ProAttemptRunner from "@/components/pro/ProAttemptRunner";
import { mistakesPath, pricingPath, proMockPath, proPath } from "@/lib/urls";

export const dynamicParams = false;
export const metadata: Metadata = { title: "Mistakes review", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return examPathParams();
}

export default async function MistakesPage({ params }: { params: Promise<{ brand: string; test: string }> }) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) notFound();

  const header = (
    <>
      <DashboardBreadcrumb app={app} current="Mistakes" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mistakes review</h1>
      <p className="mt-3 opacity-70">
        Retry only the questions you currently get wrong. Answer one correctly and it drops off the
        list — the fastest way to turn weak spots into easy marks.
      </p>
    </>
  );

  const access = await getProAccess(app.slug);
  if (access.state !== "pro") {
    return (
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10">
        {header}
        <div className="mt-8">
          <ProGate app={app} access={access} returnTo={mistakesPath(app)} feature="Saved mistake reviews" />
        </div>
      </div>
    );
  }

  const bank = getQuestionsById(app.slug);
  const questions = (await getMistakeIds(app.slug))
    .map((id) => bank.get(id))
    .filter((q) => q !== undefined)
    .map(toQuizQuestion);

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10">
      {header}
      <div className="mt-8">
        {questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15">
            <p className="text-4xl" aria-hidden>
              🎯
            </p>
            <h2 className="mt-4 text-lg font-bold">No mistakes to review</h2>
            <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
              Questions you miss in Pro mocks and topic practice collect here until you get them right.
            </p>
            <Link
              href={proMockPath(app)}
              className="mt-6 inline-block rounded-full px-5 py-2.5 text-sm font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Take a mock test
            </Link>
          </div>
        ) : (
          <ProAttemptRunner
            questions={questions}
            appSlug={app.slug}
            appName={app.name}
            setName="mistakes"
            setId="mistakes"
            kind="mistakes"
            passRatio={passRatio(curriculum)}
            pricingHref={pricingPath(app)}
            next={{ href: proPath(app), label: "Back to Pro dashboard" }}
          />
        )}
      </div>
    </div>
  );
}
