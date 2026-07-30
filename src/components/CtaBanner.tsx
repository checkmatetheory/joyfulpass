import type { AppRecord } from "@/lib/apps";

type Props = {
  app: AppRecord;
  heading: string;
  body?: string;
  /** CTA buttons / store badges. */
  children?: React.ReactNode;
  /** "center" (full-image app showcase) or "split" (compact in-context row). */
  variant?: "center" | "split";
  className?: string;
};

/**
 * The per-app branded CTA banner.
 *
 * - "center": a full-bleed showcase for the app-download art. The whole 2:1
 *   image is shown with no colour wash; the heading + store buttons sit in the
 *   bottom-right, over a soft corner scrim for legibility.
 * - "split": a compact in-context row with the accent wash over the image.
 */
export default function CtaBanner({
  app,
  heading,
  body,
  children,
  variant = "center",
  className = "",
}: Props) {
  const bg = app.ctaBannerImage ?? app.heroMedia?.url;
  const { accent, accentDark } = app.theme;

  if (variant === "split") {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl text-white ${className}`}
        style={{
          // Accent wash first (legibility + brand), photo underneath.
          backgroundImage: bg
            ? `linear-gradient(120deg, ${accent}E6, ${accentDark}F2), url("${bg}")`
            : `linear-gradient(120deg, ${accent}, ${accentDark})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative flex flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">{heading}</h2>
            {body && <p className="mt-1 text-sm text-white/85">{body}</p>}
          </div>
          {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
        </div>
      </div>
    );
  }

  // Full-image showcase: show the whole 2:1 artwork with no colour wash; pin the
  // heading + store buttons to the bottom-right.
  return (
    <div
      className={`relative flex aspect-[2/1] min-h-[240px] items-end justify-end overflow-hidden rounded-3xl text-white ${className}`}
      style={{
        backgroundImage: bg ? `url("${bg}")` : `linear-gradient(120deg, ${accent}, ${accentDark})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Soft corner scrim so the bottom-right text/buttons stay legible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-black/60 via-black/10 to-transparent" />
      <div className="relative flex flex-col items-end gap-3 p-5 text-right sm:p-8">
        <h2 className="text-2xl font-extrabold drop-shadow-lg sm:text-3xl">{heading}</h2>
        {children && <div className="flex flex-wrap justify-end gap-3">{children}</div>}
      </div>
    </div>
  );
}
