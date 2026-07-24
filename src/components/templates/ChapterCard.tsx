import Link from "next/link";
import type { Chapter } from "@/lib/curriculum";

export default function ChapterCard({
  chapter,
  appSlug,
  number,
}: {
  chapter: Chapter;
  appSlug: string;
  number: number;
}) {
  const questionCount = chapter.cores
    .filter((c) => !c.locked)
    .reduce((n, c) => n + c.questions.length, 0);

  return (
    <Link
      href={`/${appSlug}/${chapter.slug}/`}
      className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-colors hover:border-[var(--accent)] dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl text-xl"
          style={{ backgroundColor: "var(--accent-soft)" }}
          aria-hidden
        >
          {chapter.icon}
        </span>
        <span className="font-mono text-xs opacity-40">Chapter {number}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug">{chapter.name}</h3>
      <p className="mt-2 flex-1 text-sm opacity-70">{chapter.intro}</p>
      <span
        className="mt-4 text-sm font-bold group-hover:underline"
        style={{ color: "var(--accent)" }}
      >
        Practise {questionCount} question{questionCount === 1 ? "" : "s"} →
      </span>
    </Link>
  );
}
