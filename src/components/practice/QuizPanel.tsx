"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { QuizQuestion } from "@/lib/curriculum";
import { track } from "@/lib/track";

type Props = {
  questions: QuizQuestion[];
  /** Human label for the set, used in the results summary. */
  setName: string;
  /** Pass threshold for this exam as a ratio (e.g. 0.75 UK, 0.6 SERU). */
  passRatio: number;
  appSlug: string;
  appName: string;
  /** Where the Pro upsell leads (the silo's pricing page). */
  pricingHref: string;
  /** Optional "keep going" link shown on the results screen. */
  next?: { href: string; label: string };
  /** Extra results-screen content (e.g. the email capture form). */
  children?: ReactNode;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function correctSet(q: QuizQuestion): number[] {
  return Array.isArray(q.answer) ? q.answer : [q.answer];
}

function isCorrect(q: QuizQuestion, picked: number[]): boolean {
  const correct = correctSet(q);
  return picked.length === correct.length && correct.every((i) => picked.includes(i));
}

export default function QuizPanel({
  questions,
  setName,
  passRatio,
  appSlug,
  appName,
  pricingHref,
  next,
  children,
}: Props) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  // Every answer given, so the results screen can review the misses.
  const [answers, setAnswers] = useState<number[][]>([]);
  const [finished, setFinished] = useState(false);
  const started = useRef(false);

  const question = questions[index];
  const correct = question ? correctSet(question) : [];
  const multi = correct.length > 1;
  const isLast = index === total - 1;

  const pick = useCallback(
    (i: number) => {
      if (checked) return;
      setSelected((prev) => {
        if (!multi) return [i];
        if (prev.includes(i)) return prev.filter((x) => x !== i);
        // "Choose two": keep the most recent picks up to the required count.
        return [...prev, i].slice(-correct.length);
      });
    },
    [checked, multi, correct.length],
  );

  const check = useCallback(() => {
    if (checked || selected.length !== correct.length) return;
    if (!started.current) {
      started.current = true;
      track("quiz_start", { app: appSlug, set: setName });
    }
    setChecked(true);
    setAnswers((prev) => [...prev, selected]);
  }, [checked, selected, correct.length, appSlug, setName]);

  const correctCount = useMemo(
    () => answers.filter((picked, i) => questions[i] && isCorrect(questions[i], picked)).length,
    [answers, questions],
  );

  const advance = useCallback(() => {
    if (isLast) {
      setFinished(true);
      const score = total ? correctCount / total : 0;
      track("quiz_complete", {
        app: appSlug,
        set: setName,
        score: Math.round(score * 100),
        passed: score >= passRatio,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected([]);
    setChecked(false);
  }, [isLast, total, correctCount, appSlug, setName, passRatio]);

  // Keyboard shortcuts: 1-9 / A-F to pick, Enter to check then advance.
  useEffect(() => {
    if (finished) return;
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const letterIdx = LETTERS.findIndex((l) => l.toLowerCase() === key);
      const numIdx = /^[1-9]$/.test(key) ? Number(key) - 1 : -1;
      const choice = letterIdx >= 0 ? letterIdx : numIdx;
      if (choice >= 0 && choice < (question?.options.length ?? 0)) {
        pick(choice);
        e.preventDefault();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (!checked) check();
        else advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, checked, finished, pick, check, advance]);

  const restart = () => {
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setAnswers([]);
    setFinished(false);
  };

  const progressPct = finished ? 100 : Math.round((index / Math.max(total, 1)) * 100);

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
        <p className="opacity-70">Practice questions for this set are coming soon.</p>
      </div>
    );
  }

  if (finished) {
    const score = correctCount / total;
    const passed = score >= passRatio;
    const passPct = Math.round(passRatio * 100);
    const misses = questions
      .map((q, i) => ({ q, picked: answers[i] ?? [] }))
      .filter(({ q, picked }) => !isCorrect(q, picked));

    return (
      <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="text-center">
          {/* Stamp-press completion moment (the one bold animation). */}
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 text-3xl font-black uppercase ${
              passed ? "stamp-press" : ""
            }`}
            style={{
              borderColor: passed ? "var(--accent)" : "#9CA3AF",
              color: passed ? "var(--accent)" : "#9CA3AF",
            }}
            aria-hidden
          >
            {passed ? "✓" : "↻"}
          </div>
          <h3 className="mt-6 text-2xl font-bold">
            {correctCount} / {total} correct · {Math.round(score * 100)}%
          </h3>
          <p className="mt-2 opacity-75">
            {passed
              ? `That's above the ${passPct}% pass mark on this ${setName} set.`
              : `The real pass mark is ${passPct}%. Review what you missed below, then try again.`}
          </p>
        </div>

        {/* The upsell sits at peak intent: right after the score. */}
        <div
          className="mt-8 rounded-2xl p-6 text-white"
          style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}
        >
          <p className="text-lg font-extrabold">
            {passed ? "Ready for the real thing?" : "Close the gaps before test day"}
          </p>
          <p className="mt-1 text-sm text-white/85">
            Free sets are short. {appName} Pro gives you the full question bank, full-length timed
            mock tests at real exam length, and a saved history of every mistake.
          </p>
          <Link
            href={pricingHref}
            onClick={() => track("go_pro_click", { app: appSlug, location: "quiz_results" })}
            className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[color:var(--accent-dark)] transition hover:opacity-90"
          >
            See {appName} Pro plans
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={restart}
            className="rounded-full border-2 px-6 py-2.5 text-sm font-bold"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Try again
          </button>
          {next && (
            <Link
              href={next.href}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {next.label} →
            </Link>
          )}
        </div>

        {children}

        {misses.length > 0 && (
          <div className="mt-10">
            <h4 className="text-lg font-bold">Review your mistakes</h4>
            <ol className="mt-4 space-y-4">
              {misses.map(({ q, picked }) => (
                <li
                  key={q.id}
                  className="rounded-xl border border-black/10 p-4 text-sm dark:border-white/10"
                >
                  <p className="font-semibold">{q.prompt}</p>
                  <p className="mt-2 text-red-600 dark:text-red-400">
                    Your answer: {picked.map((i) => q.options[i]).join("; ") || "—"}
                  </p>
                  <p className="mt-1 text-green-700 dark:text-green-400">
                    Correct: {correctSet(q).map((i) => q.options[i]).join("; ")}
                  </p>
                  <p className="mt-2 opacity-75">{q.explanation}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }

  const answeredRight = checked && isCorrect(question, selected);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${progressPct}%`, backgroundColor: "var(--accent)" }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums opacity-60">
          {index + 1} / {total}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-bold leading-snug sm:text-2xl">{question.prompt}</h2>
      {multi && (
        <p className="mt-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
          Choose {correct.length} answers
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selected.includes(i);
          const isAnswer = correct.includes(i);
          let stateClass =
            "border-black/10 hover:border-[var(--accent)] dark:border-white/15 dark:hover:border-[var(--accent)]";
          if (checked && isAnswer) stateClass = "border-green-500 bg-green-500/10";
          else if (checked && isSelected && !isAnswer) stateClass = "border-red-500 bg-red-500/10";
          else if (isSelected) stateClass = "border-[var(--accent)] bg-[var(--accent-soft)]/50";

          return (
            <li key={i}>
              <button
                type="button"
                disabled={checked}
                aria-pressed={isSelected}
                onClick={() => pick(i)}
                className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors ${stateClass}`}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-bold"
                  style={{
                    backgroundColor: isSelected ? "var(--accent)" : "transparent",
                    color: isSelected ? "var(--accent-foreground)" : "inherit",
                    border: isSelected ? "none" : "1px solid rgba(0,0,0,0.15)",
                  }}
                  aria-hidden
                >
                  {LETTERS[i]}
                </span>
                <span className="text-sm sm:text-base">{option}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {checked && (
        <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.02] p-4 text-sm dark:border-white/10 dark:bg-white/5">
          <p className="font-bold" style={{ color: answeredRight ? "#16a34a" : "#dc2626" }}>
            {answeredRight ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1 opacity-80">{question.explanation}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="hidden font-mono text-xs opacity-45 sm:block">
          Keys: A–{LETTERS[question.options.length - 1]} to choose · Enter to{" "}
          {checked ? "continue" : "check"}
        </p>
        {!checked ? (
          <button
            onClick={check}
            disabled={selected.length !== correct.length}
            className="ml-auto rounded-full px-7 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Check
          </button>
        ) : (
          <button
            onClick={advance}
            className="ml-auto rounded-full px-7 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {isLast ? "See my score" : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
