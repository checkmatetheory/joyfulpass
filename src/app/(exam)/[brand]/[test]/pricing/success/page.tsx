import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppByExamSlug } from "@/lib/apps";
import { getStripe } from "@/lib/stripe";
import PurchaseTracker from "@/components/pricing/PurchaseTracker";
import { accountPath, practicePath, pricingPath } from "@/lib/urls";

export const metadata: Metadata = { title: "Welcome to Pro", robots: { index: false, follow: false } };

/**
 * Stripe Checkout lands here with ?session_id=… . We confirm the session with
 * Stripe server-side (never trust the query string alone). Access itself is
 * granted by the webhook, which may land a moment after this page.
 */
export default async function CheckoutSuccessPage({
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
  const sessionId = typeof query.session_id === "string" ? query.session_id : null;

  const stripe = getStripe();
  const session =
    stripe && sessionId?.startsWith("cs_")
      ? await stripe.checkout.sessions.retrieve(sessionId).catch(() => null)
      : null;
  const confirmed = session?.status === "complete" && session.metadata?.app_slug === app.slug;

  if (!confirmed || !session) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-10">
        <h1 className="text-3xl font-extrabold">We couldn&rsquo;t confirm that checkout</h1>
        <p className="mt-3 opacity-70">
          If you were charged, your Pro access will appear in your account within a minute or two.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={accountPath(app)} className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--accent)" }}>
            Go to your account
          </Link>
          <Link href={pricingPath(app)} className="rounded-full border-2 px-6 py-3 text-sm font-bold" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            Back to plans
          </Link>
        </div>
      </div>
    );
  }

  const value = (session.amount_total ?? 0) / 100;
  const currency = (session.currency ?? "gbp").toUpperCase();

  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center sm:px-10">
      <PurchaseTracker
        sessionId={session.id}
        appSlug={app.slug}
        plan={session.metadata?.tier ?? "unknown"}
        value={value}
        currency={currency}
      />
      <p className="text-5xl" aria-hidden>
        🎉
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome to {app.name} Pro</h1>
      <p className="mt-3 opacity-75">
        Your plan is active{session.customer_details?.email ? ` for ${session.customer_details.email}` : ""}.
        A receipt is on its way to your inbox.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={practicePath(app)} className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: "var(--accent)" }}>
          Start practising
        </Link>
        <Link href={accountPath(app)} className="rounded-full border-2 px-6 py-3 text-sm font-bold" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          Your account
        </Link>
      </div>
    </div>
  );
}
