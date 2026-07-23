import { testimonials } from "@/lib/homeContent";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Real people, real results</h2>
        <p className="mt-3 opacity-75">
          The best part of what we do is hearing from people the day they pass.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.quote}
            className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-lg" style={{ color: "var(--accent)" }} aria-hidden>
              ★★★★★
            </div>
            <blockquote className="mt-3 flex-1 text-sm opacity-90">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold">
              {t.name}
              <span className="block text-xs font-normal opacity-60">{t.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
