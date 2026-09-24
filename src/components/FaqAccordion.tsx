import type { AppFaq } from "@/lib/apps";

/**
 * FAQ list built on native <details>, so every answer is in the server HTML
 * (it must match the FAQPage schema we emit) while still collapsing visually.
 * No client JavaScript needed. The first item starts open.
 */
export default function FaqAccordion({ faqs, accent }: { faqs: AppFaq[]; accent: string }) {
  return (
    <div className="divide-y divide-black/10 dark:divide-white/10">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="group py-4" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span aria-hidden className="shrink-0 transition group-open:rotate-45" style={{ color: accent }}>
              +
            </span>
          </summary>
          <p className="mt-3 text-sm opacity-80">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
