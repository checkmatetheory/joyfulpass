import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import {
  PRICING_TIERS,
  PRO_FEATURES,
  FREE_FEATURES,
  currencyFor,
  perDay,
  type PricingTier,
} from "@/lib/pricing";

export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

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

function TierCard({ tier, currency }: { tier: PricingTier; currency: string }) {
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

      <button
        className={`mt-6 w-full rounded-xl py-3 text-sm font-bold transition hover:opacity-90 ${
          highlighted ? "bg-white text-[color:var(--accent-dark)]" : "text-white"
        }`}
        style={highlighted ? undefined : { backgroundColor: "var(--accent)" }}
      >
        {tier.freeTrialDays > 0 ? "Start free trial" : "Get started"}
      </button>
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
          Core practice stays free. Pro unlocks depth and convenience — and buying on the web means
          no app-store cut, so it&rsquo;s the same Pro at a lower price.
        </p>
      </div>

      {/* Three tiers — per-day framing, yearly as best value */}
      <div className="mt-12 grid items-center gap-5 md:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} currency={currency} />
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
            Bought Pro in the {app.name} app? It unlocks here automatically.
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
        <span>✓ Cancel anytime</span>
        <span>✓ Same Pro as the app</span>
        <span>✓ No app-store markup</span>
      </div>

      <p className="mt-8 text-center text-xs opacity-45">
        Prices shown are illustrative for this preview. {testName} content is drawn from official
        material; {app.name} is an independent study app.
      </p>
    </div>
  );
}
