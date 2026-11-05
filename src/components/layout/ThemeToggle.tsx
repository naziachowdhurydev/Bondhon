"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "bondhon-theme";
const THEME_CHANGE_EVENT = "bondhon-theme-change";

const subscribeToTheme = (onThemeChange: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
};

const getThemeSnapshot = () =>
  document.documentElement.classList.contains("dark");

const getServerThemeSnapshot = () => false;

const ThemeToggle = () => {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch (error) {
      console.error("Unable to save the selected theme:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
