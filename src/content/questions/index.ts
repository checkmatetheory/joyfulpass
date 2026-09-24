import "server-only";
import type { QuizQuestion } from "@/lib/curriculum";
import { britpassQuestions } from "@/content/questions/britpass";
import { canadapassQuestions } from "@/content/questions/canadapass";
import { germanpassQuestions } from "@/content/questions/germanpass";
import { serupassQuestions } from "@/content/questions/serupass";

/**
 * The Pro question bank, on top of the curriculum's own questions. SERVER
 * ONLY: these are what Pro subscribers pay for, so they are only ever read by
 * server code after an entitlement check — never bundled into static pages or
 * client JavaScript. Every question is original (written from the official
 * study material, not copied from it) and belongs to a curriculum chapter.
 */
export type ProQuestion = QuizQuestion & { chapter: string };

export const PRO_QUESTIONS: Record<string, ProQuestion[]> = {
  britpass: britpassQuestions,
  canadapass: canadapassQuestions,
  germanpass: germanpassQuestions,
  serupass: serupassQuestions,
};
