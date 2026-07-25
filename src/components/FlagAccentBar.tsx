// A short horizontal bar of the country's flag colors, used under titles to give
// each exam silo a national feel (UK feels UK, Canada feels Canadian) without
// recoloring the whole UI. Decorative only.
export default function FlagAccentBar({
  colors,
  className = "",
}: {
  colors: string[];
  className?: string;
}) {
  return (
    <div
      className={`flex h-1.5 w-16 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10 ${className}`}
      aria-hidden
    >
      {colors.map((c, i) => (
        <span key={i} className="h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}
