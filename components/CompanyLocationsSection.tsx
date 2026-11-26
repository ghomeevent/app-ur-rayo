"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Compass,
} from "lucide-react";
import { COMPANY_LOCATIONS, COMPANY_INFO, CompanyLocation } from "@/data/rayoData";
import { LOCATIONS_SECTION_CONTENT } from "@/data/siteContent";

export default function CompanyLocationsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (loc: CompanyLocation) => {
    navigator.clipboard.writeText(loc.fullAddress);
    setCopiedId(loc.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section className="space-y-8" id="facilities">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-500/10 text-lime-700 dark:text-lime-300 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
          <Building2 className="w-3.5 h-3.5" />
          <span>{LOCATIONS_SECTION_CONTENT.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 dark:text-white tracking-tight">
          {LOCATIONS_SECTION_CONTENT.title}
        </h2>
        <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
          {LOCATIONS_SECTION_CONTENT.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {COMPANY_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Header / Address Info */}
            <div className="p-6 sm:p-7 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-bold uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                    <span>{loc.city}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                    {loc.title}
                  </h3>
                </div>
              </div>

              {/* Standardized Address Block */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/70 dark:border-stone-800 space-y-2 text-xs sm:text-sm">
                <div className="space-y-0.5 text-stone-800 dark:text-stone-200 font-medium">
                  {loc.addressLines.map((line, idx) => (
                    <p key={idx} className={idx === 0 ? "font-bold text-stone-900 dark:text-white" : ""}>
                      {line}
                    </p>
                  ))}
                </div>

                {loc.coordinates.dms && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80 flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                    <Compass className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 flex-shrink-0" />
                    <span>GPS: {loc.coordinates.dms}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-lime-500 hover:bg-lime-400 text-stone-950 font-black text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{LOCATIONS_SECTION_CONTENT.getDirectionsText}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(loc)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {copiedId === loc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{LOCATIONS_SECTION_CONTENT.copiedText}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{LOCATIONS_SECTION_CONTENT.copyAddressText}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                  <span>{LOCATIONS_SECTION_CONTENT.callPrefix} {COMPANY_INFO.formattedPhone}</span>
                </a>
              </div>
            </div>

            {/* Live Interactive Map Iframe */}
            <div className="relative w-full h-64 sm:h-72 border-t border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">
              <iframe
                title={`${loc.title} Google Map`}
                src={loc.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[105%]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
