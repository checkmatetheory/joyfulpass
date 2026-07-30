import type { AppRecord } from "@/lib/apps";

type Props = {
  app: AppRecord;
  heading: string;
  body?: string;
  /** CTA buttons / store badges. */
  children?: React.ReactNode;
  /** "center" (Template A hero-style) or "split" (in-context row). */
  variant?: "center" | "split";
  className?: string;
};

/**
 * The per-app branded CTA banner. Each silo gets a distinct look automatically:
 * its own accent gradient wash over its own background image (ctaBannerImage →
 * heroMedia → gradient), so BritPass reads blue/UK and CanadaPass red/Canadian
 * without any per-page styling. One banner component, used across every template.
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
      {variant === "center" ? (
        <div className="relative px-6 py-12 text-center sm:px-10 sm:py-14">
          <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2>
          {body && <p className="mx-auto mt-3 max-w-md text-white/85">{body}</p>}
          {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      ) : (
        <div className="relative flex flex-col items-start gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">{heading}</h2>
            {body && <p className="mt-1 text-sm text-white/85">{body}</p>}
          </div>
          {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
        </div>
      )}
    </div>
  );
}
