import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type Attempt = {
  id: string;
  set_id: string;
  kind: string;
  question_count: number;
  correct_count: number;
  passed: boolean;
  duration_seconds: number | null;
  created_at: string;
};

/** The signed-in user's latest attempts for an app (RLS: own rows only). */
export async function getRecentAttempts(appSlug: string, limit = 10): Promise<Attempt[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("quiz_attempts")
    .select("id, set_id, kind, question_count, correct_count, passed, duration_seconds, created_at")
    .eq("app_slug", appSlug)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Attempt[] | null) ?? [];
}

/**
 * Questions the user currently gets wrong: their most recent answer to each
 * question was incorrect. Answering one correctly later clears it.
 */
export async function getMistakeIds(appSlug: string): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("question_responses")
    .select("question_id, correct, created_at")
    .eq("app_slug", appSlug)
    .order("created_at", { ascending: false })
    .limit(2000);
  const latest = new Map<string, boolean>();
  for (const row of (data as { question_id: string; correct: boolean }[] | null) ?? []) {
    if (!latest.has(row.question_id)) latest.set(row.question_id, row.correct);
  }
  return [...latest].filter(([, correct]) => !correct).map(([id]) => id);
}

export type Readiness = { level: "ready" | "close" | "not-yet" | "unknown"; average: number | null; mocks: number };

/** Readiness from the last three full mocks against the real pass mark. */
export function readiness(attempts: Attempt[], passRatio: number): Readiness {
  const mocks = attempts.filter((a) => a.kind === "mock" && a.question_count > 0).slice(0, 3);
  if (mocks.length === 0) return { level: "unknown", average: null, mocks: 0 };
  const average = mocks.reduce((sum, a) => sum + a.correct_count / a.question_count, 0) / mocks.length;
  const level =
    mocks.length >= 2 && average >= passRatio + 0.1
      ? "ready"
      : average >= passRatio
        ? "close"
        : "not-yet";
  return { level, average, mocks: mocks.length };
}
