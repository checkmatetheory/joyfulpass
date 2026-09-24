import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Admin = NonNullable<ReturnType<typeof createSupabaseAdminClient>>;

/**
 * Stripe → Supabase subscription sync. Register the endpoint WITH the trailing
 * slash (https://joyfulpass.com/api/stripe/webhook/) — the site uses
 * trailingSlash, and Stripe does not follow redirects on webhook delivery.
 * Events: checkout.session.completed, customer.subscription.created,
 * customer.subscription.updated, customer.subscription.deleted.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const admin = createSupabaseAdminClient();
  if (!stripe || !secret || !admin) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const payload = await request.text(); // raw body — required for signature checks
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature ?? "", secret);
  } catch (error) {
    console.error("[stripe webhook] Bad signature", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.mode === "subscription" && session.subscription) {
          const id = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
          await upsertSubscription(admin, await stripe.subscriptions.retrieve(id));
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await upsertSubscription(admin, event.data.object);
        break;
    }
  } catch (error) {
    // 500 makes Stripe retry the delivery.
    console.error(`[stripe webhook] Failed handling ${event.type}`, error);
    return NextResponse.json({ error: "Handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(admin: Admin, sub: Stripe.Subscription) {
  const userId = sub.metadata.user_id;
  const appSlug = sub.metadata.app_slug;
  if (!userId || !appSlug) {
    console.warn(`[stripe webhook] Subscription ${sub.id} has no user/app metadata; skipped`);
    return;
  }
  const item = sub.items.data[0];
  // In current API versions the billing period lives on the subscription item.
  const periodEnd = item?.current_period_end;
  const { error } = await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      app_slug: appSlug,
      stripe_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
      stripe_subscription_id: sub.id,
      status: sub.status,
      price_lookup_key: item?.price.lookup_key ?? null,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );
  if (error) throw error;
}
