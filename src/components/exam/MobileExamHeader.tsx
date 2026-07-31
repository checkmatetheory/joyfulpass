"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AppRecord } from "@/lib/apps";
import { LOGO_PURPLE_URL, LOGO_WHITE_URL } from "@/lib/site";
import ExamSidebar from "@/components/exam/ExamSidebar";
import GoProButton from "@/components/exam/GoProButton";

const REVEAL_DELAY_MS = 650;

/**
 * Mobile-only top bar for the exam shell (the sidebar is hidden below md). Shows
 * the Joyful logo top-left, the Go Pro CTA, and a hamburger that opens the full
 * sidebar nav as a drawer. Auto-hides while scrolling and slides back in once
 * scrolling stops, so more content is visible on small screens.
 */
export default function MobileExamHeader({ app }: { app: AppRecord }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      // Never hide near the very top, and keep it shown while the drawer is open.
      if (window.scrollY < 12 || open) {
        setHidden(false);
        return;
      }
      setHidden(true);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      stopTimer.current = setTimeout(() => setHidden(false), REVEAL_DELAY_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (stopTimer.current) clearTimeout(stopTimer.current);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex items-center justify-between gap-2 border-b border-black/10 bg-[var(--surface-cream)] px-4 py-2.5 transition-transform duration-300 md:hidden dark:border-white/10 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Link href="/" aria-label="Joyful home" className="flex items-center">
          {/* Purple on light, white on dark — stays visible either way. */}
          <Image
            src={LOGO_PURPLE_URL}
            alt=""
            width={360}
            height={110}
            className="h-7 w-auto dark:hidden"
            style={{ width: "auto" }}
            priority
          />
          <Image
            src={LOGO_WHITE_URL}
            alt=""
            width={360}
            height={110}
            className="hidden h-7 w-auto dark:block"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <GoProButton app={app} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          {/* Any tap inside (including a nav link) closes the drawer. */}
          <div className="absolute inset-y-0 left-0" onClick={() => setOpen(false)}>
            <ExamSidebar app={app} />
          </div>
        </div>
      )}
    </>
  );
}
