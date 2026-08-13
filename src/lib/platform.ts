// Shared client-side OS sniff used by the "Get app" button and the /get/
// smart-link page, so both route a visitor to the same store for a given device.

export type Platform = "ios" | "android" | "desktop";

/**
 * Best-effort platform detection. Must run on the client (reads `navigator`);
 * returns "desktop" during SSR. iPadOS 13+ reports as desktop Safari, so a
 * touch-capable "Mac" is treated as iOS.
 */
export function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/android/i.test(ua)) return "android";
  const iOSLike =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (iOSLike) return "ios";
  return "desktop";
}

/** The store URL for a device, or null when that platform has no listing yet. */
export function storeUrlForPlatform(
  platform: Platform,
  appStoreUrl: string | null,
  playStoreUrl: string | null,
): string | null {
  if (platform === "ios") return appStoreUrl;
  if (platform === "android") return playStoreUrl;
  return null;
}
