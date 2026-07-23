"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/homeContent";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(timer);
  }, [paused, count]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector<HTMLElement>("[data-testimonial-card]");
    if (!carousel || !card) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
    carousel.scrollTo({ left: index * (card.offsetWidth + gap), behavior: "smooth" });
  }, [index]);

  if (count === 0) return null;

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Real people, real results</h2>
        <p className="mt-3 opacity-75">
          The best part of what we do is hearing from people the day they pass.
        </p>
      </div>

      <div
        className="relative mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 scroll-smooth sm:px-6 lg:px-10"
          aria-label="Customer testimonials"
          aria-roledescription="carousel"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-testimonial-card
              className="flex w-[min(86vw,22rem)] shrink-0 snap-start flex-col rounded-3xl border border-black/10 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5 sm:w-[22rem] sm:p-8"
            >
              <div className="flex h-full flex-col items-center text-center">
                <div className="relative h-20 w-20">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-[var(--accent-soft)]">
                    <Image src={t.photo} alt={t.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-2 h-6 w-6 overflow-hidden rounded-full bg-white shadow-md ring-1 ring-black/10">
                    <Image
                      src={`https://hatscripts.github.io/circle-flags/flags/${t.countryCode}.svg`}
                      alt={t.countryCode === "ca" ? "Canada" : "United Kingdom"}
                      fill
                      sizes="24px"
                    />
                  </div>
                </div>
                <div className="mt-4 text-lg text-amber-400" aria-label={`${t.rating} out of 5 stars`}>
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

    </section>
  );
}
