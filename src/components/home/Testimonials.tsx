import Image from "next/image";
import { COUNTRY_NAMES, testimonials } from "@/lib/homeContent";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  // Render the list twice so the marquee track can translate by -50% and loop
  // back seamlessly with no visible reset.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Real people, real results</h2>
        <p className="mt-3 opacity-75">
          The best part of what we do is hearing from people the day they pass.
        </p>
      </div>

      <div
        className="marquee-viewport relative mt-12 overflow-hidden"
        aria-label="Customer testimonials"
        aria-roledescription="carousel"
      >
        {/* Soft edge fades so cards slide in and out rather than hard-cutting. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-24" />

        <ul className="marquee-track flex gap-5 px-4 pb-3 sm:px-6 lg:px-10">
          {loop.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= testimonials.length ? true : undefined}
              className="w-[min(86vw,22rem)] shrink-0 sm:w-[22rem]"
            >
              <figure className="flex h-full flex-col rounded-3xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
                <div className="flex h-full flex-col items-center text-center">
                  <div className="relative h-20 w-20">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[var(--accent-soft)]">
                      <Image src={t.photo} alt={t.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-2 h-6 w-6 overflow-hidden rounded-full bg-white shadow-md ring-1 ring-black/10">
                      <Image
                        src={`https://hatscripts.github.io/circle-flags/flags/${t.countryCode}.svg`}
                        alt={COUNTRY_NAMES[t.countryCode]}
                        fill
                        sizes="24px"
                      />
                    </div>
                  </div>
                  <div
                    className="mt-4 text-lg text-amber-400"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {"★".repeat(t.rating)}
                  </div>
                  <blockquote className="mt-4 text-lg font-medium leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5">
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-sm opacity-60">{t.detail}</span>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
