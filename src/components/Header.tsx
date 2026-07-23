"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apps } from "@/lib/apps";
import Switch from "@/components/ui/sky-toggle";
import { useTheme } from "@/components/ThemeProvider";

const LOGO_URL = "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";

export default function Header() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-[#2E1065] text-white">
      {/* 3-column grid: logo centered in the left third (reads as center-left),
          nav links centered in the middle, and a right cell that spreads the
          Get started button (center-right) apart from the theme toggle (far right). */}
      <div className="mx-auto grid h-32 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
        {/* Left: logo, centered within its column */}
        <div className="justify-self-center">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="Joyful"
              width={490}
              height={112}
              className="h-28 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: nav links */}
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
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
                <div className="absolute left-0 top-full w-72 rounded-xl border border-black/10 bg-white p-2 text-black shadow-lg">
                  {apps.map((app) => (
                    <Link
                      key={app.slug}
                      href={`/${app.slug}/`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-black/5"
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

        {/* Right cell: Get started centered within the cell (reads as center-right),
            theme toggle pinned alone to the far right edge. */}
        <div className="relative flex items-center justify-center">
          <Link
            href="/#apps"
            className="hidden rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-white md:inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get started
          </Link>
          <div className="absolute right-0 hidden md:block">
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
          </div>
          <button
            type="button"
            className="absolute right-0 text-2xl md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/15 px-4 py-3 text-sm font-semibold md:hidden">
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
