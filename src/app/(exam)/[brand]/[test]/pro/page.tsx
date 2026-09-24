import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, passRatio } from "@/lib/curriculum";
import { getProAccess } from "@/lib/entitlements";
import { getBank } from "@/lib/questionBank";
import { getMistakeIds, getRecentAttempts, readiness } from "@/lib/progress";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import ProGate from "@/components/pro/ProGate";
import { mistakesPath, proMockPath, proPath, proTopicPath } from "@/lib/urls";

export const metadata: Metadata = { title: "Pro", robots: { index: false, follow: false } };

const READINESS_COPY = {
  ready: { label: "Ready to book", body: "You're clearing the pass mark comfortably across recent mocks." },
  close: { label: "Nearly there", body: "You're around the pass mark. A few more mocks will build a safe margin." },
  "not-yet": { label: "Keep practising", body: "You're below the pass mark on recent mocks. Focus on your mistakes." },
  unknown: { label: "Take your first mock", body: "Sit a full-length mock to get your readiness score." },
} as const;

export default async function ProDashboardPage({ params }: { params: Promise<{ brand: string; test: string }> }) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) notFound();

  const access = await getProAccess(app.slug);
  if (access.state !== "pro") {
    return (
      <div className="px-5 py-8 sm:px-10">
        <DashboardBreadcrumb app={app} current="Pro" />
        <ProGate app={app} access={access} returnTo={proPath(app)} feature="Full-length mock tests" />
      </div>
    );
  }

  const [attempts, mistakes] = await Promise.all([getRecentAttempts(app.slug), getMistakeIds(app.slug)]);
  const ratio = passRatio(curriculum);
  const ready = readiness(attempts, ratio);
  const copy = READINESS_COPY[ready.level];
  const bank = getBank(app.slug);
  const { questionCount, minutes } = curriculum.fullTest;

  return (
    <div className="px-5 py-8 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <DashboardBreadcrumb app={app} current="Pro" />
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{app.name} Pro</h1>
        <p className="mt-2 opacity-70">
          {bank.length} questions in your bank · signed in as {access.email}
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <section
            className="rounded-3xl p-6 text-white md:col-span-2"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-white/75">Full-length mock test</p>
            <h2 className="mt-1 text-2xl font-extrabold">
              {questionCount} questions · {minutes} minutes
            </h2>
            <p className="mt-2 text-sm text-white/85">
              A fresh random mix at real exam length, timed like the real thing, with no feedback until
              the end. Pass mark {Math.round(ratio * 100)}%.
            </p>
            <Link
              href={proMockPath(app)}
              className="mt-5 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[color:var(--accent-dark)]"
            >
              Start a mock test
            </Link>
          </section>

          <section className="rounded-3xl border border-black/10 p-6 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60">Readiness</p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: "var(--accent)" }}>
              {copy.label}
            </p>
            {ready.average !== null && (
              <p className="mt-1 text-sm font-semibold">
                {Math.round(ready.average * 100)}% average over your last {ready.mocks} mock
                {ready.mocks === 1 ? "" : "s"}
              </p>
            )}
            <p className="mt-2 text-sm opacity-70">{copy.body}</p>
          </section>
        </div>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold">Practise by topic</h2>
            <Link href={mistakesPath(app)} className="text-sm font-bold" style={{ color: "var(--accent)" }}>
              Retry your {mistakes.length} mistake{mistakes.length === 1 ? "" : "s"} →
            </Link>
          </div>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.chapters.map((chapter) => {
              const count = bank.filter((q) => q.chapter === chapter.slug).length;
              return (
                <li key={chapter.slug}>
                  <Link
                    href={proTopicPath(app, chapter.slug)}
                    className="flex h-full items-center gap-3 rounded-2xl border border-black/10 p-4 transition-colors hover:border-[var(--accent)] dark:border-white/10"
                  >
                    <span className="text-2xl" aria-hidden>
                      {chapter.icon}
                    </span>
                    <span>
                      <span className="block font-bold">{chapter.shortLabel}</span>
                      <span className="text-xs opacity-60">{count} questions</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {attempts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Recent results</h2>
            <ul className="mt-4 divide-y divide-black/10 rounded-2xl border border-black/10 dark:divide-white/10 dark:border-white/10">
              {attempts.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                  <span className="font-semibold">
                    {a.kind === "mock" ? "Mock test" : "Topic practice"}
                    <span className="ml-2 text-xs font-normal opacity-55">
                      {new Date(a.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                  </span>
                  <span className={a.passed ? "font-bold text-green-700 dark:text-green-400" : "opacity-70"}>
                    {a.correct_count}/{a.question_count} · {Math.round((a.correct_count / a.question_count) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
