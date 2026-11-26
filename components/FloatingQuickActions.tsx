"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { QUICK_ACTIONS_CONTENT } from "@/data/siteContent";

export default function FloatingQuickActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO / Urban Ride Green Motors, I would like to inquire about RAYO EV Batteries & Smart Chargers."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-stone-900/80 dark:bg-stone-800/90 text-white backdrop-blur-md border border-stone-700/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label={QUICK_ACTIONS_CONTENT.scrollToTopAria}
          title={QUICK_ACTIONS_CONTENT.scrollToTopTitle}
        >
          <ArrowUp className="w-4 h-4 text-lime-400" />
        </button>
      )}

      {/* Direct Phone Call */}
      <a
        href={`tel:${COMPANY_INFO.phone}`}
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/90 dark:bg-stone-900/95 text-stone-100 border border-lime-500/30 backdrop-blur-md shadow-xl hover:border-lime-500/70 hover:scale-105 active:scale-95 transition-all"
        title={QUICK_ACTIONS_CONTENT.directCallTitle}
      >
        <div className="w-7 h-7 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold">{COMPANY_INFO.formattedPhone}</span>
      </a>

      {/* Instant WhatsApp Order / Inquiry */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all rayo-glow"
        title={QUICK_ACTIONS_CONTENT.whatsappTitle}
      >
        <MessageCircle className="w-5 h-5 fill-stone-950" />
        <span>{QUICK_ACTIONS_CONTENT.whatsappButtonText}</span>
      </a>
    </div>
  );
}
