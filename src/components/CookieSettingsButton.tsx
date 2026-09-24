"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that reopens the consent banner so visitors can change their mind. */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
