import type { AppFeature } from "@/lib/apps";
import PhoneMockup from "@/components/PhoneMockup";

export default function FeatureBlock({
  feature,
  accent,
  ctaHref,
  reverse,
}: {
  feature: AppFeature;
  accent: string;
  ctaHref: string;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 sm:grid-cols-2 ${reverse ? "sm:[&>*:first-child]:order-2" : ""}`}
    >
      <div className={reverse ? "sm:text-left" : ""}>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">{feature.title}</h3>
        <p className="mt-4 text-white/80">{feature.body}</p>
        <a
          href={ctaHref}
          className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: accent }}
        >
          {feature.ctaLabel}
        </a>
      </div>
      <PhoneMockup variant={feature.mockup} accent={accent} />
    </div>
  );
}
