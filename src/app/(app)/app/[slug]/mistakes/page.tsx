import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

export default async function MistakesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <DashboardBreadcrumb appSlug={slug} current="Mistakes" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mistakes review</h1>
      <p className="mt-3 opacity-70">
        Retry only the questions you got wrong. It&rsquo;s the fastest way to turn weak spots into
        easy marks.
      </p>

      {/* Empty state — no auth/persistence yet (that arrives with web sign-in). */}
      <div className="mt-8 rounded-2xl border border-dashed border-black/15 p-10 text-center dark:border-white/15">
        <p className="text-4xl" aria-hidden>
          🎯
        </p>
        <h2 className="mt-4 text-lg font-bold">No mistakes logged yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-70">
          Take a mock test or a topic quiz and any questions you miss will collect here so you can
          retry them.
        </p>
        <Link
          href={`/app/${slug}/mock-tests/`}
          className="mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Take a mock test
        </Link>
      </div>

      <div
        className="mt-6 rounded-xl p-5 text-sm text-white"
        style={{ backgroundColor: "var(--accent-dark)" }}
      >
        <p className="font-bold">🔒 Full mistake history is a Pro feature</p>
        <p className="mt-1 text-white/80">
          Free keeps your last session&rsquo;s mistakes. Pro keeps your complete history and adds
          spaced repetition so tricky questions come back until they stick.{" "}
          <Link href={`/app/${slug}/pricing/`} className="font-bold underline">
            See plans
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
