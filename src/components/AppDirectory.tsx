"use client";

import { useMemo, useState } from "react";
import type { AppRecord } from "@/lib/apps";
import AppCard from "@/components/AppCard";

export default function AppDirectory({ apps }: { apps: AppRecord[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter((app) =>
      [app.name, app.country, app.examName].some((field) => field.toLowerCase().includes(q))
    );
  }, [apps, query]);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by country or exam name…"
          className="w-full rounded-full border border-black/15 px-5 py-3 text-sm dark:border-white/20 dark:bg-white/5"
          aria-label="Search Joyful apps"
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm opacity-60">
            No apps match &ldquo;{query}&rdquo; yet — more countries and exams are on the way.
          </p>
        )}
      </div>
    </div>
  );
}
