// Mock tests power the public, INDEXABLE practice pages (/…/practice/ and
// /…/practice/[n]/). Unlike a logged-in numbered grid, each mock here is a
// genuine, playable quiz with unique questions, so the pages are real content —
// not thin doorway pages.
//
// SEEDING: until a full authored bank exists, we partition the curriculum's
// question pool into a few DISTINCT (non-overlapping) mock tests so each page is
// genuinely different. Replace `getMockTests` with the real sets (up to 45, each
// the full test length) when they're authored — every practice page scales from
// this one function, no route or UI changes needed.

import type { AppRecord } from "@/lib/apps";
import type { QuizQuestion } from "@/lib/curriculum";
import { getCurriculum, freeQuestions } from "@/lib/curriculum";

export type MockTest = {
  number: number;
  /** URL segment: /…/practice/1/ */
  slug: string;
  questions: QuizQuestion[];
};

/** How many seed mocks to derive from the current question pool. */
const SEED_COUNT = 3;

function questionPool(appSlug: string): QuizQuestion[] {
  const curriculum = getCurriculum(appSlug);
  if (!curriculum) return [];
  return curriculum.chapters.flatMap((chapter) => freeQuestions(chapter));
}

export function getMockTests(app: AppRecord): MockTest[] {
  const pool = questionPool(app.slug);
  if (pool.length === 0) return [];
  const size = Math.max(1, Math.ceil(pool.length / SEED_COUNT));
  return Array.from({ length: SEED_COUNT }, (_, i) => ({
    number: i + 1,
    slug: String(i + 1),
    questions: pool.slice(i * size, (i + 1) * size),
  })).filter((m) => m.questions.length > 0);
}

export function getMockTest(app: AppRecord, slug: string): MockTest | undefined {
  return getMockTests(app).find((m) => m.slug === slug);
}
