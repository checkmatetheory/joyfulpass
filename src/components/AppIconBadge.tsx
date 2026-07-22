import Image from "next/image";
import type { AppRecord } from "@/lib/apps";

export default function AppIconBadge({
  app,
  size = 96,
}: {
  app: AppRecord;
  size?: number;
}) {
  if (app.iconUrl) {
    return (
      <Image
        src={app.iconUrl}
        alt={`${app.name} icon`}
        width={size}
        height={size}
        className="rounded-2xl shadow-lg"
      />
    );
  }

  // Placeholder badge until a real icon is uploaded (see AppRecord.iconUrl).
  return (
    <div
      className="flex items-center justify-center rounded-2xl shadow-lg"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${app.theme.accent}, ${app.theme.accentDark})`,
      }}
    >
      <span style={{ fontSize: size * 0.5 }} aria-hidden>
        {app.flagEmoji}
      </span>
    </div>
  );
}
