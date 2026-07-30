"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { AppRecord } from "@/lib/apps";
import { LOGO_PURPLE_URL, LOGO_WHITE_URL } from "@/lib/site";
import { useTheme } from "@/components/ThemeProvider";
import {
  AccountIcon,
  MistakesIcon,
  MockTestIcon,
  MoonIcon,
  OverviewIcon,
  PricingIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";
import {
  accountPath,
  blogIndex,
  cheatSheetPath,
  examHub,
  mistakesPath,
  practicePath,
  pricingPath,
  revisionNotesPath,
  studyGuidePath,
  topicsPath,
} from "@/lib/urls";

type Item = {
  label: string;
  href: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  /** Pro-gated app-flow item, visually de-emphasised. */
  muted?: boolean;
};

/**
 * The exam-silo shell nav — SEO pages and the app flow in one place. The whole
 * app family (BritPass, CanadaPass, GermanPass …) reuses this identical sidebar.
 */
export default function ExamSidebar({ app }: { app: AppRecord }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const hub = examHub(app);

  const primary: Item[] = [
    { label: "Overview", href: hub, Icon: OverviewIcon },
    { label: "Mock Tests", href: practicePath(app), Icon: MockTestIcon },
    { label: "Topics", href: topicsPath(app), Icon: TopicsIcon },
    { label: "Mistakes", href: mistakesPath(app), Icon: MistakesIcon, muted: true },
    { label: "Study guide", href: studyGuidePath(app), Icon: StudyGuideIcon },
    { label: "Revision notes", href: revisionNotesPath(app), Icon: RevisionIcon },
    { label: "Cheat sheet", href: cheatSheetPath(app), Icon: MockTestIcon },
  ];

  const isActive = (href: string) => (href === hub ? pathname === hub : pathname.startsWith(href));

  const rowClass = (active: boolean, muted?: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? "font-semibold text-white"
        : `hover:bg-black/5 dark:hover:bg-white/5 ${muted ? "opacity-45" : "opacity-80"}`
    }`;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-black/10 bg-[var(--surface-cream)] px-3 py-5 dark:border-white/10">
      <Link href="/" className="flex items-center px-2" aria-label="Joyful home">
        {/* Purple wordmark on the light (cream) sidebar; white wordmark in dark
            mode where purple-on-dark reads poorly. Toggled via the `.dark` class
            so there's no hydration flash. */}
        <Image
          src={LOGO_PURPLE_URL}
          alt=""
          width={360}
          height={110}
          className="h-10 w-auto dark:hidden"
          style={{ width: "auto" }}
          priority
        />
        <Image
          src={LOGO_WHITE_URL}
          alt=""
          width={360}
          height={110}
          className="hidden h-10 w-auto dark:block"
          style={{ width: "auto" }}
          priority
        />
      </Link>

      <nav className="mt-6 space-y-1">
        {primary.map(({ label, href, Icon, muted }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={rowClass(active, muted)}
              style={active ? { backgroundColor: "var(--accent-highlight)" } : undefined}
            >
              <Icon className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="my-4 border-t border-black/10 dark:border-white/10" />

      <nav className="space-y-1">
        {/* Primary purchase CTA — present on every in-app page, per app URL. */}
        <Link
          href={pricingPath(app)}
          aria-current={isActive(pricingPath(app)) ? "page" : undefined}
          className="mb-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-dark))" }}
        >
          <PricingIcon className="h-4 w-4 shrink-0 text-amber-300" />
          <span>Go Pro</span>
        </Link>
        <Link
          href={blogIndex(app)}
          aria-current={isActive(blogIndex(app)) ? "page" : undefined}
          className={rowClass(isActive(blogIndex(app)))}
          style={isActive(blogIndex(app)) ? { backgroundColor: "var(--accent-highlight)" } : undefined}
        >
          <RevisionIcon className="shrink-0" />
          <span>Blog</span>
        </Link>

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
              backgroundColor: theme === "dark" ? "var(--accent-highlight)" : "rgba(120,120,120,0.35)",
            }}
          >
            <span
              className="h-4 w-4 rounded-full bg-white transition-transform"
              style={{ transform: theme === "dark" ? "translateX(16px)" : "translateX(0)" }}
            />
          </span>
        </button>
      </nav>

      <div className="mt-auto border-t border-black/10 pt-4 dark:border-white/10">
        <Link
          href={accountPath(app)}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm opacity-80 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <AccountIcon className="shrink-0" />
          <span>Account</span>
          <span className="ml-auto opacity-50" aria-hidden>
            •••
          </span>
        </Link>
      </div>
    </aside>
  );
}
