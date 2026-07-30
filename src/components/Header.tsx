"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { apps } from "@/lib/apps";
import { examHub } from "@/lib/urls";
import { LOGO_URL } from "@/lib/site";

const HEADER_REVEAL_DELAY_MS = 750;

export default function Header() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 12) {
        setHidden(false);
        return;
      }

      setHidden(true);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = setTimeout(() => setHidden(false), HEADER_REVEAL_DELAY_MS);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-[#2E1065]/90 text-white shadow-lg shadow-[#2E1065]/10 backdrop-blur-md transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto grid h-[72px] max-w-[1800px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 sm:h-20 sm:px-6 lg:px-10">
        {/* Far left: logo */}
        <Link
          href="/"
          className="col-start-1 flex min-w-0 items-center justify-self-start"
          aria-label="Joyful home"
        >
          <Image
            src={LOGO_URL}
            alt="Joyful"
            width={400}
            height={120}
            className="-translate-y-1 h-16 w-auto sm:h-24"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Center: nav links */}
        <nav className="col-start-2 hidden -translate-y-1 items-center gap-8 text-sm font-bold lg:flex" aria-label="Primary navigation">
          <div
            className="relative"
            onMouseEnter={() => setSwitcherOpen(true)}
            onMouseLeave={() => setSwitcherOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 rounded-md py-2 outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setSwitcherOpen((v) => !v)}
              aria-expanded={switcherOpen}
              aria-controls="app-switcher-menu"
            >
              Our apps
              <span aria-hidden>▾</span>
            </button>
            {switcherOpen && (
              <div
                id="app-switcher-menu"
                className="absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-xl border border-black/10 bg-white p-2 text-black shadow-xl"
              >
                {apps.map((app) => (
                  <Link
                    key={app.slug}
                    href={examHub(app)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 outline-none hover:bg-black/5 focus-visible:bg-black/5"
                    onClick={() => setSwitcherOpen(false)}
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
          <Link href="/tools/" className="rounded-md py-2 transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-white">
            Tools
          </Link>
          <Link href="/blog/" className="rounded-md py-2 transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-white">
            Blog
          </Link>
          <Link href="/about/" className="rounded-md py-2 transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-white">
            About
          </Link>
        </nav>

        {/* Far right: Get started (desktop) / menu button (mobile) */}
        <div className="col-start-3 flex items-center justify-self-end">
          <Link
            href="/#apps"
            className="hidden -translate-y-1 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-transform hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-white lg:inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Get started
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="flex max-h-[calc(100dvh-72px)] flex-col gap-1 overflow-y-auto border-t border-white/15 px-4 py-4 text-sm font-semibold lg:hidden"
          aria-label="Mobile navigation"
        >
          {apps.map((app) => (
            <Link key={app.slug} href={examHub(app)} className="py-2" onClick={() => setMenuOpen(false)}>
              {app.flagEmoji} {app.name}
            </Link>
          ))}
          <Link href="/tools/" className="py-2" onClick={() => setMenuOpen(false)}>
            Tools
          </Link>
          <Link href="/blog/" className="py-2" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/about/" className="py-2" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link
            href="/#apps"
            className="mt-2 rounded-full px-5 py-3 text-center text-xs font-bold uppercase tracking-wide"
            style={{ backgroundColor: "var(--accent)" }}
            onClick={() => setMenuOpen(false)}
          >
            Get started
          </Link>
        </nav>
      )}
    </header>
  );
}
