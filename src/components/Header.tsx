"use client";

import Link from "next/link";
import { useState } from "react";
import { apps } from "@/lib/apps";

export default function Header() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#0a0a0a]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          Joyful
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <div
            className="relative"
            onMouseEnter={() => setSwitcherOpen(true)}
            onMouseLeave={() => setSwitcherOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 py-2"
              onClick={() => setSwitcherOpen((v) => !v)}
              aria-expanded={switcherOpen}
            >
              Our apps
              <span aria-hidden>▾</span>
            </button>
            {switcherOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-black/10 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-[#111]">
                {apps.map((app) => (
                  <Link
                    key={app.slug}
                    href={`/${app.slug}/`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <span className="text-xl" aria-hidden>
                      {app.flagEmoji}
                    </span>
                    <span>
                      <span className="block font-semibold">{app.name}</span>
                      <span className="block text-xs opacity-70">{app.examName}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/tools/" className="py-2">
            Tools
          </Link>
          <Link href="/blog/" className="py-2">
            Blog
          </Link>
          <Link href="/about/" className="py-2">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#apps"
            className="hidden rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide text-white sm:inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get started
          </Link>
          <button
            type="button"
            className="text-xl md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/10 px-4 py-3 text-sm font-medium md:hidden dark:border-white/10">
          {apps.map((app) => (
            <Link key={app.slug} href={`/${app.slug}/`} className="py-2">
              {app.flagEmoji} {app.name}
            </Link>
          ))}
          <Link href="/tools/" className="py-2">
            Tools
          </Link>
          <Link href="/blog/" className="py-2">
            Blog
          </Link>
          <Link href="/about/" className="py-2">
            About
          </Link>
        </nav>
      )}
    </header>
  );
}
