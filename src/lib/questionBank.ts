import "server-only";
import { getCurriculum, type QuizQuestion } from "@/lib/curriculum";
import { PRO_QUESTIONS } from "@/content/questions";

export type BankQuestion = QuizQuestion & { chapter: string };

/**
 * An app's full question bank: every curriculum question (free and locked
 * cores) plus the Pro-only questions. De-duplicated by id.
 */
export function getBank(appSlug: string): BankQuestion[] {
  const curriculum = getCurriculum(appSlug);
  if (!curriculum) return [];
  const seen = new Set<string>();
  const out: BankQuestion[] = [];
  const add = (q: BankQuestion) => {
    if (seen.has(q.id)) return;
    seen.add(q.id);
    out.push(q);
  };
  for (const chapter of curriculum.chapters) {
    for (const core of chapter.cores) {
      for (const q of core.questions) add({ ...q, chapter: chapter.slug });
    }
  }
  for (const q of PRO_QUESTIONS[appSlug] ?? []) add(q);
  return out;
}

export function getChapterBank(appSlug: string, chapterSlug: string): BankQuestion[] {
  return getBank(appSlug).filter((q) => q.chapter === chapterSlug);
}

export function getQuestionsById(appSlug: string): Map<string, BankQuestion> {
  return new Map(getBank(appSlug).map((q) => [q.id, q]));
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * A full-length mock at the real exam's length: fixed per-chapter counts
 * first (e.g. GermanPass's 3 federal-state questions), then the rest spread
 * across chapters in proportion to the bank, then shuffled. If the bank is
 * smaller than the exam, every question is used.
 */
export function sampleFullMock(appSlug: string): BankQuestion[] {
  const curriculum = getCurriculum(appSlug);
  if (!curriculum) return [];
  const bank = getBank(appSlug);
  const target = Math.min(curriculum.fullTest.questionCount, bank.length);
  const fixed = curriculum.fullTest.fixedPerChapter ?? {};

  const byChapter = new Map<string, BankQuestion[]>();
  for (const q of shuffle(bank)) {
    byChapter.set(q.chapter, [...(byChapter.get(q.chapter) ?? []), q]);
  }

  const picked: BankQuestion[] = [];
  for (const [chapter, count] of Object.entries(fixed)) {
    picked.push(...(byChapter.get(chapter) ?? []).slice(0, count));
    byChapter.delete(chapter);
  }

  // Round-robin across the remaining chapters keeps coverage balanced.
  const queues = [...byChapter.values()];
  while (picked.length < target && queues.some((q) => q.length > 0)) {
    for (const queue of queues) {
      const q = queue.shift();
      if (q) picked.push(q);
      if (picked.length >= target) break;
    }
  }
  return shuffle(picked);
}

/**
 * Prepare a bank question for the browser: strip bank-only fields and shuffle
 * the options (remapping the answer), so the right answer isn't always in the
 * same position. Two-option True/False questions keep their natural order.
 */
export function toQuizQuestion(q: BankQuestion): QuizQuestion {
  if (q.options.length <= 2) {
    return { id: q.id, prompt: q.prompt, options: q.options, answer: q.answer, explanation: q.explanation };
  }
  const order = shuffle(q.options.map((_, i) => i));
  const remap = (i: number) => order.indexOf(i);
  return {
    id: q.id,
    prompt: q.prompt,
    options: order.map((i) => q.options[i]),
    answer: Array.isArray(q.answer) ? q.answer.map(remap) : remap(q.answer),
    explanation: q.explanation,
  };
}
