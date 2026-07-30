// Pricing model, shared by the pricing page and the "Go Pro" CTA. Mirrors the
// proven three-tier / per-day psychology (weekly, monthly, yearly) with the
// yearly plan framed as the best value. Prices are illustrative until checkout
// (Stripe) is wired in the auth/entitlement phase.

export type PricingTier = {
  id: "weekly" | "monthly" | "yearly";
  /** Marketing name shown at the top of the card. */
  name: string;
  /** Total charged per billing period. */
  price: number;
  /** Human period label, e.g. "week". */
  period: string;
  /** Days in the period — used to derive the headline per-day price. */
  days: number;
  /** Free-trial length in days (0 = no trial). */
  freeTrialDays: number;
  /** The centre, visually promoted card. */
  highlighted: boolean;
  /** Corner badge, e.g. "Most popular" / "Best value". */
  badge?: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "weekly",
    name: "Flexible",
    price: 5.99,
    period: "week",
    days: 7,
    freeTrialDays: 0,
    highlighted: false,
  },
  {
    id: "monthly",
    name: "Most popular",
    price: 12.99,
    period: "month",
    days: 30,
    freeTrialDays: 3,
    highlighted: true,
    badge: "Recommended",
  },
  {
    id: "yearly",
    name: "Best value",
    price: 34.99,
    period: "year",
    days: 365,
    freeTrialDays: 3,
    highlighted: false,
  },
];

// Per-app currency symbol (illustrative). Keyed by app slug.
const CURRENCY: Record<string, string> = {
  britpass: "£",
  canadapass: "C$",
  germanpass: "€",
};

export function currencyFor(appSlug: string): string {
  return CURRENCY[appSlug] ?? "£";
}

/** Headline per-day price for a tier — the anchor that makes the plan feel small. */
export function perDay(tier: PricingTier): number {
  return tier.price / tier.days;
}

// Everything Pro unlocks, shown once beneath the tiers.
export const PRO_FEATURES = [
  "Every mock test & the full question bank",
  "Progress saved across all your devices",
  "Complete mistake history + spaced repetition",
  "Readiness tracker & analytics",
  "Ad-free, offline study guide",
];

// What stays free forever.
export const FREE_FEATURES = [
  "One free mock test set per topic",
  "Sample questions in every chapter",
  "Study guide & revision notes",
  "Last session's mistakes",
];
