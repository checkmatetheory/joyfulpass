"use client";

import { useSyncExternalStore } from "react";

type Props = {
  appSlug: string;
  appName: string;
  href: string;
  /** e.g. "Get the app — 4.9★" */
  message: string;
  ctaLabel: string;
};

const DISMISS_EVENT = "joyful-promo-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DISMISS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DISMISS_EVENT, callback);
  };
}

/**
 * Slim, dismissible promo bar that persists across a whole app silo. Dismissal
 * is remembered per-app in localStorage. Read via useSyncExternalStore so there's
 * no setState-in-effect and no hydration flash: the server snapshot is always
 * "not dismissed", then the client reconciles from storage.
 */
export default function PromoBanner({ appSlug, appName, href, message, ctaLabel }: Props) {
  const key = `joyful-promo-dismissed:${appSlug}`;

  const dismissed = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );

  if (dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(key, "1");
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div
      className="flex items-center justify-center gap-3 px-4 py-2 text-center text-sm text-white"
      style={{ backgroundColor: "var(--accent-dark)" }}
    >
      <span className="opacity-90">
        <span aria-hidden>⭐️</span> {message}
      </span>
      <a href={href} className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-black">
        {ctaLabel}
      </a>
      <button
        onClick={dismiss}
        aria-label={`Dismiss ${appName} promo`}
        className="ml-1 text-white/70 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
