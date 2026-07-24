"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QuizQuestion } from "@/lib/curriculum";

type Props = {
  questions: QuizQuestion[];
  /** Human label for the chapter, used in the finished-state summary. */
  chapterName: string;
  /** Is there locked content after these free questions? Drives the upsell. */
  hasLockedContent: boolean;
  appName: string;
  appStoreUrl: string | null;
  playStoreUrl: string | null;
};

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function correctIndex(q: QuizQuestion): number {
  return Array.isArray(q.answer) ? q.answer[0] : q.answer;
}

export default function QuizPanel({
  questions,
  chapterName,
  hasLockedContent,
  appName,
  appStoreUrl,
  playStoreUrl,
}: Props) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[index];
  const answer = question ? correctIndex(question) : 0;
  const isLast = index === total - 1;

  const check = useCallback(() => {
    if (selected === null || checked) return;
    setChecked(true);
    if (selected === answer) setCorrectCount((c) => c + 1);
  }, [selected, checked, answer]);

  const next = useCallback(() => {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  }, [isLast]);

  // Keyboard shortcuts: 1-4 / A-D to pick, Enter to check then advance.
  useEffect(() => {
    if (finished) return;
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      const letterIdx = LETTERS.findIndex((l) => l.toLowerCase() === key);
      const numIdx = /^[1-9]$/.test(key) ? Number(key) - 1 : -1;
      const pick = letterIdx >= 0 ? letterIdx : numIdx;
      if (pick >= 0 && pick < (question?.options.length ?? 0)) {
        if (!checked) setSelected(pick);
        e.preventDefault();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (!checked) check();
        else next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, checked, finished, check, next]);

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setCorrectCount(0);
    setFinished(false);
  };

  const progressPct = useMemo(
    () => (finished ? 100 : Math.round((index / Math.max(total, 1)) * 100)),
    [finished, index, total],
  );

  if (total === 0) {
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
        <p className="opacity-70">Practice questions for this chapter are coming soon.</p>
      </div>
    );
  }

  if (finished) {
    const passed = correctCount / total >= 0.75;
    return (
      <div className="rounded-2xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
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
          {correctCount} / {total} correct
        </h3>
        <p className="mt-2 opacity-75">
          {passed
            ? `Nicely done — that's a pass on this ${chapterName} set.`
            : "Not quite 75% this time. Review the explanations and give it another go."}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={restart}
            className="rounded-full px-6 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Try again
          </button>
        </div>

        {hasLockedContent && (
          <div className="mt-8 rounded-xl border border-dashed border-black/15 bg-black/[0.02] p-5 text-left dark:border-white/15 dark:bg-white/5">
            <p className="text-sm font-bold">🔒 More practice in {appName}</p>
            <p className="mt-1 text-sm opacity-75">
              You&rsquo;ve finished the free questions for this chapter. The full question bank,
              saved progress across devices, and mistake review unlock in the app.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {appStoreUrl && (
                <a
                  href={appStoreUrl}
                  className="rounded-lg px-4 py-2 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--accent-dark)" }}
                >
                  App Store
                </a>
              )}
              {playStoreUrl && (
                <a
                  href={playStoreUrl}
                  className="rounded-lg px-4 py-2 text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--accent-dark)" }}
                >
                  Google Play
                </a>
              )}
            </div>
          </div>
        )}
        {/* Free-tier boundary is honest: progress isn't saved between sessions on the web. */}
        <p className="mt-6 text-xs opacity-50">
          Progress on the web isn&rsquo;t saved between sessions — sign in to the app to keep it.
        </p>
      </div>
    );
  }

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

      <ul className="mt-6 space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selected === i;
          const isAnswer = i === answer;
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
                onClick={() => setSelected(i)}
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
          <p className="font-bold" style={{ color: selected === answer ? "#16a34a" : "#dc2626" }}>
            {selected === answer ? "Correct" : "Not quite"}
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
            disabled={selected === null}
            className="ml-auto rounded-full px-7 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Check
          </button>
        ) : (
          <button
            onClick={next}
            className="ml-auto rounded-full px-7 py-3 text-sm font-bold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {isLast ? "Finish" : "Next question"}
          </button>
        )}
      </div>
    </div>
  );
}
