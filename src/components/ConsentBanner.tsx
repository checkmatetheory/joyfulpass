"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/**
 * Cookie-consent banner. Shown until the visitor chooses; reopened from the
 * "Cookie settings" links. Rejecting is as easy as accepting (ICO guidance).
 */
export default function ConsentBanner() {
  // "ssr" on the server so the banner never flashes for returning visitors.
  const consent = useSyncExternalStore<ConsentChoice | null | "ssr">(
    subscribe,
    readConsent,
    () => "ssr",
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  if (consent === "ssr" || (consent !== null && !reopened)) return null;

  const choose = (choice: ConsentChoice) => {
    const wasGranted = consent === "granted";
    writeConsent(choice);
    setReopened(false);
    // Pixels that already loaded can't be unloaded — reload to drop them.
    if (wasGranted && choice === "denied") window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[70] rounded-2xl border border-black/10 bg-white p-5 text-sm text-neutral-800 shadow-2xl sm:inset-x-auto sm:left-5 sm:max-w-md dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100"
    >
      <p className="font-bold">Cookies on Joyful</p>
      <p className="mt-1.5 opacity-80">
        We use essential cookies to run the site. With your permission we&rsquo;d also use
        analytics and advertising cookies to see what helps people pass. See our{" "}
        <Link href="/privacy-policy/" className="font-semibold underline underline-offset-2">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-neutral-900 px-5 py-2 font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-current px-5 py-2 font-semibold transition hover:bg-black/5 dark:hover:bg-white/10"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}
