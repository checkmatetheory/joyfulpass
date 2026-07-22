import Link from "next/link";
import type { AppRecord } from "@/lib/apps";

export default function AppCard({ app }: { app: AppRecord }) {
  return (
    <Link
      href={`/${app.slug}/`}
      className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden>
          {app.flagEmoji}
        </span>
        <div>
          <p className="font-display text-xl font-semibold">{app.name}</p>
          <p className="text-sm opacity-60">{app.examName}</p>
        </div>
      </div>
      <p className="mt-4 text-sm opacity-80">{app.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {app.stats.slice(0, 2).map((stat) => (
          <span
            key={stat.label}
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: app.theme.accentSoft, color: app.theme.accentDark }}
          >
            {stat.value} {stat.label}
          </span>
        ))}
      </div>
      <span
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2"
        style={{ color: app.theme.accent }}
      >
        Explore {app.shortName} →
      </span>
    </Link>
  );
}
