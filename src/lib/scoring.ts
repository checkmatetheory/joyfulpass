// Shared scoring rules — used by the quiz UI and, authoritatively, by the
// server when it saves a Pro attempt (never trust a client-sent score).
import type { QuizQuestion } from "@/lib/curriculum";

export function correctOptions(q: Pick<QuizQuestion, "answer">): number[] {
  return Array.isArray(q.answer) ? q.answer : [q.answer];
}

export function isCorrect(q: Pick<QuizQuestion, "answer">, picked: number[]): boolean {
  const correct = correctOptions(q);
  return picked.length === correct.length && correct.every((i) => picked.includes(i));
}
