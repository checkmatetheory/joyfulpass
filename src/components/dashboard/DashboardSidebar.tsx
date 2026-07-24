"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import {
  AccountIcon,
  ContactIcon,
  MistakesIcon,
  MockTestIcon,
  MoonIcon,
  OverviewIcon,
  PricingIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";

type NavItem = {
  label: string;
  href: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  /** Visually de-emphasised (Pro-gated), still navigable. */
  muted?: boolean;
};

export default function DashboardSidebar({
  appSlug,
  appName,
  flagEmoji,
}: {
  appSlug: string;
  appName: string;
  flagEmoji: string;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const base = `/app/${appSlug}`;

  const primary: NavItem[] = [
    { label: "Overview", href: `${base}/`, Icon: OverviewIcon },
    { label: "Mock Tests", href: `${base}/mock-tests/`, Icon: MockTestIcon },
    { label: "Topics", href: `${base}/topics/`, Icon: TopicsIcon },
    { label: "Mistakes", href: `${base}/mistakes/`, Icon: MistakesIcon, muted: true },
    { label: "Study guide", href: `${base}/study-guide/`, Icon: StudyGuideIcon },
    { label: "Revision notes", href: `${base}/revision-notes/`, Icon: RevisionIcon },
  ];

  const isActive = (href: string) =>
    href === `${base}/` ? pathname === href : pathname.startsWith(href);

  const itemClass = (active: boolean, muted?: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? "font-semibold text-white"
        : `hover:bg-black/5 dark:hover:bg-white/5 ${muted ? "opacity-45" : "opacity-80"}`
    }`;

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-black/10 bg-[var(--surface-cream)] px-3 py-5 dark:border-white/10">
      {/* Brand */}
      <Link href={`/${appSlug}/`} className="flex items-center gap-2 px-2">
        <span className="text-xl" aria-hidden>
          {flagEmoji}
        </span>
        <span className="text-lg font-bold">{appName}</span>
      </Link>

      {/* Primary nav */}
      <nav className="mt-6 space-y-1">
        {primary.map(({ label, href, Icon, muted }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={itemClass(active, muted)}
              style={active ? { backgroundColor: "var(--accent)" } : undefined}
            >
              <Icon className="shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="my-4 border-t border-black/10 dark:border-white/10" />

      {/* Secondary nav */}
      <nav className="space-y-1">
        <Link
          href={`${base}/pricing/`}
          aria-current={isActive(`${base}/pricing/`) ? "page" : undefined}
          className={itemClass(isActive(`${base}/pricing/`))}
          style={isActive(`${base}/pricing/`) ? { backgroundColor: "var(--accent)" } : undefined}
        >
          <PricingIcon className="shrink-0" />
          <span>Pricing</span>
        </Link>
        <Link href={`/${appSlug}/blog/`} className={itemClass(false)}>
          <ContactIcon className="shrink-0" />
          <span>Contact Us</span>
        </Link>

        {/* Dark mode toggle */}
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

      {/* Account footer */}
      <div className="mt-auto border-t border-black/10 pt-4 dark:border-white/10">
        <Link
          href={`${base}/account/`}
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
