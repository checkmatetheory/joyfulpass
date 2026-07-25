import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import { pricingPath } from "@/lib/urls";

export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

export default async function AccountPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-xl px-5 py-8 sm:px-10">
      <DashboardBreadcrumb app={app} current="Account" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Account</h1>
      <p className="mt-3 opacity-70">
        Sign in to save your progress across devices and carry your Pro access between the app and
        the web.
      </p>

      {/* Real auth (Firebase email/Google/Apple) + Stripe entitlement sync
          arrive in the monetization phase. This is the placeholder shell. */}
      <div className="mt-8 rounded-2xl border border-black/10 p-7 dark:border-white/10">
        <div className="space-y-3">
          <button className="w-full rounded-lg border border-black/15 py-2.5 text-sm font-bold dark:border-white/15">
            Continue with Google
          </button>
          <button className="w-full rounded-lg border border-black/15 py-2.5 text-sm font-bold dark:border-white/15">
            Continue with Apple
          </button>
          <button
            className="w-full rounded-lg py-2.5 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Sign in with email
          </button>
        </div>
        <p className="mt-4 text-center text-xs opacity-50">Sign-in isn&rsquo;t wired up in this preview yet.</p>
      </div>

      <p className="mt-6 text-sm opacity-70">
        Looking for plans?{" "}
        <Link href={pricingPath(app)} className="font-bold" style={{ color: "var(--accent)" }}>
          See {app.name} Pro
        </Link>
        .
      </p>
    </div>
  );
}
