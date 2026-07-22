"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apps } from "@/lib/apps";
import Switch from "@/components/ui/sky-toggle";

const LOGO_URL = "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";

export default function Header() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#2E1065] text-white">
      <div className="relative flex h-28 items-center px-4 sm:px-8">
        {/* Absolutely-centered logo + nav group: logo sits just left of the centered nav links,
            independent of the right-side controls so they never fight for space. */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src={LOGO_URL}
              alt="Joyful"
              width={420}
              height={96}
              className="h-24 w-auto"
              priority
            />
          </Link>

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
        </div>

        {/* Right-side controls in normal flow (ml-auto), so the centered group floats over the row */}
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:block">
            <Switch />
          </div>
          <Link
            href="/#apps"
            className="hidden rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-white sm:inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get started
          </Link>
          <button
            type="button"
            className="text-2xl md:hidden"
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
