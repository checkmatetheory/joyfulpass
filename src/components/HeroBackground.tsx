import type { HeroMedia } from "@/lib/apps";

// Renders a city-specific photo/video behind hero content, with a color
// wash in the app's own gradient for text legibility. Falls back to a
// plain gradient until real media is supplied via AppRecord.heroMedia.
export default function HeroBackground({
  media,
  gradientFrom,
  gradientTo,
}: {
  media?: HeroMedia;
  gradientFrom: string;
  gradientTo: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {media?.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.url} alt="" className="h-full w-full object-cover" />
      )}
      {media?.type === "video" && (
        <video
          src={media.url}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: media
            ? `linear-gradient(160deg, ${gradientFrom}99, ${gradientTo}D9)`
            : `linear-gradient(160deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
    </div>
  );
}
