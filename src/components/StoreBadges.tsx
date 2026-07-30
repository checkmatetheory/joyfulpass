import type { AppRecord } from "@/lib/apps";
import type { ComponentProps } from "react";

/**
 * Official-style app-store badges (dark pill + coloured store logo). Reads on
 * both light and dark surfaces via a hairline ring. Renders nothing until an
 * app actually has store links.
 */
export default function StoreBadges({ app, className = "" }: { app: AppRecord; className?: string }) {
  if (!app.appStoreUrl && !app.playStoreUrl) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {app.appStoreUrl && (
        <a
          href={app.appStoreUrl}
          aria-label={`Download ${app.name} on the App Store`}
          className="flex h-[52px] items-center gap-2.5 rounded-xl bg-black px-4 text-white ring-1 ring-white/15 transition hover:opacity-90"
        >
          <AppleIcon className="h-7 w-7 shrink-0" aria-hidden />
          <span className="flex flex-col items-start pr-1 text-left leading-none">
            <span className="text-[10px] tracking-tight">Download on the</span>
            <span className="mt-0.5 text-base font-semibold">App Store</span>
          </span>
        </a>
      )}
      {app.playStoreUrl && (
        <a
          href={app.playStoreUrl}
          aria-label={`Get ${app.name} on Google Play`}
          className="flex h-[52px] items-center gap-2.5 rounded-xl bg-black px-4 text-white ring-1 ring-white/15 transition hover:opacity-90"
        >
          <GooglePlayIcon className="h-6 w-6 shrink-0" aria-hidden />
          <span className="flex flex-col items-start pr-1 text-left leading-none">
            <span className="text-[10px] tracking-tight">Get it on</span>
            <span className="mt-0.5 text-base font-semibold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}

function AppleIcon({ fill = "currentColor", ...props }: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="M18.546 12.763c.024-1.87 1.004-3.597 2.597-4.576-1.009-1.442-2.64-2.323-4.399-2.378-1.851-.194-3.645 1.107-4.588 1.107-.961 0-2.413-1.088-3.977-1.056-2.057.067-3.929 1.208-4.93 3.007-2.131 3.69-.542 9.114 1.5 12.097 1.022 1.461 2.215 3.092 3.778 3.035 1.529-.063 2.1-.975 3.945-.975 1.828 0 2.364.975 3.958.938 1.64-.027 2.674-1.467 3.66-2.942a15.6 15.6 0 0 0 1.673-3.408c-1.948-.824-3.215-2.733-3.217-4.849Z" />
      <path d="M15.535 3.847C16.429 2.773 16.87 1.393 16.763 0c-1.366.144-2.629.797-3.535 1.829-.895 1.019-1.349 2.351-1.261 3.705 1.385.014 2.7-.608 3.568-1.687Z" />
    </svg>
  );
}

function GooglePlayIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path fill="#00A0FF" d="M6.4 4.7A4.3 4.3 0 0 0 5 8v32c0 1.3.5 2.5 1.4 3.3L27.8 24 6.4 4.7Z" />
      <path fill="#FF3A44" d="m30.2 26.4-5.1-2.9L6.4 43.3c1.4 1.2 3.4 1.4 5 .5l18.8-10.7Z" />
      <path fill="#FFE000" d="m30.2 21.6-18.8-10.7c-1.6-.9-3.6-.7-5 .5l18.7 19.7 5.1-2.9c2.4-1.4 2.4-5.2 0-6.6Z" />
      <path fill="#00D084" d="m6.4 4.7 21.4 19.8-2.7 2.5L6.4 43.3A4.3 4.3 0 0 1 5 40V8c0-1.3.5-2.5 1.4-3.3Z" />
    </svg>
  );
}
