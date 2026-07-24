import Link from "next/link";

export default function DashboardCard({
  icon,
  title,
  description,
  ctaLabel,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-black/10 p-6 dark:border-white/10">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent-dark)" }}
        aria-hidden
      >
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 flex-1 text-sm opacity-70">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-block w-fit rounded-lg px-4 py-2 text-sm font-bold text-white"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
