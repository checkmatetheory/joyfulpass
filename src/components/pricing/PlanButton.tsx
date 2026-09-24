"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";

type Props = {
  appSlug: string;
  tierId: "weekly" | "monthly" | "yearly";
  price: number;
  currency: string;
  label: string;
  highlighted: boolean;
  /** Stripe + accounts configured? If not, show a disabled "opening soon" state. */
  enabled: boolean;
};

/**
 * Starts web checkout for a plan. Signed-out visitors are sent to sign in
 * first; the sign-in link brings them back with ?plan=<tier>, and this button
 * then continues straight into checkout so the purchase isn't interrupted.
 */
export default function PlanButton({ appSlug, tierId, price, currency, label, highlighted, enabled }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resumed = useRef(false);

  async function startCheckout(resuming = false) {
    if (!resuming) track("select_plan", { app: appSlug, plan: tierId, value: price, currency });
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app: appSlug, tier: tierId }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; signIn?: string; error?: string };
      if (res.status === 401 && data.signIn) {
        window.location.href = data.signIn;
        return;
      }
      if (data.url) {
        track("begin_checkout", { app: appSlug, plan: tierId, value: price, currency });
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    }
    setBusy(false);
  }

  // Resume checkout after sign-in (?plan=<tier>), once.
  useEffect(() => {
    if (!enabled || resumed.current) return;
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan !== tierId) return;
    resumed.current = true;
    const t = setTimeout(() => void startCheckout(true), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, tierId]);

  if (!enabled) {
    return (
      <div className="mt-6">
        <button
          type="button"
          disabled
          className={`w-full cursor-not-allowed rounded-xl py-3 text-sm font-bold opacity-70 ${
            highlighted ? "bg-white text-[color:var(--accent-dark)]" : "bg-black/10 dark:bg-white/10"
          }`}
        >
          Web checkout opening soon
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => void startCheckout()}
        disabled={busy}
        className={`w-full rounded-xl py-3 text-sm font-bold transition hover:opacity-90 disabled:opacity-60 ${
          highlighted ? "bg-white text-[color:var(--accent-dark)]" : "text-white"
        }`}
        style={highlighted ? undefined : { backgroundColor: "var(--accent)" }}
      >
        {busy ? "Opening secure checkout…" : label}
      </button>
      {error && (
        <p role="alert" className={`mt-2 text-xs ${highlighted ? "text-white" : "text-red-600"}`}>
          {error}
        </p>
      )}
    </div>
  );
}
