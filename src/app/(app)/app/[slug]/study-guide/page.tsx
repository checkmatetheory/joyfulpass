import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

export default async function StudyGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const curriculum = getCurriculum(slug);
  const testName = curriculum?.testName ?? app.examName;

  return (
    <div className="mx-auto max-w-5xl">
      <DashboardBreadcrumb appSlug={slug} current="Study guide" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Study guide</h1>
      <p className="mt-3 max-w-2xl opacity-70">
        A chaptered overview of what the {testName} covers. Read a chapter, then practise it — the
        quiz on each topic page tells you what&rsquo;s actually sticking.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* In-page table of contents */}
        <nav className="lg:sticky lg:top-8 lg:h-fit">
          <p className="text-[11px] font-bold uppercase tracking-wide opacity-50">Contents</p>
          <ol className="mt-3 space-y-2 text-sm">
            {curriculum?.chapters.map((chapter, i) => (
              <li key={chapter.slug}>
                <a href={`#${chapter.slug}`} className="opacity-75 hover:opacity-100">
                  {i + 1}. {chapter.shortLabel}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-10">
          {curriculum?.chapters.map((chapter, i) => (
            <section key={chapter.slug} id={chapter.slug} className="scroll-mt-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {chapter.icon}
                </span>
                <h2 className="text-xl font-bold">
                  {i + 1}. {chapter.name}
                </h2>
              </div>
              <p className="mt-3 opacity-80">{chapter.intro}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm opacity-75">
                {chapter.cores.map((core) => (
                  <li key={core.slug}>{core.name}</li>
                ))}
              </ul>
              <Link
                href={`/${slug}/${chapter.slug}/`}
                className="mt-3 inline-block text-sm font-bold"
                style={{ color: "var(--accent)" }}
              >
                Practise this chapter →
              </Link>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs opacity-50">
        This is an original, condensed overview written by the {app.name} team — not a reproduction
        of the official handbook. Always confirm details with{" "}
        <a href={app.officialSource.url} className="underline">
          {app.officialSource.name}
        </a>
        .
      </p>
    </div>
  );
}
