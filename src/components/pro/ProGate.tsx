import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import type { ProAccess } from "@/lib/entitlements";
import ProLink from "@/components/ProLink";
import { PRO_FEATURES } from "@/lib/pricing";
import { accountPath, practicePath, pricingPath } from "@/lib/urls";

/**
 * What a non-Pro visitor sees on a Pro page: sign in, or upgrade — always
 * with a free alternative so nobody hits a dead end.
 */
export default function ProGate({
  app,
  access,
  returnTo,
  feature,
}: {
  app: AppRecord;
  access: Exclude<ProAccess, { state: "pro" }>;
  /** Where to come back to after signing in. */
  returnTo: string;
  /** What they were trying to open, e.g. "Full-length mock tests". */
  feature: string;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-black/10 p-8 text-center dark:border-white/10">
      <p className="text-4xl" aria-hidden>
        👑
      </p>
      <h1 className="mt-3 text-2xl font-extrabold">{feature} are part of {app.name} Pro</h1>
      <ul className="mx-auto mt-5 max-w-sm space-y-2 text-left text-sm">
        {PRO_FEATURES.map((f) => (
          <li key={f} className="flex gap-2">
            <span aria-hidden style={{ color: "var(--accent)" }}>
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-col items-center gap-3">
        {access.state === "signed-out" && (
          <>
            <ProLink
              href={pricingPath(app)}
              appSlug={app.slug}
              location="pro_gate"
              className="rounded-full px-6 py-3 text-sm font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              See Pro plans
            </ProLink>
            <Link
              href={`${accountPath(app)}?next=${encodeURIComponent(returnTo)}`}
              className="text-sm font-semibold underline underline-offset-4"
            >
              Already Pro? Sign in
            </Link>
          </>
        )}
        {access.state === "no-pro" && (
          <>
            <ProLink
              href={pricingPath(app)}
              appSlug={app.slug}
              location="pro_gate"
              className="rounded-full px-6 py-3 text-sm font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Upgrade to Pro
            </ProLink>
            <p className="text-xs opacity-60">Signed in as {access.email}</p>
          </>
        )}
        {access.state === "unavailable" && (
          <p className="text-sm opacity-70">Web Pro is opening soon.</p>
        )}
        <Link href={practicePath(app)} className="text-sm opacity-70 hover:underline">
          Or keep going with the free practice tests →
        </Link>
      </div>
    </div>
  );
}
