import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { Chapter, Curriculum } from "@/lib/curriculum";
import { chapterPath, examHub } from "@/lib/urls";

type Props = {
  app: AppRecord;
  curriculum: Curriculum;
  current: Chapter;
};

/**
 * The Template B sidebar — modelled on the Britizen layout because a persistent
 * sidebar is the highest-value upsell surface: sibling chapters (internal links),
 * locked cores (freemium tension), and a standing app/Pro promo that follows the
 * user through every practice page.
 */
export default function PracticeSidebar({ app, curriculum, current }: Props) {
  const totalCores = current.cores.length;
  const freeCores = current.cores.filter((c) => !c.locked).length;

  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-[148px] lg:h-fit">
      {/* App identity */}
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden>
          {app.flagEmoji}
        </span>
        <Link href={examHub(app)} className="font-bold hover:underline">
          {app.name}
        </Link>
      </div>

      {/* Chapters */}
      <nav>
        <p className="px-1 text-[11px] font-bold uppercase tracking-wide opacity-50">Chapters</p>
        <ul className="mt-2 space-y-1">
          {curriculum.chapters.map((ch) => {
            const active = ch.slug === current.slug;
            return (
              <li key={ch.slug}>
                <Link
                  href={chapterPath(app, ch.slug)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "font-bold text-white"
                      : "text-[color:inherit] opacity-75 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                  style={active ? { backgroundColor: "var(--accent)" } : undefined}
                >
                  <span aria-hidden>{ch.icon}</span>
                  <span>{ch.shortLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Cores within the current chapter, with the freemium lock */}
      <div>
        <div className="flex items-center justify-between px-1">
          <p className="text-[11px] font-bold uppercase tracking-wide opacity-50">This chapter</p>
          <span className="font-mono text-[11px] opacity-50">
            {freeCores}/{totalCores} free
          </span>
        </div>
        <ul className="mt-2 space-y-1">
          {current.cores.map((core) => (
            <li
              key={core.slug}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
            >
              <span className={core.locked ? "opacity-50" : ""}>{core.name}</span>
              {core.locked ? (
                <span className="text-xs" aria-label="Locked — unlock in the app">
                  🔒
                </span>
              ) : (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Standing upsell — the reason we chose the sidebar layout */}
      <div
        className="rounded-2xl p-5 text-white"
        style={{
          background: `linear-gradient(135deg, var(--accent), var(--accent-dark))`,
        }}
      >
        <p className="text-sm font-bold">Unlock the full {curriculum.testName} bank</p>
        <ul className="mt-3 space-y-1.5 text-xs text-white/85">
          <li>✓ Every chapter &amp; locked core</li>
          <li>✓ Progress saved across devices</li>
          <li>✓ Mistake review &amp; readiness tracker</li>
          <li>✓ Ad-free, offline study guide</li>
        </ul>
        <div className="mt-4 flex flex-col gap-2">
          {app.appStoreUrl && (
            <a
              href={app.appStoreUrl}
              className="rounded-lg bg-white/95 px-3 py-2 text-center text-xs font-bold text-black"
            >
              Get the app
            </a>
          )}
          <Link
            href={`${examHub(app)}#pricing`}
            className="rounded-lg border border-white/40 px-3 py-2 text-center text-xs font-bold"
          >
            Go Pro on the web
          </Link>
        </div>
      </div>
    </aside>
  );
}
