"use client";

import { useEffect, useState } from "react";
import type { AppRecord } from "@/lib/apps";
import StoreBadges from "@/components/StoreBadges";

type Platform = "ios" | "android" | "desktop";

/** Best-effort OS sniff, run once on the client. */
function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  // iPadOS 13+ masquerades as desktop Safari, so also treat a touch-capable
  // "Mac" as iOS.
  const iOSLike =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (iOSLike) return "ios";
  return "desktop";
}

/**
 * The client half of the /get/{brand}/ smart link. On a phone it redirects to
 * the matching store the instant it mounts; on desktop (or when the matching
 * store link is missing) it shows a branded scan-to-download fallback with the
 * QR code and both store badges.
 */
export default function SmartRedirect({
  app,
  qrDataUri,
}: {
  app: AppRecord;
  qrDataUri: string;
}) {
  // Start in a neutral "checking" state so the very first paint (also what a
  // crawler sees) is the redirecting spinner, not a flash of the desktop page.
  const [resolved, setResolved] = useState<{ platform: Platform; target: string | null } | null>(
    null,
  );

  useEffect(() => {
    const platform = detectPlatform();
    const target =
      platform === "ios"
        ? app.appStoreUrl
        : platform === "android"
          ? app.playStoreUrl
          : null;
    // Redirect immediately for phones — `replace` keeps this interstitial out of
    // history so Back doesn't bounce them here again.
    if (target) window.location.replace(target);
    // Reveal the resolved view on the next frame so we're not calling setState
    // synchronously inside the effect body (which would cascade-render). The
    // redirect above has already fired, so mobile speed is unaffected.
    const id = requestAnimationFrame(() => setResolved({ platform, target }));
    return () => cancelAnimationFrame(id);
  }, [app.appStoreUrl, app.playStoreUrl]);

  // Redirecting (or about to): show a spinner + manual fallback link.
  const redirecting = resolved === null || Boolean(resolved.target);
  const target = resolved?.target ?? null;
  const storeName = resolved?.platform === "android" ? "Google Play" : "the App Store";

  if (redirecting) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span
          className="h-11 w-11 animate-spin rounded-full border-[3px] border-current/20"
          style={{ borderTopColor: "var(--accent)" }}
          aria-hidden
        />
        <p className="mt-6 text-lg font-bold tracking-tight">Redirecting you to {storeName}…</p>
        <p className="mt-1 text-sm opacity-60">Taking you to download {app.name}.</p>
        {target && (
          <a
            href={target}
            className="mt-5 text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--accent)" }}
          >
            Click here if you are not redirected automatically
          </a>
        )}
      </main>
    );
  }

  // Desktop / no matching store: scan-to-download fallback.
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-4xl" aria-hidden>
        {app.flagEmoji}
      </p>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Download {app.name}
      </h1>
      <p className="mt-2 max-w-md text-sm opacity-70">{app.tagline}</p>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element -- QR is a build-time data-URI SVG; next/image adds no value */}
        <img
          src={qrDataUri}
          alt={`QR code to download ${app.name}`}
          width={208}
          height={208}
          className="h-52 w-52"
        />
        <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-neutral-800">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
          Scan to download
        </p>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-50">
        <span className="h-px w-8 bg-current/40" />
        or get it directly
        <span className="h-px w-8 bg-current/40" />
      </div>
      <StoreBadges app={app} className="mt-4" />
    </main>
  );
}
