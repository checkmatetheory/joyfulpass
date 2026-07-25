import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import { examHub } from "@/lib/urls";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} builds independent, source-cited exam-prep apps for the tests that decide immigration, certification, and career outcomes.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">About Joyful</h1>
      <p className="mt-6 text-lg opacity-80">
        Joyful makes focused, trustworthy prep apps for the exams that change people&rsquo;s
        lives — starting with citizenship and settlement tests, and expanding to certification and
        language exams next.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Why one app per exam</h2>
      <p className="mt-4 opacity-80">
        Most exam-prep apps try to cover many tests shallowly. We do the opposite: each Joyful
        app is built for exactly one exam, sourced directly from the official study material for
        that exam, and maintained by people with direct professional experience with it.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Our apps today</h2>
      <ul className="mt-4 space-y-2">
        {apps.map((app) => (
          <li key={app.slug}>
            <span aria-hidden>{app.flagEmoji}</span>{" "}
            <a href={examHub(app)} className="font-semibold hover:underline">
              {app.name}
            </a>{" "}
            — {app.examName}
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-bold">Editorial standards</h2>
      <p className="mt-4 opacity-80">
        Every app links to its official government source. Blog content is written or reviewed by
        people with direct professional experience relevant to that exam or immigration process,
        and bylines credit that experience. We are not affiliated with any government body.
      </p>

      <h2 className="mt-12 text-2xl font-bold">Get in touch</h2>
      <p className="mt-4 opacity-80">
        Questions, corrections, or partnership inquiries:{" "}
        <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
          hello@joyfulpass.com
        </a>
      </p>
    </div>
  );
}
