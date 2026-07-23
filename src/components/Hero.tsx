import type { ReactNode } from "react";
import type { HeroMedia } from "@/lib/apps";
import HeroBackground from "@/components/HeroBackground";
import WaveDivider from "@/components/WaveDivider";

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  gradientFrom,
  gradientTo,
  media,
  children,
}: {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  gradientFrom: string;
  gradientTo: string;
  media?: HeroMedia;
  children?: ReactNode;
}) {
  return (
    <section className="relative -mt-[120px] overflow-hidden pt-[150px] text-white sm:pt-[180px]">
      <HeroBackground media={media} gradientFrom={gradientFrom} gradientTo={gradientTo} />
      <div className="relative mx-auto max-w-3xl px-4 pb-48 text-center sm:px-6 sm:pb-64">
        {eyebrow && (
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{headline}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">{subheadline}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
      <div className="relative">
        <WaveDivider color="var(--surface-cream)" />
      </div>
    </section>
  );
}
