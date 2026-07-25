import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { chapterPath, examHub } from "@/lib/urls";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

// Numbered mock tests are a logged-in UX device (lesson variety, à la Duolingo)
// and live ONLY here — never as public URLs. This surface is noindex'd and kept
// out of every sitemap, containing the numbered-page pattern to a space Google
// never sees.
const TOTAL_MOCKS = 12;
const FREE_MOCKS = 3;

export default async function MockTestsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const curriculum = getCurriculum(slug);
  const practiceHref = curriculum?.chapters[0]
    ? chapterPath(app, curriculum.chapters[0].slug)
    : examHub(app);
  const testName = curriculum?.testName ?? app.examName;

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardBreadcrumb appSlug={slug} current="Mock Tests" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mock Tests</h1>
      <p className="mt-3 max-w-2xl opacity-70">
        Each mock mirrors the real {testName} — {curriculum?.fullTest.questionCount ?? 24} questions
        against the clock. The first {FREE_MOCKS} are free; unlock the rest with Pro.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: TOTAL_MOCKS }, (_, i) => {
          const n = i + 1;
          const locked = n > FREE_MOCKS;
          const href = locked ? `/app/${slug}/pricing/` : practiceHref;
          return (
            <Link
              key={n}
              href={href}
              className="group flex items-center justify-between rounded-xl border border-black/10 p-4 transition-colors hover:border-[var(--accent)] dark:border-white/10"
            >
              <div>
                <p className="font-mono text-xs opacity-50">Test {n}</p>
                <p className="mt-1 font-bold">
                  {testName} {n}
                </p>
              </div>
              {locked ? (
                <span className="text-sm opacity-50" aria-label="Locked — unlock with Pro">
                  🔒
                </span>
              ) : (
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  Free
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
