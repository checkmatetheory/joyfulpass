import type { AppRecord } from "@/lib/apps";
import StoreBadges from "@/components/StoreBadges";

/**
 * A consistent "Download {App}" prompt pinned to the bottom of every in-app
 * screen (web + mobile), with the coloured app-store badges. Hidden for apps
 * that don't have store links yet.
 */
export default function ExamDownloadFooter({ app }: { app: AppRecord }) {
  if (!app.appStoreUrl && !app.playStoreUrl) return null;

  return (
    <section className="mt-10 border-t border-black/10 px-5 py-10 text-center dark:border-white/10">
      <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">Download {app.name}</h2>
      <StoreBadges app={app} className="mt-5" />
    </section>
  );
}
