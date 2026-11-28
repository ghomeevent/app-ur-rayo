"use client";

import React from "react";
import { Bike, BatteryCharging, ArrowUpRight } from "lucide-react";

interface BrandSwitcherBarProps {
  activeSite: "urban-ride" | "rayo";
}

const URBAN_RIDE_URL =
  process.env.NEXT_PUBLIC_URBAN_RIDE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://app-ur-urbanride.vercel.app");

const RAYO_URL =
  process.env.NEXT_PUBLIC_RAYO_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://app-ur-rayo.vercel.app");

export default function BrandSwitcherBar({ activeSite }: BrandSwitcherBarProps) {
  const isUrbanRide = activeSite === "urban-ride";

  return (
    <div className="bg-[#050608] text-stone-300 border-b border-white/10 text-[11px] relative z-[60]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-10 sm:h-9 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Ecosystem Indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${
              isUrbanRide ? "bg-emerald-400" : "bg-lime-400"
            }`}
          />
          <span className="font-display font-bold tracking-wide text-white truncate sm:hidden">
            Urban Ride
          </span>
          <span className="hidden sm:inline font-display font-bold tracking-wide text-white truncate">
            Urban Ride Green Motors
          </span>
          <span className="hidden md:inline text-stone-600">•</span>
          <span className="hidden md:inline text-stone-400 truncate">
            {isUrbanRide
              ? "EV Scooters & Mobility Ecosystem"
              : "48V • 60V • 72V Lithium-Ion Power"}
          </span>
        </div>

        {/* Right: Site Switcher Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={URBAN_RIDE_URL}
            aria-current={isUrbanRide ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-display font-bold text-[10px] uppercase tracking-wider transition-all ${
              isUrbanRide
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs"
                : "text-stone-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent"
            }`}
          >
            <Bike className="w-3 h-3" />
            <span>EV Scooters</span>
            {!isUrbanRide && <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />}
          </a>

          <a
            href={RAYO_URL}
            aria-current={!isUrbanRide ? "page" : undefined}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-display font-bold text-[10px] uppercase tracking-wider transition-all ${
              !isUrbanRide
                ? "bg-lime-500/20 text-lime-300 border border-lime-500/40 shadow-xs"
                : "text-stone-400 hover:text-lime-300 hover:bg-lime-500/10 border border-transparent"
            }`}
          >
            <BatteryCharging className="w-3 h-3" />
            <span>RAYO Batteries</span>
            {isUrbanRide && <ArrowUpRight className="w-2.5 h-2.5 opacity-70" />}
          </a>
        </div>
      </div>
    </div>
  );
}
