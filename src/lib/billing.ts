// Billing configuration shared by checkout, the webhook and the UI. Prices
// live in Stripe (source of truth at checkout); the site finds them by
// **lookup key** `{app}_{tier}`, e.g. `britpass_yearly`, so no price IDs are
// hard-coded. Each price carries currency options for GBP/CAD/EUR.
import type { PricingTier } from "@/lib/pricing";

export type TierId = PricingTier["id"];

/** Stripe lookup key for an app's plan. */
export function lookupKey(appSlug: string, tier: TierId): string {
  return `${appSlug}_${tier}`;
}

/** Checkout currency per app (ISO 4217, lowercase as Stripe expects). */
const CHECKOUT_CURRENCY: Record<string, string> = {
  britpass: "gbp",
  canadapass: "cad",
  germanpass: "eur",
  serupass: "gbp",
};

export function checkoutCurrency(appSlug: string): string {
  return CHECKOUT_CURRENCY[appSlug] ?? "gbp";
}

/** Subscription statuses that grant Pro. */
export const ACTIVE_STATUSES = ["active", "trialing"] as const;
