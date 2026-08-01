import { features } from "@/lib/homeContent";
import PhoneMockup from "@/components/PhoneMockup";

export default function FeatureBullets() {
  return (
    <section className="overflow-hidden bg-[#2E1065] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">Your success starts here</h2>
        <p className="mt-4 text-lg leading-relaxed text-white/80 sm:text-xl">
          We built Joyful for people with a lot riding on one exam. Here&rsquo;s how we help you walk
          in ready.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl space-y-20 sm:mt-20 sm:space-y-28">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`grid items-center gap-10 sm:grid-cols-2 sm:gap-16 ${
              index % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="max-w-md">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/55">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{feature.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/80 sm:text-xl">{feature.body}</p>
            </div>
            <PhoneMockup
              variant={feature.mockup}
              accent="#5B6EE1"
              revealFrom={index % 2 === 0 ? "right" : "left"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
