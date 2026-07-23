import { howItWorks } from "@/lib/homeContent";

export default function HowItWorks() {
  return (
    <section className="bg-cream px-4 py-20 text-cream-foreground sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
        <p className="mt-3 opacity-75">
          Three simple steps from &ldquo;where do I even start?&rdquo; to sitting your test with
          confidence.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3">
        {howItWorks.map((step, i) => (
          <div key={step.title} className="text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-bold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {i + 1}
            </div>
            <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm opacity-75">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
