import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApp, getAllAppSlugs } from "@/lib/apps";
import { getAppPath } from "@/lib/urls";
import { qrDataUri } from "@/lib/qr";
import { SITE_URL } from "@/lib/site";
import SmartRedirect from "@/components/get/SmartRedirect";

export const dynamicParams = false;

// A device-routing interstitial, not a destination — keep it out of the index.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return getAllAppSlugs().map((brand) => ({ brand }));
}

/**
 * /get/{brand}/ — the single smart link behind every "Get {app}" button and QR
 * code. The device sniff + redirect happen client-side (this is a static page),
 * so a phone that opens or scans it lands straight in the right store.
 */
export default async function GetAppPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  const app = getApp(brand);
  if (!app) notFound();

  const qr = await qrDataUri(`${SITE_URL}${getAppPath(app)}`);

  return (
    <div
      style={
        {
          "--accent": app.theme.accent,
          "--accent-dark": app.theme.accentDark,
          "--accent-soft": app.theme.accentSoft,
          "--accent-foreground": app.theme.accentForeground,
        } as React.CSSProperties
      }
    >
      <SmartRedirect app={app} qrDataUri={qr} />
    </div>
  );
}
