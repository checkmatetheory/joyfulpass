"use client";

import Switch from "@/components/ui/sky-toggle";
import { useTheme } from "@/components/ThemeProvider";

// Fixed light/dark toggle pinned to the bottom-right of every page.
export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}
