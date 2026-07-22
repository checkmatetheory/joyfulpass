import type { ReactNode } from "react";

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  gradientFrom,
  gradientTo,
  children,
}: {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  gradientFrom: string;
  gradientTo: string;
  children?: ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-28"
      style={{
        backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{headline}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{subheadline}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
