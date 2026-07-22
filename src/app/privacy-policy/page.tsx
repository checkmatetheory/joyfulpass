import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your data.`,
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-4 text-sm opacity-60">Last updated: 2026</p>

      <div className="mt-8 space-y-6 opacity-80">
        <p>
          This policy explains what information {SITE_NAME} collects when you use our website and
          apps (BritPass, CanadaPass, and any future app in the family), and how we use it.
        </p>

        <h2 className="text-xl font-bold">Information we collect</h2>
        <p>
          We collect basic analytics data (pages visited, device type, approximate location) via
          our analytics and advertising partners to understand how people use the site and to
          measure the effectiveness of our marketing. If you contact us directly, we collect
          whatever information you choose to share (e.g. your email address).
        </p>

        <h2 className="text-xl font-bold">How we use it</h2>
        <p>
          We use this information to operate and improve the site and our apps, respond to
          support requests, and measure marketing performance. We do not sell your personal
          information to third parties.
        </p>

        <h2 className="text-xl font-bold">Your choices</h2>
        <p>
          You can control cookies and tracking through your browser or device settings. To ask a
          question about your data or request its deletion, contact us at{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
