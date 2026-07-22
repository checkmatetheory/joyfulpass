import type { AppRecord } from "@/lib/apps";

export default function DownloadCta({ app }: { app: AppRecord }) {
  if (!app.appStoreUrl && !app.playStoreUrl) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {app.appStoreUrl && (
        <a
          href={app.appStoreUrl}
          className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-white"
        >
          <span className="text-2xl" aria-hidden>
            ⬇
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[10px] uppercase tracking-wide opacity-80">
              Download on the
            </span>
            <span className="block text-base font-bold">App Store</span>
          </span>
        </a>
      )}
      {app.playStoreUrl && (
        <a
          href={app.playStoreUrl}
          className="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-white"
        >
          <span className="text-2xl" aria-hidden>
            ▶
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[10px] uppercase tracking-wide opacity-80">Get it on</span>
            <span className="block text-base font-bold">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
