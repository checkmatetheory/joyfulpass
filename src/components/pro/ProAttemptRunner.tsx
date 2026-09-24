"use client";

import { useCallback, useState } from "react";
import QuizPanel, { type QuizResult } from "@/components/practice/QuizPanel";
import type { QuizQuestion } from "@/lib/curriculum";

/**
 * A Pro quiz that saves itself: when the set finishes, the answers go to
 * /api/attempts/, which re-scores them server-side and stores the attempt so
 * the mistakes page and readiness score stay current.
 */
export default function ProAttemptRunner({
  questions,
  appSlug,
  appName,
  setName,
  setId,
  kind,
  passRatio,
  pricingHref,
  mode = "practice",
  timeLimitSeconds,
  next,
}: {
  questions: QuizQuestion[];
  appSlug: string;
  appName: string;
  setName: string;
  setId: string;
  kind: "mock" | "topic" | "mistakes";
  passRatio: number;
  pricingHref: string;
  mode?: "practice" | "exam";
  timeLimitSeconds?: number;
  next?: { href: string; label: string };
}) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const save = useCallback(
    async (result: QuizResult) => {
      setStatus("saving");
      const res = await fetch("/api/attempts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app: appSlug,
          kind,
          setId,
          seconds: result.seconds,
          answers: questions.map((q, i) => ({ id: q.id, picked: result.answers[i] ?? [] })),
        }),
      }).catch(() => null);
      setStatus(res?.ok ? "saved" : "error");
    },
    [appSlug, kind, setId, questions],
  );

  return (
    <QuizPanel
      questions={questions}
      setName={setName}
      passRatio={passRatio}
      appSlug={appSlug}
      appName={appName}
      pricingHref={pricingHref}
      mode={mode}
      timeLimitSeconds={timeLimitSeconds}
      hideUpsell
      onComplete={save}
      next={next}
    >
      <p className="mt-6 text-center text-xs opacity-60" aria-live="polite">
        {status === "saving" && "Saving your result…"}
        {status === "saved" && "✓ Saved to your progress and mistake history."}
        {status === "error" && "We couldn't save this result — your score above is still correct."}
      </p>
    </QuizPanel>
  );
}
