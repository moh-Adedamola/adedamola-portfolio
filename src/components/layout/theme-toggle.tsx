"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // resolvedTheme is undefined on the server. Render a stable placeholder
  // until the component mounts so the server and client HTML match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard next-themes hydration-safe mount flag, not a cascading-render bug
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted
          ? resolvedTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : (
        <span className="h-5 w-5" aria-hidden />
      )}
    </Button>
  );
}
