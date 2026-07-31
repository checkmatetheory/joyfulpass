import Image from "next/image";
import type { AppRecord } from "@/lib/apps";
import { appReviews } from "@/lib/reviews";
import { COUNTRY_NAMES } from "@/lib/homeContent";

/**
 * Per-app social proof, shown below the download CTA on the exam hub: a short
 * row of reviews from people who passed, with the app as the clear reason.
 * Renders nothing until the app has reviews (see reviews.ts).
 */
export default function AppTestimonials({ app }: { app: AppRecord }) {
  const reviews = appReviews[app.slug] ?? [];
  if (reviews.length === 0) return null;

  return (
    <section className="mt-14" aria-labelledby="loved-heading">
      <h2 id="loved-heading" className="text-2xl font-bold">
        Loved by people who passed
      </h2>
      <p className="mt-2 max-w-2xl opacity-75">
        Real stories from learners who walked into their {app.examName} and passed — with{" "}
        {app.name} as the reason it finally clicked.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name + r.quote}
            className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition-colors hover:border-[var(--accent)] dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-base text-amber-400" aria-label={`${r.rating} out of 5 stars`}>
              {"★".repeat(r.rating)}
            </div>
            <blockquote className="mt-3 flex-1 text-[15px] font-medium leading-relaxed">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-black/10 pt-4 dark:border-white/10">
              <div className="relative h-11 w-11 shrink-0">
                <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-[var(--accent-soft)]">
                  <Image src={r.photo} alt={r.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-1 h-4 w-4 overflow-hidden rounded-full bg-white shadow ring-1 ring-black/10">
                  <Image
                    src={`https://hatscripts.github.io/circle-flags/flags/${r.countryCode}.svg`}
                    alt={COUNTRY_NAMES[r.countryCode]}
                    fill
                    sizes="16px"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <span className="block font-bold">{r.name}</span>
                <span className="block text-sm opacity-60">
                  Passed the {app.examName} · {r.location}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
