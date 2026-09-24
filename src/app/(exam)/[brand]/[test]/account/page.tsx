import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apps, examPathParams, getAppByExamSlug } from "@/lib/apps";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import SignInForm from "@/components/account/SignInForm";
import ManageBillingButton from "@/components/account/ManageBillingButton";
import { accountsEnabled } from "@/lib/env";
import { getCurrentUser } from "@/lib/supabase/server";
import { getSubscriptions } from "@/lib/entitlements";
import { accountPath, examHub, pricingPath } from "@/lib/urls";

export const dynamicParams = false;
export const metadata: Metadata = { title: "Your account", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return examPathParams();
}

function safeNext(value: string | string[] | undefined, fallback: string): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v && v.startsWith("/") && !v.startsWith("//") ? v : fallback;
}

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  trialing: "Free trial",
  past_due: "Payment due",
  canceled: "Cancelled",
  unpaid: "Unpaid",
  incomplete: "Incomplete",
};

export default async function AccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string; test: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const query = await searchParams;
  const next = safeNext(query.next, examHub(app));
  const authError = query.auth_error === "1";

  if (!accountsEnabled) {
    return (
      <div className="mx-auto max-w-xl px-5 py-8 sm:px-10">
        <DashboardBreadcrumb app={app} current="Account" />
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Account</h1>
        <div className="mt-8 rounded-2xl border border-black/10 p-7 dark:border-white/10">
          <p className="font-bold">Web accounts are opening soon</p>
          <p className="mt-1 text-sm opacity-70">
            You&rsquo;ll be able to save your progress and manage {app.name} Pro here. In the
            meantime, every free practice test works without an account.
          </p>
        </div>
      </div>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-5 py-8 sm:px-10">
        <DashboardBreadcrumb app={app} current="Account" />
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sign in to {app.name}</h1>
        <p className="mt-3 opacity-70">
          Save your scores, keep your mistake history and use {app.name} Pro in your browser.
        </p>
        {authError && (
          <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
            That sign-in link has expired or was already used. Request a new one below.
          </p>
        )}
        <div className="mt-8">
          <SignInForm next={next} appSlug={app.slug} />
        </div>
      </div>
    );
  }

  const subscriptions = await getSubscriptions();
  const appName = (slug: string) => apps.find((a) => a.slug === slug)?.name ?? slug;

  return (
    <div className="mx-auto max-w-xl px-5 py-8 sm:px-10">
      <DashboardBreadcrumb app={app} current="Account" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your account</h1>
      <p className="mt-3 opacity-70">
        Signed in as <strong>{user.email}</strong>
      </p>

      {next !== examHub(app) && (
        <Link
          href={next}
          className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Continue where you left off →
        </Link>
      )}

      <section className="mt-8 rounded-2xl border border-black/10 p-7 dark:border-white/10">
        <h2 className="text-lg font-bold">Your plans</h2>
        {subscriptions.length === 0 ? (
          <p className="mt-2 text-sm opacity-70">
            No Pro plan yet.{" "}
            <Link href={pricingPath(app)} className="font-bold" style={{ color: "var(--accent)" }}>
              See {app.name} Pro
            </Link>
          </p>
        ) : (
          <>
            <ul className="mt-3 space-y-2 text-sm">
              {subscriptions.map((s) => (
                <li key={`${s.app_slug}-${s.status}-${s.current_period_end}`} className="flex justify-between gap-4">
                  <span className="font-semibold">{appName(s.app_slug)} Pro</span>
                  <span className="opacity-70">
                    {STATUS_LABEL[s.status] ?? s.status}
                    {s.current_period_end &&
                      ` · ${s.cancel_at_period_end ? "ends" : "renews"} ${new Date(
                        s.current_period_end,
                      ).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <ManageBillingButton returnTo={accountPath(app)} />
            </div>
          </>
        )}
      </section>

      <form action="/auth/signout/" method="post" className="mt-6">
        <input type="hidden" name="next" value={examHub(app)} />
        <button type="submit" className="text-sm font-semibold underline underline-offset-4 opacity-70">
          Sign out
        </button>
      </form>
    </div>
  );
}
