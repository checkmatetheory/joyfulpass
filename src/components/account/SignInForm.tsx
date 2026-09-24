"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { track } from "@/lib/track";

/**
 * Passwordless sign-in: we email a one-time link. New emails create an
 * account automatically, so sign-in and sign-up are the same step.
 */
export default function SignInForm({ next, appSlug }: { next: string; appSlug: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    setState("sending");
    const redirect = `${window.location.origin}/auth/callback/?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirect, shouldCreateUser: true },
    });
    if (error) {
      setState("error");
      setMessage(
        error.status === 429
          ? "Too many attempts — please wait a minute and try again."
          : "We couldn't send your link. Check the email address and try again.",
      );
      return;
    }
    track("sign_up", { app: appSlug, method: "magic_link" });
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-black/10 p-7 text-center dark:border-white/10">
        <p className="text-3xl" aria-hidden>
          📬
        </p>
        <p className="mt-3 text-lg font-bold">Check your inbox</p>
        <p className="mt-1 text-sm opacity-70">
          We sent a sign-in link to <strong>{email}</strong>. Open it on this device to continue.
          It can take a minute — check spam if it doesn&rsquo;t arrive.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-semibold underline underline-offset-4"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 p-7 dark:border-white/10">
      <label htmlFor="email" className="text-sm font-bold">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm dark:border-white/20 dark:bg-white/5"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-4 w-full rounded-lg py-3 text-sm font-bold text-white disabled:opacity-60"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {state === "sending" ? "Sending your link…" : "Email me a sign-in link"}
      </button>
      {state === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {message}
        </p>
      )}
      <p className="mt-4 text-xs opacity-55">
        No password needed. New here? This creates your account. See our{" "}
        <Link href="/privacy-policy/" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
