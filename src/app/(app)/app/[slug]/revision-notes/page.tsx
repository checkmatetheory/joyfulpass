import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getCurriculum, freeQuestions } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

export default async function RevisionNotesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const curriculum = getCurriculum(slug);
  const testName = curriculum?.testName ?? app.examName;

  return (
    <div className="mx-auto max-w-3xl">
      <DashboardBreadcrumb appSlug={slug} current="Revision notes" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Revision notes</h1>
      <p className="mt-3 opacity-70">
        The key facts for the {testName}, condensed — a quick last-minute skim before you sit a mock.
      </p>

      <div className="mt-8 space-y-8">
        {curriculum?.chapters.map((chapter, i) => {
          // Distil each chapter into one-line prompts drawn from its practice set.
          const facts = freeQuestions(chapter).map((q) => q.explanation);
          return (
            <section key={chapter.slug}>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <span aria-hidden>{chapter.icon}</span>
                {i + 1}. {chapter.shortLabel}
              </h2>
              <ul className="mt-3 space-y-2 border-l-2 pl-4 text-sm opacity-80" style={{ borderColor: "var(--accent-soft)" }}>
                {facts.map((fact, j) => (
                  <li key={j}>{fact}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
