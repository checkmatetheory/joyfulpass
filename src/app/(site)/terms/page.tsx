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
      <p className="mt-4 text-sm opacity-60">Last updated: 23 July 2026</p>

      <div className="mt-8 space-y-6 opacity-80">
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the {SITE_NAME}
          website and its exam-preparation apps, including BritPass and CanadaPass (together, the
          &ldquo;Services&rdquo;). By using the Services, you agree to these Terms. If you do not
          agree, do not use the Services.
        </p>

        <h2 className="text-xl font-bold">Our Services</h2>
        <p>
          The Services provide educational content, practice questions, mock tests, progress
          tools, and related study materials. They are provided for personal, non-commercial use.
          We may update, change, suspend, or discontinue any part of the Services where reasonably
          necessary.
        </p>

        <h2 className="text-xl font-bold">Independent study tools</h2>
        <p>
          {SITE_NAME} apps are independent study aids based on public official source material,
          such as the Life in the UK handbook and the Discover Canada guide. We are not affiliated
          with, endorsed by, or acting on behalf of any government body, test provider, Apple, or
          Google. Passing a practice test does not guarantee an outcome on an official exam,
          citizenship application, settlement application, or other immigration process.
        </p>

        <h2 className="text-xl font-bold">No professional advice</h2>
        <p>
          Nothing on this site or in our apps — including tools like the ILR eligibility
          calculator — constitutes legal, immigration, or professional advice. Always confirm your
          specific situation against current official guidance or with a qualified adviser.
        </p>

        <h2 className="text-xl font-bold">Purchases, subscriptions, and refunds</h2>
        <p>
          Premium features may be available through one-time purchases, subscriptions, or free
          trials. The relevant Apple App Store or Google Play Store displays the price, billing
          period, trial terms, and renewal terms before you confirm a purchase. Payments are
          processed by the relevant app store, not by {SITE_NAME}.
        </p>
        <p>
          Subscriptions renew automatically unless cancelled through your Apple ID or Google Play
          account settings before the applicable renewal date. Cancellation normally takes effect
          at the end of the current paid period. Refund requests are subject to the relevant
          app-store policy and must be made through Apple or Google where applicable. We may change
          prices or offers prospectively, subject to any notice required by the app store or law.
        </p>

        <h2 className="text-xl font-bold">Accounts and access</h2>
        <p>
          If a Service allows you to create an account, you are responsible for keeping your
          credentials confidential and for activity that occurs through your account. Tell us
          promptly if you suspect unauthorised access. We may suspend or end access where we
          reasonably believe these Terms have been breached, the Services are being misused, or we
          need to protect users or the Services.
        </p>

        <h2 className="text-xl font-bold">Acceptable use</h2>
        <p>
          You agree not to misuse the Services. This includes attempting to disrupt or gain
          unauthorised access to the Services, scraping or copying content at scale, sharing or
          reselling paid access, using automated tools in a way that burdens the Services,
          infringing intellectual-property rights, or using the Services for an unlawful purpose.
        </p>

        <h2 className="text-xl font-bold">Intellectual property</h2>
        <p>
          The Services, including our branding, software, designs, and original content, are owned
          by or licensed to {SITE_NAME} and are protected by applicable intellectual-property laws.
          You may not reproduce, distribute, modify, or create derivative works from the Services
          except where permitted by law or with our written permission. References to official
          materials remain subject to the applicable rights and licences of their owners.
        </p>

        <h2 className="text-xl font-bold">Availability and disclaimers</h2>
        <p>
          We aim to keep the Services accurate and available, but they are provided on an
          &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the maximum extent allowed by
          applicable law, we do not promise that the Services will be uninterrupted, error-free,
          complete, current, or suitable for every purpose. You are responsible for checking
          current official requirements before taking an exam or making an immigration decision.
        </p>

        <h2 className="text-xl font-bold">Liability</h2>
        <p>
          Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or
          limited. Subject to that, {SITE_NAME} will not be liable for indirect, incidental,
          special, consequential, or punitive losses, including loss of data, goodwill, profits, or
          an unsuccessful examination or application outcome. Our total liability for a claim
          relating to the Services is limited to the amount you paid to use the relevant Services
          in the 12 months before the event giving rise to the claim.
        </p>

        <h2 className="text-xl font-bold">App store terms</h2>
        <p>
          If you download an app through Apple&rsquo;s App Store or Google Play, you must also
          comply with the applicable store terms. These Terms are between you and {SITE_NAME}, not
          Apple or Google. Apple and Google are not responsible for the Services, their content, or
          support, except where their own terms or applicable law say otherwise. Apple and its
          subsidiaries may be third-party beneficiaries of these Terms for iOS apps.
        </p>

        <h2 className="text-xl font-bold">Changes to these Terms</h2>
        <p>
          We may update these Terms to reflect changes to the Services, law, or our operations. We
          will post the updated Terms here and change the &ldquo;Last updated&rdquo; date. Continued
          use after an update takes effect means you accept the revised Terms, except where
          applicable law requires another form of notice or consent.
        </p>

        <h2 className="text-xl font-bold">Questions and contact</h2>
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
