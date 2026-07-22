import type { TestCenter } from "@/lib/testCenters";

export default function TestCenterList({ centers }: { centers: TestCenter[] }) {
  const byRegion = centers.reduce<Record<string, TestCenter[]>>((acc, center) => {
    acc[center.region] = acc[center.region] ?? [];
    acc[center.region].push(center);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(byRegion).map(([region, list]) => (
        <div key={region}>
          <h3 className="text-lg font-bold">{region}</h3>
          <ul className="mt-3 space-y-3">
            {list.map((center) => (
              <li
                key={center.name + center.address}
                className="rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <p className="font-semibold">{center.name}</p>
                <p className="text-sm opacity-75">
                  {center.city} — {center.address}
                </p>
                {center.notes && <p className="mt-1 text-xs opacity-60">{center.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
