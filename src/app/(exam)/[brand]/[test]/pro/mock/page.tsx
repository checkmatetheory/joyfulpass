import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, passRatio } from "@/lib/curriculum";
import { getProAccess } from "@/lib/entitlements";
import { sampleFullMock, toQuizQuestion } from "@/lib/questionBank";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import ProGate from "@/components/pro/ProGate";
import ProAttemptRunner from "@/components/pro/ProAttemptRunner";
import { pricingPath, proMockPath, proPath } from "@/lib/urls";

export const metadata: Metadata = { title: "Mock test", robots: { index: false, follow: false } };

export default async function ProMockPage({ params }: { params: Promise<{ brand: string; test: string }> }) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) notFound();

  const access = await getProAccess(app.slug);
  if (access.state !== "pro") {
    return (
      <div className="px-5 py-8 sm:px-10">
        <DashboardBreadcrumb app={app} current="Mock test" />
        <ProGate app={app} access={access} returnTo={proMockPath(app)} feature="Full-length mock tests" />
      </div>
    );
  }

  // Pro questions are only ever sampled here, after the entitlement check.
  const questions = sampleFullMock(app.slug).map(toQuizQuestion);
  const { minutes } = curriculum.fullTest;

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <DashboardBreadcrumb app={app} current="Mock test" />
        <h1 className="text-3xl font-extrabold tracking-tight">{curriculum.testName} mock test</h1>
        <p className="mt-2 opacity-70">
          {questions.length} questions · {minutes} minutes · no feedback until the end, just like the
          real test. It submits automatically when time runs out.
        </p>
        <div className="mt-8">
          <ProAttemptRunner
            questions={questions}
            appSlug={app.slug}
            appName={app.name}
            setName="mock test"
            setId="full-mock"
            kind="mock"
            passRatio={passRatio(curriculum)}
            pricingHref={pricingPath(app)}
            mode="exam"
            timeLimitSeconds={minutes * 60}
            next={{ href: proPath(app), label: "Back to Pro dashboard" }}
          />
        </div>
      </div>
    </div>
  );
}
