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
    name: "Last-minute",
    price: 5.99,
    period: "week",
    days: 7,
    freeTrialDays: 0,
    highlighted: false,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: 12.99,
    period: "month",
    days: 30,
    freeTrialDays: 3,
    highlighted: false,
  },
  {
    // The anchor: lowest per-day price, visually promoted.
    id: "yearly",
    name: "Best value",
    price: 34.99,
    period: "year",
    days: 365,
    freeTrialDays: 3,
    highlighted: true,
    badge: "Best value",
  },
];

/** The promoted plan — used for "from X/day" copy across the site. */
export function anchorTier(): PricingTier {
  return PRICING_TIERS.find((t) => t.highlighted) ?? PRICING_TIERS[PRICING_TIERS.length - 1];
}

// Per-app currency symbol (illustrative). Keyed by app slug.
const CURRENCY: Record<string, string> = {
  britpass: "£",
  canadapass: "C$",
  germanpass: "€",
  serupass: "£",
};

export function currencyFor(appSlug: string): string {
  return CURRENCY[appSlug] ?? "£";
}

/** Headline per-day price for a tier — the anchor that makes the plan feel small. */
export function perDay(tier: PricingTier): number {
  return tier.price / tier.days;
}

// Everything Pro unlocks on the web. Keep this list to what actually ships —
// no promises the product doesn't keep.
export const PRO_FEATURES = [
  "The full question bank for every topic",
  "Full-length timed mock tests at real exam length",
  "Your scores and progress saved to your account",
  "Complete mistake history + a mistakes-only test",
  "A readiness score so you know when to book",
];

// What stays free forever.
export const FREE_FEATURES = [
  "Short practice sets for every topic",
  "Study guide, revision notes & cheat sheet",
  "Instant scoring with an explanation for every answer",
];
