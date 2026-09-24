import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import FaqAccordion from "@/components/FaqAccordion";
import PlanButton from "@/components/pricing/PlanButton";
import { checkoutEnabled } from "@/lib/env";
import { checkoutCurrency } from "@/lib/billing";
import { pricingFaqs } from "@/lib/faqs";
import {
  PRICING_TIERS,
  PRO_FEATURES,
  FREE_FEATURES,
  currencyFor,
  perDay,
  type PricingTier,
} from "@/lib/pricing";

export const dynamicParams = false;
export const metadata: Metadata = { title: "Pro plans", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return examPathParams();
}

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M2.6 8.2l4.3 3 4.2-6.4a1 1 0 0 1 1.7 0l4.2 6.4 4.3-3a1 1 0 0 1 1.5 1.1L20.9 19a1 1 0 0 1-1 .8H4.1a1 1 0 0 1-1-.8L1.1 9.3a1 1 0 0 1 1.5-1.1Z" />
    </svg>
  );
}

function TierCard({
  tier,
  currency,
  appSlug,
  enabled,
}: {
  tier: PricingTier;
  currency: string;
  appSlug: string;
  enabled: boolean;
}) {
  const highlighted = tier.highlighted;
  const day = perDay(tier).toFixed(2);
  const total = tier.price.toFixed(2);

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 transition ${
        highlighted
          ? "text-white shadow-2xl lg:-my-2 lg:scale-[1.03]"
          : "border border-black/10 dark:border-white/10"
      }`}
      style={
        highlighted
          ? { background: "linear-gradient(155deg, var(--accent), var(--accent-dark))" }
          : undefined
      }
    >
      {tier.badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold shadow ${
            highlighted ? "bg-white text-[color:var(--accent-dark)]" : "text-white"
          }`}
          style={highlighted ? undefined : { backgroundColor: "var(--accent)" }}
        >
          {tier.badge}
        </span>
      )}

      <div className="flex items-start justify-between">
        <div>
          {tier.freeTrialDays > 0 && (
            <p className={`text-xs font-bold ${highlighted ? "text-white/80" : "opacity-60"}`}>
              {tier.freeTrialDays}-day free trial
            </p>
          )}
          <p
            className={`mt-0.5 text-sm font-bold uppercase tracking-wide ${
              highlighted ? "text-white/85" : "opacity-55"
            }`}
          >
            {tier.name}
          </p>
        </div>
        <Crown className={`h-6 w-6 ${highlighted ? "text-amber-300" : "text-amber-400"}`} />
      </div>

      <p className="mt-5">
        <span className="text-4xl font-extrabold tracking-tight">
          {currency}
          {day}
        </span>
        <span className={`text-sm font-medium ${highlighted ? "text-white/70" : "opacity-55"}`}>
          {" "}
          /day
        </span>
      </p>
      <p className={`mt-1 text-sm ${highlighted ? "text-white/75" : "opacity-60"}`}>
        {currency}
        {total} · billed every {tier.period}
      </p>

      <PlanButton
        appSlug={appSlug}
        tierId={tier.id}
        price={tier.price}
        currency={checkoutCurrency(appSlug).toUpperCase()}
        label={tier.freeTrialDays > 0 ? `Start ${tier.freeTrialDays}-day free trial` : "Get started"}
        highlighted={tier.highlighted}
        enabled={enabled}
      />
    </div>
  );
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const testName = getCurriculum(app.slug)?.testName ?? app.examName;
  const currency = currencyFor(app.slug);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <DashboardBreadcrumb app={app} current="Pricing" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Go Pro and pass your <span style={{ color: "var(--accent)" }}>{testName}</span>
        </h1>
        <p className="mx-auto mt-4">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-sm font-bold text-white"
            style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-dark))" }}
          >
            Start with the plan that fits your goal
          </span>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm opacity-70">
          Core practice stays free. Pro unlocks the full question bank, full-length timed mock tests
          at real exam length and your mistake history — right here in your browser, on any device
          you sign in on.
        </p>
      </div>

      {/* Three tiers — per-day framing, yearly as best value */}
      <div className="mt-12 grid items-center gap-5 md:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} currency={currency} appSlug={app.slug} enabled={checkoutEnabled} />
        ))}
      </div>

      <p className="mt-6 text-center text-xs opacity-55">
        Plans renew automatically at the price above until cancelled. Cancel anytime — your Pro
        access runs to the end of the period you paid for.
      </p>

      {/* What Pro unlocks + what stays free */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 p-7 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <p className="text-sm font-bold uppercase tracking-wide">Everything in Pro</p>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden style={{ color: "var(--accent)" }}>
                  ✓
                </span>
                <span className="opacity-85">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs opacity-60">
            Web Pro is for {app.name} on this website. The mobile app has its own in-app plans.
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 p-7 dark:border-white/10">
          <p className="text-sm font-bold uppercase tracking-wide opacity-55">Free forever</p>
          <ul className="mt-5 space-y-3 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="opacity-50">
                  ✓
                </span>
                <span className="opacity-75">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs opacity-60">No card needed. Start practising in seconds.</p>
        </div>
      </div>

      {/* Trust row */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium opacity-70">
        <span>✓ Cancel anytime in two clicks</span>
        <span>✓ Secure checkout by Stripe</span>
        <span>✓ No password — sign in by email</span>
      </div>

      {/* Billing questions — answered before they become reasons not to buy */}
      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-2xl font-bold">Questions about Pro</h2>
        <div className="mt-6">
          <FaqAccordion faqs={pricingFaqs(app.name)} accent={app.theme.accent} />
        </div>
      </section>

      <p className="mt-10 text-center text-xs opacity-45">
        {checkoutEnabled
          ? "The final price, including any tax, is confirmed at checkout."
          : "Web checkout is opening soon. Prices shown are indicative."}{" "}
        {testName} content is drawn from official material; {app.name} is an independent study app.
      </p>
    </div>
  );
}
