// Page-specific FAQ sets. The hub carries the app's general FAQs (apps.ts);
// the practice page gets its own practice-intent questions so the two URLs
// don't emit identical FAQ blocks/schema and compete for the same queries.
import type { AppFaq, AppRecord } from "@/lib/apps";
import type { Curriculum } from "@/lib/curriculum";

export function practiceFaqs(app: AppRecord, curriculum: Curriculum): AppFaq[] {
  const { questions, toPass, timeLimit } = curriculum.facts;
  return [
    {
      question: `Are these ${curriculum.testName} practice tests free?`,
      answer: `Yes. Every practice set on this page is free to play in your browser with no sign-up. ${app.name} Pro adds the full question bank, full-length timed mock tests at real exam length, and saved progress with mistake review.`,
    },
    {
      question: `How many questions are on the real ${curriculum.testName}?`,
      answer: `The real test has ${questions}: you need ${toPass}, with ${timeLimit} to finish. Practise until you clear the pass mark comfortably, not just once.`,
    },
    {
      question: "Where do the practice questions come from?",
      answer: `They're written by the ${app.name} team from the official study material (${app.officialSource.name}), with an explanation for every answer. Always check the official source for the latest rules.`,
    },
    {
      question: "How do I know when I'm ready to book?",
      answer: `When you're consistently scoring above the pass mark across several different practice tests. One good score can be luck; a repeatable one means you know the material.`,
    },
  ];
}

/** FAQPage JSON-LD for a list of FAQs (answers must also be visible on the page). */
export function faqJsonLd(faqs: AppFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Billing FAQs for the pricing page (noindex — for buyers, not search). */
export function pricingFaqs(appName: string): AppFaq[] {
  return [
    {
      question: "How does the free trial work?",
      answer: `Plans with a free trial start with full ${appName} Pro access. You won't be charged until the trial ends, and you can cancel before then from your account at no cost.`,
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. Go to your account and choose Manage billing — you can cancel in a couple of clicks. You keep Pro until the end of the period you've paid for, and you won't be charged again.",
    },
    {
      question: "Which plan should I choose?",
      answer:
        "If your test is more than a few weeks away, the yearly plan is the lowest price per day. If it's next week, the weekly plan gets you full access for a last push.",
    },
    {
      question: "Do I need an account?",
      answer:
        "Yes — Pro is tied to your email so your scores and mistakes are saved. There's no password: we email you a one-time sign-in link.",
    },
    {
      question: "Is payment secure?",
      answer:
        "Payments are handled by Stripe, a PCI-certified payment provider. We never see or store your card details.",
    },
  ];
}
