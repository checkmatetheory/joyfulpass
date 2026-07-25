"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppRecord } from "@/lib/apps";
import { useTheme } from "@/components/ThemeProvider";
import {
  ContactIcon,
  MockTestIcon,
  MoonIcon,
  OverviewIcon,
  PricingIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";
import {
  blogIndex,
  cheatSheetPath,
  examHub,
  revisionNotesPath,
  studyGuidePath,
} from "@/lib/urls";

type Item = {
  label: string;
  href: string;
  Icon: (p: { className?: string }) => React.ReactElement;
};

/**
 * Persistent left-hand navigation for an exam silo — the Britizen-style shell
 * the whole app family follows. Public (indexed) links only; one consistent
 * source-of-truth nav for a learner.
 */
export default function ExamSidebar({ app }: { app: AppRecord }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const hub = examHub(app);

  const items: Item[] = [
    { label: "Overview", href: hub, Icon: OverviewIcon },
    { label: "Topics", href: `${hub}#topics`, Icon: TopicsIcon },
    { label: "Study guide", href: studyGuidePath(app), Icon: StudyGuideIcon },
    { label: "Revision notes", href: revisionNotesPath(app), Icon: RevisionIcon },
    { label: "Cheat sheet", href: cheatSheetPath(app), Icon: MockTestIcon },
    { label: "Blog", href: blogIndex(app), Icon: ContactIcon },
  ];

  const isActive = (href: string) => {
    // Same-page anchors (e.g. #topics) aren't a distinct active page.
    if (href.includes("#")) return false;
    if (href === hub) return pathname === hub;
    return pathname.startsWith(href);
  };

  const rowClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active ? "font-semibold text-white" : "opacity-80 hover:bg-black/5 dark:hover:bg-white/5"
    }`;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-black/10 bg-[var(--surface-cream)] px-3 py-5 dark:border-white/10">
      <Link href="/" className="flex items-center gap-2 px-2">
        <span className="text-xl" aria-hidden>
          {app.flagEmoji}
        </span>
        <span className="text-lg font-bold">{app.name}</span>
      </Link>

      <nav className="mt-6 space-y-1">
        {items.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={rowClass(active)}
              style={active ? { backgroundColor: "var(--accent)" } : undefined}
            >
              <Icon className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="my-4 border-t border-black/10 dark:border-white/10" />

      <nav className="space-y-1">
        <a href={`${hub}#download`} className={rowClass(false)}>
          <PricingIcon className="shrink-0" />
          <span>Get the app</span>
        </a>
        <button
          type="button"
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm opacity-80 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        >
          <MoonIcon className="shrink-0" />
          <span>Dark Mode</span>
          <span
            className="ml-auto flex h-5 w-9 items-center rounded-full p-0.5 transition-colors"
            style={{
              backgroundColor: theme === "dark" ? "var(--accent)" : "rgba(120,120,120,0.35)",
            }}
          >
            <span
              className="h-4 w-4 rounded-full bg-white transition-transform"
              style={{ transform: theme === "dark" ? "translateX(16px)" : "translateX(0)" }}
            />
          </span>
        </button>
      </nav>
    </aside>
  );
}
