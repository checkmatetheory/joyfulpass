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
