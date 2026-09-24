import { NextResponse } from "next/server";
import { getApp, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, passRatio } from "@/lib/curriculum";
import { getQuestionsById } from "@/lib/questionBank";
import { isCorrect } from "@/lib/scoring";
import { hasPro } from "@/lib/entitlements";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Body = {
  app?: string;
  kind?: "mock" | "topic" | "mistakes";
  setId?: string;
  seconds?: number;
  answers?: { id: string; picked: number[] }[];
};

/**
 * POST a finished Pro attempt. The server re-scores every answer against the
 * bank (the client's own score is ignored), then stores the attempt and each
 * response so the mistakes page and readiness score can be rebuilt.
 */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Accounts aren't available yet." }, { status: 503 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as Body | null;
  const app = body?.app ? (getApp(body.app) ?? getAppByExamSlug(body.app)) : undefined;
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum || !Array.isArray(body?.answers) || body.answers.length === 0) {
    return NextResponse.json({ error: "Invalid attempt." }, { status: 400 });
  }
  if (!(await hasPro(app.slug))) {
    return NextResponse.json({ error: "Pro required." }, { status: 403 });
  }

  const bank = getQuestionsById(app.slug);
  const scored = body.answers
    .filter((a) => typeof a?.id === "string" && Array.isArray(a.picked) && bank.has(a.id))
    .slice(0, 200)
    .map((a) => ({ id: a.id, correct: isCorrect(bank.get(a.id)!, a.picked.filter(Number.isInteger)) }));
  if (scored.length === 0) return NextResponse.json({ error: "Invalid attempt." }, { status: 400 });

  const correctCount = scored.filter((s) => s.correct).length;
  const passed = correctCount / scored.length >= passRatio(curriculum);
  const kind = body.kind === "topic" || body.kind === "mistakes" ? "topic" : "mock";

  const { data: attempt, error } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      app_slug: app.slug,
      set_id: String(body.setId ?? kind).slice(0, 80),
      kind,
      question_count: scored.length,
      correct_count: correctCount,
      passed,
      duration_seconds: Number.isFinite(body.seconds) ? Math.max(0, Math.round(body.seconds!)) : null,
    })
    .select("id")
    .single();
  if (error || !attempt) {
    console.error("[attempts] insert failed", error);
    return NextResponse.json({ error: "Couldn't save your attempt." }, { status: 500 });
  }

  const { error: respError } = await supabase.from("question_responses").insert(
    scored.map((s) => ({
      attempt_id: attempt.id,
      user_id: user.id,
      app_slug: app.slug,
      question_id: s.id,
      correct: s.correct,
    })),
  );
  if (respError) console.error("[attempts] responses insert failed", respError);

  return NextResponse.json({ ok: true, correct: correctCount, total: scored.length, passed });
}
