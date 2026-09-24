// Which paid/account features are switched on. Each integration is optional:
// with its env vars missing the site still builds and renders, and the UI
// shows a graceful "coming soon" state instead of a dead button.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
// Supabase's new "publishable" key, falling back to the legacy anon key name.
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Accounts (sign-in) are available. Safe to read on client and server. */
export const accountsEnabled = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

/**
 * Web checkout is available. Stripe keys are server-only, so the public flag
 * is set explicitly once Stripe is configured (see .env.example).
 */
export const checkoutEnabled =
  accountsEnabled && process.env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true";

/** Email capture forms render only once Resend is configured. */
export const emailCaptureEnabled = process.env.NEXT_PUBLIC_EMAIL_CAPTURE_ENABLED === "true";
