import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${SITE_NAME}'s website and apps.`,
  path: "/terms/",
});

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
          Premium features (&ldquo;Pro&rdquo;) are available as subscriptions, sometimes with a
          free trial. You can buy Pro in two ways, each with its own billing:
        </p>
        <p>
          <strong>On our website.</strong> Web Pro is sold by {SITE_NAME} and payments are
          processed securely by Stripe; we never see or store your full card details. The price,
          billing period, any trial, and renewal terms are shown before you confirm. Web
          subscriptions renew automatically at the end of each period until you cancel. You can
          cancel at any time from your account (&ldquo;Manage billing&rdquo;); cancellation takes
          effect at the end of the current paid period and you keep access until then. If a plan
          includes a free trial, you won&rsquo;t be charged if you cancel before the trial ends.
          Web Pro unlocks features on this website only; the mobile apps have separate in-app
          plans.
        </p>
        <p>
          <strong>Your cancellation right (UK and EU consumers).</strong> You normally have 14 days
          from purchase to cancel a contract for digital services. When you start Pro straight away
          you ask us to begin providing it during that period; if you then cancel within 14 days,
          we will refund what you paid less a proportionate amount for the time you had access. To
          cancel within this period, contact us at the address below. This does not affect your
          other statutory rights.
        </p>
        <p>
          <strong>In the mobile apps.</strong> In-app purchases are processed by Apple or Google.
          The relevant store shows the price and terms, renews them automatically, and handles
          cancellation (through your Apple ID or Google Play settings) and refunds under its own
          policies.
        </p>
        <p>
          We may change prices prospectively. For existing web subscriptions we will tell you
          before a change takes effect, and you can cancel before it applies.
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
