import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Handwritten-style caption printed on the white strip. */
  caption?: string;
  /** Degrees of tilt, for that scattered-on-a-desk feel. */
  rotate?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * An Instax / instant-film photo: a square shot in a white frame with a deep
 * bottom border and a soft drop shadow. Theme-agnostic (the white frame reads
 * on both light and dark), so it can be dropped anywhere to add personality.
 */
export default function InstaxPhoto({
  src,
  alt,
  caption,
  rotate = 0,
  className = "",
  priority,
  sizes = "(max-width: 640px) 60vw, 240px",
}: Props) {
  return (
    <figure
      className={`rounded-[3px] bg-white p-2.5 pb-9 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-200">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-[0.8rem] font-medium italic tracking-tight text-neutral-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
