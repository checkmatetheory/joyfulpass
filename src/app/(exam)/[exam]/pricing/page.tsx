import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";

export const dynamicParams = false;
export const metadata: Metadata = { robots: { index: false, follow: false } };

export function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

const FREE = [
  "One free mock test set per topic",
  "Sample questions in every chapter",
  "Study guide & revision notes",
  "Last session's mistakes",
];

const PRO = [
  "Every mock test & the full question bank",
  "Progress saved across all your devices",
  "Complete mistake history + spaced repetition",
  "Readiness tracker & analytics",
  "Ad-free, offline study guide",
];

export default async function PricingPage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) notFound();
  const testName = getCurriculum(app.slug)?.testName ?? app.examName;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-10">
      <DashboardBreadcrumb app={app} current="Pricing" />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Go Pro on the web
        </h1>
        <p className="mx-auto mt-3 max-w-xl opacity-70">
          Core practice stays free. Pro unlocks depth and convenience — and buying on the web means
          no app-store cut, so it&rsquo;s the same Pro at a lower price.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border border-black/10 p-7 dark:border-white/10">
          <p className="text-sm font-bold uppercase tracking-wide opacity-50">Free</p>
          <p className="mt-2 text-4xl font-extrabold">
            £0<span className="text-base font-medium opacity-50"> /forever</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {FREE.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden>✓</span>
                <span className="opacity-80">{f}</span>
              </li>
            ))}
          </ul>
          <button
            disabled
            className="mt-7 w-full cursor-default rounded-lg border border-black/15 py-2.5 text-sm font-bold opacity-60 dark:border-white/15"
          >
            Your current plan
          </button>
        </div>

        {/* Pro */}
        <div
          className="relative rounded-2xl p-7 text-white"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
        >
          <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
            Best value
          </span>
          <p className="text-sm font-bold uppercase tracking-wide opacity-80">{app.name} Pro</p>
          <p className="mt-2 text-4xl font-extrabold">
            £4.99<span className="text-base font-medium opacity-70"> /month</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {PRO.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden>✓</span>
                <span className="text-white/90">{f}</span>
              </li>
            ))}
          </ul>
          {/* Checkout wiring (Stripe) lands with the auth/entitlement phase. */}
          <button className="mt-7 w-full rounded-lg bg-white py-2.5 text-sm font-bold text-black">
            Upgrade to Pro
          </button>
          <p className="mt-3 text-center text-xs text-white/70">
            Bought Pro in the app? It unlocks here automatically.
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs opacity-50">
        Prices shown are illustrative for this preview. {testName} content is drawn from official
        material; {app.name} is an independent study app.
      </p>
    </div>
  );
}
