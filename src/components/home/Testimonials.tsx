"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/homeContent";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(timer);
  }, [paused, count]);

  if (count === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Real people, real results</h2>
        <p className="mt-3 opacity-75">
          The best part of what we do is hearing from people the day they pass.
        </p>
      </div>

      <div
        className="relative mt-12 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t) => (
            <figure key={t.name} className="w-full shrink-0 px-2">
              <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[var(--accent-soft)]">
                  <Image src={t.photo} alt={t.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="mt-4 text-lg" style={{ color: "var(--accent)" }} aria-hidden>
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
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className="h-2.5 rounded-full transition-all"
            style={{
              width: i === index ? "1.75rem" : "0.625rem",
              backgroundColor: i === index ? "var(--accent)" : "var(--accent-soft)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
