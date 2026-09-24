"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { track } from "@/lib/track";

/**
 * A link to an app's Pro pricing page that records a `go_pro_click` with the
 * placement it came from, so we can see which surfaces actually sell.
 */
export default function ProLink({
  href,
  appSlug,
  location,
  className,
  style,
  children,
}: {
  href: string;
  appSlug: string;
  /** Where on the site this CTA sits, e.g. "hub_card", "chapter_banner". */
  location: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => track("go_pro_click", { app: appSlug, location })}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
