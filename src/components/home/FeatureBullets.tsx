import { features } from "@/lib/homeContent";

export default function FeatureBullets() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Your success starts here</h2>
        <p className="mt-3 opacity-75">
          We built Joyful for people with a lot riding on one exam. Here&rsquo;s how we help you walk
          in ready.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-5 rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
              style={{ backgroundColor: "var(--accent-soft)" }}
              aria-hidden
            >
              {feature.icon}
            </span>
            <div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="mt-1 opacity-75">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
