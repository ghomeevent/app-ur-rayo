"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { SITE_CONFIG } from "@/data/siteConfig";
import { NAVBAR_CONTENT } from "@/data/siteContent";
import ThemeToggle from "./ThemeToggle";
import BrandSwitcherBar from "./BrandSwitcherBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navLinks = SITE_CONFIG.navLinks;

  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO Batteries, I would like to inquire about your EV Battery models and technical specifications."
  )}`;

  return (
    <>
      {/* Ecosystem Brand Switcher Bar */}
      <BrandSwitcherBar activeSite="rayo" />

      {/* Main Sticky Glass Header */}
      <header
        className={`sticky top-0 z-50 w-full glass-nav border-b border-stone-200/80 dark:border-stone-800/80 transition-all duration-300 ${
          scrolled ? "shadow-md py-2" : "py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Top Left: ONLY RAYO LOGO BRANDING */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            {/* Circular RAYO Badge */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-lime-500/60 shadow-xs group-hover:scale-105 transition-transform duration-300 bg-stone-950">
              <Image
                src={COMPANY_INFO.brandingAssets.rayoBadge}
                alt="RAYO EV Batteries"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            {/* RAYO Wordmark */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-stone-900 dark:text-white group-hover:text-lime-500 transition-colors leading-none">
                  {NAVBAR_CONTENT.brand.brandName}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-lime-600 dark:text-lime-400 bg-lime-500/10 px-1.5 py-0.5 rounded">
                  {NAVBAR_CONTENT.brand.evBadge}
                </span>
              </div>
              <span className="text-[9px] font-semibold text-stone-500 dark:text-stone-400 -mt-0.5 tracking-wider">
                {NAVBAR_CONTENT.brand.poweredByPrefix}{" "}
                <strong className="font-bold text-stone-700 dark:text-stone-300">
                  {NAVBAR_CONTENT.brand.parentName}
                </strong>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "text-lime-950 dark:text-lime-300 bg-white dark:bg-stone-800 shadow-2xs border border-lime-300 dark:border-lime-900/60"
                      : "text-stone-700 dark:text-stone-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-white/60 dark:hover:bg-stone-800/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-800 dark:text-stone-200 bg-stone-100/90 dark:bg-stone-900/90 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full border border-stone-300/80 dark:border-stone-800 transition-all shadow-2xs backdrop-blur-md"
              title={NAVBAR_CONTENT.actions.directCallTitle}
            >
              <Phone className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
              <span>{COMPANY_INFO.formattedPhone}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-lime-500 hover:bg-lime-400 text-stone-950 text-xs font-black rounded-full shadow-xs hover:shadow-md transition-all active:scale-95 rayo-glow"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-stone-950" />
              <span>{NAVBAR_CONTENT.actions.inquireButton}</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-lime-500 text-stone-950 flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              title={NAVBAR_CONTENT.actions.mobileWhatsApp}
            >
              <MessageCircle className="w-4 h-4 fill-stone-950" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={NAVBAR_CONTENT.actions.mobileToggleLabel}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
              className="p-2 rounded-full text-stone-800 dark:text-stone-200 bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 transition-colors backdrop-blur-md cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white/98 dark:bg-stone-950/98 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "text-lime-950 dark:text-lime-300 bg-lime-50 dark:bg-stone-900 font-bold border border-lime-300 dark:border-stone-800"
                      : "text-stone-800 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-bold text-sm rounded-xl border border-stone-200 dark:border-stone-800"
              >
                <Phone className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                {NAVBAR_CONTENT.actions.mobileCallPrefix} {COMPANY_INFO.formattedPhone}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-sm rounded-xl shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                {NAVBAR_CONTENT.actions.mobileWhatsApp}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
