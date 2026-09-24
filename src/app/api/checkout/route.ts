import { NextResponse } from "next/server";
import { getApp } from "@/lib/apps";
import { PRICING_TIERS } from "@/lib/pricing";
import { checkoutCurrency, lookupKey } from "@/lib/billing";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { accountPath, pricingPath } from "@/lib/urls";

/**
 * POST { app, tier } → { url } of a Stripe Checkout Session for that app's
 * Pro plan. 401 + { signIn } when the visitor isn't signed in yet.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = await createSupabaseServerClient();
  if (!stripe || !supabase) {
    return NextResponse.json({ error: "Web checkout isn't available yet." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { app?: string; tier?: string } | null;
  const app = body?.app ? getApp(body.app) : undefined;
  const tier = PRICING_TIERS.find((t) => t.id === body?.tier);
  if (!app || !tier) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    const next = encodeURIComponent(`${pricingPath(app)}?plan=${tier.id}`);
    return NextResponse.json({ signIn: `${accountPath(app)}?next=${next}` }, { status: 401 });
  }

  try {
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKey(app.slug, tier.id)],
      active: true,
      limit: 1,
    });
    const price = prices.data[0];
    if (!price) {
      console.error(`[checkout] No active Stripe price with lookup key ${lookupKey(app.slug, tier.id)}`);
      return NextResponse.json({ error: "This plan isn't available right now." }, { status: 500 });
    }

    // Reuse the buyer's Stripe customer if they've subscribed before.
    const admin = createSupabaseAdminClient();
    const existing = admin
      ? await admin
          .from("subscriptions")
          .select("stripe_customer_id")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle()
      : null;
    const customerId = (existing?.data as { stripe_customer_id?: string } | null)?.stripe_customer_id;

    const origin = new URL(request.url).origin;
    const metadata = { user_id: user.id, app_slug: app.slug, tier: tier.id };

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price.id, quantity: 1 }],
      currency: checkoutCurrency(app.slug),
      ...(customerId
        ? { customer: customerId, customer_update: { address: "auto", name: "auto" } }
        : { customer_email: user.email }),
      client_reference_id: user.id,
      metadata,
      subscription_data: {
        metadata,
        ...(tier.freeTrialDays > 0 && { trial_period_days: tier.freeTrialDays }),
      },
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      // Requires a Terms of Service URL in the Stripe dashboard (Settings → Public details).
      consent_collection: { terms_of_service: "required" },
      success_url: `${origin}${pricingPath(app)}success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${pricingPath(app)}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[checkout] Stripe error", error);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again." }, { status: 500 });
  }
}
