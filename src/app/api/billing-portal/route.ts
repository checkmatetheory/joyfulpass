import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** POST { returnTo } → { url } of the Stripe customer portal (cancel, card, invoices). */
export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = await createSupabaseServerClient();
  if (!stripe || !supabase) {
    return NextResponse.json({ error: "Billing isn't available yet." }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  // RLS returns only this user's rows.
  const { data } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const customer = (data as { stripe_customer_id?: string } | null)?.stripe_customer_id;
  if (!customer) return NextResponse.json({ error: "No billing account found." }, { status: 404 });

  const body = (await request.json().catch(() => null)) as { returnTo?: string } | null;
  const origin = new URL(request.url).origin;
  const returnTo = body?.returnTo?.startsWith("/") && !body.returnTo.startsWith("//") ? body.returnTo : "/";

  const portal = await stripe.billingPortal.sessions.create({ customer, return_url: `${origin}${returnTo}` });
  return NextResponse.json({ url: portal.url });
}
