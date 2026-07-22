import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${SITE_NAME}'s website and apps.`,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Terms &amp; Conditions</h1>
      <p className="mt-4 text-sm opacity-60">Last updated: 2026</p>

      <div className="mt-8 space-y-6 opacity-80">
        <p>
          By using {SITE_NAME}&rsquo;s website or any app in the {SITE_NAME} family (BritPass,
          CanadaPass, and any future app), you agree to these terms.
        </p>

        <h2 className="text-xl font-bold">Independent study tools</h2>
        <p>
          {SITE_NAME} apps are independent study aids based on official public source material
          (such as the Life in the UK handbook or the Discover Canada guide). We are not
          affiliated with, endorsed by, or acting on behalf of any government body. Passing a
          practice test does not guarantee any outcome on the official exam or in any immigration
          process.
        </p>

        <h2 className="text-xl font-bold">No professional advice</h2>
        <p>
          Nothing on this site or in our apps — including tools like the ILR eligibility
          calculator — constitutes legal, immigration, or professional advice. Always confirm your
          specific situation against current official guidance or with a qualified adviser.
        </p>

        <h2 className="text-xl font-bold">Acceptable use</h2>
        <p>
          You agree not to misuse the site or apps, including attempting to disrupt the service,
          scrape content at scale, or use the content for any unlawful purpose.
        </p>

        <h2 className="text-xl font-bold">Questions</h2>
        <p>
          Contact us at{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>{" "}
          with any questions about these terms.
        </p>
      </div>
    </div>
  );
}
