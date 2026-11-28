import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  Truck,
  Cpu,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/rayoData";
import { SITE_METADATA, ABOUT_PAGE_CONTENT } from "@/data/siteContent";
import CompanyLocationsSection from "@/components/CompanyLocationsSection";

export const metadata: Metadata = SITE_METADATA.about;

export default function AboutUsPage() {
  const getCommitmentIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Truck":
        return <Truck className="w-5 h-5" />;
      case "Cpu":
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-14 py-10 sm:py-14">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-stone-800">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-500/10 text-lime-400 text-xs font-bold uppercase tracking-wider border border-lime-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>{ABOUT_PAGE_CONTENT.hero.badge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
              {ABOUT_PAGE_CONTENT.hero.title}
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-medium leading-relaxed">
              {COMPANY_INFO.story}
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Philosophy & Photo Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative h-[360px] sm:h-[460px] bg-stone-950">
              <Image
                src="/images/products/rayo-60v-battery.jpg"
                alt="RAYO Battery Assembly"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/20 text-xs">
                <span className="font-bold text-lime-400 block mb-0.5">
                  {ABOUT_PAGE_CONTENT.difference.imageBadge}
                </span>
                {ABOUT_PAGE_CONTENT.difference.imageCaption}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 space-y-5">
              <span className="text-xs font-black uppercase tracking-widest text-lime-600 dark:text-lime-400 block">
                {ABOUT_PAGE_CONTENT.difference.badge}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                {ABOUT_PAGE_CONTENT.difference.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {ABOUT_PAGE_CONTENT.difference.paragraph1}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {ABOUT_PAGE_CONTENT.difference.paragraph2}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {ABOUT_PAGE_CONTENT.difference.stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800"
                  >
                    <span className={`block text-xl font-black ${st.color}`}>
                      {st.value}
                    </span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
            {ABOUT_PAGE_CONTENT.commitments.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
            {ABOUT_PAGE_CONTENT.commitments.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_PAGE_CONTENT.commitments.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 dark:bg-lime-950 text-lime-600 dark:text-lime-400 flex items-center justify-center">
                {getCommitmentIcon(item.icon)}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-white text-base">
                {item.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Locations & Facilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompanyLocationsSection />
      </section>
    </div>
  );
}
