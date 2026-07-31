"use client";

import { useEffect, useRef, useState } from "react";

// Deliberately abstract, illustrative phone screens — not real screenshots.
// The device frame is static; the on-screen content animates on long loops to
// *show* the value, no copy required. Animations start when the phone scrolls
// into view. Swap in real screenshots here later.
type Variant = "quiz" | "progress" | "tool" | "content";

const strokeIcon = "h-full w-full";

/* ---- Minimal line icons (white, inherit currentColor) --------------------- */
function Icon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || strokeIcon}
      aria-hidden
    >
      {children}
    </svg>
  );
}

const BusIcon = () => (
  <Icon>
    <rect x="4" y="4" width="16" height="13" rx="2.5" />
    <line x1="4" y1="10" x2="20" y2="10" />
    <circle cx="8" cy="19" r="1.3" />
    <circle cx="16" cy="19" r="1.3" />
  </Icon>
);
const TrainIcon = () => (
  <Icon>
    <rect x="6" y="3" width="12" height="14" rx="3" />
    <line x1="6" y1="11" x2="18" y2="11" />
    <circle cx="9.5" cy="14" r="0.9" />
    <circle cx="14.5" cy="14" r="0.9" />
    <line x1="8" y1="20" x2="6" y2="22.5" />
    <line x1="16" y1="20" x2="18" y2="22.5" />
  </Icon>
);
const PlaneIcon = () => (
  <Icon>
    <path d="M21 3 3 10.5l7 2.5 2.5 7L21 3z" />
    <path d="M10 13 21 3" />
  </Icon>
);
const HomeIcon = () => (
  <Icon>
    <path d="M4 11l8-6 8 6" />
    <path d="M6 10v9h12v-9" />
  </Icon>
);
const BookIcon = () => (
  <Icon>
    <path d="M12 6C10.5 5 8 4.5 6 4.5S3 5 3 5v13s1-.5 3-.5 4.5.5 6 1.5c1.5-1 4-1.5 6-1.5s3 .5 3 .5V5s-1-.5-3-.5-4.5.5-6 1.5z" />
    <line x1="12" y1="6" x2="12" y2="19" />
  </Icon>
);
const PhoneIcon = () => (
  <Icon>
    <rect x="7" y="3" width="10" height="18" rx="2.4" />
    <line x1="10.5" y1="18" x2="13.5" y2="18" />
  </Icon>
);
const TrophyIcon = () => (
  <Icon>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4v1a3 3 0 0 0 3 3" />
    <path d="M17 6h3v1a3 3 0 0 1-3 3" />
    <line x1="12" y1="14" x2="12" y2="16.5" />
    <path d="M9.5 20h5l-.5-3.5h-4z" />
  </Icon>
);
const LightbulbIcon = () => (
  <Icon>
    <path d="M12 3a6 6 0 0 0-4 10.4c.7.7 1 1.4 1 2.6h6c0-1.2.3-1.9 1-2.6A6 6 0 0 0 12 3z" />
    <line x1="9.5" y1="18.5" x2="14.5" y2="18.5" />
    <line x1="10.5" y1="21" x2="13.5" y2="21" />
  </Icon>
);

