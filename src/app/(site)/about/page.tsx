import type { Metadata } from "next";
import Link from "next/link";
import { apps } from "@/lib/apps";
import { examHub } from "@/lib/urls";
import { SITE_NAME } from "@/lib/site";
import { FILM_PHOTOS } from "@/lib/photos";
import InstaxPhoto from "@/components/InstaxPhoto";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} builds independent, source-cited exam-prep apps for the tests that decide immigration, certification, and career outcomes.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
            Our story
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Prep that feels like a friend in your corner
          </h1>
          <p className="mt-6 text-lg opacity-80">
            Joyful makes focused, trustworthy prep apps for the exams that change people&rsquo;s
            lives — starting with citizenship and settlement tests, and expanding to certification
            and language exams next.
          </p>
          <p className="mt-4 opacity-75">
            We&rsquo;re a small team who believe a life-changing exam shouldn&rsquo;t feel lonely or
            confusing. So we sweat the details, cite every source, and try to make studying feel a
            little more human — one exam, and one person, at a time.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <InstaxPhoto
            {...FILM_PHOTOS.one}
            caption="where it started"
            rotate={-6}
            priority
            className="relative z-10 w-40 sm:w-56"
          />
          <InstaxPhoto
            {...FILM_PHOTOS.three}
            caption="made with care"
            rotate={5}
            priority
            className="relative z-20 -ml-10 mt-10 w-40 sm:w-56"
          />
        </div>
      </section>

      {/* Why one app per exam */}
      <section className="mt-20 max-w-3xl">
        <h2 className="text-2xl font-bold">Why one app per exam</h2>
        <p className="mt-4 opacity-80">
          Most exam-prep apps try to cover many tests shallowly. We do the opposite: each Joyful
          app is built for exactly one exam, sourced directly from the official study material for
          that exam, and maintained by people with direct professional experience with it.
        </p>
      </section>

      {/* Human band — photo + values */}
      <section className="mt-16 grid items-center gap-10 rounded-3xl bg-[var(--surface-cream)] p-8 sm:p-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex justify-center">
          <InstaxPhoto {...FILM_PHOTOS.two} caption="one exam at a time" rotate={-3} className="w-48 sm:w-64" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">People, not just pass rates</h2>
          <p className="mt-4 opacity-80">
            There&rsquo;s a person on the other side of every question — someone building a life,
            often in a new language, with a lot riding on one result. We keep them in mind in
            everything we make: clear explanations, honest numbers, and a tone that feels like
            someone rooting for you rather than a textbook talking at you.
          </p>
        </div>
      </section>

      {/* Editorial standards */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">Editorial standards</h2>
        <p className="mt-4 opacity-80">
          Every app links to its official government source. Blog content is written or reviewed by
          people with direct professional experience relevant to that exam or immigration process,
          and bylines credit that experience. We are not affiliated with any government body.
        </p>
      </section>

      {/* Our apps today */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Our apps today</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <li key={app.slug}>
              <Link
                href={examHub(app)}
                className="flex items-center gap-3 rounded-2xl border border-black/10 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"
              >
                <span className="text-2xl" aria-hidden>
                  {app.flagEmoji}
                </span>
                <span>
                  <span className="block font-bold">{app.name}</span>
                  <span className="block text-sm opacity-70">{app.examName}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Get in touch */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold">Say hello</h2>
        <p className="mt-4 opacity-80">
          Questions, corrections, or a story about your own test day? We&rsquo;d genuinely love to
          hear it:{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>
        </p>
      </section>
    </div>
  );
}
