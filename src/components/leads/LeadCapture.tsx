"use client";

import { useState, type FormEvent } from "react";
import { emailCaptureEnabled } from "@/lib/env";
import { track } from "@/lib/track";

/**
 * "Email me the free cheat sheet" — recovers visitors who aren't ready to buy.
 * Renders nothing until email capture is configured. The cheat sheet email is
 * what they asked for; ongoing study tips need the separate opt-in box.
 */
export default function LeadCapture({
  appSlug,
  testName,
  source,
  heading,
  className = "",
}: {
  appSlug: string;
  testName: string;
  source: "quiz_results" | "cheat_sheet" | "article_end";
  heading?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  if (!emailCaptureEnabled) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setState("sending");
    setError("");
    const res = await fetch("/api/subscribe/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, app: appSlug, source, marketingConsent: consent, company }),
    }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as { ok?: boolean; error?: string } | undefined;
    if (res?.ok && data?.ok) {
      track("generate_lead", { app: appSlug, source });
      setState("done");
    } else {
      setState("error");
      setError(data?.error ?? "Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className={`rounded-2xl border border-black/10 p-5 text-left text-sm dark:border-white/10 ${className}`}>
        <p className="font-bold">📬 On its way</p>
        <p className="mt-1 opacity-70">Check your inbox for your free {testName} cheat sheet.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-black/10 p-5 text-left dark:border-white/10 ${className}`}
    >
      <p className="font-bold">{heading ?? `Get the free ${testName} cheat sheet by email`}</p>
      <p className="mt-1 text-sm opacity-70">Every high-yield fact on one page, sent straight to your inbox.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`lead-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`lead-${source}`}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-black/15 px-4 py-2.5 text-sm dark:border-white/20 dark:bg-white/5"
        />
        {/* Honeypot: hidden from people, tempting to bots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          aria-hidden
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "var(--accent, #7C3AED)" }}
        >
          {state === "sending" ? "Sending…" : "Send it"}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs opacity-75">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        Also send me occasional study tips. Unsubscribe anytime.
      </label>
      {state === "error" && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
