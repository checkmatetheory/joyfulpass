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
  // Mobile art is optional; fall back to the desktop image when unset.
  const bgMobile = app.ctaBannerImageMobile ?? bg;
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

  // Full-image showcase: show the whole artwork with no colour wash; pin the
  // heading + store buttons to the bottom-right. The box is 4:3 on mobile and
  // 2:1 on desktop, so we serve distinct art per breakpoint (a dedicated 4:3
  // mobile asset when provided) to avoid center-cropping the wrong axis.
  return (
    <div
      className={`relative flex aspect-[4/3] items-end justify-end overflow-hidden rounded-3xl text-white sm:aspect-[2/1] ${className}`}
      // Gradient base always sits behind the art, so it shows through if an
      // image is unset or fails to load.
      style={{ backgroundImage: `linear-gradient(120deg, ${accent}, ${accentDark})` }}
    >
      {bg && (
        <>
          {/* Mobile (4:3) art. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgMobile}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center sm:hidden"
          />
          {/* Desktop (2:1) art. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-center sm:block"
          />
        </>
      )}
      {/* Soft corner scrim so the bottom-right buttons stay legible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-black/60 via-black/10 to-transparent" />
      <div className="relative flex flex-col items-end gap-3 p-5 pb-14 sm:p-8 sm:pb-16">
        {/* The artwork already carries the headline; keep the H2 for SEO/a11y
            but hide it visually so it doesn't overlap the baked-in image text. */}
        <h2 className="sr-only">{heading}</h2>
        {children && <div className="flex flex-wrap justify-end gap-3">{children}</div>}
      </div>
    </div>
  );
}
