"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer shadow-2xs"
      aria-label="Toggle Dark / Light Theme"
      title={resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-stone-700 transition-transform -rotate-12 hover:rotate-0 duration-300" />
      )}
    </button>
  );
}
