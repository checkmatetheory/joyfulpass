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
      <p className="mt-4 text-sm opacity-60">Last updated: 23 July 2026</p>

      <div className="mt-8 space-y-6 opacity-80">
        <p>
          {SITE_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the
          Joyful website and its exam-preparation apps, including BritPass and CanadaPass
          (together, the &ldquo;Services&rdquo;). This Privacy Policy explains how we collect,
          use, share, and protect personal information when you use the Services.
        </p>

        <h2 className="text-xl font-bold">Information we collect</h2>
        <p>
          The information we collect depends on how you use the Services. We may collect
          information you provide, such as your name, email address, and the contents of a support
          request. We may also collect technical and usage information, such as device and browser
          type, operating system, IP address, approximate location, pages or features used, study
          progress, crash reports, and diagnostic data.
        </p>
        <p>
          We use cookies and similar technologies on our website where needed to operate the site,
          remember preferences, understand usage, and measure marketing performance. You can
          control cookies through your browser or device settings. Disabling cookies may affect
          some parts of the Services.
        </p>

        <h2 className="text-xl font-bold">App Store and Google Play purchases</h2>
        <p>
          If you purchase or subscribe to premium app features, payment is processed by Apple or
          Google through the Apple App Store or Google Play Store. We do not receive or store your
          full payment-card details. We may receive purchase confirmation, transaction identifiers,
          subscription status, and the features you have unlocked so that we can provide and
          restore access to paid features.
        </p>
        <p>
          Prices, free trials, billing periods, renewals, cancellations, and refunds are displayed
          by the relevant app store before purchase and are governed by that store&rsquo;s terms and
          policies.
        </p>

        <h2 className="text-xl font-bold">How we use information</h2>
        <p>
          We use information to provide, maintain, secure, and improve the Services; personalise
          and restore your experience; respond to support requests; analyse performance and usage;
          prevent fraud or misuse; communicate service-related information; and comply with legal
          obligations. We do not sell personal information.
        </p>

        <h2 className="text-xl font-bold">Legal bases for processing</h2>
        <p>
          Where UK or EEA data-protection law applies, we process personal information when it is
          necessary to provide the Services or perform a contract with you, to pursue our
          legitimate interests in operating and improving the Services, with your consent, or to
          comply with a legal obligation.
        </p>

        <h2 className="text-xl font-bold">How we share information</h2>
        <p>
          We may share information with service providers that help us operate the Services, such
          as hosting, analytics, customer-support, security, crash-reporting, and app-store
          providers. We may also disclose information where required by law, to protect the
          Services or people&rsquo;s rights and safety, or as part of a merger, financing, acquisition,
          or sale of assets. Service providers may process information only for the services they
          provide to us.
        </p>

        <h2 className="text-xl font-bold">Data retention and security</h2>
        <p>
          We retain personal information only for as long as reasonably necessary for the purposes
          described in this policy, including to meet legal, tax, accounting, and dispute-resolution
          obligations. We use reasonable technical and organisational safeguards designed to
          protect information, but no internet transmission or storage system can be guaranteed
          completely secure.
        </p>

        <h2 className="text-xl font-bold">International transfers</h2>
        <p>
          Information may be processed in countries other than where you live. Where required by
          applicable law, we use appropriate safeguards for international transfers, such as
          contractual protections approved by relevant regulators.
        </p>

        <h2 className="text-xl font-bold">Your rights and choices</h2>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, restrict,
          object to, or receive a portable copy of your personal information, and to withdraw
          consent where we rely on it. You may also have the right to complain to your local data
          protection authority. To exercise a right or ask a question about your data, contact us
          at{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>
          .
        </p>

        <h2 className="text-xl font-bold">Children&rsquo;s privacy</h2>
        <p>
          The Services are not directed to children under 16. We do not knowingly collect personal
          information from children under 16. If you believe a child has provided us personal
          information, please contact us and we will take appropriate steps.
        </p>

        <h2 className="text-xl font-bold">Third-party services and changes</h2>
        <p>
          The Services may link to third-party websites, including official government resources
          and app stores. Their privacy practices are governed by their own policies. We may update
          this Privacy Policy from time to time. We will post the updated version here and change
          the &ldquo;Last updated&rdquo; date. Material changes may also be communicated through the
          Services where appropriate.
        </p>

        <h2 className="text-xl font-bold">Contact us</h2>
        <p>
          For privacy questions, requests, or concerns, contact{" "}
          <a href="mailto:hello@joyfulpass.com" className="font-semibold hover:underline">
            hello@joyfulpass.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
