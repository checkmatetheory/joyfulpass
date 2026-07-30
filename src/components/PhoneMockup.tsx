// A deliberately abstract, illustrative phone frame — not a real app
// screenshot. The looping, text-free animations *show* the value: answering a
// question, watching progress build, moving through lessons. Swap in real
// product screenshots here once they exist.
type Variant = "quiz" | "progress" | "tool" | "content";

function CheckBadge({ accent }: { accent: string }) {
  return (
    <span
      className="anim-quiz-check flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-md"
      style={{ backgroundColor: accent }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function VariantContent({ variant, accent }: { variant: Variant; accent: string }) {
  if (variant === "quiz") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="h-3 w-2/3 rounded-full bg-white/25" />
        {["A", "B", "C", "D"].map((letter, i) => {
          const isCorrect = i === 1;
          return (
            <div
              key={letter}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 ${isCorrect ? "anim-quiz-pick" : ""}`}
              style={isCorrect ? undefined : { backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: isCorrect ? accent : "rgba(255,255,255,0.25)" }}
              >
                {letter}
              </span>
              <div
                className="relative h-2 flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                {isCorrect && (
                  <div
                    className="anim-quiz-pick-bar absolute inset-0 rounded-full"
                    style={{ backgroundColor: `${accent}66` }}
                  />
                )}
              </div>
              {isCorrect && <CheckBadge accent={accent} />}
            </div>
          );
        })}
      </div>
    );
  }

  if (variant === "progress") {
    return (
      <div className="flex h-full flex-col justify-center gap-4 p-5">
        <div className="flex h-32 items-end gap-2">
          {[40, 70, 55, 90, 65].map((h, i) => (
            <div
              key={i}
              className="anim-bar-rise w-6 rounded-t-md"
              style={{
                height: `${h}%`,
                backgroundColor: i === 3 ? "white" : "rgba(255,255,255,0.4)",
                animationDelay: `${i * 0.28}s`,
              }}
            />
          ))}
        </div>
        <div className="h-2 w-1/2 rounded-full bg-white/25" />
        <div className="h-2 w-1/3 rounded-full bg-white/25" />
      </div>
    );
  }

  if (variant === "tool") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="h-2 w-1/2 rounded-full bg-white/25" />
        <div className="rounded-lg bg-white/15 px-3 py-2 text-xs text-white/80">
          Visa route · 5 years
        </div>
        <div className="rounded-lg bg-white/15 px-3 py-2 text-xs text-white/80">
          Start date · Jun 2022
        </div>
        <div className="mt-2 rounded-lg bg-white px-3 py-2 text-xs font-bold" style={{ color: accent }}>
          15 June 2027
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      {[0, 1, 2, 3].map((n) => (
        <div
          key={n}
          className="anim-line-flow flex items-center gap-2"
          style={{ animationDelay: `${n * 0.5}s` }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
          <div className="h-2 flex-1 rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  );
}

export default function PhoneMockup({ variant, accent }: { variant: Variant; accent: string }) {
  return (
    <div className="anim-phone-float mx-auto w-64 rounded-[2.75rem] border-[6px] border-black/20 bg-black/20 p-2.5 shadow-2xl">
      <div
        className="h-[480px] overflow-hidden rounded-[2rem]"
        style={{ backgroundColor: `${accent}CC` }}
      >
        <VariantContent variant={variant} accent={accent} />
      </div>
    </div>
  );
}
