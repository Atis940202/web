"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren, useEffect } from "react";
import { CommandPalette } from "../components/CommandPalette";

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.dispatchEvent(new CustomEvent("command:toggle"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const openButtons = document.querySelectorAll<HTMLButtonElement>("[data-command-open]");
    const openHandler = () => document.dispatchEvent(new CustomEvent("command:toggle"));
    openButtons.forEach((button) => button.addEventListener("click", openHandler));
    return () => {
      openButtons.forEach((button) => button.removeEventListener("click", openHandler));
    };
  }, []);

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
      <CommandPalette />
    </ThemeProvider>
  );
}
