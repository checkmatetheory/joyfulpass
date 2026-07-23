import { commitment } from "@/lib/homeContent";

export default function CommitmentCta() {
  return (
    <section
      className="px-4 py-20 text-white sm:px-6"
      style={{ backgroundImage: "linear-gradient(160deg, #2E1065, #4C1D95)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-white/70">Our commitment to you</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{commitment.heading}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-white/85">{commitment.body}</p>
        <a
          href={commitment.ctaHref}
          className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#4C1D95]"
        >
          {commitment.ctaLabel}
        </a>
      </div>
    </section>
  );
}
