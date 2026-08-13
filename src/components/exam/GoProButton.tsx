"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppRecord } from "@/lib/apps";
import { pricingPath } from "@/lib/urls";

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2.6 8.2l4.3 3 4.2-6.4a1 1 0 0 1 1.7 0l4.2 6.4 4.3-3a1 1 0 0 1 1.5 1.1L20.9 19a1 1 0 0 1-1 .8H4.1a1 1 0 0 1-1-.8L1.1 9.3a1 1 0 0 1 1.5-1.1Z" />
    </svg>
  );
}

/**
 * A compact, modern "Go Pro" pill pinned to the top-right of every in-app
 * screen. Hidden on the pricing page itself (where it would be redundant).
 */
export default function GoProButton({ app }: { app: AppRecord }) {
  const pathname = usePathname();
  const href = pricingPath(app);
  const normalized = href.replace(/\/$/, "");

  if (pathname === normalized || pathname === href) return null;

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full py-2 pl-2.5 pr-4 text-sm font-semibold text-white shadow-lg shadow-black/10 ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:shadow-xl"
      style={{ backgroundColor: "var(--accent)" }}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <Crown className="h-3.5 w-3.5 text-amber-300" />
      </span>
      Go Pro
    </Link>
  );
}
