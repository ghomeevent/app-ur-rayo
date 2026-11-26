"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Clock,
  Zap,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { COMPANY_INFO, COMPANY_LOCATIONS } from "@/data/rayoData";
import { SITE_CONFIG } from "@/data/siteConfig";
import { FOOTER_CONTENT } from "@/data/siteContent";

export default function Footer() {
  const whatsappUrl = `https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
    "Hello RAYO Batteries, I am inquiring about RAYO EV Batteries & Smart Chargers."
  )}`;

  const footerNavLinks = SITE_CONFIG.navLinks;

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-5 h-5 fill-lime-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <footer className="bg-[#050505] text-stone-300 pt-14 pb-10 border-t border-stone-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-stone-800/80">
          {FOOTER_CONTENT.trustHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-stone-900/60 border border-stone-800"
            >
              <div className="w-10 h-10 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center flex-shrink-0">
                {getHighlightIcon(highlight.icon)}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-0.5">{highlight.title}</h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
          {/* Brand Col - PRIMARY RAYO BRANDING */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-lime-500/50 bg-stone-950">
                <Image
                  src={COMPANY_INFO.brandingAssets.rayoBadge}
                  alt="RAYO EV Batteries"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight block">
                  {COMPANY_INFO.brandName.toUpperCase()} BATTERIES
                </span>
                <span className="text-[10px] text-lime-400 font-bold uppercase tracking-wider block">
                  {COMPANY_INFO.brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>

            <div className="text-xs text-stone-400 space-y-3">
              {COMPANY_LOCATIONS.map((loc) => (
                <div key={loc.id} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-200 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                    <span>{loc.city} Facility:</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-snug pl-5">
                    {loc.fullAddress}{" "}
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-400 hover:underline inline-flex items-center gap-0.5 ml-1 font-semibold"
                    >
                      (View Map)
                    </a>
                  </p>
                </div>
              ))}

              <div className="flex items-center gap-2 pl-0 pt-1">
                <Clock className="w-3.5 h-3.5 text-lime-400 flex-shrink-0" />
                <span className="text-[11px]">{COMPANY_INFO.operatingHours}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-lime-500 hover:bg-lime-400 text-xs font-black text-stone-950 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-stone-950" />
                <span>WhatsApp Inquiry</span>
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs font-bold text-stone-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-lime-400" />
                <span>{COMPANY_INFO.formattedPhone}</span>
              </a>
            </div>
          </div>

          {/* Battery Models */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider mb-3 uppercase">
              {FOOTER_CONTENT.columns.lineupTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products#rayo-60v-40ah" className="hover:text-lime-400 transition-colors">
                  RAYO 60V 40Ah Battery
                </Link>
              </li>
              <li>
                <Link href="/products#rayo-48v-32ah" className="hover:text-lime-400 transition-colors">
                  RAYO 48V 32Ah / 40Ah Battery
                </Link>
              </li>
              <li>
                <Link href="/products#rayo-72v-40ah" className="hover:text-lime-400 transition-colors">
                  RAYO 72V 40Ah Performance
                </Link>
              </li>
              <li>
                <Link href="/products#rayo-smart-charger" className="hover:text-lime-400 transition-colors font-medium text-lime-400">
                  RAYO Smart Fast Charger →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider mb-3 uppercase">
              {FOOTER_CONTENT.columns.companyTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about-us" className="hover:text-lime-400 transition-colors">
                  {FOOTER_CONTENT.columns.aboutUsLink}
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-lime-400 transition-colors">
                  {FOOTER_CONTENT.columns.salesDeskLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Mobility */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-wider mb-3 uppercase">
              {FOOTER_CONTENT.columns.mobilityTitle}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/contact-us" className="hover:text-lime-400 transition-colors">
                  {FOOTER_CONTENT.columns.fleetSupplyLink}
                </Link>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.parentWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-400 transition-colors inline-flex items-center gap-1 text-stone-300"
                >
                  <span>{FOOTER_CONTENT.columns.urbanRidePortalLink}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-6 border-t border-stone-850">
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-stone-800 text-[11px] sm:text-xs text-stone-400 leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 uppercase tracking-wider text-[10px] sm:text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{FOOTER_CONTENT.legalDisclaimer.title}</span>
            </div>
            <p>
              {FOOTER_CONTENT.legalDisclaimer.body}{" "}
              <a href={`tel:${COMPANY_INFO.phone}`} className="text-lime-400 font-bold hover:underline">
                {COMPANY_INFO.formattedPhone}
              </a>{" "}
              {FOOTER_CONTENT.legalDisclaimer.visitText}
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            {COMPANY_INFO.copyright} • Powered by {COMPANY_INFO.registeredName}
          </div>
          <div className="flex items-center gap-4">
            {footerNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-stone-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
