// Lightweight inline line-icons for the dashboard sidebar — no icon dependency.
// All share a 24x24 viewBox and inherit currentColor + stroke width.
type IconProps = { className?: string };

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function OverviewIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function MockTestIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6l1 1 1.5-2M4 12l1 1 1.5-2M4 18l1 1 1.5-2" />
    </svg>
  );
}

export function TopicsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function MistakesIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export function StudyGuideIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V5Z" />
    </svg>
  );
}

export function RevisionIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.8A.8.8 0 0 1 9.8 2h4.4a.8.8 0 0 1 .8.8V4" />
      <path d="M9 10h6M9 14h4" />
    </svg>
  );
}

export function PricingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8Z" />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function AccountIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className} aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
