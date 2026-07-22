"use client";

import { useMemo, useState } from "react";

type VisaRoute = {
  id: string;
  label: string;
  years: number;
};

const VISA_ROUTES: VisaRoute[] = [
  { id: "skilled-worker", label: "Skilled Worker", years: 5 },
  { id: "spouse", label: "Spouse/partner of a British citizen or settled person", years: 5 },
  { id: "innovator-founder", label: "Innovator Founder", years: 3 },
  { id: "global-talent-promise", label: "Global Talent (exceptional promise)", years: 3 },
  { id: "global-talent-talent", label: "Global Talent (exceptional talent)", years: 3 },
  { id: "other-5yr", label: "Other route (5-year standard)", years: 5 },
];

function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function IlrCalculator({ accent }: { accent: string }) {
  const [routeId, setRouteId] = useState(VISA_ROUTES[0].id);
  const [startDate, setStartDate] = useState("");
  const [daysAbsent, setDaysAbsent] = useState("");

  const route = VISA_ROUTES.find((r) => r.id === routeId) ?? VISA_ROUTES[0];

  const result = useMemo(() => {
    if (!startDate) return null;
    const parsed = new Date(startDate);
    if (Number.isNaN(parsed.getTime())) return null;
    const qualifyingDate = addYears(parsed, route.years);
    const absentDays = Number(daysAbsent) || 0;
    const overLimit = absentDays > 180;
    return { qualifyingDate, absentDays, overLimit };
  }, [startDate, daysAbsent, route.years]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Visa route
          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="rounded-lg border border-black/15 bg-transparent px-3 py-2 text-base dark:border-white/20"
          >
            {VISA_ROUTES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} — {r.years} years
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium">
          Continuous residence start date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-lg border border-black/15 bg-transparent px-3 py-2 text-base dark:border-white/20"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium sm:col-span-2">
          Days spent outside the UK in the last 12 months
          <input
            type="number"
            min="0"
            value={daysAbsent}
            onChange={(e) => setDaysAbsent(e.target.value)}
            placeholder="0"
            className="rounded-lg border border-black/15 bg-transparent px-3 py-2 text-base dark:border-white/20"
          />
        </label>
      </div>

      {result && (
        <div
          className="mt-8 rounded-xl p-6"
          style={{ backgroundColor: `${accent}14`, borderLeft: `4px solid ${accent}` }}
        >
          <p className="text-sm uppercase tracking-wide opacity-70">Estimated qualifying date</p>
          <p className="mt-1 text-2xl font-semibold" style={{ color: accent }}>
            {formatDate(result.qualifyingDate)}
          </p>
          {result.overLimit && (
            <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
              You&rsquo;ve recorded more than 180 days outside the UK in a 12-month period. This can
              reset your continuous residence — check your case against current Home Office
              guidance.
            </p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs opacity-60">
        This calculator is a planning estimate, not legal advice. Absence rules, route lengths,
        and eligibility criteria can change — always confirm your specific case against current
        Home Office guidance or with a qualified immigration adviser before applying.
      </p>
    </div>
  );
}
