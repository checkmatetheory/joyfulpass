"use client";

import { useEffect, useState } from "react";
import type { AppRecord } from "@/lib/apps";
import StoreBadges from "@/components/StoreBadges";

function DownloadGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/**
 * A persistent "Get {app}" pill for the exam shell, sitting next to Go Pro. On
 * click it opens a Clubhouse-style modal with a QR code: a phone camera scans it
 * and lands on the device-routing smart link (/get/{brand}/), which bounces to
 * the right store. The modal also shows the store badges as a direct fallback
 * for anyone already on their phone.
 *
 * Renders nothing until the app has at least one store link. `qrDataUri` and
 * `smartLink` are generated at build time by the Server Component that mounts
 * this button, so no QR library reaches the browser.
 */
export default function GetAppButton({
  app,
  qrDataUri,
  smartLink,
}: {
  app: AppRecord;
  qrDataUri: string;
  smartLink: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the modal is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!app.appStoreUrl && !app.playStoreUrl) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 py-2 pl-3 pr-4 text-sm font-semibold text-white shadow-lg shadow-black/10 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-neutral-900 dark:ring-white/10"
      >
        <DownloadGlyph className="h-4 w-4" />
        <span>
          Get <span className="hidden sm:inline">{app.shortName}</span>
          <span className="sm:hidden">app</span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Download ${app.name}`}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div
            className="relative w-full max-w-sm rounded-[2.25rem] p-7 text-center shadow-2xl"
            style={{
              background: "linear-gradient(160deg, var(--accent), var(--accent-dark))",
              color: "var(--accent-foreground)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-current/80 transition hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <h2 className="text-xl font-extrabold tracking-tight">Get {app.name}</h2>
            <p className="mx-auto mt-1.5 max-w-[16rem] text-sm opacity-90">
              Scan the code with your phone camera to download {app.name}.
            </p>

            <div className="mx-auto mt-6 w-fit rounded-3xl bg-white p-5 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element -- QR is a build-time data-URI SVG; next/image adds no value */}
              <img
                src={qrDataUri}
                alt={`QR code to download ${app.name}`}
                width={196}
                height={196}
                className="h-44 w-44"
              />
            </div>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide opacity-80">
              <span className="h-px w-6 bg-current/40" />
              or open on this device
              <span className="h-px w-6 bg-current/40" />
            </div>

            <StoreBadges app={app} className="mt-4" />

            <a
              href={smartLink}
              className="mt-5 inline-block text-xs font-medium underline decoration-current/40 underline-offset-4 opacity-80 transition hover:opacity-100"
            >
              Not sure which one? Use the smart link →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
