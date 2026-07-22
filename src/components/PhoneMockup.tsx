// A deliberately abstract, illustrative phone frame — not a real app
// screenshot. Swap in real product screenshots here once they exist.
type Variant = "quiz" | "progress" | "tool" | "content";

function VariantContent({ variant, accent }: { variant: Variant; accent: string }) {
  if (variant === "quiz") {
    return (
      <div className="flex h-full flex-col justify-center gap-3 p-5">
        <div className="h-3 w-2/3 rounded-full bg-white/25" />
        {["A", "B", "C", "D"].map((letter, i) => (
          <div
            key={letter}
            className="flex items-center gap-3 rounded-xl px-3 py-2"
            style={{ backgroundColor: i === 1 ? "white" : "rgba(255,255,255,0.12)" }}
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
              style={{
                backgroundColor: i === 1 ? accent : "rgba(255,255,255,0.25)",
                color: i === 1 ? "white" : "white",
              }}
            >
              {letter}
            </span>
            <div
              className="h-2 flex-1 rounded-full"
              style={{ backgroundColor: i === 1 ? `${accent}33` : "rgba(255,255,255,0.2)" }}
            />
          </div>
        ))}
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
              className="w-6 rounded-t-md"
              style={{ height: `${h}%`, backgroundColor: i === 3 ? "white" : "rgba(255,255,255,0.4)" }}
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
    <div className="flex h-full flex-col justify-center gap-2 p-5">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          <div className="h-2 flex-1 rounded-full bg-white/20" />
        </div>
      ))}
    </div>
  );
}

export default function PhoneMockup({ variant, accent }: { variant: Variant; accent: string }) {
  return (
    <div className="mx-auto w-56 rounded-[2.5rem] border-[6px] border-black/20 bg-black/20 p-2 shadow-2xl">
      <div
        className="h-[420px] overflow-hidden rounded-[1.75rem]"
        style={{ backgroundColor: `${accent}CC` }}
      >
        <VariantContent variant={variant} accent={accent} />
      </div>
    </div>
  );
}
