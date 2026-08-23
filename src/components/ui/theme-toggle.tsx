"use client";

import { HiMoon, HiSun } from "react-icons/hi2";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDarkMode = !root.classList.contains("dark");

    root.classList.toggle("dark", nextDarkMode);
    root.style.colorScheme = nextDarkMode ? "dark" : "light";
    localStorage.setItem("theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition hover:scale-105 sm:h-10 sm:w-10"
    >
      <HiMoon className="text-[0.95rem] sm:text-[1.1rem] dark:hidden" />
      <HiSun className="hidden text-[0.95rem] dark:block sm:text-[1.1rem]" />
    </button>
  );
}
