import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import ProLink from "@/components/ProLink";
import LeadCapture from "@/components/leads/LeadCapture";
import { practicePath, pricingPath } from "@/lib/urls";

/**
 * End-of-article conversion block. Informational readers are warm but not yet
 * committed, so the primary step is a free practice test (one click, no
 * sign-up); Pro is the secondary step. Hub posts (no single exam) get an exam
 * picker instead.
 */
export default function ArticleCta({ app, apps }: { app?: AppRecord; apps: AppRecord[] }) {
  if (!app) {
    return (
      <aside className="mt-14 rounded-3xl border border-black/10 p-6 sm:p-8 dark:border-white/10">
        <p className="text-lg font-extrabold">Test yourself — free</p>
        <p className="mt-1 text-sm opacity-70">
          Pick your exam and try a scored practice test right now. No sign-up needed.
        </p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {apps.map((a) => (
            <li key={a.slug}>
              <Link
                href={practicePath(a)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: a.theme.accent }}
              >
                <span aria-hidden>{a.flagEmoji}</span>
                {a.examName}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <>
    <aside
      className="mt-14 rounded-3xl p-6 text-white sm:p-8"
      style={{ background: `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentDark})` }}
    >
      <p className="text-lg font-extrabold">Put this into practice</p>
      <p className="mt-1 text-sm text-white/85">
        Try a free {app.examName} practice test now — scored instantly against the real pass mark,
        with an explanation for every answer. No sign-up needed.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={practicePath(app)}
          className="rounded-full bg-white px-6 py-3 text-sm font-bold transition hover:opacity-90"
          style={{ color: app.theme.accentDark }}
        >
          Start a free practice test
        </Link>
        <ProLink
          href={pricingPath(app)}
          appSlug={app.slug}
          location="article_end"
          className="rounded-full border border-white/60 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          See {app.name} Pro
        </ProLink>
      </div>
    </aside>
    <LeadCapture appSlug={app.slug} testName={app.examName} source="article_end" className="mt-6" />
    </>
  );
}
