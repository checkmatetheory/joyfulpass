import { impactStats } from "@/lib/homeContent";

const BACKGROUND_IMAGE =
  "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1I1nUhUyX7vNUGCPfV0h2MZxWdSmk9yipujRg";

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6">
      {/* Background photo, with the brand gradient washed over it for legibility. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(160deg, rgba(124,58,237,0.86), rgba(46,16,101,0.92))",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Preparation that changes lives</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Passing a citizenship or settlement test opens doors — to a new job, a family reunion, a
          place to call home. We&rsquo;re proud of the part we play in that.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
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
