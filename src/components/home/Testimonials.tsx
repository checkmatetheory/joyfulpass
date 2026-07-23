import Image from "next/image";
import { testimonials } from "@/lib/homeContent";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  // Duplicate the list so the marquee can loop seamlessly (translateX -50%).
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold sm:text-4xl">Real people, real results</h2>
        <p className="mt-3 opacity-75">
          The best part of what we do is hearing from people the day they pass.
        </p>
      </div>

      <div className="marquee-viewport relative mt-12">
        {/* soft fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />

        <div className="marquee-track flex gap-6">
          {loop.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-80 shrink-0 flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--accent-soft)]">
                  <Image src={t.photo} alt={t.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="font-bold leading-tight">{t.name}</p>
                  <p className="text-xs opacity-60">{t.detail}</p>
                </div>
              </div>
              <div className="mt-3 text-[#FBBF24]" aria-hidden>
                {"★".repeat(t.rating)}
              </div>
              <blockquote className="mt-3 text-sm opacity-90">&ldquo;{t.quote}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
