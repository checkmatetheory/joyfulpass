import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

export default async function TopicsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const curriculum = getCurriculum(slug);

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardBreadcrumb appSlug={slug} current="Topics" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Practice by topic</h1>
      <p className="mt-3 max-w-2xl opacity-70">
        Focus on one chapter at a time. Each set pulls questions only from the topic you pick.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard links to the PUBLIC chapter pages, not to noindex'd URLs. */}
        {curriculum?.chapters.map((chapter, i) => {
          const free = chapter.cores.filter((c) => !c.locked).reduce((n, c) => n + c.questions.length, 0);
          return (
            <Link
              key={chapter.slug}
              href={`/${slug}/${chapter.slug}/`}
              className="group flex flex-col rounded-2xl border border-black/10 p-5 transition-colors hover:border-[var(--accent)] dark:border-white/10"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                  style={{ backgroundColor: "var(--accent-soft)" }}
                  aria-hidden
                >
                  {chapter.icon}
                </span>
                <span className="font-mono text-xs opacity-40">Topic {i + 1}</span>
              </div>
              <h2 className="mt-4 font-bold leading-snug">{chapter.shortLabel}</h2>
              <p className="mt-1 flex-1 text-sm opacity-65">{chapter.intro}</p>
              <span className="mt-3 text-sm font-bold" style={{ color: "var(--accent)" }}>
                Practise {free} question{free === 1 ? "" : "s"} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
