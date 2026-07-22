"use client";

import { useState } from "react";
import type { AppFaq } from "@/lib/apps";

export default function FaqAccordion({ faqs, accent }: { faqs: AppFaq[]; accent: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 dark:divide-white/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="py-4">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left font-semibold"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              {faq.question}
              <span aria-hidden style={{ color: accent }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="mt-3 text-sm opacity-80">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
