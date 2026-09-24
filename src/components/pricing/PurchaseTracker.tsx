"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires the `purchase` conversion once per checkout session (refresh-safe). */
export default function PurchaseTracker({
  sessionId,
  appSlug,
  plan,
  value,
  currency,
}: {
  sessionId: string;
  appSlug: string;
  plan: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    const key = `joyful_purchase_${sessionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked — still track once per page load.
    }
    track("purchase", { app: appSlug, plan, value, currency, transaction_id: sessionId });
  }, [sessionId, appSlug, plan, value, currency]);
  return null;
}