function VariantContent({ variant, accent }: { variant: Variant; accent: string }) {
  /* --- Feature 1: answer, then an explanation appears --------------------- */
  if (variant === "quiz") {
    return (
      <div className="relative h-full p-5">
        <div className="flex flex-col gap-3 pt-3">
          <div className="h-3 w-2/3 rounded-full bg-white/25" />
          {["A", "B", "C", "D"].map((letter, i) => {
            const isCorrect = i === 1;
            return (
              <div
                key={letter}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${isCorrect ? "anim-quiz-pick" : ""}`}
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
                {isCorrect && (
                  <span
                    className="anim-quiz-check flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-md"
                    style={{ backgroundColor: accent }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* The "why" explanation card — the learning moment after answering. */}
        <div className="anim-quiz-explain absolute inset-x-4 bottom-4 rounded-2xl bg-white p-3.5 shadow-xl">
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-1 text-white"
              style={{ backgroundColor: accent }}
            >
              <LightbulbIcon />
            </span>
            <div className="h-2 w-20 rounded-full" style={{ backgroundColor: `${accent}55` }} />
          </div>
          <div className="mt-2.5 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-black/10" />
            <div className="h-1.5 w-11/12 rounded-full bg-black/10" />
            <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    );
  }

  /* --- Feature 2: readiness ring + rising bars + trend line to a trophy ---- */
  if (variant === "progress") {
    return (
      <div className="flex h-full flex-col justify-center gap-6 p-6">
        {/* Circular readiness score filling up */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 56 56" className="h-16 w-16">
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="151"
                className="anim-ring-fill"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center", strokeDashoffset: 151 }}
              />
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* Bar chart building */}
        <div className="flex h-24 items-end gap-2">
          {[40, 68, 55, 92, 66].map((h, i) => (
            <div
              key={i}
              className="anim-bar-rise flex-1 rounded-t-md"
              style={{
                height: `${h}%`,
                backgroundColor: i === 3 ? "white" : "rgba(255,255,255,0.4)",
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>

        {/* Trend line climbing to a trophy — nudged down, trophy pinned to its
            top-right where the line peaks. */}
        <div className="relative mt-3 h-16 pt-5">
          <svg viewBox="0 0 200 52" preserveAspectRatio="none" className="h-full w-full">
            <polyline
              points="4,46 44,40 84,43 124,26 164,18 194,8"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="320"
              className="anim-line-draw"
              style={{ strokeDashoffset: 320 }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="anim-trophy-pop absolute right-0 top-0 h-7 w-7 text-white">
            <TrophyIcon />
          </span>
        </div>
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

  /* --- Feature 3: study anywhere → book + phone + tick -------------------- */
  const places = [<BusIcon key="bus" />, <TrainIcon key="train" />, <PlaneIcon key="plane" />, <HomeIcon key="home" />];
  return (
    <div className="relative h-full">
      {places.map((icon, i) => (
        <div
          key={i}
          className="anim-scene absolute inset-0 flex items-center justify-center text-white"
          style={{ animationDelay: `${i * 2}s`, opacity: 0 }}
        >
          <span className="h-20 w-20">{icon}</span>
        </div>
      ))}
      {/* Final scene: studied on mobile — book + phone + a landing tick. */}
      <div
        className="anim-scene absolute inset-0 flex items-center justify-center gap-3 text-white"
        style={{ animationDelay: "8s", opacity: 0 }}
      >
        <span className="h-12 w-12 opacity-90">
          <BookIcon />
        </span>
        <span className="relative h-16 w-16">
          <PhoneIcon />
          <span
            className="anim-scene-tick absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md"
            style={{ backgroundColor: accent }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}

export default function PhoneMockup({
  variant,
  accent,
  revealFrom = "right",
}: {
  variant: Variant;
  accent: string;
  /** Direction the phone fades/slides in from as it scrolls into view. */
  revealFrom?: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = visible
    ? "translate-x-0 opacity-100"
    : `opacity-0 ${revealFrom === "left" ? "-translate-x-16" : "translate-x-16"}`;

  return (
    <div
      ref={ref}
      data-mockup
      className={`mx-auto w-64 rounded-[2.75rem] border-[6px] border-black/20 bg-black/20 p-2.5 shadow-2xl transition duration-700 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${reveal} ${
        visible ? "is-visible" : ""
      }`}
    >
      <div
        className="h-[480px] overflow-hidden rounded-[2rem]"
        style={{ backgroundColor: `${accent}CC` }}
      >
        <VariantContent variant={variant} accent={accent} />
      </div>
    </div>
  );
}
