"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppRecord } from "@/lib/apps";
import StoreBadges from "@/components/StoreBadges";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { SITE_NAME } from "@/lib/site";

/**
 * A consistent "Download {App}" prompt pinned to the bottom of every in-app
 * screen (web + mobile), with the coloured app-store badges, plus the legal
 * row (privacy, terms, cookie settings) the exam shell otherwise lacks.
 */
export default function ExamDownloadFooter({ app }: { app: AppRecord }) {
  const pathname = usePathname();
  const hasStores = Boolean(app.appStoreUrl || app.playStoreUrl);
  // On pricing and checkout pages the store prompt pulls buyers away from the
  // web checkout — keep just the legal row there.
  const showDownload = !/\/pricing(\/|$)/.test(pathname ?? "");

  return (
    <footer className="mt-10 border-t border-black/10 px-5 py-10 text-center dark:border-white/10">
      {showDownload && hasStores && (
        <>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Download {app.name}</h2>
          <StoreBadges app={app} className="mt-5" />
        </>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs opacity-60">
        <Link href="/privacy-policy/" className="hover:underline">
          Privacy
        </Link>
        <Link href="/terms/" className="hover:underline">
          Terms
        </Link>
        <CookieSettingsButton className="hover:underline" />
        <span>
          {app.name} is an independent study app by {SITE_NAME}, not affiliated with any government
          body.
        </span>
      </div>
    </footer>
  );
}
