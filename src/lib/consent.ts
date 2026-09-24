// Cookie-consent state (UK/EU PECR + GDPR). Non-essential analytics and ad
// pixels load only after the visitor opts in; the choice lives in a first-party
// cookie so it survives across pages and silos on the same domain.

export type ConsentChoice = "granted" | "denied";

export const CONSENT_COOKIE = "joyful_consent";
/** Fired on window whenever the choice changes, and to reopen the banner. */
export const CONSENT_EVENT = "joyful:consent";
export const OPEN_CONSENT_EVENT = "joyful:open-consent";

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return (match?.[1] as ConsentChoice | undefined) ?? null;
}

export function writeConsent(choice: ConsentChoice) {
  // 6 months, then ask again (ICO guidance: don't keep consent indefinitely).
  const maxAge = 60 * 60 * 24 * 182;
  document.cookie = `${CONSENT_COOKIE}=${choice}; Path=/; Max-Age=${maxAge}; SameSite=Lax; Secure`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
