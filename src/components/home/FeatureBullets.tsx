import { features } from "@/lib/homeContent";
import PhoneMockup from "@/components/PhoneMockup";

export default function FeatureBullets() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Your success starts here</h2>
        <p className="mt-3 opacity-75">
          We built Joyful for people with a lot riding on one exam. Here&rsquo;s how we help you walk
          in ready.
        </p>
      </div>

      <div className="mt-16 space-y-20">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`grid items-center gap-10 sm:grid-cols-2 ${
              i % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">{feature.title}</h3>
              <p className="mt-4 text-lg opacity-75">{feature.body}</p>
            </div>
            <div>
              <PhoneMockup variant={feature.mockup} accent="#7c3aed" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
