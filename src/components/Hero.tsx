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
    <section className="relative -mt-14 overflow-hidden pt-36 text-white sm:-mt-16 sm:pt-44">
      <HeroBackground media={media} gradientFrom={gradientFrom} gradientTo={gradientTo} />
      <div className="relative mx-auto max-w-4xl px-4 pb-72 text-center sm:px-6 sm:pb-[26rem]">
        {eyebrow && (
          <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">{headline}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">{subheadline}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
      <div className="relative">
        <WaveDivider color="var(--surface-cream)" />
      </div>
    </section>
  );
}
