import type { AppStat } from "@/lib/apps";

export default function StatBadge({ stat, accent }: { stat: AppStat; accent: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-semibold" style={{ color: accent }}>
        {stat.value}
      </p>
      <p className="mt-1 text-sm opacity-70">{stat.label}</p>
    </div>
  );
}
