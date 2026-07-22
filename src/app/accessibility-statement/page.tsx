import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${SITE_NAME}'s commitment to an accessible website and apps.`,
  alternates: { canonical: "/accessibility-statement/" },
};

export default function AccessibilityStatementPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Accessibility Statement</h1>
      <p className="mt-4 text-sm opacity-60">Last updated: 2026</p>

      <div className="mt-8 space-y-6 opacity-80">
        <p>
          {SITE_NAME} is committed to making our website and apps usable by as many people as
          possible, including people who rely on assistive technology.
        </p>

        <h2 className="text-xl font-bold">What we aim for</h2>
        <p>
          We aim to follow established web accessibility practices: sufficient color contrast,
          keyboard-navigable interfaces, descriptive link text, and semantic markup that works
          with screen readers.
        </p>

        <h2 className="text-xl font-bold">Ongoing work</h2>
        <p>
          Accessibility is an ongoing effort, and we review and improve the site as we build new
          features. If you encounter a barrier using our website or apps, we want to know about
          it.
        </p>

        <h2 className="text-xl font-bold">Contact us</h2>
        <p>
          Email{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>{" "}
          to report an accessibility issue or request content in an alternative format.
        </p>
      </div>
    </div>
  );
}
