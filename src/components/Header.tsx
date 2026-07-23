"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { apps } from "@/lib/apps";

const LOGO_URL = "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";

export default function Header() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Disappear while actively scrolling; reappear a moment after scrolling stops.
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 40) {
        setHidden(false);
      } else {
        setHidden(true);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => setHidden(false), 250);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-transparent text-white opacity-75 transition-[transform,opacity,background-color] duration-300 hover:bg-[#2E1065]/70 hover:opacity-100 hover:backdrop-blur-sm ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-[120px] max-w-[1600px] items-center justify-between px-4 sm:px-8">
        {/* Far left: logo */}
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

        {/* Center: nav links */}
        <nav className="hidden items-center gap-7 text-base font-bold md:flex">
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
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-xl border border-black/10 bg-white p-2 text-black shadow-lg">
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

        {/* Far right: Get started (desktop) / menu button (mobile) */}
        <div className="flex items-center">
          <Link
            href="/#apps"
            className="hidden rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide text-white md:inline-block"
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
