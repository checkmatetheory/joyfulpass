"use client";

import { useState } from "react";

/** Opens the Stripe customer portal (cancel, change plan, card, invoices). */
export default function ManageBillingButton({ returnTo }: { returnTo: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function open() {
    setBusy(true);
    setError("");
    const res = await fetch("/api/billing-portal/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ returnTo }),
    });
    const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    setBusy(false);
    setError(data.error ?? "Couldn't open billing. Please try again.");
  }

  return (
    <div>
      <button
        type="button"
        onClick={open}
        disabled={busy}
        className="rounded-full border-2 px-5 py-2.5 text-sm font-bold disabled:opacity-60"
        style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
      >
        {busy ? "Opening…" : "Manage billing"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
