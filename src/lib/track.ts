// Conversion event tracking. One call fans out to whichever pixels the visitor
// has consented to (see Analytics.tsx) — GA4, Meta and TikTok. If a pixel isn't
// loaded (no consent, no env ID, ad-blocker) its call is simply skipped.

export type TrackEvent =
  | "store_click" // App Store / Google Play badge
  | "get_app_click" // "Get {app}" pill
  | "go_pro_click" // any CTA that leads to pricing
  | "select_plan" // a plan button on the pricing page
  | "begin_checkout"
  | "purchase"
  | "sign_up"
  | "generate_lead"
  | "quiz_start"
  | "quiz_complete";

type Params = Record<string, string | number | boolean | undefined>;

// Map our events onto each network's standard events so they can be used for
// ad optimisation; anything unmapped goes through as a custom event.
const META: Partial<Record<TrackEvent, string>> = {
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  sign_up: "CompleteRegistration",
  generate_lead: "Lead",
  go_pro_click: "ViewContent",
};
const TIKTOK: Partial<Record<TrackEvent, string>> = {
  begin_checkout: "InitiateCheckout",
  purchase: "CompletePayment",
  sign_up: "CompleteRegistration",
  generate_lead: "SubmitForm",
  store_click: "Download",
  get_app_click: "ClickButton",
  go_pro_click: "ClickButton",
};

type PixelWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  ttq?: { track?: (event: string, params?: Params) => void };
};

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as PixelWindow;
  try {
    w.gtag?.("event", event, params);
    const meta = META[event];
    if (meta) w.fbq?.("track", meta, params);
    else w.fbq?.("trackCustom", event, params);
    w.ttq?.track?.(TIKTOK[event] ?? event, params);
  } catch {
    // Tracking must never break the UI.
  }
}
