"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingQuickActions from "./FloatingQuickActions";
import { ThemeProvider } from "./ThemeProvider";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#070707] text-stone-900 dark:text-stone-100 selection:bg-lime-500 selection:text-stone-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingQuickActions />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
