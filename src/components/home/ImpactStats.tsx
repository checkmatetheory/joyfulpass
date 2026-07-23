import { impactStats } from "@/lib/homeContent";

export default function ImpactStats() {
  return (
    <section
      className="px-4 py-20 text-white sm:px-6"
      style={{ backgroundImage: "linear-gradient(160deg, #7C3AED, #2E1065)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Preparation that changes lives</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Passing a citizenship or settlement test opens doors — to a new job, a family reunion, a
          place to call home. We&rsquo;re proud of the part we play in that.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
        {impactStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-extrabold sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm text-white/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
