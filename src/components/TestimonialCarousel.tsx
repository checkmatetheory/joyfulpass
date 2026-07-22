import type { Testimonial } from "@/lib/apps";

// Renders nothing until real testimonials exist — see AppRecord.testimonials.
export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {testimonials.map((t) => (
        <div
          key={t.name + t.quote}
          className="w-64 shrink-0 rounded-2xl p-6"
          style={{ backgroundColor: t.color }}
        >
          <p className="text-lg font-bold">&ldquo;{t.quote}&rdquo;</p>
          <p className="mt-3 text-sm font-semibold opacity-80">
            {t.name}, {t.location}
          </p>
        </div>
      ))}
    </div>
  );
}
