"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Bike } from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { URBAN_RIDE_POSTER_CONTENT } from "@/data/siteContent";

export default function UrbanRidePosterSection() {
  return (
    <section id="urban-ride-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 text-lime-900 dark:text-lime-300 text-xs font-bold uppercase tracking-wider border border-lime-500/20 mb-2">
            <Bike className="w-3.5 h-3.5" />
            <span>{URBAN_RIDE_POSTER_CONTENT.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 dark:text-white tracking-tight">
            {URBAN_RIDE_POSTER_CONTENT.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-0.5">
            {URBAN_RIDE_POSTER_CONTENT.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={COMPANY_INFO.parentWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition-colors"
          >
            <span>{URBAN_RIDE_POSTER_CONTENT.portalLinkText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Urban Ride Poster Display Card */}
      <div className="relative rounded-3xl overflow-hidden border border-lime-500/30 dark:border-stone-800 shadow-2xl bg-black group">
        {/* Poster Image Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[380px] max-h-[520px]">
          <Image
            src={COMPANY_INFO.brandingAssets.heroBanner}
            alt={URBAN_RIDE_POSTER_CONTENT.bannerAlt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover group-hover:scale-[1.015] transition-transform duration-700"
            priority
          />
          {/* Subtle bottom-edge dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />
        </div>

        {/* Poster Footer / Info Bar */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 text-white flex flex-col md:flex-row items-center justify-between gap-5 border-t border-stone-800">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-[10px] uppercase font-black text-lime-400 tracking-widest">
                {URBAN_RIDE_POSTER_CONTENT.integrationBadge}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black">
              {URBAN_RIDE_POSTER_CONTENT.bannerTitle}
            </h3>
            <p className="text-xs text-stone-400 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1">
              {URBAN_RIDE_POSTER_CONTENT.taglines.map((tag, idx) => (
                <React.Fragment key={idx}>
                  <span>{tag}</span>
                  {idx < URBAN_RIDE_POSTER_CONTENT.taglines.length - 1 && <span>•</span>}
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-center">
            <Link
              href="/products"
              className="flex-1 md:flex-none text-center px-5 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs sm:text-sm whitespace-nowrap transition-colors shadow-md rayo-glow"
            >
              {URBAN_RIDE_POSTER_CONTENT.ctaPacks}
            </Link>
            <a
              href={`https://wa.me/91${COMPANY_INFO.phone}?text=${encodeURIComponent(
                "Hello Urban Ride Green Motors / RAYO, I would like to inquire about Urban Ride EV Bikes and RAYO Battery compatibility."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-colors border border-stone-700"
            >
              {URBAN_RIDE_POSTER_CONTENT.ctaOem}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
